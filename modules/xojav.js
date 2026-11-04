WidgetMetadata = {
  id: "xojav",
  title: "XOJAV",
  version: "1.0.1",
  requiredVersion: "0.0.1",
  description: "XOJAV.TV 精選亞洲素人成人影片：最新、分類、熱門、標籤、搜索",
  author: "Coko",
  site: "https://xojav.tv",
  detailCacheDuration: 60,
  modules: [
    {
      id: "loadResource",
      title: "播放資源",
      functionName: "loadResource",
      type: "stream",
      cacheDuration: 0,
      params: [],
    },
    {
      id: "latest",
      title: "最新影片",
      functionName: "loadLatest",
      type: "video",
      cacheDuration: 3600,
      params: [{ name: "page", title: "頁碼", type: "page" }],
    },
    {
      id: "category",
      title: "分類瀏覽",
      functionName: "loadCategory",
      type: "video",
      cacheDuration: 3600,
      params: [
        { name: "category", title: "分類", type: "enumeration", value: "chinese-subtitle", enumOptions: [{ title: "中文字幕", value: "chinese-subtitle" }, { title: "無碼解放", value: "uncensored" }, { title: "台灣AV", value: "taiwan-av" }, { title: "日本AV", value: "jav" }, { title: "制服誘惑", value: "uniform" }, { title: "角色劇情", value: "roleplay" }, { title: "絲襪", value: "pantyhose" }, { title: "直接開啪", value: "sex-only" }, { title: "主奴調教", value: "bdsm" }, { title: "多P群交", value: "groupsex" }, { title: "進犯", value: "intrusion" }, { title: "男友視角", value: "pov" }, { title: "流出", value: "hixxen-cam" }, { title: "女同歡愉", value: "lesbian" }] },
        { name: "sort", title: "排序", type: "enumeration", value: "release_at", enumOptions: [{ title: "最近更新", value: "release_at" }, { title: "近期最佳", value: "stars" }, { title: "觀看最多", value: "views" }] },
        { name: "page", title: "頁碼", type: "page" },
      ],
    },
    {
      id: "hot",
      title: "熱門影片",
      functionName: "loadHot",
      type: "video",
      cacheDuration: 3600,
      params: [{ name: "page", title: "頁碼", type: "page" }],
    },
    {
      id: "tag",
      title: "標籤",
      functionName: "loadTag",
      type: "video",
      cacheDuration: 3600,
      params: [
        { name: "tag", title: "標籤", type: "enumeration", value: "creampie", enumOptions: [{ title: "中出", value: "creampie" }, { title: "巨乳", value: "big-tits" }, { title: "口交", value: "blowjob" }, { title: "少女", value: "girl" }, { title: "熟女", value: "mature-woman" }, { title: "人妻", value: "wife" }, { title: "絲襪", value: "pantyhose" }, { title: "黑絲", value: "black-pantyhose" }, { title: "眼鏡娘", value: "glasses" }, { title: "女僕", value: "maid" }, { title: "校服", value: "school-uniform" }, { title: "潮吹", value: "squirting" }, { title: "顏射", value: "facial" }, { title: "深喉", value: "deep-throat" }, { title: "肛交", value: "anal-sex" }, { title: "綑綁", value: "bondage" }, { title: "NTR", value: "ntr" }, { title: "出軌", value: "affair" }, { title: "老師", value: "teacher" }, { title: "護士", value: "nurse" }, { title: "OL", value: "ol" }, { title: "多P", value: "gangbang" }, { title: "流出", value: "hixxen-cam" }, { title: "3P", value: "3p" }, { title: "自訂", value: "custom" }] },
        { name: "customTag", title: "自訂標籤（輸入 tag 英文名）", type: "input", value: "", belongTo: { paramName: "tag", value: ["custom"] } },
        { name: "sort", title: "排序", type: "enumeration", value: "release_at", enumOptions: [{ title: "最近更新", value: "release_at" }, { title: "近期最佳", value: "stars" }, { title: "觀看最多", value: "views" }] },
        { name: "page", title: "頁碼", type: "page" },
      ],
    },
  ],
  search: {
    title: "搜索",
    functionName: "search",
    params: [
      { name: "keyword", title: "關鍵詞", type: "input" },
      { name: "page", title: "頁碼", type: "page" },
    ],
  },
};

var XJ_BASE = "https://xojav.tv";
var XJ_CDN = "https://cdn.18jav.tv";
var XJ_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
var XJ_HEADERS = { "User-Agent": XJ_UA, "Referer": XJ_BASE + "/" };
var XJ_BLOCK_COMMON = "list_videos_common_videos_list";
var XJ_BLOCK_LATEST = "list_videos_latest_videos_list";
var XJ_BLOCK_SEARCH = "list_videos_videos_list_search_result";

function xjClean(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}

function xjCode(slug, title) {
  var first = xjClean(title).split(" ")[0] || "";
  if (first && first.toLowerCase() === String(slug).toLowerCase()) return first.toUpperCase();
  return String(slug).toUpperCase();
}

function xjDuration(text) {
  var parts = String(text || "").trim().split(":").map(function (p) { return parseInt(p, 10); });
  if (!parts.length || parts.some(isNaN)) return 0;
  var s = 0;
  for (var i = 0; i < parts.length; i++) s = s * 60 + parts[i];
  return s;
}

function xjParseOwned(raw) {
  var s = String(raw || "").trim();
  if (!s) return null;
  var m = s.match(/^xojav:([A-Za-z0-9-]+)$/);
  if (m) return m[1];
  var u = s.match(/^https?:\/\/xojav\.tv\/videos\/([A-Za-z0-9-]+)\/?$/);
  if (u) return u[1];
  return null;
}

function xjParseCards($) {
  var items = [];
  $(".card-video").each(function (i, el) {
    var card = $(el);
    var a = card.find('a[href*="/videos/"]').first();
    var href = a.attr("href") || "";
    var m = href.match(/\/videos\/([A-Za-z0-9-]+)/);
    if (!m) return;
    var slug = m[1];
    var img = card.find("img.lazyload").first();
    var cover = img.attr("data-src") || img.attr("src") || "";
    if (cover.indexOf("video-placeholder") >= 0) cover = "";
    var alt = img.attr("alt") || "";
    var title = xjClean(card.find(".card-video__title a").first().text()) || alt;
    var dur = xjClean(card.find(".card-video__duration").first().text());
    var code = xjCode(slug, title);
    items.push({
      id: code,
      type: "url",
      mediaType: "movie",
      title: code,
      description: title,
      coverUrl: cover,
      backdropPath: cover,
      duration: xjDuration(dur),
      durationText: dur,
      link: "xojav:" + slug,
    });
  });
  return items;
}

async function xjFetchList(baseUrl, blockId, sort, page) {
  page = Math.max(1, Number(page) || 1);
  var url = baseUrl;
  if (page > 1) {
    var sep = baseUrl.indexOf("?") >= 0 ? "&" : "?";
    url = baseUrl + sep + "mode=async&function=get_block&block_id=" + blockId + "&sort_by=" + sort + "&from=" + page;
  }
  var res = await Widget.http.get(url, { headers: XJ_HEADERS });
  var html = (res && res.data) || "";
  if (typeof html !== "string" || !html) return [];
  var $ = Widget.html.load(html);
  return xjParseCards($);
}

function xjRouteGenre(params) {
  var gid = String((params && params.genreId) || "").trim();
  if (!gid) return null;
  var m = gid.match(/^(tag|cat):([a-z0-9-]+)$/);
  if (!m) return null;
  if (m[1] === "tag") return { baseUrl: XJ_BASE + "/tags/" + m[2], blockId: XJ_BLOCK_COMMON };
  return { baseUrl: XJ_BASE + "/categories/" + m[2], blockId: XJ_BLOCK_COMMON };
}

async function loadLatest(params) {
  try {
    params = params || {};
    var routed = xjRouteGenre(params);
    if (routed) return xjFetchList(routed.baseUrl, routed.blockId, "release_at", params.page);
    return xjFetchList(XJ_BASE + "/latest-updates", XJ_BLOCK_LATEST, "release_at", params.page);
  } catch (error) {
    console.error("[xojav/loadLatest] " + (error.message || error));
    throw error;
  }
}

async function loadCategory(params) {
  try {
    params = params || {};
    var routed = xjRouteGenre(params);
    if (routed) return xjFetchList(routed.baseUrl, routed.blockId, params.sort || "release_at", params.page);
    var cat = String(params.category || "chinese-subtitle").trim() || "chinese-subtitle";
    return xjFetchList(XJ_BASE + "/categories/" + cat, XJ_BLOCK_COMMON, params.sort || "release_at", params.page);
  } catch (error) {
    console.error("[xojav/loadCategory] " + (error.message || error));
    throw error;
  }
}

async function loadHot(params) {
  try {
    params = params || {};
    var routed = xjRouteGenre(params);
    if (routed) return xjFetchList(routed.baseUrl, routed.blockId, "views", params.page);
    return xjFetchList(XJ_BASE + "/hot", XJ_BLOCK_COMMON, "views", params.page);
  } catch (error) {
    console.error("[xojav/loadHot] " + (error.message || error));
    throw error;
  }
}

async function loadTag(params) {
  try {
    params = params || {};
    var routed = xjRouteGenre(params);
    if (routed) return xjFetchList(routed.baseUrl, routed.blockId, params.sort || "release_at", params.page);
    var tag = String(params.tag || "creampie").trim();
    if (tag === "custom") {
      tag = String(params.customTag || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
      if (!tag) return [];
    }
    return xjFetchList(XJ_BASE + "/tags/" + tag, XJ_BLOCK_COMMON, params.sort || "release_at", params.page);
  } catch (error) {
    console.error("[xojav/loadTag] " + (error.message || error));
    throw error;
  }
}

async function search(params) {
  try {
    params = params || {};
    var kw = xjClean(params.keyword);
    if (!kw) return [];
    var url = XJ_BASE + "/search/" + encodeURIComponent(kw) + "/";
    return xjFetchList(url, XJ_BLOCK_SEARCH, "most_relevant", params.page);
  } catch (error) {
    console.error("[xojav/search] " + (error.message || error));
    throw error;
  }
}

async function loadDetail(link) {
  try {
    var slug = xjParseOwned(link);
    if (!slug) return null;
    var url = XJ_BASE + "/videos/" + slug;
    var res = await Widget.http.get(url, { headers: XJ_HEADERS });
    var html = (res && res.data) || "";
    if (typeof html !== "string" || !html) return null;
    var $ = Widget.html.load(html);
    var title = xjClean($('meta[property="og:title"]').attr("content") || "");
    if (!title) return null;
    var poster = $('meta[property="og:image"]').attr("content") || "";
    var cover = poster ? poster.replace("/preview.jpg", "/320_180.jpg") : XJ_CDN + "/storage/" + slug + "/320_180.jpg";
    var code = xjCode(slug, title);
    var genreItems = [];
    var seen = {};
    $('a[href*="/tags/"]').each(function (i, el) {
      var a = $(el);
      var m = (a.attr("href") || "").match(/\/tags\/([a-z0-9-]+)/);
      if (!m) return;
      var name = xjClean(a.text());
      if (!name || seen["tag:" + m[1]]) return;
      seen["tag:" + m[1]] = true;
      genreItems.push({ id: "tag:" + m[1], title: name });
    });
    $('a[href*="/categories/"]').each(function (i, el) {
      var a = $(el);
      var m = (a.attr("href") || "").match(/\/categories\/([a-z0-9-]+)/);
      if (!m) return;
      var name = xjClean(a.text());
      if (!name || seen["cat:" + m[1]]) return;
      seen["cat:" + m[1]] = true;
      genreItems.push({ id: "cat:" + m[1], title: name });
    });
    var releaseDate = xjClean($("time").first().text()) || "";
    var related = xjParseCards($).filter(function (it) { return it.link !== "xojav:" + slug; });
    var item = {
      id: code,
      type: "url",
      mediaType: "movie",
      title: code,
      description: title,
      coverUrl: cover,
      backdropPath: cover,
      link: "xojav:" + slug,
      genreItems: genreItems,
      relatedItems: related,
    };
    if (releaseDate) item.releaseDate = releaseDate;
    return item;
  } catch (error) {
    console.error("[xojav/loadDetail] " + (error.message || error));
    throw error;
  }
}

async function loadResource(params) {
  try {
    params = params || {};
    var slug = xjParseOwned(params.link);
    if (!slug) return [];
    var url = XJ_BASE + "/videos/" + slug;
    var res = await Widget.http.get(url, { headers: XJ_HEADERS });
    var html = (res && res.data) || "";
    if (typeof html !== "string" || !html) return [];
    var m = html.match(/var\s+stream\s*=\s*['"]([^'"]+\.m3u8[^'"]*)['"]/);
    if (!m) return [];
    return [{
      name: "HLS",
      description: "m3u8 · 起播時刷新",
      url: m[1],
      customHeaders: { "User-Agent": XJ_UA, "Referer": url },
    }];
  } catch (error) {
    console.error("[xojav/loadResource] " + (error.message || error));
    throw error;
  }
}
