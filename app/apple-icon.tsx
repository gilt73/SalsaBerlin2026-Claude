import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #A11D3B, #C9822E)",
        }}
      >
        <div style={{ fontSize: 100, display: "flex" }}>🏍️</div>
      </div>
    ),
    { ...size }
  );
}
