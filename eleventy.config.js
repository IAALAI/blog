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
    eleventyConfig.addTemplateFormats(["njs","n.js"]);
    eleventyConfig.addExtension("njs", { key: "njk" });
    eleventyConfig.addExtension("n.js", { key: "njk" });
    eleventyConfig.addPreprocessor("drafts", "md", (data, content) => {
		if(data.draft || data.hidden) {
			return false;
		}
	});
    eleventyConfig.addCollection("archive",(collectionsApi) => {
        const posts = collectionsApi.getAll()
            .filter(value => value.filePathStem.indexOf("/post/") == 0)
            .sort((a,b) => a.date - b.date),
            _archive_ = {},
            archive = [];
        for (let i = 0; i < posts.length; i++) {
            const year = posts[i].date.getFullYear();
            const month = posts[i].date.getMonth() + 1;
            if (!_archive_[year]) _archive_[year] = [];
            if (!_archive_[year][month]) _archive_[year][month] = [];

            _archive_[year][month].push(posts[i]);
        }
    
        for (const key in _archive_) {
            const item = _archive_[key],  y = [];
            y._id_ = key;
            for (const key2 in item) {
                y.push(item[key2])
                y[y.length - 1]._id_ = key;
                y[y.length - 1].year = key;
                y[y.length - 1].month = key2;
            }
            archive.push(y);
        }

        // archive._flat_ = archive.flat();
        return archive;
    });
    eleventyConfig.addCollection("tags",(collectionsApi) => {
        const posts = collectionsApi.getAll()
            .filter(value => value.filePathStem.indexOf("/post/") == 0)
            .sort((a,b) => a.date - b.date),
        _tags_ = {};
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
        const posts = collectionsApi.getAll()
            .filter(value => value.filePathStem.indexOf("/post/") == 0)
            .sort((a,b) => a.date - b.date),
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
            includes: "../includes",
            layouts: "../layouts",
            input: "src",
            data: "../data",
            output: "dist"
        },
        markdownTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
    }
}