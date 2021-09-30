import { renderMd } from "./lib/render";

global.plainText = [];

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary("md", { render: renderMd });
  eleventyConfig.on("afterBuild", () => {
    // Run me after the build ends
  });
  return {
    templateFormats: ["md", "11ty.js"],
    dir: {
      input: "site",
      data: "_data",
      output: "_site",
    },
  };
};
