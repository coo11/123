import fs from "fs";
import yaml from "js-yaml";
import Spritesmith from "spritesmith";
import SVGSpriter from "svg-sprite";
import CleanCSS from "clean-css";
import del from "rollup-plugin-delete";
import copy from "rollup-plugin-copy";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import render from "./src/render.mjs";
import { rejects } from "assert";

const temp = "temp/";
if (fs.existsSync(temp)) fs.rmSync(temp, { recursive: true });
fs.mkdirSync(temp);

const parser = {
  init() {
    try {
      this.config = yaml.load(fs.readFileSync("config.yml", "utf8"));
      //console.log(this.config);
      this.src = new Set(
        this.config.bookmark
          .filter(i => i.favicon)
          .map(({ favicon: f, faviconAlt: fa }) => {
            return fa ? [f, fa] : f;
          })
          .flat()
      );
    } catch (e) {
      console.log(e);
    }
  },
  pick({ png = true, pngToUse = false }, path) {
    let files = fs.readdirSync(path).filter(i => {
      return (
        fs.statSync(`${path}${i}`).isFile() &&
        i.toLowerCase().endsWith(".png") === png
      );
    });
    if (png && pngToUse) {
      files = files.filter(i => this.src.has(i));
    }
    return files;
  }
};

parser.init();
let spriteCss = "\n";
const generateSprite = sideLength =>
  new Promise((resolve, reject) => {
    const logoPath = `./src/img/${sideLength}/`;
    Spritesmith.run(
      {
        src: parser
          .pick({ png: true, pngToUse: true }, logoPath)
          .map(i => `${logoPath}${i}`),
        padding: 2
      },
      (err, { image, coordinates, properties }) => {
        err && reject(err);
        const spriteName = `sprite${sideLength}.png`;
        const { width, height } = properties;
        fs.writeFileSync(temp + spriteName, image);

        if (sideLength === 32) {
          let spriteCssAlt = [];
          for (let path in coordinates) {
            let { x, y } = coordinates[path],
              className = "." + path.split("/").pop().slice(0, -4);
            if (className.endsWith("_d")) {
              className = className.split("_d")[0];
              spriteCssAlt.push(
                `${className} { background-position:` +
                  ` ${(100 * x) / (width - sideLength)}% ${
                    (100 * y) / (height - sideLength)
                  }%; }`
              );
            } else {
              spriteCss +=
                // https://blog.vjeux.com/2012/image/css-understanding-percentage-background-position.html
                `\n${className} { background-position:` +
                ` ${(100 * x) / (width - sideLength)}% ${
                  (100 * y) / (height - sideLength)
                }%; }`;
            }
          }
          if (spriteCssAlt.length) {
            spriteCss += spriteCssAlt
              .map(i => "\nbody[current-theme=dark] " + i)
              .join("");
            spriteCss +=
              "\n@media (prefers-color-scheme: dark) {\n" +
              spriteCssAlt.join("\n") +
              "\n}";
          }
        }

        const backgroundCss =
          // Specificity: (0, 3, 0)
          ".C > .D > .E { background-image: url(" +
          spriteName +
          "); background-size: " +
          `${(width * 16) / sideLength}px ` +
          `${(height * 16) / sideLength}px; }`;
        if (sideLength > 32) {
          spriteCss += `\n@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) { ${backgroundCss} }`;
        } else spriteCss += `\n${backgroundCss}`;
        resolve(true);
      }
    );
  });

await generateSprite(32);
await generateSprite(64);
const style = fs.readFileSync("./src/css/style.css", "utf8");
fs.writeFileSync(temp + "style.css", style + spriteCss);

const svgPath = "./src/img/search/";
const svgs = fs.readdirSync(svgPath);
const svgSpriter = new SVGSpriter({
  svg: {
    xmlDeclaration: false,
    doctypeDeclaration: false
  },
  shape: {
    transform: [
      {
        svgo: {
          plugins: [
            "cleanupAttrs",
            "removeDoctype",
            "removeXMLProcInst",
            "removeComments",
            "removeMetadata",
            "removeTitle",
            "removeDesc",
            "removeUselessDefs",
            "removeEditorsNSData",
            "removeEmptyAttrs",
            "removeHiddenElems",
            "removeEmptyText",
            "removeEmptyContainers",
            // 'removeViewBox',
            "cleanupEnableBackground",
            "convertStyleToAttrs",
            "convertPathData",
            "convertTransform",
            "removeUnknownsAndDefaults",
            "removeNonInheritableGroupAttrs",
            "removeUselessStrokeAndFill",
            "removeUnusedNS",
            // "cleanupIDs",
            "cleanupNumericValues",
            "moveElemsAttrsToGroup",
            "moveGroupAttrsToElems",
            "collapseGroups",
            // 'removeRasterImages',
            "mergePaths",
            "convertShapeToPath",
            "sortAttrs",
            "removeDimensions",
            //{ name: "removeAttrs", params: { attrs: "(stroke|fill)" } }
            "removeXMLNS"
          ]
        }
      }
    ]
  },
  mode: { symbol: true }
});
for (const svg of svgs) {
  const filepath = svgPath + svg;
  svgSpriter.add(filepath, null, fs.readFileSync(filepath, "utf-8"));
}
const { result } = await svgSpriter.compileAsync();
fs.writeFileSync(temp + "sprite.svg", result.symbol.sprite.contents);

const index = render(parser.config);
fs.writeFileSync(temp + "index.html", index);

export default {
  input: "src/js/index.js",
  output: {
    file: "dist/assets/index.js",
    format: "iife",
    sourcemap: false
  },
  plugins: [
    del({ targets: "dist/*" }),
    copy({
      targets: [
        {
          src: [
            "temp/index.html",
            "src/apple-touch-icon.png",
            "src/favicon.ico"
          ],
          dest: "dist"
        },
        {
          src: ["temp/sprite32.png", "temp/sprite64.png", "temp/sprite.svg"],
          dest: "dist/assets"
        },
        {
          src: "temp/style.css",
          dest: "dist/assets",
          transform: contents => new CleanCSS().minify(contents).styles
        }
      ]
    }),
    commonjs({
      include: /node_modules/ // https://github.com/rollup/rollup-plugin-commonjs/issues/361#issuecomment-445214136
    }),
    resolve({
      browser: true
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      presets: ["@babel/preset-env"]
    }),
    terser()
  ]
};
