import autoComplete from "./autoComplete";

{
  let ua = window.navigator.userAgent;
  if (!/mobile|mobi|wap|simulator|ipad|ipod|iphone|android/gi.test(ua)) {
    document.body.style.background =
      "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAAAAADF+lnMAAAAAnRSTlMA/1uRIrUAAAAmSURBVAjXNcYxAQAwEAIx6t8er+c6AJnyUJwIo6UznelMl6AFLXybuUg2me0a1QAAAABJRU5ErkJggg==') fixed";
    try {
      fetch("https://api.coo11.eu.org/navi/bg", { method: "HEAD" }).then(
        resp => {
          if (resp.status === 200)
            document.body.style.background = `url("${resp.url}") fixed no-repeat top center / cover`;
        }
      );
    } catch (e) {}
  }
}
{
  const fetchJSONP = url =>
    new Promise(rs => {
      const script = document.createElement("script");
      const name = `_jsonp_${new Date().getTime()}`;
      script.src = url + name;
      window[name] = json => {
        rs(new Response(JSON.stringify(json)));
        script.remove();
        delete window[name];
      };

      document.body.appendChild(script);
    });

  window.rememberLastUse = (enable = true) => {
    localStorage.setItem("rememberLastUse", Number(enable));
  };

  const searchEngineConfig = {
    list: [
      {
        name: "Google",
        shortcut: "#g",
        icon: "google.svg",
        autoComplete: true,
        prefix: "https://www.google.com/search?q=",
        sug: "https://suggestqueries.google.com/complete/search?client=chrome&q={keyword}&callback="
      },
      {
        name: "百度",
        shortcut: "#bd",
        icon: "baidu.svg",
        autoComplete: true,
        prefix: "https://www.baidu.com/s?wd=",
        sug: "https://www.baidu.com/su?p=3&wd={keyword}&cb="
      },
      {
        name: "Bing",
        shortcut: "#bi",
        icon: "bing.svg",
        autoComplete: true,
        prefix: "https://www.bing.com/search?q=",
        sug: "https://api.bing.com/qsonhs.aspx?type=cb&q={keyword}&cb="
      },
      {
        name: "搜狗",
        shortcut: "#sg",
        icon: "sogou.svg",
        autoComplete: true,
        prefix: "https://www.sogou.com/web?query=",
        sug: "https://wap.sogou.com/web/sugg/{keyword}?vr=1&s=1&source=wapsearch&encrypt=0&cb="
      },
      {
        name: "DuckDuckGo",
        shortcut: "#ddg",
        icon: "duckduckgo.svg",
        autoComplete: false,
        prefix: "https://duckduckgo.com/?q="
      },
      {
        name: "微博",
        shortcut: "#wb",
        icon: "weibo.svg",
        prefix: "https://s.weibo.com/weibo?q="
      },
      {
        name: "Twitter",
        shortcut: "#t",
        icon: "twitter.svg",
        prefix: "https://twitter.com/search?q="
      },
      {
        name: "Bilibili",
        shortcut: "#bl",
        icon: "bilibili.svg",
        prefix: "https://search.bilibili.com/all?keyword="
      },
      {
        name: "Youtube",
        shortcut: "#y",
        icon: "youtube.svg",
        prefix: "https://www.youtube.com/results?search_query="
      },
      {
        name: "Github",
        shortcut: "#gh",
        icon: "github.svg",
        prefix: "https://github.com/search?q="
      },
      {
        name: "Github Gist",
        shortcut: "#gg",
        icon: "github.svg",
        prefix: "https://gist.github.com/search?q="
      },
      {
        name: "StackOverflow",
        shortcut: "#so",
        icon: "stackoverflow.svg",
        prefix: "https://stackoverflow.com/search?q="
      },
      {
        name: "Reddit",
        shortcut: "#rd",
        icon: "reddit.svg",
        prefix: "https://www.reddit.com/search?q="
      },
      {
        name: "知乎",
        shortcut: "#zh",
        icon: "zhihu.svg",
        prefix: "https://www.zhihu.com/search?q="
      },
      {
        name: "Danbooru",
        shortcut: "#db",
        icon: "danbooru.svg",
        autoComplete: false,
        prefix: "https://danbooru.donmai.us/posts?tags="
      },
      {
        name: "淘宝",
        shortcut: "#tb",
        icon: "taobao.svg",
        prefix: "https://s.taobao.com/search?q="
      },
      {
        name: "京东",
        shortcut: "#jd",
        icon: "jd.svg",
        prefix: "https://search.jd.com/Search?keyword="
      },
      {
        name: "天使动漫",
        shortcut: "#tsdm",
        icon: "music.svg",
        prefix:
          "https://www.tsdm39.com/plugin.php?id=Kahrpba:search&authorid=0&fid=0&query="
      }
    ],
    rememberLastUse: Number(localStorage.getItem("rememberLastUse")),
    get currentEngine() {
      if (this._engine) return this._engine;
      const lastUsed = localStorage.getItem("lastUse");
      if (!this.rememberLastUse || !lastUsed) return this.list[0];
      else {
        return (
          this.list.filter(i => i.shortcut === "lastUsed")?.[0] || this.list[0]
        );
      }
    },
    set currentEngine(obj) {
      localStorage.setItem("lastUse", obj.shortcut);
      this._engine = obj;
    },
    init() {
      const { icon } = this.currentEngine;
      this.switchIcon(icon);
    },
    switchIcon(icon) {
      const use = document.querySelector("svg.M > use");
      use.setAttribute("xlink:href", "assets/sprite.svg#" + icon.slice(0, -4));
    },
    dash(query) {
      const { prefix } = this.currentEngine;
      window.open(prefix + encodeURIComponent(query), "_blank");
    },
    itemContent({ icon, name, shortcut }) {
      const id = icon.slice(0, -4);
      return (
        '<div class="ba">' +
        `<svg class="ca"><use xlink:href="assets/sprite.svg#${id}"></use></svg>` +
        `<span class="da">${name}</span>` +
        `</div><div class="ea">${shortcut}</div>`
      );
    }
  };

  searchEngineConfig.init();

  const searchEngine = new autoComplete({
    wrapper: false,
    selector: "input.P",
    data: {
      src: searchEngineConfig.list,
      keys: ["shortcut"]
    },
    resultsList: {
      class: "V W",
      destination: "form.K",
      maxResults: 100
    },
    resultItem: {
      class: "aa",
      element: (item, data) => {
        item.innerHTML = searchEngineConfig.itemContent(data.value);
      },
      selected: "ha"
    }
  });

  const searchBar = new autoComplete({
    wrapper: false,
    selector: "input.Q",
    searchEngine: (_, record) => record,
    cancelIfInputNothing: true,
    data: {
      src: async query => {
        if (query.startsWith("#")) {
          query = query.replace(/^#/, "").replace(/\s/g, "");
          let unmatched = [];
          let matched = searchEngineConfig.list.filter(i => {
            if (i.shortcut.indexOf(query) > -1) return true;
            unmatched.push(i);
            return false;
          });
          matched.sort();
          return matched.concat(...unmatched);
        } else {
          let suglist,
            { autoComplete, sug, shortcut } = searchEngineConfig.currentEngine;
          if (autoComplete) {
            const url = sug.replace("{keyword}", encodeURIComponent(query));
            const result = await (await fetchJSONP(url)).json();
            switch (shortcut) {
              case "#g":
                suglist = result[1];
                break;
              case "#bd":
                suglist = result.s;
                break;
              case "#bi":
                suglist = result.AS.Results?.[0].Suggests.map(i => i.Txt);
                break;
              case "#sg":
                suglist = result.s.map(i => i.q);
                break;
            }
          }
          return suglist || [];
        }
      }
    },
    resultsList: {
      class: "X",
      destination: "form.K",
      maxResults: 20,
      noResults: false,
      element: (list, data) => {
        data.results[0].value.hasOwnProperty("shortcut") &&
          list.insertAdjacentHTML(
            "beforeend",
            '<label class="fa"><span>↑ / ↓ 切换</span><span>Tab / 空格 选中</span></label>'
          );
      }
    },
    resultItem: {
      element: (item, data) => {
        if (data.value.hasOwnProperty("shortcut")) {
          item.innerHTML = searchEngineConfig.itemContent(data.value);
        } else {
          item.innerHTML = data.value;
        }
      }
    }
  });

  const searchX = document.querySelector("div.R");
  const searchButton = document.querySelector("button.T");

  class SearchEngineMgr {
    constructor(autoCompleteInstance) {
      this.ctx = autoCompleteInstance;
      this.searchBar = document.querySelector("input.Q");
      this.wrapper = document.querySelector("div.L");

      this.clickDelegate = this.clickDelegate.bind(this);
      this.dismiss = this.dismiss.bind(this);

      this.wrapper.addEventListener("click", this.clickDelegate, {
        once: true
      });

      this.ctx.input.addEventListener("selection", event => {
        const engine = event.detail.selection.value;
        searchEngineConfig.currentEngine = engine;
        searchEngineConfig.switchIcon(engine.icon);
        let value = this.searchBar.value;
        if (value.startsWith("#") || !value.trim()) {
          this.searchBar.value = "";
          barInstance.changed();
        } else searchBar.start();
        this.searchBar.focus();
      });

      this.ctx.input.addEventListener("close", () => this.dismiss());

      this.ctx.input.addEventListener("keydown", event => {
        if (event.key === " " || event.key === "Tab") {
          event.preventDefault();
          this.ctx.select(this.ctx.cursor);
        }
      });
    }
    clickDelegate() {
      this.ctx.input.focus();
      this.ctx.start("#");
    }
    dismiss() {
      setTimeout(() => {
        this.wrapper.addEventListener("click", this.clickDelegate, {
          once: true
        });
      }, 200);
    }
  }

  class SearchBarMgr {
    constructor(autoCompleteInstance) {
      this.ctx = autoCompleteInstance;
      this.changed = this.changed.bind(this);

      this.ctx.input.addEventListener("response", event => {
        const classList = this.ctx.list.classList;
        // console.log(event.detail);
        const selected = event.detail[0];
        if (this.isEngineList(selected)) {
          classList.add("Y");
          classList.remove("Z");
          this.ctx.resultsList.maxResults = 6;
          this.ctx.resultItem.class = "aa";
          this.ctx.resultItem.selected = "ha";
        } else {
          classList.add("Z");
          classList.remove("Y");
          this.ctx.resultsList.maxResults = 20;
          this.ctx.resultItem.class = "ga";
          this.ctx.resultItem.selected = "ia";
        }
      });

      this.ctx.input.addEventListener("navigate", event => {
        const selected = event.detail.selection.value;
        if (!this.isEngineList(selected)) {
          this.ctx.input.value = selected;
        }
      });

      this.ctx.input.addEventListener("selection", event => {
        const selected = event.detail.selection.value;
        if (this.isEngineList(selected)) {
          searchEngineConfig.currentEngine = selected;
          searchEngineConfig.switchIcon(selected.icon);
          this.ctx.input.value = "";
          this.changed();
          this.ctx.input.focus();
        } else
          setTimeout(() => {
            if (this.ctx.input.value.trim() != selected) {
              this.ctx.input.value = selected;
              this.ctx.start();
            }
          }, 50);
      });

      this.ctx.input.addEventListener("keydown", event => {
        const state = this.ctx.cursor,
          inputVal = this.ctx.input.value;
        if (inputVal && !inputVal.startsWith("#")) {
          // As for **Enter** key, "selection" event is faster than "keydown"!
          if (event.key === "Enter") {
            event.preventDefault();
            const keyword =
              state === -1 ? inputVal : this.ctx.list.children[state].innerText;
            searchEngineConfig.dash(keyword);
            this.ctx.close();
          } else if (event.key === " " || event.key === "Tab") {
            // Default tabSelect option not focus
            if (event.key === "Tab") event.preventDefault();
            this.ctx.isOpen && state > -1 && this.ctx.select(state);
          }
        } else if (this.ctx.isOpen && inputVal.startsWith("#")) {
          if (
            event.key === "Enter" ||
            event.key === " " ||
            event.key === "Tab"
          ) {
            event.preventDefault();
            this.ctx.select(state === -1 ? 0 : state);
          }
        }
      });

      this.ctx.input.addEventListener("input", () => {
        !this.ctx.input.composing && this.changed();
      });
      this.ctx.input.addEventListener("compositionend", () => this.changed());
    }
    isEngineList(obj) {
      return typeof obj === "object" && obj?.hasOwnProperty("shortcut");
    }
    changed(hover) {
      const val = this.ctx.input.value;
      if (hover || val) {
        if (!hover) searchX.classList.add("S");
        searchButton.classList.add("U");
      } else {
        searchX.classList.remove("S");
        searchButton.classList.remove("U");
      }
    }
  }

  new SearchEngineMgr(searchEngine);
  const barInstance = new SearchBarMgr(searchBar);

  searchX.addEventListener("click", () => {
    searchBar.input.value = "";
    searchBar.input.focus();
    barInstance.changed();
  });

  searchButton.addEventListener("click", event => {
    event.preventDefault();
    const keyword = searchBar.input.value;
    if (keyword) searchEngineConfig.dash(keyword);
    else searchBar.input.focus();
  });
}
