WidgetMetadata = {
    id: "rex.daxiang",
    title: "大象视频",
    description: "大象视频 / 分类浏览 / 搜索",
    author: "Coko",
    site: "https://jj88mm.com",
    version: "1.0.1",
    requiredVersion: "0.0.1",
    detailCacheDuration: 300,
    modules: [ {
        id: "category",
        title: "分类",
        description: "按分类浏览",
        functionName: "loadCategory",
        type: "video",
        cacheDuration: 600,
        params: [ {
            name: "category",
            title: "分类",
            type: "enumeration",
            value: "14",
            enumOptions: [ {
                title: "📱 偷拍自拍",
                value: "14"
            }, {
                title: "🎤 网红主播",
                value: "19"
            }, {
                title: "💃 台湾辣妹",
                value: "20"
            }, {
                title: "👑 OnlyFans",
                value: "21"
            }, {
                title: "🌸 日韩视频",
                value: "15"
            }, {
                title: "🌍 欧美性爱",
                value: "16"
            }, {
                title: "🎭 智能换脸",
                value: "17"
            }, {
                title: "📼 经典三级",
                value: "18"
            }, {
                title: "🔤 中文字幕",
                value: "22"
            }, {
                title: "🔞 高清无码",
                value: "24"
            }, {
                title: "🍈 美颜巨乳",
                value: "25"
            }, {
                title: "👠 丝袜制服",
                value: "26"
            }, {
                title: "⛓️ SM系列",
                value: "27"
            }, {
                title: "🎨 H動畫",
                value: "29"
            }, {
                title: "📺 91传媒",
                value: "6"
            }, {
                title: "🎬 麻豆传媒",
                value: "8"
            }, {
                title: "🍑 蜜桃传媒",
                value: "11"
            }, {
                title: "✨ 天美传媒",
                value: "12"
            }, {
                title: "⭐ 星空传媒",
                value: "13"
            } ]
        }, {
            name: "page",
            title: "页码",
            type: "page"
        } ]
    }, {
        id: "loadResource",
        title: "播放资源",
        description: "起播时按需解析 HLS 播放地址",
        functionName: "loadResource",
        type: "stream",
        cacheDuration: 0,
        params: []
    } ],
    search: {
        title: "搜索",
        functionName: "searchVideos",
        params: [ {
            name: "keyword",
            title: "关键词",
            type: "input"
        }, {
            name: "page",
            title: "页码",
            type: "page"
        } ]
    }
};

var DX_API = "https://data.7wzx9.com/forward";

var DX_PIC_PREFIX = "https://eu7tu.shuma5588.com";

var DX_MEDIA_PREFIX = "https://18bb.sxyjspsc.com";

var DX_SITE_HEADERS = {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    Referer: "https://jj88mm.com/",
    "Content-Type": "application/json"
};

var DX_MEDIA_HEADERS = {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    Referer: "https://jj88mm.com/"
};

var DX_M3U8_RE = /https?:\\?\/\\?\/[^"'\\\s<>]+\.m3u8[^"'\\\s<>]*/g;

function dx_str(v) {
    return v == null ? "" : String(v);
}

function dx_collapse(s) {
    return dx_str(s).replace(/\s+/g, " ").trim();
}

function dx_abs(url, prefix) {
    url = dx_str(url).trim();
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    return prefix + (url.charAt(0) === "/" ? "" : "/") + url;
}

async function dx_post(body) {
    var resp = await Widget.http.post(DX_API, body, {
        headers: DX_SITE_HEADERS
    });
    return resp && resp.data;
}

function dx_mediaHost(picUrl) {
    var u = dx_str(picUrl).trim();
    if (u.indexOf("//") === 0) u = "https:" + u;
    var m = /^https?:\/\/[^\/]+/i.exec(u);
    return m ? m[0] : "";
}

function dx_parseLink(link) {
    var m = /^dx:(\d+)(?:@(.+))?$/.exec(dx_str(link));
    return m ? { id: m[1], host: m[2] || "" } : null;
}

function dx_toListItem(x) {
    var host = dx_mediaHost(x.vod_pic) || DX_MEDIA_PREFIX;
    return {
        id: "dx:" + x.id,
        type: "url",
        title: dx_collapse(x.vod_name),
        backdropPath: dx_abs(x.vod_pic, DX_PIC_PREFIX),
        description: dx_collapse(x.vod_class),
        link: "dx:" + x.id + "@" + host
    };
}

async function loadCategory(params) {
    params = params || {};
    var page = Number(params.page || 1);
    var category = dx_str(params.category || "14");
    try {
        var data = await dx_post({
            command: "WEB_GET_INFO",
            pageNumber: page,
            RecordsPage: 20,
            typeId: Number(category),
            typeMid: 1,
            languageType: "CN",
            content: ""
        });
        var list = data && data.data && data.data.resultList || [];
        return list.map(dx_toListItem);
    } catch (e) {
        console.error("[大象视频] loadCategory 失败:", e.message || e);
        throw e;
    }
}

async function searchVideos(params) {
    params = params || {};
    var kw = dx_str(params.keyword).trim();
    if (!kw) return [];
    var page = Number(params.page || 1);
    try {
        var data = await dx_post({
            command: "WEB_GET_INFO",
            pageNumber: page,
            RecordsPage: 20,
            typeId: 2,
            typeMid: 1,
            languageType: "CN",
            content: kw,
            type: 1
        });
        var list = data && data.data && data.data.resultList || [];
        return list.map(dx_toListItem);
    } catch (e) {
        console.error("[大象视频] searchVideos 失败:", e.message || e);
        throw e;
    }
}

async function dx_fetchDetail(vodId) {
    var data = await dx_post({
        command: "WEB_GET_INFO_DETAIL",
        type_Mid: 1,
        id: Number(vodId),
        languageType: "CN"
    });
    return data && data.data && data.data.result;
}

function dx_extractM3u8(vodUrl, prefix) {
    var full = dx_abs(vodUrl, prefix || DX_MEDIA_PREFIX);
    if (!full) return [];
    var unescaped = full.replace(/\\\//g, "/");
    var found = unescaped.match(/https?:\/\/[^"'\s<>]+\.m3u8[^"'\s<>]*/g) || [];
    var out = [], seen = {};
    for (var i = 0; i < found.length; i++) {
        if (!seen[found[i]]) {
            seen[found[i]] = 1;
            out.push(found[i]);
        }
    }
    return out;
}

async function loadDetail(link) {
    var p = dx_parseLink(link);
    if (!p) return null;
    try {
        var r = await dx_fetchDetail(p.id);
        if (!r) return null;
        var urls = dx_extractM3u8(r.vod_url, p.host || DX_MEDIA_PREFIX);
        var videoSources = urls.map(function(u) {
            return {
                url: u,
                type: "application/x-mpegURL",
                label: "HLS"
            };
        });
        return {
            id: link,
            type: "url",
            link: link,
            title: dx_collapse(r.vod_name),
            posterPath: dx_abs(r.vod_pic, DX_PIC_PREFIX),
            description: dx_collapse(r.typeName),
            videoUrl: videoSources.length ? videoSources[0].url : undefined,
            videoSources: videoSources.length ? videoSources : undefined
        };
    } catch (e) {
        console.error("[大象视频] loadDetail 失败:", e.message || e);
        throw e;
    }
}

async function loadResource(params) {
    params = params || {};
    var p = dx_parseLink(params.link);
    if (!p) throw new Error("无法解析播放链接");
    try {
        var r = await dx_fetchDetail(p.id);
        if (!r) throw new Error("获取详情失败");
        var urls = dx_extractM3u8(r.vod_url, p.host || DX_MEDIA_PREFIX);
        if (!urls.length) throw new Error("未找到可播放地址");
        return urls.map(function(u, i) {
            return {
                name: urls.length > 1 ? "线路" + (i + 1) : "HLS",
                description: dx_collapse(r.vod_name),
                url: u,
                playerType: "app",
                customHeaders: DX_MEDIA_HEADERS
            };
        });
    } catch (e) {
        console.error("[大象视频] loadResource 失败:", e.message || e);
        throw e;
    }
}