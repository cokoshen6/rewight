WidgetMetadata = {
    "id": "getav",
    "title": "GetAV",
    "version": "1.4.4",
    "requiredVersion": "0.0.1",
    "description": "Getav视频",
    "author": "Coko",
    "site": "https://getav.info",
    "iconurl": "https://getav.me/favicon.ico",
    "detailCacheDuration": 300,
    "modules": [
        {
            "id": "home",
            "title": "网站首页",
            "description": "最近更新 / 新片上市 / 大家正在看 / 随机发现；后两项仅刷新获取，不支持翻页",
            "functionName": "loadHome",
            "cacheDuration": 0,
            "params": [
                {
                    "name": "feed",
                    "title": "栏目",
                    "type": "enumeration",
                    "value": "updated",
                    "enumOptions": [
                        {
                            "title": "最近更新",
                            "value": "updated"
                        },
                        {
                            "title": "新片上市",
                            "value": "arrivals"
                        },
                        {
                            "title": "大家正在看",
                            "value": "watching"
                        },
                        {
                            "title": "随机发现",
                            "value": "discover"
                        }
                    ]
                },
                {
                    "name": "page",
                    "title": "页码",
                    "type": "page",
                    "belongTo": {
                        "paramName": "feed",
                        "value": [
                            "updated",
                            "arrivals"
                        ]
                    }
                }
            ]
        },
        {
            "id": "latest",
            "title": "最新",
            "description": "最新作品（可按发行/上传/更新排序）",
            "functionName": "loadLatest",
            "cacheDuration": 600,
            "params": [
                {
                    "name": "sort",
                    "title": "排序",
                    "type": "enumeration",
                    "value": "releaseDate",
                    "enumOptions": [
                        {
                            "title": "发行日期",
                            "value": "releaseDate"
                        },
                        {
                            "title": "上传日期",
                            "value": "uploadDate"
                        },
                        {
                            "title": "内容更新",
                            "value": "contentUpdatedAt"
                        }
                    ]
                },
                {
                    "name": "page",
                    "title": "页码",
                    "type": "page"
                }
            ]
        },
        {
            "id": "hot",
            "title": "人气榜",
            "description": "按人气排序（今日 / 本周 / 本月 / 总榜）",
            "functionName": "loadHot",
            "cacheDuration": 600,
            "params": [
                {
                    "name": "period",
                    "title": "榜单",
                    "type": "enumeration",
                    "value": "weekly",
                    "enumOptions": [
                        {
                            "title": "本周人气",
                            "value": "weekly"
                        },
                        {
                            "title": "今日人气",
                            "value": "daily"
                        },
                        {
                            "title": "本月人气",
                            "value": "monthly"
                        },
                        {
                            "title": "总人气",
                            "value": "total"
                        }
                    ]
                },
                {
                    "name": "page",
                    "title": "页码",
                    "type": "page"
                }
            ]
        },
        {
            "id": "category",
            "title": "分类",
            "description": "最新 / 新片 / 无码 / 有码 / 字幕 / 4K / FC2 / 精校字幕 / 机翻字幕；全部无码不提供上游无效的发行日排序",
            "functionName": "loadCategory",
            "cacheDuration": 0,
            "params": [
                {
                    "name": "category",
                    "title": "分类",
                    "type": "enumeration",
                    "value": "new-releases",
                    "enumOptions": [
                        {
                            "title": "最新",
                            "value": "latest"
                        },
                        {
                            "title": "新片",
                            "value": "new-releases"
                        },
                        {
                            "title": "无码",
                            "value": "uncensored"
                        },
                        {
                            "title": "有码",
                            "value": "censored"
                        },
                        {
                            "title": "字幕",
                            "value": "subtitle"
                        },
                        {
                            "title": "4K",
                            "value": "4k"
                        },
                        {
                            "title": "FC2",
                            "value": "fc2"
                        },
                        {
                            "title": "精校字幕",
                            "value": "subtitle-refined"
                        },
                        {
                            "title": "机翻字幕",
                            "value": "subtitle-machine"
                        }
                    ]
                },
                {
                    "name": "sortBy",
                    "title": "排序",
                    "type": "enumeration",
                    "value": "latest",
                    "belongTo": {
                        "paramName": "category",
                        "value": [
                            "latest",
                            "new-releases",
                            "censored",
                            "subtitle",
                            "4k",
                            "fc2",
                            "subtitle-refined",
                            "subtitle-machine"
                        ]
                    },
                    "enumOptions": [
                        {
                            "title": "最新",
                            "value": "latest"
                        },
                        {
                            "title": "最热",
                            "value": "popular"
                        },
                        {
                            "title": "评分",
                            "value": "rating"
                        },
                        {
                            "title": "收藏",
                            "value": "favorites"
                        },
                        {
                            "title": "发行日期",
                            "value": "releaseDate"
                        },
                        {
                            "title": "时长",
                            "value": "duration"
                        }
                    ]
                },
                {
                    "name": "uncensoredSort",
                    "title": "无码排序",
                    "type": "enumeration",
                    "value": "latest",
                    "belongTo": {
                        "paramName": "category",
                        "value": [
                            "uncensored"
                        ]
                    },
                    "enumOptions": [
                        {
                            "title": "最新",
                            "value": "latest"
                        },
                        {
                            "title": "最热",
                            "value": "popular"
                        },
                        {
                            "title": "评分",
                            "value": "rating"
                        },
                        {
                            "title": "收藏",
                            "value": "favorites"
                        },
                        {
                            "title": "时长",
                            "value": "duration"
                        }
                    ]
                },
                {
                    "name": "page",
                    "title": "页码",
                    "type": "page"
                }
            ]
        },
        {
            "id": "genre",
            "title": "按类型",
            "description": "类型可按最新、最热、收藏、发行日期或时长排序；更多类型可按完整名称或ID查询",
            "functionName": "loadGenre",
            "cacheDuration": 600,
            "params": [
                {
                    "name": "genreId",
                    "title": "类型",
                    "type": "enumeration",
                    "value": "1",
                    "enumOptions": [
                        {
                            "title": "高画质",
                            "value": "7"
                        },
                        {
                            "title": "单人作品",
                            "value": "4"
                        },
                        {
                            "title": "DMM独家",
                            "value": "5"
                        },
                        {
                            "title": "巨乳",
                            "value": "1"
                        },
                        {
                            "title": "内射",
                            "value": "148"
                        },
                        {
                            "title": "4K",
                            "value": "6"
                        },
                        {
                            "title": "已婚妇女",
                            "value": "35"
                        },
                        {
                            "title": "出轨",
                            "value": "24"
                        },
                        {
                            "title": "无码破解",
                            "value": "232"
                        },
                        {
                            "title": "熟女",
                            "value": "187"
                        },
                        {
                            "title": "苗条",
                            "value": "18"
                        },
                        {
                            "title": "数字马赛克",
                            "value": "183"
                        },
                        {
                            "title": "白天出轨",
                            "value": "250"
                        },
                        {
                            "title": "剧情",
                            "value": "25"
                        },
                        {
                            "title": "荡妇",
                            "value": "43"
                        },
                        {
                            "title": "口交",
                            "value": "28"
                        },
                        {
                            "title": "花痴",
                            "value": "27"
                        },
                        {
                            "title": "淫乱真实",
                            "value": "229"
                        },
                        {
                            "title": "乳交",
                            "value": "8"
                        },
                        {
                            "title": "多P",
                            "value": "3"
                        },
                        {
                            "title": "姐姐",
                            "value": "12"
                        },
                        {
                            "title": "高潮",
                            "value": "11"
                        },
                        {
                            "title": "潮吹",
                            "value": "16"
                        },
                        {
                            "title": "女上位",
                            "value": "36"
                        },
                        {
                            "title": "接吻",
                            "value": "238"
                        },
                        {
                            "title": "通奸",
                            "value": "22"
                        },
                        {
                            "title": "薄马赛克",
                            "value": "224"
                        },
                        {
                            "title": "白领女性",
                            "value": "31"
                        },
                        {
                            "title": "戏剧",
                            "value": "601"
                        },
                        {
                            "title": "颜射",
                            "value": "59"
                        },
                        {
                            "title": "连裤袜",
                            "value": "20"
                        },
                        {
                            "title": "素人作品",
                            "value": "233"
                        },
                        {
                            "title": "美乳",
                            "value": "253"
                        },
                        {
                            "title": "乳房",
                            "value": "29"
                        },
                        {
                            "title": "流汗",
                            "value": "258"
                        },
                        {
                            "title": "汗流浃背",
                            "value": "100"
                        },
                        {
                            "title": "屁股",
                            "value": "69"
                        },
                        {
                            "title": "恋腿癖",
                            "value": "79"
                        },
                        {
                            "title": "女教师",
                            "value": "21"
                        },
                        {
                            "title": "大屁股",
                            "value": "230"
                        },
                        {
                            "title": "巨臀",
                            "value": "54"
                        },
                        {
                            "title": "姐妹",
                            "value": "68"
                        },
                        {
                            "title": "乱交",
                            "value": "73"
                        },
                        {
                            "title": "妹妹",
                            "value": "239"
                        },
                        {
                            "title": "制服",
                            "value": "57"
                        },
                        {
                            "title": "主观视角",
                            "value": "71"
                        },
                        {
                            "title": "恋乳癖",
                            "value": "14"
                        },
                        {
                            "title": "母亲",
                            "value": "61"
                        },
                        {
                            "title": "美臀",
                            "value": "240"
                        },
                        {
                            "title": "偶像艺人",
                            "value": "17"
                        },
                        {
                            "title": "深喉",
                            "value": "88"
                        },
                        {
                            "title": "纪录片",
                            "value": "15"
                        },
                        {
                            "title": "第一人称视角",
                            "value": "46"
                        },
                        {
                            "title": "乳液",
                            "value": "62"
                        },
                        {
                            "title": "偶像",
                            "value": "234"
                        },
                        {
                            "title": "超乳",
                            "value": "13"
                        },
                        {
                            "title": "淫语",
                            "value": "49"
                        },
                        {
                            "title": "原作联动",
                            "value": "97"
                        },
                        {
                            "title": "后宫",
                            "value": "109"
                        },
                        {
                            "title": "婆婆",
                            "value": "195"
                        },
                        {
                            "title": "4小时以上作品",
                            "value": "157"
                        },
                        {
                            "title": "合集",
                            "value": "191"
                        },
                        {
                            "title": "精选综合",
                            "value": "288"
                        },
                        {
                            "title": "羞耻",
                            "value": "19"
                        },
                        {
                            "title": "足交",
                            "value": "78"
                        },
                        {
                            "title": "手交",
                            "value": "50"
                        },
                        {
                            "title": "内衣",
                            "value": "83"
                        },
                        {
                            "title": "大鸡巴・巨根",
                            "value": "39"
                        },
                        {
                            "title": "手淫",
                            "value": "252"
                        },
                        {
                            "title": "全高清(FHD)",
                            "value": "146"
                        },
                        {
                            "title": "女上司",
                            "value": "44"
                        },
                        {
                            "title": "企划",
                            "value": "247"
                        },
                        {
                            "title": "角色扮演",
                            "value": "80"
                        },
                        {
                            "title": "首次亮相",
                            "value": "9"
                        },
                        {
                            "title": "拘束",
                            "value": "53"
                        },
                        {
                            "title": "浴衣",
                            "value": "257"
                        },
                        {
                            "title": "温泉",
                            "value": "75"
                        },
                        {
                            "title": "妓女",
                            "value": "81"
                        },
                        {
                            "title": "滥交",
                            "value": "640"
                        },
                        {
                            "title": "美容院",
                            "value": "48"
                        },
                        {
                            "title": "高个",
                            "value": "38"
                        },
                        {
                            "title": "高挑",
                            "value": "237"
                        },
                        {
                            "title": "原作改编",
                            "value": "268"
                        },
                        {
                            "title": "各种职业",
                            "value": "74"
                        }
                    ]
                },
                {
                    "name": "genreQuery",
                    "title": "更多类型：名称或ID（可留空）",
                    "type": "input",
                    "value": "",
                    "placeholders": [
                        {
                            "title": "输入完整类型名称",
                            "value": "合集"
                        },
                        {
                            "title": "输入类型ID",
                            "value": "191"
                        }
                    ]
                },
                {
                    "name": "sortBy",
                    "title": "排序",
                    "type": "enumeration",
                    "value": "latest",
                    "enumOptions": [
                        {
                            "title": "最新",
                            "value": "latest"
                        },
                        {
                            "title": "最热",
                            "value": "popular"
                        },
                        {
                            "title": "收藏",
                            "value": "favorites"
                        },
                        {
                            "title": "发行日期",
                            "value": "date"
                        },
                        {
                            "title": "时长",
                            "value": "duration"
                        }
                    ]
                },
                {
                    "name": "page",
                    "title": "页码",
                    "type": "page"
                }
            ]
        },
        {
            "id": "star",
            "title": "按演员",
            "description": "选择常用演员，或填写完整名称/ID查询更多",
            "functionName": "loadCatalog",
            "cacheDuration": 600,
            "params": [
                {
                    "name": "folderKind",
                    "title": "目录类型",
                    "type": "constant",
                    "value": "star"
                },
                {
                    "name": "catalogId",
                    "title": "演员",
                    "type": "enumeration",
                    "value": "1991",
                    "enumOptions": [
                        {
                            "title": "彩月七绪",
                            "value": "1991"
                        },
                        {
                            "title": "田中柠檬",
                            "value": "664"
                        },
                        {
                            "title": "枫花恋",
                            "value": "443"
                        },
                        {
                            "title": "有栖花绯",
                            "value": "588"
                        },
                        {
                            "title": "凪光",
                            "value": "9"
                        },
                        {
                            "title": "小宵虎南",
                            "value": "22"
                        },
                        {
                            "title": "河北彩花",
                            "value": "21"
                        },
                        {
                            "title": "三上悠亚",
                            "value": "440"
                        },
                        {
                            "title": "枫富爱",
                            "value": "36"
                        },
                        {
                            "title": "安倍亚沙美",
                            "value": "1075"
                        },
                        {
                            "title": "新有菜",
                            "value": "616"
                        },
                        {
                            "title": "石川澪",
                            "value": "699"
                        },
                        {
                            "title": "七森莉莉",
                            "value": "8"
                        },
                        {
                            "title": "梦乃爱华",
                            "value": "50"
                        },
                        {
                            "title": "奥田咲",
                            "value": "18"
                        },
                        {
                            "title": "濑户环奈",
                            "value": "59"
                        },
                        {
                            "title": "橘玛丽",
                            "value": "325"
                        },
                        {
                            "title": "森日向子",
                            "value": "227"
                        },
                        {
                            "title": "鹫尾芽衣",
                            "value": "1086"
                        },
                        {
                            "title": "七海蒂娜",
                            "value": "644"
                        },
                        {
                            "title": "桃乃木香奈",
                            "value": "433"
                        },
                        {
                            "title": "清原美优",
                            "value": "13"
                        },
                        {
                            "title": "葵司",
                            "value": "12"
                        },
                        {
                            "title": "Unpai",
                            "value": "24"
                        }
                    ]
                },
                {
                    "name": "catalogQuery",
                    "title": "更多：名称或ID（覆盖上方选择）",
                    "type": "input",
                    "value": "",
                    "placeholders": [
                        {
                            "title": "彩月七绪",
                            "value": "彩月七绪"
                        },
                        {
                            "title": "目录ID",
                            "value": "1991"
                        }
                    ]
                },
                {
                    "name": "sortBy",
                    "title": "排序",
                    "type": "enumeration",
                    "value": "latest",
                    "enumOptions": [
                        {
                            "title": "最新",
                            "value": "latest"
                        },
                        {
                            "title": "最热",
                            "value": "popular"
                        },
                        {
                            "title": "评分",
                            "value": "rating"
                        },
                        {
                            "title": "收藏",
                            "value": "favorites"
                        },
                        {
                            "title": "发行日期",
                            "value": "date"
                        },
                        {
                            "title": "时长",
                            "value": "duration"
                        }
                    ]
                },
                {
                    "name": "page",
                    "title": "页码",
                    "type": "page"
                }
            ]
        },
        {
            "id": "publisher",
            "title": "按发行商",
            "description": "选择常用发行商，或填写完整名称/ID查询更多",
            "functionName": "loadCatalog",
            "cacheDuration": 600,
            "params": [
                {
                    "name": "folderKind",
                    "title": "目录类型",
                    "type": "constant",
                    "value": "publisher"
                },
                {
                    "name": "catalogId",
                    "title": "发行商",
                    "type": "enumeration",
                    "value": "7dc4e2581480c301",
                    "enumOptions": [
                        {
                            "title": "Madonna",
                            "value": "7dc4e2581480c301"
                        },
                        {
                            "title": "S1 NO.1 STYLE",
                            "value": "b864e399a96f32cb"
                        },
                        {
                            "title": "蒂修",
                            "value": "d93958e6f2b651e1"
                        },
                        {
                            "title": "Das!",
                            "value": "b79d2f10bfa9ff1c"
                        },
                        {
                            "title": "本中",
                            "value": "f603ec569ee11822"
                        },
                        {
                            "title": "MOODYZ DIVA",
                            "value": "365126edbc53277d"
                        },
                        {
                            "title": "ROCKET",
                            "value": "21d1b87a16549b8f"
                        },
                        {
                            "title": "S1 NO.1 STYLE",
                            "value": "7e134c1b889f3e76"
                        },
                        {
                            "title": "WANZ",
                            "value": "82a05247453243d0"
                        },
                        {
                            "title": "OPPAI",
                            "value": "86d37819a49cb111"
                        },
                        {
                            "title": "E-BODY",
                            "value": "6c32f9125a60657b"
                        },
                        {
                            "title": "大家的奇卡坦",
                            "value": "b766ababe8972bfb"
                        },
                        {
                            "title": "TAMEIKE",
                            "value": "359198cb80966216"
                        },
                        {
                            "title": "Nagae STYLE",
                            "value": "a0c16f28bcd8f560"
                        },
                        {
                            "title": "FALENO star",
                            "value": "1aba5222c53a6247"
                        },
                        {
                            "title": "龙缚",
                            "value": "02500af13a472854"
                        },
                        {
                            "title": "HHH集团",
                            "value": "4505614c836b2bcc"
                        },
                        {
                            "title": "kawaii",
                            "value": "f3e8b29516545a89"
                        },
                        {
                            "title": "GLORY QUEST",
                            "value": "47c8d8644b7ac1ff"
                        },
                        {
                            "title": "ABSOLUTELYPERFECT",
                            "value": "2cb0e365ca705b50"
                        },
                        {
                            "title": "DANDY",
                            "value": "54de4b107be950de"
                        },
                        {
                            "title": "SOD star",
                            "value": "82404fe24da26a83"
                        },
                        {
                            "title": "MOODYZACID",
                            "value": "3b33d6ae05cf5f5f"
                        },
                        {
                            "title": "SWITCH",
                            "value": "23461e3146de2ab9"
                        },
                        {
                            "title": "成人剧情",
                            "value": "3d82fdab703b2f71"
                        },
                        {
                            "title": "优雅",
                            "value": "c4fc65f4f5303fa4"
                        },
                        {
                            "title": "自然高潮",
                            "value": "c7d8389c61dc0014"
                        },
                        {
                            "title": "爱丽丝JAPAN",
                            "value": "da9b36ceb834e2da"
                        },
                        {
                            "title": "女神（Venus）",
                            "value": "7fb35a2606795c5f"
                        },
                        {
                            "title": "MOODYZDIVA",
                            "value": "94d2ac0ee142cdab"
                        },
                        {
                            "title": "ALEDDIN",
                            "value": "cb68b253f5231ee5"
                        },
                        {
                            "title": "REAL（Real Works）",
                            "value": "f71572223187d5cd"
                        },
                        {
                            "title": "Fitch",
                            "value": "2b00d051a8acd949"
                        },
                        {
                            "title": "ROOKIE",
                            "value": "b6f49ee085721083"
                        },
                        {
                            "title": "MONROE",
                            "value": "bf5ee79ff7df423c"
                        },
                        {
                            "title": "SENZ",
                            "value": "b658248afd199127"
                        },
                        {
                            "title": "痴女天堂",
                            "value": "fa47310ad11680ad"
                        },
                        {
                            "title": "million",
                            "value": "7722db6f1afb50ee"
                        },
                        {
                            "title": "DAHLIA",
                            "value": "67e54929759602b8"
                        },
                        {
                            "title": "SODstar",
                            "value": "1182bc755a731682"
                        },
                        {
                            "title": "母亲（Mother）",
                            "value": "c30a854e3517560c"
                        },
                        {
                            "title": "ABSOLUTELYFANTASIA",
                            "value": "5c714b06b083ddb9"
                        },
                        {
                            "title": "in mad",
                            "value": "16be4606453e5731"
                        },
                        {
                            "title": "乱伦（维纳斯）",
                            "value": "26059b0d1afb6d8c"
                        },
                        {
                            "title": "SODSTAR",
                            "value": "624da4c09627aa9d"
                        },
                        {
                            "title": "DEEP'S",
                            "value": "5ecfe90d2b9df0db"
                        },
                        {
                            "title": "inmad",
                            "value": "dfeb989b745d60d9"
                        },
                        {
                            "title": "M's video Group",
                            "value": "efb67f7a983c9be9"
                        }
                    ]
                },
                {
                    "name": "catalogQuery",
                    "title": "更多：名称或ID（覆盖上方选择）",
                    "type": "input",
                    "value": "",
                    "placeholders": [
                        {
                            "title": "Madonna",
                            "value": "Madonna"
                        },
                        {
                            "title": "目录ID",
                            "value": "7dc4e2581480c301"
                        }
                    ]
                },
                {
                    "name": "sortBy",
                    "title": "排序",
                    "type": "enumeration",
                    "value": "latest",
                    "enumOptions": [
                        {
                            "title": "最新",
                            "value": "latest"
                        },
                        {
                            "title": "最热",
                            "value": "popular"
                        },
                        {
                            "title": "评分",
                            "value": "rating"
                        },
                        {
                            "title": "收藏",
                            "value": "favorites"
                        },
                        {
                            "title": "发行日期",
                            "value": "date"
                        },
                        {
                            "title": "时长",
                            "value": "duration"
                        }
                    ]
                },
                {
                    "name": "page",
                    "title": "页码",
                    "type": "page"
                }
            ]
        },
        {
            "id": "code",
            "title": "按番号",
            "description": "选择常用番号前缀，或填写完整名称/ID查询更多",
            "functionName": "loadCatalog",
            "cacheDuration": 600,
            "params": [
                {
                    "name": "folderKind",
                    "title": "目录类型",
                    "type": "constant",
                    "value": "code"
                },
                {
                    "name": "catalogId",
                    "title": "番号前缀",
                    "type": "enumeration",
                    "value": "JUR",
                    "enumOptions": [
                        {
                            "title": "JUR",
                            "value": "JUR"
                        },
                        {
                            "title": "SONE",
                            "value": "SONE"
                        },
                        {
                            "title": "FC2PPV",
                            "value": "FC2PPV"
                        },
                        {
                            "title": "MIDA",
                            "value": "MIDA"
                        },
                        {
                            "title": "IPX",
                            "value": "IPX"
                        },
                        {
                            "title": "IPZZ",
                            "value": "IPZZ"
                        },
                        {
                            "title": "SNOS",
                            "value": "SNOS"
                        },
                        {
                            "title": "START",
                            "value": "START"
                        },
                        {
                            "title": "DASS",
                            "value": "DASS"
                        },
                        {
                            "title": "SSIS",
                            "value": "SSIS"
                        },
                        {
                            "title": "OFJE",
                            "value": "OFJE"
                        },
                        {
                            "title": "JUQ",
                            "value": "JUQ"
                        },
                        {
                            "title": "PRED",
                            "value": "PRED"
                        },
                        {
                            "title": "MIDV",
                            "value": "MIDV"
                        },
                        {
                            "title": "SSNI",
                            "value": "SSNI"
                        },
                        {
                            "title": "ADN",
                            "value": "ADN"
                        },
                        {
                            "title": "JUL",
                            "value": "JUL"
                        },
                        {
                            "title": "FSDSS",
                            "value": "FSDSS"
                        },
                        {
                            "title": "CAWD",
                            "value": "CAWD"
                        },
                        {
                            "title": "STARS",
                            "value": "STARS"
                        },
                        {
                            "title": "MIKR",
                            "value": "MIKR"
                        },
                        {
                            "title": "DLDSS",
                            "value": "DLDSS"
                        },
                        {
                            "title": "ROE",
                            "value": "ROE"
                        },
                        {
                            "title": "JUFE",
                            "value": "JUFE"
                        },
                        {
                            "title": "MEYD",
                            "value": "MEYD"
                        },
                        {
                            "title": "MIMK",
                            "value": "MIMK"
                        },
                        {
                            "title": "NSFS",
                            "value": "NSFS"
                        },
                        {
                            "title": "GVH",
                            "value": "GVH"
                        },
                        {
                            "title": "HMN",
                            "value": "HMN"
                        },
                        {
                            "title": "MNGS",
                            "value": "MNGS"
                        },
                        {
                            "title": "ABF",
                            "value": "ABF"
                        },
                        {
                            "title": "FNS",
                            "value": "FNS"
                        },
                        {
                            "title": "WAAA",
                            "value": "WAAA"
                        },
                        {
                            "title": "SAME",
                            "value": "SAME"
                        },
                        {
                            "title": "EBWH",
                            "value": "EBWH"
                        },
                        {
                            "title": "RCTD",
                            "value": "RCTD"
                        },
                        {
                            "title": "MVSD",
                            "value": "MVSD"
                        },
                        {
                            "title": "ATID",
                            "value": "ATID"
                        },
                        {
                            "title": "CJOD",
                            "value": "CJOD"
                        },
                        {
                            "title": "MIAA",
                            "value": "MIAA"
                        },
                        {
                            "title": "DASD",
                            "value": "DASD"
                        },
                        {
                            "title": "SW",
                            "value": "SW"
                        },
                        {
                            "title": "REAL",
                            "value": "REAL"
                        },
                        {
                            "title": "DVAJ",
                            "value": "DVAJ"
                        },
                        {
                            "title": "MIDE",
                            "value": "MIDE"
                        },
                        {
                            "title": "MIAB",
                            "value": "MIAB"
                        },
                        {
                            "title": "ALDN",
                            "value": "ALDN"
                        },
                        {
                            "title": "DSOD",
                            "value": "DSOD"
                        },
                        {
                            "title": "PPPD",
                            "value": "PPPD"
                        },
                        {
                            "title": "LULU",
                            "value": "LULU"
                        },
                        {
                            "title": "NGOD",
                            "value": "NGOD"
                        },
                        {
                            "title": "PPPE",
                            "value": "PPPE"
                        },
                        {
                            "title": "JUY",
                            "value": "JUY"
                        },
                        {
                            "title": "RKI",
                            "value": "RKI"
                        },
                        {
                            "title": "ABW",
                            "value": "ABW"
                        },
                        {
                            "title": "ACHJ",
                            "value": "ACHJ"
                        },
                        {
                            "title": "EBOD",
                            "value": "EBOD"
                        },
                        {
                            "title": "IPZ",
                            "value": "IPZ"
                        },
                        {
                            "title": "HUNTC",
                            "value": "HUNTC"
                        },
                        {
                            "title": "NSPS",
                            "value": "NSPS"
                        },
                        {
                            "title": "FJIN",
                            "value": "FJIN"
                        },
                        {
                            "title": "SILK",
                            "value": "SILK"
                        },
                        {
                            "title": "VEC",
                            "value": "VEC"
                        },
                        {
                            "title": "SDDE",
                            "value": "SDDE"
                        },
                        {
                            "title": "SNIS",
                            "value": "SNIS"
                        },
                        {
                            "title": "MIRD",
                            "value": "MIRD"
                        },
                        {
                            "title": "PFES",
                            "value": "PFES"
                        },
                        {
                            "title": "ROYD",
                            "value": "ROYD"
                        },
                        {
                            "title": "VENX",
                            "value": "VENX"
                        },
                        {
                            "title": "MFYD",
                            "value": "MFYD"
                        },
                        {
                            "title": "URE",
                            "value": "URE"
                        },
                        {
                            "title": "ABP",
                            "value": "ABP"
                        },
                        {
                            "title": "HND",
                            "value": "HND"
                        },
                        {
                            "title": "RBD",
                            "value": "RBD"
                        },
                        {
                            "title": "WANZ",
                            "value": "WANZ"
                        },
                        {
                            "title": "MIAD",
                            "value": "MIAD"
                        },
                        {
                            "title": "JUNY",
                            "value": "JUNY"
                        },
                        {
                            "title": "NHDTB",
                            "value": "NHDTB"
                        },
                        {
                            "title": "OFES",
                            "value": "OFES"
                        },
                        {
                            "title": "YUJ",
                            "value": "YUJ"
                        },
                        {
                            "title": "RCT",
                            "value": "RCT"
                        },
                        {
                            "title": "CAWB",
                            "value": "CAWB"
                        },
                        {
                            "title": "SVVRT",
                            "value": "SVVRT"
                        },
                        {
                            "title": "SAN",
                            "value": "SAN"
                        },
                        {
                            "title": "DANDY",
                            "value": "DANDY"
                        },
                        {
                            "title": "MKMP",
                            "value": "MKMP"
                        },
                        {
                            "title": "DVMM",
                            "value": "DVMM"
                        },
                        {
                            "title": "NIMA",
                            "value": "NIMA"
                        },
                        {
                            "title": "NACT",
                            "value": "NACT"
                        },
                        {
                            "title": "MIFD",
                            "value": "MIFD"
                        },
                        {
                            "title": "NMSL",
                            "value": "NMSL"
                        },
                        {
                            "title": "PGD",
                            "value": "PGD"
                        }
                    ]
                },
                {
                    "name": "catalogQuery",
                    "title": "更多：名称或ID（覆盖上方选择）",
                    "type": "input",
                    "value": "",
                    "placeholders": [
                        {
                            "title": "JUR",
                            "value": "JUR"
                        },
                        {
                            "title": "目录ID",
                            "value": "JUR"
                        }
                    ]
                },
                {
                    "name": "sortBy",
                    "title": "排序",
                    "type": "enumeration",
                    "value": "latest",
                    "enumOptions": [
                        {
                            "title": "最新",
                            "value": "latest"
                        },
                        {
                            "title": "最热",
                            "value": "popular"
                        },
                        {
                            "title": "评分",
                            "value": "rating"
                        },
                        {
                            "title": "收藏",
                            "value": "favorites"
                        },
                        {
                            "title": "发行日期",
                            "value": "date"
                        },
                        {
                            "title": "时长",
                            "value": "duration"
                        }
                    ]
                },
                {
                    "name": "page",
                    "title": "页码",
                    "type": "page"
                }
            ]
        },
        {
            "id": "loadResource",
            "title": "播放线路",
            "description": "起播时实时获取最新直链（签名地址）",
            "functionName": "loadResource",
            "type": "stream",
            "cacheDuration": 0,
            "params": []
        },
        {
            "id": "personal",
            "title": "我的账号",
            "description": "我的收藏 / 我的点赞 / 个性化推荐；推荐只刷新不分页，不上报观看或修改网站数据",
            "functionName": "loadPersonal",
            "cacheDuration": 0,
            "requiresWebView": false,
            "params": [
                {
                    "name": "personalFeed",
                    "title": "个人栏目",
                    "type": "enumeration",
                    "value": "favorites",
                    "enumOptions": [
                        {
                            "title": "我的收藏",
                            "value": "favorites"
                        },
                        {
                            "title": "我的点赞",
                            "value": "likes"
                        },
                        {
                            "title": "个性化推荐",
                            "value": "personalized"
                        }
                    ]
                },
                {
                    "name": "page",
                    "title": "页码",
                    "type": "page",
                    "belongTo": {
                        "paramName": "personalFeed",
                        "value": [
                            "favorites",
                            "likes"
                        ]
                    }
                }
            ]
        }
    ],
    "search": {
        "title": "搜索",
        "functionName": "search",
        "params": [
            {
                "name": "keyword",
                "title": "关键词",
                "type": "input",
                "placeholders": [
                    {
                        "title": "番号，如 HUNTC-385",
                        "value": "HUNTC-385"
                    },
                    {
                        "title": "片名 / 演员",
                        "value": "松本"
                    }
                ]
            },
            {
                "name": "page",
                "title": "页码",
                "type": "page"
            }
        ]
    },
    "globalParams": [
        {
            "name": "sessionHost",
            "title": "登录域名（与 Cookie 所属域名一致）",
            "type": "enumeration",
            "value": "https://getav.me",
            "enumOptions": [
                {
                    "title": "getav.me",
                    "value": "https://getav.me"
                },
                {
                    "title": "getav.co",
                    "value": "https://getav.co"
                },
                {
                    "title": "getav.live",
                    "value": "https://getav.live"
                },
                {
                    "title": "getav.top",
                    "value": "https://getav.top"
                },
                {
                    "title": "getav.net",
                    "value": "https://getav.net"
                }
            ]
        },
        {
            "name": "sessionCookie",
            "title": "登录 Cookie（敏感凭证，勿分享）",
            "description": "填写 Cookie 请求头，须包含 auth-token；公开栏目可留空",
            "type": "input",
            "value": ""
        }
    ]
};

const GA_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

const GA_HOSTS = [ "https://getav.me", "https://getav.co", "https://getav.live", "https://getav.top", "https://getav.net" ];

const GA_STATIC = "https://static.worldstatic.com";

const GA_LINK = "getav:";

const GA_PAGE_SIZE = 20;
const GA_PRIVATE_MARKER = "@private:";
const GA_HTTP_TIMEOUT = 15000;

function gaSafeText(raw) {
    if (typeof raw !== "string" && typeof raw !== "number") return "";
    const s = String(raw), out = [];
    for (let i = 0; i < s.length; i++) {
        const c = s.charCodeAt(i);
        if (c >= 0xD800 && c <= 0xDBFF) {
            const n = s.charCodeAt(i + 1);
            if (n >= 0xDC00 && n <= 0xDFFF) { out.push(s[i], s[++i]); }
            else out.push("\uFFFD");
        } else if (c >= 0xDC00 && c <= 0xDFFF) out.push("\uFFFD");
        else if (c >= 32 || c === 9 || c === 10 || c === 13) {
            if (c !== 127) out.push(s[i]);
        }
    }
    return out.join("");
}

function gaMovieId(raw) {
    if (typeof raw === "number") {
        if (!isFinite(raw) || raw <= 0 || Math.floor(raw) !== raw || raw > 9007199254740991) return "";
    } else if (typeof raw !== "string") return "";
    const id = String(raw).trim();
    return /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/.test(id) ? id.toUpperCase() : "";
}

function gaHttpUrl(raw, base) {
    if (typeof raw !== "string") return "";
    let s = raw.trim();
    if (!s || /[\s\x00-\x20\x7f\\]/.test(s) || gaSafeText(s) !== s) return "";
    if (s.indexOf("//") === 0) s = "https:" + s;
    else if (!/^https?:\/\//i.test(s)) {
        if (!base || /^[A-Za-z][A-Za-z0-9+.-]*:/.test(s) || s.indexOf(":") >= 0) return "";
        s = base.replace(/\/+$/, "") + "/" + s.replace(/^\/+/, "");
    }
    const m = s.match(/^https?:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    if (!m || /[@%\[\]]/.test(m[1])) return "";
    const a = m[1].split(":"), h = a[0].toLowerCase();
    if (a.length > 2 || a.length === 2 && (!/^\d{1,5}$/.test(a[1]) || Number(a[1]) < 1 || Number(a[1]) > 65535)) return "";
    if (!/^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/.test(h) || h.indexOf(".") < 0 || h.indexOf("..") >= 0) return "";
    if (/(^|\.)(localhost|local|internal|home|lan)$/.test(h)) return "";
    if (/^[\d.]+$/.test(h)) {
        const octets = h.split(".");
        if (octets.length !== 4 || octets.some(v => !/^\d{1,3}$/.test(v) || Number(v) > 255 || v.length > 1 && v[0] === "0")) return "";
        const n = octets.map(Number);
        if (n[0] === 0 || n[0] === 10 || n[0] === 127 || n[0] >= 224 || n[0] === 169 && n[1] === 254
            || n[0] === 172 && n[1] >= 16 && n[1] <= 31 || n[0] === 192 && n[1] === 168
            || n[0] === 100 && n[1] >= 64 && n[1] <= 127) return "";
    } else if (h.split(".").some(v => !v || v.length > 63 || /^-|-$/.test(v)) || /(?:^|\.)(?:0x[0-9a-f]+|\d+)$/i.test(h)) return "";
    return s;
}

function gaStatus(response) {
    const value = response && (response.status != null ? response.status : response.statusCode);
    const n = Number(value);
    return isFinite(n) && n > 0 ? n : 0;
}

function gaContentType(response) {
    const headers = response && response.headers;
    if (!headers || typeof headers !== "object") return "";
    const key = Object.keys(headers).find(k => k.toLowerCase() === "content-type");
    return key ? String(headers[key] || "").toLowerCase() : "";
}

function gaLinkFor(code, title, options) {
    const text = gaSafeText(title).trim();
    if (options && options.private) return GA_LINK + code + "#" + GA_PRIVATE_MARKER + encodeURIComponent(text);
    return GA_LINK + code + (text ? "#" + encodeURIComponent(text) : "");
}

function gaOwnedLink(raw) {
    if (typeof raw !== "string" || raw.indexOf(GA_LINK) !== 0) return null;
    const hash = raw.indexOf("#"), part = hash < 0 ? raw.slice(GA_LINK.length) : raw.slice(GA_LINK.length, hash);
    if (part !== part.trim()) return null;
    const code = gaMovieId(part);
    if (!code) return null;
    let title = "", privateSource = false, fragment = hash < 0 ? "" : raw.slice(hash + 1);
    if (fragment.indexOf(GA_PRIVATE_MARKER) === 0) { privateSource = true; fragment = fragment.slice(GA_PRIVATE_MARKER.length); }
    try { title = gaSafeText(decodeURIComponent(fragment)); } catch (error) { title = ""; }
    return { code: code, title: title, private: privateSource };
}

function gaFolderIdentity(data, id) {
    if (!data || typeof data !== "object" || Array.isArray(data)) return false;
    const reports = [data.id, data.requestedId].concat(Array.isArray(data.mergedGenreIds) ? data.mergedGenreIds : []);
    return reports.some(value => (typeof value === "string" || typeof value === "number") && String(value).toLowerCase() === String(id).toLowerCase());
}

function gaMovieRows(rows) {
    if (!Array.isArray(rows)) throw new Error("GetAV：影片列表格式异常");
    const seen = Object.create(null), result = [];
    rows.forEach(movie => {
        if (!movie || typeof movie !== "object" || Array.isArray(movie)) return;
        const id = gaMovieId(movie.id);
        if (!id || seen[id]) return;
        seen[id] = true;
        result.push(movie);
    });
    if (rows.length && !result.length) throw new Error("GetAV：非空列表没有合法影片，已停止显示");
    return result;
}


const GA_DMM_PREFIX_MAP = {
    FSDSS: "1", FCDSS: "1", FNS: "1", FTHTD: "1", FALENO: "1", FGAN: "1", DLDSS: "1",
    FSNF: "1", FLAV: "1", NHDTC: "1", KUSE: "1", SDNM: "1", STARS: "1",
    STAR: "1", START: "1", SODS: "1", SDDE: "1", MOGI: "1", FTAV: "1", WSA: "2",
    MBDD: "301", REBD: "h_346", REBDB: "h_346", GSHRB: "h_346",
    NAAC: "h_706", MAAN: "h_1711"
};

function gaDmmContentId(code) {
    const m = String(code || "").toUpperCase().match(/^([A-Z]{2,6})-?(\d{2,6})([A-Z]?)$/);
    if (!m) return "";
    const prefix = m[1], num5 = m[2].padStart(5, "0"), suffix = (m[3] || "").toLowerCase();
    const np = GA_DMM_PREFIX_MAP[prefix] || "";
    return np + prefix.toLowerCase() + num5 + suffix;
}

function gaDmmPoster(code) {
    const cid = gaDmmContentId(code);
    if (!cid) return "";
    return "https://awsimgsrc.dmm.co.jp/pics_dig/digital/video/" + cid + "/" + cid + "ps.jpg";
}

const GA_DMM_STILL_COUNT = 10;
const GA_DMM_STILL_RANGE = "bytes=0-0";
async function gaProbeStill(url) {
    const target = gaHttpUrl(url);
    if (!target) return false;
    try {
        const res = await Widget.http.get(target, {
            headers: { "User-Agent": GA_UA, "Range": GA_DMM_STILL_RANGE }, timeout: 9000, allow_redirects: false
        });
        const status = gaStatus(res), type = gaContentType(res);
        const body = res && res.data;
        if (typeof body === "string" && /^\s*<(?:!doctype|html)/i.test(body)) return false;
        return (status === 200 || status === 206) && /^image\//.test(type);
    } catch (error) { return false; }
}
async function gaDmmStills(code) {
    const cid = gaDmmContentId(code);
    if (!cid) return [];
    const urls = [], flags = [];
    for (let i = 1; i <= GA_DMM_STILL_COUNT; i++) {
        urls.push("https://pics.dmm.co.jp/digital/video/" + cid + "/" + cid + "jp-" + String(i).padStart(3, "0") + ".jpg");
        flags.push(false);
    }
    const jobs = urls.map((url, index) => async () => { flags[index] = await gaProbeStill(url); });
    await gaPool(jobs, 4, Date.now() + 9000);
    return urls.filter((url, index) => flags[index]);
}

const GA_POSTER_MIN_RANGE = "bytes=0-0";
const GA_COVER_HIT_TTL = 7 * 86400000;
const GA_COVER_STATE = { memory: Object.create(null), jobs: Object.create(null), cleaned: false };

async function gaInvalidateLegacyCoverCaches() {
    if (GA_COVER_STATE.cleaned || !Widget.storage) return;
    if (GA_COVER_STATE.cleaning) return GA_COVER_STATE.cleaning;
    const task = (async () => {
        let clean = true;
        for (const key of ["getav_dmmcover", "getav_jdbcover"]) {
            try {
                if (typeof Widget.storage.remove === "function") await Widget.storage.remove(key);
                else if (typeof Widget.storage.set === "function") await Widget.storage.set(key, "");
                else clean = false;
            } catch (error) {
                
                if (!error || error.code !== "ENOENT") clean = false;
            }
        }
        GA_COVER_STATE.cleaned = clean;
    })();
    GA_COVER_STATE.cleaning = task;
    try { await task; } finally { GA_COVER_STATE.cleaning = null; }
}

function gaCoverClean(map, max) {
    const out = Object.create(null), now = Date.now();
    if (!map || typeof map !== "object" || Array.isArray(map)) return out;
    Object.keys(map).forEach(raw => {
        const id = gaMovieId(raw), entry = map[raw];
        if (!id || !entry || typeof entry !== "object" || Array.isArray(entry) || typeof entry.u !== "string"
            || typeof entry.t !== "number" || !isFinite(entry.t) || entry.t <= 0 || entry.t > now + 60000) return;
        const url = entry.u ? gaHttpUrl(entry.u) : "";
        if (entry.u && !url || now - entry.t >= (url ? GA_COVER_HIT_TTL : 900000)) return;
        if (!out[id] || entry.t >= out[id].t) out[id] = { u: url, t: entry.t };
    });
    const keys = Object.keys(out).sort((a, b) => out[b].t - out[a].t);
    keys.slice(max).forEach(key => { delete out[key]; });
    return out;
}

function gaCoverRead(key, max) {
    gaInvalidateLegacyCoverCaches();
    let disk = Object.create(null);
    try {
        const raw = Widget.storage.get(key);
        if (typeof raw !== "string" || raw.length <= 500000) disk = gaCoverClean(typeof raw === "string" ? JSON.parse(raw) : raw, max);
    } catch (error) {}
    const memory = gaCoverClean(GA_COVER_STATE.memory[key], max), now = Date.now();
    Object.keys(memory).forEach(code => {
        if (!disk[code] || Math.min(memory[code].t, now) >= Math.min(disk[code].t, now)) disk[code] = memory[code];
    });
    return gaCoverClean(disk, max);
}

function gaCoverWrite(key, map, max) {
    const merged = gaCoverRead(key, max), patch = gaCoverClean(map, max), now = Date.now();
    Object.keys(patch).forEach(code => {
        if (!merged[code] || Math.min(patch[code].t, now) >= Math.min(merged[code].t, now)) merged[code] = patch[code];
    });
    const result = gaCoverClean(merged, max);
    GA_COVER_STATE.memory[key] = result;
    try { Widget.storage.set(key, JSON.stringify(result)); } catch (error) {}
}

async function gaCoverOnce(provider, code, loader) {
    const key = provider === "dmm" ? GA_DMM_CACHE_KEY : GA_JDB_CACHE_KEY;
    const max = provider === "dmm" ? GA_DMM_CACHE_MAX : GA_JDB_CACHE_MAX;
    const cache = gaCoverRead(key, max);
    if (cache[code]) return cache[code].u;
    const job = provider + ":" + code;
    if (GA_COVER_STATE.jobs[job]) return GA_COVER_STATE.jobs[job];
    const task = (async () => {
        let url = "";
        try { url = gaHttpUrl(await loader()); } catch (error) {}
        const patch = Object.create(null);
        patch[code] = { u: url, t: Date.now() };
        gaCoverWrite(key, patch, max);
        return url;
    })();
    GA_COVER_STATE.jobs[job] = task;
    try { return await task; } finally { delete GA_COVER_STATE.jobs[job]; }
}


async function gaProbePoster(url) {
    const target = gaHttpUrl(url);
    if (!target) return false;
    try {
        const res = await Widget.http.get(target, {
            headers: { "User-Agent": GA_UA, "Range": GA_POSTER_MIN_RANGE }, timeout: 9000
        });
        const status = gaStatus(res), type = gaContentType(res);
        const body = res && res.data;
        if (typeof body === "string" && /^\s*<(?:!doctype|html)/i.test(body)) return false;
        return (status === 200 || status === 206) && /^image\//.test(type);
    } catch (error) { return false; }
}

const GA_DMM_CACHE_KEY = "getav_dmmcover_v2";
const GA_DMM_CACHE_MAX = 500;
const GA_DMM_MISS_TTL = 900000;
function gaDmmCacheGet() { return gaCoverRead(GA_DMM_CACHE_KEY, GA_DMM_CACHE_MAX); }
function gaDmmCacheSet(map) { gaCoverWrite(GA_DMM_CACHE_KEY, map, GA_DMM_CACHE_MAX); }

async function gaFillPosters(items, deadline) {
    if (!Array.isArray(items)) return [];
    await gaInvalidateLegacyCoverCaches();
    const end = typeof deadline === "number" ? deadline : Date.now() + 18000;
    const targets = items.filter(item => item && !item.posterPath && gaMovieId(item.id));
    const jobs = targets.map(item => async () => {
        const code = gaMovieId(item.id);
        if (/^FC2/i.test(code) || /^\d{6,}-\d{3,}$/.test(code)) return;
        const url = await gaCoverOnce("dmm", code, async () => {
            const candidate = gaDmmPoster(code);
            return candidate && await gaProbePoster(candidate) ? candidate : "";
        });
        if (url) item.posterPath = url;
    });
    await gaPool(jobs, 4, end);
    items.forEach(item => {
        if (item && !item.posterPath && gaMovieId(item.id)) {
            const code = gaMovieId(item.id);
            if (!/^FC2/i.test(code) && !/^\d{6,}-\d{3,}$/.test(code) && item.backdropPath) item.posterPath = item.backdropPath;
        }
    });
    await gaFillJavdbPosters(items, end);
    items.forEach(item => {
        if (item && !item.posterPath && item.backdropPath) item.posterPath = item.backdropPath;
    });
    return items;
}

const GA_JAVDB_SEARCH = "https://javdb.com/search?q=";
const GA_JAVDB_TIMEOUT = 9000;
const GA_JAVDB_CONCURRENCY = 4;
const GA_JAVDB_STAGE_TIMEOUT = 15000;
const GA_JDB_CACHE_KEY = "getav_jdbcover_v2";
const GA_JDB_CACHE_MAX = 300;
const GA_JDB_MISS_TTL = 900000;

function gaNormCode(s) { return gaSafeText(s).toUpperCase().replace(/[-_\s]/g, ""); }
function gaJdbCacheGet() { return gaCoverRead(GA_JDB_CACHE_KEY, GA_JDB_CACHE_MAX); }
function gaJdbCacheSet(map) { gaCoverWrite(GA_JDB_CACHE_KEY, map, GA_JDB_CACHE_MAX); }

async function gaJavdbCover(code) {
    const id = gaMovieId(code);
    if (!id) return "";
    const res = await Widget.http.get(GA_JAVDB_SEARCH + encodeURIComponent(id) + "&f=all", {
        headers: { "User-Agent": GA_UA, "Accept": "text/html,application/xhtml+xml", "Accept-Language": "zh-CN,zh;q=0.9" },
        timeout: GA_JAVDB_TIMEOUT
    });
    const status = gaStatus(res);
    if (status && (status < 200 || status >= 300)) return "";
    const html = res && typeof res.data === "string" ? res.data : "";
    if (!html || html.length > 2000000) return "";
    if (/<title[^>]*>\s*(?:Just a moment|Attention Required)[^<]*<\/title>/i.test(html)) return "";
    const $ = Widget.html.load(html), want = gaNormCode(id);
    let cover = "";
    $("a.box").each((_, element) => {
        if (cover) return;
        try {
            const box = $(element);
            const title = box.find(".video-title strong").first().text().trim() || box.find(".video-title").first().text().trim();
            if (gaNormCode(title) !== want) return;
            const image = box.find(".cover img").first();
            cover = gaHttpUrl(image.attr("data-src")) || gaHttpUrl(image.attr("src"));
        } catch (error) {}
    });
    return cover;
}

async function gaPool(jobs, limit, deadlineMs) {
    let idx = 0;
    const tasks = [];
    const n = Math.min(limit, jobs.length);
    for (let w = 0; w < n; w++) {
        tasks.push((async () => {
            while (idx < jobs.length) {
                
                if (deadlineMs && Date.now() > deadlineMs) return;
                const i = idx++;
                try {
                    await jobs[i]();
                } catch (e) {}
            }
        })());
    }
    await Promise.all(tasks);
}

async function gaFillJavdbPosters(items, deadline) {
    if (!Array.isArray(items)) return;
    const end = Math.min(typeof deadline === "number" ? deadline : Infinity, Date.now() + GA_JAVDB_STAGE_TIMEOUT);
    const targets = items.filter(item => item && !item.posterPath && gaMovieId(item.id));
    const jobs = targets.map(item => async () => {
        const code = gaMovieId(item.id);
        if (!/^FC2/i.test(code) && !/^\d{6,}-\d{3,}$/.test(code)) return;
        const url = await gaCoverOnce("javdb", code, () => gaJavdbCover(code));
        if (url) item.posterPath = url;
    });
    await gaPool(jobs, GA_JAVDB_CONCURRENCY, end);
}

let _hostIdx = 0;

const _detailCache = Object.create(null);
let _preferredHost = "";

function gaHosts() {
    const list = GA_HOSTS.slice();
    let cached = "";
    try { cached = Widget.storage.get("getav_host"); } catch (error) {}
    const preferred = GA_HOSTS.indexOf(_preferredHost) >= 0 ? _preferredHost
        : typeof cached === "string" && GA_HOSTS.indexOf(cached) >= 0 ? cached : "";
    if (preferred) {
        list.splice(list.indexOf(preferred), 1);
        list.unshift(preferred);
    }
    return list;
}

function gaHeaders(host) {
    return {
        "User-Agent": GA_UA,
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        Referer: host + "/zh",
        Origin: host
    };
}

function gaParseBody(res) {
    if (!res) return null;
    const status = gaStatus(res);
    if (status && (status < 200 || status >= 300)) return null;
    let body = res.data !== undefined ? res.data : res;
    if (typeof body === "string") {
        try { body = JSON.parse(body); } catch (error) { return null; }
    }
    if (!body || typeof body !== "object" || Array.isArray(body) || body.success === false) return null;
    return body;
}

async function gaApiAt(host, path, options) {
    if (GA_HOSTS.indexOf(host) < 0 || typeof path !== "string" || !/^\/api\//.test(path) || /[\r\n#\\]/.test(path) || path.indexOf("://") >= 0) {
        throw new Error("GetAV：公共请求目标无效");
    }
    const headers = gaHeaders(host);
    if (options && options.fresh) { headers["Cache-Control"] = "no-cache"; headers.Pragma = "no-cache"; }
    let res;
    try {
        res = await Widget.http.get(host + path, { headers: headers, timeout: GA_HTTP_TIMEOUT, allow_redirects: false });
    } catch (error) {
        const status = gaStatus(error && error.response || error);
        const safe = new Error("GetAV：公共接口网络失败" + (status ? "（HTTP " + status + "）" : ""));
        if (status === 429 || status === 449) safe.gaThrottled = true;
        throw safe;
    }
    const status = gaStatus(res), body = gaParseBody(res);
    if (!body) {
        const safe = new Error("GetAV：公共接口响应无效" + (status ? "（HTTP " + status + "）" : ""));
        if (status === 429 || status === 449) safe.gaThrottled = true;
        throw safe;
    }
    const data = body.data !== undefined ? body.data
        : /^\/api\/recommendations\//.test(path) && body.success === true && Array.isArray(body.movies) ? { movies: body.movies } : null;
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("GetAV：公共接口数据格式异常");
    return data;
}

async function gaApiMany(paths, options) {
    if (!Array.isArray(paths) || !paths.length || paths.length > 3) throw new Error("GetAV：公共请求组无效");
    const hosts = gaHosts();
    let last = "";
    for (const host of hosts) {
        try {
            const results = await Promise.all(paths.map(path => gaApiAt(host, path, options)));
            _preferredHost = host;
            _hostIdx = GA_HOSTS.indexOf(host);
            try { Widget.storage.set("getav_host", host); } catch (error) {}
            return results;
        } catch (error) {
            last = error && error.message || "接口失败";
            if (error && error.gaThrottled) throw new Error("GetAV：请求过于频繁或需网页验证，请稍后再试");
        }
    }
    throw new Error("GetAV 请求失败（镜像均不可用）：" + last);
}

async function gaApi(path, options) {
    const data = await gaApiMany([path], options);
    return data[0];
}

function gaImg(raw) {
    return gaHttpUrl(raw, GA_STATIC);
}

function gaDisplayImg(raw, options) {
    const url = gaImg(raw);
    if (!url || !options || !options.private) return url;
    const host = url.match(/^https:\/\/([^\/?#]+)/i);
    if (!host) return "";
    const origin = "https://" + host[1].toLowerCase().replace(/:443$/, "");
    return origin === GA_STATIC || GA_HOSTS.indexOf(origin) >= 0 ? url : "";
}

function gaSeconds(secs) {
    const s = parseInt(secs, 10);
    if (!isFinite(s) || s <= 0) return "";
    const pad = n => n < 10 ? "0" + n : String(n);
    const h = Math.floor(s / 3600);
    const m = Math.floor(s % 3600 / 60);
    const sec = s % 60;
    return h > 0 ? pad(h) + ":" + pad(m) + ":" + pad(sec) : pad(m) + ":" + pad(sec);
}

function gaDurationText(m) {
    if (!m || typeof m !== "object") return "";
    const t = gaSafeText(m.durationFormatted).replace(/\.\d+$/, "");
    return t || gaSeconds(m.videoLength || m.durationSeconds);
}

function gaPageNum(params) {
    const raw = params && params.page;
    if (typeof raw !== "string" && typeof raw !== "number" && raw != null) return 1;
    const p = Number(raw == null || raw === "" ? 1 : raw);
    return isFinite(p) && p >= 1 && p <= 9007199254740991 ? Math.floor(p) : 1;
}

function gaInjected(params) {
    const p = params && typeof params === "object" ? params : {};
    if (p.peopleId != null && p.peopleId !== "") {
        const id = gaCatalogId("star", p.peopleId);
        if (!id) throw new Error("GetAV：演员 ID 格式无效，请重新选择");
        return { kind: "star", id: id };
    }
    if (p.genreId != null && p.genreId !== "") {
        const id = gaCatalogId("genre", p.genreId);
        if (!id) throw new Error("GetAV：类型 ID 格式无效，请重新选择");
        return { kind: "genre", id: id };
    }
    return null;
}

function gaTitle(raw, code) {
    return String(code || "").trim() || String(raw == null ? "" : raw).trim();
}

function gaStripLeadingCode(text, code) {
    const s = String(text == null ? "" : text);
    const c = String(code || "").trim();
    if (!s || !c) return s;
    const head = s.trim();
    if (head.toUpperCase().indexOf(c.toUpperCase()) !== 0) return s;
    const rest = head.slice(c.length);
    
    if (rest && !/^[\s:：\-–—「」【】『』()（）]/.test(rest)) return s;
    return rest.replace(/^[\s:：\-–—「」【】『』()（）]+/, "").trim();
}

function gaItem(m, options) {
    if (!m || typeof m !== "object" || Array.isArray(m)) return null;
    const code = gaMovieId(m.id);
    if (!code) return null;
    const fullTitle = gaSafeText(m.title).trim();
    const item = {
        id: code,
        type: "url",
        mediaType: "movie",
        link: gaLinkFor(code, fullTitle, options),
        title: code,
        description: gaStripLeadingCode(fullTitle, code),
        backdropPath: gaDisplayImg(m.localImg, options) || gaDisplayImg(m.img, options),
        releaseDate: gaSafeText(m.date).slice(0, 10)
    };
    const dur = Number(m.videoLength || m.durationSeconds || 0);
    if (isFinite(dur) && dur > 0) { item.duration = dur; item.durationText = gaDurationText(m); }
    return item;
}

async function gaList(data, options) {
    if (!data || typeof data !== "object" || Array.isArray(data) || !Array.isArray(data.movies)) throw new Error("GetAV：影片列表响应格式异常");
    const items = gaMovieRows(data.movies).map(m => gaItem(m, options)).filter(Boolean);
    await gaInvalidateLegacyCoverCaches();
    if (options && options.private) {
        items.forEach(item => { item.posterPath = item.backdropPath; });
        return items;
    }
    return gaFillPosters(items);
}

const GA_FOLDER_API = {
    genre: "genres",
    star: "stars",
    studio: "studios",
    code: "codes",
    publisher: "publishers",
    series: "series",
    director: "directors"
};

async function gaListByFolder(kind, id, page, sortBy, options) {
    if (!Object.prototype.hasOwnProperty.call(GA_FOLDER_API, kind)) return [];
    const plural = GA_FOLDER_API[kind], target = gaCatalogId(kind, id);
    if (!target) throw new Error("GetAV：目录 ID 格式无效");
    const sorts = ["latest", "popular", "rating", "favorites", "date", "duration"];
    const sort = sorts.indexOf(sortBy) >= 0 ? sortBy : "latest";
    const path = "/api/" + plural + "/" + encodeURIComponent(target) + "?page=" + gaPageNum({ page: page }) + "&limit=" + GA_PAGE_SIZE + "&sortBy=" + sort + "&locale=zh";
    const data = await gaApi(path);
    if (!gaFolderIdentity(data, target)) throw new Error("GetAV：目录响应未确认请求 ID，已停止显示");
    return gaList(data, options);
}

async function gaMoviesApi(category, sortBy, page) {
    const p = gaPageNum({ page: page });
    const pathFor = n => "/api/movies?category=" + encodeURIComponent(category) + "&sortBy=" + encodeURIComponent(sortBy) + "&limit=" + GA_PAGE_SIZE + "&page=" + n + "&locale=zh";
    if (category !== "latest" || sortBy !== "latest" || p === 1) return gaApi(pathFor(p));
    
    const pair = await gaApiMany([pathFor(p), pathFor(p - 1)], { fresh: true });
    const current = gaMovieRows(pair[0].movies), previous = gaMovieRows(pair[1].movies);
    const blocked = Object.create(null);
    previous.forEach(movie => { blocked[gaMovieId(movie.id)] = true; });
    const rows = current.filter(movie => !blocked[gaMovieId(movie.id)]);
    if (current.length && !rows.length) throw new Error("GetAV：此页与上一页完全重复，请稍后刷新");
    return Object.assign({}, pair[0], { movies: rows });
}

async function loadLatest(params) {
    const page = gaPageNum(params);
    const inj = gaInjected(params);
    let sort = String(params && params.sort || "releaseDate");
    if (sort === "updatedAt") sort = "contentUpdatedAt";
    if (inj) return gaListByFolder(inj.kind, inj.id, page, "latest");
    return gaList(await gaMoviesApi("latest", sort, page));
}

async function loadHot(params) {
    const page = gaPageNum(params);
    const inj = gaInjected(params);
    if (inj) return gaListByFolder(inj.kind, inj.id, page, "popular");
    const period = String(params && params.period || "weekly");
    return gaList(await gaMoviesApi("hot", period, page));
}

async function loadCategory(params) {
    const page = gaPageNum(params), inj = gaInjected(params);
    if (inj) return gaListByFolder(inj.kind, inj.id, page, "latest");
    const category = gaSafeText(params && params.category || "new-releases");
    const categories = ["latest", "new-releases", "uncensored", "censored", "subtitle", "4k", "fc2", "subtitle-refined", "subtitle-machine"];
    if (categories.indexOf(category) < 0) return [];
    const supplied = category === "uncensored" && params && params.uncensoredSort != null
        ? params.uncensoredSort : params && params.sortBy;
    const sortBy = gaSafeText(supplied || "latest");
    const sorts = ["latest", "popular", "rating", "favorites", "releaseDate", "duration"];
    if (category === "uncensored" && sortBy === "releaseDate") throw new Error("GetAV：全部无码暂不支持发行日期排序，请选择其他排序");
    if (sorts.indexOf(sortBy) < 0) throw new Error("GetAV：排序选项无效，请重新选择");
    if (category === "fc2") {
        const items = await gaListByFolder("code", "FC2PPV", page, sortBy === "releaseDate" ? "date" : sortBy);
        if (items.some(item => !/^FC2PPV-\d+$/i.test(item.id))) throw new Error("GetAV FC2 目录返回了非目标条目，已停止显示");
        return items;
    }
    if (category === "subtitle-refined" || category === "subtitle-machine") {
        const subtitleType = category === "subtitle-refined" ? "refined" : "machine";
        return gaList(await gaApi("/api/movies?category=subtitle&sortBy=" + encodeURIComponent(sortBy) + "&subtitleType=" + subtitleType + "&limit=" + GA_PAGE_SIZE + "&page=" + page + "&locale=zh"));
    }
    return gaList(await gaMoviesApi(category, sortBy, page));
}

async function loadGenre(params) {
    const page = gaPageNum(params), injected = gaInjected(params);
    const rawSort = String(params && params.sortBy || "latest");
    const sort = ["latest", "popular", "favorites", "date", "duration"].indexOf(rawSort) >= 0 ? rawSort : "latest";
    if (injected && injected.kind === "star") return gaListByFolder("star", injected.id, page, sort);
    const query = gaSafeText(params && params.genreQuery).trim();
    const id = query ? await gaResolveCatalog("genre", query) : gaCatalogId("genre", params && params.genreId || "1");
    if (!id) throw new Error("GetAV：类型 ID 格式无效");
    return gaListByFolder("genre", id, page, sort);
}


async function search(params) {
    const page = gaPageNum(params);
    const kw = gaSafeText(params && params.keyword).trim();
    if (!kw) return [];
    const data = await gaApi("/api/search?q=" + encodeURIComponent(kw) + "&page=" + page + "&limit=" + GA_PAGE_SIZE + "&locale=zh");
    return gaList(data);
}

async function gaFetchDetail(code, options) {
    const key = gaMovieId(code);
    if (!key) return null;
    const now = Date.now(), fresh = options === true || options && options.fresh;
    const hit = _detailCache[key];
    if (!fresh && hit && now >= hit.at && now - hit.at < 300000 && gaMovieId(hit.data && hit.data.id) === key) return hit.data;
    let data;
    try { data = await gaApi("/api/movies/" + encodeURIComponent(key), fresh ? { fresh: true } : null); }
    catch (error) { return null; }
    if (!data || typeof data !== "object" || Array.isArray(data) || gaMovieId(data.id) !== key) return null;
    _detailCache[key] = { at: Date.now(), data: data };
    const keys = Object.keys(_detailCache);
    if (keys.length > 100) {
        keys.sort((a, b) => _detailCache[a].at - _detailCache[b].at);
        keys.slice(0, keys.length - 100).forEach(k => { delete _detailCache[k]; });
    }
    return data;
}

function gaDescription(data, code, zhTitle) {
    
    let body = zhTitle || data.description || data.plot || data.titleEn || "";
    if (!body && data.title) {
        const t = String(data.title).trim();
        if (t && t.toUpperCase() !== String(code || "").toUpperCase()) body = t;
    }
    body = gaStripLeadingCode(gaSafeText(body), code);
    const lines = [];
    if (body) lines.push(String(body), "");
    lines.push("番号: " + String(data.id || code).toUpperCase());
    const dur = gaDurationText(data);
    if (dur) lines.push("时长: " + dur);
    if (data.date) lines.push("发行: " + String(data.date).slice(0, 10));
    return lines.join("\n");
}

function gaDetailItem(data, code, zhTitle, options) {
    if (!data || gaMovieId(data.id) !== gaMovieId(code)) return null;
    code = gaMovieId(code);
    const poster = gaDisplayImg(data.localImg, options) || gaDisplayImg(data.img, options);
    const item = {
        id: code, type: "url", mediaType: "movie",
        link: gaLinkFor(code, options && options.private ? zhTitle || data.title : "", options),
        title: code, posterPath: "", backdropPath: poster,
        releaseDate: gaSafeText(data.date).slice(0, 10),
        description: gaDescription(data, code, gaSafeText(zhTitle))
    };
    const dur = Number(data.videoLength || data.durationSeconds || 0);
    if (isFinite(dur) && dur > 0) { item.duration = dur; item.durationText = gaDurationText(data); }
    const genres = (Array.isArray(data.genres) ? data.genres : []).filter(g => g && gaCatalogId("genre", g.id) && gaSafeText(g.name));
    if (genres.length) item.genreItems = genres.map(g => ({ id: gaCatalogId("genre", g.id), title: gaSafeText(g.name) }));
    const stars = (Array.isArray(data.stars) ? data.stars : []).filter(s => s && gaCatalogId("star", s.id) && gaSafeText(s.name));
    if (stars.length) item.peoples = stars.map(s => ({
        id: gaCatalogId("star", s.id), title: gaSafeText(s.name),
        avatar: gaDisplayImg(s.localAvatar, options) || gaDisplayImg(s.avatar, options), role: Number(s.gender) === 1 ? "男优" : "女优"
    }));
    const stills = (Array.isArray(data.samples) ? data.samples : []).map(s => {
        if (typeof s === "string") return gaDisplayImg(s, options);
        return s && typeof s === "object" && !Array.isArray(s) ? gaDisplayImg(s.url, options) || gaDisplayImg(s.path, options) : "";
    }).filter(Boolean);
    if (stills.length) item.backdropPaths = Array.from(new Set(stills));
    const preview = gaDisplayImg(data.previewVideoUrl, options);
    if (preview) { item.previewUrl = preview; item.trailers = [{ coverUrl: poster, url: preview }]; }
    return item;
}

async function loadDetail(link) {
    const owned = gaOwnedLink(link);
    if (!owned) return null;
    const data = await gaFetchDetail(owned.code);
    if (!data) return null;
    const options = { private: owned.private };
    const item = gaDetailItem(data, owned.code, owned.title, options);
    if (!item) return null;
    await gaInvalidateLegacyCoverCaches();
    if (!owned.private) await gaFillPosters([item]);
    if (!item.posterPath) item.posterPath = item.backdropPath;
    if (!owned.private && (!item.backdropPaths || !item.backdropPaths.length)) {
        const stills = await gaDmmStills(owned.code);
        if (stills.length) item.backdropPaths = stills;
    }
    return item;
}

function gaLineName(type) {
    const t = String(type || "").toLowerCase();
    let res = "";
    if (t.indexOf("4k") >= 0) res = "4K";
    else {
        const m = t.match(/(\d{3,4})p/);
        if (m) res = m[1] + "P";
    }
    let tag = "";
    const pm = t.match(/^(uc|cn|sub|raw)_/);
    if (pm) tag = pm[1] === "cn" ? "中字" : pm[1].toUpperCase();
    return {
        name: res || String(type || "线路"),
        tag: tag
    };
}

function gaRank(label) {
    const l = String(label || "").toLowerCase();
    if (l.indexOf("4k") >= 0) return 2160;
    const m = l.match(/(\d{3,4})/);
    return m ? parseInt(m[1], 10) : 0;
}

function gaPlayLines(data) {
    if (!data || typeof data !== "object" || Array.isArray(data)) return [];
    const out = [], seen = Object.create(null);
    const push = (type, raw) => {
        const url = gaHlsUrl(raw);
        if (!url || seen[url]) return;
        seen[url] = true;
        const label = gaLineName(gaSafeText(type));
        out.push({ name: label.name, tag: label.tag, url: url, rank: gaRank(label.name) });
    };
    const priority = value => { const n = Number(value); return isFinite(n) ? n : 0; };
    const sources = (Array.isArray(data.videoSources) ? data.videoSources : []).filter(s => s && typeof s === "object" && !Array.isArray(s)).slice(0, 64);
    sources.sort((a, b) => priority(b.priority) - priority(a.priority));
    sources.forEach(s => push(s.type, s.url));
    if (!out.length) {
        push("4K", data.localM3u8Path4k);
        push("1080P", data.localM3u8Path);
        push("中文字幕版", data.localM3u8PathCn);
        push("无码", data.localM3u8PathUc);
    }
    out.sort((a, b) => b.rank - a.rank);
    const names = Object.create(null);
    out.forEach(line => {
        const base = line.name;
        names[base] = (names[base] || 0) + 1;
        if (names[base] > 1) line.name = base + " · " + (line.tag || "线路" + names[base]);
    });
    return out;
}

function gaCodeFromParams(params) {
    const p = params && typeof params === "object" ? params : {};
    if (p.link != null && p.link !== "") {
        const owned = gaOwnedLink(p.link);
        return owned ? owned.code : "";
    }
    if (typeof p.id === "string" && p.id.indexOf(GA_LINK) === 0) {
        const owned = gaOwnedLink(p.id);
        return owned ? owned.code : "";
    }
    return "";
}

const GA_BITRATE = {
    "4K": 12e3,
    "1440P": 6e3,
    "1080P": 5100,
    "720P": 1900,
    "480P": 900,
    "240P": 500
};

async function gaProbeLine(line) {
    const url = gaHttpUrl(line && line.url);
    if (!url) return false;
    try {
        const res = await Widget.http.get(url, {
            headers: { "User-Agent": GA_UA, Referer: "https://getav.me/", Accept: "*/*", Range: "bytes=0-63" },
            timeout: 8000
        });
        const status = gaStatus(res), body = res && res.data !== undefined ? res.data : res;
        const text = typeof body === "string" ? body : "";
        if (status === 403 || status === 404 || status === 410) return false;
        if (/^\s*<(?:!doctype|html)/i.test(text)) return false;
        if (/^\s*#EXTM3U/.test(text)) return true;
        return true;
    } catch (error) { return true; }
}

const _lineCache = Object.create(null);

async function gaProbedLines(data, code) {
    const lines = gaPlayLines(data);
    if (!lines.length) return [];
    const deadline = Date.now() + 15000;
    for (const line of lines) {
        if (Date.now() > deadline) break;
        const hit = _lineCache[line.url], now = Date.now();
        let ok;
        if (hit && now >= hit.at && now - hit.at < 30000) ok = hit.ok;
        else {
            ok = await gaProbeLine(line);
            _lineCache[line.url] = { at: Date.now(), ok: ok };
        }
        if (ok) return [line];
    }
    const keys = Object.keys(_lineCache);
    if (keys.length > 200) {
        keys.sort((a, b) => _lineCache[a].at - _lineCache[b].at);
        keys.slice(0, keys.length - 200).forEach(k => { delete _lineCache[k]; });
    }
    return lines;
}

function gaHlsUrl(raw) {
    const url = gaHttpUrl(raw);
    return url ? url.replace(/\/index\.txt(?=[?#]|$)/i, "/index.txt.m3u8") : "";
}

function gaLineDescription(code, name) {
    const base = String(name).split(" · ")[0].toUpperCase();
    const kbps = GA_BITRATE[base] || 0;
    const mbps = kbps ? "约 " + (kbps / 1e3).toFixed(1) + "Mbps" : "";
    return [ "番号 " + String(code).toUpperCase(), mbps ].filter(Boolean).join(" · ");
}

async function loadResource(params) {
    const code = gaCodeFromParams(params);
    if (!code) return [];
    const data = await gaFetchDetail(code);
    if (!data) return [];
    const lines = await gaProbedLines(data, code);
    
    const hi = lines.filter(l => (l.rank || 0) >= 1080);
    const keep = hi.length ? hi : lines.slice(0, 1);
    const result = keep.map(l => ({
        name: l.name,
        description: gaLineDescription(code, l.name),
        url: l.url,
        customHeaders: {
            "User-Agent": GA_UA,
            Referer: "https://getav.me/",
            Accept: "*/*"
        },
        playerType: "app"
    }));
    return result;
}




const GA_DISCOVER_STATE_KEY = "getav_discover_v2";
const GA_DISCOVER_MAX_SEEN = 200;
const GA_DISCOVER_TTL = 24 * 3600 * 1000;
const GA_DISCOVER_RUNTIME = { memory: null, queue: null, legacyRemoved: false };

function gaDiscoverId(movie) {
    return movie && typeof movie === "object" && !Array.isArray(movie) ? gaMovieId(movie.id) : "";
}

function gaDiscoverIds(rows, limit) {
    const seen = Object.create(null);
    const out = [];
    if (!Array.isArray(rows)) return out;
    rows.forEach(raw => {
        const id = gaDiscoverId({ id: raw });
        if (!id || seen[id]) return;
        seen[id] = true;
        out.push(id);
    });
    return out.slice(-limit);
}

function gaDiscoverNormalize(value, now) {
    if (!value || typeof value !== "object" || Array.isArray(value) || [1, 2].indexOf(value.v) < 0
        || typeof value.t !== "number" || !isFinite(value.t) || value.t <= 0 || value.t > now || now - value.t >= GA_DISCOVER_TTL
        || typeof value.serial !== "number" || !isFinite(value.serial) || value.serial < 0 || Math.floor(value.serial) !== value.serial
        || value.serial > 1000000000000 || value.v === 1 && value.serial >= 1000000000
        || !Array.isArray(value.seen) || !Array.isArray(value.last) || value.seen.length > GA_DISCOVER_MAX_SEEN || value.last.length > GA_PAGE_SIZE
        || value.seen.some(id => !gaMovieId(id)) || value.last.some(id => !gaMovieId(id))) return null;
    const emitted = value.v === 1 ? value.serial : value.emittedSerial;
    if (typeof emitted !== "number" || !isFinite(emitted) || emitted < 0 || emitted > value.serial || Math.floor(emitted) !== emitted) return null;
    const seen = gaDiscoverIds(value.seen, GA_DISCOVER_MAX_SEEN), last = gaDiscoverIds(value.last, GA_PAGE_SIZE);
    if (last.some(id => seen.indexOf(id) < 0)) return null;
    return { v: 2, t: value.t, serial: value.serial, emittedSerial: emitted, seen: seen, last: last };
}

function gaDiscoverDisk(key, now) {
    try {
        const raw = Widget.storage.get(key);
        if (typeof raw === "string" && raw.length > 50000) return null;
        return gaDiscoverNormalize(typeof raw === "string" ? JSON.parse(raw) : raw, now);
    } catch (error) { return null; }
}

function gaDiscoverStateRead() {
    const now = Date.now();
    const memory = gaDiscoverNormalize(GA_DISCOVER_RUNTIME.memory, now);
    const disk = gaDiscoverDisk(GA_DISCOVER_STATE_KEY, now);
    const legacy = !memory && !disk ? gaDiscoverDisk("getav_discover_v1", now) : null;
    if (memory && disk) {
        const latest = memory.emittedSerial > disk.emittedSerial || memory.emittedSerial === disk.emittedSerial && memory.t >= disk.t ? memory : disk;
        const older = latest === memory ? disk : memory;
        const last = latest.last.slice();
        const union = gaDiscoverIds(older.seen.concat(latest.seen), GA_DISCOVER_MAX_SEEN);
        return { v: 2, t: latest.t, serial: Math.max(memory.serial, disk.serial), emittedSerial: latest.emittedSerial,
            seen: union.filter(id => last.indexOf(id) < 0).concat(last).slice(-GA_DISCOVER_MAX_SEEN), last: last };
    }
    const data = memory || disk || legacy;
    return data ? { v: 2, t: data.t, serial: data.serial, emittedSerial: data.emittedSerial, seen: data.seen.slice(), last: data.last.slice() }
        : { v: 2, t: now, serial: 0, emittedSerial: 0, seen: [], last: [] };
}

function gaDiscoverPersist(state) {
    const saved = { v: 2, t: state.t, serial: state.serial, emittedSerial: state.emittedSerial, seen: state.seen.slice(), last: state.last.slice() };
    GA_DISCOVER_RUNTIME.memory = saved;
    try {
        Widget.storage.set(GA_DISCOVER_STATE_KEY, JSON.stringify(saved));
        if (!GA_DISCOVER_RUNTIME.legacyRemoved) {
            if (typeof Widget.storage.remove === "function") Widget.storage.remove("getav_discover_v1");
            else Widget.storage.set("getav_discover_v1", "");
            GA_DISCOVER_RUNTIME.legacyRemoved = true;
        }
    } catch (error) {}
}

function gaDiscoverStateSave(state, items) {
    if (!Array.isArray(items)) throw new Error("GetAV：发现结果格式异常");
    const last = gaDiscoverIds(items.map(item => item && item.id), GA_PAGE_SIZE);
    if (!last.length || last.length !== items.length) throw new Error("GetAV：发现结果身份无效，未记录为已展示");
    const recent = state.seen.filter(id => last.indexOf(id) < 0).concat(last);
    state.t = Date.now();
    state.seen = recent.slice(-GA_DISCOVER_MAX_SEEN);
    state.last = last;
    state.emittedSerial = state.serial;
    gaDiscoverPersist(state);
}

function gaDiscoverShuffle(rows) {
    const shuffled = rows.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const row = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = row;
    }
    return shuffled;
}

function gaDiscoverSelect(rows, state) {
    const used = Object.create(null);
    const unseen = [];
    const older = [];
    rows.forEach(movie => {
        const id = gaDiscoverId(movie);
        if (!id || used[id] || state.last.indexOf(id) >= 0) return;
        used[id] = true;
        (state.seen.indexOf(id) < 0 ? unseen : older).push(movie);
    });
    return gaDiscoverShuffle(unseen).concat(gaDiscoverShuffle(older)).slice(0, GA_PAGE_SIZE);
}

async function gaDiscoverBatch() {
    const state = gaDiscoverStateRead();
    const candidates = [];
    let selected = [];
    
    for (let attempt = 0; attempt < 3; attempt++) {
        state.serial += 1;
        gaDiscoverPersist(state);
        const candidateIds = candidates.map(movie => gaDiscoverId(movie));
        const older = state.seen.filter(id => state.last.indexOf(id) < 0 && candidateIds.indexOf(id) < 0);
        const excluded = gaDiscoverIds(older.concat(state.last, candidateIds), GA_DISCOVER_MAX_SEEN + GA_PAGE_SIZE * 3);
        const prefix = "/api/recommendations/trending?limit=" + GA_PAGE_SIZE + "&locale=zh"
            + "&bucket=" + (state.serial % 1000000000) + "&timeBucket=" + Math.floor(Date.now() / 21600000);
        const hostLength = Math.max.apply(null, GA_HOSTS.map(host => host.length));
        let exclude = encodeURIComponent(excluded.join(","));
        while (hostLength + prefix.length + (exclude ? 9 + exclude.length : 0) > 4096 && excluded.length) {
            excluded.shift();
            exclude = encodeURIComponent(excluded.join(","));
        }
        const path = prefix + (exclude ? "&exclude=" + exclude : "");
        let data;
        try { data = await gaApi(path); } catch (e) {
            if (!selected.length) throw new Error("GetAV 随机发现请求失败，请稍后刷新");
            break;
        }
        if (!data || !Array.isArray(data.movies)) continue;
        candidates.push.apply(candidates, data.movies.slice(0, GA_PAGE_SIZE * 3));
        selected = gaDiscoverSelect(candidates, state);
        if (selected.length === GA_PAGE_SIZE
            && selected.every(movie => state.seen.indexOf(gaDiscoverId(movie)) < 0)) break;
    }
    if (!selected.length) {
        throw new Error("GetAV 随机发现暂时没有新影片，请稍后刷新；不会把上一批重排充数");
    }
    const items = await gaList({ movies: selected });
    gaDiscoverStateSave(state, items);
    return items;
}

function gaDiscoverLoad() {
    const previous = GA_DISCOVER_RUNTIME.queue || Promise.resolve();
    const task = previous.then(gaDiscoverBatch, gaDiscoverBatch);
    GA_DISCOVER_RUNTIME.queue = task.then(() => undefined, () => undefined);
    return task;
}


async function loadHome(params) {
    try {
        const page = gaPageNum(params);
        const injected = gaInjected(params);
        if (injected) return gaListByFolder(injected.kind, injected.id, page, "latest");
        const feed = String(params && params.feed || "updated");
        const skip = (page - 1) * GA_PAGE_SIZE;
        let path = "";
        if (feed === "updated") {
            path = "/api/movies?category=latest&sortBy=contentUpdatedAt&spread=1&limit=" + GA_PAGE_SIZE + "&page=1&skip=" + skip + "&locale=zh";
        } else if (feed === "arrivals") {
            path = "/api/movies/new-releases?feed=arrivals&limit=" + GA_PAGE_SIZE + "&skip=" + skip + "&locale=zh";
        } else if (feed === "watching") {
            if (page > 1) return [];
            path = "/api/recommendations/watching-now?limit=" + GA_PAGE_SIZE + "&locale=zh&source=home-rail-v3";
        } else if (feed === "discover") {
            if (page > 1) return [];
            return gaDiscoverLoad();
        } else {
            return [];
        }
        return gaList(await gaApi(path));
    } catch (error) {
        console.error("[getav.loadHome] " + (error && error.message || "请求失败"));
        throw error;
    }
}

function gaCatalogId(kind, raw) {
    if (typeof raw !== "string" && typeof raw !== "number") return "";
    if (typeof raw === "number" && (!isFinite(raw) || raw <= 0 || Math.floor(raw) !== raw)) return "";
    const id = String(raw).trim();
    if (kind === "genre" || kind === "star") {
        const normalized = id.replace(/^0+(?=\d)/, "");
        return /^[1-9]\d{0,15}$/.test(normalized) ? normalized : "";
    }
    if (kind === "code") return /^[A-Z0-9][A-Z0-9_-]{0,40}$/i.test(id) ? id.toUpperCase() : "";
    if (["studio", "publisher", "series", "director"].indexOf(kind) >= 0) return /^[a-f0-9]{16}$/i.test(id) ? id.toLowerCase() : "";
    return "";
}

function gaCatalogName(raw) {
    return gaSafeText(raw).trim().replace(/\s+/g, " ").toLowerCase();
}

async function gaResolveCatalog(kind, query) {
    if (!Object.prototype.hasOwnProperty.call(GA_FOLDER_API, kind)) return "";
    query = gaSafeText(query).trim();
    if (!query || query.length > 2000) throw new Error("GetAV：目录检索名称无效");
    const direct = gaCatalogId(kind, query);
    if (direct) return direct;
    const plural = GA_FOLDER_API[kind];
    const data = await gaApi("/api/" + plural + "?page=1&limit=100&sort=popular&search=" + encodeURIComponent(query) + "&locale=zh");
    if (!data || !Array.isArray(data[plural])) throw new Error("GetAV：目录检索响应格式异常");
    const rows = data[plural];
    const wanted = gaCatalogName(query);
    const ids = [];
    rows.forEach(row => {
        if (!row) return;
        const matches = [row.name, row.originalName, row.id].some(name => name != null && gaCatalogName(name) === wanted);
        const id = gaCatalogId(kind, row.id);
        if (matches && id && ids.indexOf(id) < 0) ids.push(id);
    });
    if (ids.length === 1) return ids[0];
    if (ids.length > 1) throw new Error("GetAV：目录名称有歧义，请改填目录ID（" + ids.slice(0, 5).join(" / ") + "）");
    throw new Error("GetAV：未找到完整名称匹配的目录，请填写完整名称或目录ID");
}

async function loadCatalog(params) {
    try {
        const kind = String(params && params.folderKind || "");
        if (["star", "studio", "publisher", "code", "series", "director"].indexOf(kind) < 0) return [];
        const page = gaPageNum(params);
        const injected = gaInjected(params);
        if (injected) return gaListByFolder(injected.kind, injected.id, page, "latest");
        const query = gaSafeText(params && params.catalogQuery).trim();
        const id = query ? await gaResolveCatalog(kind, query) : gaCatalogId(kind, params && params.catalogId);
        if (!id) throw new Error("GetAV：请选择目录，或填写完整名称/目录ID");
        const rawSort = String(params && params.sortBy || "latest");
        const sorts = ["latest", "popular", "rating", "favorites", "date", "duration"];
        const sort = sorts.indexOf(rawSort) >= 0 ? rawSort : "latest";
        return gaListByFolder(kind, id, page, sort);
    } catch (error) {
        console.error("[getav.loadCatalog] " + (error && error.message || "请求失败"));
        throw error;
    }
}


const GA_SESSION_BIND_HOSTS = ["https://getav.me", "https://getav.co", "https://getav.live", "https://getav.top", "https://getav.net"];

function gaPersonalError(message) {
    const error = new Error("GetAV账号：" + message);
    error.gaSafeAccountError = true;
    return error;
}

function gaSessionSetting(params, name) {
    if (params && params[name] != null) return String(params[name]);
    const field = (WidgetMetadata.globalParams || []).find(p => p.name === name);
    return String(field && field.value != null ? field.value : "");
}

function gaSessionConfig(params) {
    const host = gaSessionSetting(params, "sessionHost").trim().replace(/\/+$/, "").toLowerCase();
    if (GA_SESSION_BIND_HOSTS.indexOf(host) < 0) throw gaPersonalError("登录域名不受支持；不会把凭证发送到其他域名");
    const input = gaSessionSetting(params, "sessionCookie");
    if (input.length > 8192 || /[\r\n\x00]/.test(input)) throw gaPersonalError("Cookie 格式无效，请重新复制请求 Cookie");
    const raw = input.trim().replace(/^Cookie\s*:\s*/i, "");
    if (!raw) throw gaPersonalError("请在全局参数填写含 auth-token 的登录 Cookie");
    const parts = {};
    raw.split(";").forEach(part => {
        const at = part.indexOf("=");
        if (at < 1) return;
        const name = part.slice(0, at).trim();
        if (name !== "auth-token" && name !== "cf_clearance") return;
        const value = part.slice(at + 1).trim();
        if (!value || /[\x00-\x20\x7f\";,]/.test(value)) throw gaPersonalError("登录 Cookie 的值格式无效");
        if (parts[name] && parts[name] !== value) throw gaPersonalError("Cookie 中存在冲突的同名凭证，请重新复制");
        parts[name] = value;
    });
    if (!parts["auth-token"]) throw gaPersonalError("Cookie 中缺少 auth-token 登录会话");
    let cookie = "auth-token=" + parts["auth-token"];
    if (parts.cf_clearance) cookie += "; cf_clearance=" + parts.cf_clearance;
    return { host: host, cookie: cookie };
}

function gaSessionPathAllowed(path) {
    if (typeof path !== "string" || path.length > 4096 || /[\r\n#\\]/.test(path) || path.indexOf("://") >= 0) return false;
    if (path === "/api/auth/me" || path === "/api/user/recommendation-preferences") return true;
    const parts = path.split("?");
    if (parts.length !== 2 || !parts[1]) return false;
    const route = parts[0], query = Object.create(null);
    try {
        for (const pair of parts[1].split("&")) {
            const at = pair.indexOf("=");
            if (at < 1) return false;
            const key = decodeURIComponent(pair.slice(0, at).replace(/\+/g, " "));
            const value = decodeURIComponent(pair.slice(at + 1).replace(/\+/g, " "));
            if (Object.prototype.hasOwnProperty.call(query, key)) return false;
            query[key] = value;
        }
    } catch (error) { return false; }
    const personal = route === "/api/recommendations/realtime";
    let required, allowed;
    if (route === "/api/users/favorites") required = allowed = ["userId", "page", "limit"];
    else if (route === "/api/likes/user") required = allowed = ["page", "limit", "sortBy"];
    else if (personal) { required = ["limit", "refresh", "compact", "locale"]; allowed = required.concat("exclude"); }
    else return false;
    if (required.some(key => !Object.prototype.hasOwnProperty.call(query, key)) || Object.keys(query).some(key => allowed.indexOf(key) < 0)) return false;
    if (query.userId != null && !/^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/.test(query.userId)) return false;
    if (query.page != null && (!/^\d+$/.test(query.page) || !isFinite(Number(query.page)) || Number(query.page) < 1)) return false;
    if (query.limit != null && query.limit !== String(personal ? 10 : GA_PAGE_SIZE)) return false;
    if (query.sortBy != null && query.sortBy !== "latest") return false;
    if (personal) {
        if (["false", "true"].indexOf(query.refresh) < 0 || query.compact !== "true" || query.locale !== "zh") return false;
        if (query.exclude != null) {
            const ids = query.exclude.split(","), seen = Object.create(null);
            if (!ids.length || ids.length > 40) return false;
            for (const id of ids) {
                if (!gaMovieId(id) || gaMovieId(id) !== id || seen[id]) return false;
                seen[id] = true;
            }
        }
    }
    return query.locale == null || query.locale === "zh";
}

function gaSessionStatusError(status) {
    if (status === 401) return gaPersonalError("登录会话已失效，请重新登录并更新 Cookie");
    if (status === 403) return gaPersonalError("账号权限不足或网页验证拦截，请先到登录网站检查");
    if (status === 429 || status === 449) return gaPersonalError("网站要求验证或请求过于频繁，请到网页处理后再试");
    if (status >= 300 && status < 400) return gaPersonalError("账号接口发生重定向；为保护 Cookie 已停止跟随");
    return gaPersonalError("账号接口返回 HTTP " + status + "，未尝试其他登录域名");
}

async function gaSessionGet(config, path) {
    if (!config || GA_SESSION_BIND_HOSTS.indexOf(config.host) < 0 || typeof config.cookie !== "string" || !/^auth-token=/.test(config.cookie) || /[\r\n\x00]/.test(config.cookie) || !gaSessionPathAllowed(path)) {
        throw gaPersonalError("账号请求目标不受支持，已停止发送凭证");
    }
    const headers = gaHeaders(config.host);
    headers.Cookie = config.cookie;
    headers["Cache-Control"] = "no-store";
    headers.Pragma = "no-cache";
    let response;
    try {
        response = await Widget.http.get(config.host + path, { headers: headers, allow_redirects: false, timeout: GA_HTTP_TIMEOUT });
    } catch (error) {
        const status = Number(error && (error.status || error.statusCode || error.response && error.response.status) || 0);
        if (status >= 300) throw gaSessionStatusError(status);
        throw gaPersonalError("账号网络请求失败；未回退到匿名镜像，也未记录凭证或原始错误");
    }
    const status = Number(response && (response.status || response.statusCode) || 0);
    if (status >= 300) throw gaSessionStatusError(status);
    let body = response && response.data !== undefined ? response.data : response;
    if (typeof body === "string") {
        try { body = JSON.parse(body); }
        catch (error) { throw gaPersonalError("接口返回非 JSON，可能需要先通过网页登录验证"); }
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) throw gaPersonalError("账号接口响应格式异常");
    if (body.success === false) throw gaPersonalError("网站未成功返回个人数据，请检查账号权限或登录状态");
    return body;
}

async function gaSessionMe(config) {
    const body = await gaSessionGet(config, "/api/auth/me");
    const raw = body && body.user && body.user.id;
    const id = typeof raw === "string" || typeof raw === "number" && isFinite(raw) && raw > 0 ? String(raw).trim() : "";
    if (body.success !== true || !/^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/.test(id)) throw gaPersonalError("登录身份校验失败，不会按手填 userId 读取数据");
    return id;
}

function gaPersonalMovieRows(rows, wrapped, owner) {
    if (!Array.isArray(rows)) throw gaPersonalError("个人清单字段缺失或格式异常");
    const result = [], seen = Object.create(null);
    rows.forEach(row => {
        if (!row || typeof row !== "object" || Array.isArray(row)) return;
        if (wrapped && row.userId != null && String(row.userId) !== owner) throw gaPersonalError("清单返回了非当前账号的数据，已停止显示");
        const movie = wrapped ? row.movie : row, id = gaMovieId(movie && movie.id);
        if (!movie || typeof movie !== "object" || Array.isArray(movie) || !id) return;
        if (wrapped && row.movieId != null && gaMovieId(row.movieId) !== id) throw gaPersonalError("清单条目与影片 ID 不一致，已停止显示");
        if (!seen[id]) { result.push(movie); seen[id] = true; }
    });
    if (rows.length && !result.length) throw gaPersonalError("个人清单非空但没有合法影片，不能视为空收藏或空历史");
    return result;
}

async function gaPersonalized(config, owner) {
    
    
    const preference = await gaSessionGet(config, "/api/user/recommendation-preferences");
    if (preference.success !== true || !Array.isArray(preference.ids) || preference.ids.length > 10000) {
        throw gaPersonalError("推荐偏好响应异常，未忽略账号偏好或回退到匿名推荐");
    }
    const blocked = Object.create(null), exclude = [];
    preference.ids.forEach(raw => {
        const id = gaMovieId(raw);
        if (!id) throw gaPersonalError("推荐偏好包含无效影片 ID，已停止读取");
        if (!blocked[id]) { blocked[id] = true; if (exclude.length < 40) exclude.push(id); }
    });
    const basePath = "/api/recommendations/realtime?limit=10&refresh=true&compact=true&locale=zh";
    const maxPath = 4096 - config.host.length;
    let path = basePath + (exclude.length ? "&exclude=" + encodeURIComponent(exclude.join(",")) : "");
    while (path.length > maxPath && exclude.length) {
        exclude.pop();
        path = basePath + (exclude.length ? "&exclude=" + encodeURIComponent(exclude.join(",")) : "");
    }
    const body = await gaSessionGet(config, path);
    const movies = gaPersonalMovieRows(body.movies, false, owner);
    
    const current = await gaSessionMe(config);
    if (current !== owner) throw gaPersonalError("读取推荐期间登录身份发生变化，已丢弃结果");
    return gaList({ movies: movies.filter(movie => !blocked[gaMovieId(movie.id)]) }, { private: true });
}

async function loadPersonal(params) {
    try {
        const feed = String(params && params.personalFeed || "favorites");
        if (["favorites", "likes", "personalized"].indexOf(feed) < 0) return [];
        const page = gaPageNum(params);
        const injected = gaInjected(params);
        if (injected) return gaListByFolder(injected.kind, injected.id, page, "latest", { private: true });
        const config = gaSessionConfig(params);
        
        const owner = await gaSessionMe(config);
        
        if (feed === "personalized") return await gaPersonalized(config, owner);
        const wrapped = feed === "favorites";
        const path = wrapped
            ? "/api/users/favorites?userId=" + encodeURIComponent(owner) + "&page=" + page + "&limit=" + GA_PAGE_SIZE
            : "/api/likes/user?page=" + page + "&limit=" + GA_PAGE_SIZE + "&sortBy=latest";
        const body = await gaSessionGet(config, path);
        const rows = wrapped ? body.favorites : body.data && body.data.items;
        return await gaList({ movies: gaPersonalMovieRows(rows, wrapped, owner) }, { private: true });
    } catch (error) {
        const message = error && error.gaSafeAccountError ? error.message : "GetAV账号：载入失败，请检查网络或重新验证登录；原始错误未记录";
        console.error("[getav.personal] " + message);
        throw new Error(message);
    }
}
