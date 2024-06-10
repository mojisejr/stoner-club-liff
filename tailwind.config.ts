import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        prompt: ["Prompt", ...fontFamily.sans],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#C40C0C",
          "primary-content": "#ffffff",
          secondary: "#151515",
          "secondary-content": "D89A17",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
} satisfies Config;
