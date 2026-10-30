// PornHD 4K（pornhd4k.net）：列表 / 工作室 / 标签 / 搜索 / 详情 / 播放。
// 播放链：详情页 var movie.id（剧集 id）-> 先 GET 详情页拿 ASP.NET_SessionId，
// 再 GET ajax/get_sources/<剧集 id>/<md5(剧集 id + 随机 token + 盐)>?count=1&mobile=true，
// 须同时带 session cookie 与 token cookie，返回 JWPlayer playlist，sources 里是带签名的 HLS。
// 站内只有一档（实测两部片均为 720p），取档位数字最大的一路。
WidgetMetadata = {
  id: "pornhd4k",
  title: "PornHD 4K",
  description: "pornhd4k.net 列表、工作室、标签、搜索与 HLS 播放源（播放经 pornhd4k-proxy Worker 剥掉分段 PNG 包装后供流）",
  author: "Coko",
  version: "1.0.6",
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
  // 取源与剥 PNG 包装都在 Worker（pornhd4k.100923.xyz）里做，模块只返回代理播放列表地址。
  if (!url || url.indexOf(SITE + "/movies/") !== 0) return [];
  var playUrl = "https://pornhd4k.100923.xyz/playlist.m3u8?url=" + encodeURIComponent(url);
  return [{ url: playUrl, description: "720p · PornHD", customHeaders: { "User-Agent": UA_DESKTOP, Referer: url }, playerType: "app" }];
}
