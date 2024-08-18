const purgecss = require("@fullhuman/postcss-purgecss");
const compiledpurgecss = () => {
    if(process.env.NODE_ENV == "production"){
        console.log("CSS purged!");
        return purgecss({
            content: ["./_site/*.html", "./_site/**/*.html", "./_site/**/**/*.html"],
            safelist: {
                standard: ["body", "show", "tiny-slider", "open", "[id*=-ow]", "item-content", "offcanvas-backdrop", "fade", "fa-xmark"],
                greedy: [/^tns/, /$-ow/, /$-mw/],
                deep: [/^tns/, /^item/, /^sayilarla-/, /$-ow/, /$-mw/],
            },
        })
    }
}
module.exports = {
    plugins: [
        require("autoprefixer"),
        compiledpurgecss(),
    ],
};
