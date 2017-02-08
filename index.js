const JSZip = require('jszip');

function ZipBundler(options) {
    const { out, path, regex } = options || {};
    this.outFile = `${path || '.'}/${out || 'out.zip'}`;
    this.regex = regex;
}

ZipBundler.prototype.apply = function(compiler) {
    const regex = this.regex;

    compiler.plugin("emit", function(compilation, callback) {
        const jszip = new JSZip();
        addAssetsToZip(jszip, compilation.assets, regex);
        console.log("start compression");
        jszip.generateAsync({ type: "nodebuffer", compression: "DEFLATE", streamFiles: true },
            ({ currentFile, percent }) => logProgress(currentFile, percent))
            .then(function(content) {
                console.log("\ncompression finished", content.length);
                compilation.assets["out.zip"] = { source: () => content, size: () => content.length };
                callback();
            })
            .catch((error) => {
                console.log("failed to create zip", error);
                callback();
            });
    });
};

function logProgress(file, progress) {
    if (!file) return;
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`${progress}% ${file}`);
}

function addAssetsToZip(jszip, assets, regex) {
    const assetNames = Object.keys(assets).filter(x => !!regex ? regex.test(x) : true);
    assetNames.forEach(x => jszip.file(x, assets[x].source()));
}

module.exports = ZipBundler;