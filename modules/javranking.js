WidgetMetadata = {
    id: "forward.javranking",
    title: "JavRanking 榜单",
    version: "1.3.5",
    requiredVersion: "0.0.1",
    description: "JavRanking 影片榜单与元数据：DMM 销量榜 / JAVDB TOP250 / 神作总榜（含官方预告片）",
    author: "Coko",
    site: "https://javranking.cc",
    iconurl: "https://tu.100923.xyz/file/1792018310739_javranking-logo.png",
    detailCacheDuration: 3600,
    modules: [
        {
            id: "rank_dmm_weekly",
            title: "DMM 本周销量榜",
            functionName: "loadRanking",
            cacheDuration: 7200,
            params: [ {
                name: "rank",
                title: "榜单",
                type: "constant",
                value: "dmm-weekly"
            }, {
                name: "page",
                title: "页码",
                type: "page"
            } ]
        },
        {
            id: "rank_dmm_monthly_2025_12",
            title: "DMM 月度销量榜 2025.12",
            functionName: "loadRanking",
            cacheDuration: 7200,
            params: [ {
                name: "rank",
                title: "榜单",
                type: "constant",
                value: "dmm-monthly-2025-12"
            }, {
                name: "page",
                title: "页码",
                type: "page"
            } ]
        },
        {
            id: "rank_dmm_monthly_2025_11",
            title: "DMM 月度销量榜 2025.11",
            functionName: "loadRanking",
            cacheDuration: 7200,
            params: [ {
                name: "rank",
                title: "榜单",
                type: "constant",
                value: "dmm-monthly-2025-11"
            }, {
                name: "page",
                title: "页码",
                type: "page"
            } ]
        },
        {
            id: "rank_javdb_top250",
            title: "JAVDB TOP250",
            functionName: "loadRanking",
            cacheDuration: 7200,
            params: [ {
                name: "rank",
                title: "榜单",
                type: "constant",
                value: "javdb-top250"
            }, {
                name: "page",
                title: "页码",
                type: "page"
            } ]
        },
        {
            id: "rank_javdb_uncensored_top250",
            title: "JAVDB 无码 TOP250",
            functionName: "loadRanking",
            cacheDuration: 7200,
            params: [ {
                name: "rank",
                title: "榜单",
                type: "constant",
                value: "javdb-uncensored-top250"
            }, {
                name: "page",
                title: "页码",
                type: "page"
            } ]
        },
        {
            id: "rank_javdb_fc2_top250",
            title: "JAVDB FC2 TOP250",
            functionName: "loadRanking",
            cacheDuration: 7200,
            params: [ {
                name: "rank",
                title: "榜单",
                type: "constant",
                value: "javdb-fc2-top250"
            }, {
                name: "page",
                title: "页码",
                type: "page"
            } ]
        },
        {
            id: "rank_javlibrary_top250",
            title: "JavLibrary TOP250",
            functionName: "loadRanking",
            cacheDuration: 7200,
            params: [ {
                name: "rank",
                title: "榜单",
                type: "constant",
                value: "javlibrary-top250"
            }, {
                name: "page",
                title: "页码",
                type: "page"
            } ]
        },
        {
            id: "rank_javdb_top250_2025",
            title: "JAVDB 2025 年度榜",
            functionName: "loadRanking",
            cacheDuration: 7200,
            params: [ {
                name: "rank",
                title: "榜单",
                type: "constant",
                value: "javdb-top250-2025"
            }, {
                name: "page",
                title: "页码",
                type: "page"
            } ]
        },
        {
            id: "rank_javdb_top250_2024",
            title: "JAVDB 2024 年度榜",
            functionName: "loadRanking",
            cacheDuration: 7200,
            params: [ {
                name: "rank",
                title: "榜单",
                type: "constant",
                value: "javdb-top250-2024"
            }, {
                name: "page",
                title: "页码",
                type: "page"
            } ]
        },
        {
            id: "rank_javdb_top250_2023",
            title: "JAVDB 2023 年度榜",
            functionName: "loadRanking",
            cacheDuration: 7200,
            params: [ {
                name: "rank",
                title: "榜单",
                type: "constant",
                value: "javdb-top250-2023"
            }, {
                name: "page",
                title: "页码",
                type: "page"
            } ]
        },
        {
            id: "rank_javdb_top250_2022",
            title: "JAVDB 2022 年度榜",
            functionName: "loadRanking",
            cacheDuration: 7200,
            params: [ {
                name: "rank",
                title: "榜单",
                type: "constant",
                value: "javdb-top250-2022"
            }, {
                name: "page",
                title: "页码",
                type: "page"
            } ]
        },
        {
            id: "rank_javdb_top250_2021",
            title: "JAVDB 2021 年度榜",
            functionName: "loadRanking",
            cacheDuration: 7200,
            params: [ {
                name: "rank",
                title: "榜单",
                type: "constant",
                value: "javdb-top250-2021"
            }, {
                name: "page",
                title: "页码",
                type: "page"
            } ]
        },
        {
            id: "rank_javdb_top250_2020",
            title: "JAVDB 2020 年度榜",
            functionName: "loadRanking",
            cacheDuration: 7200,
            params: [ {
                name: "rank",
                title: "榜单",
                type: "constant",
                value: "javdb-top250-2020"
            }, {
                name: "page",
                title: "页码",
                type: "page"
            } ]
        },
        {
            id: "rank_javdb_top250_2019",
            title: "JAVDB 2019 年度榜",
            functionName: "loadRanking",
            cacheDuration: 7200,
            params: [ {
                name: "rank",
                title: "榜单",
                type: "constant",
                value: "javdb-top250-2019"
            }, {
                name: "page",
                title: "页码",
                type: "page"
            } ]
        },
        {
            id: "rank_javdb_top250_2018",
            title: "JAVDB 2018 年度榜",
            functionName: "loadRanking",
            cacheDuration: 7200,
            params: [ {
                name: "rank",
                title: "榜单",
                type: "constant",
                value: "javdb-top250-2018"
            }, {
                name: "page",
                title: "页码",
                type: "page"
            } ]
        },
        {
            id: "rank_javdb_top250_2017",
            title: "JAVDB 2017 年度榜",
            functionName: "loadRanking",
            cacheDuration: 7200,
            params: [ {
                name: "rank",
                title: "榜单",
                type: "constant",
                value: "javdb-top250-2017"
            }, {
                name: "page",
                title: "页码",
                type: "page"
            } ]
        },
        {
            id: "rank_javdb_top250_2016",
            title: "JAVDB 2016 年度榜",
            functionName: "loadRanking",
            cacheDuration: 7200,
            params: [ {
                name: "rank",
                title: "榜单",
                type: "constant",
                value: "javdb-top250-2016"
            }, {
                name: "page",
                title: "页码",
                type: "page"
            } ]
        },
        {
            id: "halloffame",
            title: "神作总榜",
            description: "全站神作总榜（历史战力加权）",
            functionName: "loadHallOfFame",
            cacheDuration: 86400,
            params: [ {
                name: "page",
                title: "页码",
                type: "page"
            } ]
        }, {
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
        params: [ {
            name: "keyword",
            title: "关键词",
            type: "input",
            placeholders: [ {
                title: "番号，如 IPX-811",
                value: "IPX-811"
            }, {
                title: "片名 / 女优",
                value: "桥本有菜"
            } ]
        }, {
            name: "page",
            title: "页码",
            type: "page"
        } ]
    }
};

const JR_BASE = "https://javranking.cc/zh-hans";
const JR_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const JR_PAGE_SIZE = 20;
const JR_LINK = "javranking:";
const JR_PREVIEW = "https://static.javranking.cc/video/preview/";

const JR_DMM_PREFIX_MAP = {
    FSDSS: "1", FCDSS: "1", FNS: "1", FTHTD: "1", FALENO: "1", FGAN: "1",
    FSNF: "1", FLAV: "1", NHDTC: "1", KUSE: "1", SDNM: "1", STARS: "1",
    STAR: "1", START: "1", SODS: "1", MOGI: "1", FTAV: "1", WSA: "2",
    MBDD: "301", REBD: "h_346", REBDB: "h_346", GSHRB: "h_346",
    NAAC: "h_706", MAAN: "h_1711"
};
function jrDmmContentId(code) {
    const m = String(code || "").toUpperCase().match(/^([A-Z]{2,6})-?(\d{2,6})([A-Z]?)$/);
    if (!m) return "";
    const prefix = m[1], num5 = m[2].padStart(5, "0"), suffix = (m[3] || "").toLowerCase();
    const np = JR_DMM_PREFIX_MAP[prefix] || "";
    return np + prefix.toLowerCase() + num5 + suffix;
}
function jrDmmPoster(code) {
    const cid = jrDmmContentId(code);
    if (!cid) return "";
    return "https://awsimgsrc.dmm.co.jp/pics_dig/digital/video/" + cid + "/" + cid + "ps.jpg";
}

async function jrProbePoster(url) {
    if (!url) return false;
    try {
        const res = await Widget.http.get(url, {
            headers: { "User-Agent": JR_UA, "Range": "bytes=100000-100000" }
        });
        const status = res && (res.status || res.statusCode);
        return status === 200 || status === 206;
    } catch (e) {
        return false;
    }
}

const JR_JAVDB_SEARCH = "https://javdb.com/search?q=";
const JR_JDB_CACHE_KEY = "jr_jdbcover";
const JR_JDB_CACHE_MAX = 300;
const JR_JDB_MISS_TTL = 24 * 3600 * 1000;
function jrJdbCacheGet() {
    try {
        const raw = Widget.storage.get(JR_JDB_CACHE_KEY);
        const o = raw ? JSON.parse(raw) : null;
        return o && typeof o === "object" ? o : {};
    } catch (e) {
        return {};
    }
}
function jrJdbCacheSet(map) {
    try {
        const keys = Object.keys(map);
        while (keys.length > JR_JDB_CACHE_MAX) delete map[keys.shift()];
        Widget.storage.set(JR_JDB_CACHE_KEY, JSON.stringify(map));
    } catch (e) {}
}
async function jrJavdbCover(code) {
    const res = await Widget.http.get(JR_JAVDB_SEARCH + encodeURIComponent(code) + "&f=all", {
        headers: {
            "User-Agent": JR_UA,
            "Accept": "text/html,application/xhtml+xml",
            "Accept-Language": "zh-CN,zh;q=0.9"
        },
        timeout: 9000
    });
    const html = String(res && res.data || "");
    if (!html || html.length < 2000) return "";
    if (/Just a moment|cf-browser-verification|Attention Required|Cloudflare/i.test(html)) return "";
    const $ = Widget.html.load(html);
    const want = jrNormCode(code);
    let cover = "";
    $("a.box").each((_, el) => {
        if (cover) return;
        try {
            const box = $(el);
            let t = String(box.find(".video-title strong").first().text() || "").trim();
            if (!t) t = String(box.find(".video-title").first().text() || "").trim();
            const nt = jrNormCode(t);
            if (!nt || (nt.indexOf(want) !== 0 && want.indexOf(nt) !== 0)) return;
            const img = box.find(".cover img").first();
            cover = img.attr("data-src") || img.attr("src") || "";
        } catch (e) {}
    });
    cover = String(cover || "").trim();
    if (cover.indexOf("//") === 0) cover = "https:" + cover;
    return /^https?:\/\//i.test(cover) ? cover : "";
}
async function jrVerticalPoster(code) {
    const c = String(code || "").toUpperCase();
    if (!c) return "";
    
    if (!/^FC2/i.test(c) && !/^\d{6,}-\d{3,}$/.test(c)) {
        const url = jrDmmPoster(c);
        if (url && await jrProbePoster(url)) return url;
    }
    
    const cache = jrJdbCacheGet();
    const now = Date.now();
    const hit = cache[c];
    if (hit && (hit.u || now - hit.t < JR_JDB_MISS_TTL)) return hit.u || "";
    let u = "";
    try {
        u = await jrJavdbCover(c);
    } catch (e) {
        u = "";
    }
    cache[c] = { u: u, t: Date.now() };
    jrJdbCacheSet(cache);
    return u;
}
function jrBackdrop(v) {
    return v.coverUrl || "";
}

function jrNormCode(s) {
    return String(s || "").toUpperCase().replace(/-/g, "");
}

function jrHeaders() {
    return {
        "User-Agent": JR_UA,
        "Accept": "text/html,application/xhtml+xml,application/json,*/*",
        "Accept-Language": "zh-CN,zh;q=0.9"
    };
}

async function jrFetchText(url) {
    const res = await Widget.http.get(url, { headers: jrHeaders() });
    const body = res && res.data !== undefined ? res.data : res;
    return typeof body === "string" ? body : JSON.stringify(body || "");
}

let _jrIndex = null;
async function jrIndex() {
    if (_jrIndex) return _jrIndex;
    const res = await Widget.http.get(JR_BASE + "/search-index.json", { headers: jrHeaders() });
    const data = typeof res.data === "string" ? JSON.parse(res.data) : (res.data || {});
    const byId = {};
    const byCode = {};
    const videos = data.videos || [];
    for (let i = 0; i < videos.length; i++) {
        const v = videos[i] || {};
        byId[String(v.videoId)] = v;
        const nc = jrNormCode(v.code);
        if (nc && !byCode[nc]) byCode[nc] = v;
    }
    _jrIndex = { byId: byId, byCode: byCode, videos: videos };
    return _jrIndex;
}

function jrPageNum(params) {
    const p = Number(params && params.page || 1);
    return !p || p < 1 ? 1 : p;
}

function jrPaged(arr, page) {
    const start = (page - 1) * JR_PAGE_SIZE;
    return arr.slice(start, start + JR_PAGE_SIZE);
}

function jrParseRankingMd(md) {
    const rows = [];
    const lines = String(md || "").split("\n");
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const m = line.match(/^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*(.*?)\s*\|\s*\[.*?\]\(https?:[^)]+\/videos\/(\d+)\/?\)/);
        if (!m) continue;
        rows.push({
            rank: parseInt(m[1], 10),
            code: m[2].trim(),
            title: m[3].trim(),
            videoId: m[4]
        });
    }
    return rows;
}

function jrParseHofMd(md) {
    const rows = [];
    const lines = String(md || "").split("\n");
    for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(/^-\s*\[([^:\]]+):\s*(.*?)\]\(https?:[^)]+\/videos\/(\d+)\/?\)/);
        if (!m) continue;
        rows.push({ code: m[1].trim(), title: m[2].trim(), videoId: m[3] });
    }
    return rows;
}

function jrVideoItem(v, descPrefix) {
    const code = String(v.code || "").trim().toUpperCase();
    const item = {
        id: code,
        type: "url",
        link: JR_LINK + v.videoId,
        title: code,
        description: (descPrefix ? descPrefix + " " : "") + String(v.title || "").trim(),
        backdropPath: jrBackdrop(v),
        releaseDate: String(v.releaseDate || "").slice(0, 10)
    };
    if (v.score) item.description += "\n战力: " + v.score + "分";
    return item;
}

function jrRankItem(row, v) {
    const code = String(row.code || "").trim().toUpperCase();
    const item = {
        id: code,
        type: "url",
        link: JR_LINK + row.videoId,
        title: code,
        description: "#" + row.rank + " " + String(row.title || "").trim(),
        backdropPath: v ? jrBackdrop(v) : "",
        releaseDate: v ? String(v.releaseDate || "").slice(0, 10) : ""
    };
    if (v && v.score) item.description += "\n战力: " + v.score + "分";
    return item;
}

function jrVideosByActor(idx, slug) {
    const out = [];
    const videos = idx.videos || [];
    for (let i = 0; i < videos.length; i++) {
        const v = videos[i] || {};
        const links = v.actorLinks || [];
        for (let j = 0; j < links.length; j++) {
            if (String(links[j] && links[j].slug || "") === slug) {
                out.push(v);
                break;
            }
        }
    }
    out.sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0));
    return out;
}

async function loadRanking(params) {
    const page = jrPageNum(params);
    const peopleId = String(params && params.peopleId || "").trim();
    const idx = await jrIndex();
    if (peopleId) {
        return jrPaged(jrVideosByActor(idx, peopleId), page).map(v => jrVideoItem(v));
    }
    const slug = String(params && params.rank || "dmm-weekly").trim() || "dmm-weekly";
    const md = await jrFetchText(JR_BASE + "/rankings/" + encodeURIComponent(slug) + ".md");
    const rows = jrParseRankingMd(md);
    return jrPaged(rows, page).map(r => jrRankItem(r, idx.byId[String(r.videoId)]));
}

async function loadHallOfFame(params) {
    const page = jrPageNum(params);
    const peopleId = String(params && params.peopleId || "").trim();
    const idx = await jrIndex();
    if (peopleId) {
        return jrPaged(jrVideosByActor(idx, peopleId), page).map(v => jrVideoItem(v));
    }
    const md = await jrFetchText(JR_BASE + "/most-awarded-videos.md");
    const rows = jrParseHofMd(md);
    return jrPaged(rows, page).map((r, i) => jrRankItem({
        rank: (page - 1) * JR_PAGE_SIZE + i + 1,
        code: r.code,
        title: r.title,
        videoId: r.videoId
    }, idx.byId[String(r.videoId)]));
}

async function search(params) {
    const kw = String(params && params.keyword || "").trim();
    const peopleId = String(params && params.peopleId || "").trim();
    const page = jrPageNum(params);
    const idx = await jrIndex();
    let hits;
    if (peopleId) {
        hits = jrVideosByActor(idx, peopleId);
    } else {
        if (!kw) return [];
        const nk = jrNormCode(kw);
        hits = [];
        const videos = idx.videos || [];
        for (let i = 0; i < videos.length; i++) {
            const v = videos[i] || {};
            if (jrNormCode(v.code).indexOf(nk) >= 0 ||
                String(v.title || "").indexOf(kw) >= 0 ||
                (v.actorLinks || []).some(a => String(a && a.name || "").indexOf(kw) >= 0)) {
                hits.push(v);
            }
        }
        hits.sort((a, b) => {
            const ae = jrNormCode(a.code) === nk ? 0 : 1;
            const be = jrNormCode(b.code) === nk ? 0 : 1;
            return ae - be || (Number(b.score) || 0) - (Number(a.score) || 0);
        });
    }
    return jrPaged(hits, page).map(v => jrVideoItem(v));
}

function jrParseJsonLd(html) {
    const m = String(html || "").match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    if (!m) return null;
    try {
        return JSON.parse(m[1]);
    } catch (e) {
        return null;
    }
}

function jrDurationText(iso) {
    const m = String(iso || "").match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!m) return "";
    const total = Number(m[1] || 0) * 3600 + Number(m[2] || 0) * 60 + Number(m[3] || 0);
    if (!total) return "";
    const pad = n => n < 10 ? "0" + n : String(n);
    const h = Math.floor(total / 3600), mi = Math.floor(total % 3600 / 60), s = total % 60;
    return (h > 0 ? pad(h) + ":" : "") + pad(mi) + ":" + pad(s);
}

function jrSlugFromUrl(url) {
    const m = String(url || "").match(/\/([a-z]+-[a-zA-Z0-9]+)\/?$/);
    return m ? m[1] : "";
}

async function loadDetail(link) {
    const m = String(link || "").match(/^javranking:(\d+)$/);
    if (!m) return null;
    const id = m[1];
    const html = await jrFetchText(JR_BASE + "/videos/" + id + "/");
    const ld = jrParseJsonLd(html);
    if (!ld || !ld.alternateName) return null;
    const code = String(ld.alternateName).trim().toUpperCase();
    const ogImg = (html.match(/<meta property="og:image" content="([^"]+)"/) || [])[1] || "";
    const lines = [String(ld.name || "").trim(), ""];
    lines.push("番号: " + code);
    if (ld.aggregateRating && ld.aggregateRating.ratingValue) {
        lines.push("评分: " + ld.aggregateRating.ratingValue + "分 (" + (ld.aggregateRating.ratingCount || 0) + "人评价)");
    }
    if (ld.datePublished) lines.push("发行: " + String(ld.datePublished).slice(0, 10));
    const dur = jrDurationText(ld.duration);
    if (dur) lines.push("时长: " + dur);
    if (ld.director && ld.director.length) {
        lines.push("导演: " + ld.director.map(d => d.name).filter(Boolean).join(" / "));
    }
    if (ld.productionCompany && ld.productionCompany.name) lines.push("厂商: " + ld.productionCompany.name);
    const actors = (ld.actor || []).filter(a => a && a.name);
    if (actors.length) lines.push("演员: " + actors.map(a => a.name).join(" / "));
    const item = {
        id: code,
        type: "url",
        link: JR_LINK + id,
        title: code,
        posterPath: ld.image || "",
        backdropPath: ld.image || "",
        releaseDate: String(ld.datePublished || "").slice(0, 10),
        description: lines.join("\n")
    };
    
    try {
        const vp = await jrVerticalPoster(code);
        if (vp) item.posterPath = vp;
    } catch (e) {}
    if (dur) item.durationText = dur;
    if (actors.length) {
        item.peoples = actors.map(a => ({
            id: jrSlugFromUrl(a.url),
            title: a.name,
            role: "女优"
        })).filter(p => p.id);
    }
    return item;
}

async function loadResource(params) {
    try {
        const m = String((params && params.link) || "").match(/^javranking:(\d+)$/);
        if (!m) return [];
        const idx = await jrIndex();
        const v = idx.byId[m[1]];
        if (!v || !v.hasPreviewVideo) return [];
        return [ {
            name: "预告片",
            description: "官方预告",
            url: JR_PREVIEW + m[1] + ".mp4",
            playerType: "system"
        } ];
    } catch (e) {
        return [];
    }
}
