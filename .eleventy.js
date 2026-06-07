module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");

  // Create custom collections based on the 'category' frontmatter field
  eleventyConfig.addCollection("games", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/projects/*.md")
      .filter(item => item.data.category === "games")
      .sort((a, b) => (a.data.weight || 0) - (b.data.weight || 0));
  });

  eleventyConfig.addCollection("tools", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/projects/*.md")
      .filter(item => item.data.category === "tools")
      .sort((a, b) => (a.data.weight || 0) - (b.data.weight || 0));
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
