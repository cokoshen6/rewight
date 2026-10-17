var KV_HOST = "https://kanav.ad";
var KV_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.2 Mobile/15E148 Safari/604.1";

WidgetMetadata = {
    id: "rex.kanav",
    title: "KanAV",
    description: "KanAV - 在线AV",
    author: "rex",
    version: "1.0.1",
    requiredVersion: "0.0.1",
    site: "https://kanav.ad",
    iconurl: "https://kanav.ad/favicon.ico",
    detailCacheDuration: 300,
    globalParams: [],
    modules: [
        {
            id: "byType",
            title: "分类",
            type: "video",
            functionName: "loadByType",
            cacheDuration: 600,
            params: [
                { name: "type_id", title: "分类", type: "enumeration", value: "1", enumOptions: [{title: "中文字幕", value: "1"}, {title: "日韩有码", value: "2"}, {title: "日韩无码", value: "3"}, {title: "国产AV", value: "4"}, {title: "自拍泄密", value: "30"}, {title: "探花约炮", value: "31"}, {title: "主播录制", value: "32"}, {title: "动漫番剧", value: "20"}] },
                { name: "sort", title: "排序", type: "enumeration", value: "time_add", enumOptions: [{title: "最新发布", value: "time_add"}, {title: "最多观看", value: "hits"}, {title: "本周热榜", value: "hits_week"}] },
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
        functionName: "kv_search",
        params: [
            { name: "keyword", title: "关键词", type: "input" },
            { name: "page", title: "页码", type: "page" }
        ]
    }
};

function kv_str(v) { return v === undefined || v === null ? "" : String(v); }

async function kv_get(url) {
    var res = await Widget.http.get(url, {
        headers: { "User-Agent": KV_UA, "Referer": KV_HOST + "/" }
    });
    var body = res && res.data;
    return typeof body === "string" ? body : "";
}

function kv_b64decode(s) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var out = "";
    s = kv_str(s).replace(/[^A-Za-z0-9\+\/\=]/g, "");
    var i = 0;
    while (i < s.length) {
        var e1 = chars.indexOf(s.charAt(i++));
        var e2 = chars.indexOf(s.charAt(i++));
        var e3 = chars.indexOf(s.charAt(i++));
        var e4 = chars.indexOf(s.charAt(i++));
        var c1 = (e1 << 2) | (e2 >> 4);
        var c2 = ((e2 & 15) << 4) | (e3 >> 2);
        var c3 = ((e3 & 3) << 6) | e4;
        out += String.fromCharCode(c1);
        if (e3 !== 64) out += String.fromCharCode(c2);
        if (e4 !== 64) out += String.fromCharCode(c3);
    }
    return out;
}

function kv_code(name) {
    var s = kv_str(name).trim().toUpperCase();
    var fc = s.match(/FC2-PPV-\d{5,8}/);
    if (fc) return fc[0];
    var m = s.match(/([A-Z]{2,6})-?(\d{2,6})/);
    if (m) return m[1] + "-" + m[2];
    return s.split(" ")[0] || s.substring(0, 20);
}

function kv_item($, el) {
    var videoItem = $(el).find(".video-item");
    var entryTitle = $(el).find(".entry-title");
    var a = entryTitle.find("a");
    var vodUrl = kv_str(a.attr("href"));
    var vodName = kv_str(a.text()).trim();
    if (!vodUrl || !vodName) return null;
    var img = videoItem.find(".featured-content-image a img");
    var vodPic = kv_str(img.attr("data-original") || img.attr("src"));
    var code = kv_code(vodName);
    return {
        id: "kv:" + vodUrl,
        type: "video",
        title: code,
        backdropPath: vodPic,
        link: "kv:" + vodUrl
    };
}

function kv_parseList(html) {
    var $ = Widget.html.load(html);
    var out = [];
    var self = this;
    $(".post-list .col-md-3").each(function(_, el) {
        var it = kv_item($, el);
        if (it) out.push(it);
    });
    return out;
}

async function loadByType(params) {
    params = params || {};
    var typeId = kv_str(params.type_id || "1");
    var sort = kv_str(params.sort || "time_add");
    var page = parseInt(params.page || "1", 10) || 1;
    var url = KV_HOST + "/index.php/vod/show/by/" + sort + "/id/" + typeId + "/page/" + page + ".html";
    var html = await kv_get(url);
    if (!html) return [];
    return kv_parseList(html);
}

async function kv_search(params) {
    params = params || {};
    var kw = kv_str(params.keyword).trim();
    if (!kw) return [];
    var page = parseInt(params.page || "1", 10) || 1;
    var url = KV_HOST + "/index.php/vod/search/by/time_add/page/" + page + "/wd/" + encodeURIComponent(kw) + ".html";
    var html = await kv_get(url);
    if (!html) return [];
    return kv_parseList(html);
}

function kv_parseId(input) {
    var raw = "";
    if (typeof input === "string") raw = input;
    else if (typeof input === "number") raw = String(input);
    else if (input && typeof input === "object") raw = kv_str(input.link || input.id || input.url);
    raw = raw.trim();
    
    var m = raw.match(/kv:(.+)/);
    return m ? m[1] : (raw.indexOf("/index.php/") === 0 ? raw : "");
}

async function loadDetail(link) {
    var path = kv_parseId(link);
    if (!path) return null;
    var url = path.indexOf("http") === 0 ? path : KV_HOST + path;
    var html = await kv_get(url);
    if (!html) return null;
    var $ = Widget.html.load(html);
    
    var title = "";
    var m = html.match(/var player_aaaa=(\{.*?\});/s);
    if (m) {
        try {
            var player = JSON.parse(m[1]);
            var vd = player.vod_data || {};
            title = kv_str(vd.vod_name || "");
        } catch (e) {}
    }
    if (!title) {
        title = kv_str($("h1").first().text()).trim() || kv_str($("title").text()).trim();
    }
    var code = kv_code(title);
    
    var pic = kv_str($(".vod-pic img").attr("src") || $(".detail-pic img").attr("src") || $("meta[property='og:image']").attr("content"));
    return {
        id: "kv:" + path,
        type: "video",
        title: code,
        backdropPath: pic,
        description: title !== code ? title : "番号: " + code
    };
}

async function loadResource(params) {
    var path = kv_parseId(params);
    if (!path) return [];
    var url = path.indexOf("http") === 0 ? path : KV_HOST + path;
    var html = await kv_get(url);
    if (!html) return [];
    
    var m = html.match(/"url":"([A-Za-z0-9+\/=]+)"/);
    if (!m) return [];
    var decoded = "";
    try {
        var b64 = kv_b64decode(m[1]);
        decoded = decodeURIComponent(b64);
    } catch (e) {
        return [];
    }
    if (!decoded || decoded.indexOf("http") !== 0) return [];
    return [{
        name: "正片",
        url: decoded,
        customHeaders: {
            "User-Agent": KV_UA,
            "Referer": "https://kanav.ad/"
        },
        playerType: "app"
    }];
}
