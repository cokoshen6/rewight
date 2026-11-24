WidgetMetadata = {
  id: "huangguotop",
  title: "黄果短剧榜",
  version: "1.0.7",
  contentType: "shortDrama",
  requiredVersion: "0.0.1",
  description: "黄果短剧榜：AI短剧、AI漫剧、排行榜与标签",
  author: "Coko",
  site: "https://huangguotop.com",
  iconurl: "https://tu.100923.xyz/file/1795124526106_huangguotop-icon-round.png",
  detailCacheDuration: 60,
  globalParams: [{ name: "imgProxy", title: "封面代理", type: "input", value: "" }],
  modules: [
    { id: "loadResource", title: "播放资源", functionName: "loadResource", type: "stream", cacheDuration: 600, params: [] },
    {
      id: "loadDramas", title: "AI短剧", functionName: "loadDramas", type: "video", cacheDuration: 3600,
      params: [
        { name: "sort", title: "排序", type: "enumeration", value: "new", enumOptions: [{ title: "最新", value: "new" }, { title: "最热", value: "hot" }] },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "loadManju", title: "AI漫剧", functionName: "loadManju", type: "video", cacheDuration: 3600,
      params: [
        { name: "sort", title: "排序", type: "enumeration", value: "new", enumOptions: [{ title: "最新", value: "new" }, { title: "最热", value: "hot" }] },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    { id: "rankHot", title: "热播榜", functionName: "loadRank", type: "video", cacheDuration: 3600, params: [{ name: "board", title: "榜单", type: "constant", value: "" }] },
    { id: "rankSoar", title: "飙升榜", functionName: "loadRank", type: "video", cacheDuration: 3600, params: [{ name: "board", title: "榜单", type: "constant", value: "soar" }] },
    { id: "rankNew", title: "新剧榜", functionName: "loadRank", type: "video", cacheDuration: 3600, params: [{ name: "board", title: "榜单", type: "constant", value: "new" }] },
    { id: "rankGood", title: "好评榜", functionName: "loadRank", type: "video", cacheDuration: 3600, params: [{ name: "board", title: "榜单", type: "constant", value: "good" }] },
    { id: "rankEnd", title: "完结榜", functionName: "loadRank", type: "video", cacheDuration: 3600, params: [{ name: "board", title: "榜单", type: "constant", value: "end" }] },
    { id: "rankDrama", title: "AI短剧榜", functionName: "loadRank", type: "video", cacheDuration: 3600, params: [{ name: "board", title: "榜单", type: "constant", value: "ai-drama" }] },
    { id: "rankComic", title: "AI漫剧榜", functionName: "loadRank", type: "video", cacheDuration: 3600, params: [{ name: "board", title: "榜单", type: "constant", value: "ai-comic" }] },
    {
      id: "loadTag", title: "标签", functionName: "loadTag", type: "video", cacheDuration: 3600,
      params: [
        {
          name: "tag", title: "标签", type: "enumeration", value: "xiandai",
          enumOptions: [
            { title: "现代", value: "xiandai" }, { title: "都市", value: "dushi" }, { title: "大男主", value: "dananzhu" },
            { title: "伦理", value: "lunli" }, { title: "熟女", value: "shunv" }, { title: "后宫", value: "hougong" },
            { title: "奇幻", value: "qihuan" }, { title: "系统", value: "xitong" }, { title: "古风", value: "gufeng" },
            { title: "母子", value: "muzi" }, { title: "仙侠", value: "xianxia" }, { title: "脑洞", value: "naodong" },
            { title: "校园", value: "xiaoyuan" }, { title: "穿越", value: "chuanyue" }, { title: "玄幻", value: "xuanhuan" },
            { title: "绿帽", value: "lvmao" }, { title: "修仙", value: "xiuxian" }, { title: "虐恋", value: "nuelian" },
            { title: "逆袭", value: "nixi" }, { title: "武侠", value: "wuxia" }, { title: "甜宠", value: "tianchong" },
            { title: "荒岛", value: "huangdao" }, { title: "超能力", value: "chaonengli" }, { title: "职场", value: "zhichang" }
          ]
        },
        { name: "customTag", title: "自定义标签", type: "input", value: "", description: "填标签英文名（如 bazong）；填了优先用自定义，无视上方下拉，想用回下拉先清空这里" },
        { name: "page", title: "页码", type: "page" }
      ]
    }
  ],
  search: {
    id: "search", title: "搜索", functionName: "search",
    params: [
      { name: "keyword", title: "关键词", type: "input" },
      { name: "page", title: "页码", type: "page" }
    ]
  }
};

const HG_BASE = "https://huangguotop.com";
const HG_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";

function hgHeaders(referer, extra) {
  const h = { "User-Agent": HG_UA, Referer: referer || HG_BASE + "/" };
  if (extra) for (const k in extra) h[k] = extra[k];
  return h;
}

async function hgGetText(url, referer, extraHeaders) {
  const r = await Widget.http.get(url, { headers: hgHeaders(referer, extraHeaders) });
  return typeof r.data === "string" ? r.data : String(r.data || "");
}

async function hgPostJson(url, referer) {
  const r = await Widget.http.post(url, {}, { headers: hgHeaders(referer, { "Content-Type": "application/json", Origin: HG_BASE }) });
  let d = r && r.data;
  if (typeof d === "string") { try { d = JSON.parse(d); } catch (e) { d = null; } }
  return d && d.data ? d.data : null;
}

function hgUnescape(s) {
  return String(s || "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&#(\d+);/g, function (m, n) { return String.fromCharCode(Number(n)); }).replace(/\\u0026/g, "&").replace(/\\\//g, "/");
}

function hgProxyBase(params) {
  let v = "";
  if (params && params.imgProxy !== undefined && params.imgProxy !== null) {
    v = String(params.imgProxy).trim().replace(/\/+$/, "");
    try { Widget.storage.set("huangguotop_imgproxy", v); } catch (e) {}
    return v;
  }
  try {
    v = Widget.storage.get("huangguotop_imgproxy");
    if (typeof v === "string") return v.trim().replace(/\/+$/, "");
  } catch (e) {}
  return "";
}

function hgCover(picUrl, base) {
  if (!picUrl) return "";
  const u = hgUnescape(picUrl);
  if (base) return base + "/?url=" + encodeURIComponent(u) + "&site=huangguotop.com";
  return u;
}

function hgPage(params) {
  const p = Number((params && params.page) || 1);
  return p >= 1 ? Math.floor(p) : 1;
}

function hgParseCards(html, base) {
  const items = [];
  const parts = String(html || "").split(/data-video-id="(\d+)"/);
  for (let i = 1; i + 1 < parts.length; i += 2) {
    const id = parts[i];
    const chunk = parts[i + 1].slice(0, 1600);
    const titleM = chunk.match(/<h3>(?:<a[^>]*>)?([^<]+)(?:<\/a>)?<\/h3>/) || chunk.match(/<h2><a[^>]*>([^<]+)<\/a><\/h2>/);
    if (!titleM) continue;
    const coverM = chunk.match(/data-src="([^"]+)"/);
    const scoreM = chunk.match(/data-card-score>(\d+(?:\.\d+)?)</) || chunk.match(/(\d+(?:\.\d+)?)分/);
    const descM = chunk.match(/<p class="sr-o">([^<]+)<\/p>/);
    const item = {
      id: id,
      type: "video",
      title: hgUnescape(titleM[1]).trim(),
      link: "huangguotop:drama:" + id
    };
    const cover = hgCover(coverM ? coverM[1] : "", base);
    if (cover) item.posterPath = cover;
    if (scoreM) item.rating = Number(scoreM[1]);
    if (descM) item.description = hgUnescape(descM[1]).trim();
    items.push(item);
  }
  return items;
}

async function hgChannelList(path, params) {
  const page = hgPage(params);
  const sort = params && params.sort === "hot" ? "hot" : "new";
  const url = HG_BASE + path + (page > 1 ? page + "/" : "") + "?sort=" + sort;
  const html = await hgGetText(url, HG_BASE + path, { "X-HG-Channel-Fragment": "1" });
  return hgParseCards(html, hgProxyBase(params));
}

async function hgTagList(slug, params) {
  const page = hgPage(params);
  const url = HG_BASE + "/tag/" + slug + "/" + (page > 1 ? page + "/" : "");
  const html = await hgGetText(url, HG_BASE + "/tag/" + slug + "/");
  return hgParseCards(html, hgProxyBase(params));
}

function hgGenreTag(params) {
  const g = params && params.genreId ? String(params.genreId) : "";
  const m = g.match(/^tag:([a-z0-9-]+)$/);
  return m ? m[1] : "";
}

async function loadDramas(params = {}) {
  try {
    const gt = hgGenreTag(params);
    if (gt) return await hgTagList(gt, params);
    return await hgChannelList("/ai-duanju/", params);
  } catch (e) { console.error("[loadDramas] 失败:", e && e.message || e); return []; }
}

async function loadManju(params = {}) {
  try {
    const gt = hgGenreTag(params);
    if (gt) return await hgTagList(gt, params);
    return await hgChannelList("/ai-manju/", params);
  } catch (e) { console.error("[loadManju] 失败:", e && e.message || e); return []; }
}

async function loadRank(params = {}) {
  try {
    const gt = hgGenreTag(params);
    if (gt) return await hgTagList(gt, params);
    if (hgPage(params) > 1) return [];
    const board = params && params.board ? String(params.board) : "";
    const url = HG_BASE + "/rank/" + (board ? board + "/" : "");
    const html = await hgGetText(url, HG_BASE + "/rank/");
    return hgParseCards(html, hgProxyBase(params));
  } catch (e) { console.error("[loadRank] 失败:", e && e.message || e); return []; }
}

async function loadTag(params = {}) {
  try {
    const gt = hgGenreTag(params);
    if (gt) return await hgTagList(gt, params);
    let slug = params && params.customTag ? String(params.customTag).trim() : "";
    slug = slug.replace(/^\/?tag\//, "").replace(/\/$/, "");
    if (!slug) slug = params && params.tag ? String(params.tag) : "xiandai";
    return await hgTagList(slug, params);
  } catch (e) { console.error("[loadTag] 失败:", e && e.message || e); return []; }
}

async function search(params = {}) {
  try {
    const keyword = String((params && params.keyword) || "").trim();
    if (!keyword) return [];
    if (hgPage(params) > 1) return [];
    const html = await hgGetText(HG_BASE + "/search/" + encodeURIComponent(keyword) + "/", HG_BASE + "/search/");
    return hgParseCards(html, hgProxyBase(params));
  } catch (e) { console.error("[search] 失败:", e && e.message || e); return []; }
}

function hgParseOwned(raw) {
  const s = String(raw || "").trim();
  let m = s.match(/^huangguotop:drama:(\d+)$/);
  if (m) return { kind: "drama", id: m[1], ep: 0 };
  m = s.match(/^huangguotop:ep:(\d+):(\d+)$/);
  if (m) return { kind: "drama", id: m[1], ep: Number(m[2]) };
  m = s.match(/^https?:\/\/(?:www\.)?huangguotop\.com\/detail\/(\d+)\/?$/);
  if (m) return { kind: "drama", id: m[1], ep: 0 };
  m = s.match(/^https?:\/\/(?:www\.)?huangguotop\.com\/play\/(\d+)(?:\/(\d+))?\/?$/);
  if (m) return { kind: "drama", id: m[1], ep: m[2] ? Number(m[2]) : 1 };
  return null;
}

function hgLdJson(html) {
  const out = [];
  const re = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    try { out.push(JSON.parse(m[1])); } catch (e) {}
  }
  return out;
}

function hgLdFind(html, type) {
  const docs = hgLdJson(html);
  for (const doc of docs) {
    const graph = doc && doc["@graph"] ? doc["@graph"] : [doc];
    for (const node of graph) {
      if (node && node["@type"] === type) return node;
    }
  }
  return null;
}

function hgMeta(html, prop) {
  const re = new RegExp('(?:property|name)="' + prop + '"\\s+content="([^"]*)"');
  const m = String(html || "").match(re);
  return m ? hgUnescape(m[1]).trim() : "";
}

async function hgDramaDetail(id) {
  const pageUrl = HG_BASE + "/detail/" + id + "/";
  const html = await hgGetText(pageUrl, HG_BASE + "/ai-duanju/");
  const ld = hgLdFind(html, "CreativeWorkSeries");
  const h1M = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
  const title = h1M ? hgUnescape(h1M[1]).trim() : (ld && ld.name ? String(ld.name) : "");
  if (!title) return [];
  const base = hgProxyBase(null);
  const coverM = html.match(/<img[^>]+data-src="([^"]+)"/);
  const cover = hgCover(coverM ? coverM[1] : "", base);
  const item = {
    id: id,
    type: "video",
    title: title,
    link: "huangguotop:drama:" + id
  };
  if (cover) item.posterPath = cover;
  const desc = (ld && ld.description ? String(ld.description) : "") || hgMeta(html, "description");
  if (desc) item.description = desc;
  const scoreM = html.match(/data-card-score>(\d+(?:\.\d+)?)</);
  if (scoreM) item.rating = Number(scoreM[1]);
  const eps = new Set();
  const epRe = new RegExp('href="/play/' + id + '/(?:(\\d+)/)?"', "g");
  let em;
  while ((em = epRe.exec(html))) eps.add(em[1] ? Number(em[1]) : 1);
  const epNums = Array.from(eps).sort(function (a, b) { return a - b; });
  if (epNums.length > 1) {
    item.episodeItems = epNums.map(function (n) {
      const ep = {
        id: "huangguotop:ep:" + id + ":" + n,
        type: "video",
        title: "第" + n + "集",
        episode: n,
        link: "huangguotop:ep:" + id + ":" + n
      };
      if (cover) { ep.posterPath = cover; ep.coverUrl = cover; ep.backdropPath = cover; }
      return ep;
    });
  }
  const headPart = html.split("选集")[0];
  const tagSeen = new Set();
  const genres = [];
  const tagRe = /href="\/tag\/([a-z0-9-]+)\/"[^>]*>([^<]+)</g;
  let tm;
  while ((tm = tagRe.exec(headPart))) {
    if (tagSeen.has(tm[1])) continue;
    tagSeen.add(tm[1]);
    genres.push({ id: "tag:" + tm[1], title: hgUnescape(tm[2]).trim() });
    if (genres.length >= 8) break;
  }
  if (genres.length) item.genreItems = genres;
  const relIdx = html.indexOf("看过的人还在看");
  if (relIdx >= 0) {
    const rest = html.slice(relIdx);
    const endIdx = rest.indexOf("<h2", 10);
    const section = endIdx > 0 ? rest.slice(0, endIdx) : rest;
    const related = hgParseCards(section, base).filter(function (it) { return it.id !== id; }).slice(0, 12);
    if (related.length) item.relatedItems = related;
  }
  return item;
}

async function loadDetail(link) {
  const owned = hgParseOwned(link);
  if (!owned) throw new Error("无法识别的详情链接: " + link);
  try {
    return await hgDramaDetail(owned.id);
  } catch (e) {
    console.error("[loadDetail] 失败:", e && e.message || e);
    throw e;
  }
}

function hgEpHint(params, owned) {
  if (owned && owned.ep) return owned.ep;
  const p = params || {};
  const cands = [p.episode, p.item && p.item.episode];
  for (const c of cands) {
    const n = Number(c);
    if (n >= 1) return Math.floor(n);
  }
  const link = String(p.link || (p.item && p.item.link) || "");
  const m = link.match(/#ep(\d+)$/);
  if (m) return Number(m[1]);
  return 0;
}

function hgLine(name, url, referer, cdn) {
  const headers = { Referer: referer, "User-Agent": HG_UA };
  if (cdn && cdn.authKey && cdn.authValue) headers[cdn.authKey] = cdn.authValue;
  if (cdn && cdn.app) headers["x-cdn-app"] = cdn.app;
  return {
    name: name,
    url: hgUnescape(url),
    customHeaders: headers,
    playerType: "app"
  };
}

async function loadResource(params = {}) {
  try {
    const raw = (params && params.link != null && params.link !== "") ? params.link
      : (params && params.item && params.item.link != null && params.item.link !== "") ? params.item.link
      : (params && params.id != null && params.id !== "") ? params.id
      : (params && params.item && params.item.id != null ? params.item.id : "");
    const owned = hgParseOwned(raw);
    if (!owned) return [];
    let ep = hgEpHint(params, owned);
    if (!ep) ep = 1;
    const cacheKey = "huangguotop_play_" + owned.id + "_" + ep;
    try {
      const hit = await Widget.storage.get(cacheKey);
      if (hit && hit.line && hit.at && Date.now() - hit.at < 600000) return [hit.line];
    } catch (e) {}
    const pageUrl = HG_BASE + "/play/" + owned.id + "/" + (ep > 1 ? ep + "/" : "");
    const data = await hgPostJson(HG_BASE + "/api/videos/" + owned.id + "/episodes/" + ep + "/playback", pageUrl);
    const streams = data && data.streams ? data.streams : null;
    if (!streams) return [];
    const lines = [];
    if (streams.main) lines.push(hgLine("高清", streams.main, pageUrl, data.cdn));
    if (lines.length) {
      try { await Widget.storage.set(cacheKey, { at: Date.now(), line: lines[0] }); } catch (e) {}
    }
    return lines;
  } catch (e) { console.error("[loadResource] 失败:", e && e.message || e); return []; }
}
