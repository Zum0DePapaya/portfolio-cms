module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");

  // Create custom collections based on the 'category' frontmatter field
  eleventyConfig.addCollection("games", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/projects/*.md").filter(item => item.data.category === "games");
  });

  eleventyConfig.addCollection("tools", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/projects/*.md").filter(item => item.data.category === "tools");
  });

  return {
    pathPrefix: "/portfolio-cms/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};
