import fs from "fs";

const month_p = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const days_p = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({
        "public": "/",
        "src/assets": "/assets",
        "src/post": "/post",
    });
    eleventyConfig.addPreprocessor("drafts", "md", (data, content) => {
		if(data.draft || data.hidden) {
			return false;
		}
        data.last = fs.statSync(data.page.inputPath).mtime; 
	});
  
    eleventyConfig.addCollection("posts",(collectionsApi) => {
        const posts = collectionsApi.getAll()
                .filter(value => value.filePathStem.indexOf("/post/") == 0)
                .sort((a,b) => a.date - b.date),
            _posts_ = []
        for(let i = 0; i < posts.length; i++) {
            _posts_.push({
                title: posts[i].data.title,
                tags: posts[i].data.tags,
                date: posts[i].date,
                Stem: posts[i].filePathStem,
                raw: posts[i].rawInput
            })
        }
        // fs.writeFileSync("./dist/assets/search.json", JSON.stringify(_posts_, null, 0), 'utf-8');
        return posts;
    });
    eleventyConfig.addCollection("archive",(collectionsApi) => {
        const posts = collectionsApi.getAll().filter(value => value.filePathStem.indexOf("/post/") == 0),_archive_ = {};
        for (let i = 0; i < posts.length; i++) {
            const d = posts[i].date.getFullYear() * 12 + (posts[i].date.getMonth() + 1);
            if (!_archive_[d]) _archive_[d] = [];
            _archive_[d].push(posts[i])
        }
        
        const archive = [];
        for (const key in _archive_) {
            archive.push({
                key: key,
                year: Math.floor(key / 12),
                month: key % 12,
                value: _archive_[key]
            })
        }
        return archive;
    });
    eleventyConfig.addCollection("tags",(collectionsApi) => {
        const posts = collectionsApi.getAll().filter(value => value.filePathStem.indexOf("/post/") == 0),_tags_ = {};
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].data.tags?.length) {
                for (const value of posts[i].data.tags) {
                    if (!_tags_[value]) _tags_[value] = 0;
                    _tags_[value]++;
                }
            }
        }
        const tags = [];
        for (const key in _tags_) {
            tags.push({
                key,
                value: _tags_[key]
            })
        }
        return tags
    });
    eleventyConfig.addCollection("cetegories",(collectionsApi) => {
        const posts = collectionsApi.getAll().filter(value => value.filePathStem.indexOf("/post/") == 0),
            cetegories = {};
        for (const v of posts) {
            v.data.category = v.data.category || "none";
            if (!cetegories[v.data.category]) cetegories[v.data.category] = [];
            cetegories[v.data.category].push(v)
        }
        return cetegories
    });
    eleventyConfig.addNunjucksFilter("json", (v) => JSON.stringify(v));
    eleventyConfig.addNunjucksFilter("text", (v) => v.replace(/\<.+?\>/g, ""));
    eleventyConfig.addNunjucksFilter("size", (v) => v.length);
    eleventyConfig.addNunjucksFilter("math", function(source, mode, ...args) {
        let target = args.indexOf("target");
        if (target != -1) {
            args[args.indexOf("temp")] = source
            return Math[mode](...args);
        } else {
            return Math[mode](source, ...args);
        }
    });
    eleventyConfig.addNunjucksFilter("datep",function (v) {
        if (!v instanceof Date) return v;
        const Year = v.getFullYear(),
            Month = v.getMonth(),
            Day = v.getDate(),
            Hours = v.getHours(),
            Minutes = v.getMinutes(),
            weak_it = v.getDay();
        return `${Year}-${Month + 1}-${Day} ${Hours}:${Minutes} ${days_p[weak_it]} ${month_p[Month]}`;
    });

    return {
        dir: {
            input: "src",
            data: "../data",
            includes: "../includes",
            layouts: "../layouts",
            output: "dist"
        },
        markdownTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
    }
}