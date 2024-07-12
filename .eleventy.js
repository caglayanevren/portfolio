const fs = require("fs");
const path = require("path");
const Image = require("@11ty/eleventy-img");
const slugify = require("slugify");
const markdownIt = require("markdown-it");
const milt = require("markdown-it-link-target");
const filters = require("./src/utils/filters");
/**
 * @typedef {import('@11ty/eleventy/src/UserConfig')} EleventyConfig
 * @typedef {ReturnType<import('@11ty/eleventy/src/defaultConfig')>} EleventyReturnValue
 * @type {(config: EleventyConfig) => EleventyReturnValue}
 */

function imageShortcode(src, alt, sizes = "100vw", widths, formats, classes, urlPaths, loading) {
    console.log(`Generating image(s) from:  ${src}`);
    let options = {
        widths: widths,
        formats: formats,
        //urlPath: urlPaths,
        outputDir: "./_site/images/optimized/",
        filenameFormat: function (id, src, width, format, options) {
            const extension = path.extname(src);
            const name = path.basename(src, extension);
            return `${name}-${width}w.${format}`;
        },
    };

    // generate images
    Image(src, options);

    let imageAttributes = {
        alt,
        sizes,
        class: classes,
        loading: loading,
        decoding: "async",
    };
    // get metadata
    metadata = Image.statsSync(src, options);
    //console.log(metadata);
    return Image.generateHTML(metadata, imageAttributes);
}
async function asyncImageShortcode(src, alt, sizes = "100vw", classes) {
    if (alt === undefined) {
        // You bet we throw an error on missing alt (alt="" works okay)
        throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
    }
    let metadata = await Image(src, {
        formats: ["webp", "jpeg"],
        widths: [311, 589, 454, 733, 910, 460, 684, 1000],
        outputDir: "_site/img/",
        sizes,
    });
    let lowsrc = metadata.jpeg[0];
    let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

    return `<picture>
        ${Object.values(metadata)
            .map((imageFormat) => {
                return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map((entry) => entry.srcset).join(", ")}" sizes="${sizes}">`;
            })
            .join("\n")}
        <img
        src="${lowsrc.url}"
        width="${highsrc.width}"
        height="${highsrc.height}"
        alt="${alt}"
        class="${classes}"
        loading="lazy"
        decoding="async">
    </picture>`;
}

const markdown = new markdownIt({
    html: false,
    breaks: true,
    linkify: false,
});

module.exports = function (config) {
    config.setWatchJavaScriptDependencies(false);
    config.setNunjucksEnvironmentOptions({ throwOnUndefined: true });
    config.addWatchTarget("./src/styles/scss/");
    config.addWatchTarget("./src/js/");

    config.addNunjucksTag("uppercase", function (nunjucksEngine) {
        return new (function () {
            this.tags = ["uppercase"];
            this.parse = function (parser, nodes, lexer) {
                var tok = parser.nextToken();
                var args = parser.parseSignature(null, true);
                parser.advanceAfterBlockEnd(tok.value);
                return new nodes.CallExtensionAsync(this, "run", args);
            };
            this.run = function (context, myStringArg, callback) {
                let ret = new nunjucksEngine.runtime.SafeString(myStringArg.toLocaleUpperCase("TR"));
                callback(null, ret);
            };
        })();
    });

    config.addNunjucksShortcode("sectiontitle", function (title, color) {
        return `<h2 class="${color} bold mb-5">${title}</h2>`;
    });

    config.addNunjucksShortcode("borderbutton", function (text, link, relative_path, variant) {
        if (variant == "white") {
            return `<a href="${relative_path}${link}" target="_blank"><button class="px-4 py-2 text-white bg-transparent border-1 border-white fs-sm light">${text}</button></a>`;
        } else if (variant == "blue") {
            return `<a href="${relative_path}${link}" target="_blank"><button class="px-4 py-2 backblue bg-white border-0 fs-sm light">${text}</button></a>`;
        }
    });

    config.addShortcode("image", imageShortcode);
    config.addShortcode("asyncimage", asyncImageShortcode);

    config.addFilter("slug", (input) => {
        const options = {
            replacement: "-",
            remove: /[&,’+()$~%.'":*?<>{}]/g,
            lower: true,
            customReplacements: [
                ["Ö", "o"],
                ["ö", "o"],
                ["Ü", "u"],
                ["ü", "u"],
                ["Ş", "s"],
                ["ş", "s"],
                ["Ğ", "g"],
                ["ğ", "g"],
                ["Ç", "c"],
                ["ç", "c"],
                ["İ", "i"],
                ["ı", "i"],
                [".", ""],
                ["’", ""],
                ["’", ""],
                ["’", ""],
            ],
        };
        return slugify(input, options);
    });

    config.addFilter("markdown", (rawString) => {
        markdown.use(milt);
        return markdown.render(rawString);
    });

    //config.addGlobalData("notionApiKey", process.env.NOTION_API_KEY);
    //config.addGlobalData("notionDatabaseId", process.env.NOTION_DATABASE_ID);
    //config.addGlobalData("notionWorksBlockId", process.env.NOTION_WORKSBLOCK_ID);

    // Filters
    Object.keys(filters).forEach((filterName) => {
        config.addFilter(filterName, filters[filterName]);
    });

    // Static assets to pass through
    config.addPassthroughCopy("./src/images");
    config.addPassthroughCopy("./src/public");
    config.addPassthroughCopy("./src/js/anasayfa.js");
    config.addPassthroughCopy("./src/js/main.js");
    config.addPassthroughCopy("./src/js/modernizr.js");
    return {
        dir: {
            input: "src",
            output: "_site",
        },
        passthroughFileCopy: true,
        templateFormats: ["html", "md", "njk", "11ty.js"],
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
    };
};
