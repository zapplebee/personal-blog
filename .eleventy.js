module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary("md", { render: (c) => c });
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy("site/public/clippy.png");
  eleventyConfig.on("afterBuild", () => {
    // Run me after the build ends
  });
  return {
    templateFormats: ["md", "11ty.js"],
    dir: {
      layout: "layout",
      input: "site",
      data: "_data",
      output: "_site",
    },
  };
};
