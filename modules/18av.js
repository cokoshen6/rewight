WidgetMetadata = {
  id: "18av",
  title: "18AV",
  version: "1.0.4",
  requiredVersion: "0.0.1",
  description: "18AV：有码、无码、素人、无码破解、中文字幕、动画与国产自拍",
  author: "Coko",
  site: "https://18av.mm-cg.com",
  iconurl: "https://tu.100923.xyz/file/1795129998121_18av-icon-round.png",
  detailCacheDuration: 60,
  modules: [
    { id: "loadResource", title: "播放资源", functionName: "loadResource", type: "stream", cacheDuration: 0, params: [] },
    { id: "censored", title: "有码", functionName: "loadSection", type: "video", cacheDuration: 3600, params: [{ name: "section", title: "分区", type: "constant", value: "censored" }, { name: "page", title: "页码", type: "page" }] },
    { id: "uncensored", title: "无码", functionName: "loadSection", type: "video", cacheDuration: 3600, params: [{ name: "section", title: "分区", type: "constant", value: "uncensored" }, { name: "page", title: "页码", type: "page" }] },
    { id: "amateurjav", title: "素人", functionName: "loadSection", type: "video", cacheDuration: 3600, params: [{ name: "section", title: "分区", type: "constant", value: "amateurjav" }, { name: "page", title: "页码", type: "page" }] },
    { id: "reducing", title: "无码破解", functionName: "loadSection", type: "video", cacheDuration: 3600, params: [{ name: "section", title: "分区", type: "constant", value: "reducing-mosaic" }, { name: "page", title: "页码", type: "page" }] },
    { id: "chinese", title: "中文字幕", functionName: "loadSection", type: "video", cacheDuration: 3600, params: [{ name: "section", title: "分区", type: "constant", value: "chinese" }, { name: "page", title: "页码", type: "page" }] },
    { id: "animation", title: "H动画", functionName: "loadSection", type: "video", cacheDuration: 3600, params: [{ name: "section", title: "分区", type: "constant", value: "animation" }, { name: "page", title: "页码", type: "page" }] },
    { id: "censoredAnimation", title: "H有码动画", functionName: "loadSection", type: "video", cacheDuration: 3600, params: [{ name: "section", title: "分区", type: "constant", value: "CensoredAnimation" }, { name: "page", title: "页码", type: "page" }] },
    { id: "uncensoredAnimation", title: "H无码动画", functionName: "loadSection", type: "video", cacheDuration: 3600, params: [{ name: "section", title: "分区", type: "constant", value: "UncensoredAnimation" }, { name: "page", title: "页码", type: "page" }] },
    { id: "tdAnimation", title: "H3D动画", functionName: "loadSection", type: "video", cacheDuration: 3600, params: [{ name: "section", title: "分区", type: "constant", value: "tdAnimation" }, { name: "page", title: "页码", type: "page" }] },
    { id: "dt", title: "国产自拍", functionName: "loadSection", type: "video", cacheDuration: 3600, params: [{ name: "section", title: "分区", type: "constant", value: "dt" }, { name: "page", title: "页码", type: "page" }] },
    { id: "censoredRandom", title: "有码随机", functionName: "loadRandom", type: "video", cacheDuration: 0, params: [{ name: "section", title: "分区", type: "constant", value: "censored" }, { name: "randomMode", title: "范围", type: "enumeration", enumOptions: [{ title: "随机近作", value: "random" }, { title: "随机全部", value: "randomall" }] }, { name: "page", title: "页码", type: "page" }] },
    { id: "uncensoredRandom", title: "无码随机", functionName: "loadRandom", type: "video", cacheDuration: 0, params: [{ name: "section", title: "分区", type: "constant", value: "uncensored" }, { name: "randomMode", title: "范围", type: "enumeration", enumOptions: [{ title: "随机近作", value: "random" }, { title: "随机全部", value: "randomall" }] }, { name: "page", title: "页码", type: "page" }] },
    { id: "amateurjavRandom", title: "素人随机", functionName: "loadRandom", type: "video", cacheDuration: 0, params: [{ name: "section", title: "分区", type: "constant", value: "amateurjav" }, { name: "randomMode", title: "范围", type: "enumeration", enumOptions: [{ title: "随机近作", value: "random" }, { title: "随机全部", value: "randomall" }] }, { name: "page", title: "页码", type: "page" }] },
    { id: "reducingRandom", title: "无码破解随机", functionName: "loadRandom", type: "video", cacheDuration: 0, params: [{ name: "section", title: "分区", type: "constant", value: "reducing-mosaic" }, { name: "randomMode", title: "范围", type: "enumeration", enumOptions: [{ title: "随机近作", value: "random" }, { title: "随机全部", value: "randomall" }] }, { name: "page", title: "页码", type: "page" }] },
    { id: "chineseRandom", title: "中文字幕随机", functionName: "loadRandom", type: "video", cacheDuration: 0, params: [{ name: "section", title: "分区", type: "constant", value: "chinese" }, { name: "randomMode", title: "范围", type: "enumeration", enumOptions: [{ title: "随机近作", value: "random" }, { title: "随机全部", value: "randomall" }] }, { name: "page", title: "页码", type: "page" }] },
    { id: "animationRandom", title: "H动画随机", functionName: "loadRandom", type: "video", cacheDuration: 0, params: [{ name: "section", title: "分区", type: "constant", value: "animation" }, { name: "randomMode", title: "范围", type: "enumeration", enumOptions: [{ title: "随机近作", value: "random" }, { title: "随机全部", value: "randomall" }] }, { name: "page", title: "页码", type: "page" }] },
    { id: "censoredAnimationRandom", title: "H有码动画随机", functionName: "loadRandom", type: "video", cacheDuration: 0, params: [{ name: "section", title: "分区", type: "constant", value: "CensoredAnimation" }, { name: "randomMode", title: "范围", type: "enumeration", enumOptions: [{ title: "随机近作", value: "random" }, { title: "随机全部", value: "randomall" }] }, { name: "page", title: "页码", type: "page" }] },
    { id: "uncensoredAnimationRandom", title: "H无码动画随机", functionName: "loadRandom", type: "video", cacheDuration: 0, params: [{ name: "section", title: "分区", type: "constant", value: "UncensoredAnimation" }, { name: "randomMode", title: "范围", type: "enumeration", enumOptions: [{ title: "随机近作", value: "random" }, { title: "随机全部", value: "randomall" }] }, { name: "page", title: "页码", type: "page" }] },
    { id: "tdAnimationRandom", title: "H3D动画随机", functionName: "loadRandom", type: "video", cacheDuration: 0, params: [{ name: "section", title: "分区", type: "constant", value: "tdAnimation" }, { name: "randomMode", title: "范围", type: "enumeration", enumOptions: [{ title: "随机近作", value: "random" }, { title: "随机全部", value: "randomall" }] }, { name: "page", title: "页码", type: "page" }] },
    { id: "dtRandom", title: "国产自拍随机", functionName: "loadRandom", type: "video", cacheDuration: 0, params: [{ name: "section", title: "分区", type: "constant", value: "dt" }, { name: "randomMode", title: "范围", type: "enumeration", enumOptions: [{ title: "随机近作", value: "random" }, { title: "随机全部", value: "randomall" }] }, { name: "page", title: "页码", type: "page" }] }
  ],
  search: {
    id: "search", title: "搜索", functionName: "search",
    params: [
      { name: "keyword", title: "关键词", type: "input" },
      { name: "page", title: "页码", type: "page" }
    ]
  }
};

const AV_BASE = "https://18av.mm-cg.com";
const AV_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
const AV_SECTIONS = ["censored", "uncensored", "amateurjav", "reducing-mosaic", "chinese", "animation", "CensoredAnimation", "UncensoredAnimation", "tdAnimation", "dt"];

function avHeaders(referer) {
  return { "User-Agent": AV_UA, Referer: referer || AV_BASE + "/zh/" };
}

async function avGetText(url, referer) {
  const r = await Widget.http.get(url, { headers: avHeaders(referer) });
  return typeof r.data === "string" ? r.data : String(r.data || "");
}

function avUnescape(s) {
  return String(s || "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&#(\d+);/g, function (m, n) { return String.fromCharCode(Number(n)); }).replace(/\\u0026/g, "&").replace(/\\\//g, "/");
}

function avPage(params) {
  const p = Number((params && params.page) || 1);
  return p >= 1 ? Math.floor(p) : 1;
}

function avCodeFromText(text) {
  const m = String(text || "").match(/^[\[\u3010][^\]\u3011]*[\]\u3011]\s*([A-Za-z]{2,10}-?\d{2,6})\b/) || String(text || "").match(/^([A-Za-z]{2,10}-?\d{2,6})\b/);
  return m ? m[1].toUpperCase() : "";
}

function avParseCards(html) {
  const items = [];
  const seen = {};
  const chunks = String(html || "").split(/class='post(?: video_9s)?'/);
  for (let ci = 1; ci < chunks.length; ci++) {
    const chunk = chunks[ci].slice(0, 2200);
    const linkM = chunk.match(/href="https:\/\/18av\.mm-cg\.com\/zh\/([A-Za-z0-9-]+)_content\/(\d+)\/([^"]+?)\.html"/);
    if (!linkM) continue;
    const section = linkM[1];
    const contentId = linkM[2];
    const file = linkM[3];
    const key = section + ":" + contentId;
    if (seen[key]) continue;
    const titleM = chunk.match(/<h3[^>]*>(?:<a[^>]*>)?([^<]+)/);
    if (!titleM) continue;
    seen[key] = 1;
    const coverM = chunk.match(/<img[^>]*src='([^']+)'/);
    const cover = coverM ? avUnescape(coverM[1]) : "";
    const rawTitle = avUnescape(titleM[1]).trim();
    let code = "";
    if (file && file !== "content") code = file.toUpperCase();
    if (!code) code = avCodeFromText(rawTitle);
    let title = rawTitle;
    let desc = "";
    if (code) {
      title = code;
      desc = rawTitle.replace(/^[\[\u3010][^\]\u3011]*[\]\u3011]\s*/, "").replace(new RegExp("^" + code.replace(/-/g, "\\-") + "\\s*", "i"), "").trim();
    }
    const item = {
      id: code || ("18av:" + section + ":" + contentId),
      type: "video",
      title: title,
      link: "18av:" + section + ":" + contentId + ":" + code
    };
    if (desc && desc !== title) item.description = desc;
    if (cover) {
      item.coverUrl = cover;
      item.backdropPath = cover;
    }
    items.push(item);
  }
  return items;
}

function avGenreUrl(genreId, page) {
  const parts = String(genreId || "").split(":");
  if (parts.length < 4) return "";
  const kind = parts[0], section = parts[1], id = parts[2];
  const name = parts.slice(3).join(":");
  const map = { cat: "category", issuer: "issuer", maker: "makersr", actress: "avperformer" };
  if (!map[kind] || !section || !id) return "";
  return AV_BASE + "/zh/" + section + "_" + map[kind] + "/" + id + "/" + encodeURIComponent(name) + "/" + page + ".html";
}

async function loadSection(params) {
  const page = avPage(params);
  let url = "";
  if (params && params.genreId) url = avGenreUrl(params.genreId, page);
  else if (params && params.peopleId) url = avGenreUrl(params.peopleId, page);
  if (!url) {
    const section = (params && params.section) || "censored";
    url = AV_BASE + "/zh/" + section + "_list/all/" + page + ".html";
  }
  const html = await avGetText(url);
  return avParseCards(html);
}

async function loadRandom(params) {
  const section = (params && params.section) || "censored";
  const mode = (params && params.randomMode) === "randomall" ? "randomall" : "random";
  const url = AV_BASE + "/zh/" + section + "_" + mode + "/all/index.html";
  const html = await avGetText(url);
  return avParseCards(html);
}

async function search(params) {
  const kw = String((params && params.keyword) || "").trim();
  if (!kw) return [];
  const page = avPage(params);
  const url = AV_BASE + "/zh/fc_search/all/" + encodeURIComponent(kw) + "/" + page + ".html";
  const html = await avGetText(url);
  return avParseCards(html);
}

function avParseOwned(link) {
  const s = String(link || "");
  let m = s.match(/^18av:([A-Za-z0-9-]+):(\d+)(?::([A-Za-z0-9-]*))?$/);
  if (m) return { section: m[1], contentId: m[2], code: (m[3] || "").toUpperCase() };
  m = s.match(/18av\.mm-cg\.com\/zh\/([A-Za-z0-9-]+)_content\/(\d+)\/([^/]+?)\.html/);
  if (m) return { section: m[1], contentId: m[2], code: m[3] === "content" ? "" : m[3].toUpperCase() };
  return null;
}

function avDetailUrl(section, contentId, code) {
  return AV_BASE + "/zh/" + section + "_content/" + contentId + "/" + (code || "content") + ".html";
}

function avInfoValue(html, label) {
  const re = new RegExp(label + ":?</li>\\s*<li class='posts-message'>([\\s\\S]*?)</li>");
  const m = String(html || "").match(re);
  if (!m) return "";
  return avUnescape(m[1].replace(/<[^>]+>/g, "")).trim();
}

function avInfoLinks(html, label, section, kind) {
  const re = new RegExp(label + ":?</li>\\s*<li class='posts-message'>([\\s\\S]*?)</li>");
  const m = String(html || "").match(re);
  if (!m) return [];
  const out = [];
  const linkRe = /href='https:\/\/18av\.mm-cg\.com\/zh\/[A-Za-z0-9-]+_[a-z]+\/(\d+)\/([^']+?)\/\d+\.html'[^>]*>([^<]+)<\/a>/g;
  let lm;
  while ((lm = linkRe.exec(m[1])) !== null) {
    out.push({ id: kind + ":" + section + ":" + lm[1] + ":" + avUnescape(lm[2]), title: avUnescape(lm[3]).trim() });
  }
  return out;
}

async function loadDetail(link) {
  const owned = avParseOwned(link);
  if (!owned) throw new Error("无法识别的详情链接: " + link);
  const url = avDetailUrl(owned.section, owned.contentId, owned.code);
  const html = await avGetText(url);
  if (!html) return [];
  let ld = null;
  const ldM = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
  if (ldM) { try { ld = JSON.parse(ldM[1]); } catch (e) { ld = null; } }
  const code = avInfoValue(html, "番號") || owned.code;
  const longTitle = (ld && ld.name) ? String(ld.name).trim() : "";
  const cover = (ld && ld.thumbnailUrl) ? avUnescape(ld.thumbnailUrl) : "";
  const item = {
    id: code || ("18av:" + owned.section + ":" + owned.contentId),
    type: "video",
    title: code || longTitle,
    link: "18av:" + owned.section + ":" + owned.contentId + ":" + code
  };
  if (longTitle && longTitle !== item.title) item.description = longTitle;
  if (cover) {
    item.coverUrl = cover;
    item.backdropPath = cover;
  }
  const durText = avInfoValue(html, "影片時長");
  const durM = durText.match(/(\d+)\s*min/i);
  if (durM) item.duration = Number(durM[1]) * 60;
  const relDate = avInfoValue(html, "網站發佈") || (ld && ld.uploadDate) || "";
  if (relDate) item.releaseDate = relDate.trim();
  const genres = [];
  const cats = avInfoLinks(html, "影片類別", owned.section, "cat");
  for (const c of cats) genres.push(c);
  const issuers = avInfoLinks(html, "發行商", owned.section, "issuer");
  for (const g of issuers) genres.push(g);
  const makers = avInfoLinks(html, "製作商", owned.section, "maker");
  for (const g of makers) genres.push(g);
  if (genres.length) item.genreItems = genres;
  const peoples = [];
  const actRe = /href='https:\/\/18av\.mm-cg\.com\/zh\/[A-Za-z0-9-]+_avperformer\/(\d+)\/([^']+?)\/\d+\.html'[^>]*>(?:<img[^>]*src='([^']+)'[^>]*>)?(?:<\/a><p><a[^>]*>)?([^<]*)/g;
  let am;
  const seenP = {};
  while ((am = actRe.exec(html)) !== null) {
    const pid = am[1];
    if (seenP[pid]) continue;
    seenP[pid] = 1;
    const name = avUnescape(am[4] || am[2]).trim();
    if (!name) continue;
    const person = { id: "actress:" + owned.section + ":" + pid + ":" + avUnescape(am[2]), name: name };
    const avatar = am[3] ? avUnescape(am[3]) : "";
    if (avatar && avatar.indexOf("nowprinting") < 0) person.avatar = avatar;
    peoples.push(person);
  }
  if (peoples.length) item.peoples = peoples;
  const related = avParseCards(html).filter(function (it) {
    return it.link !== item.link;
  }).slice(0, 12);
  if (related.length) item.relatedItems = related;
  return [item];
}

async function avResolveTarget(params) {
  const p = params || {};
  const candidates = [p.link, p.id, p.item && p.item.link, p.item && p.item.id];
  for (const c of candidates) {
    const owned = avParseOwned(c);
    if (owned) return owned;
  }
  return null;
}

async function avGetTextXff(url, referer) {
  const headers = avHeaders(referer);
  headers["X-Forwarded-For"] = "1.160.0.1";
  headers["Accept-Language"] = "zh-TW,zh;q=0.9";
  const r = await Widget.http.get(url, { headers: headers });
  return typeof r.data === "string" ? r.data : String(r.data || "");
}

function avParseMvarr(text) {
  const groups = {};
  const src = String(text || "");
  const re = /mvarr\[['"]([^'"]+)['"]\]\s*=\s*/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    let i = re.lastIndex;
    const entries = [];
    let depth = 0;
    let cur = null;
    let str = null;
    let esc = false;
    for (; i < src.length; i++) {
      const c = src[i];
      if (str !== null) {
        if (esc) { str += c; esc = false; }
        else if (c === "\\") esc = true;
        else if (c === "'") { cur.push(str); str = null; }
        else str += c;
        continue;
      }
      if (c === "'") { str = ""; continue; }
      if (c === "[") {
        depth++;
        if (depth === 2) cur = [];
        continue;
      }
      if (c === "]") {
        depth--;
        if (depth === 1 && cur) { entries.push(cur); cur = null; }
        if (depth === 0) break;
        continue;
      }
    }
    if (entries.length) groups[m[1]] = entries;
  }
  return groups;
}

async function loadResource(params) {
  const owned = await avResolveTarget(params);
  if (!owned) return [];
  const pageUrl = avDetailUrl(owned.section, owned.contentId, owned.code);
  const html = await avGetTextXff(pageUrl);
  if (!html) return [];
  const keyM = html.match(/argdeqweqweqwe\s*=\s*'([^']+)'/);
  const ivM = html.match(/hdddedg252\s*=\s*'([^']+)'/);
  const xorM = html.match(/hadeedg252\s*=\s*(\d+)/);
  const radixM = html.match(/hcdeedg252\s*=\s*(\d+)/);
  if (!keyM || !ivM) return [];
  const key = keyM[1], iv = ivM[1];
  const xorVal = xorM ? Number(xorM[1]) : 20;
  const radix = radixM ? Number(radixM[1]) : 7;
  const groups = avParseMvarr(html);
  const order = Object.keys(groups).sort(function (a, b) {
    return avGroupRank(a) - avGroupRank(b);
  });
  for (const gk of order) {
    const entries = groups[gk] || [];
    for (const e of entries) {
      if (!e || !e[1]) continue;
      let plain = "";
      try { plain = avDecryptUrl(e[1], key, iv, radix, xorVal); } catch (err) { plain = ""; }
      if (!plain) continue;
      let playUrl = String(e[3] || "") + plain + String(e[4] || "");
      if (playUrl.indexOf("//") === 0) playUrl = "https:" + playUrl;
      if (!/^https?:\/\//.test(playUrl)) continue;
      const lines = await avFetchPlaySources(playUrl, pageUrl, owned.section);
      if (lines.length) return lines;
    }
  }
  return [];
}

async function avFetchPlaySources(playUrl, pageUrl, section) {
  let html = "";
  try { html = await avGetTextXff(playUrl, pageUrl); } catch (e) { return []; }
  if (!html) return [];
  const found = [];
  const re = /\{src:\s*'([^']+)',\s*type:\s*'application\/x-mpegURL',\s*size:\s*(\d+)\}/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    found.push({ url: avUnescape(m[1]), size: Number(m[2]) });
  }
  found.sort(function (a, b) { return b.size - a.size; });
  const seen = {};
  const lines = [];
  for (const f of found) {
    const real = avRealSize(section, f.size);
    if (seen[real]) continue;
    seen[real] = 1;
    lines.push({
      name: real + "P",
      url: f.url,
      playerType: "system",
      customHeaders: { "User-Agent": AV_UA, Referer: AV_BASE + "/" }
    });
  }
  const hi = lines.filter(function (l) { return Number(l.name.replace("P", "")) >= 720; });
  return hi.length ? hi : lines.slice(0, 1);
}

function avRealSize(section, size) {
  if (section === "animation" || section === "CensoredAnimation") return size;
  if (section === "tdAnimation") return size === 1080 ? 540 : size;
  if (section === "dt") return size === 1080 ? 270 : size;
  if (size === 1080) return 720;
  if (size === 720) return 480;
  return size;
}

function avGroupRank(gk) {
  const s = String(gk || "");
  if (s.indexOf("1080") >= 0 || s === "10_1") return 0;
  if (s.indexOf("720") >= 0 || s === "11_1") return 1;
  return 2;
}

function avGroupName(gk) {
  const s = String(gk || "");
  if (s === "10_1" || s.indexOf("1080") >= 0) return "1080P";
  if (s === "11_1" || s.indexOf("720") >= 0) return "720P";
  return "线路";
}

function avAesTables() {
  const sbox = new Array(256), invSbox = new Array(256);
  let p = 1, q = 1;
  do {
    p = p ^ (p << 1) ^ (p & 0x80 ? 0x1b : 0);
    p &= 0xff;
    q ^= q << 1; q ^= q << 2; q ^= q << 4;
    q &= 0xff;
    if (q & 0x80) q ^= 0x09;
    q &= 0xff;
    const xformed = q ^ ((q << 1) | (q >> 7)) ^ ((q << 2) | (q >> 6)) ^ ((q << 3) | (q >> 5)) ^ ((q << 4) | (q >> 4)) ^ 0x63;
    const s = xformed & 0xff;
    sbox[p] = s;
    invSbox[s] = p;
  } while (p !== 1);
  sbox[0] = 0x63;
  invSbox[0x63] = 0;
  return { sbox, invSbox };
}

const AV_AES = avAesTables();

function avGmul(a, b) {
  let r = 0;
  while (b) {
    if (b & 1) r ^= a;
    a = (a << 1) ^ (a & 0x80 ? 0x1b : 0);
    a &= 0xff;
    b >>= 1;
  }
  return r;
}

function avExpandKey(key) {
  const { sbox } = AV_AES;
  const w = new Array(44);
  for (let i = 0; i < 4; i++) w[i] = (key[i * 4] << 24) | (key[i * 4 + 1] << 16) | (key[i * 4 + 2] << 8) | key[i * 4 + 3];
  let rcon = 1;
  for (let i = 4; i < 44; i++) {
    let t = w[i - 1];
    if (i % 4 === 0) {
      t = (sbox[(t >> 16) & 0xff] << 24) | (sbox[(t >> 8) & 0xff] << 16) | (sbox[t & 0xff] << 8) | sbox[(t >> 24) & 0xff];
      t ^= rcon << 24;
      rcon = avGmul(rcon, 2);
    }
    w[i] = (w[i - 4] ^ t) >>> 0;
  }
  return w;
}

function avDecryptBlock(block, w) {
  const { invSbox } = AV_AES;
  const s = new Array(16);
  for (let i = 0; i < 16; i++) s[i] = block[i];
  const addRoundKey = (round) => {
    for (let c = 0; c < 4; c++) {
      const word = w[round * 4 + c];
      s[c * 4] ^= (word >> 24) & 0xff;
      s[c * 4 + 1] ^= (word >> 16) & 0xff;
      s[c * 4 + 2] ^= (word >> 8) & 0xff;
      s[c * 4 + 3] ^= word & 0xff;
    }
  };
  const invShiftRows = () => {
    const t = s.slice();
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) s[c * 4 + r] = t[((c - r + 4) % 4) * 4 + r];
  };
  const invSubBytes = () => { for (let i = 0; i < 16; i++) s[i] = invSbox[s[i]]; };
  const invMixColumns = () => {
    for (let c = 0; c < 4; c++) {
      const a0 = s[c * 4], a1 = s[c * 4 + 1], a2 = s[c * 4 + 2], a3 = s[c * 4 + 3];
      s[c * 4] = avGmul(a0, 14) ^ avGmul(a1, 11) ^ avGmul(a2, 13) ^ avGmul(a3, 9);
      s[c * 4 + 1] = avGmul(a0, 9) ^ avGmul(a1, 14) ^ avGmul(a2, 11) ^ avGmul(a3, 13);
      s[c * 4 + 2] = avGmul(a0, 13) ^ avGmul(a1, 9) ^ avGmul(a2, 14) ^ avGmul(a3, 11);
      s[c * 4 + 3] = avGmul(a0, 11) ^ avGmul(a1, 13) ^ avGmul(a2, 9) ^ avGmul(a3, 14);
    }
  };
  addRoundKey(10);
  for (let round = 9; round >= 1; round--) {
    invShiftRows();
    invSubBytes();
    addRoundKey(round);
    invMixColumns();
  }
  invShiftRows();
  invSubBytes();
  addRoundKey(0);
  return s;
}

function avAesCbcDecrypt(cipherBytes, keyBytes, ivBytes) {
  const w = avExpandKey(keyBytes);
  const out = [];
  let prev = ivBytes.slice(0, 16);
  for (let off = 0; off + 16 <= cipherBytes.length; off += 16) {
    const block = cipherBytes.slice(off, off + 16);
    const dec = avDecryptBlock(block, w);
    for (let i = 0; i < 16; i++) out.push(dec[i] ^ prev[i]);
    prev = block;
  }
  const pad = out[out.length - 1];
  if (pad >= 1 && pad <= 16) out.length -= pad;
  return out;
}

function avUtf8Bytes(str) {
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if (c < 0x80) bytes.push(c);
    else if (c < 0x800) { bytes.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f)); }
    else if (c >= 0xd800 && c <= 0xdbff && i + 1 < str.length) {
      const c2 = str.charCodeAt(++i);
      c = 0x10000 + ((c & 0x3ff) << 10) + (c2 & 0x3ff);
      bytes.push(0xf0 | (c >> 18), 0x80 | ((c >> 12) & 0x3f), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
    } else bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
  }
  return bytes;
}

function avBytesToUtf8(bytes) {
  let s = "";
  for (let i = 0; i < bytes.length;) {
    const b = bytes[i];
    if (b < 0x80) { s += String.fromCharCode(b); i++; }
    else if (b >= 0xc0 && b < 0xe0) { s += String.fromCharCode(((b & 0x1f) << 6) | (bytes[i + 1] & 0x3f)); i += 2; }
    else if (b >= 0xe0 && b < 0xf0) { s += String.fromCharCode(((b & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f)); i += 3; }
    else {
      const cp = ((b & 0x07) << 18) | ((bytes[i + 1] & 0x3f) << 12) | ((bytes[i + 2] & 0x3f) << 6) | (bytes[i + 3] & 0x3f);
      s += String.fromCharCode(0xd800 + ((cp - 0x10000) >> 10), 0xdc00 + ((cp - 0x10000) & 0x3ff));
      i += 4;
    }
  }
  return s;
}

function avBase64ToBytes(b64) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const clean = String(b64 || "").replace(/[^A-Za-z0-9+/=]/g, "");
  const bytes = [];
  for (let i = 0; i + 4 <= clean.length; i += 4) {
    const a = chars.indexOf(clean[i]), b = chars.indexOf(clean[i + 1]);
    const c = clean[i + 2] === "=" ? -1 : chars.indexOf(clean[i + 2]);
    const d = clean[i + 3] === "=" ? -1 : chars.indexOf(clean[i + 3]);
    bytes.push(((a << 2) | (b >> 4)) & 0xff);
    if (c >= 0) bytes.push((((b & 15) << 4) | (c >> 2)) & 0xff);
    if (d >= 0) bytes.push((((c & 3) << 6) | d) & 0xff);
  }
  return bytes;
}

function avDecrypto(enc, radix, xorVal) {
  let r = radix;
  r = 25 >= r ? r : r % 25;
  const sep = String.fromCharCode(r + 97);
  const parts = String(enc || "").split(sep);
  const out = [];
  for (let i = 0; i < parts.length; i++) {
    let k = parseInt(parts[i], r);
    k = 1 * k ^ xorVal;
    out.push(String.fromCharCode(k));
  }
  return out.join("");
}

function avDecryptUrl(enc, keyStr, ivStr, radix, xorVal) {
  const b64 = avDecrypto(enc, radix, xorVal);
  const cipher = avBase64ToBytes(b64);
  const plain = avAesCbcDecrypt(cipher, avUtf8Bytes(keyStr), avUtf8Bytes(ivStr));
  return avBytesToUtf8(plain);
}

