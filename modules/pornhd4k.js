// PornHD 4K（pornhd4k.net）：列表 / 工作室 / 标签 / 搜索 / 详情 / 播放。
// 播放链：详情页 var movie.id -> get_sources（md5 签名 + token cookie）取签名 HLS，取档位最大的一路。
// 本机取源，不再走 Worker；playerType system 直接起播。
WidgetMetadata = {
  id: "pornhd4k",
  title: "PornHD 4K",
  description: "pornhd4k.net 列表、工作室、标签、搜索与 HLS 播放源（本机取源、直连平台播放，不再经 Worker 代理）",
  author: "Coko",
  version: "1.1.1",
  requiredVersion: "0.0.1",
  site: "https://pornhd4k.net",
  detailCacheDuration: 30,
  search: {
    title: "PornHD 搜索",
    functionName: "searchVideos",
    params: [
      { name: "keyword", title: "关键词 / 演员 / 片商", type: "input" },
      { name: "page", title: "页码", type: "page" },
    ],
  },
  modules: [
    {
      id: "loadResource",
      title: "播放资源",
      functionName: "loadResource",
      type: "stream",
      cacheDuration: 0,
      params: [],
    },
    {
      id: "latest",
      title: "最新",
      functionName: "loadList",
      type: "video",
      cacheDuration: 120,
      params: [
        { name: "path", title: "分类", type: "constant", value: "/premium-porn-hd/" },
        { name: "page", title: "页码", type: "page" },
      ],
    },
    {
      id: "studio",
      title: "工作室",
      functionName: "loadList",
      type: "video",
      cacheDuration: 120,
      params: [
        { name: "studio", title: "工作室", type: "enumeration", value: "brazzers", enumOptions: [{ title: "Brazzers", value: "brazzers" }, { title: "BLACKED", value: "blacked" }, { title: "MYLF", value: "mylf" }, { title: "TeamSkeet", value: "team-skeet" }, { title: "BangBros", value: "bangbros" }, { title: "TUSHY", value: "tushy" }, { title: "MOFOS", value: "mofos" }, { title: "Adult Time", value: "adult-time" }, { title: "Nubiles Porn", value: "nubiles-porn" }, { title: "Babes.com", value: "babes-com" }, { title: "Twistys", value: "twistys" }, { title: "Naughty America", value: "naughty-america" }, { title: "Jules Jordan", value: "jules-jordan" }] },
        { name: "page", title: "页码", type: "page" },
      ],
    },
    {
      id: "tag",
      title: "热门标签",
      functionName: "loadList",
      type: "video",
      cacheDuration: 120,
      params: [
        { name: "tag", title: "标签（点选热门或直接输入 tag 英文名）", type: "input", value: "big-ass", placeholders: [{ title: "Big Ass", value: "big-ass" }, { title: "Cumshot", value: "cumshot" }, { title: "Amateur", value: "amateur" }, { title: "Missionary", value: "missionary" }, { title: "Couple", value: "couple" }, { title: "Big Natural Tits", value: "big-natural-tits" }, { title: "Babe", value: "babe" }, { title: "BWC", value: "bwc" }, { title: "Doggy Style", value: "doggy-style" }, { title: "Morning", value: "morning" }, { title: "Teen Sex", value: "teen-sex" }, { title: "Anal", value: "anal" }, { title: "Blowjob", value: "blowjob" }, { title: "Hardcore", value: "hardcore" }, { title: "MILF", value: "milf" }, { title: "Threesome", value: "threesome" }] },
        { name: "page", title: "页码", type: "page" },
      ],
    },
  ],
};

var SITE = "https://pornhd4k.net";
var UA_IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
var UA_DESKTOP = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
// get_sources 签名盐与 token cookie 名种子，均取自站内 fixx.js（全站通用，非单片）。
var PH_SALT = "98126avrbi6m49vd7shxkn985";
var PH_TOKEN_SEED = "n1sqcua67bcq9826avrbi6m49vd7shxkn985mhodk06twz87wwxtp3dqiicks2dfyud213k6ygiomq01s94e4tr9v0k887bkyud213k6ygiomq01s94e4tr9v0k887bkqocxzw39esdyfhvtkpzq9n4e7at4kc6k8sxom08bl4dukp16h09oplu7zov4m5f8";

// 手写 MD5（与 pornhd4k-proxy 同款，纯 JS，不依赖桥接层 crypto）。
function phMd5(str) {
  function phUtf8(s) {
    var enc = encodeURIComponent(s);
    var out = "";
    for (var i = 0; i < enc.length; i++) {
      var ch = enc.charAt(i);
      if (ch === "%") { out += String.fromCharCode(parseInt(enc.substr(i + 1, 2), 16)); i += 2; }
      else out += ch;
    }
    return out;
  }
  function rl(n, c) { return (n << c) | (n >>> (32 - c)); }
  function add(x, y) {
    var l = (x & 0xffff) + (y & 0xffff);
    var m = (x >> 16) + (y >> 16) + (l >> 16);
    return (m << 16) | (l & 0xffff);
  }
  function f(q, a, b, x, s, t) { return add(rl(add(add(a, q), add(x, t)), s), b); }
  function g(q, a, b, x, s, t) { return add(rl(add(add(a, q), add(x, t)), s), b); }
  function h(q, a, b, x, s, t) { return add(rl(add(add(a, q), add(x, t)), s), b); }
  function i(q, a, b, x, s, t) { return add(rl(add(add(a, q), add(x, t)), s), b); }
  function ff(a, b, c, d, x, s, t) { return f((b & c) | (~b & d), a, b, x, s, t); }
  function gg(a, b, c, d, x, s, t) { return g((b & d) | (c & ~d), a, b, x, s, t); }
  function hh(a, b, c, d, x, s, t) { return h(b ^ c ^ d, a, b, x, s, t); }
  function ii(a, b, c, d, x, s, t) { return i(c ^ (b | ~d), a, b, x, s, t); }
  function binl(s) {
    var a = [];
    var m = (1 << 8) - 1;
    for (var k = 0; k < s.length * 8; k += 8) a[k >> 5] |= (s.charCodeAt(k / 8) & m) << (k % 32);
    return a;
  }
  function hex(n) {
    var s = "";
    for (var j = 0; j < 4; j++) s += ("0" + ((n >>> (j * 8)) & 0xff).toString(16)).slice(-2);
    return s;
  }
  var utf = phUtf8(str);
  var x = binl(utf);
  var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
  var bl = utf.length * 8;
  x[bl >> 5] |= 0x80 << (bl % 32);
  x[(((bl + 64) >>> 9) << 4) + 14] = bl;
  for (var k = 0; k < x.length; k += 16) {
    var oa = a, ob = b, oc = c, od = d;
    a = ff(a, b, c, d, x[k], 7, -680876936); d = ff(d, a, b, c, x[k + 1], 12, -389564586); c = ff(c, d, a, b, x[k + 2], 17, 606105819); b = ff(b, c, d, a, x[k + 3], 22, -1044525330);
    a = ff(a, b, c, d, x[k + 4], 7, -176418897); d = ff(d, a, b, c, x[k + 5], 12, 1200080426); c = ff(c, d, a, b, x[k + 6], 17, -1473231341); b = ff(b, c, d, a, x[k + 7], 22, -45705983);
    a = ff(a, b, c, d, x[k + 8], 7, 1770035416); d = ff(d, a, b, c, x[k + 9], 12, -1958414417); c = ff(c, d, a, b, x[k + 10], 17, -42063); b = ff(b, c, d, a, x[k + 11], 22, -1990404162);
    a = ff(a, b, c, d, x[k + 12], 7, 1804603682); d = ff(d, a, b, c, x[k + 13], 12, -40341101); c = ff(c, d, a, b, x[k + 14], 17, -1502002290); b = ff(b, c, d, a, x[k + 15], 22, 1236535329);
    a = gg(a, b, c, d, x[k + 1], 5, -165796510); d = gg(d, a, b, c, x[k + 6], 9, -1069501632); c = gg(c, d, a, b, x[k + 11], 14, 643717713); b = gg(b, c, d, a, x[k], 20, -373897302);
    a = gg(a, b, c, d, x[k + 5], 5, -701558691); d = gg(d, a, b, c, x[k + 10], 9, 38016083); c = gg(c, d, a, b, x[k + 15], 14, -660478335); b = gg(b, c, d, a, x[k + 4], 20, -405537848);
    a = gg(a, b, c, d, x[k + 9], 5, 568446438); d = gg(d, a, b, c, x[k + 14], 9, -1019803690); c = gg(c, d, a, b, x[k + 3], 14, -187363961); b = gg(b, c, d, a, x[k + 8], 20, 1163531501);
    a = gg(a, b, c, d, x[k + 13], 5, -1444681467); d = gg(d, a, b, c, x[k + 2], 9, -51403784); c = gg(c, d, a, b, x[k + 7], 14, 1735328473); b = gg(b, c, d, a, x[k + 12], 20, -1926607734);
    a = hh(a, b, c, d, x[k + 5], 4, -378558); d = hh(d, a, b, c, x[k + 8], 11, -2022574463); c = hh(c, d, a, b, x[k + 11], 16, 1839030562); b = hh(b, c, d, a, x[k + 14], 23, -35309556);
    a = hh(a, b, c, d, x[k + 1], 4, -1530992060); d = hh(d, a, b, c, x[k + 4], 11, 1272893353); c = hh(c, d, a, b, x[k + 7], 16, -155497632); b = hh(b, c, d, a, x[k + 10], 23, -1094730640);
    a = hh(a, b, c, d, x[k + 13], 4, 681279174); d = hh(d, a, b, c, x[k], 11, -358537222); c = hh(c, d, a, b, x[k + 3], 16, -722521979); b = hh(b, c, d, a, x[k + 6], 23, 76029189);
    a = hh(a, b, c, d, x[k + 9], 4, -640364487); d = hh(d, a, b, c, x[k + 12], 11, -421815835); c = hh(c, d, a, b, x[k + 15], 16, 530742520); b = hh(b, c, d, a, x[k + 2], 23, -995338651);
    a = ii(a, b, c, d, x[k], 6, -198630844); d = ii(d, a, b, c, x[k + 7], 10, 1126891415); c = ii(c, d, a, b, x[k + 14], 15, -1416354905); b = ii(b, c, d, a, x[k + 5], 21, -57434055);
    a = ii(a, b, c, d, x[k + 12], 6, 1700485571); d = ii(d, a, b, c, x[k + 3], 10, -1894986606); c = ii(c, d, a, b, x[k + 10], 15, -1051523); b = ii(b, c, d, a, x[k + 1], 21, -2054922799);
    a = ii(a, b, c, d, x[k + 8], 6, 1873313359); d = ii(d, a, b, c, x[k + 15], 10, -30611744); c = ii(c, d, a, b, x[k + 6], 15, -1560198380); b = ii(b, c, d, a, x[k + 13], 21, 1309151649);
    a = ii(a, b, c, d, x[k + 4], 6, -145523070); d = ii(d, a, b, c, x[k + 11], 10, -1120210379); c = ii(c, d, a, b, x[k + 2], 15, 718787259); b = ii(b, c, d, a, x[k + 9], 21, -343485551);
    a = add(a, oa); b = add(b, ob); c = add(c, oc); d = add(d, od);
  }
  return (hex(a) + hex(b) + hex(c) + hex(d)).toLowerCase();
}

function phToken() {
  var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  var out = "";
  for (var i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function phEpisodeId(html) {
  // 详情页是 var movie = { id: "..." } 对象字面量，不是 var movie.id = "..."；另有两路 input 兜底。
  var m = html.match(/var movie\s*=\s*\{\s*id:\s*"([^"]+)"/);
  if (m) return m[1];
  m = html.match(/id="uuid"[^>]*value="([^"]+)"/);
  if (m) return m[1];
  m = html.match(/<input[^>]*value="([A-Z0-9]{10,})"[^>]*class="[0-9a-f-]{36}"/);
  return m ? m[1] : "";
}

// 本机请求桥：Widget.http.request + base64Data，原始字节本地解码。
var PH_B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function phB64Decode(b64) {
  var s = String(b64 || "").replace(/[\t\n\f\r ]/g, "");
  var pad = 0;
  if (s.slice(-2) === "==") pad = 2;
  else if (s.slice(-1) === "=") pad = 1;
  var end = s.length - pad;
  var out = new Uint8Array(Math.floor(end * 3 / 4));
  var at = 0;
  for (var i = 0; i < end; i += 4) {
    var a = PH_B64.indexOf(s.charAt(i));
    var b = PH_B64.indexOf(s.charAt(i + 1));
    var c = i + 2 < end ? PH_B64.indexOf(s.charAt(i + 2)) : 0;
    var d = i + 3 < end ? PH_B64.indexOf(s.charAt(i + 3)) : 0;
    if (a < 0 || b < 0 || c < 0 || d < 0) return new Uint8Array(0);
    out[at++] = (a << 2) | (b >> 4);
    if (at < out.length) out[at++] = (b << 4) | (c >> 2);
    if (at < out.length) out[at++] = (c << 6) | d;
  }
  return out;
}
function phBytesToText(bytes) {
  if (typeof TextDecoder !== "undefined") {
    try { return new TextDecoder().decode(bytes); } catch (e) { /* fall through */ }
  }
  // JavaScriptCore 无 TextDecoder 时的兜底：按 UTF-8 百分号解码。
  var s = "";
  for (var i = 0; i < bytes.length; i++) s += "%" + bytes[i].toString(16).padStart(2, "0");
  try { return decodeURIComponent(s); } catch (e) { return ""; }
}
async function phFetchText(url, headers) {
  // 优先走 request + base64Data；桥接层没有 request 时回落到 http.get。
  try {
    if (Widget.http && typeof Widget.http.request === "function") {
      var resp = await Widget.http.request({ url: url, method: "GET", headers: headers || {}, base64Data: true, timeout: 25 });
      var data = resp && resp.data;
      if (typeof data === "string") return phBytesToText(phB64Decode(data));
      if (data instanceof Uint8Array) return phBytesToText(data);
      if (data) return String(data);
      return "";
    }
  } catch (e) { /* 回落 */ }
  try {
    var r = await Widget.http.get(url, { headers: headers || {} });
    return (r && r.data) || "";
  } catch (e) { return ""; }
}


function phAbs(u) {
  if (!u) return "";
  if (u.indexOf("http") === 0) return u;
  if (u.indexOf("//") === 0) return "https:" + u;
  if (u.charAt(0) === "/") return SITE + u;
  return SITE + "/" + u;
}

function phGet(url, referer) {
  return Widget.http.get(url, { headers: { "User-Agent": UA_IPHONE, Referer: referer || SITE + "/" } });
}

function phParseCards(html) {
  var out = [];
  if (!html) return out;
  var $ = Widget.html.load(html);
  $(".ml-item").each(function () {
    var a = $(this).find("a.ml-mask").first();
    var href = a.attr("href") || "";
    if (!href) return;
    var url = phAbs(href);
    var title = "";
    var h2 = $(this).find(".mli-info h2").first();
    if (h2.length) title = (h2.text() || "").trim();
    if (!title) title = (a.attr("title") || "").trim();
    var img = $(this).find("img[data-original]").first();
    var cover = img.attr("data-original") || img.attr("src") || "";
    out.push({ url: url, title: title, cover: phAbs(cover) });
  });
  return out;
}

function phToItems(cards) {
  var seen = {};
  var items = [];
  for (var i = 0; i < cards.length; i++) {
    var c = cards[i];
    if (!c.url || seen[c.url]) continue;
    seen[c.url] = true;
    items.push({ id: c.url, title: c.title || c.url, type: "video", mediaType: "movie", link: c.url, backdropPath: c.cover || "" });
  }
  return items;
}

function phListUrl(path, page) {
  var p = parseInt(page || 1, 10);
  if (isNaN(p) || p < 1) p = 1;
  if (path.charAt(path.length - 1) !== "/") path += "/";
  return SITE + path + "page-" + p;
}

function phTaxPath(tax) {
  if (!tax) return "";
  var s = String(tax);
  var m = s.match(/\/(tag|pornstar)\/([a-z0-9-]+)\/?/);
  if (m) return "/" + m[1] + "/" + m[2] + "/";
  return "";
}

async function loadList(params) {
  params = params || {};
  // 详情页点演员 / 标签后，App 带着 genreId / peopleId 回到列表模块
  var tax = params.genreId || params.peopleId || "";
  var path = "";
  if (tax) path = phTaxPath(tax);
  if (!path && params.studio) path = "/studio/" + String(params.studio).toLowerCase() + "/";
  if (!path) {
    // 标签：单个 input 参数，placeholders 是固定热门标签（点选填入），也可直接输任意 tag 英文名
    var raw = String(params.tag || "").trim();
    var slug = raw.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
    if (slug) path = "/tag/" + slug + "/";
  }
  if (!path) path = params.path || "/premium-porn-hd/";
  var url = phListUrl(path, params.page);
  var cards = phParseCards((await phGet(url)).data || "");
  if (!cards.length && path !== "/premium-porn-hd/") {
    cards = phParseCards((await phGet(phListUrl("/premium-porn-hd/", params.page))).data || "");
  }
  return phToItems(cards);
}

async function searchVideos(params) {
  params = params || {};
  var kw = String(params.keyword || params.query || "").trim();
  if (!kw) return [];
  var p = parseInt(params.page || 1, 10);
  if (isNaN(p) || p < 1) p = 1;
  var enc = encodeURIComponent(kw);
  var url = p <= 1 ? SITE + "/search/" + enc : SITE + "/search/" + enc + "/page-" + p;
  return phToItems(phParseCards((await phGet(url)).data || ""));
}

function phMeta(html, prop) {
  var m = html.match(new RegExp("<meta[^>]+(?:property|name)=\"" + prop + "\"[^>]+content=\"([^\"]*)\"", "i"));
  if (m) return m[1];
  m = html.match(new RegExp("<meta[^>]+content=\"([^\"]*)\"[^>]+(?:property|name)=\"" + prop + "\"", "i"));
  return m ? m[1] : "";
}

function phUnesc(s) {
  return (s || "").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

async function loadDetail(link) {
  // App 传的是 link 字符串（其余模块皆如此）；兼容对象形式以防万一。
  var url = (typeof link === "string") ? link : ((link && (link.url || link.link || link.id)) || "");
  if (!url || url.indexOf(SITE) !== 0 || url.indexOf("/movies/") === -1) return null;
  var html = (await phGet(url, SITE + "/")).data || "";
  if (!html) return null;
  var title = phUnesc(phMeta(html, "og:title")) || "";
  var desc = phUnesc(phMeta(html, "og:description") || phMeta(html, "description")) || "";
  var cover = phMeta(html, "og:image") || "";
  var item = { id: url, title: title || url, type: "video", mediaType: "movie", link: url, description: desc, backdropPath: phAbs(cover), coverUrl: phAbs(cover) };
  var $ = Widget.html.load(html);
  var stars = [];
  $("a[href^=\"/pornstar/\"]").each(function () {
    var href = $(this).attr("href") || "";
    var name = ($(this).text() || "").trim();
    if (href && name && stars.indexOf(name) === -1) {
      stars.push(name);
      item.peoples = item.peoples || [];
      item.peoples.push({ id: href, title: name, name: name, link: phAbs(href), role: "演员" });
    }
  });
  var tags = [];
  $("a[href^=\"/tag/\"]").each(function () {
    var href = $(this).attr("href") || "";
    var name = ($(this).attr("title") || $(this).text() || "").trim();
    if (href && name && tags.indexOf(href) === -1) {
      tags.push(href);
      item.genreItems = item.genreItems || [];
      item.genreItems.push({ id: href, title: name });
    }
  });
  if (item.genreItems && item.genreItems.length) item.genreTitle = "标签";
  var related = phParseCards(html).filter(function (c) { return c.url !== url; });
  if (related.length) item.relatedItems = phToItems(related);
  return item;
}





async function loadResource(params) {
  params = params || {};
  var url = params.url || params.link || params.id || "";
  // 来源隔离：只认本站详情页，外站链接与 TMDB id 一律不出源且零请求。
  if (!url || url.indexOf(SITE + "/movies/") !== 0) return [];
  var html = await phFetchText(url, { "User-Agent": UA_IPHONE, Referer: SITE + "/", "Accept-Encoding": "identity" });
  if (!html) return [];
  var ep = phEpisodeId(html);
  if (!ep) return [];
  var token = phToken();
  var sign = phMd5(ep + token + PH_SALT);
  var cookieName = PH_TOKEN_SEED.substring(13, 37) + ep + PH_TOKEN_SEED.substring(40, 64);
  var gsUrl = SITE + "/ajax/get_sources/" + ep + "/" + sign + "?count=1&mobile=true";
  var gsText = await phFetchText(gsUrl, {
    "User-Agent": UA_IPHONE,
    Referer: url,
    "X-Requested-With": "XMLHttpRequest",
    "Accept-Encoding": "identity",
    Cookie: cookieName + "=" + token,
  });
  if (!gsText) return [];
  var data = null;
  try { data = JSON.parse(gsText); } catch (e) { return []; }
  var sources = (data && data.playlist && data.playlist[0] && data.playlist[0].sources) || [];
  if (!sources.length) return [];
  var best = null, bestQ = -1;
  for (var i = 0; i < sources.length; i++) {
    var f = sources[i].file || "";
    if (!f) continue;
    var qm = String(sources[i].label || "").match(/(\d+)/);
    var q = qm ? parseInt(qm[1], 10) : 0;
    if (q >= bestQ) { bestQ = q; best = f; }
  }
  if (!best) return [];
  var label = (bestQ > 0 ? bestQ + "p" : "720p") + " · PornHD";
  return [{ url: best, description: label, customHeaders: { "User-Agent": UA_DESKTOP, Referer: url }, playerType: "system" }];
}
