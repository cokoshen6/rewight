var BJ_HOST = "https://blackedjav.com";
var BJ_API = BJ_HOST + "/wp-json/wp/v2";
var BJ_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

WidgetMetadata = {
    id: "rex.blackedjav",
    title: "BlackedJAV",
    description: "BlackedJAV - Interracial JAV (元数据)",
    author: "rex",
    version: "3.2.1",
    requiredVersion: "0.0.1",
    site: "https://blackedjav.com",
    detailCacheDuration: 300,
    globalParams: [],
    modules: [
        {
            id: "latest",
            title: "最新视频",
            functionName: "loadLatest",
            cacheDuration: 600,
            params: [
                { name: "page", title: "页码", type: "page" }
            ]
        },
        {
            id: "byYear",
            title: "按年份",
            functionName: "loadByYear",
            cacheDuration: 600,
            params: [
                { name: "year", title: "年份", type: "enumeration", value: "2026", enumOptions: [{title: "2026", value: "2026"}, {title: "2025", value: "2025"}, {title: "2024", value: "2024"}, {title: "2023", value: "2023"}, {title: "2022", value: "2022"}, {title: "2021", value: "2021"}, {title: "2020", value: "2020"}] },
                { name: "page", title: "页码", type: "page" }
            ]
        },
        {
            id: "byCat",
            title: "按分类",
            functionName: "loadByCat",
            cacheDuration: 600,
            params: [
                { name: "cat", title: "分类", type: "enumeration", value: "uncensored", enumOptions: [{title: "uncensored", value: "uncensored"}, {title: "decensored", value: "decensored"}] },
                { name: "page", title: "页码", type: "page" }
            ]
        }
    ],
    search: {
        title: "搜索",
        functionName: "bj_search",
        params: [
            { name: "keyword", title: "关键词", type: "input" },
            { name: "page", title: "页码", type: "page" }
        ]
    }
};

function bj_str(v) { return v === undefined || v === null ? "" : String(v); }

function bj_stripHtml(s) {
    s = bj_str(s);
    s = s.replace(/<script[\s\S]*?<\/script>/gi, " ");
    s = s.replace(/<style[\s\S]*?<\/style>/gi, " ");
    s = s.replace(/<[^>]+>/g, " ");
    s = s.replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#0*39;/gi, "'")
        .replace(/&#0*8217;/gi, "'").replace(/&#0*8230;/gi, "...");
    return s.replace(/\s+/g, " ").trim();
}

async function bj_api(path) {
    var res = await Widget.http.get(BJ_API + path, {
        headers: { "User-Agent": BJ_UA, "Referer": BJ_HOST + "/", "Accept": "application/json" }
    });
    var body = res && res.data;
    if (typeof body === "string") {
        try { body = JSON.parse(body); } catch (e) { return null; }
    }
    return body;
}

function bj_code(title) {
    return bj_str(title && title.rendered).trim().toUpperCase();
}

function bj_cover(post) {
    
    var url = bj_str(post.jetpack_featured_media_url);
    if (url) return url;
    
    var html = bj_str(post.content && post.content.rendered);
    var m = html.match(/data-orig-file="([^"]+)"/i) || html.match(/<img[^>]+src="([^"]+)"/i);
    return m ? m[1] : "";
}

function bj_item(post) {
    var code = bj_code(post.title);
    if (!code) return null;
    return {
        id: "bj:" + post.id,
        type: "video",
        title: code,
        backdropPath: bj_cover(post),
        link: "bj:" + post.id
    };
}

async function loadLatest(params) {
    params = params || {};
    var page = parseInt(params.page || "1", 10) || 1;
    var posts = await bj_api("/posts?per_page=20&page=" + page + "&_fields=id,title,jetpack_featured_media_url,content,date");
    if (!Array.isArray(posts)) return [];
    var out = [];
    for (var i = 0; i < posts.length; i++) {
        var it = bj_item(posts[i]);
        if (it) out.push(it);
    }
    return out;
}

var _catCache = {};
async function bj_catId(year) {
    if (_catCache[year]) return _catCache[year];
    var cats = await bj_api("/categories?slug=" + encodeURIComponent(year) + "&_fields=id,slug");
    if (Array.isArray(cats) && cats.length > 0 && cats[0].id) {
        _catCache[year] = cats[0].id;
        return cats[0].id;
    }
    return 0;
}

async function loadByYear(params) {
    params = params || {};
    var year = bj_str(params.year || "2026").trim() || "2026";
    var page = parseInt(params.page || "1", 10) || 1;
    var catId = await bj_catId(year);
    if (!catId) return [];
    var posts = await bj_api("/posts?per_page=20&page=" + page + "&categories=" + catId + "&_fields=id,title,jetpack_featured_media_url,content,date");
    if (!Array.isArray(posts)) return [];
    var out = [];
    for (var i = 0; i < posts.length; i++) {
        var it = bj_item(posts[i]);
        if (it) out.push(it);
    }
    return out;
}

async function loadByCat(params) {
    params = params || {};
    var cat = bj_str(params.cat || "uncensored").trim() || "uncensored";
    var page = parseInt(params.page || "1", 10) || 1;
    var catId = await bj_catId(cat);
    if (!catId) return [];
    var posts = await bj_api("/posts?per_page=20&page=" + page + "&categories=" + catId + "&_fields=id,title,jetpack_featured_media_url,content,date");
    if (!Array.isArray(posts)) return [];
    var out = [];
    for (var i = 0; i < posts.length; i++) {
        var it = bj_item(posts[i]);
        if (it) out.push(it);
    }
    return out;
}

async function bj_search(params) {
    params = params || {};
    var kw = bj_str(params.keyword).trim();
    var page = parseInt(params.page || "1", 10) || 1;
    if (!kw) return [];
    var posts = await bj_api("/posts?per_page=20&page=" + page + "&search=" + encodeURIComponent(kw) + "&_fields=id,title,jetpack_featured_media_url,content,date");
    if (!Array.isArray(posts)) return [];
    var out = [];
    for (var i = 0; i < posts.length; i++) {
        var it = bj_item(posts[i]);
        if (it) out.push(it);
    }
    return out;
}

function bj_metaField(html, label) {
    var m = bj_str(html).match(new RegExp("<strong>" + label + ":<\\/strong>([\\s\\S]*?)<\\/li>", "i"));
    if (!m) return "";
    return bj_stripHtml(m[1]).replace(/\s*,\s*/g, ", ").replace(/,\s*$/, "");
}

function bj_longTitle(html) {
    var m = bj_str(html).match(/<strong>Title:<\/strong>([\s\S]*?)<\/p>/i);
    return m ? bj_stripHtml(m[1]) : "";
}

async function loadDetail(params) {
    var link = bj_str(params && (params.link || params.id || params.url));
    var m = link.match(/^bj:(\d+)$/);
    if (!m) return null;
    var post = await bj_api("/posts/" + m[1]);
    if (!post || !post.id) return null;
    var code = bj_code(post.title);
    var html = bj_str(post.content && post.content.rendered);
    var actress = bj_metaField(html, "Actress");
    var studio = bj_metaField(html, "Studio Label");
    var release = bj_metaField(html, "Release Date");
    var tags = bj_metaField(html, "Tags");
    var longTitle = bj_longTitle(html);
    var desc = [];
    if (longTitle) desc.push(longTitle, "");
    desc.push("番号: " + code);
    if (actress) desc.push("演员: " + actress);
    if (studio) desc.push("厂商: " + studio);
    if (release) desc.push("发行: " + release);
    if (tags) desc.push("标签: " + tags);
    return {
        id: "bj:" + post.id,
        type: "video",
        title: code,
        backdropPath: bj_cover(post),
        description: desc.join("\n")
    };
}
