import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import security from "eslint-plugin-security"; // <-- Make sure this line is here

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: [js.configs.recommended] 
  },
  // This part ensures CommonJS modules are handled correctly
  { 
    files: ["**/*.js"], 
    languageOptions: { sourceType: "commonjs" } 
  },
  // This part provides Node.js globals like 'require', 'module', 'process'
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    languageOptions: { globals: globals.node } 
  },
  // --- ADD THIS BLOCK FOR SECURITY PLUGIN ---
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"], // Apply to all relevant JS files
    plugins: {
      security, // Register the security plugin
    },
    rules: {
      ...security.configs.recommended.rules, // Apply the recommended security rules
      // You can also add specific rules here if you want to be extra sure, like:
      // "security/detect-unsafe-regex": "error", // Good for testing, but might be too broad for prod
      // "security/detect-non-literal-require": "error" // This is a good one for secrets
    },
  },
  // --- END OF SECURITY BLOCK ---
]);