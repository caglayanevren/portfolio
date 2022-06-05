const fs = require("fs");
const path = require("path");
const util = require("util");
const copyFilePromise = util.promisify(fs.copyFile);
const replace = require("replace-in-file");
const escapeRegExp = require("lodash.escaperegexp");

let baseDir = "docs";

fs.readdir(`./${baseDir}`, (err, files) => {
    let arrayOfFiles1 = [];
    let arrayOfFiles2 = [];
    let arrayOfFiles3 = [];

    files.forEach((file) => {
        if (path.extname(file) == ".html" || path.extname(file) == ".js") {
            arrayOfFiles1.push(path.join(__dirname, baseDir, "/", file));
            //console.log("arrayOfFiles1 array: ", arrayOfFiles1);
            //console.log("arrayOfFiles1 array length: ", arrayOfFiles1.length);
            arrayOfFiles1.forEach((arrayOfFiles1Item) => {
                let options = {
                    files: arrayOfFiles1Item,
                    from: [new RegExp(escapeRegExp('="assets/'), "g"), new RegExp(escapeRegExp(", assets/"), "g")],
                    to: ['="./assets/', ", ./assets/"],
                };
                try {
                    let changedFiles = replace.sync(options);
                    console.log("Modified files:", changedFiles.join(", "));
                } catch (error) {
                    console.error("Error occurred:", error);
                }
            });
        } else if (fs.statSync(baseDir + "/" + file).isDirectory()) {
            fs.readdir(`./${baseDir}/${file}`, (err, fler) => {
                fler.forEach((f) => {
                    if (path.extname(f) == ".html" || path.extname(f) == ".js") {
                        arrayOfFiles2.push(path.join(__dirname, baseDir, "/", file, "/", f));
                        arrayOfFiles2.forEach((arrayOfFiles2Item) => {
                            let options = {
                                files: arrayOfFiles2Item,
                                from: [new RegExp(escapeRegExp('="assets/'), "g"), new RegExp(escapeRegExp(", assets/"), "g")],
                                to: ['="../assets/', ", ../assets/"],
                            };
                            try {
                                let changedFiles = replace.sync(options);
                                console.log("Modified files:", changedFiles.join(", "));
                            } catch (error) {
                                console.error("Error occurred:", error);
                            }
                        });
                    } else if (fs.statSync(baseDir + "/" + file + "/" + f).isDirectory()) {
                        fs.readdir(`./${baseDir}/${file}/${f}`, (err, dosyalar) => {
                            dosyalar.forEach((dosya) => {
                                if (path.extname(dosya) == ".html" || path.extname(dosya) == ".js") {
                                    arrayOfFiles3.push(path.join(__dirname, baseDir, "/", file, "/", f, "/", dosya));
                                    arrayOfFiles3.forEach((arrayOfFiles3Item) => {
                                        let options = {
                                            files: arrayOfFiles3Item,
                                            from: [new RegExp(escapeRegExp('="assets/'), "g"), new RegExp(escapeRegExp(", assets/"), "g")],
                                            to: ['="../../assets/', ", ../../assets/"],
                                        };
                                        try {
                                            let changedFiles = replace.sync(options);
                                            console.log("Modified files:", changedFiles.join(", "));
                                        } catch (error) {
                                            console.error("Error occurred:", error);
                                        }
                                    });
                                }
                            });
                            //console.log("arrayOfFiles3 array: ", arrayOfFiles3);
                            //console.log("arrayOfFiles3 array length: ", arrayOfFiles3.length);
                        });
                    }
                });
                //console.log("arrayOfFiles2 array: ", arrayOfFiles2);
                //console.log("arrayOfFiles2 array length: ", arrayOfFiles2.length);
            });
        }
    });
});
