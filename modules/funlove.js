WidgetMetadata = {
  id: "funlove",
  title: "FunLove",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  description: "FC2PPV / JAV / China AV",
  author: "Coko",
  site: "https://funlove.info",
  iconurl: "https://tu.100923.xyz/file/1795036433091_funlove-icon-round.png",
  detailCacheDuration: 60,
  modules: [
    {
      id: "latest",
      title: "最新",
      functionName: "loadLatest",
      type: "video",
      cacheDuration: 0,
      params: [
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          enumOptions: [
            { title: "最新发布", value: "published" },
            { title: "最多观看", value: "view" },
            { title: "最多点赞", value: "like" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "popular",
      title: "热门",
      functionName: "loadPopular",
      type: "video",
      cacheDuration: 0,
      params: [
        {
          name: "period",
          title: "时间",
          type: "enumeration",
          enumOptions: [
            { title: "今日", value: "" },
            { title: "本周", value: "week" },
            { title: "本月", value: "month" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "category",
      title: "分类",
      functionName: "loadCategory",
      type: "video",
      cacheDuration: 0,
      params: [
        {
          name: "category",
          title: "分类",
          type: "enumeration",
          enumOptions: [
            { title: "69 style", value: "69-style" },
            { title: "Amateur", value: "amateur" },
            { title: "Beautiful girl", value: "beautiful-girl" },
            { title: "FC2", value: "fc2ppv" },
            { title: "Jav", value: "jav" },
            { title: "Breasts", value: "breasts" },
            { title: "Big tits", value: "big-tits" },
            { title: "China AV", value: "china-av" },
            { title: "Creampie", value: "creampie" },
            { title: "Cum shot", value: "cum-shot" },
            { title: "Doggy style", value: "doggy-style" },
            { title: "Group sex", value: "group-sex" },
            { title: "Gang bang", value: "gang-bang" },
            { title: "Nice Ass", value: "nice-ass" },
            { title: "Nice tits", value: "nice-tits" },
            { title: "Slender", value: "slender" },
            { title: "Sexy legs", value: "sexy-legs" },
            { title: "Heyzo", value: "heyzo" },
            { title: "Pacopacomama", value: "pacopacomama" },
            { title: "Caribbeancom", value: "caribbeancom" },
            { title: "10musume", value: "10musume" },
            { title: "1Pondo", value: "1pondo" },
            { title: "Taiwan AV", value: "taiwan-av" },
            { title: "Kin8tengoku", value: "kin8tengoku" },
            { title: "H4610", value: "h4610" },
            { title: "Big Cock", value: "big-cock" }
          ]
        },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          enumOptions: [
            { title: "最新发布", value: "published" },
            { title: "最多观看", value: "view" },
            { title: "最多点赞", value: "like" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "actress",
      title: "女优作品",
      functionName: "loadActress",
      type: "video",
      cacheDuration: 0,
      params: [
        {
          name: "actress",
          title: "女优",
          type: "enumeration",
          enumOptions: [
            { title: "Miyu Morita", value: "miyu-morita" },
            { title: "Rino Sakuragi", value: "rino-sakuragi" },
            { title: "Momoka Ogawa", value: "momoka-ogawa" },
            { title: "Emiri Momota", value: "emiri-momota" },
            { title: "Eri Saeki", value: "eri-saeki" },
            { title: "Wu Mengmeng", value: "wu-mengmeng" },
            { title: "Honoka Orihara", value: "honoka-orihara" },
            { title: "Nana Kamiyama", value: "nana-kamiyama" },
            { title: "Ryu Enami", value: "ryu-enami" },
            { title: "Mio Futaba", value: "mio-futaba" },
            { title: "Mirai Minano - 皆野みらい", value: "mirai-minano-" },
            { title: "Mai Shirakawa", value: "mai-shirakawa" },
            { title: "Yui Hatano", value: "yui-hatano" },
            { title: "Hina Hodaka", value: "hina-hodaka" },
            { title: "Ema Kato", value: "ema-kato" },
            { title: "Reika Kudo", value: "reika-kudo" },
            { title: "Yui Kisaragi", value: "yui-kisaragi" },
            { title: "Maki Koizumi", value: "maki-koizumi" },
            { title: "Miki Hoshino", value: "miki-hoshino" },
            { title: "Non Suzumiya", value: "non-suzumiya" }
          ]
        },
        {
          name: "actressCustom",
          title: "自定义女优",
          type: "input",
          placeholders: [{ title: "填女优英文名，如 yui-hatano", value: "" }]
        }
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
    id: "search",
    title: "搜索",
    functionName: "search",
    params: [
      { name: "keyword", title: "关键词", type: "input" },
      { name: "page", title: "页码", type: "page" }
    ]
  }
};

const FL_API = "https://funlove.pro/api/product";
const FL_SITE = "https://funlove.info";
const FL_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
const FL_STUDIOS = {
  fc2ppv: "FC2PPV",
  caribbeancom: "Caribbeancom",
  "10musume": "10musume",
  "1pondo": "1Pondo",
  heyzo: "Heyzo",
  pacopacomama: "Pacopacomama",
  kin8tengoku: "Kin8tengoku",
  h4610: "H4610"
};

async function flGet(path, query) {
  const options = { headers: { Referer: FL_SITE + "/", "User-Agent": FL_UA } };
  if (query) options.params = query;
  const res = await Widget.http.get(FL_API + path, options);
  const body = res.data;
  if (!body || body.code !== 200 || !body.data) throw new Error("funlove 接口返回异常");
  return body.data;
}

function flCode(name, slug) {
  const m = String(slug || "").match(/^([a-z0-9]+)-(\d[\d-]*)$/);
  if (m && FL_STUDIOS[m[1]]) return FL_STUDIOS[m[1]] + " " + m[2];
  const f = String(name || "").match(/^FC2PPV\s*[- ]?\s*(\d+)/i);
  if (f) return "FC2PPV " + f[1];
  return name;
}

function flItem(v) {
  if (!v || !v.slug) return null;
  const title = flCode(v.name, v.slug);
  const item = {
    id: v.slug,
    type: "video",
    title: title,
    link: "funlove:" + v.slug,
    coverUrl: v.image,
    backdropPath: v.image,
    durationText: v.duration || ""
  };
  if (v.name && v.name !== title) item.description = v.name;
  const sub = [];
  const views = Number(v.view || 0);
  if (views > 0) sub.push(views + "次观看");
  if (v.published) sub.push(v.published);
  if (sub.length) item.subtitle = sub.join(" · ");
  return item;
}

function flListItems(data) {
  const videos = (data && data.videos) || [];
  return videos.map(flItem).filter(Boolean);
}

function flParseLink(link) {
  const s = String(link || "").trim();
  let m = s.match(/^funlove:([A-Za-z0-9][A-Za-z0-9\-_]*)$/);
  if (m) return m[1];
  m = s.match(/^https?:\/\/funlove\.info\/movie\/([A-Za-z0-9][A-Za-z0-9\-_]*)/);
  if (m) return m[1];
  return null;
}

async function loadLatest(params = {}) {
  try {
    const page = Math.max(1, Number(params.page || 1));
    const sort = params.sort || "published";
    const data = await flGet("/movies/" + page, { sort: sort });
    return flListItems(data);
  } catch (e) {
    console.error("[loadLatest] 失败:", e.message || e);
    throw e;
  }
}

async function loadPopular(params = {}) {
  try {
    const page = Math.max(1, Number(params.page || 1));
    const period = params.period || "";
    const query = period ? { sort: period } : null;
    const data = await flGet("/popular/" + page, query);
    return flListItems(data);
  } catch (e) {
    console.error("[loadPopular] 失败:", e.message || e);
    throw e;
  }
}

async function loadCategory(params = {}) {
  try {
    let alias = "";
    const genreId = String(params.genreId || "");
    if (genreId.indexOf("cat:") === 0) alias = genreId.slice(4);
    else alias = params.category || "69-style";
    const page = Math.max(1, Number(params.page || 1));
    const sort = params.sort || "published";
    const data = await flGet("/categories/" + alias + "/" + page, { sort: sort });
    return flListItems(data);
  } catch (e) {
    console.error("[loadCategory] 失败:", e.message || e);
    throw e;
  }
}

async function loadActress(params = {}) {
  try {
    let alias = "";
    const peopleId = String(params.peopleId || "");
    if (peopleId.indexOf("star:") === 0) alias = peopleId.slice(5);
    else if (params.actressCustom) alias = String(params.actressCustom).trim().toLowerCase().replace(/\s+/g, "-");
    else alias = params.actress || "miyu-morita";
    const data = await flGet("/pornstar/" + alias);
    const videos = (data.detail && data.detail.videos) || [];
    return videos.map(flItem).filter(Boolean);
  } catch (e) {
    console.error("[loadActress] 失败:", e.message || e);
    throw e;
  }
}

async function search(params = {}) {
  try {
    const keyword = String(params.keyword || "").trim();
    if (!keyword) return [];
    const page = Math.max(1, Number(params.page || 1));
    const data = await flGet("/movies/" + page, { keyword: keyword });
    return flListItems(data);
  } catch (e) {
    console.error("[search] 失败:", e.message || e);
    throw e;
  }
}

async function loadDetail(link) {
  try {
    const slug = flParseLink(link);
    if (!slug) throw new Error("无法识别的详情链接: " + link);
    const data = await flGet("/movie/" + slug);
    const movie = data.movie;
    if (!movie) return [];
    const item = flItem(movie);
    if (!item) return [];
    item.genreItems = (movie.categories || []).map(function (c) {
      return { id: "cat:" + c.alias, title: c.title };
    });
    item.peoples = (movie.pornstars || []).map(function (p) {
      return { id: "star:" + p.alias, title: p.name, avatar: p.image };
    });
    if (movie.published) item.releaseDate = movie.published;
    const suggested = (data.suggested || []).map(flItem).filter(Boolean);
    if (suggested.length) item.relatedItems = suggested;
    return item;
  } catch (e) {
    console.error("[loadDetail] 失败:", e.message || e);
    throw e;
  }
}

async function loadResource(params = {}) {
  const candidates = [];
  if (params) {
    if (params.link) candidates.push(params.link);
    if (params.id) candidates.push(params.id);
    if (params.item) {
      if (params.item.link) candidates.push(params.item.link);
      if (params.item.id) candidates.push(params.item.id);
    }
  }
  let slug = null;
  for (const c of candidates) {
    slug = flParseLink(c);
    if (slug) break;
  }
  if (!slug) return [];
  let data;
  try {
    data = await flGet("/movie/" + slug);
  } catch (e) {
    console.error("[loadResource] 失败:", e.message || e);
    return [];
  }
  const movie = data.movie;
  const sources = (movie && movie.sources) || [];
  const lines = [];
  for (const s of sources) {
    if (!s || !s.file) continue;
    const label = Number(s.label || 0);
    const name = (s.name || "线路") + (label ? " " + label + "P" : "");
    lines.push({
      name: name,
      url: s.file,
      customHeaders: { Referer: FL_SITE + "/", "User-Agent": FL_UA },
      playerType: "app"
    });
  }
  return lines;
}
