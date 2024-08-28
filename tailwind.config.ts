import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        "dark": "rgba(23, 25, 35, 1)"
      },
      maxWidth: {
        "expand" : "1536px"
      },
      width:{
        "r1/2": "48%"
      }
    },
  },
  plugins: [],
};
export default config;
