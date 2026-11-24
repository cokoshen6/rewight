WidgetMetadata = {
  id: "youzidj",
  title: "柚子短剧",
  version: "1.0.4",
  contentType: "shortDrama",
  requiredVersion: "0.0.1",
  description: "AI成人短剧 / AI换脸 / AI成人视频",
  author: "Coko",
  site: "https://youzidj.com",
  iconurl: "https://tu.100923.xyz/file/1795121859657_youzidj-icon-round.png",
  detailCacheDuration: 60,
  modules: [
    {
      id: "dramas",
      title: "AI短剧",
      functionName: "loadDramas",
      type: "video",
      cacheDuration: 0,
      params: [
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          value: "updated",
          enumOptions: [
            { title: "最新", value: "updated" },
            { title: "最热", value: "popular" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "faceSwap",
      title: "AI换脸",
      functionName: "loadFaceSwap",
      type: "video",
      cacheDuration: 0,
      params: [
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "adult",
      title: "AI成人视频",
      functionName: "loadAdult",
      type: "video",
      cacheDuration: 0,
      params: [
        {
          name: "section",
          title: "分类",
          type: "enumeration",
          value: "",
          enumOptions: [
            { title: "全部", value: "" },
            { title: "真人", value: "real" },
            { title: "动漫", value: "anime" },
            { title: "魔改", value: "remix" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
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
            { title: "御姐", value: "yu-jie" },
            { title: "后入", value: "hou-ru" },
            { title: "调教", value: "tiao-jiao" },
            { title: "人妻", value: "ren-qi" },
            { title: "熟女", value: "shu-nu" },
            { title: "后宫", value: "hou-gong" },
            { title: "口交", value: "kou-jiao" },
            { title: "绿帽", value: "lu-mao" },
            { title: "情感", value: "romance" },
            { title: "母子", value: "mu-zi" },
            { title: "强奸", value: "qiang-jian" },
            { title: "逆袭", value: "ni-xi" },
            { title: "奇幻", value: "qi-huan" },
            { title: "姐弟", value: "jie-di" },
            { title: "偷情", value: "tou-qing" },
            { title: "系统", value: "xi-tong" },
            { title: "异能", value: "yi-neng" },
            { title: "师生", value: "shi-sheng" },
            { title: "群交", value: "qun-jiao" },
            { title: "巨乳", value: "ju-ru" },
            { title: "复仇", value: "fu-chou" },
            { title: "悬疑", value: "xuan-yi" },
            { title: "萝莉", value: "luo-li" },
            { title: "明星", value: "ming-xing" }
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

const YZ_BASE = "https://youzidj.com";
const YZ_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
const YZ_SESSION_KEY = "youzidj_session_v1";

function yzHeaders(referer, extra) {
  const h = { Referer: referer || YZ_BASE + "/", "User-Agent": YZ_UA };
  if (extra) for (const k in extra) h[k] = extra[k];
  return h;
}

function yzUnescape(s) {
  return String(s || "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&#(\d+);/g, function (m, n) { return String.fromCharCode(Number(n)); });
}

function yzAbs(url) {
  const u = String(url || "").trim();
  if (!u) return "";
  if (u.indexOf("http://") === 0 || u.indexOf("https://") === 0) return u;
  if (u.indexOf("//") === 0) return "https:" + u;
  if (u.indexOf("/") === 0) return YZ_BASE + u;
  return YZ_BASE + "/" + u;
}

function yzPage(params) {
  const p = Number((params && params.page) || 1);
  return p > 0 ? Math.floor(p) : 1;
}

async function yzGetText(url, referer) {
  const r = await Widget.http.get(url, { headers: yzHeaders(referer) });
  return typeof r.data === "string" ? r.data : String(r.data || "");
}

async function yzGetTextSession(url, referer) {
  const s = await yzEnsureSession(false);
  const hdrs = yzHeaders(referer);
  const ck = yzCookieHeader(s, "", "");
  if (ck) hdrs.Cookie = ck;
  const r = await Widget.http.get(url, { headers: hdrs });
  return typeof r.data === "string" ? r.data : String(r.data || "");
}

function yzParseCards(html) {
  const out = [];
  const re = /<article class="drama-card[^"]*"[^>]*>([\s\S]*?)<\/article>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const c = m[1];
    const hm = c.match(/href="(?:https:\/\/youzidj\.com)?(\/(?:dramas|ai-face-swap|ai-adult)\/[^"]+)"/);
    if (!hm) continue;
    const path = hm[1];
    let id = "";
    let link = "";
    let season = 0;
    let dm = path.match(/^\/dramas\/([a-z0-9\-]+)\/season-(\d+)\/?$/);
    if (dm) {
      season = Number(dm[2]);
      link = "youzidj:drama:" + dm[1] + ":" + season;
      id = link;
    } else {
      const vm = path.match(/^\/(ai-face-swap|ai-adult)\/([a-z0-9]+)\/?$/);
      if (!vm) continue;
      if (vm[2] === "real" || vm[2] === "anime" || vm[2] === "remix") continue;
      link = "youzidj:video:" + (vm[1] === "ai-face-swap" ? "face-swap" : "adult") + ":" + vm[2];
      id = link;
    }
    let title = "";
    const tm = c.match(/drama-card-title" title="([^"]*)"/);
    if (tm) title = yzUnescape(tm[1]).trim();
    if (!title) {
      const am = c.match(/aria-label="查看详情：([^"]*)"/);
      if (am) title = yzUnescape(am[1]).trim();
    }
    if (!title) continue;
    if (season > 1) title = title + " 第" + season + "季";
    const pm = c.match(/<img src="([^"]+)"/);
    const poster = pm ? yzAbs(yzUnescape(pm[1])) : "";
    let desc = "";
    const em = c.match(/home-card-episodes-long">([^<]*)</);
    if (em) desc = yzUnescape(em[1]).trim();
    const item = { id: id, link: link, type: "video", title: title };
    if (desc) item.description = desc;
    if (poster) item.posterPath = poster;
    out.push(item);
  }
  return out;
}

async function loadDramas(params = {}) {
  const page = yzPage(params);
  const sort = String((params && params.sort) || "updated").trim();
  try {
    let html = "";
    if (sort === "popular") {
      html = await yzGetText(YZ_BASE + "/api/catalogue/browse?sort=popular&page=" + page + "&navigation=1", YZ_BASE + "/dramas/");
    } else {
      const path = page <= 1 ? "/dramas/" : "/dramas/page/" + page + "/";
      html = await yzGetText(YZ_BASE + path, YZ_BASE + "/dramas/");
    }
    return yzParseCards(html);
  } catch (e) {
    console.error("[loadDramas] 失败:", e.message || e);
    return [];
  }
}

async function loadFaceSwap(params = {}) {
  const page = yzPage(params);
  const path = page <= 1 ? "/ai-face-swap/" : "/ai-face-swap/page/" + page + "/";
  try {
    const html = await yzGetText(YZ_BASE + path, YZ_BASE + "/ai-face-swap/");
    return yzParseCards(html);
  } catch (e) {
    console.error("[loadFaceSwap] 失败:", e.message || e);
    return [];
  }
}

async function loadAdult(params = {}) {
  const page = yzPage(params);
  const section = String((params && params.section) || "").trim();
  const basePath = section ? "/ai-adult/" + section + "/" : "/ai-adult/";
  const path = page <= 1 ? basePath : basePath + "page/" + page + "/";
  try {
    const html = await yzGetText(YZ_BASE + path, YZ_BASE + basePath);
    return yzParseCards(html);
  } catch (e) {
    console.error("[loadAdult] 失败:", e.message || e);
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
  const page = yzPage(params);
  if (!slug) return loadDramas(params);
  const path = page <= 1 ? "/tags/" + slug + "/" : "/tags/" + slug + "/page/" + page + "/";
  try {
    const html = await yzGetText(YZ_BASE + path, YZ_BASE + "/tags/" + slug + "/");
    return yzParseCards(html);
  } catch (e) {
    console.error("[loadTag] 失败:", e.message || e);
    return [];
  }
}

async function search(params = {}) {
  const keyword = String((params && params.keyword) || "").trim();
  if (!keyword) return [];
  const page = yzPage(params);
  try {
    const html = await yzGetTextSession(YZ_BASE + "/api/catalogue/search?q=" + encodeURIComponent(keyword) + "&page=" + page, YZ_BASE + "/search/");
    return yzParseCards(html);
  } catch (e) {
    console.error("[search] 失败:", e.message || e);
    return [];
  }
}

function yzParseLink(link) {
  const s = String(link || "").trim();
  let m = s.match(/^youzidj:drama:([a-z0-9\-]+):(\d+)$/);
  if (m) return { kind: "drama", slug: m[1], season: Number(m[2]) };
  m = s.match(/^youzidj:ep:([a-z0-9\-]+):(\d+):(\d+)$/);
  if (m) return { kind: "episode", slug: m[1], season: Number(m[2]), episode: Number(m[3]) };
  m = s.match(/^youzidj:video:(face-swap|adult):([a-z0-9]+)$/);
  if (m) return { kind: "video", section: m[1], code: m[2] };
  m = s.match(/\/dramas\/([a-z0-9\-]+)\/season-(\d+)-episode-(\d+)\/?/);
  if (m) return { kind: "episode", slug: m[1], season: Number(m[2]), episode: Number(m[3]) };
  m = s.match(/\/dramas\/([a-z0-9\-]+)\/season-(\d+)\/?/);
  if (m) return { kind: "drama", slug: m[1], season: Number(m[2]) };
  m = s.match(/\/(ai-face-swap|ai-adult)\/([a-z0-9]+)\/?/);
  if (m && m[2] !== "real" && m[2] !== "anime" && m[2] !== "remix") return { kind: "video", section: m[1] === "ai-face-swap" ? "face-swap" : "adult", code: m[2] };
  return null;
}

function yzOg(html, prop) {
  const m = html.match(new RegExp('property="og:' + prop + '" content="([^"]*)"'));
  return m ? yzUnescape(m[1]).trim() : "";
}

function yzCleanDesc(desc) {
  let d = String(desc || "").trim();
  d = d.replace(/^AI短剧简介：/, "").replace(/^AI换脸简介：/, "").replace(/^AI成人视频简介：/, "");
  d = d.replace(/\s*在柚子短剧免费观看全集，可按集选播。?$/, "").replace(/\s*在柚子短剧免费观看。?$/, "");
  return d.trim();
}

function yzDetailTags(html) {
  const out = [];
  const seen = {};
  const re = /href="(?:https:\/\/youzidj\.com)?\/tags\/([a-z0-9\-]+)\/"><span>([^<]+)<\/span>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    if (seen[m[1]]) continue;
    seen[m[1]] = 1;
    out.push({ id: "tag:" + m[1], title: yzUnescape(m[2]).trim() });
  }
  return out;
}

function yzSeasonJson(html) {
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      const d = JSON.parse(m[1]);
      if (d && d["@type"] === "TVSeason") return d;
    } catch (e) {}
  }
  return null;
}

async function loadDetail(link) {
  const p = yzParseLink(link);
  if (!p) throw new Error("无法识别的详情链接: " + link);
  if (p.kind === "drama") {
    const url = YZ_BASE + "/dramas/" + p.slug + "/season-" + p.season + "/";
    const html = await yzGetText(url, YZ_BASE + "/dramas/");
    const sj = yzSeasonJson(html);
    if (!sj) return [];
    const seriesName = sj.partOfSeries && sj.partOfSeries.name ? String(sj.partOfSeries.name).trim() : "";
    let title = seriesName || yzOg(html, "title").split("·")[0].trim();
    if (p.season > 1 && title) title = title + " 第" + p.season + "季";
    const item = { id: "youzidj:drama:" + p.slug + ":" + p.season, link: "youzidj:drama:" + p.slug + ":" + p.season, type: "video", title: title };
    const desc = yzCleanDesc(yzOg(html, "description"));
    if (desc) item.description = desc;
    const poster = sj.image ? yzAbs(String(sj.image)) : yzOg(html, "image");
    if (poster) item.posterPath = poster;
    const tags = yzDetailTags(html);
    if (tags.length) item.genreItems = tags;
    const eps = [];
    const list = Array.isArray(sj.episode) ? sj.episode : [];
    for (const ep of list) {
      const n = Number(ep.episodeNumber || 0);
      if (!n) continue;
      const epTitle = ep.name ? String(ep.name).trim() : "第" + n + "集";
      eps.push({ id: "youzidj:ep:" + p.slug + ":" + p.season + ":" + n, link: "youzidj:ep:" + p.slug + ":" + p.season + ":" + n, type: "video", title: epTitle, episode: n });
    }
    if (eps.length > 1) item.episodeItems = eps;
    return item;
  }
  const sectionPath = p.section === "face-swap" ? "ai-face-swap" : "ai-adult";
  const url = YZ_BASE + "/" + sectionPath + "/" + p.code + "/";
  const html = await yzGetText(url, YZ_BASE + "/" + sectionPath + "/");
  let title = yzOg(html, "title");
  if (!title) {
    const tm = html.match(/<title>([^<]+)<\/title>/);
    title = tm ? yzUnescape(tm[1]).trim() : "";
  }
  title = title.replace(/｜柚子短剧$/, "").replace(/\s*-\s*柚子短剧$/, "").trim();
  if (!title) return [];
  const item = { id: "youzidj:video:" + p.section + ":" + p.code, link: "youzidj:video:" + p.section + ":" + p.code, type: "video", title: title };
  const desc = yzCleanDesc(yzOg(html, "description"));
  if (desc) item.description = desc;
  const poster = yzOg(html, "image");
  if (poster) item.posterPath = poster;
  const tags = yzDetailTags(html);
  if (tags.length) item.genreItems = tags;
  return item;
}

function yzCookieFromHeaders(headers, name) {
  if (!headers) return "";
  let sc = headers["set-cookie"];
  if (sc === undefined || sc === null) sc = headers["Set-Cookie"];
  if (sc === undefined || sc === null) return "";
  const parts = Array.isArray(sc) ? sc : [sc];
  const re = new RegExp("(?:^|[,;]\\s*)" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;,]+)");
  for (const part of parts) {
    const m = String(part).match(re);
    if (m) return m[1].trim();
  }
  return "";
}

function yzSessionGet() {
  try {
    const v = Widget.storage.get(YZ_SESSION_KEY);
    if (typeof v === "string" && v) return JSON.parse(v);
  } catch (e) {}
  return {};
}

function yzSessionSet(s) {
  try { Widget.storage.set(YZ_SESSION_KEY, JSON.stringify(s)); } catch (e) {}
}

async function yzEnsureSession(force) {
  let s = force ? {} : yzSessionGet();
  if (!s.age) {
    try {
      const r = await Widget.http.post(YZ_BASE + "/age-check", "decision=accepted&return_to=%2F", { headers: yzHeaders(YZ_BASE + "/", { "Content-Type": "application/x-www-form-urlencoded", Origin: YZ_BASE }) });
      s.age = yzCookieFromHeaders(r && r.headers, "eden_age_v2");
    } catch (e) {}
  }
  if (!s.account) {
    try {
      const hdrs = yzHeaders(YZ_BASE + "/", { "Content-Type": "application/json", Origin: YZ_BASE });
      if (s.age) hdrs.Cookie = "eden_age_v2=" + s.age;
      const r = await Widget.http.post(YZ_BASE + "/api/account/bootstrap", {}, { headers: hdrs });
      s.account = yzCookieFromHeaders(r && r.headers, "eden_account");
    } catch (e) {}
  }
  yzSessionSet(s);
  return s;
}

function yzCookieHeader(s, playName, playValue) {
  const parts = [];
  if (s && s.age) parts.push("eden_age_v2=" + s.age);
  if (s && s.account) parts.push("eden_account=" + s.account);
  if (playName && playValue) parts.push(playName + "=" + playValue);
  return parts.join("; ");
}

async function yzPlayback(videoId, pageUrl, force) {
  const s = await yzEnsureSession(force);
  const hdrs = yzHeaders(pageUrl, { "Content-Type": "application/json", Origin: YZ_BASE });
  const ck = yzCookieHeader(s, "", "");
  if (ck) hdrs.Cookie = ck;
  const r = await Widget.http.post(YZ_BASE + "/api/playback/" + videoId + "?mode=mse", {}, { headers: hdrs });
  let d = r && r.data;
  if (typeof d === "string") { try { d = JSON.parse(d); } catch (e) { d = null; } }
  if (!d || !d.url) return null;
  return { url: yzAbs(String(d.url)) };
}

async function yzMasterLines(masterUrl, pageUrl, cookie) {
  const hdrs = yzHeaders(pageUrl);
  if (cookie) hdrs.Cookie = cookie;
  let text = "";
  try {
    const r = await Widget.http.get(masterUrl, { headers: hdrs });
    text = typeof r.data === "string" ? r.data : String(r.data || "");
  } catch (e) {
    text = "";
  }
  const variants = [];
  const re = /#EXT-X-STREAM-INF:([^\n]*)\n([^\n]+)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const resM = m[1].match(/RESOLUTION=\d+x(\d+)/);
    const height = resM ? Number(resM[1]) : 0;
    let vurl = m[2].trim();
    if (vurl.indexOf("http") !== 0) {
      const base = masterUrl.slice(0, masterUrl.lastIndexOf("/") + 1);
      vurl = vurl.indexOf("/") === 0 ? YZ_BASE + vurl : base + vurl;
    }
    variants.push({ height: height, url: vurl });
  }
  const lineHeaders = yzHeaders(pageUrl);
  if (cookie) lineHeaders.Cookie = cookie;
  if (!variants.length) {
    return [{ name: "高清", url: masterUrl, playerType: "system", customHeaders: lineHeaders }];
  }
  if (variants.length === 1) {
    const name = variants[0].height ? variants[0].height + "P" : "高清";
    return [{ name: name, url: masterUrl, playerType: "system", customHeaders: lineHeaders }];
  }
  variants.sort(function (a, b) { return b.height - a.height; });
  let picked = variants.filter(function (v) { return v.height >= 720; });
  if (!picked.length) picked = [variants[0]];
  return picked.map(function (v) {
    return { name: v.height ? v.height + "P" : "高清", url: v.url, playerType: "system", customHeaders: lineHeaders };
  });
}

function yzEpisodeHint(params, item) {
  const cands = [];
  if (params) {
    if (params.episode !== undefined && params.episode !== null && params.episode !== "") cands.push(params.episode);
    if (params.index !== undefined && params.index !== null && params.index !== "") cands.push(Number(params.index) + 1);
    if (params.item) {
      if (params.item.episode !== undefined && params.item.episode !== null && params.item.episode !== "") cands.push(params.item.episode);
      if (params.item.title) cands.push(params.item.title);
      if (params.item.link) cands.push(params.item.link);
      if (params.item.id) cands.push(params.item.id);
    }
    if (params.title) cands.push(params.title);
    if (params.link) cands.push(params.link);
    if (params.id) cands.push(params.id);
  }
  if (item) {
    if (item.episode !== undefined && item.episode !== null && item.episode !== "") cands.push(item.episode);
    if (item.title) cands.push(item.title);
    if (item.link) cands.push(item.link);
    if (item.id) cands.push(item.id);
  }
  for (const c of cands) {
    const s = String(c);
    let m = s.match(/youzidj:ep:[a-z0-9\-]+:\d+:(\d+)/);
    if (m) return Number(m[1]);
    m = s.match(/season-\d+-episode-(\d+)/);
    if (m) return Number(m[1]);
    m = s.match(/#ep(\d+)/);
    if (m) return Number(m[1]);
    m = s.match(/第\s*(\d+)\s*集/);
    if (m) return Number(m[1]);
    if (/^\d+$/.test(s.trim())) return Number(s.trim());
  }
  return 0;
}

async function loadResource(params = {}) {
  try {
    const item = params && params.item ? params.item : null;
    const link = String((params && (params.link || params.id)) || (item && (item.link || item.id)) || "").trim();
    const p = yzParseLink(link);
    if (!p) return [];
    let pageUrl = "";
    if (p.kind === "episode") {
      pageUrl = YZ_BASE + "/dramas/" + p.slug + "/season-" + p.season + "-episode-" + p.episode + "/";
    } else if (p.kind === "video") {
      pageUrl = YZ_BASE + "/" + (p.section === "face-swap" ? "ai-face-swap" : "ai-adult") + "/" + p.code + "/";
    } else {
      const seasonUrl = YZ_BASE + "/dramas/" + p.slug + "/season-" + p.season + "/";
      const seasonHtml = await yzGetText(seasonUrl, YZ_BASE + "/dramas/");
      const sj = yzSeasonJson(seasonHtml);
      const list = sj && Array.isArray(sj.episode) ? sj.episode : [];
      const nums = list.map(function (ep) { return Number(ep.episodeNumber || 0); }).filter(function (n) { return n > 0; });
      if (!nums.length) return [];
      const hint = yzEpisodeHint(params, item);
      let ep = 0;
      if (hint) {
        if (nums.indexOf(hint) < 0) return [];
        ep = hint;
      } else {
        ep = nums[0];
      }
      pageUrl = YZ_BASE + "/dramas/" + p.slug + "/season-" + p.season + "-episode-" + ep + "/";
    }
    const html = await yzGetText(pageUrl, YZ_BASE + "/");
    const vm = html.match(/id="player"[^>]*data-video="([^"]+)"/);
    if (!vm) return [];
    const videoId = vm[1];
    let pb = null;
    try { pb = await yzPlayback(videoId, pageUrl, false); } catch (e) { pb = null; }
    if (!pb) {
      try { pb = await yzPlayback(videoId, pageUrl, true); } catch (e) { pb = null; }
    }
    if (!pb) return [];
    return await yzMasterLines(pb.url, pageUrl, "");
  } catch (e) {
    console.error("[loadResource] 失败:", e.message || e);
    return [];
  }
}
