import {
  extractPlaceIdFromUrl,
  extractCidFromUrl,
  extractBusinessNameFromUrl,
  isShortUrl,
} from "@/lib/utils/validateMapsUrl";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

/** Expand short Google Maps URLs to full URL server-side */
async function expandShortUrl(shortUrl: string): Promise<string> {
  try {
    const res = await fetch(shortUrl, {
      method: "HEAD",
      redirect: "follow",
    });
    return res.url || shortUrl;
  } catch {
    return shortUrl;
  }
}

/** Search for a place by text query, return Place ID */
async function textSearchPlaceId(query: string): Promise<string | null> {
  if (!API_KEY) return null;
  try {
    const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "places.id,places.displayName",
      },
      body: JSON.stringify({ textQuery: query, maxResultCount: 1 }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const place = data.places?.[0];
    return place?.id ?? null;
  } catch {
    return null;
  }
}

/** Find a Place ID from a CID using findPlace endpoint */
async function findPlaceFromCid(cid: string): Promise<string | null> {
  if (!API_KEY) return null;
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=cid:${cid}&inputtype=textquery&fields=place_id&key=${API_KEY}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.candidates?.[0]?.place_id ?? null;
  } catch {
    return null;
  }
}

export interface ResolvePlaceResult {
  placeId: string;
  source: "url_direct" | "url_cid" | "text_search";
}

/**
 * Resolve a Place ID from a Google Maps URL.
 * Tries multiple strategies in order:
 * 1. Extract Place ID directly from URL data params
 * 2. Expand short URLs and retry
 * 3. Extract CID and convert
 * 4. Extract business name + text search
 * 5. Text search using submitted name/city/category
 */
export async function resolvePlace(
  mapsUrl: string,
  fallback?: { businessName?: string; city?: string; category?: string }
): Promise<ResolvePlaceResult | null> {
  let resolvedUrl = mapsUrl.trim();

  // Step 1: Expand short URL first if needed
  if (isShortUrl(resolvedUrl)) {
    resolvedUrl = await expandShortUrl(resolvedUrl);
  }

  // Step 2: Direct Place ID from URL
  const directPlaceId = extractPlaceIdFromUrl(resolvedUrl);
  if (directPlaceId) {
    return { placeId: directPlaceId, source: "url_direct" };
  }

  // Step 3: CID conversion
  const cid = extractCidFromUrl(resolvedUrl);
  if (cid && API_KEY) {
    const placeId = await findPlaceFromCid(cid);
    if (placeId) return { placeId, source: "url_cid" };
  }

  // Step 4: Business name from URL + text search
  const nameFromUrl = extractBusinessNameFromUrl(resolvedUrl);
  if (nameFromUrl && API_KEY) {
    const query = [nameFromUrl, fallback?.city].filter(Boolean).join(" ");
    const placeId = await textSearchPlaceId(query);
    if (placeId) return { placeId, source: "text_search" };
  }

  // Step 5: Fallback text search using submitted form data
  if (API_KEY && fallback && (fallback.businessName || fallback.city)) {
    const query = [fallback.businessName, fallback.city, fallback.category]
      .filter(Boolean)
      .join(" ");
    const placeId = await textSearchPlaceId(query);
    if (placeId) return { placeId, source: "text_search" };
  }

  return null;
}
