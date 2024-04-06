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
