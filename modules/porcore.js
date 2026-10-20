WidgetMetadata = {
  id: "porcore",
  title: "Porcore",
  version: "1.0.3",
  requiredVersion: "0.0.1",
  description: "Porcore 3D/Hentai 视频：最新、分类、标签搜索，HLS 多档播放",
  author: "Coko",
  site: "https://porcore.com",
  iconurl: "https://porcore.com/favicon-96x96.png",
  detailCacheDuration: 300,
  modules: [
    {
      id: "latest",
      title: "最新",
      functionName: "loadLatest",
      type: "video",
      cacheDuration: 600,
      params: [
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          enumOptions: [
            { title: "最新", value: "newest" },
            { title: "最早", value: "oldest" },
            { title: "最长", value: "longest" },
            { title: "最短", value: "shortest" },
            { title: "最多观看", value: "mostviewed" },
            { title: "最高评分", value: "toprated" }
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
      cacheDuration: 600,
      params: [
        {
          name: "cat",
          title: "分类",
          type: "enumeration",
          enumOptions: [
            { title: "3D Porn", value: "3d" },
        { title: "69", value: "69" },
        { title: "ai", value: "ai" },
        { title: "Aliens", value: "aliens" },
        { title: "amazons", value: "amazons" },
        { title: "anal sex", value: "anal-sex" },
        { title: "animal sex", value: "animal-sex" },
        { title: "armpit sex", value: "armpit-sex" },
        { title: "asari", value: "asari" },
        { title: "autofellatio", value: "autofellatio" },
        { title: "bbc", value: "bbc" },
        { title: "bdsm", value: "bdsm" },
        { title: "big ass", value: "big-ass" },
        { title: "Big Dicks", value: "big-dicks" },
        { title: "big tits", value: "big-tits" },
        { title: "blondes", value: "blondes" },
        { title: "blood", value: "blood" },
        { title: "blowjob", value: "blowjob" },
        { title: "boobjob", value: "boobjob" },
        { title: "brunettes", value: "brunettes" },
        { title: "Cartoons", value: "cartoons" },
        { title: "casino", value: "casino" },
        { title: "christmas", value: "christmas" },
        { title: "cock licking", value: "cock-licking" },
        { title: "cock stuffing", value: "cock-stuffing" },
        { title: "compilations", value: "compilations" },
        { title: "cosplay", value: "cosplay" },
        { title: "cowgirl", value: "cowgirl" },
        { title: "creampie", value: "creampie" },
        { title: "cum share", value: "cum-share" },
        { title: "cumshot", value: "cumshot" },
        { title: "cumshot inside mouth", value: "cumshot-inside-mouth" },
        { title: "cumshot on body", value: "cumshot-on-body" },
        { title: "cunnilingus", value: "cunnilingus" },
        { title: "cyberpunk2077", value: "cyberpunk2077" },
        { title: "dancing", value: "dancing" },
        { title: "dead or alive", value: "dead-or-alive" },
        { title: "deep throat", value: "deep-throat" },
        { title: "devil", value: "devil" },
        { title: "different poses", value: "different-poses" },
        { title: "doctors", value: "doctors" },
        { title: "doggy style", value: "doggy-style" },
        { title: "double penetration", value: "double-penetration" },
        { title: "drunk", value: "drunk" },
        { title: "ebony", value: "ebony" },
        { title: "electric stimulation", value: "electric-stimulation" },
        { title: "ellie", value: "ellie" },
        { title: "elves", value: "elves" },
        { title: "english subtitles", value: "english-subtitles" },
        { title: "english voice", value: "english-voice" },
        { title: "erotic censorship", value: "erotic-censorship" },
        { title: "facial", value: "facial" },
        { title: "fantasy", value: "fantasy" },
        { title: "fetish", value: "fetish" },
        { title: "final fantasy", value: "final-fantasy" },
        { title: "fingering", value: "fingering" },
        { title: "fisting", value: "fisting" },
        { title: "foot fetish", value: "foot-fetish" },
        { title: "forest", value: "forest" },
        { title: "from behind", value: "from-behind" },
        { title: "Furry Sex", value: "furry" },
        { title: "game recording", value: "game-recording" },
        { title: "Gays", value: "gay" },
        { title: "ghost", value: "ghost" },
        { title: "giving birth", value: "giving-birth" },
        { title: "glory hole", value: "glory-hole" },
        { title: "gnomes", value: "gnomes" },
        { title: "goblin", value: "goblin" },
        { title: "gotham city", value: "gotham-city" },
        { title: "group sex", value: "group-sex" },
        { title: "gym", value: "gym" },
        { title: "handjob", value: "handjob" },
        { title: "hardcore sex", value: "hardcore-sex" },
        { title: "harley quinn", value: "harley-quinn" },
        { title: "harry potter", value: "harry-potter" },
        { title: "HD Quality", value: "hd" },
        { title: "Hentai", value: "hentai" },
        { title: "hermione", value: "hermione" },
        { title: "hospital", value: "hospital" },
        { title: "hot dogging", value: "hot-dogging" },
        { title: "hotel", value: "hotel" },
        { title: "impregnation", value: "impregnation" },
        { title: "incest", value: "incest" },
        { title: "japanese voice", value: "japanese-voice" },
        { title: "jerking off", value: "jerking-off" },
        { title: "kissing", value: "kissing" },
        { title: "latina", value: "latina" },
        { title: "Lesbians", value: "lesbians" },
        { title: "lgbt", value: "lgbt" },
        { title: "lgbtq+", value: "lgbtq-" },
        { title: "lingerie", value: "lingerie" },
        { title: "magic", value: "magic" },
        { title: "maid", value: "maid" },
        { title: "mass effect", value: "mass-effect" },
        { title: "masturbation", value: "masturbation" },
        { title: "mei", value: "mei" },
        { title: "mercy", value: "mercy" },
        { title: "metal gear", value: "metal-gear" },
        { title: "milf", value: "milf" },
        { title: "milking", value: "milking" },
        { title: "minotaur", value: "minotaur" },
        { title: "missionary", value: "missionary" },
        { title: "moaning", value: "moaning" },
        { title: "Monsters", value: "monsters" },
        { title: "mortal kombat", value: "mortal-kombat" },
        { title: "mouth rape", value: "mouth-rape" },
        { title: "muscular", value: "muscular" },
        { title: "nier automata", value: "nier-automata" },
        { title: "no sound", value: "no-sound" },
        { title: "nuns", value: "nuns" },
        { title: "nurses", value: "nurses" },
        { title: "office sex", value: "office-sex" },
        { title: "oral sex", value: "oral-sex" },
        { title: "orcs", value: "orcs" },
        { title: "orgy", value: "orgy" },
        { title: "overwatch", value: "overwatch" },
        { title: "Parodies", value: "parodies" },
        { title: "peeping", value: "peeping" },
        { title: "pharah", value: "pharah" },
        { title: "piercings", value: "piercings" },
        { title: "pink hair", value: "pink-hair" },
        { title: "pirates", value: "pirates" },
        { title: "pissing", value: "pissing" },
        { title: "pokemon", value: "pokemon" },
        { title: "police", value: "police" },
        { title: "pov", value: "pov" },
        { title: "public sex", value: "public-sex" },
        { title: "pussy rubbing", value: "pussy-rubbing" },
        { title: "queen", value: "queen" },
        { title: "rape", value: "rape" },
        { title: "redheads", value: "redheads" },
        { title: "resident evil", value: "resident-evil" },
        { title: "reverse cowgirl", value: "reverse-cowgirl" },
        { title: "rimjob", value: "rimjob" },
        { title: "robots", value: "robots" },
        { title: "russian subtitles", value: "russian-subtitles" },
        { title: "santa", value: "santa" },
        { title: "scary", value: "scary" },
        { title: "schoolgirls", value: "schoolgirls" },
        { title: "sci-fi", value: "sci-fi" },
        { title: "scissoring", value: "scissoring" },
        { title: "series", value: "series" },
        { title: "Shemales", value: "shemales" },
        { title: "showering", value: "showering" },
        { title: "singing", value: "singing" },
        { title: "sleep sex", value: "sleep-sex" },
        { title: "solo", value: "solo" },
        { title: "squirting", value: "squirting" },
        { title: "stockings", value: "stockings" },
        { title: "story", value: "story" },
        { title: "strangulation", value: "strangulation" },
        { title: "strap-ons", value: "strap-ons" },
        { title: "strip club", value: "strip-club" },
        { title: "stripper", value: "stripper" },
        { title: "succubus", value: "succubus" },
        { title: "swallowing", value: "swallowing" },
        { title: "tattoo", value: "tattoo" },
        { title: "teacher", value: "teacher" },
        { title: "teen titans", value: "teen-titans" },
        { title: "teenage sex", value: "teenage-sex" },
        { title: "Tentacles", value: "tentacles" },
        { title: "threesome", value: "threesome" },
        { title: "tifa lockhart", value: "tifa-lockhart" },
        { title: "tiny tits", value: "tiny-tits" },
        { title: "tmnt", value: "tmnt" },
        { title: "toilet", value: "toilet" },
        { title: "tomb raider", value: "tomb-raider" },
        { title: "toys", value: "toys" },
        { title: "tracer", value: "tracer" },
        { title: "train", value: "train" },
        { title: "tribadism", value: "tribadism" },
        { title: "triple penetration", value: "triple-penetration" },
        { title: "triss merigold", value: "triss-merigold" },
        { title: "umemaro", value: "umemaro" },
        { title: "uncensored", value: "uncensored" },
        { title: "underworld", value: "underworld" },
        { title: "vampire", value: "vampire" },
        { title: "velma", value: "velma" },
        { title: "virgins", value: "virgins" },
        { title: "virtual reality", value: "virtual-reality" },
        { title: "warewolf", value: "warewolf" },
        { title: "whipping", value: "whipping" },
        { title: "whore", value: "whore" },
        { title: "widowmaker", value: "widowmaker" },
        { title: "witcher", value: "witcher" },
        { title: "zarya", value: "zarya" },
        { title: "zombies", value: "zombies" }
          ]
        },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          enumOptions: [
            { title: "最新", value: "newest" },
            { title: "最早", value: "oldest" },
            { title: "最长", value: "longest" },
            { title: "最短", value: "shortest" },
            { title: "最多观看", value: "mostviewed" },
            { title: "最高评分", value: "toprated" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "keyword",
      title: "关键词",
      functionName: "loadKeyword",
      type: "video",
      cacheDuration: 600,
      params: [
        { name: "keyword", title: "关键词", type: "input", value: "bbc", placeholders: [{ title: "bbc", value: "bbc" }] },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          enumOptions: [
            { title: "最新", value: "newest" },
            { title: "最早", value: "oldest" },
            { title: "最长", value: "longest" },
            { title: "最短", value: "shortest" },
            { title: "最多观看", value: "mostviewed" },
            { title: "最高评分", value: "toprated" }
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

var PC_HOST = "https://porcore.com";
var PC_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

async function pcGet(url) {
  var res = await Widget.http.get(url, {
    headers: { "User-Agent": PC_UA, "Referer": PC_HOST + "/" }
  });
  var d = res && res.data;
  if (d == null) return "";
  return typeof d === "string" ? d : String(d);
}

function pcListUrl(base, page, sort) {
  if (page <= 1) {
    return sort && sort !== "newest" ? base + "?sort=" + sort : base;
  }
  var sep = base.charAt(base.length - 1) === "/" ? "&" : "?";
  var u = base + sep + "ajax&p=" + page;
  if (sort && sort !== "newest") u += "&sort=" + sort;
  return u;
}

function pcParseList(html) {
  if (!html) return [];
  var $ = Widget.html.load(html);
  var out = [];
  $(".onevideothumb").each(function (i, el) {
    var a = $(el).find("a.clip-link").first();
    var href = a.attr("href") || "";
    var m = href.match(/\/video\/(\d+)\//);
    if (!m) return;
    var title = (a.attr("title") || "").trim();
    if (!title) return;
    var img = $(el).find("img").first().attr("src") || "";
    var dur = $(el).find(".videoparams .floatlefttop").first().text().replace(/\s+/g, " ").trim();
    var item = {
      id: "pc:" + m[1],
      type: "url",
      title: title,
      link: href.indexOf("http") === 0 ? href : PC_HOST + href,
      backdropPath: img
    };
    if (dur) item.durationText = dur;
    out.push(item);
  });
  return out;
}

async function loadLatest(params) {
  params = params || {};
  var page = parseInt(params.page, 10) || 1;
  var html = await pcGet(pcListUrl(PC_HOST + "/", page, params.sort));
  return pcParseList(html);
}

async function loadCategory(params) {
  params = params || {};
  var page = parseInt(params.page, 10) || 1;
  var cat = params.genreId || params.cat || "3d";
  var html = await pcGet(pcListUrl(PC_HOST + "/show/" + cat, page, params.sort));
  return pcParseList(html);
}

async function pcTagList(kw, page, sort) {
  var base = PC_HOST + "/show/" + encodeURIComponent(kw);
  var items = pcParseList(await pcGet(pcListUrl(base, page, sort)));
  if (!items.length && page <= 1 && kw.indexOf(" ") >= 0) {
    var alt = PC_HOST + "/show/" + encodeURIComponent(kw.replace(/\s+/g, "-"));
    items = pcParseList(await pcGet(pcListUrl(alt, page, sort)));
  }
  return items;
}

async function loadKeyword(params) {
  params = params || {};
  var kw = (params.keyword || "").trim() || "bbc";
  var page = parseInt(params.page, 10) || 1;
  return pcTagList(kw, page, params.sort);
}

async function search(params) {
  params = params || {};
  var kw = (params.keyword || "").trim();
  if (!kw) return [];
  var page = parseInt(params.page, 10) || 1;
  return pcTagList(kw, page, "");
}

function pcDetailId(link) {
  var m = String(link || "").match(/\/video\/(\d+)/);
  return m ? m[1] : "";
}

async function loadDetail(link) {
  var url = String(link || "");
  if (url.indexOf("http") !== 0) return null;
  var html = await pcGet(url);
  if (!html) return null;
  var $ = Widget.html.load(html);
  var title = ($('meta[property="og:title"]').attr("content") || $("h1").first().text() || "").replace(/\s+/g, " ").trim();
  if (!title) return null;
  var desc = ($('meta[property="og:description"]').attr("content") || $('meta[name="description"]').attr("content") || "").trim();
  var vid = pcDetailId(url);
  var backdrop = $('meta[property="og:image"]').attr("content") || "";
  if (!backdrop && vid) backdrop = PC_HOST + "/res.php?q=91&w=854&h=480&src=media/thumbs/" + vid + "/i101.jpg";
  var genres = [];
  var seenG = {};
  $('a[href^="/show/"]').each(function (i, el) {
    var href = $(el).attr("href") || "";
    var slug = href.replace("/show/", "").replace(/\/$/, "");
    var name = $(el).text().replace(/\s+/g, " ").trim();
    if (slug && name && !seenG[slug]) {
      seenG[slug] = 1;
      genres.push({ id: slug, title: name });
    }
  });
  var item = {
    id: "pc:" + vid,
    type: "url",
    title: title,
    link: url,
    backdropPath: backdrop,
    description: desc,
    genreItems: genres
  };
  return item;
}

async function loadResource(params) {
  params = params || {};
  var url = "";
  if (params.link && String(params.link).indexOf("porcore.com/video/") >= 0) url = String(params.link);
  if (!url && params.id) {
    var vid = String(params.id).replace(/^pc:/, "");
    if (/^\d+$/.test(vid)) url = PC_HOST + "/video/" + vid + "/";
  }
  if (!url) return [];
  var html = await pcGet(url);
  if (!html) return [];
  var mm = html.match(/src="(https?:\/\/[^"]+\.m3u8)"/) || html.match(/(https?:\/\/[^\s"'<>]+\.m3u8)/);
  if (!mm) return [];
  var master = mm[1];
  var headers = { "User-Agent": PC_UA, "Referer": PC_HOST + "/" };
  var lines = [];
  try {
    var m3u = await pcGet(master);
    var raw = m3u.split("\n");
    for (var i = 0; i < raw.length; i++) {
      var line = raw[i].trim();
      if (line.indexOf("#EXT-X-STREAM-INF") === 0) {
        var rm = line.match(/RESOLUTION=(\d+)x(\d+)/);
        var h = rm ? parseInt(rm[2], 10) : 0;
        var vurl = "";
        for (var j = i + 1; j < raw.length; j++) {
          var cand = raw[j].trim();
          if (cand) { vurl = cand; break; }
        }
        if (vurl) {
          if (vurl.indexOf("http") !== 0) {
            vurl = master.slice(0, master.lastIndexOf("/") + 1) + vurl;
          }
          lines.push({ h: h, name: h ? h + "P" : "自动", url: vurl });
        }
      }
    }
  } catch (e) {}
  lines.sort(function (a, b) { return b.h - a.h; });
  lines = lines.slice(0, 1);
  var out = lines.map(function (l) {
    return { name: l.name, url: l.url, customHeaders: headers, playerType: "app" };
  });
  if (!out.length) out = [{ name: "自动", url: master, customHeaders: headers, playerType: "app" }];
  return out;
}
