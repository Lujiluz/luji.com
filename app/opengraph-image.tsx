import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Luji Space Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(to bottom right, #000000, #1a1a1a)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        color: "white",
      }}
    >
      <div style={{ fontSize: 120, fontWeight: "bold", marginBottom: 20 }}>Lj.</div>
      <div style={{ fontSize: 40, opacity: 0.8 }}>Luji Space | Fullstack Developer</div>
      <div
        style={{
          marginTop: 40,
          padding: "10px 20px",
          border: "1px solid #444",
          borderRadius: 20,
          fontSize: 24,
        }}
      >
        luji-space.vercel.app
      </div>
    </div>,
    { ...size },
  );
}
