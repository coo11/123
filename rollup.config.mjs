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

const temp = "temp/";
if (fs.existsSync(temp)) fs.rmSync(temp, { recursive: true });
fs.mkdirSync(temp);

const logoPath = "./src/img/logo/";
const parser = {
  init() {
    try {
      this.config = yaml.load(fs.readFileSync("config.yml", "utf8"));
      //console.log(this.config);
      this.src = new Set(
        this.config.bookmark.filter(i => i.favicon).map(i => i.favicon)
      );
    } catch (e) {
      console.log(e);
    }
  },
  pick({ png = true, pngToUse = false }) {
    let files = fs.readdirSync(logoPath).filter(i => {
      return (
        fs.statSync(`${logoPath}${i}`).isFile() &&
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

Spritesmith.run(
  {
    src: parser.pick({ png: true, pngToUse: true }).map(i => `${logoPath}${i}`),
    padding: 2
  },
  (err, { image, coordinates, properties }) => {
    err && reject(err);

    const spriteName = "sprite.png";
    fs.writeFileSync(temp + spriteName, image);

    let r = 2,
      spriteCss = "\n",
      { width, height } = properties;
    for (let path in coordinates) {
      const { x, y } = coordinates[path],
        className = "." + path.split("/").pop().slice(0, -4);
      spriteCss +=
        `\n${className} { background: url(${spriteName}) no-repeat` +
        ` -${x / r}px -${y / r}px; }`;
    }
    spriteCss += `\n.F { background-size: ${width / r}px ${height / r}px; }`;
    const style = fs.readFileSync("./src/css/style.css", "utf8");
    fs.writeFileSync(temp + "style.css", style + spriteCss);
  }
);

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
          src: ["src/img/search", "temp/sprite.png", "temp/sprite.svg"],
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
