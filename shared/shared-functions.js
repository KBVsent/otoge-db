const root=document.documentElement,toggleSwitch=document.getElementById("themeToggleCheckbox");window.matchMedia("(prefers-color-scheme: dark)").matches&&(toggleSwitch.checked=!1,root.setAttribute("data-theme","dark")),window.matchMedia("(prefers-color-scheme: light)").matches&&(toggleSwitch.checked=!0,root.setAttribute("data-theme","light"));const getTransitionEvent=()=>{const t=document.createElement("fakeelement"),e={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(const n in e)if(void 0!==t.style[n])return e[n]},transitionEvent=getTransitionEvent();function switchTheme(t){root.classList.toggle("transitioning"),t.target.checked?root.setAttribute("data-theme","light"):root.setAttribute("data-theme","dark"),root.addEventListener(transitionEvent,transitionEndCallback)}function updateQueryStringParameter(t,e){var n=new URLSearchParams(window.location.search);if("URLSearchParams"in window){""===e?n.delete(t):n.set(t,e);var a=window.location.pathname+"?"+n.toString();history.pushState(null,"",a)}}function clearQueryStringParameter(){new URLSearchParams(window.location.search);if("URLSearchParams"in window){var t=window.location.pathname;history.pushState(null,"",t)}}function appendSelectboxStateClass(t,e){""!==e?t.addClass("changed"):t.removeClass("changed")}function replaceUnitText(t){var e=flat_view?"譜面":"曲";return t.replace("unit",e)}toggleSwitch.addEventListener("change",switchTheme,!1),transitionEndCallback=t=>{root.removeEventListener(transitionEvent,transitionEndCallback),root.classList.remove("transitioning")},$(document).ready((function(){function t(){dataLayer.push(arguments)}"URLSearchParams"in window&&updateChartLevelSelectboxValue(searchParams),$("html").removeClass("page-loading"),window.dataLayer=window.dataLayer||[],t("js",new Date),t("config","UA-141271073-1"),t("config","G-YZ8GJR7QFL")}));
var searchParams=new URLSearchParams(window.location.search);function hasPropertyAndValue(a,e){return a.hasOwnProperty(e)&&""!==a[e]}function sortLevels(a){return function(e,n,r,t){var s=a+"_i";return"sort"===n?e[s]?addLeadingZero(e[s]):addLeadingZero(e[a]):e[a]}}function addLeadingZero(a){return""!=a?(lev_processed=parseInt(a)<10?"0"+a:a,lev_processed):""}function sortByLeadingZeros(a){return function(e,n){var r=e[a]?e[a]:"",t=n[a]?n[a]:"";return addLeadingZero(r).localeCompare(addLeadingZero(t))}}function renderLvNum(a){return function(e,n,r){if("display"===n&&r[a]){var t=a+"_i",s=r[t]?`<span class="lv-num-precise">${r[t]}</span>`:"",i=r[a].match(/^([0-9]{1,2})(\+)?$/);return`<div class="inner-wrap"><span class="lv-num-simple">${i?`<span class="num">${i[1]}</span>`:r[a]}${"+"===i[2]?'<span class="plus">+</span>':""}${s}</div>`}return e}}function renderChartDifficultyNameAndLv(a,e,n,r,t){return function(n,s,i){if("display"===s){var o=convertDifficultyNames(i[a],!1,t),l="we_kanji"===i[a]?"☆"+i[r]:i[r],c=i[e].match(/^([0-9]{1,2})(\+)?$/);if(c){var u=c[1];return"+"===c[2]?`<div class="inner-wrap"><span class="diff-name">${o}</span><span class="lv-num-wrap"><span class="lv-num-simple"><span class="num">${u}</span><span class="plus">+</span></span><span class="lv-num-precise">${l}</span></span></div>`:`<div class="inner-wrap"><span class="diff-name">${o}</span><span class="lv-num-wrap"><span class="lv-num-simple"><span class="num">${u}</span></span><span class="lv-num-precise">${l}</span></span></div>`}return`<div class="inner-wrap"><span class="diff-name">${o}</span><span class="lv-num-wrap"><span class="lv-num-simple"><span class="num">${i[e]}</span></span><span class="lv-num-precise">${l}</span></span></div>`}return n}}function renderChartLinkBtn(a){return function(a,e,n){return"display"===e?chartLinkBtn(n.chart_link):a}}function chartLinkBtn(a){return""!==a?`<a class="btn chartlink" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" href="https://sdvx.in/chunithm/${a}.htm">\n                    <span class="img"></span><span>譜面確認</span>\n                </a><span class="chart-provider">sdvx.in 提供</span>`:""}function renderChartDifficultyName(a,e){return function(n,r,t){return"display"===r?'<span class="diff-name">'+convertDifficultyNames(t[a],!1,e)+"</span>":n}}function convertDifficultyNames(a,e,n){const r=n[a];if(e){var t=Object.keys(n).indexOf(a)+1;return a.startsWith("dx_")&&(t-=1),1===t.toString().length&&(t="0"+t),`${t} ${r}`}return r}function sortByDifficultyCategory(a,e){return function(n,r){return convertDifficultyNames(n[a],!0,e).localeCompare(convertDifficultyNames(r[a],!0,e))}}function renderInWrapper(){return function(a,e,n){return"display"===e?'<div class="inner-wrap">'+a+"</div>":a}}function flattenMusicData(a,e,n,r){return e?a.map((a=>Object.keys(n).map((e=>r(a,e))))).flat().filter((a=>!!a)):a}function formatDate(a,e){if(8===a.length)var n=a.slice(0,4),r=a.slice(4,6),t=a.slice(6,8);else if(6===a.length)n="20"+a.slice(0,2),r=a.slice(2,4),t=a.slice(4,6);var s=`${n}-${r}-${t}`;if("JP"==e)var i=((new Date).getFullYear()==n?"":n+"/")+`${r}/${t}(${["日","月","火","水","木","金","土"][new Date(s).getDay()]})`;else i=s;return i}function getColumnIndexByName(a){return columns_params.findIndex((function(e){return e.name===a}))}function tableInitCompleteFunctions(a){generateFilterDropdowns(a),applyFilterFromURLSearchParams(a,searchParams),a.on("order.dt",(function(){toggleDateRowGroup(a)})),$("#table").addClass("loading-done"),$("html").removeClass("table-loading"),$("#table").on("column-visibility.dt",(function(){$.fn.dataTable.tables({visible:!0,api:!0}).columns.adjust()})),$("select#chart_lev").on("change",(function(){var e=$(this),n=$(this).val(),r=$.fn.dataTable.util.escapeRegex($(this).val());"filter"==e.data("type")?(a.api().column("chart_lev:name").search(r?"^"+r+"$":"",!0,!1),updateQueryStringParameter("chart_lev",n),a.api().draw()):window.location.href="./lv?chart_lev="+encodeURIComponent(n)})),$("button.reset-search").on("click",(function(){a.api().order(default_order).search("").columns().search("").draw(),clearQueryStringParameter(),toggleDateRowGroup(a),$(".toolbar.filters select").prop("selectedIndex",0).removeClass("changed")}))}function generateFilterDropdowns(a){var e=a.api().rows().data();a.api().columns().every((function(){var n=a.api().order(),r=this,t=r.data(),s=columns_params[r.index()];if("filterable"in s&&1==s.filterable){var i=$('<div class="select-wrap '+s.className+'"><span class="label">'+s.displayTitle+"</span></div>").appendTo($(".toolbar.filters")),o=$('<select id="'+s.name+'"><option value="" data-default>——</option></select>');if(o.appendTo(i),o.on("change",(function(){var a=$(this).val(),e=$.fn.dataTable.util.escapeRegex($(this).val());appendSelectboxStateClass($(this),a),r.index()===getColumnIndexByName("date")||""===e&&n[0][0]===getColumnIndexByName("date")?r.rowGroup().enable():r.rowGroup().disable(),updateQueryStringParameter(s.name,a),r.search(e?"^"+e+"$":"",!0,!1).draw()})),t=s.customDropdownSortSource?t.map((function(a,e){return e})).sort((function(a,n){var r=e[a],t=e[n];return"function"==typeof s.customDropdownSortSource?s.customDropdownSortSource(r,t):r[s.customDropdownSortSource].localeCompare(t[s.customDropdownSortSource])})).map((function(a){return t[a]})):t.sort(),s.reverseSortOrder&&t.reverse(),t.unique().each((function(a,e){""!=a&&o.append('<option value="'+a+'">'+a+"</option>")})),"URLSearchParams"in window){var l=searchParams.get(s.name);if(null!==l){var c=unescapeSlashes(l);t.unique().each((function(a){o.val(c)})),appendSelectboxStateClass(o,c)}}}}))}function applyFilterFromURLSearchParams(a,e){"URLSearchParams"in window&&(e.forEach((function(n,r){a.api().columns().every((function(){var a=columns_params[this.index()],n=e.get(a.name),r=$.fn.dataTable.util.escapeRegex(decodeURIComponent(n));null!==n&&this.search(n?"^"+r+"$":"",!0,!1)}))})),a.api().draw())}function toggleDateRowGroup(a){var e=a.api().order(),n=a.api().columns().search(),r=!1;for(let a=0;a<n.length;a+=1)if(a in n&&""!==n[a]){r=!0;break}return e[0][0]!==getColumnIndexByName("date")?void a.api().rowGroup().disable():e[0][0]!==getColumnIndexByName("date")||r?void 0:void a.api().rowGroup().enable()}
