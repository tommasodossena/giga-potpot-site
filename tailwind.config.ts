import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/components/**/*.{vue,ts}",
    "./src/slices/**/*.{vue,ts}",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./src/app.vue",
    "./src/error.vue",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1536px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        pot: {
          yellow: "hsl(var(--pot-yellow))",
          green: "hsl(var(--pot-green))",
          blue: "hsl(var(--pot-blue))",
          red: "hsl(var(--pot-red))",
          purple: "hsl(var(--pot-purple))",
          orange: "hsl(var(--pot-orange))",
          pink: "hsl(var(--pot-pink))",
          brown: "hsl(var(--pot-brown))",
          gray: "hsl(var(--pot-gray))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        custom: ['Inter'],
      },
    },
  },
  plugins: [],
} satisfies Config;
