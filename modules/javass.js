WidgetMetadata = {
  id: "javass",
  title: "JAV ASS LOVER",
  version: "1.0.8",
  requiredVersion: "0.0.1",
  description: "JAV ASS LOVER：最新、隨機、分類、標籤、搜索，1080p 至 4K",
  author: "Coko",
  site: "https://javass.love/",
  iconurl: "https://javass.love/wp-content/uploads/2023/12/icon-300x300.png",
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
      params: [
        { name: "sort", title: "排序", type: "enumeration", value: "date", enumOptions: [{ title: "最新發佈", value: "date" }, { title: "最多觀看", value: "post_view" }, { title: "最多點贊", value: "post_like" }, { title: "最多評論", value: "comment_count" }, { title: "標題", value: "title" }] },
        { name: "page", title: "頁碼", type: "page" },
      ],
    },
    {
      id: "random",
      title: "隨機視頻",
      functionName: "loadRandom",
      type: "video",
      cacheDuration: 0,
    },
    {
      id: "category",
      title: "分類瀏覽",
      functionName: "loadCategory",
      type: "video",
      cacheDuration: 3600,
      params: [
        { name: "category", title: "分類", type: "enumeration", value: "jav-censured", enumOptions: [{ title: "有碼", value: "jav-censured" }, { title: "無碼", value: "jav-uncensored" }, { title: "4K", value: "4k" }, { title: "英字", value: "english-subtitled" }, { title: "精選", value: "highlighted" }, { title: "VR", value: "vr" }] },
        { name: "sort", title: "排序", type: "enumeration", value: "date", enumOptions: [{ title: "最新發佈", value: "date" }, { title: "最多觀看", value: "post_view" }, { title: "最多點贊", value: "post_like" }, { title: "最多評論", value: "comment_count" }, { title: "標題", value: "title" }] },
        { name: "page", title: "頁碼", type: "page" },
      ],
    },
    {
      id: "tag",
      title: "標籤",
      functionName: "loadTag",
      type: "video",
      cacheDuration: 3600,
      params: [
        { name: "tag", title: "標籤", type: "enumeration", value: "squirt", enumOptions: [{ title: "潮吹", value: "squirt" }, { title: "中出", value: "creampie" }, { title: "巨臀", value: "big-ass" }, { title: "合集", value: "compilation" }, { title: "顏面騎乘", value: "facesitting" }, { title: "巨臀", value: "huge-butt" }, { title: "人妻", value: "married-woman" }, { title: "噴潮", value: "squirting" }, { title: "日式潮吹", value: "japanese-squirting" }, { title: "無碼流出", value: "uncensored-leak" }, { title: "素人", value: "amateur" }, { title: "自訂", value: "custom" }] },
        { name: "customTag", title: "自訂標籤（輸入 tag 英文名）", type: "input", value: "", belongTo: { paramName: "tag", value: ["custom"] } },
        { name: "sort", title: "排序", type: "enumeration", value: "date", enumOptions: [{ title: "最新發佈", value: "date" }, { title: "最多觀看", value: "post_view" }, { title: "最多點贊", value: "post_like" }, { title: "最多評論", value: "comment_count" }, { title: "標題", value: "title" }] },
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

var JA_BASE = "https://javass.love";
var JA_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
var JA_HEADERS = { "User-Agent": JA_UA, "Referer": JA_BASE + "/" };
var JA_LULU_BASE = "https://luluvido.com";
var JA_SORTS = ["date", "post_view", "post_like", "comment_count", "title"];
var JA_NON_ACTRESS = ["eng sub", "english sub", "subbed", "4k", "vr", "uncensored", "censored", "jav", "hd", "leak"];
var JA_SLUG = /^[A-Za-z0-9]{1,64}$/;
var JA_SEGMENT = /^[a-z0-9-]{1,64}$/;

function jaClean(s) {
  return String(s == null ? "" : s).replace(/\s+/g, " ").trim();
}

function jaDuration(text) {
  var parts = String(text || "").trim().split(":").map(function (p) { return parseInt(p, 10); });
  if (!parts.length || parts.some(isNaN)) return 0;
  var s = 0;
  for (var i = 0; i < parts.length; i++) s = s * 60 + parts[i];
  return s;
}

function jaCodeFromTitle(title) {
  var m = String(title || "").match(/\[([A-Za-z]{2,8}-\d+[A-Za-z0-9-]*)\]/);
  return m ? m[1].toUpperCase() : "";
}

function jaActressFromTitle(title) {
  var m = String(title || "").match(/\(([^()]*)\)\s*$/);
  if (!m) return "";
  var name = jaClean(m[1]);
  if (!name || JA_NON_ACTRESS.indexOf(name.toLowerCase()) >= 0) return "";
  return name;
}

function jaCanonical(slug) {
  return JA_BASE + "/video/" + slug + "/";
}

function jaDecodeHtml(s) {
  return String(s == null ? "" : s).replace(/&(#x[0-9a-fA-F]+|#[0-9]+|amp|quot|apos|lt|gt);/g, function (all, v) {
    if (v.charAt(0) === "#") {
      var n = v.charAt(1).toLowerCase() === "x" ? parseInt(v.slice(2), 16) : parseInt(v.slice(1), 10);
      if (!isFinite(n) || n <= 0 || n > 1114111) return "";
      if (n <= 65535) return String.fromCharCode(n);
      return String.fromCharCode(55296 + ((n - 65536) >> 10), 56320 + ((n - 65536) & 1023));
    }
    var map = { amp: "&", quot: "\"", apos: "'", lt: "<", gt: ">" };
    return map[v.toLowerCase()] != null ? map[v.toLowerCase()] : all;
  });
}

function jaSchemeOf(s) {
  var m = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(String(s || ""));
  return m ? m[1].toLowerCase() : "";
}

function jaSplitUrl(u) {
  var m = /^([a-zA-Z][a-zA-Z0-9+.-]*):\/\/([^\/?#]*)([^?#]*)(\?[^#]*)?(#.*)?$/.exec(String(u || ""));
  if (!m) return null;
  return {
    scheme: m[1].toLowerCase(),
    authority: m[2],
    path: m[3] || "/",
    query: m[4] || "",
    hash: m[5] || "",
  };
}

function jaBuildUrl(p) {
  return p.scheme + "://" + p.authority + p.path + p.query + p.hash;
}

function jaRemoveDotSegments(path) {
  var input = String(path || ""), output = [];
  while (input.length) {
    if (input.indexOf("../") === 0) input = input.slice(3);
    else if (input.indexOf("./") === 0) input = input.slice(2);
    else if (input.indexOf("/./") === 0) input = "/" + input.slice(3);
    else if (input === "/.") input = "/";
    else if (input.indexOf("/../") === 0) { input = "/" + input.slice(4); output.pop(); }
    else if (input === "/..") { input = "/"; output.pop(); }
    else if (input === "." || input === "..") input = "";
    else {
      var m = /^\/?[^\/]*/.exec(input);
      var seg = m ? m[0] : input;
      output.push(seg);
      input = input.slice(seg.length);
    }
  }
  return output.join("");
}

function jaHostSafe(authority) {
  var auth = String(authority || "");
  if (!auth || auth.indexOf("@") >= 0) return false;
  if (auth.charAt(0) === "[") return false;
  var host = auth, port = "";
  var idx = host.lastIndexOf(":");
  if (idx >= 0) { port = host.slice(idx + 1); host = host.slice(0, idx); }
  if (port && !/^[0-9]{1,5}$/.test(port)) return false;
  host = host.toLowerCase().replace(/\.$/, "");
  if (!host) return false;
  if (host === "localhost" || /\.localhost$/.test(host) || /\.local$/.test(host) || /\.internal$/.test(host)) return false;
  if (/^[0-9.]+$/.test(host) || /^0x[0-9a-f]+$/.test(host)) return false;
  if (host.indexOf("..") >= 0) return false;
  if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/.test(host)) return false;
  return true;
}

function jaUrlSafe(u) {
  var p = jaSplitUrl(u);
  if (!p) return false;
  if (p.scheme !== "http" && p.scheme !== "https") return false;
  if (!jaHostSafe(p.authority)) return false;
  if (/[\u0000-\u0020\u007f\\]/.test(p.path + p.query + p.hash)) return false;
  return true;
}

function jaResolve(base, ref) {
  var r = String(ref == null ? "" : ref).trim();
  if (!r || r.length > 8192) return "";
  if (/[\u0000-\u0020\u007f\\]/.test(r)) return "";
  var b = base ? String(base).trim() : "";
  var out = "";
  var scheme = jaSchemeOf(r);
  if (scheme) {
    if (scheme !== "http" && scheme !== "https") return "";
    var abs = jaSplitUrl(r);
    if (!abs) return "";
    out = jaBuildUrl(abs);
  } else {
    var bp = jaSplitUrl(b);
    if (!bp) return "";
    if (r.indexOf("//") === 0) {
      var pr = jaSplitUrl(bp.scheme + ":" + r);
      if (!pr) return "";
      out = jaBuildUrl(pr);
    } else {
      var hash = "", query = "";
      var hi = r.indexOf("#");
      if (hi >= 0) { hash = r.slice(hi); r = r.slice(0, hi); }
      var qi = r.indexOf("?");
      if (qi >= 0) { query = r.slice(qi); r = r.slice(0, qi); }
      var path;
      if (!r) {
        path = bp.path;
        if (!query) query = bp.query;
      } else if (r.charAt(0) === "/") {
        path = jaRemoveDotSegments(r);
      } else {
        var dir = bp.path.replace(/[^\/]*$/, "");
        path = jaRemoveDotSegments(dir + r);
      }
      out = jaBuildUrl({ scheme: bp.scheme, authority: bp.authority, path: path || "/", query: query, hash: hash });
    }
  }
  if (!out || out.length > 8192) return "";
  return jaUrlSafe(out) ? out : "";
}

function jaSlugOf(raw) {
  var s = typeof raw === "string" ? raw.trim() : "";
  if (!s) return "";
  var m = s.match(/^javass:([A-Za-z0-9]{1,64})$/);
  if (m) return m[1];
  m = s.match(/^https:\/\/javass\.love\/video\/([A-Za-z0-9]{1,64})\/?(?:[?#].*)?$/);
  if (m) return m[1];
  return "";
}

function jaSlugFromHref(href) {
  var s = jaClean(href);
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) {
    var m = s.match(/^https?:\/\/javass\.love\/video\/([A-Za-z0-9]{1,64})\/?(?:[?#].*)?$/);
    return m ? m[1] : "";
  }
  if (s.charAt(0) === "/" && s.charAt(1) !== "/") {
    var r = s.match(/^\/video\/([A-Za-z0-9]{1,64})\/?(?:[?#].*)?$/);
    return r ? r[1] : "";
  }
  return "";
}

function jaNormIdentity(u) {
  var s = String(u || "");
  if (!s) return "";
  s = s.split("#")[0].replace(/[?#].*$/, "");
  s = s.replace(/\/+$/, "");
  return s + "/";
}

function jaIdentityOk($, pageUrl, slug) {
  var want = jaNormIdentity(jaCanonical(slug));
  var canon = jaClean($('link[rel="canonical"]').first().attr("href"));
  var og = jaClean($('meta[property="og:url"]').first().attr("content"));
  if (!canon && !og) return true;
  if (canon) {
    var cu = jaResolve(pageUrl, canon);
    if (!cu || jaNormIdentity(cu) !== want) return false;
  }
  if (og) {
    var ou = jaResolve(pageUrl, og);
    if (!ou || jaNormIdentity(ou) !== want) return false;
  }
  return true;
}

function jaPageOf(params) {
  var raw = params ? params.page : undefined;
  if (raw === undefined || raw === null) return 1;
  var s;
  if (typeof raw === "number") {
    if (!isFinite(raw) || Math.floor(raw) !== raw) throw new Error("javass 無效頁碼");
    s = String(raw);
  } else if (typeof raw === "string") {
    s = raw.trim();
  } else {
    throw new Error("javass 無效頁碼");
  }
  if (!/^[1-9][0-9]{0,3}$/.test(s)) throw new Error("javass 無效頁碼");
  return parseInt(s, 10);
}

function jaSortOf(params) {
  var s = String((params && params.sort) || "date");
  return JA_SORTS.indexOf(s) >= 0 ? s : "date";
}

function jaListUrl(base, sort, page) {
  var url = base;
  if (page > 1) url += "page/" + page + "/";
  var dir = sort === "title" ? "ASC" : "DESC";
  return url + "?orderby=" + sort + "&order=" + dir;
}

function jaHas(params, key) {
  if (!params) return false;
  var v = params[key];
  return v !== undefined && v !== null && String(v).trim() !== "";
}

function jaRouteBase(params, fallback) {
  if (jaHas(params, "genreId")) {
    var gid = String(params.genreId).trim();
    var m = gid.match(/^(cat|tag):([a-z0-9-]{1,64})$/);
    if (!m) throw new Error("javass 無效分類回跳");
    if (m[1] === "cat") return JA_BASE + "/categories/" + m[2] + "/";
    return JA_BASE + "/video_tag/" + m[2] + "/";
  }
  if (jaHas(params, "peopleId")) {
    var pid = String(params.peopleId).trim();
    if (!JA_SEGMENT.test(pid)) throw new Error("javass 無效人物回跳");
    return JA_BASE + "/author/" + pid + "/";
  }
  return fallback;
}
var JA_MP_LIMIT = 1048576;
function jaMpText(s) {
  if (typeof s !== "string" || s.length > JA_MP_LIMIT) return false;
  var bytes = 0;
  for (var i = 0; i < s.length; i++) {
    var c = s.charCodeAt(i);
    bytes += c < 128 ? 1 : c < 2048 ? 2 : 3;
    if (c >= 55296 && c <= 56319 && i + 1 < s.length && s.charCodeAt(i + 1) >= 56320 && s.charCodeAt(i + 1) <= 57343) { bytes++; i++; }
    if (bytes > JA_MP_LIMIT) return false;
  }
  return true;
}
function jaMpUrl(base, ref) {
  if (typeof ref !== "string" || !ref || ref.length > 8192 || /[\x00-\x20\x7f\\]/.test(ref) || ref.indexOf("{$") >= 0) return "";
  try { return jaResolve(base, ref) || ""; } catch (_) { return ""; }
}
function jaMpAttrs(s) {
  if (!s || s.length > 65536) return null;
  var out = Object.create(null), i = 0;
  while (i < s.length) {
    var m = /^[ \t]*([A-Z0-9-]+)[ \t]*=[ \t]*/.exec(s.slice(i));
    if (!m || Object.prototype.hasOwnProperty.call(out, m[1])) return null;
    var key = m[1], val; i += m[0].length;
    if (s.charAt(i) === '"') {
      var end = s.indexOf('"', i + 1);
      if (end < 0) return null;
      val = s.slice(i + 1, end); i = end + 1;
      if (/[\r\n]/.test(val)) return null;
    } else {
      var start = i;
      while (i < s.length && s.charAt(i) !== ',') i++;
      val = s.slice(start, i).trim();
      if (!val || /[\s"']/.test(val)) return null;
    }
    out[key] = val;
    while (s.charAt(i) === ' ' || s.charAt(i) === '\t') i++;
    if (i === s.length) break;
    if (s.charAt(i++) !== ',' || i === s.length) return null;
  }
  return out;
}
function jaParseHls(text, masterUrl) {
  function bad(reason) { return {kind:"invalid", variants:[], preserveMaster:false, reason:reason}; }
  if (!jaMpText(text)) return bad("text-limit");
  if (!jaMpUrl("", masterUrl)) return bad("unsafe-master-url");
  var lines = text.replace(/^\uFEFF/, "").split(/\r\n|\n|\r/);
  if (lines.length > 20000) return bad("line-limit");
  if (!lines.length || lines[0].trim() !== "#EXTM3U") return bad("missing-header");
  var variants = [], pending = null, segment = false, segments = 0, parts = 0;
  var master = false, media = false, target = false, preserve = false, auxiliary = 0;
  var groups = Object.create(null), refs = [], closed = false;
  var attrTags = /^(EXT-X-STREAM-INF|EXT-X-MEDIA|EXT-X-I-FRAME-STREAM-INF|EXT-X-IMAGE-STREAM-INF|EXT-X-KEY|EXT-X-MAP|EXT-X-SESSION-KEY|EXT-X-SESSION-DATA|EXT-X-START|EXT-X-DATERANGE|EXT-X-PART|EXT-X-PART-INF|EXT-X-SERVER-CONTROL|EXT-X-PRELOAD-HINT|EXT-X-RENDITION-REPORT|EXT-X-SKIP)$/;
  var simpleTags = /^(EXT-X-VERSION|EXT-X-INDEPENDENT-SEGMENTS|EXT-X-TARGETDURATION|EXT-X-MEDIA-SEQUENCE|EXT-X-DISCONTINUITY-SEQUENCE|EXT-X-ENDLIST|EXT-X-PLAYLIST-TYPE|EXT-X-I-FRAMES-ONLY|EXT-X-BYTERANGE|EXT-X-DISCONTINUITY|EXT-X-PROGRAM-DATE-TIME|EXT-X-GAP|EXT-X-BITRATE|EXT-X-ALLOW-CACHE|EXTINF)$/;
  for (var i = 1; i < lines.length; i++) {
    var line = lines[i].trim();
    if (!line) continue;
    if (line.charAt(0) !== '#') {
      var url = jaMpUrl(masterUrl, line);
      if (!url) return bad("unsafe-uri");
      if (pending) {
        variants.push({url:url, width:pending.width, height:pending.height, bw:pending.bw});
        if (variants.length + auxiliary > 256) return bad("variant-limit");
        pending = null;
      } else if (segment) { segments++; segment = false; }
      else return bad("unbound-uri");
      continue;
    }
    if (line.indexOf('#EXT') !== 0) continue;
    if (pending) return bad("orphan-stream-inf");
    var tm = /^#([A-Z0-9-]+)(?::(.*))?$/.exec(line);
    if (!tm || tm[1] === 'EXTM3U') return bad("malformed-tag");
    var tag = tm[1], value = tm[2] || '', a = null;
    if (!attrTags.test(tag) && !simpleTags.test(tag)) return bad("unsupported-tag");
    if (attrTags.test(tag)) {
      a = jaMpAttrs(value);
      if (!a) return bad("malformed-attributes");
      for (var key in a) {
        if (a[key].indexOf('{$') >= 0) return bad("unsupported-variable");
        if (/(?:^|-)URI$/.test(key) && !jaMpUrl(masterUrl, a[key])) return bad("unsafe-uri");
      }
    }
    if (/^(EXT-X-STREAM-INF|EXT-X-MEDIA|EXT-X-I-FRAME-STREAM-INF|EXT-X-IMAGE-STREAM-INF|EXT-X-SESSION-KEY|EXT-X-SESSION-DATA)$/.test(tag)) master = true;
    if (/^(EXTINF|EXT-X-TARGETDURATION|EXT-X-MEDIA-SEQUENCE|EXT-X-DISCONTINUITY-SEQUENCE|EXT-X-ENDLIST|EXT-X-PLAYLIST-TYPE|EXT-X-I-FRAMES-ONLY|EXT-X-BYTERANGE|EXT-X-DISCONTINUITY|EXT-X-PROGRAM-DATE-TIME|EXT-X-GAP|EXT-X-BITRATE|EXT-X-ALLOW-CACHE|EXT-X-KEY|EXT-X-MAP|EXT-X-DATERANGE|EXT-X-PART|EXT-X-PART-INF|EXT-X-SERVER-CONTROL|EXT-X-PRELOAD-HINT|EXT-X-RENDITION-REPORT|EXT-X-SKIP)$/.test(tag)) media = true;
    if (master && media) return bad("mixed-playlist");
    if (tag === 'EXT-X-STREAM-INF') {
      if (!/^\d+$/.test(a.BANDWIDTH || '') || +a.BANDWIDTH <= 0 || +a.BANDWIDTH > 9007199254740991) return bad("invalid-bandwidth");
      var dim = a.RESOLUTION ? /^(\d+)x(\d+)$/.exec(a.RESOLUTION) : null;
      if (a.RESOLUTION && (!dim || +dim[1] <= 0 || +dim[2] <= 0 || +dim[1] > 65535 || +dim[2] > 65535)) return bad("invalid-resolution");
      pending = {width:dim ? +dim[1] : 0, height:dim ? +dim[2] : 0, bw:+a.BANDWIDTH};
      ['AUDIO','VIDEO','SUBTITLES','CLOSED-CAPTIONS'].forEach(function (type) {
        if (a[type] != null && !(type === 'CLOSED-CAPTIONS' && a[type] === 'NONE')) { preserve = true; refs.push(type + ':' + a[type]); }
      });
      if (a['VIDEO-RANGE'] && a['VIDEO-RANGE'] !== 'SDR') preserve = true;
      if (a['HDCP-LEVEL'] && a['HDCP-LEVEL'] !== 'NONE') preserve = true;
    } else if (tag === 'EXT-X-MEDIA') {
      if (!/^(AUDIO|VIDEO|SUBTITLES|CLOSED-CAPTIONS)$/.test(a.TYPE || '') || !a['GROUP-ID'] || !a.NAME) return bad("invalid-media-group");
      if (a.TYPE === 'SUBTITLES' && !a.URI) return bad("missing-uri");
      if (a.TYPE === 'CLOSED-CAPTIONS' && (a.URI != null || !/^(CC[1-4]|SERVICE(?:[1-9]|[1-5][0-9]|6[0-3]))$/.test(a['INSTREAM-ID'] || ''))) return bad("invalid-captions");
      groups[a.TYPE + ':' + a['GROUP-ID']] = true; preserve = true;
    } else if (/^EXT-X-(I-FRAME|IMAGE)-STREAM-INF$/.test(tag)) {
      if (!a.URI) return bad("missing-uri");
      auxiliary++; preserve = true;
      if (variants.length + auxiliary > 256) return bad("variant-limit");
    } else if (tag === 'EXT-X-KEY' || tag === 'EXT-X-SESSION-KEY') {
      if (!/^(NONE|AES-128|SAMPLE-AES|SAMPLE-AES-CTR)$/.test(a.METHOD || '')) return bad("unsupported-key-method");
      if (a.METHOD !== 'NONE' && !a.URI) return bad("missing-uri");
      if (a.METHOD === 'NONE' && (a.URI || tag === 'EXT-X-SESSION-KEY')) return bad("invalid-key");
      if (a.KEYFORMAT && a.KEYFORMAT !== 'identity') return bad("unsupported-key-format");
      if (tag === 'EXT-X-SESSION-KEY') preserve = true;
    } else if (/^EXT-X-(MAP|PART|PRELOAD-HINT|RENDITION-REPORT)$/.test(tag)) {
      if (!a.URI) return bad("missing-uri");
      if (tag === 'EXT-X-PART') parts++;
    } else if (tag === 'EXT-X-SESSION-DATA' || tag === 'EXT-X-START' || tag === 'EXT-X-INDEPENDENT-SEGMENTS') {
      preserve = true;
    } else if (tag === 'EXT-X-TARGETDURATION') {
      if (!/^\d+$/.test(value) || +value <= 0 || +value > 2147483647) return bad("invalid-target-duration");
      target = true;
    } else if (tag === 'EXTINF') {
      if (segment || closed || !/^(?:\d+(?:\.\d+)?|\.\d+),/.test(value)) return bad("invalid-segment");
      segment = true;
    } else if (tag === 'EXT-X-ENDLIST') { closed = true; }
  }
  if (pending) return bad("orphan-stream-inf");
  if (segment) return bad("orphan-extinf");
  for (var r = 0; r < refs.length; r++) if (!groups[refs[r]]) return bad("missing-media-group");
  if (master && (variants.length || auxiliary)) return {kind:'master', variants:variants, preserveMaster:preserve, reason:preserve ? 'master-context' : 'simple-master'};
  if (media && target && (segments || parts)) return {kind:'media', variants:[], preserveMaster:true, reason:'media-playlist'};
  return bad("empty-playlist");
}
function jaPickResourceLines(text, masterUrl) {
  var parsed = jaParseHls(text, masterUrl);
  if (parsed.kind !== 'master' || parsed.preserveMaster) return [];
  var list = parsed.variants.slice().sort(function (a, b) { return b.height - a.height || b.width - a.width || b.bw - a.bw; });
  var hi = list.filter(function (v) { return v.height >= 720; }), seen = Object.create(null), out = [];
  if (hi.length) hi.forEach(function (v) { if (!seen[v.height]) { seen[v.height] = true; out.push({url:v.url,width:v.width,height:v.height}); } });
  else {
    var unknown = list.filter(function (v) { return !v.height; }).sort(function (a,b) { return b.bw - a.bw; });
    var v = unknown[0] || list[0];
    if (v) out.push({url:v.url,width:v.width,height:v.height});
  }
  return out;
}

function jaMpDecode(s) {
  if (!jaMpText(s)) return null;
  var out = '';
  for (var i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    if (c !== '\\') { out += c; continue; }
    if (++i >= s.length) return null;
    c = s.charAt(i);
    var escapes = {n:'\n',r:'\r',t:'\t',b:'\b',f:'\f',v:'\v'};
    if (Object.prototype.hasOwnProperty.call(escapes, c)) out += escapes[c];
    else if (c === '\n' || c === '\u2028' || c === '\u2029') continue;
    else if (c === '\r') { if (s.charAt(i + 1) === '\n') i++; }
    else if (c === 'x' || c === 'u') {
      var count = c === 'x' ? 2 : 4, hex;
      if (c === 'u' && s.charAt(i + 1) === '{') {
        var end = s.indexOf('}', i + 2);
        if (end < 0 || end - i > 8) return null;
        hex = s.slice(i + 2, end);
        if (!/^[0-9a-fA-F]{1,6}$/.test(hex)) return null;
        var point = parseInt(hex, 16);
        if (point > 1114111) return null;
        out += point <= 65535 ? String.fromCharCode(point) : String.fromCharCode(55296 + ((point - 65536) >> 10), 56320 + ((point - 65536) & 1023));
        i = end;
      } else {
        hex = s.slice(i + 1, i + 1 + count);
        if (hex.length !== count || !/^[0-9a-fA-F]+$/.test(hex)) return null;
        out += String.fromCharCode(parseInt(hex, 16)); i += count;
      }
    } else if (/[0-7]/.test(c)) {
      var oct = c, max = c <= '3' ? 3 : 2;
      while (oct.length < max && /[0-7]/.test(s.charAt(i + 1)) && i + 1 < s.length) oct += s.charAt(++i);
      out += String.fromCharCode(parseInt(oct, 8));
    } else out += c;
  }
  return out;
}
function jaUnescapeJs(s) { var out = jaMpDecode(s); return out == null ? '' : out; }
function jaMpTokens(s) {
  if (!jaMpText(s)) return null;
  var out = [], i = 0;
  while (i < s.length) {
    var c = s.charAt(i), start = i;
    if (/\s/.test(c)) { i++; continue; }
    if (s.slice(i, i + 2) === '//') { var nl = s.indexOf('\n', i + 2); i = nl < 0 ? s.length : nl + 1; continue; }
    if (s.slice(i, i + 2) === '/*') { var end = s.indexOf('*/', i + 2); if (end < 0) return null; i = end + 2; continue; }
    if (c === '"' || c === "'") {
      var quote = c; i++;
      while (i < s.length && s.charAt(i) !== quote) {
        if (s.charAt(i) === '\\') { i++; if (s.charAt(i) === '\r' && s.charAt(i + 1) === '\n') i++; }
        else if (s.charAt(i) === '\r' || s.charAt(i) === '\n') return null;
        i++;
      }
      if (i >= s.length) return null;
      var val = jaMpDecode(s.slice(start + 1, i));
      if (val == null) return null;
      out.push({t:'s',v:val}); i++;
    } else if (/[A-Za-z0-9_$]/.test(c)) {
      while (i < s.length && /[A-Za-z0-9_$]/.test(s.charAt(i))) i++;
      out.push({t:'w',v:s.slice(start,i)});
    } else { out.push({t:'p',v:c}); i++; }
    if (out.length > 100000) return null;
  }
  return out;
}
function jaMpSourceTokens(tokens, records) {
  if (!tokens) return [];
  var out = [], seen = Object.create(null);
  function add(token, next) {
    if (!token || token.t !== 's' || !next || !/^[,}\]]$/.test(next.v)) return;
    var value = jaDecodeHtml(token.v), url = jaMpUrl('', value);
    if (url && !seen[url] && out.length < 32) { seen[url] = true; out.push(url); if (records) records.push({index:i, url:url}); }
  }
  for (var i = 0; i + 2 < tokens.length; i++) {
    if (tokens[i].v !== 'sources' || !/^(?:=|:)$/.test(tokens[i + 1].v) || tokens[i + 2].v !== '[') continue;
    var depth = 1, braces = 0, scanned = 0;
    for (var j = i + 3; j < tokens.length && depth && scanned++ < 8192; j++) {
      var t = tokens[j];
      if (t.t === 'p') {
        if (t.v === '[') depth++;
        if (t.v === ']') depth--;
        if (t.v === '{') braces++;
        if (t.v === '}') braces--;
      }
      if (depth === 1 && braces === 0 && (tokens[j - 1].v === '[' || tokens[j - 1].v === ',')) add(t, tokens[j + 1]);
      if (depth === 1 && braces === 1 && /^(file|src)$/.test(t.v) && tokens[j + 1] && tokens[j + 1].v === ':' && /^(\{|,)$/.test(tokens[j - 1].v)) add(tokens[j + 2],tokens[j + 3]);
    }
    if (j > i + 3) i = j - 1;
  }
  return out;
}
function jaMpIndex(word, radix, count) {
  if (!word || word.length > 12 || (word.length > 1 && word.charAt(0) === '0')) return -1;
  var digits = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', n = 0;
  for (var i = 0; i < word.length; i++) {
    var d = digits.indexOf(word.charAt(i));
    if (d < 0 || d >= radix) return -1;
    n = n * radix + d;
    if (n >= count) return -1;
  }
  return n;
}
function jaMpExpand(payload, radix, count, dictionary) {
  if (radix < 2 || radix > 62 || count < 1 || count > 4096 || payload.length > 262144 || dictionary.length > 262144) return '';
  var dict = dictionary.split('|');
  if (dict.length !== count) return '';
  var expanded = [], budget = 0, operations = 0, failed = false;
  for (var i = 0; i < count; i++) {
    var entrySize = dict[i].length;
    expanded[i] = dict[i].replace(/\b[0-9A-Za-z]+\b/g, function (word) {
      if (failed || ++operations > 200000) { failed = true; return ''; }
      var n = jaMpIndex(word, radix, i), v = n >= 0 && expanded[n] ? expanded[n] : word;
      entrySize += v.length - word.length;
      if (budget + entrySize > JA_MP_LIMIT) { failed = true; return ''; }
      return v;
    });
    budget += expanded[i].length;
    if (failed || budget > JA_MP_LIMIT) return '';
  }
  var size = payload.length;
  var result = payload.replace(/\b[0-9A-Za-z]+\b/g, function (word) {
    if (++operations > 200000) { failed = true; return ''; }
    var n = jaMpIndex(word, radix, count), v = n >= 0 && expanded[n] ? expanded[n] : word;
    size += v.length - word.length;
    if (size > JA_MP_LIMIT) { failed = true; return ''; }
    return v;
  });
  return failed || !jaMpText(result) ? '' : result;
}

function jaMpScripts(html) {
  if (!jaMpText(html)) return [];
  var re = /<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi, m, out = [];
  while ((m = re.exec(html)) !== null) {
    if (out.length >= 128) return [];
    if (m[1]) out.push(m[1]);
  }
  if (!out.length && !/^\s*</.test(html)) out.push(html);
  return out;
}
function jaUnpackSources(html) {
  var scripts = jaMpScripts(html), out = [], seen = Object.create(null), packs = 0;
  function add(urls) {
    urls.forEach(function (u) { if (!seen[u] && out.length < 32) { seen[u] = true; out.push(u); } });
  }
  for (var s = 0; s < scripts.length; s++) {
    var t = jaMpTokens(scripts[s]);
    if (!t) continue;
    var records = [];
    jaMpSourceTokens(t, records);
    for (var i = 0; i + 13 < t.length; i++) {
      if (t[i].v !== '}' || t[i + 1].v !== '(' || t[i + 2].t !== 's' || t[i + 3].v !== ',' || !/^\d+$/.test(t[i + 4].v) || t[i + 5].v !== ',' || !/^\d+$/.test(t[i + 6].v) || t[i + 7].v !== ',' || t[i + 8].t !== 's' || t[i + 9].v !== '.' || t[i + 10].v !== 'split' || t[i + 11].v !== '(' || t[i + 12].t !== 's' || t[i + 12].v !== '|' || t[i + 13].v !== ')') continue;
      if (packs >= 8) break;
      packs++;
      var unpacked = jaMpExpand(t[i + 2].v, +t[i + 4].v, +t[i + 6].v, t[i + 8].v);
      if (unpacked) jaMpSourceTokens(jaMpTokens(unpacked)).forEach(function (u, n) { records.push({index:i + n / 64, url:u}); });
      i += 13;
    }
    records.sort(function (a,b) { return a.index - b.index; });
    add(records.map(function (r) { return r.url; }));
  }
  return out;
}
function jaUnpackPacked(html) { var urls = jaUnpackSources(html); return urls[0] || ''; }
function jaBunnyMasterFromHtml(html) {
  if (!jaMpText(html)) return '';
  function bunny(s) {
    var u = jaMpUrl('', s);
    return /^https?:\/\/[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.b-cdn\.net\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/playlist\.m3u8(?:[?#]|$)/i.test(u) ? u : '';
  }
  var scripts = jaMpScripts(html), u;
  for (var s = 0; s < scripts.length; s++) {
    var t = jaMpTokens(scripts[s]);
    if (!t) continue;
    var sources = jaMpSourceTokens(t);
    for (var a = 0; a < sources.length; a++) { u = bunny(sources[a]); if (u) return u; }
    for (var i = 0; i + 2 < t.length; i++) {
      if (/^(?:playlistUrl|hlsUrl|masterUrl|videoUrl|src|file|url)$/.test(t[i].v) && /^(?:=|:)$/.test(t[i + 1].v) && t[i + 2].t === 's' && (!t[i + 3] || /^[,;})]$/.test(t[i + 3].v))) { u = bunny(jaDecodeHtml(t[i + 2].v)); if (u) return u; }
      if (t[i].v === 'loadSource' && t[i + 1].v === '(' && t[i + 2].t === 's' && t[i + 3] && t[i + 3].v === ')') { u = bunny(jaDecodeHtml(t[i + 2].v)); if (u) return u; }
    }
  }
  var tag = /<(?:source|video)\b[^>]{0,65536}>/gi, m;
  while ((m = tag.exec(html)) !== null) {
    var src = /(?:\s)src\s*=\s*(?:"([^"]*)"|'([^']*)')/i.exec(m[0]);
    if (src) { var decoded = jaMpDecode(jaDecodeHtml(src[1] != null ? src[1] : src[2])); if (decoded != null) { u = bunny(decoded); if (u) return u; } }
  }
  return '';
}
function jaFirstSafe(base, values) {
  for (var i = 0; i < values.length; i++) {
    var u = jaResolve(base, values[i]);
    if (u) return u;
  }
  return "";
}

function jaCoverOf(card, pageUrl) {
  var img = card.find(".post-thumbnail img").first();
  var srcs = [];
  if (img.length) {
    srcs.push(img.attr("src"));
    srcs.push(img.attr("data-src"));
    srcs.push(img.attr("data-lazy-src"));
  }
  var style = card.find(".post-thumbnail").first().attr("style") || "";
  var m = style.match(/url\(\s*['"]?([^'")]+)['"]?\s*\)/);
  if (m) srcs.push(m[1]);
  return jaFirstSafe(pageUrl, srcs);
}

function jaParseCard($, el, pageUrl) {
  var card = $(el);
  var a = card.find("h2.post-title a").first();
  if (!a.length) return null;
  var href = jaClean(a.attr("href") || "");
  var slug = jaSlugFromHref(href);
  if (!slug) return null;
  var fullTitle = jaClean(a.attr("title") || a.text());
  if (!fullTitle) return null;
  var code = jaCodeFromTitle(fullTitle);
  var cover = jaCoverOf(card, pageUrl);
  var durText = jaClean(card.find(".video-length").first().text());
  var dt = jaClean(card.find("time.date").first().attr("datetime") || "");
  var au = card.find(".post-meta__author a").first();
  var auHref = jaClean(au.attr("href") || "");
  var auM = auHref.match(/(?:^|\/)author\/([a-z0-9-]{1,64})\/?$/);
  var auName = jaClean(au.text());
  var item = {
    id: jaCanonical(slug),
    type: "video",
    mediaType: "movie",
    title: code || fullTitle,
    description: code ? fullTitle : "",
    coverUrl: cover,
    backdropPath: cover,
    duration: jaDuration(durText),
    durationText: durText,
    releaseDate: dt ? dt.slice(0, 10) : "",
    link: "javass:" + slug,
  };
  if (auM && auName) item.peoples = [{ id: auM[1], title: auName }];
  return item;
}

function jaParseCards($, els, pageUrl) {
  var items = [];
  var list = els || $("article.video");
  list.each(function (i, el) {
    var item = jaParseCard($, el, pageUrl);
    if (item) items.push(item);
  });
  return items;
}

async function jaFetchList(url) {
  var res = await Widget.http.get(url, { headers: JA_HEADERS });
  var st = res && typeof res.statusCode === "number" ? res.statusCode : 0;
  var data = res && typeof res.data === "string" ? res.data : "";
  if (st && (st < 200 || st >= 300)) throw new Error("javass HTTP " + st);
  if (!data) return [];
  var $ = await Widget.html.load(data);
  return jaParseCards($, null, url);
}

async function jaFetchPage(url) {
  try {
    var res = await Widget.http.get(url, { headers: JA_HEADERS });
    var st = res && typeof res.statusCode === "number" ? res.statusCode : 0;
    var data = res && typeof res.data === "string" ? res.data : "";
    if (st && (st < 200 || st >= 300)) return "";
    return data;
  } catch (e) {
    return "";
  }
}

async function loadLatest(params) {
  params = params || {};
  try {
    var page = jaPageOf(params);
    var base = jaRouteBase(params, JA_BASE + "/video/");
    return await jaFetchList(jaListUrl(base, jaSortOf(params), page));
  } catch (error) {
    console.error("[javass] loadLatest 失敗:", error.message || error);
    throw error;
  }
}

async function loadCategory(params) {
  params = params || {};
  try {
    var cat = jaClean(params.category) || "jav-censured";
    if (!JA_SEGMENT.test(cat)) throw new Error("javass 無效分類");
    var page = jaPageOf(params);
    var base = jaRouteBase(params, JA_BASE + "/categories/" + cat + "/");
    return await jaFetchList(jaListUrl(base, jaSortOf(params), page));
  } catch (error) {
    console.error("[javass] loadCategory 失敗:", error.message || error);
    throw error;
  }
}

async function loadTag(params) {
  params = params || {};
  try {
    var tag = jaClean(params.tag) || "squirt";
    if (tag === "custom") {
      tag = jaClean(params.customTag).toLowerCase();
      if (!tag) {
        var page = jaPageOf(params);
        var base = jaRouteBase(params, JA_BASE + "/video/");
        return await jaFetchList(jaListUrl(base, jaSortOf(params), page));
      }
      if (!JA_SEGMENT.test(tag)) throw new Error("javass 無效自訂標籤");
    } else if (!JA_SEGMENT.test(tag)) {
      throw new Error("javass 無效標籤");
    }
    var page = jaPageOf(params);
    var base = jaRouteBase(params, JA_BASE + "/video_tag/" + tag + "/");
    return await jaFetchList(jaListUrl(base, jaSortOf(params), page));
  } catch (error) {
    console.error("[javass] loadTag 失敗:", error.message || error);
    throw error;
  }
}

async function search(params) {
  params = params || {};
  try {
    var kw = jaClean(params.keyword);
    if (!kw) return [];
    var page = jaPageOf(params);
    var q = encodeURIComponent(kw);
    var url = page > 1 ? JA_BASE + "/page/" + page + "/?s=" + q : JA_BASE + "/?s=" + q;
    return await jaFetchList(url);
  } catch (error) {
    console.error("[javass] search 失敗:", error.message || error);
    throw error;
  }
}

async function loadDetail(link) {
  try {
    var slug = jaSlugOf(link);
    if (!slug) throw new Error("无法识别的详情链接: " + link);
    var pageUrl = jaCanonical(slug);
    var html = await jaFetchPage(pageUrl);
    if (!html) return [];
    var $ = await Widget.html.load(html);
    if (!jaIdentityOk($, pageUrl, slug)) throw new Error("详情页与请求的视频不符: " + pageUrl);
    var main = $("h1").first().closest("article");
    if (!main.length) main = $("article.video").first();
    if (!main.length) return [];
    var fullTitle = jaClean(main.find("h1").first().text());
    if (!fullTitle) return [];
    var code = jaCodeFromTitle(fullTitle);
    var desc = jaClean(main.find(".js-read p").first().text());
    if (!desc) desc = jaClean($('meta[name="description"]').attr("content"));
    var settings = null;
    var rawSettings = jaClean($("video-js").first().attr("data-settings") || "");
    if (rawSettings) {
      try { settings = JSON.parse(rawSettings); } catch (e) { settings = null; }
    }
    var poster = (settings && typeof settings.poster === "string") ? settings.poster : "";
    var poster2 = (settings && typeof settings.poster2 === "string") ? settings.poster2 : "";
    var ogImage = jaClean($('meta[property="og:image"]').attr("content"));
    var mainImg = jaClean(main.find("img").first().attr("src"));
    var cover = jaFirstSafe(pageUrl, [poster, ogImage, mainImg]);
    var dt = jaClean(main.find("time").first().attr("datetime") || "");
    var genres = [];
    main.find('a[href*="/categories/"]').each(function (i, el) {
      var href = jaClean($(el).attr("href"));
      var m = href.match(/\/categories\/([a-z0-9-]{1,64})\/?$/);
      var title = jaClean($(el).text());
      if (m && title && genres.every(function (g) { return g.id !== "cat:" + m[1]; })) genres.push({ id: "cat:" + m[1], title: title });
    });
    main.find('.post-tags a[href*="/video_tag/"]').each(function (i, el) {
      var href = jaClean($(el).attr("href"));
      var m = href.match(/\/video_tag\/([a-z0-9-]{1,64})\/?$/);
      var title = jaClean($(el).text());
      if (m && title && genres.every(function (g) { return g.id !== "tag:" + m[1]; })) genres.push({ id: "tag:" + m[1], title: title });
    });
    var related = jaParseCards($, $("#content-bottom article.video"), pageUrl);
    var item = {
      id: jaCanonical(slug),
      type: "video",
      mediaType: "movie",
      title: code || fullTitle,
      description: desc || (code ? fullTitle : ""),
      releaseDate: dt ? dt.slice(0, 10) : "",
      genreItems: genres,
      relatedItems: related,
      link: "javass:" + slug,
    };
    if (cover) {
      item.coverUrl = cover;
      item.backdropPath = cover;
    }
    var backdrop = jaResolve(pageUrl, poster2);
    if (backdrop && backdrop !== cover) item.backdropPaths = [backdrop];
    return item;
  } catch (error) {
    console.error("[javass] loadDetail 失敗:", error.message || error);
    throw error;
  }
}

function jaSourceCandidates($, pageUrl) {
  var out = [];
  var seen = {};
  var raw = jaClean($("video-js").first().attr("data-settings") || "");
  if (!raw) return out;
  var settings = null;
  try { settings = JSON.parse(raw); } catch (e) { return out; }
  if (!settings || !Array.isArray(settings.sources)) return out;
  for (var i = 0; i < settings.sources.length && i < 16; i++) {
    var s = settings.sources[i];
    if (!s || typeof s !== "object") continue;
    var u = jaResolve(pageUrl, typeof s.src === "string" ? s.src : "");
    if (!u || seen[u]) continue;
    seen[u] = true;
    out.push(u);
  }
  return out;
}

function jaEmbedTargets($, pageUrl) {
  var res = { lulu: "", luluBase: "", bunny: "" };
  $("iframe[src]").each(function (i, el) {
    if (res.lulu && res.bunny) return;
    var u = jaResolve(pageUrl, $(el).attr("src") || "");
    if (!u) return;
    var l = u.match(/^https:\/\/(luluvido\.com|luluvid\.com|lplaygo\.com)\/e\/([A-Za-z0-9]{1,32})\/?$/);
    if (l && !res.lulu) { res.lulu = l[2]; res.luluBase = "https://" + l[1]; return; }
    if (!res.bunny && /^https:\/\/iframe\.mediadelivery\.net\/embed\/[^\s"'<>]{1,600}$/.test(u)) res.bunny = u;
  });
  return res;
}

async function jaGet(url, referer) {
  try {
    var res = await Widget.http.get(url, { headers: { "User-Agent": JA_UA, "Referer": referer || (JA_BASE + "/") } });
    var st = res && typeof res.statusCode === "number" ? res.statusCode : 0;
    var data = res && typeof res.data === "string" ? res.data : "";
    if (st && (st < 200 || st >= 300)) return { ok: false, error: false, status: st, data: data };
    if (!data) return { ok: false, error: false, status: st, data: "" };
    return { ok: true, error: false, status: st || 200, data: data };
  } catch (e) {
    return { ok: false, error: true, status: 0, data: "" };
  }
}

async function jaLinesForMaster(master, referer) {
  if (!jaResolve("", master)) return { status: "failed", lines: [] };
  var res = await jaGet(master, referer);
  if (!res.ok) return { status: res.error ? "unverified" : "failed", lines: [] };
  var parsed = jaParseHls(res.data, master);
  if (parsed.kind === "invalid") return { status: "failed", lines: [] };
  var headers = { "User-Agent": JA_UA, "Referer": referer };
  if (parsed.kind === "media" || parsed.preserveMaster) {
    return {
      status: "ok",
      lines: [{
        name: "播放",
        description: parsed.kind === "media" ? "HLS" : "HLS · 原始清單",
        url: master,
        customHeaders: headers,
        playerType: "app",
      }],
    };
  }
  var picked = jaPickResourceLines(res.data, master);
  if (!picked.length) return { status: "failed", lines: [] };
  return {
    status: "ok",
    lines: picked.map(function (v) {
      var label = v.height ? v.height + "P" : "";
      return {
        name: label || "播放",
        description: label ? "HLS · " + label : "HLS",
        url: v.url,
        customHeaders: { "User-Agent": JA_UA, "Referer": referer },
        playerType: "app",
      };
    }),
  };
}

function jaUnpackHlsCandidates(html, baseUrl) {
  var out = [], seen = {};
  function add(u) {
    var r = jaResolve(baseUrl, u);
    if (!r || seen[r] || out.length >= 8) return;
    seen[r] = true;
    out.push(r);
  }
  function scan(text) {
    if (typeof text !== "string" || !text) return;
    var re = /(?:https?:)?\/\/[^\s"'<>\\]{0,300}?\.(?:m3u8|txt)(?:\?[^\s"'<>\\]{0,300})?/gi;
    var m, n = 0;
    while ((m = re.exec(text)) !== null && n++ < 40) add(m[0]);
    var rel = /\/[A-Za-z0-9._~\/%-]{1,300}\.(?:m3u8|txt)(?:\?[^\s"'<>\\]{0,300})?/g;
    n = 0;
    while ((m = rel.exec(text)) !== null && n++ < 80) add(m[0]);
  }
  scan(html);
  var re = /eval\(function\(p,a,c,k,e,d\)\{[\s\S]{0,600}?\}\((['"])([\s\S]{1,300000}?)\1,\s*(\d+)\s*,\s*(\d+)\s*,\s*(['"])([\s\S]{1,300000}?)\5\.split\(\s*(['"])/g;
  var m, packs = 0;
  while ((m = re.exec(html)) !== null && packs++ < 3) {
    var text = jaMpExpand(m[2], parseInt(m[3], 10), parseInt(m[4], 10), m[6]);
    if (text) scan(text);
  }
  var host = "";
  var hp = jaSplitUrl(baseUrl);
  if (hp) host = hp.authority.toLowerCase();
  out.sort(function (a, b) {
    var pa = jaSplitUrl(a), pb = jaSplitUrl(b);
    var sa = pa && pa.authority.toLowerCase() === host ? 0 : 1;
    var sb = pb && pb.authority.toLowerCase() === host ? 0 : 1;
    return sa - sb;
  });
  return out;
}

function jaHgCloudTarget($, html, pageUrl) {
  var found = null;
  $("iframe[src]").each(function (i, el) {
    if (found) return;
    var u = jaResolve(pageUrl, $(el).attr("src") || "");
    if (!u) return;
    var m = u.match(/^https:\/\/(hgcloud\.to|vibuxer\.com)\/(?:e\/)?([A-Za-z0-9]{6,40})\/?$/);
    if (m) found = { host: m[1].toLowerCase(), code: m[2] };
  });
  if (found) return found;
  var re = /(?:https?:\/\/)?(hgcloud\.to|vibuxer\.com)\/(?:e\/)?([A-Za-z0-9]{6,40})(?![A-Za-z0-9])/gi;
  var m, hits = 0;
  while ((m = re.exec(html)) !== null && hits++ < 20) {
    if (!found) found = { host: m[1].toLowerCase(), code: m[2] };
  }
  return found;
}

async function jaHgCloudLines(target) {
  var hosts = [target.host];
  if (target.host === "hgcloud.to") hosts.push("vibuxer.com");
  for (var h = 0; h < hosts.length; h++) {
    var origin = "https://" + hosts[h];
    var res = await jaGet(origin + "/e/" + target.code, "https://" + target.host + "/");
    if (!res.ok) continue;
    var cands = jaUnpackHlsCandidates(res.data, origin);
    for (var i = 0; i < cands.length && i < 6; i++) {
      var r = await jaLinesForMaster(cands[i], origin + "/");
      if (r.status === "ok") return r.lines;
    }
  }
  return null;
}

async function loadResource(params) {
  params = params || {};
  try {
    var raw = params.link !== undefined && params.link !== null ? params.link : params.id;
    var slug = jaSlugOf(raw);
    if (!slug) return [];
    var pageUrl = jaCanonical(slug);
    var html = await jaFetchPage(pageUrl);
    if (!html) return [];
    var $ = await Widget.html.load(html);
    if (!jaIdentityOk($, pageUrl, slug)) return [];
    var candidates = jaSourceCandidates($, pageUrl);
    var unverified = "";
    var i, r;
    for (i = 0; i < candidates.length; i++) {
      r = await jaLinesForMaster(candidates[i], JA_BASE + "/");
      if (r.status === "ok") return r.lines;
      if (r.status === "unverified" && !unverified) unverified = candidates[i];
    }
    var embeds = jaEmbedTargets($, pageUrl);
    if (embeds.lulu) {
      var luluBase = embeds.luluBase || JA_LULU_BASE;
      var lr = await jaGet(luluBase + "/e/" + embeds.lulu, luluBase + "/");
      if (lr.ok) {
        var luluSources = jaUnpackSources(lr.data);
        for (i = 0; i < luluSources.length; i++) {
          r = await jaLinesForMaster(luluSources[i], luluBase + "/");
          if (r.status === "ok") return r.lines;
          if (r.status === "unverified" && !unverified) unverified = luluSources[i];
        }
      }
    }
    if (embeds.bunny) {
      var br = await jaGet(embeds.bunny, JA_BASE + "/");
      if (br.ok) {
        var bunnyMaster = jaBunnyMasterFromHtml(br.data);
        if (bunnyMaster) {
          r = await jaLinesForMaster(bunnyMaster, JA_BASE + "/");
          if (r.status === "ok") return r.lines;
          if (r.status === "unverified" && !unverified) unverified = bunnyMaster;
        }
      }
    }
    var hgc = jaHgCloudTarget($, html, pageUrl);
    if (hgc) {
      var hgLines = await jaHgCloudLines(hgc);
      if (hgLines && hgLines.length) return hgLines;
    }
    if (unverified) {
      return [{
        name: "播放（未驗證）",
        description: "HLS · 未驗證：連線失敗，可交由播放器重試",
        url: unverified,
        customHeaders: { "User-Agent": JA_UA, "Referer": JA_BASE + "/" },
        playerType: "app",
      }];
    }
    return [];
  } catch (error) {
    console.error("[javass] loadResource 失敗:", error.message || error);
    throw error;
  }
}

var JA_RANDOM_KEY = "javass_random_seen";
var JA_RANDOM_MAX = 200;
var JA_RANDOM_TTL = 86400000;
var JA_RANDOM_MEMORY = [];
var jaRandomChain = null;

function jaRandomMerge(a, b, now) {
  var map = {}, order = [];
  function add(list) {
    for (var i = 0; i < list.length; i++) {
      var x = list[i];
      if (!x || !JA_SLUG.test(x.slug)) continue;
      var t = Number(x.t);
      if (!isFinite(t) || !t || t > now || now - t > JA_RANDOM_TTL) continue;
      if (!map[x.slug]) order.push(x.slug);
      if (!map[x.slug] || t > map[x.slug]) map[x.slug] = t;
    }
  }
  add(a);
  add(b);
  var out = [];
  for (var k = 0; k < order.length; k++) out.push({ slug: order[k], t: map[order[k]] });
  out.sort(function (x, y) { return x.t - y.t; });
  return out.slice(-JA_RANDOM_MAX);
}

function jaRandomParse(raw, now) {
  var list = [];
  if (typeof raw !== "string" || !raw) return list;
  var parts = raw.split(",");
  for (var i = 0; i < parts.length && list.length < JA_RANDOM_MAX; i++) {
    var f = parts[i].split("~");
    if (f.length !== 2) continue;
    if (!JA_SLUG.test(f[0]) || !/^[0-9]{1,15}$/.test(f[1])) continue;
    list.push({ slug: f[0], t: parseInt(f[1], 10) });
  }
  return list;
}

async function jaRandomState(now) {
  var raw = "";
  try {
    if (Widget.storage && typeof Widget.storage.get === "function") {
      raw = await Widget.storage.get(JA_RANDOM_KEY);
    }
  } catch (e) {
    raw = "";
  }
  return jaRandomMerge(jaRandomParse(raw, now), JA_RANDOM_MEMORY, now);
}

async function jaRandomSave(list) {
  JA_RANDOM_MEMORY = list.slice(-JA_RANDOM_MAX);
  var text = JA_RANDOM_MEMORY.map(function (x) { return x.slug + "~" + x.t; }).join(",");
  try {
    if (Widget.storage && typeof Widget.storage.set === "function") {
      await Widget.storage.set(JA_RANDOM_KEY, text);
    }
  } catch (e) {}
}

function jaRandomCards($) {
  var widget = null;
  $("h2.widget-title").each(function (i, el) {
    if (widget) return;
    var t = jaClean($(el).text()).toUpperCase();
    if (t.indexOf("RANDOM VIDEOS") >= 0) widget = $(el).closest(".widget");
  });
  if (!widget || !widget.length) return null;
  return widget.find("article.video");
}

async function jaRandomRun() {
  var now = Date.now();
  var seen = await jaRandomState(now);
  var seenMap = {};
  for (var i = 0; i < seen.length; i++) seenMap[seen[i].slug] = true;
  var fresh = [];
  var added = [];
  for (var attempt = 0; attempt < 2; attempt++) {
    var url = JA_BASE + "/?ja-random=" + (now + attempt);
    var res = await Widget.http.get(url, { headers: JA_HEADERS });
    var st = res && typeof res.statusCode === "number" ? res.statusCode : 0;
    var data = res && typeof res.data === "string" ? res.data : "";
    if (st && (st < 200 || st >= 300)) throw new Error("javass HTTP " + st);
    if (!data) throw new Error("javass 隨機頁為空");
    var $ = await Widget.html.load(data);
    var arts = jaRandomCards($);
    if (!arts) throw new Error("javass 找不到隨機區塊");
    var items = jaParseCards($, arts, url);
    fresh = [];
    for (var k = 0; k < items.length; k++) {
      var slug = items[k].link.slice(7);
      if (seenMap[slug]) continue;
      seenMap[slug] = true;
      fresh.push(items[k]);
      added.push(slug);
    }
    if (fresh.length) break;
  }
  if (added.length) {
    var merged = seen.slice();
    for (var a = 0; a < added.length; a++) merged.push({ slug: added[a], t: now });
    await jaRandomSave(merged);
  }
  return fresh;
}

async function loadRandom(params) {
  var run = function () {
    return jaRandomRun().catch(function (error) {
      console.error("[javass] loadRandom 失敗:", error.message || error);
      throw error;
    });
  };
  var prev = jaRandomChain || Promise.resolve();
  var next = prev.then(run, run);
  jaRandomChain = next.then(function () {}, function () {});
  return next;
}
