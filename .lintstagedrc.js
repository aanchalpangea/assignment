module.exports = {
  // Lint & Prettify TS and JS files
  "**/*.{ts,tsx,js,jsx}": [
    "prettier --write",
    "eslint --fix",
    "tsc --noEmit"
  ],

  // Prettify only Markdown and JSON files
  "**/*.{md,json}": "prettier --write"
}; 