WidgetMetadata = {
  id: "javheo",
  title: "JavHeo",
  version: "1.0.3",
  requiredVersion: "0.0.1",
  description: "JavHeo JAV/FC2 视频：最新、分类、搜索，OK CDN 直链播放",
  author: "Coko",
  site: "https://javheo.com",
  iconurl: "https://i.imgur.com/zHHoWF9.png",
  detailCacheDuration: 300,
  modules: [
    {
      id: "latest",
      title: "最新",
      functionName: "loadLatest",
      type: "video",
      cacheDuration: 600,
      params: [
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "category",
      title: "分类",
      functionName: "loadCategory",
      type: "video",
      cacheDuration: 600,
      params: [
        {
          name: "cat",
          title: "分类",
          type: "enumeration",
          enumOptions: [
            { title: "anal", value: "anal" },
            { title: "asian", value: "asian" },
            { title: "asiansexdiary", value: "asiansexdiary" },
            { title: "bangbros", value: "bangbros" },
            { title: "bban", value: "bban" },
            { title: "bbw", value: "bbw" },
            { title: "bdsm", value: "bdsm" },
            { title: "big tits", value: "big-tits" },
            { title: "blacked", value: "blacked" },
            { title: "blackedraw", value: "blackedraw" },
            { title: "brazzers", value: "brazzers" },
            { title: "bukkake", value: "bukkake" },
            { title: "chinese", value: "chinese" },
            { title: "creampie", value: "creampie" },
            { title: "cumshot", value: "cumshot" },
            { title: "czech", value: "czech" },
            { title: "dasd", value: "dasd" },
            { title: "ddfnetwork", value: "ddfnetwork" },
            { title: "deepthroat", value: "deepthroat" },
            { title: "defloration", value: "defloration" },
            { title: "digital mosaic", value: "digital-mosaic" },
            { title: "digitalplayground", value: "digitalplayground" },
            { title: "ebony", value: "ebony" },
            { title: "family", value: "family" },
            { title: "fc2", value: "fc2" },
            { title: "gangbang", value: "gangbang" },
            { title: "girlsdoporn", value: "girlsdoporn" },
            { title: "group sex", value: "group-sex" },
            { title: "hentai", value: "hentai" },
            { title: "heyzo", value: "heyzo" },
            { title: "housewife", value: "housewife" },
            { title: "japan", value: "japan" },
            { title: "japanese", value: "japanese" },
            { title: "jav", value: "jav" },
            { title: "julesjordan", value: "julesjordan" },
            { title: "lesbian", value: "lesbian" },
            { title: "lisa ann", value: "lisa-ann" },
            { title: "married woman", value: "married-woman" },
            { title: "massage", value: "massage" },
            { title: "meyd", value: "meyd" },
            { title: "milf", value: "milf" },
            { title: "mom", value: "mom" },
            { title: "naughty america", value: "naughty-america" },
            { title: "niksindian", value: "niksindian" },
            { title: "nurse", value: "nurse" },
            { title: "office", value: "office" },
            { title: "pervmom", value: "pervmom" },
            { title: "pornstar", value: "pornstar" },
            { title: "pppd", value: "pppd" },
            { title: "public", value: "public" },
            { title: "school", value: "school" },
            { title: "schoolgirl", value: "schoolgirl" },
            { title: "squirt", value: "squirt" },
            { title: "ssis", value: "ssis" },
            { title: "ssni", value: "ssni" },
            { title: "stepmom", value: "stepmom" },
            { title: "stockings", value: "stockings" },
            { title: "teacher porn", value: "teacher-porn" },
            { title: "teen porn", value: "teen-porn" },
            { title: "thai", value: "thai" },
            { title: "tushy", value: "tushy" },
            { title: "uncensored", value: "uncensored" },
            { title: "vixen", value: "vixen" },
            { title: "wife", value: "wife" },
            { title: "woodmancastingx", value: "woodmancastingx" },
            { title: "nvg", value: "nvg" },
            { title: "debut", value: "debut" },
            { title: "china", value: "china" },
            { title: "mariska", value: "mariska" },
            { title: "masturbation", value: "masturbation" },
            { title: "missax", value: "missax" },
            { title: "yura kano", value: "yura-kano" },
            { title: "jenna haze", value: "jenna-haze" },
            { title: "1080p", value: "1080p" },
            { title: "secretary", value: "secretary" },
            { title: "bra", value: "bra" },
            { title: "nice butt", value: "nice-butt" },
            { title: "nicole aniston", value: "nicole-aniston" },
            { title: "gangbang creampie", value: "gangbang-creampie" },
            { title: "slut", value: "slut" },
            { title: "much", value: "much" },
            { title: "carib whole", value: "carib-whole" },
            { title: "massage refre", value: "massage-refre" },
            { title: "miaa", value: "miaa" },
            { title: "uncen", value: "uncen" },
            { title: "busty teen", value: "busty-teen" },
            { title: "emily willis", value: "emily-willis" },
            { title: "african", value: "african" },
            { title: "voyeur", value: "voyeur" },
            { title: "gvg", value: "gvg" }
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

var JH_HOST = "https://javheo.com";
var JH_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

function jhStr(v) {
  return v == null ? "" : String(v);
}

function jhClean(s) {
  return jhStr(s).replace(/\s+/g, " ").trim();
}

async function jhGet(url, referer) {
  var res = await Widget.http.get(url, {
    headers: { "User-Agent": JH_UA, "Referer": referer || JH_HOST + "/" },
    timeout: 30000
  });
  var d = res && res.data;
  return d == null ? "" : (typeof d === "string" ? d : String(d));
}

function jhFormBody(body) {
  var out = [];
  body = body || {};
  for (var k in body) {
    if (!Object.prototype.hasOwnProperty.call(body, k)) continue;
    if (body[k] == null) continue;
    out.push(encodeURIComponent(k) + "=" + encodeURIComponent(body[k]));
  }
  return out.join("&");
}

async function jhPost(body, referer) {
  var res = await Widget.http.post(JH_HOST + "/hash-javheo", jhFormBody(body), {
    headers: {
      "User-Agent": JH_UA,
      "Referer": referer || JH_HOST + "/",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    timeout: 30000
  });
  var d = res && res.data;
  return d == null ? "" : (typeof d === "string" ? d : String(d));
}

function jhPage(params) {
  return parseInt(((params || {}).page || 1), 10) || 1;
}

function jhSlugify(s) {
  var str = jhStr(s).replace(/\s/g, "-").replace(/[^a-zA-Z0-9_-]/g, "");
  str = str.toLowerCase();
  str = str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|'|"|&|#|\[|\]|~/g, "-");
  str = str.replace(/-+-/g, "-").replace(/^-+|-+$/g, "");
  return str;
}

function jhSplitTitle(raw) {
  var t = jhClean(raw);
  var m = t.match(/(FC2PPV-?\d+(?:_\d+)?|\[[A-Z0-9]{2,10}-\d+\]|[A-Z]{2,8}-\d{3,})/);
  if (m) {
    var code = m[1].replace(/^\[|\]$/g, "");
    var bare = t.replace(/^\[(.*)\]$/, "$1");
    return { title: code, description: (code === t || code === bare) ? "" : t };
  }
  return { title: t, description: "" };
}

function jhFmtDur(sec) {
  sec = parseInt(sec, 10);
  if (!sec) return "";
  var h = Math.floor(sec / 3600);
  var m = Math.floor((sec % 3600) / 60);
  var s = sec % 60;
  var mm = (m < 10 ? "0" : "") + m;
  var ss = (s < 10 ? "0" : "") + s;
  return h > 0 ? h + ":" + mm + ":" + ss : mm + ":" + ss;
}

function jhParseList(html) {
  var out = [];
  var seen = {};
  if (!html) return out;
  var $ = Widget.html.load(html);
  $(".preview").each(function (i, el) {
    var a = $(el).find('a[href^="/watch/"]').first();
    var href = a.attr("href") || "";
    var m = href.match(/\/watch\/([A-Za-z0-9]+)/);
    if (!m) return;
    var id = m[1];
    if (seen[id]) return;
    seen[id] = 1;
    var img = $(el).find("img").first().attr("src") || "";
    var name = jhClean($(el).find(".name").first().text());
    if (!name) name = jhClean($(el).find("img").first().attr("alt"));
    if (!name) return;
    var quality = "";
    var dur = "";
    $(el).find(".meta li").each(function (j, li) {
      var t = jhClean($(li).text());
      if (/^\d{3,4}p$/i.test(t)) quality = t.toUpperCase();
      else {
        var dm = t.match(/\d+:\d{2}(?::\d{2})?/);
        if (dm) dur = dm[0];
      }
    });
    var sp = jhSplitTitle(name);
    var desc = sp.description;
    var extra = [quality, dur].filter(function (x) { return !!x; }).join(" · ");
    if (extra) desc = desc ? desc + "  " + extra : extra;
    out.push({
      id: id,
      type: "video",
      title: sp.title,
      link: JH_HOST + "/watch/" + id,
      backdropPath: img,
      durationText: dur,
      description: desc
    });
  });
  return out;
}

async function jhPagedList(baseUrl, slug, page) {
  if (page <= 1) return jhParseList(await jhGet(baseUrl));
  var html = await jhPost({ mix: "video-next2", value: slug, page: page - 1 }, baseUrl);
  if (jhClean(html) === "none") return [];
  return jhParseList(html);
}

async function loadLatest(params) {
  return jhPagedList(JH_HOST + "/", "", jhPage(params));
}

async function loadCategory(params) {
  var slug = jhStr((params || {}).cat);
  if (!slug) return [];
  return jhPagedList(JH_HOST + "/porn/" + slug + "/", slug, jhPage(params));
}

async function search(params) {
  var slug = jhSlugify((params || {}).keyword);
  if (!slug) return [];
  return jhPagedList(JH_HOST + "/porn/" + slug + "/", slug, jhPage(params));
}

function jhWatchId(s) {
  var m = jhStr(s).match(/\/watch\/([A-Za-z0-9]+)/);
  if (m) return m[1];
  var bare = jhStr(s).replace(/^jh:/, "");
  return /^[A-Za-z0-9]+$/.test(bare) ? bare : "";
}

async function loadDetail(link) {
  var url = jhStr(link);
  if (url.indexOf("http") !== 0) {
    var wid = jhWatchId(url);
    if (!wid) return null;
    url = JH_HOST + "/watch/" + wid;
  }
  var html = await jhGet(url);
  if (!html) return null;
  var $ = Widget.html.load(html);
  var title = jhClean($('meta[property="og:title"]').attr("content") || $("h1").first().text());
  if (!title) return null;
  var sp = jhSplitTitle(title);
  var cover = $('meta[property="og:image"]').attr("content") || "";
  var durSec = $('meta[property="video:duration"]').attr("content")
    || $('meta[property="og:video:duration"]').attr("content") || "";
  return {
    id: jhWatchId(url),
    type: "video",
    title: sp.title,
    link: url,
    backdropPath: cover,
    durationText: jhFmtDur(durSec),
    description: sp.description
  };
}

async function loadResource(params) {
  params = params || {};
  var wid = jhWatchId(params.id) || jhWatchId(params.link);
  if (!wid) return [];
  var watchUrl = JH_HOST + "/watch/" + wid;
  var ifHtml = await jhPost({ mix: "moviesiframe2", num: wid }, watchUrl);
  var im = jhStr(ifHtml).match(/<iframe[^>]*src="([^"]+)"/);
  if (!im) return [];
  var frameUrl = im[1];
  var frameHtml = await jhGet(frameUrl, watchUrl);
  var cm = jhStr(frameHtml).match(/https?:\/\/[^\s"'<>\\]+\/iframe\/convert\/[^\s"'<>\\]+/);
  var convUrl = cm ? cm[0] : frameUrl.replace("/iframe/v1/", "/iframe/convert/v1/");
  if (!convUrl || convUrl === frameUrl) return [];
  var convHtml = await jhGet(convUrl, frameUrl);
  var um = jhStr(convHtml).match(/url:\s*["']([^"']+)["']/);
  if (!um) return [];
  var mediaUrl = um[1];
  if (mediaUrl.indexOf("http") !== 0) return [];
  return [{
    name: "原画",
    url: mediaUrl,
    customHeaders: { "User-Agent": JH_UA, "Referer": convUrl },
    playerType: "app"
  }];
}
