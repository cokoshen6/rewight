# rewight

rex 模块纯净版仓库。所有在用模块的去注释重制版，以后维护和修改都在这里进行。

## 模块一览

| 文件 | 模块 ID | 版本 | 说明 |
|---|---|---|---|
| `modules/getav.js` | `rex.getav` | 1.1.17 | GetAV：多清晰度直链（4K/1440P/1080P），DMM 竖封面管线 |
| `modules/javranking.js` | `rex.javranking` | 1.3.5 | JavRanking 榜单：17 个榜单 + 神作总榜 + 预告片 |
| `modules/kanav.js` | `rex.kanav` | 1.0.1 | KanAV：8 分类 + m3u8 直链 |
| `modules/blackedjav.js` | `rex.blackedjav` | 3.2.1 | BlackedJAV：纯元数据，横版卡片 |
| `modules/javmit.js` | `rex.javmit` | 1.6.2 | javmit：1080p 优先，无 1080p 回退最高档 |
| `modules/missav-lite.js` | `rex.missav-lite` | 6.0.2 | MissAV 精简版：横版卡片，标题只留番号 |
| `modules/rule34video.js` | `rex.rule34video` | 2.3.3 | rule34video：横版卡片 |
| `modules/daxiang.js` | `rex.daxiang` | 1.0.1 | 大象视频：19 分类 + m3u8 |

## 规范（已定版，不再讨论）

- JAV 模块标题只显示番号，长标题放 `description`
- 分类列表横版卡片（`backdropPath`）；GetAV 列表是竖版（`posterPath` 走 DMM 管线）
- 长按倍速不降档：`loadResource` 只给最高画质档
- 模块图标统一用 `iconurl` 字段（`icon` 字段 App 不认）
- 纯元数据模块：manifest 列表模块省略 `type`，条目保留 `type: "video"` / `"url"`
- stream 模块：列表模块显式 `type: "video"` + `loadResource`（`type: "stream"`）

## 已丢弃（不在此仓库）

WOW、bilibili、51短剧、红果短剧、xeden、影探4K、4KPorn、色花堂、Pornhub 合集排查 —— 除非用户主动重开，不再提起。
