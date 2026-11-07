import js from "@eslint/js";
import tseslint from "typescript-eslint";
export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["app/src/App.tsx", "app/src/main.tsx"],
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        URLSearchParams: "readonly",
        URL: "readonly",
        HTMLElement: "readonly",
        HTMLTextAreaElement: "readonly",
      },
    },
  },
);
