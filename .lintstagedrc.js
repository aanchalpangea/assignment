module.exports = {
  "src/**/*.{js,jsx,ts,tsx}": ["eslint --fix --quiet", "prettier --write"],
  "*.{json,css,md}": ["prettier --write"],
};
