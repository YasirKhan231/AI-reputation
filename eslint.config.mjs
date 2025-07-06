// eslint.config.js
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
      // ❌ Turn off unused variable warnings
      "@typescript-eslint/no-unused-vars": "off",

      // ❌ Turn off JSX escape warnings
      "react/no-unescaped-entities": "off",

      // ✅ Optional: Allow prop spreading
      "react/jsx-props-no-spreading": "off",

      // ✅ Optional: Disable PropTypes (since you're using TypeScript)
      "react/prop-types": "off",

      // ✅ Allow empty functions (e.g., useEffect with no-op)
      "@typescript-eslint/no-empty-function": "off",
    },
  },
];
