WidgetMetadata = {
  "id": "anysex",
  "title": "AnySex",
  "version": "1.0.4",
  "requiredVersion": "0.0.1",
  "description": "分类、排序、搜索与按需播放。",
  "author": "Coko",
  "site": "https://anysex.com",
  "detailCacheDuration": 600,
  "modules": [
    {
      "id": "browse",
      "title": "视频浏览",
      "functionName": "loadList",
      "cacheDuration": 300,
      "requiresWebView": false,
      "params": [
        {
          "name": "section",
          "title": "入口",
          "type": "constant",
          "value": "videos"
        },
        {
          "name": "sort_by",
          "title": "排序",
          "type": "enumeration",
          "value": "new",
          "enumOptions": [
            {
              "title": "最新发布",
              "value": "new"
            },
            {
              "title": "最多观看",
              "value": "views"
            },
            {
              "title": "最高评分",
              "value": "top"
            }
          ]
        },
        {
          "name": "period",
          "title": "榜单范围",
          "type": "enumeration",
          "value": "all",
          "belongTo": {
            "paramName": "sort_by",
            "value": [
              "views",
              "top"
            ]
          },
          "enumOptions": [
            {
              "title": "全部时间",
              "value": "all"
            },
            {
              "title": "本周",
              "value": "week"
            },
            {
              "title": "今日",
              "value": "day"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page",
          "value": "1"
        }
      ]
    },
    {
      "id": "categories",
      "title": "分类浏览",
      "functionName": "loadList",
      "cacheDuration": 300,
      "requiresWebView": false,
      "params": [
        {
          "name": "section",
          "title": "入口",
          "type": "constant",
          "value": "categories"
        },
        {
          "name": "category",
          "title": "分类（原站名称）",
          "type": "enumeration",
          "value": "all",
          "enumOptions": [
            {
              "title": "全部分类",
              "value": "all"
            },
            {
              "title": "Japanese",
              "value": "japanese"
            },
            {
              "title": "Asian",
              "value": "asian"
            },
            {
              "title": "Squirting",
              "value": "squirting"
            },
            {
              "title": "Hot Teen 18+",
              "value": "teen"
            },
            {
              "title": "Russian Girl",
              "value": "russian"
            },
            {
              "title": "Orgasm",
              "value": "orgasm"
            },
            {
              "title": "Old+Young (18-25)",
              "value": "old-young"
            },
            {
              "title": "Step Family",
              "value": "step-family"
            },
            {
              "title": "Beauty",
              "value": "beauty"
            },
            {
              "title": "Mom",
              "value": "mom"
            },
            {
              "title": "Indian",
              "value": "indian"
            },
            {
              "title": "Vintage",
              "value": "vintage"
            },
            {
              "title": "Close-up",
              "value": "close-up"
            },
            {
              "title": "Gangbang",
              "value": "gangbang"
            },
            {
              "title": "Compilation",
              "value": "compilation"
            },
            {
              "title": "Cheating",
              "value": "cheating"
            },
            {
              "title": "Anal",
              "value": "anal"
            },
            {
              "title": "Massage",
              "value": "massage"
            },
            {
              "title": "Celebrities",
              "value": "celebrities"
            },
            {
              "title": "Amateur",
              "value": "amateur"
            },
            {
              "title": "Milf",
              "value": "milf"
            },
            {
              "title": "Party",
              "value": "party"
            },
            {
              "title": "Big Tits",
              "value": "big-tits"
            },
            {
              "title": "Office",
              "value": "office"
            },
            {
              "title": "Bisexual",
              "value": "bisexual"
            },
            {
              "title": "Cum in mouth",
              "value": "cum-in-mouth"
            },
            {
              "title": "Black porn",
              "value": "black-porn"
            },
            {
              "title": "College",
              "value": "college"
            },
            {
              "title": "BBW",
              "value": "bbw"
            },
            {
              "title": "BDSM",
              "value": "bdsm"
            },
            {
              "title": "AI Generated",
              "value": "ai"
            },
            {
              "title": "Mature",
              "value": "mature"
            },
            {
              "title": "Reality",
              "value": "reality"
            },
            {
              "title": "Hairy",
              "value": "hairy"
            },
            {
              "title": "Housewife",
              "value": "housewive"
            },
            {
              "title": "Hardcore",
              "value": "hardcore"
            },
            {
              "title": "Sex Toys",
              "value": "sex-toys"
            },
            {
              "title": "Public",
              "value": "public"
            },
            {
              "title": "Masturbation",
              "value": "masturbation"
            },
            {
              "title": "Uniform",
              "value": "uniform"
            },
            {
              "title": "Homemade",
              "value": "homemade"
            },
            {
              "title": "Teacher",
              "value": "teacher"
            },
            {
              "title": "Threesome",
              "value": "threesome"
            },
            {
              "title": "Cumshot",
              "value": "cumshot"
            },
            {
              "title": "Granny",
              "value": "granny"
            },
            {
              "title": "Stockings",
              "value": "stockings"
            },
            {
              "title": "Hentai",
              "value": "hentai"
            },
            {
              "title": "Femdom",
              "value": "femdom"
            },
            {
              "title": "Big Dick",
              "value": "big-dick"
            },
            {
              "title": "Handjob",
              "value": "handjob"
            },
            {
              "title": "Beach",
              "value": "beach"
            },
            {
              "title": "Orgy",
              "value": "orgy"
            },
            {
              "title": "Upskirt",
              "value": "upskirt"
            },
            {
              "title": "Interracial",
              "value": "interracial"
            },
            {
              "title": "Webcam",
              "value": "webcam"
            },
            {
              "title": "Small Tits",
              "value": "small-tits"
            },
            {
              "title": "Cuckold",
              "value": "cuckold"
            },
            {
              "title": "Lingerie",
              "value": "lingerie"
            },
            {
              "title": "Latina",
              "value": "latina"
            },
            {
              "title": "Blowjob",
              "value": "blowjob"
            },
            {
              "title": "Double Penetration",
              "value": "dp"
            },
            {
              "title": "Erotic",
              "value": "erotic"
            },
            {
              "title": "Ebony",
              "value": "ebony"
            },
            {
              "title": "Swingers",
              "value": "swingers"
            },
            {
              "title": "Italian",
              "value": "italian"
            },
            {
              "title": "Lesbian",
              "value": "lesbian"
            },
            {
              "title": "Arab",
              "value": "arab"
            },
            {
              "title": "Cream Pie",
              "value": "cream-pie"
            },
            {
              "title": "German",
              "value": "german"
            },
            {
              "title": "Pantyhose",
              "value": "pantyhose"
            },
            {
              "title": "French",
              "value": "french"
            },
            {
              "title": "Outdoor",
              "value": "outdoor"
            },
            {
              "title": "Brazilian",
              "value": "brazilian"
            },
            {
              "title": "POV",
              "value": "pov"
            },
            {
              "title": "Doggystyle",
              "value": "doggystyle"
            },
            {
              "title": "British 🇬🇧",
              "value": "british"
            },
            {
              "title": "Footjob",
              "value": "footjob"
            },
            {
              "title": "Thick Ass",
              "value": "ass"
            },
            {
              "title": "Fisting",
              "value": "fisting"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "排序",
          "type": "enumeration",
          "value": "new",
          "enumOptions": [
            {
              "title": "最新发布",
              "value": "new"
            },
            {
              "title": "最多观看",
              "value": "views"
            },
            {
              "title": "最高评分",
              "value": "top"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page",
          "value": "1"
        }
      ]
    },
    {
      "id": "uhd",
      "title": "4K 专区",
      "functionName": "loadList",
      "cacheDuration": 300,
      "requiresWebView": false,
      "params": [
        {
          "name": "section",
          "title": "入口",
          "type": "constant",
          "value": "4k"
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page",
          "value": "1"
        }
      ]
    },
    {
      "id": "loadResource",
      "title": "播放资源",
      "functionName": "loadResource",
      "type": "stream",
      "cacheDuration": 0,
      "requiresWebView": false,
      "params": []
    }
  ],
  "search": {
    "title": "搜索 AnySex",
    "functionName": "search",
    "params": [
      {
        "name": "keyword",
        "title": "关键词",
        "type": "input"
      },
      {
        "name": "sort_by",
        "title": "排序",
        "type": "enumeration",
        "value": "default",
        "enumOptions": [
          {
            "title": "站点默认",
            "value": "default"
          },
          {
            "title": "最新发布",
            "value": "new"
          },
          {
            "title": "最多观看",
            "value": "views"
          },
          {
            "title": "最高评分",
            "value": "top"
          }
        ]
      },
      {
        "name": "page",
        "title": "页码",
        "type": "page",
        "value": "1"
      }
    ]
  }
};

var AX_CATEGORY_PATHS = {
  "japanese": "/videos/categories/japanese/",
  "asian": "/videos/categories/asian/",
  "squirting": "/videos/categories/squirting/",
  "teen": "/videos/categories/teen/",
  "russian": "/videos/categories/russian/",
  "orgasm": "/videos/categories/orgasm/",
  "old-young": "/videos/categories/old-young/",
  "step-family": "/videos/categories/step-family/",
  "beauty": "/videos/categories/beauty/",
  "mom": "/videos/categories/mom/",
  "indian": "/videos/categories/indian/",
  "vintage": "/videos/categories/vintage/",
  "close-up": "/videos/categories/close-up/",
  "gangbang": "/videos/categories/gangbang/",
  "compilation": "/videos/categories/compilation/",
  "cheating": "/videos/categories/cheating/",
  "anal": "/videos/categories/anal/",
  "massage": "/videos/categories/massage/",
  "celebrities": "/videos/categories/celebrities/",
  "amateur": "/videos/categories/amateur/",
  "milf": "/videos/categories/milf/",
  "party": "/videos/categories/party/",
  "big-tits": "/videos/categories/big-tits/",
  "office": "/videos/categories/office/",
  "bisexual": "/videos/categories/bisexual/",
  "cum-in-mouth": "/videos/categories/cum-in-mouth/",
  "black-porn": "/videos/categories/black-porn/",
  "college": "/videos/categories/college/",
  "bbw": "/videos/categories/bbw/",
  "bdsm": "/videos/categories/bdsm/",
  "ai": "/videos/categories/ai/",
  "mature": "/videos/categories/mature/",
  "reality": "/videos/categories/reality/",
  "hairy": "/videos/categories/hairy/",
  "housewive": "/videos/categories/housewive/",
  "hardcore": "/videos/categories/hardcore/",
  "sex-toys": "/videos/categories/sex-toys/",
  "public": "/videos/categories/public/",
  "masturbation": "/videos/categories/masturbation/",
  "uniform": "/videos/categories/uniform/",
  "homemade": "/videos/categories/homemade/",
  "teacher": "/videos/categories/teacher/",
  "threesome": "/videos/categories/threesome/",
  "cumshot": "/videos/categories/cumshot/",
  "granny": "/videos/categories/granny/",
  "stockings": "/videos/categories/stockings/",
  "hentai": "/videos/categories/hentai/",
  "femdom": "/videos/categories/femdom/",
  "big-dick": "/videos/categories/big-dick/",
  "handjob": "/videos/categories/handjob/",
  "beach": "/videos/categories/beach/",
  "orgy": "/videos/categories/orgy/",
  "upskirt": "/videos/categories/upskirt/",
  "interracial": "/videos/categories/interracial/",
  "webcam": "/videos/categories/webcam/",
  "small-tits": "/videos/categories/small-tits/",
  "cuckold": "/videos/categories/cuckold/",
  "lingerie": "/videos/categories/lingerie/",
  "latina": "/videos/categories/latina/",
  "blowjob": "/videos/categories/blowjob/",
  "dp": "/videos/categories/dp/",
  "erotic": "/videos/categories/erotic/",
  "ebony": "/videos/categories/ebony/",
  "swingers": "/videos/categories/swingers/",
  "italian": "/videos/categories/italian/",
  "lesbian": "/videos/categories/lesbian/",
  "arab": "/videos/categories/arab/",
  "cream-pie": "/videos/categories/cream-pie/",
  "german": "/videos/categories/german/",
  "pantyhose": "/videos/categories/pantyhose/",
  "french": "/videos/categories/french/",
  "outdoor": "/videos/categories/outdoor/",
  "brazilian": "/videos/categories/brazilian/",
  "pov": "/videos/categories/pov/",
  "doggystyle": "/videos/categories/doggystyle/",
  "british": "/videos/categories/british/",
  "footjob": "/videos/categories/footjob/",
  "ass": "/videos/categories/ass/",
  "fisting": "/videos/categories/fisting/"
};

// AnySex ForwardWidget. No external JS evaluation or signed-URL persistence.
var AX_BASE = 'https://anysex.com';
var AX_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15';
var AX_HEADERS = { 'User-Agent': AX_UA, 'Referer': AX_BASE + '/', 'Accept-Language': 'en-US,en;q=0.9' };

function axText(value) {
  return String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
}
function axHas(object, key) {
  return object != null && Object.prototype.hasOwnProperty.call(object, key);
}
function axPage(value) {
  var number = Number(value == null ? 1 : value);
  return isFinite(number) && number >= 1 && number <= 50000 ? Math.floor(number) : 1;
}
function axURL(value) {
  var url = axText(value);
  if (!url || /[\u0000-\u0020\\]/.test(url)) return '';
  if (url.indexOf('//') === 0) url = 'https:' + url;
  else if (url.charAt(0) === '/') url = AX_BASE + url;
  return /^https?:\/\/[a-z0-9.-]+(?::\d+)?(?:\/[^\s]*)?$/i.test(url) ? url : '';
}
function axPartition(prefix) {
  if (!prefix || prefix === '/') return true;
  var keys = Object.keys(AX_CATEGORY_PATHS);
  return keys.some(function(key) { return AX_CATEGORY_PATHS[key] === prefix && /^\/[a-z0-9-]+\/$/.test(prefix); });
}
function axOwnedLink(raw) {
  if (typeof raw !== 'string' || !raw || raw !== raw.trim()) return null;
  // A bare numeric identity cannot locate this site: /video/<id>/ returns 404.
  // Complete links are emitted by lists; the explicit namespace form also requires a slug.
  var ns = /^anysex:(?:([a-z][a-z0-9-]*):)?([1-9]\d{0,11}):([^:\s]+)$/.exec(raw);
  if (ns) {
    var slug;
    try { slug = decodeURIComponent(ns[3]); } catch (_) { return null; }
    if (!/^[a-z0-9][a-z0-9_-]{0,499}$/i.test(slug)) return null;
    raw = AX_BASE + '/' + (ns[1] ? ns[1] + '/' : '') + 'video/' + ns[2] + '/' + slug + '/';
  }
  var match = /^https?:\/\/anysex\.com\/(?:([a-z0-9-]+)\/)?video\/([1-9]\d{0,11})\/([a-z0-9][a-z0-9_-]{0,499})\/?$/i.exec(raw);
  if (!match) return null;
  var prefix = match[1] ? '/' + match[1] + '/' : '/';
  if (!axPartition(prefix)) return null;
  return { id:match[2], url:AX_BASE + prefix + 'video/' + match[2] + '/' + match[3] + '/', key:'anysex:' + match[2], prefix:prefix };
}
function axSourceContext(params) {
  if (!params || typeof params !== 'object') return null;
  if (axHas(params, 'link')) return params.link;
  if (params.item && typeof params.item === 'object' && axHas(params.item, 'link')) return params.item.link;
  if (axHas(params, 'id')) return params.id;
  if (params.item && typeof params.item === 'object' && axHas(params.item, 'id')) return params.item.id;
  return null;
}
function axFilter(raw) {
  if (typeof raw !== 'string') return null;
  var match = /^anysex:(category|tag|model|channel):(?:([a-z][a-z0-9-]*):)?([a-z0-9][a-z0-9_-]{0,199})$/.exec(raw);
  if (!match) return null;
  var prefix = match[2] ? '/' + match[2] + '/' : '/';
  if (!axPartition(prefix)) return null;
  var prefixes = { category:'videos/categories/', tag:'tags/', model:'models/', channel:'channels/' };
  var mapped = match[1] === 'category' && !match[2] && axHas(AX_CATEGORY_PATHS, match[3]) ? AX_CATEGORY_PATHS[match[3]] : '';
  return { kind:match[1], slug:match[3], path:mapped || prefix + prefixes[match[1]] + match[3] + '/' };
}
function axPathPage(path, page) {
  return path + (page > 1 ? page + '/' : '');
}
async function axHTML(url, query, fresh, allow404) {
  var headers = { 'User-Agent':AX_HEADERS['User-Agent'], Referer:AX_HEADERS.Referer, 'Accept-Language':AX_HEADERS['Accept-Language'] };
  if (fresh) headers['Cache-Control'] = 'no-cache';
  var response = await Widget.http.get(url, { headers:headers, params:query || {} });
  var status = Number(response && (response.status || response.statusCode) || 200);
  if (status === 404 && allow404) return '';
  if (status >= 400) throw new Error('站点请求失败（HTTP ' + status + '）');
  var html = response && response.data;
  if (typeof html !== 'string' || !html.trim()) throw new Error('站点返回了空页面或非 HTML 数据');
  if (/cf-chl-|Just a moment\.\.\.|cf-turnstile/i.test(html) && !/class=["'][^"']*list-videos|\bflashvars\b/.test(html)) {
    throw new Error('站点需要网页验证，请先在浏览器确认网络和访问状态');
  }
  return html;
}
function axDuration(raw) {
  var value = axText(raw), parts;
  if (/^\d+(?::\d{1,2}){1,2}$/.test(value)) {
    parts = value.split(':');
    return parts.reduce(function(sum, part) { return sum * 60 + Number(part); }, 0);
  }
  var iso = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/i.exec(value);
  return iso ? Number(iso[1] || 0) * 3600 + Number(iso[2] || 0) * 60 + Number(iso[3] || 0) : 0;
}
function axDurationText(seconds) {
  seconds = Math.max(0, Math.floor(Number(seconds) || 0));
  var pad = function(n) { return (n < 10 ? '0' : '') + n; };
  return seconds >= 3600 ? Math.floor(seconds / 3600) + ':' + pad(Math.floor(seconds / 60) % 60) + ':' + pad(seconds % 60) : Math.floor(seconds / 60) + ':' + pad(seconds % 60);
}
function axRating(raw) {
  var m = /([\d.]+)\s*%/.exec(axText(raw));
  return m ? Math.max(0, Math.min(10, Math.round(Number(m[1])) / 10)) : null;
}
function axCover($, root) {
  var image = root.find('.img img').first();
  if (!image.length) image = root.find('img').first();
  var values = [image.attr('data-jpg'), image.attr('data-src'), image.attr('data-original'), image.attr('src')];
  for (var i = 0; i < values.length; i++) {
    var url = axURL(values[i]);
    if (url && !/\.(?:svg|gif)(?:[?#]|$)|placeholder|spacer/i.test(url)) return url;
  }
  return '';
}
function axParseCards($, container) {
  var output = [], seen = {};
  var cards = container ? container.find('.list-videos > .item') : $('.list-videos > .item');
  cards.each(function(index, element) {
    var card = $(element), anchor = card.find('a[href*="/video/"]').first();
    var owned = axOwnedLink(axURL(anchor.attr('href')));
    if (!owned || seen[owned.id]) return;
    var cardID = card.attr('data-video-id');
    if (cardID && String(cardID) !== owned.id) return;
    var title = axText(card.find('strong.title, .title').first().text()) || axText(card.find('img').first().attr('alt'));
    if (!title) return;
    seen[owned.id] = true;
    var cover = axCover($, card), duration = axDuration(card.find('.duration').first().text());
    var rating = axRating(card.find('.rating').first().text());
    var quality = axText(card.find('.item-quality').first().text());
    var views = axText(card.find('.views').first().text());
    var item = { id:owned.key, type:'url', mediaType:'movie', title:title, link:owned.url,
      coverUrl:cover, backdropPath:cover, headers:{Referer:AX_BASE + '/'},
      description:[quality, views].filter(Boolean).join(' · ') };
    if (duration) { item.duration = duration; item.durationText = axDurationText(duration); }
    if (rating != null) item.rating = rating;
    // Deliberately do not treat short hover-preview clips as full playback.
    output.push(item);
  });
  return output;
}
function axListFromHTML(html) {
  if (!html) return [];
  var $ = Widget.html.load(html), items = axParseCards($);
  if (!items.length && !$('.list-videos, .empty-content, .no-results, [id^="list_videos_"]').length) {
    throw new Error('未找到视频列表，站点结构可能已变化');
  }
  return items;
}

async function loadList(params) {
  try {
    params = params || {};
    var page = axPage(params.page), sort = /^(new|views|top)$/.test(params.sort_by || '') ? params.sort_by : 'new';
    var filter = null, path, query = {};
    if (params.genreId != null && String(params.genreId) !== '') {
      filter = axFilter(String(params.genreId));
      if (!filter) return [];
    } else if (params.peopleId != null && String(params.peopleId) !== '') {
      filter = axFilter(String(params.peopleId));
      if (!filter) return [];
    } else if (params.category && params.category !== 'all') {
      filter = axFilter('anysex:category:' + String(params.category));
      if (!filter) return [];
    }
    if (filter) {
      if (filter.kind === 'category' && /^\/[a-z0-9-]+\/$/.test(filter.path)) {
        path = filter.path + 'videos/' + (sort === 'views' ? 'most-viewed/' : (sort === 'top' ? 'top-rated/' : 'new/'));
        if (sort !== 'new') query.sort = sort;
      } else {
        path = filter.path;
        query.sort = sort;
      }
    } else if (params.section === '4k') {
      path = '/videos/4k/';
    } else {
      path = sort === 'views' ? '/videos/most-viewed/' : (sort === 'top' ? '/videos/top-rated/' : '/videos/new/');
      if (sort !== 'new') {
        var period = params.section === 'categories' ? 'all' : params.period;
        query.sort = sort + (period === 'week' ? '7' : (period === 'day' ? '1' : ''));
      }
    }
    var html = await axHTML(AX_BASE + axPathPage(path, page), query, false, true);
    return axListFromHTML(html);
  } catch (error) {
    console.error('[AnySex/loadList] ' + (error.message || error));
    throw error;
  }
}

async function search(params) {
  try {
    params = params || {};
    var keyword = axText(params.keyword);
    if (!keyword) return [];
    if (keyword.length > 200) throw new Error('关键词过长，请缩短到 200 个字符以内');
    var query = { q:keyword };
    if (/^(new|views|top)$/.test(params.sort_by || '')) query.sort = params.sort_by;
    var html = await axHTML(AX_BASE + axPathPage('/search/', axPage(params.page)), query, false, true);
    return axListFromHTML(html);
  } catch (error) {
    console.error('[AnySex/search] ' + (error.message || error));
    throw error;
  }
}

function axVideoObject($) {
  var result = null;
  $('script[type="application/ld+json"]').each(function(index, element) {
    if (result) return;
    var data;
    try { data = JSON.parse($(element).html() || '{}'); } catch (_) { return; }
    var queue = Array.isArray(data) ? data.slice() : [data];
    while (queue.length) {
      var node = queue.shift();
      if (!node || typeof node !== 'object') continue;
      if (node['@type'] === 'VideoObject' || (Array.isArray(node['@type']) && node['@type'].indexOf('VideoObject') >= 0)) {
        result = node; break;
      }
      if (Array.isArray(node['@graph'])) queue = queue.concat(node['@graph']);
    }
  });
  return result || {};
}
function axDocument(html, requested) {
  if (!html || !requested) return null;
  var $ = Widget.html.load(html);
  var canonical = axOwnedLink(axURL($('link[rel="canonical"]').first().attr('href')));
  var voteID = $('.block-video .rate-like[data-video-id]').first().attr('data-video-id');
  if (canonical) {
    if (canonical.id !== requested.id) return null;
    if (voteID && String(voteID) !== requested.id) return null;
  } else if (!voteID || String(voteID) !== requested.id) {
    return null;
  }
  return { $:$, owned:canonical || requested, ld:axVideoObject($) };
}
function axCount(value) {
  var m = /^([\d,.]+)\s*([kmb])?/i.exec(axText(value));
  if (!m) return null;
  var n = Number(m[1].replace(/,/g, ''));
  var factors = {k:1000, m:1000000, b:1000000000};
  return isFinite(n) ? n * (factors[(m[2] || '').toLowerCase()] || 1) : null;
}
function axQuality(label, url) {
  if (/^4k$/i.test(label)) return 2160;
  if (/^8k$/i.test(label)) return 4320;
  var m = /^(\d{3,4})p?$/i.exec(label);
  if (m) return Number(m[1]);
  m = /_(\d{3,4})p?\.mp4/i.exec(url);
  return m ? Number(m[1]) : 480;
}
function axMediaURL(value, owned) {
  if (typeof value !== 'string' || !owned) return '';
  var url = axURL(value);
  // Both native sources and metadata must name this exact video and partition.
  var match = /^https:\/\/anysex\.com((?:\/[a-z0-9-]+)?\/)get_file\/\d+\/[a-f0-9]{32,64}\/\d+\/(\d+)\/(\d+)(?:_\d+p?)?\.mp4\/?(?:\?[^#\s]*)?$/i.exec(url);
  return match && match[1] === owned.prefix && match[2] === owned.id && match[3] === owned.id ? url : '';
}
function axSources(doc) {
  var result = [], seen = {}, $ = doc.$;
  $('#main_video source[src]').each(function(index, element) {
    var elementNode = $(element), url = axMediaURL(elementNode.attr('src'), doc.owned);
    if (!url || seen[url]) return;
    if (axText(elementNode.attr('type')).toLowerCase() !== 'video/mp4') return;
    seen[url] = true;
    var quality = axQuality(axText(elementNode.attr('title')), url);
    result.push({ url:url, height:quality, name:quality === 2160 ? '4K · 2160P' : quality + 'P' });
  });
  // Some pages omit the player but publish a working full MP4 in VideoObject.
  // Use only the supplied, validated URL; neither guess variants nor assume 4K.
  if (!result.length && doc.ld) {
    var fallback = axMediaURL(doc.ld.contentUrl, doc.owned);
    if (fallback) result.push({ url:fallback, height:0, name:'原站直链' });
  }
  result.sort(function(a, b) { return b.height - a.height; });
  // Hide <=480P when a higher tier exists; keep the best low tier as fallback.
  var bestHeight = result.length ? result[0].height : 0;
  return result.filter(function(source) { return source.height > 480 || source.height === bestHeight; });
}
function axTaxonomy(url, title) {
  url = axURL(url);
  if (!/^https?:\/\/anysex\.com\//i.test(url) || !title) return null;
  var path = url.replace(/^https?:\/\/anysex\.com/i, '');
  var keys = Object.keys(AX_CATEGORY_PATHS);
  for (var i = 0; i < keys.length; i++) {
    if (AX_CATEGORY_PATHS[keys[i]] === path) return { kind:'category', id:'anysex:category:' + keys[i], title:title };
  }
  var match = /^\/(?:([a-z0-9-]+)\/)?(videos\/categories|tags|models|channels)\/([a-z0-9][a-z0-9_-]{0,199})\/$/i.exec(path);
  if (!match || !axPartition(match[1] ? '/' + match[1] + '/' : '/')) return null;
  var kind = {'videos/categories':'category', tags:'tag', models:'model', channels:'channel'}[match[2]];
  if (!kind) return null;
  return { kind:kind, id:'anysex:' + kind + ':' + (match[1] ? match[1] + ':' : '') + match[3], title:title };
}
function axMetadataLinks($) {
  var result = [], seen = {};
  $('.block-video .video-tags a[href]').each(function(index, element) {
    var anchor = $(element), copy = anchor.clone();
    copy.find('i, .count').remove();
    var value = axTaxonomy(anchor.attr('href'), axText(copy.text()));
    if (value && !seen[value.id]) { result.push(value); seen[value.id] = true; }
  });
  return result;
}

async function loadDetail(link) {
  try {
    var owned = axOwnedLink(link);
    if (!owned) return null;
    var html = await axHTML(owned.url, {}, false, true);
    var doc = axDocument(html, owned);
    if (!doc) return null;
    var $ = doc.$, ld = doc.ld, current = doc.owned;
    var title = axText($('.block-video .page-title h1').first().text()) || axText(ld.name);
    if (!title) throw new Error('详情页缺少标题，站点结构可能已变化');
    var thumbnail = Array.isArray(ld.thumbnailUrl) ? ld.thumbnailUrl[0] : ld.thumbnailUrl;
    var cover = axURL($('meta[property="og:image"]').first().attr('content')) || axURL(thumbnail);
    var duration = axDuration(ld.duration) || axDuration($('.block-video .page-title .badge.duration').first().text());
    var uploaded = axText(ld.uploadDate), date = /^\d{4}-\d{2}-\d{2}/.test(uploaded) ? uploaded.slice(0, 10) : '';
    var description = axText($('#tab_video_info .info > .item:not(.cs_link)').first().text()) || axText(ld.description);
    var links = axMetadataLinks($), categories = [], genres = [], people = [];
    links.forEach(function(value) {
      if (value.kind === 'model') people.push({id:value.id, title:value.title, role:'出演'});
      else {
        if (value.kind === 'category') categories.push(value.title);
        var prefix = value.kind === 'tag' ? '标签 · ' : (value.kind === 'channel' ? '频道 · ' : '');
        genres.push({id:value.id, title:prefix + value.title});
      }
    });
    var likes = axCount($('.rating-container .rate-like span').first().text());
    var dislikes = axCount($('.rating-container .rate-dislike span').first().text());
    var votes = likes != null && dislikes != null ? likes + dislikes : 0;
    var rating = votes > 0 ? Math.round(likes * 100 / votes) / 10 : null;
    var relatedRoot = $('#list_videos_custom_related_sphinx_videos');
    var related = relatedRoot.length ? axParseCards($, relatedRoot).filter(function(item) { return item.id !== current.key; }).slice(0, 24) : [];
    var item = { id:current.key, type:'url', mediaType:'movie', title:title, link:current.url,
      coverUrl:cover, backdropPath:cover, headers:{Referer:current.url},
      description:description, genreTitle:categories.join(' · '), genreItems:genres, peoples:people,
      relatedItems:related, backdropPaths:[] };
    if (duration) { item.duration = duration; item.durationText = axDurationText(duration); }
    // This is the site's upload date, not a verified original production/release date.
    if (date) item.releaseDate = date;
    if (rating != null) item.rating = rating;
    // Never cache signed full-media URLs in a VideoItem, preview or episode list.
    return item;
  } catch (error) {
    console.error('[AnySex/loadDetail] ' + (error.message || error));
    throw error;
  }
}

async function loadResource(params) {
  try {
    var owned = axOwnedLink(axSourceContext(params));
    if (!owned) return [];
    var html = await axHTML(owned.url, {}, true, true);
    var doc = axDocument(html, owned);
    if (!doc) return [];
    return axSources(doc).map(function(source) {
      return { name:source.name, description:source.height > 0 ? 'MP4 · 原站画质标签 · 起播时刷新' : 'MP4 · 原站直链 · 起播时刷新', url:source.url,
        customHeaders:{'User-Agent':AX_UA, Referer:doc.owned.url}, playerType:'app' };
    });
  } catch (error) {
    console.error('[AnySex/loadResource] ' + (error.message || error));
    throw error;
  }
}
