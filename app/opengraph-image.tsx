import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "#060d1f",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#00ff88",
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "#00ff88",
            }}
          />
          Ampwake
        </div>
        <div
          style={{
            fontSize: 82,
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: 0,
            maxWidth: 920,
          }}
        >
          Google Maps ranking for local businesses.
        </div>
        <div
          style={{
            marginTop: 34,
            fontSize: 32,
            lineHeight: 1.35,
            color: "#b7c3dc",
            maxWidth: 860,
          }}
        >
          GMB optimization, public audit scoring, and Top 3 ranking support for Indian businesses.
        </div>
      </div>
    ),
    size
  );
}
