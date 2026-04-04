  import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8B0000",
          hover: "#A50000",
          dark: "#6B0000",
        },
        background: "#FAFAFA",
        surface: "#FFFFFF",
        "surface-alt": "#F2F2F2",
        "surface-warm": "#FFF8F5",
        text: "#111111",
        "text-muted": "#555555",
        border: "#E0E0E0",
      },
      fontFamily: {
        heading: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "5px",
        sm: "3px",
        md: "5px",
        lg: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
