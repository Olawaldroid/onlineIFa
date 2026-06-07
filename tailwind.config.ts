import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Earthy palette inspired by traditional Ifá divination materials.
        ifa: {
          bg: "#1a140f",
          surface: "#241b14",
          border: "#3a2c20",
          gold: "#c9a227",
          rust: "#a8431f",
          cream: "#f3e9d9",
          sage: "#7c8a5a",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
