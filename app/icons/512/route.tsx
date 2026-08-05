import { ImageResponse } from "next/og";

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
          borderRadius: 100,
        }}
      >
        <div style={{ fontSize: 280, display: "flex" }}>🏍️</div>
      </div>
    ),
    { width: 512, height: 512 }
  );
}
