import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      scrollbar: {
        thin: '2px',
        DEFAULT: '8px',
        rounded: '12px',
        colors: {
          thumb: '#888',
          track: '#f1f1f1',
          hover: '#555'
        }
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    nextui(),
    require("tailwind-scrollbar")
  ],
};
export default config;
