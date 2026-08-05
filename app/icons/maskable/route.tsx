import { ImageResponse } from "next/og";

// Maskable icon: keep the artwork inside the "safe zone" (center ~80%)
// since Android may crop/mask this to a circle or squircle.
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f97316, #ec4899)",
        }}
      >
        <div style={{ fontSize: 230, display: "flex" }}>🏍️</div>
      </div>
    ),
    { width: 512, height: 512 }
  );
}
