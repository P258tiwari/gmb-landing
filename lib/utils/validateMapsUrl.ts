export function isGoogleMapsUrl(raw: string): boolean {
  if (!raw || raw.trim().length < 5) return false;
  try {
    const url = new URL(raw.trim());
    const host = url.hostname.toLowerCase();
    return (
      host === "maps.google.com" ||
      host === "www.google.com" ||
      host === "google.com" ||
      host === "maps.app.goo.gl" ||
      host === "goo.gl" ||
      host === "maps.googleapis.com"
    );
  } catch {
    // might be a short/bare URL — accept if it looks like a maps link
    return /maps\.google|g\.page|goo\.gl\/maps|maps\.app\.goo\.gl/.test(raw);
  }
}

export function extractBusinessNameFromUrl(raw: string): string | null {
  try {
    const url = new URL(raw.trim());
    // /maps/place/{BUSINESS_NAME}/@...
    const match = url.pathname.match(/\/maps\/place\/([^/@?]+)/);
    if (match?.[1]) {
      return decodeURIComponent(match[1].replace(/\+/g, " "));
    }
  } catch {
    const match = raw.match(/\/place\/([^/@?]+)/);
    if (match?.[1]) {
      return decodeURIComponent(match[1].replace(/\+/g, " "));
    }
  }
  return null;
}

export function extractPlaceIdFromUrl(raw: string): string | null {
  try {
    const full = decodeURIComponent(raw);
    // Pattern: !1sChIJ... inside data params
    const dataMatch = full.match(/!1s(ChIJ[A-Za-z0-9_\-]+)/);
    if (dataMatch?.[1]) return dataMatch[1];

    const url = new URL(raw.trim());
    const placeId = url.searchParams.get("place_id");
    if (placeId) return placeId;
  } catch {
    // ignore
  }
  return null;
}

export function extractCidFromUrl(raw: string): string | null {
  try {
    const url = new URL(raw.trim());
    return url.searchParams.get("cid");
  } catch {
    return null;
  }
}

export function isShortUrl(raw: string): boolean {
  try {
    const url = new URL(raw.trim());
    return url.hostname === "maps.app.goo.gl" || url.hostname === "goo.gl";
  } catch {
    return /maps\.app\.goo\.gl|goo\.gl\/maps/.test(raw);
  }
}
