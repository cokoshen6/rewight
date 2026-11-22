WidgetMetadata = {
  id: "91porna",
  title: "91视频",
  description: "91视频：海量成人视频、国产原创与日本AV主题合集、AI短剧、短视频、黑料吃瓜与合集",
  author: "Coko",
  version: "1.1.3",
  requiredVersion: "0.0.1",
  iconurl: "https://tu.100923.xyz/file/1795041695096_91porna-icon-round.png",
  detailCacheDuration: 60,
  globalParams: [
    { name: "imgProxy", title: "封面代理", type: "input", value: "" }
  ],
  modules: [
    {
      id: "videos",
      title: "视频",
      functionName: "loadVideos",
      type: "video",
      cacheDuration: 0,
      params: [
        {
          name: "category",
          title: "分类",
          type: "enumeration",
          value: "play",
          enumOptions: [
            { title: "正在播放", value: "play" },
            { title: "当前最热", value: "now_hot" },
            { title: "最近更新", value: "new_update" },
            { title: "91原创", value: "original" },
            { title: "本月最热", value: "now_month_hot" },
            { title: "10分钟以上", value: "ten_minutes" },
            { title: "20分钟以上", value: "twenty_minutes" },
            { title: "本月收藏", value: "now_month_collect" },
            { title: "高清", value: "hd" },
            { title: "上月最热", value: "month_hot" },
            { title: "本月讨论", value: "now_month_comment" },
            { title: "收藏最多", value: "max_collect" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "categories",
      title: "分类",
      functionName: "loadCategories",
      type: "video",
      cacheDuration: 0,
      params: [
        {
          name: "category",
          title: "分类",
          type: "enumeration",
          value: "吃瓜 黑料 爆料",
          enumOptions: [
            { title: "吃瓜爆料", value: "吃瓜 黑料 爆料" },
            { title: "熟女做爱", value: "熟女" },
            { title: "可爱萝莉", value: "萝莉" },
            { title: "成人动漫", value: "动漫" },
            { title: "大屌黑人", value: "黑人" },
            { title: "童颜巨乳", value: "巨乳" },
            { title: "少妇换妻", value: "换妻" },
            { title: "内射中出", value: "内射" },
            { title: "会所按摩", value: "按摩" },
            { title: "91探花", value: "探花" },
            { title: "家庭乱伦", value: "家庭乱伦" },
            { title: "三级片", value: "三级片" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "dramas",
      title: "AI短剧",
      functionName: "loadDramas",
      type: "video",
      cacheDuration: 0,
      params: [
        {
          name: "tab",
          title: "分区",
          type: "enumeration",
          value: "",
          enumOptions: [
            { title: "91AI短剧", value: "" },
            { title: "成人短剧", value: "chengren-duanju" },
            { title: "成人漫剧", value: "chengren-manju" },
            { title: "AI魔改", value: "ai-mogai" }
          ]
        },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          value: "new",
          enumOptions: [
            { title: "最新", value: "new" },
            { title: "最热", value: "hot" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "shorts",
      title: "短视频",
      functionName: "loadShorts",
      type: "video",
      cacheDuration: 0,
      params: [
        {
          name: "tab",
          title: "分区",
          type: "enumeration",
          value: "amateur",
          enumOptions: [
            { title: "素人自拍", value: "amateur" },
            { title: "高燃混剪", value: "hunjian" },
            { title: "反差系列", value: "fancha" },
            { title: "网红达人", value: "wanghong" },
            { title: "明星大瓜", value: "mingxing" },
            { title: "原创自拍", value: "zipai" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "chigua",
      title: "黑料吃瓜",
      functionName: "loadChigua",
      type: "video",
      cacheDuration: 0,
      params: [
        {
          name: "tab",
          title: "分区",
          type: "enumeration",
          value: "今日吃瓜/最新",
          enumOptions: [
            { title: "今日吃瓜", value: "今日吃瓜/最新" },
            { title: "学生校园", value: "学生校园/推荐" },
            { title: "明星黑料", value: "明星黑料/推荐" },
            { title: "网红黑料", value: "网红黑料/推荐" },
            { title: "每日大赛", value: "每日大赛/推荐" },
            { title: "名人合集", value: "名人合集/推荐" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "themes",
      title: "主题",
      functionName: "loadThemes",
      type: "video",
      cacheDuration: 0,
      params: [
        {
          name: "theme",
          title: "主题",
          type: "enumeration",
          value: "5",
          enumOptions: [
            { title: "中文字幕", value: "5" },
            { title: "多P群交", value: "1" },
            { title: "无码解放", value: "12" },
            { title: "制服诱惑", value: "6" },
            { title: "SM调教", value: "7" },
            { title: "黑人专区", value: "107" }
          ]
        },
        {
          name: "order",
          title: "排序",
          type: "enumeration",
          value: "week",
          enumOptions: [
            { title: "本周最佳", value: "week" },
            { title: "最热", value: "hot" },
            { title: "最近更新", value: "update" },
            { title: "收藏最多", value: "collect" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "sets",
      title: "合集",
      functionName: "loadSets",
      type: "video",
      cacheDuration: 0,
      params: [
        {
          name: "tab",
          title: "分区",
          type: "enumeration",
          value: "",
          enumOptions: [
            { title: "最新合集", value: "" },
            { title: "排行榜合集", value: "rank" },
            { title: "分类合集", value: "category" },
            { title: "人物合集", value: "people" },
            { title: "品牌合集", value: "brand" },
            { title: "动漫合集", value: "category/chengrendongman" }
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
    },
    {
      id: "search",
      title: "搜索",
      functionName: "search",
      type: "search",
      cacheDuration: 0,
      params: [
        { name: "keyword", title: "关键词", type: "input" },
        { name: "page", title: "页码", type: "page" }
      ]
    }
  ]
};

const NP_BASE = "https://91porna.com";
const NP_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";

function npHeaders(referer, extra) {
  const h = { Referer: referer || NP_BASE + "/", "User-Agent": NP_UA };
  if (extra) for (const k in extra) h[k] = extra[k];
  return h;
}

async function npGetText(url, extraHeaders) {
  const r = await Widget.http.get(url, { headers: npHeaders(undefined, extraHeaders) });
  return typeof r.data === "string" ? r.data : String(r.data || "");
}

function npUnescape(s) {
  return String(s || "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&#(\d+);/g, function (m, n) { return String.fromCharCode(Number(n)); });
}

function npStripTags(s) {
  return String(s || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function npProxyBase(params) {
  let v = "";
  if (params && params.imgProxy !== undefined && params.imgProxy !== null) {
    v = String(params.imgProxy).trim().replace(/\/+$/, "");
    try { Widget.storage.set("91porna_imgproxy", v); } catch (e) {}
    return v;
  }
  try {
    v = Widget.storage.get("91porna_imgproxy");
    if (typeof v === "string") return v.trim().replace(/\/+$/, "");
  } catch (e) {}
  return "";
}

function npCover(picUrl, base) {
  if (!picUrl) return "";
  if (base) return base + "/?url=" + encodeURIComponent(picUrl) + "&site=91porna.com";
  return picUrl;
}

function npPage(params) {
  const p = Number(params && params.page) || 1;
  return p > 1 ? p : 1;
}

function npDurToSec(text) {
  const s = String(text || "").trim();
  let m = s.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (m) return (Number(m[1] || 0) * 3600) + (Number(m[2] || 0) * 60) + Number(m[3] || 0);
  m = s.match(/^(\d+):(\d{2})(?::(\d{2}))?$/);
  if (m) {
    if (m[3] !== undefined) return Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]);
    return Number(m[1]) * 60 + Number(m[2]);
  }
  return 0;
}

function npDurText(sec) {
  if (!sec) return "";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const mm = (h ? String(m).padStart(2, "0") : String(m)) + ":" + String(s).padStart(2, "0");
  return h ? h + ":" + mm : mm;
}

function npAvCode(title) {
  const m = String(title || "").match(/^([A-Za-z]+[0-9]*-[A-Za-z0-9]+(?:-[A-Za-z0-9]+)?)\s+(.+)$/);
  if (m && /\d/.test(m[1]) && m[1].length <= 20) return { code: m[1], full: String(title).trim() };
  return null;
}

function npItem(key, kind, title, poster, base, durText) {
  const item = {
    id: "91porna:" + key,
    link: "91porna:" + key,
    type: "video",
    title: title
  };
  const sec = npDurToSec(durText);
  if (sec) {
    item.duration = sec;
    item.durationText = npDurText(sec);
  }
  const cover = npCover(poster, base);
  if (cover) {
    item.coverUrl = cover;
    item.backdropPath = cover;
  }
  if (kind === "avdetail") {
    const av = npAvCode(title);
    if (av) {
      item.title = av.code;
      item.description = av.full;
    }
  }
  return item;
}

function npParseCards(html, base) {
  const out = [];
  const seen = {};
  const re = /<a class="[^"]*flex aspect-w-16 aspect-h-9 overflow-hidden"[^>]*href="\/comic\/index\/(detail|avdetail)\?video_key=([^"&]+)"([\s\S]*?)<\/a>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const kind = m[1];
    const key = m[2];
    if (seen[key]) continue;
    seen[key] = 1;
    const chunk = m[3];
    const pm = chunk.match(/data-src="(https:[^"]+)"/);
    if (!pm) continue;
    const poster = npUnescape(pm[1]);
    const am = chunk.match(/alt="([^"]*)"/);
    const title = am ? npUnescape(am[1]).trim() : "";
    if (!title) continue;
    const dm = chunk.match(/>\s*(\d{1,2}:\d{2}(?::\d{2})?)\s*</);
    out.push(npItem(key, kind, title, poster, base, dm ? dm[1] : ""));
  }
  return out;
}

function npParseDramaCards(html, base) {
  const out = [];
  const seen = {};
  const re = /<a class="drama-card"[^>]*href="\/ai\/([\w-]+)"[^>]*>([\s\S]*?)<\/a>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const slug = m[1];
    if (seen[slug]) continue;
    seen[slug] = 1;
    const chunk = m[2];
    const pm = chunk.match(/data-src="(https:[^"]+)"/);
    if (!pm) continue;
    const poster = npUnescape(pm[1]);
    const tm = m[0].match(/title="([^"]*)"/);
    const am = chunk.match(/alt="([^"]*)"/);
    const title = (tm ? npUnescape(tm[1]) : (am ? npUnescape(am[1]) : "")).trim();
    if (!title) continue;
    const item = {
      id: "91porna:ai:" + slug,
      link: NP_BASE + "/ai/" + slug,
      type: "video",
      title: title
    };
    const em = chunk.match(/更新至\s*(\d+)集/);
    if (em) item.description = "更新至 " + em[1] + "集";
    const cover = npCover(poster, base);
    if (cover) item.posterPath = cover;
    out.push(item);
  }
  return out;
}

function npParseShortCards(html, base) {
  const out = [];
  const seen = {};
  const re = /<a class="video-card-link"[^>]*href="\/melonshort\/video\/(\d+)"[^>]*>([\s\S]*?)<\/a>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const id = m[1];
    if (seen[id]) continue;
    seen[id] = 1;
    const chunk = m[2];
    const pm = chunk.match(/data-src="(https:[^"]+)"/);
    if (!pm) continue;
    const poster = npUnescape(pm[1]);
    const tm = m[0].match(/title="([^"]*)"/);
    const title = tm ? npUnescape(tm[1]).trim() : "";
    if (!title) continue;
    const item = {
      id: "91porna:ms:" + id,
      link: NP_BASE + "/melonshort/video/" + id,
      type: "video",
      title: title
    };
    const dm = chunk.match(/>\s*(\d{1,2}:\d{2}(?::\d{2})?)\s*</);
    const sec = dm ? npDurToSec(dm[1]) : 0;
    if (sec) {
      item.duration = sec;
      item.durationText = npDurText(sec);
    }
    const cover = npCover(poster, base);
    if (cover) item.posterPath = cover;
    out.push(item);
  }
  return out;
}

function npParseSetCards(html, base) {
  const out = [];
  const seen = {};
  const re = /<a class="ms-card[^"]*"[^>]*href="(\/moviesets\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const path = m[1].replace(/^\/+|\/+$/g, "");
    if (seen[path]) continue;
    seen[path] = 1;
    const chunk = m[2];
    const pm = chunk.match(/data-src="(https:[^"]+)"/);
    if (!pm) continue;
    const poster = npUnescape(pm[1]);
    const hm = chunk.match(/<h3[^>]*>([^<]+)<\/h3>/);
    const am = chunk.match(/alt="([^"]*)"/);
    const title = (hm ? npUnescape(hm[1]) : (am ? npUnescape(am[1]) : "")).trim();
    if (!title) continue;
    const item = {
      id: "91porna:ms:" + path,
      link: NP_BASE + "/" + path,
      type: "video",
      title: title
    };
    const mm = chunk.match(/视频数量[：:]\s*(\d+)/);
    if (mm) item.description = "视频数量：" + mm[1];
    const cover = npCover(poster, base);
    if (cover) {
      item.coverUrl = cover;
      item.backdropPath = cover;
    }
    out.push(item);
  }
  return out;
}

function npParseChiguaCards(html, base) {
  const out = [];
  const seen = {};
  const re = /<a href="\/heiliao-chigua\/(\d+)"[^>]*>([\s\S]*?)<\/a>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const id = m[1];
    if (seen[id]) continue;
    seen[id] = 1;
    const chunk = m[2];
    const pm = chunk.match(/post-item-poster[^>]*data-src="(https:[^"]+)"/);
    if (!pm) continue;
    const poster = npUnescape(pm[1]);
    const tm = chunk.match(/post-item-title">([^<]+)</);
    const title = tm ? npUnescape(tm[1]).trim() : "";
    if (!title) continue;
    const item = {
      id: "91porna:cg:" + id,
      link: NP_BASE + "/heiliao-chigua/" + id,
      type: "video",
      title: title
    };
    const dm = chunk.match(/post-item-desc">([\s\S]*?)<\/div>/);
    if (dm) {
      const desc = npStripTags(npUnescape(dm[1]));
      if (desc) item.description = desc;
    }
    const cover = npCover(poster, base);
    if (cover) {
      item.coverUrl = cover;
      item.backdropPath = cover;
    }
    out.push(item);
  }
  return out;
}

function npCategory(params) {
  const c = String((params && params.category) || "play").trim().toLowerCase();
  const ok = ["play", "now_hot", "new_update", "original", "now_month_hot", "ten_minutes", "twenty_minutes", "now_month_collect", "hd", "month_hot", "now_month_comment", "max_collect"];
  return ok.indexOf(c) >= 0 ? c : "play";
}

async function loadVideos(params = {}) {
  const category = npCategory(params);
  const page = npPage(params);
  const base = npProxyBase(params);
  try {
    const url = NP_BASE + "/comic/index/video?category=" + category + "&page=" + page;
    const html = await npGetText(url);
    return npParseCards(html, base);
  } catch (e) {
    console.error("[loadVideos] 失败:", e.message || e);
    return [];
  }
}

const NP_TAG_MODELS = { "107": true };

function npTheme(params) {
  const t = String((params && params.theme) || "5").trim();
  return ["1", "5", "6", "7", "12", "107"].indexOf(t) >= 0 ? t : "5";
}

function npOrder(params) {
  const o = String((params && params.order) || "week").trim().toLowerCase();
  return ["week", "hot", "update", "collect"].indexOf(o) >= 0 ? o : "week";
}

async function loadThemes(params = {}) {
  let theme = npTheme(params);
  const gid = String((params && params.genreId) || "").trim();
  const gm = gid.match(/^theme:(\d+)$/);
  if (gm) theme = gm[1];
  const order = npOrder(params);
  const page = npPage(params);
  const base = npProxyBase(params);
  try {
    const type = NP_TAG_MODELS[theme] ? "tag" : "theme";
    const url = NP_BASE + "/comic/av/relvideo?model=" + theme + "&type=" + type + "&order=" + order + "&page=" + page;
    const html = await npGetText(url);
    return npParseCards(html, base);
  } catch (e) {
    console.error("[loadThemes] 失败:", e.message || e);
    return [];
  }
}

const NP_CATEGORIES = ["吃瓜 黑料 爆料", "熟女", "萝莉", "动漫", "黑人", "巨乳", "换妻", "内射", "按摩", "探花", "家庭乱伦", "三级片"];

async function npSearchItems(keyword, page, base) {
  const url = NP_BASE + "/comic/index/search?keyword=" + encodeURIComponent(keyword) + "&page=" + page;
  const html = await npGetText(url);
  return npParseCards(html, base);
}

async function loadCategories(params = {}) {
  const keyword = String((params && params.category) || "").trim();
  if (NP_CATEGORIES.indexOf(keyword) < 0) return [];
  const page = npPage(params);
  const base = npProxyBase(params);
  try {
    return await npSearchItems(keyword, page, base);
  } catch (e) {
    console.error("[loadCategories] 失败:", e.message || e);
    return [];
  }
}

function npDramaTab(params) {
  const t = String((params && params.tab) || "").trim();
  return ["", "chengren-duanju", "chengren-manju", "ai-mogai"].indexOf(t) >= 0 ? t : "";
}

function npDramaSort(params) {
  const s = String((params && params.sort) || "new").trim().toLowerCase();
  return s === "hot" ? "hot" : "new";
}

async function loadDramas(params = {}) {
  const tab = npDramaTab(params);
  const sort = npDramaSort(params);
  const page = npPage(params);
  const base = npProxyBase(params);
  try {
    const path = tab ? "/ai/" + tab : "/ai";
    const url = NP_BASE + path + (page > 1 ? "/page/" + page : "") + (sort === "hot" ? "?sort=hot" : "");
    const html = await npGetText(url);
    return npParseDramaCards(html, base);
  } catch (e) {
    console.error("[loadDramas] 失败:", e.message || e);
    return [];
  }
}

function npShortTab(params) {
  const t = String((params && params.tab) || "amateur").trim();
  return ["amateur", "hunjian", "fancha", "wanghong", "mingxing", "zipai"].indexOf(t) >= 0 ? t : "amateur";
}

async function loadShorts(params = {}) {
  const tab = npShortTab(params);
  const page = npPage(params);
  const base = npProxyBase(params);
  try {
    const url = NP_BASE + "/melonshort/" + tab + (page > 1 ? "/" + page : "");
    const html = await npGetText(url);
    return npParseShortCards(html, base);
  } catch (e) {
    console.error("[loadShorts] 失败:", e.message || e);
    return [];
  }
}

const NP_CHIGUA_TABS = ["今日吃瓜/最新", "学生校园/推荐", "明星黑料/推荐", "网红黑料/推荐", "每日大赛/推荐", "名人合集/推荐"];

async function loadChigua(params = {}) {
  const tab = String((params && params.tab) || "今日吃瓜/最新").trim();
  if (NP_CHIGUA_TABS.indexOf(tab) < 0) return [];
  const page = npPage(params);
  const base = npProxyBase(params);
  try {
    const parts = tab.split("/");
    const url = NP_BASE + "/" + encodeURIComponent("黑料吃瓜") + "/" + encodeURIComponent(parts[0]) + "/" + encodeURIComponent(parts[1]) + (page > 1 ? "?page=" + page : "");
    const html = await npGetText(url);
    return npParseChiguaCards(html, base);
  } catch (e) {
    console.error("[loadChigua] 失败:", e.message || e);
    return [];
  }
}

function npSetTab(params) {
  const t = String((params && params.tab) || "").trim();
  return ["", "rank", "category", "people", "brand", "category/chengrendongman"].indexOf(t) >= 0 ? t : "";
}

async function loadSets(params = {}) {
  const tab = npSetTab(params);
  const page = npPage(params);
  const base = npProxyBase(params);
  try {
    const url = NP_BASE + "/moviesets" + (tab ? "/" + tab : "") + (page > 1 ? "/" + page : "");
    const html = await npGetText(url);
    const sets = npParseSetCards(html, base);
    if (sets.length) return sets;
    const gm = html.match(/<ul class="ms-d-works-grid video-items">([\s\S]*?)<\/ul>/);
    return npParseCards(gm ? gm[1] : html, base);
  } catch (e) {
    console.error("[loadSets] 失败:", e.message || e);
    return [];
  }
}

async function search(params = {}) {
  const keyword = String((params && params.keyword) || "").trim();
  if (!keyword) return [];
  const page = npPage(params);
  const base = npProxyBase(params);
  try {
    return await npSearchItems(keyword, page, base);
  } catch (e) {
    console.error("[search] 失败:", e.message || e);
    return [];
  }
}

function npParseLink(link) {
  if (!link) return null;
  const s = String(link).trim();
  let m = s.match(/^91porna:ai:([\w-]+)(?::ep(\d+))?$/);
  if (m) return { key: m[1], kind: "ai", ep: m[2] ? Number(m[2]) : 0 };
  m = s.match(/^91porna:ms:(\d+)$/);
  if (m) return { key: m[1], kind: "short" };
  m = s.match(/^91porna:ms:(.+)$/);
  if (m) return { key: m[1], kind: "set" };
  m = s.match(/^91porna:cg:(\d+)$/);
  if (m) return { key: m[1], kind: "cg" };
  m = s.match(/91porna:([A-Za-z0-9]+)/);
  if (m) return { key: m[1], kind: /^\d+$/.test(m[1]) ? "detail" : "avdetail" };
  m = s.match(/\/ai\/([\w-]+)(?:\/episode-(\d+))?/);
  if (m) return { key: m[1], kind: "ai", ep: m[2] ? Number(m[2]) : 0 };
  m = s.match(/\/melonshort\/video\/(\d+)/);
  if (m) return { key: m[1], kind: "short" };
  m = s.match(/\/moviesets\/(.+)/);
  if (m) return { key: m[1].replace(/\/+$/, ""), kind: "set" };
  m = s.match(/\/heiliao-chigua\/(\d+)/);
  if (m) return { key: m[1], kind: "cg" };
  m = s.match(/\/comic\/index\/(detail|avdetail)\?video_key=([^"&]+)/);
  if (m) return { key: m[2], kind: m[1] };
  m = s.match(/^(\d+)$/);
  if (m) return { key: m[1], kind: "detail" };
  return null;
}

function npMetaDesc(html) {
  const meta = html.match(/<meta name="description" content="([^"]*)"/);
  return meta ? npUnescape(meta[1]).trim() : "";
}

function npFirstPoster(html) {
  const pm = html.match(/data-src="(https:[^"]+)"/);
  return pm ? npUnescape(pm[1]) : "";
}

async function npDetailDrama(target) {
  const base = npProxyBase();
  const url = NP_BASE + "/ai/" + target.key;
  const html = await npGetText(url);
  const hm = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
  const title = hm ? npUnescape(hm[1]).trim() : "";
  if (!title) return [];
  const eps = {};
  const re = /\/ai\/[\w-]+\/episode-(\d+)/g;
  let m;
  while ((m = re.exec(html)) !== null) eps[Number(m[1])] = 1;
  const nums = Object.keys(eps).map(Number).sort(function (a, b) { return a - b; });
  const item = {
    id: "91porna:ai:" + target.key,
    link: url,
    type: "video",
    title: title,
    description: npMetaDesc(html)
  };
  const cover = npCover(npFirstPoster(html), base);
  if (cover) item.posterPath = cover;
  if (nums.length) {
    item.episodeItems = nums.map(function (n) {
      return {
        id: "91porna:ai:" + target.key + ":ep" + n,
        link: NP_BASE + "/ai/" + target.key + "/episode-" + n,
        type: "video",
        title: "第" + n + "集",
        episode: n
      };
    });
  }
  return item;
}

async function npDetailShort(target) {
  const base = npProxyBase();
  const url = NP_BASE + "/melonshort/video/" + target.key;
  const html = await npGetText(url);
  const tm = html.match(/<title>([^<]*)<\/title>/);
  if (!tm) return [];
  const title = npUnescape(tm[1]).replace(/\s*-\s*91短视频.*$/, "").trim();
  if (!title) return [];
  const dm = html.match(/"duration":"(PT[^"]+)"/);
  const sec = dm ? npDurToSec(dm[1]) : 0;
  const item = {
    id: "91porna:ms:" + target.key,
    link: url,
    type: "video",
    title: title,
    description: npMetaDesc(html)
  };
  if (sec) {
    item.duration = sec;
    item.durationText = npDurText(sec);
  }
  const cover = npCover(npFirstPoster(html), base);
  if (cover) item.posterPath = cover;
  return item;
}

async function npDetailSet(target) {
  const base = npProxyBase();
  const url = NP_BASE + "/moviesets/" + target.key;
  const html = await npGetText(url);
  const tm = html.match(/<title>([^<]*)<\/title>/);
  if (!tm) return [];
  let title = npUnescape(tm[1]).trim().replace(/\s*[-_].*$/, "").trim();
  if (!title) return [];
  const item = {
    id: "91porna:ms:" + target.key,
    link: url,
    type: "video",
    title: title,
    description: npMetaDesc(html)
  };
  const cover = npCover(npFirstPoster(html), base);
  if (cover) {
    item.coverUrl = cover;
    item.backdropPath = cover;
  }
  const gm = html.match(/<ul class="ms-d-works-grid video-items">([\s\S]*?)<\/ul>/);
  const videos = npParseCards(gm ? gm[1] : html, base);
  const seen = {};
  videos.forEach(function (v) { seen[v.id] = 1; });
  for (let p = 2; p <= 21; p++) {
    let ph;
    try {
      ph = await npGetText(url + "/" + p);
    } catch (e) {
      break;
    }
    const pm = ph.match(/<ul class="ms-d-works-grid video-items">([\s\S]*?)<\/ul>/);
    const more = npParseCards(pm ? pm[1] : ph, base);
    let added = 0;
    more.forEach(function (v) {
      if (!seen[v.id]) {
        seen[v.id] = 1;
        videos.push(v);
        added++;
      }
    });
    if (!added) break;
  }
  if (videos.length) item.episodeItems = videos;
  return item;
}

async function npDetailChigua(target) {
  const base = npProxyBase();
  const url = NP_BASE + "/heiliao-chigua/" + target.key;
  const html = await npGetText(url);
  const dm = html.match(/_detail_\s*=\s*(\{[^\}]*\})/);
  if (!dm) return [];
  let d;
  try {
    d = JSON.parse(dm[1]);
  } catch (e) {
    return [];
  }
  if (!d || !d.title) return [];
  const title = String(d.title).trim();
  const poster = d.poster ? String(d.poster) : "";
  const item = npItem(target.key, "detail", title, poster, base, "");
  item.id = "91porna:cg:" + target.key;
  item.link = url;
  item.description = npMetaDesc(html);
  const tags = String(d.tag || "").split(",").map(function (t) { return t.trim(); }).filter(Boolean);
  if (tags.length) item.subtitle = tags.join(" · ");
  return item;
}

async function loadDetail(link) {
  try {
    const target = npParseLink(link);
    if (!target) throw new Error("无法识别的详情链接: " + link);
    if (target.kind === "ai") return await npDetailDrama(target);
    if (target.kind === "short") return await npDetailShort(target);
    if (target.kind === "set") return await npDetailSet(target);
    if (target.kind === "cg") return await npDetailChigua(target);
    const base = npProxyBase();
    const url = NP_BASE + "/comic/index/" + target.kind + "?video_key=" + encodeURIComponent(target.key);
    const html = await npGetText(url);
    const dm = html.match(/_detail_\s*=\s*(\{[^\}]*\})/);
    if (!dm) return [];
    let d;
    try {
      d = JSON.parse(dm[1]);
    } catch (e) {
      return [];
    }
    if (!d || !d.title) return [];
    const title = String(d.title).trim();
    const poster = d.poster ? String(d.poster) : "";
    const meta = html.match(/<meta name="description" content="([^"]*)"/);
    const desc = meta ? npUnescape(meta[1]).trim() : "";
    const durm = html.match(/"duration":"(PT[^"]+)"/);
    const sec = durm ? npDurToSec(durm[1]) : 0;
    const item = npItem(target.key, target.kind, title, poster, base, sec ? npDurText(sec) : "");
    item.description = desc;
    if (target.kind === "avdetail") {
      const av = npAvCode(title);
      if (av) item.description = av.full + (desc ? "\n" + desc : "");
    }
    const tags = String(d.tag || "").split(",").map(function (t) { return t.trim(); }).filter(Boolean);
    if (tags.length) item.subtitle = tags.join(" · ");
    return item;
  } catch (e) {
    console.error("[loadDetail] 失败:", e.message || e);
    throw e;
  }
}

async function npResolveNumericId(target) {
  if (target.kind === "detail") return target.key;
  const url = NP_BASE + "/comic/index/avdetail?video_key=" + encodeURIComponent(target.key);
  const html = await npGetText(url);
  const m = html.match(/<div id="mse"[^>]*data-video="(\d+)"/);
  if (m) return m[1];
  const dm = html.match(/_detail_\s*=\s*(\{[^\}]*\})/);
  if (dm) {
    try {
      const d = JSON.parse(dm[1]);
      if (d && /^\d+$/.test(String(d.id || ""))) return String(d.id);
    } catch (e) {}
  }
  return "";
}

function npBodyData(resp) {
  let body = resp && resp.data !== undefined ? resp.data : resp;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { return null; }
  }
  return body;
}

async function npPlayback(numericId, referer) {
  const url = NP_BASE + "/api/videos/" + numericId + "/playback";
  const headers = { "Content-Type": "application/json", Referer: referer, "User-Agent": NP_UA };
  let resp = null;
  try {
    resp = await Widget.http.post(url, {}, { headers: headers });
  } catch (e) {
    resp = null;
  }
  let body = npBodyData(resp);
  if (!body || body.status !== 1 || !body.data || !body.data.streams || !body.data.streams.main) {
    try {
      resp = await Widget.http.request({ url: url, method: "POST", headers: headers, timeout: 40 });
    } catch (e) {
      resp = null;
    }
    body = npBodyData(resp);
  }
  if (!body || body.status !== 1 || !body.data || !body.data.streams || !body.data.streams.main) return null;
  return body.data;
}

function npComicLines(data, referer) {
  const headers = { Referer: referer, "User-Agent": NP_UA };
  const cdn = data.cdn || {};
  if (cdn.authKey && cdn.authValue) headers[cdn.authKey] = cdn.authValue;
  if (cdn.app) headers["x-cdn-app"] = cdn.app;
  const lines = [{
    name: "高清",
    url: data.streams.main,
    playerType: "system",
    customHeaders: headers
  }];
  if (data.streams.hevc) {
    lines.push({
      name: "HEVC",
      url: data.streams.hevc,
      playerType: "system",
      customHeaders: headers
    });
  }
  return lines;
}

async function npAiPlay(slug, ep) {
  const url = NP_BASE + "/ai/" + slug + "/episode-" + ep;
  const html = await npGetText(url);
  const bm = html.match(/<script id="ai-play-boot"[^>]*>([\s\S]*?)<\/script>/);
  if (!bm) return null;
  let boot;
  try {
    boot = JSON.parse(bm[1]);
  } catch (e) {
    return null;
  }
  if (!boot || !Array.isArray(boot.playlist)) return null;
  let entry = null;
  for (const p of boot.playlist) {
    if (Number(p.ep) === ep) { entry = p; break; }
  }
  if (!entry) {
    for (const p of boot.playlist) {
      if (String(p.url || "").indexOf("/episode-" + ep) >= 0) { entry = p; break; }
    }
  }
  if (!entry && boot.current) {
    for (const p of boot.playlist) {
      if (Number(p.ep) === Number(boot.current)) { entry = p; break; }
    }
  }
  if (!entry || !entry.play) return null;
  return { url: entry.play, referer: url };
}

async function npShortPlay(id) {
  const url = NP_BASE + "/melonshort/video/" + id;
  const html = await npGetText(url);
  const re = new RegExp('data-id="' + id + '"[^>]{0,500}?data-url="([^"]+\\.m3u8[^"]*)"');
  let m = html.match(re);
  if (!m) m = html.match(/"video_url"\s*:\s*"([^"]+\.m3u8[^"]*)"/);
  if (!m) return null;
  return { url: npUnescape(m[1]), referer: url };
}

async function npPostPlayback(pid, referer) {
  const url = NP_BASE + "/api/posts/" + pid + "/playback";
  const headers = { "Content-Type": "application/json", Referer: referer, "User-Agent": NP_UA };
  let resp = null;
  try {
    resp = await Widget.http.post(url, {}, { headers: headers });
  } catch (e) {
    resp = null;
  }
  let body = npBodyData(resp);
  if (!body || body.status !== 1 || !body.data || body.data.manifest_method !== "GET" || !Array.isArray(body.data.videos)) {
    try {
      resp = await Widget.http.request({ url: url, method: "POST", headers: headers, timeout: 40 });
    } catch (e) {
      resp = null;
    }
    body = npBodyData(resp);
  }
  if (!body || body.status !== 1 || !body.data || body.data.manifest_method !== "GET" || !Array.isArray(body.data.videos)) return null;
  return body.data;
}

async function loadResource(params = {}) {
  const cand = (params && (params.link || params.id)) || (params && params.item && (params.item.link || params.item.id)) || "";
  const cacheKey = cand ? "91porna_play_" + String(cand) : "";
  if (cacheKey) {
    try {
      const hit = await Widget.storage.get(cacheKey);
      if (hit && hit.lines && hit.at && Date.now() - hit.at < 600000) return hit.lines;
    } catch (e) {}
  }
  const lines = await npResolveResource(params);
  if (cacheKey && lines && lines.length) {
    try { await Widget.storage.set(cacheKey, { at: Date.now(), lines: lines }); } catch (e) {}
  }
  return lines;
}

async function npResolveResource(params = {}) {
  const candidates = [];
  if (params) {
    if (params.link) candidates.push(params.link);
    if (params.id) candidates.push(params.id);
    if (params.item) {
      if (params.item.link) candidates.push(params.item.link);
      if (params.item.id) candidates.push(params.item.id);
    }
  }
  let target = null;
  for (const c of candidates) {
    target = npParseLink(c);
    if (target) break;
  }
  if (!target) return [];
  try {
    if (target.kind === "ai") {
      const ep = target.ep || 1;
      const play = await npAiPlay(target.key, ep);
      if (!play) return [];
      return [{
        name: "第" + ep + "集",
        url: play.url,
        playerType: "system",
        customHeaders: { Referer: play.referer, "User-Agent": NP_UA }
      }];
    }
    if (target.kind === "short") {
      const play = await npShortPlay(target.key);
      if (!play) return [];
      return [{
        name: "高清",
        url: play.url,
        playerType: "system",
        customHeaders: { Referer: play.referer, "User-Agent": NP_UA }
      }];
    }
    if (target.kind === "cg") {
      const referer = NP_BASE + "/heiliao-chigua/" + target.key;
      const html = await npGetText(referer);
      const pm = html.match(/data-playback-post="(\d+)"/);
      if (!pm) return [];
      const data = await npPostPlayback(pm[1], referer);
      if (!data || !data.videos.length) return [];
      const headers = { Referer: referer, "User-Agent": NP_UA };
      const cdn = data.cdn || {};
      if (cdn.authKey && cdn.authValue) headers[cdn.authKey] = cdn.authValue;
      if (cdn.app) headers["x-cdn-app"] = cdn.app;
      return data.videos.map(function (v, i) {
        const n = Number(v.index);
        return {
          name: "第" + (isNaN(n) ? i + 1 : n + 1) + "段",
          url: v.url,
          playerType: "system",
          customHeaders: headers
        };
      });
    }
    if (target.kind === "set") return [];
    const numericId = await npResolveNumericId(target);
    if (!numericId) return [];
    const referer = NP_BASE + "/comic/index/" + target.kind + "?video_key=" + encodeURIComponent(target.key);
    const data = await npPlayback(numericId, referer);
    if (!data) return [];
    return npComicLines(data, referer);
  } catch (e) {
    console.error("[loadResource] 失败:", e.message || e);
    return [];
  }
}
