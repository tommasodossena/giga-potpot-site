import { createConfigForNuxt } from "@nuxt/eslint-config/flat";

export default createConfigForNuxt({
	files: ["src/**/*.{ts, tsx, vue}"],
	features: {
		stylistic: {
			semi: true,
			indent: 2,
			quotes: "double",
		},
	},
});
