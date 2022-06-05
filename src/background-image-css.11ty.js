const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports.data = async function () {
    return {
        permalink: "/css/backgrounds.css",
    };
};

module.exports.render = async function () {
    let heroback = await Image("./src/images/layout/EVR_4188_PhotoEvrenCaglayan.jpg", {
        formats: ["webp", "jpeg"],
        widths: [425, 576, 768, 992, 1200, 1400, 1920],
        urlPath: "../images/optimized/backgrounds/",
        outputDir: "./_site/images/optimized/backgrounds/",
        filenameFormat: function (id, src, width, format, options) {
            const extension = path.extname(src);
            const name = path.basename(src, extension);
            return `${name}-${width}w.${format}`;
        },
    });
    return `
            @media (max-width:425px) {
                .no-webp .index-item-hero {
                    background: url(${heroback.jpeg[0].url}) bottom center no-repeat;
                    background-size: cover;
                }
                .webp .index-item-hero {
                    background: url(${heroback.webp[0].url}) bottom center no-repeat;
                    background-size: cover;
                }
            }
            @media (min-width:426px) {
                .no-webp .index-item-hero {
                    background: url(${heroback.jpeg[1].url}) bottom center no-repeat;
                    background-size: cover;
                }
                .webp .index-item-hero {
                    background: url(${heroback.webp[1].url}) bottom center no-repeat;
                    background-size: cover;
                }
            }
            @media (min-width:576px) {
                .no-webp .index-item-hero {
                    background: url(${heroback.jpeg[2].url}) bottom center no-repeat;
                    background-size: cover;
                }
                .webp .index-item-hero {
                    background: url(${heroback.webp[2].url}) bottom center no-repeat;
                    background-size: cover;
                }
            }
            @media (min-width:768px) {
                .no-webp .index-item-hero {
                    background: url(${heroback.jpeg[3].url}) bottom center no-repeat;
                    background-size: cover;
                }
                .webp .index-item-hero {
                    background: url(${heroback.webp[3].url}) bottom center no-repeat;
                    background-size: cover;
                }
            }
            @media (min-width:992px) {
                .no-webp .index-item-hero {
                    background: url(${heroback.jpeg[4].url}) bottom center no-repeat;
                    background-size: cover;
                }
                .webp .index-item-hero {
                    background: url(${heroback.webp[4].url}) bottom center no-repeat;
                    background-size: cover;
                }
            }
            @media (min-width:1200px) {
                .no-webp .index-item-hero {
                    background: url(${heroback.jpeg[5].url}) bottom center no-repeat;
                    background-size: cover;
                }
                .webp .index-item-hero {
                    background: url(${heroback.webp[5].url}) bottom center no-repeat;
                    background-size: cover;
                }
            }
            @media (min-width:1400px) {
                .no-webp .index-item-hero {
                    background: url(${heroback.jpeg[6].url}) bottom center no-repeat;
                    background-size: cover;
                }
                .webp .index-item-hero {
                    background: url(${heroback.webp[6].url}) bottom center no-repeat;
                    background-size: cover;
                }
            }
            
            `;
};
