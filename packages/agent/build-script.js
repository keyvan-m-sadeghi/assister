const fs = require("fs-extra");

const updateBackgroundFile = buildPath => {
  const backgroundJS = `${buildPath}/background.js`;
  const assetManifest = `${buildPath}/asset-manifest.json`;
  const assetContents = JSON.parse(fs.readFileSync(assetManifest, "utf8"));

  const jsPlaceholder = 'const jsLocation = "./static/js/bundle.js";';
  const cssPlaceholder = "const cssLocation = null;";

  const jsLocation = `const jsLocation = "./${assetContents["main.js"]}";`;
  const cssLocation = `const cssLocation = "./${assetContents["main.css"]}";`;

  let backgroundContents = fs.readFileSync(backgroundJS, "utf8");
  backgroundContents = backgroundContents.replace(jsPlaceholder, jsLocation);
  backgroundContents = backgroundContents.replace(cssPlaceholder, cssLocation);

  // Write back the corrected script
  fs.writeFile(backgroundJS, backgroundContents, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("background.js updated.");
  });
};

module.exports = {
  updateBackgroundFile: updateBackgroundFile
};

if (require.main === module) {
  const buildPath = "./build";
  updateBackgroundFile(buildPath);
}
