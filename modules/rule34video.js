const DEFAULT_PIC_PROXY = 'https://ppic.200923.xyz/?url=';
var CURRENT_PIC_PROXY = DEFAULT_PIC_PROXY;
const PIC_HOSTS = ['rule34video.com', 'rule34.xxx'];
function picHostAllowed(url) {
    
    url = String(url || '').toLowerCase();
    var m = url.match(/^https?:\/\/([^\/:#?]+)/);
    if (!m) return false;
    var host = m[1];
    for (var i = 0; i < PIC_HOSTS.length; i++) {
        var h = PIC_HOSTS[i];
        if (host === h || host.slice(-h.length - 1) === '.' + h) return true;
    }
    return false;
}
function proxiedPic(url) {
    url = String(url || '');
    var proxy = CURRENT_PIC_PROXY || '';
    if (!url || !proxy || !picHostAllowed(url)) return url;
    return proxy + encodeURIComponent(url);
}

WidgetMetadata = {
    id: "rule34video_rebuilt",
    title: "Rule34Video",
    description: "Rule34Video视频",
    author: "Coko",
    site: "https://rule34video.com",
    version: "2.3.3",
    requiredVersion: "0.0.2",
    detailCacheDuration: 300,
    globalParams: [
        {
            name: "picProxy",
            title: "图片代理",
            type: "input",
            value: "https://ppic.200923.xyz/?url=",
            description: "封面图代理地址,留空则直连原图"
        }
    ],
    modules: [ {
        title: "最新",
        description: "浏览最新上传视频",
        requiresWebView: false,
        functionName: "loadPage",
        cacheDuration: 180,
        params: [ {
            name: "url",
            title: "列表地址",
            type: "constant",
            description: "列表地址",
            value: "https://rule34video.com/latest-updates/"
        }, {
            name: "sort_by",
            title: "排序方式",
            type: "enumeration",
            enumOptions: [ {
                title: "最新",
                value: "latest"
            }, {
                title: "热门",
                value: "popular"
            } ],
            value: "latest"
        }, {
            name: "from",
            title: "页码",
            type: "page"
        } ]
    }, {
        title: "热门",
        description: "浏览最热门视频",
        requiresWebView: false,
        functionName: "loadPage",
        cacheDuration: 180,
        params: [ {
            name: "url",
            title: "列表地址",
            type: "constant",
            description: "列表地址",
            value: "https://rule34video.com/most-popular/"
        }, {
            name: "sort_by",
            title: "排序方式",
            type: "enumeration",
            enumOptions: [ {
                title: "最新",
                value: "latest"
            }, {
                title: "热门",
                value: "popular"
            } ],
            value: "popular"
        }, {
            name: "from",
            title: "页码",
            type: "page"
        } ]
    }, {
        title: "搜索",
        description: "搜索 Rule34Video",
        requiresWebView: false,
        functionName: "searchVideos",
        cacheDuration: 120,
        params: [ {
            name: "keyword",
            title: "关键词",
            type: "input",
            value: ""
        }, {
            name: "sort_by",
            title: "排序方式",
            type: "enumeration",
            enumOptions: [ {
                title: "Most Relevant",
                value: ""
            }, {
                title: "Newest",
                value: "post_date"
            }, {
                title: "Most Viewed",
                value: "video_viewed"
            }, {
                title: "Top Rated",
                value: "rating"
            }, {
                title: "Longest",
                value: "duration"
            }, {
                title: "Random",
                value: "pseudo_rand"
            } ],
            value: ""
        }, {
            name: "page",
            title: "页码",
            type: "page"
        } ]
    } ]
};

var BASE_URL = "https://rule34video.com";

var DEFAULT_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Referer: BASE_URL + "/",
    "Accept-Language": "en-US,en;q=0.9"
};

function normalizeUrl(path) {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    if (path.startsWith("//")) return "https:" + path;
    if (path.startsWith("/")) return BASE_URL + path;
    return BASE_URL + "/" + path;
}

function parseList(html) {
    var $ = Widget.html.load(html || "");
    var items = [];
    $(".thumbs .item.thumb").each(function(_, el) {
        var linkEl = $(el).find("a.th[href*='/video/']").first();
        var link = linkEl.attr("href") || "";
        if (!link) return;
        var imgEl = linkEl.find("img").first();
        var thumb = imgEl.attr("data-rd-src") || imgEl.attr("data-rd-jpg") || imgEl.attr("data-webp") || imgEl.attr("data-original") || imgEl.attr("data-src") || imgEl.attr("data-lazy-src") || imgEl.attr("src") || "";
        if (thumb.indexOf("data:image") === 0) thumb = ""; 
        var title = (linkEl.attr("title") || $(el).find(".thumb_title").text() || imgEl.attr("alt") || "").trim();
        var duration = $(el).find(".time, .duration").first().text().trim();
        items.push({
            id: normalizeUrl(link),
            type: "url",
            title: title || "Untitled",
            backdropPath: proxiedPic(normalizeUrl(thumb)),
            durationText: duration,
            mediaType: "movie",
            link: normalizeUrl(link)
        });
    });
    var map = {};
    var deduped = [];
    for (var i = 0; i < items.length; i++) {
        if (items[i].link && !map[items[i].link]) {
            map[items[i].link] = true;
            deduped.push(items[i]);
        }
    }
    return deduped;
}

function fetchList(url) {
    return Widget.http.get(url, {
        headers: DEFAULT_HEADERS
    }).then(function(res) {
        var status = res && (res.statusCode || res.status);
        if (status !== 200) return [];
        return parseList(res.data);
    });
}

function loadPage(params) {
    params = params || {};
    
    if (typeof params.picProxy === 'string') {
        var custom = params.picProxy.trim();
        if (custom.indexOf('pic.200923.xyz') !== -1 && custom.indexOf('ppic.200923.xyz') === -1) {
            custom = DEFAULT_PIC_PROXY;
        }
        CURRENT_PIC_PROXY = custom;
    }
    var url = params && params.url || "https://rule34video.com/latest-updates/";
    var sortBy = params && params.sort_by || "latest";
    var page = params && params.from ? parseInt(params.from, 10) || 1 : 1;
    var fu = url;
    if (sortBy === "popular" && url.indexOf("latest") !== -1) {
        fu = url.replace("latest-updates", "most-popular");
    } else if (sortBy === "latest" && url.indexOf("most-popular") !== -1) {
        fu = url.replace("most-popular", "latest-updates");
    }
    if (page > 1) {
        fu = fu.replace(/\/?$/, "/") + page + "/";
    }
    return fetchList(fu);
}

function searchVideos(params) {
    var query = String(params && params.keyword || "").trim();
    var sortBy = params && params.sort_by || "";
    var page = params && params.page ? parseInt(params.page, 10) || 1 : 1;
    if (!query) return Promise.resolve([]);
    var url = BASE_URL + "/search/?q=" + encodeURIComponent(query);
    if (sortBy) url += "&sort_by=" + encodeURIComponent(sortBy);
    if (page > 1) url += "&from_videos=" + page;
    return fetchList(url);
}

function extractVideoUrl(html) {
    var raw = String(html || "");
    var m = raw.match(/video_url\s*:\s*'([^']+\.mp4[^']*)'/i);
    if (m) return m[1].replace(/\\\//g, "/");
    m = raw.match(/"contentUrl"\s*:\s*"([^"]+\.mp4[^"]*)"/i);
    if (m) return m[1].replace(/\\\//g, "/");
    m = raw.match(/https?:\/\/[^"'\s<>]+\.mp4[^"'\s<>]*/i);
    if (m) return m[0];
    return "";
}

function extractPosterUrl(html) {
    var raw = String(html || "");
    var m = raw.match(/preview_url\s*:\s*'([^']+)'/i);
    if (m) return normalizeUrl(m[1].replace(/\\\//g, "/"));
    m = raw.match(/preview_url\d*\s*:\s*'([^']+\.jpg[^']*)'/i);
    if (m) return normalizeUrl(m[1].replace(/\\\//g, "/"));
    m = raw.match(/"thumbnailUrl"\s*:\s*"([^"]+)"/i);
    if (m) return normalizeUrl(m[1].replace(/\\\//g, "/"));
    return "";
}

function loadDetail(link) {
    var fullLink = normalizeUrl(link);
    return Widget.http.get(fullLink, {
        headers: DEFAULT_HEADERS
    }).then(function(res) {
        var status = res && (res.statusCode || res.status);
        if (status !== 200) return {
            id: fullLink,
            type: "url",
            title: "加载失败",
            link: fullLink
        };
        var html = res.data || "";
        var $ = Widget.html.load(html);
        var title = ($("meta[property='og:title']").attr("content") || $("h1").first().text() || "Rule34Video").trim();
        var poster = normalizeUrl($("meta[property='og:image']").attr("content") || extractPosterUrl(html) || $(".player-holder img").first().attr("src") || "");
        var description = ($("meta[name='description']").attr("content") || "").trim();
        var videoUrl = extractVideoUrl(html) || fullLink;
        var childItems = parseList(html);
        var filtered = [];
        for (var i = 0; i < childItems.length; i++) {
            if (childItems[i].link !== fullLink && filtered.length < 12) {
                filtered.push(childItems[i]);
            }
        }
        return {
            id: fullLink,
            type: "url",
            title: title,
            videoUrl: videoUrl,
            posterPath: proxiedPic(poster),
            backdropPath: proxiedPic(poster),
            description: description || fullLink,
            mediaType: "movie",
            link: fullLink,
            childItems: filtered,
            headers: {
                Referer: fullLink,
                "User-Agent": DEFAULT_HEADERS["User-Agent"]
            }
        };
    });
}
