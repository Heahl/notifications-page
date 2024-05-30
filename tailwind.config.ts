import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        'red': 'hsl(1, 90%, 64%)',
        'blue': 'hsl(219, 85%, 26%)',
        'very-light-grayish-blue': 'hsl(210, 60%, 98%)',
        'light-grayish-blue1': 'hsl(211, 68%, 94%)',
        'light-grayish-blue2': 'hsl(205, 33%, 90%)',
        'grayish-blue': 'hsl(219, 12%, 42%)',
        'dark-grayish-blue': 'hsl(219, 12%, 42%)',
        'very-dark-blue': 'hsl(224, 21%, 14%)',
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        pjsans: ["Plus Jakarta Sans", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
