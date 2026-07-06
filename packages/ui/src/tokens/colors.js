export const colors = {
  // Brand
  primary: {
    DEFAULT: "#FF6B35",
    hover: "#E55A28",
    light: "#FF8F61",
    muted: "rgba(255,107,53,0.12)",
  },
  secondary: {
    DEFAULT: "#FFB627",
    hover: "#E6A31F",
    light: "#FFC94D",
    muted: "rgba(255,182,39,0.12)",
  },
  accent: {
    DEFAULT: "#7C3AED",
    hover: "#6D28D9",
    light: "#A78BFA",
    muted: "rgba(124,58,237,0.12)",
  },

  // Neutrals (dark theme base)
  dark: { DEFAULT: "#0A0A0A", 50: "#0F0F0F", 100: "#141414", 200: "#1A1A1A" },
  surface: {
    DEFAULT: "#121212",
    raised: "#1A1A1A",
    overlay: "#242424",
    border: "rgba(255,255,255,0.06)",
  },

  // Text
  text: {
    primary: "#FFFFFF",
    secondary: "#A1A1AA",
    muted: "#71717A",
    inverse: "#0A0A0A",
  },

  // Semantic
  success: { DEFAULT: "#22C55E", muted: "rgba(34,197,94,0.12)" },
  warning: { DEFAULT: "#F59E0B", muted: "rgba(245,158,11,0.12)" },
  error: { DEFAULT: "#EF4444", muted: "rgba(239,68,68,0.12)" },
  info: { DEFAULT: "#3B82F6", muted: "rgba(59,130,246,0.12)" },

  // Status colors (order/table)
  status: {
    pending: {
      bg: "rgba(245,158,11,0.12)",
      text: "#F59E0B",
      border: "rgba(245,158,11,0.25)",
    },
    accepted: {
      bg: "rgba(59,130,246,0.12)",
      text: "#3B82F6",
      border: "rgba(59,130,246,0.25)",
    },
    preparing: {
      bg: "rgba(124,58,237,0.12)",
      text: "#A78BFA",
      border: "rgba(124,58,237,0.25)",
    },
    ready: {
      bg: "rgba(34,197,94,0.12)",
      text: "#22C55E",
      border: "rgba(34,197,94,0.25)",
    },
    served: {
      bg: "rgba(161,161,170,0.12)",
      text: "#A1A1AA",
      border: "rgba(161,161,170,0.25)",
    },
    cancelled: {
      bg: "rgba(239,68,68,0.12)",
      text: "#EF4444",
      border: "rgba(239,68,68,0.25)",
    },
  },
};
