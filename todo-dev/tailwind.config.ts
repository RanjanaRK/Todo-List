import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|card|divider|dropdown|image|input|link|modal|navbar|skeleton|ripple|spinner|menu|popover).js",
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
  darkMode: "class",
};
export default config;
