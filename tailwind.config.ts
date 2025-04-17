import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darker: "var(--darker)",
        dark: "var(--dark)",
        blue: "var(--blue)",
        yellow: "var(--yellow)",
        light: "var(--light)",
        lavendar: "var(--lavendar)",
        platinum: "var(--platinum)"
      },
    },
  },
  plugins: [],
} satisfies Config;
