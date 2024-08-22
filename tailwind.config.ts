import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				background: "#E0E0E0",
			},
			fontFamily: {
				sans: ["Hanken Grotesk", "sans-serif"],
				serif: ["EB Garamond", "serif"],
				// serif: ["Newsreader", "serif"],
				mono: ["JetBrains Mono", "monospace"],
			},
		},
	},
	plugins: [],
};
export default config;
