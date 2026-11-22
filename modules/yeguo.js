WidgetMetadata = {
  id: "yeguo",
  title: "野果短剧",
  description: "野果短剧 - AI短剧每日更新",
  author: "Coko",
  version: "1.1.0",
  requiredVersion: "0.0.1",
  iconurl: "https://yeguodj.com/favicon.ico",
  site: "https://yeguodj.com",
  globalParams: [{ name: "imgProxy", title: "封面代理", type: "input", value: "" }],
  modules: [
    { id: "recommend", title: "推荐", functionName: "loadRecommend", type: "video", params: [] },
    { id: "latest", title: "最新", functionName: "loadLatest", type: "video", params: [] },
    { id: "rank", title: "排行榜", functionName: "loadRank", type: "video", params: [{ name: "rank", title: "榜单", type: "enumeration", value: "week", enumOptions: [{ title: "周榜", value: "week" }, { title: "月榜", value: "month" }] }] },
    { id: "tags", title: "标签", functionName: "loadTags", type: "video", params: [{ name: "tag", title: "标签", type: "enumeration", value: "玄幻", enumOptions: [{ title: "玄幻", value: "玄幻" }, { title: "乱伦", value: "乱伦" }, { title: "人妻", value: "人妻" }, { title: "古装", value: "古装" }, { title: "都市", value: "都市" }, { title: "校园", value: "校园" }, { title: "换妻", value: "换妻" }, { title: "群P", value: "群P" }, { title: "禁忌", value: "禁忌" }, { title: "脑洞", value: "脑洞" }, { title: "多人", value: "多人" }, { title: "妈妈", value: "妈妈" }, { title: "姐姐", value: "姐姐" }, { title: "姐弟", value: "姐弟" }, { title: "出轨", value: "出轨" }, { title: "绿帽", value: "绿帽" }, { title: "NTR", value: "NTR" }, { title: "调教", value: "调教" }, { title: "熟女", value: "熟女" }, { title: "剧情向", value: "剧情向" }] }] },
    { id: "explore", title: "探索分类", functionName: "loadExplore", type: "video", params: [{ name: "theme", title: "主题", type: "enumeration", value: "0", enumOptions: [{ title: "全部", value: "0" }, { title: "野果原创", value: "7" }, { title: "真人短剧", value: "8" }, { title: "魔改漫剧", value: "9" }, { title: "网红改编", value: "10" }, { title: "PMV裸舞", value: "11" }] }, { name: "setting", title: "设定", type: "enumeration", value: "0", enumOptions: [{ title: "全部", value: "0" }, { title: "禁忌伦理", value: "23" }, { title: "职场反差", value: "24" }, { title: "改造调教", value: "25" }, { title: "出轨绿帽", value: "26" }, { title: "高H剧情", value: "27" }, { title: "后宫多人", value: "28" }, { title: "逆袭系统", value: "29" }] }, { name: "background", title: "背景", type: "enumeration", value: "0", enumOptions: [{ title: "全部", value: "0" }, { title: "校园", value: "39" }, { title: "都市", value: "40" }, { title: "年代", value: "41" }, { title: "古代", value: "43" }, { title: "玄幻", value: "44" }, { title: "末世", value: "45" }, { title: "灵异", value: "46" }] }, { name: "time", title: "时间", type: "enumeration", value: "0", enumOptions: [{ title: "全部", value: "0" }, { title: "7天内", value: "1" }, { title: "14天内", value: "2" }, { title: "30天内", value: "3" }, { title: "90天内", value: "4" }] }, { name: "recommend", title: "推荐", type: "enumeration", value: "0", enumOptions: [{ title: "全部", value: "0" }, { title: "最新", value: "1" }, { title: "最热", value: "2" }] }] },
    { id: "loadResource", title: "播放资源", functionName: "loadResource", type: "stream", cacheDuration: 0, params: [] }
  ],
  search: { id: "search", title: "搜索", functionName: "loadSearch", params: [{ name: "keyword", title: "关键词", type: "input" }, { name: "page", title: "页码", type: "page" }] }
};

var YG_API = "https://yeguodj.com/api.php";
var YG_KEY = [50, 97, 99, 102, 55, 101, 57, 49, 101, 57, 56, 54, 52, 54, 55, 51];
var YG_IV = [49, 99, 50, 57, 56, 56, 50, 100, 51, 100, 100, 102, 99, 102, 100, 54];
var YG_BASE = { bundleId: "com.pwa.mater", version: "1.3.2", oauth_type: "web", language: "zh", via: "pwa", oauth_id: "7d05538c4b8a5e74e82f93c0dab0163c", token: "", trace_id: "7d05538c4b8a5e74e82f93c0dab0163c" };

var YG_SBOX = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22];
var YG_INV_SBOX = [];
for (var _i = 0; _i < 256; _i++) YG_INV_SBOX[YG_SBOX[_i]] = _i;

var YG_RCON = [1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
function ygXtime(a) { return ((a << 1) ^ ((a & 128) ? 27 : 0)) & 255; }
function ygMul(a, b) { var r = 0; while (b) { if (b & 1) r ^= a; a = ygXtime(a); b >>= 1; } return r; }
function ygKeyExpand(key) {
  var w = [], i, j, t;
  for (i = 0; i < 4; i++) w[i] = [key[4 * i], key[4 * i + 1], key[4 * i + 2], key[4 * i + 3]];
  for (i = 4; i < 44; i++) {
    t = w[i - 1].slice();
    if (i % 4 === 0) {
      t = [YG_SBOX[t[1]] ^ YG_RCON[i / 4 - 1], YG_SBOX[t[2]], YG_SBOX[t[3]], YG_SBOX[t[0]]];
    }
    w[i] = [];
    for (j = 0; j < 4; j++) w[i][j] = w[i - 4][j] ^ t[j];
  }
  return w;
}
function ygAddRoundKey(s, w, r) { for (var c = 0; c < 4; c++) for (var i = 0; i < 4; i++) s[4 * c + i] ^= w[4 * r + c][i]; }
function ygInvShiftRows(s) {
  var t = s.slice();
  s[1] = t[13]; s[5] = t[1]; s[9] = t[5]; s[13] = t[9];
  s[2] = t[10]; s[6] = t[14]; s[10] = t[2]; s[14] = t[6];
  s[3] = t[7]; s[7] = t[11]; s[11] = t[15]; s[15] = t[3];
}
function ygInvSubBytes(s) { for (var i = 0; i < 16; i++) s[i] = YG_INV_SBOX[s[i]]; }
function ygInvMixColumns(s) {
  for (var c = 0; c < 4; c++) {
    var a = s[4 * c], b = s[4 * c + 1], d = s[4 * c + 2], e = s[4 * c + 3];
    s[4 * c] = ygMul(a, 14) ^ ygMul(b, 11) ^ ygMul(d, 13) ^ ygMul(e, 9);
    s[4 * c + 1] = ygMul(a, 9) ^ ygMul(b, 14) ^ ygMul(d, 11) ^ ygMul(e, 13);
    s[4 * c + 2] = ygMul(a, 13) ^ ygMul(b, 9) ^ ygMul(d, 14) ^ ygMul(e, 11);
    s[4 * c + 3] = ygMul(a, 11) ^ ygMul(b, 13) ^ ygMul(d, 9) ^ ygMul(e, 14);
  }
}
function ygDecryptBlock(block, w) {
  var s = block.slice();
  ygAddRoundKey(s, w, 10);
  for (var r = 9; r >= 1; r--) {
    ygInvShiftRows(s);
    ygInvSubBytes(s);
    ygAddRoundKey(s, w, r);
    ygInvMixColumns(s);
  }
  ygInvShiftRows(s);
  ygInvSubBytes(s);
  ygAddRoundKey(s, w, 0);
  return s;
}
var YG_W = ygKeyExpand(YG_KEY);
function ygAesCbcDecrypt(data, iv) {
  var out = [], prev = iv.slice(), i, j, blk, dec;
  for (i = 0; i < data.length; i += 16) {
    blk = data.slice(i, i + 16);
    dec = ygDecryptBlock(blk, YG_W);
    for (j = 0; j < 16; j++) out.push(dec[j] ^ prev[j]);
    prev = blk;
  }
  var pad = out[out.length - 1];
  if (pad >= 1 && pad <= 16) out = out.slice(0, out.length - pad);
  return out;
}
var YG_B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function ygB64Decode(s) {
  s = s.replace(/ /g, "+").replace(/[^A-Za-z0-9+/=]/g, "");
  var out = [], i, a, b, c, d;
  for (i = 0; i < s.length; i += 4) {
    a = YG_B64.indexOf(s[i]); b = YG_B64.indexOf(s[i + 1]);
    c = s[i + 2] === "=" ? 0 : YG_B64.indexOf(s[i + 2]);
    d = s[i + 3] === "=" ? 0 : YG_B64.indexOf(s[i + 3]);
    out.push((a << 2) | (b >> 4));
    if (s[i + 2] !== "=") out.push(((b & 15) << 4) | (c >> 2));
    if (s[i + 3] !== "=") out.push(((c & 3) << 6) | d);
  }
  return out;
}
function ygUtf8Decode(bytes) {
  var s = "", i = 0, c, c2, c3;
  while (i < bytes.length) {
    c = bytes[i++];
    if (c < 128) s += String.fromCharCode(c);
    else if (c >= 192 && c < 224) { c2 = bytes[i++]; s += String.fromCharCode(((c & 31) << 6) | (c2 & 63)); }
    else { c2 = bytes[i++]; c3 = bytes[i++]; s += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)); }
  }
  return s;
}
function ygDecryptData(enc) {
  try {
    var bytes = ygB64Decode(enc);
    var plain = ygAesCbcDecrypt(bytes, YG_IV);
    return JSON.parse(ygUtf8Decode(plain));
  } catch (e) { return null; }
}

function ygForm(params) {
  var parts = [], k;
  for (k in YG_BASE) parts.push(encodeURIComponent(k) + "=" + encodeURIComponent(YG_BASE[k]));
  for (k in params) { if (params[k] !== undefined && params[k] !== null) parts.push(encodeURIComponent(k) + "=" + encodeURIComponent(params[k])); }
  return parts.join("&");
}
async function ygApi(path, params) {
  try {
    var resp = await Widget.http.post(YG_API + path, ygForm(params || {}), { headers: { "Content-Type": "application/x-www-form-urlencoded", "Referer": "https://yeguodj.com/", "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1" } });
    var body = resp && resp.data !== undefined ? resp.data : resp;
    if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { return null; } }
    if (!body || typeof body.data !== "string") return null;
    var dec = ygDecryptData(body.data);
    if (!dec) return null;
    if (dec.data && dec.data.error_code) return null;
    return dec.data !== undefined ? dec.data : dec;
  } catch (e) { return null; }
}
function ygProxyBase(params) {
  var v = "";
  if (params && params.imgProxy !== undefined && params.imgProxy !== null) {
    v = String(params.imgProxy).trim().replace(/\/+$/, "");
    try { Widget.storage.set("yeguo_imgproxy", v); } catch (e) {}
    return v;
  }
  try {
    v = Widget.storage.get("yeguo_imgproxy");
    if (typeof v === "string") return v.trim().replace(/\/+$/, "");
  } catch (e) {}
  return "";
}
function ygCover(url, base) {
  if (!url) return "";
  if (base) return base + "/?url=" + encodeURIComponent(url) + "&site=yeguodj.com";
  return url;
}
function ygItem(v, base) {
  var id = v.video_id || v.id;
  if (!id) return null;
  var desc = v.description || "";
  var tag = (v.tags || []).join(" / ");
  var play = v.play_count_text ? v.play_count_text + "播放" : "";
  var ser = v.serialize_status_text || "";
  var info = [play, ser, tag].filter(function (x) { return x; }).join(" · ");
  return {
    id: "yeguo:" + id,
    title: v.title || "",
    type: "video",
    link: "https://yeguodj.com/drama/detail/" + id + "/",
    posterPath: ygCover(v.cover, base),
    description: info + (desc ? "\n" + desc : "")
  };
}
function ygPage(params) {
  var p = 1;
  if (params && params.page !== undefined && params.page !== null) {
    var n = parseInt(params.page, 10);
    if (!isNaN(n) && n > 0) p = n;
  }
  return p;
}
async function loadRecommend(params) {
  var base = ygProxyBase(params);
  var data = await ygApi("/api/page/recommendList", { page: ygPage(params), page_size: 20 });
  if (!data || !data.list) return [];
  var out = [];
  for (var i = 0; i < data.list.length; i++) { var it = ygItem(data.list[i], base); if (it) out.push(it); }
  return out;
}
async function loadLatest(params) {
  var base = ygProxyBase(params);
  var data = await ygApi("/api/theater/exploreList", { page: ygPage(params), page_size: 30 });
  if (!data || !data.list) return [];
  var out = [];
  for (var i = 0; i < data.list.length; i++) { var it = ygItem(data.list[i], base); if (it) out.push(it); }
  return out;
}
async function loadRank(params) {
  var base = ygProxyBase(params);
  var q = { page: ygPage(params), page_size: 30 };
  var r = params && typeof params.rank === "string" ? params.rank : "";
  if (r === "week" || r === "month") q.rank = r;
  var data = await ygApi("/api/theater/videoRank", q);
  if (!data || !data.list) return [];
  var out = [];
  for (var i = 0; i < data.list.length; i++) { var it = ygItem(data.list[i], base); if (it) out.push(it); }
  return out;
}
async function loadTags(params) {
  var base = ygProxyBase(params);
  var tag = (params && params.tag) || "玄幻";
  var data = await ygApi("/api/theater/tagList", { tag: tag, page: ygPage(params), page_size: 30 });
  if (!data || !data.list) return [];
  var out = [];
  for (var i = 0; i < data.list.length; i++) { var it = ygItem(data.list[i], base); if (it) out.push(it); }
  return out;
}
async function loadExplore(params) {
  var base = ygProxyBase(params);
  var q = { page: ygPage(params), page_size: 30 };
  var keys = ["theme", "setting", "background", "time", "recommend"];
  for (var i = 0; i < keys.length; i++) {
    var v = params && params[keys[i]] !== undefined && params[keys[i]] !== null ? parseInt(params[keys[i]], 10) : 0;
    if (!isNaN(v) && v > 0) q[keys[i]] = v;
  }
  var data = await ygApi("/api/theater/exploreList", q);
  if (!data || !data.list) return [];
  var out = [];
  for (var j = 0; j < data.list.length; j++) { var it = ygItem(data.list[j], base); if (it) out.push(it); }
  return out;
}

function ygDramaId(link, id) {
  var s = id || "";
  if (s && s.indexOf("yeguo:") === 0) {
    s = s.slice(6);
    if (s.indexOf(":ep") >= 0) s = s.split(":ep")[0];
    return s || "";
  }
  if (link) {
    var m = String(link).match(/yeguodj\.com\/drama\/detail\/(\d+)/);
    if (m) return m[1];
    m = String(link).match(/^yeguo:(\d+)(?::ep\d+)?$/);
    if (m) return m[1];
  }
  return "";
}
async function loadDetail(link) {
  var vid = ygDramaId(link);
  if (!vid) throw new Error("无法识别的详情链接: " + link);
  var base = ygProxyBase();
  var data = await ygApi("/api/playlet/detail", { id: vid });
  if (!data || !data.video_id) return [];
  var eps = data.episodes || [];
  var items = [];
  for (var i = 0; i < eps.length; i++) {
    var ep = eps[i];
    items.push({
      id: "yeguo:" + data.video_id + ":ep" + ep.sort,
      title: "第" + ep.sort + "集",
      type: "video",
      link: "https://yeguodj.com/drama/detail/" + data.video_id + "/#ep" + ep.sort
    });
  }
  var tags = (data.tags || []).map(function (t) { return { id: "tag:" + t, title: t, type: "video" }; });
  var actors = (data.actor_list || []).map(function (a) { return { id: "actor:" + a.name, title: a.name, type: "video" }; });
  var related = [];
  var rel = data.related_list || [];
  for (var j = 0; j < rel.length; j++) { var ri = ygItem(rel[j], base); if (ri) related.push(ri); }
  var info = [];
  if (data.play_count_text) info.push(data.play_count_text + "播放");
  if (data.serialize_status_text) info.push(data.serialize_status_text);
  if (data.episode_count) info.push("共" + data.episode_count + "集");
  if (data.like_count) info.push(data.like_count + "点赞");
  return {
    id: "yeguo:" + data.video_id,
    title: data.title || "",
    type: "video",
    posterPath: ygCover(data.cover, base),
    description: info.join(" · ") + (data.description ? "\n" + data.description : ""),
    genreItems: tags,
    peoples: actors,
    episodeItems: items,
    relatedItems: related
  };
}
function ygEpNum(params) {
  if (!params) return 0;
  if (typeof params.episode === "string" && /^\d+$/.test(params.episode)) return parseInt(params.episode, 10);
  if (typeof params.episode === "number" && params.episode > 0) return params.episode;
  if (typeof params.index === "number" && params.index >= 0) return params.index + 1;
  if (params.title && typeof params.title === "string") {
    var m = params.title.match(/第\s*(\d+)\s*集/);
    if (m) return parseInt(m[1], 10);
  }
  if (params.item) {
    var it = params.item;
    if (typeof it === "object") {
      if (typeof it.episode === "string" && /^\d+$/.test(it.episode)) return parseInt(it.episode, 10);
      if (typeof it.index === "number" && it.index >= 0) return it.index + 1;
      if (typeof it.title === "string") { var m2 = it.title.match(/第\s*(\d+)\s*集/); if (m2) return parseInt(m2[1], 10); }
      if (typeof it.id === "string") { var m3 = it.id.match(/:ep(\d+)/); if (m3) return parseInt(m3[1], 10); }
      if (typeof it.link === "string") { var m4 = it.link.match(/#ep(\d+)/); if (m4) return parseInt(m4[1], 10); }
    }
  }
  if (typeof params.id === "string") { var m5 = params.id.match(/:ep(\d+)/); if (m5) return parseInt(m5[1], 10); }
  if (typeof params.link === "string") { var m6 = params.link.match(/#ep(\d+)/); if (m6) return parseInt(m6[1], 10); }
  return 0;
}
async function loadResource(params) {
  var vid = ygDramaId(params && params.link, params && params.id);
  if (!vid) return [];
  var epNum = ygEpNum(params);
  var cacheKey = "yeguo_play_" + vid + "_" + (epNum > 0 ? epNum : "all");
  try {
    var hit = await Widget.storage.get(cacheKey);
    if (hit && hit.lines && hit.at && Date.now() - hit.at < 600000) return hit.lines;
  } catch (e) {}
  var lines = await ygResolveResource(params);
  if (lines && lines.length) {
    try { await Widget.storage.set(cacheKey, { at: Date.now(), lines: lines }); } catch (e) {}
  }
  return lines;
}
async function ygResolveResource(params) {
  var vid = ygDramaId(params && params.link, params && params.id);
  if (!vid) return [];
  var detail = await ygApi("/api/playlet/detail", { id: vid });
  if (!detail || !detail.episodes || !detail.episodes.length) return [];
  var epNum = ygEpNum(params);
  var eps = detail.episodes;
  var ep = null, i;
  if (epNum > 0) {
    for (i = 0; i < eps.length; i++) { if (eps[i].sort === epNum) { ep = eps[i]; break; } }
    if (!ep) return [];
  } else if (eps.length === 1) {
    ep = eps[0];
  } else {
    var jobs = [];
    for (i = 0; i < eps.length; i++) {
      jobs.push(ygApi("/api/playlet/play", { video_id: vid, episode_id: eps[i].id }));
    }
    var results = await Promise.all(jobs);
    var out = [];
    for (var k = 0; k < eps.length; k++) {
      var r = results[k];
      if (r && r.video_url && r.access && r.access.can_play !== false) {
        out.push({ url: r.video_url, name: "第" + eps[k].sort + "集", playerType: "system" });
      }
    }
    return out;
  }
  if (!ep) return [];
  if (ep.access && ep.access.can_play === false) return [];
  var play = await ygApi("/api/playlet/play", { video_id: vid, episode_id: ep.id });
  if (!play || !play.video_url) return [];
  if (play.access && play.access.can_play === false) return [];
  return [{ url: play.video_url, name: "第" + ep.sort + "集", playerType: "system" }];
}
async function loadSearch(params) {
  var kw = "";
  if (params) {
    if (typeof params.keyword === "string") kw = params.keyword;
    else if (typeof params.query === "string") kw = params.query;
    else if (typeof params.keywords === "string") kw = params.keywords;
    else if (typeof params.word === "string") kw = params.word;
  }
  kw = (kw || "").trim();
  if (!kw) return [];
  var base = ygProxyBase(params);
  var data = await ygApi("/api/search/result", { keyword: kw, page: ygPage(params), page_size: 20 });
  if (!data || !data.list) return [];
  var out = [];
  for (var i = 0; i < data.list.length; i++) { var it = ygItem(data.list[i], base); if (it) out.push(it); }
  return out;
}
