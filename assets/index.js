!function(){"use strict";function t(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}function e(t,e,n,r,i,o,s){try{var a=t[o](s),c=a.value}catch(t){return void n(t)}a.done?e(c):Promise.resolve(c).then(r,i)}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e,n){return e&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,u(r.key),r)}}(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t}function i(t,e,n){return(e=u(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function a(){a=function(){return e};var t,e={},n=Object.prototype,r=n.hasOwnProperty,i=Object.defineProperty||function(t,e,n){t[e]=n.value},o="function"==typeof Symbol?Symbol:{},s=o.iterator||"@@iterator",c=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag";function l(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,n){return t[e]=n}}function f(t,e,n,r){var o=e&&e.prototype instanceof y?e:y,s=Object.create(o.prototype),a=new P(r||[]);return i(s,"_invoke",{value:T(t,n,a)}),s}function p(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}e.wrap=f;var h="suspendedStart",d="suspendedYield",v="executing",m="completed",g={};function y(){}function b(){}function w(){}var x={};l(x,s,(function(){return this}));var L=Object.getPrototypeOf,k=L&&L(L(q([])));k&&k!==n&&r.call(k,s)&&(x=k);var E=w.prototype=y.prototype=Object.create(x);function O(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function S(t,e){function n(i,o,s,a){var c=p(t[i],t,o);if("throw"!==c.type){var u=c.arg,l=u.value;return l&&"object"==typeof l&&r.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,s,a)}),(function(t){n("throw",t,s,a)})):e.resolve(l).then((function(t){u.value=t,s(u)}),(function(t){return n("throw",t,s,a)}))}a(c.arg)}var o;i(this,"_invoke",{value:function(t,r){function i(){return new e((function(e,i){n(t,r,e,i)}))}return o=o?o.then(i,i):i()}})}function T(e,n,r){var i=h;return function(o,s){if(i===v)throw Error("Generator is already running");if(i===m){if("throw"===o)throw s;return{value:t,done:!0}}for(r.method=o,r.arg=s;;){var a=r.delegate;if(a){var c=j(a,r);if(c){if(c===g)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(i===h)throw i=m,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);i=v;var u=p(e,n,r);if("normal"===u.type){if(i=r.done?m:d,u.arg===g)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(i=m,r.method="throw",r.arg=u.arg)}}}function j(e,n){var r=n.method,i=e.iterator[r];if(i===t)return n.delegate=null,"throw"===r&&e.iterator.return&&(n.method="return",n.arg=t,j(e,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),g;var o=p(i,e.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,g;var s=o.arg;return s?s.done?(n[e.resultName]=s.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,g):s:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,g)}function I(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function A(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(I,this),this.reset(!0)}function q(e){if(e||""===e){var n=e[s];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var i=-1,o=function n(){for(;++i<e.length;)if(r.call(e,i))return n.value=e[i],n.done=!1,n;return n.value=t,n.done=!0,n};return o.next=o}}throw new TypeError(typeof e+" is not iterable")}return b.prototype=w,i(E,"constructor",{value:w,configurable:!0}),i(w,"constructor",{value:b,configurable:!0}),b.displayName=l(w,u,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,l(t,u,"GeneratorFunction")),t.prototype=Object.create(E),t},e.awrap=function(t){return{__await:t}},O(S.prototype),l(S.prototype,c,(function(){return this})),e.AsyncIterator=S,e.async=function(t,n,r,i,o){void 0===o&&(o=Promise);var s=new S(f(t,n,r,i),o);return e.isGeneratorFunction(n)?s:s.next().then((function(t){return t.done?t.value:s.next()}))},O(E),l(E,u,"Generator"),l(E,s,(function(){return this})),l(E,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},e.values=q,P.prototype={constructor:P,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(A),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function i(r,i){return a.type="throw",a.arg=e,n.next=r,i&&(n.method="next",n.arg=t),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var s=this.tryEntries[o],a=s.completion;if("root"===s.tryLoc)return i("end");if(s.tryLoc<=this.prev){var c=r.call(s,"catchLoc"),u=r.call(s,"finallyLoc");if(c&&u){if(this.prev<s.catchLoc)return i(s.catchLoc,!0);if(this.prev<s.finallyLoc)return i(s.finallyLoc)}else if(c){if(this.prev<s.catchLoc)return i(s.catchLoc,!0)}else{if(!u)throw Error("try statement without catch or finally");if(this.prev<s.finallyLoc)return i(s.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var s=o?o.completion:{};return s.type=t,s.arg=e,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(s)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),A(n),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;A(n)}return i}}throw Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:q(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),g}},e}function c(e){return function(e){if(Array.isArray(e))return t(e)}(e)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(e)||f(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,e);if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t,"string");return"symbol"==typeof e?e:e+""}function l(t){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l(t)}function f(e,n){if(e){if("string"==typeof e)return t(e,n);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}var p=function(t){return"string"==typeof t?document.querySelector(t):t()},h=function(t,e){var n="string"==typeof t?document.createElement(t):t;for(var r in e){var i=e[r];if("inside"===r)i.append(n);else if("dest"===r)p(i[0]).insertAdjacentElement(i[1],n);else if("around"===r){var o=i;o.parentNode.insertBefore(n,o),n.append(o),null!=o.getAttribute("autofocus")&&o.focus()}else r in n?n[r]=i:n.setAttribute(r,i)}return n},d=function(t,e){return t=String(t).toLowerCase(),e?t.normalize("NFD").replace(/[\u0300-\u036f]/g,"").normalize("NFC"):t},v=function(t,e){return h("mark",s({innerHTML:t},"string"==typeof e&&{class:e})).outerHTML},m=function(t,e){e.input.dispatchEvent(new CustomEvent(t,{bubbles:!0,detail:e.feedback,cancelable:!0}))},g=function(t,e,n){var r=n||{},i=r.mode,o=r.diacritics,s=r.highlight,a=d(e,o);if(e=String(e),t=d(t,o),"loose"===i){var c=(t=t.replace(/ /g,"")).length,u=0,l=Array.from(e).map((function(e,n){return u<c&&a[n]===t[u]&&(e=s?v(e,s):e,u++),e})).join("");if(u===c)return l}else{var f=a.indexOf(t);if(~f)return t=e.substring(f,f+t.length),f=s?e.replace(t,v(t,s)):e}},y=function(t,e){return new Promise((function(n,r){var i;return(i=t.data).cache&&i.store?n():new Promise((function(t,n){return"function"==typeof i.src?new Promise((function(t,n){return"AsyncFunction"===i.src.constructor.name?i.src(e).then(t,n):t(i.src(e))})).then(t,n):t(i.src)})).then((function(e){try{return t.feedback=i.store=e,m("response",t),n()}catch(t){return r(t)}}),r)}))},b=function(t,e){var n=e.data,r=e.searchEngine,i=[];n.store.forEach((function(o,s){var a=function(n){var s=n?o[n]:o,a="function"==typeof r?r(t,s):g(t,s,{mode:r,diacritics:e.diacritics,highlight:e.resultItem.highlight});if(a){var c={match:a,value:o};n&&(c.key=n),i.push(c)}};if(n.keys){var c,u=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=f(t))||e){n&&(t=n);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,a=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return s=t.done,t},e:function(t){a=!0,o=t},f:function(){try{s||null==n.return||n.return()}finally{if(a)throw o}}}}(n.keys);try{for(u.s();!(c=u.n()).done;){a(c.value)}}catch(t){u.e(t)}finally{u.f()}}else a()})),n.filter&&(i=n.filter(i));var o=i.slice(0,e.resultsList.maxResults);e.feedback={query:t,matches:i,results:o},m("results",e)},w="aria-expanded",x="aria-activedescendant",L="aria-selected",k=function(t,e){t.feedback.selection=s({index:e},t.feedback.results[e])},E=function(t){t.isOpen||((t.wrapper||t.input).setAttribute(w,!0),t.list.removeAttribute("hidden"),t.isOpen=!0,m("open",t))},O=function(t){t.isOpen&&((t.wrapper||t.input).setAttribute(w,!1),t.input.setAttribute(x,""),t.list.setAttribute("hidden",""),t.isOpen=!1,m("close",t))},S=function(t,e){var n=e.resultItem,r=e.list.getElementsByTagName(n.tag),i=!!n.selected&&n.selected.split(" ");if(e.isOpen&&r.length){var o,s,a=e.cursor;if(t>=r.length&&(t=0),t<0&&(t=r.length-1),e.cursor=t,a>-1)r[a].removeAttribute(L),i&&(s=r[a].classList).remove.apply(s,c(i));r[t].setAttribute(L,!0),i&&(o=r[t].classList).add.apply(o,c(i)),e.input.setAttribute(x,r[e.cursor].id),e.list.scrollTop=r[t].offsetTop-e.list.clientHeight+r[t].clientHeight+5,e.feedback.cursor=e.cursor,k(e,t),m("navigate",e)}},T=function(t){S(t.cursor+1,t)},j=function(t){S(t.cursor-1,t)},I=function(t,e,n){(n=n>=0?n:t.cursor)<0||(t.feedback.event=e,k(t,n),m("selection",t),O(t))};function A(t,e){var n=this;return new Promise((function(r,i){var o,a;return o=e||((a=t.input)instanceof HTMLInputElement||a instanceof HTMLTextAreaElement?a.value:a.innerHTML),function(t,e,n){return e?e(t):t.length>=n}(o=t.query?t.query(o):o,t.trigger,t.threshold)?y(t,o).then((function(e){try{return t.feedback instanceof Error||t.cancelIfInputNothing&&!t.input.value?r():(b(o,t),t.resultsList&&function(t){var e=t.resultsList,n=t.list,r=t.resultItem,i=t.feedback,o=i.matches,a=i.results;if(t.cursor=-1,n.innerHTML="",o.length||e.noResults){var u=new DocumentFragment,l=!!r.selected&&r.selected.split(" ");a.forEach((function(e,n){var i=h(r.tag,s({id:"".concat(r.id,"_").concat(n),role:"option",innerHTML:e.match,inside:u},r.class&&{class:r.class}));i.addEventListener("touchstart",(function(){var t;return l&&(t=i.classList).add.apply(t,c(l))})),i.addEventListener("touchend",(function(){var t;return l&&(t=i.classList).remove.apply(t,c(l))})),i.addEventListener("mouseenter",(function(e){if(e.timeStamp-t.allowMouseEventAfter>500){var r,o,s=t.cursor;t.cursor=n,l&&((r=i.classList).add.apply(r,c(l)),s>-1&&n!=s&&(o=i.parentElement.children[s].classList).remove.apply(o,c(l)))}})),i.addEventListener("mouseleave",(function(e){if(e.timeStamp-t.allowMouseEventAfter>500){var n,o=e.relatedTarget;o&&!o.id.startsWith(r.id)&&(t.cursor=-1,l&&(n=i.classList).remove.apply(n,c(l)))}})),r.element&&r.element(i,e)})),n.append(u),e.element&&e.element(n,i),E(t)}else O(t)}(t),u.call(n))}catch(t){return i(t)}}),i):(O(t),u.call(n));function u(){return r()}}))}var P=function(t,e){for(var n in t)for(var r in t[n])e(n,r)},q=function(t){var e,n,r,i=t.events,o=(e=function(){return A(t)},n=t.debounce,function(){clearTimeout(r),r=setTimeout((function(){return e()}),n)}),a=t.events=s({input:s({},i&&i.input)},t.resultsList&&{list:i?s({},i.list):{}}),c={input:{compositionstart:function(){t.input.composing=!0},compositionend:function(){t.input.composing&&(t.input.composing=!1,t.eventTrigger(t.input,"input"))},change:function(){t.input.composing&&(t.input.composing=!1,t.eventTrigger(t.input,"input"))},input:function(){!t.input.composing&&o()},keydown:function(e){!function(t,e){switch(t.keyCode){case 40:case 38:t.preventDefault(),e.allowMouseEventAfter=t.timeStamp,40===t.keyCode?T(e):j(e);break;case 13:e.submit||t.preventDefault(),e.cursor>=0&&I(e,t);break;case 9:e.resultsList.tabSelect&&e.cursor>=0&&I(e,t);break;case 27:e.input.value="",O(e)}}(e,t)},blur:function(){O(t)}},list:{mousedown:function(t){t.preventDefault()},click:function(e){!function(t,e){var n=e.resultItem.tag.toUpperCase(),r=Array.from(e.list.querySelectorAll(n)),i=t.target.closest(n);i&&i.nodeName===n&&(/android/gi.test(window.navigator.userAgent)&&(e.input.blur(),e.input.focus()),I(e,t,r.indexOf(i)))}(e,t)}}};P(c,(function(e,n){(t.resultsList||"input"===n)&&(a[e][n]||(a[e][n]=c[e][n]))})),P(a,(function(e,n){t[e].addEventListener(n,a[e][n])}))};function _(t){var e=this;return new Promise((function(n,r){var i,o,a;if(i=t.placeHolder,a={role:"combobox","aria-owns":(o=t.resultsList).id,"aria-haspopup":!0,"aria-expanded":!1},h(t.input,s(s({"aria-controls":o.id,"aria-autocomplete":"both"},i&&{placeholder:i}),!t.wrapper&&s({},a))),t.wrapper&&(t.wrapper=h("div",s({around:t.input,class:t.name+"_wrapper"},a))),o&&(t.list=h(o.tag,s({dest:[o.destination,o.position],id:o.id,role:"listbox",hidden:"hidden"},o.class&&{class:o.class}))),q(t),t.data.cache)return y(t).then((function(t){try{return c.call(e)}catch(t){return r(t)}}),r);function c(){return m("init",t),n()}return c.call(e)}))}function C(t){var e=t.prototype;e.init=function(){_(this)},e.start=function(t){A(this,t)},e.unInit=function(){if(this.wrapper){var t=this.wrapper.parentNode;t.insertBefore(this.input,this.wrapper),t.removeChild(this.wrapper)}var e;P((e=this).events,(function(t,n){e[t].removeEventListener(n,e.events[t][n])}))},e.open=function(){E(this)},e.close=function(){O(this)},e.goTo=function(t){S(t,this)},e.next=function(){T(this)},e.previous=function(){j(this)},e.select=function(t){I(this,null,t)},e.search=function(t,e,n){return g(t,e,n)}}function D(t){this.options=t,this.id=D.instances=(D.instances||0)+1,this.name="autoComplete",this.wrapper=1,this.threshold=1,this.debounce=0,this.resultsList={position:"afterend",tag:"ul",maxResults:5},this.resultItem={tag:"li"},this.allowMouseEventAfter=0,this.cancelIfInputNothing=!1,this.eventTrigger=function(t,e){var n=document.createEvent("HTMLEvents");n.initEvent(e,!0,!0),t.dispatchEvent(n)},function(t){var e=t.name,n=t.options,r=t.resultsList,i=t.resultItem;for(var o in n)if("object"===l(n[o]))for(var s in t[o]||(t[o]={}),n[o])t[o][s]=n[o][s];else t[o]=n[o];t.selector=t.selector||"#"+e,r.destination=r.destination||t.selector,r.id=r.id||e+"_list_"+t.id,i.id=i.id||e+"_result",t.input=p(t.selector)}(this),C.call(this,D),_(this)}var N=function(t){return new Promise((function(e){var n=document.createElement("script"),r="_jsonp_".concat((new Date).getTime());n.src=t+r,window[r]=function(t){e(new Response(JSON.stringify(t))),n.remove(),delete window[r]},document.body.appendChild(n)}))};window.rememberLastUse=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];localStorage.setItem("rememberLastUse",Number(t))};var M={list:[{name:"Google",shortcut:"#g",icon:"google.svg",autoComplete:!0,prefix:"https://www.google.com/search?q=",sug:"https://suggestqueries.google.com/complete/search?client=chrome&q={keyword}&callback="},{name:"百度",shortcut:"#bd",icon:"baidu.svg",autoComplete:!0,prefix:"https://www.baidu.com/s?wd=",sug:"https://www.baidu.com/su?p=3&wd={keyword}&cb="},{name:"Bing",shortcut:"#bi",icon:"bing.svg",autoComplete:!0,prefix:"https://www.bing.com/search?q=",sug:"https://api.bing.com/qsonhs.aspx?type=cb&q={keyword}&cb="},{name:"搜狗",shortcut:"#sg",icon:"sogou.svg",autoComplete:!0,prefix:"https://www.sogou.com/web?query=",sug:"https://wap.sogou.com/web/sugg/{keyword}?vr=1&s=1&source=wapsearch&encrypt=0&cb="},{name:"DuckDuckGo",shortcut:"#ddg",icon:"duckduckgo.svg",autoComplete:!1,prefix:"https://duckduckgo.com/?q="},{name:"微博",shortcut:"#wb",icon:"weibo.svg",prefix:"https://s.weibo.com/weibo?q="},{name:"Twitter",shortcut:"#t",icon:"twitter.svg",prefix:"https://twitter.com/search?q="},{name:"Bilibili",shortcut:"#bl",icon:"bilibili.svg",prefix:"https://search.bilibili.com/all?keyword="},{name:"Youtube",shortcut:"#y",icon:"youtube.svg",prefix:"https://www.youtube.com/results?search_query="},{name:"Github",shortcut:"#gh",icon:"github.svg",prefix:"https://github.com/search?q="},{name:"Github Gist",shortcut:"#gg",icon:"github.svg",prefix:"https://gist.github.com/search?q="},{name:"StackOverflow",shortcut:"#so",icon:"stackoverflow.svg",prefix:"https://stackoverflow.com/search?q="},{name:"Reddit",shortcut:"#rd",icon:"reddit.svg",prefix:"https://www.reddit.com/search?q="},{name:"知乎",shortcut:"#zh",icon:"zhihu.svg",prefix:"https://www.zhihu.com/search?q="},{name:"Danbooru",shortcut:"#db",icon:"danbooru.svg",autoComplete:!1,prefix:"https://danbooru.donmai.us/posts?tags="},{name:"淘宝",shortcut:"#tb",icon:"taobao.svg",prefix:"https://s.taobao.com/search?q="},{name:"京东",shortcut:"#jd",icon:"jd.svg",prefix:"https://search.jd.com/Search?keyword="},{name:"AppleMusic",shortcut:"#am",icon:"applemusic.svg",prefix:"https://music.apple.com/jp/search?term="},{name:"天使动漫",shortcut:"#tsdm",icon:"music.svg",prefix:"https://www.tsdm39.com/plugin.php?id=Kahrpba:search&authorid=0&fid=0&query="}],rememberLastUse:Number(localStorage.getItem("rememberLastUse")),get currentEngine(){if(this._engine)return this._engine;var t,e=localStorage.getItem("lastUse");return this.rememberLastUse&&e&&(null===(t=this.list.filter((function(t){return"lastUsed"===t.shortcut})))||void 0===t?void 0:t[0])||this.list[0]},set currentEngine(t){localStorage.setItem("lastUse",t.shortcut),this._engine=t},init:function(){var t=this.currentEngine.icon;this.switchIcon(t)},switchIcon:function(t){document.querySelector("svg.M > use").setAttribute("xlink:href","assets/sprite.svg#"+t.slice(0,-4))},dash:function(t){var e=this.currentEngine.prefix;window.open(e+encodeURIComponent(t),"_blank")},itemContent:function(t){var e=t.icon,n=t.name,r=t.shortcut,i=e.slice(0,-4);return'<div class="ba">'+'<svg class="ca"><use xlink:href="assets/sprite.svg#'.concat(i,'"></use></svg>')+'<span class="da">'.concat(n,"</span>")+'</div><div class="ea">'.concat(r,"</div>")}};M.init();var H=new D({wrapper:!1,selector:"input.P",data:{src:M.list,keys:["shortcut"]},resultsList:{class:"V W",destination:"form.K",maxResults:100},resultItem:{class:"aa",element:function(t,e){t.innerHTML=M.itemContent(e.value)},selected:"ha"}}),R=new D({wrapper:!1,selector:"input.Q",searchEngine:function(t,e){return e},cancelIfInputNothing:!0,data:{src:(W=a().mark((function t(e){var n,r,i,o,s,c,u,l,f,p;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.startsWith("#")){t.next=8;break}return e=e.replace(/^#/,"").replace(/\s/g,""),r=[],(i=M.list.filter((function(t){return t.shortcut.indexOf(e)>-1||(r.push(t),!1)}))).sort(),t.abrupt("return",i.concat.apply(i,r));case 8:if(s=M.currentEngine,c=s.autoComplete,u=s.sug,l=s.shortcut,!c){t.next=27;break}return f=u.replace("{keyword}",encodeURIComponent(e)),t.next=13,N(f);case 13:return t.next=15,t.sent.json();case 15:p=t.sent,t.t0=l,t.next="#g"===t.t0?19:"#bd"===t.t0?21:"#bi"===t.t0?23:"#sg"===t.t0?25:27;break;case 19:return o=p[1],t.abrupt("break",27);case 21:return o=p.s,t.abrupt("break",27);case 23:return o=null===(n=p.AS.Results)||void 0===n?void 0:n[0].Suggests.map((function(t){return t.Txt})),t.abrupt("break",27);case 25:return o=p.s.map((function(t){return t.q})),t.abrupt("break",27);case 27:return t.abrupt("return",o||[]);case 28:case"end":return t.stop()}}),t)})),z=function(){var t=this,n=arguments;return new Promise((function(r,i){var o=W.apply(t,n);function s(t){e(o,r,i,s,a,"next",t)}function a(t){e(o,r,i,s,a,"throw",t)}s(void 0)}))},function(t){return z.apply(this,arguments)})},resultsList:{class:"X",destination:"form.K",maxResults:20,noResults:!1,element:function(t,e){e.results[0].value.hasOwnProperty("shortcut")&&t.insertAdjacentHTML("beforeend",'<label class="fa"><span>↑ / ↓ 切换</span><span>Tab / 空格 选中</span></label>')}},resultItem:{element:function(t,e){e.value.hasOwnProperty("shortcut")?t.innerHTML=M.itemContent(e.value):t.innerHTML=e.value}}}),U=document.querySelector("div.R"),G=document.querySelector("button.T"),B=function(){return r((function t(e){var r=this;n(this,t),this.ctx=e,this.searchBar=document.querySelector("input.Q"),this.wrapper=document.querySelector("div.L"),this.clickDelegate=this.clickDelegate.bind(this),this.dismiss=this.dismiss.bind(this),this.wrapper.addEventListener("click",this.clickDelegate,{once:!0}),this.ctx.input.addEventListener("selection",(function(t){var e=t.detail.selection.value;M.currentEngine=e,M.switchIcon(e.icon);var n=r.searchBar.value;n.startsWith("#")||!n.trim()?(r.searchBar.value="",Y.changed()):R.start(),r.searchBar.focus()})),this.ctx.input.addEventListener("close",(function(){return r.dismiss()})),this.ctx.input.addEventListener("keydown",(function(t){" "!==t.key&&"Tab"!==t.key||(t.preventDefault(),r.ctx.select(r.ctx.cursor))}))}),[{key:"clickDelegate",value:function(){this.ctx.input.focus(),this.ctx.start("#")}},{key:"dismiss",value:function(){var t=this;setTimeout((function(){t.wrapper.addEventListener("click",t.clickDelegate,{once:!0})}),200)}}])}(),F=function(){return r((function t(e){var r=this;n(this,t),this.ctx=e,this.changed=this.changed.bind(this),this.ctx.input.addEventListener("response",(function(t){var e=r.ctx.list.classList,n=t.detail[0];r.isEngineList(n)?(e.add("Y"),e.remove("Z"),r.ctx.resultsList.maxResults=6,r.ctx.resultItem.class="aa",r.ctx.resultItem.selected="ha"):(e.add("Z"),e.remove("Y"),r.ctx.resultsList.maxResults=20,r.ctx.resultItem.class="ga",r.ctx.resultItem.selected="ia")})),this.ctx.input.addEventListener("navigate",(function(t){var e=t.detail.selection.value;r.isEngineList(e)||(r.ctx.input.value=e)})),this.ctx.input.addEventListener("selection",(function(t){var e=t.detail.selection.value;r.isEngineList(e)?(M.currentEngine=e,M.switchIcon(e.icon),r.ctx.input.value="",r.changed(),r.ctx.input.focus()):setTimeout((function(){r.ctx.input.value.trim()!=e&&(r.ctx.input.value=e,r.ctx.start())}),50)})),this.ctx.input.addEventListener("keydown",(function(t){var e=r.ctx.cursor,n=r.ctx.input.value;if(n&&!n.startsWith("#"))if("Enter"===t.key){t.preventDefault();var i=-1===e?n:r.ctx.list.children[e].innerText;M.dash(i),r.ctx.close()}else" "!==t.key&&"Tab"!==t.key||("Tab"===t.key&&t.preventDefault(),r.ctx.isOpen&&e>-1&&r.ctx.select(e));else r.ctx.isOpen&&n.startsWith("#")&&("Enter"!==t.key&&" "!==t.key&&"Tab"!==t.key||(t.preventDefault(),r.ctx.select(-1===e?0:e)))})),this.ctx.input.addEventListener("input",(function(){!r.ctx.input.composing&&r.changed()})),this.ctx.input.addEventListener("compositionend",(function(){return r.changed()}))}),[{key:"isEngineList",value:function(t){return"object"===l(t)&&(null==t?void 0:t.hasOwnProperty("shortcut"))}},{key:"changed",value:function(t){var e=this.ctx.input.value;t||e?(t||U.classList.add("S"),G.classList.add("U")):(U.classList.remove("S"),G.classList.remove("U"))}}])}();new B(H);var W,z,Y=new F(R);U.addEventListener("click",(function(){R.input.value="",R.input.focus(),Y.changed()})),G.addEventListener("click",(function(t){t.preventDefault();var e=R.input.value;e?M.dash(e):R.input.focus()}))}();