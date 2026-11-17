WidgetMetadata = {
  id: "pektino",
  title: "Pektino",
  version: "1.0.2",
  requiredVersion: "0.0.1",
  description: "Pektino：X/Twitter 视频聚合，含每日精选、每周热门、每月排行、历史最佳与沉浸连刷",
  author: "Coko",
  site: "https://pektino.com/zh-CN",
  detailCacheDuration: 60,
  modules: [
    {
      id: "feed",
      title: "🔥 沉浸连刷",
      functionName: "loadList",
      type: "video",
      cacheDuration: 0,
      params: [
        { name: "cat", title: "分类", type: "constant", value: "feed_stream" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "daily",
      title: "每日精选",
      functionName: "loadList",
      type: "video",
      cacheDuration: 3600,
      params: [
        { name: "cat", title: "分类", type: "constant", value: "daily" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "weekly",
      title: "每周热门",
      functionName: "loadList",
      type: "video",
      cacheDuration: 3600,
      params: [
        { name: "cat", title: "分类", type: "constant", value: "weekly" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "monthly",
      title: "每月排行",
      functionName: "loadList",
      type: "video",
      cacheDuration: 3600,
      params: [
        { name: "cat", title: "分类", type: "constant", value: "monthly" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "all",
      title: "历史最佳",
      functionName: "loadList",
      type: "video",
      cacheDuration: 3600,
      params: [
        { name: "cat", title: "分类", type: "constant", value: "all" },
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
    }
  ],
  search: {
    title: "搜索",
    functionName: "search",
    params: [
      { name: "keyword", title: "关键词", type: "input" },
      { name: "page", title: "页码", type: "page" }
    ]
  }
};

const PK_HOST = "https://pektino.com";
const PK_PROXY = "https://pektino.100923.xyz";
const PK_PAGE = PK_PROXY + "/pektino";
const PK_VIDEO = PK_PROXY + "/twimg";
const PK_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const PK_TITLE_PREFIX = "X (Twitter) adult video ";

async function pkGet(url) {
  try {
    const res = await Widget.http.get(url, {
      headers: {
        "User-Agent": PK_UA,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Referer": PK_HOST + "/zh-CN"
      }
    });
    const d = res && res.data;
    return typeof d === "string" ? d : "";
  } catch (e) {
    console.error("[pektino] 请求失败:", url, e.message || e);
    return "";
  }
}

function pkConvertPic(picUrl) {
  if (!picUrl) return "";
  let u = picUrl;
  if (u.indexOf("//") === 0) u = "https:" + u;
  if (u.indexOf("twimg.com") !== -1) return "https://wsrv.nl/?url=" + encodeURIComponent(u);
  return u;
}

function pkParseCards(htmlText) {
  const cards = [];
  if (!htmlText) return cards;
  const anchorRe = /(<a[^>]+href="[^"]*(?:\/zh-CN)?\/(?:movies?|shorts)\/[^"]+"[^>]*>.*?<\/a>)/gis;
  const seen = {};
  let m;
  while ((m = anchorRe.exec(htmlText)) !== null) {
    const block = m[1];
    const hrefM = /href="([^"]*(?:\/zh-CN)?\/(?:movies?|shorts)\/([^"\/]+)\/?)"/i.exec(block);
    if (!hrefM) continue;
    const vid = hrefM[2];
    if (seen[vid]) continue;
    seen[vid] = true;
    const imgM = /(?:src|data-src|poster)="([^"]+)"/i.exec(block);
    const pic = imgM ? pkConvertPic(imgM[1]) : "";
    const durM = /(\d+:\d+(?::\d+)?)/.exec(block);
    const dur = durM ? durM[1] : "";
    const altM = /alt="([^"]+)"/i.exec(block);
    let rawTitle = altM ? altM[1].trim() : vid;
    if (rawTitle.indexOf(PK_TITLE_PREFIX) === 0) rawTitle = rawTitle.slice(PK_TITLE_PREFIX.length).trim();
    const title = rawTitle === vid ? "精选影片 " + vid : rawTitle;
    cards.push({ vid: vid, title: title, pic: pic, dur: dur });
  }
  return cards;
}

function pkExtractStream(htmlText, vid) {
  if (!htmlText) return "";
  const clean = htmlText.replace(/\\\//g, "/").replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  const re = /https?:\/\/video\.twimg\.com\/[^"'\\\s<>\\]+\.mp4(?:\?[^"'\\\s<>\\]*)?/g;
  const valid = [];
  let m;
  while ((m = re.exec(clean)) !== null) {
    const u = m[0].replace(/\\/g, "").trim();
    if (u.indexOf("http") === 0 && valid.indexOf(u) === -1) valid.push(u);
  }
  if (vid) {
    for (let i = 0; i < valid.length; i++) {
      if (valid[i].indexOf(vid) !== -1) return valid[i];
    }
  }
  return valid.length > 0 ? valid[0] : "";
}

function pkSectionUrl(sec, page) {
  let url = sec === "daily" ? PK_PAGE + "/zh-CN" : PK_PAGE + "/zh-CN/" + sec;
  if (page > 1) url += "?page=" + page;
  return url;
}

function pkShuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
}

function pkDetailHtml(vid) {
  return pkGet(PK_PAGE + "/zh-CN/movies/" + vid).then(function (h) {
    if (h) return h;
    return pkGet(PK_PAGE + "/zh-CN/movie/" + vid);
  });
}

function pkParseOwnedLink(raw) {
  if (raw == null) return null;
  const s = String(raw).trim();
  if (!s) return null;
  const feedM = /^pektino:feed:([^\/:#?]+)$/.exec(s);
  if (feedM) return { kind: "feed", vid: feedM[1] };
  const vidM = /^pektino:([^\/:#?]+)$/.exec(s);
  if (vidM) return { kind: "video", vid: vidM[1] };
  const urlM = /^https?:\/\/pektino\.com\/(?:zh-CN\/)?(?:movies?|shorts)\/([^\/\?#]+)\/?(?:[\?#].*)?$/.exec(s);
  if (urlM) return { kind: "video", vid: urlM[1] };
  return null;
}

function pkCardToItem(c, link) {
  const item = {
    id: link,
    type: "url",
    title: c.title,
    backdropPath: c.pic,
    link: link
  };
  if (c.dur) item.durationText = c.dur;
  return item;
}

async function loadList(params = {}) {
  try {
    const cat = params.cat || "daily";
    const page = Number(params.page || 1);
    if (cat === "feed_stream") {
      const sections = pkShuffle(["weekly", "monthly", "all", "daily"]);
      let rawCards = [];
      for (let i = 0; i < sections.length; i++) {
        const sec = sections[i];
        const baseP = Math.floor(Math.random() * 5) + 1;
        const html = await pkGet(pkSectionUrl(sec, baseP));
        const cards = pkParseCards(html);
        if (cards.length > 0) {
          rawCards = cards;
          break;
        }
      }
      if (rawCards.length === 0) {
        rawCards = pkParseCards(await pkGet(PK_HOST + "/zh-CN"));
      }
      const shuffled = pkShuffle(rawCards);
      return shuffled.map(function (c) {
        return pkCardToItem(c, "pektino:feed:" + c.vid);
      });
    }
    const html = await pkGet(pkSectionUrl(cat, page));
    const cards = pkParseCards(html);
    return cards.map(function (c) {
      return pkCardToItem(c, "pektino:" + c.vid);
    });
  } catch (e) {
    console.error("[pektino] loadList 失败:", e.message || e);
    throw e;
  }
}

async function loadDetail(link) {
  try {
    const owned = pkParseOwnedLink(link);
    if (!owned) throw new Error("无法识别的详情链接: " + link);
    if (owned.kind === "feed") {
      const startVid = owned.vid;
      const firstHtml = await pkDetailHtml(startVid);
      let startTitle = "";
      const tM = /<title>([^<]+)<\/title>/i.exec(firstHtml);
      if (tM) startTitle = tM[1].split(" - ")[0].trim();
      const pool = [];
      const seenPool = {};
      seenPool[startVid] = true;
      const tasks = [];
      const sections = ["weekly", "monthly", "all", "daily"];
      for (let s = 0; s < sections.length; s++) {
        const pages = pkShuffle([1, 2, 3, 4, 5, 6, 7]).slice(0, 2);
        for (let p = 0; p < pages.length; p++) tasks.push([sections[s], pages[p]]);
      }
      const shuffledTasks = pkShuffle(tasks);
      for (let t = 0; t < shuffledTasks.length; t++) {
        const sec = shuffledTasks[t][0];
        const pg = shuffledTasks[t][1];
        const h = await pkGet(pkSectionUrl(sec, pg));
        const pageCards = pkParseCards(h);
        for (let c = 0; c < pageCards.length; c++) {
          const cvid = pageCards[c].vid;
          if (!seenPool[cvid]) {
            seenPool[cvid] = true;
            pool.push(cvid);
          }
        }
        if (pool.length >= 150) break;
      }
      const shuffledPool = pkShuffle(pool);
      const episodeItems = [{
        id: "pektino:" + startVid,
        type: "url",
        title: startTitle || "正片",
        link: "pektino:" + startVid
      }];
      for (let i = 0; i < shuffledPool.length; i++) {
        const v = shuffledPool[i];
        episodeItems.push({ id: "pektino:" + v, type: "url", title: v, link: "pektino:" + v });
      }
      return {
        id: link,
        type: "url",
        title: "🔥 沉浸连刷·全屏自适应",
        link: link,
        episodeItems: episodeItems
      };
    }
    const vid = owned.vid;
    const html = await pkDetailHtml(vid);
    if (!html) return [];
    let title = "";
    const tM2 = /<title>([^<]+)<\/title>/i.exec(html);
    if (tM2) title = tM2[1].split(" - ")[0].trim();
    let pic = "";
    const picM = /property="og:image"\s+content="([^"]+)"/i.exec(html);
    if (picM) pic = pkConvertPic(picM[1]);
    const recCards = pkParseCards(html);
    const relatedItems = [];
    for (let i = 0; i < recCards.length; i++) {
      const rc = recCards[i];
      if (rc.vid !== vid && relatedItems.length < 30) {
        relatedItems.push(pkCardToItem(rc, "pektino:" + rc.vid));
      }
    }
    return {
      id: link,
      type: "url",
      title: title || "精选影片",
      backdropPath: pic,
      relatedItems: relatedItems,
      link: link
    };
  } catch (e) {
    console.error("[pektino] loadDetail 失败:", e.message || e);
    throw e;
  }
}

async function loadResource(params = {}) {
  try {
    const raw = params.link != null ? params.link : params.id;
    const owned = pkParseOwnedLink(raw);
    if (!owned) return [];
    const vid = owned.vid;
    const html = await pkDetailHtml(vid);
    const stream = pkExtractStream(html, vid);
    if (!stream) return [];
    const proxied = stream.indexOf("https://video.twimg.com/") === 0
      ? PK_VIDEO + stream.slice("https://video.twimg.com".length)
      : stream;
    return [{
      name: "正片",
      url: proxied,
      customHeaders: {
        "User-Agent": PK_UA
      }
    }];
  } catch (e) {
    console.error("[pektino] loadResource 失败:", e.message || e);
    throw e;
  }
}

async function search(params = {}) {
  try {
    const kw = params.keyword || "";
    if (!kw) return [];
    const page = Number(params.page || 1);
    let url = PK_PAGE + "/zh-CN/search?tag=" + encodeURIComponent(kw);
    if (page > 1) url += "&page=" + page;
    const html = await pkGet(url);
    const cards = pkParseCards(html);
    return cards.map(function (c) {
      return pkCardToItem(c, "pektino:" + c.vid);
    });
  } catch (e) {
    console.error("[pektino] search 失败:", e.message || e);
    throw e;
  }
}
