const GA_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

const GA_HOSTS = [ "https://getav.me", "https://getav.co", "https://getav.live", "https://getav.top", "https://getav.net" ];

const GA_STATIC = "https://static.worldstatic.com";

const GA_LINK = "getav:";

const GA_PAGE_SIZE = 20;

const GA_DMM_PREFIX_MAP = {
    FSDSS: "1", FCDSS: "1", FNS: "1", FTHTD: "1", FALENO: "1", FGAN: "1",
    FSNF: "1", FLAV: "1", NHDTC: "1", KUSE: "1", SDNM: "1", STARS: "1",
    STAR: "1", START: "1", SODS: "1", MOGI: "1", FTAV: "1", WSA: "2",
    MBDD: "301", REBD: "h_346", REBDB: "h_346", GSHRB: "h_346",
    NAAC: "h_706", MAAN: "h_1711"
};

function gaDmmContentId(code) {
    const m = String(code || "").toUpperCase().match(/^([A-Z]{2,6})-?(\d{2,6})([A-Z]?)$/);
    if (!m) return "";
    const prefix = m[1], num5 = m[2].padStart(5, "0"), suffix = (m[3] || "").toLowerCase();
    const np = GA_DMM_PREFIX_MAP[prefix] || "";
    return np + prefix.toLowerCase() + num5 + suffix;
}

function gaDmmPoster(code) {
    const cid = gaDmmContentId(code);
    if (!cid) return "";
    return "https://awsimgsrc.dmm.co.jp/pics_dig/digital/video/" + cid + "/" + cid + "ps.jpg";
}

const GA_POSTER_MIN_RANGE = "bytes=100000-100000";

async function gaProbePoster(url) {
    if (!url) return false;
    try {
        const res = await Widget.http.get(url, {
            headers: { "User-Agent": GA_UA, "Range": GA_POSTER_MIN_RANGE }
        });
        const status = res && (res.status || res.statusCode);
        return status === 200 || status === 206;
    } catch (e) {
        return false;
    }
}

const GA_DMM_CACHE_KEY = "getav_dmmcover";
const GA_DMM_CACHE_MAX = 500;
const GA_DMM_MISS_TTL = 24 * 3600 * 1000;
function gaDmmCacheGet() {
    try {
        const raw = Widget.storage.get(GA_DMM_CACHE_KEY);
        const o = raw ? JSON.parse(raw) : null;
        return o && typeof o === "object" ? o : {};
    } catch (e) {
        return {};
    }
}
function gaDmmCacheSet(map) {
    try {
        const keys = Object.keys(map);
        while (keys.length > GA_DMM_CACHE_MAX) delete map[keys.shift()];
        Widget.storage.set(GA_DMM_CACHE_KEY, JSON.stringify(map));
    } catch (e) {}
}

async function gaFillPosters(items) {
    const cache = gaDmmCacheGet();
    const now = Date.now();
    const jobs = items.map(async (it) => {
        if (!it || it.posterPath) return;
        const code = String(it.id || "").toUpperCase();
        
        if (/^FC2/i.test(code) || /^\d{6,}-\d{3,}$/.test(code)) return;
        const hit = cache[code];
        if (hit && (hit.u || now - hit.t < GA_DMM_MISS_TTL)) {
            if (hit.u) it.posterPath = hit.u;
            return;
        }
        const url = gaDmmPoster(code);
        const ok = url ? await gaProbePoster(url) : false;
        cache[code] = { u: ok ? url : "", t: Date.now() };
        if (ok) it.posterPath = url;
    });
    await Promise.all(jobs);
    gaDmmCacheSet(cache);
    
    await gaFillJavdbPosters(items);
    return items;
}

const GA_JAVDB_SEARCH = "https://javdb.com/search?q=";
const GA_JAVDB_TIMEOUT = 9000;
const GA_JAVDB_CONCURRENCY = 4;
const GA_JAVDB_STAGE_TIMEOUT = 15000;
const GA_JDB_CACHE_KEY = "getav_jdbcover";
const GA_JDB_CACHE_MAX = 300;
const GA_JDB_MISS_TTL = 24 * 3600 * 1000;

function gaNormCode(s) {
    return String(s || "").toUpperCase().replace(/-/g, "");
}

function gaJdbCacheGet() {
    try {
        const raw = Widget.storage.get(GA_JDB_CACHE_KEY);
        const o = raw ? JSON.parse(raw) : null;
        return o && typeof o === "object" ? o : {};
    } catch (e) {
        return {};
    }
}

function gaJdbCacheSet(map) {
    try {
        const keys = Object.keys(map);
        while (keys.length > GA_JDB_CACHE_MAX) delete map[keys.shift()];
        Widget.storage.set(GA_JDB_CACHE_KEY, JSON.stringify(map));
    } catch (e) {}
}

async function gaJavdbCover(code) {
    const res = await Widget.http.get(GA_JAVDB_SEARCH + encodeURIComponent(code) + "&f=all", {
        headers: {
            "User-Agent": GA_UA,
            "Accept": "text/html,application/xhtml+xml",
            "Accept-Language": "zh-CN,zh;q=0.9"
        },
        timeout: GA_JAVDB_TIMEOUT
    });
    const html = String(res && res.data || "");
    if (!html || html.length < 2000) return "";
    if (/Just a moment|cf-browser-verification|Attention Required|Cloudflare/i.test(html)) return "";
    const $ = Widget.html.load(html);
    const want = gaNormCode(code);
    let cover = "";
    $("a.box").each((_, el) => {
        if (cover) return;
        try {
            const box = $(el);
            let t = String(box.find(".video-title strong").first().text() || "").trim();
            if (!t) t = String(box.find(".video-title").first().text() || "").trim();
            const nt = gaNormCode(t);
            if (!nt || (nt.indexOf(want) !== 0 && want.indexOf(nt) !== 0)) return;
            const img = box.find(".cover img").first();
            cover = img.attr("data-src") || img.attr("src") || "";
        } catch (e) {}
    });
    cover = String(cover || "").trim();
    if (cover.indexOf("//") === 0) cover = "https:" + cover;
    return /^https?:\/\//i.test(cover) ? cover : "";
}

async function gaPool(jobs, limit, deadlineMs) {
    let idx = 0;
    const workers = [];
    const n = Math.min(limit, jobs.length);
    for (let w = 0; w < n; w++) {
        workers.push((async () => {
            while (idx < jobs.length) {
                
                if (deadlineMs && Date.now() > deadlineMs) return;
                const i = idx++;
                try {
                    await jobs[i]();
                } catch (e) {}
            }
        })());
    }
    await Promise.all(workers);
}

async function gaFillJavdbPosters(items) {
    const list = (items || []).filter(it => it && !it.posterPath && String(it.id || "").trim());
    if (!list.length) return;
    const cache = gaJdbCacheGet();
    const now = Date.now();
    const jobs = [];
    list.forEach(it => {
        const code = String(it.id).toUpperCase();
        const hit = cache[code];
        if (hit && (hit.u || now - hit.t < GA_JDB_MISS_TTL)) {
            if (hit.u) it.posterPath = hit.u;
            return;
        }
        jobs.push(async () => {
            let u = "";
            try {
                u = await gaJavdbCover(code);
            } catch (e) {
                u = "";
            }
            cache[code] = { u: u, t: Date.now() };
            if (u) it.posterPath = u;
        });
    });
    if (!jobs.length) return;
    
    await gaPool(jobs, GA_JAVDB_CONCURRENCY, Date.now() + GA_JAVDB_STAGE_TIMEOUT);
    gaJdbCacheSet(cache);
}

WidgetMetadata = {
    id: "rex.getav",
    title: "GetAV",
    version: "1.1.20",
    requiredVersion: "0.0.1",
    description: "Getav视频",
    author: "Coko",
    site: "https://getav.info",
    iconurl: "https://getav.me/favicon.ico",
    detailCacheDuration: 300,
    modules: [ {
        id: "latest",
        title: "最新",
        description: "最新作品（可按发行/上传/更新排序）",
        functionName: "loadLatest",
        cacheDuration: 600,
        params: [ {
            name: "sort",
            title: "排序",
            type: "enumeration",
            value: "releaseDate",
            enumOptions: [ { title: "发行日期", value: "releaseDate" }, { title: "上传日期", value: "uploadDate" }, { title: "内容更新", value: "updatedAt" } ]
        }, {
            name: "page",
            title: "页码",
            type: "page"
        } ]
    }, {
        id: "hot",
        title: "人气榜",
        description: "按人气排序（今日 / 本周 / 本月 / 总榜）",
        functionName: "loadHot",
        cacheDuration: 600,
        params: [ {
            name: "period",
            title: "榜单",
            type: "enumeration",
            value: "weekly",
            enumOptions: [ {
                title: "本周人气",
                value: "weekly"
            }, {
                title: "今日人气",
                value: "daily"
            }, {
                title: "本月人气",
                value: "monthly"
            }, {
                title: "总人气",
                value: "total"
            } ]
        }, {
            name: "page",
            title: "页码",
            type: "page"
        } ]
    }, {
        id: "category",
        title: "分类",
        description: "最新 / 新片 / 无码 / 有码 / 字幕 / 4K",
        functionName: "loadCategory",
        cacheDuration: 600,
        params: [ {
            name: "category",
            title: "分类",
            type: "enumeration",
            value: "new-releases",
            enumOptions: [ {
                title: "最新",
                value: "latest"
            }, {
                title: "新片",
                value: "new-releases"
            }, {
                title: "无码",
                value: "uncensored"
            }, {
                title: "有码",
                value: "censored"
            }, {
                title: "字幕",
                value: "subtitle"
            }, {
                title: "4K",
                value: "4k"
            } ]
        }, {
            name: "sortBy",
            title: "排序",
            type: "enumeration",
            value: "latest",
            enumOptions: [ {
                title: "最新",
                value: "latest"
            }, {
                title: "最热",
                value: "popular"
            }, {
                title: "评分",
                value: "rating"
            }, {
                title: "收藏",
                value: "favorites"
            }, {
                title: "发行日期",
                value: "releaseDate"
            }, {
                title: "时长",
                value: "duration"
            } ]
        }, {
            name: "page",
            title: "页码",
            type: "page"
        } ]
    }, {
        id: "genre",
        title: "按类型",
        description: "按题材标签浏览（也可在详情页点标签直接进入）",
        functionName: "loadGenre",
        cacheDuration: 600,
        params: [ {
            name: "genreId",
            title: "类型",
            type: "enumeration",
            value: "1",
            enumOptions: [ {
                title: "高画质",
                value: "7"
            }, {
                title: "单人作品",
                value: "4"
            }, {
                title: "DMM独家",
                value: "5"
            }, {
                title: "巨乳",
                value: "1"
            }, {
                title: "内射",
                value: "148"
            }, {
                title: "4K",
                value: "6"
            }, {
                title: "已婚妇女",
                value: "35"
            }, {
                title: "出轨",
                value: "24"
            }, {
                title: "无码破解",
                value: "232"
            }, {
                title: "熟女",
                value: "187"
            }, {
                title: "苗条",
                value: "18"
            }, {
                title: "数字马赛克",
                value: "183"
            }, {
                title: "白天出轨",
                value: "250"
            }, {
                title: "剧情",
                value: "25"
            }, {
                title: "荡妇",
                value: "43"
            }, {
                title: "口交",
                value: "28"
            }, {
                title: "花痴",
                value: "27"
            }, {
                title: "淫乱真实",
                value: "229"
            }, {
                title: "乳交",
                value: "8"
            }, {
                title: "多P",
                value: "3"
            }, {
                title: "姐姐",
                value: "12"
            }, {
                title: "高潮",
                value: "11"
            }, {
                title: "潮吹",
                value: "16"
            }, {
                title: "女上位",
                value: "36"
            }, {
                title: "接吻",
                value: "238"
            }, {
                title: "通奸",
                value: "22"
            }, {
                title: "薄马赛克",
                value: "224"
            }, {
                title: "白领女性",
                value: "31"
            }, {
                title: "戏剧",
                value: "601"
            }, {
                title: "颜射",
                value: "59"
            }, {
                title: "连裤袜",
                value: "20"
            }, {
                title: "素人作品",
                value: "233"
            }, {
                title: "美乳",
                value: "253"
            }, {
                title: "乳房",
                value: "29"
            }, {
                title: "流汗",
                value: "258"
            }, {
                title: "汗流浃背",
                value: "100"
            }, {
                title: "屁股",
                value: "69"
            }, {
                title: "恋腿癖",
                value: "79"
            }, {
                title: "女教师",
                value: "21"
            }, {
                title: "大屁股",
                value: "230"
            }, {
                title: "巨臀",
                value: "54"
            }, {
                title: "姐妹",
                value: "68"
            }, {
                title: "乱交",
                value: "73"
            }, {
                title: "妹妹",
                value: "239"
            }, {
                title: "制服",
                value: "57"
            }, {
                title: "主观视角",
                value: "71"
            }, {
                title: "恋乳癖",
                value: "14"
            }, {
                title: "母亲",
                value: "61"
            }, {
                title: "美臀",
                value: "240"
            }, {
                title: "偶像艺人",
                value: "17"
            }, {
                title: "深喉",
                value: "88"
            }, {
                title: "纪录片",
                value: "15"
            }, {
                title: "第一人称视角",
                value: "46"
            }, {
                title: "乳液",
                value: "62"
            }, {
                title: "偶像",
                value: "234"
            }, {
                title: "超乳",
                value: "13"
            }, {
                title: "淫语",
                value: "49"
            }, {
                title: "原作联动",
                value: "97"
            }, {
                title: "后宫",
                value: "109"
            }, {
                title: "婆婆",
                value: "195"
            } ]
        }, {
            name: "page",
            title: "页码",
            type: "page"
        } ]
    }, {
        id: "loadResource",
        title: "播放线路",
        description: "起播时实时获取最新直链（签名地址）",
        functionName: "loadResource",
        type: "stream",
        cacheDuration: 0,
        params: []
    } ],
    search: {
        title: "搜索",
        functionName: "search",
        params: [ {
            name: "keyword",
            title: "关键词",
            type: "input",
            placeholders: [ {
                title: "番号，如 HUNTC-385",
                value: "HUNTC-385"
            }, {
                title: "片名 / 演员",
                value: "松本"
            } ]
        }, {
            name: "page",
            title: "页码",
            type: "page"
        } ]
    }
};

let _hostIdx = 0;

const _detailCache = {};

function gaHosts() {
    const list = GA_HOSTS.slice();
    let cached = "";
    try {
        cached = Widget.storage.get("getav_host");
    } catch (e) {
        cached = "";
    }
    if (typeof cached === "string" && cached.indexOf("https://") === 0 && list.indexOf(cached) < 0) {
        list.unshift(cached);
    }
    return list;
}

function gaHeaders(host) {
    return {
        "User-Agent": GA_UA,
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        Referer: host + "/zh",
        Origin: host
    };
}

function gaParseBody(res) {
    if (!res) return null;
    let body = res.data !== undefined ? res.data : res;
    if (typeof body === "string") {
        try {
            body = JSON.parse(body);
        } catch (e) {
            return null;
        }
    }
    if (body && body.success === false) return null;
    return body;
}

async function gaApi(path) {
    const hosts = gaHosts();
    let lastErr = "";
    for (let i = 0; i < hosts.length; i++) {
        const idx = (_hostIdx + i) % hosts.length;
        const host = hosts[idx];
        try {
            const res = await Widget.http.get(host + path, {
                headers: gaHeaders(host)
            });
            const body = gaParseBody(res);
            if (body && body.data !== undefined) {
                _hostIdx = idx;
                try {
                    Widget.storage.set("getav_host", host);
                } catch (e) {}
                return body.data;
            }
            lastErr = "空响应";
        } catch (e) {
            lastErr = e && e.message || String(e);
        }
    }
    throw new Error("GetAV 请求失败（镜像均不可用）：" + lastErr);
}

function gaImg(raw) {
    const s = String(raw == null ? "" : raw).trim();
    if (!s) return "";
    if (s.indexOf("//") === 0) return "https:" + s;
    if (/^https?:\/\//i.test(s)) return s;
    return GA_STATIC + (s.charAt(0) === "/" ? s : "/" + s);
}

function gaSeconds(secs) {
    const s = parseInt(secs, 10);
    if (!isFinite(s) || s <= 0) return "";
    const pad = n => n < 10 ? "0" + n : String(n);
    const h = Math.floor(s / 3600);
    const m = Math.floor(s % 3600 / 60);
    const sec = s % 60;
    return h > 0 ? pad(h) + ":" + pad(m) + ":" + pad(sec) : pad(m) + ":" + pad(sec);
}

function gaDurationText(m) {
    const t = String(m.durationFormatted || "").replace(/\.\d+$/, "");
    return t || gaSeconds(m.videoLength || m.durationSeconds);
}

function gaPageNum(params) {
    const p = Number(params && params.page || 1);
    return !p || p < 1 ? 1 : p;
}

function gaInjected(params) {
    const people = String(params && params.peopleId || "").trim();
    if (people) return {
        kind: "star",
        id: people
    };
    const genre = String(params && params.genreId || "").trim();
    if (genre) return {
        kind: "genre",
        id: genre
    };
    return null;
}

function gaTitle(raw, code) {
    return String(code || "").trim() || String(raw == null ? "" : raw).trim();
}

function gaStripLeadingCode(text, code) {
    const s = String(text == null ? "" : text);
    const c = String(code || "").trim();
    if (!s || !c) return s;
    const head = s.trim();
    if (head.toUpperCase().indexOf(c.toUpperCase()) !== 0) return s;
    const rest = head.slice(c.length);
    
    if (rest && !/^[\s:：\-–—「」【】『』()（）]/.test(rest)) return s;
    return rest.replace(/^[\s:：\-–—「」【】『』()（）]+/, "").trim();
}

function gaItem(m) {
    const code = String(m.id || "").trim();
    const fullTitle = String(m.title == null ? "" : m.title).trim();
    const item = {
        id: code,
        type: "url",
        mediaType: "movie",
        link: GA_LINK + code + (fullTitle ? "#" + encodeURIComponent(fullTitle) : ""),
        title: code.toUpperCase(),
        description: gaStripLeadingCode(fullTitle, code),
        backdropPath: gaImg(m.localImg || m.img),
        releaseDate: String(m.date || "").slice(0, 10)
    };
    const dur = Number(m.videoLength || m.durationSeconds || 0);
    if (dur > 0) item.duration = dur;
    if (m.videoLength || m.durationSeconds) item.durationText = gaDurationText(m);
    return item;
}

async function gaList(data) {
    const items = (data.movies || []).map(gaItem);
    return gaFillPosters(items);
}

const GA_FOLDER_API = {
    genre: "genres",
    star: "stars",
    studio: "studios",
    code: "codes"
};

async function gaListByFolder(kind, id, page, sortBy) {
    const plural = GA_FOLDER_API[kind];
    if (!plural || !id) return [];
    const path = "/api/" + plural + "/" + encodeURIComponent(id) + "?page=" + page + "&limit=" + GA_PAGE_SIZE + "&sortBy=" + sortBy + "&locale=zh";
    const data = await gaApi(path);
    return gaList(data);
}

function gaMoviesApi(category, sortBy, page) {
    return gaApi("/api/movies?category=" + encodeURIComponent(category) + "&sortBy=" + encodeURIComponent(sortBy) + "&limit=" + GA_PAGE_SIZE + "&page=" + page + "&locale=zh");
}

async function loadLatest(params) {
    const page = gaPageNum(params);
    const inj = gaInjected(params);
    const sort = String(params && params.sort || "releaseDate");
    if (inj) return gaListByFolder(inj.kind, inj.id, page, "latest");
    return gaList(await gaMoviesApi("latest", sort, page));
}

async function loadHot(params) {
    const page = gaPageNum(params);
    const inj = gaInjected(params);
    if (inj) return gaListByFolder(inj.kind, inj.id, page, "popular");
    const period = String(params && params.period || "weekly");
    return gaList(await gaMoviesApi("hot", period, page));
}

async function loadCategory(params) {
    const page = gaPageNum(params);
    const inj = gaInjected(params);
    if (inj) return gaListByFolder(inj.kind, inj.id, page, "latest");
    const category = String(params && params.category || "new-releases");
    const sortBy = String(params && params.sortBy || "latest");
    return gaList(await gaMoviesApi(category, sortBy, page));
}

async function loadGenre(params) {
    const page = gaPageNum(params);
    const id = String(params && params.genreId || "1").trim();
    if (!id) return [];
    return gaListByFolder("genre", id, page, "latest");
}

async function loadStar(params) {
    const page = gaPageNum(params);
    const id = String(params && (params.starId || params.peopleId) || "").trim();
    if (!id) return [];
    return gaListByFolder("star", id, page, "popular");
}

async function search(params) {
    const page = gaPageNum(params);
    const kw = String(params && params.keyword || "").trim();
    if (!kw) return [];
    const data = await gaApi("/api/search?q=" + encodeURIComponent(kw) + "&page=" + page + "&limit=" + GA_PAGE_SIZE + "&locale=zh");
    return gaList(data);
}

async function gaFetchDetail(code) {
    const key = String(code || "").trim().toUpperCase();
    if (!key) return null;
    const hit = _detailCache[key];
    const now = Date.now();
    if (hit && now - hit.at < 5 * 60 * 1e3) return hit.data;
    let data = null;
    try {
        data = await gaApi("/api/movies/" + encodeURIComponent(key));
    } catch (e) {
        return null;
    }
    if (!data || !data.id && !data.title) return null;
    _detailCache[key] = {
        at: now,
        data: data
    };
    return data;
}

function gaDescription(data, code, zhTitle) {
    
    let body = zhTitle || data.description || data.plot || data.titleEn || "";
    if (!body && data.title) {
        const t = String(data.title).trim();
        if (t && t.toUpperCase() !== String(code || "").toUpperCase()) body = t;
    }
    body = gaStripLeadingCode(body, code);
    const lines = [];
    if (body) lines.push(String(body), "");
    lines.push("番号: " + String(data.id || code).toUpperCase());
    const dur = gaDurationText(data);
    if (dur) lines.push("时长: " + dur);
    if (data.date) lines.push("发行: " + String(data.date).slice(0, 10));
    return lines.join("\n");
}

function gaDetailItem(data, code, zhTitle) {
    const poster = gaImg(data.localImg || data.img);
    const item = {
        id: code,
        type: "url",
        mediaType: "movie",
        link: GA_LINK + code,
        title: gaTitle(data.title, code),
        posterPath: poster,
        backdropPath: poster,
        releaseDate: String(data.date || "").slice(0, 10),
        description: gaDescription(data, code, zhTitle)
    };
    const dur = Number(data.videoLength || data.durationSeconds || 0);
    if (dur > 0) item.duration = dur;
    if (dur > 0) item.durationText = gaDurationText(data);
    const genres = (data.genres || []).filter(g => g && g.id && g.name);
    if (genres.length) {
        item.genreItems = genres.map(g => ({
            id: String(g.id),
            title: g.name
        }));
    }
    const stars = (data.stars || []).filter(s => s && s.id && s.name);
    if (stars.length) {
        item.peoples = stars.map(s => ({
            id: String(s.id),
            title: s.name,
            avatar: gaImg(s.localAvatar || s.avatar),
            role: Number(s.gender) === 1 ? "男优" : "女优"
        }));
    }
    const stills = (data.samples || []).map(s => gaImg(s && (s.url || s.path || s))).filter(Boolean);
    if (stills.length) item.backdropPaths = stills;
    const preview = gaImg(data.previewVideoUrl);
    if (preview) {
        item.previewUrl = preview;
        item.trailers = [ {
            coverUrl: poster,
            url: preview
        } ];
    }
    const related = (data.relatedMovies || []).filter(m => m && m.id).map(gaItem);
    if (related.length) item.relatedItems = related;
    return item;
}

async function gaRelatedFallback(data, selfId) {
    const genres = (data.genres || []).filter(g => g && g.id);
    if (!genres.length) return [];
    try {
        const same = await gaListByFolder("genre", String(genres[0].id), 1, "latest");
        return same.filter(m => String(m.id).toUpperCase() !== String(selfId).toUpperCase()).slice(0, 12);
    } catch (e) {
        return [];
    }
}

async function loadDetail(link) {
    const raw = String(link || "");
    if (raw.indexOf(GA_LINK) !== 0) return null;
    
    const hashIdx = raw.indexOf("#");
    const code = (hashIdx >= 0 ? raw.slice(GA_LINK.length, hashIdx) : raw.slice(GA_LINK.length)).trim();
    let zhTitle = "";
    if (hashIdx >= 0) {
        try {
            zhTitle = decodeURIComponent(raw.slice(hashIdx + 1));
        } catch (e) {
            zhTitle = "";
        }
    }
    if (!code) return null;
    const data = await gaFetchDetail(code);
    if (!data) return null;
    const item = gaDetailItem(data, data.id || code, zhTitle);
    if (!item.relatedItems || !item.relatedItems.length) {
        const related = await gaRelatedFallback(data, item.id);
        if (related.length) item.relatedItems = related;
    }
    return item;
}

function gaLineName(type) {
    const t = String(type || "").toLowerCase();
    let res = "";
    if (t.indexOf("4k") >= 0) res = "4K";
    else {
        const m = t.match(/(\d{3,4})p/);
        if (m) res = m[1] + "P";
    }
    let tag = "";
    const pm = t.match(/^(uc|cn|sub|raw)_/);
    if (pm) tag = pm[1] === "cn" ? "中字" : pm[1].toUpperCase();
    return {
        name: res || String(type || "线路"),
        tag: tag
    };
}

function gaRank(label) {
    const l = String(label || "").toLowerCase();
    if (l.indexOf("4k") >= 0) return 2160;
    const m = l.match(/(\d{3,4})/);
    return m ? parseInt(m[1], 10) : 0;
}

function gaPlayLines(data) {
    const out = [];
    const seen = {};
    const push = (type, url) => {
        const u = gaHlsUrl(String(url || "").trim());
        if (!u || seen[u]) return;
        seen[u] = 1;
        const nm = gaLineName(type);
        out.push({
            name: nm.name,
            tag: nm.tag,
            url: u,
            rank: gaRank(nm.name)
        });    };
    const srcs = (data.videoSources || []).slice().sort((a, b) => (Number(b.priority) || 0) - (Number(a.priority) || 0));
    for (let i = 0; i < srcs.length; i++) {
        const s = srcs[i] || {};
        push(s.type, s.url);
    }
    if (!out.length) {
        push("4K", data.localM3u8Path4k);
        push("1080P", data.localM3u8Path);
        push("中文字幕版", data.localM3u8PathCn);
        push("无码", data.localM3u8PathUc);
    }
    out.sort((a, b) => b.rank - a.rank);
    
    const dup = {};
    out.forEach(l => {
        const base = l.name;
        dup[base] = (dup[base] || 0) + 1;
        if (dup[base] > 1) l.name = base + " · " + (l.tag || "线路" + dup[base]);
    });
    return out;
}

function gaCodeFromParams(params) {
    const p = params || {};
    const link = String(p.link || "");
    if (link.indexOf(GA_LINK) === 0) {
        
        const rest = link.slice(GA_LINK.length);
        const hashIdx = rest.indexOf("#");
        return (hashIdx >= 0 ? rest.slice(0, hashIdx) : rest).trim();
    }
    // 跨模块：从 id/link/title 里提取番号（如 missav 的 URL 里带 pred-847）
    const raw = String(p.id || "") + " " + link + " " + String(p.title || "");
    const m = raw.toUpperCase().match(/([A-Z]{2,6})-?(\d{2,6})([A-Z]?)(?![A-Z0-9])/);
    if (m) {
        const code = m[1] + "-" + m[2] + (m[3] || "");
        // 排除纯数字误匹配
        if (m[1].length >= 2) return code;
    }
    return String(p.id || "").trim();
}

const GA_BITRATE = {
    "4K": 12e3,
    "1440P": 6e3,
    "1080P": 5100,
    "720P": 1900,
    "480P": 900,
    "240P": 500
};

async function gaProbeLine(line) {
    try {
        const res = await Widget.http.get(line.url, {
            headers: {
                "User-Agent": GA_UA,
                Referer: "https://getav.me/",
                Accept: "*/*",
                Range: "bytes=0-63"
            }
        });
        const status = Number(res && (res.status || res.statusCode) || 0);
        const body = res && res.data !== undefined ? res.data : res;
        const text = typeof body === "string" ? body : "";
        if (text.indexOf("#EXTM3U") === 0 || text.indexOf("#EXTM3U") > 0) return true;
        if (text && /^\s*<(!doctype|html)/i.test(text)) return false;
        if (status === 403 || status === 404 || status === 410) return false;
        return true;
    } catch (e) {
        return true;
    }
}

const _lineCache = {};

async function gaProbedLines(data, code) {
    const key = String(code || "").toUpperCase();
    const hit = _lineCache[key];
    const now = Date.now();
    if (hit && now - hit.at < 10 * 60 * 1e3) return hit.lines;
    const lines = gaPlayLines(data);
    const flags = await Promise.all(lines.map(gaProbeLine));
    const alive = lines.filter((l, i) => flags[i]);
    const kept = alive.length ? alive : lines;
    if (alive.length !== lines.length) {
        console.log("[getav] 探活剔除 " + (lines.length - alive.length) + " 条失效线路: " + code);
    }
    _lineCache[key] = {
        at: now,
        lines: kept
    };
    return kept;
}

function gaHlsUrl(url) {
    const s = String(url || "");
    if (!/\/index\.txt(\?|$)/i.test(s)) return s;
    return s.replace(/\/index\.txt(\?|$)/i, "/index.txt.m3u8$1");
}

function gaLineDescription(code, name) {
    const base = String(name).split(" · ")[0].toUpperCase();
    const kbps = GA_BITRATE[base] || 0;
    const mbps = kbps ? "约 " + (kbps / 1e3).toFixed(1) + "Mbps" : "";
    return [ "番号 " + String(code).toUpperCase(), mbps ].filter(Boolean).join(" · ");
}

async function loadResource(params) {
    const code = gaCodeFromParams(params);
    if (!code) return [];
    const data = await gaFetchDetail(code);
    if (!data) return [];
    const lines = await gaProbedLines(data, code);
    
    const hi = lines.filter(l => (l.rank || 0) >= 1080);
    const keep = hi.length ? hi : lines.slice(0, 1);
    const result = keep.map(l => ({
        name: l.name,
        description: gaLineDescription(code, l.name),
        url: l.url,
        customHeaders: {
            "User-Agent": GA_UA,
            Referer: "https://getav.me/",
            Accept: "*/*"
        },
        playerType: "app"
    }));
    return result;
}


