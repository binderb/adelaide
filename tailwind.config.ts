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
        'primary' : `rgba(${process.env.NEXT_PUBLIC_BRANDING_PRIMARY}, <alpha-value>)`,
        'primaryHover' : `color-mix(in srgb, white 20%, rgb(${process.env.NEXT_PUBLIC_BRANDING_PRIMARY}))`,
        'primaryHighlight' : `color-mix(in srgb, white 10%, rgb(${process.env.NEXT_PUBLIC_BRANDING_PRIMARY}))`,
        'secondary' : `rgba(${process.env.NEXT_PUBLIC_BRANDING_SECONDARY}, <alpha-value>)`,
        'appRed' : `rgba(255, 64, 102, <alpha-value>)`, //`rgba(255, 34, 0, <alpha-value>)`,
        'appGreen' : `rgba(24, 176, 59, <alpha-value>)`,
        'appOrange' : `rgba(255, 146, 57, <alpha-value>)`,
        'appYellow' : `rgba(255, 217, 0, <alpha-value>)`,
        'appBlue' : `rgba(8, 172, 255, <alpha-value>)`,
        'appPurple' : `rgba(128, 0, 255, <alpha-value>)`,
        'secondaryHover' : `color-mix(in srgb, white 20%, rgb(${process.env.NEXT_PUBLIC_BRANDING_SECONDARY}))`,
        'secondaryHighlight' : `color-mix(in srgb, white 10%, rgb(${process.env.NEXT_PUBLIC_BRANDING_SECONDARY}))`,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
