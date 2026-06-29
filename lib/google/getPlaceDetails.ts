import type { PlaceData } from "@/lib/audit/types";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const FIELD_MASK = [
  "id",
  "displayName",
  "formattedAddress",
  "nationalPhoneNumber",
  "internationalPhoneNumber",
  "websiteUri",
  "googleMapsUri",
  "rating",
  "userRatingCount",
  "businessStatus",
  "regularOpeningHours",
  "currentOpeningHours",
  "primaryType",
  "types",
  "photos",
  "reviews",
  "location",
].join(",");

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getPlaceDetails(placeId: string): Promise<PlaceData | null> {
  if (!API_KEY) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      console.error("Places API error:", res.status, await res.text());
      return null;
    }

    const p: any = await res.json();

    return {
      placeId: p.id ?? placeId,
      businessName: p.displayName?.text ?? null,
      formattedAddress: p.formattedAddress ?? null,
      phoneNumber:
        p.nationalPhoneNumber ?? p.internationalPhoneNumber ?? null,
      website: p.websiteUri ?? null,
      googleMapsUri: p.googleMapsUri ?? null,
      rating: typeof p.rating === "number" ? p.rating : null,
      reviewCount: typeof p.userRatingCount === "number" ? p.userRatingCount : null,
      businessStatus: p.businessStatus ?? null,
      hasOpeningHours:
        !!(p.regularOpeningHours || p.currentOpeningHours),
      primaryCategory: p.primaryType ?? null,
      types: Array.isArray(p.types) ? p.types.slice(0, 8) : [],
      photosCount: Array.isArray(p.photos) ? p.photos.length : 0,
      recentReviewCount: Array.isArray(p.reviews) ? p.reviews.length : 0,
    };
  } catch (err) {
    console.error("getPlaceDetails error:", err);
    return null;
  }
}
