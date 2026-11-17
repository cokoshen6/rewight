WidgetMetadata = {
  id: "avbebe",
  title: "Avbebe",
  version: "1.0.8",
  requiredVersion: "0.0.1",
  description: "Avbebe 高清H動畫、3D動畫、成人影片",
  author: "Coko",
  site: "https://avbebe.com",
  iconurl: "https://avbebe.com/wp-content/uploads/2026/01/bebelogo.png",
  detailCacheDuration: 60,
  globalParams: [],
  modules: [
    {
      id: "latest",
      title: "最新",
      functionName: "loadLatest",
      type: "video",
      params: [
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "cat_animation",
      title: "動畫卡通",
      functionName: "loadCategory",
      type: "video",
      params: [
        { name: "category", title: "分类", type: "constant", value: "h動畫影片" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "cat_3d",
      title: "3D動畫",
      functionName: "loadCategory",
      type: "video",
      params: [
        { name: "category", title: "分类", type: "constant", value: "3d動畫" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "cat_paomian",
      title: "泡麵番",
      functionName: "loadCategory",
      type: "video",
      params: [
        { name: "category", title: "分类", type: "constant", value: "泡麵番" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "cat_hd_zh",
      title: "高清中字",
      functionName: "loadCategory",
      type: "video",
      params: [
        { name: "category", title: "分类", type: "constant", value: "高清中字" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "cat_mosaic",
      title: "馬賽克破解",
      functionName: "loadCategory",
      type: "video",
      params: [
        { name: "category", title: "分类", type: "constant", value: "馬賽克破解" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "cat_hd_suren",
      title: "高清素人",
      functionName: "loadCategory",
      type: "video",
      params: [
        { name: "category", title: "分类", type: "constant", value: "高清素人" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "cat_juemei",
      title: "絕美逸品",
      functionName: "loadCategory",
      type: "video",
      params: [
        { name: "category", title: "分类", type: "constant", value: "高清素人/絕美逸品" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "cat_huayu_studio",
      title: "華語AV-片商",
      functionName: "loadCategory",
      type: "video",
      params: [
        { name: "category", title: "分类", type: "constant", value: "華語av/華語av-片商" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "cat_huayu_suren",
      title: "華語AV-素人",
      functionName: "loadCategory",
      type: "video",
      params: [
        { name: "category", title: "分类", type: "constant", value: "華語av/華語av-素人" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "cat_huayu_tanhua",
      title: "華語AV-探花",
      functionName: "loadCategory",
      type: "video",
      params: [
        { name: "category", title: "分类", type: "constant", value: "華語av/華語av-探花" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "cat_ai_long",
      title: "華語AI長劇",
      functionName: "loadCategory",
      type: "video",
      params: [
        { name: "category", title: "分类", type: "constant", value: "page:華語成人ai影片" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "cat_ai_short",
      title: "華語AI短劇",
      functionName: "loadCategory",
      type: "video",
      params: [
        { name: "category", title: "分类", type: "constant", value: "page:華語成人ai短劇" },
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

var AV_BASE = "https://avbebe.com";
var AV_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
var AV_REFERER = "https://avbebe.com/";

function avGet(url) {
  return Widget.http.get(url, { headers: { "User-Agent": AV_UA, "Referer": AV_REFERER, "Accept-Language": "zh-TW,zh;q=0.9" } });
}

function avBody(resp) {
  if (resp === null || resp === undefined) return "";
  if (typeof resp === "string") return resp;
  if (typeof resp === "object") {
    if (typeof resp.data === "string") return resp.data;
    if (typeof resp.body === "string") return resp.body;
  }
  return "";
}

function avPostId(link) {
  if (!link) return "";
  var m = String(link).match(/\/archives\/(\d+)/);
  return m ? m[1] : "";
}

function avDecodeEntities(s) {
  return String(s || "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#8211;/g, "-").replace(/&#8212;/g, "-");
}

function avParseList(html) {
  var items = [];
  if (!html) return items;
  var re = /<article[^>]*class="[^"]*(?:jeg_post|elementor-post)[^"]*"[^>]*>([\s\S]*?)<\/article>/g;
  var m;
  var seen = {};
  while ((m = re.exec(html)) !== null) {
    var block = m[1];
    var lm = block.match(/<h3[^>]*class="[^"]*jeg_post_title[^"]*"[^>]*>\s*<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
    if (!lm) lm = block.match(/<h5[^>]*class="[^"]*elementor-post__title[^"]*"[^>]*>\s*<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
    if (!lm) continue;
    var link = lm[1];
    var title = avDecodeEntities(lm[2].replace(/<[^>]+>/g, "").trim());
    if (!title || !link) continue;
    var id = avPostId(link);
    if (!id) continue;
    var key = "avbebe:" + id;
    if (seen[key]) continue;
    seen[key] = true;
    var cover = "";
    var im = block.match(/<img[^>]*class="[^"]*wp-post-image[^"]*"[^>]*>/);
    if (!im) im = block.match(/<img[^>]*data-src="[^"]+"[^>]*>/);
    if (im) {
      var dm = im[0].match(/data-src="([^"]+)"/);
      if (dm) cover = dm[1];
      if (!cover) {
        var sm = im[0].match(/src="(https:[^"]+)"/);
        if (sm && sm[1].indexOf("data:image") !== 0) cover = sm[1];
      }
    }
    var item = {
      id: key,
      type: "video",
      title: title,
      link: link
    };
    if (cover) {
      item.coverUrl = cover;
      item.backdropPath = cover;
    }
    items.push(item);
  }
  return items;
}

async function avFetchList(url) {
  var resp = await avGet(url);
  var html = avBody(resp);
  return avParseList(html);
}

async function loadLatest(params) {
  params = params || {};
  var page = Math.max(1, parseInt(params.page, 10) || 1);
  var url = AV_BASE + "/archives/category/new";
  if (page > 1) url += "/page/" + page;
  return avFetchList(url);
}

async function loadCategory(params) {
  params = params || {};
  var cat = String(params.category || "h動畫影片").trim();
  var page = Math.max(1, parseInt(params.page, 10) || 1);
  var url;
  if (cat.indexOf("page:") === 0) {
    url = AV_BASE + "/" + encodeURIComponent(cat.slice(5));
  } else {
    var parts = cat.split("/").map(function (p) { return encodeURIComponent(p); });
    url = AV_BASE + "/archives/category/" + parts.join("/");
  }
  if (page > 1) url += "/page/" + page;
  return avFetchList(url);
}

async function search(params) {
  params = params || {};
  var kw = String(params.keyword || "").trim();
  if (!kw) return [];
  var page = Math.max(1, parseInt(params.page, 10) || 1);
  var url = AV_BASE + "/?s=" + encodeURIComponent(kw);
  if (page > 1) url = AV_BASE + "/page/" + page + "/?s=" + encodeURIComponent(kw);
  return avFetchList(url);
}

function avParseDataItem(html) {
  if (!html) return null;
  var m = html.match(/data-item="([^"]+)"/);
  if (!m) return null;
  var raw = avDecodeEntities(m[1]);
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

async function loadDetail(link) {
  if (!link) return null;
  var url = String(link);
  if (url.indexOf("http") !== 0) {
    var id = String(link).replace(/^avbebe:/, "");
    if (!/^\d+$/.test(id)) return null;
    url = AV_BASE + "/archives/" + id;
  }
  var resp = await avGet(url);
  var html = avBody(resp);
  if (!html) return null;
  var postId = avPostId(url);
  var data = avParseDataItem(html);
  var tm = html.match(/<h1[^>]*class="[^"]*jeg_post_title[^"]*"[^>]*>([\s\S]*?)<\/h1>/);
  var title = "";
  if (tm) title = avDecodeEntities(tm[1].replace(/<[^>]+>/g, "").trim());
  if (!title) {
    var om = html.match(/<meta property="og:title" content="([^"]*)"/);
    if (om) title = avDecodeEntities(om[1]);
  }
  var desc = "";
  var dm = html.match(/<meta property="og:description" content="([^"]*)"/);
  if (dm) desc = avDecodeEntities(dm[1]);
  var cover = "";
  if (data && data.splash) cover = data.splash;
  if (!cover) {
    var cm = html.match(/<meta property="og:image" content="([^"]*)"/);
    if (cm) cover = cm[1];
  }
  var item = {
    id: "avbebe:" + postId,
    type: "video",
    title: title,
    link: url
  };
  if (desc) item.description = desc;
  if (data && data.duration) item.duration = data.duration;
  if (cover) {
    item.coverUrl = cover;
    item.backdropPath = cover;
  }
  var cats = [];
  var seenCat = {};
  var cr = /rel="category tag"[^>]*>([^<]+)<\/a>/g;
  var cm2;
  while ((cm2 = cr.exec(html)) !== null) {
    var cname = avDecodeEntities(cm2[1]).trim();
    if (cname && !seenCat[cname]) {
      seenCat[cname] = true;
      cats.push({ id: "cat:" + cname, title: cname });
    }
  }
  if (cats.length) item.genreItems = cats;
  if (!data) {
    var embeds = avParseEmbeds(html);
    if (embeds.length > 1) {
      var eps = [];
      for (var i = 0; i < embeds.length; i++) {
        var ep = {
          id: "avbebe:" + postId + ":ep" + (i + 1),
          type: "video",
          title: "第" + (i + 1) + "集",
          link: url + "#ep" + (i + 1)
        };
        if (cover) {
          ep.coverUrl = cover;
          ep.backdropPath = cover;
        }
        eps.push(ep);
      }
      item.episodeItems = eps;
    }
  }
  return item;
}

function avParseEmbeds(html) {
  if (!html) return [];
  var urls = [];
  var seen = {};
  var re = /<iframe[^>]*src="(https:\/\/play\.52cute\.com\/e\/[^"]+)"/g;
  var m;
  while ((m = re.exec(html)) !== null) {
    if (!seen[m[1]]) { seen[m[1]] = true; urls.push(m[1]); }
  }
  if (!urls.length) {
    var m2 = html.match(/https:\\\/\\\/play\.52cute\.com\\\/e\\\/[A-Za-z0-9]+/);
    if (m2) urls.push(m2[0].replace(/\\\//g, "/"));
  }
  return urls;
}

function avParseEmbed(html) {
  var urls = avParseEmbeds(html);
  return urls.length ? urls[0] : "";
}

function avEpisodeNum(params, raw) {
  if (params && params.episode != null && params.episode !== "") {
    var n = parseInt(String(params.episode), 10);
    if (!isNaN(n) && n >= 1) return n;
  }
  if (params && params.index != null && params.index !== "") {
    var ix = parseInt(String(params.index), 10);
    if (!isNaN(ix) && ix >= 0) return ix + 1;
  }
  var it = params && params.item;
  if (it && typeof it === "object") {
    if (it.episode != null && it.episode !== "") {
      var en = parseInt(String(it.episode), 10);
      if (!isNaN(en) && en >= 1) return en;
    }
    if (it.index != null && it.index !== "") {
      var iix = parseInt(String(it.index), 10);
      if (!isNaN(iix) && iix >= 0) return iix + 1;
    }
  }
  var s = String(raw || "");
  var m = s.match(/:ep(\d+)/);
  if (m) return parseInt(m[1], 10);
  var m2 = s.match(/#ep(\d+)/);
  if (m2) return parseInt(m2[1], 10);
  return 0;
}

function avRawLink(params) {
  if (params.link != null && params.link !== "") return String(params.link);
  if (params.id != null && params.id !== "") return String(params.id);
  var it = params.item;
  if (it) {
    if (typeof it === "string" && it !== "") return it;
    if (typeof it === "object") {
      if (it.link) return String(it.link);
      if (it.id) return String(it.id);
      if (it.url) return String(it.url);
      if (it.videoUrl) return String(it.videoUrl);
    }
  }
  return "";
}

async function avEmbedM3u8(embedUrl) {
  try {
    var resp = await avGet(embedUrl);
    var html = avBody(resp);
    if (!html) return "";
    var m = html.match(/https:\/\/pb\.52cute\.com\/[^"'\s]*\.m3u8[^"'\s]*/);
    return m ? m[0] : "";
  } catch (e) {
    return "";
  }
}

async function loadResource(params) {
  params = params || {};
  var raw = avRawLink(params);
  if (!raw) return [];
  var rawStr = String(raw);
  var epNum = avEpisodeNum(params, rawStr);
  var url = rawStr.replace(/:ep\d+/, "").replace(/#ep\d+/, "");
  var postId = "";
  if (url.indexOf("avbebe:") === 0) {
    postId = url.replace(/^avbebe:/, "");
    url = AV_BASE + "/archives/" + postId;
  } else if (/^https?:\/\/avbebe\.com\/archives\/\d+/.test(url)) {
    postId = avPostId(url);
  } else {
    return [];
  }
  if (!/^\d+$/.test(postId)) return [];
  var resp = await avGet(url);
  var html = avBody(resp);
  var data = avParseDataItem(html);
  if (data && data.sources && data.sources.length) {
    var src = data.sources[0] && data.sources[0].src;
    if (src && src.indexOf("http") === 0) {
      return [{
        name: "原画",
        description: "HLS",
        url: src,
        customHeaders: { Referer: AV_REFERER, "User-Agent": AV_UA },
        playerType: "app"
      }];
    }
  }
  var embedUrls = avParseEmbeds(html);
  if (!embedUrls.length) return [];
  if (epNum >= 1) {
    if (epNum > embedUrls.length) return [];
    var one = await avEmbedM3u8(embedUrls[epNum - 1]);
    if (!one) return [];
    return [{
      name: "第" + epNum + "集",
      description: "HLS",
      url: one,
      customHeaders: { Referer: embedUrls[epNum - 1], "User-Agent": AV_UA },
      playerType: "app"
    }];
  }
  if (embedUrls.length === 1) {
    var m3u8 = await avEmbedM3u8(embedUrls[0]);
    if (!m3u8) return [];
    return [{
      name: "原画",
      description: "HLS",
      url: m3u8,
      customHeaders: { Referer: embedUrls[0], "User-Agent": AV_UA },
      playerType: "app"
    }];
  }
  var results = await Promise.all(embedUrls.map(function (eu) { return avEmbedM3u8(eu); }));
  var out = [];
  for (var i = 0; i < embedUrls.length; i++) {
    var u = results[i];
    if (u) {
      out.push({
        name: "第" + (i + 1) + "集",
        description: "HLS",
        url: u,
        customHeaders: { Referer: embedUrls[i], "User-Agent": AV_UA },
        playerType: "app"
      });
    }
  }
  return out;
}
