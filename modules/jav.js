WidgetMetadata = {
  id: "jav",
  title: "JAV聚合",
  version: "1.4.1",
  requiredVersion: "0.0.1",
  description: "按番号聚合 JAVDay、123AV、Manko、JavMit 播放源，只保留 720p 及以上的线路。",
  author: "Coko",
  site: "JAV",
  iconurl: "https://tu.100923.xyz/file/1794574277676_jav-aggregate-icon-neon-round.png",
  detailCacheDuration: 0,
  modules: [
    { id: "loadResource", title: "番号资源", functionName: "loadResource", type: "stream", cacheDuration: 0, params: [] }
  ]
};

const SOURCES = [
  { name: "JAVDay", base: "https://javday.app", referer: "https://javday.app/" },
  { name: "123AV", base: "https://123av.com", locale: "cn" },
  { name: "Manko", base: "https://manko.fun" },
  { name: "JavMit", base: "https://javmit.com" }
];
const MIN_HEIGHT = 720;

 

function normalizeCode(value) {
  const compact = String(value || "").toUpperCase().replace(/[\s_\-]/g, "");
  const m = compact.match(/^([A-Z]{2,12})([0-9]{2,6})$/);
  return m ? m[1] + m[2] : "";
}

function extractCode(text) {
  const m = String(text || "").toUpperCase().match(/([A-Z]{2,12})[\s_-]*([0-9]{2,6})/);
  return m ? m[1] + m[2] : "";
}



function codeFromValue(value) {
  const s = String(value == null ? "" : value).trim();
  if (!s) return "";
  let text = s;
  if (/^[A-Za-z][A-Za-z0-9+.-]*:/.test(text) && !/^https?:/i.test(text)) {
    text = text.slice(text.indexOf(":") + 1);
    if (/^\d+$/.test(text)) return "";
  }
  return normalizeCode(extractCode(text));
}


function pickCode(params) {
  const keys = ["id", "title", "link"];
  for (let i = 0; i < keys.length; i++) {
    const code = codeFromValue(params[keys[i]]);
    if (code) return code;
  }
  return "";
}


function displayCode(code) {
  const m = code.match(/^([A-Z]+)([0-9]+)$/);
  return m ? m[1] + "-" + m[2] : code;
}

function safeText(v) {
  return String(v == null ? "" : v)
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function absolute(base, href) {
  if (!href || typeof href !== "string") return "";
  if (/^https:\/\//i.test(href)) return href;
  if (href.charAt(0) === "/") return base + href;
  return "";
}


function qualityHeight(text) {
  const s = String(text || "");
  let max = 0, m;
  const re = /(?:^|[^0-9])(\d{3,4})\s*[pP](?:[^a-zA-Z0-9]|$)/g;
  while ((m = re.exec(s))) max = Math.max(max, Number(m[1]));
  return max;
}

function htmlAttr(tag, attr) {
  const re = new RegExp("\\b" + attr + "\\s*=\\s*([\"'])([\\s\\S]*?)\\1", "i");
  const m = String(tag).match(re);
  return m ? m[2].replace(/&amp;/g, "&") : "";
}

function unescapeJs(v) {
  return String(v || "")
    .replace(/\\u([0-9a-fA-F]{4})/g, function (_, hex) { return String.fromCharCode(parseInt(hex, 16)); })
    .replace(/\\\//g, "/")
    .replace(/&amp;/g, "&");
}



const LOAD_BUDGET = 8000;
let DEADLINE = 0;
function budgetLeft() {
  return DEADLINE ? DEADLINE - Date.now() : 99999;
}
function budgetOk() {
  return budgetLeft() > 500;
}

const CACHE_TTL = 10 * 60 * 1000;
const CACHE_PREFIX = "jav.agg.v1:";

async function readCache(key) {
  try {
    if (!Widget.storage || typeof Widget.storage.get !== "function") return null;
    const hit = await Widget.storage.get(CACHE_PREFIX + key);
    if (!hit || !hit.at || !Array.isArray(hit.items)) return null;
    if (Date.now() - hit.at > CACHE_TTL) return null;
    return hit.items;
  } catch (e) { return null; }
}

async function writeCache(key, items) {
  try {
    if (!Widget.storage || typeof Widget.storage.set !== "function") return;
    if (!items || !items.length) return;
    await Widget.storage.set(CACHE_PREFIX + key, { at: Date.now(), items: items });
  } catch (e) {   }
}

async function getTextWith(url, headers) {
  const variants = [];
  if (headers) variants.push(headers);
  if (headers && headers.Referer) {
    const origin = String(headers.Referer).match(/^(https:\/\/[^/]+)/);
    if (origin) variants.push(Object.assign({}, headers, { Referer: origin[1] + "/" }));
  }
  if (headers) variants.push(headers);
  if (!variants.length) variants.push(undefined);
  let text = "";
  
  for (let i = 0; i < variants.length; i++) {
    if (i > 0 && !budgetOk()) break;
    let res;
    try {
      res = await Widget.http.get(url, variants[i] ? { headers: variants[i] } : undefined);
    } catch (e) { continue; }
    const body = res && typeof res.data === "string" ? res.data : "";
    if (body && body.indexOf("#EXTM3U") === 0) return body;
    if (!text) text = body;
  }
  return text;
}

async function getText(url, params) {
  if (!budgetOk()) return "";
  const res = await Widget.http.get(url, params ? { params: params } : {});
  if (!res || typeof res.data !== "string") return "";
  return res.data;
}

 


function parseMasterText(text, masterUrl, label, code, headers) {
  if (!text || text.indexOf("#EXTM3U") !== 0) return [];
  const lines = text.split(/\r?\n/);
  const out = [], seen = Object.create(null);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const m = line.match(/RESOLUTION=\d+x(\d+)/i);
    if (!m) continue;
    const height = Number(m[1]);
    if (!(height >= MIN_HEIGHT)) continue;
    let next = "";
    for (let j = i + 1; j < lines.length; j++) {
      const t = lines[j].trim();
      if (!t) continue;
      if (t.charAt(0) !== "#") { next = t; break; }
    }
    if (!next) continue;
    const url = resolveRelative(masterUrl, next);
    if (seen[url]) continue;
    seen[url] = true;
    const item = { name: label + " " + height + "p", url: url, description: code, playerType: "app" };
    if (headers) item.customHeaders = headers;
    out.push(item);
  }
  return out;
}

async function hlsVariants(masterUrl, label, code, headers) {
  const text = await getTextWith(masterUrl, headers);
  return parseMasterText(text, masterUrl, label, code, headers);
}

function resolveRelative(baseUrl, ref) {
  if (/^https?:\/\//i.test(ref)) return ref;
  return baseUrl.replace(/[^/]*(?:[?#][\s\S]*)?$/, "") + ref;
}


async function probeHeight(playlistText, playlistUrl, headers) {
  const lines = String(playlistText || "").split(/\r?\n/);
  let segment = "";
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.charAt(0) === "#") continue;
    segment = resolveRelative(playlistUrl, line);
    break;
  }
  if (!segment) return null;
  const opts = { headers: Object.assign({ Range: "bytes=0-262143" }, headers || {}), base64Data: true };
  let res;
  try { res = await Widget.http.get(segment, opts); } catch (e) { return null; }
  const data = res && typeof res.data === "string" ? res.data : "";
  if (!data || data.length < 200) return null;
  const bytes = base64ToBytes(data);
  if (bytes.length < 400) return null;
  const size = spsSize(bytes);
  return size && size.height ? size : null;
}


async function resolvePlaylist(playlistUrl, label, code, headers) {
  const text = await getTextWith(playlistUrl, headers);
  const variants = parseMasterText(text, playlistUrl, label, code, headers);
  if (variants.length) return variants;
  if (!text || text.indexOf("#EXTM3U") !== 0) return [];
  const size = await probeHeight(text, playlistUrl, headers);
  if (size && size.height) {
    if (size.height < MIN_HEIGHT) return [];
    const item = {
      name: label + " " + size.height + "p",
      url: playlistUrl,
      description: code + " · 单码率 " + size.width + "x" + size.height,
      playerType: "app"
    };
    if (headers) item.customHeaders = headers;
    return [item];
  }
  
  const item = {
    name: label,
    url: playlistUrl,
    description: code + " · 单码率 · 分辨率未探测",
    playerType: "app"
  };
  if (headers) item.customHeaders = headers;
  return [item];
}

 

function anchors(html) {
  return String(html || "").match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) || [];
}

function pickMatches(html, base, code, source, hrefTest) {
  const out = [], seen = Object.create(null);
  for (const tag of anchors(html)) {
    const href = htmlAttr(tag, "href");
    if (!href || !hrefTest(href)) continue;
    const title = safeText(tag) || htmlAttr(tag, "title");
    if (normalizeCode(extractCode(title + " " + href)) !== code) continue;
    const url = absolute(base, href);
    if (!url || seen[url]) continue;
    seen[url] = true;
    out.push({ title: title, url: url, source: source });
  }
  return out;
}

async function searchSource(source, code) {
  const shown = displayCode(code);
  try {
    if (source.name === "JAVDay") {
      
      return [{ title: shown, url: source.base + "/videos/" + code + "/", source: source.name }];
    }
    if (source.name === "123AV") {
      const html = await getText(source.base + "/" + source.locale + "/search", { keyword: shown });
      return pickMatches(html, source.base, code, source.name, function (h) { return h.indexOf("/v/") >= 0; });
    }
    if (source.name === "JavMit") {
      
      const res = await Widget.http.get(JAVMIT_API + "/posts", {
        params: { search: shown, per_page: 5, _embed: 0, orderby: "relevance" },
        headers: { "User-Agent": JAVMIT_UA, Referer: "https://javmit.com/", Accept: "application/json" }
      });
      let posts = res && res.data;
      if (typeof posts === "string") {
        try { posts = JSON.parse(posts); } catch (e) { return []; }
      }
      if (!Array.isArray(posts)) return [];
      const out = [];
      for (const post of posts) {
        const rawTitle = safeText((post.title && post.title.rendered) || "");
        if (normalizeCode(extractCode(rawTitle)) !== code) continue;
        if (!post.link) continue;
        out.push({ title: rawTitle, url: post.link, source: source.name });
      }
      return out;
    }
    if (source.name === "Manko") {
      const api = await mankoApi(source);
      if (!api) return [];
      const res = await Widget.http.get(api + "/swx/movie/search", {
        params: { keyword: shown, page: 1, size: 24, can_manko: "true" }
      });
      const body = res && res.data;
      if (!body || typeof body.data !== "string") return [];
      const rows = mankoDecode(body.data);
      if (!Array.isArray(rows)) return [];
      const out = [];
      for (const row of rows) {
        if (!row || !row._id) continue;
        if (E_badId(row._id)) continue;
        if (normalizeCode(extractCode(row.title)) !== code) continue;
        out.push({
          title: String(row.title || ""),
          url: api + "/swx/movie/detail/" + encodeURIComponent(String(row._id)),
          id: String(row._id),
          categoryId: String(row.category_id || ""),
          source: source.name
        });
      }
      return out;
    }
  } catch (e) {
    console.error("[" + source.name + ".search] " + (e && e.message ? e.message : e));
  }
  return [];
}

function E_badId(id) {
  return !/^[A-Za-z0-9_-]{8,64}$/.test(String(id));
}

 

async function mankoApi(source) {
  const html = await getText(source.base + "/home");
  const m = html.match(/window\.ip\s*=\s*['"]([A-Za-z0-9.-]+)['"]/);
  if (!m || m[1].indexOf(".") < 0) return "";
  return "https://" + m[1];
}

const MANKO_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~"';


function mankoDecode(value) {
  const text = String(value || "");
  const bytes = [];
  let acc = 0, bits = 0, prev = -1;
  for (let i = 0; i < text.length; i++) {
    const n = MANKO_ALPHABET.indexOf(text.charAt(i));
    if (n < 0) continue;
    if (prev < 0) { prev = n; continue; }
    const v = prev + 91 * n;
    acc |= v << bits;
    bits += (8191 & v) > 88 ? 13 : 14;
    while (bits > 7) { bytes.push(255 & acc); acc >>= 8; bits -= 8; }
    prev = -1;
  }
  if (prev > -1) bytes.push(255 & (acc | (prev << bits)));
  return JSON.parse(utf8(bytes));
}

function utf8(bytes) {
  let out = "";
  for (let i = 0; i < bytes.length;) {
    const c = bytes[i++];
    if (c < 0x80) out += String.fromCharCode(c);
    else if (c < 0xe0) out += String.fromCharCode(((c & 0x1f) << 6) | (bytes[i++] & 0x3f));
    else if (c < 0xf0) out += String.fromCharCode(((c & 0x0f) << 12) | ((bytes[i++] & 0x3f) << 6) | (bytes[i++] & 0x3f));
    else {
      const cp = ((c & 0x07) << 18) | ((bytes[i++] & 0x3f) << 12) | ((bytes[i++] & 0x3f) << 6) | (bytes[i++] & 0x3f);
      const x = cp - 0x10000;
      out += String.fromCharCode(0xd800 + (x >> 10), 0xdc00 + (x & 0x3ff));
    }
  }
  return out;
}

 

async function mankoResources(match, code) {
  const res = await Widget.http.get(match.url);
  const body = res && res.data;
  if (!body || typeof body.data !== "string") return [];
  const detail = mankoDecode(body.data);
  if (!detail || String(detail._id) !== match.id) return [];
  const out = [], seen = Object.create(null);
  
  const categoryId = match.categoryId || detail.category_id || "";
  const label = "Manko " + (categoryId === "638ba0b6e6248f567f04b84c" ? "无M" : "有M");
  const candidates = [detail.missav_video, detail.wasabi_url_1];
  for (const raw of candidates) {
    const url = String(raw || "");
    if (!/^https:\/\//i.test(url)) continue;
    if (!/\.(?:m3u8|mp4)(?:[?#]|$)/i.test(url)) continue;
    if (seen[url]) continue;
    const fromPath = qualityHeight(url);
    if (fromPath >= MIN_HEIGHT) {
      seen[url] = true;
      out.push({ name: label + " " + fromPath + "p", url: url, description: code, playerType: "app" });
      continue;
    }
    const variants = await hlsVariants(url, label, code);
    for (const item of variants) {
      if (seen[item.url]) continue;
      seen[item.url] = true;
      out.push(item);
    }
  }
  return out;
}


const JAVMIT_API = "https://javmit.com/zh-CN/wp-json/wp/v2";
const JAVMIT_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

function javmitBestUrl(html) {
  const found = Object.create(null);
  const re = /https:\/\/s\d+\.javmit\.com\/[^"'\\\s]+\.m3u8/gi;
  let m;
  while ((m = re.exec(String(html || ""))) !== null) {
    const url = m[0];
    const qm = url.match(/\/(1080p|720p|480p|360p)\//i);
    const q = qm ? qm[1].toUpperCase() : (/\/master\.m3u8$/i.test(url) ? "MASTER" : "UNKNOWN");
    if (!found[q]) found[q] = url;
  }
  return found;
}

async function javmitResources(match, code) {
  if (!budgetOk()) return [];
  if (!code) code = normalizeCode(extractCode(match.url));
  const pageUrl = match.url;
  const headers = { "User-Agent": JAVMIT_UA, Referer: "https://javmit.com/" };
  let html = "";
  try {
    const res = await Widget.http.get(pageUrl, { headers: headers });
    html = res && typeof res.data === "string" ? res.data : "";
  } catch (e) { return []; }
  if (!html) return [];
  const found = javmitBestUrl(html);
  const unc = /uncensored/i.test(match.title || "") || /uncensored/i.test(pageUrl);
  const label = "JavMit" + (unc ? " 无码" : " 有码");
  if (found["1080P"]) return [{ name: label + " 1080p", url: found["1080P"], description: code, playerType: "app", customHeaders: headers }];
  if (found["720P"]) return [{ name: label + " 720p", url: found["720P"], description: code, playerType: "app", customHeaders: headers }];
  if (found["MASTER"]) return resolvePlaylist(found["MASTER"], label, code, headers);
  return [];
}

function base64ToBytes(input) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const s = String(input || "").replace(/[^A-Za-z0-9+/]/g, "");
  const out = [];
  for (let i = 0; i < s.length; i += 4) {
    const c0 = chars.indexOf(s.charAt(i));
    const c1 = chars.indexOf(s.charAt(i + 1));
    if (c0 < 0 || c1 < 0) break;
    const c2 = chars.indexOf(s.charAt(i + 2));
    const c3 = chars.indexOf(s.charAt(i + 3));
    out.push(((c0 << 2) | (c1 >> 4)) & 0xff);
    if (c2 >= 0) out.push(((c1 << 4) | (c2 >> 2)) & 0xff);
    if (c3 >= 0) out.push(((c2 << 6) | c3) & 0xff);
  }
  return out;
}

 

const HIGH_PROFILES = [100, 110, 122, 244, 44, 83, 86, 118, 128, 138, 139, 134, 135];

function BitReader(bytes) {
  this.b = bytes;
  this.p = 0;
}
BitReader.prototype.u = function (n) {
  let v = 0;
  for (let i = 0; i < n; i++) {
    const byte = this.b[this.p >> 3];
    if (byte === undefined) throw new Error("eof");
    v = (v << 1) | ((byte >> (7 - (this.p & 7))) & 1);
    this.p++;
  }
  return v >>> 0;
};
BitReader.prototype.ue = function () {
  let zeros = 0;
  while (this.u(1) === 0) { if (++zeros > 31) throw new Error("ue"); }
  return ((1 << zeros) - 1) + (zeros ? this.u(zeros) : 0);
};
BitReader.prototype.se = function () { const k = this.ue(); return (k & 1) ? (k + 1) / 2 : -(k / 2); };

function dropEmulationBytes(bytes) {
  const out = [];
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i] === 0 && bytes[i + 1] === 0 && bytes[i + 2] === 3) { out.push(0, 0); i += 2; }
    else out.push(bytes[i]);
  }
  return out;
}

function skipScalingList(r, size) {
  let last = 8, next = 8;
  for (let i = 0; i < size; i++) {
    if (next !== 0) next = (last + r.se() + 256) % 256;
    last = next === 0 ? last : next;
  }
}

function parseSpsPayload(payload) {
  const r = new BitReader(payload);
  const profile = r.u(8);
  r.u(8);
  r.u(8);
  r.ue();
  let chroma = 1;
  if (HIGH_PROFILES.indexOf(profile) >= 0) {
    chroma = r.ue();
    if (chroma === 3) r.u(1);
    r.ue(); r.ue();
    r.u(1);
    if (r.u(1)) {
      const count = chroma !== 3 ? 8 : 12;
      for (let i = 0; i < count; i++) if (r.u(1)) skipScalingList(r, i < 6 ? 16 : 64);
    }
  }
  r.ue();
  const poc = r.ue();
  if (poc === 0) r.ue();
  else if (poc === 1) {
    r.u(1); r.se(); r.se();
    const n = r.ue();
    for (let i = 0; i < n; i++) r.se();
  }
  r.ue();
  r.u(1);
  const wMbs = r.ue() + 1;
  const hMap = r.ue() + 1;
  const frameOnly = r.u(1);
  if (!frameOnly) r.u(1);
  r.u(1);
  let left = 0, right = 0, top = 0, bottom = 0;
  if (r.u(1)) { left = r.ue(); right = r.ue(); top = r.ue(); bottom = r.ue(); }
  const subW = chroma === 3 ? 1 : 2;
  const subH = chroma === 1 ? 2 : 1;
  return {
    width: wMbs * 16 - (left + right) * subW,
    height: (2 - frameOnly) * hMap * 16 - (top + bottom) * subH * (2 - frameOnly)
  };
}

function spsSize(bytes) {
  const parts = [];
  const byPid = Object.create(null);
  for (let i = 0; i + 188 <= bytes.length; i += 188) {
    if (bytes[i] !== 0x47) continue;
    const pid = ((bytes[i + 1] & 31) << 8) | bytes[i + 2];
    const afc = (bytes[i + 3] >> 4) & 3;
    if (afc === 0 || afc === 2) continue;
    let off = i + 4;
    if (afc === 3) off += 1 + bytes[i + 4];
    if (off >= i + 188) continue;
    if (!byPid[pid]) { byPid[pid] = []; parts.push(pid); }
    const chunk = [];
    for (let k = off; k < i + 188; k++) chunk.push(bytes[k]);
    byPid[pid].push(chunk);
  }
  for (const pid of parts) {
    const chunks = byPid[pid];
    let total = 0;
    for (const c of chunks) total += c.length;
    if (total < 32) continue;
    const es = [];
    for (const c of chunks) for (const b of c) es.push(b);
    for (let i = 0; i + 4 < es.length; i++) {
      if (!(es[i] === 0 && es[i + 1] === 0 && es[i + 2] === 1)) continue;
      if ((es[i + 3] & 31) !== 7) continue;
      let end = es.length;
      for (let j = i + 4; j + 3 < es.length; j++) {
        if (es[j] === 0 && es[j + 1] === 0 && es[j + 2] === 1) { end = j; break; }
      }
      try { return parseSpsPayload(dropEmulationBytes(es.slice(i + 4, Math.min(end, i + 400)))); }
      catch (e) { return null; }
    }
  }
  return null;
}

function base64Decode(input) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const s = String(input || "").replace(/[^A-Za-z0-9+/]/g, "");
  const bytes = [];
  for (let i = 0; i < s.length; i += 4) {
    const c0 = chars.indexOf(s.charAt(i));
    const c1 = chars.indexOf(s.charAt(i + 1));
    const c2 = chars.indexOf(s.charAt(i + 2));
    const c3 = chars.indexOf(s.charAt(i + 3));
    if (c0 < 0 || c1 < 0) break;
    bytes.push(((c0 << 2) | (c1 >> 4)) & 0xff);
    if (c2 >= 0) bytes.push(((c1 << 4) | (c2 >> 2)) & 0xff);
    if (c3 >= 0) bytes.push(((c2 << 6) | c3) & 0xff);
  }
  return utf8(bytes);
}

function percentDecode(input) {
  return String(input || "").replace(/%([0-9A-Fa-f]{2})/g, function (_, hex) {
    return String.fromCharCode(parseInt(hex, 16));
  });
}

function oneTwoThreeTag(url) {
  const u = String(url || "").toLowerCase();
  if (u.indexOf("uncensored") >= 0) return "无码";
  return "有码";
}


async function oneTwoThreeResources(match, code) {
  const tag = oneTwoThreeTag(match.url);
  const label = "123AV " + tag;
  const html = await getText(match.url);
  const m = html.match(/player\(JSON\.parse\('([\s\S]*?)'\)/);
  if (!m) return [];
  const embedList = parseEmbedList(m[1]);
  const out = [], seen = Object.create(null);
  for (const embed of embedList) {
    const embedUrl = String(embed && embed.url ? embed.url : "").replace(/\\\//g, "/").replace(/\\/g, "");
    const idMatch = embedUrl.match(/\/e\/([A-Za-z0-9_]+)/);
    if (!idMatch) continue;
    const originMatch = embedUrl.match(/^(https:\/\/[^/]+)/i);
    if (!originMatch) continue;
    const streamApi = originMatch[1] + "/stream?id=" + encodeURIComponent(idMatch[1]);
    let media = null;
    try {
      const res = await Widget.http.get(streamApi, { headers: { Referer: embedUrl } });
      media = res && res.data && res.data.media ? res.data.media : null;
    } catch (e) { media = null; }
    const stream = media && typeof media.stream === "string" ? media.stream : "";
    if (!/^https:\/\//i.test(stream)) continue;
    const marker = qualityHeight(stream);
    if (marker >= MIN_HEIGHT) {
      if (seen[stream]) continue;
      seen[stream] = true;
      out.push({ name: label + " " + marker + "p", url: stream, description: code, playerType: "app" });
      continue;
    }
    const variants = await hlsVariants(stream, label, code, { Referer: embedUrl });
    for (const item of variants) {
      if (seen[item.url]) continue;
      seen[item.url] = true;
      out.push(item);
    }
  }
  return out;
}

function parseEmbedList(raw) {
  const text = unescapeJs(raw);
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start < 0 || end <= start) return [];
  const json = text.slice(start, end + 1);
  try { return JSON.parse(json); } catch (e) { return []; }
}


async function javdayResources(match, code) {
  const html = await getText(match.url);
  if (!html) return [];
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "";
  if (/404|not found/i.test(title) && normalizeCode(extractCode(safeText(title))) !== code) return [];
  if (normalizeCode(extractCode(safeText(title))) !== code) return [];
  const headers = { Referer: "https://javday.app/" };
  const out = [], seen = Object.create(null);
  const playlists = [];
  const confs = html.match(/url:\s*'([^']*\.m3u8[^']*)'/gi) || [];
  for (const conf of confs) {
    const m = conf.match(/'([^']+)'/);
    if (m) playlists.push(unescapeJs(m[1]));
  }
  const buttons = html.match(/<button\b[^>]*episode-btn[^>]*>/gi) || [];
  for (const tag of buttons) {
    const url = unescapeJs(htmlAttr(tag, "data-url"));
    if (/\.(?:m3u8|mp4)(?:[?#]|$)/i.test(url)) playlists.push(url);
  }
  if (!playlists.length) {
    const urls = unescapeJs(html).match(/https?:\/\/[^\s"'<>\\]+\.m3u8[^\s"'<>\\]*/g) || [];
    for (const url of urls) playlists.push(url);
  }
  for (const playlist of playlists) {
    if (!/^https?:\/\//i.test(playlist) || seen[playlist]) continue;
    seen[playlist] = true;
    const marker = qualityHeight(playlist);
    if (marker >= MIN_HEIGHT) {
      out.push({ name: "JAVDay " + marker + "p", url: playlist, description: code, playerType: "app", customHeaders: headers });
      continue;
    }
    const items = await resolvePlaylist(playlist, "JAVDay", code, headers);
    for (const item of items) out.push(item);
  }
  return out;
}

 


function directMatch(text) {
  const url = text.match(/^https:\/\/[^\s]+$/i) ? text : "";
  if (!url) return null;
  if (/^https:\/\/javday\.app\/videos\/[A-Za-z0-9_-]+\/?/i.test(url)) return { source: "JAVDay", url: url, title: "", id: "" };
  if (/^https:\/\/123av\.com\/[a-z]{2}\/v\/[A-Za-z0-9_-]+/i.test(url)) return { source: "123AV", url: url, title: "", id: "" };
  if (/^https:\/\/javmit\.com\/(?:zh-CN\/)?[a-z0-9-]+\/?$/i.test(url)) return { source: "JavMit", url: url, title: "", id: "" };
  if (/^https:\/\/manko\.fun\/movie-info\/[A-Za-z0-9]+/i.test(url)) return { source: "Manko", url: url, title: "", id: "" };
  return null;
}

async function resourcesFor(match, code) {
  try {
    if (match.source === "Manko") return await mankoResources(match, code);
    if (match.source === "123AV") return await oneTwoThreeResources(match, code);
    if (match.source === "JavMit") return await javmitResources(match, code);
    if (match.source === "JAVDay") return await javdayResources(match, code);
  } catch (e) {
    console.error("[" + match.source + ".resource] " + (e && e.message ? e.message : e));
  }
  return [];
}

async function loadResource(params = {}) {
  const raw = params.link != null ? params.link : (params.id != null ? params.id : params.title);
  const text = String(raw == null ? "" : raw).trim();
  if (!text) return [];
  const code = pickCode(params);
  const direct0 = directMatch(text);
  if (!code && !direct0) return [];

  const cacheKey = direct0 ? "link:" + text : "code:" + code;
  const cached = await readCache(cacheKey);
  if (cached) return cached;

  DEADLINE = Date.now() + LOAD_BUDGET;
  const matched = [];
  const direct = direct0;
  if (direct) {
    if (direct.source === "Manko") {
      const id = (text.match(/movie-info\/([A-Za-z0-9]+)/) || [])[1];
      const mankoSource = SOURCES.filter(function (s) { return s.name === "Manko"; })[0];
      const api = id ? await mankoApi(mankoSource) : "";
      if (id && api) matched.push({ title: "", url: api + "/swx/movie/detail/" + id, id: id, source: "Manko" });
    } else {
      matched.push(direct);
    }
  } else {
    
    const searched = await Promise.all(SOURCES.map(function (source) {
      return searchSource(source, code);
    }));
    for (const rows of searched) {
      for (const row of rows) matched.push(row);
    }
  }
  const groups = await Promise.all(matched.map(function (row) { return resourcesFor(row, code || ""); }));
  const result = [], seenUrl = Object.create(null);
  for (const group of groups) {
    for (const item of group) {
      if (!item || !item.url || seenUrl[item.url]) continue;
      seenUrl[item.url] = true;
      result.push(item);
    }
  }
  await writeCache(cacheKey, result);
  return result;
}
