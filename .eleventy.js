module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/favicon.png");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  const { EleventyRenderPlugin } = require("@11ty/eleventy");
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  const md = require("markdown-it")({ html: true });
  eleventyConfig.addFilter("markdownify", (content) => {
    return md.render(content || "");
  });

  const nunjucks = require("nunjucks");
  let njkEnv = new nunjucks.Environment();
  njkEnv.addFilter("url", function(url) {
    return url;
  });
  eleventyConfig.addFilter("renderNjk", function(content) {
    return njkEnv.renderString(content || "", this.ctx);
  });

  // Create a single collection for all projects
  eleventyConfig.addCollection("allProjects", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/projects/*.md")
      .sort((a, b) => (a.data.weight || 0) - (b.data.weight || 0));
  });

  // Filter for Nunjucks to dynamically get projects by category ID
  eleventyConfig.addFilter("filterByCategory", function(projects, categoryId) {
    if (!projects) return [];
    return projects.filter(p => p.data.category === categoryId);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};
