// Perverzija Tube（tube.perverzija.com）：列表 / 分类 / 搜索 / 详情 / 播放。
// 播放链：详情页 iframe 取 data（32 位 hex）-> xtremestream 播放器页取 vt
// -> proto_api castsign 取 ct -> castmaster / castmedia 出标准 HLS。
WidgetMetadata = {
  id: "perverzija",
  title: "Perverzija Tube",
  description: "tube.perverzija.com 列表、片商、标签、搜索与 XtremeStream 播放源",
  author: "Coko",
  version: "1.1.0",
  requiredVersion: "0.0.1",
  site: "https://tube.perverzija.com",
  detailCacheDuration: 30,
  search: {
    title: "Perverzija 搜索",
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
      id: "browse",
      title: "视频",
      functionName: "loadList",
      cacheDuration: 120,
      params: [
        { name: "category", title: "分类", type: "enumeration", value: "latest", enumOptions: [{ title: "最新", value: "latest" }, { title: "最多播放", value: "popular" }, { title: "最多点赞", value: "liked" }, { title: "精选场景", value: "featured" }] },
        { name: "page", title: "页码", type: "page" },
      ],
    },
    {
      id: "fullmovie",
      title: "完整影片",
      functionName: "loadList",
      cacheDuration: 120,
      params: [
        { name: "path", title: "分类", type: "constant", value: "/full-movie/" },
        { name: "sort", title: "排序", type: "enumeration", value: "date", enumOptions: [{ title: "最新发布", value: "date" }, { title: "最多播放", value: "view" }, { title: "最多点赞", value: "like" }, { title: "最多评论", value: "comment" }] },
        { name: "page", title: "页码", type: "page" },
      ],
    },
    {
      id: "studio",
      title: "片商",
      functionName: "loadList",
      cacheDuration: 120,
      params: [
        { name: "studio", title: "片商", type: "enumeration", value: "brazzers", enumOptions: [{ title: "VR", value: "vr" }, { title: "AdultTime", value: "adulttime" }, { title: "ARXNetwork", value: "arxnetwork" }, { title: "BabesNetwork", value: "babesnetwork" }, { title: "BangBros", value: "bangbros" }, { title: "BellesaFilms", value: "bellesafilms" }, { title: "Brazzers", value: "brazzers" }, { title: "CzechAV", value: "czechav" }, { title: "DigitalPlayground", value: "digitalplayground" }, { title: "Dogfart", value: "dogfart" }, { title: "DorcelClub", value: "dorcelclub" }, { title: "EvilAngel", value: "evilangel" }, { title: "FakeHub", value: "fakehub" }, { title: "FapHouse", value: "faphouse" }, { title: "FemdomEmpire", value: "femdomempire" }, { title: "FittingRoom", value: "fittingroom" }, { title: "Hentaied", value: "hentaied" }, { title: "Kink", value: "kink" }, { title: "LethalHardcore", value: "lethalhardcore" }, { title: "LetsDoeIt", value: "letsdoeit" }, { title: "ManyVids", value: "manyvids" }, { title: "MetArtNetwork", value: "metartnetwork" }, { title: "MissaX", value: "missax" }, { title: "Mofos", value: "mofos" }, { title: "Mylf", value: "mylf" }, { title: "NaughtyAmerica", value: "naughtyamerica" }, { title: "NewSensations", value: "newsensations" }, { title: "Nubiles", value: "nubiles" }, { title: "OnlyFans", value: "onlyfans" }, { title: "PornPros", value: "pornpros" }, { title: "PornstarPlatinum", value: "pornstarplatinum" }, { title: "PornWorld", value: "pornworld" }, { title: "Private", value: "private" }, { title: "RealityKings", value: "realitykings" }, { title: "ScoreGroup", value: "scoregroup" }, { title: "TeamSkeet", value: "teamskeet" }, { title: "VIP4K", value: "vip4k" }, { title: "VXN", value: "vxn" }, { title: "XEmpire", value: "xempire" }, { title: "ZeroTolerance", value: "zerotolerance" }] },
        { name: "sort", title: "排序", type: "enumeration", value: "date", enumOptions: [{ title: "最新发布", value: "date" }, { title: "最多播放", value: "view" }, { title: "最多点赞", value: "like" }, { title: "最多评论", value: "comment" }] },
        { name: "page", title: "页码", type: "page" },
      ],
    },
    {
      id: "tags",
      title: "热门标签",
      functionName: "loadList",
      cacheDuration: 120,
      params: [
        { name: "tag", title: "标签", type: "enumeration", value: "anal", enumOptions: [{ title: "Anal", value: "anal" }, { title: "Babe", value: "babe" }, { title: "Big Ass", value: "big-ass" }, { title: "Big Dick", value: "big-dick" }, { title: "Big Tits", value: "big-tits" }, { title: "Black Hair", value: "black-hair" }, { title: "Blonde", value: "blonde" }, { title: "Blowjob", value: "blowjob" }, { title: "Brunette", value: "brunette" }, { title: "Bubble Butt", value: "bubble-butt" }, { title: "Cowgirl", value: "cowgirl" }, { title: "Creampie", value: "creampie" }, { title: "Cumshot", value: "cumshot" }, { title: "Deep Throat", value: "deep-throat" }, { title: "DoggyStyle", value: "doggystyle" }, { title: "European", value: "european" }, { title: "Face Fuck", value: "face-fuck" }, { title: "Facial", value: "facial" }, { title: "Fake Tits", value: "fake-tits" }, { title: "Family Taboo", value: "family-taboo" }, { title: "Fingering", value: "fingering" }, { title: "Handjob", value: "handjob" }, { title: "Hardcore", value: "hardcore" }, { title: "High Heels", value: "high-heels" }, { title: "Indoors", value: "indoors" }, { title: "Interracial", value: "interracial" }, { title: "Kissing", value: "kissing" }, { title: "Latina", value: "latina" }, { title: "Lingerie", value: "lingerie" }, { title: "Masturbating", value: "masturbating" }, { title: "MILF", value: "milf" }, { title: "Missionary", value: "missionary" }, { title: "Natural Tits", value: "natural-tits" }, { title: "Orgasm", value: "orgasm" }, { title: "Piercing", value: "piercing" }, { title: "POV", value: "pov" }, { title: "Pussy Licking", value: "pussy-licking" }, { title: "Reverse Cowgirl", value: "reverse-cowgirl" }, { title: "Shaved", value: "shaved" }, { title: "Small Tits", value: "small-tits" }, { title: "Tattoo", value: "tattoo" }, { title: "Teen", value: "teen" }, { title: "Threesome", value: "threesome" }, { title: "Tits", value: "tits" }, { title: "Trimmed", value: "trimmed" }, { title: "4K Quality", value: "4k-quality" }, { title: "自定义", value: "custom" }] },
        { name: "customTag", title: "自定义标签（输入 tag 英文名）", type: "input", value: "", belongTo: { paramName: "tag", value: ["custom"] } },
        { name: "sort", title: "排序", type: "enumeration", value: "date", enumOptions: [{ title: "最新发布", value: "date" }, { title: "最多播放", value: "view" }, { title: "最多点赞", value: "like" }, { title: "最多评论", value: "comment" }] },
        { name: "page", title: "页码", type: "page" },
      ],
    },
    {
      id: "actor",
      title: "演员作品",
      functionName: "loadActorList",
      cacheDuration: 120,
      params: [
        { name: "actor", title: "演员名（如 abella danger）", type: "input", value: "" },
        { name: "sort", title: "排序", type: "enumeration", value: "date", enumOptions: [{ title: "最新发布", value: "date" }, { title: "最多播放", value: "view" }, { title: "最多点赞", value: "like" }, { title: "最多评论", value: "comment" }] },
        { name: "page", title: "页码", type: "page" },
      ],
    },
  ],

};

var SITE = "https://tube.perverzija.com";
var XS = "https://perv.xtremestream.xyz";
var UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

function pvHeaders(referer) {
  var h = {
    "User-Agent": UA,
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
  };
  if (referer) h.Referer = referer;
  return h;
}

async function pvGet(url, referer) {
  var resp = await Widget.http.get(url, { headers: pvHeaders(referer) });
  var d = resp && resp.data;
  return typeof d === "string" ? d : JSON.stringify(d || "");
}

async function pvGetHdr(url, referer, extra) {
  var h = pvHeaders(referer);
  if (extra) for (var k in extra) if (extra.hasOwnProperty(k)) h[k] = extra[k];
  var resp = await Widget.http.get(url, { headers: h });
  var d = resp && resp.data;
  return typeof d === "string" ? d : JSON.stringify(d || "");
}

var NAMED = {
  rsquo: "'", lsquo: "'", ldquo: '"', rdquo: '"', ndash: "–", mdash: "—",
  middot: "·", apos: "'", amp: "&", quot: '"', nbsp: " ", hellip: "…", lt: "<", gt: ">",
};

function pvDecodeEntities(s) {
  return String(s == null ? "" : s)
    .replace(/&([a-zA-Z]+);/g, function (m, name) {
      var v = NAMED[name.toLowerCase()];
      return v == null ? m : v;
    })
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8216;|&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "…")
    .replace(/&#(\d+);/g, function (m, n) {
      return String.fromCharCode(parseInt(n, 10));
    });
}

function pvClean(s) {
  return pvDecodeEntities(String(s || "").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

// 只取列表主容器，避开侧栏、轮播与相关推荐
function pvListingHtml(html) {
  var h = String(html || "");
  var start = h.search(/class="(?:video|search)-listing-content/);
  if (start < 0) start = 0;
  var end = h.length;
  var marks = ["wp-pagenavi", 'class="pagination', "<nav class=\"navigation", 'id="footer', 'class="tm_related', "related-section"];
  for (var i = 0; i < marks.length; i++) {
    var j = h.indexOf(marks[i], start);
    if (j > 0 && j < end) end = j;
  }
  return h.slice(start, end);
}

function pvParseCards(html) {
  var h = pvListingHtml(html);
  var out = [];
  var seen = {};
  var re = /<div[^>]+class="[^"]*\bvideo-item\b[^"]*"[^>]*>/g;
  var starts = [];
  var m;
  while ((m = re.exec(h))) starts.push(m.index);
  for (var i = 0; i < starts.length; i++) {
    var seg = h.slice(starts[i], i + 1 < starts.length ? starts[i + 1] : Math.min(starts[i] + 6000, h.length));
    var a = seg.match(/<a\s+href="(https:\/\/tube\.perverzija\.com\/[^"\/]+\/)"(?:\s+title="([^"]*)")?/);
    if (!a) continue;
    var url = a[1];
    if (seen[url]) continue;
    var img = seg.match(/<img[^>]+src="([^"]+)"/);
    var h3 = seg.match(/<h3[^>]*>[\s\S]{0,200}?<a[^>]*>([\s\S]{1,300}?)<\/a>/);
    var alt = seg.match(/<img[^>]+alt="([^"]*)"/);
    var title = pvClean(a[2] || (h3 && h3[1]) || (alt && alt[1]) || "");
    if (!title) title = url.replace(/\/$/, "").split("/").pop().replace(/-/g, " ");
    var p = seg.match(/<p[^>]*>([\s\S]{20,600}?)<\/p>/);
    var meta = seg.match(/class="item-head"[\s\S]{0,600}?<span>([\s\S]{0,400}?)<\/span>/);
    var desc = pvClean(p ? p[1] : meta ? meta[1] : "");
    if (!desc || desc.length < 20 || /^[\d\s]+$/.test(desc)) desc = pvClean(meta ? meta[1] : "");
    if (/^[\d\s]+$/.test(desc)) desc = "";
    seen[url] = 1;
    out.push({ url: url, title: title, img: img ? img[1] : "", desc: desc.slice(0, 240) });
  }
  return out;
}

// 列表地址：path 自带的 orderby 一律以 sort 参数为准；sort 缺省为 date
function pvListUrl(path, page, sort) {
  var p = parseInt(page || 1, 10);
  if (isNaN(p) || p < 1) p = 1;
  var base = String(path || "/");
  if (base.charAt(0) !== "/") base = "/" + base;
  var query = "";
  var qi = base.indexOf("?");
  if (qi >= 0) {
    query = base.slice(qi + 1);
    base = base.slice(0, qi);
  }
  var parts = [];
  if (query) {
    var kvs = query.split("&");
    for (var i = 0; i < kvs.length; i++) {
      if (kvs[i] && kvs[i].split("=")[0] !== "orderby") parts.push(kvs[i]);
    }
  }
  var s = String(sort || "date");
  if (s) parts.push("orderby=" + encodeURIComponent(s));
  var q = parts.length ? "?" + parts.join("&") : "";
  if (!/\/$/.test(base)) base += "/";
  if (p <= 1) return SITE + base + q;
  return SITE + base + "page/" + p + "/" + q;
}

function pvWithImages(item, url) {
  if (!url) return item;
  item.coverUrl = url;
  item.posterPath = url;
  item.backdropPath = url;
  item.backdropPaths = [url];
  return item;
}

function pvToItems(cards) {
  // 分类列表横版卡片：只留 backdropPath
  return cards.map(function (c) {
    var item = { id: c.url, type: "url", mediaType: "movie", title: c.title, link: c.url, description: c.desc || "" };
    if (c.img) item.backdropPath = c.img;
    return item;
  });
}

// 浏览分类：最新/最多播放/最多点赞/精选场景/完整影片/VR 并进一个模块，各带默认排序
var PV_BROWSE = {
  latest: { path: "/", sort: "date" },
  popular: { path: "/", sort: "view" },
  liked: { path: "/", sort: "like" },
  featured: { path: "/featured-scenes/", sort: "date" },
};

async function loadList(params) {
  params = params || {};
  var sort = params.sort;
  // 浏览分类缺省跟随分类的排序；排序显式选了才覆盖；无分类时默认 date
  var browseCat = params.category && PV_BROWSE[params.category] ? PV_BROWSE[params.category] : null;
  if (!sort || sort === "auto") sort = browseCat ? browseCat.sort : "date";
  // 详情页点演员 / 标签后，App 带着 genreId / peopleId 回到列表模块
  var tax = params.genreId || params.peopleId || "";
  if (tax) {
    var tk = pvTaxonomyKind(tax);
    if (tk) return loadTaxonomyList(tk.path, params.page, sort);
  }
  var path = params.path || "/";
  if (browseCat) path = browseCat.path;
  // 片商：39 个顶级片商 + VR 并进一个模块（VR 走 /vr/，不是 /studio/vr/）
  if (params.studio && String(params.studio).trim()) {
    var studioSlug = String(params.studio).trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
    if (studioSlug === "vr") path = "/vr/";
    else if (studioSlug) path = "/studio/" + studioSlug + "/";
  }
  // 热门标签：枚举 46 个热门 + “自定义”选项；选“自定义”时用 customTag 输入框的值；customTag 为空时不拼 /tag/custom/，回落首页
  var rawTag = "";
  if (params.tag && String(params.tag).trim()) {
    if (String(params.tag).trim() === "custom") {
      if (params.customTag && String(params.customTag).trim()) rawTag = String(params.customTag);
    } else rawTag = String(params.tag);
  }
  if (rawTag) {
    var slug = rawTag.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
    if (slug) path = "/tag/" + slug + "/";
  }
  var url = pvListUrl(path, params.page, sort);
  var cards = pvParseCards(await pvGet(url, SITE + "/"));
  if (!cards.length) {
    var u2 = pvListUrl("/", params.page, sort);
    if (u2 !== url) cards = pvParseCards(await pvGet(u2, SITE + "/"));
  }
  return pvToItems(cards);
}

async function searchVideos(params) {
  params = params || {};
  var kw = String(params.keyword || params.query || "").trim();
  if (!kw) return [];
  var p = parseInt(params.page || 1, 10);
  if (isNaN(p) || p < 1) p = 1;
  var url = p <= 1
    ? SITE + "/?s=" + encodeURIComponent(kw)
    : SITE + "/page/" + p + "/?s=" + encodeURIComponent(kw);
  var cards = pvParseCards(await pvGet(url, SITE + "/"));
  if (cards.length) return pvToItems(cards);
  if (/\s/.test(kw) && !/\d/.test(kw)) {
    var slug = pvSlugifyActor(kw);
    if (slug) {
      var actorItems = await loadTaxonomyList("/stars/" + slug + "/", p, params.sort);
      if (actorItems.length) return actorItems;
    }
  }
  return pvToItems(cards);
}

function pvIsoDurationToSeconds(v) {
  var m = String(v || "").match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/i);
  if (!m) return 0;
  return parseInt(m[1] || 0, 10) * 3600 + parseInt(m[2] || 0, 10) * 60 + parseInt(m[3] || 0, 10);
}

function pvPrettyDuration(sec) {
  sec = parseInt(sec || 0, 10);
  if (!sec) return "";
  var h = Math.floor(sec / 3600);
  var m = Math.floor((sec % 3600) / 60);
  var s = sec % 60;
  return (h ? h + ":" : "") + (h && m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
}

// 详情页 -> { videoId, title, cover, desc, duration, studio, stars, tags }
async function pvParseDetail(url) {
  var html = await pvGet(url, SITE + "/");
  var titleM =
    html.match(/<h1[^>]*class="[^"]*entry-title[^"]*"[^>]*>([\s\S]{1,400}?)<\/h1>/) ||
    html.match(/<title>([\s\S]{1,300}?)<\/title>/);
  var title = pvClean(titleM ? titleM[1] : "").replace(/\s*\|\s*Perverzija\.com\s*$/i, "");
  var coverM =
    html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/) ||
    html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/);
  var descM =
    html.match(/<meta[^>]+property="og:description"[^>]+content="([^"]*)"/) ||
    html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/);
  var durM = html.match(/"duration"\s*:\s*"(PT[^"]+)"/);
  var iframeM =
    html.match(/<iframe[^>]+src="([^"]*xtremestream[^"]*)"/) ||
    html.match(/<iframe[^>]+src="([^"]*\/player\/index\.php\?data=([0-9a-f]{32}))[^"]*"/);
  var videoId = "";
  var embed = "";
  if (iframeM) {
    var src = String(iframeM[1]);
    var idM = src.match(/[?&]data=([0-9a-fA-F]{32})/);
    if (idM) videoId = idM[1].toLowerCase();
    var hostM = src.match(/^(https?:\/\/[^\/]+)/);
    if (hostM) embed = hostM[1];
  }
  if (!videoId) {
    var anyId = html.match(/(?:embedUrl|iframe)[^\n]{0,200}?[?&]data=([0-9a-fA-F]{32})/);
    if (anyId) videoId = anyId[1].toLowerCase();
  }
  var studioM = html.match(/<strong>\s*(?:Studio|Site)s?\s*:?\s*<\/strong>([\s\S]{1,600}?)<\/div>/i);
  var starsM = html.match(/<strong>\s*Stars?\s*:?\s*<\/strong>([\s\S]{1,1200}?)<\/div>/i);
  var tagsM = html.match(/<strong>\s*Tags?\s*:?\s*<\/strong>([\s\S]{1,8000}?)<\/div>/i);
  return {
    videoId: videoId,
    embed: embed,
    title: title,
    cover: coverM ? coverM[1] : "",
    desc: pvClean(descM ? descM[1] : ""),
    seconds: durM ? pvIsoDurationToSeconds(durM[1]) : 0,
    studio: studioM ? pvClean(studioM[1]) : "",
    stars: starsM ? pvClean(starsM[1]) : "",
    tags: tagsM ? pvClean(tagsM[1]) : "",
    starsList: starsM ? pvParseLinkList(starsM[1]) : [],
    tagsList: tagsM ? pvParseLinkList(tagsM[1]) : [],
  };
}

function pvParseLinkList(blockHtml) {
  var out = [];
  var seen = {};
  var re = /<a[^>]+href="([^"]+)"[^>]*>([\s\S]{1,160}?)<\/a>/g;
  var m;
  while ((m = re.exec(String(blockHtml || "")))) {
    var name = pvClean(m[2]);
    var url = String(m[1] || "");
    if (!name || !/^https?:\/\//.test(url) || seen[url]) continue;
    seen[url] = 1;
    out.push({ name: name, url: url });
  }
  return out;
}

function pvStarsOf(detail) {
  var list = (detail && detail.starsList) || [];
  if (list.length) return list;
  return String((detail && detail.stars) || "")
    .split(/[,，]/)
    .map(function (v) {
      var name = pvClean(v);
      return name ? { name: name, url: "" } : null;
    })
    .filter(Boolean);
}

function pvSlugifyActor(name) {
  return String(name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function pvActorPageUrl(actor) {
  var value = String(actor || "").trim();
  if (!value) return "";
  if (/^https?:\/\//.test(value)) return value;
  var slug = value.replace(/^\/+/, "").replace(/\/+$/, "");
  if (slug.indexOf("/") >= 0) {
    if (/^(stars|tag|studio)\//.test(slug)) return SITE + "/" + slug + "/";
    slug = slug.split("/").pop();
  }
  slug = pvSlugifyActor(slug);
  return slug ? SITE + "/stars/" + slug + "/" : "";
}

function pvTaxonomyKind(url) {
  var m = String(url || "").match(/\/(stars|tag|studio)\/([^\/?#]+)/i);
  if (!m) return null;
  return { kind: m[1].toLowerCase(), slug: m[2], path: "/" + m[1].toLowerCase() + "/" + m[2] + "/" };
}

async function loadTaxonomyList(path, page, sort) {
  var p = parseInt(page || 1, 10);
  if (isNaN(p) || p < 1) p = 1;
  var base = String(path || "/");
  if (base.charAt(0) !== "/") base = "/" + base;
  if (!/\/$/.test(base)) base += "/";
  var url = pvListUrl(base, p, sort);
  var cards = pvParseCards(await pvGet(url, SITE + "/"));
  if (!cards.length && p > 1) cards = pvParseCards(await pvGet(pvListUrl(base, 1, sort), SITE + "/"));
  return pvToItems(cards);
}

function pvTitleCase(text) {
  return String(text || "").replace(/(^|\s|[-_])([a-z])/g, function (m, pre, ch) {
    return pre + ch.toUpperCase();
  });
}

function pvActorDisplayName(actor) {
  var value = String(actor || "").trim();
  if (!value) return "";
  if (/^https?:\/\//.test(value)) {
    var slug = value.replace(/\/+$/, "").split("/").pop() || "";
    return pvTitleCase(pvDecodeURIComponentSafe(slug).replace(/-/g, " "));
  }
  return pvTitleCase(pvDecodeURIComponentSafe(value).replace(/-/g, " "));
}

function pvDecodeURIComponentSafe(value) {
  try {
    return decodeURIComponent(String(value || ""));
  } catch (_) {
    return String(value || "");
  }
}

async function loadActorList(params) {
  params = params || {};
  var actor = String(params.actor || params.star || params.keyword || "").trim();
  if (!actor) return [];
  var url = pvActorPageUrl(actor);
  var taxonomy = pvTaxonomyKind(url);
  var path = taxonomy ? taxonomy.path : "";
  if (!path) return [];
  var items = await loadTaxonomyList(path, params.page, params.sort);
  if (items.length) return items;
  return pvToItems(pvParseCards(await pvGet(SITE + "/?s=" + encodeURIComponent(pvActorDisplayName(actor)), SITE + "/")));
}

// 只认本站详情页：https://tube.perverzija.com/<单段 slug>/，其余一律不解析
function pvOwnedLink(raw) {
  var s = String(raw || "").split("#")[0].split("?")[0];
  var m = s.match(/^https:\/\/tube\.perverzija\.com\/([^\/]+)\/$/);
  if (!m) return null;
  return SITE + "/" + m[1] + "/";
}

// 线路缓存：同一 videoId 10 分钟内复用，避免重复签发
var PV_STREAM_CACHE = {};
var PV_STREAM_TTL = 10 * 60 * 1000;

// proto_api 对 m3u8 返回 application/octet-stream，桥接层可能给 base64，这里统一还原成文本
var PV_B64_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function pvBase64Decode(text) {
  var compact = String(text || "").replace(/[^A-Za-z0-9+/=]/g, "");
  var out = "";
  var buffer = 0;
  var bits = 0;
  for (var i = 0; i < compact.length; i++) {
    var ch = compact.charAt(i);
    if (ch === "=") break;
    var val = PV_B64_ALPHABET.indexOf(ch);
    if (val < 0) continue;
    buffer = (buffer << 6) | val;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      out += String.fromCharCode((buffer >> bits) & 0xff);
    }
  }
  return out;
}

function pvUtf8FromBinary(bin) {
  var out = "";
  for (var i = 0; i < bin.length; i++) {
    var c = bin.charCodeAt(i);
    if (c < 0x80) out += String.fromCharCode(c);
    else if (c < 0xe0) out += String.fromCharCode(((c & 0x1f) << 6) | (bin.charCodeAt(++i) & 0x3f));
    else if (c < 0xf0) out += String.fromCharCode(((c & 0x0f) << 12) | ((bin.charCodeAt(++i) & 0x3f) << 6) | (bin.charCodeAt(++i) & 0x3f));
    else {
      var cp = ((c & 0x07) << 18) | ((bin.charCodeAt(++i) & 0x3f) << 12) | ((bin.charCodeAt(++i) & 0x3f) << 6) | (bin.charCodeAt(++i) & 0x3f);
      cp -= 0x10000;
      out += String.fromCharCode(0xd800 + (cp >> 10), 0xdc00 + (cp & 0x3ff));
    }
  }
  return out;
}

function pvBinaryToText(body) {
  var text = String(body == null ? "" : body);
  if (text.indexOf("#EXT") >= 0) return text;
  if (text.length < 24) return text;
  var compact = text.replace(/\s+/g, "");
  if (!/^[A-Za-z0-9+/=]+$/.test(compact)) return text;
  var bin = pvBase64Decode(compact);
  if (bin.indexOf("#EXT") >= 0) return pvUtf8FromBinary(bin);
  return text;
}

// 部分影片只上传了低画质，master 里却仍列出 1080/720（返回 404），需实测筛掉
async function pvPlaylistAlive(playlistUrl, referer) {
  try {
    var raw = await pvGet(playlistUrl, referer);
    return pvBinaryToText(raw).indexOf("#EXTM3U") >= 0;
  } catch (e) {
    return false;
  }
}

// 播放器页取 vt，castsign 取 ct，产出 castmaster / castmedia 线路
async function pvResolveStream(url, detailUrl, preset) {
  var d = preset || (await pvParseDetail(url));
  if (!d.videoId) throw new Error("未找到播放器 id，可能影片无源");
  var cached = PV_STREAM_CACHE[d.videoId];
  if (cached && Date.now() - cached.t < PV_STREAM_TTL) return { detail: d, lines: cached.lines };
  // 站点会随机分配 xtremestream 子域，部分子域用旧版接口且被 Cloudflare 拦；
  // 视频 id 全局通用，任一播放器子域都能签发 vt/ct，逐个尝试直到拿到令牌
  var bases = [];
  function pushBase(b) {
    if (b && bases.indexOf(b) < 0) bases.push(b);
  }
  pushBase(d.embed);
  pushBase(XS);
  pushBase("https://pervm1.xtremestream.xyz");
  pushBase("https://pervl5.xtremestream.xyz");
  pushBase("https://pervm2.xtremestream.xyz");
  var playerReferer = detailUrl || url;
  var base = "";
  var vt = "";
  var playerUrl = "";
  var lastErr = "";
  for (var bi = 0; bi < bases.length; bi++) {
    var tryUrl = bases[bi] + "/player/index.php?data=" + d.videoId;
    var page = "";
    try {
      page = await pvGet(tryUrl, playerReferer);
    } catch (e) {
      lastErr = String(e && e.message ? e.message : e);
      continue;
    }
    var vtM = page.match(/boot\(\s*["']?[0-9a-fA-F]{32}["']?\s*,\s*["']([^"']+)["']/);
    if (vtM) {
      base = bases[bi];
      vt = String(vtM[1]).replace(/\s+/g, "");
      playerUrl = tryUrl;
      break;
    }
    lastErr = "该子域无 ftk 令牌";
  }
  if (!vt) throw new Error("播放器页未返回 vt 令牌" + (lastErr ? "：" + lastErr : ""));
  var apiBase = base + "/player/proto_api.php?data=" + d.videoId;
  var vtParam = "&vt=" + encodeURIComponent(vt);
  var signResp = await Widget.http.get(apiBase + "&op=castsign" + vtParam, {
    headers: { "User-Agent": UA, "X-XS-P": "1", Referer: playerUrl, Accept: "*/*" },
  });
  var ct = String((signResp && signResp.data) || "").replace(/\s+/g, "");
  if (!ct || ct.indexOf("forbidden") === 0) throw new Error("castsign 签名失败");
  // master 与 castmedia 都必须带 vt；castmaster 返回的变体地址自带完整签名（含新 ct）
  var cm = apiBase + vtParam + "&ct=" + encodeURIComponent(ct) + "&op=castmaster";
  var autoLine = { name: "自动（自适应）", description: "HLS · XtremeStream 自适应码率（兜底）", url: cm, customHeaders: { "User-Agent": UA, Referer: playerUrl } };
  var master = "";
  try {
    master = pvBinaryToText(await pvGetHdr(cm, playerUrl, { "X-XS-P": "1", Accept: "*/*" }));
  } catch (e) {}
  var quals = [];
  var re = /#EXT-X-STREAM-INF:[^\n]*RESOLUTION=(\d+)x(\d+)[^\n]*\n(\S+)/g;
  var mm;
  while ((mm = re.exec(master))) {
    var lineUrl = String(mm[3]).trim();
    var qm = lineUrl.match(/[?&]q=(\d+)/);
    if (!qm) continue;
    quals.push({
      q: qm[1],
      label: qm[1] + "P",
      w: parseInt(mm[1], 10),
      h: parseInt(mm[2], 10),
      url: lineUrl,
    });
  }
  if (!quals.length) {
    var fallbackQ = ["1080", "720", "480"];
    for (var qi = 0; qi < fallbackQ.length; qi++) {
      var fl = fallbackQ[qi];
      quals.push({
        q: fl,
        label: fl + "P",
        w: fl === "1080" ? 1920 : fl === "720" ? 1280 : 854,
        h: parseInt(fl, 10),
        url: apiBase + vtParam + "&ct=" + encodeURIComponent(ct) + "&op=castmedia&q=" + fl,
      });
    }
  }
  quals.sort(function (a, b) {
    return parseInt(b.q, 10) - parseInt(a.q, 10);
  });
  var lines = [];
  for (var i = 0; i < quals.length; i++) {
    if (!(await pvPlaylistAlive(quals[i].url, playerUrl))) continue;
    lines.push({
      name: quals[i].label,
      description: "HLS · " + quals[i].label + (quals[i].h ? " · " + quals[i].w + "x" + quals[i].h : "") + " · XtremeStream",
      url: quals[i].url,
      customHeaders: { "User-Agent": UA, Referer: playerUrl },
    });
  }
  // 自适应 master 始终兜底放最后
  lines.push(autoLine);
  PV_STREAM_CACHE[d.videoId] = { t: Date.now(), lines: lines };
  return { detail: d, lines: lines };
}

async function loadDetail(link) {
  var url = String(link || "").split("#")[0];
  var owned = pvOwnedLink(url);
  if (!owned && !pvTaxonomyKind(url)) return null;
  if (!owned) {
    var taxonomy = pvTaxonomyKind(url);
    var works = await loadTaxonomyList(taxonomy.path, 1);
    var kindTitle = taxonomy.kind === "stars" ? "演员" : taxonomy.kind === "tag" ? "标签" : "片商";
    return {
      id: url,
      type: "url",
      mediaType: "movie",
      title: pvActorDisplayName(taxonomy.slug),
      link: url,
      description: kindTitle + " · 共 " + works.length + " 部作品",
      relatedItems: works,
    };
  }
  var d = await pvParseDetail(owned);
  var item = {
    id: owned,
    type: "url",
    mediaType: "movie",
    title: d.title || "未命名",
    link: owned,
    description: [d.studio, d.stars, d.tags].filter(Boolean).join(" · ").slice(0, 300) || d.desc,
    duration: d.seconds || 0,
    durationText: pvPrettyDuration(d.seconds),
  };
  pvWithImages(item, d.cover || "");
  var starList = pvStarsOf(d);
  if (starList.length) {
    item.peoples = starList.map(function (star) {
      var personUrl = star.url || pvActorPageUrl(star.name);
      return { id: personUrl || star.name, title: star.name, name: star.name, link: personUrl || "", role: "演员" };
    });
  }
  var tagList = d.tagsList || [];
  if (tagList.length) {
    item.genreTitle = "标签";
    item.genreItems = tagList.map(function (tag) {
      return { id: tag.url, title: tag.name };
    });
  }
  return item;
}

async function loadResource(params) {
  params = params || {};
  var link = String(params.link || params.id || params.url || "");
  var owned = pvOwnedLink(link);
  if (!owned) return [];
  var r = await pvResolveStream(owned, owned);
  if (!r.lines.length) throw new Error("没有可用线路");
  return r.lines;
}
