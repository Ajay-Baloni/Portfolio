import { ImageResponse } from "next/og";

import { site } from "@/config/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card, generated at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#08080b",
          backgroundImage:
            "radial-gradient(circle at 18% 8%, rgba(124,92,255,0.38), transparent 45%), radial-gradient(circle at 88% 92%, rgba(34,211,238,0.28), transparent 45%)",
          color: "#f3f3f6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundImage: "linear-gradient(135deg, #7c5cff, #22d3ee)",
              fontSize: 30,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {site.shortName.charAt(0)}
          </div>
          <div style={{ fontSize: 28, color: "#9b9baa" }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              maxWidth: 900,
            }}
          >
            {site.hero.headline}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 30,
              color: "#9b9baa",
            }}
          >
            {site.role} · {site.location}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {site.stack.slice(0, 5).map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.12)",
                fontSize: 24,
                color: "#9b9baa",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
