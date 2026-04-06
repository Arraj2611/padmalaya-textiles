/** Porcelain Canopy design tokens — keep in sync with globals.css @theme */

export const colors = {
  porcelain:  "#F5F8F7",
  pearl:      "#F3F6F4",
  mist:       "#EEF3F1",
  frost:      "#F0F4F2",
  cloud:      "#F7F9F8",
  ink:        "#14221e",
  inkSoft:    "#2d4a42",
  forest:     "#0d281f",
  moss:       "#1e4d3f",
  pine:       "#243D36",
  brass:      "#b8955c",
  brassDeep:  "#7a5f32",
} as const;

export type ColorKey = keyof typeof colors;

/** Frosted-glass surface */
export function glass(blurPx: number, extra: React.CSSProperties = {}): React.CSSProperties {
  return {
    background: "rgba(255, 255, 255, 0.46)",
    WebkitBackdropFilter: `saturate(1.12) blur(${blurPx}px)`,
    backdropFilter: `saturate(1.12) blur(${blurPx}px)`,
    boxShadow: [
      "inset 0 0 0 1px rgba(36, 61, 54, 0.12)",
      "inset 2px 3px 16px rgba(255,255,255,0.58)",
      "0 18px 52px rgba(13, 40, 31, 0.055)",
    ].join(", "),
    ...extra,
  };
}

/** Neumorphic shadows */
export const neu   = "12px 12px 28px rgba(13,40,31,.1), -10px -10px 26px rgba(255,255,255,.9)";
export const neuSm = "6px 6px 18px rgba(13,40,31,.085), -6px -6px 18px rgba(255,255,255,.84)";
export const neuIn = "inset 6px 6px 16px rgba(13,40,31,.085), inset -5px -5px 14px rgba(255,255,255,.6)";

/** Animated silk background (use with silkDrift keyframe) */
export function silkBase(extra: React.CSSProperties = {}): React.CSSProperties {
  return {
    backgroundColor: colors.pearl,
    backgroundImage: [
      "linear-gradient(105deg, rgba(255,255,255,.92) 0%, rgba(238,243,241,.42) 25%, rgba(255,255,255,.88) 50%, rgba(230,240,236,.48) 75%, rgba(255,255,255,.94) 100%)",
      "radial-gradient(ellipse 80% 60% at 18% 28%, rgba(30,77,63,.055) 0%, transparent 55%)",
      "radial-gradient(ellipse 72% 52% at 86% 72%, rgba(184,149,92,.075) 0%, transparent 50%)",
      `linear-gradient(180deg, ${colors.mist} 0%, ${colors.cloud} 100%)`,
    ].join(", "),
    backgroundSize: "200% 200%, 100% 100%, 100% 100%, 100% 100%",
    animation: "silkDrift 20s ease-in-out infinite",
    ...extra,
  };
}

/** Gold gradient accent */
export const goldGradient = `linear-gradient(135deg, ${colors.brass}, #e8d4b0)`;
