export default ({ title, bookmark }) => {
  // V2EX https://static.v2ex.com/grids/air.png
  function render() {
    return `<ul class="A">
${bookmark.map(renderLi).join("\n")}
</ul>
    `;
  }

  function renderLi({ category, name, url, favicon, newTab }) {
    if (category) {
      const _category = category.replace(/\s/g, "");
      return `<li class="B" id="${_category}">${category}</li>`;
    }
    if (favicon) favicon = favicon.slice(0, -4).toLowerCase();
    else favicon = "";
    const _blank = newTab ? ' target="_blank" rel="noreferrer"' : "";
    const icon = favicon ? `<div class="E ${favicon}"></div>\n` : "";
    return `<li class="C">
<a class="D" href="${url}"${_blank}>
${icon}<span>${name}</span>
</a>
</li>`;
  }

  function renderFooter() {
    const m = bookmark.filter(i => "category" in i).length;
    const n = bookmark.length - m;
    return `<footer>
<hr/>
<p>Modified by <a href="https://github.com/coo11/123">coo11</a> & forked from <a href="https://github.com/xcatliu/123">xcatliu</a><br>${m} categories included & ${n} links in total</p>
</footer>`;
  }

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="description" content="A simple start page">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <title>${title}</title>
  <link rel="shortcut icon" type="image/png" href="./favicon.ico">
  <link rel="apple-touch-icon" href="./apple-touch-icon.png">
  <link rel="stylesheet" href="./assets/style.css">
  <script defer src="./assets/index.js"></script>
</head>
<body tabindex="0">
<div class="wrapper">
    <div class="container">
      <div class="J">
        <form class="K">
          <div class="L">
            <svg class="M"><use xlink:href="assets/sprite.svg#baidu"></use></svg>
            <svg class="N O"><use xlink:href="#svg-toggle"></use></svg>
            <input class="P" style="width: 0; height: 0" inputmode="none" />
          </div>
          <input class="Q" type="search" autocomplete="off" autocorrect="off" autocapitalize="off" autofocus="off" tabindex="1" />
          <div class="R" tabindex="3" style="display: none">
            <svg class="O"><use xlink:href="#svg-clear"></use></svg>
          </div>
          <button class="T" type="submit" tabindex="2">
            <svg class="O"><use xlink:href="#svg-magnifier"></use></svg>
          </button>
        </form>
      </div>
${render()}
${renderFooter()}
</div>
</div>
<svg style="position: absolute; width: 0; height: 0">
  <symbol id="svg-clear" viewBox="0 0 1024 1024">
    <path d="m575.328 510.496 371.456-369.824c17.568-17.504 17.664-45.824.192-63.424-17.504-17.632-45.792-17.664-63.36-.192L512.032 446.944 143.712 77.216c-17.408-17.504-45.792-17.568-63.328-.096-17.536 17.504-17.568 45.888-.096 63.456l368.224 369.632-371.296 369.6c-17.568 17.504-17.664 45.824-.192 63.424 8.736 8.8 20.256 13.216 31.776 13.216 11.424 0 22.848-4.352 31.584-13.056l371.36-369.696 371.68 373.088C892.192 955.616 903.68 960 915.168 960a44.735 44.735 0 0 0 31.648-13.088c17.504-17.504 17.568-45.824.096-63.392L575.328 510.496zm0 0" />
  </symbol>
  <symbol id="svg-magnifier" viewBox="0 0 1024 1024">
    <path d="M995.83 995.833c-37.551 37.556-98.442 37.556-135.998 0L690.1 826.097c-69.779 44.732-152.275 71.438-241.327 71.438C200.93 897.535.003 696.615.003 448.77.003 200.92 200.929 0 448.773 0c247.856 0 448.77 200.92 448.77 448.77 0 89.048-26.7 171.537-71.44 241.334L995.83 859.83c37.556 37.556 37.556 98.448 0 136.004zM448.773 128.218c-177.025 0-320.542 143.517-320.542 320.552 0 177.032 143.511 320.548 320.542 320.548 177.037 0 320.548-143.516 320.548-320.548 0-177.035-143.51-320.552-320.548-320.552zm0 0" />
  </symbol>
  <symbol id="svg-toggle" viewBox="0 0 256 256">
    <path d="M225.813 48.907 128 146.72 30.187 48.907 0 79.093l128 128 128-128z" />
  </symbol>
</svg>
</body>
</html>`;
};
