module.exports = {
  plugins: [
    [
      "babel-plugin-macros",
      {
        twin: {
          preset: "styled-components",
          config: require.resolve("./tailwind.config.js"),
        },
      },
    ],
    "babel-plugin-styled-components",
    "@babel/plugin-transform-react-jsx",
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-react",
  ],
};
