WidgetMetadata = {
  id: "rex.juhe.baidu",
  title: "聚合百度版",
  version: "1.0.1",
  requiredVersion: "0.0.1",
  description: "纯百度聚合：并发搜索3个源（花卷/木偶/虎斑），只返回百度网盘播放源。",
  author: "夏恩",
  site: "https://github.com/InchStudio/ForwardWidgets",
  detailCacheDuration: 3600,
  globalParams: [
    { name: "baidu_cookie", title: "百度 Cookie", type: "input", value: "" },
    {
      name: "load_speed_mode",
      title: "加载速度",
      type: "enumeration",
      value: "fast",
      enumOptions: [
        { title: "极速（找到一个就返回）", value: "fast" },
        { title: "普通（返回多个大小）", value: "full" }
      ]
    },
    {
      name: "quality_tag",
      title: "清晰度标签",
      type: "enumeration",
      value: "8k",
      enumOptions: [
        { title: "8K", value: "8k" },
        { title: "4K", value: "4k" },
        { title: "1080P", value: "1080p" },
        { title: "其他", value: "other" }
      ]
    },
    { name: "host_huajuan", title: "花卷站点地址", type: "input", value: "https://www.hjzhencai.top" },
    { name: "host_huban", title: "虎斑站点地址", type: "input", value: "http://43.248.128.118:16969" },
    { name: "host_muou", title: "木偶站点地址", type: "input", value: "https://333.333291.xyz" },
    { name: "enable_huajuan", title: "花卷搜索", type: "enumeration", value: "on", enumOptions: [{ title: "启用", value: "on" }, { title: "停用", value: "off" }] },
    { name: "enable_huban", title: "虎斑搜索", type: "enumeration", value: "on", enumOptions: [{ title: "启用", value: "on" }, { title: "停用", value: "off" }] },
    { name: "enable_muou", title: "木偶搜索", type: "enumeration", value: "on", enumOptions: [{ title: "启用", value: "on" }, { title: "停用", value: "off" }] },
  ],
  modules: [
    {
      id: "loadResource",
      title: "聚合百度[盘]",
      description: "按当前影片详情并发搜索各源并返回百度网盘播放源",
      functionName: "loadResource",
      type: "stream",
      cacheDuration: 3600,
      params: []
    }
  ],
  search: {
    title: "搜索聚合百度",
    functionName: "search",
    params: [
      { name: "keyword", title: "关键词", type: "input", value: "" },
      { name: "page", title: "页码", type: "page", value: "1" }
    ]
  }
};

var JUHE_MOD_huajuan = (function () {
  var WidgetMetadata;
WidgetMetadata = {
  id: "forward.huajuan",
  title: "花卷",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  description: "搜索花卷网盘影视资源，解析百度网盘分享并返回可播放源。",
  author: "夏恩",
  site: "https://www.hjzhencai.top",
  detailCacheDuration: 3600,
  globalParams: [
    { name: "host", title: "站点地址", type: "input", value: "https://www.hjzhencai.top" },
    { name: "pan_hosts", title: "备用站点（逗号分隔）", type: "input", value: "" },
    { name: "baidu_cookie", title: "百度 Cookie", type: "input", value: "" },
    { name: "baidu_max_files", title: "百度最多解析", type: "input", value: "2" },
    { name: "search_extra_after_hit", title: "命中后继续扫描", type: "input", value: "3" },
    {
      name: "load_speed_mode",
      title: "加载速度",
      type: "enumeration",
      value: "fast",
      enumOptions: [
        { title: "极速（找到一个就返回）", value: "fast" },
        { title: "普通（返回多个大小）", value: "full" }
      ]
    },
    {
      name: "quality_tag",
      title: "清晰度标签",
      type: "enumeration",
      value: "8k",
      enumOptions: [
        { title: "8K", value: "8k" },
        { title: "4K", value: "4k" },
        { title: "1080P", value: "1080p" },
        { title: "其他", value: "other" }
      ]
    }
  ],
  modules: [
    {
      id: "loadResource",
      title: "花卷[盘]",
      description: "按当前影片详情自动搜索花卷[盘]并返回百度网盘播放源",
      functionName: "loadResource",
      type: "stream",
      cacheDuration: 3600,
      params: []
    }
  ],
  search: {
    title: "搜索花卷[盘]",
    functionName: "search",
    params: [
      { name: "keyword", title: "关键词", type: "input", value: "" },
      { name: "page", title: "页码", type: "page", value: "1" }
    ]
  }
};

var HUAJUAN_RUNTIME_PARAMS = {};
var HUAJUAN_SEARCH_CACHE = {};
var HUAJUAN_DETAIL_CACHE = {};
var HUAJUAN_RESOURCE_CACHE = {};
var HUAJUAN_RESOLVE_SCHEME = "huajuanresolve://";
var HUAJUAN_PRIMARY_HOST = "https://www.hjzhencai.top";
var HUAJUAN_DEFAULT_PAN_HOSTS = [];
var HUAJUAN_BUILTIN_LOAD_SPEED_MODE = "fast";
var HUAJUAN_BUILTIN_BAIDU_MAX_FILES = 2;
var HUAJUAN_BUILTIN_SEARCH_EXTRA_AFTER_HIT = 3;
var HUAJUAN_BUILTIN_CANDIDATE_SCAN_LIMIT = 40;
var HUAJUAN_BUILTIN_QUALITY_TAG = "8k";
var HUAJUAN_CACHE_TTL_MS = 3600 * 1000;
var HUAJUAN_RESOURCE_SEARCH_TIMEOUT_MS = 6000;
var BAIDU_DIRECT_CONCURRENCY_FULL = 4;
var BAIDU_UID_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
var BAIDU_SHARE_CACHE = {};
var BAIDU_UID_CACHE = {};
var BAIDU_UID_PENDING_CACHE = {};
var BAIDU_VIDEO_LIST_CACHE = {};
var BAIDU_DIRECT_CACHE = {};
var BAIDU_UZ_DEVUID = "73CED981D0F186D12BC18CAE1684FFD5|VSRCQTF6W";

var HUAJUAN_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
};

function huajuanText(v) {
  return String(v == null ? "" : v).replace(/\s+/g, " ").trim();
}

function huajuanCacheGetWithTtl(cache, key, ttlMs) {
  var entry = cache && cache[key];
  if (!entry) return null;
  if (Date.now() - entry.time > ttlMs) {
    delete cache[key];
    return null;
  }
  return entry.value;
}

function huajuanCacheGet(cache, key) {
  return huajuanCacheGetWithTtl(cache, key, HUAJUAN_CACHE_TTL_MS);
}

function huajuanCacheSet(cache, key, value) {
  cache[key] = { time: Date.now(), value: value };
  return value;
}

function huajuanStorageGet(key, ttlMs) {
  try {
    if (typeof Widget === "undefined" || !Widget.storage || typeof Widget.storage.get !== "function") return null;
    var raw = Widget.storage.get(key);
    if (!raw) return null;
    var entry = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (!entry || typeof entry !== "object" || !entry.time) return null;
    if (Date.now() - Number(entry.time || 0) > ttlMs) return null;
    return entry.value == null ? null : entry.value;
  } catch (e) {
    return null;
  }
}

function huajuanStorageSet(key, value) {
  try {
    if (typeof Widget === "undefined" || !Widget.storage || typeof Widget.storage.set !== "function") return false;
    Widget.storage.set(key, JSON.stringify({ time: Date.now(), value: value }));
    return true;
  } catch (e) {
    return false;
  }
}

function huajuanHost(params) {
  return String((params && params.host) || HUAJUAN_RUNTIME_PARAMS.host || HUAJUAN_PRIMARY_HOST).replace(/\/+$/, "");
}

function huajuanOrigin(url) {
  try {
    return new URL(String(url || "")).origin;
  } catch (e) {
    return "";
  }
}

function huajuanSplitHosts(text) {
  var out = [];
  String(text || "").split(/[,，\s]+/).forEach(function (host) {
    host = huajuanText(host).replace(/\/+$/, "");
    if (!host) return;
    if (!/^https?:\/\//i.test(host)) host = "https://" + host;
    if (out.indexOf(host) < 0) out.push(host);
  });
  return out;
}

function huajuanPanHosts(params) {
  var out = [];
  function add(host) {
    host = String(host || "").replace(/\/+$/, "");
    if (host && out.indexOf(host) < 0) out.push(host);
  }
  add(huajuanHost(params));
  var configured = huajuanSplitHosts((params && params.pan_hosts) || HUAJUAN_RUNTIME_PARAMS.pan_hosts || "");
  if (!configured.length) configured = HUAJUAN_DEFAULT_PAN_HOSTS;
  for (var i = 0; i < configured.length; i++) add(configured[i]);
  return out;
}

function loadSpeedMode(params) {
  var value = huajuanText((params && params.load_speed_mode) || HUAJUAN_RUNTIME_PARAMS.load_speed_mode || HUAJUAN_BUILTIN_LOAD_SPEED_MODE).toLowerCase();
  return /^(full|complete|all|slow|off)$/i.test(value) ? "full" : "fast";
}

function fastLoadEnabled(params) {
  return loadSpeedMode(params) === "fast";
}

function fastResourceSearchEnabled(params) {
  return !!(params && params._huajuanResourceLoad);
}

function huajuanParamsForHost(params, host) {
  var next = Object.assign({}, params || {});
  next.host = String(host || "").replace(/\/+$/, "") || huajuanHost(params);
  return next;
}

function huajuanSyncParams(params) {
  params = params || {};
  for (var k in params) {
    if (Object.prototype.hasOwnProperty.call(params, k)) HUAJUAN_RUNTIME_PARAMS[k] = params[k];
  }
  ensureEnvShim();
}

function ensureEnvShim() {
  var g = typeof globalThis !== "undefined" ? globalThis : this;
  if (!g.ENV) {
    g.ENV = {
      get: function (key) {
        return HUAJUAN_RUNTIME_PARAMS[key] || "";
      }
    };
  }
}

function huajuanAbsUrl(url, params) {
  if (!url) return "";
  url = String(url);
  if (/^https?:\/\//i.test(url)) return url;
  if (url.indexOf("//") === 0) return "https:" + url;
  if (url.charAt(0) !== "/") url = "/" + url;
  return huajuanHost(params) + url;
}

function huajuanCleanTitle(title) {
  return huajuanText(title)
    .replace(/^立刻播放/, "")
    .replace(/^下载/, "")
    .replace(/\s*-\s*第\d+集$/, "")
    .replace(/第[一二三四五六七八九十0-9]+季/g, "")
    .replace(/\bS\d{1,2}\b/ig, "")
    .trim();
}

function huajuanNorm(text) {
  return huajuanCleanTitle(text).toLowerCase()
    .replace(/[\s·•・:：\-–—_!！?？.,，。、"'`~()（）\[\]【】]/g, "");
}

function huajuanYear(text) {
  var m = String(text || "").match(/\b(19|20)\d{2}\b/);
  return m ? m[0] : "";
}

function huajuanToInt(v, defVal) {
  var n = parseInt(String(v == null ? "" : v).trim(), 10);
  return Number.isFinite(n) ? n : (defVal || 0);
}

function huajuanBoundInt(v, defVal, minVal, maxVal) {
  var n = huajuanToInt(v, defVal);
  if (minVal != null && n < minVal) n = minVal;
  if (maxVal != null && n > maxVal) n = maxVal;
  return n;
}

function huajuanSleep(ms) {
  var g = typeof globalThis !== "undefined" ? globalThis : this;
  var timer = g && g.setTimeout;
  if (typeof timer === "function") {
    return new Promise(function (resolve) { timer.call(g, resolve, ms || 0); });
  }
  var end = Date.now() + Math.max(0, ms || 0);
  while (Date.now() < end) {}
  return Promise.resolve();
}

function huajuanHttpTimeout(params, defVal) {
  return huajuanBoundInt(params && params._huajuanHttpTimeoutMs, defVal || 20000, 2000, 30000);
}

function huajuanSizeText(bytes) {
  var n = Number(bytes || 0);
  if (!n || !Number.isFinite(n)) return "";
  var units = ["B", "KB", "MB", "GB", "TB", "PB"];
  var i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n = n / 1024;
    i++;
  }
  return (i ? n.toFixed(2) : String(Math.round(n))) + " " + units[i];
}

function huajuanCompactSizeText(text) {
  return huajuanText(text).replace(/\s+(B|KB|MB|GB|TB|PB)$/i, "$1");
}

function huajuanExtractEpisode(text) {
  var s = String(text || "");
  var m = s.match(/第\s*(\d{1,4})\s*[集话期]/);
  if (m) return huajuanValidEpisodeNumber(m[1]);
  m = s.match(/\bS\d{1,2}E(\d{1,4})\b/i);
  if (m) return huajuanValidEpisodeNumber(m[1]);
  m = s.match(/\bEP?\s*(\d{1,4})\b/i);
  if (m) return huajuanValidEpisodeNumber(m[1]);
  var base = s.split(/[\\/]/).pop().replace(/\.(?:mp4|mkv|avi|mov|m4v|ts|m2ts|flv|wmv|webm|rmvb)$/i, "");
  m = base.match(/(?:^|[\s._\-\[\(])0*(\d{1,4})(?=$|[\s._\-\]\)集话期])/);
  if (m) return huajuanValidEpisodeNumber(m[1]);
  m = base.match(/(?:^|[\s._\-\[\(])0*(\d{1,4})x$/i);
  if (m) return huajuanValidEpisodeNumber(m[1]);
  m = base.match(/^0*(\d{1,4})x$/i);
  if (m) return huajuanValidEpisodeNumber(m[1]);
  m = base.match(/[\u4e00-\u9fa5][^\d]{0,12}0*(\d{1,4})(?=$|[^\d])/);
  if (m) return huajuanValidEpisodeNumber(m[1]);
  return 0;
}

function huajuanValidEpisodeNumber(v) {
  var n = huajuanToInt(v, 0);
  if (!n) return 0;
  if (n >= 1900 && n <= 2099) return 0;
  return n;
}

var HUAJUAN_SEASON_CJK = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十",
  "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十"];

function huajuanWantedSeason(params) {
  params = params || {};
  var keys = ["season", "seasonNumber", "season_number", "seasonNo", "season_no",
    "currentSeason", "current_season", "seasonIndex", "season_index"];
  for (var i = 0; i < keys.length; i++) {
    var n = huajuanToInt(params[keys[i]], 0);
    if (n > 0) return n;
  }
  
  var baseTitle = params.seriesName || params.title || params.name || "";
  var textKeys = ["seasonName", "seasonTitle", "season_name", "season_title",
    "episodeName", "episodeTitle", "episode_name", "episode_title",
    "seriesName", "title", "name", "subtitle", "remark", "description"];
  for (var ti = 0; ti < textKeys.length; ti++) {
    var s = huajuanExtractSeason(params[textKeys[ti]], baseTitle);
    if (s > 0) return s;
  }
  return huajuanWantedSeasonNested(params, 0);
}

function huajuanWantedSeasonNested(value, depth) {
  if (!value || depth > 3) return 0;
  if (Array.isArray(value)) {
    for (var ai = 0; ai < value.length; ai++) {
      var arrS = huajuanWantedSeasonNested(value[ai], depth + 1);
      if (arrS) return arrS;
    }
    return 0;
  }
  if (typeof value !== "object") return 0;
  var numericKey = /(?:^|_)(?:season|seasonNumber|seasonNo|currentSeason)(?:$|_)/i;
  var textKey = /(?:season|episode|title|name|subtitle|remark|description)$/i;
  for (var k in value) {
    if (!Object.prototype.hasOwnProperty.call(value, k) || /cookie|token|header|auth|ut/i.test(k)) continue;
    var v = value[k];
    if (numericKey.test(k)) {
      var n = huajuanToInt(v, 0);
      if (n > 0) return n;
    }
    if (textKey.test(k) && typeof v !== "object") {
      var s = huajuanExtractSeason(v, "");
      if (s > 0) return s;
    }
  }
  var preferred = ["tmdbInfo", "mediaInfo", "item", "video", "currentItem", "episodeInfo", "selectedEpisode", "vod", "source", "context", "metadata"];
  for (var pi = 0; pi < preferred.length; pi++) {
    var childS = huajuanWantedSeasonNested(value[preferred[pi]], depth + 1);
    if (childS) return childS;
  }
  return 0;
}

function huajuanExtractSeason(text, baseTitle) {
  text = String(text || "");
  var m = text.match(/第\s*([一二三四五六七八九十\d]+)\s*季/);
  if (m) {
    var idx = HUAJUAN_SEASON_CJK.indexOf(m[1]);
    if (idx > 0) return idx;
    var n = parseInt(m[1], 10);
    if (n > 0) return n;
  }
  m = text.match(/(?:^|[^a-z0-9])s(\d{1,2})(?![0-9])/i);
  if (m) return parseInt(m[1], 10);
  m = text.match(/season\s*(\d{1,2})/i);
  if (m) return parseInt(m[1], 10);
  
  var romanSingle = { "Ⅰ": 1, "Ⅱ": 2, "Ⅲ": 3, "Ⅳ": 4, "Ⅴ": 5, "Ⅵ": 6, "Ⅶ": 7, "Ⅷ": 8, "Ⅸ": 9, "Ⅹ": 10,
    "ⅰ": 1, "ⅱ": 2, "ⅲ": 3, "ⅳ": 4, "ⅴ": 5, "ⅵ": 6, "ⅶ": 7, "ⅷ": 8, "ⅸ": 9, "ⅹ": 10 };
  for (var rc in romanSingle) {
    if (Object.prototype.hasOwnProperty.call(romanSingle, rc) && text.indexOf(rc) >= 0) return romanSingle[rc];
  }
  
  m = text.match(/(?:^|[^a-z0-9])(IX|IV|VIII|VII|VI|III|II)(?:[^a-z0-9]|$)/i);
  if (m) {
    var romanAscii = { "II": 2, "III": 3, "IV": 4, "VI": 6, "VII": 7, "VIII": 8, "IX": 9 };
    var rv = romanAscii[m[1].toUpperCase()];
    if (rv) return rv;
  }
  
  m = text.match(/(?:^|[^a-z0-9])part\s*(\d{1,2})(?![0-9])/i);
  if (m) return parseInt(m[1], 10);
  m = text.match(/第\s*([一二三四五六七八九十\d]+)\s*[部篇章]/);
  if (m) {
    var idxP = HUAJUAN_SEASON_CJK.indexOf(m[1]);
    if (idxP > 0) return idxP;
    var nP = parseInt(m[1], 10);
    if (nP > 0 && nP <= 30) return nP;
  }
  
  m = text.match(/(\d{1,2})(?:st|nd|rd|th)\s*season/i);
  if (m) return parseInt(m[1], 10);
  if (baseTitle) {
    var bt = huajuanNorm(baseTitle);
    var tt = huajuanNorm(text);
    if (bt && tt.length > bt.length && tt.indexOf(bt) === 0) {
      var rm = tt.slice(bt.length).match(/^([一二三四五六七八九十\d]+)/);
      if (rm) {
        var idx2 = HUAJUAN_SEASON_CJK.indexOf(rm[1]);
        if (idx2 > 0) return idx2;
        var n2 = parseInt(rm[1], 10);
        if (n2 > 0 && n2 <= 30) return n2;
      }
    }
  }
  return 0;
}

function huajuanWantedEpisode(params) {
  params = params || {};
  var keys = [
    "episode", "episodeNumber", "episode_number", "episodeNo", "episode_no",
    "episodeNum", "episode_num", "episodeIndex", "episode_index",
    "episodeSort", "episode_sort", "episodeOrder", "episode_order",
    "currentEpisode", "current_episode", "currentEp", "current_ep",
    "playEpisode", "play_episode", "playIndex", "play_index",
    "ep", "sort", "serial", "serialNumber", "serial_number"
  ];
  for (var i = 0; i < keys.length; i++) {
    var n = huajuanToInt(params[keys[i]], 0);
    if (n > 0) return n;
  }
  var textKeys = [
    "episodeName", "episodeTitle", "episode_name", "episode_title",
    "subtitle", "remark", "description", "name", "title",
    "link", "url", "videoUrl", "id"
  ];
  for (var ti = 0; ti < textKeys.length; ti++) {
    var ep = huajuanExtractEpisode(params[textKeys[ti]]);
    if (ep > 0) return ep;
  }
  return huajuanWantedEpisodeNested(params, 0);
}

function huajuanWantedEpisodeNested(value, depth) {
  if (!value || depth > 3) return 0;
  if (Array.isArray(value)) {
    for (var ai = 0; ai < value.length; ai++) {
      var arrEp = huajuanWantedEpisodeNested(value[ai], depth + 1);
      if (arrEp) return arrEp;
    }
    return 0;
  }
  if (typeof value !== "object") return 0;
  var numericKey = /(?:^|_)(?:episode|episodeNumber|episodeNo|episodeNum|episodeIndex|episodeSort|currentEpisode|playEpisode|ep|sort|serial|serialNumber)(?:$|_)/i;
  var textKey = /(?:episode|title|name|subtitle|remark|description|link|url|id)$/i;
  for (var k in value) {
    if (!Object.prototype.hasOwnProperty.call(value, k) || /cookie|token|header|auth|ut/i.test(k)) continue;
    var v = value[k];
    if (numericKey.test(k)) {
      var n = huajuanValidEpisodeNumber(v);
      if (n > 0) return n;
    }
    if (textKey.test(k) && typeof v !== "object") {
      var ep = huajuanExtractEpisode(v);
      if (ep > 0) return ep;
    }
  }
  var preferred = ["tmdbInfo", "mediaInfo", "item", "video", "currentItem", "episodeInfo", "selectedEpisode", "vod", "source", "context", "metadata"];
  for (var pi = 0; pi < preferred.length; pi++) {
    var child = value[preferred[pi]];
    var childEp = huajuanWantedEpisodeNested(child, depth + 1);
    if (childEp) return childEp;
  }
  return 0;
}

async function huajuanGetHtml(url, params) {
  var referer = huajuanOrigin(url) || huajuanHost(params);
  var resp = await Widget.http.get(url, {
    headers: Object.assign({}, HUAJUAN_HEADERS, { Referer: referer + "/" }),
    timeout: huajuanHttpTimeout(params, 20000)
  });
  return String(resp && resp.data || "");
}

function huajuanSearchUrl(keyword, page, params) {
  return huajuanHost(params) + "/index.php/vod/search/page/" + (page || 1) + "/wd/" + encodeURIComponent(keyword) + ".html";
}

function huajuanIsMaintenanceHtml(html) {
  var head = String(html || "").slice(0, 6000);
  return /<title>\s*站点维护中\s*<\/title>/i.test(head)
    || /SITE UNDER MAINTENANCE/i.test(head)
    || /<h1[^>]*>\s*站点维护中\s*<\/h1>/i.test(head);
}

function huajuanParseSearch(html, params) {
  if (huajuanIsMaintenanceHtml(html)) return [];
  var $ = Widget.html.load(html);
  var out = [];
  var seen = {};
  $(".module-search-item, .module-items .module-item").each(function (_, el) {
    var card = $(el);
    var linkNode = card.find("h3 a[href*='/index.php/vod/detail/'], .module-item-title[href*='/index.php/vod/detail/'], a[href*='/index.php/vod/detail/']").first();
    var href = huajuanAbsUrl(linkNode.attr("href") || "", params);
    if (!href || seen[href]) return;
    var img = card.find("img").first();
    var title = huajuanCleanTitle(card.find(".module-card-item-title").first().text() || linkNode.attr("title") || linkNode.text() || img.attr("alt") || "");
    if (!title) return;
    var poster = huajuanAbsUrl(img.attr("data-src") || img.attr("data-original") || img.attr("src") || "", params);
    var remark = huajuanText(card.find(".video-serial, .module-item-text").first().text());
    var desc = huajuanText(card.find(".video-info-item, .module-item-style.video-text").last().text());
    seen[href] = true;
    out.push({
      id: href,
      type: "url",
      mediaType: "movie",
      title: title,
      posterPath: poster,
      backdropPath: poster,
      description: [remark, desc].filter(Boolean).join("\n"),
      link: href
    });
  });
  if (!out.length) {
    var blockRe = /<div[^>]+class=["'][^"']*module-search-item[^"']*["'][\s\S]*?(?=<div[^>]+class=["'][^"']*module-search-item[^"']*["']|<\/div>\s*<\/div>\s*<\/main>|<footer|$)/ig;
    var blocks = String(html || "").match(blockRe) || [];
    for (var bi = 0; bi < blocks.length; bi++) {
      var block = blocks[bi];
      var hrefMatch = block.match(/href=["']([^"']*\/index\.php\/vod\/detail\/[^"']+)["'][^>]*(?:title=["']([^"']*)["'])?/i);
      if (!hrefMatch) continue;
      var href = huajuanAbsUrl(hrefMatch[1].replace(/&amp;/g, "&"), params);
      if (!href || seen[href]) continue;
      var titleMatch = block.match(/<h3[^>]*>\s*<a[^>]*title=["']([^"']+)["']/i)
        || block.match(/<a[^>]*class=["'][^"']*video-serial[^"']*["'][^>]*title=["']([^"']+)["']/i)
        || block.match(/<img[^>]*alt=["']([^"']+)["']/i);
      var imgMatch = block.match(/<img[^>]*(?:data-src|data-original|src)=["']([^"']+)["']/i);
      var descMatch = block.match(/<div[^>]+class=["'][^"']*video-info-item[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
      var title = huajuanCleanTitle(titleMatch && titleMatch[1] || hrefMatch[2] || "");
      if (!title) continue;
      seen[href] = true;
      out.push({
        id: href,
        type: "url",
        mediaType: "movie",
        title: title,
        posterPath: huajuanAbsUrl(imgMatch && imgMatch[1] || "", params),
        backdropPath: huajuanAbsUrl(imgMatch && imgMatch[1] || "", params),
        description: huajuanText(descMatch && descMatch[1] || "").replace(/<[^>]+>/g, ""),
        link: href
      });
    }
  }
  return out;
}

async function huajuanSearch(keyword, params) {
  keyword = huajuanText(keyword);
  if (!keyword) return [];
  var page = huajuanToInt(params && params.page, 1) || 1;
  var key = huajuanHost(params) + "::" + keyword + "::" + page;
  var cached = huajuanCacheGet(HUAJUAN_SEARCH_CACHE, key);
  if (cached) return cached;
  var promise = huajuanGetHtml(huajuanSearchUrl(keyword, page, params), params)
    .then(function (html) {
      var items = huajuanParseSearch(html, params);
      
      if (!items.length) delete HUAJUAN_SEARCH_CACHE[key];
      return items;
    })
    .catch(function (e) {
      delete HUAJUAN_SEARCH_CACHE[key];
      throw e;
    });
  return huajuanCacheSet(HUAJUAN_SEARCH_CACHE, key, promise);
}

function huajuanDedupeSearchItems(groups) {
  var out = [];
  var seen = {};
  for (var gi = 0; gi < groups.length; gi++) {
    var items = groups[gi] || [];
    for (var ii = 0; ii < items.length; ii++) {
      var item = items[ii] || {};
      var key = item.link || item.id || item.title;
      if (!key || seen[key]) continue;
      seen[key] = true;
      out.push(item);
    }
  }
  return out;
}

function huajuanSearchItemsLookUseful(items, params, keyword) {
  items = Array.isArray(items) ? items : [];
  if (!items.length) return false;
  var wantNorm = huajuanNorm((params && (params.seriesName || params.title || params.name)) || keyword || "");
  if (!wantNorm) return true;
  for (var i = 0; i < items.length; i++) {
    var itemNorm = huajuanNorm(items[i] && items[i].title || "");
    if (itemNorm && (itemNorm === wantNorm || itemNorm.indexOf(wantNorm) >= 0 || wantNorm.indexOf(itemNorm) >= 0)) return true;
  }
  return false;
}

async function huajuanSearchFastHosts(keyword, params, hosts) {
  hosts = Array.isArray(hosts) ? hosts : [];
  if (!hosts.length) return [];
  return new Promise(function (resolve) {
    var done = false;
    var pending = hosts.length;
    var groups = [];
    function finish(items) {
      if (done) return;
      done = true;
      resolve(items || []);
    }
    for (var hi = 0; hi < hosts.length; hi++) {
      (function (index, host) {
        huajuanSearch(keyword, huajuanParamsForHost(params, host)).then(function (items) {
          items = items || [];
          groups[index] = items;
          if (items.length && huajuanSearchItemsLookUseful(items, params, keyword) && !done) {
            console.log("[huajuan] fast search host hit", { host: huajuanOrigin(host) || host, count: items.length });
            finish(items);
          }
        }).catch(function (e) {
          groups[index] = [];
          if (!done) console.warn("[huajuan] pan host search failed:", host, e && e.message || e);
        }).then(function () {
          pending--;
          if (pending <= 0 && !done) finish(huajuanDedupeSearchItems(groups));
        });
      })(hi, hosts[hi]);
    }
  });
}

async function huajuanSearchAll(keyword, params) {
  var hosts = huajuanPanHosts(params);
  var out;
  if (fastResourceSearchEnabled(params)) {
    out = await huajuanSearchFastHosts(keyword, params, hosts);
  } else {
    var tasks = hosts.map(function (host) {
      return huajuanSearch(keyword, huajuanParamsForHost(params, host)).catch(function (e) {
        console.warn("[huajuan] pan host search failed:", host, e && e.message || e);
        return [];
      });
    });
    out = huajuanDedupeSearchItems(await Promise.all(tasks));
  }
  if (!out.length) {
    
    try {
      var suggestItems = await huajuanSuggestSearch(keyword, params);
      if (suggestItems.length) {
        console.log("[huajuan] suggest fallback hit", { keyword: keyword, count: suggestItems.length });
        out = suggestItems;
      }
    } catch (e) {
      console.warn("[huajuan] suggest fallback failed:", e && e.message || e);
    }
  }
  return out;
}

function huajuanSuggestItem(raw, params) {
  if (!raw) return null;
  var idText = String(raw.id == null ? "" : raw.id);
  var vodId = "";
  if (/^\d{1,12}$/.test(idText)) vodId = idText;
  else {
    var idMatch = idText.match(/\/vod\/detail\/id\/(\d{1,12})\.html/);
    if (idMatch) vodId = idMatch[1];
  }
  var title = huajuanCleanTitle(raw.name || "");
  if (!vodId || !title) return null;
  var link = huajuanHost(params) + "/index.php/vod/detail/id/" + vodId + ".html";
  var poster = huajuanAbsUrl(raw.pic || "", params);
  if (/\/load\.gif(\?|$)/i.test(poster)) poster = "";
  return {
    id: link,
    type: "url",
    mediaType: "movie",
    title: title,
    posterPath: poster,
    backdropPath: poster,
    description: huajuanText(raw.remark || ""),
    link: link
  };
}

async function huajuanSuggestSearch(keyword, params) {
  keyword = huajuanText(keyword);
  if (!keyword) return [];
  var url = huajuanHost(params) + "/index.php/ajax/suggest?mid=1&wd=" + encodeURIComponent(keyword) + "&limit=100";
  var resp = await Widget.http.get(url, {
    headers: Object.assign({}, HUAJUAN_HEADERS, { Referer: huajuanHost(params) + "/" }),
    timeout: huajuanHttpTimeout(params, 20000)
  });
  var data = resp && resp.data;
  if (typeof data === "string") {
    try { data = JSON.parse(data); } catch (e) { data = null; }
  }
  if (!data || data.code !== 1 || !Array.isArray(data.list)) return [];
  var out = [];
  for (var i = 0; i < data.list.length; i++) {
    var item = huajuanSuggestItem(data.list[i], params);
    if (item) out.push(item);
  }
  return out;
}

function huajuanScoreItem(item, params, keyword) {
  var wantTitle = params.seriesName || params.title || params.name || keyword || "";
  var wantNorm = huajuanNorm(wantTitle);
  var itemNorm = huajuanNorm(item.title);
  var score = 0;
  if (wantNorm && itemNorm === wantNorm) score += 100;
  if (wantNorm && (itemNorm.indexOf(wantNorm) >= 0 || wantNorm.indexOf(itemNorm) >= 0)) score += 40;
  var wantYear = String(params.premiereDate || params.releaseDate || params.year || "").slice(0, 4) || huajuanYear(wantTitle);
  if (wantYear && item.description && item.description.indexOf(wantYear) >= 0) score += 10;
  if (/解说|速看|合集|全集/.test(item.title)) score -= 50;
  
  var wantSeason = huajuanWantedSeason(params);
  if (wantSeason > 0) {
    var itemSeason = huajuanExtractSeason(item.title, wantTitle);
    if (itemSeason > 0) {
      
      if (itemSeason === wantSeason) score += 120;
      else score -= 60;
    }
  }
  return score;
}

function huajuanPickBest(items, params, keyword) {
  items = Array.isArray(items) ? items : [];
  if (!items.length) return null;
  return huajuanRankItems(items, params, keyword)[0] || null;
}

function huajuanRankItems(items, params, keyword) {
  items = Array.isArray(items) ? items : [];
  return items.map(function (item) {
    return { item: item, score: huajuanScoreItem(item, params || {}, keyword) };
  }).sort(function (a, b) { return b.score - a.score; }).map(function (ranked) {
    return ranked.item;
  });
}

function huajuanExtractDetail(html, link, params) {
  if (huajuanIsMaintenanceHtml(html)) {
    return {
      id: link,
      type: "url",
      mediaType: "movie",
      title: "花卷[盘]",
      posterPath: "",
      backdropPath: "",
      description: "",
      link: link,
      lines: []
    };
  }
  var $ = Widget.html.load(html);
  var title = huajuanCleanTitle($(".video-info h1, h1").first().text() || $("meta[property='og:title']").attr("content") || "");
  var poster = huajuanAbsUrl($(".lazyload, .lazyloaded, .module-item-pic img, img").first().attr("data-original")
    || $(".lazyload, .lazyloaded, .module-item-pic img, img").first().attr("data-src")
    || $(".lazyload, .lazyloaded, .module-item-pic img, img").first().attr("src")
    || $("meta[property='og:image']").attr("content") || "", params);
  var description = huajuanText($(".sqjj_a").first().text() || $(".zkjj_a").first().text() || $("meta[name='description']").attr("content") || "");
  var lines = [];
  var seen = {};

  $(".module-row-info").each(function (_, el) {
    var row = $(el);
    var lineTitle = huajuanText(row.find(".module-row-title h4").first().text());
    var cands = [
      huajuanText(row.find(".module-row-title p").first().text()),
      huajuanText(row.find("[data-clipboard-text]").first().attr("data-clipboard-text")),
      huajuanText(row.find("a.btn-down").first().attr("href"))
    ];
    var share = "";
    
    for (var ci = 0; ci < cands.length && !share; ci++) {
      if (/^https?:\/\//i.test(cands[ci])) share = cands[ci];
    }
    if (!share) {
      for (var cj = 0; cj < cands.length && !share; cj++) {
        var um = String(cands[cj]).match(/https?:\/\/[^\s"'<>]+/i);
        if (um) share = um[0];
      }
    }
    if (!share) share = cands[0] || cands[1] || cands[2] || "";
    if (!share) return;
    
    share = huajuanAttachSharePwd(share, row.text());
    if (!share || seen[share] || detectPanType(share) !== "百度") return;
    seen[share] = true;
    lines.push({ title: lineTitle || title || "花卷[盘]", shareUrl: share, panType: detectPanType(share) });
  });

  if (!lines.length) {
    $(".down-wrap a.down-card-url[href]").each(function (_, el) {
      var node = $(el);
      var share = huajuanText(node.attr("href") || "");
      if (!share) return;
      share = huajuanAttachSharePwd(share, node.closest(".down-wrap").text() || node.parent().text());
      if (!share || seen[share]) return;
      if (detectPanType(share) !== "百度") return;
      if (!/\/s\/[\w-]+/.test(share)) return;
      seen[share] = true;
      lines.push({ title: title || "花卷[盘]", shareUrl: share, panType: "百度" });
    });
  }

  if (!lines.length) {
    var linkRe = /(https?:\/\/pan\.baidu\.com\/[^\s"'<>]+)/ig;
    var m;
    while ((m = linkRe.exec(html))) {
      var shareUrl = m[1].replace(/&amp;/g, "&");
      
      var ctxStart = Math.max(0, m.index - 300);
      var ctxEnd = Math.min(html.length, m.index + m[0].length + 300);
      shareUrl = huajuanAttachSharePwd(shareUrl, String(html.slice(ctxStart, ctxEnd)).replace(/<[^>]+>/g, " "));
      if (seen[shareUrl]) continue;
      seen[shareUrl] = true;
      lines.push({ title: title || "花卷[盘]", shareUrl: shareUrl, panType: detectPanType(shareUrl) });
    }
  }

  return {
    id: link,
    type: "url",
    mediaType: "movie",
    title: title || "花卷[盘]",
    posterPath: poster,
    backdropPath: poster,
    description: description,
    link: link,
    lines: lines
  };
}

async function huajuanLoadDetailObject(link, params) {
  link = huajuanAbsUrl(link, params);
  var detailParams = huajuanParamsForHost(params, huajuanOrigin(link) || huajuanHost(params));
  var cached = huajuanCacheGet(HUAJUAN_DETAIL_CACHE, link);
  if (cached) return cached;
  var promise = huajuanGetHtml(link, detailParams).then(function (html) {
    return huajuanExtractDetail(html, link, detailParams);
  }).catch(function (e) {
    delete HUAJUAN_DETAIL_CACHE[link];
    throw e;
  });
  return huajuanCacheSet(HUAJUAN_DETAIL_CACHE, link, promise);
}

function detectPanType(url) {
  var u = String(url || "").toLowerCase();
  if (u.indexOf("pan.baidu.com") >= 0) return "百度";
  return "网盘";
}

function huajuanResolveLink(line, extra) {
  var data = Object.assign({}, extra || {}, {
    title: line && line.title || "",
    shareUrl: line && line.shareUrl || "",
    panType: line && line.panType || detectPanType(line && line.shareUrl || "")
  });
  return HUAJUAN_RESOLVE_SCHEME + encodeURIComponent(JSON.stringify(data));
}

function huajuanParseResolveLink(link) {
  link = String(link || "");
  if (link.indexOf(HUAJUAN_RESOLVE_SCHEME) !== 0) return null;
  var raw = link.slice(HUAJUAN_RESOLVE_SCHEME.length);
  if (raw.indexOf("data=") === 0) raw = raw.slice(5);
  try {
    var data = JSON.parse(decodeURIComponent(raw));
    if (!data || !data.shareUrl) return null;
    return {
      title: data.title || data.detailTitle || "花卷[盘]",
      shareUrl: data.shareUrl,
      panType: data.panType || detectPanType(data.shareUrl),
      detailTitle: data.detailTitle || "",
      keyword: data.keyword || ""
    };
  } catch (e) {
    console.warn("[huajuan] resolve link parse failed:", e && e.message || e);
    return null;
  }
}

function deferredSourceFromLine(line, context) {
  var title = "花卷[盘] " + (line.panType || detectPanType(line.shareUrl)) + " " + huajuanText(line.title || "");
  var link = huajuanResolveLink(line, context || {});
  return {
    id: link,
    type: "url",
    name: title,
    title: title,
    url: link,
    link: link,
    mediaType: "movie",
    description: [
      context && context.keyword ? "搜索词: " + context.keyword : "",
      context && context.detailTitle ? "命中: " + context.detailTitle : "",
      line.title || "",
      line.shareUrl || ""
    ].filter(Boolean).join("\n")
  };
}

var HUAJUAN_VIDEO_EXT_RE = /\.(mp4|mkv|webm|avi|wmv|flv|mov|mpeg|mpg|m4v|ts|m2ts|3gp|rm|rmvb)$/i;
var HUAJUAN_NON_VIDEO_EXT_RE = /\.(mp3|m4a|aac|flac|wav|ogg|opus|ape|wma|alac|cue|lrc|jpg|jpeg|png|gif|webp|bmp|txt|pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar|7z|tar|gz|ass|srt|ssa|vtt)$/i;

function isPlayableVideoName(name) {
  var s = String(name || "").trim();
  if (!s) return true;
  if (HUAJUAN_VIDEO_EXT_RE.test(s)) return true;
  if (HUAJUAN_NON_VIDEO_EXT_RE.test(s)) return false;
  return !/\.[A-Za-z0-9]{1,6}(?:$|[?#])/i.test(s);
}

function isPlayableVideoItem(item) {
  var name = helperItemName(item);
  if (!isPlayableVideoName(name)) return false;
  return item && (item.obj_category === "video" || item.category === "video" || item.category === 1 || item.mediaType === 3 || item.media_type === 3 || HUAJUAN_VIDEO_EXT_RE.test(name));
}

function huajuanEncodeQueryPart(part) {
  return String(part == null ? "" : part)
    .replace(/%(?![0-9A-Fa-f]{2})/g, "%25")
    .replace(/\+/g, "%2B")
    .replace(/ /g, "%20")
    .replace(/"/g, "%22")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E")
    .replace(/`/g, "%60");
}

function normalizePlaybackUrl(url) {
  var s = String(url || "").trim();
  if (!s) return "";
  var hash = "";
  var hashIndex = s.indexOf("#");
  if (hashIndex >= 0) {
    hash = s.slice(hashIndex);
    s = s.slice(0, hashIndex);
  }
  var qIndex = s.indexOf("?");
  if (qIndex < 0) return s.replace(/ /g, "%20") + hash;
  var base = s.slice(0, qIndex).replace(/ /g, "%20");
  var query = s.slice(qIndex + 1).split("&").map(function (part) {
    var eq = part.indexOf("=");
    if (eq < 0) return huajuanEncodeQueryPart(part);
    return huajuanEncodeQueryPart(part.slice(0, eq)) + "=" + huajuanEncodeQueryPart(part.slice(eq + 1));
  }).join("&");
  return base + "?" + query + hash;
}

function huajuanUrlHost(url) {
  try {
    return new URL(String(url || "")).host || "";
  } catch (e) {
    return "";
  }
}

function appendQueryParam(url, key, value) {
  var s = String(url || "").trim();
  value = huajuanText(value);
  if (!s || !key || !value) return s;
  var hash = "";
  var hashIndex = s.indexOf("#");
  if (hashIndex >= 0) {
    hash = s.slice(hashIndex);
    s = s.slice(0, hashIndex);
  }
  var re = new RegExp("([?&])" + key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=", "i");
  if (re.test(s)) return s + hash;
  return s + (s.indexOf("?") >= 0 ? "&" : "?") + encodeURIComponent(key) + "=" + encodeURIComponent(value) + hash;
}

function sourceDisplayName(name) {
  var s = huajuanText(name)
    .replace(/^花卷\[盘\]\s*/, "")
    .replace(/\s+\d+(?:\.\d+)?\s*(?:B|KB|MB|GB|TB|PB)$/i, "")
    .trim();
  var pan = sourcePanLabel(s);
  return pan || s;
}

function sourceSizeText(name, description, meta) {
  if (meta && Number(meta.size || 0) > 0) return huajuanSizeText(meta.size);
  var text = [description, name].filter(Boolean).join("\n");
  var m = text.match(/大小[:：]\s*([0-9.]+\s*(?:B|KB|MB|GB|TB|PB))/i);
  if (m) return huajuanText(m[1]);
  m = huajuanText(name).match(/\s([0-9.]+\s*(?:B|KB|MB|GB|TB|PB))$/i);
  return m ? huajuanText(m[1]) : "";
}

function sourcePanLabel(name) {
  var s = huajuanText(name);
  if (/百度/.test(s)) return "百度";
  return "网盘";
}

function sourceEpisodeNumber(name, description, meta) {
  var cfgParams = meta && meta.params || HUAJUAN_RUNTIME_PARAMS || {};
  if (huajuanText(cfgParams && cfgParams.type).toLowerCase() === "movie") return 0;
  var wantedEp = huajuanWantedEpisode(cfgParams);
  if (wantedEp > 0) return wantedEp;
  if (meta && Number(meta.episode || 0) > 0) return Number(meta.episode || 0);
  var text = [
    meta && meta.name || "",
    meta && meta.group || "",
    description || "",
    name || ""
  ].filter(Boolean).join(" ");
  text = text
    .replace(/https?:\/\/\S+/ig, " ")
    .replace(/大小[:：]\s*[0-9.]+\s*(?:B|KB|MB|GB|TB|PB)/ig, " ")
    .replace(/\b[0-9.]+\s*(?:B|KB|MB|GB|TB|PB)\b/ig, " ")
    .replace(/\.(?:mp4|mkv|avi|mov|m4v|ts|m2ts|flv|wmv|webm|rmvb)\b/ig, " ")
    .replace(/\bH\.?26[45]\b/ig, " ");
  return huajuanExtractEpisode(text);
}

function sourceEpisodeText(name, description, meta) {
  var ep = sourceEpisodeNumber(name, description, meta);
  return ep > 0 ? "第" + ep + "集" : "";
}

function sourceQualityConfig(params) {
  params = params || HUAJUAN_RUNTIME_PARAMS || {};
  var value = huajuanText(params.quality_tag || params.qualityTag || params.display_quality || params.source_quality || HUAJUAN_BUILTIN_QUALITY_TAG).toLowerCase();
  if (value === "4k") {
    return { value: "4k", label: "4K", tag: "4k", resolutionId: "4k", resolution: "3840x2160", width: 3840, height: 2160 };
  }
  if (value === "1080p" || value === "1080" || value === "fhd") {
    return { value: "1080p", label: "1080P", tag: "1080p", resolutionId: "1080p", resolution: "1920x1080", width: 1920, height: 1080 };
  }
  if (value === "other" || value === "others" || value === "其他" || value === "其它") {
    return { value: "other", label: "其他", tag: "", resolutionId: "other", resolution: "", width: 0, height: 0 };
  }
  return { value: "8k", label: "8K", tag: "8k", resolutionId: "8k", resolution: "7680x4320", width: 7680, height: 4320 };
}

function sourceActualQualityConfig(name, description, meta) {
  var text = [
    meta && (meta.fileName || meta.filename || meta.file_name || meta.server_filename || meta.name) || "",
    name || "",
    description || ""
  ].filter(Boolean).join(" ").toLowerCase();
  if (/4320p|\b8k\b|7680\s*[x×]\s*4320/.test(text)) {
    return { value: "8k", label: "8K", tag: "8k", resolutionId: "8k", resolution: "7680x4320", width: 7680, height: 4320 };
  }
  if (/2160p|\b4k\b|\buhd\b|3840\s*[x×]\s*2160/.test(text)) {
    return { value: "4k", label: "4K", tag: "4k", resolutionId: "4k", resolution: "3840x2160", width: 3840, height: 2160 };
  }
  if (/1080p|\bfhd\b|1920\s*[x×]\s*1080/.test(text)) {
    return { value: "1080p", label: "1080P", tag: "1080p", resolutionId: "1080p", resolution: "1920x1080", width: 1920, height: 1080 };
  }
  if (/720p|1280\s*[x×]\s*720/.test(text)) {
    return { value: "720p", label: "720P", tag: "720p", resolutionId: "720p", resolution: "1280x720", width: 1280, height: 720 };
  }
  if (/480p|854\s*[x×]\s*480/.test(text)) {
    return { value: "480p", label: "480P", tag: "480p", resolutionId: "480p", resolution: "854x480", width: 854, height: 480 };
  }
  return { value: "", label: "", tag: "", resolutionId: "", resolution: "", width: 0, height: 0 };
}

function sourceQualityText(name, description, meta) {
  return sourceQualityConfig(meta && meta.params || HUAJUAN_RUNTIME_PARAMS).label;
}

function sourceDurationSecondsFromValue(value, key) {
  if (value == null || value === "") return 0;
  key = String(key || "").toLowerCase();
  if (typeof value === "number" && Number.isFinite(value)) {
    if (/minute|min|runtime/.test(key)) return value > 0 ? Math.round(value * 60) : 0;
    if (/second|sec/.test(key)) return value > 0 ? Math.round(value) : 0;
    return value > 600 ? Math.round(value) : 0;
  }
  var text = huajuanText(value);
  if (!text) return 0;
  var m = text.match(/^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/);
  if (m) {
    var h = m[3] ? huajuanToInt(m[1], 0) : 0;
    var min = m[3] ? huajuanToInt(m[2], 0) : huajuanToInt(m[1], 0);
    var sec = huajuanToInt(m[3] || m[2], 0);
    return h * 3600 + min * 60 + sec;
  }
  m = text.match(/(\d+(?:\.\d+)?)\s*(?:小时|hour|hr|h)\s*(?:(\d+(?:\.\d+)?)\s*(?:分钟|minute|min|m))?/i);
  if (m) return Math.round(Number(m[1]) * 3600 + Number(m[2] || 0) * 60);
  m = text.match(/(\d+(?:\.\d+)?)\s*(?:分钟|minute|min|m)/i);
  if (m) return Math.round(Number(m[1]) * 60);
  m = text.match(/(\d+(?:\.\d+)?)\s*(?:秒|second|sec|s)/i);
  if (m) return Math.round(Number(m[1]));
  return 0;
}

function sourceDurationSeconds(params) {
  params = params || {};
  var keys = ["durationSeconds", "duration_seconds", "runtimeSeconds", "runtime_seconds", "duration", "durationText", "duration_text", "runtime", "runtimeMinutes", "runtime_minutes"];
  for (var i = 0; i < keys.length; i++) {
    var seconds = sourceDurationSecondsFromValue(params[keys[i]], keys[i]);
    if (seconds > 60) return seconds;
  }
  var parents = ["tmdbInfo", "mediaInfo", "item", "video", "currentItem", "episodeInfo", "selectedEpisode", "metadata"];
  for (var pi = 0; pi < parents.length; pi++) {
    var child = params[parents[pi]];
    if (!child || typeof child !== "object") continue;
    for (var ki = 0; ki < keys.length; ki++) {
      var childSeconds = sourceDurationSecondsFromValue(child[keys[ki]], keys[ki]);
      if (childSeconds > 60) return childSeconds;
    }
  }
  return 0;
}

function sourceBitrateBitsPerSecond(size, params) {
  size = Number(size || 0);
  var seconds = sourceDurationSeconds(params);
  if (!size || !seconds) return 0;
  return Math.round(size * 8 / seconds);
}

function estimatedSourceDurationSeconds(params) {
  var seconds = sourceDurationSeconds(params);
  if (seconds > 60) return seconds;
  var type = huajuanText(params && (params.type || params.mediaType || params.contentType)).toLowerCase();
  if (type === "movie") return 120 * 60;
  return 45 * 60;
}

function sourceBitrateForMediaInfo(size, params) {
  size = Number(size || 0);
  if (!size) return 0;
  var seconds = sourceDurationSeconds(params || {});
  return seconds > 0 ? Math.round(size * 8 / seconds) : 0;
}

function sourceRealSize(meta, item) {
  meta = meta || {};
  item = item || {};
  return Number(
    meta.realSize || meta.actualSize || meta.actualFileSize || meta.fileRealSize || meta.size ||
    item.realSize || item.RealSize || item.actualSize || item.ActualSize ||
    item.actualFileSize || item.fileRealSize || item.fileRealSizeBytes ||
    item.sourceSize || item.originalSize || item.size
  ) || 0;
}

function sourceDataSize(meta, item) {
  return sourceRealSize(meta, item);
}

function sourceDataSizeText(size) {
  size = Number(size || 0);
  if (!size) return "";
  return huajuanSizeText(size);
}

function sourceRuntimeTicks(params) {
  var seconds = sourceDurationSeconds(params || {});
  return seconds > 60 ? Math.round(seconds * 10000000) : 0;
}

function sourceFrameRate(params) {
  var keys = ["frameRate", "framerate", "fps", "videoFrameRate"];
  for (var i = 0; i < keys.length; i++) {
    var n = Number(params && params[keys[i]] || 0);
    if (n > 0) return n;
  }
  return 0;
}

function sourceContainerName(name, url) {
  var text = [name, url].filter(Boolean).join(" ");
  var m = text.match(/\.([a-z0-9]{2,5})(?:$|[?#\s])/i);
  return (m && m[1] || "").toLowerCase();
}

function playbackFileName(name, meta) {
  meta = meta || {};
  var raw = huajuanText(meta.name || meta.fileName || meta.filename || meta.file_name || name || "baidu-video.mkv");
  raw = raw.split(/[\\/]/).pop();
  raw = raw.replace(/^花卷\[盘\]\s*百度\s*/i, "").replace(/\s+\d+(?:\.\d+)?\s*(?:KB|MB|GB|TB)$/i, "");
  raw = raw.replace(/[\u0000-\u001f]+/g, " ").trim();
  if (!raw) raw = "baidu-video.mkv";
  if (!/\.(?:mp4|mkv|avi|mov|m4v|ts|m2ts|flv|wmv|webm|rmvb)$/i.test(raw)) raw += ".mkv";
  return raw;
}

function sourceCodecName(name) {
  var text = huajuanText(name).toLowerCase();
  if (/av1/.test(text)) return "av1";
  if (/h\.?265|hevc|x265/.test(text)) return "hevc";
  if (/h\.?264|avc|x264/.test(text)) return "h264";
  return "";
}

function sourceCodecDisplayName(codec) {
  codec = huajuanText(codec).toLowerCase();
  if (codec === "h264") return "H.264";
  if (codec === "hevc") return "HEVC";
  if (codec === "av1") return "AV1";
  return "";
}

function videoResourceTags(name) {
  var codec = sourceCodecName(name);
  return {
    codec: sourceCodecDisplayName(codec),
    dynamicRange: /dolby\s*vision|dovi|\bdv\b/i.test(name || "") ? "DV" : (/hdr/i.test(name || "") ? "HDR" : ""),
    bitDepth: /10bit|10-bit|main\s*10|hdr|dolby\s*vision|\bdv\b/i.test(name || "") ? 10 : 8,
    source: /blu-?ray|remux|bdremux/i.test(name || "") ? "BluRay" : "WEB-DL",
    immersive: /3d|vr|180|360/i.test(name || "")
  };
}

function audioResourceTags(name) {
  var text = huajuanText(name).toLowerCase();
  var codec = /truehd/.test(text) ? "TrueHD" : (/dts/.test(text) ? "DTS" : (/eac3|ddp|dd\+/.test(text) ? "EAC3" : (/aac/.test(text) ? "AAC" : (/ac3|dd5/.test(text) ? "AC3" : ""))));
  var channels = /7[._ ]?1/.test(text) ? 8 : (/5[._ ]?1/.test(text) ? 6 : (/2[._ ]?0|stereo/.test(text) ? 2 : 0));
  return {
    codec: codec,
    channels: channels,
    source: /blu-?ray|remux|bdremux/i.test(name || "") ? "BluRay" : "WEB-DL"
  };
}

function mediaTagLine(name, meta) {
  var text = huajuanText(name).toLowerCase();
  var video = videoResourceTags(name);
  var audio = audioResourceTags(name);
  var quality = sourceActualQualityConfig(name, "", meta);
  var range = /dolby\s*vision|dovi|\bdv\b/i.test(name || "") ? "DV" : video.dynamicRange;
  var channelText = audio.channels >= 8 ? "7.1" : (audio.channels >= 6 ? "5.1" : (audio.channels >= 2 ? "2.0" : ""));
  var tags = [quality.tag, range, video.codec, audio.codec];
  if (/atmos/.test(text)) tags.push("atmos");
  tags.push(channelText);
  return tags.filter(Boolean).join("|");
}

function withMediaTagsFirst(source, lines) {
  source = source || {};
  var tagLine = mediaTagLine(source.fileName || source.filename || source.file_name || source.server_filename || source.name || "");
  var body = String(source.description || "");
  if (body.indexOf(tagLine) === 0) body = body.slice(tagLine.length).replace(/^\n+/, "");
  return [tagLine].concat(lines || [], [body]).filter(Boolean).join("\n");
}

function buildSyntheticMediaStreams(item, name, meta, params) {
  meta = meta || {};
  params = params || {};
  var quality = sourceActualQualityConfig(name, "", meta);
  var realSize = sourceRealSize(meta, item);
  var dataSize = sourceDataSize(meta, item, params);
  var bitrate = sourceBitrateForMediaInfo(dataSize, params);
  var fps = sourceFrameRate(params);
  var codec = sourceCodecName(name);
  var video = videoResourceTags(name);
  var audio = audioResourceTags(name);
  var videoTitle = [quality.label, video.codec].filter(Boolean).join(" ") || "Video";
  var streams = [{
    Index: 0,
    index: 0,
    Type: "Video",
    type: "Video",
    Codec: codec || undefined,
    codec: codec || undefined,
    DisplayTitle: videoTitle,
    displayTitle: videoTitle,
    Title: videoTitle,
    title: videoTitle,
    Width: quality.width || undefined,
    width: quality.width || undefined,
    Height: quality.height || undefined,
    height: quality.height || undefined,
    Size: dataSize,
    size: dataSize,
    RealSize: realSize,
    realSize: realSize,
    BitRate: bitrate,
    Bitrate: bitrate,
    bitrate: bitrate,
    AverageFrameRate: fps,
    averageFrameRate: fps,
    RealFrameRate: fps,
    realFrameRate: fps,
    IsInterlaced: false,
    isInterlaced: false,
    Profile: codec ? (codec === "hevc" ? "Main 10" : "High") : undefined,
    profile: codec ? (codec === "hevc" ? "Main 10" : "High") : undefined,
    PixelFormat: codec ? (codec === "hevc" ? "yuv420p10le" : "yuv420p") : undefined,
    pixelFormat: codec ? (codec === "hevc" ? "yuv420p10le" : "yuv420p") : undefined,
    VideoRange: video.dynamicRange || undefined,
    videoRange: video.dynamicRange || undefined,
    VideoRangeType: video.dynamicRange || undefined,
    videoRangeType: video.dynamicRange || undefined,
    ColorSpace: undefined,
    colorSpace: undefined,
    ColorTransfer: undefined,
    colorTransfer: undefined,
    ColorPrimaries: undefined,
    colorPrimaries: undefined
  }];
  if (audio.codec || audio.channels) {
    var audioTitle = [audio.codec, audio.channels >= 8 ? "7.1" : (audio.channels >= 6 ? "5.1" : (audio.channels >= 2 ? "2.0" : ""))].filter(Boolean).join(" ") || "Audio";
    streams.push({
      Index: 1,
      index: 1,
      Type: "Audio",
      type: "Audio",
      Codec: audio.codec ? audio.codec.toLowerCase() : undefined,
      codec: audio.codec ? audio.codec.toLowerCase() : undefined,
      DisplayTitle: audioTitle,
      displayTitle: audioTitle,
      Title: audioTitle,
      title: audioTitle,
      Language: "und",
      language: "und",
      Channels: audio.channels || undefined,
      channels: audio.channels || undefined,
      ChannelLayout: audio.channels >= 8 ? "7.1" : (audio.channels >= 6 ? "5.1" : (audio.channels >= 2 ? "stereo" : undefined)),
      channelLayout: audio.channels >= 8 ? "7.1" : (audio.channels >= 6 ? "5.1" : (audio.channels >= 2 ? "stereo" : undefined)),
      SampleRate: undefined,
      sampleRate: undefined,
      IsDefault: true,
      isDefault: true
    });
  }
  return streams;
}

function applyMediaSourceFields(item, name, meta) {
  if (!item) return item;
  meta = meta || {};
  var params = meta.params || HUAJUAN_RUNTIME_PARAMS || {};
  var realSize = sourceRealSize(meta, item);
  var size = sourceDataSize(meta, item);
  var bitrate = sourceBitrateForMediaInfo(size, params);
  var runtimeTicks = sourceRuntimeTicks(params);
  var container = sourceContainerName(name, item.url || item.videoUrl || "");
  var quality = sourceActualQualityConfig(name, "", meta);
  var video = videoResourceTags(name);
  var streams = buildSyntheticMediaStreams(item, name, meta, params);
  var mediaSourceId = item.id || ["baidu", size || "", item.url || ""].join("|");
  var dataSizeText = sourceDataSizeText(size);
  var fileName = playbackFileName(name, meta);
  var mediaSource = {
    Id: mediaSourceId,
    id: mediaSourceId,
    Name: item.displayName || sourceDisplayName(name) || "百度网盘",
    name: item.displayName || sourceDisplayName(name) || "百度网盘",
    FileName: fileName,
    fileName: fileName,
    filename: fileName,
    ServerFileName: fileName,
    server_filename: fileName,
    Path: item.url || item.videoUrl || "",
    path: item.url || item.videoUrl || "",
    Protocol: "Http",
    protocol: "Http",
    Type: "Default",
    type: "Default",
    Container: container,
    container: container,
    Size: size,
    size: size,
    FileSize: size,
    fileSize: size,
    file_size: size,
    VideoFileSize: size,
    videoFileSize: size,
    ResolutionVideoFileSize: size,
    resolutionVideoFileSize: size,
    MaxFileSize: size,
    maxFileSize: size,
    RealSize: realSize,
    realSize: realSize,
    ActualSize: realSize,
    actualSize: realSize,
    ActualFileSize: realSize,
    actualFileSize: realSize,
    FileRealSize: realSize,
    fileRealSize: realSize,
    SourceSize: realSize,
    sourceSize: realSize,
    Bitrate: bitrate,
    BitRate: bitrate,
    bitrate: bitrate,
    RunTimeTicks: runtimeTicks,
    runTimeTicks: runtimeTicks,
    SupportsDirectPlay: true,
    supportsDirectPlay: true,
    SupportsDirectStream: true,
    supportsDirectStream: true,
    SupportsTranscoding: false,
    supportsTranscoding: false,
    IsRemote: true,
    isRemote: true,
    MediaStreams: streams,
    mediaStreams: streams
  };
  item.dataSize = size;
  item.realSize = realSize;
  item.RealSize = realSize;
  item.actualSize = realSize;
  item.ActualSize = realSize;
  item.actualFileSize = realSize;
  item.fileRealSize = realSize;
  item.sourceSize = realSize;
  item.originalSize = realSize;
  item.size = size;
  item.fileSize = size;
  item.file_size = size;
  item.mediaSourceId = mediaSourceId;
  item.MediaSourceId = mediaSourceId;
  item.mediaSource = mediaSource;
  item.MediaSource = mediaSource;
  item.mediaSources = [mediaSource];
  item.MediaSources = [mediaSource];
  item.mediaStreams = streams;
  item.MediaStreams = streams;
  item.fileName = fileName;
  item.FileName = fileName;
  item.filename = fileName;
  item.file_name = fileName;
  item.server_filename = fileName;
  item.originalFileName = fileName;
  item.serverFileName = fileName;
  item.RunTimeTicks = runtimeTicks;
  item.runTimeTicks = runtimeTicks;
  item.Bitrate = bitrate;
  item.BitRate = bitrate;
  item.bitrate = bitrate;
  item.bitRate = bitrate;
  item.videoBitRate = bitrate;
  item.videoBitrate = bitrate;
  item.videoBitRateText = bitrate > 0 ? (bitrate / 1000000).toFixed(2) + "Mbps" : "";
  item.videoFileSize = size;
  item.VideoFileSize = size;
  item.videoFileSizeText = dataSizeText;
  item.resolutionVideoFileSize = size;
  item.maxFileSize = size;
  item.videoPixelSize = quality.resolution || "";
  item.videoTitle = [quality.label, video.codec].filter(Boolean).join(" ");
  item.videoRange = video.dynamicRange || "";
  item.VideoRange = video.dynamicRange || "";
  if (video.dynamicRange) item.videoRangeScore = 999999;
  item.resolutionId = quality.resolutionId;
  item.providerId = "baidu";
  item.sourceId = "baidu";
  item.sourceType = "stream";
  return item;
}

function fastPlayConfigForName(name, params) {
  return null;
}

function applyFastPlayFields(item, name, meta) {
  var cfg = fastPlayConfigForName(name, meta && meta.params || HUAJUAN_RUNTIME_PARAMS || {});
  if (!cfg) return item;
  item.fastPlayMode = true;
  item.fastplay = true;
  item.speedup = true;
  item.speedupEnabled = true;
  item.multiThread = true;
  item.multiThreadMode = true;
  item.isMulti = true;
  item.isVideo = true;
  item.threads = cfg.threads;
  item.thread = cfg.threads;
  item.threadCount = cfg.threads;
  item.threadNum = cfg.threads;
  item.downloadThreads = cfg.threads;
  item.downloadThreadCount = cfg.threads;
  item.maxThreadCount = cfg.threads;
  item.poolSize = cfg.threads;
  item.chunkSize = cfg.chunkSize;
  item.chunk_size = cfg.chunkSize;
  item.chunk = cfg.chunkSize;
  item.segmentSize = cfg.chunkSize;
  item.downloadChunkSize = cfg.chunkSize;
  item.rangeSize = cfg.chunkSize;
  return item;
}

function decorateSourceItem(item, name, description, meta) {
  meta = meta || {};
  var cfgParams = meta.params || HUAJUAN_RUNTIME_PARAMS || {};
  var realSize = sourceRealSize(meta, item);
  var dataSize = sourceDataSize(meta, item);
  var displayName = sourceDisplayName(name) || huajuanText(name) || sourcePanLabel(name);
  var fileName = playbackFileName(name, meta);
  var sizeText = sourceSizeText(name, description, meta);
  var dataSizeText = sourceDataSizeText(dataSize);
  var displaySizeText = dataSizeText || sizeText;
  var panLabel = sourcePanLabel(displayName || name);
  var episodeText = sourceEpisodeText(name, description, meta);
  var displayQuality = sourceQualityConfig(cfgParams);
  var actualQuality = sourceActualQualityConfig(fileName || name, description, meta);
  var qualityText = sourceQualityText(name, description, meta);
  var cardName = [qualityText || displayQuality.label, episodeText, displaySizeText ? huajuanCompactSizeText(displaySizeText) : ""].filter(Boolean).join(" ");
  item.name = cardName;
  item.title = cardName;
  item.displayName = displayName;
  item.video = videoResourceTags(fileName || name);
  item.audio = audioResourceTags(fileName || name);
  item.fileName = fileName;
  item.FileName = fileName;
  item.filename = fileName;
  item.file_name = fileName;
  item.server_filename = fileName;
  item.originalFileName = fileName;
  item.serverFileName = fileName;
  item.quality = "BD";
  item.qualityName = actualQuality.label;
  item.qualityLabel = actualQuality.label;
  item.qualityTitle = actualQuality.label;
  item.label = actualQuality.label;
  item.format = actualQuality.label;
  item.resolution = actualQuality.resolution;
  item.resolutionText = actualQuality.label;
  item.renderSize = actualQuality.resolution;
  item.renderSizeText = actualQuality.label;
  item.width = actualQuality.width || undefined;
  item.height = actualQuality.height || undefined;
  item.panType = panLabel;
  item.source = panLabel;
  item.sourceName = panLabel;
  item.group = panLabel;
  item.groupName = panLabel;
  item.subTitle = displaySizeText;
  item.subtitle = displaySizeText;
  item.remark = displaySizeText;
  item.sizeText = displaySizeText;
  item.fileSizeText = displaySizeText;
  item.realSizeText = sizeText;
  item.actualFileSizeText = sizeText;
  item.episodeText = episodeText;
  item.episode = sourceEpisodeNumber(name, description, meta);
  if (realSize > 0) {
    item.realSize = realSize;
    item.RealSize = realSize;
    item.actualSize = realSize;
    item.ActualSize = realSize;
    item.actualFileSize = realSize;
    item.fileRealSize = realSize;
    item.sourceSize = realSize;
    item.originalSize = realSize;
  }
  if (dataSize > 0) {
    item.dataSize = dataSize;
    item.size = dataSize;
    item.fileSize = dataSize;
    item.file_size = dataSize;
    item.videoFileSize = dataSize;
    item.resolutionVideoFileSize = dataSize;
    item.maxFileSize = dataSize;
    item.isFirstFileSize = true;
    var bitrate = sourceBitrateBitsPerSecond(dataSize, cfgParams);
    if (!bitrate) bitrate = sourceBitrateForMediaInfo(dataSize, cfgParams);
    if (bitrate > 0) {
      item.bitrate = bitrate;
      item.bitRate = bitrate;
      item.videoRate = bitrate;
      item.videoBitRate = bitrate;
      item.videoBitrate = bitrate;
      item.bitrateLabel = (bitrate / 1000000).toFixed(2) + "Mbps";
    }
  }
  var descText = description || "";
  item.description = [
    mediaTagLine(fileName || name, meta),
    actualQuality.label ? "清晰度: " + actualQuality.label : "",
    actualQuality.resolution ? "分辨率: " + actualQuality.resolution : "",
    displaySizeText ? "大小: " + displaySizeText : "",
    descText
  ].filter(Boolean).join("\n");
  item.link = item.link || item.url || item.videoUrl || "";
  item.isBest = true;
  item._isBest = true;
  item.isResolutionChecked = true;
  applyFastPlayFields(item, name, meta);
  item.id = [sourcePanLabel(displayName), displayName, sizeText, item.url || ""].filter(Boolean).join("|");
  applyMediaSourceFields(item, name, meta);
  return item;
}

function playbackPlayerTypeForName(name, headers) {
  return "system";
}

function attachPlaybackHeaders(item, headers) {
  if (!headers) return item;
  item.header = headers;
  item.headers = headers;
  item.customHeaders = headers;
  item.httpHeaders = headers;
  item.playHeaders = headers;
  if (headers.Cookie) {
    item.cookie = headers.Cookie;
    item.cookies = headers.Cookie;
  }
  return item;
}

function sourceFromUrl(name, url, description, headers, meta) {
  var safeUrl = normalizePlaybackUrl(url);
  var item = {
    type: "url",
    mediaType: "movie",
    name: name,
    title: name,
    description: description || "",
    url: safeUrl,
    link: safeUrl,
    videoUrl: safeUrl,
    playerType: playbackPlayerTypeForName(name, headers)
  };
  attachPlaybackHeaders(item, headers);
  return decorateSourceItem(item, name, description, meta);
}

function sourceFromRawUrl(name, url, description, headers, meta) {
  var safeUrl = String(url || "").trim().replace(/ /g, "%20");
  var item = {
    type: "url",
    mediaType: "movie",
    name: name,
    title: name,
    description: description || "",
    url: safeUrl,
    link: safeUrl,
    videoUrl: safeUrl,
    playerType: playbackPlayerTypeForName(name, headers)
  };
  attachPlaybackHeaders(item, headers);
  return decorateSourceItem(item, name, description, meta);
}

function baiduPreparePlaybackUrl(url) {
  var s = String(url || "").trim();
  var qIndex = s.indexOf("?");
  if (qIndex < 0) return s;
  var hash = "";
  var hashIndex = s.indexOf("#", qIndex + 1);
  if (hashIndex >= 0) {
    hash = s.slice(hashIndex);
    s = s.slice(0, hashIndex);
  }
  var base = s.slice(0, qIndex);
  var query = s.slice(qIndex + 1).split("&").map(function (part) {
    var eq = part.indexOf("=");
    if (eq < 0) return part;
    var key = part.slice(0, eq);
    var value = part.slice(eq + 1);
    if (key === "sign") {
      try { value = decodeURIComponent(value); } catch (e) {}
    }
    return key + "=" + value;
  }).join("&");
  return base + "?" + query + hash;
}

function panFastPlayValue(params, key, defVal) {
  return Math.max(1, huajuanToInt(params && params[key], defVal));
}

function playbackFlagsForName(name, params, meta) {
  meta = meta || {};
  var fileName = playbackFileName(name, meta);
  var dataSize = sourceDataSize(meta, null);
  var bitRate = sourceBitrateForMediaInfo(dataSize, params || HUAJUAN_RUNTIME_PARAMS);
  var quality = sourceActualQualityConfig(fileName || name, "", meta);
  var parts = [
    "isVideo=true",
    "filename=" + encodeURIComponent(fileName),
    "fileName=" + encodeURIComponent(fileName),
    "server_filename=" + encodeURIComponent(fileName)
  ];
  if (quality.resolutionId) parts.push("resolutionId=" + encodeURIComponent(quality.resolutionId));
  if (dataSize > 0) {
    parts.push("videoFileSize=" + encodeURIComponent(String(Math.round(dataSize))));
    parts.push("size=" + encodeURIComponent(String(Math.round(dataSize))));
  }
  if (bitRate > 0) {
    parts.push("videoBitRate=" + encodeURIComponent(String(Math.round(bitRate))));
    parts.push("bitrate=" + encodeURIComponent(String(Math.round(bitRate))));
  }
  return "#" + parts.join("&") + "#";
}

function appendPlaybackFlags(url, name, params, meta) {
  var s = String(url || "");
  if (!s) return "";
  return s + (s.indexOf("#") >= 0 ? "" : playbackFlagsForName(name, params, meta));
}

async function probePlaybackUrl(url, headers) {
  try {
    var probeHeaders = Object.assign({}, headers || {}, { "Range": "bytes=0-1023" });
    var resp = await Widget.http.get(String(url || "").split("#")[0], { headers: probeHeaders, timeout: 15000 });
    var status = Number(resp && (resp.status || resp.statusCode || resp.code) || 0);
    var contentType = huajuanText(getHeaderValue(resp && resp.headers, "content-type")).toLowerCase();
    var contentRange = huajuanText(getHeaderValue(resp && resp.headers, "content-range")).toLowerCase();
    var body = resp && resp.data;
    var bodyText = typeof body === "string" ? body.slice(0, 80).toLowerCase() : "";
    var okStatus = status === 200 || status === 206 || status === 0;
    var looksBad = /image|text\/html|application\/json|xml/.test(contentType) || /<html|<\\?xml|requestdenied|forbidden/.test(bodyText);
    var looksVideo = /video|matroska|mp4|octet-stream/.test(contentType) || /bytes\s+\d+-\d+\/[1-9]\d{6,}/.test(contentRange);
    return { ok: okStatus && looksVideo && !looksBad, status: status, contentType: contentType, contentRange: contentRange };
  } catch (e) {
    return { ok: false, message: e && e.message || String(e) };
  }
}

async function sourceFromDirect(name, url, description, headers, params, meta) {
  meta = meta || {};
  meta.params = params || meta.params;
  if (/百度/.test(huajuanText(name))) {
    var rawBaiduUrl = baiduPreparePlaybackUrl(url);
    return sourceFromRawUrl(name, appendPlaybackFlags(rawBaiduUrl, name, params, meta), description, headers || null, meta);
  }
  var targetUrl = normalizePlaybackUrl(url);
  return sourceFromUrl(name, appendPlaybackFlags(targetUrl, name, params, meta), description, headers || null, meta);
}

function sourcesFromLazyResult(prefix, result, description) {
  var out = [];
  if (!result) return out;
  var headers = result.header || result.headers || undefined;
  var url = result.url;
  if (Array.isArray(url)) {
    for (var i = 0; i < url.length; i += 2) {
      if (!url[i + 1]) continue;
      out.push(sourceFromUrl(prefix + " " + huajuanText(url[i] || ("线路" + (i / 2 + 1))), String(url[i + 1]), description, headers));
    }
  } else if (url) {
    out.push(sourceFromUrl(prefix, String(url), description, headers));
  }
  return out;
}

function helperAvailable(name) {
  var g = typeof globalThis !== "undefined" ? globalThis : this;
  return !!g[name];
}

function getHeaderValue(headers, name) {
  if (!headers) return "";
  if (typeof headers.get === "function") return headers.get(name) || headers.get(name.toLowerCase()) || "";
  var lower = name.toLowerCase();
  for (var k in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, k) && String(k).toLowerCase() === lower) return headers[k];
  }
  return "";
}

function videoSeasonNumber(video) {
  var name = helperItemName(video);
  var s = huajuanExtractSeason(name, "");
  if (!s && video && video.vod_group) {
    s = huajuanExtractSeason(video.vod_group, "");
  }
  return s || 0;
}

function filterVideosForEpisode(videos, params) {
  var rawCount = Array.isArray(videos) ? videos.length : 0;
  var playable = (Array.isArray(videos) ? videos : []).filter(isPlayableVideoItem);
  var titleKept = playable.filter(function (video) {
    return itemMatchesWantedTitle(helperItemName(video), video && video.vod_group || "", params);
  });
  if (!titleKept.length && playable.length) {
    
    console.log("[huajuan] baidu title filter emptied list, fallback to playable-only", { rawCount: rawCount });
    titleKept = playable;
  }
  videos = titleKept;
  videos = filterTinyPlayableItems(videos, params);
  var wantSeason = huajuanWantedSeason(params);
  if (wantSeason > 0) {
    
    var seasonDeterminable = videos.some(function (video) {
      return videoSeasonNumber(video) > 0;
    });
    if (seasonDeterminable) {
      var seasonMatched = videos.filter(function (video) {
        return videoSeasonNumber(video) === wantSeason;
      });
      console.log("[huajuan] baidu season filter", { wantSeason: wantSeason, before: videos.length, after: seasonMatched.length, strict: true });
      videos = seasonMatched;
    }
  }
  var wantEp = huajuanWantedEpisode(params);
  var picked;
  if (!wantEp) {
    picked = videos;
  } else {
    var hasEpisodeMarkers = videos.some(function (video) {
      return !!helperEpisodeNumber(video, video && video.vod_group);
    });
    var matched = videos.filter(function (video) {
      var ep = helperEpisodeNumber(video, video && video.vod_group);
      return ep && ep === wantEp;
    });
    picked = matched.length || hasEpisodeMarkers ? matched : videos;
  }
  var unique = dedupeItemsBySize(picked);
  console.log("[huajuan] baidu size filter", {
    rawCount: rawCount,
    filteredCount: videos.length,
    pickedCount: picked.length,
    uniqueCount: unique.length,
    sizes: itemSizeSummary(unique)
  });
  return unique;
}

function helperItemName(item) {
  return huajuanText((item && (item.file_name || item.name || item.FileName || item.server_filename || item.path)) || "");
}

function helperItemSize(item) {
  return huajuanSizeText(item && (item.size || item.Size || item.file_size || item.FileSize));
}

function helperItemSizeNumber(item) {
  return Number(item && (item.size || item.Size || item.file_size || item.FileSize) || 0);
}

function helperEpisodeNumber(item, group) {
  var ep = huajuanExtractEpisode(helperItemName(item));
  return ep || huajuanExtractEpisode(group);
}

function sortItemsBySizeDesc(items) {
  return (Array.isArray(items) ? items : []).slice().sort(function (a, b) {
    return helperItemSizeNumber(b) - helperItemSizeNumber(a);
  });
}

function itemSizeDedupeKey(item) {
  var size = helperItemSizeNumber(item);
  return size > 0 ? String(Math.round(size)) : "";
}

function dedupeItemsBySize(items) {
  var out = [];
  var seen = {};
  items = sortItemsBySizeDesc(items);
  for (var i = 0; i < items.length; i++) {
    var key = itemSizeDedupeKey(items[i]);
    if (key && seen[key]) continue;
    if (key) seen[key] = true;
    out.push(items[i]);
  }
  return out;
}

function itemSizeSummary(items) {
  return (Array.isArray(items) ? items : []).slice(0, 8).map(function (item) {
    var size = helperItemSizeNumber(item);
    return size ? huajuanCompactSizeText(huajuanSizeText(size)) : "unknown";
  }).join("|");
}

function filterTinyPlayableItems(items, params) {
  if (!huajuanWantedEpisode(params) && huajuanText(params && params.type).toLowerCase() !== "movie") return items;
  var minBytes = 20 * 1024 * 1024;
  return (Array.isArray(items) ? items : []).filter(function (item) {
    var size = helperItemSizeNumber(item);
    return !size || size >= minBytes;
  });
}

function helperItemEpisodeText(item, group) {
  return [helperItemName(item), group].filter(Boolean).join(" ");
}

function wantedTitleNorms(params) {
  params = params || {};
  var out = [];
  function add(v) {
    v = huajuanNorm(v);
    if (v && out.indexOf(v) < 0) out.push(v);
  }
  if (params.tmdbInfo) {
    add(params.tmdbInfo.title || params.tmdbInfo.name);
    add(params.tmdbInfo.originalTitle || params.tmdbInfo.originalName);
  }
  add(params.seriesName);
  add(params.title);
  add(params.name);
  return out;
}

function textMatchesWantedTitle(text, titleNorms) {
  var norm = huajuanNorm(text);
  if (!norm || !titleNorms.length) return false;
  for (var i = 0; i < titleNorms.length; i++) {
    if (norm.indexOf(titleNorms[i]) >= 0 || titleNorms[i].indexOf(norm) >= 0) return true;
  }
  return false;
}

function itemLooksLikeDifferentTitle(name, titleNorms) {
  if (!titleNorms.length) return false;
  var raw = String(name || "").split(/[\\/]/).pop().replace(/\.(?:mp4|mkv|avi|mov|m4v|ts|m2ts|flv|wmv|webm|rmvb)$/i, "");
  var prefix = raw.split(/\bS\d{1,2}E\d{1,4}\b|第\s*\d{1,4}\s*[集话期]|\bEP?\s*\d{1,4}\b|(?:^|[\s._\-\[\(])0*\d{1,4}(?=$|[\s._\-\]\)集话期])/i)[0] || "";
  prefix = huajuanText(prefix.replace(/[._\-\[\]【】()（）]/g, " "));
  if (!/[\u4e00-\u9fa5A-Za-z]{2,}/.test(prefix)) return false;
  return !textMatchesWantedTitle(prefix, titleNorms);
}

function itemMatchesWantedTitle(name, group, params) {
  var titleNorms = wantedTitleNorms(params);
  if (!titleNorms.length) return true;
  if (textMatchesWantedTitle(name, titleNorms)) return true;
  if (textMatchesWantedTitle(group, titleNorms)) return true;
  if (itemLooksLikeDifferentTitle(name, titleNorms)) {
    if (!huajuanWantedEpisode(params) && huajuanText(params && params.type).toLowerCase() === "movie") return true;
    return false;
  }
  return true;
}

function sortItemsByEpisodeDesc(items, textFn) {
  return (Array.isArray(items) ? items : []).slice().sort(function (a, b) {
    var ea = huajuanExtractEpisode(textFn(a));
    var eb = huajuanExtractEpisode(textFn(b));
    if (ea || eb) return (eb || -1) - (ea || -1);
    return 0;
  });
}

function episodeSummary(items, textFn) {
  var list = (Array.isArray(items) ? items : []).slice(0, 8).map(function (item) {
    var text = textFn(item);
    var ep = huajuanExtractEpisode(text);
    return (ep ? "E" + ep + " " : "") + huajuanText(text).slice(0, 80);
  });
  return list.join(" | ");
}

function filterHelperItemsForEpisode(items, params, group) {
  var rawCount = Array.isArray(items) ? items.length : 0;
  var playable = (Array.isArray(items) ? items : []).filter(function (item) {
    return isPlayableVideoName(helperItemName(item));
  });
  var titleKept = playable.filter(function (item) {
    return itemMatchesWantedTitle(helperItemName(item), group, params);
  });
  if (!titleKept.length && playable.length) {
    console.log("[huajuan] baidu helper title filter emptied list, fallback to playable-only", { rawCount: rawCount });
    titleKept = playable;
  }
  items = titleKept;
  items = filterTinyPlayableItems(items, params);
  
  var wantSeasonH = huajuanWantedSeason(params);
  if (wantSeasonH > 0) {
    function helperSeasonNumber(item) {
      var s = huajuanExtractSeason(helperItemName(item), "");
      if (!s && group) s = huajuanExtractSeason(group, "");
      return s || 0;
    }
    var seasonDeterminableH = items.some(function (item) {
      return helperSeasonNumber(item) > 0;
    });
    if (seasonDeterminableH) {
      var seasonMatchedH = items.filter(function (item) {
        return helperSeasonNumber(item) === wantSeasonH;
      });
      console.log("[huajuan] baidu helper season filter", { wantSeason: wantSeasonH, before: items.length, after: seasonMatchedH.length, strict: true });
      items = seasonMatchedH;
    }
  }
  var wantEp = huajuanWantedEpisode(params);
  var picked;
  if (!wantEp) {
    picked = items;
  } else {
    var hasEpisodeMarkers = items.some(function (item) {
      return !!helperEpisodeNumber(item, group);
    });
    var matched = items.filter(function (item) {
      var ep = helperEpisodeNumber(item, group);
      return ep && ep === wantEp;
    });
    picked = matched.length || hasEpisodeMarkers ? matched : items;
  }
  var unique = dedupeItemsBySize(picked);
  console.log("[huajuan] baidu helper size filter", {
    rawCount: rawCount,
    filteredCount: items.length,
    pickedCount: picked.length,
    uniqueCount: unique.length,
    sizes: itemSizeSummary(unique)
  });
  return unique;
}

function panPriority(type, params) {
  var order = ["百度", "网盘"];
  var idx = order.indexOf(type);
  return idx >= 0 ? idx : order.length;
}

function panEnabled(type, params) {
  return type === "百度";
}

function sourceLimitForPan(type, params) {
  if (type === "百度" && fastLoadEnabled(params)) return 1;
  var limit = type === "百度" ? Math.max(1, huajuanToInt(params && params.baidu_max_files, HUAJUAN_BUILTIN_BAIDU_MAX_FILES)) : 1;
  return limit;
}

function sortLinesByPan(lines, params) {
  return (Array.isArray(lines) ? lines : []).slice().sort(function (a, b) {
    return panPriority(a && a.panType, params) - panPriority(b && b.panType, params);
  });
}

function panTypesSummary(lines) {
  var seen = {};
  var out = [];
  (Array.isArray(lines) ? lines : []).forEach(function (line) {
    var type = line && (line.panType || detectPanType(line.shareUrl)) || "";
    if (type && !seen[type]) {
      seen[type] = true;
      out.push(type);
    }
  });
  return out.join(",");
}

function candidateScanLimit(params) {
  return HUAJUAN_BUILTIN_CANDIDATE_SCAN_LIMIT;
}

function searchExtraAfterHit(params) {
  if (fastLoadEnabled(params)) return 0;
  return huajuanBoundInt(params && params.search_extra_after_hit, HUAJUAN_BUILTIN_SEARCH_EXTRA_AFTER_HIT, 0, 40);
}

function shouldKeepPanLine(type, params) {
  return type === "百度" && canResolvePanType(type, params);
}

function canResolvePanType(type, params) {
  if (!panEnabled(type, params)) return false;
  if (type === "百度") return !!baiduCookie(params) || helperAvailable("Baidu2") || helperAvailable("Baidu");
  return false;
}

function resolvableTargetPans(params, targetPanType) {
  var base = targetPanType ? [targetPanType] : ["百度"];
  var out = [];
  for (var i = 0; i < base.length; i++) {
    var type = base[i];
    if (panEnabled(type, params) && canResolvePanType(type, params)) out.push(type);
  }
  return out;
}

function panLimitsReached(panCounts, params, targetPanType) {
  var pans = resolvableTargetPans(params, targetPanType);
  if (!pans.length) return false;
  for (var i = 0; i < pans.length; i++) {
    if ((panCounts[pans[i]] || 0) < sourceLimitForPan(pans[i], params)) return false;
  }
  return true;
}

function preferredOnlyLines(lines, params) {
  lines = sortLinesByPan(lines, params);
  var out = [];
  var seenPan = {};
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (!line) continue;
    var type = line.panType || detectPanType(line.shareUrl);
    if (!panEnabled(type, params)) continue;
    if (shouldKeepPanLine(type, params)) {
      seenPan[type] = (seenPan[type] || 0) + 1;
      out.push(line);
    }
  }
  return out;
}

function baiduPlaybackHeaders(params) {
  var headers = {
    "User-Agent": "netdisk;P2SP;2.2.91.136;android-android;",
    "Referer": "https://pan.baidu.com/"
  };
  var cookie = baiduCookie(params);
  if (cookie) headers.Cookie = cookie;
  return headers;
}

function baiduCookie(params) {
  return huajuanText((params && (params.baidu_cookie || params.baiduCookie)) || HUAJUAN_RUNTIME_PARAMS.baidu_cookie || HUAJUAN_RUNTIME_PARAMS.baiduCookie || "");
}

function setBaiduCookie(params, cookie) {
  cookie = huajuanText(cookie);
  if (!cookie) return;
  HUAJUAN_RUNTIME_PARAMS.baidu_cookie = cookie;
  if (params) params.baidu_cookie = cookie;
}

function baiduApplyRandsk(params, randsk) {
  randsk = huajuanText(randsk);
  if (!randsk) return;
  var cookie = baiduCookie(params).replace(/BDCLND=[^;]*;?\s*/g, "");
  if (cookie && !/;\s*$/.test(cookie)) cookie += "; ";
  setBaiduCookie(params, cookie + "BDCLND=" + randsk);
}

function baiduBaseHeaders(params) {
  return {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip",
    "Content-Type": "application/x-www-form-urlencoded",
    "Referer": "https://pan.baidu.com",
    "Cookie": baiduCookie(params)
  };
}

function baiduQuery(data) {
  var out = [];
  data = data || {};
  for (var k in data) {
    if (!Object.prototype.hasOwnProperty.call(data, k)) continue;
    if (data[k] == null) continue;
    out.push(encodeURIComponent(k) + "=" + encodeURIComponent(data[k]));
  }
  return out.join("&");
}

function baiduJson(resp) {
  var data = resp && resp.data;
  if (typeof data === "string") {
    try { return JSON.parse(data); } catch (e) { return {}; }
  }
  return data || {};
}

function baiduStatus(resp) {
  return Number(resp && (resp.status || resp.statusCode || resp.code) || 200);
}

async function baiduApi(path, data, headers, method, params, retry) {
  retry = retry == null ? 3 : retry;
  var fullUrl = /^https?:\/\//i.test(path) ? path : "https://pan.baidu.com/" + path.replace(/^\/+/, "");
  var mergedHeaders = Object.assign({}, baiduBaseHeaders(params), headers || {});
  var resp;
  if (String(method || "post").toLowerCase() === "get") {
    var query = baiduQuery(data);
    resp = await Widget.http.get(fullUrl + (query ? (fullUrl.indexOf("?") >= 0 ? "&" : "?") + query : ""), {
      headers: mergedHeaders,
      timeout: 30000
    });
  } else {
    resp = await Widget.http.post(fullUrl, baiduQuery(data), {
      headers: mergedHeaders,
      timeout: 30000
    });
  }
  var status = baiduStatus(resp);
  if ((status === 429 || status === 503) && retry > 0) {
    await huajuanSleep((4 - retry) * 1000);
    return baiduApi(path, data, headers, method, params, retry - 1);
  }
  return baiduJson(resp);
}

function baiduParseShare(url) {
  try {
    url = decodeURIComponent(String(url || "")).replace(/\s+/g, "");
  } catch (e) {
    url = String(url || "").replace(/\s+/g, "");
  }
  var m = url.match(/pan\.baidu\.com\/(?:s\/|wap\/init\?surl=)([^?&#]+)/i);
  if (!m) return null;
  var shareId = String(m[1] || "").split("?")[0].split("#")[0];
  if (!shareId) return null;
  var pwd = "";
  var pm = url.match(/(?:提取码|密码|pwd)[:=：\s]*([^&\s#]{4})/i);
  if (pm) pwd = pm[1];
  return { shareId: shareId, sharePwd: pwd };
}

function baiduShareIdVariants(shareId) {
  shareId = String(shareId || "");
  if (!shareId) return [];
  var stripped = shareId.replace(/^1+/, "");
  var singleOne = "1" + stripped;
  var out = [];
  if (stripped && out.indexOf(stripped) < 0) out.push(stripped);
  if (singleOne && out.indexOf(singleOne) < 0) out.push(singleOne);
  if (shareId && out.indexOf(shareId) < 0) out.push(shareId);
  return out.length ? out : [shareId];
}

function huajuanExtractSharePwd(text) {
  var m = String(text || "").match(/(?:提取码|访问码|取件码|密码|pwd)\s*[:：=]?\s*([A-Za-z0-9]{4})(?![A-Za-z0-9])/i);
  return m ? m[1] : "";
}

function huajuanAttachSharePwd(shareUrl, contextText) {
  shareUrl = String(shareUrl || "");
  if (!shareUrl) return shareUrl;
  var parsed = null;
  try { parsed = baiduParseShare(shareUrl); } catch (e) { parsed = null; }
  if (parsed && parsed.sharePwd) return shareUrl;
  var pwd = huajuanExtractSharePwd(contextText);
  if (!pwd) return shareUrl;
  return shareUrl + (shareUrl.indexOf("#") >= 0 ? "&pwd=" + pwd : "#pwd=" + pwd);
}

function sha1Hex(message) {
  function rotl(n, s) { return (n << s) | (n >>> (32 - s)); }
  function hex(n) {
    var s = "";
    for (var i = 7; i >= 0; i--) s += ((n >>> (i * 4)) & 0x0f).toString(16);
    return s;
  }
  function utf8Bytes(text) {
    var encoded = encodeURIComponent(String(text || ""));
    var out = "";
    for (var bi = 0; bi < encoded.length; bi++) {
      if (encoded.charAt(bi) === "%") {
        out += String.fromCharCode(parseInt(encoded.slice(bi + 1, bi + 3), 16));
        bi += 2;
      } else {
        out += encoded.charAt(bi);
      }
    }
    return out;
  }
  var msg = utf8Bytes(message);
  var words = [];
  for (var i = 0; i < msg.length; i++) {
    words[i >> 2] |= msg.charCodeAt(i) << (24 - (i % 4) * 8);
  }
  words[msg.length >> 2] |= 0x80 << (24 - (msg.length % 4) * 8);
  words[(((msg.length + 8) >> 6) << 4) + 15] = msg.length * 8;
  var h0 = 0x67452301, h1 = 0xefcdab89, h2 = 0x98badcfe, h3 = 0x10325476, h4 = 0xc3d2e1f0;
  for (var block = 0; block < words.length; block += 16) {
    var w = [];
    for (i = 0; i < 80; i++) {
      w[i] = i < 16 ? (words[block + i] || 0) : rotl(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1);
    }
    var a = h0, b = h1, c = h2, d = h3, e = h4;
    for (i = 0; i < 80; i++) {
      var f, k;
      if (i < 20) { f = (b & c) | ((~b) & d); k = 0x5a827999; }
      else if (i < 40) { f = b ^ c ^ d; k = 0x6ed9eba1; }
      else if (i < 60) { f = (b & c) | (b & d) | (c & d); k = 0x8f1bbcdc; }
      else { f = b ^ c ^ d; k = 0xca62c1d6; }
      var temp = (rotl(a, 5) + f + e + k + w[i]) | 0;
      e = d; d = c; c = rotl(b, 30); b = a; a = temp;
    }
    h0 = (h0 + a) | 0; h1 = (h1 + b) | 0; h2 = (h2 + c) | 0; h3 = (h3 + d) | 0; h4 = (h4 + e) | 0;
  }
  return hex(h0) + hex(h1) + hex(h2) + hex(h3) + hex(h4);
}

function huajuanUtf8Bytes(text) {
  var encoded = encodeURIComponent(String(text || ""));
  var out = [];
  for (var i = 0; i < encoded.length; i++) {
    if (encoded.charAt(i) === "%") {
      out.push(parseInt(encoded.slice(i + 1, i + 3), 16));
      i += 2;
    } else {
      out.push(encoded.charCodeAt(i));
    }
  }
  return out;
}

function md5Hex(message) {
  function add32(a, b) { return (a + b) & 0xffffffff; }
  function rol(num, cnt) { return (num << cnt) | (num >>> (32 - cnt)); }
  function cmn(q, a, b, x, s, t) { return add32(rol(add32(add32(a, q), add32(x, t)), s), b); }
  function ff(a, b, c, d, x, s, t) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); }
  function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); }
  function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
  function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | (~d)), a, b, x, s, t); }
  function rhex(n) {
    var s = "";
    for (var j = 0; j < 4; j++) s += ("0" + ((n >> (j * 8)) & 255).toString(16)).slice(-2);
    return s;
  }
  var bytes = huajuanUtf8Bytes(message);
  var words = [];
  for (var i = 0; i < bytes.length; i++) words[i >> 2] = (words[i >> 2] || 0) | (bytes[i] << ((i % 4) * 8));
  words[bytes.length >> 2] = (words[bytes.length >> 2] || 0) | (0x80 << ((bytes.length % 4) * 8));
  words[((((bytes.length + 8) >> 6) + 1) * 16) - 2] = bytes.length * 8;
  var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
  for (i = 0; i < words.length; i += 16) {
    var oa = a, ob = b, oc = c, od = d;
    a = ff(a, b, c, d, words[i + 0] || 0, 7, -680876936); d = ff(d, a, b, c, words[i + 1] || 0, 12, -389564586);
    c = ff(c, d, a, b, words[i + 2] || 0, 17, 606105819); b = ff(b, c, d, a, words[i + 3] || 0, 22, -1044525330);
    a = ff(a, b, c, d, words[i + 4] || 0, 7, -176418897); d = ff(d, a, b, c, words[i + 5] || 0, 12, 1200080426);
    c = ff(c, d, a, b, words[i + 6] || 0, 17, -1473231341); b = ff(b, c, d, a, words[i + 7] || 0, 22, -45705983);
    a = ff(a, b, c, d, words[i + 8] || 0, 7, 1770035416); d = ff(d, a, b, c, words[i + 9] || 0, 12, -1958414417);
    c = ff(c, d, a, b, words[i + 10] || 0, 17, -42063); b = ff(b, c, d, a, words[i + 11] || 0, 22, -1990404162);
    a = ff(a, b, c, d, words[i + 12] || 0, 7, 1804603682); d = ff(d, a, b, c, words[i + 13] || 0, 12, -40341101);
    c = ff(c, d, a, b, words[i + 14] || 0, 17, -1502002290); b = ff(b, c, d, a, words[i + 15] || 0, 22, 1236535329);
    a = gg(a, b, c, d, words[i + 1] || 0, 5, -165796510); d = gg(d, a, b, c, words[i + 6] || 0, 9, -1069501632);
    c = gg(c, d, a, b, words[i + 11] || 0, 14, 643717713); b = gg(b, c, d, a, words[i + 0] || 0, 20, -373897302);
    a = gg(a, b, c, d, words[i + 5] || 0, 5, -701558691); d = gg(d, a, b, c, words[i + 10] || 0, 9, 38016083);
    c = gg(c, d, a, b, words[i + 15] || 0, 14, -660478335); b = gg(b, c, d, a, words[i + 4] || 0, 20, -405537848);
    a = gg(a, b, c, d, words[i + 9] || 0, 5, 568446438); d = gg(d, a, b, c, words[i + 14] || 0, 9, -1019803690);
    c = gg(c, d, a, b, words[i + 3] || 0, 14, -187363961); b = gg(b, c, d, a, words[i + 8] || 0, 20, 1163531501);
    a = gg(a, b, c, d, words[i + 13] || 0, 5, -1444681467); d = gg(d, a, b, c, words[i + 2] || 0, 9, -51403784);
    c = gg(c, d, a, b, words[i + 7] || 0, 14, 1735328473); b = gg(b, c, d, a, words[i + 12] || 0, 20, -1926607734);
    a = hh(a, b, c, d, words[i + 5] || 0, 4, -378558); d = hh(d, a, b, c, words[i + 8] || 0, 11, -2022574463);
    c = hh(c, d, a, b, words[i + 11] || 0, 16, 1839030562); b = hh(b, c, d, a, words[i + 14] || 0, 23, -35309556);
    a = hh(a, b, c, d, words[i + 1] || 0, 4, -1530992060); d = hh(d, a, b, c, words[i + 4] || 0, 11, 1272893353);
    c = hh(c, d, a, b, words[i + 7] || 0, 16, -155497632); b = hh(b, c, d, a, words[i + 10] || 0, 23, -1094730640);
    a = hh(a, b, c, d, words[i + 13] || 0, 4, 681279174); d = hh(d, a, b, c, words[i + 0] || 0, 11, -358537222);
    c = hh(c, d, a, b, words[i + 3] || 0, 16, -722521979); b = hh(b, c, d, a, words[i + 6] || 0, 23, 76029189);
    a = hh(a, b, c, d, words[i + 9] || 0, 4, -640364487); d = hh(d, a, b, c, words[i + 12] || 0, 11, -421815835);
    c = hh(c, d, a, b, words[i + 15] || 0, 16, 530742520); b = hh(b, c, d, a, words[i + 2] || 0, 23, -995338651);
    a = ii(a, b, c, d, words[i + 0] || 0, 6, -198630844); d = ii(d, a, b, c, words[i + 7] || 0, 10, 1126891415);
    c = ii(c, d, a, b, words[i + 14] || 0, 15, -1416354905); b = ii(b, c, d, a, words[i + 5] || 0, 21, -57434055);
    a = ii(a, b, c, d, words[i + 12] || 0, 6, 1700485571); d = ii(d, a, b, c, words[i + 3] || 0, 10, -1894986606);
    c = ii(c, d, a, b, words[i + 10] || 0, 15, -1051523); b = ii(b, c, d, a, words[i + 1] || 0, 21, -2054922799);
    a = ii(a, b, c, d, words[i + 8] || 0, 6, 1873313359); d = ii(d, a, b, c, words[i + 15] || 0, 10, -30611744);
    c = ii(c, d, a, b, words[i + 6] || 0, 15, -1560198380); b = ii(b, c, d, a, words[i + 13] || 0, 21, 1309151649);
    a = ii(a, b, c, d, words[i + 4] || 0, 6, -145523070); d = ii(d, a, b, c, words[i + 11] || 0, 10, -1120210379);
    c = ii(c, d, a, b, words[i + 2] || 0, 15, 718787259); b = ii(b, c, d, a, words[i + 9] || 0, 21, -343485551);
    a = add32(a, oa); b = add32(b, ob); c = add32(c, oc); d = add32(d, od);
  }
  return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}

function sha256Hex(message) {
  function rotr(n, x) { return (x >>> n) | (x << (32 - n)); }
  function hex(n) { return ("00000000" + (n >>> 0).toString(16)).slice(-8); }
  var k = [
    0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
    0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
    0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
    0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
    0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
    0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
    0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
    0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2
  ];
  var bytes = huajuanUtf8Bytes(message);
  var bitLen = bytes.length * 8;
  bytes.push(0x80);
  while ((bytes.length % 64) !== 56) bytes.push(0);
  for (var bi = 7; bi >= 0; bi--) bytes.push((bitLen / Math.pow(2, bi * 8)) & 255);
  var h = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
  for (var i = 0; i < bytes.length; i += 64) {
    var w = [];
    for (var j = 0; j < 16; j++) w[j] = ((bytes[i + j * 4] << 24) | (bytes[i + j * 4 + 1] << 16) | (bytes[i + j * 4 + 2] << 8) | bytes[i + j * 4 + 3]) >>> 0;
    for (j = 16; j < 64; j++) {
      var s0 = rotr(7, w[j - 15]) ^ rotr(18, w[j - 15]) ^ (w[j - 15] >>> 3);
      var s1 = rotr(17, w[j - 2]) ^ rotr(19, w[j - 2]) ^ (w[j - 2] >>> 10);
      w[j] = (w[j - 16] + s0 + w[j - 7] + s1) >>> 0;
    }
    var a = h[0], b = h[1], c = h[2], d = h[3], e = h[4], f = h[5], g = h[6], hh = h[7];
    for (j = 0; j < 64; j++) {
      var S1 = rotr(6, e) ^ rotr(11, e) ^ rotr(25, e);
      var ch = (e & f) ^ ((~e) & g);
      var temp1 = (hh + S1 + ch + k[j] + w[j]) >>> 0;
      var S0 = rotr(2, a) ^ rotr(13, a) ^ rotr(22, a);
      var maj = (a & b) ^ (a & c) ^ (b & c);
      var temp2 = (S0 + maj) >>> 0;
      hh = g; g = f; f = e; e = (d + temp1) >>> 0; d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
    }
    h[0] = (h[0] + a) >>> 0; h[1] = (h[1] + b) >>> 0; h[2] = (h[2] + c) >>> 0; h[3] = (h[3] + d) >>> 0;
    h[4] = (h[4] + e) >>> 0; h[5] = (h[5] + f) >>> 0; h[6] = (h[6] + g) >>> 0; h[7] = (h[7] + hh) >>> 0;
  }
  return h.map(hex).join("");
}

function baiduCookieDigest(params) {
  var parts = baiduCookie(params)
    .replace(/BDCLND=[^;]*;?\s*/g, "")
    .split(";")
    .map(function (part) { return huajuanText(part); })
    .filter(Boolean);
  var cookie = parts.join(";");
  return cookie ? sha256Hex(cookie).slice(0, 32) : "nocookie";
}

async function baiduGetUid(params) {
  var cookie = baiduCookie(params);
  if (!cookie) return "";
  var digest = baiduCookieDigest(params);
  var cacheKey = "uid::" + digest;
  var cached = huajuanCacheGetWithTtl(BAIDU_UID_CACHE, cacheKey, BAIDU_UID_CACHE_TTL_MS);
  if (cached) {
    console.log("[huajuan] baidu uid cacheHit", { level: "memory" });
    return cached;
  }
  var storageKey = "huajuan.baidu.uid." + digest;
  cached = huajuanStorageGet(storageKey, BAIDU_UID_CACHE_TTL_MS);
  if (cached) {
    huajuanCacheSet(BAIDU_UID_CACHE, cacheKey, cached);
    console.log("[huajuan] baidu uid cacheHit", { level: "storage" });
    return cached;
  }
  if (BAIDU_UID_PENDING_CACHE[cacheKey]) {
    console.log("[huajuan] baidu uid cacheHit", { level: "pending" });
    return BAIDU_UID_PENDING_CACHE[cacheKey];
  }
  console.log("[huajuan] baidu uid cacheMiss");
  var pending = Widget.http.get("https://mbd.baidu.com/userx/v1/info/get?appname=baiduboxapp&fields=%20%20%20%20%20%20%20%20%5B%22bg_image%22,%22member%22,%22uid%22,%22avatar%22,%20%22avatar_member%22%5D&client&clientfrom&lang=zh-cn&tpl&ttt", {
    headers: {
      "User-Agent": baiduBaseHeaders(params)["User-Agent"],
      "Cookie": cookie
    },
    timeout: 20000
  }).then(function (resp) {
    var data = baiduJson(resp);
    var uid = data && data.data && data.data.fields && data.data.fields.uid || "";
    if (uid) {
      huajuanCacheSet(BAIDU_UID_CACHE, cacheKey, uid);
      huajuanStorageSet(storageKey, uid);
    }
    return uid;
  }).then(function (uid) {
    delete BAIDU_UID_PENDING_CACHE[cacheKey];
    return uid;
  }, function (e) {
    delete BAIDU_UID_PENDING_CACHE[cacheKey];
    throw e;
  });
  BAIDU_UID_PENDING_CACHE[cacheKey] = pending;
  return pending;
}

async function baiduShareToken(shareData, params) {
  var cacheKey = shareData.shareId + "::" + (shareData.sharePwd || "") + "::" + baiduCookieDigest(params);
  var cached = huajuanCacheGet(BAIDU_SHARE_CACHE, cacheKey);
  if (cached) {
    baiduApplyRandsk(params, cached.randsk);
    console.log("[huajuan] baidu share cacheHit");
    return cached;
  }
  console.log("[huajuan] baidu share cacheMiss");
  
  var variants = baiduShareIdVariants(shareData.shareId);
  var verify = null;
  var usedShareId = shareData.shareId;
  for (var vi = 0; vi < variants.length; vi++) {
    var vid = variants[vi];
    var v = await baiduApi("share/verify?t=" + Date.now() + "&surl=" + encodeURIComponent(vid), {
      pwd: shareData.sharePwd || ""
    }, null, "post", params);
    if (v && v.errno === 105 && vi + 1 < variants.length) {
      console.log("[huajuan] baidu verify 105, retry alternate surl form", { from: vid, to: variants[vi + 1] });
      continue;
    }
    verify = v;
    usedShareId = vid;
    break;
  }
  if (verify && verify.randsk) {
    baiduApplyRandsk(params, verify.randsk);
  }
  if (verify && verify.errno !== 0) {
    
    console.warn("[huajuan] baidu verify failed", { errno: verify.errno, shareId: usedShareId, hasPwd: !!(shareData && shareData.sharePwd) });
  }
  var listData = await baiduApi("share/list", {
    shorturl: usedShareId,
    root: 1,
    page: 1,
    num: 100
  }, null, "get", params);
  if (listData && listData.errno !== 0 && verify && verify.randsk) {
    listData = await baiduApi("share/list", {
      shorturl: usedShareId,
      root: 1,
      page: 1,
      num: 100
    }, null, "get", params);
  }
  if (listData && listData.errno !== 0) {
    console.warn("[huajuan] baidu list failed", { errno: listData.errno });
  }
  var token = {
    list: listData && listData.list || [],
    uk: listData && (listData.uk || listData.share_uk) || "",
    shareid: listData && listData.share_id || verify && verify.share_id || "",
    randsk: verify && verify.randsk || ""
  };
  if (token.shareid && token.uk) huajuanCacheSet(BAIDU_SHARE_CACHE, cacheKey, token);
  return token;
}

async function baiduListShareVideos(shareUrl, params) {
  var shareData = baiduParseShare(shareUrl);
  if (!shareData) return [];
  var wantEp = huajuanWantedEpisode(params);
  var wantSeason = huajuanWantedSeason(params);
  var fastStop = fastLoadEnabled(params) && wantEp > 0;
  var maxMatches = Math.max(1, sourceLimitForPan("百度", params));
  var cacheKey = [
    shareData.shareId,
    shareData.sharePwd || "",
    baiduCookieDigest(params),
    "ep=" + (wantEp || "all"),
    "season=" + (huajuanWantedSeason(params) || "all"),
    "mode=" + loadSpeedMode(params),
    "limit=" + maxMatches
  ].join("::");
  var cached = huajuanCacheGet(BAIDU_VIDEO_LIST_CACHE, cacheKey);
  if (cached) {
    console.log("[huajuan] baidu video list cacheHit", { count: cached.length, mode: loadSpeedMode(params) });
    return cached;
  }
  console.log("[huajuan] baidu video list cacheMiss", { mode: loadSpeedMode(params), episode: wantEp || "" });
  var token = await baiduShareToken(shareData, params);
  if (!token || !token.shareid || !token.uk) return [];
  var videos = [];
  var matchedCount = 0;
  var matchedSizes = {};
  var stopped = false;
  function itemEpisodeText(item, group) {
    return [item && item.server_filename || "", group || ""].filter(Boolean).join(" ");
  }
  function itemMatchesWanted(item, group) {
    if (wantEp <= 0) return false;
    var name = item && item.server_filename || "";
    var ep = huajuanExtractEpisode(name);
    if (!ep) ep = huajuanExtractEpisode(group);
    if (!ep || ep !== wantEp) return false;
    
    if (wantSeason > 0) {
      var s = huajuanExtractSeason(name, "");
      if (!s) s = huajuanExtractSeason(group, "");
      if (s > 0 && s !== wantSeason) return false;
    }
    return true;
  }
  function orderedList(list, group) {
    list = (Array.isArray(list) ? list : []).slice();
    if (!fastStop) return list;
    return list.sort(function (a, b) {
      
      if (wantSeason > 0) {
        var aIsDir = String(a.isdir) === "1";
        var bIsDir = String(b.isdir) === "1";
        if (aIsDir || bIsDir) {
          var aSeasonHit = aIsDir && huajuanExtractSeason(a.server_filename || "", "") === wantSeason;
          var bSeasonHit = bIsDir && huajuanExtractSeason(b.server_filename || "", "") === wantSeason;
          var dirDelta = (bSeasonHit ? 1 : 0) - (aSeasonHit ? 1 : 0);
          if (dirDelta) return dirDelta;
        }
      }
      var matchDelta = (itemMatchesWanted(b, group) ? 1 : 0) - (itemMatchesWanted(a, group) ? 1 : 0);
      if (matchDelta) return matchDelta;
      return helperItemSizeNumber(b) - helperItemSizeNumber(a);
    });
  }
  function addVideo(item, group) {
    var video = {
      fid: item.fs_id,
      file_name: item.server_filename,
      size: item.size,
      vod_group: group || "",
      shareId: shareData.shareId,
      baiduToken: token
    };
    videos.push(video);
    if (fastStop && itemMatchesWanted(item, group)) {
      var sizeKey = itemSizeDedupeKey(video) || ("unknown:" + matchedCount);
      if (!matchedSizes[sizeKey]) {
        matchedSizes[sizeKey] = true;
        matchedCount++;
      }
      if (matchedCount >= maxMatches) {
        stopped = true;
        return true;
      }
    }
    return false;
  }
  async function walk(dirPath, dirFsId, group) {
    if (stopped) return;
    var shareDir = "/sharelink" + token.shareid + "-" + dirFsId + dirPath;
    var data = await baiduApi("share/list", {
      sekey: token.randsk,
      uk: token.uk,
      shareid: token.shareid,
      page: 1,
      num: 100,
      dir: shareDir
    }, null, "get", params);
    var list = orderedList(data && data.list || [], group);
    for (var i = 0; i < list.length; i++) {
      if (stopped) break;
      var item = list[i] || {};
      if (String(item.isdir) === "1") {
        await walk(dirPath + "/" + item.server_filename, item.fs_id, group ? group + "/" + item.server_filename : item.server_filename);
      } else if (isPlayableVideoName(item.server_filename || "")) {
        if (addVideo(item, group)) break;
      }
    }
  }
  var root = orderedList(token.list || [], "");
  for (var i = 0; i < root.length; i++) {
    if (stopped) break;
    var item = root[i] || {};
    if (String(item.isdir) === "1") {
      await walk("/" + item.server_filename, item.fs_id, item.server_filename || "");
    } else if (isPlayableVideoName(item.server_filename || "")) {
      if (addVideo(item, "")) break;
    }
  }
  if (stopped) {
    console.log("[huajuan] baidu list early stop", { episode: wantEp, collected: videos.length, matched: matchedCount });
  }
  if (videos.length) huajuanCacheSet(BAIDU_VIDEO_LIST_CACHE, cacheKey, videos);
  return videos;
}

async function baiduDirectPlayUrl(video, params, uidPromise) {
  var token = video && video.baiduToken || {};
  var cacheKey = token.shareid && token.uk && video && video.fid
    ? [token.shareid, token.uk, video.fid, baiduCookieDigest(params)].join("::")
    : "";
  if (cacheKey) {
    var cached = huajuanCacheGet(BAIDU_DIRECT_CACHE, cacheKey);
    if (cached) {
      console.log("[huajuan] baidu direct cacheHit", { fid: String(video.fid || "").slice(0, 8) });
      return cached;
    }
    console.log("[huajuan] baidu direct cacheMiss", { fid: String(video.fid || "").slice(0, 8) });
  }
  var uid = uidPromise ? await uidPromise.catch(function () { return ""; }) : await baiduGetUid(params);
  var bdussMatch = baiduCookie(params).match(/BDUSS=([^;]+)/);
  if (!uid || !bdussMatch) return "";
  var time = String(Date.now());
  var rand = sha1Hex(sha1Hex(bdussMatch[1]) + uid + "ebrcUYiuxaZv2XGu7KIYKxUrqfnOfpDF" + time + BAIDU_UZ_DEVUID + "11.30.2ae5821440fab5e1a61a025f014bd8972");
  var data = await baiduApi("share/list", {
    shareid: token.shareid,
    uk: token.uk,
    fid: video.fid,
    sekey: token.randsk,
    origin: "dlna",
    devuid: BAIDU_UZ_DEVUID,
    clienttype: 1,
    channel: "android_12_zhao_bd-netdisk_1024266h",
    version: "11.30.2",
    time: time,
    rand: rand
  }, {
    "User-Agent": "netdisk;P2SP;2.2.91.136;android-android;",
    "Cookie": baiduCookie(params)
  }, "get", params);
  var list = data && data.list || [];
  var dlink = list[0] && list[0].dlink || "";
  if (dlink && cacheKey) huajuanCacheSet(BAIDU_DIRECT_CACHE, cacheKey, dlink);
  return dlink;
}

async function baiduSourceFromVideo(video, line, params, uidPromise) {
  video = video || {};
  var directUrl = await baiduDirectPlayUrl(video, params, uidPromise);
  if (!directUrl) return null;
  var vName = video.file_name || "";
  var vSize = huajuanSizeText(video.size);
  var vDesc = [line.title, video.vod_group, vName, vSize ? "大小: " + vSize : "", line.shareUrl].filter(Boolean).join("\n");
  return sourceFromDirect("花卷[盘] 百度 " + vName + (vSize ? " " + vSize : ""), directUrl, vDesc, baiduPlaybackHeaders(params), params, { name: vName, size: Number(video.size || 0) });
}

async function baiduSourcesFromVideos(videos, line, params, uidPromise, maxFiles) {
  videos = Array.isArray(videos) ? videos : [];
  maxFiles = Math.max(1, Number(maxFiles || 1));
  var concurrency = fastLoadEnabled(params) ? 1 : BAIDU_DIRECT_CONCURRENCY_FULL;
  var out = [];
  console.log("[huajuan] baidu direct concurrency", {
    mode: loadSpeedMode(params),
    concurrency: concurrency,
    candidates: videos.length,
    maxFiles: maxFiles
  });
  for (var i = 0; i < videos.length && out.length < maxFiles; i += concurrency) {
    var remaining = maxFiles - out.length;
    var batch = videos.slice(i, i + Math.min(concurrency, remaining));
    var sources = await Promise.all(batch.map(function (video) {
      return baiduSourceFromVideo(video, line, params, uidPromise).catch(function (e) {
        console.warn("[huajuan] baidu direct source failed", { message: e && e.message || String(e) });
        return null;
      });
    }));
    for (var si = 0; si < sources.length && out.length < maxFiles; si++) {
      if (sources[si]) out.push(sources[si]);
    }
  }
  return out;
}

function flattenBaiduItems(data) {
  var out = [];
  if (Array.isArray(data)) return data;
  for (var key in data || {}) {
    if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
    var value = data[key];
    if (Array.isArray(value)) {
      for (var i = 0; i < value.length; i++) out.push(value[i]);
    }
  }
  return out;
}

async function resolveBaiduDirect(line, params) {
  var helper = helperAvailable("Baidu2") ? Baidu2 : (helperAvailable("Baidu") ? Baidu : null);
  var baiduStartedAt = Date.now();
  console.log("[huajuan] baidu direct start", { helper: !!helper, helperName: helperAvailable("Baidu2") ? "Baidu2" : (helperAvailable("Baidu") ? "Baidu" : ""), native: !!baiduCookie(params), share: !!(line && line.shareUrl) });
  if (!helper && baiduCookie(params)) {
    var uidPromise = baiduGetUid(params);
    var rawVideos = await baiduListShareVideos(line.shareUrl, params);
    var videos = filterVideosForEpisode(rawVideos, params);
    if (!videos.length && rawVideos.length && !huajuanWantedEpisode(params)) {
      console.warn("[huajuan] baidu title filter fallback", {
        rawCount: rawVideos.length,
        lineTitle: line && line.title || "",
        sample: episodeSummary(rawVideos, function (video) {
          return [video && video.vod_group, helperItemName(video)].filter(Boolean).join(" ");
        })
      });
      videos = sortItemsByEpisodeDesc(rawVideos, function (video) {
        return [video && video.vod_group, helperItemName(video)].filter(Boolean).join(" ");
      });
    }
    console.log("[huajuan] baidu native videos", { rawCount: rawVideos.length, count: videos.length });
    var nativeMax = sourceLimitForPan("百度", params);
    var nativeOut = await baiduSourcesFromVideos(videos, line, params, uidPromise, nativeMax);
    console.log("[huajuan] baidu native result", { count: nativeOut.length, ms: Date.now() - baiduStartedAt });
    return nativeOut;
  }
  if (!helper || typeof helper.getShareData !== "function" || typeof helper.getAppShareUrl !== "function") {
    console.warn("[huajuan] baidu helper unavailable");
    return [];
  }
  var data = await helper.getShareData(line.shareUrl);
  var rawItems = flattenBaiduItems(data);
  var items = filterHelperItemsForEpisode(rawItems, params, line.title);
  if (!items.length && rawItems.length && !huajuanWantedEpisode(params)) {
    console.warn("[huajuan] baidu helper title filter fallback", { rawCount: rawItems.length, lineTitle: line && line.title || "" });
    items = rawItems.filter(function (item) { return isPlayableVideoName(helperItemName(item)); });
  }
  var maxFiles = sourceLimitForPan("百度", params);
  var out = [];
  for (var i = 0; i < items.length && out.length < maxFiles; i++) {
    var item = items[i] || {};
    var name = helperItemName(item);
    var size = helperItemSize(item);
    var path = item.path || item.Path || "";
    var uk = item.uk || item.ukey || item.user_id || item.userId || "";
    var shareId = item.shareid || item.share_id || item.shareId || "";
    var fsId = item.fsid || item.fs_id || item.fsId || item.id || "";
    if (!path || !uk || !shareId || !fsId) {
      console.warn("[huajuan] baidu item missing fields:", { hasPath: !!path, hasUk: !!uk, hasShareId: !!shareId, hasFsId: !!fsId });
      continue;
    }
    var url = await helper.getAppShareUrl(path, uk, shareId, fsId);
    if (!url) continue;
    var desc = [line.title, name, size ? "大小: " + size : "", line.shareUrl].filter(Boolean).join("\n");
    var source = await sourceFromDirect("花卷[盘] 百度 " + name + (size ? " " + size : ""), url, desc, baiduPlaybackHeaders(params), params, { name: name, size: helperItemSizeNumber(item) });
    if (source) out.push(source);
  }
  console.log("[huajuan] baidu direct result", { count: out.length, ms: Date.now() - baiduStartedAt });
  return out;
}

async function resolveWithHelpers(line, params) {
  var type = line && (line.panType || detectPanType(line.shareUrl));
  if (type !== "百度") return [];
  try {
    return await resolveBaiduDirect(line, params);
  } catch (e) {
    console.warn("[huajuan] baidu resolve failed:", e && e.message || e);
    return [];
  }
}

function fallbackSource(line, params) {
  return [];
}

async function resolveLine(line, params) {
  var sources = await resolvePlayableLine(line, params || {});
  return sources.length ? sources : fallbackSource(line, params || {});
}

async function resolvePlayableLine(line, params) {
  if (/^https?:\/\/.+\.(?:m3u8|mp4|mkv|mov|webm)(?:\?|$)/i.test(line.shareUrl)) {
    return [sourceFromUrl("花卷[盘] 直链", line.shareUrl, line.title)];
  }
  return resolveWithHelpers(line, params || {});
}

function huajuanSourceKey(source) {
  source = source || {};
  return source.name || source.description || source.url || "";
}

function filterLinesForEpisode(lines, params) {
  var wantEp = huajuanWantedEpisode(params);
  if (!wantEp) return lines;
  var matched = lines.filter(function (line) {
    var ep = huajuanExtractEpisode(line.title);
    return ep && ep === wantEp;
  });
  return matched.length ? matched : lines;
}

function buildSearchKeywords(params) {
  params = params || {};
  var keys = [];
  function add(v) {
    v = huajuanCleanTitle(v);
    if (v && keys.indexOf(v) < 0) keys.push(v);
  }
  var baseTitles = [];
  function addBase(v) {
    v = huajuanCleanTitle(v);
    if (v && baseTitles.indexOf(v) < 0) baseTitles.push(v);
    
    var nospace = v.replace(/\s+/g, "");
    if (nospace && nospace !== v && baseTitles.indexOf(nospace) < 0) baseTitles.push(nospace);
  }
  if (params.tmdbInfo) {
    addBase(params.tmdbInfo.title || params.tmdbInfo.name);
    addBase(params.tmdbInfo.originalTitle || params.tmdbInfo.originalName);
  }
  addBase(params.seriesName);
  addBase(params.title);
  addBase(params.name);
  var wantEp = huajuanWantedEpisode(params);
  var fast = fastLoadEnabled(params);
  var wantSeason = huajuanWantedSeason(params);
  
  if (wantSeason > 1) {
    var cjk = HUAJUAN_SEASON_CJK[wantSeason] || String(wantSeason);
    var seasonSuffixes = ["第" + cjk + "季", "第" + wantSeason + "季", String(wantSeason)];
    
    var romanForKw = { 2: ["Ⅱ", "II"], 3: ["Ⅲ", "III"], 4: ["Ⅳ", "IV"], 5: ["Ⅴ", "V"] }[wantSeason];
    if (romanForKw) seasonSuffixes = seasonSuffixes.concat(romanForKw);
    seasonSuffixes.push("Part " + wantSeason);
    for (var ssi = 0; ssi < seasonSuffixes.length; ssi++) {
      for (var si = 0; si < baseTitles.length; si++) {
        var skw = huajuanText(baseTitles[si] + seasonSuffixes[ssi]).trim();
        if (skw && keys.indexOf(skw) < 0) keys.push(skw);
      }
    }
  }
  if (wantEp && !fast) {
    for (var bi = 0; bi < baseTitles.length; bi++) {
      add(baseTitles[bi] + " 第" + wantEp + "集");
      add(baseTitles[bi] + " " + wantEp);
    }
  }
  for (var bj = 0; bj < baseTitles.length; bj++) add(baseTitles[bj]);
  if (wantEp && fast) {
    for (var fk = 0; fk < baseTitles.length; fk++) {
      add(baseTitles[fk] + " 第" + wantEp + "集");
      add(baseTitles[fk] + " " + wantEp);
    }
  }
  add(params.episodeName);
  add(searchKeywordFromParams(params));
  return keys;
}

function searchKeywordFromParams(params) {
  params = params || {};
  return huajuanText(params.keyword || params.searchWord || params.search_word || params.search_query
    || params.query || params.q || params.wd || params.text || "");
}

function debugParamsSummary(params) {
  params = params || {};
  var keys = [];
  for (var k in params) {
    if (Object.prototype.hasOwnProperty.call(params, k)) keys.push(k);
  }
  keys.sort();
  var interesting = [
    "title", "seriesName", "name", "type", "season", "tmdbId", "imdbId",
    "duration", "durationText", "durationSeconds", "runtime", "runtimeMinutes",
    "episode", "episodeNumber", "episode_number",
    "episodeNo", "episodeIndex", "episodeSort", "currentEpisode", "playEpisode",
    "ep", "sort", "episodeName", "episodeTitle", "subtitle", "remark", "link", "id",
    "quality_tag", "tmdbInfo", "mediaInfo", "episodeInfo", "selectedEpisode",
    "mediaSource", "mediaSources", "currentProvider", "currentResolutionInfo"
  ];
  var values = {};
  for (var i = 0; i < interesting.length; i++) {
    var key = interesting[i];
    if (!Object.prototype.hasOwnProperty.call(params, key)) continue;
    var value = params[key];
    if (/cookie|token|ut/i.test(key)) {
      values[key] = value ? "[set]" : "";
    } else if (value && typeof value === "object") {
      try { values[key] = JSON.stringify(value).slice(0, 220); } catch (e) { values[key] = "[object]"; }
    } else {
      values[key] = huajuanText(value).slice(0, 120);
    }
  }
  return { keys: keys.join(","), values: values };
}

async function search(params) {
  params = params || {};
  huajuanSyncParams(params);
  var keyword = searchKeywordFromParams(params);
  if (!keyword) return [];
  return huajuanSearchAll(keyword, params);
}

async function loadDetail(link) {
  var params = HUAJUAN_RUNTIME_PARAMS || {};
  var detail = await huajuanLoadDetailObject(link, params);
  var lines = preferredOnlyLines(filterLinesForEpisode(detail.lines || [], params), params);
  var childItems = [];
  var seenSources = {};
  var seenSourceSizes = {};
  var panCounts = {};
  for (var i = 0; i < lines.length; i++) {
    var panType = lines[i] && (lines[i].panType || detectPanType(lines[i].shareUrl)) || "";
    if ((panCounts[panType] || 0) >= sourceLimitForPan(panType, params)) continue;
    var sources = await resolvePlayableLine(lines[i], params);
    for (var si = 0; si < sources.length; si++) {
      if ((panCounts[panType] || 0) >= sourceLimitForPan(panType, params)) break;
      var key = huajuanSourceKey(sources[si]);
      if (seenSources[key]) continue;
      var sizeKey = sourceSizeDedupeKey(sources[si]);
      if (sizeKey && seenSourceSizes[sizeKey]) continue;
      seenSources[key] = true;
      if (sizeKey) seenSourceSizes[sizeKey] = true;
      panCounts[panType] = (panCounts[panType] || 0) + 1;
      childItems.push({
        id: sources[si].id || String(link) + "#" + i + "." + si,
        type: "url",
        title: sources[si].name,
        name: sources[si].name,
        video: sources[si].video,
        audio: sources[si].audio,
        fileName: sources[si].fileName,
        FileName: sources[si].FileName,
        filename: sources[si].filename,
        file_name: sources[si].file_name,
        server_filename: sources[si].server_filename,
        originalFileName: sources[si].originalFileName,
        serverFileName: sources[si].serverFileName,
        subTitle: sources[si].subTitle,
        subtitle: sources[si].subtitle,
        remark: sources[si].remark,
        description: sources[si].description,
        quality: sources[si].quality,
        qualityName: sources[si].qualityName,
        qualityLabel: sources[si].qualityLabel,
        qualityTitle: sources[si].qualityTitle,
        label: sources[si].label,
        format: sources[si].format,
        resolution: sources[si].resolution,
        resolutionText: sources[si].resolutionText,
        renderSize: sources[si].renderSize,
        renderSizeText: sources[si].renderSizeText,
        width: sources[si].width,
        height: sources[si].height,
        url: sources[si].url,
        link: sources[si].link || sources[si].url,
        videoUrl: sources[si].url,
        header: sources[si].header,
        headers: sources[si].headers,
        customHeaders: sources[si].customHeaders,
        fastPlayMode: sources[si].fastPlayMode,
        fastplay: sources[si].fastplay,
        speedup: sources[si].speedup,
        speedupEnabled: sources[si].speedupEnabled,
        multiThread: sources[si].multiThread,
        multiThreadMode: sources[si].multiThreadMode,
        isMulti: sources[si].isMulti,
        isVideo: sources[si].isVideo,
        threads: sources[si].threads,
        thread: sources[si].thread,
        threadCount: sources[si].threadCount,
        threadNum: sources[si].threadNum,
        downloadThreads: sources[si].downloadThreads,
        downloadThreadCount: sources[si].downloadThreadCount,
        maxThreadCount: sources[si].maxThreadCount,
        poolSize: sources[si].poolSize,
        chunkSize: sources[si].chunkSize,
        chunk_size: sources[si].chunk_size,
        chunk: sources[si].chunk,
        segmentSize: sources[si].segmentSize,
        downloadChunkSize: sources[si].downloadChunkSize,
        rangeSize: sources[si].rangeSize,
        dataSize: sources[si].dataSize,
        realSize: sources[si].realSize,
        RealSize: sources[si].RealSize,
        actualSize: sources[si].actualSize,
        ActualSize: sources[si].ActualSize,
        actualFileSize: sources[si].actualFileSize,
        fileRealSize: sources[si].fileRealSize,
        sourceSize: sources[si].sourceSize,
        originalSize: sources[si].originalSize,
        size: sources[si].size,
        fileSize: sources[si].fileSize,
        file_size: sources[si].file_size,
        videoFileSize: sources[si].videoFileSize,
        videoFileSizeText: sources[si].videoFileSizeText,
        resolutionVideoFileSize: sources[si].resolutionVideoFileSize,
        maxFileSize: sources[si].maxFileSize,
        isFirstFileSize: sources[si].isFirstFileSize,
        bitrate: sources[si].bitrate,
        bitRate: sources[si].bitRate,
        BitRate: sources[si].BitRate,
        Bitrate: sources[si].Bitrate,
        videoRate: sources[si].videoRate,
        videoBitRate: sources[si].videoBitRate,
        videoBitrate: sources[si].videoBitrate,
        videoBitRateText: sources[si].videoBitRateText,
        bitrateLabel: sources[si].bitrateLabel,
        videoPixelSize: sources[si].videoPixelSize,
        videoTitle: sources[si].videoTitle,
        videoRange: sources[si].videoRange,
        VideoRange: sources[si].VideoRange,
        videoRangeScore: sources[si].videoRangeScore,
        resolutionId: sources[si].resolutionId,
        mediaSourceId: sources[si].mediaSourceId,
        MediaSourceId: sources[si].MediaSourceId,
        mediaSource: sources[si].mediaSource,
        MediaSource: sources[si].MediaSource,
        mediaSources: sources[si].mediaSources,
        MediaSources: sources[si].MediaSources,
        mediaStreams: sources[si].mediaStreams,
        MediaStreams: sources[si].MediaStreams,
        RunTimeTicks: sources[si].RunTimeTicks,
        runTimeTicks: sources[si].runTimeTicks,
        providerId: sources[si].providerId,
        sourceId: sources[si].sourceId,
        sourceType: sources[si].sourceType,
        isBest: sources[si].isBest,
        _isBest: sources[si]._isBest,
        isResolutionChecked: sources[si].isResolutionChecked,
        playerType: sources[si].playerType || "system"
      });
    }
  }
  detail.childItems = sortSourcesByPan(childItems, params);
  delete detail.lines;
  return detail;
}

async function resolveDeferredResource(params, link) {
  var route = huajuanParseResolveLink(link);
  if (!route) return [];
  var line = {
    title: route.title || route.detailTitle || "花卷[盘]",
    shareUrl: route.shareUrl,
    panType: route.panType || detectPanType(route.shareUrl)
  };
  console.log("[huajuan] deferred resolve", { panType: line.panType, title: line.title || "" });
  var sources = await resolvePlayableLine(line, params || {});
  for (var i = 0; i < sources.length; i++) {
    sources[i].description = withMediaTagsFirst(sources[i], [
      route.keyword ? "搜索词: " + route.keyword : "",
      route.detailTitle ? "命中: " + route.detailTitle : ""
    ]);
  }
  return sources;
}

function resourceCacheKey(params, panType) {
  params = params || {};
  return [
    WidgetMetadata && WidgetMetadata.version || "",
    "百度",
    params.title || "",
    params.seriesName || "",
    params.name || "",
    params.episodeName || "",
    huajuanWantedEpisode(params) || params.episode || "",
    huajuanWantedSeason(params) || "",
    huajuanHost(params),
    huajuanPanHosts(params).join(","),
    params.baidu_max_files || HUAJUAN_BUILTIN_BAIDU_MAX_FILES,
    candidateScanLimit(params),
    params.search_extra_after_hit || HUAJUAN_BUILTIN_SEARCH_EXTRA_AFTER_HIT,
    loadSpeedMode(params),
    sourceQualityConfig(params).value,
    !!baiduCookie(params)
  ].join("||");
}

function sourcePanType(source) {
  source = source || {};
  return source.panType || sourcePanLabel(source.displayName || source.name || source.title || "");
}

function sourceSizeNumber(source) {
  source = source || {};
  return Number(
    source.realSize || source.RealSize || source.actualSize || source.ActualSize ||
    source.actualFileSize || source.fileRealSize || source.sourceSize || source.originalSize ||
    source.size || source.fileSize || source.file_size || source.videoFileSize ||
    source.resolutionVideoFileSize || source.maxFileSize || 0
  ) || 0;
}

function sourceSizeDedupeKey(source) {
  var size = sourceSizeNumber(source);
  return size > 0 ? String(Math.round(size)) : "";
}

function sourceDebugSummary(source) {
  source = source || {};
  var url = String(source.url || source.videoUrl || "");
  var host = "";
  try { host = new URL(url.split("#")[0]).host; } catch (e) {}
  return {
    name: source.name || source.title || "",
    fileName: source.fileName || source.filename || source.file_name || source.server_filename || "",
    host: host,
    realSize: source.realSize || source.actualSize || source.sourceSize || 0,
    displaySize: source.size || source.fileSize || source.videoFileSize || 0,
    hasFilenameHint: /(?:^|[&#])(?:filename|fileName|server_filename)=/i.test(url),
    resolutionId: source.resolutionId || "",
    video: source.video || null,
    audio: source.audio || null,
    playerType: source.playerType || ""
  };
}

function sortSourcesByPan(sources, params) {
  return (Array.isArray(sources) ? sources : []).slice().sort(function (a, b) {
    var panDelta = panPriority(sourcePanType(a), params) - panPriority(sourcePanType(b), params);
    if (panDelta) return panDelta;
    return sourceSizeNumber(b) - sourceSizeNumber(a);
  });
}

async function loadResourceForPan(params, panType) {
  return loadResourceAll(params || {}, "百度");
}

async function loadBaiduResource(params) {
  return loadResourceForPan(params, "百度");
}

async function loadResource(params) {
  return loadResourceForPan(params, "百度");
}

async function loadResourceAll(params, panType) {
  params = params || {};
  huajuanSyncParams(params);
  panType = "百度";
  var key = resourceCacheKey(params, panType);
  var cached = huajuanCacheGet(HUAJUAN_RESOURCE_CACHE, key);
  if (cached) return cached;
  var promise = loadResourceUncached(Object.assign({}, params), panType).then(function (list) {
    
    if (!list || !list.length) delete HUAJUAN_RESOURCE_CACHE[key];
    return list;
  }).catch(function (e) {
    delete HUAJUAN_RESOURCE_CACHE[key];
    throw e;
  });
  return huajuanCacheSet(HUAJUAN_RESOURCE_CACHE, key, promise);
}

function addSearchCandidates(results, keyword, params, candidates, seenCandidate, scanLimit) {
  var before = candidates.length;
  var ranked = huajuanRankItems(results || [], params, keyword);
  for (var ri = 0; ri < ranked.length && candidates.length < scanLimit; ri++) {
    var item = ranked[ri] || {};
    var cKey = item.link || item.id || item.title || "";
    if (!cKey || seenCandidate[cKey]) continue;
    seenCandidate[cKey] = true;
    item._huajuanKeyword = keyword;
    candidates.push(item);
  }
  return candidates.length - before;
}

async function searchKeywordForResource(keyword, params) {
  var searchStartedAt = Date.now();
  var searchParams = Object.assign({}, params || {}, { _huajuanHttpTimeoutMs: HUAJUAN_RESOURCE_SEARCH_TIMEOUT_MS });
  var results = await huajuanSearchAll(keyword, searchParams);
  console.log("[huajuan] search", {
    keyword: keyword,
    count: results.length,
    ms: Date.now() - searchStartedAt,
    timeoutMs: HUAJUAN_RESOURCE_SEARCH_TIMEOUT_MS
  });
  return { keyword: keyword, results: results };
}

async function searchCandidatesForResource(keywords, params, scanLimit) {
  var startedAt = Date.now();
  var fast = fastLoadEnabled(params);
  var seenCandidate = {};
  console.log("[huajuan] keyword search concurrent", {
    mode: loadSpeedMode(params),
    concurrency: keywords.length,
    timeoutMs: HUAJUAN_RESOURCE_SEARCH_TIMEOUT_MS
  });
  var tasks = keywords.map(function (keyword, index) {
    return searchKeywordForResource(keyword, params).then(function (result) {
      result.index = index;
      return result;
    }).catch(function (e) {
      console.warn("[huajuan] search failed", { keyword: keyword, message: e && e.message || String(e) });
      return { keyword: keyword, results: [], index: index };
    });
  });

  if (fast) {
    return new Promise(function (resolve) {
      var done = false;
      var pending = tasks.length;
      var completed = [];
      function finish(payload) {
        if (done) return;
        done = true;
        resolve(payload);
      }
      
      var firstHitAt = 0;
      var firstHitResult = null;
      function tryFinishWithGrace() {
        if (done) return;
        var candidates = [];
        var localSeen = {};
        
        var ordered = [];
        for (var i = 0; i < completed.length; i++) {
          if (completed[i]) ordered.push(completed[i]);
        }
        ordered.sort(function (a, b) { return a.index - b.index; });
        for (var oi = 0; oi < ordered.length; oi++) {
          addSearchCandidates(ordered[oi].results, ordered[oi].keyword, params, candidates, localSeen, scanLimit);
        }
        if (candidates.length) {
          console.log("[huajuan] fast search grace merged", {
            keywords: ordered.length,
            candidateCount: candidates.length,
            ms: Date.now() - startedAt
          });
          finish({ candidates: candidates, usedKeyword: candidates[0] && candidates[0]._huajuanKeyword || "" });
        }
      }
      tasks.forEach(function (task) {
        task.then(function (result) {
          completed[result.index] = result;
          var probe = [];
          var probeSeen = {};
          addSearchCandidates(result.results, result.keyword, params, probe, probeSeen, scanLimit);
          if (probe.length && !firstHitAt) {
            firstHitAt = Date.now();
            firstHitResult = result;
            console.log("[huajuan] fast search first hit", {
              keyword: result.keyword,
              candidateCount: probe.length,
              ms: firstHitAt - startedAt
            });
            
            huajuanSleep(1500).then(tryFinishWithGrace);
          }
        }).then(function () {
          pending--;
          if (pending <= 0 && !done) {
            tryFinishWithGrace();
            if (!done) {
              var fallback = [];
              for (var i = 0; i < completed.length && fallback.length < scanLimit; i++) {
                if (!completed[i]) continue;
                addSearchCandidates(completed[i].results, completed[i].keyword, params, fallback, seenCandidate, scanLimit);
              }
              finish({ candidates: fallback, usedKeyword: fallback[0] && fallback[0]._huajuanKeyword || "" });
            }
          }
        });
      });
    });
  }

  var all = await Promise.all(tasks);
  all.sort(function (a, b) { return a.index - b.index; });
  var candidates = [];
  for (var i = 0; i < all.length && candidates.length < scanLimit; i++) {
    addSearchCandidates(all[i].results, all[i].keyword, params, candidates, seenCandidate, scanLimit);
  }
  return { candidates: candidates, usedKeyword: candidates[0] && candidates[0]._huajuanKeyword || "" };
}

async function loadResourceUncached(params, targetPanType) {
  var startedAt = Date.now();
  params = params || {};
  targetPanType = "百度";
  params._huajuanResourceLoad = true;
  huajuanSyncParams(params);
  if (!canResolvePanType("百度", params)) {
    console.warn("[huajuan] 百度 Cookie 未配置且无 Baidu/Baidu2 helper，无法解析网盘分享，聚合将返回空。请在插件参数中填写「百度 Cookie」。");
  }
  if (targetPanType && !panEnabled(targetPanType, params)) {
    console.log("[huajuan] loadResource skipped disabled pan", { targetPanType: targetPanType });
    return [];
  }
  var keywords = buildSearchKeywords(params);
  var speedMode = loadSpeedMode(params);
  var extraAfterHit = searchExtraAfterHit(params);
  console.log("[huajuan] loadResource", {
    version: WidgetMetadata.version,
    targetPanType: targetPanType,
    title: params.title || params.seriesName || params.name || "",
    episode: huajuanWantedEpisode(params) || params.episode || "",
    season: huajuanWantedSeason(params) || "",
    paramsSummary: debugParamsSummary(params),
    keywords: keywords.join("|"),
    keywordCount: keywords.length,
    hasBaiduCookie: !!baiduCookie(params),
    enableBaidu: panEnabled("百度", params),
    hasBaiduHelper: helperAvailable("Baidu2") || helperAvailable("Baidu"),
    speedMode: speedMode,
    scanLimit: candidateScanLimit(params),
    extraAfterHit: extraAfterHit
  });
  if (!keywords.length) return [];

  var candidates = [];
  var usedKeyword = "";
  var scanLimit = candidateScanLimit(params);
  var searchResult = await searchCandidatesForResource(keywords, params, scanLimit);
  candidates = searchResult.candidates || [];
  usedKeyword = searchResult.usedKeyword || "";
  if (!candidates.length) {
    console.log("[huajuan] no best match");
    return [];
  }
  console.log("[huajuan] candidates", { keyword: usedKeyword, count: candidates.length, scanLimit: scanLimit });

  var out = [];
  var seenSources = {};
  var seenSourceSizes = {};
  var panCounts = {};
  var lastNewCandidateIndex = -1;
  var scannedCandidates = 0;
  for (var ci = 0; ci < candidates.length; ci++) {
    var best = candidates[ci];
    if (!best || !best.link) continue;
    var beforeCandidateCount = out.length;
    var detailStartedAt = Date.now();
    var detail = await huajuanLoadDetailObject(best.link, params);
    var detailMs = Date.now() - detailStartedAt;
    var sourceKeyword = best._huajuanKeyword || usedKeyword;
    var rawLines = filterLinesForEpisode(detail.lines || [], params);
    
    var wantSeason = huajuanWantedSeason(params);
    if (wantSeason > 0) {
      var seasonLines = rawLines.filter(function (line) {
        return huajuanExtractSeason((line && line.title) || "", detail.title || "") === wantSeason;
      });
      if (seasonLines.length) rawLines = seasonLines;
    }
    if (targetPanType) {
      rawLines = rawLines.filter(function (line) {
        return (line && (line.panType || detectPanType(line.shareUrl)) || "") === targetPanType;
      });
    }
    var lines = preferredOnlyLines(rawLines, params);
    console.log("[huajuan] detail lines", {
      title: detail.title || "",
      source: huajuanOrigin(best.link),
      rawCount: rawLines.length,
      rawPanTypes: panTypesSummary(rawLines),
      count: lines.length,
      panTypes: panTypesSummary(lines),
      ms: detailMs
    });
    var lineConcurrency = fastLoadEnabled(params) ? 1 : BAIDU_DIRECT_CONCURRENCY_FULL;
    if (lines.length) {
      console.log("[huajuan] line resolve concurrency", {
        mode: loadSpeedMode(params),
        concurrency: lineConcurrency,
        lines: lines.length
      });
    }
    for (var li = 0; li < lines.length;) {
      var jobs = [];
      var reservedPanCounts = {};
      while (li < lines.length && jobs.length < lineConcurrency) {
        var line = lines[li++];
        var jobPanType = line && (line.panType || detectPanType(line.shareUrl)) || "";
        var panLimit = sourceLimitForPan(jobPanType, params);
        var reserved = reservedPanCounts[jobPanType] || 0;
        if ((panCounts[jobPanType] || 0) + reserved >= panLimit) {
          console.log("[huajuan] skip pan limit", { panType: jobPanType, title: detail.title || "", limit: panLimit });
          continue;
        }
        reservedPanCounts[jobPanType] = reserved + 1;
        jobs.push({ line: line, panType: jobPanType });
      }
      if (!jobs.length) continue;
      var resolvedJobs = await Promise.all(jobs.map(function (job) {
        var resolveStartedAt = Date.now();
        return resolvePlayableLine(job.line, params).then(function (sources) {
          console.log("[huajuan] resolved pan", { panType: job.panType, sourceCount: sources.length, ms: Date.now() - resolveStartedAt });
          return { line: job.line, panType: job.panType, sources: sources || [] };
        }).catch(function (e) {
          console.warn("[huajuan] resolved pan failed", { panType: job.panType, message: e && e.message || String(e) });
          return { line: job.line, panType: job.panType, sources: [] };
        });
      }));
      for (var rj = 0; rj < resolvedJobs.length; rj++) {
        var resolved = resolvedJobs[rj] || {};
        var panType = resolved.panType || "";
        var sources = resolved.sources || [];
        if (!fastLoadEnabled(params) && !sources.length && resolved.line) {
          var retryStartedAt = Date.now();
          sources = await resolvePlayableLine(resolved.line, params).catch(function (e) {
            console.warn("[huajuan] resolved pan retry failed", { panType: panType, message: e && e.message || String(e) });
            return [];
          });
          console.log("[huajuan] resolved pan retry", { panType: panType, sourceCount: sources.length, ms: Date.now() - retryStartedAt });
        }
        for (var si = 0; si < sources.length; si++) {
          if ((panCounts[panType] || 0) >= sourceLimitForPan(panType, params)) break;
          sources[si].description = withMediaTagsFirst(sources[si], [
            "搜索词: " + usedKeyword,
            sourceKeyword && sourceKeyword !== usedKeyword ? "命中词: " + sourceKeyword : "",
            "来源: " + (huajuanOrigin(best.link) || ""),
            "命中: " + (detail.title || best.title || "")
          ]);
          var key = huajuanSourceKey(sources[si]);
          if (seenSources[key]) continue;
          var sizeKey = sourceSizeDedupeKey(sources[si]);
          if (sizeKey && seenSourceSizes[sizeKey]) {
            console.log("[huajuan] skip duplicate size", {
              size: huajuanCompactSizeText(huajuanSizeText(sourceSizeNumber(sources[si]))),
              name: sources[si].name || ""
            });
            continue;
          }
          seenSources[key] = true;
          if (sizeKey) seenSourceSizes[sizeKey] = true;
          panCounts[panType] = (panCounts[panType] || 0) + 1;
          out.push(sources[si]);
        }
      }
    }
    scannedCandidates++;
    if (out.length > beforeCandidateCount) lastNewCandidateIndex = ci;
    if (panLimitsReached(panCounts, params, targetPanType)) {
      console.log("[huajuan] stop pan limits reached", { scanned: scannedCandidates, panCounts: panCounts });
      break;
    }
    if (lastNewCandidateIndex >= 0 && (extraAfterHit === 0 || ci > lastNewCandidateIndex) && ci - lastNewCandidateIndex >= extraAfterHit) {
      console.log("[huajuan] stop after hit window", {
        scanned: scannedCandidates,
        extraAfterHit: extraAfterHit,
        lastNewCandidateIndex: lastNewCandidateIndex,
        panCounts: panCounts
      });
      break;
    }
  }
  out = sortSourcesByPan(out, params);
  console.log("[huajuan] loadResource result", {
    count: out.length,
    panTypes: panTypesSummary(out),
    scanned: scannedCandidates,
    ms: Date.now() - startedAt,
    sources: out.slice(0, 6).map(sourceDebugSummary)
  });
  return out;
}

  return {
    metadata: WidgetMetadata,
    search: (typeof search === "function") ? search : null,
    loadDetail: (typeof loadDetail === "function") ? loadDetail : null,
    loadResource: (typeof loadResource === "function") ? loadResource : null
  };
})();

var JUHE_MOD_huban = (function () {
  var WidgetMetadata;
WidgetMetadata = {
  id: "forward.huban.baidu",
  title: "虎斑",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  description: "搜索虎斑[盘]影视资源，解析百度网盘分享并返回可播放源。",
  author: "夏恩",
  site: "https://github.com/InchStudio/ForwardWidgets",
  detailCacheDuration: 3600,
  globalParams: [
    { name: "host", title: "站点地址", type: "input", value: "http://43.248.128.118:16969" },
    { name: "pan_hosts", title: "备用网盘站", type: "input", value: "" },
    { name: "baidu_cookie", title: "百度 Cookie", type: "input", value: "" },
    { name: "baidu_max_files", title: "百度最多解析", type: "input", value: "2" },
    { name: "search_extra_after_hit", title: "命中后继续扫描", type: "input", value: "3" },
    {
      name: "load_speed_mode",
      title: "加载速度",
      type: "enumeration",
      value: "fast",
      enumOptions: [
        { title: "极速（找到一个就返回）", value: "fast" },
        { title: "普通（返回多个大小）", value: "full" }
      ]
    },
    {
      name: "quality_tag",
      title: "清晰度标签",
      type: "enumeration",
      value: "8k",
      enumOptions: [
        { title: "8K", value: "8k" },
        { title: "4K", value: "4k" },
        { title: "1080P", value: "1080p" },
        { title: "其他", value: "other" }
      ]
    }
  ],
  modules: [
    {
      id: "loadResource",
      title: "虎斑[盘]",
      description: "按当前影片详情自动搜索虎斑[盘]并返回百度网盘播放源",
      functionName: "loadResource",
      type: "stream",
      cacheDuration: 3600,
      params: []
    }
  ],
  search: {
    title: "搜索虎斑[盘]",
    functionName: "search",
    params: [
      { name: "keyword", title: "关键词", type: "input", value: "" },
      { name: "page", title: "页码", type: "page", value: "1" }
    ]
  }
};

var HUBAN_RUNTIME_PARAMS = {};
var HUBAN_SEARCH_CACHE = {};
var HUBAN_DETAIL_CACHE = {};
var HUBAN_RESOURCE_CACHE = {};
var HUBAN_RESOLVE_SCHEME = "hubanresolve://";
var HUBAN_PRIMARY_HOST = "http://43.248.128.118:16969";
var HUBAN_DEFAULT_PAN_HOSTS = [];
var HUBAN_BUILTIN_LOAD_SPEED_MODE = "fast";
var HUBAN_BUILTIN_BAIDU_MAX_FILES = 2;
var HUBAN_BUILTIN_SEARCH_EXTRA_AFTER_HIT = 3;
var HUBAN_BUILTIN_CANDIDATE_SCAN_LIMIT = 40;
var HUBAN_BUILTIN_QUALITY_TAG = "8k";
var HUBAN_CACHE_TTL_MS = 3600 * 1000;
var HUBAN_RESOURCE_SEARCH_TIMEOUT_MS = 6000;
var BAIDU_DIRECT_CONCURRENCY_FULL = 4;
var BAIDU_UID_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
var BAIDU_SHARE_CACHE = {};
var BAIDU_UID_CACHE = {};
var BAIDU_UID_PENDING_CACHE = {};
var BAIDU_VIDEO_LIST_CACHE = {};
var BAIDU_DIRECT_CACHE = {};
var BAIDU_UZ_DEVUID = "73CED981D0F186D12BC18CAE1684FFD5|VSRCQTF6W";

var HUBAN_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
};

function hubanText(v) {
  return String(v == null ? "" : v).replace(/\s+/g, " ").trim();
}

function hubanCacheGetWithTtl(cache, key, ttlMs) {
  var entry = cache && cache[key];
  if (!entry) return null;
  if (Date.now() - entry.time > ttlMs) {
    delete cache[key];
    return null;
  }
  return entry.value;
}

function hubanCacheGet(cache, key) {
  return hubanCacheGetWithTtl(cache, key, HUBAN_CACHE_TTL_MS);
}

function hubanCacheSet(cache, key, value) {
  cache[key] = { time: Date.now(), value: value };
  return value;
}

function hubanStorageGet(key, ttlMs) {
  try {
    if (typeof Widget === "undefined" || !Widget.storage || typeof Widget.storage.get !== "function") return null;
    var raw = Widget.storage.get(key);
    if (!raw) return null;
    var entry = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (!entry || typeof entry !== "object" || !entry.time) return null;
    if (Date.now() - Number(entry.time || 0) > ttlMs) return null;
    return entry.value == null ? null : entry.value;
  } catch (e) {
    return null;
  }
}

function hubanStorageSet(key, value) {
  try {
    if (typeof Widget === "undefined" || !Widget.storage || typeof Widget.storage.set !== "function") return false;
    Widget.storage.set(key, JSON.stringify({ time: Date.now(), value: value }));
    return true;
  } catch (e) {
    return false;
  }
}

function hubanHost(params) {
  return String((params && params.host) || HUBAN_RUNTIME_PARAMS.host || HUBAN_PRIMARY_HOST).replace(/\/+$/, "");
}

function hubanOrigin(url) {
  try {
    return new URL(String(url || "")).origin;
  } catch (e) {
    return "";
  }
}

function hubanSplitHosts(text) {
  var out = [];
  String(text || "").split(/[,，\s]+/).forEach(function (host) {
    host = hubanText(host).replace(/\/+$/, "");
    if (!host) return;
    if (!/^https?:\/\//i.test(host)) host = "https://" + host;
    if (out.indexOf(host) < 0) out.push(host);
  });
  return out;
}

function hubanPanHosts(params) {
  var out = [];
  function add(host) {
    host = String(host || "").replace(/\/+$/, "");
    if (host && out.indexOf(host) < 0) out.push(host);
  }
  add(hubanHost(params));
  var configured = hubanSplitHosts((params && params.pan_hosts) || HUBAN_RUNTIME_PARAMS.pan_hosts || "");
  if (!configured.length) configured = HUBAN_DEFAULT_PAN_HOSTS;
  for (var i = 0; i < configured.length; i++) add(configured[i]);
  return out;
}

function loadSpeedMode(params) {
  var value = hubanText((params && params.load_speed_mode) || HUBAN_RUNTIME_PARAMS.load_speed_mode || HUBAN_BUILTIN_LOAD_SPEED_MODE).toLowerCase();
  return /^(full|complete|all|slow|off)$/i.test(value) ? "full" : "fast";
}

function fastLoadEnabled(params) {
  return loadSpeedMode(params) === "fast";
}

function fastResourceSearchEnabled(params) {
  return !!(params && params._hubanResourceLoad);
}

function hubanParamsForHost(params, host) {
  var next = Object.assign({}, params || {});
  next.host = String(host || "").replace(/\/+$/, "") || hubanHost(params);
  return next;
}

function hubanSyncParams(params) {
  params = params || {};
  for (var k in params) {
    if (Object.prototype.hasOwnProperty.call(params, k)) HUBAN_RUNTIME_PARAMS[k] = params[k];
  }
  ensureEnvShim();
}

function ensureEnvShim() {
  var g = typeof globalThis !== "undefined" ? globalThis : this;
  if (!g.ENV) {
    g.ENV = {
      get: function (key) {
        return HUBAN_RUNTIME_PARAMS[key] || "";
      }
    };
  }
}

function hubanAbsUrl(url, params) {
  if (!url) return "";
  url = String(url);
  if (/^https?:\/\//i.test(url)) return url;
  if (url.indexOf("//") === 0) return "https:" + url;
  if (url.charAt(0) !== "/") url = "/" + url;
  return hubanHost(params) + url;
}

function hubanCleanTitle(title) {
  return hubanText(title)
    .replace(/^立刻播放/, "")
    .replace(/^下载/, "")
    .replace(/\s*-\s*第\d+集$/, "")
    .replace(/第[一二三四五六七八九十0-9]+季/g, "")
    .replace(/\bS\d{1,2}\b/ig, "")
    .trim();
}

function hubanNorm(text) {
  return hubanCleanTitle(text).toLowerCase()
    .replace(/[\s·•・:：\-–—_!！?？.,，。、"'`~()（）\[\]【】]/g, "");
}

function hubanYear(text) {
  var m = String(text || "").match(/\b(19|20)\d{2}\b/);
  return m ? m[0] : "";
}

function hubanToInt(v, defVal) {
  var n = parseInt(String(v == null ? "" : v).trim(), 10);
  return Number.isFinite(n) ? n : (defVal || 0);
}

function hubanBoundInt(v, defVal, minVal, maxVal) {
  var n = hubanToInt(v, defVal);
  if (minVal != null && n < minVal) n = minVal;
  if (maxVal != null && n > maxVal) n = maxVal;
  return n;
}

function hubanSleep(ms) {
  var g = typeof globalThis !== "undefined" ? globalThis : this;
  var timer = g && g.setTimeout;
  if (typeof timer === "function") {
    return new Promise(function (resolve) { timer.call(g, resolve, ms || 0); });
  }
  var end = Date.now() + Math.max(0, ms || 0);
  while (Date.now() < end) {}
  return Promise.resolve();
}

function hubanHttpTimeout(params, defVal) {
  return hubanBoundInt(params && params._hubanHttpTimeoutMs, defVal || 20000, 2000, 30000);
}

function hubanSizeText(bytes) {
  var n = Number(bytes || 0);
  if (!n || !Number.isFinite(n)) return "";
  var units = ["B", "KB", "MB", "GB", "TB", "PB"];
  var i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n = n / 1024;
    i++;
  }
  return (i ? n.toFixed(2) : String(Math.round(n))) + " " + units[i];
}

function hubanCompactSizeText(text) {
  return hubanText(text).replace(/\s+(B|KB|MB|GB|TB|PB)$/i, "$1");
}

function hubanExtractEpisode(text) {
  var s = String(text || "");
  var m = s.match(/第\s*(\d{1,4})\s*[集话期]/);
  if (m) return hubanValidEpisodeNumber(m[1]);
  m = s.match(/\bS\d{1,2}E(\d{1,4})\b/i);
  if (m) return hubanValidEpisodeNumber(m[1]);
  m = s.match(/\bEP?\s*(\d{1,4})\b/i);
  if (m) return hubanValidEpisodeNumber(m[1]);
  var base = s.split(/[\\/]/).pop().replace(/\.(?:mp4|mkv|avi|mov|m4v|ts|m2ts|flv|wmv|webm|rmvb)$/i, "");
  m = base.match(/(?:^|[\s._\-\[\(])0*(\d{1,4})(?=$|[\s._\-\]\)集话期])/);
  if (m) return hubanValidEpisodeNumber(m[1]);
  m = base.match(/(?:^|[\s._\-\[\(])0*(\d{1,4})x$/i);
  if (m) return hubanValidEpisodeNumber(m[1]);
  m = base.match(/^0*(\d{1,4})x$/i);
  if (m) return hubanValidEpisodeNumber(m[1]);
  m = base.match(/[\u4e00-\u9fa5][^\d]{0,12}0*(\d{1,4})(?=$|[^\d])/);
  if (m) return hubanValidEpisodeNumber(m[1]);
  return 0;
}

function hubanValidEpisodeNumber(v) {
  var n = hubanToInt(v, 0);
  if (!n) return 0;
  if (n >= 1900 && n <= 2099) return 0;
  return n;
}

var HUBAN_SEASON_CJK = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十",
  "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十"];

function hubanWantedSeason(params) {
  params = params || {};
  var keys = ["season", "seasonNumber", "season_number", "seasonNo", "season_no",
    "currentSeason", "current_season", "seasonIndex", "season_index"];
  for (var i = 0; i < keys.length; i++) {
    var n = hubanToInt(params[keys[i]], 0);
    if (n > 0) return n;
  }
  
  var baseTitle = params.seriesName || params.title || params.name || "";
  var textKeys = ["seasonName", "seasonTitle", "season_name", "season_title",
    "episodeName", "episodeTitle", "episode_name", "episode_title",
    "seriesName", "title", "name", "subtitle", "remark", "description"];
  for (var ti = 0; ti < textKeys.length; ti++) {
    var s = hubanExtractSeason(params[textKeys[ti]], baseTitle);
    if (s > 0) return s;
  }
  return hubanWantedSeasonNested(params, 0);
}

function hubanWantedSeasonNested(value, depth) {
  if (!value || depth > 3) return 0;
  if (Array.isArray(value)) {
    for (var ai = 0; ai < value.length; ai++) {
      var arrS = hubanWantedSeasonNested(value[ai], depth + 1);
      if (arrS) return arrS;
    }
    return 0;
  }
  if (typeof value !== "object") return 0;
  var numericKey = /(?:^|_)(?:season|seasonNumber|seasonNo|currentSeason)(?:$|_)/i;
  var textKey = /(?:season|episode|title|name|subtitle|remark|description)$/i;
  for (var k in value) {
    if (!Object.prototype.hasOwnProperty.call(value, k) || /cookie|token|header|auth|ut/i.test(k)) continue;
    var v = value[k];
    if (numericKey.test(k)) {
      var n = hubanToInt(v, 0);
      if (n > 0) return n;
    }
    if (textKey.test(k) && typeof v !== "object") {
      var s = hubanExtractSeason(v, "");
      if (s > 0) return s;
    }
  }
  var preferred = ["tmdbInfo", "mediaInfo", "item", "video", "currentItem", "episodeInfo", "selectedEpisode", "vod", "source", "context", "metadata"];
  for (var pi = 0; pi < preferred.length; pi++) {
    var childS = hubanWantedSeasonNested(value[preferred[pi]], depth + 1);
    if (childS) return childS;
  }
  return 0;
}

function hubanExtractSeason(text, baseTitle) {
  text = String(text || "");
  var m = text.match(/第\s*([一二三四五六七八九十\d]+)\s*季/);
  if (m) {
    var idx = HUBAN_SEASON_CJK.indexOf(m[1]);
    if (idx > 0) return idx;
    var n = parseInt(m[1], 10);
    if (n > 0) return n;
  }
  m = text.match(/(?:^|[^a-z0-9])s(\d{1,2})(?![0-9])/i);
  if (m) return parseInt(m[1], 10);
  m = text.match(/season\s*(\d{1,2})/i);
  if (m) return parseInt(m[1], 10);
  
  var romanSingle = { "Ⅰ": 1, "Ⅱ": 2, "Ⅲ": 3, "Ⅳ": 4, "Ⅴ": 5, "Ⅵ": 6, "Ⅶ": 7, "Ⅷ": 8, "Ⅸ": 9, "Ⅹ": 10,
    "ⅰ": 1, "ⅱ": 2, "ⅲ": 3, "ⅳ": 4, "ⅴ": 5, "ⅵ": 6, "ⅶ": 7, "ⅷ": 8, "ⅸ": 9, "ⅹ": 10 };
  for (var rc in romanSingle) {
    if (Object.prototype.hasOwnProperty.call(romanSingle, rc) && text.indexOf(rc) >= 0) return romanSingle[rc];
  }
  
  m = text.match(/(?:^|[^a-z0-9])(IX|IV|VIII|VII|VI|III|II)(?:[^a-z0-9]|$)/i);
  if (m) {
    var romanAscii = { "II": 2, "III": 3, "IV": 4, "VI": 6, "VII": 7, "VIII": 8, "IX": 9 };
    var rv = romanAscii[m[1].toUpperCase()];
    if (rv) return rv;
  }
  
  m = text.match(/(?:^|[^a-z0-9])part\s*(\d{1,2})(?![0-9])/i);
  if (m) return parseInt(m[1], 10);
  m = text.match(/第\s*([一二三四五六七八九十\d]+)\s*[部篇章]/);
  if (m) {
    var idxP = HUBAN_SEASON_CJK.indexOf(m[1]);
    if (idxP > 0) return idxP;
    var nP = parseInt(m[1], 10);
    if (nP > 0 && nP <= 30) return nP;
  }
  
  m = text.match(/(\d{1,2})(?:st|nd|rd|th)\s*season/i);
  if (m) return parseInt(m[1], 10);
  if (baseTitle) {
    var bt = hubanNorm(baseTitle);
    var tt = hubanNorm(text);
    if (bt && tt.length > bt.length && tt.indexOf(bt) === 0) {
      var rm = tt.slice(bt.length).match(/^([一二三四五六七八九十\d]+)/);
      if (rm) {
        var idx2 = HUBAN_SEASON_CJK.indexOf(rm[1]);
        if (idx2 > 0) return idx2;
        var n2 = parseInt(rm[1], 10);
        if (n2 > 0 && n2 <= 30) return n2;
      }
    }
  }
  return 0;
}

function hubanWantedEpisode(params) {
  params = params || {};
  var keys = [
    "episode", "episodeNumber", "episode_number", "episodeNo", "episode_no",
    "episodeNum", "episode_num", "episodeIndex", "episode_index",
    "episodeSort", "episode_sort", "episodeOrder", "episode_order",
    "currentEpisode", "current_episode", "currentEp", "current_ep",
    "playEpisode", "play_episode", "playIndex", "play_index",
    "ep", "sort", "serial", "serialNumber", "serial_number"
  ];
  for (var i = 0; i < keys.length; i++) {
    var n = hubanToInt(params[keys[i]], 0);
    if (n > 0) return n;
  }
  var textKeys = [
    "episodeName", "episodeTitle", "episode_name", "episode_title",
    "subtitle", "remark", "description", "name", "title",
    "link", "url", "videoUrl", "id"
  ];
  for (var ti = 0; ti < textKeys.length; ti++) {
    var ep = hubanExtractEpisode(params[textKeys[ti]]);
    if (ep > 0) return ep;
  }
  return hubanWantedEpisodeNested(params, 0);
}

function hubanWantedEpisodeNested(value, depth) {
  if (!value || depth > 3) return 0;
  if (Array.isArray(value)) {
    for (var ai = 0; ai < value.length; ai++) {
      var arrEp = hubanWantedEpisodeNested(value[ai], depth + 1);
      if (arrEp) return arrEp;
    }
    return 0;
  }
  if (typeof value !== "object") return 0;
  var numericKey = /(?:^|_)(?:episode|episodeNumber|episodeNo|episodeNum|episodeIndex|episodeSort|currentEpisode|playEpisode|ep|sort|serial|serialNumber)(?:$|_)/i;
  var textKey = /(?:episode|title|name|subtitle|remark|description|link|url|id)$/i;
  for (var k in value) {
    if (!Object.prototype.hasOwnProperty.call(value, k) || /cookie|token|header|auth|ut/i.test(k)) continue;
    var v = value[k];
    if (numericKey.test(k)) {
      var n = hubanValidEpisodeNumber(v);
      if (n > 0) return n;
    }
    if (textKey.test(k) && typeof v !== "object") {
      var ep = hubanExtractEpisode(v);
      if (ep > 0) return ep;
    }
  }
  var preferred = ["tmdbInfo", "mediaInfo", "item", "video", "currentItem", "episodeInfo", "selectedEpisode", "vod", "source", "context", "metadata"];
  for (var pi = 0; pi < preferred.length; pi++) {
    var child = value[preferred[pi]];
    var childEp = hubanWantedEpisodeNested(child, depth + 1);
    if (childEp) return childEp;
  }
  return 0;
}

async function hubanGetHtml(url, params) {
  var referer = hubanOrigin(url) || hubanHost(params);
  var resp = await Widget.http.get(url, {
    headers: Object.assign({}, HUBAN_HEADERS, { Referer: referer + "/" }),
    timeout: hubanHttpTimeout(params, 20000)
  });
  return String(resp && resp.data || "");
}

function hubanSearchUrl(keyword, page, params) {
  return hubanHost(params) + "/index.php/vod/search/page/" + (page || 1) + "/wd/" + encodeURIComponent(keyword) + ".html";
}

function hubanIsMaintenanceHtml(html) {
  var head = String(html || "").slice(0, 6000);
  return /<title>\s*站点维护中\s*<\/title>/i.test(head)
    || /SITE UNDER MAINTENANCE/i.test(head)
    || /<h1[^>]*>\s*站点维护中\s*<\/h1>/i.test(head);
}

function hubanParseSearch(html, params) {
  if (hubanIsMaintenanceHtml(html)) return [];
  var $ = Widget.html.load(html);
  var out = [];
  var seen = {};
  $(".module-search-item, .module-items .module-item").each(function (_, el) {
    var card = $(el);
    var linkNode = card.find("h3 a[href*='/index.php/vod/detail/'], .module-item-title[href*='/index.php/vod/detail/'], a[href*='/index.php/vod/detail/']").first();
    var href = hubanAbsUrl(linkNode.attr("href") || "", params);
    if (!href || seen[href]) return;
    var img = card.find("img").first();
    var title = hubanCleanTitle(linkNode.attr("title") || linkNode.text() || img.attr("alt") || "");
    if (!title) return;
    var poster = hubanAbsUrl(img.attr("data-src") || img.attr("data-original") || img.attr("src") || "", params);
    var remark = hubanText(card.find(".video-serial, .module-item-text").first().text());
    var desc = hubanText(card.find(".video-info-item, .module-item-style.video-text").last().text());
    seen[href] = true;
    out.push({
      id: href,
      type: "url",
      mediaType: "movie",
      title: title,
      posterPath: poster,
      backdropPath: poster,
      description: [remark, desc].filter(Boolean).join("\n"),
      link: href
    });
  });
  if (!out.length) {
    var blockRe = /<div[^>]+class=["'][^"']*module-search-item[^"']*["'][\s\S]*?(?=<div[^>]+class=["'][^"']*module-search-item[^"']*["']|<\/div>\s*<\/div>\s*<\/main>|<footer|$)/ig;
    var blocks = String(html || "").match(blockRe) || [];
    for (var bi = 0; bi < blocks.length; bi++) {
      var block = blocks[bi];
      var hrefMatch = block.match(/href=["']([^"']*\/index\.php\/vod\/detail\/[^"']+)["'][^>]*(?:title=["']([^"']*)["'])?/i);
      if (!hrefMatch) continue;
      var href = hubanAbsUrl(hrefMatch[1].replace(/&amp;/g, "&"), params);
      if (!href || seen[href]) continue;
      var titleMatch = block.match(/<h3[^>]*>\s*<a[^>]*title=["']([^"']+)["']/i)
        || block.match(/<a[^>]*class=["'][^"']*video-serial[^"']*["'][^>]*title=["']([^"']+)["']/i)
        || block.match(/<img[^>]*alt=["']([^"']+)["']/i);
      var imgMatch = block.match(/<img[^>]*(?:data-src|data-original|src)=["']([^"']+)["']/i);
      var descMatch = block.match(/<div[^>]+class=["'][^"']*video-info-item[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
      var title = hubanCleanTitle(titleMatch && titleMatch[1] || hrefMatch[2] || "");
      if (!title) continue;
      seen[href] = true;
      out.push({
        id: href,
        type: "url",
        mediaType: "movie",
        title: title,
        posterPath: hubanAbsUrl(imgMatch && imgMatch[1] || "", params),
        backdropPath: hubanAbsUrl(imgMatch && imgMatch[1] || "", params),
        description: hubanText(descMatch && descMatch[1] || "").replace(/<[^>]+>/g, ""),
        link: href
      });
    }
  }
  return out;
}

async function hubanSearch(keyword, params) {
  keyword = hubanText(keyword);
  if (!keyword) return [];
  var page = hubanToInt(params && params.page, 1) || 1;
  var key = hubanHost(params) + "::" + keyword + "::" + page;
  var cached = hubanCacheGet(HUBAN_SEARCH_CACHE, key);
  if (cached) return cached;
  var promise = hubanGetHtml(hubanSearchUrl(keyword, page, params), params)
    .then(function (html) {
      var items = hubanParseSearch(html, params);
      
      if (!items.length) delete HUBAN_SEARCH_CACHE[key];
      return items;
    })
    .catch(function (e) {
      delete HUBAN_SEARCH_CACHE[key];
      throw e;
    });
  return hubanCacheSet(HUBAN_SEARCH_CACHE, key, promise);
}

function hubanDedupeSearchItems(groups) {
  var out = [];
  var seen = {};
  for (var gi = 0; gi < groups.length; gi++) {
    var items = groups[gi] || [];
    for (var ii = 0; ii < items.length; ii++) {
      var item = items[ii] || {};
      var key = item.link || item.id || item.title;
      if (!key || seen[key]) continue;
      seen[key] = true;
      out.push(item);
    }
  }
  return out;
}

function hubanSearchItemsLookUseful(items, params, keyword) {
  items = Array.isArray(items) ? items : [];
  if (!items.length) return false;
  var wantNorm = hubanNorm((params && (params.seriesName || params.title || params.name)) || keyword || "");
  if (!wantNorm) return true;
  for (var i = 0; i < items.length; i++) {
    var itemNorm = hubanNorm(items[i] && items[i].title || "");
    if (itemNorm && (itemNorm === wantNorm || itemNorm.indexOf(wantNorm) >= 0 || wantNorm.indexOf(itemNorm) >= 0)) return true;
  }
  return false;
}

async function hubanSearchFastHosts(keyword, params, hosts) {
  hosts = Array.isArray(hosts) ? hosts : [];
  if (!hosts.length) return [];
  return new Promise(function (resolve) {
    var done = false;
    var pending = hosts.length;
    var groups = [];
    function finish(items) {
      if (done) return;
      done = true;
      resolve(items || []);
    }
    for (var hi = 0; hi < hosts.length; hi++) {
      (function (index, host) {
        hubanSearch(keyword, hubanParamsForHost(params, host)).then(function (items) {
          items = items || [];
          groups[index] = items;
          if (items.length && hubanSearchItemsLookUseful(items, params, keyword) && !done) {
            console.log("[huban] fast search host hit", { host: hubanOrigin(host) || host, count: items.length });
            finish(items);
          }
        }).catch(function (e) {
          groups[index] = [];
          if (!done) console.warn("[huban] pan host search failed:", host, e && e.message || e);
        }).then(function () {
          pending--;
          if (pending <= 0 && !done) finish(hubanDedupeSearchItems(groups));
        });
      })(hi, hosts[hi]);
    }
  });
}

async function hubanSearchAll(keyword, params) {
  var hosts = hubanPanHosts(params);
  var out;
  if (fastResourceSearchEnabled(params)) {
    out = await hubanSearchFastHosts(keyword, params, hosts);
  } else {
    var tasks = hosts.map(function (host) {
      return hubanSearch(keyword, hubanParamsForHost(params, host)).catch(function (e) {
        console.warn("[huban] pan host search failed:", host, e && e.message || e);
        return [];
      });
    });
    out = hubanDedupeSearchItems(await Promise.all(tasks));
  }
  if (!out.length) {
    
    try {
      var suggestItems = await hubanSuggestSearch(keyword, params);
      if (suggestItems.length) {
        console.log("[huban] suggest fallback hit", { keyword: keyword, count: suggestItems.length });
        out = suggestItems;
      }
    } catch (e) {
      console.warn("[huban] suggest fallback failed:", e && e.message || e);
    }
  }
  return out;
}

function hubanSuggestItem(raw, params) {
  if (!raw) return null;
  var idText = String(raw.id == null ? "" : raw.id);
  var vodId = "";
  if (/^\d{1,12}$/.test(idText)) vodId = idText;
  else {
    var idMatch = idText.match(/\/vod\/detail\/id\/(\d{1,12})\.html/);
    if (idMatch) vodId = idMatch[1];
  }
  var title = hubanCleanTitle(raw.name || "");
  if (!vodId || !title) return null;
  var link = hubanHost(params) + "/index.php/vod/detail/id/" + vodId + ".html";
  var poster = hubanAbsUrl(raw.pic || "", params);
  if (/\/load\.gif(\?|$)/i.test(poster)) poster = "";
  return {
    id: link,
    type: "url",
    mediaType: "movie",
    title: title,
    posterPath: poster,
    backdropPath: poster,
    description: hubanText(raw.remark || ""),
    link: link
  };
}

async function hubanSuggestSearch(keyword, params) {
  keyword = hubanText(keyword);
  if (!keyword) return [];
  var url = hubanHost(params) + "/index.php/ajax/suggest?mid=1&wd=" + encodeURIComponent(keyword) + "&limit=100";
  var resp = await Widget.http.get(url, {
    headers: Object.assign({}, HUBAN_HEADERS, { Referer: hubanHost(params) + "/" }),
    timeout: hubanHttpTimeout(params, 20000)
  });
  var data = resp && resp.data;
  if (typeof data === "string") {
    try { data = JSON.parse(data); } catch (e) { data = null; }
  }
  if (!data || data.code !== 1 || !Array.isArray(data.list)) return [];
  var out = [];
  for (var i = 0; i < data.list.length; i++) {
    var item = hubanSuggestItem(data.list[i], params);
    if (item) out.push(item);
  }
  return out;
}

function hubanScoreItem(item, params, keyword) {
  var wantTitle = params.seriesName || params.title || params.name || keyword || "";
  var wantNorm = hubanNorm(wantTitle);
  var itemNorm = hubanNorm(item.title);
  var score = 0;
  if (wantNorm && itemNorm === wantNorm) score += 100;
  if (wantNorm && (itemNorm.indexOf(wantNorm) >= 0 || wantNorm.indexOf(itemNorm) >= 0)) score += 40;
  var wantYear = String(params.premiereDate || params.releaseDate || params.year || "").slice(0, 4) || hubanYear(wantTitle);
  if (wantYear && item.description && item.description.indexOf(wantYear) >= 0) score += 10;
  if (/解说|速看|合集|全集/.test(item.title)) score -= 50;
  
  var wantSeason = hubanWantedSeason(params);
  if (wantSeason > 0) {
    var itemSeason = hubanExtractSeason(item.title, wantTitle);
    if (itemSeason > 0) {
      
      if (itemSeason === wantSeason) score += 120;
      else score -= 60;
    }
  }
  return score;
}

function hubanPickBest(items, params, keyword) {
  items = Array.isArray(items) ? items : [];
  if (!items.length) return null;
  return hubanRankItems(items, params, keyword)[0] || null;
}

function hubanRankItems(items, params, keyword) {
  items = Array.isArray(items) ? items : [];
  return items.map(function (item) {
    return { item: item, score: hubanScoreItem(item, params || {}, keyword) };
  }).sort(function (a, b) { return b.score - a.score; }).map(function (ranked) {
    return ranked.item;
  });
}

function hubanExtractDetail(html, link, params) {
  if (hubanIsMaintenanceHtml(html)) {
    return {
      id: link,
      type: "url",
      mediaType: "movie",
      title: "虎斑[盘]",
      posterPath: "",
      backdropPath: "",
      description: "",
      link: link,
      lines: []
    };
  }
  var $ = Widget.html.load(html);
  var title = hubanCleanTitle($(".video-info h1, h1").first().text() || $("meta[property='og:title']").attr("content") || "");
  var poster = hubanAbsUrl($(".lazyload, .lazyloaded, .module-item-pic img, img").first().attr("data-original")
    || $(".lazyload, .lazyloaded, .module-item-pic img, img").first().attr("data-src")
    || $(".lazyload, .lazyloaded, .module-item-pic img, img").first().attr("src")
    || $("meta[property='og:image']").attr("content") || "", params);
  var description = hubanText($(".sqjj_a").first().text() || $(".zkjj_a").first().text() || $("meta[name='description']").attr("content") || "");
  var lines = [];
  var seen = {};

  $(".module-row-info").each(function (_, el) {
    var row = $(el);
    var lineTitle = hubanText(row.find(".module-row-title h4").first().text());
    var cands = [
      hubanText(row.find(".module-row-title p").first().text()),
      hubanText(row.find("[data-clipboard-text]").first().attr("data-clipboard-text")),
      hubanText(row.find("a.btn-down").first().attr("href"))
    ];
    var share = "";
    
    for (var ci = 0; ci < cands.length && !share; ci++) {
      if (/^https?:\/\//i.test(cands[ci])) share = cands[ci];
    }
    if (!share) {
      for (var cj = 0; cj < cands.length && !share; cj++) {
        var um = String(cands[cj]).match(/https?:\/\/[^\s"'<>]+/i);
        if (um) share = um[0];
      }
    }
    if (!share) share = cands[0] || cands[1] || cands[2] || "";
    if (!share) return;
    
    share = hubanAttachSharePwd(share, row.text());
    if (!share || seen[share] || detectPanType(share) !== "百度") return;
    seen[share] = true;
    lines.push({ title: lineTitle || title || "虎斑[盘]", shareUrl: share, panType: detectPanType(share) });
  });

  if (!lines.length) {
    $(".down-wrap a.down-card-url[href]").each(function (_, el) {
      var node = $(el);
      var share = hubanText(node.attr("href") || "");
      if (!share) return;
      share = hubanAttachSharePwd(share, node.closest(".down-wrap").text() || node.parent().text());
      if (!share || seen[share]) return;
      if (detectPanType(share) !== "百度") return;
      if (!/\/s\/[\w-]+/.test(share)) return;
      seen[share] = true;
      lines.push({ title: title || "虎斑[盘]", shareUrl: share, panType: "百度" });
    });
  }

  if (!lines.length) {
    var linkRe = /(https?:\/\/pan\.baidu\.com\/[^\s"'<>]+)/ig;
    var m;
    while ((m = linkRe.exec(html))) {
      var shareUrl = m[1].replace(/&amp;/g, "&");
      
      var ctxStart = Math.max(0, m.index - 300);
      var ctxEnd = Math.min(html.length, m.index + m[0].length + 300);
      shareUrl = hubanAttachSharePwd(shareUrl, String(html.slice(ctxStart, ctxEnd)).replace(/<[^>]+>/g, " "));
      if (seen[shareUrl]) continue;
      seen[shareUrl] = true;
      lines.push({ title: title || "虎斑[盘]", shareUrl: shareUrl, panType: detectPanType(shareUrl) });
    }
  }

  return {
    id: link,
    type: "url",
    mediaType: "movie",
    title: title || "虎斑[盘]",
    posterPath: poster,
    backdropPath: poster,
    description: description,
    link: link,
    lines: lines
  };
}

async function hubanLoadDetailObject(link, params) {
  link = hubanAbsUrl(link, params);
  var detailParams = hubanParamsForHost(params, hubanOrigin(link) || hubanHost(params));
  var cached = hubanCacheGet(HUBAN_DETAIL_CACHE, link);
  if (cached) return cached;
  var promise = hubanGetHtml(link, detailParams).then(function (html) {
    return hubanExtractDetail(html, link, detailParams);
  }).catch(function (e) {
    delete HUBAN_DETAIL_CACHE[link];
    throw e;
  });
  return hubanCacheSet(HUBAN_DETAIL_CACHE, link, promise);
}

function detectPanType(url) {
  var u = String(url || "").toLowerCase();
  if (u.indexOf("pan.baidu.com") >= 0) return "百度";
  return "网盘";
}

function hubanResolveLink(line, extra) {
  var data = Object.assign({}, extra || {}, {
    title: line && line.title || "",
    shareUrl: line && line.shareUrl || "",
    panType: line && line.panType || detectPanType(line && line.shareUrl || "")
  });
  return HUBAN_RESOLVE_SCHEME + encodeURIComponent(JSON.stringify(data));
}

function hubanParseResolveLink(link) {
  link = String(link || "");
  if (link.indexOf(HUBAN_RESOLVE_SCHEME) !== 0) return null;
  var raw = link.slice(HUBAN_RESOLVE_SCHEME.length);
  if (raw.indexOf("data=") === 0) raw = raw.slice(5);
  try {
    var data = JSON.parse(decodeURIComponent(raw));
    if (!data || !data.shareUrl) return null;
    return {
      title: data.title || data.detailTitle || "虎斑[盘]",
      shareUrl: data.shareUrl,
      panType: data.panType || detectPanType(data.shareUrl),
      detailTitle: data.detailTitle || "",
      keyword: data.keyword || ""
    };
  } catch (e) {
    console.warn("[huban] resolve link parse failed:", e && e.message || e);
    return null;
  }
}

function deferredSourceFromLine(line, context) {
  var title = "虎斑[盘] " + (line.panType || detectPanType(line.shareUrl)) + " " + hubanText(line.title || "");
  var link = hubanResolveLink(line, context || {});
  return {
    id: link,
    type: "url",
    name: title,
    title: title,
    url: link,
    link: link,
    mediaType: "movie",
    description: [
      context && context.keyword ? "搜索词: " + context.keyword : "",
      context && context.detailTitle ? "命中: " + context.detailTitle : "",
      line.title || "",
      line.shareUrl || ""
    ].filter(Boolean).join("\n")
  };
}

var HUBAN_VIDEO_EXT_RE = /\.(mp4|mkv|webm|avi|wmv|flv|mov|mpeg|mpg|m4v|ts|m2ts|3gp|rm|rmvb)$/i;
var HUBAN_NON_VIDEO_EXT_RE = /\.(mp3|m4a|aac|flac|wav|ogg|opus|ape|wma|alac|cue|lrc|jpg|jpeg|png|gif|webp|bmp|txt|pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar|7z|tar|gz|ass|srt|ssa|vtt)$/i;

function isPlayableVideoName(name) {
  var s = String(name || "").trim();
  if (!s) return true;
  if (HUBAN_VIDEO_EXT_RE.test(s)) return true;
  if (HUBAN_NON_VIDEO_EXT_RE.test(s)) return false;
  return !/\.[A-Za-z0-9]{1,6}(?:$|[?#])/i.test(s);
}

function isPlayableVideoItem(item) {
  var name = helperItemName(item);
  if (!isPlayableVideoName(name)) return false;
  return item && (item.obj_category === "video" || item.category === "video" || item.category === 1 || item.mediaType === 3 || item.media_type === 3 || HUBAN_VIDEO_EXT_RE.test(name));
}

function hubanEncodeQueryPart(part) {
  return String(part == null ? "" : part)
    .replace(/%(?![0-9A-Fa-f]{2})/g, "%25")
    .replace(/\+/g, "%2B")
    .replace(/ /g, "%20")
    .replace(/"/g, "%22")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E")
    .replace(/`/g, "%60");
}

function normalizePlaybackUrl(url) {
  var s = String(url || "").trim();
  if (!s) return "";
  var hash = "";
  var hashIndex = s.indexOf("#");
  if (hashIndex >= 0) {
    hash = s.slice(hashIndex);
    s = s.slice(0, hashIndex);
  }
  var qIndex = s.indexOf("?");
  if (qIndex < 0) return s.replace(/ /g, "%20") + hash;
  var base = s.slice(0, qIndex).replace(/ /g, "%20");
  var query = s.slice(qIndex + 1).split("&").map(function (part) {
    var eq = part.indexOf("=");
    if (eq < 0) return hubanEncodeQueryPart(part);
    return hubanEncodeQueryPart(part.slice(0, eq)) + "=" + hubanEncodeQueryPart(part.slice(eq + 1));
  }).join("&");
  return base + "?" + query + hash;
}

function hubanUrlHost(url) {
  try {
    return new URL(String(url || "")).host || "";
  } catch (e) {
    return "";
  }
}

function appendQueryParam(url, key, value) {
  var s = String(url || "").trim();
  value = hubanText(value);
  if (!s || !key || !value) return s;
  var hash = "";
  var hashIndex = s.indexOf("#");
  if (hashIndex >= 0) {
    hash = s.slice(hashIndex);
    s = s.slice(0, hashIndex);
  }
  var re = new RegExp("([?&])" + key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=", "i");
  if (re.test(s)) return s + hash;
  return s + (s.indexOf("?") >= 0 ? "&" : "?") + encodeURIComponent(key) + "=" + encodeURIComponent(value) + hash;
}

function sourceDisplayName(name) {
  var s = hubanText(name)
    .replace(/^虎斑\[盘\]\s*/, "")
    .replace(/\s+\d+(?:\.\d+)?\s*(?:B|KB|MB|GB|TB|PB)$/i, "")
    .trim();
  var pan = sourcePanLabel(s);
  return pan || s;
}

function sourceSizeText(name, description, meta) {
  if (meta && Number(meta.size || 0) > 0) return hubanSizeText(meta.size);
  var text = [description, name].filter(Boolean).join("\n");
  var m = text.match(/大小[:：]\s*([0-9.]+\s*(?:B|KB|MB|GB|TB|PB))/i);
  if (m) return hubanText(m[1]);
  m = hubanText(name).match(/\s([0-9.]+\s*(?:B|KB|MB|GB|TB|PB))$/i);
  return m ? hubanText(m[1]) : "";
}

function sourcePanLabel(name) {
  var s = hubanText(name);
  if (/百度/.test(s)) return "百度";
  return "网盘";
}

function sourceEpisodeNumber(name, description, meta) {
  var cfgParams = meta && meta.params || HUBAN_RUNTIME_PARAMS || {};
  if (hubanText(cfgParams && cfgParams.type).toLowerCase() === "movie") return 0;
  var wantedEp = hubanWantedEpisode(cfgParams);
  if (wantedEp > 0) return wantedEp;
  if (meta && Number(meta.episode || 0) > 0) return Number(meta.episode || 0);
  var text = [
    meta && meta.name || "",
    meta && meta.group || "",
    description || "",
    name || ""
  ].filter(Boolean).join(" ");
  text = text
    .replace(/https?:\/\/\S+/ig, " ")
    .replace(/大小[:：]\s*[0-9.]+\s*(?:B|KB|MB|GB|TB|PB)/ig, " ")
    .replace(/\b[0-9.]+\s*(?:B|KB|MB|GB|TB|PB)\b/ig, " ")
    .replace(/\.(?:mp4|mkv|avi|mov|m4v|ts|m2ts|flv|wmv|webm|rmvb)\b/ig, " ")
    .replace(/\bH\.?26[45]\b/ig, " ");
  return hubanExtractEpisode(text);
}

function sourceEpisodeText(name, description, meta) {
  var ep = sourceEpisodeNumber(name, description, meta);
  return ep > 0 ? "第" + ep + "集" : "";
}

function sourceQualityConfig(params) {
  params = params || HUBAN_RUNTIME_PARAMS || {};
  var value = hubanText(params.quality_tag || params.qualityTag || params.display_quality || params.source_quality || HUBAN_BUILTIN_QUALITY_TAG).toLowerCase();
  if (value === "4k") {
    return { value: "4k", label: "4K", tag: "4k", resolutionId: "4k", resolution: "3840x2160", width: 3840, height: 2160 };
  }
  if (value === "1080p" || value === "1080" || value === "fhd") {
    return { value: "1080p", label: "1080P", tag: "1080p", resolutionId: "1080p", resolution: "1920x1080", width: 1920, height: 1080 };
  }
  if (value === "other" || value === "others" || value === "其他" || value === "其它") {
    return { value: "other", label: "其他", tag: "", resolutionId: "other", resolution: "", width: 0, height: 0 };
  }
  return { value: "8k", label: "8K", tag: "8k", resolutionId: "8k", resolution: "7680x4320", width: 7680, height: 4320 };
}

function sourceActualQualityConfig(name, description, meta) {
  var text = [
    meta && (meta.fileName || meta.filename || meta.file_name || meta.server_filename || meta.name) || "",
    name || "",
    description || ""
  ].filter(Boolean).join(" ").toLowerCase();
  if (/4320p|\b8k\b|7680\s*[x×]\s*4320/.test(text)) {
    return { value: "8k", label: "8K", tag: "8k", resolutionId: "8k", resolution: "7680x4320", width: 7680, height: 4320 };
  }
  if (/2160p|\b4k\b|\buhd\b|3840\s*[x×]\s*2160/.test(text)) {
    return { value: "4k", label: "4K", tag: "4k", resolutionId: "4k", resolution: "3840x2160", width: 3840, height: 2160 };
  }
  if (/1080p|\bfhd\b|1920\s*[x×]\s*1080/.test(text)) {
    return { value: "1080p", label: "1080P", tag: "1080p", resolutionId: "1080p", resolution: "1920x1080", width: 1920, height: 1080 };
  }
  if (/720p|1280\s*[x×]\s*720/.test(text)) {
    return { value: "720p", label: "720P", tag: "720p", resolutionId: "720p", resolution: "1280x720", width: 1280, height: 720 };
  }
  if (/480p|854\s*[x×]\s*480/.test(text)) {
    return { value: "480p", label: "480P", tag: "480p", resolutionId: "480p", resolution: "854x480", width: 854, height: 480 };
  }
  return { value: "", label: "", tag: "", resolutionId: "", resolution: "", width: 0, height: 0 };
}

function sourceQualityText(name, description, meta) {
  return sourceQualityConfig(meta && meta.params || HUBAN_RUNTIME_PARAMS).label;
}

function sourceDurationSecondsFromValue(value, key) {
  if (value == null || value === "") return 0;
  key = String(key || "").toLowerCase();
  if (typeof value === "number" && Number.isFinite(value)) {
    if (/minute|min|runtime/.test(key)) return value > 0 ? Math.round(value * 60) : 0;
    if (/second|sec/.test(key)) return value > 0 ? Math.round(value) : 0;
    return value > 600 ? Math.round(value) : 0;
  }
  var text = hubanText(value);
  if (!text) return 0;
  var m = text.match(/^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/);
  if (m) {
    var h = m[3] ? hubanToInt(m[1], 0) : 0;
    var min = m[3] ? hubanToInt(m[2], 0) : hubanToInt(m[1], 0);
    var sec = hubanToInt(m[3] || m[2], 0);
    return h * 3600 + min * 60 + sec;
  }
  m = text.match(/(\d+(?:\.\d+)?)\s*(?:小时|hour|hr|h)\s*(?:(\d+(?:\.\d+)?)\s*(?:分钟|minute|min|m))?/i);
  if (m) return Math.round(Number(m[1]) * 3600 + Number(m[2] || 0) * 60);
  m = text.match(/(\d+(?:\.\d+)?)\s*(?:分钟|minute|min|m)/i);
  if (m) return Math.round(Number(m[1]) * 60);
  m = text.match(/(\d+(?:\.\d+)?)\s*(?:秒|second|sec|s)/i);
  if (m) return Math.round(Number(m[1]));
  return 0;
}

function sourceDurationSeconds(params) {
  params = params || {};
  var keys = ["durationSeconds", "duration_seconds", "runtimeSeconds", "runtime_seconds", "duration", "durationText", "duration_text", "runtime", "runtimeMinutes", "runtime_minutes"];
  for (var i = 0; i < keys.length; i++) {
    var seconds = sourceDurationSecondsFromValue(params[keys[i]], keys[i]);
    if (seconds > 60) return seconds;
  }
  var parents = ["tmdbInfo", "mediaInfo", "item", "video", "currentItem", "episodeInfo", "selectedEpisode", "metadata"];
  for (var pi = 0; pi < parents.length; pi++) {
    var child = params[parents[pi]];
    if (!child || typeof child !== "object") continue;
    for (var ki = 0; ki < keys.length; ki++) {
      var childSeconds = sourceDurationSecondsFromValue(child[keys[ki]], keys[ki]);
      if (childSeconds > 60) return childSeconds;
    }
  }
  return 0;
}

function sourceBitrateBitsPerSecond(size, params) {
  size = Number(size || 0);
  var seconds = sourceDurationSeconds(params);
  if (!size || !seconds) return 0;
  return Math.round(size * 8 / seconds);
}

function estimatedSourceDurationSeconds(params) {
  var seconds = sourceDurationSeconds(params);
  if (seconds > 60) return seconds;
  var type = hubanText(params && (params.type || params.mediaType || params.contentType)).toLowerCase();
  if (type === "movie") return 120 * 60;
  return 45 * 60;
}

function sourceBitrateForMediaInfo(size, params) {
  size = Number(size || 0);
  if (!size) return 0;
  var seconds = sourceDurationSeconds(params || {});
  return seconds > 0 ? Math.round(size * 8 / seconds) : 0;
}

function sourceRealSize(meta, item) {
  meta = meta || {};
  item = item || {};
  return Number(
    meta.realSize || meta.actualSize || meta.actualFileSize || meta.fileRealSize || meta.size ||
    item.realSize || item.RealSize || item.actualSize || item.ActualSize ||
    item.actualFileSize || item.fileRealSize || item.fileRealSizeBytes ||
    item.sourceSize || item.originalSize || item.size
  ) || 0;
}

function sourceDataSize(meta, item) {
  return sourceRealSize(meta, item);
}

function sourceDataSizeText(size) {
  size = Number(size || 0);
  if (!size) return "";
  return hubanSizeText(size);
}

function sourceRuntimeTicks(params) {
  var seconds = sourceDurationSeconds(params || {});
  return seconds > 60 ? Math.round(seconds * 10000000) : 0;
}

function sourceFrameRate(params) {
  var keys = ["frameRate", "framerate", "fps", "videoFrameRate"];
  for (var i = 0; i < keys.length; i++) {
    var n = Number(params && params[keys[i]] || 0);
    if (n > 0) return n;
  }
  return 0;
}

function sourceContainerName(name, url) {
  var text = [name, url].filter(Boolean).join(" ");
  var m = text.match(/\.([a-z0-9]{2,5})(?:$|[?#\s])/i);
  return (m && m[1] || "").toLowerCase();
}

function playbackFileName(name, meta) {
  meta = meta || {};
  var raw = hubanText(meta.name || meta.fileName || meta.filename || meta.file_name || name || "baidu-video.mkv");
  raw = raw.split(/[\\/]/).pop();
  raw = raw.replace(/^虎斑\[盘\]\s*百度\s*/i, "").replace(/\s+\d+(?:\.\d+)?\s*(?:KB|MB|GB|TB)$/i, "");
  raw = raw.replace(/[\u0000-\u001f]+/g, " ").trim();
  if (!raw) raw = "baidu-video.mkv";
  if (!/\.(?:mp4|mkv|avi|mov|m4v|ts|m2ts|flv|wmv|webm|rmvb)$/i.test(raw)) raw += ".mkv";
  return raw;
}

function sourceCodecName(name) {
  var text = hubanText(name).toLowerCase();
  if (/av1/.test(text)) return "av1";
  if (/h\.?265|hevc|x265/.test(text)) return "hevc";
  if (/h\.?264|avc|x264/.test(text)) return "h264";
  return "";
}

function sourceCodecDisplayName(codec) {
  codec = hubanText(codec).toLowerCase();
  if (codec === "h264") return "H.264";
  if (codec === "hevc") return "HEVC";
  if (codec === "av1") return "AV1";
  return "";
}

function videoResourceTags(name) {
  var codec = sourceCodecName(name);
  return {
    codec: sourceCodecDisplayName(codec),
    dynamicRange: /dolby\s*vision|dovi|\bdv\b/i.test(name || "") ? "DV" : (/hdr/i.test(name || "") ? "HDR" : ""),
    bitDepth: /10bit|10-bit|main\s*10|hdr|dolby\s*vision|\bdv\b/i.test(name || "") ? 10 : 8,
    source: /blu-?ray|remux|bdremux/i.test(name || "") ? "BluRay" : "WEB-DL",
    immersive: /3d|vr|180|360/i.test(name || "")
  };
}

function audioResourceTags(name) {
  var text = hubanText(name).toLowerCase();
  var codec = /truehd/.test(text) ? "TrueHD" : (/dts/.test(text) ? "DTS" : (/eac3|ddp|dd\+/.test(text) ? "EAC3" : (/aac/.test(text) ? "AAC" : (/ac3|dd5/.test(text) ? "AC3" : ""))));
  var channels = /7[._ ]?1/.test(text) ? 8 : (/5[._ ]?1/.test(text) ? 6 : (/2[._ ]?0|stereo/.test(text) ? 2 : 0));
  return {
    codec: codec,
    channels: channels,
    source: /blu-?ray|remux|bdremux/i.test(name || "") ? "BluRay" : "WEB-DL"
  };
}

function mediaTagLine(name, meta) {
  var text = hubanText(name).toLowerCase();
  var video = videoResourceTags(name);
  var audio = audioResourceTags(name);
  var quality = sourceActualQualityConfig(name, "", meta);
  var range = /dolby\s*vision|dovi|\bdv\b/i.test(name || "") ? "DV" : video.dynamicRange;
  var channelText = audio.channels >= 8 ? "7.1" : (audio.channels >= 6 ? "5.1" : (audio.channels >= 2 ? "2.0" : ""));
  var tags = [quality.tag, range, video.codec, audio.codec];
  if (/atmos/.test(text)) tags.push("atmos");
  tags.push(channelText);
  return tags.filter(Boolean).join("|");
}

function withMediaTagsFirst(source, lines) {
  source = source || {};
  var tagLine = mediaTagLine(source.fileName || source.filename || source.file_name || source.server_filename || source.name || "");
  var body = String(source.description || "");
  if (body.indexOf(tagLine) === 0) body = body.slice(tagLine.length).replace(/^\n+/, "");
  return [tagLine].concat(lines || [], [body]).filter(Boolean).join("\n");
}

function buildSyntheticMediaStreams(item, name, meta, params) {
  meta = meta || {};
  params = params || {};
  var quality = sourceActualQualityConfig(name, "", meta);
  var realSize = sourceRealSize(meta, item);
  var dataSize = sourceDataSize(meta, item, params);
  var bitrate = sourceBitrateForMediaInfo(dataSize, params);
  var fps = sourceFrameRate(params);
  var codec = sourceCodecName(name);
  var video = videoResourceTags(name);
  var audio = audioResourceTags(name);
  var videoTitle = [quality.label, video.codec].filter(Boolean).join(" ") || "Video";
  var streams = [{
    Index: 0,
    index: 0,
    Type: "Video",
    type: "Video",
    Codec: codec || undefined,
    codec: codec || undefined,
    DisplayTitle: videoTitle,
    displayTitle: videoTitle,
    Title: videoTitle,
    title: videoTitle,
    Width: quality.width || undefined,
    width: quality.width || undefined,
    Height: quality.height || undefined,
    height: quality.height || undefined,
    Size: dataSize,
    size: dataSize,
    RealSize: realSize,
    realSize: realSize,
    BitRate: bitrate,
    Bitrate: bitrate,
    bitrate: bitrate,
    AverageFrameRate: fps,
    averageFrameRate: fps,
    RealFrameRate: fps,
    realFrameRate: fps,
    IsInterlaced: false,
    isInterlaced: false,
    Profile: codec ? (codec === "hevc" ? "Main 10" : "High") : undefined,
    profile: codec ? (codec === "hevc" ? "Main 10" : "High") : undefined,
    PixelFormat: codec ? (codec === "hevc" ? "yuv420p10le" : "yuv420p") : undefined,
    pixelFormat: codec ? (codec === "hevc" ? "yuv420p10le" : "yuv420p") : undefined,
    VideoRange: video.dynamicRange || undefined,
    videoRange: video.dynamicRange || undefined,
    VideoRangeType: video.dynamicRange || undefined,
    videoRangeType: video.dynamicRange || undefined,
    ColorSpace: undefined,
    colorSpace: undefined,
    ColorTransfer: undefined,
    colorTransfer: undefined,
    ColorPrimaries: undefined,
    colorPrimaries: undefined
  }];
  if (audio.codec || audio.channels) {
    var audioTitle = [audio.codec, audio.channels >= 8 ? "7.1" : (audio.channels >= 6 ? "5.1" : (audio.channels >= 2 ? "2.0" : ""))].filter(Boolean).join(" ") || "Audio";
    streams.push({
      Index: 1,
      index: 1,
      Type: "Audio",
      type: "Audio",
      Codec: audio.codec ? audio.codec.toLowerCase() : undefined,
      codec: audio.codec ? audio.codec.toLowerCase() : undefined,
      DisplayTitle: audioTitle,
      displayTitle: audioTitle,
      Title: audioTitle,
      title: audioTitle,
      Language: "und",
      language: "und",
      Channels: audio.channels || undefined,
      channels: audio.channels || undefined,
      ChannelLayout: audio.channels >= 8 ? "7.1" : (audio.channels >= 6 ? "5.1" : (audio.channels >= 2 ? "stereo" : undefined)),
      channelLayout: audio.channels >= 8 ? "7.1" : (audio.channels >= 6 ? "5.1" : (audio.channels >= 2 ? "stereo" : undefined)),
      SampleRate: undefined,
      sampleRate: undefined,
      IsDefault: true,
      isDefault: true
    });
  }
  return streams;
}

function applyMediaSourceFields(item, name, meta) {
  if (!item) return item;
  meta = meta || {};
  var params = meta.params || HUBAN_RUNTIME_PARAMS || {};
  var realSize = sourceRealSize(meta, item);
  var size = sourceDataSize(meta, item);
  var bitrate = sourceBitrateForMediaInfo(size, params);
  var runtimeTicks = sourceRuntimeTicks(params);
  var container = sourceContainerName(name, item.url || item.videoUrl || "");
  var quality = sourceActualQualityConfig(name, "", meta);
  var video = videoResourceTags(name);
  var streams = buildSyntheticMediaStreams(item, name, meta, params);
  var mediaSourceId = item.id || ["baidu", size || "", item.url || ""].join("|");
  var dataSizeText = sourceDataSizeText(size);
  var fileName = playbackFileName(name, meta);
  var mediaSource = {
    Id: mediaSourceId,
    id: mediaSourceId,
    Name: item.displayName || sourceDisplayName(name) || "百度网盘",
    name: item.displayName || sourceDisplayName(name) || "百度网盘",
    FileName: fileName,
    fileName: fileName,
    filename: fileName,
    ServerFileName: fileName,
    server_filename: fileName,
    Path: item.url || item.videoUrl || "",
    path: item.url || item.videoUrl || "",
    Protocol: "Http",
    protocol: "Http",
    Type: "Default",
    type: "Default",
    Container: container,
    container: container,
    Size: size,
    size: size,
    FileSize: size,
    fileSize: size,
    file_size: size,
    VideoFileSize: size,
    videoFileSize: size,
    ResolutionVideoFileSize: size,
    resolutionVideoFileSize: size,
    MaxFileSize: size,
    maxFileSize: size,
    RealSize: realSize,
    realSize: realSize,
    ActualSize: realSize,
    actualSize: realSize,
    ActualFileSize: realSize,
    actualFileSize: realSize,
    FileRealSize: realSize,
    fileRealSize: realSize,
    SourceSize: realSize,
    sourceSize: realSize,
    Bitrate: bitrate,
    BitRate: bitrate,
    bitrate: bitrate,
    RunTimeTicks: runtimeTicks,
    runTimeTicks: runtimeTicks,
    SupportsDirectPlay: true,
    supportsDirectPlay: true,
    SupportsDirectStream: true,
    supportsDirectStream: true,
    SupportsTranscoding: false,
    supportsTranscoding: false,
    IsRemote: true,
    isRemote: true,
    MediaStreams: streams,
    mediaStreams: streams
  };
  item.dataSize = size;
  item.realSize = realSize;
  item.RealSize = realSize;
  item.actualSize = realSize;
  item.ActualSize = realSize;
  item.actualFileSize = realSize;
  item.fileRealSize = realSize;
  item.sourceSize = realSize;
  item.originalSize = realSize;
  item.size = size;
  item.fileSize = size;
  item.file_size = size;
  item.mediaSourceId = mediaSourceId;
  item.MediaSourceId = mediaSourceId;
  item.mediaSource = mediaSource;
  item.MediaSource = mediaSource;
  item.mediaSources = [mediaSource];
  item.MediaSources = [mediaSource];
  item.mediaStreams = streams;
  item.MediaStreams = streams;
  item.fileName = fileName;
  item.FileName = fileName;
  item.filename = fileName;
  item.file_name = fileName;
  item.server_filename = fileName;
  item.originalFileName = fileName;
  item.serverFileName = fileName;
  item.RunTimeTicks = runtimeTicks;
  item.runTimeTicks = runtimeTicks;
  item.Bitrate = bitrate;
  item.BitRate = bitrate;
  item.bitrate = bitrate;
  item.bitRate = bitrate;
  item.videoBitRate = bitrate;
  item.videoBitrate = bitrate;
  item.videoBitRateText = bitrate > 0 ? (bitrate / 1000000).toFixed(2) + "Mbps" : "";
  item.videoFileSize = size;
  item.VideoFileSize = size;
  item.videoFileSizeText = dataSizeText;
  item.resolutionVideoFileSize = size;
  item.maxFileSize = size;
  item.videoPixelSize = quality.resolution || "";
  item.videoTitle = [quality.label, video.codec].filter(Boolean).join(" ");
  item.videoRange = video.dynamicRange || "";
  item.VideoRange = video.dynamicRange || "";
  if (video.dynamicRange) item.videoRangeScore = 999999;
  item.resolutionId = quality.resolutionId;
  item.providerId = "baidu";
  item.sourceId = "baidu";
  item.sourceType = "stream";
  return item;
}

function fastPlayConfigForName(name, params) {
  return null;
}

function applyFastPlayFields(item, name, meta) {
  var cfg = fastPlayConfigForName(name, meta && meta.params || HUBAN_RUNTIME_PARAMS || {});
  if (!cfg) return item;
  item.fastPlayMode = true;
  item.fastplay = true;
  item.speedup = true;
  item.speedupEnabled = true;
  item.multiThread = true;
  item.multiThreadMode = true;
  item.isMulti = true;
  item.isVideo = true;
  item.threads = cfg.threads;
  item.thread = cfg.threads;
  item.threadCount = cfg.threads;
  item.threadNum = cfg.threads;
  item.downloadThreads = cfg.threads;
  item.downloadThreadCount = cfg.threads;
  item.maxThreadCount = cfg.threads;
  item.poolSize = cfg.threads;
  item.chunkSize = cfg.chunkSize;
  item.chunk_size = cfg.chunkSize;
  item.chunk = cfg.chunkSize;
  item.segmentSize = cfg.chunkSize;
  item.downloadChunkSize = cfg.chunkSize;
  item.rangeSize = cfg.chunkSize;
  return item;
}

function decorateSourceItem(item, name, description, meta) {
  meta = meta || {};
  var cfgParams = meta.params || HUBAN_RUNTIME_PARAMS || {};
  var realSize = sourceRealSize(meta, item);
  var dataSize = sourceDataSize(meta, item);
  var displayName = sourceDisplayName(name) || hubanText(name) || sourcePanLabel(name);
  var fileName = playbackFileName(name, meta);
  var sizeText = sourceSizeText(name, description, meta);
  var dataSizeText = sourceDataSizeText(dataSize);
  var displaySizeText = dataSizeText || sizeText;
  var panLabel = sourcePanLabel(displayName || name);
  var episodeText = sourceEpisodeText(name, description, meta);
  var displayQuality = sourceQualityConfig(cfgParams);
  var actualQuality = sourceActualQualityConfig(fileName || name, description, meta);
  var qualityText = sourceQualityText(name, description, meta);
  var cardName = [qualityText || displayQuality.label, episodeText, displaySizeText ? hubanCompactSizeText(displaySizeText) : ""].filter(Boolean).join(" ");
  item.name = cardName;
  item.title = cardName;
  item.displayName = displayName;
  item.video = videoResourceTags(fileName || name);
  item.audio = audioResourceTags(fileName || name);
  item.fileName = fileName;
  item.FileName = fileName;
  item.filename = fileName;
  item.file_name = fileName;
  item.server_filename = fileName;
  item.originalFileName = fileName;
  item.serverFileName = fileName;
  item.quality = "BD";
  item.qualityName = actualQuality.label;
  item.qualityLabel = actualQuality.label;
  item.qualityTitle = actualQuality.label;
  item.label = actualQuality.label;
  item.format = actualQuality.label;
  item.resolution = actualQuality.resolution;
  item.resolutionText = actualQuality.label;
  item.renderSize = actualQuality.resolution;
  item.renderSizeText = actualQuality.label;
  item.width = actualQuality.width || undefined;
  item.height = actualQuality.height || undefined;
  item.panType = panLabel;
  item.source = panLabel;
  item.sourceName = panLabel;
  item.group = panLabel;
  item.groupName = panLabel;
  item.subTitle = displaySizeText;
  item.subtitle = displaySizeText;
  item.remark = displaySizeText;
  item.sizeText = displaySizeText;
  item.fileSizeText = displaySizeText;
  item.realSizeText = sizeText;
  item.actualFileSizeText = sizeText;
  item.episodeText = episodeText;
  item.episode = sourceEpisodeNumber(name, description, meta);
  if (realSize > 0) {
    item.realSize = realSize;
    item.RealSize = realSize;
    item.actualSize = realSize;
    item.ActualSize = realSize;
    item.actualFileSize = realSize;
    item.fileRealSize = realSize;
    item.sourceSize = realSize;
    item.originalSize = realSize;
  }
  if (dataSize > 0) {
    item.dataSize = dataSize;
    item.size = dataSize;
    item.fileSize = dataSize;
    item.file_size = dataSize;
    item.videoFileSize = dataSize;
    item.resolutionVideoFileSize = dataSize;
    item.maxFileSize = dataSize;
    item.isFirstFileSize = true;
    var bitrate = sourceBitrateBitsPerSecond(dataSize, cfgParams);
    if (!bitrate) bitrate = sourceBitrateForMediaInfo(dataSize, cfgParams);
    if (bitrate > 0) {
      item.bitrate = bitrate;
      item.bitRate = bitrate;
      item.videoRate = bitrate;
      item.videoBitRate = bitrate;
      item.videoBitrate = bitrate;
      item.bitrateLabel = (bitrate / 1000000).toFixed(2) + "Mbps";
    }
  }
  var descText = description || "";
  item.description = [
    mediaTagLine(fileName || name, meta),
    actualQuality.label ? "清晰度: " + actualQuality.label : "",
    actualQuality.resolution ? "分辨率: " + actualQuality.resolution : "",
    displaySizeText ? "大小: " + displaySizeText : "",
    descText
  ].filter(Boolean).join("\n");
  item.link = item.link || item.url || item.videoUrl || "";
  item.isBest = true;
  item._isBest = true;
  item.isResolutionChecked = true;
  applyFastPlayFields(item, name, meta);
  item.id = [sourcePanLabel(displayName), displayName, sizeText, item.url || ""].filter(Boolean).join("|");
  applyMediaSourceFields(item, name, meta);
  return item;
}

function playbackPlayerTypeForName(name, headers) {
  return "system";
}

function attachPlaybackHeaders(item, headers) {
  if (!headers) return item;
  item.header = headers;
  item.headers = headers;
  item.customHeaders = headers;
  item.httpHeaders = headers;
  item.playHeaders = headers;
  if (headers.Cookie) {
    item.cookie = headers.Cookie;
    item.cookies = headers.Cookie;
  }
  return item;
}

function sourceFromUrl(name, url, description, headers, meta) {
  var safeUrl = normalizePlaybackUrl(url);
  var item = {
    type: "url",
    mediaType: "movie",
    name: name,
    title: name,
    description: description || "",
    url: safeUrl,
    link: safeUrl,
    videoUrl: safeUrl,
    playerType: playbackPlayerTypeForName(name, headers)
  };
  attachPlaybackHeaders(item, headers);
  return decorateSourceItem(item, name, description, meta);
}

function sourceFromRawUrl(name, url, description, headers, meta) {
  var safeUrl = String(url || "").trim().replace(/ /g, "%20");
  var item = {
    type: "url",
    mediaType: "movie",
    name: name,
    title: name,
    description: description || "",
    url: safeUrl,
    link: safeUrl,
    videoUrl: safeUrl,
    playerType: playbackPlayerTypeForName(name, headers)
  };
  attachPlaybackHeaders(item, headers);
  return decorateSourceItem(item, name, description, meta);
}

function baiduPreparePlaybackUrl(url) {
  var s = String(url || "").trim();
  var qIndex = s.indexOf("?");
  if (qIndex < 0) return s;
  var hash = "";
  var hashIndex = s.indexOf("#", qIndex + 1);
  if (hashIndex >= 0) {
    hash = s.slice(hashIndex);
    s = s.slice(0, hashIndex);
  }
  var base = s.slice(0, qIndex);
  var query = s.slice(qIndex + 1).split("&").map(function (part) {
    var eq = part.indexOf("=");
    if (eq < 0) return part;
    var key = part.slice(0, eq);
    var value = part.slice(eq + 1);
    if (key === "sign") {
      try { value = decodeURIComponent(value); } catch (e) {}
    }
    return key + "=" + value;
  }).join("&");
  return base + "?" + query + hash;
}

function panFastPlayValue(params, key, defVal) {
  return Math.max(1, hubanToInt(params && params[key], defVal));
}

function playbackFlagsForName(name, params, meta) {
  meta = meta || {};
  var fileName = playbackFileName(name, meta);
  var dataSize = sourceDataSize(meta, null);
  var bitRate = sourceBitrateForMediaInfo(dataSize, params || HUBAN_RUNTIME_PARAMS);
  var quality = sourceActualQualityConfig(fileName || name, "", meta);
  var parts = [
    "isVideo=true",
    "filename=" + encodeURIComponent(fileName),
    "fileName=" + encodeURIComponent(fileName),
    "server_filename=" + encodeURIComponent(fileName)
  ];
  if (quality.resolutionId) parts.push("resolutionId=" + encodeURIComponent(quality.resolutionId));
  if (dataSize > 0) {
    parts.push("videoFileSize=" + encodeURIComponent(String(Math.round(dataSize))));
    parts.push("size=" + encodeURIComponent(String(Math.round(dataSize))));
  }
  if (bitRate > 0) {
    parts.push("videoBitRate=" + encodeURIComponent(String(Math.round(bitRate))));
    parts.push("bitrate=" + encodeURIComponent(String(Math.round(bitRate))));
  }
  return "#" + parts.join("&") + "#";
}

function appendPlaybackFlags(url, name, params, meta) {
  var s = String(url || "");
  if (!s) return "";
  return s + (s.indexOf("#") >= 0 ? "" : playbackFlagsForName(name, params, meta));
}

async function probePlaybackUrl(url, headers) {
  try {
    var probeHeaders = Object.assign({}, headers || {}, { "Range": "bytes=0-1023" });
    var resp = await Widget.http.get(String(url || "").split("#")[0], { headers: probeHeaders, timeout: 15000 });
    var status = Number(resp && (resp.status || resp.statusCode || resp.code) || 0);
    var contentType = hubanText(getHeaderValue(resp && resp.headers, "content-type")).toLowerCase();
    var contentRange = hubanText(getHeaderValue(resp && resp.headers, "content-range")).toLowerCase();
    var body = resp && resp.data;
    var bodyText = typeof body === "string" ? body.slice(0, 80).toLowerCase() : "";
    var okStatus = status === 200 || status === 206 || status === 0;
    var looksBad = /image|text\/html|application\/json|xml/.test(contentType) || /<html|<\\?xml|requestdenied|forbidden/.test(bodyText);
    var looksVideo = /video|matroska|mp4|octet-stream/.test(contentType) || /bytes\s+\d+-\d+\/[1-9]\d{6,}/.test(contentRange);
    return { ok: okStatus && looksVideo && !looksBad, status: status, contentType: contentType, contentRange: contentRange };
  } catch (e) {
    return { ok: false, message: e && e.message || String(e) };
  }
}

async function sourceFromDirect(name, url, description, headers, params, meta) {
  meta = meta || {};
  meta.params = params || meta.params;
  if (/百度/.test(hubanText(name))) {
    var rawBaiduUrl = baiduPreparePlaybackUrl(url);
    return sourceFromRawUrl(name, appendPlaybackFlags(rawBaiduUrl, name, params, meta), description, headers || null, meta);
  }
  var targetUrl = normalizePlaybackUrl(url);
  return sourceFromUrl(name, appendPlaybackFlags(targetUrl, name, params, meta), description, headers || null, meta);
}

function sourcesFromLazyResult(prefix, result, description) {
  var out = [];
  if (!result) return out;
  var headers = result.header || result.headers || undefined;
  var url = result.url;
  if (Array.isArray(url)) {
    for (var i = 0; i < url.length; i += 2) {
      if (!url[i + 1]) continue;
      out.push(sourceFromUrl(prefix + " " + hubanText(url[i] || ("线路" + (i / 2 + 1))), String(url[i + 1]), description, headers));
    }
  } else if (url) {
    out.push(sourceFromUrl(prefix, String(url), description, headers));
  }
  return out;
}

function helperAvailable(name) {
  var g = typeof globalThis !== "undefined" ? globalThis : this;
  return !!g[name];
}

function getHeaderValue(headers, name) {
  if (!headers) return "";
  if (typeof headers.get === "function") return headers.get(name) || headers.get(name.toLowerCase()) || "";
  var lower = name.toLowerCase();
  for (var k in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, k) && String(k).toLowerCase() === lower) return headers[k];
  }
  return "";
}

function videoSeasonNumber(video) {
  var name = helperItemName(video);
  var s = hubanExtractSeason(name, "");
  if (!s && video && video.vod_group) {
    s = hubanExtractSeason(video.vod_group, "");
  }
  return s || 0;
}

function filterVideosForEpisode(videos, params) {
  var rawCount = Array.isArray(videos) ? videos.length : 0;
  var playable = (Array.isArray(videos) ? videos : []).filter(isPlayableVideoItem);
  var titleKept = playable.filter(function (video) {
    return itemMatchesWantedTitle(helperItemName(video), video && video.vod_group || "", params);
  });
  if (!titleKept.length && playable.length) {
    
    console.log("[huban] baidu title filter emptied list, fallback to playable-only", { rawCount: rawCount });
    titleKept = playable;
  }
  videos = titleKept;
  videos = filterTinyPlayableItems(videos, params);
  var wantSeason = hubanWantedSeason(params);
  if (wantSeason > 0) {
    
    var seasonDeterminable = videos.some(function (video) {
      return videoSeasonNumber(video) > 0;
    });
    if (seasonDeterminable) {
      var seasonMatched = videos.filter(function (video) {
        return videoSeasonNumber(video) === wantSeason;
      });
      console.log("[huban] baidu season filter", { wantSeason: wantSeason, before: videos.length, after: seasonMatched.length, strict: true });
      videos = seasonMatched;
    }
  }
  var wantEp = hubanWantedEpisode(params);
  var picked;
  if (!wantEp) {
    picked = videos;
  } else {
    var hasEpisodeMarkers = videos.some(function (video) {
      return !!helperEpisodeNumber(video, video && video.vod_group);
    });
    var matched = videos.filter(function (video) {
      var ep = helperEpisodeNumber(video, video && video.vod_group);
      return ep && ep === wantEp;
    });
    picked = matched.length || hasEpisodeMarkers ? matched : videos;
  }
  var unique = dedupeItemsBySize(picked);
  console.log("[huban] baidu size filter", {
    rawCount: rawCount,
    filteredCount: videos.length,
    pickedCount: picked.length,
    uniqueCount: unique.length,
    sizes: itemSizeSummary(unique)
  });
  return unique;
}

function helperItemName(item) {
  return hubanText((item && (item.file_name || item.name || item.FileName || item.server_filename || item.path)) || "");
}

function helperItemSize(item) {
  return hubanSizeText(item && (item.size || item.Size || item.file_size || item.FileSize));
}

function helperItemSizeNumber(item) {
  return Number(item && (item.size || item.Size || item.file_size || item.FileSize) || 0);
}

function helperEpisodeNumber(item, group) {
  var ep = hubanExtractEpisode(helperItemName(item));
  return ep || hubanExtractEpisode(group);
}

function sortItemsBySizeDesc(items) {
  return (Array.isArray(items) ? items : []).slice().sort(function (a, b) {
    return helperItemSizeNumber(b) - helperItemSizeNumber(a);
  });
}

function itemSizeDedupeKey(item) {
  var size = helperItemSizeNumber(item);
  return size > 0 ? String(Math.round(size)) : "";
}

function dedupeItemsBySize(items) {
  var out = [];
  var seen = {};
  items = sortItemsBySizeDesc(items);
  for (var i = 0; i < items.length; i++) {
    var key = itemSizeDedupeKey(items[i]);
    if (key && seen[key]) continue;
    if (key) seen[key] = true;
    out.push(items[i]);
  }
  return out;
}

function itemSizeSummary(items) {
  return (Array.isArray(items) ? items : []).slice(0, 8).map(function (item) {
    var size = helperItemSizeNumber(item);
    return size ? hubanCompactSizeText(hubanSizeText(size)) : "unknown";
  }).join("|");
}

function filterTinyPlayableItems(items, params) {
  if (!hubanWantedEpisode(params) && hubanText(params && params.type).toLowerCase() !== "movie") return items;
  var minBytes = 20 * 1024 * 1024;
  return (Array.isArray(items) ? items : []).filter(function (item) {
    var size = helperItemSizeNumber(item);
    return !size || size >= minBytes;
  });
}

function helperItemEpisodeText(item, group) {
  return [helperItemName(item), group].filter(Boolean).join(" ");
}

function wantedTitleNorms(params) {
  params = params || {};
  var out = [];
  function add(v) {
    v = hubanNorm(v);
    if (v && out.indexOf(v) < 0) out.push(v);
  }
  if (params.tmdbInfo) {
    add(params.tmdbInfo.title || params.tmdbInfo.name);
    add(params.tmdbInfo.originalTitle || params.tmdbInfo.originalName);
  }
  add(params.seriesName);
  add(params.title);
  add(params.name);
  return out;
}

function textMatchesWantedTitle(text, titleNorms) {
  var norm = hubanNorm(text);
  if (!norm || !titleNorms.length) return false;
  for (var i = 0; i < titleNorms.length; i++) {
    if (norm.indexOf(titleNorms[i]) >= 0 || titleNorms[i].indexOf(norm) >= 0) return true;
  }
  return false;
}

function itemLooksLikeDifferentTitle(name, titleNorms) {
  if (!titleNorms.length) return false;
  var raw = String(name || "").split(/[\\/]/).pop().replace(/\.(?:mp4|mkv|avi|mov|m4v|ts|m2ts|flv|wmv|webm|rmvb)$/i, "");
  var prefix = raw.split(/\bS\d{1,2}E\d{1,4}\b|第\s*\d{1,4}\s*[集话期]|\bEP?\s*\d{1,4}\b|(?:^|[\s._\-\[\(])0*\d{1,4}(?=$|[\s._\-\]\)集话期])/i)[0] || "";
  prefix = hubanText(prefix.replace(/[._\-\[\]【】()（）]/g, " "));
  if (!/[\u4e00-\u9fa5A-Za-z]{2,}/.test(prefix)) return false;
  return !textMatchesWantedTitle(prefix, titleNorms);
}

function itemMatchesWantedTitle(name, group, params) {
  var titleNorms = wantedTitleNorms(params);
  if (!titleNorms.length) return true;
  if (textMatchesWantedTitle(name, titleNorms)) return true;
  if (textMatchesWantedTitle(group, titleNorms)) return true;
  if (itemLooksLikeDifferentTitle(name, titleNorms)) {
    if (!hubanWantedEpisode(params) && hubanText(params && params.type).toLowerCase() === "movie") return true;
    return false;
  }
  return true;
}

function sortItemsByEpisodeDesc(items, textFn) {
  return (Array.isArray(items) ? items : []).slice().sort(function (a, b) {
    var ea = hubanExtractEpisode(textFn(a));
    var eb = hubanExtractEpisode(textFn(b));
    if (ea || eb) return (eb || -1) - (ea || -1);
    return 0;
  });
}

function episodeSummary(items, textFn) {
  var list = (Array.isArray(items) ? items : []).slice(0, 8).map(function (item) {
    var text = textFn(item);
    var ep = hubanExtractEpisode(text);
    return (ep ? "E" + ep + " " : "") + hubanText(text).slice(0, 80);
  });
  return list.join(" | ");
}

function filterHelperItemsForEpisode(items, params, group) {
  var rawCount = Array.isArray(items) ? items.length : 0;
  var playable = (Array.isArray(items) ? items : []).filter(function (item) {
    return isPlayableVideoName(helperItemName(item));
  });
  var titleKept = playable.filter(function (item) {
    return itemMatchesWantedTitle(helperItemName(item), group, params);
  });
  if (!titleKept.length && playable.length) {
    console.log("[huban] baidu helper title filter emptied list, fallback to playable-only", { rawCount: rawCount });
    titleKept = playable;
  }
  items = titleKept;
  items = filterTinyPlayableItems(items, params);
  
  var wantSeasonH = hubanWantedSeason(params);
  if (wantSeasonH > 0) {
    function helperSeasonNumber(item) {
      var s = hubanExtractSeason(helperItemName(item), "");
      if (!s && group) s = hubanExtractSeason(group, "");
      return s || 0;
    }
    var seasonDeterminableH = items.some(function (item) {
      return helperSeasonNumber(item) > 0;
    });
    if (seasonDeterminableH) {
      var seasonMatchedH = items.filter(function (item) {
        return helperSeasonNumber(item) === wantSeasonH;
      });
      console.log("[huban] baidu helper season filter", { wantSeason: wantSeasonH, before: items.length, after: seasonMatchedH.length, strict: true });
      items = seasonMatchedH;
    }
  }
  var wantEp = hubanWantedEpisode(params);
  var picked;
  if (!wantEp) {
    picked = items;
  } else {
    var hasEpisodeMarkers = items.some(function (item) {
      return !!helperEpisodeNumber(item, group);
    });
    var matched = items.filter(function (item) {
      var ep = helperEpisodeNumber(item, group);
      return ep && ep === wantEp;
    });
    picked = matched.length || hasEpisodeMarkers ? matched : items;
  }
  var unique = dedupeItemsBySize(picked);
  console.log("[huban] baidu helper size filter", {
    rawCount: rawCount,
    filteredCount: items.length,
    pickedCount: picked.length,
    uniqueCount: unique.length,
    sizes: itemSizeSummary(unique)
  });
  return unique;
}

function panPriority(type, params) {
  var order = ["百度", "网盘"];
  var idx = order.indexOf(type);
  return idx >= 0 ? idx : order.length;
}

function panEnabled(type, params) {
  return type === "百度";
}

function sourceLimitForPan(type, params) {
  if (type === "百度" && fastLoadEnabled(params)) return 1;
  var limit = type === "百度" ? Math.max(1, hubanToInt(params && params.baidu_max_files, HUBAN_BUILTIN_BAIDU_MAX_FILES)) : 1;
  return limit;
}

function sortLinesByPan(lines, params) {
  return (Array.isArray(lines) ? lines : []).slice().sort(function (a, b) {
    return panPriority(a && a.panType, params) - panPriority(b && b.panType, params);
  });
}

function panTypesSummary(lines) {
  var seen = {};
  var out = [];
  (Array.isArray(lines) ? lines : []).forEach(function (line) {
    var type = line && (line.panType || detectPanType(line.shareUrl)) || "";
    if (type && !seen[type]) {
      seen[type] = true;
      out.push(type);
    }
  });
  return out.join(",");
}

function candidateScanLimit(params) {
  return HUBAN_BUILTIN_CANDIDATE_SCAN_LIMIT;
}

function searchExtraAfterHit(params) {
  if (fastLoadEnabled(params)) return 0;
  return hubanBoundInt(params && params.search_extra_after_hit, HUBAN_BUILTIN_SEARCH_EXTRA_AFTER_HIT, 0, 40);
}

function shouldKeepPanLine(type, params) {
  return type === "百度" && canResolvePanType(type, params);
}

function canResolvePanType(type, params) {
  if (!panEnabled(type, params)) return false;
  if (type === "百度") return !!baiduCookie(params) || helperAvailable("Baidu2") || helperAvailable("Baidu");
  return false;
}

function resolvableTargetPans(params, targetPanType) {
  var base = targetPanType ? [targetPanType] : ["百度"];
  var out = [];
  for (var i = 0; i < base.length; i++) {
    var type = base[i];
    if (panEnabled(type, params) && canResolvePanType(type, params)) out.push(type);
  }
  return out;
}

function panLimitsReached(panCounts, params, targetPanType) {
  var pans = resolvableTargetPans(params, targetPanType);
  if (!pans.length) return false;
  for (var i = 0; i < pans.length; i++) {
    if ((panCounts[pans[i]] || 0) < sourceLimitForPan(pans[i], params)) return false;
  }
  return true;
}

function preferredOnlyLines(lines, params) {
  lines = sortLinesByPan(lines, params);
  var out = [];
  var seenPan = {};
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (!line) continue;
    var type = line.panType || detectPanType(line.shareUrl);
    if (!panEnabled(type, params)) continue;
    if (shouldKeepPanLine(type, params)) {
      seenPan[type] = (seenPan[type] || 0) + 1;
      out.push(line);
    }
  }
  return out;
}

function baiduPlaybackHeaders(params) {
  var headers = {
    "User-Agent": "netdisk;P2SP;2.2.91.136;android-android;",
    "Referer": "https://pan.baidu.com/"
  };
  var cookie = baiduCookie(params);
  if (cookie) headers.Cookie = cookie;
  return headers;
}

function baiduCookie(params) {
  return hubanText((params && (params.baidu_cookie || params.baiduCookie)) || HUBAN_RUNTIME_PARAMS.baidu_cookie || HUBAN_RUNTIME_PARAMS.baiduCookie || "");
}

function setBaiduCookie(params, cookie) {
  cookie = hubanText(cookie);
  if (!cookie) return;
  HUBAN_RUNTIME_PARAMS.baidu_cookie = cookie;
  if (params) params.baidu_cookie = cookie;
}

function baiduApplyRandsk(params, randsk) {
  randsk = hubanText(randsk);
  if (!randsk) return;
  var cookie = baiduCookie(params).replace(/BDCLND=[^;]*;?\s*/g, "");
  if (cookie && !/;\s*$/.test(cookie)) cookie += "; ";
  setBaiduCookie(params, cookie + "BDCLND=" + randsk);
}

function baiduBaseHeaders(params) {
  return {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip",
    "Content-Type": "application/x-www-form-urlencoded",
    "Referer": "https://pan.baidu.com",
    "Cookie": baiduCookie(params)
  };
}

function baiduQuery(data) {
  var out = [];
  data = data || {};
  for (var k in data) {
    if (!Object.prototype.hasOwnProperty.call(data, k)) continue;
    if (data[k] == null) continue;
    out.push(encodeURIComponent(k) + "=" + encodeURIComponent(data[k]));
  }
  return out.join("&");
}

function baiduJson(resp) {
  var data = resp && resp.data;
  if (typeof data === "string") {
    try { return JSON.parse(data); } catch (e) { return {}; }
  }
  return data || {};
}

function baiduStatus(resp) {
  return Number(resp && (resp.status || resp.statusCode || resp.code) || 200);
}

async function baiduApi(path, data, headers, method, params, retry) {
  retry = retry == null ? 3 : retry;
  var fullUrl = /^https?:\/\//i.test(path) ? path : "https://pan.baidu.com/" + path.replace(/^\/+/, "");
  var mergedHeaders = Object.assign({}, baiduBaseHeaders(params), headers || {});
  var resp;
  if (String(method || "post").toLowerCase() === "get") {
    var query = baiduQuery(data);
    resp = await Widget.http.get(fullUrl + (query ? (fullUrl.indexOf("?") >= 0 ? "&" : "?") + query : ""), {
      headers: mergedHeaders,
      timeout: 30000
    });
  } else {
    resp = await Widget.http.post(fullUrl, baiduQuery(data), {
      headers: mergedHeaders,
      timeout: 30000
    });
  }
  var status = baiduStatus(resp);
  if ((status === 429 || status === 503) && retry > 0) {
    await hubanSleep((4 - retry) * 1000);
    return baiduApi(path, data, headers, method, params, retry - 1);
  }
  return baiduJson(resp);
}

function baiduParseShare(url) {
  try {
    url = decodeURIComponent(String(url || "")).replace(/\s+/g, "");
  } catch (e) {
    url = String(url || "").replace(/\s+/g, "");
  }
  var m = url.match(/pan\.baidu\.com\/(?:s\/|wap\/init\?surl=)([^?&#]+)/i);
  if (!m) return null;
  var shareId = String(m[1] || "").split("?")[0].split("#")[0];
  if (!shareId) return null;
  var pwd = "";
  var pm = url.match(/(?:提取码|密码|pwd)[:=：\s]*([^&\s#]{4})/i);
  if (pm) pwd = pm[1];
  return { shareId: shareId, sharePwd: pwd };
}

function baiduShareIdVariants(shareId) {
  shareId = String(shareId || "");
  if (!shareId) return [];
  var stripped = shareId.replace(/^1+/, "");
  var singleOne = "1" + stripped;
  var out = [];
  if (stripped && out.indexOf(stripped) < 0) out.push(stripped);
  if (singleOne && out.indexOf(singleOne) < 0) out.push(singleOne);
  if (shareId && out.indexOf(shareId) < 0) out.push(shareId);
  return out.length ? out : [shareId];
}

function hubanExtractSharePwd(text) {
  var m = String(text || "").match(/(?:提取码|访问码|取件码|密码|pwd)\s*[:：=]?\s*([A-Za-z0-9]{4})(?![A-Za-z0-9])/i);
  return m ? m[1] : "";
}

function hubanAttachSharePwd(shareUrl, contextText) {
  shareUrl = String(shareUrl || "");
  if (!shareUrl) return shareUrl;
  var parsed = null;
  try { parsed = baiduParseShare(shareUrl); } catch (e) { parsed = null; }
  if (parsed && parsed.sharePwd) return shareUrl;
  var pwd = hubanExtractSharePwd(contextText);
  if (!pwd) return shareUrl;
  return shareUrl + (shareUrl.indexOf("#") >= 0 ? "&pwd=" + pwd : "#pwd=" + pwd);
}

function sha1Hex(message) {
  function rotl(n, s) { return (n << s) | (n >>> (32 - s)); }
  function hex(n) {
    var s = "";
    for (var i = 7; i >= 0; i--) s += ((n >>> (i * 4)) & 0x0f).toString(16);
    return s;
  }
  function utf8Bytes(text) {
    var encoded = encodeURIComponent(String(text || ""));
    var out = "";
    for (var bi = 0; bi < encoded.length; bi++) {
      if (encoded.charAt(bi) === "%") {
        out += String.fromCharCode(parseInt(encoded.slice(bi + 1, bi + 3), 16));
        bi += 2;
      } else {
        out += encoded.charAt(bi);
      }
    }
    return out;
  }
  var msg = utf8Bytes(message);
  var words = [];
  for (var i = 0; i < msg.length; i++) {
    words[i >> 2] |= msg.charCodeAt(i) << (24 - (i % 4) * 8);
  }
  words[msg.length >> 2] |= 0x80 << (24 - (msg.length % 4) * 8);
  words[(((msg.length + 8) >> 6) << 4) + 15] = msg.length * 8;
  var h0 = 0x67452301, h1 = 0xefcdab89, h2 = 0x98badcfe, h3 = 0x10325476, h4 = 0xc3d2e1f0;
  for (var block = 0; block < words.length; block += 16) {
    var w = [];
    for (i = 0; i < 80; i++) {
      w[i] = i < 16 ? (words[block + i] || 0) : rotl(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1);
    }
    var a = h0, b = h1, c = h2, d = h3, e = h4;
    for (i = 0; i < 80; i++) {
      var f, k;
      if (i < 20) { f = (b & c) | ((~b) & d); k = 0x5a827999; }
      else if (i < 40) { f = b ^ c ^ d; k = 0x6ed9eba1; }
      else if (i < 60) { f = (b & c) | (b & d) | (c & d); k = 0x8f1bbcdc; }
      else { f = b ^ c ^ d; k = 0xca62c1d6; }
      var temp = (rotl(a, 5) + f + e + k + w[i]) | 0;
      e = d; d = c; c = rotl(b, 30); b = a; a = temp;
    }
    h0 = (h0 + a) | 0; h1 = (h1 + b) | 0; h2 = (h2 + c) | 0; h3 = (h3 + d) | 0; h4 = (h4 + e) | 0;
  }
  return hex(h0) + hex(h1) + hex(h2) + hex(h3) + hex(h4);
}

function hubanUtf8Bytes(text) {
  var encoded = encodeURIComponent(String(text || ""));
  var out = [];
  for (var i = 0; i < encoded.length; i++) {
    if (encoded.charAt(i) === "%") {
      out.push(parseInt(encoded.slice(i + 1, i + 3), 16));
      i += 2;
    } else {
      out.push(encoded.charCodeAt(i));
    }
  }
  return out;
}

function md5Hex(message) {
  function add32(a, b) { return (a + b) & 0xffffffff; }
  function rol(num, cnt) { return (num << cnt) | (num >>> (32 - cnt)); }
  function cmn(q, a, b, x, s, t) { return add32(rol(add32(add32(a, q), add32(x, t)), s), b); }
  function ff(a, b, c, d, x, s, t) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); }
  function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); }
  function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
  function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | (~d)), a, b, x, s, t); }
  function rhex(n) {
    var s = "";
    for (var j = 0; j < 4; j++) s += ("0" + ((n >> (j * 8)) & 255).toString(16)).slice(-2);
    return s;
  }
  var bytes = hubanUtf8Bytes(message);
  var words = [];
  for (var i = 0; i < bytes.length; i++) words[i >> 2] = (words[i >> 2] || 0) | (bytes[i] << ((i % 4) * 8));
  words[bytes.length >> 2] = (words[bytes.length >> 2] || 0) | (0x80 << ((bytes.length % 4) * 8));
  words[((((bytes.length + 8) >> 6) + 1) * 16) - 2] = bytes.length * 8;
  var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
  for (i = 0; i < words.length; i += 16) {
    var oa = a, ob = b, oc = c, od = d;
    a = ff(a, b, c, d, words[i + 0] || 0, 7, -680876936); d = ff(d, a, b, c, words[i + 1] || 0, 12, -389564586);
    c = ff(c, d, a, b, words[i + 2] || 0, 17, 606105819); b = ff(b, c, d, a, words[i + 3] || 0, 22, -1044525330);
    a = ff(a, b, c, d, words[i + 4] || 0, 7, -176418897); d = ff(d, a, b, c, words[i + 5] || 0, 12, 1200080426);
    c = ff(c, d, a, b, words[i + 6] || 0, 17, -1473231341); b = ff(b, c, d, a, words[i + 7] || 0, 22, -45705983);
    a = ff(a, b, c, d, words[i + 8] || 0, 7, 1770035416); d = ff(d, a, b, c, words[i + 9] || 0, 12, -1958414417);
    c = ff(c, d, a, b, words[i + 10] || 0, 17, -42063); b = ff(b, c, d, a, words[i + 11] || 0, 22, -1990404162);
    a = ff(a, b, c, d, words[i + 12] || 0, 7, 1804603682); d = ff(d, a, b, c, words[i + 13] || 0, 12, -40341101);
    c = ff(c, d, a, b, words[i + 14] || 0, 17, -1502002290); b = ff(b, c, d, a, words[i + 15] || 0, 22, 1236535329);
    a = gg(a, b, c, d, words[i + 1] || 0, 5, -165796510); d = gg(d, a, b, c, words[i + 6] || 0, 9, -1069501632);
    c = gg(c, d, a, b, words[i + 11] || 0, 14, 643717713); b = gg(b, c, d, a, words[i + 0] || 0, 20, -373897302);
    a = gg(a, b, c, d, words[i + 5] || 0, 5, -701558691); d = gg(d, a, b, c, words[i + 10] || 0, 9, 38016083);
    c = gg(c, d, a, b, words[i + 15] || 0, 14, -660478335); b = gg(b, c, d, a, words[i + 4] || 0, 20, -405537848);
    a = gg(a, b, c, d, words[i + 9] || 0, 5, 568446438); d = gg(d, a, b, c, words[i + 14] || 0, 9, -1019803690);
    c = gg(c, d, a, b, words[i + 3] || 0, 14, -187363961); b = gg(b, c, d, a, words[i + 8] || 0, 20, 1163531501);
    a = gg(a, b, c, d, words[i + 13] || 0, 5, -1444681467); d = gg(d, a, b, c, words[i + 2] || 0, 9, -51403784);
    c = gg(c, d, a, b, words[i + 7] || 0, 14, 1735328473); b = gg(b, c, d, a, words[i + 12] || 0, 20, -1926607734);
    a = hh(a, b, c, d, words[i + 5] || 0, 4, -378558); d = hh(d, a, b, c, words[i + 8] || 0, 11, -2022574463);
    c = hh(c, d, a, b, words[i + 11] || 0, 16, 1839030562); b = hh(b, c, d, a, words[i + 14] || 0, 23, -35309556);
    a = hh(a, b, c, d, words[i + 1] || 0, 4, -1530992060); d = hh(d, a, b, c, words[i + 4] || 0, 11, 1272893353);
    c = hh(c, d, a, b, words[i + 7] || 0, 16, -155497632); b = hh(b, c, d, a, words[i + 10] || 0, 23, -1094730640);
    a = hh(a, b, c, d, words[i + 13] || 0, 4, 681279174); d = hh(d, a, b, c, words[i + 0] || 0, 11, -358537222);
    c = hh(c, d, a, b, words[i + 3] || 0, 16, -722521979); b = hh(b, c, d, a, words[i + 6] || 0, 23, 76029189);
    a = hh(a, b, c, d, words[i + 9] || 0, 4, -640364487); d = hh(d, a, b, c, words[i + 12] || 0, 11, -421815835);
    c = hh(c, d, a, b, words[i + 15] || 0, 16, 530742520); b = hh(b, c, d, a, words[i + 2] || 0, 23, -995338651);
    a = ii(a, b, c, d, words[i + 0] || 0, 6, -198630844); d = ii(d, a, b, c, words[i + 7] || 0, 10, 1126891415);
    c = ii(c, d, a, b, words[i + 14] || 0, 15, -1416354905); b = ii(b, c, d, a, words[i + 5] || 0, 21, -57434055);
    a = ii(a, b, c, d, words[i + 12] || 0, 6, 1700485571); d = ii(d, a, b, c, words[i + 3] || 0, 10, -1894986606);
    c = ii(c, d, a, b, words[i + 10] || 0, 15, -1051523); b = ii(b, c, d, a, words[i + 1] || 0, 21, -2054922799);
    a = ii(a, b, c, d, words[i + 8] || 0, 6, 1873313359); d = ii(d, a, b, c, words[i + 15] || 0, 10, -30611744);
    c = ii(c, d, a, b, words[i + 6] || 0, 15, -1560198380); b = ii(b, c, d, a, words[i + 13] || 0, 21, 1309151649);
    a = ii(a, b, c, d, words[i + 4] || 0, 6, -145523070); d = ii(d, a, b, c, words[i + 11] || 0, 10, -1120210379);
    c = ii(c, d, a, b, words[i + 2] || 0, 15, 718787259); b = ii(b, c, d, a, words[i + 9] || 0, 21, -343485551);
    a = add32(a, oa); b = add32(b, ob); c = add32(c, oc); d = add32(d, od);
  }
  return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}

function sha256Hex(message) {
  function rotr(n, x) { return (x >>> n) | (x << (32 - n)); }
  function hex(n) { return ("00000000" + (n >>> 0).toString(16)).slice(-8); }
  var k = [
    0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
    0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
    0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
    0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
    0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
    0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
    0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
    0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2
  ];
  var bytes = hubanUtf8Bytes(message);
  var bitLen = bytes.length * 8;
  bytes.push(0x80);
  while ((bytes.length % 64) !== 56) bytes.push(0);
  for (var bi = 7; bi >= 0; bi--) bytes.push((bitLen / Math.pow(2, bi * 8)) & 255);
  var h = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
  for (var i = 0; i < bytes.length; i += 64) {
    var w = [];
    for (var j = 0; j < 16; j++) w[j] = ((bytes[i + j * 4] << 24) | (bytes[i + j * 4 + 1] << 16) | (bytes[i + j * 4 + 2] << 8) | bytes[i + j * 4 + 3]) >>> 0;
    for (j = 16; j < 64; j++) {
      var s0 = rotr(7, w[j - 15]) ^ rotr(18, w[j - 15]) ^ (w[j - 15] >>> 3);
      var s1 = rotr(17, w[j - 2]) ^ rotr(19, w[j - 2]) ^ (w[j - 2] >>> 10);
      w[j] = (w[j - 16] + s0 + w[j - 7] + s1) >>> 0;
    }
    var a = h[0], b = h[1], c = h[2], d = h[3], e = h[4], f = h[5], g = h[6], hh = h[7];
    for (j = 0; j < 64; j++) {
      var S1 = rotr(6, e) ^ rotr(11, e) ^ rotr(25, e);
      var ch = (e & f) ^ ((~e) & g);
      var temp1 = (hh + S1 + ch + k[j] + w[j]) >>> 0;
      var S0 = rotr(2, a) ^ rotr(13, a) ^ rotr(22, a);
      var maj = (a & b) ^ (a & c) ^ (b & c);
      var temp2 = (S0 + maj) >>> 0;
      hh = g; g = f; f = e; e = (d + temp1) >>> 0; d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
    }
    h[0] = (h[0] + a) >>> 0; h[1] = (h[1] + b) >>> 0; h[2] = (h[2] + c) >>> 0; h[3] = (h[3] + d) >>> 0;
    h[4] = (h[4] + e) >>> 0; h[5] = (h[5] + f) >>> 0; h[6] = (h[6] + g) >>> 0; h[7] = (h[7] + hh) >>> 0;
  }
  return h.map(hex).join("");
}

function baiduCookieDigest(params) {
  var parts = baiduCookie(params)
    .replace(/BDCLND=[^;]*;?\s*/g, "")
    .split(";")
    .map(function (part) { return hubanText(part); })
    .filter(Boolean);
  var cookie = parts.join(";");
  return cookie ? sha256Hex(cookie).slice(0, 32) : "nocookie";
}

async function baiduGetUid(params) {
  var cookie = baiduCookie(params);
  if (!cookie) return "";
  var digest = baiduCookieDigest(params);
  var cacheKey = "uid::" + digest;
  var cached = hubanCacheGetWithTtl(BAIDU_UID_CACHE, cacheKey, BAIDU_UID_CACHE_TTL_MS);
  if (cached) {
    console.log("[huban] baidu uid cacheHit", { level: "memory" });
    return cached;
  }
  var storageKey = "huban.baidu.uid." + digest;
  cached = hubanStorageGet(storageKey, BAIDU_UID_CACHE_TTL_MS);
  if (cached) {
    hubanCacheSet(BAIDU_UID_CACHE, cacheKey, cached);
    console.log("[huban] baidu uid cacheHit", { level: "storage" });
    return cached;
  }
  if (BAIDU_UID_PENDING_CACHE[cacheKey]) {
    console.log("[huban] baidu uid cacheHit", { level: "pending" });
    return BAIDU_UID_PENDING_CACHE[cacheKey];
  }
  console.log("[huban] baidu uid cacheMiss");
  var pending = Widget.http.get("https://mbd.baidu.com/userx/v1/info/get?appname=baiduboxapp&fields=%20%20%20%20%20%20%20%20%5B%22bg_image%22,%22member%22,%22uid%22,%22avatar%22,%20%22avatar_member%22%5D&client&clientfrom&lang=zh-cn&tpl&ttt", {
    headers: {
      "User-Agent": baiduBaseHeaders(params)["User-Agent"],
      "Cookie": cookie
    },
    timeout: 20000
  }).then(function (resp) {
    var data = baiduJson(resp);
    var uid = data && data.data && data.data.fields && data.data.fields.uid || "";
    if (uid) {
      hubanCacheSet(BAIDU_UID_CACHE, cacheKey, uid);
      hubanStorageSet(storageKey, uid);
    }
    return uid;
  }).then(function (uid) {
    delete BAIDU_UID_PENDING_CACHE[cacheKey];
    return uid;
  }, function (e) {
    delete BAIDU_UID_PENDING_CACHE[cacheKey];
    throw e;
  });
  BAIDU_UID_PENDING_CACHE[cacheKey] = pending;
  return pending;
}

async function baiduShareToken(shareData, params) {
  var cacheKey = shareData.shareId + "::" + (shareData.sharePwd || "") + "::" + baiduCookieDigest(params);
  var cached = hubanCacheGet(BAIDU_SHARE_CACHE, cacheKey);
  if (cached) {
    baiduApplyRandsk(params, cached.randsk);
    console.log("[huban] baidu share cacheHit");
    return cached;
  }
  console.log("[huban] baidu share cacheMiss");
  
  var variants = baiduShareIdVariants(shareData.shareId);
  var verify = null;
  var usedShareId = shareData.shareId;
  for (var vi = 0; vi < variants.length; vi++) {
    var vid = variants[vi];
    var v = await baiduApi("share/verify?t=" + Date.now() + "&surl=" + encodeURIComponent(vid), {
      pwd: shareData.sharePwd || ""
    }, null, "post", params);
    if (v && v.errno === 105 && vi + 1 < variants.length) {
      console.log("[huban] baidu verify 105, retry alternate surl form", { from: vid, to: variants[vi + 1] });
      continue;
    }
    verify = v;
    usedShareId = vid;
    break;
  }
  if (verify && verify.randsk) {
    baiduApplyRandsk(params, verify.randsk);
  }
  if (verify && verify.errno !== 0) {
    
    console.warn("[huban] baidu verify failed", { errno: verify.errno, shareId: usedShareId, hasPwd: !!(shareData && shareData.sharePwd) });
  }
  var listData = await baiduApi("share/list", {
    shorturl: usedShareId,
    root: 1,
    page: 1,
    num: 100
  }, null, "get", params);
  if (listData && listData.errno !== 0 && verify && verify.randsk) {
    listData = await baiduApi("share/list", {
      shorturl: usedShareId,
      root: 1,
      page: 1,
      num: 100
    }, null, "get", params);
  }
  if (listData && listData.errno !== 0) {
    console.warn("[huban] baidu list failed", { errno: listData.errno });
  }
  var token = {
    list: listData && listData.list || [],
    uk: listData && (listData.uk || listData.share_uk) || "",
    shareid: listData && listData.share_id || verify && verify.share_id || "",
    randsk: verify && verify.randsk || ""
  };
  if (token.shareid && token.uk) hubanCacheSet(BAIDU_SHARE_CACHE, cacheKey, token);
  return token;
}

async function baiduListShareVideos(shareUrl, params) {
  var shareData = baiduParseShare(shareUrl);
  if (!shareData) return [];
  var wantEp = hubanWantedEpisode(params);
  var wantSeason = hubanWantedSeason(params);
  var fastStop = fastLoadEnabled(params) && wantEp > 0;
  var maxMatches = Math.max(1, sourceLimitForPan("百度", params));
  var cacheKey = [
    shareData.shareId,
    shareData.sharePwd || "",
    baiduCookieDigest(params),
    "ep=" + (wantEp || "all"),
    "season=" + (hubanWantedSeason(params) || "all"),
    "mode=" + loadSpeedMode(params),
    "limit=" + maxMatches
  ].join("::");
  var cached = hubanCacheGet(BAIDU_VIDEO_LIST_CACHE, cacheKey);
  if (cached) {
    console.log("[huban] baidu video list cacheHit", { count: cached.length, mode: loadSpeedMode(params) });
    return cached;
  }
  console.log("[huban] baidu video list cacheMiss", { mode: loadSpeedMode(params), episode: wantEp || "" });
  var token = await baiduShareToken(shareData, params);
  if (!token || !token.shareid || !token.uk) return [];
  var videos = [];
  var matchedCount = 0;
  var matchedSizes = {};
  var stopped = false;
  function itemEpisodeText(item, group) {
    return [item && item.server_filename || "", group || ""].filter(Boolean).join(" ");
  }
  function itemMatchesWanted(item, group) {
    if (wantEp <= 0) return false;
    var name = item && item.server_filename || "";
    var ep = hubanExtractEpisode(name);
    if (!ep) ep = hubanExtractEpisode(group);
    if (!ep || ep !== wantEp) return false;
    
    if (wantSeason > 0) {
      var s = hubanExtractSeason(name, "");
      if (!s) s = hubanExtractSeason(group, "");
      if (s > 0 && s !== wantSeason) return false;
    }
    return true;
  }
  function orderedList(list, group) {
    list = (Array.isArray(list) ? list : []).slice();
    if (!fastStop) return list;
    return list.sort(function (a, b) {
      
      if (wantSeason > 0) {
        var aIsDir = String(a.isdir) === "1";
        var bIsDir = String(b.isdir) === "1";
        if (aIsDir || bIsDir) {
          var aSeasonHit = aIsDir && hubanExtractSeason(a.server_filename || "", "") === wantSeason;
          var bSeasonHit = bIsDir && hubanExtractSeason(b.server_filename || "", "") === wantSeason;
          var dirDelta = (bSeasonHit ? 1 : 0) - (aSeasonHit ? 1 : 0);
          if (dirDelta) return dirDelta;
        }
      }
      var matchDelta = (itemMatchesWanted(b, group) ? 1 : 0) - (itemMatchesWanted(a, group) ? 1 : 0);
      if (matchDelta) return matchDelta;
      return helperItemSizeNumber(b) - helperItemSizeNumber(a);
    });
  }
  function addVideo(item, group) {
    var video = {
      fid: item.fs_id,
      file_name: item.server_filename,
      size: item.size,
      vod_group: group || "",
      shareId: shareData.shareId,
      baiduToken: token
    };
    videos.push(video);
    if (fastStop && itemMatchesWanted(item, group)) {
      var sizeKey = itemSizeDedupeKey(video) || ("unknown:" + matchedCount);
      if (!matchedSizes[sizeKey]) {
        matchedSizes[sizeKey] = true;
        matchedCount++;
      }
      if (matchedCount >= maxMatches) {
        stopped = true;
        return true;
      }
    }
    return false;
  }
  async function walk(dirPath, dirFsId, group) {
    if (stopped) return;
    var shareDir = "/sharelink" + token.shareid + "-" + dirFsId + dirPath;
    var data = await baiduApi("share/list", {
      sekey: token.randsk,
      uk: token.uk,
      shareid: token.shareid,
      page: 1,
      num: 100,
      dir: shareDir
    }, null, "get", params);
    var list = orderedList(data && data.list || [], group);
    for (var i = 0; i < list.length; i++) {
      if (stopped) break;
      var item = list[i] || {};
      if (String(item.isdir) === "1") {
        await walk(dirPath + "/" + item.server_filename, item.fs_id, group ? group + "/" + item.server_filename : item.server_filename);
      } else if (isPlayableVideoName(item.server_filename || "")) {
        if (addVideo(item, group)) break;
      }
    }
  }
  var root = orderedList(token.list || [], "");
  for (var i = 0; i < root.length; i++) {
    if (stopped) break;
    var item = root[i] || {};
    if (String(item.isdir) === "1") {
      await walk("/" + item.server_filename, item.fs_id, item.server_filename || "");
    } else if (isPlayableVideoName(item.server_filename || "")) {
      if (addVideo(item, "")) break;
    }
  }
  if (stopped) {
    console.log("[huban] baidu list early stop", { episode: wantEp, collected: videos.length, matched: matchedCount });
  }
  if (videos.length) hubanCacheSet(BAIDU_VIDEO_LIST_CACHE, cacheKey, videos);
  return videos;
}

async function baiduDirectPlayUrl(video, params, uidPromise) {
  var token = video && video.baiduToken || {};
  var cacheKey = token.shareid && token.uk && video && video.fid
    ? [token.shareid, token.uk, video.fid, baiduCookieDigest(params)].join("::")
    : "";
  if (cacheKey) {
    var cached = hubanCacheGet(BAIDU_DIRECT_CACHE, cacheKey);
    if (cached) {
      console.log("[huban] baidu direct cacheHit", { fid: String(video.fid || "").slice(0, 8) });
      return cached;
    }
    console.log("[huban] baidu direct cacheMiss", { fid: String(video.fid || "").slice(0, 8) });
  }
  var uid = uidPromise ? await uidPromise.catch(function () { return ""; }) : await baiduGetUid(params);
  var bdussMatch = baiduCookie(params).match(/BDUSS=([^;]+)/);
  if (!uid || !bdussMatch) return "";
  var time = String(Date.now());
  var rand = sha1Hex(sha1Hex(bdussMatch[1]) + uid + "ebrcUYiuxaZv2XGu7KIYKxUrqfnOfpDF" + time + BAIDU_UZ_DEVUID + "11.30.2ae5821440fab5e1a61a025f014bd8972");
  var data = await baiduApi("share/list", {
    shareid: token.shareid,
    uk: token.uk,
    fid: video.fid,
    sekey: token.randsk,
    origin: "dlna",
    devuid: BAIDU_UZ_DEVUID,
    clienttype: 1,
    channel: "android_12_zhao_bd-netdisk_1024266h",
    version: "11.30.2",
    time: time,
    rand: rand
  }, {
    "User-Agent": "netdisk;P2SP;2.2.91.136;android-android;",
    "Cookie": baiduCookie(params)
  }, "get", params);
  var list = data && data.list || [];
  var dlink = list[0] && list[0].dlink || "";
  if (dlink && cacheKey) hubanCacheSet(BAIDU_DIRECT_CACHE, cacheKey, dlink);
  return dlink;
}

async function baiduSourceFromVideo(video, line, params, uidPromise) {
  video = video || {};
  var directUrl = await baiduDirectPlayUrl(video, params, uidPromise);
  if (!directUrl) return null;
  var vName = video.file_name || "";
  var vSize = hubanSizeText(video.size);
  var vDesc = [line.title, video.vod_group, vName, vSize ? "大小: " + vSize : "", line.shareUrl].filter(Boolean).join("\n");
  return sourceFromDirect("虎斑[盘] 百度 " + vName + (vSize ? " " + vSize : ""), directUrl, vDesc, baiduPlaybackHeaders(params), params, { name: vName, size: Number(video.size || 0) });
}

async function baiduSourcesFromVideos(videos, line, params, uidPromise, maxFiles) {
  videos = Array.isArray(videos) ? videos : [];
  maxFiles = Math.max(1, Number(maxFiles || 1));
  var concurrency = fastLoadEnabled(params) ? 1 : BAIDU_DIRECT_CONCURRENCY_FULL;
  var out = [];
  console.log("[huban] baidu direct concurrency", {
    mode: loadSpeedMode(params),
    concurrency: concurrency,
    candidates: videos.length,
    maxFiles: maxFiles
  });
  for (var i = 0; i < videos.length && out.length < maxFiles; i += concurrency) {
    var remaining = maxFiles - out.length;
    var batch = videos.slice(i, i + Math.min(concurrency, remaining));
    var sources = await Promise.all(batch.map(function (video) {
      return baiduSourceFromVideo(video, line, params, uidPromise).catch(function (e) {
        console.warn("[huban] baidu direct source failed", { message: e && e.message || String(e) });
        return null;
      });
    }));
    for (var si = 0; si < sources.length && out.length < maxFiles; si++) {
      if (sources[si]) out.push(sources[si]);
    }
  }
  return out;
}

function flattenBaiduItems(data) {
  var out = [];
  if (Array.isArray(data)) return data;
  for (var key in data || {}) {
    if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
    var value = data[key];
    if (Array.isArray(value)) {
      for (var i = 0; i < value.length; i++) out.push(value[i]);
    }
  }
  return out;
}

async function resolveBaiduDirect(line, params) {
  var helper = helperAvailable("Baidu2") ? Baidu2 : (helperAvailable("Baidu") ? Baidu : null);
  var baiduStartedAt = Date.now();
  console.log("[huban] baidu direct start", { helper: !!helper, helperName: helperAvailable("Baidu2") ? "Baidu2" : (helperAvailable("Baidu") ? "Baidu" : ""), native: !!baiduCookie(params), share: !!(line && line.shareUrl) });
  if (!helper && baiduCookie(params)) {
    var uidPromise = baiduGetUid(params);
    var rawVideos = await baiduListShareVideos(line.shareUrl, params);
    var videos = filterVideosForEpisode(rawVideos, params);
    if (!videos.length && rawVideos.length && !hubanWantedEpisode(params)) {
      console.warn("[huban] baidu title filter fallback", {
        rawCount: rawVideos.length,
        lineTitle: line && line.title || "",
        sample: episodeSummary(rawVideos, function (video) {
          return [video && video.vod_group, helperItemName(video)].filter(Boolean).join(" ");
        })
      });
      videos = sortItemsByEpisodeDesc(rawVideos, function (video) {
        return [video && video.vod_group, helperItemName(video)].filter(Boolean).join(" ");
      });
    }
    console.log("[huban] baidu native videos", { rawCount: rawVideos.length, count: videos.length });
    var nativeMax = sourceLimitForPan("百度", params);
    var nativeOut = await baiduSourcesFromVideos(videos, line, params, uidPromise, nativeMax);
    console.log("[huban] baidu native result", { count: nativeOut.length, ms: Date.now() - baiduStartedAt });
    return nativeOut;
  }
  if (!helper || typeof helper.getShareData !== "function" || typeof helper.getAppShareUrl !== "function") {
    console.warn("[huban] baidu helper unavailable");
    return [];
  }
  var data = await helper.getShareData(line.shareUrl);
  var rawItems = flattenBaiduItems(data);
  var items = filterHelperItemsForEpisode(rawItems, params, line.title);
  if (!items.length && rawItems.length && !hubanWantedEpisode(params)) {
    console.warn("[huban] baidu helper title filter fallback", { rawCount: rawItems.length, lineTitle: line && line.title || "" });
    items = rawItems.filter(function (item) { return isPlayableVideoName(helperItemName(item)); });
  }
  var maxFiles = sourceLimitForPan("百度", params);
  var out = [];
  for (var i = 0; i < items.length && out.length < maxFiles; i++) {
    var item = items[i] || {};
    var name = helperItemName(item);
    var size = helperItemSize(item);
    var path = item.path || item.Path || "";
    var uk = item.uk || item.ukey || item.user_id || item.userId || "";
    var shareId = item.shareid || item.share_id || item.shareId || "";
    var fsId = item.fsid || item.fs_id || item.fsId || item.id || "";
    if (!path || !uk || !shareId || !fsId) {
      console.warn("[huban] baidu item missing fields:", { hasPath: !!path, hasUk: !!uk, hasShareId: !!shareId, hasFsId: !!fsId });
      continue;
    }
    var url = await helper.getAppShareUrl(path, uk, shareId, fsId);
    if (!url) continue;
    var desc = [line.title, name, size ? "大小: " + size : "", line.shareUrl].filter(Boolean).join("\n");
    var source = await sourceFromDirect("虎斑[盘] 百度 " + name + (size ? " " + size : ""), url, desc, baiduPlaybackHeaders(params), params, { name: name, size: helperItemSizeNumber(item) });
    if (source) out.push(source);
  }
  console.log("[huban] baidu direct result", { count: out.length, ms: Date.now() - baiduStartedAt });
  return out;
}

async function resolveWithHelpers(line, params) {
  var type = line && (line.panType || detectPanType(line.shareUrl));
  if (type !== "百度") return [];
  try {
    return await resolveBaiduDirect(line, params);
  } catch (e) {
    console.warn("[huban] baidu resolve failed:", e && e.message || e);
    return [];
  }
}

function fallbackSource(line, params) {
  return [];
}

async function resolveLine(line, params) {
  var sources = await resolvePlayableLine(line, params || {});
  return sources.length ? sources : fallbackSource(line, params || {});
}

async function resolvePlayableLine(line, params) {
  if (/^https?:\/\/.+\.(?:m3u8|mp4|mkv|mov|webm)(?:\?|$)/i.test(line.shareUrl)) {
    return [sourceFromUrl("虎斑[盘] 直链", line.shareUrl, line.title)];
  }
  return resolveWithHelpers(line, params || {});
}

function hubanSourceKey(source) {
  source = source || {};
  return source.name || source.description || source.url || "";
}

function filterLinesForEpisode(lines, params) {
  var wantEp = hubanWantedEpisode(params);
  if (!wantEp) return lines;
  var matched = lines.filter(function (line) {
    var ep = hubanExtractEpisode(line.title);
    return ep && ep === wantEp;
  });
  return matched.length ? matched : lines;
}

function buildSearchKeywords(params) {
  params = params || {};
  var keys = [];
  function add(v) {
    v = hubanCleanTitle(v);
    if (v && keys.indexOf(v) < 0) keys.push(v);
  }
  var baseTitles = [];
  function addBase(v) {
    v = hubanCleanTitle(v);
    if (v && baseTitles.indexOf(v) < 0) baseTitles.push(v);
    
    var nospace = v.replace(/\s+/g, "");
    if (nospace && nospace !== v && baseTitles.indexOf(nospace) < 0) baseTitles.push(nospace);
  }
  if (params.tmdbInfo) {
    addBase(params.tmdbInfo.title || params.tmdbInfo.name);
    addBase(params.tmdbInfo.originalTitle || params.tmdbInfo.originalName);
  }
  addBase(params.seriesName);
  addBase(params.title);
  addBase(params.name);
  var wantEp = hubanWantedEpisode(params);
  var fast = fastLoadEnabled(params);
  var wantSeason = hubanWantedSeason(params);
  
  if (wantSeason > 1) {
    var cjk = HUBAN_SEASON_CJK[wantSeason] || String(wantSeason);
    var seasonSuffixes = ["第" + cjk + "季", "第" + wantSeason + "季", String(wantSeason)];
    
    var romanForKw = { 2: ["Ⅱ", "II"], 3: ["Ⅲ", "III"], 4: ["Ⅳ", "IV"], 5: ["Ⅴ", "V"] }[wantSeason];
    if (romanForKw) seasonSuffixes = seasonSuffixes.concat(romanForKw);
    seasonSuffixes.push("Part " + wantSeason);
    for (var ssi = 0; ssi < seasonSuffixes.length; ssi++) {
      for (var si = 0; si < baseTitles.length; si++) {
        var skw = hubanText(baseTitles[si] + seasonSuffixes[ssi]).trim();
        if (skw && keys.indexOf(skw) < 0) keys.push(skw);
      }
    }
  }
  if (wantEp && !fast) {
    for (var bi = 0; bi < baseTitles.length; bi++) {
      add(baseTitles[bi] + " 第" + wantEp + "集");
      add(baseTitles[bi] + " " + wantEp);
    }
  }
  for (var bj = 0; bj < baseTitles.length; bj++) add(baseTitles[bj]);
  if (wantEp && fast) {
    for (var fk = 0; fk < baseTitles.length; fk++) {
      add(baseTitles[fk] + " 第" + wantEp + "集");
      add(baseTitles[fk] + " " + wantEp);
    }
  }
  add(params.episodeName);
  add(searchKeywordFromParams(params));
  return keys;
}

function searchKeywordFromParams(params) {
  params = params || {};
  return hubanText(params.keyword || params.searchWord || params.search_word || params.search_query
    || params.query || params.q || params.wd || params.text || "");
}

function debugParamsSummary(params) {
  params = params || {};
  var keys = [];
  for (var k in params) {
    if (Object.prototype.hasOwnProperty.call(params, k)) keys.push(k);
  }
  keys.sort();
  var interesting = [
    "title", "seriesName", "name", "type", "season", "tmdbId", "imdbId",
    "duration", "durationText", "durationSeconds", "runtime", "runtimeMinutes",
    "episode", "episodeNumber", "episode_number",
    "episodeNo", "episodeIndex", "episodeSort", "currentEpisode", "playEpisode",
    "ep", "sort", "episodeName", "episodeTitle", "subtitle", "remark", "link", "id",
    "quality_tag", "tmdbInfo", "mediaInfo", "episodeInfo", "selectedEpisode",
    "mediaSource", "mediaSources", "currentProvider", "currentResolutionInfo"
  ];
  var values = {};
  for (var i = 0; i < interesting.length; i++) {
    var key = interesting[i];
    if (!Object.prototype.hasOwnProperty.call(params, key)) continue;
    var value = params[key];
    if (/cookie|token|ut/i.test(key)) {
      values[key] = value ? "[set]" : "";
    } else if (value && typeof value === "object") {
      try { values[key] = JSON.stringify(value).slice(0, 220); } catch (e) { values[key] = "[object]"; }
    } else {
      values[key] = hubanText(value).slice(0, 120);
    }
  }
  return { keys: keys.join(","), values: values };
}

async function search(params) {
  params = params || {};
  hubanSyncParams(params);
  var keyword = searchKeywordFromParams(params);
  if (!keyword) return [];
  return hubanSearchAll(keyword, params);
}

async function loadDetail(link) {
  var params = HUBAN_RUNTIME_PARAMS || {};
  var detail = await hubanLoadDetailObject(link, params);
  var lines = preferredOnlyLines(filterLinesForEpisode(detail.lines || [], params), params);
  var childItems = [];
  var seenSources = {};
  var seenSourceSizes = {};
  var panCounts = {};
  for (var i = 0; i < lines.length; i++) {
    var panType = lines[i] && (lines[i].panType || detectPanType(lines[i].shareUrl)) || "";
    if ((panCounts[panType] || 0) >= sourceLimitForPan(panType, params)) continue;
    var sources = await resolvePlayableLine(lines[i], params);
    for (var si = 0; si < sources.length; si++) {
      if ((panCounts[panType] || 0) >= sourceLimitForPan(panType, params)) break;
      var key = hubanSourceKey(sources[si]);
      if (seenSources[key]) continue;
      var sizeKey = sourceSizeDedupeKey(sources[si]);
      if (sizeKey && seenSourceSizes[sizeKey]) continue;
      seenSources[key] = true;
      if (sizeKey) seenSourceSizes[sizeKey] = true;
      panCounts[panType] = (panCounts[panType] || 0) + 1;
      childItems.push({
        id: sources[si].id || String(link) + "#" + i + "." + si,
        type: "url",
        title: sources[si].name,
        name: sources[si].name,
        video: sources[si].video,
        audio: sources[si].audio,
        fileName: sources[si].fileName,
        FileName: sources[si].FileName,
        filename: sources[si].filename,
        file_name: sources[si].file_name,
        server_filename: sources[si].server_filename,
        originalFileName: sources[si].originalFileName,
        serverFileName: sources[si].serverFileName,
        subTitle: sources[si].subTitle,
        subtitle: sources[si].subtitle,
        remark: sources[si].remark,
        description: sources[si].description,
        quality: sources[si].quality,
        qualityName: sources[si].qualityName,
        qualityLabel: sources[si].qualityLabel,
        qualityTitle: sources[si].qualityTitle,
        label: sources[si].label,
        format: sources[si].format,
        resolution: sources[si].resolution,
        resolutionText: sources[si].resolutionText,
        renderSize: sources[si].renderSize,
        renderSizeText: sources[si].renderSizeText,
        width: sources[si].width,
        height: sources[si].height,
        url: sources[si].url,
        link: sources[si].link || sources[si].url,
        videoUrl: sources[si].url,
        header: sources[si].header,
        headers: sources[si].headers,
        customHeaders: sources[si].customHeaders,
        fastPlayMode: sources[si].fastPlayMode,
        fastplay: sources[si].fastplay,
        speedup: sources[si].speedup,
        speedupEnabled: sources[si].speedupEnabled,
        multiThread: sources[si].multiThread,
        multiThreadMode: sources[si].multiThreadMode,
        isMulti: sources[si].isMulti,
        isVideo: sources[si].isVideo,
        threads: sources[si].threads,
        thread: sources[si].thread,
        threadCount: sources[si].threadCount,
        threadNum: sources[si].threadNum,
        downloadThreads: sources[si].downloadThreads,
        downloadThreadCount: sources[si].downloadThreadCount,
        maxThreadCount: sources[si].maxThreadCount,
        poolSize: sources[si].poolSize,
        chunkSize: sources[si].chunkSize,
        chunk_size: sources[si].chunk_size,
        chunk: sources[si].chunk,
        segmentSize: sources[si].segmentSize,
        downloadChunkSize: sources[si].downloadChunkSize,
        rangeSize: sources[si].rangeSize,
        dataSize: sources[si].dataSize,
        realSize: sources[si].realSize,
        RealSize: sources[si].RealSize,
        actualSize: sources[si].actualSize,
        ActualSize: sources[si].ActualSize,
        actualFileSize: sources[si].actualFileSize,
        fileRealSize: sources[si].fileRealSize,
        sourceSize: sources[si].sourceSize,
        originalSize: sources[si].originalSize,
        size: sources[si].size,
        fileSize: sources[si].fileSize,
        file_size: sources[si].file_size,
        videoFileSize: sources[si].videoFileSize,
        videoFileSizeText: sources[si].videoFileSizeText,
        resolutionVideoFileSize: sources[si].resolutionVideoFileSize,
        maxFileSize: sources[si].maxFileSize,
        isFirstFileSize: sources[si].isFirstFileSize,
        bitrate: sources[si].bitrate,
        bitRate: sources[si].bitRate,
        BitRate: sources[si].BitRate,
        Bitrate: sources[si].Bitrate,
        videoRate: sources[si].videoRate,
        videoBitRate: sources[si].videoBitRate,
        videoBitrate: sources[si].videoBitrate,
        videoBitRateText: sources[si].videoBitRateText,
        bitrateLabel: sources[si].bitrateLabel,
        videoPixelSize: sources[si].videoPixelSize,
        videoTitle: sources[si].videoTitle,
        videoRange: sources[si].videoRange,
        VideoRange: sources[si].VideoRange,
        videoRangeScore: sources[si].videoRangeScore,
        resolutionId: sources[si].resolutionId,
        mediaSourceId: sources[si].mediaSourceId,
        MediaSourceId: sources[si].MediaSourceId,
        mediaSource: sources[si].mediaSource,
        MediaSource: sources[si].MediaSource,
        mediaSources: sources[si].mediaSources,
        MediaSources: sources[si].MediaSources,
        mediaStreams: sources[si].mediaStreams,
        MediaStreams: sources[si].MediaStreams,
        RunTimeTicks: sources[si].RunTimeTicks,
        runTimeTicks: sources[si].runTimeTicks,
        providerId: sources[si].providerId,
        sourceId: sources[si].sourceId,
        sourceType: sources[si].sourceType,
        isBest: sources[si].isBest,
        _isBest: sources[si]._isBest,
        isResolutionChecked: sources[si].isResolutionChecked,
        playerType: sources[si].playerType || "system"
      });
    }
  }
  detail.childItems = sortSourcesByPan(childItems, params);
  delete detail.lines;
  return detail;
}

async function resolveDeferredResource(params, link) {
  var route = hubanParseResolveLink(link);
  if (!route) return [];
  var line = {
    title: route.title || route.detailTitle || "虎斑[盘]",
    shareUrl: route.shareUrl,
    panType: route.panType || detectPanType(route.shareUrl)
  };
  console.log("[huban] deferred resolve", { panType: line.panType, title: line.title || "" });
  var sources = await resolvePlayableLine(line, params || {});
  for (var i = 0; i < sources.length; i++) {
    sources[i].description = withMediaTagsFirst(sources[i], [
      route.keyword ? "搜索词: " + route.keyword : "",
      route.detailTitle ? "命中: " + route.detailTitle : ""
    ]);
  }
  return sources;
}

function resourceCacheKey(params, panType) {
  params = params || {};
  return [
    WidgetMetadata && WidgetMetadata.version || "",
    "百度",
    params.title || "",
    params.seriesName || "",
    params.name || "",
    params.episodeName || "",
    hubanWantedEpisode(params) || params.episode || "",
    hubanWantedSeason(params) || "",
    hubanHost(params),
    hubanPanHosts(params).join(","),
    params.baidu_max_files || HUBAN_BUILTIN_BAIDU_MAX_FILES,
    candidateScanLimit(params),
    params.search_extra_after_hit || HUBAN_BUILTIN_SEARCH_EXTRA_AFTER_HIT,
    loadSpeedMode(params),
    sourceQualityConfig(params).value,
    !!baiduCookie(params)
  ].join("||");
}

function sourcePanType(source) {
  source = source || {};
  return source.panType || sourcePanLabel(source.displayName || source.name || source.title || "");
}

function sourceSizeNumber(source) {
  source = source || {};
  return Number(
    source.realSize || source.RealSize || source.actualSize || source.ActualSize ||
    source.actualFileSize || source.fileRealSize || source.sourceSize || source.originalSize ||
    source.size || source.fileSize || source.file_size || source.videoFileSize ||
    source.resolutionVideoFileSize || source.maxFileSize || 0
  ) || 0;
}

function sourceSizeDedupeKey(source) {
  var size = sourceSizeNumber(source);
  return size > 0 ? String(Math.round(size)) : "";
}

function sourceDebugSummary(source) {
  source = source || {};
  var url = String(source.url || source.videoUrl || "");
  var host = "";
  try { host = new URL(url.split("#")[0]).host; } catch (e) {}
  return {
    name: source.name || source.title || "",
    fileName: source.fileName || source.filename || source.file_name || source.server_filename || "",
    host: host,
    realSize: source.realSize || source.actualSize || source.sourceSize || 0,
    displaySize: source.size || source.fileSize || source.videoFileSize || 0,
    hasFilenameHint: /(?:^|[&#])(?:filename|fileName|server_filename)=/i.test(url),
    resolutionId: source.resolutionId || "",
    video: source.video || null,
    audio: source.audio || null,
    playerType: source.playerType || ""
  };
}

function sortSourcesByPan(sources, params) {
  return (Array.isArray(sources) ? sources : []).slice().sort(function (a, b) {
    var panDelta = panPriority(sourcePanType(a), params) - panPriority(sourcePanType(b), params);
    if (panDelta) return panDelta;
    return sourceSizeNumber(b) - sourceSizeNumber(a);
  });
}

async function loadResourceForPan(params, panType) {
  return loadResourceAll(params || {}, "百度");
}

async function loadBaiduResource(params) {
  return loadResourceForPan(params, "百度");
}

async function loadResource(params) {
  return loadResourceForPan(params, "百度");
}

async function loadResourceAll(params, panType) {
  params = params || {};
  hubanSyncParams(params);
  panType = "百度";
  var key = resourceCacheKey(params, panType);
  var cached = hubanCacheGet(HUBAN_RESOURCE_CACHE, key);
  if (cached) return cached;
  var promise = loadResourceUncached(Object.assign({}, params), panType).then(function (list) {
    
    if (!list || !list.length) delete HUBAN_RESOURCE_CACHE[key];
    return list;
  }).catch(function (e) {
    delete HUBAN_RESOURCE_CACHE[key];
    throw e;
  });
  return hubanCacheSet(HUBAN_RESOURCE_CACHE, key, promise);
}

function addSearchCandidates(results, keyword, params, candidates, seenCandidate, scanLimit) {
  var before = candidates.length;
  var ranked = hubanRankItems(results || [], params, keyword);
  for (var ri = 0; ri < ranked.length && candidates.length < scanLimit; ri++) {
    var item = ranked[ri] || {};
    var cKey = item.link || item.id || item.title || "";
    if (!cKey || seenCandidate[cKey]) continue;
    seenCandidate[cKey] = true;
    item._hubanKeyword = keyword;
    candidates.push(item);
  }
  return candidates.length - before;
}

async function searchKeywordForResource(keyword, params) {
  var searchStartedAt = Date.now();
  var searchParams = Object.assign({}, params || {}, { _hubanHttpTimeoutMs: HUBAN_RESOURCE_SEARCH_TIMEOUT_MS });
  var results = await hubanSearchAll(keyword, searchParams);
  console.log("[huban] search", {
    keyword: keyword,
    count: results.length,
    ms: Date.now() - searchStartedAt,
    timeoutMs: HUBAN_RESOURCE_SEARCH_TIMEOUT_MS
  });
  return { keyword: keyword, results: results };
}

async function searchCandidatesForResource(keywords, params, scanLimit) {
  var startedAt = Date.now();
  var fast = fastLoadEnabled(params);
  var seenCandidate = {};
  console.log("[huban] keyword search concurrent", {
    mode: loadSpeedMode(params),
    concurrency: keywords.length,
    timeoutMs: HUBAN_RESOURCE_SEARCH_TIMEOUT_MS
  });
  var tasks = keywords.map(function (keyword, index) {
    return searchKeywordForResource(keyword, params).then(function (result) {
      result.index = index;
      return result;
    }).catch(function (e) {
      console.warn("[huban] search failed", { keyword: keyword, message: e && e.message || String(e) });
      return { keyword: keyword, results: [], index: index };
    });
  });

  if (fast) {
    return new Promise(function (resolve) {
      var done = false;
      var pending = tasks.length;
      var completed = [];
      function finish(payload) {
        if (done) return;
        done = true;
        resolve(payload);
      }
      
      var firstHitAt = 0;
      var firstHitResult = null;
      function tryFinishWithGrace() {
        if (done) return;
        var candidates = [];
        var localSeen = {};
        
        var ordered = [];
        for (var i = 0; i < completed.length; i++) {
          if (completed[i]) ordered.push(completed[i]);
        }
        ordered.sort(function (a, b) { return a.index - b.index; });
        for (var oi = 0; oi < ordered.length; oi++) {
          addSearchCandidates(ordered[oi].results, ordered[oi].keyword, params, candidates, localSeen, scanLimit);
        }
        if (candidates.length) {
          console.log("[huban] fast search grace merged", {
            keywords: ordered.length,
            candidateCount: candidates.length,
            ms: Date.now() - startedAt
          });
          finish({ candidates: candidates, usedKeyword: candidates[0] && candidates[0]._hubanKeyword || "" });
        }
      }
      tasks.forEach(function (task) {
        task.then(function (result) {
          completed[result.index] = result;
          var probe = [];
          var probeSeen = {};
          addSearchCandidates(result.results, result.keyword, params, probe, probeSeen, scanLimit);
          if (probe.length && !firstHitAt) {
            firstHitAt = Date.now();
            firstHitResult = result;
            console.log("[huban] fast search first hit", {
              keyword: result.keyword,
              candidateCount: probe.length,
              ms: firstHitAt - startedAt
            });
            
            hubanSleep(1500).then(tryFinishWithGrace);
          }
        }).then(function () {
          pending--;
          if (pending <= 0 && !done) {
            tryFinishWithGrace();
            if (!done) {
              var fallback = [];
              for (var i = 0; i < completed.length && fallback.length < scanLimit; i++) {
                if (!completed[i]) continue;
                addSearchCandidates(completed[i].results, completed[i].keyword, params, fallback, seenCandidate, scanLimit);
              }
              finish({ candidates: fallback, usedKeyword: fallback[0] && fallback[0]._hubanKeyword || "" });
            }
          }
        });
      });
    });
  }

  var all = await Promise.all(tasks);
  all.sort(function (a, b) { return a.index - b.index; });
  var candidates = [];
  for (var i = 0; i < all.length && candidates.length < scanLimit; i++) {
    addSearchCandidates(all[i].results, all[i].keyword, params, candidates, seenCandidate, scanLimit);
  }
  return { candidates: candidates, usedKeyword: candidates[0] && candidates[0]._hubanKeyword || "" };
}

async function loadResourceUncached(params, targetPanType) {
  var startedAt = Date.now();
  params = params || {};
  targetPanType = "百度";
  params._hubanResourceLoad = true;
  hubanSyncParams(params);
  if (!canResolvePanType("百度", params)) {
    console.warn("[huban] 百度 Cookie 未配置且无 Baidu/Baidu2 helper，无法解析网盘分享，聚合将返回空。请在插件参数中填写「百度 Cookie」。");
  }
  if (targetPanType && !panEnabled(targetPanType, params)) {
    console.log("[huban] loadResource skipped disabled pan", { targetPanType: targetPanType });
    return [];
  }
  var keywords = buildSearchKeywords(params);
  var speedMode = loadSpeedMode(params);
  var extraAfterHit = searchExtraAfterHit(params);
  console.log("[huban] loadResource", {
    version: WidgetMetadata.version,
    targetPanType: targetPanType,
    title: params.title || params.seriesName || params.name || "",
    episode: hubanWantedEpisode(params) || params.episode || "",
    season: hubanWantedSeason(params) || "",
    paramsSummary: debugParamsSummary(params),
    keywords: keywords.join("|"),
    keywordCount: keywords.length,
    hasBaiduCookie: !!baiduCookie(params),
    enableBaidu: panEnabled("百度", params),
    hasBaiduHelper: helperAvailable("Baidu2") || helperAvailable("Baidu"),
    speedMode: speedMode,
    scanLimit: candidateScanLimit(params),
    extraAfterHit: extraAfterHit
  });
  if (!keywords.length) return [];

  var candidates = [];
  var usedKeyword = "";
  var scanLimit = candidateScanLimit(params);
  var searchResult = await searchCandidatesForResource(keywords, params, scanLimit);
  candidates = searchResult.candidates || [];
  usedKeyword = searchResult.usedKeyword || "";
  if (!candidates.length) {
    console.log("[huban] no best match");
    return [];
  }
  console.log("[huban] candidates", { keyword: usedKeyword, count: candidates.length, scanLimit: scanLimit });

  var out = [];
  var seenSources = {};
  var seenSourceSizes = {};
  var panCounts = {};
  var lastNewCandidateIndex = -1;
  var scannedCandidates = 0;
  for (var ci = 0; ci < candidates.length; ci++) {
    var best = candidates[ci];
    if (!best || !best.link) continue;
    var beforeCandidateCount = out.length;
    var detailStartedAt = Date.now();
    var detail = await hubanLoadDetailObject(best.link, params);
    var detailMs = Date.now() - detailStartedAt;
    var sourceKeyword = best._hubanKeyword || usedKeyword;
    var rawLines = filterLinesForEpisode(detail.lines || [], params);
    
    var wantSeason = hubanWantedSeason(params);
    if (wantSeason > 0) {
      var seasonLines = rawLines.filter(function (line) {
        return hubanExtractSeason((line && line.title) || "", detail.title || "") === wantSeason;
      });
      if (seasonLines.length) rawLines = seasonLines;
    }
    if (targetPanType) {
      rawLines = rawLines.filter(function (line) {
        return (line && (line.panType || detectPanType(line.shareUrl)) || "") === targetPanType;
      });
    }
    var lines = preferredOnlyLines(rawLines, params);
    console.log("[huban] detail lines", {
      title: detail.title || "",
      source: hubanOrigin(best.link),
      rawCount: rawLines.length,
      rawPanTypes: panTypesSummary(rawLines),
      count: lines.length,
      panTypes: panTypesSummary(lines),
      ms: detailMs
    });
    var lineConcurrency = fastLoadEnabled(params) ? 1 : BAIDU_DIRECT_CONCURRENCY_FULL;
    if (lines.length) {
      console.log("[huban] line resolve concurrency", {
        mode: loadSpeedMode(params),
        concurrency: lineConcurrency,
        lines: lines.length
      });
    }
    for (var li = 0; li < lines.length;) {
      var jobs = [];
      var reservedPanCounts = {};
      while (li < lines.length && jobs.length < lineConcurrency) {
        var line = lines[li++];
        var jobPanType = line && (line.panType || detectPanType(line.shareUrl)) || "";
        var panLimit = sourceLimitForPan(jobPanType, params);
        var reserved = reservedPanCounts[jobPanType] || 0;
        if ((panCounts[jobPanType] || 0) + reserved >= panLimit) {
          console.log("[huban] skip pan limit", { panType: jobPanType, title: detail.title || "", limit: panLimit });
          continue;
        }
        reservedPanCounts[jobPanType] = reserved + 1;
        jobs.push({ line: line, panType: jobPanType });
      }
      if (!jobs.length) continue;
      var resolvedJobs = await Promise.all(jobs.map(function (job) {
        var resolveStartedAt = Date.now();
        return resolvePlayableLine(job.line, params).then(function (sources) {
          console.log("[huban] resolved pan", { panType: job.panType, sourceCount: sources.length, ms: Date.now() - resolveStartedAt });
          return { line: job.line, panType: job.panType, sources: sources || [] };
        }).catch(function (e) {
          console.warn("[huban] resolved pan failed", { panType: job.panType, message: e && e.message || String(e) });
          return { line: job.line, panType: job.panType, sources: [] };
        });
      }));
      for (var rj = 0; rj < resolvedJobs.length; rj++) {
        var resolved = resolvedJobs[rj] || {};
        var panType = resolved.panType || "";
        var sources = resolved.sources || [];
        if (!fastLoadEnabled(params) && !sources.length && resolved.line) {
          var retryStartedAt = Date.now();
          sources = await resolvePlayableLine(resolved.line, params).catch(function (e) {
            console.warn("[huban] resolved pan retry failed", { panType: panType, message: e && e.message || String(e) });
            return [];
          });
          console.log("[huban] resolved pan retry", { panType: panType, sourceCount: sources.length, ms: Date.now() - retryStartedAt });
        }
        for (var si = 0; si < sources.length; si++) {
          if ((panCounts[panType] || 0) >= sourceLimitForPan(panType, params)) break;
          sources[si].description = withMediaTagsFirst(sources[si], [
            "搜索词: " + usedKeyword,
            sourceKeyword && sourceKeyword !== usedKeyword ? "命中词: " + sourceKeyword : "",
            "来源: " + (hubanOrigin(best.link) || ""),
            "命中: " + (detail.title || best.title || "")
          ]);
          var key = hubanSourceKey(sources[si]);
          if (seenSources[key]) continue;
          var sizeKey = sourceSizeDedupeKey(sources[si]);
          if (sizeKey && seenSourceSizes[sizeKey]) {
            console.log("[huban] skip duplicate size", {
              size: hubanCompactSizeText(hubanSizeText(sourceSizeNumber(sources[si]))),
              name: sources[si].name || ""
            });
            continue;
          }
          seenSources[key] = true;
          if (sizeKey) seenSourceSizes[sizeKey] = true;
          panCounts[panType] = (panCounts[panType] || 0) + 1;
          out.push(sources[si]);
        }
      }
    }
    scannedCandidates++;
    if (out.length > beforeCandidateCount) lastNewCandidateIndex = ci;
    if (panLimitsReached(panCounts, params, targetPanType)) {
      console.log("[huban] stop pan limits reached", { scanned: scannedCandidates, panCounts: panCounts });
      break;
    }
    if (lastNewCandidateIndex >= 0 && (extraAfterHit === 0 || ci > lastNewCandidateIndex) && ci - lastNewCandidateIndex >= extraAfterHit) {
      console.log("[huban] stop after hit window", {
        scanned: scannedCandidates,
        extraAfterHit: extraAfterHit,
        lastNewCandidateIndex: lastNewCandidateIndex,
        panCounts: panCounts
      });
      break;
    }
  }
  out = sortSourcesByPan(out, params);
  console.log("[huban] loadResource result", {
    count: out.length,
    panTypes: panTypesSummary(out),
    scanned: scannedCandidates,
    ms: Date.now() - startedAt,
    sources: out.slice(0, 6).map(sourceDebugSummary)
  });
  return out;
}

  return {
    metadata: WidgetMetadata,
    search: (typeof search === "function") ? search : null,
    loadDetail: (typeof loadDetail === "function") ? loadDetail : null,
    loadResource: (typeof loadResource === "function") ? loadResource : null
  };
})();

var JUHE_MOD_muou = (function () {
  var WidgetMetadata;
WidgetMetadata = {
  "id": "forward.muou.quark",
  "title": "muou4K",
  "version": "1.5.6",
  "requiredVersion": "0.0.1",
  "description": "Forward 专用按需加载",
  "author": "夏恩/VLE",
  "site": "https://pan-site-monitor.douer.me/",
  "detailCacheDuration": 0,
  "globalParams": [
    {
      "name": "site",
      "title": "手动域名（留空自动获取）",
      "type": "input",
      "value": "",
      "placeholders": [
        {
          "title": "留空从域名监测站获取；填写后优先使用",
          "value": ""
        }
      ]
    },
    {
      "name": "quarkCookie",
      "title": "垮 Cookie",
      "type": "input",
      "placeholders": [
        {
          "title": "填入完整 Cookie，必须包含有效登录态",
          "value": ""
        }
      ]
    },
    {
      "name": "baiduCookie",
      "title": "佰 Cookie",
      "type": "input",
      "placeholders": [
        {
          "title": "填入佰网盘完整 Cookie（包含 BDUSS）",
          "value": ""
        }
      ]
    },
    {
      "name": "cookie115",
      "title": "伍 Cookie",
      "type": "input",
      "placeholders": [
        {
          "title": "填写完整伍登录Cookie（UID、CID、SEID）",
          "value": ""
        }
      ]
    },
    {
      "name": "multiSource",
      "title": "是否启用聚合搜索",
      "type": "enumeration",
      "value": "enabled",
      "enumOptions": [
        {
          "title": "启用",
          "value": "enabled"
        },
        {
          "title": "禁用",
          "value": "disabled"
        }
      ]
    },
    {
      "name": "preloadCount",
      "title": "详情页预取播放数量",
      "type": "enumeration",
      "value": "3",
      "enumOptions": [
        {
          "title": "1 个",
          "value": "1"
        },
        {
          "title": "2 个",
          "value": "2"
        },
        {
          "title": "3 个",
          "value": "3"
        },
        {
          "title": "5 个",
          "value": "5"
        },
        {
          "title": "10 个",
          "value": "10"
        },
        {
          "title": "全部",
          "value": "0"
        }
      ]
    }
  ],
  "modules": [
    {
      "id": "currentDomain",
      "title": "当前域名",
      "functionName": "panDomainStatus",
      "cacheDuration": 0,
      "params": []
    },
    {
      "id": "refreshCatalog",
      "title": "刷新目录缓存",
      "functionName": "clearRexCatalogCache",
      "cacheDuration": 0,
      "params": []
    },
    {
      "id": "movies",
      "title": "电影",
      "functionName": "loadCategory",
      "cacheDuration": 600,
      "params": [
        {
          "name": "categoryId",
          "title": "分类",
          "type": "constant",
          "value": "1"
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "tv",
      "title": "剧集",
      "functionName": "loadCategory",
      "cacheDuration": 600,
      "params": [
        {
          "name": "categoryId",
          "title": "分类",
          "type": "constant",
          "value": "2"
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "anime",
      "title": "动漫",
      "functionName": "loadCategory",
      "cacheDuration": 600,
      "params": [
        {
          "name": "categoryId",
          "title": "分类",
          "type": "constant",
          "value": "3"
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "variety",
      "title": "综艺",
      "functionName": "loadCategory",
      "cacheDuration": 600,
      "params": [
        {
          "name": "categoryId",
          "title": "分类",
          "type": "constant",
          "value": "29"
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "documentary",
      "title": "纪录片",
      "functionName": "loadCategory",
      "cacheDuration": 600,
      "params": [
        {
          "name": "categoryId",
          "title": "分类",
          "type": "constant",
          "value": "4"
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "loadResource",
      "title": "加载资源",
      "functionName": "loadResource",
      "type": "stream",
      "cacheDuration": 0,
      "params": []
    }
  ],
  "search": {
    "title": "搜索",
    "functionName": "search",
    "params": [
      {
        "name": "keyword",
        "title": "关键词",
        "type": "input"
      },
      {
        "name": "page",
        "title": "页码",
        "type": "page"
      }
    ]
  }
};

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const CACHE_FOLDER = "ftv-cache";
const STORAGE_COOKIE_KEY = "forward.muou.quark.cookie";
const STORAGE_SITE_KEY = "forward.muou.quark.site";
const STORAGE_PRELOAD_KEY = "forward.muou.quark.preloadCount";
let CURRENT_COOKIE = "";

function getSite(params) {
  const incoming = params && params.site ? String(params.site).trim() : "";
  if (incoming) {
    safeStorageSet(STORAGE_SITE_KEY, incoming);
    return incoming.replace(/\/$/, "");
  }
  const saved = safeStorageGet(STORAGE_SITE_KEY);
  return String(saved || PAN_FALLBACKS[0]).replace(/\/$/, "");
}

function safeStorageGet(key) {
  try {
    return Widget && Widget.storage && Widget.storage.get ? Widget.storage.get(key) : "";
  } catch (e) {
    
    return "";
  }
}

function safeStorageSet(key, value) {
  try {
    if (Widget && Widget.storage && Widget.storage.set) Widget.storage.set(key, value);
  } catch (e) {
    
  }
}

function normalizeCookie(cookie) {
  return String(cookie || "").trim();
}

function ensureCookie(cookie) {
  const incoming = normalizeCookie(cookie);
  if (incoming) {
    CURRENT_COOKIE = incoming;
    safeStorageSet(STORAGE_COOKIE_KEY, incoming);
    return CURRENT_COOKIE;
  }
  if (CURRENT_COOKIE) return CURRENT_COOKIE;
  CURRENT_COOKIE = normalizeCookie(safeStorageGet(STORAGE_COOKIE_KEY));
  return CURRENT_COOKIE;
}

function getPreloadCount(params) {
  const incoming = params && params.preloadCount !== undefined ? Number(params.preloadCount) : NaN;
  if (!Number.isNaN(incoming)) {
    const n = Math.max(0, Math.floor(incoming));
    safeStorageSet(STORAGE_PRELOAD_KEY, String(n));
    return n;
  }
  const saved = Number(safeStorageGet(STORAGE_PRELOAD_KEY));
  if (!Number.isNaN(saved)) return Math.max(0, Math.floor(saved));
  return 3;
}

function bindForwardParams(params = {}) {
  getSite(params);
  getPreloadCount(params);
  if(Object.prototype.hasOwnProperty.call(params,"cookie115")) safeStorageSet("forward.muou.115.cookie",normalizeCookie(params.cookie115));
  if (params.multiSource === "enabled" || params.multiSource === "disabled") {
    safeStorageSet("forward.muou.multiSource", params.multiSource);
  }
  const ck = params.quarkCookie || params.cookie || params.quarkck || "";
  if(Object.prototype.hasOwnProperty.call(params,"quarkCookie")) {
    CURRENT_COOKIE=normalizeCookie(params.quarkCookie);
    safeStorageSet(STORAGE_COOKIE_KEY,CURRENT_COOKIE);
  } else ensureCookie(ck);
  if (Object.prototype.hasOwnProperty.call(params, "baiduCookie")) {
    safeStorageSet("forward.muou.baidu.cookie", normalizeCookie(params.baiduCookie));
  }
}

function toQuery(obj) {
  return Object.keys(obj || {}).map(k => k + "=" + encodeURIComponent(obj[k])).join("&");
}

function absUrl(url, site) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("//")) return "https:" + url;
  if (url.startsWith("/")) return site + url;
  return site + "/" + url;
}

function pickText($, el, selector) {
  return $(el).find(selector).text().trim();
}

function idFromHref(href) {
  const s = String(href || "");
  const m = s.match(/\/detail\/id\/(\d+)\.html/) || s.match(/\/vod\/detail\/id\/(\d+)\.html/) || s.match(/id\/(\d+)/);
  return m ? m[1] : s;
}

function encodeLink(obj) {
  return "muou:" + encodeURIComponent(JSON.stringify(obj));
}

function decodeLink(link) {
  const raw = String(link || "");
  if (!raw.startsWith("muou:")) return null;
  try { return JSON.parse(decodeURIComponent(raw.slice(5))); } catch (_) { return null; }
}

async function httpTextFresh(url, options) {
  rexAssertWithinUsagePeriod();
  const res = await Widget.http.get(url, Object.assign({ timeout: 8000, headers: { "User-Agent": UA, Referer: getSite() + "/" } }, options || {}));
  return typeof res.data === "string" ? res.data : JSON.stringify(res.data || "");
}

async function httpJsonCore(method, url, data, headers) {
  const baseHeaders = headers || quarkHeaders();
  let res;
  if (method === "POST") {
    res = await Widget.http.post(url, JSON.stringify(data || {}), {
      timeout: 8000,
      headers: Object.assign({}, baseHeaders, { "Content-Type": "application/json" })
    });
  } else {
    res = await Widget.http.get(url, { headers: baseHeaders, timeout: 8000 });
  }
  syncQuarkPlaybackCookie(url,res);
  const json=typeof res.data === "string" ? JSON.parse(res.data) : res.data;
  const httpStatus=Number(res.status || res.statusCode || 0);
  if(httpStatus>=400) {
    const error=new Error("网盘接口 HTTP 错误");
    error.status=httpStatus;
    error.code=json && (json.errno !== undefined ? json.errno : json.error_code !== undefined ? json.error_code : json.code);
    throw error;
  }
  
  return json;
}

function quarkHeaders(cookie) {
  const ck = ensureCookie(cookie);
  return {
    "User-Agent": UA,
    "Cookie": ck,
    "Referer": "https://pan.quark.cn/"
  };
}

function playHeaders() {
  return { "User-Agent": UA, "Cookie": CURRENT_COOKIE };
}

async function panOriginal_loadCategory(params = {}) {
  rexAssertWithinUsagePeriod();
  bindForwardParams(params);
  const site = getSite(params);
  const page = Number(params.page || 1);
  const tid = String(params.categoryId || "1");
  const url = `${site}/index.php/vod/show/id/${tid}/page/${page}.html`;
  const html = await httpText(url);
  const $ = Widget.html.load(html);
  const list = [];

  $(".module-item").each((i, el) => {
    const a = $(el).find(".module-item-title");
    const href = a.attr("href") || "";
    const title = a.attr("title") || a.text().trim();
    const poster = $(el).find("img").attr("data-src") || $(el).find("img").attr("src") || "";
    const remark = pickText($, el, ".module-item-text");
    const id = idFromHref(href);
    if (id && title) {
      list.push({
        id: `muou-${id}`,
        type: "url",
        title,
        posterPath: absUrl(poster, site),
        description: remark,
        mediaType: tid === "1" ? "movie" : "tv",
        link: encodeLink({ action: "detail", id, site, mediaType: tid === "1" ? "movie" : "tv" })
      });
    }
  });
  return list;
}

async function panOriginal_search(params = {}, siteOverride) {
  rexAssertWithinUsagePeriod();
  bindForwardParams(params);
  const keyword = String(params.keyword || "").trim();
  if (!keyword) return [];
  const site = siteOverride || getSite(params);
  const url = `${site}/index.php/vod/search.html?wd=${encodeURIComponent(keyword)}`;
  const html = await httpText(url);
  const $ = Widget.html.load(html);
  
  const list = [];

  $(".module-search-item").each((i, el) => {
    const a = $(el).find("h3 a");
    const href = a.attr("href") || "";
    const title = a.text().trim() || $(el).find(".module-item-pic img").attr("alt") || "";
    const poster = $(el).find(".module-item-pic img").attr("data-src") || $(el).find(".module-item-pic img").attr("src") || "";
    const remark = pickText($, el, ".video-serial").replace("fuck you", "").trim();
    const id = idFromHref(href);
    if (id && title) {
      list.push({
        id: `muou-${id}`,
        type: "url",
        title,
        posterPath: absUrl(poster, site),
        description: remark,
        link: encodeLink({ action: "detail", id, site })
      });
    }
  });
  return list;
}

async function loadDetail(link) {
  await panPrepareSite({});
  rexAssertWithinUsagePeriod();

  ensureCookie();
  const info = decodeLink(link);
  if (!info) return null;
  if(info.action === "play" && info.mediaType === "movie") {
    const resources=await loadResourceImpl({link,type:info.mediaType || "tv",title:info.title});
    return playableDetailItems(resources,{title:info.title,mediaType:info.mediaType||"tv",link});
  }
  const detail=await buildDetailItem(info);
  if(detail.mediaType !== "movie")return detail;
  const sources=detail.episodeItems.flatMap(item=>{const entry=decodeLink(item.link);return entry.sources||[entry];});
  if(!sources.length)return detail;
  const playLink=encodeLink({action:"play",mediaType:"movie",title:detail.title,sources});
  const resources=await loadResourceImpl({link:playLink,type:"movie",title:detail.title});
  return playableDetailItems(resources,Object.assign({},detail,{link:playLink}));
}

function playableDetailItems(resources, detail) {
  const items=resources.filter(resource=>resource.url).map(resource=>Object.assign({},detail,resource,{
    id:resource.id,type:"url",name:resource.name,title:detail.title,
    mediaType:detail.mediaType,videoUrl:resource.url,
    description:resource.description,headers:resource.headers||resource.customHeaders
  }));
  if(!items.length)throw new Error("未能获取播放资源，请更换资源或检查 Cookie");
  return items;
}

async function runProviderTasks(items, work) {
  const groups = new Map();
  for (const item of items) {
    const provider = item.provider || "quark";
    if (!groups.has(provider)) groups.set(provider, []);
    groups.get(provider).push(item);
  }
  await Promise.all(Array.from(groups.values()).map(async group => {
    for (const item of group) await work(item);
  }));
}

async function buildDetailItem(info) {
  rexAssertWithinUsagePeriod();
  const site = getSite();
  const tid = String(info.id || "");
  const html = await httpText(`${site}/index.php/vod/detail/id/${tid}.html`);
  const $ = Widget.html.load(html);
  const title = $(".page-title").text().trim() || `木偶-${tid}`;
  const poster = $(".video-cover img").attr("data-src") || $(".video-cover img").attr("src") || "";
  const desc = $(".video-info-item.video-info-content .sqjj_a").text().trim().replace(/\[收起部分\]/g, "");

  const shares = extractShareLinks($);
  
  const episodeItems = [];
  const failures = [];
  const counts = {};
  await runProviderTasks(shares, async share => {
    counts[share.provider] = (counts[share.provider] || 0) + 1;
    const lineName = providerName(share.provider) + "#" + counts[share.provider];
    try {
      const detail = await rexShareCatalog(share);

      ((detail && detail.list) || []).forEach((v, idx) => {
        const epTitle = formatVideoName(v.file_name, v.size) || `视频 ${idx + 1}`;
        episodeItems.push({
          id: `${share.provider}-${share.shareId}-${v.fid}`,
          type: "url", title: epTitle, description: lineName,
          link: encodeLink({ action: "play", provider: share.provider, lineName, videoInfo: v, title: epTitle })
        });
      });
    } catch (e) {
      
      failures.push(`${lineName}: ${e.message || e}`);
      
    }
  });

  return {
    id: `muou-${tid}`,
    type: "url",
    title,
    posterPath: absUrl(poster, site),
    description: [desc || (shares.length ? `已发现 ${shares.length} 个网盘分享链接` : "未发现支持的网盘分享链接"), ...failures].filter(Boolean).join("\n"),
    mediaType:info.mediaType||"tv",
    episodeItems:groupEpisodeLines(episodeItems, tid).map(item=>{
      const entry=decodeLink(item.link);entry.mediaType=info.mediaType||"tv";
      return Object.assign({},item,{link:encodeLink(entry)});
    }),
    link: encodeLink({ action: "detail", id: tid, site,mediaType:info.mediaType||"tv" })
  };
}

async function panOriginal_loadResource(params = {}) {
  rexAssertWithinUsagePeriod(); return await loadResourceImpl(params); }

async function loadResourceImpl(params) {
  rexAssertWithinUsagePeriod();
  
  bindForwardParams(params || {});
  
  const link = params && params.link;
  let info = decodeLink(link);
  if (!info || info.action !== "play") {
    
    if (!info && (safeStorageGet("forward.muou.multiSource") || "enabled") !== "enabled") {
      
      return [];
    }
    info = await findEpisodeResource(params || {}, info);
    if (!info) return [];
  }

  if(info.mediaType === "movie")params=Object.assign({},params,{type:"movie"});
  if (Array.isArray(info.sources)) {
    info=Object.assign({},info,{sources:info.sources.filter(source=>rexProviderEnabled(source.provider||"quark"))});
    if(!info.sources.length)return [];
    const resources = [];
    const resolvedProviders = new Set();
    await runProviderTasks(info.sources, async source => {
      const provider = source.provider || "quark";
      const identity = episodeIdentity((source.videoInfo || {}).file_name);
      const resourceKey = provider + ":" + identity.key;
      if (resolvedProviders.has(resourceKey)) return;
      const items = await resolvePlaySource(source);
      
      const resource = items.find(item => item.url);
      if (resource) {
        resources.push(formatPlaybackResource(resource, source, params || {}));
        resolvedProviders.add(resourceKey);
      }
    });
    return resources.length ? resources : [{ name: "木偶网盘", description: "本集所有线路获取失败，请检查 Cookie 或刷新详情", url: "" }];
  }
  const items = await resolvePlaySource(info);
  return items.map(item => formatPlaybackResource(item, info, params || {}));
}

async function resolvePlaySource(info) {
  if(!rexProviderEnabled(info.provider||"quark"))return [];
  const videoInfo = info.videoInfo || {};

  try {
    if (info.provider === "115") return await get115Resource(info);
    if (info.provider === "uc") return await getUcResource(info);
    if (info.provider === "baidu") return await serialBaidu(() => getBaiduResource(info));
    const fid = await saveShareFile(videoInfo);
    if (!fid) throw new Error("转存失败");
    const urls = await getPlayUrl(fid);
    const best = urls.find(v => v.resolution === "4k") || urls.find(v => v.resolution === "2k") || urls[0];
    if (best && best.url) {
      return [{
        name: "垮",
        customHeaders: playHeaders(),
        description: best.resolution ? `清晰度: ${best.resolution}` : "",
        url: best.url
      }];
    }
  } catch (e) {

  }
  return [{
    name: info.title || "垮视频",
    description: info.provider === "uc" ? "优免登直链获取失败，请重开详情刷新分享信息" : "获取播放地址失败，请检查对应网盘 Cookie 和提取码",
    url: ""
  }];
}

async function getStoken(shareId, passcode) {
  const url = "https://drive-h.quark.cn/1/clouddrive/share/sharepage/token?pr=ucpro&fr=pc&uc_param_str=";
  const json = await httpJson("POST", url, { pwd_id: shareId, passcode: passcode || "" }, quarkHeaders());
  return json && json.status === 200 && json.data ? json.data.stoken : "";
}

async function getShareDetail(shareId, stoken) {
  const back = { movieName: "", list: [] };
  const folderQueue = ["0"];
  while (folderQueue.length > 0) {
    const pdir = folderQueue.shift();
    const params = {
      pr: "ucpro", fr: "pc", uc_param_str: "", ver: "2",
      pwd_id: shareId, stoken, pdir_fid: pdir,
      force: "0", _page: "1", _size: "200", _sort: "file_type:asc,file_name:asc"
    };
    const url = `https://drive-h.quark.cn/1/clouddrive/share/sharepage/detail?${toQuery(params)}`;
    const json = await httpJson("GET", url, null, quarkHeaders());
    const items = (json && json.data && json.data.list) || [];
    for (const item of items) {
      if (item.dir) {
        back.movieName = item.file_name || back.movieName;
        folderQueue.push(item.fid);
      } else if (String(item.file_type || "").includes("video") || item.obj_category === "video") {
        back.list.push({
          fid: item.fid,
          file_name: item.file_name,
          pdir_fid: item.pdir_fid,
          size: item.size,
          share_fid_token: item.share_fid_token || "",
          video_max_resolution: item.video_max_resolution || "",
          dir: false,
          file: true,
          shareId,
          stoken
        });
      }
    }
  }
  if (!back.movieName && back.list[0]) back.movieName = String(back.list[0].file_name || "").replace(/\.(mp4|mkv|flv|avi|mov|m3u8)$/i, "");
  return back;
}

async function getVideosFromShareLink(shareLink, passcode) {
  const match = String(shareLink || "").match(/\/s\/([a-zA-Z0-9]+)/);
  const shareId = match ? match[1] : "";
  if (!shareId) return { movieName: "", list: [] };
  const stoken = await getStoken(shareId, passcode || "");
  if (!stoken) throw new Error("垮分享令牌获取失败，请检查分享和 Cookie");
  return await getShareDetail(shareId, stoken);
}

async function checkFolderExists(folderName) {
  const url = "https://drive-pc.quark.cn/1/clouddrive/file/sort?pr=ucpro&fr=pc&uc_param_str=&pdir_fid=0&_page=1&_size=50&_fetch_total=1&_fetch_sub_dirs=0&_sort=file_type:asc,updated_at:desc&fetch_all_file=1&fetch_risk_file_name=1";
  const json = await httpJson("GET", url, null, quarkHeaders());
  const list = (json && json.data && json.data.list) || [];
  const folder = list.find(x => x.dir && x.file_name === folderName);
  return folder ? folder.fid : "";
}

async function deleteFiles(filelist) {
  if (!Array.isArray(filelist) || filelist.length === 0) return false;
  const url = "https://drive-pc.quark.cn/1/clouddrive/file/delete?pr=ucpro&fr=pc&uc_param_str=";
  try {
    const json = await httpJson("POST", url, { action_type: 2, filelist: filelist, exclude_fids: [] }, quarkHeaders());
    if (json && json.status === 200 && json.code === 0) {
      
      return true;
    }
    
    return false;
  } catch (e) {
    
    return false;
  }
}

async function createFolder(folderName, pdirFid = "0") {
  
  const existingFid = await checkFolderExists(folderName);
  if (existingFid) {
    return existingFid;
  }
  
  const url = "https://drive-pc.quark.cn/1/clouddrive/file?pr=ucpro&fr=pc&uc_param_str=";
  try {
    const json = await httpJson("POST", url, {
      pdir_fid: pdirFid,
      file_name: folderName,
      dir_path: "",
      dir_init_lock: false
    }, quarkHeaders());
    if (json && json.status === 200 && json.code === 0 && json.data) {
      
      return json.data.fid;
    }
    
    return "0";
  } catch (e) {
    
    return "0";
  }
}

async function saveShareFile(videoInfo) {
  const toFid=await createFolder(CACHE_FOLDER);
  if(!toFid || toFid === "0")return "";
  const base="https://drive-h.quark.cn/1/clouddrive/";
  const query="pr=ucpro&fr=pc&uc_param_str=";
  const body={fid_list:[videoInfo.fid],fid_token_list:[videoInfo.share_fid_token],
    pdir_fid:videoInfo.pdir_fid||"0",pwd_id:videoInfo.shareId,scene:"link",stoken:videoInfo.stoken,to_pdir_fid:toFid};
  const savedFid=json=>{
    const data=json&&json.data;
    const candidates=[data,data&&data.task_resp&&data.task_resp.data];
    for(const entry of candidates){
      const saved=entry&&entry.save_as;
      const fids=saved&&(saved.save_as_top_fids||saved.save_as_select_top_fids);
      if(Array.isArray(fids)&&fids.length)return String(fids[0]);
    }
    return "";
  };
  const successful=json=>!!json&&(json.code==null||Number(json.code)===0)&&(json.status==null||Number(json.status)===200);
  try{
    const json=await httpJson("POST",base+"share/sharepage/save?"+query,body,quarkHeaders());
    if(!successful(json))return "";
    const immediate=savedFid(json);if(immediate)return immediate;
    const taskId=json.data&&json.data.task_id;if(!taskId)return "";
    
    for(let retry=0;retry<6;retry++){
      const task=await httpJson("GET",base+"task?"+query+"&task_id="+encodeURIComponent(String(taskId))+"&retry_index="+retry,null,quarkHeaders());
      if(!successful(task))return "";
      const fid=savedFid(task);if(fid)return fid;
      if(retry<5&&typeof setTimeout==="function")await new Promise(resolve=>setTimeout(resolve,1000));
    }
    return "";
  }catch(_){return "";}
}

async function getPlayUrl(myFid) {
  const url = "https://drive-pc.quark.cn/1/clouddrive/file/v2/play?pr=ucpro&fr=pc&uc_param_str=";
  const json = await httpJson("POST", url, { fid: myFid, resolutions: "normal,low,high,super,2k,4k" }, quarkHeaders());
  const arr = json && json.status === 200 && json.code === 0 && json.data ? (json.data.video_list || []) : [];
  return arr.map(v => ({ resolution: v.resolution, file_name: json.data.file_name, url: v.video_info && v.video_info.url })).filter(v => v.url);
}

function formatVideoName(fileName, size) {
  if (!fileName) return "视频";
  const gb = Number(size || 0) / 1024 / 1024 / 1024;
  const sizeText = gb > 0 ? ` ${gb >= 1 ? gb.toFixed(2) + "GB" : Math.round(gb * 1024) + "MB"}` : "";
  return String(fileName).trim() + sizeText;
}

function playbackLineName(provider) {
  return { quark: "垮", baidu: "佰", uc: "优", "115":"伍" }[provider] || "网盘";
}

function providerName(provider) {
  return { quark: "垮网盘", baidu: "佰", uc: "优", "115":"伍" }[provider] || "网盘";
}

function extractShareLinks($) {
  const shares = [];
  const seen = new Set();
  $(".module-row-info p, .module-row-one p, .module-row-info a, .module-row-one a, a").each((i, el) => {
    const text = (($(el).attr("data-clipboard-text") || "") + " " + ($(el).attr("href") || "") + " " + $(el).text()).replace(/&amp;/g, "&");
    const regex = /https?:\/\/(pan\.quark\.cn|drive\.uc\.cn|pan\.baidu\.com|115\.com|anxia\.com|115cdn\.com)\/(s\/[A-Za-z0-9_-]+(?:\?[^\s<>"'，。]*)?|share\/init\?[^\s<>"'，。]+)/g;
    let m;
    while ((m = regex.exec(text))) {
      const provider = m[1] === "pan.baidu.com" ? "baidu" : m[1] === "drive.uc.cn" ? "uc" : /^(115|anxia|115cdn)\.com$/.test(m[1]) ? "115" : "quark";
      const id = m[2].match(/^s\/([^?&#]+)/) || m[2].match(/[?&]surl=([^&#]+)/);
      if (!id) continue;
      const queryPwd = m[0].match(/[?&](?:pwd|password|passcode)=([^&#\s]+)/);
      const nearbyPwd = text.slice(m.index + m[0].length, m.index + m[0].length + 80).match(/(?:提取码|提取密碼|密码|密碼)\s*[:：]?\s*([A-Za-z0-9]{4,8})/);
      const passcode = queryPwd ? decodeURIComponent(queryPwd[1]) : nearbyPwd ? nearbyPwd[1] : "";
      const key = provider + ":" + id[1];
      const existing = shares.find(x => x.key === key);
      if (existing) { if (!existing.passcode && passcode) existing.passcode = passcode; continue; }
      if (!seen.has(key)) {
        seen.add(key);
        shares.push({ key, provider, shareId: id[1], passcode, url: m[0] });
      }
    }
  });
  return shares.filter(share=>rexProviderEnabled(share.provider));
}

function isVideoFile(item) {
  return item.obj_category === "video" || String(item.category) === "1" ||
    /\.(mp4|mkv|avi|mov|flv|wmv|ts|m2ts|webm|m4v)$/i.test(item.file_name || item.server_filename || "");
}

const UC_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) uc-cloud-drive/2.5.20 Chrome/100.0.4896.160 Electron/18.3.5.4-b478491100 Safari/537.36 Channel/pckk_other_ch";
function ucHeaders() { return { "User-Agent": UC_UA, Referer: "https://drive.uc.cn" }; }
async function ucApi(path, data) {
  const json = await httpJson(data ? "POST" : "GET", "https://pc-api.uc.cn/1/clouddrive/" + path, data, ucHeaders());
  if (!json || (json.status && json.status !== 200) || (json.code && json.code !== 0)) {
    const error=new Error("优分享请求失败");
    error.code=json && json.code; error.status=json && json.status;
    throw error;
  }
  return json.data;
}
async function getUcToken(shareId, passcode) {
  const data = await ucApi("share/sharepage/token?pr=UCBrowser&fr=pc", { pwd_id: shareId, passcode: passcode || "" });
  if (!data || !data.stoken) throw new Error("优分享失效或提取码错误");
  return data.stoken;
}
async function getUcVideos(share) {
  const stoken = await getUcToken(share.shareId, share.passcode);
  const queue = ["0"], visited = new Set(), seen = new Set(), list = [];
  while (queue.length) {
    const folder = queue.shift();
    if (visited.has(String(folder))) continue;
    visited.add(String(folder));
    for (let page = 1; ; page++) {
      const data = await ucApi("share/sharepage/detail?" + toQuery({ pr: "UCBrowser", fr: "pc", pwd_id: share.shareId, stoken, pdir_fid: folder, force: 0, _page: page, _size: 100, _sort: "file_type:asc,file_name:asc" }));
      const items = data && data.list || [];
      let added = 0;
      for (const item of items) {
        if (seen.has(String(item.fid))) continue;
        seen.add(String(item.fid)); added++;
        if (item.dir) queue.push(item.fid);
        else if (isVideoFile(item)) list.push(Object.assign({}, item, { shareId: share.shareId, passcode: share.passcode, stoken }));
      }
      if (!added || items.length < 100) break;
    }
  }
  return { list };
}
async function getUcResource(info) {
  let v = info.videoInfo || {};
  const started = Date.now();

  const download = async video => {
    
    const data = await ucApi("file/download?pr=UCBrowser&fr=pc", {
      fids:[video.fid], fids_token:[video.share_fid_token], pwd_id:video.shareId,
      stoken:video.stoken, speedup_session:""
    });
    return Array.isArray(data) ? data[0] : data;
  };
  try {
    let item;
    if (v.stoken && v.share_fid_token) {
      try { item=await download(v); } catch(e) {  }
    }
    if (!item || !item.download_url) {
      
      const detail=await getUcVideos({shareId:v.shareId,passcode:v.passcode});
      v=detail.list.find(file=>String(file.fid)===String(v.fid));
      if(!v) throw new Error("优分享文件已失效");
      item=await download(v);
    }
    if(!item || !/^https?:\/\//i.test(item.download_url || "")) throw new Error("优免登下载地址为空或格式无效");
    
    const headers={"User-Agent":UC_UA,Referer:item.download_url+"\\","Accept-Encoding":"identity"};
    const resource={name:"优",description:"原画",url:item.download_url,customHeaders:headers,headers:Object.assign({},headers)};

    return [resource];
  } catch(e) {
      throw e;
  }
}

let baiduQueue = Promise.resolve();
function serialBaidu(work) {
  const queuedAt=Date.now();
  const execute=()=>work();
  const next = baiduQueue.then(execute, execute);
  baiduQueue = next.catch(() => {});
  return next;
}
function baiduHeaders(share, randsk) {
  let cookie = normalizeCookie(safeStorageGet("forward.muou.baidu.cookie"));
  if (!cookie) throw new Error("请先在插件设置填写佰 Cookie");
  
  cookie = cookie.split(";").map(p => p.trim()).filter(p => p && !/^BDCLND\s*=/i.test(p)).join("; ");
  if (randsk) cookie += "; BDCLND=" + randsk;
  return { "User-Agent": BAIDU_WEB_UA, Cookie: cookie, Referer: share.url || "https://pan.baidu.com/share/init?surl=" + encodeURIComponent(baiduShortId(share.shareId)) };
}
function baiduShortId(shareId) { return shareId.charAt(0) === "1" ? shareId.slice(1) : shareId; }
async function baiduVerifyCore(share) {
  
  const res = await Widget.http.post("https://pan.baidu.com/share/verify?" + toQuery({ surl: baiduShortId(share.shareId), pwd: share.passcode || "" }),
    toQuery({ pwd: share.passcode || "", vcode: "", vcode_str: "" }),
    { timeout: 8000, headers: Object.assign(baiduHeaders(share), { "Content-Type": "application/x-www-form-urlencoded" }) });
  const json = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
  
  if (!json || Number(json.errno) !== 0 || !json.randsk) {
    const error=new Error("佰提取码验证失败或需要验证码");
    error.status=Number(res.status || res.statusCode || 0) || undefined;
    error.code=json && json.errno;
    throw error;
  }
  return json.randsk;
}
async function getBaiduVideos(share) {
  return serialBaidu(async () => {
    const randsk = await baiduVerify(share);
    const headers = baiduHeaders(share, randsk);
    const queue = [null], visited = new Set(), seen = new Set(), list = [];
    let uk, shareid;
    while (queue.length) {
      const dir = queue.shift();
      if (visited.has(dir)) continue;
      visited.add(dir);
      for (let page = 1; ; page++) {
        const pageSize = dir === null ? 20 : 100;
        const params = { app_id:250528, web:1, channel:"chunlei", view_mode:1, showempty:0,
          page, num:pageSize, order:dir === null ? "time" : "name", desc:dir === null ? 1 : 0 };
        if (dir === null) Object.assign(params,{root:1, clienttype:0, shorturl:baiduShortId(share.shareId)});
        else Object.assign(params,{dir, uk, shareid, is_from_web:true});
        const json = await httpJson("GET", "https://pan.baidu.com/share/list?" + toQuery(params), null, headers);
        if (!json || Number(json.errno) !== 0 || !Array.isArray(json.list)) throw new Error("佰目录读取失败，请检查 Cookie、分享或验证码");
        if (dir === null) { uk = json.uk || uk; shareid = json.share_id || json.shareid || shareid; }
        let added = 0;
        for (const item of json.list) {
          const fid = String(item.fs_id || item.fsid || item.path);
          if (seen.has(fid)) continue;
          seen.add(fid); added++;
          if (Number(item.isdir) === 1 || String(item.category) === "6") queue.push(item.path);
          else if (isVideoFile(item)) list.push({ fid, file_name: item.server_filename, size: item.size, path: item.path, uk, shareid, shareId: share.shareId, passcode: share.passcode });
        }
        if (!added || json.list.length < pageSize) break;
      }
    }
    return { list };
  });
}
const BAIDU_WEB_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
const BAIDU_PLAY_UA = "netdisk;P2SP;2.2.91.136;android-android;";
const BAIDU_APP_VERSION = "12.0.0";
function baiduSha1(message) {
  const encoded = encodeURIComponent(String(message));
  const bytes = [];
  for (let i = 0; i < encoded.length; i++) {
    if (encoded[i] === "%") { bytes.push(parseInt(encoded.slice(i + 1, i + 3), 16)); i += 2; }
    else bytes.push(encoded.charCodeAt(i));
  }
  const bitLength = bytes.length * 8;
  bytes.push(128);
  while (bytes.length % 64 !== 56) bytes.push(0);
  const high = Math.floor(bitLength / 4294967296);
  for (let i = 3; i >= 0; i--) bytes.push((high >>> (i * 8)) & 255);
  for (let i = 3; i >= 0; i--) bytes.push((bitLength >>> (i * 8)) & 255);
  const rotate = (n, count) => (n << count) | (n >>> (32 - count));
  let h0 = 0x67452301, h1 = 0xefcdab89, h2 = 0x98badcfe, h3 = 0x10325476, h4 = 0xc3d2e1f0;
  for (let offset = 0; offset < bytes.length; offset += 64) {
    const w = [];
    for (let i = 0; i < 16; i++) {
      const start = offset + i * 4;
      w[i] = (bytes[start] << 24) | (bytes[start + 1] << 16) | (bytes[start + 2] << 8) | bytes[start + 3];
    }
    for (let i = 16; i < 80; i++) w[i] = rotate(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1);
    let a = h0, b = h1, c = h2, d = h3, e = h4;
    for (let i = 0; i < 80; i++) {
      const f = i < 20 ? (b & c) | (~b & d) : i < 40 ? b ^ c ^ d : i < 60 ? (b & c) | (b & d) | (c & d) : b ^ c ^ d;
      const k = i < 20 ? 0x5a827999 : i < 40 ? 0x6ed9eba1 : i < 60 ? 0x8f1bbcdc : 0xca62c1d6;
      const next = (rotate(a, 5) + f + e + k + w[i]) | 0;
      e = d; d = c; c = rotate(b, 30); b = a; a = next;
    }
    h0 = (h0 + a) | 0; h1 = (h1 + b) | 0; h2 = (h2 + c) | 0; h3 = (h3 + d) | 0; h4 = (h4 + e) | 0;
  }
  return [h0, h1, h2, h3, h4].map(n => (n >>> 0).toString(16).padStart(8, "0")).join("");
}

async function getBaiduResource(info) {
  const v = info.videoInfo || {};

  try {
    
    if (!v.shareid || !v.uk || !v.fid) throw new Error("佰分享文件信息不完整，请重新打开详情");
    const headers = baiduHeaders(v);
    const bduss = headers.Cookie.match(/(?:^|;)\s*BDUSS=([^;]+)/);
    if (!bduss) throw new Error("佰 Cookie 缺少 BDUSS");
    
    let randsk = await baiduVerify(v);
    
    const account = await httpJson("GET", "https://mbd.baidu.com/userx/v1/info/get?" + toQuery({
      appname:"baiduboxapp", fields:'        ["bg_image","member","uid","avatar", "avatar_member"]',
      client:"", clientfrom:"", lang:"zh-cn", tpl:"", ttt:""
    }), null, headers);
    const accountUid = account && account.data && account.data.fields && account.data.fields.uid;
    const uid = accountUid || "default_uid";
    const devuid = "73CED981D0F186D12BC18CAE1684FFD5|VSRCQTF6W";
    const requestDlink = async () => {
      
      let sekey = randsk;
      try { sekey = decodeURIComponent(randsk); } catch (_) {}
      const time = String(Date.now());
      const rand = baiduSha1(baiduSha1(bduss[1]) + uid + "ebrcUYiuxaZv2XGu7KIYKxUrqfnOfpDF" + time + devuid + BAIDU_APP_VERSION + "ae5821440fab5e1a61a025f014bd8972");
      
      return await httpJson("GET", "https://pan.baidu.com/share/list?" + toQuery({
        shareid:v.shareid, uk:v.uk, fid:v.fid, sekey, origin:"dlna", devuid,
        clienttype:1, channel:"android_12_zhao_bd-netdisk_1024266h", version:BAIDU_APP_VERSION, time, rand
      }), null, Object.assign(baiduHeaders(v, randsk), {"User-Agent":BAIDU_PLAY_UA, Referer:"https://pan.baidu.com/"}));
    };
    let json = await requestDlink();
    if (json && Number(json.errno) === -9 && v.passcode) {
      
      randsk = await baiduVerify(v);
      json = await requestDlink();
    }
    const items = json && (Array.isArray(json.list) ? json.list : Array.isArray(json.info) ? json.info : []) || [];
    const fileId = file => file && (file.fs_id || file.fsid || file.fid);
    
    const item = items.find(file => String(fileId(file)) === String(v.fid)) ||
      (items.length === 1 && !fileId(items[0]) ? items[0] : null);

    if (!json || Number(json.errno) !== 0 || !item || !/^https?:\/\//i.test(item.dlink || "")) {
      const error = new Error("佰不转存直链获取失败");
      if (json && Number.isFinite(Number(json.errno))) error.code = Number(json.errno);
      throw error;
    }
    
    const playbackHeaders = {"User-Agent":BAIDU_PLAY_UA, Referer:"https://pan.baidu.com/"};
    
    const playbackUrl = item.dlink.replace(/\|/g, "%7C");

    return [{name:"佰", description:"原画", url:playbackUrl, customHeaders:playbackHeaders, headers:playbackHeaders}];
  } catch (error) {

    throw error;
  }
}

function episodeIdentity(fileName) {
  const name = String(fileName || "").replace(/\.[a-z0-9]{2,5}$/i, "");
  const seasonMatch = name.match(/s(\d{1,2})[ ._-]*e(\d{1,3})(?!\d)/i);
  if (seasonMatch) return { key: `s${Number(seasonMatch[1])}e${Number(seasonMatch[2])}`, season: Number(seasonMatch[1]), episode: Number(seasonMatch[2]) };
  const season = name.match(/第\s*(\d+)\s*季/);
  const episode = name.match(/第\s*(\d{1,3})\s*[集话]/) || name.match(/(?:^|[^a-z])(?:ep?|episode)[ ._-]*(\d{1,3})(?!\d)/i) || name.match(/^\s*(\d{1,3})(?:$|[ ._\-])/);
  if (episode) return { key: `s${season ? Number(season[1]) : 1}e${Number(episode[1])}`, season: season ? Number(season[1]) : 1, episode: Number(episode[1]) };
  return { key: "name:" + name.toLowerCase().replace(/[\s._\-]+/g, "") };
}

function groupEpisodeLines(items, tid) {
  const groups = new Map();
  for (const item of items) {
    const source = decodeLink(item.link);
    if (!source) continue;
    const identity = episodeIdentity(source.videoInfo.file_name);
    if (!groups.has(identity.key)) groups.set(identity.key, { identity, item, sources: [] });
    groups.get(identity.key).sources.push(source);
  }
  return Array.from(groups.values()).sort((a, b) => {
    if (a.identity.episode !== undefined && b.identity.episode !== undefined) return a.identity.season - b.identity.season || a.identity.episode - b.identity.episode;
    return a.item.title.localeCompare(b.item.title, "zh-CN", { numeric: true });
  }).map(group => ({
    id: `muou-${tid}-${group.identity.key}`, type: "url",
    title: group.identity.episode !== undefined ? `第${group.identity.episode}集` : group.item.title,
    description: Array.from(new Set(group.sources.map(source => playbackLineName(source.provider || "quark")))).join(" / "),
    link: encodeLink({ action: "play", title: group.item.title, sources: group.sources })
  }));
}

async function findEpisodeResource(params, linkInfo) {
  let detail;
  if (linkInfo && linkInfo.action === "detail") {
    detail = await buildDetailItem(linkInfo);
  } else {
    const title = String(params.seriesName || params.title || params.name || params.keyword || "").trim();
    if (!title) return null;
    const baseTitle = value => String(value || "").replace(/\s*(?:第\s*[一二三四五六七八九十百\d]+\s*季|season\s*\d+)\s*$/i, "").trim();
    const keyword = baseTitle(title);
    
    const normalize = value => baseTitle(value).replace(/[\s·:：._\-]/g, "").toLowerCase();
    const sites = Array.from(new Set([getSite(params), ...WidgetMetadata.globalParams.find(p => p.name === "site").enumOptions.map(p => p.value)]));
    let match;
    for (const candidateSite of sites) {
      try {
        const results = await search(Object.assign({}, params, { keyword }), candidateSite);
        
        const matches=results.filter(item=>normalize(item.title)===normalize(title));
        const details=[];
        for(const candidate of matches){
          try{
            const candidateDetail=await buildDetailItem(decodeLink(candidate.link));
            
            if(candidateDetail.episodeItems && candidateDetail.episodeItems.length)details.push(candidateDetail);
          }catch(error){}
        }
        if(details.length){match=matches[0];detail=combineSameTitleDetails(details);break;}
      } catch (error) {
        
      }
    }
    if (!match) {  return null; }
    if(!detail) detail = await buildDetailItem(decodeLink(match.link));
  }
  const episodes = detail && detail.episodeItems || [];
  
  const ep = Number(params.episode);
  const season = Number(params.season || 1);
  if (params.type !== "movie" && Number.isFinite(ep) && ep > 0) {
    const target = episodes.find(item => {
      const source = decodeLink(item.link);
      const identity = source && source.sources && source.sources[0] && episodeIdentity(source.sources[0].videoInfo.file_name);
      return identity && identity.episode === ep && identity.season === season;
    });
    
    return target ? decodeLink(target.link) : null;
  }
  
  if (episodes.length) {
    return { action: "play", sources: episodes.reduce((sources, item) => sources.concat(decodeLink(item.link).sources || []), []) };
  }
  return null;
}

function formatPlaybackResource(resource, source, params) {
  const provider = source.provider || "quark";
  const video = source.videoInfo || {};
  const name = playbackLineName(provider);
  const title = params.seriesName || params.title || source.title || video.file_name || "木偶";
  const episode = params.episode ? ` 第${params.episode}集` : "";
  return Object.assign({}, resource, {
    id: ["muou", provider, video.shareId || "", video.fid || "", params.season || 1, params.episode || ""].map(part => encodeURIComponent(String(part))).join("_"),
    name,
    type: params.type === "movie" ? "movie" : "tv",
    description: `${title}${episode} [${name}]` + (resource.description ? ` · ${resource.description}` : "")
  });
}

async function httpJson(method, url, data, headers) { return await httpJsonCore(method, url, data, headers); }

async function baiduVerify(share) { return await baiduVerifyCore(share); }

const P115_UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 115Browser/36.0.0 Chromium/125.0";
function headers115(required=false){
  const cookie=normalizeCookie(safeStorageGet("forward.muou.115.cookie"));
  if(required&&!cookie)throw new Error("请在插件设置填写伍 Cookie");
  const headers={"User-Agent":P115_UA,Referer:"https://115.com/"};
  if(cookie)headers.Cookie=cookie;
  return headers;
}
async function get115Videos(share){
  const queue=[""],visited=new Set(),seen=new Set(),list=[];
  while(queue.length){
    const cid=String(queue.shift());if(visited.has(cid))continue;visited.add(cid);
    for(let offset=0;;){
      const json=await httpJson("GET","https://webapi.115.com/share/snap?"+toQuery({share_code:share.shareId,receive_code:share.passcode||"",cid,limit:100,offset}),null,headers115());
      if(!json||!json.state||!json.data)throw new Error("伍分享读取失败，检查提取码或登录状态");
      const data=json.data,items=data.list||[];let added=0;
      for(const item of items){
        const key=String(item.fc)+":"+String(item.fid||item.cid);
        if(seen.has(key))continue;seen.add(key);added++;
        if(Number(item.fc)===0)queue.push(item.cid);
        else if(Number(item.fc)===1&&isVideoFile({file_name:item.n}))list.push({fid:String(item.fid),file_name:item.n,size:Number(item.s||0),shareId:share.shareId,passcode:share.passcode||""});
      }
      offset+=items.length;
      if(!added||(Number(data.count)?offset>=Number(data.count):items.length<100))break;
    }
  }
  return {list};
}
async function get115Resource(info){
  const v=info.videoInfo||{},start=Date.now();

  try{
    
    const headers=headers115(true);
    if(!v.shareId||!v.fid)throw new Error("伍分享文件信息缺失");
    
    const encoded=p115Encrypt(JSON.stringify({share_code:v.shareId,receive_code:v.passcode||"",file_id:String(v.fid)}));
    const body=toQuery({data:encoded});
    
    const response=await Widget.http.post("https://proapi.115.com/app/share/downurl",body,{timeout:8000,headers:Object.assign({},headers,{"Content-Type":"application/x-www-form-urlencoded"})});
    const json=typeof response.data==="string"?JSON.parse(response.data):response.data;
    
    if(!json||!json.state||typeof json.data!=="string"){
      const error=new Error("伍下载接口拒绝请求");error.code=json&&(json.errno||json.errcode);error.status=response.status;throw error;
    }
    
    const data=JSON.parse(p115Decrypt(json.data));
    const url=typeof data.url==="string"?data.url:data.url&&data.url.url;
    if(!/^https?:\/\//i.test(url||""))throw new Error("伍原画地址为空");
    const playHeaders={"User-Agent":P115_UA,Referer:"https://115.com/"};
    const auth=data.url&&data.url.auth_cookie||data.auth_cookie;
    if(auth&&auth.name&&auth.value)playHeaders.Cookie=auth.name+"="+auth.value;
    const resource={name:"伍",description:"原画",url,headers:playHeaders,customHeaders:Object.assign({},playHeaders)};
    
    return [resource];
  }catch(error){throw error;}
}

function combineSameTitleDetails(details){
  const items=[],seen=new Set();
  for(const detail of details)for(const episode of detail.episodeItems||[]){
    const info=decodeLink(episode.link);
    for(const source of info&&info.sources||[]){
      const v=source.videoInfo||{},key=[source.provider,v.shareId,v.fid].join(":");if(seen.has(key))continue;seen.add(key);
      items.push({title:source.title||v.file_name,link:encodeLink(source)});
    }
  }
  return {episodeItems:groupEpisodeLines(items,"aggregate")};
}
function p115Utf8Encode(text){
  const encoded=encodeURIComponent(text),bytes=[];
  for(let i=0;i<encoded.length;i++){if(encoded[i]==="%"){bytes.push(parseInt(encoded.slice(i+1,i+3),16));i+=2;}else bytes.push(encoded.charCodeAt(i));}
  return new Uint8Array(bytes);
}
function p115Utf8Decode(bytes){return decodeURIComponent(Array.from(bytes,b=>"%"+b.toString(16).padStart(2,"0")).join(""));}
const P115_BASE64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function p115Base64Encode(bytes){
  let text="";for(let i=0;i<bytes.length;i+=3){const n=(bytes[i]<<16)|((bytes[i+1]||0)<<8)|(bytes[i+2]||0);
    text+=P115_BASE64[(n>>>18)&63]+P115_BASE64[(n>>>12)&63]+(i+1<bytes.length?P115_BASE64[(n>>>6)&63]:"=")+(i+2<bytes.length?P115_BASE64[n&63]:"=");}return text;
}
function p115Base64Decode(text){
  const clean=String(text).replace(/\s/g,"");if(!/^[A-Za-z0-9+/]*={0,2}$/.test(clean)||clean.length%4)throw new Error("伍加密响应Base64无效");
  const bytes=[];for(let i=0;i<clean.length;i+=4){const n=(P115_BASE64.indexOf(clean[i])<<18)|(P115_BASE64.indexOf(clean[i+1])<<12)|((P115_BASE64.indexOf(clean[i+2])&63)<<6)|(P115_BASE64.indexOf(clean[i+3])&63);
    bytes.push((n>>>16)&255);if(clean[i+2]!=="=")bytes.push((n>>>8)&255);if(clean[i+3]!=="=")bytes.push(n&255);}return new Uint8Array(bytes);
}

const p115G_kts = new Uint8Array([
  0xf0, 0xe5, 0x69, 0xae, 0xbf, 0xdc, 0xbf, 0x8a,
  0x1a, 0x45, 0xe8, 0xbe, 0x7d, 0xa6, 0x73, 0xb8,
  0xde, 0x8f, 0xe7, 0xc4, 0x45, 0xda, 0x86, 0xc4,
  0x9b, 0x64, 0x8b, 0x14, 0x6a, 0xb4, 0xf1, 0xaa,
  0x38, 0x01, 0x35, 0x9e, 0x26, 0x69, 0x2c, 0x86,
  0x00, 0x6b, 0x4f, 0xa5, 0x36, 0x34, 0x62, 0xa6,
  0x2a, 0x96, 0x68, 0x18, 0xf2, 0x4a, 0xfd, 0xbd,
  0x6b, 0x97, 0x8f, 0x4d, 0x8f, 0x89, 0x13, 0xb7,
  0x6c, 0x8e, 0x93, 0xed, 0x0e, 0x0d, 0x48, 0x3e,
  0xd7, 0x2f, 0x88, 0xd8, 0xfe, 0xfe, 0x7e, 0x86,
  0x50, 0x95, 0x4f, 0xd1, 0xeb, 0x83, 0x26, 0x34,
  0xdb, 0x66, 0x7b, 0x9c, 0x7e, 0x9d, 0x7a, 0x81,
  0x32, 0xea, 0xb6, 0x33, 0xde, 0x3a, 0xa9, 0x59,
  0x34, 0x66, 0x3b, 0xaa, 0xba, 0x81, 0x60, 0x48,
  0xb9, 0xd5, 0x81, 0x9c, 0xf8, 0x6c, 0x84, 0x77,
  0xff, 0x54, 0x78, 0x26, 0x5f, 0xbe, 0xe8, 0x1e,
  0x36, 0x9f, 0x34, 0x80, 0x5c, 0x45, 0x2c, 0x9b,
  0x76, 0xd5, 0x1b, 0x8f, 0xcc, 0xc3, 0xb8, 0xf5,
]);
const p115RSA_e = 0x8686980c0f5a24c4b9d43020cd2c22703ff3f450756529058b1cf88f09b8602136477198a6e2683149659bd122c33592fdb5ad47944ad1ea4d36c6b172aad6338c3bb6ac6227502d010993ac967d1aef00f0c8e038de2e4d3bc2ec368af2e9f10a6f1eda4f7262f136420c07c331b871bf139f74f3010e3c4fe57df3afb71683n;
const p115RSA_n = 0x10001n;

function p115ToBytes(value, length) {
  if (length == undefined)
    length = Math.ceil(value.toString(16).length / 2);
  const buffer = new Uint8Array(length);
  for (let i = length - 1; i >= 0; i--) {
    buffer[i] = Number(value & 0xffn);
    value >>= 8n;
  }
  return buffer;
}

function p115FromBytes(bytes) {
  let intVal = 0n;
  for (const b of bytes)
    intVal = (intVal << 8n) | BigInt(b);
  return intVal;
}

function* p115AccStep(start, stop, step = 1) {
  for (let i = start + step; i < stop; i += step) {
    yield [start, i, step];
    start = i;
  }
  if (start !== stop)
    yield [start, stop, stop - start];
}

function p115BytesXor(v1, v2) {
  const result = new Uint8Array(v1.length);
  for (let i = 0; i < v1.length; i++)
    result[i] = v1[i] ^ v2[i];
  return result;
}

function p115GenKey(randKey, skLen) {
  const xorKey = new Uint8Array(skLen);
  let length = skLen * (skLen - 1);
  let index = 0;
  for (let i = 0; i < skLen; i++) {
    const x = (randKey[i] + p115G_kts[index]) & 0xff;
    xorKey[i] = p115G_kts[length] ^ x;
    length -= skLen;
    index += skLen;
  }
  return xorKey;
}

function p115PadPkcs1V1_5(message) {
  const msg_len = message.length
  const buffer = new Uint8Array(128);
  buffer.fill(0x02, 1, 127 - msg_len);
  buffer.set(message, 128 - msg_len);
  return p115FromBytes(buffer);
}

function p115Xor(src, key) {
  const buffer = new Uint8Array(src.length);
  const i = src.length & 0b11;
  if (i)
    buffer.set(p115BytesXor(src.subarray(0, i), key.subarray(0, i)));
  for (const [j, k] of p115AccStep(i, src.length, key.length))
    buffer.set(p115BytesXor(src.subarray(j, k), key), j);
  return buffer;
}

function p115Pow(base, exponent, modulus) {
  if (modulus === 1n)
    return 0n;
  let result = 1n;
  base %= modulus;
  while (exponent) {
    if (exponent & 1n)
      result = (result * base) % modulus;
    exponent = exponent >> 1n;
    base = (base * base) % modulus;
  }
  return result;
}

function p115Encrypt(data) {
  if (typeof data === "string" || data instanceof String)
    data = p115Utf8Encode(data);
  const xorText = new Uint8Array(16 + data.length);
  xorText.set(p115Xor(
    p115Xor(data, new Uint8Array([0x8d, 0xa5, 0xa5, 0x8d])).reverse(),
    new Uint8Array([0x78, 0x06, 0xad, 0x4c, 0x33, 0x86, 0x5d, 0x18, 0x4c, 0x01, 0x3f, 0x46])
  ), 16);
  const cipherData = new Uint8Array(Math.ceil(xorText.length / 117) * 128);
  let start = 0;
  for (const [l, r] of p115AccStep(0, xorText.length, 117))
    cipherData.set(p115ToBytes(p115Pow(p115PadPkcs1V1_5(xorText.subarray(l, r)), p115RSA_n, p115RSA_e), 128), start, start += 128);
  return p115Base64Encode(cipherData);
}

function p115Decrypt(cipherData) {
  const cipher_data = p115Base64Decode(cipherData);
  let data = [];
  for (const [l, r] of p115AccStep(0, cipher_data.length, 128)) {
    const p = p115Pow(p115FromBytes(cipher_data.subarray(l, r)), p115RSA_n, p115RSA_e);
    const b = p115ToBytes(p);
    data.push(...b.subarray(b.indexOf(0) + 1));
  }
  data = new Uint8Array(data);
  const keyL = p115GenKey(data.subarray(0, 16), 12);
  const tmp = p115Xor(data.subarray(16), keyL).reverse();
  return p115Utf8Decode(p115Xor(tmp, new Uint8Array([0x8d, 0xa5, 0xa5, 0x8d])));
}

const rexMemoryCache=new Map(),rexPending=new Map();
let rexCacheGeneration=0;
function rexClone(value){return JSON.parse(JSON.stringify(value));}
async function rexCached(key,ttl,loader,accept) {
  const hash=baiduSha1(key),storageKey="forward.muou.catalog."+hash;
  let entry=rexMemoryCache.get(hash);
  if(!entry){try{entry=JSON.parse(safeStorageGet(storageKey)||"null");}catch(_){}}
  if(entry&&entry.expires>Date.now())return rexClone(entry.value);
  if(rexPending.has(hash))return rexClone(await rexPending.get(hash));
  const generation=rexCacheGeneration;
  const pending=(async()=>{
    const value=await loader();
    if(generation===rexCacheGeneration&&accept(value)){
      const entry={expires:Date.now()+ttl,value:rexClone(value)};
      rexMemoryCache.set(hash,entry);
      while(rexMemoryCache.size>32)rexMemoryCache.delete(rexMemoryCache.keys().next().value);
      let keys=[];try{keys=JSON.parse(safeStorageGet("forward.muou.catalog.keys")||"[]");}catch(_){}
      keys=keys.filter(k=>k!==hash);keys.push(hash);
      while(keys.length>16)safeStorageSet("forward.muou.catalog."+keys.shift(),"");
      safeStorageSet(storageKey,JSON.stringify(entry));safeStorageSet("forward.muou.catalog.keys",JSON.stringify(keys));
    }
    return value;
  })();rexPending.set(hash,pending);
  try{return rexClone(await pending);}finally{if(rexPending.get(hash)===pending)rexPending.delete(hash);}
}
async function httpText(url,options) {
  rexAssertWithinUsagePeriod();
  return rexCached("page:"+url,120000,()=>httpTextFresh(url,options),html=>typeof html==="string"&&html.length>1000&&!/页面不存在|>404</.test(html));
}
async function rexShareCatalog(share) {
  const cookie=share.provider==="baidu"?safeStorageGet("forward.muou.baidu.cookie"):
    share.provider==="115"?safeStorageGet("forward.muou.115.cookie"):share.provider==="quark"?ensureCookie():"";
  const key=["share",share.provider,share.shareId,share.passcode||"",baiduSha1(String(cookie||""))].join(":");
  return rexCached(key,180000,()=>share.provider==="uc"?getUcVideos(share):share.provider==="115"?get115Videos(share):share.provider==="baidu"?getBaiduVideos(share):getVideosFromShareLink(share.url,share.passcode),result=>!!(result&&result.list&&result.list.length));
}
async function clearRexCatalogCache() {
  rexCacheGeneration++;rexMemoryCache.clear();rexPending.clear();
  let keys=[];try{keys=JSON.parse(safeStorageGet("forward.muou.catalog.keys")||"[]");}catch(_){}
  keys.forEach(key=>safeStorageSet("forward.muou.catalog."+key,""));safeStorageSet("forward.muou.catalog.keys","[]");
  return [{id:"muou-cache-cleared",type:"url",title:"目录缓存已清除",description:"重新打开详情即可获取最新集数。"}];
}

function rexProviderEnabled(provider) {
  if(provider==="uc")return true;
  if(provider==="115")return !!normalizeCookie(safeStorageGet("forward.muou.115.cookie"));
  if(provider==="baidu")return !!normalizeCookie(safeStorageGet("forward.muou.baidu.cookie"));
  if(provider==="quark")return !!ensureCookie();
  return false;
}

const REX_USAGE_EXPIRES_AT=Date.parse("2027-01-01T00:00:00+08:00");
function rexAssertWithinUsagePeriod() {}

function syncQuarkPlaybackCookie(url,response) {
  if(!/^https:\/\/drive(?:-[a-z]+)?\.quark\.cn\//i.test(String(url||"")))return;
  const headers=response&&response.headers||{};
  const key=Object.keys(headers).find(name=>name.toLowerCase()==="set-cookie");
  if(!key)return;
  const lines=Array.isArray(headers[key])?headers[key].join(";"):String(headers[key]||"");
  const match=lines.match(/(?:^|[;,]\s*)__puus=([^;,\s]+)/);
  if(!match)return;
  const cookie=ensureCookie();if(!cookie)return;
  const old=cookie.match(/(?:^|;)\s*__puus=([^;]+)/);if(old&&old[1]===match[1])return;
  CURRENT_COOKIE=cookie.split(";").map(part=>part.trim()).filter(part=>part&&!/^__puus\s*=/.test(part)).concat("__puus="+match[1]).join("; ");
  safeStorageSet(STORAGE_COOKIE_KEY,CURRENT_COOKIE);
}

async function loadCategory(params={},...args){rexAssertWithinUsagePeriod();bindForwardParams(params);await panPrepareSite(params);return await panOriginal_loadCategory(params,...args);}

async function search(params={},...args){rexAssertWithinUsagePeriod();bindForwardParams(params);await panPrepareSite(params);return await panOriginal_search(params,...args);}

async function loadResource(params={},...args){rexAssertWithinUsagePeriod();bindForwardParams(params);const info=decodeLink(params.link);if(info&&info.action==="play"&&!(info.sources||[info]).some(s=>rexProviderEnabled(s.provider||"quark")))return [];await panPrepareSite(params);return await panOriginal_loadResource(params,...args);}

const PAN_SITE_NAME="木偶";
const PAN_FALLBACKS=["https://333.333291.xyz","https://www.muoua.top","https://666.666291.xyz","https://123.666291.xyz"];

const PAN_MONITOR_ROOT="https://pan-site-monitor.douer.me";
let panMonitorPending=null;
function panOrigin(value){const m=String(value||"").trim().match(/^(https?:\/\/[^\s\/?#@]+)\/?$/i);return m?m[1]:"";}
function panDecodePage(value){
 let text=typeof value==="string"?value:JSON.stringify(value||"");
 const at=text.search(/"<!doctype/i);
 if(at>=0)try{const decoded=JSON.parse(text.slice(at).trim());if(typeof decoded==="string")return decoded;}catch(_){}
 try{const decoded=JSON.parse(text);if(typeof decoded==="string")return decoded;}catch(_){}
 return text;
}
async function panMonitorSites(){
 const key=STORAGE_SITE_KEY+".monitor";
 let cached;try{cached=JSON.parse(safeStorageGet(key)||"null");}catch(_){}
 if(cached&&cached.expires>Date.now())return cached.sites;
 for(const path of ["/api/data","/assets/data/monitor_data.json"]){
  try{const r=await Widget.http.get(PAN_MONITOR_ROOT+path,{timeout:8000,headers:{"User-Agent":UA}});
   const data=typeof r.data==="string"?JSON.parse(r.data):r.data;
   if(data&&data.sites&&typeof data.sites==="object"){
    const sites={};Object.keys(data.sites).forEach(name=>{const s=data.sites[name];sites[name]={best_url:s.best_url,urls:s.urls,status:s.status};});
    safeStorageSet(key,JSON.stringify({expires:Date.now()+3600000,sites}));return sites;
   }
  }catch(_){}
 }
 return cached&&cached.sites||{};
}
async function panPrepareSite(params){
 rexAssertWithinUsagePeriod();
 const input=params&&typeof params==="object"?params:{};
 const configured=Object.prototype.hasOwnProperty.call(input,"site")?String(input.site||""):String(safeStorageGet(STORAGE_SITE_KEY+".manual")||"");
 const manual=panOrigin(configured);
 if(Object.prototype.hasOwnProperty.call(input,"site"))safeStorageSet(STORAGE_SITE_KEY+".manual",manual);
 if(configured&&!manual)throw new Error("手动域名格式无效，请填写http(s)开头的站点根地址");
 if(manual){safeStorageSet(STORAGE_SITE_KEY,manual);return manual;}
 let previous;try{previous=JSON.parse(safeStorageGet(STORAGE_SITE_KEY+".resolved")||"null");}catch(_){}
 if(previous&&previous.expires>Date.now()){safeStorageSet(STORAGE_SITE_KEY,previous.site);return previous.site;}
 if(panMonitorPending)return await panMonitorPending;
 panMonitorPending=(async()=>{
  const sites=await panMonitorSites(),record=sites[PAN_SITE_NAME]||{};
  const urls=Array.from(new Set([record.best_url,...(record.urls||[]).filter(x=>x.has_keyword!==false).map(x=>x.url),previous&&previous.site,...PAN_FALLBACKS].map(panOrigin).filter(Boolean)));
  for(const site of urls){try{
   const r=await Widget.http.get(site+"/",{timeout:8000,headers:{"User-Agent":UA}});
   const html=panDecodePage(r.data);
   if(!/(?:\/vod\/detail\/|\/voddetail\/|module-item-pic)/i.test(html))continue;
   safeStorageSet(STORAGE_SITE_KEY,site);safeStorageSet(STORAGE_SITE_KEY+".resolved",JSON.stringify({site,expires:Date.now()+3600000}));return site;
  }catch(_){}}
  throw new Error(PAN_SITE_NAME+"当前域名均无法访问，请稍后重试或手动指定域名");
 })();try{return await panMonitorPending;}finally{panMonitorPending=null;}
}
async function panDomainStatus(params={}){
 const site=await panPrepareSite(params);
 return [{id:"pan-domain-status",type:"url",title:PAN_SITE_NAME+" · 当前域名",description:site+"\n来源：域名监测站；地址缓存1小时，支持设置中手动指定。",link:site}];
}

  return {
    metadata: WidgetMetadata,
    search: (typeof search === "function") ? search : null,
    loadDetail: (typeof loadDetail === "function") ? loadDetail : null,
    loadResource: (typeof loadResource === "function") ? loadResource : null
  };
})();

var JUHE_SOURCES = [
  { key: "huajuan", name: "花卷", kind: "template", defaultHost: "https://www.hjzhencai.top", api: JUHE_MOD_huajuan },
  { key: "huban", name: "虎斑", kind: "template", defaultHost: "http://43.248.128.118:16969", api: JUHE_MOD_huban },
  { key: "muou", name: "木偶", kind: "rex", defaultHost: "https://333.333291.xyz", api: JUHE_MOD_muou },
];

var JUHE_LINK_RE = /^juhe:([a-z0-9_]+):([\s\S]*)$/;

function juheSourceByKey(key) {
  for (var i = 0; i < JUHE_SOURCES.length; i++) {
    if (JUHE_SOURCES[i].key === key) return JUHE_SOURCES[i];
  }
  return null;
}

function juheSourceEnabled(src, params) {
  var v = params ? params["enable_" + src.key] : undefined;
  if (v === undefined || v === null || v === "") return true;
  var s = String(v).toLowerCase();
  return s !== "off" && s !== "0" && s !== "false" && s !== "停用";
}

function juheEnabledSources(params) {
  var out = [];
  for (var i = 0; i < JUHE_SOURCES.length; i++) {
    if (juheSourceEnabled(JUHE_SOURCES[i], params)) out.push(JUHE_SOURCES[i]);
  }
  return out;
}

function juheText(v) {
  return String(v == null ? "" : v);
}

function juheFillSource(desc, srcLabel) {
  var t = juheText(desc);
  if (/^来源:[ \t]*$/m.test(t)) return t.replace(/^来源:[ \t]*$/m, "来源: " + srcLabel);
  if (/^来源:/m.test(t)) return t;
  if (!t) return "来源: " + srcLabel;
  return "来源: " + srcLabel + "\n" + t;
}

function juheKeyword(params) {
  params = params || {};
  return juheText(
    params.keyword || params.searchWord || params.search_word || params.search_query ||
    params.query || params.q || params.wd || params.text || ""
  ).trim();
}

function juheParamsFor(key, params, origLink) {
  var src = juheSourceByKey(key);
  var p = {};
  if (params) {
    var sharedKeys = ["keyword", "page", "baidu_cookie",
      "load_speed_mode", "quality_tag", "episode", "seriesName", "title",
      "name", "type", "mediaType", "season",
      "baidu_max_files", "search_extra_after_hit"];
    for (var i = 0; i < sharedKeys.length; i++) {
      var k = sharedKeys[i];
      if (params[k] !== undefined && params[k] !== null) p[k] = params[k];
    }
  }
  if (origLink) p.link = origLink;
  var host = (params && params["host_" + key]) || (src && src.defaultHost) || "";
  var kind = src && src.kind;
  if (kind === "wogg") {
    p.domain = host;
    if (p.baidu_cookie) p.baiduCookie = p.baidu_cookie;
    p.linePref = "auto"; 
  } else if (kind === "rex") {
    p.site = host;
    if (p.baidu_cookie) p.baiduCookie = p.baidu_cookie;
  } else {
    p.host = host;
    
    p.targetPanType = "百度";
  }
  return p;
}

function juheIsBaidu(s) {
  if (!s) return false;
  var pt = juheText(s.panType || s.pan || "");
  if (pt === "百度" || pt === "baidu") return true;
  var pv = juheText(s.provider || "");
  if (pv === "baidu") return true;
  var url = juheText(s.url || s.link || s.shareUrl || "");
  if (/pan\.baidu\.com/i.test(url)) return true;
  var name = juheText(s.name || s.title || "");
  if (/百度/.test(name) && !/夸克|UC|115|阿里|天翼/.test(name)) return true;
  return false;
}

function juheNormalizeLink(link) {
  if (link && typeof link === "object") {
    return juheText(link.link || link.id || "");
  }
  return juheText(link);
}

function juheParseLink(link) {
  var m = JUHE_LINK_RE.exec(juheNormalizeLink(link));
  if (!m) return null;
  var src = juheSourceByKey(m[1]);
  if (!src) return null;
  return { src: src, orig: m[2] };
}

async function search(params) {
  params = params || {};
  var keyword = juheKeyword(params);
  if (!keyword) return [];
  var tasks = juheEnabledSources(params).map(function (src) {
    return Promise.resolve()
      .then(function () {
        if (!src.api || typeof src.api.search !== "function") return [];
        return src.api.search(juheParamsFor(src.key, params));
      })
      .then(function (items) { return { src: src, items: items || [] }; })
      .catch(function (e) {
        console.warn("[juhe] " + src.key + " 搜索失败:", (e && e.message) || e);
        return { src: src, items: [] };
      });
  });
  var groups = await Promise.all(tasks);
  var out = [];
  var seen = {};
  for (var gi = 0; gi < groups.length; gi++) {
    var src = groups[gi].src;
    var items = groups[gi].items;
    for (var ii = 0; ii < items.length; ii++) {
      var it = items[ii] || {};
      var origLink = juheText(it.link || it.id || "");
      if (!origLink) continue;
      var newLink = "juhe:" + src.key + ":" + origLink;
      if (seen[newLink]) continue;
      seen[newLink] = true;
      var copy = {};
      for (var k in it) {
        if (Object.prototype.hasOwnProperty.call(it, k)) copy[k] = it[k];
      }
      copy.id = newLink;
      copy.link = newLink;
      copy.title = "[" + src.name + "] " + juheText(it.title || "");
      out.push(copy);
    }
  }
  return out;
}

async function loadDetail(link) {
  var route = juheParseLink(link);
  if (!route) return null;
  var detail = await route.src.api.loadDetail(route.orig);
  if (!detail) return null;
  if (detail.link && juheNormalizeLink(detail.link).indexOf("juhe:") !== 0) {
    detail.link = "juhe:" + route.src.key + ":" + juheNormalizeLink(detail.link);
    detail.id = detail.link;
  }
  return detail;
}

async function loadResource(params) {
  params = params || {};
  var route = juheParseLink(params.link || "");
  var raw;
  if (route) {
    raw = await route.src.api.loadResource(juheParamsFor(route.src.key, params, route.orig));
    raw = [{ src: route.src, items: raw || [] }];
  } else {
    var enabled = juheEnabledSources(params);
    var tasks = enabled.map(function (src) {
      return Promise.resolve()
        .then(function () {
          if (!src.api || typeof src.api.loadResource !== "function") return [];
          return src.api.loadResource(juheParamsFor(src.key, params));
        })
        .catch(function (e) {
          console.warn("[juhe] " + src.key + " 解析失败:", (e && e.message) || e);
          return [];
        });
    });
    var groups = await Promise.all(tasks);
    raw = [];
    for (var gi = 0; gi < groups.length; gi++) {
      raw.push({ src: enabled[gi], items: groups[gi] || [] });
    }
  }
  var out = [];
  var seen = {};
  var dropped = 0;
  for (var gi = 0; gi < raw.length; gi++) {
    var src = raw[gi].src;
    var items = raw[gi].items;
    for (var ii = 0; ii < items.length; ii++) {
      var s = items[ii] || {};
      if (!juheIsBaidu(s)) { dropped++; continue; } 
      var itemUrl = juheText(s.url || "");
      if (!itemUrl) continue;
      var origLink = juheText(s.link || s.id || "");
      var dk = juheText(s.url || origLink || s.name || "");
      if (!dk || seen[dk]) continue;
      seen[dk] = true;
      var name = juheText(s.name || s.title || "");
      var cp = {};
      for (var k in s) {
        if (Object.prototype.hasOwnProperty.call(s, k)) cp[k] = s[k];
      }
      if (name && name.indexOf("[" + src.name + "]") !== 0) {
        cp.name = "[" + src.name + "] " + name;
      }
      if (origLink) {
        cp.link = "juhe:" + src.key + ":" + origLink;
        cp.id = cp.link;
      }
      cp.description = juheFillSource(cp.description, src.name + "百度盘");
      out.push(cp);
    }
  }
  if (dropped > 0) console.log("[juhe] 纯百度过滤丢弃非百度结果: " + dropped + " 条");
  return out;
}
