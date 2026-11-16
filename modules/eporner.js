WidgetMetadata = {
  id: "eporner",
  title: "Eporner",
  version: "1.2.5",
  requiredVersion: "0.0.1",
  description: "Eporner HD porn videos",
  author: "Coko",
  site: "https://www.eporner.com/",
  iconurl: "https://tu.100923.xyz/file/1794737566944_eporner-icon-round.png",
  detailCacheDuration: 60,
  globalParams: [
    {
      name: "cookie",
      title: "Cookie",
      type: "input"
    },
    {
      name: "showApiWithCookie",
      title: "CDN线路",
      type: "enumeration",
      value: "off",
      enumOptions: [
        { title: "显示", value: "on" },
        { title: "不显示", value: "off" }
      ]
    }
  ],
  modules: [
    {
      id: "browse",
      type: "video",
      title: "最新",
      functionName: "loadBrowseList",
      params: [
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "popular",
      type: "video",
      title: "热门",
      functionName: "loadPopularList",
      params: [
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "categories",
      type: "video",
      title: "分类",
      functionName: "loadCategoryList",
      params: [
        {
          name: "category",
          title: "分类",
          type: "enumeration",
          value: "anal",
          enumOptions: [
            { title: "4K", value: "4k-porn" },
            { title: "1080p", value: "hd-1080p" },
            { title: "60FPS", value: "60fps" },
            { title: "VR", value: "vr-porn" },
            { title: "业余", value: "amateur" },
            { title: "肛交", value: "anal" },
            { title: "亚洲", value: "asian" },
            { title: "丰满", value: "bbw" },
            { title: "大胸", value: "big-tits" },
            { title: "口交", value: "blowjob" },
            { title: "内射", value: "creampie" },
            { title: "黑人", value: "ebony" },
            { title: "硬核", value: "hardcore" },
            { title: "动漫", value: "hentai" },
            { title: "跨种族", value: "interracial" },
            { title: "日本", value: "japanese" },
            { title: "拉丁", value: "latina" },
            { title: "熟女", value: "milf" },
            { title: "POV", value: "pov-porn" },
            { title: "少女", value: "teens" },
            { title: "三人", value: "threesome" },
            { title: "女优", value: "pornstar" },
            { title: "自制", value: "homemade" },
            { title: "大屁股", value: "big-ass" },
            { title: "褐发", value: "brunette" },
            { title: "颜射", value: "cumshot" },
            { title: "金发", value: "blonde" },
            { title: "大鸡巴", value: "big-dick" },
            { title: "群交", value: "group-sex" }
          ]
        },
        {
          name: "customCategory",
          title: "自定义分类",
          type: "input"
        },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          value: "latest",
          enumOptions: [
            { title: "最新", value: "latest" },
            { title: "最多播放", value: "most-viewed" },
            { title: "最高评分", value: "top-rated" },
            { title: "最长时长", value: "longest" },
            { title: "本周热门", value: "top-weekly" },
            { title: "本月热门", value: "top-monthly" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "tags",
      type: "video",
      title: "标签",
      functionName: "loadTagList",
      params: [
        {
          name: "tag",
          title: "标签",
          type: "enumeration",
          value: "anal",
          enumOptions: [
            { title: "肛交", value: "anal" },
            { title: "口交", value: "blowjob" },
            { title: "大胸", value: "big-tits" },
            { title: "大屁股", value: "big-ass" },
            { title: "内射", value: "creampie" },
            { title: "颜射", value: "cumshot" },
            { title: "硬核", value: "hardcore" },
            { title: "熟女", value: "milf" },
            { title: "业余", value: "amateur" },
            { title: "亚洲", value: "asian" },
            { title: "黑人", value: "ebony" },
            { title: "日本", value: "japanese" },
            { title: "拉丁", value: "latina" },
            { title: "POV", value: "pov-porn" },
            { title: "三人", value: "threesome" },
            { title: "潮吹", value: "squirt" },
            { title: "成熟", value: "mature" },
            { title: "跨种族", value: "interracial" },
            { title: "群交", value: "group-sex" },
            { title: "褐发", value: "brunette" },
            { title: "自制", value: "homemade" },
            { title: "女优", value: "pornstar" },
            { title: "金发", value: "blonde-Q18BRqCG" },
            { title: "自慰", value: "masturbation" },
            { title: "大鸡巴", value: "big-dick" },
            { title: "玩具", value: "toys" },
            { title: "摄像头", value: "webcam" },
            { title: "手交", value: "handjob" },
            { title: "小胸", value: "small-tits" },
            { title: "内衣", value: "lingerie" }
          ]
        },
        {
          name: "customTag",
          title: "自定义标签",
          type: "input"
        },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          value: "latest",
          enumOptions: [
            { title: "最新", value: "latest" },
            { title: "最多播放", value: "most-viewed" },
            { title: "最高评分", value: "top-rated" },
            { title: "最长时长", value: "longest" },
            { title: "最短时长", value: "shortest" },
            { title: "本周热门", value: "top-weekly" },
            { title: "本月热门", value: "top-monthly" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "models",
      type: "video",
      title: "演员作品",
      functionName: "loadModelList",
      params: [
        {
          name: "model",
          title: "演员",
          type: "enumeration",
          value: "angela-white-umh5v",
          enumOptions: [
            { title: "Angela White", value: "angela-white-umh5v" },
            { title: "Lana Rhoades", value: "lana-rhoades-YiJqq" },
            { title: "Lisa Ann", value: "lisa-ann" },
            { title: "Abella Danger", value: "abella-danger-Ew4IX" },
            { title: "Riley Reid", value: "riley-reid" },
            { title: "Dani Daniels", value: "dani-daniels-OqP7M" },
            { title: "Violet Myers", value: "violet-myers-6oeKC" },
            { title: "Ava Addams", value: "ava-addams-2h90g" },
            { title: "Cherie DeVille", value: "cherie-deville-YQvGz" },
            { title: "Lena Paul", value: "lena-paul-8XEus" },
            { title: "Cory Chase", value: "cory-chase-EuxW7" },
            { title: "Adriana Chechik", value: "adriana-chechik-owwTE" },
            { title: "Lauren Phillips", value: "lauren-phillips-wPFdI" },
            { title: "Abigaiil Morris", value: "abigaiil-morris-OgSyD" },
            { title: "Kenzie Reeves", value: "kenzie-reeves-nZnls" },
            { title: "Payton Preslee", value: "payton-preslee" }
          ]
        },
        {
          name: "customModel",
          title: "自定义演员（填演员页路径，如 angela-white-umh5v，填了就用这个）",
          type: "input"
        },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          value: "recent",
          enumOptions: [
            { title: "最新", value: "recent" },
            { title: "本周热门", value: "top-weekly" },
            { title: "最多播放", value: "most-viewed" },
            { title: "最高评分", value: "top-rated" },
            { title: "最长时长", value: "longest" },
            { title: "最短时长", value: "shortest" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "sites",
      type: "video",
      title: "频道",
      functionName: "loadSiteList",
      params: [
        {
          name: "site",
          title: "频道",
          type: "enumeration",
          value: "bangbros-videos",
          enumOptions: [
            { title: "BangBros", value: "bangbros-videos" },
            { title: "Brazzers", value: "brazzers-network" },
            { title: "Blacked", value: "blacked" },
            { title: "Tushy", value: "tushy" },
            { title: "Vixen", value: "vixen" },
            { title: "Reality Kings", value: "reality-kings-videos" },
            { title: "Naughty America", value: "naughty-america" },
            { title: "TeamSkeet", value: "teamskeet" },
            { title: "Adult Time", value: "adult-time" },
            { title: "Evil Angel", value: "evil-angel-network" },
            { title: "New Sensations", value: "new-sensations" },
            { title: "Scoreland", value: "scoreland" },
            { title: "Perved Family", value: "perved-family" },
            { title: "Nebraskacoeds", value: "nebraskacoeds" },
            { title: "SpringBreakLife", value: "springbreaklife" },
            { title: "Blacked RAW", value: "blackedraw" },
            { title: "Xprime", value: "xprime" },
            { title: "Nookies", value: "nookies" },
            { title: "XL Girls", value: "xl-girls" },
            { title: "Reality Kings Clips", value: "reality-kings-clips" },
            { title: "DF EXXXTRA", value: "df-exxxtra" },
            { title: "Jacquie Et Michel TV", value: "jacquie-et-michel-tv" },
            { title: "FapHouse", value: "faphouse" },
            { title: "LifeSelector", value: "lifeselector" },
            { title: "Gangbang Secrets", value: "gangbang-secrets" },
            { title: "Brazzers Videos", value: "brazzers-videos" },
            { title: "DFXtraa", value: "dfxtraa" },
            { title: "InkaSex", value: "inkasex" },
            { title: "EroCom", value: "erocom" },
            { title: "Sex Dot Cam", value: "sex-dot-cam" }
          ]
        },
        {
          name: "customSite",
          title: "自定义频道（填频道页路径，如 blacked，填了就用这个）",
          type: "input"
        },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          value: "latest",
          enumOptions: [
            { title: "最新", value: "latest" },
            { title: "最多播放", value: "most-viewed" },
            { title: "最高评分", value: "top-rated" },
            { title: "最长时长", value: "longest" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "loadResource",
      title: "播放资源",
      functionName: "loadResource",
      type: "stream",
      cacheDuration: 0,
      params: []
    }
  ],
  search: {
    title: "搜索",
    functionName: "search",
    params: [
      { name: "keyword", title: "关键词", type: "input" },
      { name: "page", title: "页码", type: "page" }
    ]
  }
};

var EP_SITE = "https://www.eporner.com";
var EP_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";
var EP_PAGE_SIZE = 24;
function epStoreGet(key) {
  try {
    var v = Widget.storage.get(key);
    if (v && typeof v.then === "function") return "";
    return v == null ? "" : v;
  } catch (e) { return ""; }
}
function epStoreSet(key, value) {
  try {
    var r = Widget.storage.set(key, value);
    if (r && typeof r.catch === "function") r.catch(function () {});
  } catch (e) {}
}
function epStoreRemove(key) {
  try {
    var r = Widget.storage.remove(key);
    if (r && typeof r.catch === "function") r.catch(function () {});
  } catch (e) {}
}
function epHttpStatus(res) {
  if (!res) return 0;
  if (typeof res.statusCode === "number") return res.statusCode;
  if (typeof res.status === "number") return res.status;
  return 0;
}
function epResolveUrl(base, loc) {
  if (!loc) return null;
  if (loc.indexOf("http://") === 0 || loc.indexOf("https://") === 0) return loc;
  if (loc.indexOf("//") === 0) return "https:" + loc;
  if (loc.charAt(0) === "/") return EP_SITE + loc;
  var dir = String(base || EP_SITE + "/");
  var q = dir.indexOf("?");
  if (q !== -1) dir = dir.slice(0, q);
  var h = dir.indexOf("#");
  if (h !== -1) dir = dir.slice(0, h);
  if (dir.charAt(dir.length - 1) !== "/") dir = dir.slice(0, dir.lastIndexOf("/") + 1);
  return dir + loc;
}
function epThumb(dataSrc, src) {
  var cands = [dataSrc, src];
  for (var i = 0; i < cands.length; i++) {
    var u = String(cands[i] || "").trim();
    if (!u) continue;
    if (u.indexOf("data:") === 0) continue;
    return u;
  }
  return "";
}

function epSlug(s) {
  return String(s || "").trim().replace(/\s+/g, "-").replace(/[^A-Za-z0-9\-]/g, "");
}

function epIsAgeGate(html) {
  return typeof html === "string" && (html.indexOf("agegate-page") !== -1 || html.indexOf("<title>Age verification") !== -1);
}

function epSleep(ms) {
  if (typeof setTimeout === "function") return new Promise(function (res) { setTimeout(res, ms); });
  return Promise.resolve();
}

async function epGet(url) {
  for (var attempt = 0; attempt < 3; attempt++) {
    var current = url;
    for (var i = 0; i < 4; i++) {
      var res = null;
      try {
        res = await Widget.http.get(current, { headers: { "User-Agent": EP_UA } });
      } catch (e) {
        res = null;
      }
      if (!res) break;
      var status = epHttpStatus(res) || 200;
      if (status >= 300 && status < 400) {
        var loc = (res.headers && (res.headers.location || res.headers.Location)) || null;
        if (!loc) return res;
        var next = epResolveUrl(current, loc);
        if (!next) return res;
        current = next;
        continue;
      }
      if (typeof res.data === "string" && (epIsAgeGate(res.data) || res.data.length === 0)) break;
      return res;
    }
    if (i >= 4) return null;
    if (attempt < 2) await epSleep(2000);
  }
  return null;
}

function epCover(thumb) {
  if (!thumb) return "";
  return thumb;
}

function epBackdrop(thumb, portrait) {
  if (!thumb) return "";
  var m = thumb.match(/\/(\d+)\/(\d+)_(?:240|360)\.jpg$/);
  if (m) {
    var dimensions = portrait ? "1080/1920" : "1920/1080";
    return "https://imggen.eporner.com/" + m[1] + "/" + dimensions + "/" + m[2] + ".jpg";
  }
  return epCover(thumb);
}

function epVideoOrientation(html) {
  var m = String(html || "").match(/data-video-analytics\s*=\s*([\"'])(.*?)\1/i);
  if (!m) return "";
  try {
    var raw = m[2].replace(/&quot;/g, '\"').replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, "&");
    var data = JSON.parse(raw);
    return data && (data.orientation === "portrait" || data.orientation === "landscape") ? data.orientation : "";
  } catch (e) {
    return "";
  }
}

function epDetailImageFields(orientation, poster) {
  if (orientation === "portrait") return { posterPath: epBackdrop(poster, true) };
  var landscape = epBackdrop(poster, false);
  return { coverUrl: landscape, backdropPath: landscape };
}

function epItemFromCard($, card) {
  var a = $(card).find(".mbtit a").first();
  var href = a.attr("href") || "";
  var m = href.match(/^\/video-([A-Za-z0-9]+)\//);
  if (!m) return null;
  var code = m[1];
  var img = $(card).find(".mbimg img").first();
  var thumb = epThumb(img.attr("data-src"), img.attr("src"));
  var dur = $(card).find(".mbtim").first().text().trim();
  var rate = $(card).find(".mbrate").first().text().trim();
  var views = $(card).find(".mbvie").first().text().trim();
  var quality = $(card).find(".mvhdico span").first().text().trim();
  var desc = [dur, quality, rate, views ? views + "次观看" : ""].filter(function (x) { return !!x; }).join(" · ");
  return {
    id: "eporner:" + code,
    type: "video",
    title: (a.text() || "").trim(),
    coverUrl: epCover(thumb),
    backdropPath: epCover(thumb),
    description: desc,
    link: EP_SITE + href
  };
}

async function epFetchList(url) {
  var res = await epGet(url);
  if (!res || !res.data) return [];
  var $ = await Widget.html.load(res.data);
  var out = [];
  var seen = {};
  var cards = $("#vidresults .mb");
  if (!cards.length) cards = $(".mb");
  cards.each(function (i, el) {
    var item = epItemFromCard($, el);
    if (item && !seen[item.id]) { seen[item.id] = 1; out.push(item); }
  });
  if (!out.length) {
    res = await epGet(url);
    if (!res || !res.data) return [];
    $ = await Widget.html.load(res.data);
    out = [];
    seen = {};
    $(".mb").each(function (i, el) {
      var item = epItemFromCard($, el);
      if (item && !seen[item.id]) { seen[item.id] = 1; out.push(item); }
    });
  }
  return out;
}

function epListUrl(base, page, sort) {
  var url = base;
  if (sort && sort !== "latest") url += "SORT-" + sort + "/";
  if (page && Number(page) > 1) url += Number(page) + "/";
  return url;
}

async function epFetchPaged(base, appPage, sort, buildUrl) {
  var page = Number(appPage || 1);
  if (!isFinite(page) || page < 1) page = 1;
  page = Math.floor(page);
  var url = buildUrl ? buildUrl(page) : epListUrl(base, page, sort);
  return await epFetchList(url);
}

function epGenreTarget(params) {
  var g = String((params && params.genreId) || "");
  if (g.indexOf("tag:") === 0 && g.length > 4) return { section: "tag", slug: g.slice(4) };
  if (g.indexOf("cat:") === 0 && g.length > 4) return { section: "cat", slug: g.slice(4) };
  var p = String((params && params.peopleId) || "");
  if (p.indexOf("model:") === 0 && p.length > 6) return { section: "model", slug: p.slice(6) };
  return null;
}
async function epGenreList(params, sort) {
  var gt = epGenreTarget(params);
  if (!gt) return null;
  var page = Number((params && params.page) || 1);
  var slug = epSlug(gt.slug);
  if (!slug) return null;
  if (gt.section === "tag") {
    var tagBase = EP_SITE + "/tag/" + encodeURIComponent(slug) + "/";
    return await epFetchPaged(tagBase, page, sort || null, function (sp) {
      return tagBase + (sp > 1 ? sp + "/" : "") + (sort ? sort + "/" : "");
    });
  }
  if (gt.section === "cat") {
    var genreCatBase = EP_SITE + "/cat/" + encodeURIComponent(slug) + "/";
    return await epFetchPaged(genreCatBase, page, sort, function (sp) {
      return genreCatBase + (sort ? "SORT-" + sort + "/" : "") + (sp > 1 ? sp + "/" : "");
    });
  }
  var genreModelBase = EP_SITE + "/pornstar/" + encodeURIComponent(slug) + "/";
  var modelSorts = ["recent", "top-weekly", "most-viewed", "top-rated", "longest", "shortest"];
  var modelSort = modelSorts.indexOf(sort) !== -1 ? sort : "recent";
  return await epFetchPaged(genreModelBase, page, modelSort, function (sp) {
    return genreModelBase + (sp > 1 ? sp + "/" : "") + modelSort + "/";
  });
}

async function loadBrowseList(params) {
  params = params || {};
  epCookie(params);
  epShowApi(params);
  try {
    var gl = await epGenreList(params, null);
    if (gl) return gl;
    var page = Number(params.page || 1);
    return await epFetchPaged(EP_SITE + "/", page, null);
  } catch (e) {
    return [];
  }
}

async function loadPopularList(params) {
  params = params || {};
  epCookie(params);
  epShowApi(params);
  try {
    var page = Number(params.page || 1);
    return await epFetchPaged(EP_SITE + "/best-videos/", page, null);
  } catch (e) {
    return [];
  }
}

async function loadCategoryList(params) {
  params = params || {};
  epCookie(params);
  epShowApi(params);
  try {
    var sort = params.sort && params.sort !== "latest" ? params.sort : null;
    var gl = await epGenreList(params, sort);
    if (gl) return gl;
    var page = Number(params.page || 1);
    var cat = epSlug(params.customCategory) || epSlug(params.category);
    if (!cat) return await loadBrowseList({ sort: "latest", page: page });
    var catBase = EP_SITE + "/cat/" + encodeURIComponent(cat) + "/";
    return await epFetchPaged(catBase, page, sort, function (sp) {
      return catBase + (sort ? "SORT-" + sort + "/" : "") + (sp > 1 ? sp + "/" : "");
    });
  } catch (e) {
    return [];
  }
}

function epTagSegment(value) {
  var raw = String(value || "").trim();
  try {
    raw = decodeURIComponent(raw);
  } catch (e) {
    return "";
  }
  if (!raw || /[/?#]/.test(raw)) return "";
  return encodeURIComponent(raw);
}

async function loadTagList(params) {
  params = params || {};
  epCookie(params);
  epShowApi(params);
  try {
    var sort = params.sort && params.sort !== "latest" ? params.sort : null;
    var gl = await epGenreList(params, sort);
    if (gl) return gl;
    var page = Number(params.page || 1);
    var tagInput = String(params.customTag || params.tag || "").trim();
    var customTagUrl = tagInput.match(/^https?:\/\/www\.eporner\.com\/tag\/([^/?#]+)\/?$/i);
    var tag = customTagUrl ? customTagUrl[1] : tagInput.replace(/^\/tag\//i, "").replace(/\/$/, "");
    var tagSegment = epTagSegment(tag);
    if (!tagSegment) return [];
    var tagBase = EP_SITE + "/tag/" + tagSegment + "/";
    return await epFetchPaged(tagBase, page, sort, function (sp) {
      return tagBase + (sp > 1 ? sp + "/" : "") + (sort ? sort + "/" : "");
    });
  } catch (e) {
    return [];
  }
}

async function loadModelList(params) {
  params = params || {};
  epCookie(params);
  epShowApi(params);
  try {
    var gl = await epGenreList(params, null);
    if (gl) return gl;
    var page = Number(params.page || 1);
    var model = String(params.customModel || "").trim() || String(params.model || "").trim();
    var full = model.match(/^https?:\/\/www\.eporner\.com\/pornstar\/([^/?#]+)\/?$/i);
    var path = model.match(/^\/?pornstar\/([^/?#]+)\/?$/i);
    if (full) model = full[1];
    else if (path) model = path[1];
    if (!/^[A-Za-z0-9-]+$/.test(model)) return [];
    var modelSorts = ["recent", "top-weekly", "most-viewed", "top-rated", "longest", "shortest"];
    var sort = modelSorts.indexOf(params.sort) !== -1 ? params.sort : "recent";
    var modelBase = EP_SITE + "/pornstar/" + model + "/";
    return await epFetchPaged(modelBase, page, sort, function (sp) {
      return modelBase + (sp > 1 ? sp + "/" : "") + sort + "/";
    });
  } catch (e) {
    return [];
  }
}

async function loadSiteList(params) {
  params = params || {};
  epCookie(params);
  epShowApi(params);
  try {
    var page = Number(params.page || 1);
    var siteInput = String(params.customSite || "").trim() || String(params.site || "").trim();
    var fullSite = siteInput.match(/^https?:\/\/www\.eporner\.com\/channel\/([^/?#]+)\/?$/i);
    var pathSite = siteInput.match(/^\/?channel\/([^/?#]+)\/?$/i);
    var site = fullSite ? fullSite[1] : pathSite ? pathSite[1] : siteInput;
    if (!/^[A-Za-z0-9-]+$/.test(site)) return [];
    var sort = params.sort && params.sort !== "latest" ? params.sort : null;
    var siteBase = EP_SITE + "/channel/" + encodeURIComponent(site) + "/";
    return await epFetchPaged(siteBase, page, sort, function (sp) {
      return siteBase + (sp > 1 ? sp + "/" : "") + (sort ? sort + "/" : "");
    });
  } catch (e) {
    return [];
  }
}

async function epSearchVideos(kw, page) {
  var url = EP_SITE + "/api/v2/video/search/?query=" + encodeURIComponent(kw) + "&per_page=24&page=" + page + "&order=latest&gay=0&lq=0";
  var res = await Widget.http.get(url, { headers: { "User-Agent": EP_UA } });
  var body = res && res.data;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { return []; } }
  var videos = (body && body.videos) || [];
  return videos.map(function (v) {
    var thumb = (v.default_thumb && v.default_thumb.src) || "";
    return {
      id: "eporner:" + v.id,
      type: "video",
      title: v.title || "",
      coverUrl: epCover(thumb),
      backdropPath: epCover(thumb),
      description: [v.length_min, v.rate ? v.rate + "分" : "", v.views ? v.views + "次观看" : ""].filter(function (x) { return !!x; }).join(" · "),
      link: v.url || (EP_SITE + "/video-" + v.id + "/")
    };
  });
}

async function search(params) {
  params = params || {};
  epCookie(params);
  epShowApi(params);
  try {
    var kw = String(params.keyword || "").trim();
    if (!kw) return [];
    var page = Number(params.page || 1);
    return await epSearchVideos(kw, page);
  } catch (e) {
    return [];
  }
}

function epParseDetailUrl(link) {
  var s = String(link || "");
  var m = s.match(/\/video-([A-Za-z0-9]+)\//);
  if (m) return { code: m[1], url: EP_SITE + "/video-" + m[1] + "/" };
  var m2 = s.match(/^eporner:([A-Za-z0-9]+)$/);
  if (m2) return { code: m2[1], url: EP_SITE + "/video-" + m2[1] + "/" };
  return null;
}

async function loadDetail(link) {
  try {
    var parsed = epParseDetailUrl(link);
    if (!parsed) return null;
    var res = await epGet(parsed.url);
    if (!res || !res.data) return null;
    var $ = await Widget.html.load(res.data);
    var html = res.data;
    var title = ($("meta[property=\"og:title\"]").attr("content") || "").replace(/ - EPORNER$/, "").trim();
    if (!title) title = ($("h1").first().text() || "").replace(/\s*\d+\s*min.*$/, "").trim();
    var poster = "";
    var pm = html.match(/EP\.video\.player\.poster\s*=\s*'([^']+)'/);
    if (pm) poster = pm[1];
    if (!poster) poster = $("meta[property=\"og:image\"]").attr("content") || "";
    var desc = $("meta[name=\"description\"]").attr("content") || "";
    var durText = "";
    var dm = desc.match(/Duration:\s*([0-9:]+)/);
    if (dm) durText = dm[1];
    var uploader = $(".video-info-tags .vit-uploader a[href^=\"/profile/\"]").first().text().trim();
    var genreItems = [];
    var seenTag = {};
    $(".video-info-tags .vit-category a[href^=\"/cat/\"]").each(function (i, a) {
      var href = $(a).attr("href") || "";
      var cm = href.match(/^\/cat\/([^/]+)\/?$/);
      var title = ($(a).text() || "").trim();
      if (cm && title && !seenTag["cat:" + cm[1]]) {
        seenTag["cat:" + cm[1]] = 1;
        genreItems.push({ id: "cat:" + cm[1], title: title });
      }
    });
    var tagLinks = $(".video-info-tags .vit-tag a[href^=\"/tag/\"]");
    tagLinks.each(function (i, a) {
      var href = $(a).attr("href") || "";
      var tm = href.match(/^\/tag\/([^/]+)\/?$/);
      var title = ($(a).text() || "").trim();
      if (tm && title && !seenTag["tag:" + tm[1]]) {
        seenTag["tag:" + tm[1]] = 1;
        genreItems.push({ id: "tag:" + tm[1], title: title });
      }
    });
    var peoples = [];
    var seenPeople = {};
    $(".video-info-tags .vit-pornstar a[href^=\"/pornstar/\"]").each(function (i, a) {
      var href = $(a).attr("href") || "";
      var pm = href.match(/^\/pornstar\/([^/]+)\/?$/);
      var title = ($(a).text() || "").trim();
      if (pm && title && !seenPeople[pm[1]]) {
        seenPeople[pm[1]] = 1;
        peoples.push({ id: "model:" + pm[1], title: title });
      }
    });
    var related = [];
    var seenRel = {};
    $("#relateddiv .mb").each(function (i, el) {
      if (related.length >= 8) return;
      var item = epItemFromCard($, el);
      if (item && item.id !== "eporner:" + parsed.code && !seenRel[item.id]) { seenRel[item.id] = 1; related.push(item); }
    });
    var description = [uploader ? "上传者 " + uploader : "", durText ? "时长 " + durText : ""].filter(function (x) { return !!x; }).join(" · ");
    var orientation = epVideoOrientation(html);
    var detailItem = {
      id: "eporner:" + parsed.code,
      type: "video",
      title: title,
      description: description,
      link: parsed.url,
      genreItems: genreItems,
      peoples: peoples,
      relatedItems: related
    };
    var imageFields = epDetailImageFields(orientation, poster);
    Object.keys(imageFields).forEach(function (key) { detailItem[key] = imageFields[key]; });
    return detailItem;

  } catch (e) {
    return null;
  }
}

function epHash36(hash) {
  var out = "";
  for (var i = 0; i < 32; i += 8) {
    out += parseInt(hash.substring(i, i + 8), 16).toString(36);
  }
  return out;
}

function epPickTiers(mp4) {
  var cands = [];
  Object.keys(mp4 || {}).forEach(function (key) {
    var v = mp4[key] || {};
    var label = String(v.labelShort || key || "");
    var m = label.match(/(\d+)\s*p/i);
    var height = m ? Number(m[1]) : 0;
    if (v.src) cands.push({ height: height, label: label, src: v.src });
  });
  cands.sort(function (a, b) { return b.height - a.height; });
  var high = cands.filter(function (c) { return c.height >= 720; });
  if (high.length) return high;
  if (cands.length) return [cands[0]];
  return [];
}

function epCookie(params) {
  try {
    if (params && Object.prototype.hasOwnProperty.call(params, "cookie")) {
      var c = String(params.cookie || "").trim();
      if (c) { epStoreSet("eporner_cookie", c); return c; }
      epStoreRemove("eporner_cookie");
      return "";
    }
    return epStoreGet("eporner_cookie") || "";
  } catch (e) {
    return (params && params.cookie) || "";
  }
}
function epShowApi(params) {
  try {
    if (params && Object.prototype.hasOwnProperty.call(params, "showApiWithCookie")) {
      var v = params.showApiWithCookie === "on" ? "on" : "off";
      epStoreSet("eporner_showapi", v);
      return v === "on";
    }
    return epStoreGet("eporner_showapi") === "on";
  } catch (e) {
    return params && params.showApiWithCookie === "on";
  }
}

function epParseDloads(html) {
  var out = [];
  var re = /href="(\/dload\/[^"]+)"[^>]*>\s*(?:Download\s+)?MP4\s*\((\d+)p,\s*(h264|AV1),\s*([\d.]+)\s*(MB|GB)\)/gi;
  var m;
  while ((m = re.exec(html))) {
    var size = Number(m[4]) * (m[5].toUpperCase() === "GB" ? 1024 : 1);
    out.push({ url: EP_SITE + m[1], height: Number(m[2]), codec: m[3], sizeMB: size });
  }
  return out;
}

function epSortDloads(cands) {
  cands.sort(function (a, b) { return (b.height - a.height) || (b.sizeMB - a.sizeMB); });
  return cands;
}

async function epDloadLine(html, detailUrl, cookie) {
  var cands = epSortDloads(epParseDloads(html));
  if (!cands.length) return null;
  var best = cands[0];
  var res = null;
  try {
    res = await Widget.http.get(best.url, { headers: { "User-Agent": EP_UA, "Referer": detailUrl, "Cookie": cookie, "Range": "bytes=0-0" }, allow_redirects: false });
  } catch (e) {
    return null;
  }
  if (!res) return null;
  var status = epHttpStatus(res);
  var loc = (res.headers && (res.headers.location || res.headers.Location)) || "";
  var desc = "MP4 原文件 · " + best.codec + " · 约 " + Math.round(best.sizeMB) + " MB · Cookie 直链";
  if (status >= 300 && status < 400) {
    if (!loc || loc.indexOf("/login") !== -1) return false;
    var finalUrl = epResolveUrl(best.url, loc);
    if (!finalUrl) return false;
    return { name: "原画直链 " + best.height + "P", description: desc, url: finalUrl, customHeaders: { "User-Agent": EP_UA, "Referer": detailUrl }, playerType: "app" };
  }
  if (status === 200 || status === 206) {
    return { name: "原画直链 " + best.height + "P", description: desc, url: best.url, customHeaders: { "User-Agent": EP_UA, "Referer": detailUrl, "Cookie": cookie }, playerType: "app" };
  }
  return false;
}

function epDloadRaw(html, detailUrl, cookie) {
  var cands = epSortDloads(epParseDloads(html));
  if (!cands.length) return null;
  var best = cands[0];
  return { name: "原画直链 " + best.height + "P", description: "MP4 原文件 · " + best.codec + " · 约 " + Math.round(best.sizeMB) + " MB · Cookie 直链", url: best.url, customHeaders: { "User-Agent": EP_UA, "Referer": detailUrl, "Cookie": cookie }, playerType: "app" };
}

function epWithDload(dloadLine, lines) {
  if (dloadLine) return [dloadLine].concat(lines || []);
  return lines || [];
}

async function loadResource(params) {
  params = params || {};
  try {
    var raw = params.link != null ? params.link : params.id;
    var parsed = epParseDetailUrl(raw);
    if (!parsed) return [];
    var res = await epGet(parsed.url);
    if (!res || !res.data) return [];
    var lines = [];
    var cookie = epCookie(params);
    var dloadLine = null;
    if (cookie) {
      var dload = null;
      try { dload = await epDloadLine(res.data, parsed.url, cookie); } catch (e) { dload = null; }
      if (dload) { dloadLine = dload; }
      else if (dload !== false) {
        var rawLine = null;
        try { rawLine = epDloadRaw(res.data, parsed.url, cookie); } catch (e) { rawLine = null; }
        if (rawLine) { dloadLine = rawLine; }
      }
    }
    if (dloadLine && !epShowApi(params)) return [dloadLine];
    var hm = res.data.match(/EP\.video\.player\.hash\s*=\s*'([0-9a-f]{32})'/);
    if (!hm) return epWithDload(dloadLine, lines);
    var vidm = res.data.match(/EP\.video\.player\.vid\s*=\s*'([^']+)'/);
    var vid = (vidm && vidm[1]) || parsed.code;
    var xhrUrl = EP_SITE + "/xhr/video/" + vid + "?hash=" + epHash36(hm[1]) + "&domain=www.eporner.com&pixelRatio=1&playerWidth=1920&playerHeight=1080&supportedFormats=mp4%2Chls&_=" + Date.now();
    var xhr = await Widget.http.get(xhrUrl, { headers: { "User-Agent": EP_UA, "Referer": parsed.url } });
    var body = xhr && xhr.data;
    if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { return epWithDload(dloadLine, lines); } }
    if (!body || body.available === false || !body.sources) return epWithDload(dloadLine, lines);
    if (body.sources.hls && body.sources.hls.auto && body.sources.hls.auto.src) {
      lines.push({ name: "自适应 HLS", description: "HLS 自适应", url: body.sources.hls.auto.src, customHeaders: { "User-Agent": EP_UA, "Referer": parsed.url }, playerType: "app" });
    }
    if (!body.sources.mp4) return epWithDload(dloadLine, lines);
    var tiers = epPickTiers(body.sources.mp4);
    tiers.forEach(function (t) {
      lines.push({
        name: t.height ? t.height + "P" : t.label,
        description: "MP4 · " + (t.height ? t.height + "p" : t.label),
        url: t.src,
        customHeaders: { "User-Agent": EP_UA, "Referer": parsed.url },
        playerType: "app"
      });
    });
    return epWithDload(dloadLine, lines);
  } catch (e) {
    return [];
  }
}
