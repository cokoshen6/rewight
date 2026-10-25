const MISSAV_SITE = "https://missav.live";
const MISSAV_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_2 like Mac OS X) AppleWebKit/604.1.14 (KHTML, like Gecko)";
const MISSAV_BROWSER_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0";

var WidgetMetadata = {
  id: "missav.lite",
  title: "MissAV-lite",
  description: "获取 MissAV 推荐",
  author: "Coko",
  version: "1.2.1",
  requiredVersion: "0.0.1",
  detailCacheDuration: 300,
  site: "https://missav.live",
  iconurl: "https://missav.live/favicon.ico",
  modules: [
    {
      title: "搜索影片",
      description: "搜索 MissAV 影片内容",
      requiresWebView: true,
      functionName: "searchVideos",
      cacheDuration: 1800,
      params: [
        {
          name: "keyword",
          title: "搜索关键词",
          type: "input",
          description: "输入搜索关键词（演员名、番号、标题等）",
          value: ""
        },
        {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "日本AV", value: "jav" },
    { title: "亚洲 AV", value: "asiaav" },
    { title: "无码流出", value: "uncensored-leak" },
    { title: "无码影片", value: "uncensored" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
        Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "released_at" }),
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "今日热门",
      description: "今日热门影片",
      requiresWebView: true,
      functionName: "loadTodayHot",
      cacheDuration: 1800,
      params: [
        {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "多人作品", value: "multiple" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
        Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "today_views" }),
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "本周热门",
      description: "本周热门影片",
      requiresWebView: true,
      functionName: "loadWeeklyHot",
      cacheDuration: 1800,
      params: [
        {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "多人作品", value: "multiple" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
        Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "weekly_views" }),
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "本月热门",
      description: "本月热门影片",
      requiresWebView: true,
      functionName: "loadMonthlyHot",
      cacheDuration: 1800,
      params: [
        {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "多人作品", value: "multiple" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
        Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "monthly_views" }),
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "最近更新",
      description: "最近更新影片",
      requiresWebView: true,
      functionName: "loadRecentlyUpdated",
      cacheDuration: 1800,
      params: [
        {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "多人作品", value: "multiple" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
        Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "published_at" }),
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "新作上市",
      description: "新作上市影片",
      requiresWebView: true,
      functionName: "loadNewRelease",
      cacheDuration: 1800,
      params: [
        {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "多人作品", value: "multiple" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
        Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "released_at" }),
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "中文字幕",
      description: "中文字幕影片",
      requiresWebView: true,
      functionName: "loadChineseSubtitle",
      cacheDuration: 1800,
      params: [
        {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "多人作品", value: "multiple" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
        Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "released_at" }),
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "无码影片库",
      description: "无码影片各分类",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "多人作品", value: "multiple" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
        {
          name: "url",
          title: "选择分类",
          type: "enumeration",
          description: "选择分类",
          enumOptions: [
            { title: "无码流出", value: "https://missav.live/dm817/cn/uncensored-leak" },
            { title: "FC2", value: "https://missav.live/dm597/cn/fc2" },
            { title: "HEYZO", value: "https://missav.live/dm2208642/cn/heyzo" },
            { title: "东京热", value: "https://missav.live/dm42/cn/tokyohot" },
            { title: "Caribbeancom", value: "https://missav.live/dm7704788/cn/caribbeancom" },
            { title: "Gachinco", value: "https://missav.live/dm150/cn/gachinco" },
            { title: "XXX-AV", value: "https://missav.live/dm42/cn/xxxav" },
            { title: "人妻斩", value: "https://missav.live/dm37/cn/marriedslash" },
            { title: "顽皮 4610", value: "https://missav.live/dm33/cn/naughty4610" },
            { title: "顽皮 0930", value: "https://missav.live/dm37/cn/naughty0930" }
          ]
        },
        Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "released_at" }),
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "亚洲AV专区",
      description: "亚洲AV各分类",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "多人作品", value: "multiple" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
        {
          name: "url",
          title: "选择分类",
          type: "enumeration",
          description: "选择分类",
          enumOptions: [
            { title: "麻豆传媒", value: "https://missav.live/dm63/cn/madou" },
            { title: "韩国直播", value: "https://missav.live/cn/klive" },
            { title: "中国直播", value: "https://missav.live/cn/clive" }
          ]
        },
        Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "released_at" }),
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "影片质量类",
      description: "影片质量类 - 12个类型，748,863部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "多人作品", value: "multiple" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "高清 (248,852部)", value: "https://missav.live/dm96/cn/genres/%E9%AB%98%E6%B8%85" },
            { title: "独家 (220,805部)", value: "https://missav.live/dm142/cn/genres/%E7%8B%AC%E5%AE%B6" },
            { title: "单体作品 (185,259部)", value: "https://missav.live/dm122/cn/genres/%E5%8D%95%E4%BD%93%E4%BD%9C%E5%93%81" },
            { title: "薄格 (93,610部)", value: "https://missav.live/dm77/cn/genres/%E8%96%84%E6%A0%BC" },
            { title: "全高清 (FHD) (11928部)", value: "https://missav.live/cn/genres/%E5%85%A8%E9%AB%98%E6%B8%85%20(FHD)" },
            { title: "低成本影片 (70部)", value: "https://missav.live/cn/genres/%E4%BD%8E%E6%88%90%E6%9C%AC%E5%BD%B1%E7%89%87" },
            { title: "套装商品 (44部)", value: "https://missav.live/cn/genres/%E5%A5%97%E8%A3%85%E5%95%86%E5%93%81" },
            { title: "限时特卖 (37部)", value: "https://missav.live/cn/genres/%E9%99%90%E6%97%B6%E7%89%B9%E5%8D%96" },
            { title: "高清 (HD) (36部)", value: "https://missav.live/cn/genres/%E9%AB%98%E6%B8%85%20%28HD%29" },
            { title: "协力作品 (32部)", value: "https://missav.live/cn/genres/%E5%8D%8F%E5%8A%9B%E4%BD%9C%E5%93%81" },
            { title: "单一作品 (13部)", value: "https://missav.live/cn/genres/%E5%8D%95%E4%B8%80%E4%BD%9C%E5%93%81" },
            { title: "仅限分发 (12部)", value: "https://missav.live/cn/genres/%E4%BB%85%E9%99%90%E5%88%86%E5%8F%91" }
          ]
        },
        Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "released_at" }),
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "角色与身份",
      description: "角色与身份 - 23个类型，609,543部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "多人作品", value: "multiple" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "人妻 (123,405部)", value: "https://missav.live/dm81/cn/genres/%E4%BA%BA%E5%A6%BB" },
            { title: "熟女 (111,004部)", value: "https://missav.live/dm124/cn/genres/%E7%86%9F%E5%A5%B3" },
            { title: "素人 (97,868部)", value: "https://missav.live/dm151/cn/genres/%E7%B4%A0%E4%BA%BA" },
            { title: "美少女 (89,506部)", value: "https://missav.live/dm437/cn/genres/%E7%BE%8E%E5%B0%91%E5%A5%B3" },
            { title: "痴女 (71,969部)", value: "https://missav.live/dm334/cn/genres/%E7%97%B4%E5%A5%B3" },
            { title: "女高中生 (62,542部)", value: "https://missav.live/dm4466/cn/genres/%E5%A5%B3%E9%AB%98%E4%B8%AD%E7%94%9F" },
            { title: "秘书 (997部)", value: "https://missav.live/dm63/cn/genres/秘书" },
            { title: "美丽的成熟女人 (135部)", value: "https://missav.live/cn/genres/美丽的成熟女人" },
            { title: "妈妈朋友 (98部)", value: "https://missav.live/dm12/cn/genres/%E5%A6%88%E5%A6%88%E6%9C%8B%E5%8F%8B" },
            { title: "M女人 (77部)", value: "https://missav.live/dm2/cn/genres/M%E5%A5%B3%E4%BA%BA" },
            { title: "成熟的女人 (32部)", value: "https://missav.live/cn/genres/%E6%88%90%E7%86%9F%E7%9A%84%E5%A5%B3%E4%BA%BA" },
            { title: "家庭主妇 (32部)", value: "https://missav.live/cn/genres/%E5%AE%B6%E5%BA%AD%E4%B8%BB%E5%A6%87" },
            { title: "成熟女人 / 已婚女人 (29部)", value: "https://missav.live/dm3/cn/genres/%E6%88%90%E7%86%9F%E5%A5%B3%E4%BA%BA%20/%20%E5%B7%B2%E5%A9%9A%E5%A5%B3%E4%BA%BA" },
            { title: "其他学生 (21部)", value: "https://missav.live/dm1/cn/genres/%E5%85%B6%E4%BB%96%E5%AD%A6%E7%94%9F" },
            { title: "大小姐 (19部)", value: "https://missav.live/dm78/cn/genres/%E5%A4%A7%E5%B0%8F%E5%A7%90" },
            { title: "公主 (18部)", value: "https://missav.live/cn/genres/%E5%85%AC%E4%B8%BB" },
            { title: "美丽的女孩 (12部)", value: "https://missav.live/dm89/cn/genres/%E7%BE%8E%E4%B8%BD%E7%9A%84%E5%A5%B3%E5%AD%A9" },
            { title: "新娘 / 年轻的妻子 (10部)", value: "https://missav.live/cn/genres/%E6%96%B0%E5%A8%98%20/%20%E5%B9%B4%E8%BD%BB%E7%9A%84%E5%A6%BB%E5%AD%90" },
            { title: "养女 (10部)", value: "https://missav.live/dm4/cn/genres/%E5%85%BB%E5%A5%B3" }
          ]
        },
        Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "released_at" }),
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "性行为类型",
      description: "性行为类型 - 19个类型，759,620部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "多人作品", value: "multiple" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "中出 (198,292部)", value: "https://missav.live/dm133/cn/genres/%E4%B8%AD%E5%87%BA" },
            { title: "口交 (95,026部)", value: "https://missav.live/dm1303/cn/genres/%E5%8F%A3%E4%BA%A4" },
            { title: "骑乘 (86,850部)", value: "https://missav.live/dm490/cn/genres/%E9%AA%91%E4%B9%98" },
            { title: "潮吹 (73,825部)", value: "https://missav.live/dm166/cn/genres/%E6%BD%AE%E5%90%B9" },
            { title: "乳交 (68,569部)", value: "https://missav.live/dm599/cn/genres/%E4%B9%B3%E4%BA%A4" },
            { title: "颜射 (63,513部)", value: "https://missav.live/dm321/cn/genres/%E9%A2%9C%E5%B0%84" },
            { title: "自慰 (60,648部)", value: "https://missav.live/dm8546/cn/genres/%E8%87%AA%E6%85%B0" },
            { title: "手淫 (58,635部)", value: "https://missav.live/dm95/cn/genres/%E6%89%8B%E6%B7%AB" },
            { title: "内射精 (57部)", value: "https://missav.live/dm77/cn/genres/%E5%86%85%E5%B0%84%E7%B2%BE" },
            { title: "极致高潮 (88部)", value: "https://missav.live/dm26/cn/genres/%E6%9E%81%E8%87%B4%E9%AB%98%E6%BD%AE" },
            { title: "3P (26部)", value: "https://missav.live/dm45/cn/genres/3P" },
            { title: "多人 (26部)", value: "https://missav.live/cn/genres/%E5%A4%9A%E4%BA%BA" },
            { title: "狗狗式 (19部)", value: "https://missav.live/cn/genres/%E7%8B%97%E7%8B%97%E5%BC%8F" },
            { title: "撒尿 (17部)", value: "https://missav.live/cn/genres/%E6%92%92%E5%B0%BF" },
            { title: "盐吹 (16部)", value: "https://missav.live/cn/genres/%E7%9B%90%E5%90%B9" },
            { title: "撒尿 (14部)", value: "https://missav.live/cn/genres/%E6%92%92%E5%B0%BF" },
            { title: "3P / 4P (11部)", value: "https://missav.live/cn/genres/3P%20/%204P" },
            { title: "洗澡 (26部)", value: "https://missav.live/cn/genres/%E6%B4%97%E6%BE%A1" }
          ]
        },
        Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "released_at" }),
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "情节与主题",
      description: "情节与主题 - 15个类型，363,926部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "多人作品", value: "multiple" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "企划 (67,686部)", value: "https://missav.live/dm349/cn/genres/%E4%BC%81%E5%88%92" },
            { title: "乱伦 (56,481部)", value: "https://missav.live/dm58/cn/genres/%E4%B9%B1%E4%BC%A6" },
            { title: "NTR (51,273部)", value: "https://missav.live/dm772/cn/genres/NTR" },
            { title: "搭讪 (48,965部)", value: "https://missav.live/dm370/cn/genres/%E6%90%AD%E8%AE%AA" },
            { title: "淫乱 (47,821部)", value: "https://missav.live/dm906/cn/genres/%E6%B7%AB%E4%B9%B1" },
            { title: "剧情 (46,573部)", value: "https://missav.live/dm106/cn/genres/%E5%89%A7%E6%83%85" },
            { title: "羞辱 (44,892部)", value: "https://missav.live/dm162/cn/genres/%E7%BE%9E%E8%BE%B1" },
            { title: "妻子的出轨 / NTR / 戴绿帽子 (74部)", value: "https://missav.live/cn/genres/%E5%A6%BB%E5%AD%90%E7%9A%84%E5%87%BA%E8%BD%A8%20/%20NTR%20/%20%E6%88%B4%E7%BB%BF%E5%B8%BD%E5%AD%90" },
            { title: "戴绿帽子 (39部)", value: "https://missav.live/dm23/cn/genres/%E6%88%B4%E7%BB%BF%E5%B8%BD%E5%AD%90" },
            { title: "告白体验 (30部)", value: "https://missav.live/cn/genres/%E5%91%8A%E7%99%BD%E4%BD%93%E9%AA%8C" },
            { title: "外遇妻子 / NTR / 戴绿帽子 (17部)", value: "https://missav.live/cn/genres/%E5%A4%96%E9%81%87%E5%A6%BB%E5%AD%90%20/%20NTR%20/%20%E6%88%B4%E7%BB%BF%E5%B8%BD%E5%AD%90" },
            { title: "交往 (13部)", value: "https://missav.live/cn/genres/%E4%BA%A4%E5%BE%80" }
          ]
        },
        Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "released_at" }),
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "特殊玩法类",
      description: "特殊玩法 - 9个类型，85,102部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "多人作品", value: "multiple" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "多人运动 (53,962部)", value: "https://missav.live/dm321/cn/genres/%E5%A4%9A%E4%BA%BA%E8%BF%90%E5%8A%A8" },
            { title: "拘束 (41,628部)", value: "https://missav.live/dm154/cn/genres/%E6%8B%98%E6%9D%9F" },
            { title: "脏话 (63部)", value: "https://missav.live/cn/genres/%E8%84%8F%E8%AF%9D" },
            { title: "催眠洗脑 (62部)", value: "https://missav.live/cn/genres/%E5%82%AC%E7%9C%A0%E6%B4%97%E8%84%91" },
            { title: "口球 (51部)", value: "https://missav.live/cn/genres/%E5%8F%A3%E7%90%83" },
            { title: "放置Play (31部)", value: "https://missav.live/cn/genres/%E6%94%BE%E7%BD%AEPlay" },
            { title: "奴隶 (26部)", value: "https://missav.live/dm6/cn/genres/%E5%A5%B4%E9%9A%B6" }
          ]
        },
        Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "released_at" }),
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "身材特征类",
      description: "身材特征 - 14个类型，234,821部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "多人作品", value: "multiple" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "巨乳 (165,810部)", value: "https://missav.live/dm156/cn/genres/%E5%B7%A8%E4%B9%B3" },
            { title: "苗条 (34,968部)", value: "https://missav.live/dm757/cn/genres/%E8%8B%97%E6%9D%A1" },
            { title: "美乳 (33,527部)", value: "https://missav.live/dm218/cn/genres/%E7%BE%8E%E4%B9%B3" },
            { title: "D罩杯 (79部)", value: "https://missav.live/cn/genres/D%E7%BD%A9%E6%9D%AF" },
            { title: "背部 (73部)", value: "https://missav.live/dm429/cn/genres/%E8%83%8C%E9%83%A8" },
            { title: "美丽的屁股 (60部)", value: "https://missav.live/cn/genres/%E7%BE%8E%E4%B8%BD%E7%9A%84%E5%B1%81%E8%82%A1" },
            { title: "E罩杯以上的Judai（青少年） (55部)", value: "https://missav.live/cn/genres/E%E7%BD%A9%E6%9D%AF%E4%BB%A5%E4%B8%8A%E7%9A%84Judai%EF%BC%88%E9%9D%92%E5%B0%91%E5%B9%B4%EF%BC%89" },
            { title: "甜屁股 (54部)", value: "https://missav.live/dm1/cn/genres/%E7%94%9C%E5%B1%81%E8%82%A1" },
            { title: "美尻 (46部)", value: "https://missav.live/cn/genres/%E7%BE%8E%E5%B0%BB" },
            { title: "性感的腿 (42部)", value: "https://missav.live/cn/genres/%E6%80%A7%E6%84%9F%E7%9A%84%E8%85%BF" },
            { title: "大乳房 (31部)", value: "https://missav.live/dm2/cn/genres/%E5%A4%A7%E4%B9%B3%E6%88%BF" },
            { title: "白皙的皮肤 (16部)", value: "https://missav.live/cn/genres/%E7%99%BD%E7%9A%99%E7%9A%84%E7%9A%AE%E8%82%A4" },
            { title: "小乳房 (16部)", value: "https://missav.live/cn/genres/%E5%B0%8F%E4%B9%B3%E6%88%BF" },
            { title: "皮肤黑 (44部)", value: "https://missav.live/cn/genres/%E7%9A%AE%E8%82%A4%E9%BB%91" }
          ]
        },
        Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "released_at" }),
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "职业角色类",
      description: "职业角色 - 8个类型，372部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "多人作品", value: "multiple" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "接待员 (97部)", value: "https://missav.live/cn/genres/%E6%8E%A5%E5%BE%85%E5%91%98" },
            { title: "女导游 (92部)", value: "https://missav.live/dm143/cn/genres/%E5%A5%B3%E5%AF%BC%E6%B8%B8" },
            { title: "啦啦队 (69部)", value: "https://missav.live/cn/genres/%E5%95%A6%E5%95%A6%E9%98%9F" },
            { title: "空中小姐 CA (50部)", value: "https://missav.live/dm3/cn/genres/%E7%A9%BA%E4%B8%AD%E5%B0%8F%E5%A7%90%20CA" },
            { title: "台湾模特儿 (20部)", value: "https://missav.live/cn/genres/%E5%8F%B0%E6%B9%BE%E6%A8%A1%E7%89%B9%E5%84%BF" },
            { title: "迷你裙女警 (20部)", value: "https://missav.live/dm1/cn/genres/%E8%BF%B7%E4%BD%A0%E8%A3%99%E5%A5%B3%E8%AD%A6" },
            { title: "色情明星 (14部)", value: "https://missav.live/cn/genres/%E8%89%B2%E6%83%85%E6%98%8E%E6%98%9F" },
            { title: "演员 (10部)", value: "https://missav.live/cn/genres/%E6%BC%94%E5%91%98" }
          ]
        },
        Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "released_at" }),
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "拍摄方式类",
      description: "拍摄方式 - 6个类型，78,894部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "多人作品", value: "multiple" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "自拍 (39,847部)", value: "https://missav.live/dm978/cn/genres/%E8%87%AA%E6%8B%8D" },
            { title: "偷拍 (38,924部)", value: "https://missav.live/dm532/cn/genres/%E5%81%B7%E6%8B%8D" },
            { title: "第一次拍摄 (48部)", value: "https://missav.live/dm2/cn/genres/%E7%AC%AC%E4%B8%80%E6%AC%A1%E6%8B%8D%E6%91%84" },
            { title: "主观性 (16部)", value: "https://missav.live/cn/genres/%E4%B8%BB%E8%A7%82%E6%80%A7" },
            { title: "记录 (15部)", value: "https://missav.live/cn/genres/%E8%AE%B0%E5%BD%95" },
            { title: "按摩 (15部)", value: "https://missav.live/dm163/cn/genres/%E6%8C%89%E6%91%A9" }
          ]
        },
        Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "released_at" }),
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "时长合集类",
      description: "时长与合集 - 3个类型，73,839部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "多人作品", value: "multiple" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "4小时以上 (37,685部)", value: "https://missav.live/dm755/cn/genres/4%E5%B0%8F%E6%97%B6%E4%BB%A5%E4%B8%8A" },
            { title: "合集 (36,142部)", value: "https://missav.live/dm796/cn/genres/%E5%90%88%E9%9B%86" },
            { title: "超过工作时间 4 小时 (12部)", value: "https://missav.live/cn/genres/%E8%B6%85%E8%BF%87%E5%B7%A5%E4%BD%9C%E6%97%B6%E9%97%B4%204%20%E5%B0%8F%E6%97%B6" }
          ]
        },
        Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "released_at" }),
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "服装造型类",
      description: "服装与造型 - 13个类型，657部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "多人作品", value: "multiple" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "裙子单声道 (75部)", value: "https://missav.live/cn/genres/%E8%A3%99%E5%AD%90%E5%8D%95%E5%A3%B0%E9%81%93" },
            { title: "浴衣 (72部)", value: "https://missav.live/dm1/cn/genres/%E6%B5%B4%E8%A1%A3" },
            { title: "中长发 (69部)", value: "https://missav.live/dm1/cn/genres/%E4%B8%AD%E9%95%BF%E5%8F%91" },
            { title: "连裤袜的事 (67部)", value: "https://missav.live/cn/genres/%E8%BF%9E%E8%A3%A4%E8%A2%9C%E7%9A%84%E4%BA%8B" },
            { title: "面具 (85部)", value: "https://missav.live/dm2/cn/genres/%E9%9D%A2%E5%85%B7" },
            { title: "靴子 (44部)", value: "https://missav.live/cn/genres/%E9%9D%B4%E5%AD%90" },
            { title: "卷发 (37部)", value: "https://missav.live/cn/genres/%E5%8D%B7%E5%8F%91" },
            { title: "高跟鞋 (36部)", value: "https://missav.live/cn/genres/%E9%AB%98%E8%B7%9F%E9%9E%8B" },
            { title: "围裙 (31部)", value: "https://missav.live/dm25/cn/genres/%E5%9B%B4%E8%A3%99" },
            { title: "金发 (51部)", value: "https://missav.live/cn/genres/%E9%87%91%E5%8F%91" },
            { title: "啡发 (76部)", value: "https://missav.live/cn/genres/%E5%95%A1%E5%8F%91" }
          ]
        },
        Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "released_at" }),
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "特殊题材类",
      description: "特殊题材 - 25个类型，901部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "多人作品", value: "multiple" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "SF (95部)", value: "https://missav.live/dm1/cn/genres/SF" },
            { title: "洛丽塔 (83部)", value: "https://missav.live/cn/genres/%E6%B4%9B%E4%B8%BD%E5%A1%94" },
            { title: "御宅 (82部)", value: "https://missav.live/dm1/cn/genres/%E5%BE%A1%E5%AE%85" },
            { title: "魔法少女 (75部)", value: "https://missav.live/cn/genres/%E9%AD%94%E6%B3%95%E5%B0%91%E5%A5%B3" },
            { title: "游戏现实版 (39部)", value: "https://missav.live/cn/genres/%E6%B8%B8%E6%88%8F%E7%8E%B0%E5%AE%9E%E7%89%88" },
            { title: "3D (38部)", value: "https://missav.live/dm24/cn/genres/3D" },
            { title: "AI生成的作品 (37部)", value: "https://missav.live/cn/genres/AI%E7%94%9F%E6%88%90%E7%9A%84%E4%BD%9C%E5%93%81" },
            { title: "动漫人物 (35部)", value: "https://missav.live/cn/genres/%E5%8A%A8%E6%BC%AB%E4%BA%BA%E7%89%A9" },
            { title: "虚拟现实 (35部)", value: "https://missav.live/cn/genres/%E8%99%9A%E6%8B%9F%E7%8E%B0%E5%AE%9E" },
            { title: "动画 (14部)", value: "https://missav.live/cn/genres/%E5%8A%A8%E7%94%BB" },
            { title: "偶像 (13部)", value: "https://missav.live/dm1/cn/genres/%E5%81%B6%E5%83%8F" },
            { title: "透过偶像 (32部)", value: "https://missav.live/cn/genres/%E9%80%8F%E8%BF%87%E5%81%B6%E5%83%8F" }
          ]
        },
        Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "released_at" }),
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      id: "loadResource",
      title: "播放资源",
      description: "根据当前视频信息匹配 MissAV 播放源",
      functionName: "loadResource",
      type: "stream",
      cacheDuration: 0,
      params: []
    }
  ],
  search: {
    title: "搜索",
    functionName: "searchVideos",
    params: [
      {
        name: "keyword",
        title: "搜索关键词",
        type: "input",
        description: "输入搜索关键词（演员名、番号、标题等）",
        value: ""
      },
      {
  name: "filter",
  title: "过滤",
  type: "enumeration",
  description: "过滤类型",
  value: "all",
  enumOptions: [
    { title: "所有", value: "all" },
    { title: "单人作品", value: "individual" },
    { title: "日本AV", value: "jav" },
    { title: "亚洲 AV", value: "asiaav" },
    { title: "无码流出", value: "uncensored-leak" },
    { title: "无码影片", value: "uncensored" },
    { title: "中文字幕", value: "chinese-subtitle" }
  ]
},
      Object.assign({}, {
  name: "sort_by",
  title: "排序",
  type: "enumeration",
  description: "排序方式",
  value: "released_at",
  enumOptions: [
    { title: "发行日期", value: "released_at" },
    { title: "最近更新", value: "published_at" },
    { title: "收藏数", value: "saved" },
    { title: "今日浏览数", value: "today_views" },
    { title: "本周浏览数", value: "weekly_views" },
    { title: "本月浏览数", value: "monthly_views" },
    { title: "总浏览数", value: "views" }
  ]
}, { value: "released_at" }),
      { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
    ]
  }
};

function buildMissavListUrl(baseUrl, params = {}, defaultSort) {
  const query = [];
  const filter = String(params.filter || "all").trim();
  const sort = String(params.sort_by || defaultSort || "").trim();
  if (filter && filter !== "all") query.push("filters=" + encodeURIComponent(filter));
  if (sort) query.push("sort=" + encodeURIComponent(sort));
  return baseUrl + (query.length ? "?" + query.join("&") : "");
}

async function loadTodayHot(params = {}) {
  const page = parseInt(params.page) || 1;

  let url = buildMissavListUrl(`${MISSAV_SITE}/dm301/cn/today-hot`, params, "today_views");

  if (page > 1) {
    url += `&page=${page}`;
  }

  return await fetchVideoList(url, params);
}

async function loadWeeklyHot(params = {}) {
  const page = parseInt(params.page) || 1;

  let url = buildMissavListUrl(`${MISSAV_SITE}/dm170/cn/weekly-hot`, params, "weekly_views");

  if (page > 1) {
    url += `&page=${page}`;
  }

  return await fetchVideoList(url, params);
}

async function loadMonthlyHot(params = {}) {
  const page = parseInt(params.page) || 1;

  let url = buildMissavListUrl(`${MISSAV_SITE}/dm273/cn/monthly-hot`, params, "monthly_views");

  if (page > 1) {
    url += `&page=${page}`;
  }

  return await fetchVideoList(url, params);
}

async function loadRecentlyUpdated(params = {}) {
  const page = parseInt(params.page) || 1;

  let url = buildMissavListUrl(`${MISSAV_SITE}/dm539/cn/new`, params, "published_at");

  if (page > 1) {
    url += `&page=${page}`;
  }

  return await fetchVideoList(url, params);
}

async function loadNewRelease(params = {}) {
  const page = parseInt(params.page) || 1;

  let url = buildMissavListUrl(`${MISSAV_SITE}/dm635/cn/release`, params, "released_at");

  if (page > 1) {
    url += `&page=${page}`;
  }

  return await fetchVideoList(url, params);
}

async function loadChineseSubtitle(params = {}) {
  const page = parseInt(params.page) || 1;

  let url = buildMissavListUrl(`${MISSAV_SITE}/dm278/cn/chinese-subtitle`, params, "released_at");

  if (page > 1) {
    url += `&page=${page}`;
  }

  return await fetchVideoList(url, params);
}

async function loadPage(params = {}) {
  const baseUrl = params.url;
  const page = parseInt(params.page) || 1;

  let url = buildMissavListUrl(baseUrl, params, "released_at");

  if (page > 1) {
    url += `&page=${page}`;
  }

  return await fetchVideoList(url, params);
}

function isBlockedHtml(data) {
  const text = String(data || "");
  return !text ||
    text.includes("Just a moment") ||
    text.includes("cf-browser-verification") ||
    text.includes("Attention Required") ||
    text.includes("Cloudflare");
}

function getHttpStatus(error) {
  if (!error) return 0;
  const response = error.response || error.Response || {};
  return error.status || error.statusCode || response.status || response.statusCode || 0;
}

function isRetryableMissavError(error) {
  const status = getHttpStatus(error);
  const text = String((error && (error.message || (error.toString && error.toString()))) || "");
  return status === 403 ||
    status === 429 ||
    text.includes("status code of 403") ||
    text.includes("status code of 429");
}

function blockedMessage(error, params) {
  const status = getHttpStatus(error);
  if (status === 429) {
    return "访问过于频繁，请稍后再试";
  }
  return "访问失败，可能已被风控";
}

async function requestMissavPage(url, referer) {
  const delays = [0, 700];
  let lastError = null;

  for (let i = 0; i < delays.length; i++) {
    if (delays[i] > 0) await sleep(delays[i]);

    try {
      if (typeof fetch === "function") {
        try {
          const browserResponse = await fetch(url, {
            method: "GET",
            headers: getPageHeaders(referer),
            credentials: "include",
            cache: "no-store"
          });
          const browserData = browserResponse && browserResponse.ok
            ? await browserResponse.text()
            : "";
          if (browserData && !isBlockedHtml(browserData)) {
            return {
              data: browserData,
              status: browserResponse.status
            };
          }
        } catch (browserError) {
        }
      }

      const response = await Widget.http.get(url, {
        headers: getPageHeaders(referer),
        allow_redirects: true
      });

      if (response && response.data && !isBlockedHtml(response.data)) {
        return response;
      }

      lastError = new Error("blocked or empty response");
    } catch (error) {
      lastError = error;
      if (!isRetryableMissavError(error)) throw error;
    }
  }

  throw lastError || new Error("request failed");
}

async function requestMissavListPage(url, params, referer) {
  const delays = [0, 700];
  const uaList = [MISSAV_UA, MISSAV_BROWSER_UA];
  let lastError = null;

  for (let i = 0; i < delays.length; i++) {
    if (delays[i] > 0) await sleep(delays[i]);

    for (const ua of uaList) {
      try {
        if (typeof fetch === "function") {
          try {
            const browserResponse = await fetch(url, {
              method: "GET",
              headers: getPageHeaders(referer, ua),
              credentials: "include",
              cache: "no-store"
            });
            const browserData = browserResponse && browserResponse.ok
              ? await browserResponse.text()
              : "";
            if (browserData && !isBlockedHtml(browserData)) {
              return {
                data: browserData,
                status: browserResponse.status
              };
            }
          } catch (browserError) {
          }
        }

        const response = await Widget.http.get(url, {
          headers: getPageHeaders(referer, ua),
          allow_redirects: true
        });

        if (response && response.data && !isBlockedHtml(response.data)) {
          return response;
        }

        lastError = new Error("blocked or empty response");
      } catch (error) {
        lastError = error;
        if (!isRetryableMissavError(error)) throw error;
      }
    }
  }

  throw lastError || new Error("request failed");
}

function stripMissavDmPrefix(url) {
  return String(url || "").replace(/https:\/\/missav\.ai\/dm\d+\//i, MISSAV_SITE + "/");
}

function decodeUrlOnce(url) {
  try {
    return decodeURI(url);
  } catch (e) {
    return url;
  }
}

function uniqueUrls(urls) {
  const seen = {};
  return urls.filter(url => {
    if (!url || seen[url]) return false;
    seen[url] = true;
    return true;
  });
}

function getListRequestUrls(url) {
  const canonical = stripMissavDmPrefix(url);
  return uniqueUrls([
    url,
    decodeUrlOnce(url),
    canonical,
    decodeUrlOnce(canonical)
  ]);
}

async function fetchVideoList(url, params) {
  let lastError = null;
  const urls = getListRequestUrls(url);

  for (const requestUrl of urls) {
    try {
      const response = await requestMissavListPage(requestUrl, params, MISSAV_SITE + "/");

      return await parseVideoList(response.data, params);
    } catch (error) {
      lastError = error;
      if (!isRetryableMissavError(error)) throw error;
    }
  }

  try {
    if (lastError) throw lastError;
    const response = await requestMissavListPage(url, params, MISSAV_SITE + "/");

    return await parseVideoList(response.data, params);

  } catch (error) {
    return [createPlaceholderItem(blockedMessage(error, params))];
  }
}

function createPlaceholderItem(message = "已被风控，请稍后重试") {
  return {
    id: "content-placeholder",
    type: "placeholder",
    title: "🚫 " + message,
    backdropPath: "https://via.placeholder.com/400x225/FF6B6B/FFFFFF?text=%E5%B7%B2%E8%A2%AB%E9%A3%8E%E6%8E%A7",
    mediaType: "placeholder",
    duration: 0,
    durationText: "⚠️ 访问受限",
    previewUrl: "",
    videoUrl: "",
    link: "",
    description: "🔒 " + message + "\n\n💡 可能的解决方案：\n• 等待一段时间后重新尝试\n• 检查网络连接\n• 更换网络环境\n• 稍后再试",
    playerType: "none"
  };
}

function extractListMetadataFromParsedDocument($) {
  const metadataByVideoId = {};

  $('.thumbnail').each((index, element) => {
    const $card = $(element);
    const href = $card.find('a[href]').first().attr('href') || $card.attr('href') || '';
    if (!href) return;

    const durationMatch = String($card.find('span.absolute.bottom-1.right-1').first().text() || '')
      .match(/\b\d{1,2}:\d{2}(?::\d{2})?\b/);

    const videoId = extractVideoId(href).toLowerCase();
    metadataByVideoId[videoId] = {
      durationText: durationMatch ? durationMatch[0] : ''
    };
  });

  return metadataByVideoId;
}

function extractVideoId(url) {
  const matches = url.match(/\/cn\/([a-zA-Z0-9\-]+)(-uncensored-leak)?$/);
  return matches ? matches[1] : url.split('/').pop();
}

function normalizeImageUrl(url) {
  url = String(url || "").trim();
  if (!url) return "";
  if (url.startsWith("//")) return preferHighQualityCoverUrl("https:" + url);
  if (/^https?:\/\//i.test(url)) return preferHighQualityCoverUrl(url);
  if (url.startsWith("/")) return preferHighQualityCoverUrl(MISSAV_SITE + url);
  return preferHighQualityCoverUrl(url);
}

function preferHighQualityCoverUrl(url) {
  return String(url || "").replace(/\/cover-t\.jpg(?=([?#]|$))/i, "/cover-n.jpg");
}

function getFourhoiCoverUrl(videoId) {
  return `https://fourhoi.com/${videoId}/cover-n.jpg`;
}

function getBaseVideoId(videoId) {
  return String(videoId || "")
    .trim()
    .replace(/-chinese-subtitle$/i, "")
    .replace(/-uncensored-leak$/i, "")
    .replace(/^([a-z]+-\d+)-2$/i, "$1");
}

const BLOCKED_VIDEO_PREFIXES = [
  "FEM",
  "PETS",
  "ROE",
  "TPNS",
  "JKWS",
  "HONE",
  "JRZE",
  "JURA",
  "NUKA",
  "XMOM",
  "YOCH",
  "HSM",
  "TOTK"
];

function shouldHideVideo(videoId) {
  const baseVideoId = getBaseVideoId(videoId).toUpperCase();
  const prefixMatch = baseVideoId.match(/^([A-Z]+)/);
  const videoPrefix = prefixMatch ? prefixMatch[1] : "";

  return BLOCKED_VIDEO_PREFIXES.includes(videoPrefix);
}

function parseMissavPeople(html) {
  const text = String(html || '');
  const parseField = (label) => {
    const fieldMatch = text.match(new RegExp(
      '<span>\\s*' + label + ':\\s*<\\/span>([\\s\\S]*?)<\\/div>', 'i'
    ));
    if (!fieldMatch) return [];

    const entries = [];
    const linkPattern = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let match;
    while ((match = linkPattern.exec(fieldMatch[1]))) {
      const name = match[2].replace(/<[^>]*>/g, '').trim();
      if (name) entries.push({ id: match[1], name: name });
    }
    return entries;
  };

  return {
    actresses: parseField('女优'),
    directors: parseField('导演')
  };
}

function buildDirectorsInfo(missavDirectors) {
  return missavDirectors.map((director) => ({
    id: director.id,
    name: director.name + " (导演)"
  }));
}

function parseMissavGenres(html) {
  const typeMatch = String(html || '').match(
    /<span>\s*类型:\s*<\/span>([\s\S]*?)<\/div>/i
  );
  if (!typeMatch) return [];

  const genres = [];
  const linkPattern = /<a\b[^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = linkPattern.exec(typeMatch[1]))) {
    const genre = match[1].replace(/<[^>]*>/g, '').trim();
    if (genre) genres.push(genre);
  }
  return genres;
}

function getPageHeaders(referer, ua) {
  const headers = {
    "User-Agent": ua || MISSAV_UA,
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Referer": referer || MISSAV_SITE + "/"
  };
  if ((ua || MISSAV_UA) === MISSAV_BROWSER_UA) {
    headers["Sec-Ch-Ua"] = "\"Microsoft Edge\";v=\"149\", \"Chromium\";v=\"149\", \"Not(A:Brand\";v=\"24\"";
    headers["Sec-Ch-Ua-Mobile"] = "?0";
    headers["Sec-Ch-Ua-Platform"] = "\"Windows\"";
    headers["Sec-Fetch-Dest"] = "document";
    headers["Sec-Fetch-Mode"] = "navigate";
    headers["Sec-Fetch-Site"] = "same-origin";
    headers["Upgrade-Insecure-Requests"] = "1";
  }
  return headers;
}

function getPlayHeaders(referer) {
  return {
    "User-Agent": MISSAV_UA,
    "Referer": referer || MISSAV_SITE + "/"
  };
}

function extractMissavUuid(html) {
  html = String(html || "");

  const nineyuMatch = html.match(/nineyu\.com\\?\/([a-f0-9-]{36})\\?\/seek\\?\/_0\.jpg/i);
  if (nineyuMatch && nineyuMatch[1]) return nineyuMatch[1];

  const surritMatch = html.match(/https?:\\?\/\\?\/surrit\.com\\?\/([a-f0-9-]{36})\\?\//i);
  if (surritMatch && surritMatch[1]) return surritMatch[1];

  const uuidMatches = html.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/ig);
  return uuidMatches && uuidMatches.length ? uuidMatches[0] : "";
}

function pickBestM3u8(masterText, uuid) {
  const prefix = `https://surrit.com/${uuid}/`;
  const lines = String(masterText || "")
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);

  let bestVariant = null;
  for (let index = 0; index < lines.length - 1; index++) {
    const info = lines[index];
    if (!/^#EXT-X-STREAM-INF:/i.test(info)) continue;
    const bandwidthMatch = info.match(/BANDWIDTH=(\d+)/i);
    const resolutionMatch = info.match(/RESOLUTION=(\d+)x(\d+)/i);
    if (!bandwidthMatch && !resolutionMatch) continue;

    const uri = lines[index + 1];
    if (!uri || uri.charAt(0) === "#" || uri.indexOf(".m3u8") < 0) continue;

    const bandwidth = bandwidthMatch ? Number(bandwidthMatch[1]) : 0;
    const pixels = resolutionMatch ? Number(resolutionMatch[1]) * Number(resolutionMatch[2]) : 0;
    if (!bestVariant || pixels > bestVariant.pixels ||
        (pixels === bestVariant.pixels && bandwidth > bestVariant.bandwidth)) {
      bestVariant = { pixels: pixels, bandwidth: bandwidth, uri: uri };
    }
  }

  if (bestVariant) {
    const best = bestVariant.uri;
    return /^https?:\/\//i.test(best) ? best : prefix + best.replace(/^\/+/, "");
  }

  const videoLines = lines.filter(line => line.indexOf("/video.m3u8") >= 0);
  if (videoLines.length) {
    const best = videoLines[videoLines.length - 1];
    return /^https?:\/\//i.test(best) ? best : prefix + best.replace(/^\/+/, "");
  }

  const firstM3u8 = lines.find(line => line.indexOf(".m3u8") >= 0 && line[0] !== "#");
  if (firstM3u8) {
    return /^https?:\/\//i.test(firstM3u8) ? firstM3u8 : prefix + firstM3u8.replace(/^\/+/, "");
  }

  return prefix + "playlist.m3u8";
}

async function resolveMissavVideoUrl(html, detailUrl) {
  const uuid = extractMissavUuid(html);
  if (!uuid) return "";

  const playlistUrl = `https://surrit.com/${uuid}/playlist.m3u8`;

  try {
    const response = await Widget.http.get(playlistUrl, {
      headers: getPlayHeaders(detailUrl)
    });
    const masterText = (response && response.data) || "";
    return pickBestM3u8(masterText, uuid);
  } catch (error) {
    return playlistUrl;
  }
}

async function resolveVideoUrlWithFallback(html, detailUrl, $) {
  let videoUrl = await resolveMissavVideoUrl(html, detailUrl);
  if (videoUrl) return videoUrl;

  $('script').each((index, element) => {
    if (videoUrl) return false;
    const scriptContent = $(element).html() || "";
    if (scriptContent.includes('surrit.com') && scriptContent.includes('.m3u8')) {
      const surritMatches = scriptContent.match(/https:\/\/surrit\.com\/[a-f0-9\-]+\/[^"'\s]*\.m3u8/g);
      if (surritMatches && surritMatches.length > 0) {
        videoUrl = surritMatches[0];
        return false;
      }
    }
    if (!videoUrl && scriptContent.includes('eval(function')) {
      const uuidMatches = scriptContent.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g);
      if (uuidMatches && uuidMatches.length > 0) {
        videoUrl = `https://surrit.com/${uuidMatches[0]}/playlist.m3u8`;
      }
    }
  });

  return videoUrl;
}

async function searchVideos(params = {}) {
  const keyword = params.keyword ? params.keyword.trim() : '';
  const page = parseInt(params.page) || 1;

  if (!keyword) {
    return [];
  }

  const encodedKeyword = encodeURIComponent(keyword);
  let url = buildMissavListUrl(`${MISSAV_SITE}/cn/search/${encodedKeyword}`, params, "released_at");

  if (page > 1) {
    url += `&page=${page}`;
  }

  return await fetchVideoList(url, params);
}

const MS_DMM_PREFIX_MAP = {
  FSDSS: "1", FCDSS: "1", FNS: "1", FTHTD: "1", FALENO: "1", FGAN: "1",
  FSNF: "1", FLAV: "1", NHDTC: "1", KUSE: "1", SDNM: "1", STARS: "1",
  STAR: "1", START: "1", SODS: "1", MOGI: "1", FTAV: "1", WSA: "2",
  MBDD: "301", REBD: "h_346", REBDB: "h_346", GSHRB: "h_346",
  NAAC: "h_706", MAAN: "h_1711"
};

function msDmmContentId(code) {
  const m = String(code || "").toUpperCase().match(/^([A-Z]{2,6})-?(\d{2,6})([A-Z]?)$/);
  if (!m) return "";
  const prefix = m[1], num5 = m[2].padStart(5, "0"), suffix = (m[3] || "").toLowerCase();
  const np = MS_DMM_PREFIX_MAP[prefix] || "";
  return np + prefix.toLowerCase() + num5 + suffix;
}

function msDmmPoster(code) {
  const cid = msDmmContentId(code);
  if (!cid) return "";
  return "https://awsimgsrc.dmm.co.jp/pics_dig/digital/video/" + cid + "/" + cid + "ps.jpg";
}

const MS_POSTER_MIN_RANGE = "bytes=100000-100000";

async function msProbePoster(url) {
  if (!url) return false;
  try {
    const res = await Widget.http.get(url, {
      headers: { "User-Agent": MISSAV_UA, "Range": MS_POSTER_MIN_RANGE }
    });
    const status = res && (res.status || res.statusCode);
    return status === 200 || status === 206 || status === 416;
  } catch (e) {
    return false;
  }
}

const MS_DMM_CACHE_KEY = "missav_dmmcover";
const MS_DMM_CACHE_MAX = 500;
const MS_DMM_MISS_TTL = 24 * 3600 * 1000;

function msDmmCacheGet() {
  try {
    const raw = Widget.storage.get(MS_DMM_CACHE_KEY);
    const o = raw ? JSON.parse(raw) : null;
    return o && typeof o === "object" ? o : {};
  } catch (e) {
    return {};
  }
}

function msDmmCacheSet(map) {
  try {
    const keys = Object.keys(map);
    while (keys.length > MS_DMM_CACHE_MAX) delete map[keys.shift()];
    Widget.storage.set(MS_DMM_CACHE_KEY, JSON.stringify(map));
  } catch (e) {}
}

async function msFillPosters(items) {
  const cache = msDmmCacheGet();
  const now = Date.now();
  const jobs = items.map(async (it) => {
    if (!it || it.posterPath) return;
    const code = String(it.title || "").toUpperCase();
    if (!code) return;
    if (/^FC2/i.test(code) || /^\d{6,}-\d{3,}$/.test(code)) return;
    const hit = cache[code];
    if (hit && (hit.u || now - hit.t < MS_DMM_MISS_TTL)) {
      if (hit.u) it.posterPath = hit.u;
      return;
    }
    const url = msDmmPoster(code);
    const ok = url ? await msProbePoster(url) : false;
    cache[code] = { u: ok ? url : "", t: Date.now() };
    if (ok) it.posterPath = url;
  });
  await Promise.all(jobs);
  msDmmCacheSet(cache);
  await msFillJavdbPosters(items);
  return items;
}

const MS_JAVDB_SEARCH = "https://javdb.com/search?q=";
const MS_JAVDB_TIMEOUT = 9000;
const MS_JAVDB_CONCURRENCY = 4;
const MS_JAVDB_STAGE_TIMEOUT = 15000;
const MS_JDB_CACHE_KEY = "missav_jdbcover";
const MS_JDB_CACHE_MAX = 300;
const MS_JDB_MISS_TTL = 24 * 3600 * 1000;

function msNormCode(s) {
  return String(s || "").toUpperCase().replace(/-/g, "");
}

function msJdbCacheGet() {
  try {
    const raw = Widget.storage.get(MS_JDB_CACHE_KEY);
    const o = raw ? JSON.parse(raw) : null;
    return o && typeof o === "object" ? o : {};
  } catch (e) {
    return {};
  }
}

function msJdbCacheSet(map) {
  try {
    const keys = Object.keys(map);
    while (keys.length > MS_JDB_CACHE_MAX) delete map[keys.shift()];
    Widget.storage.set(MS_JDB_CACHE_KEY, JSON.stringify(map));
  } catch (e) {}
}

async function msJavdbCover(code) {
  const res = await Widget.http.get(MS_JAVDB_SEARCH + encodeURIComponent(code) + "&f=all", {
    headers: {
      "User-Agent": MISSAV_UA,
      "Accept": "text/html,application/xhtml+xml",
      "Accept-Language": "zh-CN,zh;q=0.9"
    },
    timeout: MS_JAVDB_TIMEOUT
  });
  const html = String(res && res.data || "");
  if (!html || html.length < 2000) return "";
  if (/Just a moment|cf-browser-verification|Attention Required|Cloudflare/i.test(html)) return "";
  const $ = Widget.html.load(html);
  const want = msNormCode(code);
  let cover = "";
  $("a.box").each((_, el) => {
    if (cover) return;
    try {
      const box = $(el);
      let t = String(box.find(".video-title strong").first().text() || "").trim();
      if (!t) t = String(box.find(".video-title").first().text() || "").trim();
      const nt = msNormCode(t);
      if (!nt || (nt.indexOf(want) !== 0 && want.indexOf(nt) !== 0)) return;
      const img = box.find(".cover img").first();
      cover = img.attr("data-src") || img.attr("src") || "";
    } catch (e) {}
  });
  cover = String(cover || "").trim();
  if (cover.indexOf("//") === 0) cover = "https:" + cover;
  return /^https?:\/\//i.test(cover) ? cover : "";
}

async function msPool(jobs, limit, deadlineMs) {
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

async function msFillJavdbPosters(items) {
  const list = (items || []).filter(it => it && !it.posterPath && String(it.title || "").trim());
  if (!list.length) return;
  const cache = msJdbCacheGet();
  const now = Date.now();
  const jobs = [];
  list.forEach(it => {
    const code = String(it.title).toUpperCase();
    const hit = cache[code];
    if (hit && (hit.u || now - hit.t < MS_JDB_MISS_TTL)) {
      if (hit.u) it.posterPath = hit.u;
      return;
    }
    jobs.push(async () => {
      let u = "";
      try {
        u = await msJavdbCover(code);
      } catch (e) {
        u = "";
      }
      cache[code] = { u: u, t: Date.now() };
      if (u) it.posterPath = u;
    });
  });
  if (!jobs.length) return;
  await msPool(jobs, MS_JAVDB_CONCURRENCY, Date.now() + MS_JAVDB_STAGE_TIMEOUT);
  msJdbCacheSet(cache);
}

function msGetText(value) {
  return String(value == null ? "" : value).trim();
}

function msNormalizeCode(value) {
  return String(value || "").toUpperCase().replace(/[\s_\-]+/g, "");
}

function msSafeDecodePlaybackValue(value) {
  try {
    return decodeURIComponent(String(value || ""));
  } catch (e) {
    return String(value || "");
  }
}

function msPlaybackFileName(value) {
  const decoded = msSafeDecodePlaybackValue(msGetText(value));
  if (!decoded) return "";
  const clean = decoded.split("#")[0].split("?")[0];
  const parts = clean.split(/[\\/]/);
  return parts[parts.length - 1] || clean;
}

const MS_SEARCH_CODE_PATTERNS = [
  /\bFC2(?:[- ]?PPV)?[- ]?\d{5,8}(?:[-_ ](?:\d{1,4}|[A-Z]{1,4}))*\b/,
  /\bCARIB[- ]?\d{6,8}(?:[-_ ](?:\d{1,4}|[A-Z]{1,4}))*\b/,
  /\b1PONDO[- ]?\d{6,8}(?:[-_ ](?:\d{1,4}|[A-Z]{1,4}))*\b/,
  /\bHEYZO[- ]?\d{3,6}(?:[-_ ](?:\d{1,4}|[A-Z]{1,4}))*\b/,
  /\bT28[- ]?\d{6,8}(?:[-_ ](?:\d{1,4}|[A-Z]{1,4}))*\b/,
  /\b(?:S2M|MIAA|SSNI|SNIS|IPX|IPZZ|SSIS|JUQ|MIDE|MIDV|STARS|ABW|RKI|DVAJ|WANZ|LULU|DLDSS|VRTM|SDMU|SDDE|MKMP|HMN|MUDR|ADN|CAWD|PPPE|PRED|MGR|SHKD|MXGS|FSDSS|JUL|KTB|MIAB|GVH|MIMK|JUY|JUTA|IDBD|HND|DASD|CLO|BF|HONB|ROE|CEMD|MIUM|NITR|RCTD|RCT|IPVR|MIBD|JUR|JURD|SOE|ORE|PYO|START|NSFS)\s*[-_ ]?\d{2,6}[A-Z]?(?:[-_ ](?:\d{1,4}|[A-Z]{1,4}))*\b/,
  /\b[A-Z]{2,10}[-_]\d{2,8}[A-Z]?(?:[-_](?:\d{1,4}|[A-Z]{1,4}))*\b/,
  /\b\d{6,8}[-_]\d{1,4}(?:[-_]\d{1,4})*\b/
];

function msExtractSearchCode(text, options) {
  const opts = options || {};
  const allowPureNumeric = !!(opts.allowPureNumeric);
  const upper = msGetText(text).toUpperCase();
  if (!upper) return "";
  const normalized = upper.replace(/\./g, " ").replace(/_/g, "-").replace(/\s+/g, " ").trim();
  const patterns = MS_SEARCH_CODE_PATTERNS.slice();
  if (allowPureNumeric) patterns.push(/\b\d{6,8}\b/);
  for (let i = 0; i < patterns.length; i++) {
    const match = normalized.match(patterns[i]);
    if (match && match[0]) {
      const isPureNumeric = allowPureNumeric && i === patterns.length - 1;
      if (isPureNumeric && match.index > 0) continue;
      return match[0].replace(/\s+/g, "").replace(/_/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "").toUpperCase();
    }
  }
  return "";
}

function msIsKnownStandaloneCode(code) {
  const norm = msNormalizeCode(code);
  if (!norm) return false;
  return /^(?:FC2(?:PPV)?\d{5,8}|CARIB\d{6,8}|1PONDO\d{6,8}|HEYZO\d{3,6}|T28\d{3,8}|N\d{4}|\d{6}\d{2,3}|\d{5,8})$/.test(norm) ||
    /^(?:S2M|MIAA|SSNI|SNIS|IPX|IPZZ|SSIS|SIVR|JUQ|MIDE|MIDV|STARS|START|ABW|ABF|ABP|RKI|DVAJ|WANZ|LULU|DLDSS|VRTM|SDMU|SDDE|MKMP|HMN|MUDR|ADN|CAWD|CJOD|PPPE|PRED|MGR|SHKD|MXGS|FSDSS|JUL|KTB|MIAB|GVH|MIMK|JUY|JUTA|IDBD|HND|DASD|CLO|BF|HONB|ROE|CEMD|MIUM|NITR|RCTD|RCT|IPVR|MIBD|JUR|JURD|SOE|ORE|PYO|NSFS)\d/.test(norm) ||
    /^\d{3}[A-Z]{2,10}\d{2,8}/.test(norm);
}

function msLooksLikeWesternPlayback(text) {
  const value = msGetText(text);
  return /[A-Za-z].*(?:^|[^0-9])(?:(?:19|20)\d{2}|\d{2})[._ -]\d{2}[._ -]\d{2}(?!\d)/.test(value);
}

function msExtractTrustedStandaloneCode(text, trusted, strict) {
  const value = msGetText(text);
  if (!value || /^tt\d+$/i.test(value)) return "";
  const found = msExtractSearchCode(value, { allowPureNumeric: true });
  if (found) {
    const cleaned = found.replace(/(?:19|20)\d{2}-\d{2}-\d{2}.*$/, "");
    if (msIsKnownStandaloneCode(cleaned) || trusted) return cleaned;
    const digits = msNormalizeCode(cleaned).match(/(\d{2,10})/);
    if (strict && digits && digits[1].length >= 3) return cleaned;
    return "";
  }
  if (msLooksLikeWesternPlayback(value)) return "";
  const stripped = value.toUpperCase().replace(/\.[A-Z0-9]{2,5}$/i, "").trim();
  const nMatch = stripped.match(/(?:^|[^A-Z0-9])N[-_. ]?(\d{4})(?:[^0-9]|$)/);
  if (nMatch) return "N-" + nMatch[1];
  if (!trusted && !strict) return "";
  const generic = stripped.match(/(?:^|[^A-Z0-9])(\d{3}[A-Z]{2,10}|[A-Z]{2,15})[-_. ]?(\d{2,10}[A-Z]?)(?:[^A-Z0-9]|$)/);
  if (!generic) return "";
  const digitRun = (generic[2].match(/\d+/) || [""])[0];
  if (strict && !trusted && digitRun.length < 3) return "";
  return generic[1] + "-" + generic[2];
}

function msIsHighConfidenceStandaloneTitle(title) {
  const code = msExtractTrustedStandaloneCode(title, false, false);
  return !!(code && msIsKnownStandaloneCode(code));
}

function msExtractLeadingStandaloneCode(text) {
  const value = msSafeDecodePlaybackValue(String(text || "").trim());
  if (!value || msLooksLikeWesternPlayback(value)) return "";
  if (msIsHighConfidenceStandaloneTitle(value)) return msExtractTrustedStandaloneCode(value, false, false);
  const leading = value.match(/^\s*(?:[\[【][^\]】]{1,20}[\]】]\s*)*((?:FC2(?:[-_ ]?PPV)?[-_ ]?\d{5,8}|\d{6}[-_]\d{2,3}|\d{3}[A-Z]{2,10}[-_]?\d{2,8}|[A-Z]{2,15}(?:[-_]?\d{3,10})[A-Z]?))(?![A-Z0-9])/i);
  return leading ? msExtractTrustedStandaloneCode(leading[1], true, false) : "";
}

function msExtractLabeledStandaloneCode(text) {
  const value = msSafeDecodePlaybackValue(String(text || "").trim());
  const labeled = value.match(/(?:番号|番號|品番|作品番号|DVD\s*(?:ID|番号)?|CODE)\s*[:：#=]\s*([0-9A-Z][0-9A-Z._-]{2,32})/i);
  return labeled ? msExtractTrustedStandaloneCode(labeled[1], true, false) : "";
}

function msParseAvdbPlaybackLink(link) {
  const value = msGetText(link);
  if (value.indexOf("avdb-detail:") !== 0) return null;
  const rest = value.slice("avdb-detail:".length);
  const colon = rest.indexOf(":");
  return {
    id: msSafeDecodePlaybackValue(colon >= 0 ? rest.slice(0, colon) : rest),
    number: msSafeDecodePlaybackValue(colon >= 0 ? rest.slice(colon + 1) : "")
  };
}

function msParseAvdbOnlinePlaybackLink(link) {
  const value = msGetText(link);
  if (value.indexOf("avdb-online://") !== 0) return null;
  const q = value.indexOf("?");
  if (q < 0) return null;
  const query = value.slice(q + 1).split("#")[0];
  const out = {};
  const pairs = query.split("&");
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    if (!pair) continue;
    const eq = pair.indexOf("=");
    const key = msSafeDecodePlaybackValue(eq >= 0 ? pair.slice(0, eq) : pair);
    const val = msSafeDecodePlaybackValue(eq >= 0 ? pair.slice(eq + 1) : "");
    if (key === "id" || key === "number") out[key] = val;
  }
  return out;
}

const MS_JAV_HOSTS = /(?:jable(?:\.tv)?|javdb|missav|123av|kanav|insav|javbus|javlibrary|javmenu|javtrailers)/i;

function msHasTrustedJavModuleHint(params) {
  const p = params || {};
  const joined = [p.link, p.id, p.url, p.site, p.source, p.provider, p.moduleId, p.moduleName].map(v => String(v || "")).join(" ");
  return MS_JAV_HOSTS.test(joined);
}

function msHasNormalPlaybackIdentity(params) {
  if (!params) return false;
  if (params.tmdbId || params.imdbId || params.doubanId || params.douban_id) return true;
  const id = msGetText(params.id);
  return /^\d+$/.test(id) || /^tt\d+$/i.test(id);
}

function msExtractTrustedJavIdentityCode(params) {
  const sources = [params.link, params.id, params.url];
  for (let i = 0; i < sources.length; i++) {
    const decoded = msSafeDecodePlaybackValue(String(sources[i] || "").trim());
    if (!MS_JAV_HOSTS.test(decoded)) continue;
    const noFrag = decoded.split("#")[0].split("?")[0];
    const segments = noFrag.split(/[\\/]/).filter(Boolean);
    for (let j = segments.length - 1; j >= 0; j--) {
      const segment = segments[j].replace(/-(?:uncensored-leak(?:ed)?|chinese-subtitle)$/i, "");
      const code = msExtractTrustedStandaloneCode(segment, true, false);
      if (code) return code;
    }
  }
  return "";
}

function msExtractCrossModulePlaybackCode(params) {
  const trustedHint = msHasTrustedJavModuleHint(params);
  const titles = [params.title, params.name, params.originalTitle, params.originalName, params.episodeName];
  for (let i = 0; i < titles.length; i++) {
    if (msIsHighConfidenceStandaloneTitle(titles[i])) {
      const code = msExtractTrustedStandaloneCode(titles[i], false, false);
      if (code) return code;
    }
    if (trustedHint) {
      const leading = msExtractLeadingStandaloneCode(titles[i]);
      if (leading) return leading;
    }
  }
  const descriptions = [params.description, params.summary];
  for (let i = 0; i < descriptions.length; i++) {
    const labeled = msExtractLabeledStandaloneCode(descriptions[i]);
    if (labeled) return labeled;
    if (trustedHint) {
      const leading = msExtractLeadingStandaloneCode(descriptions[i]);
      if (leading) return leading;
    }
  }
  return "";
}

function msExtractSafePlaybackCode(params) {
  params = params || {};
  const avdb = msParseAvdbPlaybackLink(params.link) || msParseAvdbOnlinePlaybackLink(params.link);
  if (avdb) {
    const code = msExtractTrustedStandaloneCode(avdb.number, true, false);
    if (code) return code;
  }
  const candidates = [params.number, params.code];
  for (let i = 0; i < candidates.length; i++) {
    const code = msExtractTrustedStandaloneCode(candidates[i], true, false);
    if (code) return code;
  }
  const trusted = msExtractTrustedJavIdentityCode(params);
  if (trusted) return trusted;
  const hasNormal = msHasNormalPlaybackIdentity(params);
  const fileFields = [params.fileName, params.filename, params.file_name, params.path, params.filePath, params.file_path, params.mediaPath, params.media_path, params.itemPath, params.item_path, params.localPath, params.local_path, params.originalFilename, params.originalFileName, params.videoUrl];
  if (params.mediaSource) fileFields.push(params.mediaSource.fileName, params.mediaSource.filename, params.mediaSource.path, params.mediaSource.url, params.mediaSource.streamUrl);
  if (Array.isArray(params.mediaSources)) {
    for (let i = 0; i < params.mediaSources.length; i++) {
      const src = params.mediaSources[i] || {};
      fileFields.push(src.fileName, src.filename, src.path, src.url, src.streamUrl);
    }
  }
  for (let i = 0; i < fileFields.length; i++) {
    const code = msExtractTrustedStandaloneCode(msPlaybackFileName(fileFields[i]), false, !hasNormal);
    if (code && (msIsKnownStandaloneCode(code) || !hasNormal)) return code;
  }
  if (hasNormal) return "";
  return msExtractCrossModulePlaybackCode(params);
}

function msExtractCodeFromMissAVLink(link) {
  const text = msGetText(link);
  if (!text) return "";
  const last = text.split("?")[0].split("#")[0].split("/").filter(Boolean).pop() || "";
  let segment = last;
  try {
    segment = decodeURIComponent(last);
  } catch (e) {
    segment = last;
  }
  segment = segment.replace(/-uncensored-leak/gi, "").replace(/-chinese-subtitle/gi, "");
  return msExtractSearchCode(segment, { allowPureNumeric: true });
}

function msGetVersionTag(url) {
  if (!url) return "有码";
  if (url.includes("-chinese-subtitle")) return "中文字幕";
  if (url.includes("-uncensored-leak")) return "无码破解";
  return "有码";
}

function msToAbsoluteUrl(url) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/")) return MISSAV_SITE + url;
  return MISSAV_SITE + "/" + url;
}

function msParseSearchResults(html, code) {
  if (!html || html.includes("Just a moment")) return [];
  const $ = Widget.html.load(html);
  const results = [];
  const seen = new Set();
  $("div.group").each((_, el) => {
    const card = $(el);
    const href = card.find("a.text-secondary").first().attr("href");
    if (!href) return;
    const link = msToAbsoluteUrl(href);
    if (!link || seen.has(link)) return;
    seen.add(link);
    const title = card.text().trim();
    const codeFromLink = msExtractCodeFromMissAVLink(link);
    const codeFromTitle = msExtractSearchCode(title, { allowPureNumeric: true });
    results.push({ title: title, link: link, code: codeFromLink || codeFromTitle, version: msGetVersionTag(link) });
  });
  if (results.length === 0) {
    $("a[href]").each((_, el) => {
      const anchor = $(el);
      const href = anchor.attr("href");
      if (!href) return;
      const link = msToAbsoluteUrl(href);
      if (!link.includes("/cn/")) return;
      if (seen.has(link)) return;
      const code = msExtractCodeFromMissAVLink(link);
      if (!code) return;
      seen.add(link);
      results.push({ title: anchor.text().trim(), link: link, code: code, version: msGetVersionTag(link) });
    });
  }
  const want = msNormalizeCode(code);
  const exact = results.filter(item => {
    const norm = msNormalizeCode(item.code);
    if (norm === want) return true;
    if (want.startsWith("FC2")) return norm.replace(/^FC2PPV/, "FC2") === want.replace(/^FC2PPV/, "FC2");
    return false;
  });
  return exact.length ? exact : [];
}

async function msFindMissAVDetailByCode(code) {
  const queries = [...new Set([code, String(code || "").replace(/-/g, "")].filter(Boolean))];
  const want = msNormalizeCode(code);
  for (const query of queries) {
    const url = MISSAV_SITE + "/cn/search/" + encodeURIComponent(query);
    try {
      const response = await requestMissavPage(url, MISSAV_SITE + "/");
      const html = response && response.data ? response.data : "";
      const results = msParseSearchResults(html, code);
      if (!results.length) continue;
      const exact = results.filter(item => {
        const norm = msNormalizeCode(item.code);
        if (norm === want) return true;
        if (want.startsWith("FC2")) return norm.replace(/^FC2PPV/, "FC2") === want.replace(/^FC2PPV/, "FC2");
        return false;
      });
      if (!exact.length) continue;
      const order = { "中文字幕": 0, "无码流出": 1, "有码": 2 };
      exact.sort((a, b) => (order[a.version] ?? 99) - (order[b.version] ?? 99));
      return exact.map(item => ({ link: item.link, version: item.version }));
    } catch (e) {
    }
  }
  return [];
}

async function msExtractUuidFromDetail(detailUrl) {
  try {
    const response = await requestMissavPage(detailUrl, MISSAV_SITE + "/");
    const html = response && response.data ? response.data : "";
    if (!html || html.includes("Just a moment")) return "";
    return extractMissavUuid(html);
  } catch (e) {
    return "";
  }
}

async function msIsM3U8Available(url) {
  try {
    const res = await Widget.http.get(url, {
      headers: getPlayHeaders(MISSAV_SITE + "/"),
      timeout: 1500
    });
    const status = res && (res.status || res.statusCode);
    return status === 200 && String(res && res.data || "").includes("#EXTM3U");
  } catch (e) {
    return false;
  }
}

function msBuildStreamItem(name, description, url, detailUrl) {
  return {
    name: name,
    description: description,
    url: url,
    customHeaders: getPlayHeaders(detailUrl)
  };
}

function msParseMasterVariants(masterText, uuid) {
  const prefix = "https://surrit.com/" + uuid + "/";
  const lines = String(masterText || "").split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  const variants = [];
  const seen = new Set();
  for (let index = 0; index < lines.length - 1; index++) {
    const info = lines[index];
    if (!/^#EXT-X-STREAM-INF:/i.test(info)) continue;
    const uri = lines[index + 1];
    if (!uri || uri.charAt(0) === "#" || uri.indexOf(".m3u8") < 0) continue;
    const resolutionMatch = info.match(/RESOLUTION=(\d+)x(\d+)/i);
    const bandwidthMatch = info.match(/BANDWIDTH=(\d+)/i);
    let height = resolutionMatch ? Number(resolutionMatch[2]) : 0;
    if (!height) {
      const uriRes = uri.match(/(\d+)x(\d+)/);
      if (uriRes) height = Number(uriRes[2]);
    }
    if (!height) {
      const uriQuality = uri.match(/(\d+)p\//i);
      if (uriQuality) height = Number(uriQuality[1]);
    }
    if (!height) continue;
    let url = uri;
    if (!/^https?:\/\//i.test(uri)) {
      url = uri.charAt(0) === "/" ? "https://surrit.com" + uri : prefix + uri;
    }
    if (seen.has(url)) continue;
    seen.add(url);
    variants.push({ height: height, bandwidth: bandwidthMatch ? Number(bandwidthMatch[1]) : 0, url: url });
  }
  variants.sort((a, b) => (b.height - a.height) || (b.bandwidth - a.bandwidth));
  return variants;
}

async function msFetchMasterVariants(uuid) {
  try {
    const res = await Widget.http.get("https://surrit.com/" + uuid + "/playlist.m3u8", {
      headers: getPlayHeaders(MISSAV_SITE + "/"),
      timeout: 5000
    });
    const status = res && (res.status || res.statusCode);
    const text = String(res && res.data || "");
    if (status !== 200 || !text.includes("#EXTM3U")) return [];
    return msParseMasterVariants(text, uuid);
  } catch (e) {
    return [];
  }
}

async function msBuildStreamItems(uuid, code, detailUrl, version) {
  const versionPrefix = version && version !== "有码" ? "[" + version + "]" : "";
  const versionLine = version && version !== "有码" ? "\n版本：" + version : "";
  const masterVariants = await msFetchMasterVariants(uuid);
  const hiVariants = masterVariants.filter(v => v.height >= 720);
  if (hiVariants.length) {
    return hiVariants.map(v => msBuildStreamItem(versionPrefix + "MissAV " + v.height + "P", "番号：" + code + "\n来源：MissAV\n清晰度：" + v.height + "P" + versionLine + "\n详情页：" + detailUrl, v.url, detailUrl));
  }
  if (String(code || "").toUpperCase().startsWith("FC2")) {
    const hd = "https://surrit.com/" + uuid + "/1280x720/video.m3u8";
    const sd = "https://surrit.com/" + uuid + "/720p/video.m3u8";
    let target = hd;
    let ok = await msIsM3U8Available(hd);
    if (!ok) {
      ok = await msIsM3U8Available(sd);
      target = sd;
    }
    if (ok) return [msBuildStreamItem(versionPrefix + "MissAV 720P", "番号：" + code + "\n来源：MissAV\n清晰度：720P" + versionLine + "\n详情页：" + detailUrl, target, detailUrl)];
    return [];
  }
  const full = "https://surrit.com/" + uuid + "/1080p/video.m3u8";
  const sd = "https://surrit.com/" + uuid + "/720p/video.m3u8";
  const items = [];
  if (await msIsM3U8Available(full)) items.push(msBuildStreamItem(versionPrefix + "MissAV 1080P", "番号：" + code + "\n来源：MissAV\n清晰度：1080P" + versionLine + "\n详情页：" + detailUrl, full, detailUrl));
  if (await msIsM3U8Available(sd)) items.push(msBuildStreamItem(versionPrefix + "MissAV 720P", "番号：" + code + "\n来源：MissAV\n清晰度：720P" + versionLine + "\n详情页：" + detailUrl, sd, detailUrl));
  return items;
}

async function loadResource(params) {
  try {
    const code = msExtractSafePlaybackCode(params || {});
    if (!code) return [];
    const details = await msFindMissAVDetailByCode(code);
    if (!details.length) return [];
    const seen = new Set();
    const items = [];
    for (const detail of details) {
      const uuid = await msExtractUuidFromDetail(detail.link);
      if (!uuid) continue;
      if (seen.has(uuid)) continue;
      seen.add(uuid);
      const streams = await msBuildStreamItems(uuid, code, detail.link, detail.version);
      items.push(...streams);
    }
    return items;
  } catch (e) {
    return [];
  }
}

async function parseVideoList(html, params) {
  const $ = Widget.html.load(html);
  const metadataByVideoId = extractListMetadataFromParsedDocument($);
  const videoTasks = [];

  $('a[href]').each((index, element) => {
    const $link = $(element);
    const href = $link.attr('href') || '';
    const $img = $link.find('img').first();

    if ($img.length && href.match(/\/(?:cn|dm\d+)\/[a-zA-Z0-9\-]+(-uncensored-leak)?$/)) {
      const imgSrc = $img.attr('data-src') || $img.attr('src');

      if (imgSrc) {
        let title = $link.attr('title') || $img.attr('alt') || '';

        if (!title) {
          const $parent = $link.closest('div');
          title = $parent.find('h1, h2, h3, .title, [class*="title"]').first().text().trim();
        }

        if (!title) {
          title = $link.text().trim();
        }

        const videoId = extractVideoId(href);
        if (shouldHideVideo(videoId)) return;

        const fullVideoUrl = href.startsWith('http') ? href : `${MISSAV_SITE}${href}`;
        const fallbackCover = normalizeImageUrl(imgSrc) || getFourhoiCoverUrl(videoId);
        let videoCode = getBaseVideoId(videoId).toUpperCase();

        if (title && title.toUpperCase().indexOf(videoCode) < 0) {
          title = `${videoCode} ${title}`;
        } else if (!title) {
          title = videoCode;
        }

        const metadataKey = videoId.toLowerCase();
        const listMetadata = metadataByVideoId[metadataKey] || {};
        const durationText = listMetadata.durationText;
        const detailUrl = fullVideoUrl;
        var descParts = [];
        descParts.push(`番号: ${videoCode}`);
        if (durationText) descParts.push(`时长: ${durationText}`);

        videoTasks.push((async () => {
          
          return {
            id: videoId,
            type: "link",
            title: `${videoCode}`,
            backdropPath: fallbackCover,
            mediaType: "movie",
            duration: 0,
            durationText: "",
            previewUrl: "",
            videoUrl: "",
            url: "",
            playUrl: "",
            link: detailUrl,
            detailUrl: detailUrl,
            playerType: "none"
          };
        })());
      }
    }
  });

  const items = await Promise.all(videoTasks);
  return msFillPosters(items);
}

async function loadDetail(link) {
  let genres = [];
  let actors = [];
  let directors = [];
  
  const linkStr = (link && typeof link === "object")
    ? (link.link || link.url || link.id || "")
    : String(link || "");
  try {
    let posterFromList = "";
    let backdropFromList = "";
    if (link && typeof link === "object") {
      posterFromList = link.posterPath || "";
      backdropFromList = link.backdropPath || "";
    }

    const response = await requestMissavPage(linkStr, MISSAV_SITE + "/");
    const videoId = extractVideoId(linkStr);
    const videoCode = getBaseVideoId(videoId).toUpperCase();
    const $ = Widget.html.load(response.data);
    const duration = Number($('meta[property="og:video:duration"]').attr('content'));

    let title = $('meta[property="og:title"]').attr('content') || '';
    if (!title) {
      title = $('h1').first().text().trim();
    }
    if (!title) {
      title = $('title').text().replace(/\s*-\s*MissAV.*$/i, '').trim();
    }

    const releaseDate = String(
      $('time').first().attr('datetime') ||
      $('time').first().text() ||
      ''
    ).trim() || undefined;

    let officialDescription = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
    officialDescription = String(officialDescription || '').replace(/\s+/g, ' ').trim();
    if (!officialDescription) {
      officialDescription = title || `${videoCode}`;
    }

    genres = parseMissavGenres(response && response.data);
    
    const missavPeople = parseMissavPeople(response && response.data);
    actors = (missavPeople.actresses || []).map(a => ({ id: a.id, name: a.name }));
    directors = buildDirectorsInfo(missavPeople.directors);

    const videoUrl = await resolveVideoUrlWithFallback(response.data, linkStr, $);

    const cover = normalizeImageUrl(backdropFromList)
      || normalizeImageUrl(posterFromList)
      || getFourhoiCoverUrl(videoId);

    if (!response || !response.data || response.data.includes('Just a moment')) {
      return {
        id: link,
        type: "detail",
        videoUrl: "",
        url: "",
        playUrl: "",
        title: `${videoCode}`,
        description: `番号: ${videoCode}\n播放页被风控，未解析到 m3u8`,
        posterPath: cover,
        backdropPath: cover,
        mediaType: "movie",
        duration: 0,
        durationText: "",
        previewUrl: "",
        playerType: "none",
        genres: genres,
        tags: genres,
        actors: actors,
        directors: directors,
        recommendations: [],
        link: link
      };
    }

    const posterItems = await msFillPosters([{ title: videoCode }]);
    const verticalPoster = (posterItems[0] && posterItems[0].posterPath) || "";
    const playbackUrl = videoUrl;
    const playHeaders = playbackUrl ? getPlayHeaders(linkStr) : undefined;

    return {
      id: link,
      type: "detail",
      videoUrl: playbackUrl || "",
      url: playbackUrl || "",
      playUrl: playbackUrl || "",
      title: `${videoCode}`,
      description: videoUrl ? officialDescription : `${officialDescription}\n未解析到 m3u8，请稍后重试`,
      releaseDate: releaseDate,
      posterPath: verticalPoster || cover,
      backdropPath: cover,
      mediaType: "movie",
      duration: duration,
      durationText: "",
      previewUrl: "",
      playerType: videoUrl ? "system" : "none",
      genres: genres,
      tags: genres,
      actors: actors,
      directors: directors,
      recommendations: [],
      link: link,
      customHeaders: playHeaders,
      headers: playHeaders
    };

  } catch (error) {
    const videoId = extractVideoId(linkStr);
    const videoCode = getBaseVideoId(videoId).toUpperCase();
    const fallbackCover = getFourhoiCoverUrl(videoId);

    return {
      id: link,
      type: "detail",
      videoUrl: "",
      url: "",
      playUrl: "",
      title: `${videoCode}`,
      description: `番号: ${videoCode}\n详情页请求失败，未解析到 m3u8`,
      releaseDate: undefined,
      posterPath: fallbackCover,
      backdropPath: fallbackCover,
      mediaType: "movie",
      duration: 0,
      durationText: "",
      previewUrl: "",
      playerType: "none",
      genres: genres,
      tags: genres,
      actors: actors,
      directors: directors,
      recommendations: [],
      link: link
    };
  }
}
