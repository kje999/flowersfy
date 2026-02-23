const fs = require("fs");
const path = require("path");

const indexPath = path.join(process.cwd(), "index.html");
const buildId = process.env.BUILD_ID || String(Date.now());

let html = fs.readFileSync(indexPath, "utf8");

const replacements = [
  {
    regex: /href=(["'])\.\/dist\/styles\.css(?:\?v=[^"']*)?\1/,
    value: `href="./dist/styles.css?v=${buildId}"`
  },
  {
    regex: /src=(["'])i-still-believe\.mp3(?:\?v=[^"']*)?\1/,
    value: `src="i-still-believe.mp3?v=${buildId}"`
  }
];

replacements.forEach((entry) => {
  if (entry.regex.test(html)) {
    html = html.replace(entry.regex, entry.value);
  }
});

fs.writeFileSync(indexPath, html, "utf8");
console.log(`Cache bust ID applied: ${buildId}`);
