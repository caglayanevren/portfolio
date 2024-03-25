const cssLink = "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;900&family=Playfair+Display:wght@400;700;900&display=swap";

async function getCss(page) {
    const myRequest = new Request(page);
    return await fetch(myRequest)
        .then((res) => res.text())
        .then((text) => {
            return [...new Set(text.match(new RegExp(/\/v(\d+)\//, "g")))];
        });
}

module.exports = async function () {
    return await getCss(cssLink);
};
