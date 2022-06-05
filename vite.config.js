/**
 * @type {import('vite').UserConfig}
 */
import { defineConfig } from "vite";
const path = require("path");
const glob = require("fast-glob");
const root = path.resolve(__dirname, "_site");
const outDir = path.resolve(__dirname, "dist");

// Find all HTML files and build an object of names and paths to work from
const files = glob.sync(path.resolve(__dirname, "_site") + "/**/*.html").reduce((acc, cur) => {
    let name = cur.replace(path.join(__dirname) + "/_site/", "").replace("/index.html", "");
    // If name is blank, make up a name for it, like 'home'
    if (name === "") {
        name = "home";
        console.log("😱 😱 😱 😱 😱 😱 😱");
    }
    if (name === "index.html") {
        name = "index";
    }

    acc[name] = cur;
    return acc;
}, {});

console.log("FILES: ", files);

export default defineConfig({
    root,
    base: "",
    build: {
        outDir,
        rollupOptions: {
            input: files,
        },
        emptyOutDir: true,
    },
    plugins: [],
});
