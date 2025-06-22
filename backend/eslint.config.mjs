import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import noSecrets from "eslint-plugin-no-secrets"; 

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: [js.configs.recommended] 
  },
  { 
    files: ["**/*.js"], 
    languageOptions: { sourceType: "commonjs" } 
  },
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    languageOptions: { globals: globals.node } 
  },
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    plugins: {
      "no-secrets": noSecrets,
    },
    rules: {
      "no-secrets/no-secrets": [
        "error", // Set it to error
        {
          "ignoreContent": "", // Not ignoring anything specific here
          "tolerance": 5.0, // Lower the entropy tolerance (default is higher, like 4.0 or more) - smaller number = more aggressive
          "maxEntropy": 10.0, // Max entropy, usually fine as default
          "trim": true, // Trim whitespace
          // You can also add custom regex patterns to look for.
          // For a simple test, let's explicitly look for 'sk-' followed by letters/numbers.
          "ignorePatterns": [
             "^(sk-|SG\\.)$" // This would ignore actual API key prefixes, we want to detect them
          ],
          "customDetectors": [
            {
              "type": "string",
              "pattern": "sk-[a-zA-Z0-9]{32,}", // Detect 'sk-' followed by at least 32 alphanumeric chars
              "message": "Potential hardcoded API key found (custom regex)"
            }
          ]
        }
      ]
    },
  },
]);