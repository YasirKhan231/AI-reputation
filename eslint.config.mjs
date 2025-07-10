import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create FlatCompat for legacy-style configs like Next.js
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // ✅ Extend Next.js and TypeScript base config
  ...compat.extends(
    "next/core-web-vitals",
    "next",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ),

  // ✅ Add your own custom rules
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react/no-unescaped-entities": "off",
      "react/jsx-props-no-spreading": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-empty-function": "off",

      // ✅ DISABLE Next.js warnings for <img> and <a>
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",

      // ✅ DISABLE 'any' type restriction
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
