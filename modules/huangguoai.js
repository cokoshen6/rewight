WidgetMetadata = {
  id: "huangguoai",
  title: "黄果短剧",
  version: "1.0.1",
  contentType: "shortDrama",
  requiredVersion: "0.0.1",
  description: "黄果短剧：AI短剧、AI漫剧、排行榜与标签",
  author: "Coko",
  site: "https://huangguoai.com",
  iconurl: "https://huangguoai.com/apple-touch-icon.png",
  detailCacheDuration: 60,
  globalParams: [{ name: "imgProxy", title: "封面代理", type: "input", value: "" }],
  modules: [
    { id: "loadResource", title: "播放资源", functionName: "loadResource", type: "stream", cacheDuration: 0, params: [] },
    {
      id: "loadSort", title: "排序", functionName: "loadSort", type: "video", cacheDuration: 3600,
      params: [
        {
          name: "sort", title: "排序", type: "enumeration", value: "new",
          enumOptions: [
            { title: "最近更新", value: "new" },
            { title: "当前最热", value: "popular" },
            { title: "正在播放", value: "watchings" },
            { title: "小蓝原创", value: "xiaolan" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "loadCategory", title: "分类", functionName: "loadCategory", type: "video", cacheDuration: 3600,
      params: [
        {
          name: "category", title: "分类", type: "enumeration", value: "ai-duanju",
          enumOptions: [
            { title: "短剧", value: "ai-duanju" },
            { title: "漫剧", value: "ai-manju" },
            { title: "AI换脸", value: "ai-huanlian" },
            { title: "AI魔改", value: "ai-mogai" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    { id: "loadRank", title: "热播榜", functionName: "loadRank", type: "video", cacheDuration: 3600, params: [] },
    {
      id: "loadTag", title: "标签", functionName: "loadTag", type: "video", cacheDuration: 3600,
      params: [
        {
          name: "tag", title: "标签", type: "enumeration", value: "都市",
          enumOptions: [
            { title: "都市", value: "都市" },
            { title: "母子", value: "母子" },
            { title: "乱伦", value: "乱伦" },
            { title: "男同", value: "男同" },
            { title: "萝莉", value: "萝莉" },
            { title: "系统", value: "系统" },
            { title: "荒岛", value: "荒岛" },
            { title: "巨乳", value: "巨乳" },
            { title: "ntr", value: "ntr" },
            { title: "性转", value: "性转" },
            { title: "绿帽", value: "绿帽" },
            { title: "熟女", value: "熟女" },
            { title: "重生", value: "重生" },
            { title: "sm", value: "sm" },
            { title: "同学", value: "同学" },
            { title: "乡村", value: "乡村" },
            { title: "校园", value: "校园" },
            { title: "宿舍", value: "宿舍" },
            { title: "网红", value: "网红" },
            { title: "末日", value: "末日" },
            { title: "人妻", value: "人妻" },
            { title: "女同", value: "女同" },
            { title: "游戏", value: "游戏" },
            { title: "古风", value: "古风" }
          ]
        },
        { name: "customTag", title: "自定义标签", type: "input", value: "", description: "填标签名（如 霸总）；填了优先用自定义，无视上方下拉，想用回下拉先清空这里" },
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

const HG_BASE = "https://huangguoai.com";
const HG_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";

function hgHeaders(referer, extra) {
  const h = { "User-Agent": HG_UA, Referer: referer || HG_BASE + "/" };
  if (extra) for (const k in extra) h[k] = extra[k];
  return h;
}

async function hgGetJson(url, referer) {
  const r = await Widget.http.get(url, { headers: hgHeaders(referer) });
  let d = r && r.data;
  if (typeof d === "string") { try { d = JSON.parse(d); } catch (e) { d = null; } }
  return d && d.data !== undefined ? d.data : d;
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
    try { Widget.storage.set("huangguoai_imgproxy", v); } catch (e) {}
    return v;
  }
  try {
    v = Widget.storage.get("huangguoai_imgproxy");
    if (typeof v === "string") return v.trim().replace(/\/+$/, "");
  } catch (e) {}
  return "";
}

function hgCover(picUrl, base) {
  if (!picUrl) return "";
  const u = hgUnescape(picUrl);
  if (base) return base + "/?url=" + encodeURIComponent(u) + "&site=huangguoai.com";
  return u;
}

function hgPage(params) {
  const p = Number((params && params.page) || 1);
  return p >= 1 ? Math.floor(p) : 1;
}

function hgEpStatus(v) {
  const n = Number(v && v.episode_count);
  if (!n) return "";
  return v.is_finished ? "全" + n + "集" : "更新至" + n + "集";
}

function hgMapItem(v, base) {
  if (!v || v.id === undefined || v.id === null) return null;
  const item = {
    id: String(v.id),
    type: "video",
    title: hgUnescape(v.title || "").trim(),
    link: "huangguoai:drama:" + v.id
  };
  const cover = hgCover(v.cover || "", base);
  if (cover) item.posterPath = cover;
  const score = Number(v.score);
  if (score) item.rating = score;
  if (v.desc) item.description = hgUnescape(v.desc).trim();
  const st = hgEpStatus(v);
  if (st) item.subtitle = st;
  return item;
}

function hgMapItems(list, base) {
  const out = [];
  const arr = Array.isArray(list) ? list : [];
  for (const v of arr) {
    const it = hgMapItem(v, base);
    if (it && it.title) out.push(it);
  }
  return out;
}

function hgGenreTag(params) {
  const g = params && params.genreId ? String(params.genreId) : "";
  const m = g.match(/^tag:(.+)$/);
  return m ? m[1] : "";
}

async function hgTagList(name, params) {
  const page = hgPage(params);
  const url = HG_BASE + "/api/videos/tag/" + encodeURIComponent(name) + "?page=" + page;
  const data = await hgGetJson(url, HG_BASE + "/tag/");
  const items = data && data.items ? data.items : [];
  return hgMapItems(items, hgProxyBase(params));
}

async function loadSort(params = {}) {
  try {
    const gt = hgGenreTag(params);
    if (gt) return await hgTagList(gt, params);
    const sort = params && params.sort ? String(params.sort) : "new";
    const ok = ["new", "popular", "watchings", "xiaolan"].indexOf(sort) >= 0 ? sort : "new";
    const page = hgPage(params);
    const data = await hgGetJson(HG_BASE + "/api/videos/sort/" + ok + "?page=" + page, HG_BASE + "/");
    const items = data && data.items ? data.items : [];
    return hgMapItems(items, hgProxyBase(params));
  } catch (e) { console.error("[loadSort] 失败:", e && e.message || e); return []; }
}

async function loadCategory(params = {}) {
  try {
    const gt = hgGenreTag(params);
    if (gt) return await hgTagList(gt, params);
    const cat = params && params.category ? String(params.category) : "ai-duanju";
    const ok = ["ai-duanju", "ai-manju", "ai-huanlian", "ai-mogai"].indexOf(cat) >= 0 ? cat : "ai-duanju";
    const page = hgPage(params);
    const data = await hgGetJson(HG_BASE + "/api/videos/category/" + ok + "?page=" + page, HG_BASE + "/");
    const items = data && data.items ? data.items : [];
    return hgMapItems(items, hgProxyBase(params));
  } catch (e) { console.error("[loadCategory] 失败:", e && e.message || e); return []; }
}

async function loadRank(params = {}) {
  try {
    const gt = hgGenreTag(params);
    if (gt) return await hgTagList(gt, params);
    if (hgPage(params) > 1) return [];
    const data = await hgGetJson(HG_BASE + "/api/ranks/hot", HG_BASE + "/ranks/hot/");
    const items = data && data.items ? data.items : [];
    const base = hgProxyBase(params);
    const out = [];
    for (const v of items) {
      if (!v || v.video_id === undefined || v.video_id === null) continue;
      const it = hgMapItem({ id: v.video_id, title: v.title, cover: v.cover, score: v.score, desc: "", episode_count: v.episode_count, is_finished: v.is_finished }, base);
      if (!it || !it.title) continue;
      const rank = Number(v.rank);
      const st = hgEpStatus(v);
      if (rank) it.subtitle = "第" + rank + "名" + (st ? " · " + st : "");
      else if (st) it.subtitle = st;
      out.push(it);
    }
    return out;
  } catch (e) { console.error("[loadRank] 失败:", e && e.message || e); return []; }
}

async function loadTag(params = {}) {
  try {
    const gt = hgGenreTag(params);
    if (gt) return await hgTagList(gt, params);
    let name = params && params.customTag ? String(params.customTag).trim() : "";
    if (!name) name = params && params.tag ? String(params.tag) : "都市";
    return await hgTagList(name, params);
  } catch (e) { console.error("[loadTag] 失败:", e && e.message || e); return []; }
}

async function search(params = {}) {
  try {
    const keyword = String((params && params.keyword) || "").trim();
    if (!keyword) return [];
    const page = hgPage(params);
    const data = await hgGetJson(HG_BASE + "/api/search?q=" + encodeURIComponent(keyword) + "&page=" + page, HG_BASE + "/");
    const items = data && data.items ? data.items : [];
    return hgMapItems(items, hgProxyBase(params));
  } catch (e) { console.error("[search] 失败:", e && e.message || e); return []; }
}

function hgParseOwned(raw) {
  const s = String(raw || "").trim();
  let m = s.match(/^huangguoai:drama:(\d+)$/);
  if (m) return { kind: "drama", id: m[1], ep: 0 };
  m = s.match(/^huangguoai:ep:(\d+):(\d+)$/);
  if (m) return { kind: "drama", id: m[1], ep: Number(m[2]) };
  m = s.match(/^https?:\/\/(?:www\.)?huangguoai\.com\/video\/(\d+)\/?$/);
  if (m) return { kind: "drama", id: m[1], ep: 0 };
  return null;
}

async function hgDramaDetail(id) {
  const data = await hgGetJson(HG_BASE + "/api/videos/" + id, HG_BASE + "/video/" + id + "/");
  if (!data || !data.title) return [];
  const base = hgProxyBase(null);
  const item = hgMapItem({ id: data.id, title: data.title, cover: data.cover, score: data.score, desc: data.description, episode_count: data.episode_count, is_finished: data.is_finished }, base);
  if (!item) return [];
  item.link = "huangguoai:drama:" + id;
  const cover = hgCover(data.cover || "", base);
  const eps = Array.isArray(data.episodes) ? data.episodes : [];
  const epNums = eps.map(function (e) { return Number(e.ep_num); }).filter(function (n) { return n >= 1; }).sort(function (a, b) { return a - b; });
  if (epNums.length > 1) {
    item.episodeItems = epNums.map(function (n) {
      const ep = {
        id: "huangguoai:ep:" + id + ":" + n,
        type: "video",
        title: "第" + n + "集",
        episode: n,
        link: "huangguoai:ep:" + id + ":" + n
      };
      if (cover) { ep.posterPath = cover; ep.coverUrl = cover; ep.backdropPath = cover; }
      return ep;
    });
  }
  const tags = Array.isArray(data.tags) ? data.tags : [];
  const genres = [];
  const seen = new Set();
  for (const t of tags) {
    const name = String(t || "").trim();
    if (!name || seen.has(name)) continue;
    seen.add(name);
    genres.push({ id: "tag:" + name, title: name });
    if (genres.length >= 8) break;
  }
  if (genres.length) item.genreItems = genres;
  try {
    const rel = await hgGetJson(HG_BASE + "/api/videos/" + id + "/related", HG_BASE + "/video/" + id + "/");
    const relItems = rel && rel.items ? rel.items : [];
    const related = hgMapItems(relItems, base).filter(function (it) { return it.id !== String(id); }).slice(0, 12);
    if (related.length) item.relatedItems = related;
  } catch (e) {}
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
    const cacheKey = "huangguoai_play_" + owned.id + "_" + ep;
    try {
      const hit = await Widget.storage.get(cacheKey);
      if (hit && hit.line && hit.at && Date.now() - hit.at < 600000) return [hit.line];
    } catch (e) {}
    const pageUrl = HG_BASE + "/video/" + owned.id + "/";
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
