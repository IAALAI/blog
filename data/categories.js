import fs from "fs";

const category_title = fs.readdirSync("./src/categories").filter(value => {
    if (value == "index.njk" || value == "categories.json") {
        return false;
    }
    return value.lastIndexOf(".json") == value.length - 5
});

const items_content = []

for (let i = 0; i < category_title.length; i++) {
    items_content.push(JSON.parse(fs.readFileSync(`./src/categories/${category_title[i]}`)))
}

export default items_content