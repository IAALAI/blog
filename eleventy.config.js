import fs from "fs";

const month_p = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const days_p = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function (eleventyConfig) {
    eleventyConfig.addPreprocessor("drafts", "md", (data, content) => {
		if(data.draft || data.hidden) {
			return false;
		}
        data.last = fs.statSync(data.page.inputPath).mtime; 
	});
  
    eleventyConfig.addPassthroughCopy({ "public" : "/"});
    eleventyConfig.addPassthroughCopy("post/*.jpg");
    eleventyConfig.addPassthroughCopy("post/*.png");
    eleventyConfig.addPassthroughCopy("post/*.avif");
    const _posts_ = [],_tags_ = []

    eleventyConfig.addCollection("posts", async (collectionsApi) => {
        const posts = collectionsApi.getAll().filter(value => value.filePathStem.indexOf("/post/") == 0);
        _posts_.length = 0
        _tags_.length = 0
        const tagSet = new Set();
        for(let i = 0; i < posts.length; i++) {
            if (posts[i].data.tags) {
                tagSet.add(...posts[i].data.tags)
            }
            _posts_.push({
                title: posts[i].data.title,
                tags: posts[i].data.tags,
                date: posts[i].date,
                Stem: posts[i].filePathStem,
                raw: posts[i].rawInput
            })
        }
        _tags_.push(...tagSet);
        fs.writeFileSync("./dist/assets/search.json", JSON.stringify(_posts_, null, 0), 'utf-8');
        return posts;
    });
    eleventyConfig.addGlobalData("tags",async () => _tags_);
    eleventyConfig.addNunjucksFilter("json", (v) => JSON.stringify(v));
    eleventyConfig.addNunjucksFilter("datep", (v) => `${v.getFullYear()}-${v.getMonth() + 1}-${v.getDate()} ${v.getHours()}:${v.getMinutes()} ${days_p[v.getDay()]} ${month_p[v.getMonth()]}`);
    eleventyConfig.addNunjucksFilter("text", (v) => v.replace(/\<.+?\>/g, ""));
    eleventyConfig.addNunjucksFilter("size", (v) => v.length);
    
    return {
        dir: {
            input: "src",
            data: "_data",
            layouts: "_includes/layouts",
            output: "dist"
        },
        markdownTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
    }
}