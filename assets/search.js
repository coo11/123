(()=>{let e=document.getElementById("search-form"),r=document.getElementById("search-input"),a=document.getElementById("search-style");function o(){document.querySelectorAll('[tabindex="2"]').forEach(e=>{e.setAttribute("tabindex","9")}),document.querySelectorAll(".site-bookmark-a-focus").forEach(e=>{e.classList.remove("site-bookmark-a-focus")});let e=r.value.trim().toLowerCase();var t,o;""!==e?(t=e.split(/\s+/),o=t,a.innerHTML=`
      .site-bookmark-category {
        display: none;
      }
      .site-bookmark-a {
        opacity: 0.3;
      }
      ${n(o)} {
        order: -1;
        -ms-flex-order: -1;
      }
      ${n(o)} .site-bookmark-a {
        opacity: 1;
      }
    `,function(){let e=document.querySelectorAll(`${n(t)} .site-bookmark-a`);e.forEach(e=>{e.setAttribute("tabindex","2")})}(),function(){let e=document.querySelector(`${n(t)} .site-bookmark-a`);e&&e.classList.add("site-bookmark-a-focus")}()):a.innerHTML=""}function n(e){return e.map(e=>`[data-name*="${e}"]`).join("")}document.addEventListener("keyup",function(e){if(e.altKey||e.ctrlKey||e.metaKey||document.activeElement===r)return;let t=String.fromCharCode(e.keyCode).toLowerCase();t.match(/\w/)&&(r.focus(),r.value+=t,o())}),e.addEventListener("submit",function(e){e.preventDefault();e=document.querySelector(".site-bookmark-a-focus");e&&(location.href=e.href)}),r.addEventListener("input",o),r.addEventListener("blur",()=>{let e=document.querySelector(".site-bookmark-a-focus");e&&e.classList.remove("site-bookmark-a-focus")})})();