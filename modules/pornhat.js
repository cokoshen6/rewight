WidgetMetadata = {
  id: "pornhat",
  title: "PornHat",
  version: "1.0.7",
  requiredVersion: "0.0.1",
  description: "PornHat 免费高清视频",
  author: "Coko",
  site: "https://www.pornhat.com",
  iconurl: "https://tu.100923.xyz/file/1794665043095_pornhat-icon-round.png",
  detailCacheDuration: 60,
  modules: [
    {
      id: "browse",
      title: "视频",
      functionName: "loadList",
      type: "video",
      params: [
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          enumOptions: [
            { title: "最新", value: "latest" },
            { title: "最受欢迎", value: "popular" },
            { title: "趋势", value: "trending" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "tags",
      title: "标签",
      functionName: "loadTagList",
      type: "video",
      params: [
        {
          name: "tag",
          title: "标签",
          type: "enumeration",
          value: "hd",
          enumOptions: [
            { title: "HD", value: "hd" },
            { title: "口交", value: "blowjob" },
            { title: "大胸", value: "big-tits" },
            { title: "大屁股", value: "big-ass" },
            { title: "大屌", value: "big-cock" },
            { title: "黑发", value: "brunette" },
            { title: "后入", value: "doggystyle" },
            { title: "女优", value: "pornstar" },
            { title: "女上", value: "cowgirl" },
            { title: "少女", value: "teen-18" },
            { title: "硬核", value: "hardcore" },
            { title: "口活", value: "oral" },
            { title: "传教士", value: "missionary" },
            { title: "金发", value: "blonde" },
            { title: "熟女", value: "milf" },
            { title: "素人", value: "amateur" },
            { title: "美女", value: "babe" },
            { title: "侧入", value: "side-fuck" },
            { title: "自慰", value: "masturbation" },
            { title: "颜射", value: "cumshot" }
          ]
        },
        {
          name: "customTag",
          title: "自定义标签（填了就用这个，上面选的就不算了）",
          type: "input"
        },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          enumOptions: [
            { title: "最新", value: "post_date" },
            { title: "最多播放", value: "video_viewed" },
            { title: "最高评分", value: "rating" },
            { title: "最长时长", value: "duration" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "models",
      title: "演员作品",
      functionName: "loadModelList",
      type: "video",
      params: [
        {
          name: "model",
          title: "演员",
          type: "enumeration",
          value: "angela-white",
          enumOptions: [
            { title: "Angela White", value: "angela-white" },
            { title: "Abella Danger", value: "abella-danger" },
            { title: "Emily Willis", value: "emily-willis" },
            { title: "Dani Daniels", value: "dani-daniels" },
            { title: "Mia Khalifa", value: "mia-khalifa" },
            { title: "Valentina Nappi", value: "valentina-nappi" },
            { title: "Eliza Ibarra", value: "eliza-ibarra" },
            { title: "Brandi Love", value: "brandi-love" },
            { title: "Natasha Nice", value: "natasha-nice" },
            { title: "Alexis Fawx", value: "alexis-fawx" },
            { title: "Ava Addams", value: "ava-addams" },
            { title: "Cherie Deville", value: "cherie-deville" },
            { title: "Blake Blossom", value: "blake-blossom" },
            { title: "Lena Paul", value: "lena-paul" },
            { title: "Lana Rhoades", value: "lana-rhoades" },
            { title: "Reagan Foxx", value: "reagan-foxx" }
          ]
        },
        {
          name: "customModel",
          title: "自定义演员（填了就用这个，上面选的就不算了）",
          type: "input"
        },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          enumOptions: [
            { title: "最新", value: "post_date" },
            { title: "最多播放", value: "video_viewed" },
            { title: "最高评分", value: "rating" },
            { title: "最长时长", value: "duration" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "sites",
      title: "频道",
      functionName: "loadSiteList",
      type: "video",
      params: [
        {
          name: "site",
          title: "频道",
          type: "enumeration",
          value: "brazzers",
          enumOptions: [
            { title: "Brazzers", value: "brazzers" },
            { title: "Naughty America", value: "naughty-america" },
            { title: "Reality Kings", value: "realitykings" },
            { title: "Bang Bros", value: "bangbros" },
            { title: "Nubiles Porn", value: "nubiles-porn" },
            { title: "Bang!", value: "bang" },
            { title: "Blacked.Com", value: "blacked-com" },
            { title: "Adult Prime", value: "adult-prime" },
            { title: "Scoreland", value: "scoreland" },
            { title: "Team Skeet", value: "teamskeet" },
            { title: "SexMex", value: "sexmex" },
            { title: "MYLF", value: "mylf" },
            { title: "Adult Time", value: "adulttime" },
            { title: "Family Strokes", value: "familystrokes" },
            { title: "Babes.Com", value: "babes-com" },
            { title: "Private", value: "private" }
          ]
        },
        {
          name: "customSite",
          title: "自定义频道（填了就用这个，上面选的就不算了）",
          type: "input"
        },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          enumOptions: [
            { title: "最新", value: "post_date" },
            { title: "最多播放", value: "video_viewed" },
            { title: "最高评分", value: "rating" },
            { title: "最长时长", value: "duration" }
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
    title: "搜索视频",
    functionName: "search",
    params: [
      { name: "keyword", title: "关键词", type: "input" },
      { name: "page", title: "页码", type: "page" }
    ]
  }
};

const PH_SITE = "https://www.pornhat.com";
const PH_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
function phHeaders() {
  return { "User-Agent": PH_UA, "Referer": PH_SITE + "/" };
}

function phSlugFromHref(href) {
  const m = String(href || "").match(/^\/video\/([a-z0-9\-]+)\/?$/i);
  return m ? m[1] : null;
}

function phParseDuration(text) {
  const t = String(text || "").trim();
  const parts = t.split(":").map((x) => parseInt(x, 10));
  if (parts.some((x) => isNaN(x))) return 0;
  let s = 0;
  for (const p of parts) s = s * 60 + p;
  return s;
}

async function phParseCards($) {
  const items = [];
  const seen = new Set();
  $(".item.thumb-bl.thumb-bl-video").each((i, el) => {
    const card = $(el);
    const a = card.find(".thumb a[href^=\"/video/\"]").first();
    const href = a.attr("href") || "";
    const slug = phSlugFromHref(href);
    if (!slug || seen.has(slug)) return;
    seen.add(slug);
    const img = a.find("img[data-original]").first();
    const cover = img.attr("data-original") || img.attr("src") || "";
    const title = (a.attr("title") || img.attr("alt") || "").trim();
    if (!title) return;
    const meta = card.find(".video-meta li span");
    const durationText = meta.eq(0).text().trim();
    const item = {
      id: "pornhat:" + slug,
      type: "video",
      mediaType: "movie",
      title: title,
      link: "pornhat:" + slug,
      coverUrl: cover,
      backdropPath: cover,
      duration: phParseDuration(durationText),
      durationText: durationText
    };
    items.push(item);
  });
  return items;
}

async function phFetchList(url) {
  const res = await Widget.http.get(url, { headers: phHeaders() });
  const html = res.data || "";
  const $ = await Widget.html.load(html);
  return phParseCards($);
}

async function loadList(params) {
  params = params || {};
  try {
    const sort = String(params.sort || "latest").trim();
    const page = Math.max(1, Number(params.page || 1) || 1);
    let base = PH_SITE + "/";
    if (sort === "popular") base = PH_SITE + "/popular/";
    else if (sort === "trending") base = PH_SITE + "/trending/";
    const url = page > 1 ? base + page + "/" : base;
    return await phFetchList(url);
  } catch (e) {
    return [];
  }
}

function phSortedListUrl(base, page, sort) {
  const p = Math.max(1, Number(page || 1) || 1);
  const s = String(sort || "post_date").trim() || "post_date";
  return base + (p > 1 ? p + "/" : "") + "?sort_by=" + encodeURIComponent(s);
}

async function loadTagList(params) {
  params = params || {};
  try {
    const custom = String(params.customTag || "").trim().toLowerCase().replace(/\s+/g, "-");
    const tag = custom || String(params.tag || "").trim().toLowerCase().replace(/\s+/g, "-");
    if (!tag) return await loadList({ sort: "latest", page: params.page });
    const base = PH_SITE + "/tags/" + encodeURIComponent(tag) + "/";
    return await phFetchList(phSortedListUrl(base, params.page, params.sort));
  } catch (e) {
    return [];
  }
}

async function loadModelList(params) {
  params = params || {};
  try {
    const custom = String(params.customModel || "").trim().toLowerCase().replace(/\s+/g, "-");
    const model = custom || String(params.model || "").trim().toLowerCase().replace(/\s+/g, "-");
    if (!model) return await loadList({ sort: "latest", page: params.page });
    const base = PH_SITE + "/models/" + encodeURIComponent(model) + "/";
    return await phFetchList(phSortedListUrl(base, params.page, params.sort));
  } catch (e) {
    return [];
  }
}

async function loadSiteList(params) {
  params = params || {};
  try {
    const custom = String(params.customSite || "").trim().toLowerCase().replace(/\s+/g, "-");
    const site = custom || String(params.site || "").trim().toLowerCase().replace(/\s+/g, "-");
    if (!site) return await loadList({ sort: "latest", page: params.page });
    const base = PH_SITE + "/sites/" + encodeURIComponent(site) + "/";
    return await phFetchList(phSortedListUrl(base, params.page, params.sort));
  } catch (e) {
    return [];
  }
}

async function search(params) {
  params = params || {};
  try {
    const keyword = String(params.keyword || "").trim();
    if (!keyword) return [];
    const page = Math.max(1, Number(params.page || 1) || 1);
    let url;
    if (page > 1) url = PH_SITE + "/search/" + encodeURIComponent(keyword) + "/" + page + "/";
    else url = PH_SITE + "/search/?q=" + encodeURIComponent(keyword);
    return await phFetchList(url);
  } catch (e) {
    return [];
  }
}

function phParseSlug(raw) {
  const s = String(raw || "").trim();
  let m = s.match(/^pornhat:([a-z0-9\-]+)$/i);
  if (m) return m[1];
  m = s.match(/^https?:\/\/(?:www\.)?pornhat\.com\/video\/([a-z0-9\-]+)\/?(?:[?#].*)?$/i);
  if (m) return m[1];
  return null;
}

function phTierRank(label) {
  const l = String(label || "").toLowerCase();
  if (l.indexOf("1080") >= 0) return 4;
  if (l.indexOf("720") >= 0) return 3;
  if (l.indexOf("480") >= 0) return 2;
  if (l.indexOf("360") >= 0) return 1;
  return 0;
}

async function loadDetail(link) {
  try {
    const slug = phParseSlug(link);
    if (!slug) throw new Error("无法识别的详情链接: " + link);
    const url = PH_SITE + "/video/" + slug + "/";
    const res = await Widget.http.get(url, { headers: phHeaders() });
    const html = res.data || "";
    const $ = await Widget.html.load(html);
    const title = ($("meta[property=\"og:title\"]").attr("content") || $("title").text().replace(/\s*-\s*PornHat\s*$/i, "")).trim();
    if (!title) return [];
    const poster = $("video").attr("poster") || $("meta[property=\"og:image\"]").attr("content") || "";
    const genreItems = [];
    const gseen = new Set();
    $("a[href^=\"/tags/\"]").each((i, a) => {
      const h = $(a).attr("href") || "";
      const m = h.match(/^\/tags\/([a-z0-9\-]+)\/?$/i);
      if (!m || gseen.has(m[1])) return;
      gseen.add(m[1]);
      genreItems.push({ id: "tag:" + m[1], title: $(a).text().trim() });
    });
    const peoples = [];
    const pseen = new Set();
    $("a[href^=\"/models/\"]").each((i, a) => {
      const h = $(a).attr("href") || "";
      const m = h.match(/^\/models\/([a-z0-9\-]+)\/?$/i);
      if (!m || pseen.has(m[1])) return;
      pseen.add(m[1]);
      peoples.push({ id: "model:" + m[1], title: $(a).text().trim() });
    });
    const relatedItems = [];
    const rseen = new Set();
    $("a[href^=\"/video/\"]").each((i, a) => {
      const h = $(a).attr("href") || "";
      const s2 = phSlugFromHref(h);
      if (!s2 || s2 === slug || rseen.has(s2)) return;
      rseen.add(s2);
      const img = $(a).find("img[data-original]").first();
      const cover = img.attr("data-original") || img.attr("src") || "";
      const t2 = ($(a).attr("title") || img.attr("alt") || "").trim();
      if (!t2) return;
      relatedItems.push({
        id: "pornhat:" + s2,
        type: "video",
        mediaType: "movie",
        title: t2,
        link: "pornhat:" + s2,
        coverUrl: cover,
        backdropPath: cover
      });
      if (relatedItems.length >= 8) return false;
    });
    return {
      id: "pornhat:" + slug,
      type: "video",
      mediaType: "movie",
      title: title,
      link: "pornhat:" + slug,
      coverUrl: poster,
      backdropPath: poster,
      genreItems: genreItems,
      peoples: peoples,
      relatedItems: relatedItems
    };
  } catch (e) {
    throw e;
  }
}

function phTierVariants(master) {
  const lines = String(master || "").split(/\r?\n/);
  const all = [];
  for (let i = 0; i < lines.length; i++) {
    const inf = lines[i].trim();
    if (inf.indexOf("#EXT-X-STREAM-INF") !== 0) continue;
    const resM = inf.match(/RESOLUTION=(\d+)x(\d+)/i);
    const bwM = inf.match(/BANDWIDTH=(\d+)/i);
    const h = resM ? parseInt(resM[2], 10) : 0;
    const bw = bwM ? parseInt(bwM[1], 10) : 0;
    let j = i + 1;
    while (j < lines.length && !lines[j].trim()) j++;
    const url = j < lines.length ? lines[j].trim() : "";
    if (!url || url.charAt(0) === "#" || !/^https?:\/\//i.test(url)) continue;
    all.push({ url: url, height: h, bandwidth: bw });
  }
  const byHeight = {};
  for (const v of all) {
    if (!byHeight[v.height] || v.bandwidth > byHeight[v.height].bandwidth) byHeight[v.height] = v;
  }
  const deduped = Object.keys(byHeight).map((k) => byHeight[k]).sort((a, b) => b.height - a.height || b.bandwidth - a.bandwidth);
  const high = deduped.filter((v) => v.height >= 720);
  if (high.length > 0) return high;
  if (deduped.length > 0) return [deduped[0]];
  const unknown = all.filter((v) => v.height === 0).sort((a, b) => b.bandwidth - a.bandwidth);
  if (unknown.length > 0) return [unknown[0]];
  return [];
}

async function loadResource(params) {
  params = params || {};
  try {
    const raw = params.link != null ? params.link : params.id;
    const slug = phParseSlug(raw);
    if (!slug) return [];
    const url = PH_SITE + "/video/" + slug + "/";
    const res = await Widget.http.get(url, { headers: phHeaders() });
    const html = res.data || "";
    const $ = await Widget.html.load(html);
    let best = null;
    let bestRank = -1;
    $("video source").each((i, s) => {
      const src = $(s).attr("src") || "";
      const label = $(s).attr("label") || "";
      if (!src || !/^https?:\/\//i.test(src)) return;
      if (/preview/i.test(src)) return;
      const rank = phTierRank(label);
      if (rank > bestRank) {
        bestRank = rank;
        best = { label: label || "播放", url: src };
      }
    });
    if (!best) return [];
    let lines = null;
    try {
      const mres = await Widget.http.get(best.url, { headers: phHeaders() });
      const master = mres.data || "";
      if (master.indexOf("#EXTM3U") !== -1) lines = phTierVariants(master);
    } catch (e) {}
    if (lines && lines.length > 0) {
      return lines.map((v) => ({
        name: v.height ? v.height + "p" : (best.label || "播放"),
        url: v.url,
        customHeaders: {
          "User-Agent": PH_UA,
          "Referer": PH_SITE + "/"
        },
        playerType: "app"
      }));
    }
    return [
      {
        name: best.label || "播放",
        url: best.url,
        customHeaders: {
          "User-Agent": PH_UA,
          "Referer": PH_SITE + "/"
        },
        playerType: "app"
      }
    ];
  } catch (e) {
    return [];
  }
}
