WidgetMetadata = {
  id: "huang",
  title: "黄视频",
  version: "1.0.2",
  requiredVersion: "0.0.1",
  description: "黄视频：国产AV、糖心Vlog、网红福利姬、探花、PMV、ASMR、短剧",
  author: "Coko",
  site: "https://huang.video",
  iconurl: "https://huang.video/apple-touch-icon.png",
  detailCacheDuration: 60,
  modules: [
    {
      id: "all",
      title: "全部视频",
      functionName: "loadList",
      type: "video",
      cacheDuration: 600,
      params: [
        { name: "category", title: "分类", type: "constant", value: "all" },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          value: "latest",
          enumOptions: [
            { title: "最新", value: "latest" },
            { title: "最热门", value: "popular" },
            { title: "24h最热", value: "popular_24h" },
            { title: "7天最热", value: "popular_7d" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "shorts",
      title: "短剧",
      functionName: "loadList",
      type: "video",
      cacheDuration: 600,
      params: [
        { name: "category", title: "分类", type: "constant", value: "shorts" },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          value: "latest",
          enumOptions: [
            { title: "最新", value: "latest" },
            { title: "最热门", value: "popular" },
            { title: "24h最热", value: "popular_24h" },
            { title: "7天最热", value: "popular_7d" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "tangxin",
      title: "糖心Vlog",
      functionName: "loadList",
      type: "video",
      cacheDuration: 600,
      params: [
        { name: "category", title: "分类", type: "constant", value: "tangxin" },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          value: "latest",
          enumOptions: [
            { title: "最新", value: "latest" },
            { title: "最热门", value: "popular" },
            { title: "24h最热", value: "popular_24h" },
            { title: "7天最热", value: "popular_7d" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "influencers",
      title: "网红福利姬",
      functionName: "loadList",
      type: "video",
      cacheDuration: 600,
      params: [
        { name: "category", title: "分类", type: "constant", value: "influencers" },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          value: "latest",
          enumOptions: [
            { title: "最新", value: "latest" },
            { title: "最热门", value: "popular" },
            { title: "24h最热", value: "popular_24h" },
            { title: "7天最热", value: "popular_7d" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "tanhua",
      title: "探花大神",
      functionName: "loadList",
      type: "video",
      cacheDuration: 600,
      params: [
        { name: "category", title: "分类", type: "constant", value: "tanhua" },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          value: "latest",
          enumOptions: [
            { title: "最新", value: "latest" },
            { title: "最热门", value: "popular" },
            { title: "24h最热", value: "popular_24h" },
            { title: "7天最热", value: "popular_7d" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "pmv",
      title: "PMV",
      functionName: "loadList",
      type: "video",
      cacheDuration: 600,
      params: [
        { name: "category", title: "分类", type: "constant", value: "pmv" },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          value: "latest",
          enumOptions: [
            { title: "最新", value: "latest" },
            { title: "最热门", value: "popular" },
            { title: "24h最热", value: "popular_24h" },
            { title: "7天最热", value: "popular_7d" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "asmr",
      title: "ASMR",
      functionName: "loadList",
      type: "video",
      cacheDuration: 600,
      params: [
        { name: "category", title: "分类", type: "constant", value: "asmr" },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          value: "latest",
          enumOptions: [
            { title: "最新", value: "latest" },
            { title: "最热门", value: "popular" },
            { title: "24h最热", value: "popular_24h" },
            { title: "7天最热", value: "popular_7d" }
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

const HU_BASE = "https://huang.video";
const HU_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";
const HU_SORTS = ["latest", "popular", "popular_24h", "popular_7d"];
const HU_CATEGORIES = ["all", "shorts", "tangxin", "influencers", "tanhua", "pmv", "asmr"];

function huPageNum(params) {
  const page = Number(params.page || 1);
  if (!Number.isFinite(page) || page <= 1) return 1;
  return Math.floor(page);
}

function huListPath(base, params) {
  const sort = HU_SORTS.indexOf(params.sort) >= 0 ? params.sort : "latest";
  const page = huPageNum(params);
  let path = base + "?sort=" + sort;
  if (page > 1) path += "&page=" + page;
  return path;
}

async function huLoadHtml(path) {
  const res = await Widget.http.get(HU_BASE + path, { headers: { "User-Agent": HU_UA } });
  if (!res || typeof res.data !== "string" || !res.data) throw new Error("huang 空响应: " + path);
  return await Widget.html.load(res.data);
}

function huCleanText(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function huDurationText(text) {
  const t = huCleanText(text);
  return /^\d{1,2}:\d{2}(:\d{2})?$/.test(t) ? t : "";
}

function huFormatDuration(seconds) {
  if (!seconds || seconds <= 0) return "";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const mm = (h ? String(m).padStart(2, "0") : String(m)) + ":" + String(s).padStart(2, "0");
  return h ? h + ":" + mm : mm;
}

function huCardItem($, article) {
  const el = $(article);
  const aid = el.attr("id") || "";
  const m = aid.match(/^video_(\d+)$/);
  if (!m) return null;
  const id = m[1];
  const cover = el.find("figure img").attr("src") || "";
  if (!/^https:\/\//.test(cover)) return null;
  const title = huCleanText(el.find("h3 a").first().text());
  if (!title) return null;
  const item = {
    id: "huang:" + id,
    type: "url",
    mediaType: "movie",
    title: title,
    link: "huang:" + id,
    coverUrl: cover,
    backdropPath: cover
  };
  const duration = huDurationText(el.find("figure .badge").first().text());
  if (duration) item.durationText = duration;
  const creator = el.find('p a[href^="/creators/"]').first();
  const creatorName = huCleanText(creator.text());
  if (creatorName) item.description = creatorName;
  return item;
}

function huParseVideoList($) {
  const items = [];
  const seen = {};
  $('article[id^="video_"]').each((i, article) => {
    const item = huCardItem($, article);
    if (!item || seen[item.id]) return;
    seen[item.id] = true;
    items.push(item);
  });
  return items;
}

function huSeriesItem($, article) {
  const el = $(article);
  const aid = el.attr("id") || "";
  const m = aid.match(/^series_(\d+)$/);
  if (!m) return null;
  const id = m[1];
  const cover = el.find("figure img").attr("src") || "";
  if (!/^https:\/\//.test(cover)) return null;
  const title = huCleanText(el.find("h3 a").first().text());
  if (!title) return null;
  const item = {
    id: "huang:series:" + id,
    type: "url",
    mediaType: "tv",
    title: title,
    link: "huang:series:" + id,
    posterPath: cover
  };
  const creator = el.find('p a[href^="/creators/"]').first();
  const creatorName = huCleanText(creator.text());
  if (creatorName) item.description = creatorName;
  return item;
}

function huParseSeriesList($) {
  const items = [];
  const seen = {};
  $('article[id^="series_"]').each((i, article) => {
    const item = huSeriesItem($, article);
    if (!item || seen[item.id]) return;
    seen[item.id] = true;
    items.push(item);
  });
  return items;
}

function huParseOwnedLink(raw) {
  if (raw == null) return null;
  const s = String(raw).trim();
  let m = s.match(/^huang:series:(\d+)$/);
  if (m) return { kind: "series", id: m[1] };
  m = s.match(/^huang:(\d+)$/);
  if (m) return { kind: "video", id: m[1] };
  m = s.match(/^https:\/\/huang\.video\/series\/(\d+)$/);
  if (m) return { kind: "series", id: m[1] };
  m = s.match(/^https:\/\/huang\.video\/videos\/(\d+)$/);
  if (m) return { kind: "video", id: m[1] };
  return null;
}

function huJsonLd($) {
  const text = $('script[type="application/ld+json"]').first().text();
  if (!text) return null;
  try {
    const data = JSON.parse(text);
    if (data && data["@type"] === "VideoObject") return data;
  } catch (e) {
    return null;
  }
  return null;
}

function huContentUrl($, ld) {
  if (ld && typeof ld.contentUrl === "string" && /^https:\/\/h\.matecdn\.com\//.test(ld.contentUrl)) return ld.contentUrl;
  const text = $('script[type="application/ld+json"]').first().text();
  const m = text.match(/"contentUrl"\s*:\s*"(https:\/\/h\.matecdn\.com\/[^"]+\.m3u8)"/);
  return m ? m[1] : null;
}

async function loadList(params = {}) {
  try {
    const page = huPageNum(params);
    let path;
    if (typeof params.peopleId === "string") {
      const m = params.peopleId.match(/^creator:([A-Za-z0-9_-]+)$/);
      if (!m) return [];
      path = "/creators/" + m[1] + (page > 1 ? "?page=" + page : "");
    } else {
      const category = HU_CATEGORIES.indexOf(params.category) >= 0 ? params.category : "all";
      const base = category === "all" ? "/videos" : "/c/" + category;
      path = huListPath(base, params);
    }
    const $ = await huLoadHtml(path);
    const category = HU_CATEGORIES.indexOf(params.category) >= 0 ? params.category : "all";
    if (category === "shorts" && !params.peopleId) return huParseSeriesList($);
    return huParseVideoList($);
  } catch (error) {
    console.error("[huang] loadList 失败:", error.message || error);
    throw error;
  }
}

async function search(params = {}) {
  try {
    const keyword = huCleanText(params.keyword);
    if (!keyword) return [];
    const page = huPageNum(params);
    let path = "/search?q=" + encodeURIComponent(keyword);
    if (page > 1) path += "&page=" + page;
    const $ = await huLoadHtml(path);
    return huParseVideoList($);
  } catch (error) {
    console.error("[huang] search 失败:", error.message || error);
    throw error;
  }
}

async function loadDetail(link) {
  try {
    const parsed = huParseOwnedLink(link);
    if (!parsed) return null;
    if (parsed.kind === "series") {
      const $ = await huLoadHtml("/series/" + parsed.id);
      const title = huCleanText($("h1").first().text()) || huCleanText($('meta[property="og:title"]').attr("content")).replace(/\s*\|\s*黄视频$/, "");
      if (!title) return null;
      const cover = $('meta[property="og:image"]').attr("content") || "";
      if (!/^https:\/\//.test(cover)) return null;
      const item = {
        id: "huang:series:" + parsed.id,
        type: "url",
        mediaType: "tv",
        title: title,
        link: "huang:series:" + parsed.id,
        posterPath: cover
      };
      const desc = huCleanText($('meta[property="og:description"]').attr("content"));
      if (desc) item.description = desc;
      const creator = $('a[href^="/creators/"]').first();
      const slug = (creator.attr("href") || "").replace(/^\/creators\//, "");
      const creatorName = huCleanText(creator.text());
      if (slug && creatorName) item.peoples = [{ id: "creator:" + slug, title: creatorName }];
      const episodes = [];
      const seenEp = {};
      $("ol li a[href^=\"/videos/\"]").each((i, a) => {
        const href = $(a).attr("href") || "";
        const vm = href.match(/^\/videos\/(\d+)$/);
        if (!vm || seenEp[vm[1]]) return;
        seenEp[vm[1]] = true;
        const text = huCleanText($(a).text());
        const epTitle = (text.match(/第\d+集/) || [""])[0];
        const epDur = huDurationText((text.match(/\d{1,2}:\d{2}(:\d{2})?/) || [""])[0]);
        const ep = {
          id: "huang:" + vm[1],
          type: "url",
          mediaType: "movie",
          title: epTitle || "第" + (episodes.length + 1) + "集",
          link: "huang:" + vm[1]
        };
        if (epDur) ep.durationText = epDur;
        episodes.push(ep);
      });
      if (episodes.length) item.episodeItems = episodes;
      return item;
    }
    const id = parsed.id;
    const $ = await huLoadHtml("/videos/" + id);
    const ld = huJsonLd($);
    const title = huCleanText($("h1").first().text()) || (ld && huCleanText(ld.name)) || "";
    if (!title) return null;
    let cover = "";
    if (ld && Array.isArray(ld.thumbnailUrl) && ld.thumbnailUrl[0]) cover = ld.thumbnailUrl[0];
    if (!cover) cover = $('meta[property="og:image"]').attr("content") || "";
    if (!/^https:\/\//.test(cover)) return null;
    const item = {
      id: "huang:" + id,
      type: "url",
      mediaType: "movie",
      title: title,
      link: "huang:" + id,
      coverUrl: cover,
      backdropPath: cover
    };
    if (ld && typeof ld.duration === "string") {
      const dm = ld.duration.match(/^PT(\d+)S$/);
      if (dm) {
        const seconds = Number(dm[1]);
        item.duration = seconds;
        const dt = huFormatDuration(seconds);
        if (dt) item.durationText = dt;
      }
    }
    const creator = $('a[href^="/creators/"]').first();
    const slug = (creator.attr("href") || "").replace(/^\/creators\//, "");
    const creatorName = huCleanText(creator.text());
    const viewsMatch = $.html().match(/([\d,]+)\s*次观看/);
    if (creatorName) {
      item.peoples = [{ id: "creator:" + slug, title: creatorName }];
      item.description = creatorName + (viewsMatch ? " · " + viewsMatch[1] + "次观看" : "");
    } else if (viewsMatch) {
      item.description = viewsMatch[1] + "次观看";
    }
    const episodes = [];
    const seenEp = {};
    $('nav[aria-label*="中的视频"] a[href^="/videos/"]').each((i, a) => {
      const href = $(a).attr("href") || "";
      const vm = href.match(/^\/videos\/(\d+)$/);
      if (!vm || seenEp[vm[1]]) return;
      seenEp[vm[1]] = true;
      const spans = $(a).find("span");
      const epTitle = huCleanText(spans.eq(1).text());
      const epDur = huDurationText(spans.eq(2).text());
      const ep = {
        id: "huang:" + vm[1],
        type: "url",
        mediaType: "movie",
        title: epTitle || "第" + (i + 1) + "集",
        link: "huang:" + vm[1]
      };
      if (epDur) ep.durationText = epDur;
      episodes.push(ep);
    });
    if (episodes.length > 1) item.episodeItems = episodes;
    const related = [];
    const seen = {};
    seen[item.id] = true;
    $('article[id^="video_"]').each((i, article) => {
      if (related.length >= 8) return;
      const rel = huCardItem($, article);
      if (!rel || seen[rel.id]) return;
      seen[rel.id] = true;
      related.push(rel);
    });
    if (related.length) item.relatedItems = related;
    return item;
  } catch (error) {
    console.error("[huang] loadDetail 失败:", error.message || error);
    throw error;
  }
}

async function loadResource(params = {}) {
  try {
    const raw = params.link != null ? params.link : params.id;
    const parsed = huParseOwnedLink(raw);
    if (!parsed || parsed.kind !== "video") return [];
    const id = parsed.id;
    const $ = await huLoadHtml("/videos/" + id);
    const url = huContentUrl($, huJsonLd($));
    if (!url) return [];
    return [{
      name: "原画",
      description: "HLS",
      url: url,
      customHeaders: { Referer: HU_BASE + "/" },
      playerType: "app"
    }];
  } catch (error) {
    console.error("[huang] loadResource 失败:", error.message || error);
    return [];
  }
}
