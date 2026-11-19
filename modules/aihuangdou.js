WidgetMetadata = {
  id: "aihuangdou",
  title: "黄桃短剧",
  version: "1.0.5",
  requiredVersion: "0.0.1",
  description: "AI成人短剧 / AI漫剧",
  author: "Coko",
  site: "https://aihuangdou.com",
  iconurl: "https://tu.100923.xyz/file/1795039033138_aihuangdou-icon-round.png",
  detailCacheDuration: 60,
  globalParams: [{ name: "imgProxy", title: "封面代理", type: "input", value: "" }],
  modules: [
    {
      id: "latest",
      title: "AI短剧",
      functionName: "loadLatest",
      type: "video",
      cacheDuration: 0,
      params: [
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          value: "new",
          enumOptions: [
            { title: "最新更新", value: "new" },
            { title: "当前热播", value: "hot" },
            { title: "高分推荐", value: "score" },
            { title: "最多收藏", value: "collect" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "manju",
      title: "AI漫剧",
      functionName: "loadManju",
      type: "video",
      cacheDuration: 0,
      params: [
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          value: "new",
          enumOptions: [
            { title: "最新更新", value: "new" },
            { title: "当前热播", value: "hot" },
            { title: "高分推荐", value: "score" },
            { title: "最多收藏", value: "collect" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "rankHot",
      title: "热播榜",
      functionName: "loadRankings",
      type: "video",
      cacheDuration: 0,
      params: [
        { name: "board", title: "榜单", type: "constant", value: "" }
      ]
    },
    {
      id: "rankWeek",
      title: "精选榜",
      functionName: "loadRankings",
      type: "video",
      cacheDuration: 0,
      params: [
        { name: "board", title: "榜单", type: "constant", value: "week" }
      ]
    },
    {
      id: "rankRising",
      title: "潜力榜",
      functionName: "loadRankings",
      type: "video",
      cacheDuration: 0,
      params: [
        { name: "board", title: "榜单", type: "constant", value: "rising" }
      ]
    },
    {
      id: "tags",
      title: "标签",
      functionName: "loadTag",
      type: "video",
      cacheDuration: 0,
      params: [
        {
          name: "tag",
          title: "标签",
          type: "enumeration",
          enumOptions: [
            { title: "都市", value: "dushi" },
            { title: "悬疑", value: "xuanyi" },
            { title: "成长", value: "chengzhang" },
            { title: "情感", value: "qinggan" },
            { title: "家庭", value: "jiating" },
            { title: "反转", value: "fanzhuan" },
            { title: "校园", value: "xiaoyuan" },
            { title: "逆袭", value: "nixi" },
            { title: "秘密", value: "mimi" },
            { title: "日常", value: "richang" },
            { title: "剧情", value: "juqing" },
            { title: "明星", value: "mingxing" },
            { title: "青春", value: "qingchun" },
            { title: "爱情", value: "aiqing" },
            { title: "暧昧", value: "aimei" },
            { title: "奇幻", value: "qihuan" },
            { title: "冒险", value: "maoxian" },
            { title: "反差", value: "fancha" },
            { title: "短剧", value: "duanju" },
            { title: "职场", value: "zhichang" }
          ]
        },
        {
          name: "customTag",
          title: "自定义标签（填标签拼音，填了就用这个，上面选的就不算了）",
          type: "input"
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

const AH_BASE = "https://aihuangdou.com";
const AH_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";

function ahHeaders(referer, extra) {
  const h = { Referer: referer || AH_BASE + "/", "User-Agent": AH_UA };
  if (extra) for (const k in extra) h[k] = extra[k];
  return h;
}

async function ahGetText(url, extraHeaders) {
  const r = await Widget.http.get(url, { headers: ahHeaders(undefined, extraHeaders) });
  return typeof r.data === "string" ? r.data : String(r.data || "");
}

function ahUnescape(s) {
  return String(s || "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&#(\d+);/g, function (m, n) { return String.fromCharCode(Number(n)); });
}

function ahProxyBase(params) {
  let v = "";
  if (params && params.imgProxy !== undefined && params.imgProxy !== null) {
    v = String(params.imgProxy).trim().replace(/\/+$/, "");
    try { Widget.storage.set("aihuangdou_imgproxy", v); } catch (e) {}
    return v;
  }
  try {
    v = Widget.storage.get("aihuangdou_imgproxy");
    if (typeof v === "string") return v.trim().replace(/\/+$/, "");
  } catch (e) {}
  return "";
}

function ahCover(picUrl, base) {
  if (!picUrl) return "";
  if (base) return base + "/?url=" + encodeURIComponent(picUrl) + "&site=aihuangdou.com";
  return picUrl;
}

function ahItem(id, title, subtitle, description, poster, base) {
  const item = {
    id: "aihuangdou:" + id,
    link: "aihuangdou:" + id,
    type: "video",
    title: title
  };
  if (subtitle) item.subtitle = subtitle;
  if (description) item.description = description;
  const cover = ahCover(poster, base);
  if (cover) item.posterPath = cover;
  return item;
}

function ahParseCards(html, base) {
  const out = [];
  const re = /<article class="drama-card">([\s\S]*?)<\/article>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const c = m[1];
    const idm = c.match(/\/drama\/(\d+)\//);
    if (!idm) continue;
    const id = idm[1];
    let title = "";
    const nm = c.match(/data-track-item-name="([^"]*)"/);
    if (nm) title = nm[1].trim();
    if (!title) {
      const hm = c.match(/<h3>([^<]*)<\/h3>/);
      if (hm) title = hm[1].trim();
    }
    if (!title) continue;
    const pm = c.match(/data-src="(https:[^"]+)"/);
    const poster = pm ? ahUnescape(pm[1]) : "";
    let desc = "";
    const dm = c.match(/class="card-desc">([^<]*)/);
    if (dm) desc = ahUnescape(dm[1]).trim();
    out.push(ahItem(id, title, "", desc, poster, base));
  }
  return out;
}

function ahPage(params) {
  const p = Number(params && params.page) || 1;
  return p > 1 ? p : 1;
}

function ahSort(params) {
  const s = String((params && params.sort) || "new").trim().toLowerCase();
  if (s === "hot" || s === "score" || s === "collect") return s;
  return "new";
}

async function ahChannel(params, key, path) {
  const page = ahPage(params);
  const sort = ahSort(params);
  const base = ahProxyBase(params);
  try {
    if (sort === "new") {
      const url = page <= 1 ? AH_BASE + path : AH_BASE + path + page + "/";
      const html = await ahGetText(url);
      return ahParseCards(html, base);
    }
    const url = AH_BASE + "/api/list/fragment?scope=ninechannel&key=" + key + "&sort=" + sort + "&page=" + page;
    const html = await ahGetText(url, { "X-Requested-With": "fetch" });
    return ahParseCards(html, base);
  } catch (e) {
    console.error("[ahChannel] 失败:", e.message || e);
    return [];
  }
}

async function loadLatest(params = {}) {
  return ahChannel(params, "duanju", "/ai-duanju/");
}

async function loadManju(params = {}) {
  return ahChannel(params, "dongman-sm", "/ai-manju/");
}

function ahParseRankings(html, base) {
  const blocks = [];
  const leadRe = /<article class="rank-lead">([\s\S]*?)<\/article>/g;
  const runnerRe = /<article class="rank-runner">([\s\S]*?)<\/article>/g;
  const rowRe = /<li class="rank-row">([\s\S]*?)<\/li>/g;
  let m;
  while ((m = leadRe.exec(html)) !== null) blocks.push({ html: m[1], rank: 1 });
  while ((m = runnerRe.exec(html)) !== null) blocks.push({ html: m[1], rank: 0 });
  while ((m = rowRe.exec(html)) !== null) blocks.push({ html: m[1], rank: 0 });
  const items = [];
  for (const b of blocks) {
    const c = b.html;
    const idm = c.match(/data-track-item-id="(\d+)"/);
    if (!idm) continue;
    const id = idm[1];
    let title = "";
    const nm = c.match(/data-track-item-name="([^"]*)"/);
    if (nm) title = nm[1].trim();
    if (!title) continue;
    const pm = c.match(/data-src="(https:[^"]+)"/);
    const poster = pm ? ahUnescape(pm[1]) : "";
    let rank = b.rank;
    if (!rank) {
      const rm = c.match(/rank-(?:lead|runner)-watermark">0?(\d+)</) || c.match(/rank-no">0?(\d+)</);
      if (rm) rank = Number(rm[1]);
    }
    const item = ahItem(id, title, "", "", poster, base);
    item._rank = rank || 999;
    items.push(item);
  }
  items.sort(function (a, b) { return a._rank - b._rank; });
  for (const it of items) delete it._rank;
  return items;
}

async function loadRankings(params = {}) {
  const board = String((params && params.board) || "").trim().replace(/[^a-z]/g, "");
  const path = board ? "/rankings/" + board + "/" : "/rankings/";
  const base = ahProxyBase(params);
  try {
    const html = await ahGetText(AH_BASE + path);
    return ahParseRankings(html, base);
  } catch (e) {
    console.error("[loadRankings] 失败:", e.message || e);
    return [];
  }
}

async function loadTag(params = {}) {
  let slug = "";
  const genreId = String((params && params.genreId) || "").trim();
  if (genreId.indexOf("tag:") === 0) slug = genreId.slice(4);
  if (!slug) {
    const custom = String((params && params.customTag) || "").trim().toLowerCase().replace(/[\s_]+/g, "-");
    if (custom) slug = custom;
  }
  if (!slug) slug = String((params && params.tag) || "").trim().toLowerCase();
  const page = ahPage(params);
  const base = ahProxyBase(params);
  if (!slug) return loadLatest(params);
  const path = page <= 1 ? "/tag/" + slug + "/" : "/tag/" + slug + "/" + page + "/";
  try {
    const html = await ahGetText(AH_BASE + path);
    return ahParseCards(html, base);
  } catch (e) {
    console.error("[loadTag] 失败:", e.message || e);
    return [];
  }
}

async function search(params = {}) {
  const keyword = String((params && params.keyword) || "").trim();
  if (!keyword) return [];
  const page = ahPage(params);
  const q = encodeURIComponent(keyword);
  const path = page <= 1 ? "/search/video/" + q + "/" : "/search/video/" + q + "/" + page + "/";
  const base = ahProxyBase(params);
  try {
    const html = await ahGetText(AH_BASE + path);
    return ahParseCards(html, base);
  } catch (e) {
    console.error("[search] 失败:", e.message || e);
    return [];
  }
}

function ahParseLink(link) {
  if (!link) return null;
  const s = String(link).trim();
  let m = s.match(/aihuangdou:(\d+)/);
  if (m) return m[1];
  m = s.match(/\/(?:drama|video)\/(\d+)\//);
  if (m) return m[1];
  m = s.match(/^(\d+)$/);
  if (m) return m[1];
  return null;
}

async function loadDetail(link) {
  try {
    const id = ahParseLink(link);
    if (!id) throw new Error("无法识别的详情链接: " + link);
    const base = ahProxyBase();
    const html = await ahGetText(AH_BASE + "/video/" + id + "/");
    const jm = html.match(/<script id="ninePlayData" type="application\/json">([\s\S]*?)<\/script>/);
    if (!jm) return [];
    let d;
    try {
      d = JSON.parse(jm[1]);
    } catch (e) {
      return [];
    }
    if (!d || !d.title) return [];
    const item = ahItem(id, String(d.title).trim(), "", d.description ? String(d.description) : "", d.poster ? String(d.poster) : "", base);
    const tags = [];
    const seen = {};
    const tagRe = /<a[^>]+href="\/tag\/([a-z0-9]+)\/"[^>]*>([^<]+)<\/a>/g;
    let tm;
    while ((tm = tagRe.exec(html)) !== null) {
      const slug = tm[1];
      if (seen[slug]) continue;
      seen[slug] = 1;
      tags.push({ id: "tag:" + slug, title: ahUnescape(tm[2]).trim() });
    }
    if (tags.length) item.genreItems = tags;
    const eps = Array.isArray(d.eps) ? d.eps : [];
    const episodeItems = [];
    for (const e of eps) {
      const n = Number(e.n);
      if (!n) continue;
      episodeItems.push({
        id: "aihuangdou:" + id + "#ep" + n,
        link: "aihuangdou:" + id + "#ep" + n,
        type: "video",
        title: "第 " + n + " 集",
        episode: n
      });
    }
    if (episodeItems.length) item.episodeItems = episodeItems;
    return item;
  } catch (e) {
    console.error("[loadDetail] 失败:", e.message || e);
    throw e;
  }
}

function ahParseResourceTarget(c) {
  if (!c) return null;
  const s = String(c).trim();
  let m = s.match(/aihuangdou:(\d+)(?:#ep(\d+))?/);
  if (m) return { id: m[1], ep: m[2] ? Number(m[2]) : 0 };
  m = s.match(/\/video\/(\d+)(?:\/(\d+))?\//);
  if (m) return { id: m[1], ep: m[2] ? Number(m[2]) : 0 };
  m = s.match(/^(\d+)(?:#ep(\d+))?$/);
  if (m) return { id: m[1], ep: m[2] ? Number(m[2]) : 0 };
  return null;
}

function ahPlaybackUrl(body) {
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { return ""; }
  }
  const data = (body && body.data) || {};
  return (data.streams && data.streams.main) || data.src || "";
}

async function ahPlayback(id, ep, referer) {
  const url = AH_BASE + "/api/videos/" + id + "/episodes/" + ep + "/playback";
  const headers = { "Content-Type": "application/json", Referer: referer, "User-Agent": AH_UA };
  let resp = null;
  try {
    resp = await Widget.http.post(url, {}, { headers: headers });
  } catch (e) {
    resp = null;
  }
  let body = resp && resp.data !== undefined ? resp.data : resp;
  let playUrl = ahPlaybackUrl(body);
  if (!playUrl) {
    try {
      resp = await Widget.http.request({ url: url, method: "POST", headers: headers, timeout: 40 });
    } catch (e) {
      resp = null;
    }
    body = resp && resp.data !== undefined ? resp.data : resp;
    playUrl = ahPlaybackUrl(body);
  }
  return playUrl;
}

async function loadResource(params = {}) {
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
    target = ahParseResourceTarget(c);
    if (target) break;
  }
  if (!target) return [];
  let ep = target.ep;
  if (!ep) {
    const epStr = String(params.episode || "").trim();
    if (/^\d+$/.test(epStr)) ep = Number(epStr);
  }
  if (!ep) {
    const epName = String(params.episodeName || "");
    const nm = epName.match(/(\d+)/);
    if (nm) ep = Number(nm[1]);
  }
  if (!ep) ep = 1;
  const referer = AH_BASE + "/video/" + target.id + "/";
  let playUrl = "";
  try {
    playUrl = await ahPlayback(target.id, ep, referer);
  } catch (e) {
    console.error("[loadResource] 失败:", e.message || e);
    return [];
  }
  if (!playUrl) return [];
  return [{
    name: "第 " + ep + " 集",
    url: playUrl,
    playerType: "app",
    customHeaders: { Referer: referer, "User-Agent": AH_UA }
  }];
}
