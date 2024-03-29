const select$1 = element => typeof element === "string" ? document.querySelector(element) : element();
const create = (tag, options) => {
    const el = typeof tag === "string" ? document.createElement(tag) : tag;
    for (const key in options) {
        const val = options[key];
        if (key === "inside") {
            val.append(el);
        } else if (key === "dest") {
            select$1(val[0]).insertAdjacentElement(val[1], el);
        } else if (key === "around") {
            const ref = val;
            ref.parentNode.insertBefore(el, ref);
            el.append(ref);
            if (ref.getAttribute("autofocus") != null)
                ref.focus();
        } else if (key in el) {
            el[key] = val;
        } else {
            el.setAttribute(key, val);
        }
    }
    return el;
};
const getQuery = field => field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement ? field.value : field.innerHTML;
const format = (value, diacritics) => {
    value = String(value).toLowerCase();
    return diacritics ? value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").normalize("NFC") : value;
};
const debounce = (callback, duration) => {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(), duration);
    };
};
const checkTrigger = (query, condition, threshold) => condition ? condition(query) : query.length >= threshold;
const mark = (value, cls) => create("mark", {
    innerHTML: value,
    ...typeof cls === "string" && {
        class: cls
    }
}).outerHTML;

var configure = ctx => {
    const {name, options, resultsList, resultItem} = ctx;
    for (const option in options) {
        if (typeof options[option] === "object") {
            if (!ctx[option])
                ctx[option] = {};
            for (const subOption in options[option]) {
                ctx[option][subOption] = options[option][subOption];
            }
        } else {
            ctx[option] = options[option];
        }
    }
    ctx.selector = ctx.selector || "#" + name;
    resultsList.destination = resultsList.destination || ctx.selector;
    resultsList.id = resultsList.id || name + "_list_" + ctx.id;
    resultItem.id = resultItem.id || name + "_result";
    ctx.input = select$1(ctx.selector);
};

var eventEmitter = (name, ctx) => {
    ctx.input.dispatchEvent(new CustomEvent(name, {
        bubbles: true,
        detail: ctx.feedback,
        cancelable: true
    }));
};

var search = (query, record, options) => {
    const {mode, diacritics, highlight} = options || {};
    const nRecord = format(record, diacritics);
    record = String(record);
    query = format(query, diacritics);
    if (mode === "loose") {
        query = query.replace(/ /g, "");
        const qLength = query.length;
        let cursor = 0;
        const match = Array.from(record).map((character, index) => {
            if (cursor < qLength && nRecord[index] === query[cursor]) {
                character = highlight ? mark(character, highlight) : character;
                cursor++;
            }
            return character;
        }).join("");
        if (cursor === qLength)
            return match;
    } else {
        let match = nRecord.indexOf(query);
        if (~match) {
            query = record.substring(match, match + query.length);
            match = highlight ? record.replace(query, mark(query, highlight)) : record;
            return match;
        }
    }
};

const getData = (ctx, query) => new Promise(($return, $error) => {
    let data;
    ({data} = ctx);
    if (data.cache && data.store)
        return $return();
    return new Promise(($return, $error) => {
        if (typeof data.src === "function") {
            return new Promise(($return, $error) => {
                if (data.src.constructor.name === "AsyncFunction") {
                    return data.src(query).then($return, $error);
                }
                return $return(data.src(query));
            }).then($return, $error);
        }
        return $return(data.src);
    }).then($await_7 => {
        try {
            ctx.feedback = (data.store = $await_7);
            eventEmitter("response", ctx);
            return $return();
        } catch ($boundEx) {
            return $error($boundEx);
        }
    }, $error);
});
const findMatches = (query, ctx) => {
    const {data, searchEngine} = ctx;
    let matches = [];
    data.store.forEach((value, index) => {
        const find = key => {
            const record = key ? value[key] : value;
            const match = typeof searchEngine === "function" ? searchEngine(query, record) : search(query, record, {
                mode: searchEngine,
                diacritics: ctx.diacritics,
                highlight: ctx.resultItem.highlight
            });
            if (!match)
                return;
            let result = {
                match,
                value
            };
            if (key)
                result.key = key;
            matches.push(result);
        };
        if (data.keys) {
            for (const key of data.keys) {
                find(key);
            }
        } else {
            find();
        }
    });
    if (data.filter)
        matches = data.filter(matches);
    const results = matches.slice(0, ctx.resultsList.maxResults);
    ctx.feedback = {
        query,
        matches,
        results
    };
    eventEmitter("results", ctx);
};

const Expand = "aria-expanded";
const Active = "aria-activedescendant";
const Selected = "aria-selected";
const feedback = (ctx, index) => {
    ctx.feedback.selection = {
        index,
        ...ctx.feedback.results[index]
    };
};
const render = ctx => {
    const {resultsList, list, resultItem, feedback} = ctx;
    const {matches, results} = feedback;
    ctx.cursor = -1;
    list.innerHTML = "";
    if (matches.length || resultsList.noResults) {
        const fragment = new DocumentFragment();
        const cls = resultItem.selected ? resultItem.selected.split(" ") : false;
        results.forEach((result, index) => {
            const element = create(resultItem.tag, {
                id: `${resultItem.id}_${index}`,
                role: "option",
                innerHTML: result.match,
                inside: fragment,
                ...resultItem.class && {
                    class: resultItem.class
                }
            });
            element.addEventListener("touchstart", () => cls && element.classList.add(...cls));
            element.addEventListener("touchend", () => cls && element.classList.remove(...cls));
            element.addEventListener("mouseenter", event => {
                if (event.timeStamp - ctx.allowMouseEventAfter > 500) {
                    let state = ctx.cursor;
                    ctx.cursor = index;
                    if (cls) {
                        element.classList.add(...cls);
                        if (state > -1 && index != state) {
                            element.parentElement.children[state].classList.remove(...cls);
                        }
                    }
                }
            });
            element.addEventListener("mouseleave", event => {
                if (event.timeStamp - ctx.allowMouseEventAfter > 500) {
                    const target = event.relatedTarget;
                    if (target && !target.id.startsWith(resultItem.id)) {
                        ctx.cursor = -1;
                        cls && element.classList.remove(...cls);
                    }
                }
            });
            if (resultItem.element)
                resultItem.element(element, result);
        });
        list.append(fragment);
        if (resultsList.element)
            resultsList.element(list, feedback);
        open(ctx);
    } else {
        close(ctx);
    }
};
const open = ctx => {
    if (ctx.isOpen)
        return;
    (ctx.wrapper || ctx.input).setAttribute(Expand, true);
    ctx.list.removeAttribute("hidden");
    ctx.isOpen = true;
    eventEmitter("open", ctx);
};
const close = ctx => {
    if (!ctx.isOpen)
        return;
    (ctx.wrapper || ctx.input).setAttribute(Expand, false);
    ctx.input.setAttribute(Active, "");
    ctx.list.setAttribute("hidden", "");
    ctx.isOpen = false;
    eventEmitter("close", ctx);
};
const goTo = (index, ctx) => {
    const {resultItem} = ctx;
    const results = ctx.list.getElementsByTagName(resultItem.tag);
    const cls = resultItem.selected ? resultItem.selected.split(" ") : false;
    if (ctx.isOpen && results.length) {
        const state = ctx.cursor;
        if (index >= results.length)
            index = 0;
        if (index < 0)
            index = results.length - 1;
        ctx.cursor = index;
        if (state > -1) {
            results[state].removeAttribute(Selected);
            if (cls)
                results[state].classList.remove(...cls);
        }
        results[index].setAttribute(Selected, true);
        if (cls)
            results[index].classList.add(...cls);
        ctx.input.setAttribute(Active, results[ctx.cursor].id);
        ctx.list.scrollTop = results[index].offsetTop - ctx.list.clientHeight + results[index].clientHeight + 5;
        ctx.feedback.cursor = ctx.cursor;
        feedback(ctx, index);
        eventEmitter("navigate", ctx);
    }
};
const next = ctx => {
    goTo(ctx.cursor + 1, ctx);
};
const previous = ctx => {
    goTo(ctx.cursor - 1, ctx);
};
const select = (ctx, event, index) => {
    index = index >= 0 ? index : ctx.cursor;
    if (index < 0)
        return;
    ctx.feedback.event = event;
    feedback(ctx, index);
    eventEmitter("selection", ctx);
    close(ctx);
};
const click = (event, ctx) => {
    const itemTag = ctx.resultItem.tag.toUpperCase();
    const items = Array.from(ctx.list.querySelectorAll(itemTag));
    const item = event.target.closest(itemTag);
    if (item && item.nodeName === itemTag) {
        if (/android/gi.test(window.navigator.userAgent)) {
            ctx.input.blur();
            ctx.input.focus();
        }
        select(ctx, event, items.indexOf(item));
    }
};
const navigate = (event, ctx) => {
    switch (event.keyCode) {
        case 40:
        case 38:
            event.preventDefault();
            ctx.allowMouseEventAfter = event.timeStamp;
            event.keyCode === 40 ? next(ctx) : previous(ctx);
            break;
        case 13:
            if (!ctx.submit)
                event.preventDefault();
            if (ctx.cursor >= 0)
                select(ctx, event);
            break;
        case 9:
            if (ctx.resultsList.tabSelect && ctx.cursor >= 0)
                select(ctx, event);
            break;
        case 27:
            ctx.input.value = "";
            close(ctx);
            break;
    }
};

function start (ctx, q) {
    return new Promise(($return, $error) => {
        let queryVal, condition;
        queryVal = q || getQuery(ctx.input);
        queryVal = ctx.query ? ctx.query(queryVal) : queryVal;
        condition = checkTrigger(queryVal, ctx.trigger, ctx.threshold);
        if (condition) {
            return getData(ctx, queryVal).then($await_2 => {
                try {
                    if (ctx.feedback instanceof Error)
                        return $return();
                    if (ctx.cancelIfInputNothing && !ctx.input.value)
                        return $return();
                    findMatches(queryVal, ctx);
                    if (ctx.resultsList)
                        render(ctx);
                    return $If_1.call(this);
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }, $error);
        } else {
            close(ctx);
            return $If_1.call(this);
        }
        function $If_1() {
            return $return();
        }
    });
}

const eventsManager = (events, callback) => {
    for (const element in events) {
        for (const event in events[element]) {
            callback(element, event);
        }
    }
};
const addEvents = ctx => {
    const {events} = ctx;
    const run = debounce(() => start(ctx), ctx.debounce);
    const publicEvents = ctx.events = {
        input: {
            ...events && events.input
        },
        ...ctx.resultsList && {
            list: events ? {
                ...events.list
            } : {}
        }
    };
    const privateEvents = {
        input: {
            compositionstart() {
                ctx.input.composing = true;
            },
            compositionend() {
                if (ctx.input.composing) {
                    ctx.input.composing = false;
                    ctx.eventTrigger(ctx.input, "input");
                }
            },
            change() {
                if (ctx.input.composing) {
                    ctx.input.composing = false;
                    ctx.eventTrigger(ctx.input, "input");
                }
            },
            input() {
                !ctx.input.composing && run();
            },
            keydown(event) {
                navigate(event, ctx);
            },
            blur() {
                close(ctx);
            }
        },
        list: {
            mousedown(event) {
                event.preventDefault();
            },
            click(event) {
                click(event, ctx);
            }
        }
    };
    eventsManager(privateEvents, (element, event) => {
        if (!ctx.resultsList && event !== "input")
            return;
        if (publicEvents[element][event])
            return;
        publicEvents[element][event] = privateEvents[element][event];
    });
    eventsManager(publicEvents, (element, event) => {
        ctx[element].addEventListener(event, publicEvents[element][event]);
    });
};
const removeEvents = ctx => {
    eventsManager(ctx.events, (element, event) => {
        ctx[element].removeEventListener(event, ctx.events[element][event]);
    });
};

function init (ctx) {
    return new Promise(($return, $error) => {
        let placeHolder, resultsList, parentAttrs;
        ({placeHolder, resultsList} = ctx);
        parentAttrs = {
            role: "combobox",
            "aria-owns": resultsList.id,
            "aria-haspopup": true,
            "aria-expanded": false
        };
        create(ctx.input, {
            "aria-controls": resultsList.id,
            "aria-autocomplete": "both",
            ...placeHolder && {
                placeholder: placeHolder
            },
            ...!ctx.wrapper && {
                ...parentAttrs
            }
        });
        if (ctx.wrapper)
            ctx.wrapper = create("div", {
            around: ctx.input,
            class: ctx.name + "_wrapper",
            ...parentAttrs
        });
        if (resultsList)
            ctx.list = create(resultsList.tag, {
            dest: [resultsList.destination,resultsList.position],
            id: resultsList.id,
            role: "listbox",
            hidden: "hidden",
            ...resultsList.class && {
                class: resultsList.class
            }
        });
        addEvents(ctx);
        if (ctx.data.cache) {
            return getData(ctx).then($await_2 => {
                try {
                    return $If_1.call(this);
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }, $error);
        }
        function $If_1() {
            eventEmitter("init", ctx);
            return $return();
        }
        return $If_1.call(this);
    });
}

function extend (autoComplete) {
    const {prototype} = autoComplete;
    prototype.init = function () {
        init(this);
    };
    prototype.start = function (query) {
        start(this, query);
    };
    prototype.unInit = function () {
        if (this.wrapper) {
            const parentNode = this.wrapper.parentNode;
            parentNode.insertBefore(this.input, this.wrapper);
            parentNode.removeChild(this.wrapper);
        }
        removeEvents(this);
    };
    prototype.open = function () {
        open(this);
    };
    prototype.close = function () {
        close(this);
    };
    prototype.goTo = function (index) {
        goTo(index, this);
    };
    prototype.next = function () {
        next(this);
    };
    prototype.previous = function () {
        previous(this);
    };
    prototype.select = function (index) {
        select(this, null, index);
    };
    prototype.search = function (query, record, options) {
        return search(query, record, options);
    };
}

function autoComplete(config) {
    this.options = config;
    this.id = (autoComplete.instances = (autoComplete.instances || 0) + 1);
    this.name = "autoComplete";
    this.wrapper = 1;
    this.threshold = 1;
    this.debounce = 0;
    this.resultsList = {
        position: "afterend",
        tag: "ul",
        maxResults: 5
    };
    this.resultItem = {
        tag: "li"
    };
    this.allowMouseEventAfter = 0;
    this.cancelIfInputNothing = false;
    this.eventTrigger = ((element, type) => {
        const event = document.createEvent("HTMLEvents");
        event.initEvent(type, true, true);
        element.dispatchEvent(event);
    });
    configure(this);
    extend.call(this, autoComplete);
    init(this);
}

export { autoComplete as default };
