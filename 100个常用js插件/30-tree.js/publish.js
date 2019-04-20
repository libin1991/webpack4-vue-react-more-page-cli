const path = require("path");
const fs = require("fs-extra");
const pluginName = __dirname.split(path.sep).pop();
const pluginPath = path.join(__dirname, "docs");
const demoPath = path.join(__dirname, "../docs", pluginName);

// Publish
fs.remove(demoPath).then(err => {
  if (err) return console.error(err);
  fs.copy(pluginPath, demoPath, err => {
    if (err) return console.error(err);
  });
});
