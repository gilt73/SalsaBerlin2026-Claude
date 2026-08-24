import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 8,
        }}
      >
        <div style={{ fontSize: 20, display: "flex" }}>🏍️</div>
      </div>
    ),
    { ...size }
  );
}
