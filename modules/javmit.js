var JM_HOST = "https://javmit.com";
var JM_API = JM_HOST + "/zh-CN/wp-json/wp/v2"; 
var JM_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

WidgetMetadata = {
    id: "rex.javmit",
    title: "JAVMIT",
    description: "JAVMIT - 無修正 JAV (在线播放)",
    author: "rex",
    version: "1.6.3",
    requiredVersion: "0.0.1",
    site: "https://javmit.com",
    iconurl: "https://javmit.com/wp-content/uploads/2026/04/cropped-red-play-icon-circle-with-white-triangle-middle_609989-1987-192x192.jpg",
    detailCacheDuration: 300,
    globalParams: [],
    modules: [
        {
            id: "latest",
            title: "最新视频",
            type: "video",
            functionName: "loadLatest",
            cacheDuration: 600,
            params: [
                { name: "page", title: "页码", type: "page" }
            ]
        },
        {
            id: "random",
            title: "随机视频",
            type: "video",
            description: "网站随机排序",
            functionName: "loadRandom",
            cacheDuration: 60,
            params: []
        },
        {
            id: "popular",
            title: "最受欢迎",
            type: "video",
            description: "按浏览量排序",
            functionName: "loadPopular",
            cacheDuration: 600,
            params: []
        },
        {
            id: "toprated",
            title: "评分最高",
            type: "video",
            description: "按点赞排序",
            functionName: "loadTopRated",
            cacheDuration: 600,
            params: []
        },
        {
            
            id: "loadResource",
            title: "在线播放",
            description: "提取 s2.javmit.com 直链 (1080p/480p)",
            functionName: "loadResource",
            type: "stream",
            cacheDuration: 0,
            params: []
        }
    ],
    search: {
        title: "搜索",
        functionName: "jm_search",
        params: [
            { name: "keyword", title: "关键词", type: "input" },
            { name: "page", title: "页码", type: "page" }
        ]
    }
};

function jm_str(v) { return v === undefined || v === null ? "" : String(v); }

function jm_stripHtml(s) {
    s = jm_str(s);
    s = s.replace(/<script[\s\S]*?<\/script>/gi, " ");
    s = s.replace(/<style[\s\S]*?<\/style>/gi, " ");
    s = s.replace(/<[^>]+>/g, " ");
    s = s.replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#0*39;/gi, "'");
    return s.replace(/\s+/g, " ").trim();
}

function jm_code(title, html) {
    var m = jm_str(html).match(/(?:Code|代码)\s*[:：]?\s*(?:<\/strong>)?\s*([A-Z0-9]+-[0-9_]+)/i);
    if (m) return m[1].toUpperCase();
    m = jm_str(title).match(/^([A-Z0-9]+-[0-9_]+)/i);
    if (m) return m[1].toUpperCase();
    return "";
}

function jm_jpTitle(title) {
    var m = jm_str(title).match(/\(([^)]+)\)/);
    return m ? m[1].trim() : "";
}

function jm_meta(html, label) {
    var re = new RegExp(label + "\\s*[:：]\\s*(?:<\\/strong>)?\\s*([^<]+)", "i");
    var m = jm_str(html).match(re);
    return m ? m[1].trim() : "";
}

function jm_featured(p) {
    try {
        var m = p._embedded && p._embedded["wp:featuredmedia"] && p._embedded["wp:featuredmedia"][0];
        return (m && m.source_url) || "";
    } catch (e) { return ""; }
}

function jm_terms(p) {
    var out = [];
    try {
        var groups = (p._embedded && p._embedded["wp:term"]) || [];
        for (var i = 0; i < groups.length; i++) {
            var arr = groups[i] || [];
            for (var j = 0; j < arr.length; j++) {
                if (arr[j] && arr[j].taxonomy === "category") {
                    out.push({ id: String(arr[j].id), title: jm_stripHtml(arr[j].name) });
                }
            }
        }
    } catch (e) {}
    return out;
}

function jm_toItem(p) {
    var rawTitle = jm_stripHtml(p.title && p.title.rendered);
    var html = (p.content && p.content.rendered) || "";
    var code = jm_code(rawTitle, html);
    var jpTitle = jm_jpTitle(rawTitle);
    return {
        id: "jm:" + p.id,
        type: "video",
        mediaType: "movie",
        title: code || rawTitle,
        description: jpTitle || rawTitle,
        backdropPath: jm_featured(p),
        link: "jm:" + p.id
    };
}

async function jm_api(path, params) {
    var res = await Widget.http.get(JM_API + path, {
        params: params || {},
        headers: { "User-Agent": JM_UA, "Referer": JM_HOST + "/", "Accept": "application/json" }
    });
    var data = res && res.data;
    if (typeof data === "string" && /^\s*</.test(data)) throw new Error("API 返回了 HTML");
    if (data === undefined || data === null) throw new Error("空响应");
    return data;
}

function jm_parseLink(link) {
    var m = /^jm:(\d+)$/.exec(jm_str(link).trim());
    return m ? m[1] : "";
}

async function loadLatest(params) {
    params = params || {};
    var page = Number(params.page || 1);
    try {
        var q = { per_page: 20, page: page, _embed: 1, orderby: "date", order: "desc" };
        if (params.genreId) q.categories = params.genreId;
        var posts = await jm_api("/posts", q);
        if (!posts || !posts.length) return [];
        return posts.map(jm_toItem);
    } catch (e) {
        console.error("[JAVMIT] loadLatest 失败:", e.message || e);
        throw e;
    }
}

async function loadRandom(params) {
    try {
        var ids = await jm_sortedIds("random");
        return (await jm_postsByIds(ids)).map(jm_toItem);
    } catch (e) {
        console.error("[JAVMIT] loadRandom 失败:", e.message || e);
        throw e;
    }
}

async function jm_sortedIds(sort) {
    var url = JM_HOST + "/zh-CN/video/?sort=" + sort;
    var res = await Widget.http.get(url, {
        headers: { "User-Agent": JM_UA, "Referer": JM_HOST + "/" }
    });
    var html = res && res.data;
    if (typeof html !== "string" || !html) return [];
    var ids = [];
    var re = /data-post-id="(\d+)"/g;
    var m;
    while ((m = re.exec(html)) !== null) {
        if (ids.indexOf(m[1]) === -1) ids.push(m[1]);
    }
    return ids;
}

async function jm_postsByIds(ids) {
    if (!ids || !ids.length) return [];
    var posts = await jm_api("/posts", {
        include: ids.join(","),
        orderby: "include",
        per_page: ids.length,
        _embed: 1
    });
    if (!posts || !posts.length) return [];
    var map = {};
    for (var i = 0; i < posts.length; i++) map[posts[i].id] = posts[i];
    var out = [];
    for (var j = 0; j < ids.length; j++) {
        var p = map[ids[j]] || map[Number(ids[j])];
        if (p) out.push(p);
    }
    return out;
}

async function loadPopular(params) {
    try {
        var ids = await jm_sortedIds("views");
        return (await jm_postsByIds(ids)).map(jm_toItem);
    } catch (e) {
        console.error("[JAVMIT] loadPopular 失败:", e.message || e);
        throw e;
    }
}

async function loadTopRated(params) {
    try {
        var ids = await jm_sortedIds("liked");
        return (await jm_postsByIds(ids)).map(jm_toItem);
    } catch (e) {
        console.error("[JAVMIT] loadTopRated 失败:", e.message || e);
        throw e;
    }
}

async function jm_search(params) {
    params = params || {};
    var kw = jm_str(params.keyword).trim();
    if (!kw) return [];
    var page = Number(params.page || 1);
    try {
        var posts = await jm_api("/posts", {
            search: kw, per_page: 20, page: page, _embed: 1, orderby: "relevance"
        });
        if (!posts || !posts.length) return [];
        return posts.map(jm_toItem);
    } catch (e) {
        console.error("[JAVMIT] 搜索失败:", e.message || e);
        throw e;
    }
}

async function loadDetail(link) {
    var id = jm_parseLink(link);
    if (!id) return null;
    try {
        var p = await jm_api("/posts/" + id, { _embed: 1 });
        if (!p || !p.id) return null;
        var rawTitle = jm_stripHtml(p.title && p.title.rendered);
        var html = (p.content && p.content.rendered) || "";
        var code = jm_code(rawTitle, html);
        var lines = [];
        var jpTitle = jm_jpTitle(rawTitle);
        if (jpTitle) lines.push(jpTitle);
        else if (rawTitle && rawTitle !== code) lines.push(rawTitle);
        var sub = [];
        var actress = jm_meta(html, "演员") || jm_meta(html, "Actress");
        var rel = jm_meta(html, "发布日期") || jm_meta(html, "Release date");
        if (actress) sub.push("女优 " + actress);
        if (rel) sub.push("发行 " + rel);
        if (sub.length) lines.push(sub.join(" · "));
        var dur = jm_meta(html, "视频时长") || jm_meta(html, "Video Duration");
        var img = jm_featured(p);
        var detail = {
            id: "jm:" + p.id,
            type: "video",
            mediaType: "movie",
            title: code || rawTitle,
            description: lines.join("\n") || rawTitle,
            posterPath: img,
            backdropPath: img,
            genreItems: jm_terms(p),
            link: link
        };
        if (dur) detail.durationText = dur;
        if (rel) detail.releaseDate = rel;
        return detail;
    } catch (e) {
        console.error("[JAVMIT] loadDetail 失败:", e.message || e);
        return null;
    }
}

async function loadResource(params) {
    params = params || {};
    var id = jm_parseLink(params.link || "") || jm_parseLink(params.id || "");
    if (!id) return [];
    try {
        var p = await jm_api("/posts/" + id, { _embed: 0 });
        var pageUrl = p && p.link;
        if (!pageUrl) return [];
        var res = await Widget.http.get(pageUrl, {
            headers: { "User-Agent": JM_UA, "Referer": JM_HOST + "/" }
        });
        var html = res && res.data;
        if (typeof html !== "string" || !html) return [];
        var found = {};
        var re = /https:\/\/s\d+\.javmit\.com\/[^"'\\\s]+\.m3u8/gi;
        var m;
        while ((m = re.exec(html)) !== null) {
            var url = m[0];
            var qm = url.match(/\/(1080p|720p|480p|360p)\//i);
            var q = qm ? qm[1].toUpperCase() : (/\/master\.m3u8$/i.test(url) ? "自动" : "未知");
            if (!found[q]) found[q] = url;
        }
        
        var order = ["1080P", "720P", "480P", "360P", "自动", "未知"];
        for (var i = 0; i < order.length; i++) {
            var q = order[i];
            if (found[q]) {
                
                if (q === "1080P" || !found["1080P"]) {
                    return [{
                        id: "jmplay:" + id + ":" + q,
                        title: q,
                        url: found[q],
                        headers: { "User-Agent": JM_UA, "Referer": pageUrl }
                    }];
                }
            }
        }
        return [];
    } catch (e) {
        console.error("[JAVMIT] loadResource 失败:", e.message || e);
        return [];
    }
}
