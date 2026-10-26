var WidgetMetadata = {"id":"juhe.baidu","title":"聚合百度版","version":"1.1.7","requiredVersion":"0.0.1","description":"纯百度聚合（CatPaw 引擎版）：并发搜索3个源（花卷/虎斑/多多），转存后返回百度网盘播放源；百度 Cookie 只用本模块设置；旧版收藏链接不兼容。","author":"夏恩","site":"https://github.com/InchStudio/ForwardWidgets","detailCacheDuration":3600,"credentialSource":"local","globalParams":[{"name":"baiduCookie","title":"百度 Cookie","type":"input","value":""},{"name":"resourceCategory","title":"清晰度标签","type":"enumeration","value":"8k","enumOptions":[{"title":"8K","value":"8k"},{"title":"4K","value":"4k"},{"title":"1080P","value":"1080p"},{"title":"其他","value":"other"}]},{"name":"host_huajuan","title":"花卷站点地址","type":"input","value":"https://www.hjzhencai.top"},{"name":"host_huban","title":"虎斑站点地址","type":"input","value":"http://43.248.128.118:16969"},{"name":"host_duoduo","title":"多多站点地址","type":"input","value":"https://tv.214521.xyz"}],"modules":[{"id":"loadResource","title":"聚合百度[盘]","description":"按当前影片详情并发搜索各源并返回百度网盘播放源","functionName":"loadResource","type":"stream","cacheDuration":0,"params":[]},{"id":"clearRexCatalogCache","title":"刷新网盘目录缓存","functionName":"clearRexCatalogCache","cacheDuration":0,"params":[]}],"search":{"title":"搜索聚合百度","functionName":"search","params":[{"name":"keyword","title":"关键词","type":"input","value":""},{"name":"page","title":"页码","type":"page","value":"1"}]}};
var DriveEngine = (function(){var WidgetMetadata;
WidgetMetadata = {"id":"juhe.baidu.rex","title":"聚合百度版","version":"2.2.4","requiredVersion":"0.0.1","description":"全盘影视搜索，支持夸克、百度、UC、115、123、移动、天翼、迅雷网盘及外挂字幕。","author":"balge","site":"https://quanpan.xyz","detailCacheDuration":1800,"globalParams":[{"name":"site","title":"站点地址（留空使用全盘搜索）","type":"input","value":"https://quanpan.xyz"},{"name":"quarkCookie","title":"垮 Cookie","type":"input"},{"name":"baiduCookie","title":"佰 Cookie","type":"input"},{"name":"cookie115","title":"伍 Cookie","type":"input"},{"name":"xunleiAuth","title":"迅雷访问令牌","type":"input","value":"","placeholders":[{"title":"填写 access_token 或 Authorization；自动识别 Web/App；迅雷三项全部留空时使用通用配置","value":""}]},{"name":"xunleiRefreshToken","title":"迅雷刷新令牌","type":"input","value":"","placeholders":[{"title":"填写 refresh_token，用于自动续期；可留空；迅雷三项全部留空时使用通用配置","value":""}]},{"name":"xunleiDeviceId","title":"迅雷设备号","type":"input","value":"","placeholders":[{"title":"填写 device_id；留空优先从令牌读取，否则使用默认设备号；迅雷三项全部留空时使用通用配置","value":""}]},{"name":"guangyaAuth","title":"光鸭访问令牌","type":"input","value":"","placeholders":[{"title":"填写 accessToken；光鸭三项全部留空时使用通用配置","value":""}]},{"name":"guangyaRefreshToken","title":"光鸭刷新令牌","type":"input","value":"","placeholders":[{"title":"填写 refreshToken，用于自动续期；可留空；光鸭三项全部留空时使用通用配置","value":""}]},{"name":"guangyaDeviceId","title":"光鸭设备号","type":"input","value":"","placeholders":[{"title":"填写 deviceId；留空使用默认设备号；光鸭三项全部留空时使用通用配置","value":""}]},{"name":"multiSource","title":"聚合搜索","type":"enumeration","value":"enabled","enumOptions":[{"title":"启用","value":"enabled"},{"title":"禁用","value":"disabled"}]}],"modules":[{"id":"searchResources","title":"搜索网盘资源","functionName":"search","cacheDuration":0,"params":[{"name":"keyword","title":"关键词","type":"input"}]},{"id":"refreshCatalog","title":"刷新目录缓存","functionName":"clearRexCatalogCache","cacheDuration":0,"params":[]},{"id":"loadResource","title":"加载资源","functionName":"loadResource","type":"stream","cacheDuration":0,"params":[]}],"search":{"title":"全盘搜索","functionName":"search","params":[{"name":"keyword","title":"关键词","type":"input"},{"name":"page","title":"页码","type":"page"}]}};

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const CACHE_FOLDER = "ftv-cache";
const STORAGE_COOKIE_KEY = "juhe.baidu.quark.cookie";
const STORAGE_SITE_KEY = "juhe.baidu.quark.site";
const STORAGE_PRELOAD_KEY = "juhe.baidu.quark.preloadCount";
let CURRENT_COOKIE = "";

function getSite(params) {
  const incoming=params&&typeof params.site==="string"?params.site.trim():"";
  if(incoming){const site=qpOrigin(incoming);safeStorageSet(STORAGE_SITE_KEY,site);return site;}
  return qpOrigin(safeStorageGet(STORAGE_SITE_KEY)||"https://quanpan.xyz");
}

function safeStorageGet(key) {
  try {
    return Widget && Widget.storage && Widget.storage.get ? Widget.storage.get(key) : "";
  } catch (e) {
    
    return "";
  }
}

function safeStorageSet(key, value) {
  try {
    if (Widget && Widget.storage && Widget.storage.set) Widget.storage.set(key, value);
  } catch (e) {
    
  }
}

function normalizeCookie(cookie) {
  return String(cookie || "").trim();
}

function ensureCookie(cookie) {
  const incoming = normalizeCookie(cookie);
  if (incoming) {
    CURRENT_COOKIE = incoming;
    safeStorageSet(STORAGE_COOKIE_KEY, incoming);
    return CURRENT_COOKIE;
  }
  if (CURRENT_COOKIE) return CURRENT_COOKIE;
  CURRENT_COOKIE = normalizeCookie(safeStorageGet(STORAGE_COOKIE_KEY));
  return CURRENT_COOKIE;
}

function getPreloadCount(params) {
  const incoming = params && params.preloadCount !== undefined ? Number(params.preloadCount) : NaN;
  if (!Number.isNaN(incoming)) {
    const n = Math.max(0, Math.floor(incoming));
    safeStorageSet(STORAGE_PRELOAD_KEY, String(n));
    return n;
  }
  const saved = Number(safeStorageGet(STORAGE_PRELOAD_KEY));
  if (!Number.isNaN(saved)) return Math.max(0, Math.floor(saved));
  return 3;
}

function bindForwardParams(params = {}) {
  getSite(params);
  getPreloadCount(params);
  if(Object.prototype.hasOwnProperty.call(params,"cookie115")) safeStorageSet("juhe.baidu.115.cookie",normalizeCookie(params.cookie115));
  if (params.multiSource === "enabled" || params.multiSource === "disabled") {
    safeStorageSet("juhe.baidu.multiSource", params.multiSource);
  }
  const ck = params.quarkCookie || params.cookie || params.quarkck || "";
  if(Object.prototype.hasOwnProperty.call(params,"quarkCookie")) {
    CURRENT_COOKIE=normalizeCookie(params.quarkCookie);
    safeStorageSet(STORAGE_COOKIE_KEY,CURRENT_COOKIE);
  } else ensureCookie(ck);
  if (Object.prototype.hasOwnProperty.call(params, "baiduCookie")) {
    safeStorageSet("juhe.baidu.baidu.cookie", normalizeCookie(params.baiduCookie));
  }
}

function toQuery(obj) {
  return Object.keys(obj || {}).map(k => k + "=" + encodeURIComponent(obj[k])).join("&");
}

function absUrl(url, site) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("//")) return "https:" + url;
  if (url.startsWith("/")) return site + url;
  return site + "/" + url;
}

function pickText($, el, selector) {
  return $(el).find(selector).text().trim();
}

function idFromHref(href) {
  const s = String(href || "");
  const m = s.match(/\/detail\/id\/(\d+)\.html/) || s.match(/\/vod\/detail\/id\/(\d+)\.html/) || s.match(/id\/(\d+)/);
  return m ? m[1] : s;
}

function encodeLink(obj) {
  return "juhebai:" + encodeURIComponent(JSON.stringify(obj));
}

function decodeLink(link) {
  const raw = String(link || "");
  if (!raw.startsWith("juhebai:")) return null;
  try { return JSON.parse(decodeURIComponent(raw.slice(8))); } catch (_) { return null; }
}

async function httpTextFresh(url, options) {
  rexAssertWithinUsagePeriod();
  const res = await cpHttpGet(url, Object.assign({ timeout: 8000, headers: { "User-Agent": UA, Referer: getSite() + "/" } }, options || {}));
  return typeof res.data === "string" ? res.data : JSON.stringify(res.data || "");
}

async function httpJsonCore(method, url, data, headers, readToken) {
  const baseHeaders = headers || quarkHeaders();
  let res;
  if (method === "POST") {
    res = await cpHttpPost(url, JSON.stringify(data || {}), {
      timeout: 8000,
      headers: Object.assign({}, baseHeaders, { "Content-Type": "application/json" })
    });
  } else {
    res = await cpHttpGet(url, Object.assign({headers:baseHeaders,timeout:8000},readToken?{cpB6Token:readToken}:{}));
    if(readToken){const status=Number(res.status||res.statusCode||0);if(status===401||status===429){const error=cpError(status===401?'AUTH_FAILED':'RATE_LIMITED');error.status=status;throw error;}}
  }
  syncQuarkPlaybackCookie(url,res);
  const json=typeof res.data === "string" ? JSON.parse(res.data) : res.data;
  const httpStatus=Number(res.status || res.statusCode || 0);
  qpAssertShareResponse(url,json,httpStatus);
  if(httpStatus>=400) {
    const error=new Error("网盘接口 HTTP 错误");
    error.status=httpStatus;
    error.code=json && (json.errno !== undefined ? json.errno : json.error_code !== undefined ? json.error_code : json.code);
    throw error;
  }
  
  return json;
}

function quarkHeaders(cookie) {
  const ck = ensureCookie(cookie);
  return {
    "User-Agent": UA,
    "Cookie": ck,
    "Referer": "https://pan.quark.cn/"
  };
}

function playHeaders() {
  return { "User-Agent": UA, "Cookie": CURRENT_COOKIE };
}

// Explicit drive expiry is terminal; password/auth ambiguity remains retryable.
function qpAssertShareResponse(url,json,status){
 if(!/^https:\/\/(?:drive(?:-[a-z]+)?\.quark\.cn|pc-api\.uc\.cn|pan\.baidu\.com|(?:webapi|proapi)\.115\.com|(?:www\.)?123pan\.(?:com|cn))\//i.test(String(url)))return;
 if(!/\/(?:share\/|file\/download|app\/share\/)/.test(url)||!json||typeof json!=='object')return;
 const failed=Number(status)>=400||json.state===false||json.success===false||['errno','error_code','code'].some(k=>json[k]!=null&&String(json[k])!=='0'&&String(json[k])!=='200')||Number(json.status)>=400;
 const message=[json.message,json.msg,json.errmsg,json.error_msg,json.error].filter(v=>typeof v==='string').join(' ');
 if(!failed||/提取码|提取碼|密码|密碼|验证码|驗證碼|password|passcode|captcha|token|登录|登陆|login|或|or /i.test(message))return;
 if(/(?:分享|共享|链接|連結)[^。\n]{0,20}(?:过期|失效|取消|删除|不存在)|share(?:d)?(?: link)?[^.\n]{0,30}(?:expired|cancelled|canceled|deleted|not found)/i.test(message))throw cpError('SHARE_EXPIRED');
}
// Protocol source: quanpan.xyz/api.min.js (2026-10-20). Search tokens never leave this origin.
const QP_PROVIDERS=["quark","baidu","uc","115","123","yidong","tianyi","xunlei"];
const qpTokens=new Map();
function qpError(status,kind){
 const code=status===403?"QUANPAN_ACCESS_DENIED":status===429?"QUANPAN_RATE_LIMITED":"QUANPAN_UPSTREAM_ERROR";
 const error=new Error("全盘搜索"+(kind||"接口")+(status?" HTTP "+status:"返回数据异常"));
 error.code=code;error.status=status||undefined;return error;
}
function qpCheck(signal){cpCheck(cpActiveProfile||cpProfile);if(signal&&signal.aborted)throw cpError("ABORTED");}
async function qpResponse(work){
 try{return await work();}catch(error){
  const status=Number(error?.response?.status||error?.status||error?.statusCode||String(error?.message||"").match(/^HTTP\s+([45]\d{2})(?::|\s|$)/i)?.[1]);
  if(status>=400)return {status,data:error?.response?.data};
  throw error;
 }
}
// Rex's JavaScriptCore context has no browser URL/URLSearchParams globals.
function qpParseUrl(value){
 const match=/^(https?):\/\/([a-z0-9.-]+)(?::([0-9]{1,5}))?(\/[^?#\\]*)?(?:\?([^#]*))?(?:#(.*))?$/i.exec(String(value));
 if(!match||!match[2].split(".").every(label=>/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label)))return null;
 const protocol=match[1].toLowerCase()+":",hostname=match[2].toLowerCase();
 if(match[3]&&Number(match[3])>65535)return null;
 const port=match[3]&&Number(match[3])!==(protocol==="https:"?443:80)?String(Number(match[3])):"";
 const origin=protocol+"//"+hostname+(port?":"+port:""),pathname=match[4]||"/",query=match[5]||"",hash=match[6]||"";
 return {origin,hostname,port,pathname,search:query,hash,href:origin+pathname+(match[5]===undefined?"":"?"+query)+(match[6]===undefined?"":"#"+hash),param(name){
  for(const part of query.split("&")){const at=part.indexOf("="),key=at<0?part:part.slice(0,at),value=at<0?"":part.slice(at+1);
   try{if(decodeURIComponent(key.replace(/\+/g," "))===name)return decodeURIComponent(value.replace(/\+/g," "));}catch(_){}
  }return null;
 }};
}
function qpOrigin(value){
 const url=qpParseUrl(String(value).trim());
 if(!url||url.pathname!=="/"||url.search||url.hash)throw qpError(0,"站点地址");
 return url.origin;
}
function qpData(response,kind){
 const status=Number(response&&(response.status||response.statusCode)||200);
 if(status<200||status>=300)throw qpError(status,kind);
 let json;try{json=typeof response.data==="string"?JSON.parse(response.data):response.data;}catch(_){throw qpError(0,kind);}
 if(!json||typeof json!=="object"||Array.isArray(json)||(json.code!=null&&Number(json.code)!==0))throw qpError(0,kind);
 return json.data&&typeof json.data==="object"&&!Array.isArray(json.data)?json.data:json;
}
async function qpGetToken(site,force=false){
 const denied=qpOperation?.tokenFailures?.get(site);if(denied)throw denied;
 const current=qpTokens.get(site);
 if(current&&current.pending)return await current.pending;
 if(!force&&current&&Date.now()<current.refreshAt)return current.token;
 const entry={};
 entry.pending=(async()=>{
  const response=await qpResponse(()=>cpHttpGet(site+"/api/auth/token",{timeout:15000,headers:{"User-Agent":UA,Referer:site+"/",Accept:"application/json"}}));
  const data=qpData(response,"令牌接口"),ttl=data.ttl_ms==null?900000:Number(data.ttl_ms);
  if(typeof data.token!=="string"||!data.token.trim()||data.token.length>8192||/[\x00-\x20\x7f]/.test(data.token)||!Number.isFinite(ttl)||ttl<=0)throw qpError(0,"令牌接口");
  entry.token=data.token;entry.refreshAt=Date.now()+ttl-Math.min(180000,ttl/5);
  return entry.token;
 })();
 qpTokens.set(site,entry);
 try{return await entry.pending;}catch(error){if(qpTokens.get(site)===entry)qpTokens.delete(site);if(error.status===403||error.status===429)qpOperation?.tokenFailures?.set(site,error);throw error;}
 finally{delete entry.pending;}
}
async function qpDirectSearchData(site,keyword,signal){
 const providers=QP_PROVIDERS.filter(cpDriveEnabled);if(!providers.length)return {merged_by_type:{},results:[]};
 qpCheck(signal);let token=await qpGetToken(site);qpCheck(signal);
 const request=()=>qpResponse(()=>cpHttpPost(site+"/api/search",JSON.stringify({kw:keyword,res:"merge",src:"all",cloud_types:providers}),{
  timeout:30000,headers:{"User-Agent":UA,Referer:site+"/",Accept:"application/json","Content-Type":"application/json","X-QP-K":token}
 }));
 let response=await request();qpCheck(signal);
 if(Number(response.status||response.statusCode)===403){token=await qpGetToken(site,true);qpCheck(signal);response=await request();qpCheck(signal);}
 if(Number(response.status||response.statusCode)===403)qpOperation?.tokenFailures?.set(site,qpError(403,"搜索接口"));
 return qpData(response,"搜索接口");
}
async function qpSearchData(site,keyword,signal){
 qpCheck(signal);const data=await qpDirectSearchData(site,keyword,signal);
 if(data.merged_by_type!=null&&(typeof data.merged_by_type!=="object"||Array.isArray(data.merged_by_type)))throw qpError(0,"搜索接口");
 if(data.results!=null&&!Array.isArray(data.results))throw qpError(0,"搜索接口");
 for(const provider of QP_PROVIDERS)if(data.merged_by_type&&Object.prototype.hasOwnProperty.call(data.merged_by_type,provider)&&!Array.isArray(data.merged_by_type[provider]))throw qpError(0,"搜索接口");
 if(!(data.merged_by_type&&typeof data.merged_by_type==="object"&&!Array.isArray(data.merged_by_type))&&!Array.isArray(data.results))throw qpError(0,"搜索接口");
 return data;
}
function qpShare(entry){
 if(!entry||typeof entry.url!=="string"||/\s/.test(entry.url))return null;
 const url=qpParseUrl(entry.url);if(!url||url.port)return null;
 const host=url.hostname.toLowerCase();
 const provider=host==="pan.quark.cn"?"quark":host==="pan.baidu.com"?"baidu":host==="drive.uc.cn"?"uc":/^(115|anxia|115cdn)\.com$/.test(host)?"115":/^(?:[a-z0-9-]+\.)*(?:123pan|123684|123865|123912|123952|123592)\.(?:com|cn)$/.test(host)?"123":"";
 const init=provider==="baidu"&&url.pathname==="/share/init"?url.param("surl"):null;
 const id=init?"1"+init:url.pathname.match(/^\/(?:s|ps|123pan)\/([A-Za-z0-9_-]+)\/?$/)?.[1];
 if(!QP_PROVIDERS.includes(provider)||!id||!/^[A-Za-z0-9_-]+$/.test(id))return null;
 const explicit=["pwd","password","passcode","receive_code"].map(key=>url.param(key)).find(Boolean);
 const nearby=String(entry.note||"").match(/(?:提取码|提取密碼|密码|密碼)\s*[:：]?\s*([A-Za-z0-9]{4,8})/)?.[1];
 const bare=/^[A-Za-z0-9]{4,8}$/.test(url.search)?url.search:"";
 const raw=explicit||entry.password||nearby||bare||"";
 if(typeof raw!=="string"||raw.length>128||/[\x00-\x1f\x7f]/.test(raw))return null;
 return {key:provider+":"+id,provider,shareId:id,passcode:raw,url:url.href};
}
const qpLinkChecks=new Map(),qpLinkPending=new Map(),qpCheckQueues=new Map();
function qpCheckKey(share,site){return JSON.stringify([site,share.provider,share.shareId,share.passcode]);}
async function qpCheckBatch(entries,site,keyword){
 try{
  qpCheck();let token=await qpGetToken(site);qpCheck();
  const request=()=>qpResponse(()=>cpHttpPost(site+"/api/check/links",JSON.stringify({items:entries.map(({share})=>({disk_type:share.provider,url:share.url,password:share.passcode||""}))}),{
   headers:{"User-Agent":UA,Referer:site+"/?q="+encodeURIComponent(keyword||""),"Content-Type":"application/json","X-QP-K":token}
  }));
  let response=await request();qpCheck();
  if(Number(response.status||response.statusCode)===403){token=await qpGetToken(site,true);qpCheck();response=await request();qpCheck();}
  const data=qpData(response,"链接有效性检测"),rows=Array.isArray(data.data)?data.data:data.results;
  if(!Array.isArray(rows))throw qpError(0,"链接有效性检测");
  for(const entry of entries){
   const share=entry.share,row=rows.find(row=>row.disk_type===share.provider&&qpShare({url:row.url})?.shareId===share.shareId);
   const validity=["ok","bad","invalid","expired","locked","uncertain"].includes(row?.state)?row.state:"uncertain";
   const normalized=qpShare({url:row?.normalized_url});
   const passcode=!share.passcode&&normalized?.provider===share.provider&&normalized.shareId===share.shareId?normalized.passcode:share.passcode;
   const value={until:Date.now()+60000,validity,summary:String(row?.summary||""),passcode};
   qpLinkChecks.set(entry.key,value);entry.resolve(value);
  }
  while(qpLinkChecks.size>500)qpLinkChecks.delete(qpLinkChecks.keys().next().value);
 }catch(error){for(const entry of entries)entry.reject(error);}
 finally{for(const entry of entries)qpLinkPending.delete(entry.key);}
}
function qpCheckedShare(share,site,keyword){
 const key=qpCheckKey(share,site),cached=qpLinkChecks.get(key);
 if(cached&&cached.until>Date.now())return Promise.resolve(cached);
 if(qpLinkPending.has(key))return qpLinkPending.get(key);
 let resolve,reject;const pending=new Promise((yes,no)=>{resolve=yes;reject=no;});qpLinkPending.set(key,pending);
 const queueKey=JSON.stringify([site,keyword||""]);let queue=qpCheckQueues.get(queueKey);
 if(!queue){
  queue=[];qpCheckQueues.set(queueKey,queue);
  // Combine ready callers in this microtask; no timer, waiting window or result cutoff.
  Promise.resolve().then(()=>{
   qpCheckQueues.delete(queueKey);
   // The checker does not always echo the separate password field. Keep
   // conflicting passwords for one share in separate requests, so identity
   // matching cannot borrow the status of a different extraction code.
   const waiting=queue.slice();
   while(waiting.length){
    const batch=[],identities=new Set();
    for(let index=0;index<waiting.length&&batch.length<5;){
     const entry=waiting[index],identity=entry.share.key||entry.share.provider+":"+entry.share.shareId;
     if(identities.has(identity)){index++;continue;}
     identities.add(identity);batch.push(entry);waiting.splice(index,1);
    }
    qpCheckBatch(batch,site,keyword);
   }
  });
 }
 queue.push({key,share,resolve,reject});return pending;
}
async function qpCheckShares(shares,site,keyword){
 return await Promise.all(shares.map(async share=>{
  const value=await qpCheckedShare(share,site,keyword);qpCheck();
  return Object.assign({},share,{passcode:value.passcode||share.passcode,validity:value.validity,validitySummary:value.summary});
 }));
}
function parseQuanpanResults(data,keyword,site){
 const entries=[];
 for(const provider of QP_PROVIDERS){const values=data.merged_by_type&&data.merged_by_type[provider];if(Array.isArray(values))entries.push(...values);}
 if(Array.isArray(data.results))entries.push(...data.results);
 const unique=[],buckets=new Map();
 for(const entry of entries){
  const share=qpShare(entry);if(!share||!cpDriveEnabled(share.provider))continue;
  const title=typeof entry.note==="string"&&entry.note.trim()?entry.note.trim():keyword;
  const bucket=buckets.get(share.key)||[];
  const previous=bucket.find(row=>!row.share.passcode||!share.passcode||row.share.passcode===share.passcode);
  if(previous){if(!previous.share.passcode&&share.passcode)previous.share=share;continue;}
  const row={share,title};unique.push(row);bucket.push(row);buckets.set(share.key,bucket);
 }
 return unique.map(({share,title})=>{
  const info={action:"detail",id:share.key,site,title,description:providerName(share.provider),poster:"",shares:[share]};
  return {id:"juhe-baidu-"+baiduSha1(JSON.stringify([share.key,share.passcode])),type:"url",title,posterPath:"",description:providerName(share.provider),link:encodeLink(info)};
 });
}
async function search(params={},siteOverride){
 rexAssertWithinUsagePeriod();bindForwardParams(params);qpCheck(params.signal);
 const keyword=String(params.keyword||"").trim();if(!keyword||Number(params.page||1)>1)return [];
 if(keyword.length>100)throw qpError(0,"关键词");
 const site=qpOrigin(siteOverride||getSite(params));
 const load=async()=>{
  try{if(typeof params.cpSiteSearch==='function')return await params.cpSiteSearch(params);return parseQuanpanResults(await qpSearchData(site,keyword,params.signal),keyword,site);}
  catch(error){qpCheck(params.signal);if(typeof params.cpSiteSearch==='function')throw error;if(/^QUANPAN_/.test(error?.code)||["ABORTED","ACCOUNT_CHANGED","OPERATION_TIMEOUT"].includes(error?.code))throw error;throw qpError(0,"网络请求");}
 };
 // A caller-specific cancellation must not reject another caller joined to the same cached flight.
 const rows=params.signal?await load():await rexCached((typeof params.cpSiteSearch==="function"?"site-search-v2:":"search:")+site+":"+keyword+(typeof params.cpSiteSearch==="function"?":"+baiduSha1(JSON.stringify([params.cpSiteIdentity,params.tmdbId||params.tmdbID||"",cpRequestedYear(params),params.type,params.season,cpRelevanceTitles(params)])):""),45000,load,rows=>rows.length>0);
 qpCheck(params.signal);return rows;
}

async function loadDetail(link) {
  rexAssertWithinUsagePeriod();

  ensureCookie();
  const info = decodeLink(link);
  if (!info) return null;
  return await buildDetailItem(info);
}

// 不同网盘独立请求；同一网盘按顺序处理，避免共享状态和 Cookie 串用。
async function runProviderTasks(items, work) {
  const groups = new Map();
  for (const item of items) {
    const provider = item.provider || "quark";
    if (!groups.has(provider)) groups.set(provider, []);
    groups.get(provider).push(item);
  }
  await Promise.all(Array.from(groups.values()).map(async group => {
    for (const item of group) await work(item);
  }));
}

async function buildDetailItem(info) {
  rexAssertWithinUsagePeriod();
  const site=info.site||getSite(),tid=String(info.id||"");
  const message=info;
  const title=message.title||info.title||"全盘资源",poster=message.poster||info.poster||"",desc=message.description||info.description||"";
  const shares=(message.shares||[]).filter(share=>quanpanProviderEnabled(share.provider));
  const channelUsername="",channelDisplayName="";

  const episodeItems = [];
  const failures = [];
  const counts = {};
  const cpCatalogReads=cpPrimeCatalogs(shares,share=>rexShareCatalog(share));
  await runProviderTasks(shares, async share => {
    counts[share.provider] = (counts[share.provider] || 0) + 1;
    const lineName = providerName(share.provider) + "#" + counts[share.provider];
    try {
      const cpCatalogRead=await cpCatalogReads.get(share);
      if(!cpCatalogRead.ok)throw cpCatalogRead.error;
      const detail=cpCatalogRead.value;

      ((detail && detail.list) || []).forEach((v, idx) => {
        const epTitle = formatVideoName(v.file_name, v.size) || `视频 ${idx + 1}`;
        episodeItems.push({
          id: `${share.provider}-${share.shareId}-${v.fid}`,
          type: "url", title: epTitle, description: lineName,
          link: encodeLink({ action: "play", provider: share.provider, lineName, channelUsername, channelDisplayName, packageSizeBytes:Number(detail.packageSizeBytes||0), videoInfo: v, title: epTitle })
        });
      });
    } catch (e) {
      
      failures.push(`${lineName}: ${e.message || e}`);
      
    }
  });

  return {
    id: `juhe-baidu-${tid}`,
    type: "url",
    title,
    posterPath: absUrl(poster, site),
    description: [desc || (shares.length ? `已发现 ${shares.length} 个网盘分享链接` : "未发现支持的网盘分享链接"), ...failures].filter(Boolean).join("\n"),
    episodeItems: groupEpisodeLines(episodeItems, tid),
    link: encodeLink(Object.assign({},info,{action:"detail"}))
  };
}

async function loadResource(params = {}) {
  rexAssertWithinUsagePeriod(); return await loadResourceImpl(params); }

async function loadResourceImpl(params) {
  const cpOwnedResource=cpResourceParams.get(params);
  rexAssertWithinUsagePeriod();bindForwardParams(params || {});
  let info=decodeLink(params&&params.link),failure=null;
  const resources=[],resourceOrder=new Map(),resolvedFiles=new Set(),reads=new Set(),deferredIssues=[];
  const compareResources=(a,b)=>Number(b.packageSizeBytes||0)-Number(a.packageSizeBytes||0)||resourceOrder.get(a)-resourceOrder.get(b);
  if(cpOwnedResource)cpOwnedResource.snapshot=()=>resources.slice().sort(compareResources);
  const enqueue=source=>{
    const provider=source.provider||"quark",v=source.videoInfo||{};
    const key=JSON.stringify([provider,String(v.shareId??v.shareid??v.share_id??""),String(v.uk??""),String(v.fid??v.fs_id??v.file_name??"")]);
    if(resolvedFiles.has(key)||!quanpanProviderEnabled(provider))return false;
    const task=Promise.resolve().then(async()=>{
      cpCheck(cpActiveProfile||cpProfile);if(cpBlockedProviders.has(provider))return false;
      const issues=[],items=await cpResolveCandidate(source,issues);cpCheck(cpActiveProfile||cpProfile);
      const ordinaryIssues=issues.filter(issue=>issue.code!=="SHARE_EXPIRED");
      if(provider==="quark")cpApplyCandidateIssues(ordinaryIssues);else deferredIssues.push(...ordinaryIssues);
      if(issues.some(issue=>issue.code==="SHARE_EXPIRED"))return "expired";
      const resource=items.find(item=>item.url);if(!resource)return false;
      const formatted=formatPlaybackResource(resource,source,params||{});
      if(resources.some(item=>item.id===formatted.id))formatted.id+="_"+baiduSha1(key);
      resolvedFiles.add(key);resourceOrder.set(formatted,source.qpCandidateOrder||0);resources.push(formatted);
      return true;
    }).catch(error=>{failure=failure||error;return false;});
    reads.add(task);task.finally(()=>reads.delete(task));
    return task;
  };
  try{
    let streamed=false;
    if(!info||info.action!=="play"){
      if(!info&&(safeStorageGet("juhe.baidu.multiSource")||"enabled")!=="enabled")return [];
      streamed=true;info=await findEpisodeResource(params||{},info,enqueue);
    }
    if(!info){if(failure)throw failure;cpWrite("last-error",null);return [];}
    if(Array.isArray(info.sources)){
      if(!streamed){
        const groups=new Map();
        for(const source of info.sources){const provider=source.provider||"quark";if(!groups.has(provider))groups.set(provider,[]);groups.get(provider).push(source);}
        await Promise.all(Array.from(groups.values(),sources=>enqueue(sources[0])));
      }
      await Promise.all([...reads]);if(failure)throw failure;
      resources.sort(compareResources);
      if(!resources.length)cpWrite("last-error",null);
      return resources;
    }
    const items=(await cpResolveCandidate(info)).filter(item=>item.url);
    if(!items.length)cpWrite("last-error",null);
    return items.map(item=>formatPlaybackResource(item,info,params||{}));
  }finally{await Promise.allSettled([...reads]);if(resources.length)cpApplyCandidateIssues(deferredIssues);}
}

async function resolvePlaySource(info) {
  if(info.provider==="123")return await getPan123Resource(info);
  if(!quanpanProviderEnabled(info.provider||"quark"))return [];
  const videoInfo = info.videoInfo || {};

  try {
    if (info.provider === "115") return await get115Resource(info);
    if (info.provider === "uc") return await getUcResource(info);
    if (info.provider === "baidu") return await serialBaidu(() => getBaiduResource(info));
    const fid = await saveShareFile(videoInfo);
    if (!fid) throw new Error("转存失败");
    const urls = await getPlayUrl(fid);
    const best = urls.find(v => v.resolution === "4k") || urls.find(v => v.resolution === "2k") || urls[0];
    if (best && best.url) {
      return [{
        name: "垮",
        customHeaders: playHeaders(),
        description: best.resolution ? `清晰度: ${best.resolution}` : "",
        url: best.url
      }];
    }
  } catch (e) {

  }
  return [{
    name: info.title || "垮视频",
    description: info.provider === "uc" ? "优免登直链获取失败，请重开详情刷新分享信息" : "获取播放地址失败，请检查对应网盘 Cookie 和提取码",
    url: ""
  }];
}

async function getStoken(shareId, passcode) {
  const url = "https://drive-h.quark.cn/1/clouddrive/share/sharepage/token?pr=ucpro&fr=pc&uc_param_str=";
  const json = await cpQueueCatalogRead("quark",()=>httpJson("POST", url, { pwd_id: shareId, passcode: passcode || "" }, quarkHeaders()));
  return json && json.status === 200 && json.data ? json.data.stoken : "";
}

function qpFileBytes(value){const bytes=Number(value);return Number.isFinite(bytes)&&bytes>0?bytes:0;}
// Walk independent folders concurrently; pages within a folder remain ordered.
// Drain every in-flight read before propagating failure to the next operation.
async function getVideosFromShareLink(shareLink, passcode, scope) {
  const match = String(shareLink || "").match(/\/s\/([a-zA-Z0-9]+)/);
  const shareId = match ? match[1] : "";
  if (!shareId) return { movieName: "", list: [] };
  const stoken = await getStoken(shareId, passcode || "");
  if (!stoken) throw new Error("垮分享令牌获取失败，请检查分享和 Cookie");
  return await getShareDetail(shareId, stoken,undefined,scope);
}

// ==================== 夸克网盘缓存文件夹管理 ====================

// 检查缓存文件夹是否存在，返回 fid
async function checkFolderExists(folderName) {
  const url = "https://drive-pc.quark.cn/1/clouddrive/file/sort?pr=ucpro&fr=pc&uc_param_str=&pdir_fid=0&_page=1&_size=50&_fetch_total=1&_fetch_sub_dirs=0&_sort=file_type:asc,updated_at:desc&fetch_all_file=1&fetch_risk_file_name=1";
  const json = await httpJson("GET", url, null, quarkHeaders());
  const list = (json && json.data && json.data.list) || [];
  const folder = list.find(x => x.dir && x.file_name === folderName);
  return folder ? folder.fid : "";
}

// 删除文件/文件夹列表
async function deleteFiles(filelist) {
  if (!Array.isArray(filelist) || filelist.length === 0) return false;
  const url = "https://drive-pc.quark.cn/1/clouddrive/file/delete?pr=ucpro&fr=pc&uc_param_str=";
  try {
    const json = await httpJson("POST", url, { action_type: 2, filelist: filelist, exclude_fids: [] }, quarkHeaders());
    if (json && json.status === 200 && json.code === 0) {
      
      return true;
    }
    
    return false;
  } catch (e) {
    
    return false;
  }
}

// 复用缓存文件夹，避免生成多条夸克线路时删除前一条资源的文件。
async function createFolder(folderName, pdirFid = "0") {
  // 检查是否已存在
  const existingFid = await checkFolderExists(folderName);
  if (existingFid) {
    return existingFid;
  }
  // 创建新文件夹
  const url = "https://drive-pc.quark.cn/1/clouddrive/file?pr=ucpro&fr=pc&uc_param_str=";
  try {
    const json = await httpJson("POST", url, {
      pdir_fid: pdirFid,
      file_name: folderName,
      dir_path: "",
      dir_init_lock: false
    }, quarkHeaders());
    if (json && json.status === 200 && json.code === 0 && json.data) {
      
      return json.data.fid;
    }
    
    return "0";
  } catch (e) {
    if(e&&["AUTH_FAILED","RATE_LIMITED","ABORTED","ACCOUNT_CHANGED","OPERATION_TIMEOUT","TRANSFER_UNCERTAIN"].includes(e.code))throw e;
    
    return "0";
  }
}

// 转存分享文件到缓存文件夹
async function saveShareFile(videoInfo) {
  const toFid=await createFolder(CACHE_FOLDER);
  if(!toFid || toFid === "0")return "";
  const base="https://drive-h.quark.cn/1/clouddrive/";
  const query="pr=ucpro&fr=pc&uc_param_str=";
  const body={fid_list:[videoInfo.fid],fid_token_list:[videoInfo.share_fid_token],
    pdir_fid:videoInfo.pdir_fid||"0",pwd_id:videoInfo.shareId,scene:"link",stoken:videoInfo.stoken,to_pdir_fid:toFid};
  const savedFid=json=>{
    const data=json&&json.data;
    const candidates=[data,data&&data.task_resp&&data.task_resp.data];
    for(const entry of candidates){
      const saved=entry&&entry.save_as;
      const fids=saved&&(saved.save_as_top_fids||saved.save_as_select_top_fids);
      if(Array.isArray(fids)&&fids.length)return String(fids[0]);
    }
    return "";
  };
  const successful=json=>!!json&&(json.code==null||Number(json.code)===0)&&(json.status==null||Number(json.status)===200);
  try{
    const json=await httpJson("POST",base+"share/sharepage/save?"+query,body,quarkHeaders());
    if(!successful(json))return "";
    const immediate=savedFid(json);if(immediate)return immediate;
    const taskId=json.data&&json.data.task_id;if(!taskId)return "";
    // 与猫源一致，异步转存任务最多查询6次，成功后再调用file/v2/play转码。
    for(let retry=0;retry<6;retry++){
      const task=await httpJson("GET",base+"task?"+query+"&task_id="+encodeURIComponent(String(taskId))+"&retry_index="+retry,null,quarkHeaders());
      if(!successful(task))return "";
      const fid=savedFid(task);if(fid)return fid;
      if(retry<5&&typeof setTimeout==="function")await new Promise(resolve=>setTimeout(resolve,1000));
    }
    return "";
  }catch(e){throw e;}
}

// 获取播放 URL
async function getPlayUrl(myFid) {
  const url = "https://drive-pc.quark.cn/1/clouddrive/file/v2/play?pr=ucpro&fr=pc&uc_param_str=";
  const json = await httpJson("POST", url, { fid: myFid, resolutions: "normal,low,high,super,2k,4k" }, quarkHeaders());
  const arr = json && json.status === 200 && json.code === 0 && json.data ? (json.data.video_list || []) : [];
  return arr.map(v => ({ resolution: v.resolution, file_name: json.data.file_name, url: v.video_info && v.video_info.url })).filter(v => v.url);
}

function formatVideoName(fileName, size) {
  if (!fileName) return "视频";
  const gb = Number(size || 0) / 1024 / 1024 / 1024;
  const sizeText = gb > 0 ? ` ${gb >= 1 ? gb.toFixed(2) + "GB" : Math.round(gb * 1024) + "MB"}` : "";
  return String(fileName).trim() + sizeText;
}

// ==================== 多网盘线路 ====================
function playbackLineName(provider) {
  return { quark: "夸克", baidu: "百度", uc: "UC", "115":"115", "123":"123" }[provider] || "网盘";
}

function providerName(provider) {
  return playbackLineName(provider);
}

function extractShareLinks($) {
  const shares = [];
  const seen = new Set();
  $(".tgme_widget_message_text, .tgme_widget_message_inline_button, a, p").each((i, el) => {
    const text = cpShareExtractionText($,el);
    const regex = /https?:\/\/(pan\.quark\.cn|drive\.uc\.cn|pan\.baidu\.com|115\.com|anxia\.com|115cdn\.com|(?:[A-Za-z0-9-]+\.)*(?:123pan|123684|123865|123912|123952|123592)\.(?:com|cn))\/((?:s|ps|123pan)\/[A-Za-z0-9_-]+(?:\?[^\s<>"'，。]*)?|share\/init\?[^\s<>"'，。]+)/g;
    let m;
    while ((m = regex.exec(text))) {
      const provider = /(?:^|\.)(?:123pan|123684|123865|123912|123952|123592)\.(?:com|cn)$/.test(m[1]) ? "123" : m[1] === "pan.baidu.com" ? "baidu" : m[1] === "drive.uc.cn" ? "uc" : /^(115|anxia|115cdn)\.com$/.test(m[1]) ? "115" : "quark";
      const id = m[2].match(/^(?:s|ps|123pan)\/([^?&#]+)/) || m[2].match(/[?&]surl=([^&#]+)/);
      if (!id) continue;
      const queryPwd = m[0].match(/[?&](?:pwd|password|passcode)=([^&#\s]+)/);
      const nearbyPwd = text.slice(m.index + m[0].length, m.index + m[0].length + 80).split(/https?:\/\/|\u0001/,1)[0].match(/(?:提取码|提取密碼|密码|密碼)\s*[:：]?\s*([A-Za-z0-9]{4,8})/);
      const passcode = queryPwd ? decodeURIComponent(queryPwd[1]) : nearbyPwd ? nearbyPwd[1] : "";
      const key = provider + ":" + id[1];
      const existing = shares.find(x => x.key === key);
      if (existing) { if (!existing.passcode && passcode) existing.passcode = passcode; continue; }
      if (!seen.has(key)) {
        seen.add(key);
        shares.push({ key, provider, shareId: id[1], passcode, url: m[0] });
      }
    }
  });
  return shares;
}

function isVideoFile(item) {
  return item.obj_category === "video" || String(item.category) === "1" ||
    /\.(mp4|mkv|avi|mov|flv|wmv|ts|m2ts|webm|m4v)$/i.test(item.file_name || item.server_filename || "");
}

const UC_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) uc-cloud-drive/2.5.20 Chrome/100.0.4896.160 Electron/18.3.5.4-b478491100 Safari/537.36 Channel/pckk_other_ch";
function ucHeaders() { return { "User-Agent": UC_UA, Referer: "https://drive.uc.cn" }; }
async function ucApi(path, data) {
  const json = await httpJson(data ? "POST" : "GET", "https://pc-api.uc.cn/1/clouddrive/" + path, data, ucHeaders());
  if (!json || (json.status && json.status !== 200) || (json.code && json.code !== 0)) {
    const error=new Error("优分享请求失败");
    error.code=json && json.code; error.status=json && json.status;
    throw error;
  }
  // Some UC responses put catalog totals outside data. Preserve them for all page readers.
  if(path.startsWith("share/sharepage/detail?")&&json.data&&json.metadata)return Object.assign({},json.data,{metadata:json.metadata});
  return json.data;
}
async function getUcToken(shareId, passcode) {
  const data = await cpQueueCatalogRead("uc",()=>ucApi("share/sharepage/token?pr=UCBrowser&fr=pc", { pwd_id: shareId, passcode: passcode || "" }));
  if (!data || !data.stoken) throw new Error("优分享失效或提取码错误");
  return data.stoken;
}
async function getUcResource(info) {
  let v = info.videoInfo || {};
  const started = Date.now();

  const download = async video => {
    
    const data = await ucApi("file/download?pr=UCBrowser&fr=pc", {
      fids:[video.fid], fids_token:[video.share_fid_token], pwd_id:video.shareId,
      stoken:video.stoken, speedup_session:""
    });
    return Array.isArray(data) ? data[0] : data;
  };
  try {
    let item;
    if (v.stoken && v.share_fid_token) {
      try { item=await download(v); } catch(e) { if(e&&["AUTH_FAILED","RATE_LIMITED","ABORTED","ACCOUNT_CHANGED","OPERATION_TIMEOUT","SHARE_EXPIRED"].includes(e.code))throw e; }
    }
    if (!item || !item.download_url) {
      
      if(info.qpFreshCatalog)throw new Error("优免登下载地址获取失败");
      const detail=await getUcVideos({shareId:v.shareId,passcode:v.passcode},v.pdir_fid!=null?v:undefined);
      v=detail.list.find(file=>String(file.fid)===String(v.fid));
      if(!v) throw new Error("优分享文件已失效");
      item=await download(v);
      // Renew the raw index's selected file as well, so subsequent loads do not repeat this refresh.
      if(item?.download_url&&info.videoInfo)Object.assign(info.videoInfo,v);
    }
    if(!item || !/^https?:\/\//i.test(item.download_url || "")) throw new Error("优免登下载地址为空或格式无效");
    // 完整保留参考实现：Referer 为原始下载地址加一个反斜杠，不解码、不规范化。
    const headers={"User-Agent":UC_UA,Referer:item.download_url+"\\","Accept-Encoding":"identity"};
    const resource={name:"优",description:"原画",url:item.download_url,customHeaders:headers,headers:Object.assign({},headers)};

    return [resource];
  } catch(e) {
      throw e;
  }
}

// Each Baidu workflow owns its share cookie and signature; no global read queue.
async function serialBaidu(work){return await work();}
function baiduHeaders(share, randsk) {
  let cookie = normalizeCookie(safeStorageGet("juhe.baidu.baidu.cookie"));
  if (!cookie) throw new Error("请先在插件设置填写佰 Cookie");
  // BDCLND 属于单个分享，用户粘贴的 Cookie 中可能包含其他分享的值。
  cookie = cookie.split(";").map(p => p.trim()).filter(p => p && !/^BDCLND\s*=/i.test(p)).join("; ");
  if (randsk) cookie += "; BDCLND=" + randsk;
  return { "User-Agent": BAIDU_WEB_UA, Cookie: cookie, Referer: share.url || "https://pan.baidu.com/share/init?surl=" + encodeURIComponent(baiduShortId(share.shareId)) };
}
function baiduShortId(shareId) { return shareId.charAt(0) === "1" ? shareId.slice(1) : shareId; }
async function baiduVerifyCore(share) {
  // 空提取码也请求验证，以获取本分享的 sekey；只携带账号基础 Cookie。
  const res = await cpHttpPost("https://pan.baidu.com/share/verify?" + toQuery({ surl: baiduShortId(share.shareId), pwd: share.passcode || "" }),
    toQuery({ pwd: share.passcode || "", vcode: "", vcode_str: "" }),
    { timeout: 8000, headers: Object.assign(baiduHeaders(share), { "Content-Type": "application/x-www-form-urlencoded" }) });
  const json = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
  qpAssertShareResponse("https://pan.baidu.com/share/verify",json,Number(res.status||res.statusCode||0));
  
  if (!json || Number(json.errno) !== 0 || !json.randsk) {
    const error=new Error("佰提取码验证失败或需要验证码");
    error.status=Number(res.status || res.statusCode || 0) || undefined;
    error.code=json && json.errno;
    throw error;
  }
  return json.randsk;
}
const BAIDU_WEB_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
const BAIDU_PLAY_UA = "netdisk;P2SP;2.2.91.136;android-android;";
const BAIDU_APP_VERSION = "12.0.0";
function baiduSha1(message) {
  const encoded = encodeURIComponent(String(message));
  const bytes = [];
  for (let i = 0; i < encoded.length; i++) {
    if (encoded[i] === "%") { bytes.push(parseInt(encoded.slice(i + 1, i + 3), 16)); i += 2; }
    else bytes.push(encoded.charCodeAt(i));
  }
  const bitLength = bytes.length * 8;
  bytes.push(128);
  while (bytes.length % 64 !== 56) bytes.push(0);
  const high = Math.floor(bitLength / 4294967296);
  for (let i = 3; i >= 0; i--) bytes.push((high >>> (i * 8)) & 255);
  for (let i = 3; i >= 0; i--) bytes.push((bitLength >>> (i * 8)) & 255);
  const rotate = (n, count) => (n << count) | (n >>> (32 - count));
  let h0 = 0x67452301, h1 = 0xefcdab89, h2 = 0x98badcfe, h3 = 0x10325476, h4 = 0xc3d2e1f0;
  for (let offset = 0; offset < bytes.length; offset += 64) {
    const w = [];
    for (let i = 0; i < 16; i++) {
      const start = offset + i * 4;
      w[i] = (bytes[start] << 24) | (bytes[start + 1] << 16) | (bytes[start + 2] << 8) | bytes[start + 3];
    }
    for (let i = 16; i < 80; i++) w[i] = rotate(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1);
    let a = h0, b = h1, c = h2, d = h3, e = h4;
    for (let i = 0; i < 80; i++) {
      const f = i < 20 ? (b & c) | (~b & d) : i < 40 ? b ^ c ^ d : i < 60 ? (b & c) | (b & d) | (c & d) : b ^ c ^ d;
      const k = i < 20 ? 0x5a827999 : i < 40 ? 0x6ed9eba1 : i < 60 ? 0x8f1bbcdc : 0xca62c1d6;
      const next = (rotate(a, 5) + f + e + k + w[i]) | 0;
      e = d; d = c; c = rotate(b, 30); b = a; a = next;
    }
    h0 = (h0 + a) | 0; h1 = (h1 + b) | 0; h2 = (h2 + c) | 0; h3 = (h3 + d) | 0; h4 = (h4 + e) | 0;
  }
  return [h0, h1, h2, h3, h4].map(n => (n >>> 0).toString(16).padStart(8, "0")).join("");
}

async function getBaiduResource(info) {
  const v = info.videoInfo || {};

  try {
    
    if (!v.shareid || !v.uk || !v.fid) throw new Error("佰分享文件信息不完整，请重新打开详情");
    const headers = baiduHeaders(v);
    const bduss = headers.Cookie.match(/(?:^|;)\s*BDUSS=([^;]+)/);
    if (!bduss) throw new Error("佰 Cookie 缺少 BDUSS");
    
    let randsk = await baiduVerify(v);
    
    const account = await httpJson("GET", "https://mbd.baidu.com/userx/v1/info/get?" + toQuery({
      appname:"baiduboxapp", fields:'        ["bg_image","member","uid","avatar", "avatar_member"]',
      client:"", clientfrom:"", lang:"zh-cn", tpl:"", ttt:""
    }), null, headers);
    const accountUid = account && account.data && account.data.fields && account.data.fields.uid;
    const uid = accountUid || "default_uid";
    const devuid = "73CED981D0F186D12BC18CAE1684FFD5|VSRCQTF6W";
    const requestDlink = async () => {
      // verify 的 randsk 可能已经转义；toQuery 统一编码一次，避免 %2B 变成 %252B。
      let sekey = randsk;
      try { sekey = decodeURIComponent(randsk); } catch (_) {}
      const time = String(Date.now());
      const rand = baiduSha1(baiduSha1(bduss[1]) + uid + "ebrcUYiuxaZv2XGu7KIYKxUrqfnOfpDF" + time + devuid + BAIDU_APP_VERSION + "ae5821440fab5e1a61a025f014bd8972");
      
      return await httpJson("GET", "https://pan.baidu.com/share/list?" + toQuery({
        shareid:v.shareid, uk:v.uk, fid:v.fid, sekey, origin:"dlna", devuid,
        clienttype:1, channel:"android_12_zhao_bd-netdisk_1024266h", version:BAIDU_APP_VERSION, time, rand
      }), null, Object.assign(baiduHeaders(v, randsk), {"User-Agent":BAIDU_PLAY_UA, Referer:"https://pan.baidu.com/"}));
    };
    let json = await requestDlink();
    if (json && Number(json.errno) === -9) {
      
      randsk = await cpRefreshBaiduVerify(v,randsk);
      json = await requestDlink();
    }
    if(json&&Number(json.errno)===-9)cpReadInvalidate("baidu",v.shareId,v.passcode,"verify");
    const items = json && (Array.isArray(json.list) ? json.list : Array.isArray(json.info) ? json.info : []) || [];
    const fileId = file => file && (file.fs_id || file.fsid || file.fid);
    // 单文件接口有时只返回 dlink；返回明确 fid 时必须匹配，不能误播其他集。
    const item = items.find(file => String(fileId(file)) === String(v.fid)) ||
      (items.length === 1 && !fileId(items[0]) ? items[0] : null);

    if (!json || Number(json.errno) !== 0 || !item || !/^https?:\/\//i.test(item.dlink || "")) {
      const error = new Error("佰不转存直链获取失败");
      if (json && Number.isFinite(Number(json.errno))) error.code = Number(json.errno);
      throw error;
    }
    // 对齐 baidu.js 的原画播放头：签名直链仅携带 UA/Referer，账号 Cookie 只用于取链。
    const playbackHeaders = {"User-Agent":BAIDU_PLAY_UA, Referer:"https://pan.baidu.com/"};
    // iOS 遇到未转义的 | 会重新编码整条 URL，使签名中的 %2F/%3D 变成 %252F/%253D。
    // 只转义 devuid 的分隔符，保留百度已经编码的签名和其他查询参数。
    const playbackUrl = item.dlink.replace(/\|/g, "%7C");

    return [{name:"佰", description:"原画", url:playbackUrl, customHeaders:playbackHeaders, headers:playbackHeaders}];
  } catch (error) {

    throw error;
  }
}

// 用明确的季/集编号匹配跨网盘版本；无法识别编号时只合并同名文件。
function episodeIdentity(fileName) {
  const name = String(fileName || "").replace(/\.[a-z0-9]{2,5}$/i, "");
  const seasonMatch = name.match(/s(\d{1,2})[ ._-]*e(\d{1,3})(?!\d)/i);
  if (seasonMatch) return { key: `s${Number(seasonMatch[1])}e${Number(seasonMatch[2])}`, season: Number(seasonMatch[1]), episode: Number(seasonMatch[2]) };
  const season = name.match(/第\s*(\d+)\s*季/);
  const episode = name.match(/第\s*(\d{1,3})\s*[集话]/) || name.match(/(?:^|[^a-z])(?:ep?|episode)[ ._-]*(\d{1,3})(?!\d)/i) || name.match(/^\s*(\d{1,3})(?:$|[ ._\-])/);
  if (episode) return { key: `s${season ? Number(season[1]) : 1}e${Number(episode[1])}`, season: season ? Number(season[1]) : 1, episode: Number(episode[1]) };
  return { key: "name:" + name.toLowerCase().replace(/[\s._\-]+/g, "") };
}

function groupEpisodeLines(items, tid) {
  const groups = new Map();
  for (const item of items) {
    const source = decodeLink(item.link);
    if (!source) continue;
    const identity = episodeIdentity(source.videoInfo.file_name);
    if (!groups.has(identity.key)) groups.set(identity.key, { identity, item, sources: [] });
    groups.get(identity.key).sources.push(source);
  }
  return Array.from(groups.values()).sort((a, b) => {
    if (a.identity.episode !== undefined && b.identity.episode !== undefined) return a.identity.season - b.identity.season || a.identity.episode - b.identity.episode;
    return a.item.title.localeCompare(b.item.title, "zh-CN", { numeric: true });
  }).map(group => ({
    id: `juhe-baidu-${tid}-${group.identity.key}`, type: "url",
    title: group.identity.episode !== undefined ? `第${group.identity.episode}集` : group.item.title,
    description: Array.from(new Set(group.sources.map(source => playbackLineName(source.provider || "quark")))).join(" / "),
    link: encodeLink({ action: "play", title: group.item.title, sources: group.sources })
  }));
}

// Website fuzzy search owns discovery; no external metadata or alias search requests.
function qpCleanQuery(value){
 let title=String(value||"").replace(/[\u200b-\u200f\u202a-\u202e\ufeff]/g,"").trim();
 for(let i=0;i<2;i++)title=title.replace(/\s*[（(]\s*(?:19|20)\d{2}\s*[）)]\s*$/,"").replace(/\s*(?:第\s*[一二三四五六七八九十百\d]+\s*季|season\s*\d+|\bS\d{1,2})\s*$/i,"").trim();
 return title.length<=100&&!/[\x00-\x1f\x7f]/.test(title)?title:"";
}
async function qpDiscoverCandidates(params,onCandidate,options={}){
 const keyword=qpCleanQuery(options.keyword)||[params.seriesName,params.title,params.name,params.keyword].map(qpCleanQuery).find(Boolean);
 if(!keyword)return [];
 const rows=options.rows||await search(Object.assign({},params,{keyword,page:1,alternativeTitles:cpRelevanceTitles(params).concat(options.titles||[])}));qpCheck(params.signal);
 if(options.onCoverageRows)options.onCoverageRows(rows);
 if(options.onRows){const localMatching=Object.assign({},params,{alternativeTitles:cpB12LocalTitles(params)});options.onRows(rows.filter(row=>!cpSearchResultMatches(row.title,localMatching)));}
 const candidates=[],buckets=new Map(),passwords=new Map();
 for(const row of rows)for(const share of decodeLink(row.link)?.shares||[]){
  if(share.passcode){const key=share.provider+':'+share.shareId,set=passwords.get(key)||new Set();set.add(share.passcode);passwords.set(key,set);}
 }
 const collect=(batch,titles)=>{
  const start=candidates.length;
  for(const row of batch){const info=decodeLink(row.link);if(!info)continue;
   for(const share of info.shares||[]){
    const key=share.provider+':'+share.shareId,bucket=buckets.get(key)||[];
    const existing=bucket.find(c=>!c.shares[0].passcode||!share.passcode||c.shares[0].passcode===share.passcode);
    if(existing){if(!existing.shares[0].passcode&&share.passcode)existing.shares=[share];continue;}
    const candidate=Object.assign({},info,{shares:[share],cpB7MatchTitles:titles});bucket.push(candidate);buckets.set(key,bucket);candidates.push(candidate);
   }
  }
  // Access codes describe the same share regardless of the card's title.
  // Complete unambiguous codes before starting either batch's catalog reads.
  for(const candidate of candidates.slice(start)){
   const share=candidate.shares[0],codes=passwords.get(share.provider+':'+share.shareId);
   if(!share.passcode&&codes?.size===1)candidate.shares=[Object.assign({},share,{passcode:[...codes][0]})];
  }
  if(onCandidate)candidates.slice(start).forEach(onCandidate);
 };
 const readBatch=async(batch,titles)=>{
  if(typeof params.cpSiteRead!=='function')return collect(batch,titles);
  await readSiteCandidates(batch,{read:row=>cpSiteReadCandidate(row,params),ready:info=>collect([{link:encodeLink(info)}],titles),canRead:provider=>quanpanProviderEnabled(provider)&&(options.canRead?options.canRead(provider):candidates.filter(c=>c.shares[0]?.provider===provider).length<qpCandidateLimit()),check:()=>cpResourceCheck(cpResourceOwner),failed:()=>cpB12DiscoveryFailed()});
 };
 await cpB7SearchMatches(rows,Object.assign({},params,{alternativeTitles:cpRelevanceTitles(params).concat(options.titles||[])}),readBatch);qpCheck(params.signal);
 return candidates;
}
// Both adapters share relevance predicates; Quanpan retains one selected file per candidate.
function qpSelectVideo(files,params){
 if(params.type==="movie"){
  let largest=null;const titles=cpRelevanceTitles(params);
  for(const file of files)if(cpMovieVideoMatches(file,params,titles)&&(!largest||Number(file.size||0)>Number(largest.size||0)))largest=file;
  return largest;
 }
 return files.find(file=>cpEpisodeVideoMatches(file,params))||null;
}
function qpCandidateLimit(){const n=Number(cpSetting("maxShareCandidates","2"));return [1,2,3,5].includes(n)?n:2;}
function qpCandidateKey(share){return JSON.stringify([share.provider,share.shareId,share.passcode||""]);}
async function findEpisodeResource(params,linkInfo,onSource){
 if(params.type==="movie"&&cpRequestedYear(params).conflict)return null;
 const claimed=new Set(),counts=new Map(),sources=[],pending=[],shareChains=new Map(),resolveChains=new Map(),deadShares=new Set(),profile=cpActiveProfile||cpProfile,limit=qpCandidateLimit();
 if(params.refresh)cpCoverageClear();
 const indexKey=qpSeriesIndexKey(params,linkInfo),index=qpSeriesIndexRead(indexKey),generation=rexCacheGeneration;
 let failure=null,hadError=false,matched=0,unmatchedRows=[],coverageRows=index.cpQuotaRows,coverageMode=false;
 // Reuse already resolved site-share identities before calling a site's
 // credential endpoint again. The index key includes the website account.
 if(typeof params.cpSiteRead==='function'){
  const nativeRead=params.cpSiteRead;
  params=Object.assign({},params,{cpSiteRead:async(row,query)=>{
   const info=decodeLink(row.link),known=index.candidates.find(c=>!c.qpExpired&&c.id&&c.id===info?.id&&c.shares[0]?.provider===row.provider);
   return known||nativeRead(row,query);
  }});
 }
 const quota=cpSuccessQuota({counts,limit:()=>coverageMode?1:limit,blocked:p=>cpBlockedProviders.has(p),check:()=>cpCheck(profile),stopped:()=>!!failure,onVacancy:async provider=>{
  if(linkInfo?.action==='detail'){submit(linkInfo);return;}
  const rows=coverageRows||await search(Object.assign({},params,{keyword:qpCleanQuery(params.seriesName||params.title||params.name||params.keyword||''),page:1}));
  const canRead=p=>p===provider&&!cpBlockedProviders.has(p)&&(counts.get(p)||0)<(coverageMode?1:limit);
  await qpDiscoverCandidates(params,candidate=>{if(canRead(candidate.shares[0]?.provider))submit(candidate);},{rows,canRead});
 }});
 const submit=(candidate,cached,remember=true)=>{
  const candidateParams=Object.assign({},cpSiteCandidateParams(params,candidate),{cpFileContextTitle:candidate.title});
  for(const share of candidate.shares||[]){
   const key=qpCandidateKey(share),shareKey=JSON.stringify([share.provider,share.shareId]);
   if(!quanpanProviderEnabled(share.provider)||candidate.qpExpired||quota.has(key))continue;
   quota.offer(share.provider,key,async()=>{
   if(deadShares.has(shareKey))return "skip";
   cpCoverageEnsure(candidateParams,share,candidate.cpB7MatchTitles);
   claimed.add(key);const ordinal=quota.successes(share.provider)+1;
   const descriptor=remember?Object.assign({},candidate,{shares:[share]}):candidate;
   if(remember)index.candidates.push(descriptor);
   let accessShare=share;const order=pending.length,prior=shareChains.get(shareKey)||Promise.resolve();
   const task=prior.then(async()=>{
    cpCheck(profile);
    if(descriptor.qpExpired||deadShares.has(shareKey))return;
    const {checked,catalog:preparedCatalog}=await cpB8CheckedCatalog(share,cached||index.entries[key]?.catalog,candidate.site||getSite(),params.seriesName||params.title||params.name||params.keyword||"",candidateParams,descriptor.cpB7MatchTitles);accessShare=checked;cpCheck(profile);
    if(["bad","invalid","expired"].includes(checked.validity)){
     descriptor.qpExpired=true;deadShares.add(shareKey);delete index.entries[key];qpInvalidateShareCatalog(accessShare);return;
    }
    const catalog=preparedCatalog;cpCheck(profile);
    index.entries[key]={catalog};
    const video=await cpB7SelectVideo(catalog.list||[],cpFileCatalogParams(Object.assign({},candidateParams,{cpFileContextTitle:descriptor.title}),catalog.list||[]),descriptor.cpB7MatchTitles);cpCheck(profile);if(!video)return;matched++;
    const source={action:"play",provider:checked.provider,lineName:providerName(checked.provider)+"#"+ordinal,channelUsername:"",channelDisplayName:"",
     qpCandidateOrder:order,packageSizeScope:catalog.cpTargetDirectory&&!catalog.cpTargetDirectory.completeShare?'directory':'share',packageSizeBytes:Number(catalog.packageSizeBytes||0),videoInfo:video,title:formatVideoName(video.file_name,video.size),qpFreshCatalog:(catalog.cpTargetDirectory?catalog!==cached:!cached)&&qpOperation?.catalogReads?.has(qpShareCatalogKey(checked))===true};
    // Catalogs overlap; playback work on the same drive retains its serialized owner.
    const resolutionKey=['quark','uc','baidu','115','tianyi','yidong'].includes(checked.provider)?shareKey:checked.provider;
    const resolution=(resolveChains.get(resolutionKey)||Promise.resolve()).then(async()=>{
     cpCheck(profile);const outcome=onSource?await onSource(source):true;
     if(outcome===false||outcome==="expired"){
      if(outcome==="expired"){descriptor.qpExpired=true;deadShares.add(shareKey);}
      delete index.entries[key];qpInvalidateShareCatalog(accessShare);return;
     }
     cpCheck(profile);sources.push(source);
    });resolveChains.set(resolutionKey,resolution.catch(()=>{}));await resolution;
   }).catch(error=>{
    hadError=true;delete index.entries[key];qpInvalidateShareCatalog(accessShare);
    if(error?.code==="SHARE_EXPIRED"){descriptor.qpExpired=true;deadShares.add(shareKey);}
    if(/^QUANPAN_/.test(error?.code)||["ABORTED","ACCOUNT_CHANGED","OPERATION_TIMEOUT"].includes(error?.code))failure=failure||error;
   });
   shareChains.set(shareKey,task);pending.push(task);await task;
   return sources.some(source=>source.qpCandidateOrder===order);
   });
  }
 };
 try{
  if(index.candidates.length){for(const candidate of index.candidates)submit(candidate,index.entries[qpCandidateKey(candidate.shares[0])]?.catalog,false);}
  else if(linkInfo?.action==="detail")submit(linkInfo);
  else await qpDiscoverCandidates(params,candidate=>submit(candidate),{canRead:provider=>(counts.get(provider)||0)<limit,onRows:rows=>{unmatchedRows=rows;},onCoverageRows:rows=>{coverageRows=(coverageRows||[]).concat(rows);}});
  await quota.drain();await Promise.allSettled(pending);cpCheck(profile);if(failure)throw failure;
  for(let round=1;round<5&&!quota.failure();round++){
   quota.sync();const canRead=provider=>!cpBlockedProviders.has(provider)&&(counts.get(provider)||0)<limit;
   if(!['quark','uc','baidu','115','123','xunlei','guangya','yidong','tianyi'].some(p=>quanpanProviderEnabled(p)&&canRead(p)))break;
   const previous=claimed.size;
   try{
   if(linkInfo?.action==='detail')submit(linkInfo);
   else{
    const rows=coverageRows||await search(Object.assign({},params,{keyword:qpCleanQuery(params.seriesName||params.title||params.name||params.keyword||''),page:1}));
    await qpDiscoverCandidates(params,candidate=>submit(candidate),{rows,canRead});
   }
   await quota.drain();await Promise.allSettled(pending);cpCheck(profile);if(failure)throw failure;
   }catch(error){if(['ABORTED','ACCOUNT_CHANGED','OPERATION_TIMEOUT'].includes(error?.code))throw error;quota.stopDiscovery(error);break;}
   if(claimed.size===previous)break;
  }
  const cleanMiss=()=>!matched&&!hadError&&!deadShares.size&&cpB12CanSearch();
  if(!linkInfo&&cleanMiss()){
   let titles=cpB12LocalTitles(params);if(!cpB12Alternate(params,titles))titles=await cpB7TrustedTitles(params);cpCheck(profile);
   const alternate=cpB12Alternate(params,titles);
   if(alternate){
    quota.sync();
    if(unmatchedRows.length){await qpDiscoverCandidates(params,candidate=>submit(candidate),{rows:unmatchedRows,titles,canRead:provider=>(counts.get(provider)||0)<limit});await quota.drain();await Promise.allSettled(pending);cpCheck(profile);if(failure)throw failure;}
    if(cleanMiss()){quota.sync();await qpDiscoverCandidates(params,candidate=>submit(candidate),{keyword:alternate,titles,canRead:provider=>(counts.get(provider)||0)<limit,onCoverageRows:rows=>{coverageRows=(coverageRows||[]).concat(rows);}});await quota.drain();await Promise.allSettled(pending);cpCheck(profile);}
   }
  }
  if(!linkInfo&&cleanMiss()&&cpCoverageEligible(params)){
   if(params.refresh)cpCoverageClear();
   const rows=coverageRows||await search(Object.assign({},params,{keyword:qpCleanQuery(params.seriesName||params.title||params.name||params.keyword||''),page:1}));cpCheck(profile);
   if(typeof params.cpSiteRead==="function"){quota.sync();coverageMode=true;}
   const candidates=await cpCoverageCandidates(rows,params,row=>typeof params.cpSiteRead==='function'?cpSiteReadCandidate(row,params):Promise.resolve(decodeLink(row.link)),share=>claimed.has(qpCandidateKey(share)),typeof params.cpSiteRead==="function"?candidate=>submit(candidate):undefined);
   quota.sync();coverageMode=true;for(const candidate of candidates)submit(candidate);
   await quota.drain();await Promise.allSettled(pending);cpCheck(profile);if(failure)throw failure;
  }
 }catch(error){failure=failure||error;}
 finally{await quota.close();await Promise.allSettled(pending);}
 if(failure&&!(typeof params.cpSiteRead==="function"&&failure.code==="RATE_LIMITED"&&sources.length))throw failure;
 index.candidates=index.candidates.filter(c=>cpCoverageKeep(cpSiteCandidateParams(params,c),c.shares[0]));
 if(quota.failure()&&!sources.length)throw quota.failure();index.cpQuotaRows=coverageRows;qpSeriesIndexWrite(indexKey,index,generation);
 return sources.length?{action:"play",sources}:null;
}

// 对齐荐片返回的资源结构：各网盘独立 id/name/type，播放头保留。
function formatPlaybackResource(resource, source, params) {
  const provider = source.provider || "quark";
  const video = source.videoInfo || {};
  const channelName=source.channelDisplayName||source.channelUsername||"";
  const name=playbackLineName(provider);
  const title = params.seriesName || params.title || source.title || video.file_name || "木偶";
  const episode = params.episode ? ` 第${params.episode}集` : "";
  return Object.assign({}, resource, {
    id: ["tg", tgChannelIdentity(source), provider, video.shareId || "", video.fid || "", params.season || 1, params.episode || ""].map(part => encodeURIComponent(String(part))).join("_"),
    name,
    type: params.type === "movie" ? "movie" : "tv",
    description: `${title}${episode} [${name}]` + (resource.description ? ` · ${resource.description}` : "")
  });
}

async function httpJson(method, url, data, headers) { return await httpJsonCore(method, url, data, headers); }

async function baiduVerify(share) { return await cpQueueCatalogRead("baidu",()=>baiduVerifyCore(share)); }

const P115_UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 115Browser/36.0.0 Chromium/125.0";
function headers115(required=false){
  const cookie=normalizeCookie(safeStorageGet("juhe.baidu.115.cookie"));
  if(required&&!cookie)throw new Error("请在插件设置填写伍 Cookie");
  const headers={"User-Agent":P115_UA,Referer:"https://115.com/"};
  if(cookie)headers.Cookie=cookie;
  return headers;
}
async function get115Resource(info){
  const v=info.videoInfo||{},start=Date.now();

  try{
    
    const headers=headers115(true);
    if(!v.shareId||!v.fid)throw new Error("伍分享文件信息缺失");
    
    const encoded=p115Encrypt(JSON.stringify({share_code:v.shareId,receive_code:v.passcode||"",file_id:String(v.fid)}));
    const body=toQuery({data:encoded});
    
    const response=await cpHttpPost("https://proapi.115.com/app/share/downurl",body,{timeout:8000,headers:Object.assign({},headers,{"Content-Type":"application/x-www-form-urlencoded"})});
    const json=typeof response.data==="string"?JSON.parse(response.data):response.data;
    qpAssertShareResponse("https://proapi.115.com/app/share/downurl",json,Number(response.status||response.statusCode||0));
    
    if(!json||!json.state||typeof json.data!=="string"){
      const error=new Error("伍下载接口拒绝请求");error.code=json&&(json.errno||json.errcode);error.status=response.status;throw error;
    }
    
    const data=JSON.parse(p115Decrypt(json.data));
    const url=typeof data.url==="string"?data.url:data.url&&data.url.url;
    if(!/^https?:\/\//i.test(url||""))throw new Error("伍原画地址为空");
    const playHeaders={"User-Agent":P115_UA,Referer:"https://115.com/"};
    const auth=data.url&&data.url.auth_cookie||data.auth_cookie;
    if(auth&&auth.name&&auth.value)playHeaders.Cookie=auth.name+"="+auth.value;
    const resource={name:"伍",description:"原画",url,headers:playHeaders,customHeaders:Object.assign({},playHeaders)};
    
    return [resource];
  }catch(error){throw error;}
}

function combineSameTitleDetails(details){
  const items=[],seen=new Set();
  for(const detail of details)for(const episode of detail.episodeItems||[]){
    const info=decodeLink(episode.link);
    for(const source of info&&info.sources||[]){
      const v=source.videoInfo||{},key=tgSourceIdentity(source);if(seen.has(key))continue;seen.add(key);
      items.push({title:source.title||v.file_name,link:encodeLink(source)});
    }
  }
  return {episodeItems:groupEpisodeLines(items,"aggregate")};
}
function p115Utf8Encode(text){
  const encoded=encodeURIComponent(text),bytes=[];
  for(let i=0;i<encoded.length;i++){if(encoded[i]==="%"){bytes.push(parseInt(encoded.slice(i+1,i+3),16));i+=2;}else bytes.push(encoded.charCodeAt(i));}
  return new Uint8Array(bytes);
}
function p115Utf8Decode(bytes){return decodeURIComponent(Array.from(bytes,b=>"%"+b.toString(16).padStart(2,"0")).join(""));}
const P115_BASE64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function p115Base64Encode(bytes){
  let text="";for(let i=0;i<bytes.length;i+=3){const n=(bytes[i]<<16)|((bytes[i+1]||0)<<8)|(bytes[i+2]||0);
    text+=P115_BASE64[(n>>>18)&63]+P115_BASE64[(n>>>12)&63]+(i+1<bytes.length?P115_BASE64[(n>>>6)&63]:"=")+(i+2<bytes.length?P115_BASE64[n&63]:"=");}return text;
}
function p115Base64Decode(text){
  const clean=String(text).replace(/\s/g,"");if(!/^[A-Za-z0-9+/]*={0,2}$/.test(clean)||clean.length%4)throw new Error("伍加密响应Base64无效");
  const bytes=[];for(let i=0;i<clean.length;i+=4){const n=(P115_BASE64.indexOf(clean[i])<<18)|(P115_BASE64.indexOf(clean[i+1])<<12)|((P115_BASE64.indexOf(clean[i+2])&63)<<6)|(P115_BASE64.indexOf(clean[i+3])&63);
    bytes.push((n>>>16)&255);if(clean[i+2]!=="=")bytes.push((n>>>8)&255);if(clean[i+3]!=="=")bytes.push(n&255);}return new Uint8Array(bytes);
}

// 115 RSA/XOR 算法移植自用户指定猫源 util/115.js；移除 Node Buffer/TextEncoder 依赖。
const p115G_kts = new Uint8Array([
  0xf0, 0xe5, 0x69, 0xae, 0xbf, 0xdc, 0xbf, 0x8a,
  0x1a, 0x45, 0xe8, 0xbe, 0x7d, 0xa6, 0x73, 0xb8,
  0xde, 0x8f, 0xe7, 0xc4, 0x45, 0xda, 0x86, 0xc4,
  0x9b, 0x64, 0x8b, 0x14, 0x6a, 0xb4, 0xf1, 0xaa,
  0x38, 0x01, 0x35, 0x9e, 0x26, 0x69, 0x2c, 0x86,
  0x00, 0x6b, 0x4f, 0xa5, 0x36, 0x34, 0x62, 0xa6,
  0x2a, 0x96, 0x68, 0x18, 0xf2, 0x4a, 0xfd, 0xbd,
  0x6b, 0x97, 0x8f, 0x4d, 0x8f, 0x89, 0x13, 0xb7,
  0x6c, 0x8e, 0x93, 0xed, 0x0e, 0x0d, 0x48, 0x3e,
  0xd7, 0x2f, 0x88, 0xd8, 0xfe, 0xfe, 0x7e, 0x86,
  0x50, 0x95, 0x4f, 0xd1, 0xeb, 0x83, 0x26, 0x34,
  0xdb, 0x66, 0x7b, 0x9c, 0x7e, 0x9d, 0x7a, 0x81,
  0x32, 0xea, 0xb6, 0x33, 0xde, 0x3a, 0xa9, 0x59,
  0x34, 0x66, 0x3b, 0xaa, 0xba, 0x81, 0x60, 0x48,
  0xb9, 0xd5, 0x81, 0x9c, 0xf8, 0x6c, 0x84, 0x77,
  0xff, 0x54, 0x78, 0x26, 0x5f, 0xbe, 0xe8, 0x1e,
  0x36, 0x9f, 0x34, 0x80, 0x5c, 0x45, 0x2c, 0x9b,
  0x76, 0xd5, 0x1b, 0x8f, 0xcc, 0xc3, 0xb8, 0xf5,
]);
const p115RSA_e = 0x8686980c0f5a24c4b9d43020cd2c22703ff3f450756529058b1cf88f09b8602136477198a6e2683149659bd122c33592fdb5ad47944ad1ea4d36c6b172aad6338c3bb6ac6227502d010993ac967d1aef00f0c8e038de2e4d3bc2ec368af2e9f10a6f1eda4f7262f136420c07c331b871bf139f74f3010e3c4fe57df3afb71683n;
const p115RSA_n = 0x10001n;

function p115ToBytes(value, length) {
  if (length == undefined)
    length = Math.ceil(value.toString(16).length / 2);
  const buffer = new Uint8Array(length);
  for (let i = length - 1; i >= 0; i--) {
    buffer[i] = Number(value & 0xffn);
    value >>= 8n;
  }
  return buffer;
}

function p115FromBytes(bytes) {
  let intVal = 0n;
  for (const b of bytes)
    intVal = (intVal << 8n) | BigInt(b);
  return intVal;
}

function* p115AccStep(start, stop, step = 1) {
  for (let i = start + step; i < stop; i += step) {
    yield [start, i, step];
    start = i;
  }
  if (start !== stop)
    yield [start, stop, stop - start];
}

function p115BytesXor(v1, v2) {
  const result = new Uint8Array(v1.length);
  for (let i = 0; i < v1.length; i++)
    result[i] = v1[i] ^ v2[i];
  return result;
}

function p115GenKey(randKey, skLen) {
  const xorKey = new Uint8Array(skLen);
  let length = skLen * (skLen - 1);
  let index = 0;
  for (let i = 0; i < skLen; i++) {
    const x = (randKey[i] + p115G_kts[index]) & 0xff;
    xorKey[i] = p115G_kts[length] ^ x;
    length -= skLen;
    index += skLen;
  }
  return xorKey;
}

function p115PadPkcs1V1_5(message) {
  const msg_len = message.length
  const buffer = new Uint8Array(128);
  buffer.fill(0x02, 1, 127 - msg_len);
  buffer.set(message, 128 - msg_len);
  return p115FromBytes(buffer);
}

function p115Xor(src, key) {
  const buffer = new Uint8Array(src.length);
  const i = src.length & 0b11;
  if (i)
    buffer.set(p115BytesXor(src.subarray(0, i), key.subarray(0, i)));
  for (const [j, k] of p115AccStep(i, src.length, key.length))
    buffer.set(p115BytesXor(src.subarray(j, k), key), j);
  return buffer;
}

function p115Pow(base, exponent, modulus) {
  if (modulus === 1n)
    return 0n;
  let result = 1n;
  base %= modulus;
  while (exponent) {
    if (exponent & 1n)
      result = (result * base) % modulus;
    exponent = exponent >> 1n;
    base = (base * base) % modulus;
  }
  return result;
}

function p115Encrypt(data) {
  if (typeof data === "string" || data instanceof String)
    data = p115Utf8Encode(data);
  const xorText = new Uint8Array(16 + data.length);
  xorText.set(p115Xor(
    p115Xor(data, new Uint8Array([0x8d, 0xa5, 0xa5, 0x8d])).reverse(),
    new Uint8Array([0x78, 0x06, 0xad, 0x4c, 0x33, 0x86, 0x5d, 0x18, 0x4c, 0x01, 0x3f, 0x46])
  ), 16);
  const cipherData = new Uint8Array(Math.ceil(xorText.length / 117) * 128);
  let start = 0;
  for (const [l, r] of p115AccStep(0, xorText.length, 117))
    cipherData.set(p115ToBytes(p115Pow(p115PadPkcs1V1_5(xorText.subarray(l, r)), p115RSA_n, p115RSA_e), 128), start, start += 128);
  return p115Base64Encode(cipherData);
}

function p115Decrypt(cipherData) {
  const cipher_data = p115Base64Decode(cipherData);
  let data = [];
  for (const [l, r] of p115AccStep(0, cipher_data.length, 128)) {
    const p = p115Pow(p115FromBytes(cipher_data.subarray(l, r)), p115RSA_n, p115RSA_e);
    const b = p115ToBytes(p);
    data.push(...b.subarray(b.indexOf(0) + 1));
  }
  data = new Uint8Array(data);
  const keyL = p115GenKey(data.subarray(0, 16), 12);
  const tmp = p115Xor(data.subarray(16), keyL).reverse();
  return p115Utf8Decode(p115Xor(tmp, new Uint8Array([0x8d, 0xa5, 0xa5, 0x8d])));
}


// 搜索结果标题包含年份、清晰度、更新状态等；仅用于匹配，不修改展示原文。
function normalizeQuanpanTitle(value) {
  let title=String(value||"").trim();
  title=title.replace(/^(?:名称|片名)\s*[:：]\s*/,"");
  // 有明确年份时，只取年份之前的片名，兼容 (2026)、（2026）及独立年份。
  title=title.replace(/\s*[（(]\s*(?:19|20)\d{2}\s*[）)][\s\S]*$/,"");
  title=title.replace(/\s+(?:19|20)\d{2}(?=\s|$)[\s\S]*$/,"");
  // 无年份时，删除明确的资源状态；保留片名本身中的数字和括号。
  title=title.replace(/\s*(?:更新至|更至|更新到|全\s*\d+\s*[集期]|完结|已完结)[\s\S]*$/,"");
  title=title.replace(/\s+(?:4K|8K|1080[Pp]|2160[Pp]|720[Pp]|HDR|杜比|蓝光)(?=\s|$)[\s\S]*$/i,"");
  title=title.replace(/\s*\[[^\]]*\]\s*$/,"");
  title=title.replace(/\s*(?:第\s*[一二三四五六七八九十百\d]+\s*季|season\s*\d+)\s*$/i,"");
  return title.replace(/[\s·:：._\-]/g,"").toLowerCase();
}

const rexMemoryCache=new Map(),rexPending=new Map();
let rexCacheGeneration=0;
function rexClone(value){return JSON.parse(JSON.stringify(value));}
async function rexCached(key,ttl,loader,accept) {
  const hash=baiduSha1(key),storageKey="juhe.baidu.catalog."+hash;
  let entry=rexMemoryCache.get(hash);
  if(!entry){try{entry=JSON.parse(safeStorageGet(storageKey)||"null");}catch(_){}}
  if(entry&&entry.expires>Date.now())return rexClone(entry.value);
  if(rexPending.has(hash))return rexClone(await rexPending.get(hash));
  const generation=rexCacheGeneration;
  const pending=(async()=>{
    const value=await loader();
    if(generation===rexCacheGeneration&&accept(value)){
      const entry={expires:Date.now()+ttl,value:rexClone(value)};
      rexMemoryCache.set(hash,entry);
      while(rexMemoryCache.size>32)rexMemoryCache.delete(rexMemoryCache.keys().next().value);
      let keys=[];try{keys=JSON.parse(safeStorageGet("juhe.baidu.catalog.keys")||"[]");}catch(_){}
      keys=keys.filter(k=>k!==hash);keys.push(hash);
      while(keys.length>16)safeStorageSet("juhe.baidu.catalog."+keys.shift(),"");
      safeStorageSet(storageKey,JSON.stringify(entry));safeStorageSet("juhe.baidu.catalog.keys",JSON.stringify(keys));
    }
    return value;
  })();rexPending.set(hash,pending);
  try{return rexClone(await pending);}finally{if(rexPending.get(hash)===pending)rexPending.delete(hash);}
}
async function httpText(url,options) {
  rexAssertWithinUsagePeriod();
  return rexCached("page:"+url,120000,()=>httpTextFresh(url,options),html=>typeof html==="string"&&html.length>1000&&!/页面不存在|>404</.test(html));
}
function qpShareCatalogKey(share){
  const cookie=share.provider==="baidu"?safeStorageGet("juhe.baidu.baidu.cookie"):
    share.provider==="115"?safeStorageGet("juhe.baidu.115.cookie"):share.provider==="quark"?ensureCookie():"";
  return [share.provider==="quark"?"share-video-v3":"share-package-v2",share.provider,share.shareId,share.passcode||"",baiduSha1(String(cookie||""))].join(":");
}
function qpInvalidateShareCatalog(share){
  const hash=baiduSha1(qpShareCatalogKey(share));rexMemoryCache.delete(hash);safeStorageSet("juhe.baidu.catalog."+hash,"");
}
async function rexShareCatalog(share) {
  const key=qpShareCatalogKey(share);
  return rexCached(key,180000,()=>{
    qpOperation?.catalogReads?.add(key);
    return share.provider==="123"?getPan123Videos(share):share.provider==="uc"?getUcVideos(share):share.provider==="115"?get115Videos(share):share.provider==="baidu"?getBaiduVideos(share):getVideosFromShareLink(share.url,share.passcode);
  },result=>!!(result&&result.list&&result.list.length));
}
async function clearRexCatalogCache() {
  rexCacheGeneration++;rexMemoryCache.clear();rexPending.clear();
  qpClearSeriesIndexes();
  let keys=[];try{keys=JSON.parse(safeStorageGet("juhe.baidu.catalog.keys")||"[]");}catch(_){}
  keys.forEach(key=>safeStorageSet("juhe.baidu.catalog."+key,""));safeStorageSet("juhe.baidu.catalog.keys","[]");
  return [{id:"tg-cache-cleared",type:"url",title:"目录缓存已清除",description:"重新打开详情即可获取最新集数。"}];
}

function quanpanProviderEnabled(provider) {
  if(!cpDriveEnabled(provider))return false; return ["quark","baidu","uc","115","123"].includes(provider); }


const PAN123_HEADERS={
  "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  platform:"android","app-version":"3",Referer:"https://www.123pan.cn/",Origin:"https://www.123pan.cn"
};
function pan123RawUrl(url) {
  return String(url||"").replace("_24_24","")
    .replace("&cache_type=1&w=24&h=24&trade_key=123pan-thumbnail&type=video","")
    .replace("?cache_type=1&w=24&h=24&trade_key=123pan-thumbnail&type=video","");
}
function pan123RedirectUrl(location,base) {
  if(/^https?:\/\//i.test(location))return location;
  const match=base.match(/^(https?:)\/\/([^/]+)([^?#]*)/);if(!match)throw new Error("123重定向地址无效");
  if(location.startsWith("//"))return match[1]+location;
  if(location.startsWith("?"))return match[1]+"//"+match[2]+(match[3]||"/")+location;
  const path=location.startsWith("/")?location:(match[3]||"/").replace(/[^/]*$/,"")+location;
  return match[1]+"//"+match[2]+path;
}
async function getPan123Resource(info) {
  const profile=cpActiveProfile||cpProfile;cpCheck(profile);
  let video=info.videoInfo||{};
  if(!video.downloadUrl){const fresh=await getPan123Videos({shareId:video.shareId,passcode:video.passcode},video.parentId!=null?video:null);video=fresh.list.find(item=>String(item.fid)===String(video.fid));}
  const raw=pan123RawUrl(video&&video.downloadUrl);if(!/^https?:\/\//i.test(raw))throw new Error("123分享未提供免登录地址");
  let url=raw;const visited=new Set();
  // 与猫源相同：小范围读取用于跟随跳转，失败时仍返回原始免登地址，不走登录接口。
  try{
    for(let i=0;i<5;i++){
      cpCheck(profile);if(visited.has(url))throw new Error("123 redirect cycle");visited.add(url);
      const response=await cpHttpGet(url,{timeout:10000,allow_redirects:false,headers:{"User-Agent":PAN123_HEADERS["User-Agent"],Referer:PAN123_HEADERS.Referer,Range:"bytes=0-0"}});
      cpCheck(profile);
      const status=Number(response.status||response.statusCode||200);
      if(status>=200&&status<300)break;
      if(status<300||status>=400)throw new Error("123直链读取失败");
      const headers=response.headers||{},key=Object.keys(headers).find(k=>k.toLowerCase()==="location");if(!key)break;
      url=pan123RedirectUrl(String(headers[key]),url);
    }
  }catch(_){cpCheck(profile);url=raw;}
  const headers={"User-Agent":PAN123_HEADERS["User-Agent"],Referer:PAN123_HEADERS.Referer};
  return [{name:"123",description:"免登录 · 原画",url,customHeaders:headers,headers:Object.assign({},headers)}];
}



function rexAssertWithinUsagePeriod(){}

function tgChannelIdentity(source) {
  return source.channelUsername ? String(source.channelUsername).replace(/^@/,"").trim().toLowerCase() : String(source.channelDisplayName||"").trim();
}
function tgSourceIdentity(source) {
  const video=source.videoInfo||{};
  return JSON.stringify([tgChannelIdentity(source),source.provider||"quark",String(video.shareId||""),String(video.fid||video.file_name||"")]);
}

// 夸克在API响应中轮换__puus；播放地址必须使用更新后的登录Cookie。
function syncQuarkPlaybackCookie(url,response) {
  if(!/^https:\/\/drive(?:-[a-z]+)?\.quark\.cn\//i.test(String(url||"")))return;
  const headers=response&&response.headers||{};
  const key=Object.keys(headers).find(name=>name.toLowerCase()==="set-cookie");
  if(!key)return;
  const lines=Array.isArray(headers[key])?headers[key].join(";"):String(headers[key]||"");
  const match=lines.match(/(?:^|[;,]\s*)__puus=([^;,\s]+)/);
  if(!match)return;
  const cookie=ensureCookie();if(!cookie)return;
  const old=cookie.match(/(?:^|;)\s*__puus=([^;]+)/);if(old&&old[1]===match[1])return;
  CURRENT_COOKIE=cookie.split(";").map(part=>part.trim()).filter(part=>part&&!/^__puus\s*=/.test(part)).concat("__puus="+match[1]).join("; ");
  safeStorageSet(STORAGE_COOKIE_KEY,CURRENT_COOKIE);
}

WidgetMetadata.globalParams=WidgetMetadata.globalParams.concat([{"name": "credentialSource", "title": "网盘账号来源", "type": "enumeration", "value": "shared", "enumOptions": [{"title": "默认共用（本模块非空 Cookie 优先）", "value": "shared"}, {"title": "仅本模块", "value": "local"}]}, {"name": "subtitles", "title": "同版本外挂字幕", "type": "enumeration", "value": "auto", "enumOptions": [{"title": "自动（最多 3 条）", "value": "auto"}, {"title": "关闭", "value": "off"}]}]);
// Visible wording follows the earlier secondary-development edition; parameter identities stay native.
WidgetMetadata.globalParams.forEach(function(param){
 const titles={"quarkCookie": "夸克 Cookie（非空优先，留空继承共用）", "baiduCookie": "百度 Cookie（非空优先，留空继承共用）", "cookie115": "115 Cookie（非空优先，留空继承共用）", "woniuCookie": "蜗牛站点 Cookie", "channels": "TG 频道用户名（逗号分隔）", "resultCount": "每个频道搜索结果数", "showPictures": "显示搜索封面"};
 if(titles[param.name])param.title=titles[param.name];
 if(WidgetMetadata.id==="catpaw.upstream-enhanced.tgsou"&&param.name==="site")param.title="TG 搜索接口地址（必填）";
 if(param.name==="resultCount")param.enumOptions.forEach(function(option){option.title=option.value+" 条";});
 if(["quarkCookie","baiduCookie","cookie115"].includes(param.name))(param.placeholders||[]).forEach(function(item){item.title=item.title.replace(/垮/g,"夸克").replace(/佰/g,"百度").replace(/伍/g,"115");});
});

// 原版内增强：完整代码保留在本模块。未替换原版搜索、目录和整剧缓存实现。
const CP_PREFIX="enhanced:"+WidgetMetadata.id+":";
const CP_COOKIE_ROOT=STORAGE_COOKIE_KEY.replace(/quark\.cookie$/,""),CP_FIELDS=["quarkCookie","baiduCookie","cookie115","xunleiAuth","guangyaAuth","tianyiCookie"];
const cpNativeBind=bindForwardParams,cpNativeFormat=formatPlaybackResource,cpNativeResolve=resolvePlaySource;
const cpNativeJson=httpJson,cpNativeEpisode=episodeIdentity;
let cpSaveNative=saveShareFile;
let cpNativeFind=findEpisodeResource,cpProfile="",cpActiveProfile="",cpDeadline=Infinity,cpSignal=null;
const cpFlights=new Map(),cpBlockedProviders=new Set();
function cpRead(key){try{if(key.startsWith("transfer:")&&Widget.sharedCache){const raw=Widget.sharedCache.get("catpaw.upstream-enhanced.transfers.v1",key);if(raw){const v=JSON.parse(raw);if(v===null||["succeeded","known","uncertain","failed","preparing"].includes(v.state))return v;}}return JSON.parse(safeStorageGet(CP_PREFIX+key)||"null");}catch(_){return null;}}
function cpWrite(key,value){const raw=JSON.stringify(value);safeStorageSet(CP_PREFIX+key,raw);if(key.startsWith("transfer:")){try{if(Widget.sharedCache)Widget.sharedCache.set("catpaw.upstream-enhanced.transfers.v1",key,raw);}catch(_){}}}
function cpSetting(key,fallback){if(key==="indexTimeoutSeconds"){const value=cpShared().indexTimeoutSeconds;return typeof value==="string"&&/^(?:[5-9]|[12]\d|30)$/.test(value)?value:"10";}if(key==="maxShareCandidates"){const value=cpShared().maxShareCandidates;return ["1","2","3","5"].includes(value)?value:"2";}if(key==="quality"){const quality=cpShared().quarkQuality;return ["auto","origin","transcode"].includes(quality)?quality:"auto";}const value=cpRead("setting:"+key);return value==null?fallback:value;}
function cpError(code){const e=new Error({ACCOUNT_CHANGED:"账号已更换，请重新加载",ABORTED:"操作已取消",OPERATION_TIMEOUT:"请求超时",AUTH_FAILED:"网盘登录失效",RATE_LIMITED:"网盘请求受限",ORIGIN_ACCESS_DENIED:"原画受网盘权限或大小限制",QUALITY_UNAVAILABLE:"所选画质不可用",FILE_NOT_FOUND:"所选文件不存在，请刷新详情",TRANSFER_UNCERTAIN:"转存回执未确认，请检查网盘后重试",SHARE_EXPIRED:"分享已失效或过期",UPSTREAM_ERROR:"网盘请求失败"}[code]||"资源请求失败");e.code=code;return e;}
function cpShared(){try{const raw=Widget.sharedCache&&Widget.sharedCache.get("catpaw.drive-accounts.v1","credentials");if(typeof raw!=="string")return {};const v=JSON.parse(raw);return v.schemaVersion===1&&Number.isSafeInteger(v.revision)&&v.revision>0&&CP_FIELDS.every((k,i)=>(i>=3&&v[k]===undefined)||typeof v[k]==="string"&&!/[\x00-\x1f\x7f]/.test(v[k]))?Object.assign({xunleiAuth:"",guangyaAuth:"",tianyiCookie:""},v):{};}catch(_){return {};}}
function cpAccounts(){
 const shared=cpSetting("credentialSource","shared")==="local"?{}:cpShared();
 return CP_FIELDS.map(k=>String(cpRead("local:"+k)||shared[k]||"").trim());
}
function cpCheck(profile){if(cpSignal&&cpSignal.aborted)throw cpError("ABORTED");if(profile&&profile!==baiduSha1(JSON.stringify(cpAccounts())))throw cpError("ACCOUNT_CHANGED");if(Date.now()>=cpDeadline)throw cpError("OPERATION_TIMEOUT");}
bindForwardParams=function(params={}){
 params=cpXunleiCredentialParams(cpGuangyaCredentialParams(params));
 if(!cpRead("local-initialized")){
  [STORAGE_COOKIE_KEY,CP_COOKIE_ROOT+"baidu.cookie",CP_COOKIE_ROOT+"115.cookie",CP_COOKIE_ROOT+"xunlei.auth",CP_COOKIE_ROOT+"guangya.auth",CP_COOKIE_ROOT+"tianyi.cookie"].forEach((k,i)=>cpWrite("local:"+CP_FIELDS[i],String(safeStorageGet(k)||"")));
  cpWrite("local-initialized",true);
 }
 for(const key of ["credentialSource","subtitles"]){if(Object.prototype.hasOwnProperty.call(params,key))cpWrite("setting:"+key,String(params[key]));}
 if(typeof params.xunleiAuth==='string'&&params.xunleiAuth.trim()&&!params.xunleiAuth.trim().startsWith('{')&&!/^(?:Bearer\s+)?[A-Za-z0-9._~+/-]+=*$/i.test(params.xunleiAuth.trim()))throw cpError("AUTH_FAILED");
 for(const key of CP_FIELDS)if(Object.prototype.hasOwnProperty.call(params,key)){if(typeof params[key]!=="string"||/[\x00-\x1f\x7f]/.test(params[key]))throw cpError("AUTH_FAILED");cpWrite("local:"+key,params[key].trim());}
 if(!Object.prototype.hasOwnProperty.call(params,"quarkCookie")&&(params.cookie||params.quarkck))cpWrite("local:quarkCookie",normalizeCookie(params.cookie||params.quarkck));
 const accounts=cpAccounts(),profile=baiduSha1(JSON.stringify(accounts));
 const session=cpRead("session:"+profile),quark=session&&session.cookie||accounts[0];
 cpProfile=profile;
 const result=cpNativeBind(Object.assign({},params,{quarkCookie:quark,baiduCookie:accounts[1],cookie115:accounts[2]}));
 // 登录配置身份保持稳定；__puus轮换只更新会话，不使原版整剧缓存失效。
 safeStorageSet(STORAGE_COOKIE_KEY.replace(/cookie$/,"configHash"),baiduSha1(normalizeCookie(accounts[0])));return result;
};

// Shared switches apply independently of the module's credential source.
function cpDriveEnabled(provider){
 const fields={quark:"driveQuarkEnabled",baidu:"driveBaiduEnabled",uc:"driveUcEnabled","115":"drive115Enabled","123":"drive123Enabled",xunlei:"driveXunleiEnabled",guangya:"driveGuangyaEnabled",yidong:"driveYidongEnabled",tianyi:"driveTianyiEnabled"};
 const value=cpShared()[fields[provider]];
 return ["xunlei","guangya","yidong","tianyi"].includes(provider)?value==="enabled":value!=="disabled";
}
function cpSize(value){const n=Number(value);return n>0?(n>=1073741824?(n/1073741824).toFixed(2)+" GB":(n/1048576).toFixed(1)+" MB"):"";}
// Filename hints describe labels supplied by the publisher, never a probed
// stream or a list of real cpMedia_audio tracks. Contradictory cpMedia_scalar labels are unknown.
const cpMedia_boundary = pattern => new RegExp(`(?:^|[^\\p{L}\\p{N}])(?:${pattern})(?=$|[^\\p{L}\\p{N}])`, 'iu');
const cpMedia_video = [ ['H.264', 'h[ ._-]?264|x264|avc'], ['H.265', 'h[ ._-]?265|x265|hevc'], ['AV1','av1'], ['VP9','vp9'] ];
const cpMedia_range = [['SDR','sdr'], ['HDR10+', 'hdr10\\+'], ['HDR10','hdr10(?!\\+)'], ['Dolby Vision','dolby[ ._-]?vision|dovi|dv']];
const cpMedia_audio = [['AAC','aac'], ['AC3','(?<!e[ ._-])ac[ ._-]?3'], ['EAC3','e[ ._-]?ac[ ._-]?3|ddp|dd\\+'], ['TrueHD','true[ ._-]?hd'], ['DTS-HD','dts[ ._-]?hd(?:[ ._-]?ma)?'], ['DTS','dts(?![ ._-]?hd)']];
const cpMedia_depths = [[8,'8[ ._-]?bit'], [10,'10[ ._-]?bit'], [12,'12[ ._-]?bit']];
const cpMedia_channels = [['7.1.4','7\\.1\\.4'], ['5.1.2','5\\.1\\.2'], ['2.0','2\\.0|2[ ._-]?ch'], ['5.1','5\\.1|6[ ._-]?ch'], ['7.1','7\\.1|8[ ._-]?ch'], ['1.0','1\\.0|mono|1[ ._-]?ch']].map(([value, pattern]) => [value, `(?<!\\d\\.)(?:${pattern})(?!\\.\\d)`]);
const cpMedia_languages = [['zh','国语|国語|普通话|普通話|mandarin|zh|zho|chi'], ['en','英语|英語|英文|english|eng|en'], ['yue','粤语|粵語|cantonese|yue'], ['ja','日语|日語|日文|japanese|jpn|ja'], ['ko','韩语|韓語|korean|kor|ko'], ['fr','法语|法語|french|fra|fre'], ['de','德语|德語|german|deu|ger'], ['es','西班牙语|spanish|spa']];
// Release names commonly attach a depth or channel count to a codec token.
// Split only known complete combinations, never arbitrary numeric suffixes.
function cpMedia_releaseText(value) {
  return value.replace(/(^|[^\p{L}\p{N}])(hevc|avc|h[ ._-]?26[45]|x26[45])(?=(?:8|10|12)[ ._-]?bit(?:$|[^\p{L}\p{N}]))/giu, '$1$2 ')
    .replace(/(^|[^\p{L}\p{N}])(ddp|dd\+|aac|e[ ._-]?ac[ ._-]?3|ac[ ._-]?3|true[ ._-]?hd|dts[ ._-]?hd|dts)(?=(?:2\.0|5\.1|7\.1)(?:$|[^\p{L}\p{N}]))/giu, '$1$2 ');
}
function cpMedia_scalar(text, definitions) {
  const values = definitions.filter(([,pattern]) => cpMedia_boundary(pattern).test(text)).map(([value]) => value);
  return values.length === 1 ? values[0] : null;
}
function cpMediaInfo(filename) {
  const text = cpMedia_releaseText(typeof filename === 'string' ? filename : '');
  return {
    videoCodec: cpMedia_scalar(text, cpMedia_video), dynamicRange: cpMedia_scalar(text, cpMedia_range), bitDepth: cpMedia_scalar(text, cpMedia_depths),
    audioCodec: cpMedia_scalar(text, cpMedia_audio), audioChannels: cpMedia_scalar(text, cpMedia_channels), atmos: cpMedia_boundary('atmos').test(text),
    languageHints: cpMedia_languages.filter(([,pattern]) => cpMedia_boundary(pattern).test(text)).map(([value]) => value),
  };
}
function cpResolutionInfo(value) {
  const found = new Set(), aliases = { '8k':'4320p', '4k':'2160p', uhd:'2160p', '2k':'1440p' };
  // Underscores and Chinese titles commonly touch resolution labels. Require
  // ASCII token boundaries so 18K and 8Kbps cannot become resolution hints.
  const pattern = /(?:^|[^a-z0-9])((?:4320|2160|1440|1080|720|576|540|480|360)[pi]|[248]k|uhd|\d{3,5}\s*[x×]\s*(?:4320|2160|1440|1080|720|576|540|480|360))(?=$|[^a-z0-9])/gi;
  for (const match of String(value || '').matchAll(pattern)) {
    const label = match[1].toLowerCase();
    found.add(aliases[label] || (/[x×]/.test(label) ? label.split(/[x×]/)[1].trim()+'p' : label.replace(/i$/, 'p')));
  }
  return {present:found.size>0, value:found.size===1?[...found][0]:null};
}
function cpOriginResolution(resource, video) {
  // These are original video dimensions. video_max_resolution is a service's
  // transcode ceiling and must never describe the original file.
  const w = Number(video.video_width), h = Number(video.video_height);
  if (Number.isSafeInteger(w) && Number.isSafeInteger(h) && w > 0 && h > 0 && w <= 32768 && h <= 32768) {
    const wide=Math.max(w,h), short=Math.min(w,h);
    // Use both axes for cropped widescreen releases and rotated videos.
    for (const [height,width] of [[4320,7680],[2160,3840],[1440,2560],[1080,1920],[720,1280],[576,1024],[540,960],[480,854],[360,640]]) {
      if (wide>=width || short>=height) return height+'p';
    }
  }
  for (const value of [resource.resolution, video.file_name, resource.description]) {
    const hint=cpResolutionInfo(value);
    if (hint.present) return hint.value;
  }
  return null;
}
function cpMedia(name,resolution=cpResolutionInfo(name).value){const info=cpMediaInfo(name),labels=[resolution,info.videoCodec,info.dynamicRange,info.bitDepth?info.bitDepth+"bit":null,info.audioCodec,info.audioChannels,info.atmos?"Atmos":null,info.languageHints.length?"语言标签: "+info.languageHints.join("/"):null].filter(Boolean);return labels;}
// Quanpan discovers shares in JSON. Slots belong to native catalog requests,
// never the lifetime of a recursive share or a whole provider.
const qpCatalogWaiting=[],qpCatalogRunning=new Map();let qpCatalogActive=0;
function qpPumpCatalog(){
 for(let i=0;i<qpCatalogWaiting.length&&qpCatalogActive<4;){
  const job=qpCatalogWaiting[i],count=qpCatalogRunning.get(job.provider)||0;
  if(count>=2){i++;continue;}
  qpCatalogWaiting.splice(i,1);qpCatalogActive++;qpCatalogRunning.set(job.provider,count+1);
  Promise.resolve().then(()=>{cpCheck(job.profile);return job.work();}).then(v=>{cpCheck(job.profile);return v;})
   .then(job.resolve,job.reject).finally(()=>{qpCatalogActive--;const left=(qpCatalogRunning.get(job.provider)||1)-1;if(left)qpCatalogRunning.set(job.provider,left);else qpCatalogRunning.delete(job.provider);qpPumpCatalog();});
 }
}
function cpQueueCatalogRead(provider,work){
 const profile=cpActiveProfile||cpProfile;
 return new Promise((resolve,reject)=>{qpCatalogWaiting.push({provider,profile,work,resolve,reject});qpPumpCatalog();});
}
function cpQueueCatalogShare(provider,work){const profile=cpActiveProfile||cpProfile;return Promise.resolve().then(()=>{cpCheck(profile);return work();}).then(v=>{cpCheck(profile);return v;});}
function cpPrimeCatalogs(shares,read){return new Map(shares.map(share=>[share,cpQueueCatalogShare(share.provider||'quark',()=>read(share)).then(value=>({ok:true,value}),error=>({ok:false,error}))]));}
function cpCatalogTotal(data,json){
 for(const value of [data?.total,data?._total,data?.total_count,data?.metadata?._total,json?.metadata?._total])if(value!=null&&value!==''&&Number.isFinite(Number(value))&&Number(value)>=0)return Number(value);
 return null;
}
function cpCatalogPageEnd(items,total,received,seen,key,scanned){
 if(!items.length){if(total!==null&&(scanned??seen.size)<total)throw cpError('UPSTREAM_ERROR');return true;}
 let added=0;for(const item of items){const id=String(key(item));if(!seen.has(id)){seen.add(id);added++;}}
 if(!added)throw cpError('UPSTREAM_ERROR');
 return total!==null&&(scanned??seen.size)>=total;
}
async function qpCatalogPages(provider,read,size,key,readSchedulesRequests=false,onPage,readToken){
 const rows=[],seen=new Set();let next=0,scanned=0,hasNativeCount=false;
 const pending=new Map();let parallelTotal=null,lastPage=0,scheduled=1,pageFailure;
 const request=(page,cursor)=>Promise.resolve().then(()=>{const run=()=>{if(pageFailure)throw pageFailure;return read(page,cursor);};return readSchedulesRequests?run():cpTargetQueue(readToken,provider,run);}).then(value=>({value}),error=>{pageFailure=pageFailure||error;return {error};});
 try{for(let page=1;;page++){
  const outcome=await (pending.get(page)||request(page,next));pending.delete(page);
  if(pageFailure)throw pageFailure;const value=outcome.value;
  if(!value||!Array.isArray(value.items))throw cpError('UPSTREAM_ERROR');
  const total=value.total==null?null:Number(value.total);
  if(total!==null&&(!Number.isFinite(total)||total<0))throw cpError('UPSTREAM_ERROR');
  // UC may filter rows after pagination: 98 visible items can consume 100 slots.
  const count=value.count==null?value.items.length:Number(value.count);
  if(!Number.isInteger(count)||count<value.items.length)throw cpError('UPSTREAM_ERROR');
  if(parallelTotal!==null&&(total!==parallelTotal||count!==Math.min(size,parallelTotal-(page-1)*size)))throw cpError('UPSTREAM_ERROR');
  hasNativeCount=hasNativeCount||value.count!=null;scanned+=count;
  const consumed=hasNativeCount?scanned:undefined;
  const filteredEmpty=!value.items.length&&value.count!=null&&count>0;
  const end=filteredEmpty?total!==null&&scanned>=total:cpCatalogPageEnd(value.items,total,rows.length+value.items.length,seen,key,consumed);
  rows.push(...value.items);if(onPage)onPage(value.items);
  if(parallelTotal!==null&&page===lastPage&&!end)throw cpError('UPSTREAM_ERROR');
  if(end)break;
  if(String(value.next)==='-1'){if(total!==null&&(consumed??seen.size)<total)throw cpError('UPSTREAM_ERROR');break;}
  if(total===null&&value.next==null&&count<size)break;
  next=value.next??0;
  // Only these providers expose independent fixed-size numbered pages. Short
  // first pages retain the serial path because their page geometry is unknown.
  if(page===1&&(provider==='quark'||provider==='uc')&&value.next==null&&Number.isInteger(total)&&total>size&&count===size){parallelTotal=total;lastPage=Math.ceil(total/size);}
  if(parallelTotal!==null)while(pending.size<2&&scheduled<lastPage){scheduled++;pending.set(scheduled,request(scheduled,0));}
 }}catch(error){pageFailure=pageFailure||error;throw error;}finally{await Promise.all(pending.values());}
 return rows;
}
// Discover folders after each validated page so later parent pages do not idle
// the existing second worker. Keep full-catalog completion before flattening.
// Folder completion can be out of order. Flatten the recorded tree in original
// breadth-first order only after every started read has settled.
async function qpCatalogTree(root,read,child,onItem){
 const nodes=new Map(),queue=[];let active=0,failure;
 return await new Promise((resolve,reject)=>{
  function discover(id){const key=String(id);if(nodes.has(key))return;const node={id,items:[]};nodes.set(key,node);queue.push(node);pump();}
  function finish(){
   if(active||queue.length&&!failure)return;
   if(failure){reject(failure);return;}
   const result=[],pending=[root],visited=new Set();
   for(let i=0;i<pending.length;i++){
    const parent=pending[i],key=String(parent);if(visited.has(key))continue;visited.add(key);
    for(const item of nodes.get(key).items){const id=child(item);if(id!==undefined&&id!==null)pending.push(id);result.push({item,parent});}
   }
   resolve(result);
  }
  function pump(){
   while(!failure&&active<2&&queue.length){const node=queue.shift();active++;
    Promise.resolve().then(()=>{
     let emitted=false;
     const append=items=>{if(failure)throw failure;emitted=true;for(const item of items){node.items.push(item);const id=child(item);if(id!==undefined&&id!==null)discover(id);else if(onItem)onItem(item,node.id);}};
     return Promise.resolve(read(node.id,append)).then(items=>{if(!emitted)append(items);});
    })
     .catch(error=>{failure=failure||error;queue.length=0;}).finally(()=>{active--;pump();finish();});
   }
  }
  discover(root);
 });
}
function qpCatalogResult(entries,key,folder,video,convert){
 const seen=new Set(),list=[];let packageSizeBytes=0;
 for(const {item,parent} of entries){if(folder(item))continue;const id=String(key(item));if(seen.has(id))continue;seen.add(id);
  packageSizeBytes+=qpFileBytes(item.size??item.Size??item.s);if(video(item))list.push(convert(item,parent));
 }
 return {list,packageSizeBytes};
}
async function getShareDetail(shareId,stoken,target,scope){
 const cpTargetToken=undefined;
 const folder=item=>!!item.dir;
 const entries=await cpTargetQpWalk(cpTargetFilter(scope,item=>cpQuarkCandidateVideo(item)),target?.pdir_fid??'0',(parent,emit,cpTargetToken)=>qpCatalogPages('quark',async page=>{
  cpCoveragePage(scope||cpCoverageFor('quark',Object.assign({shareId},target)));
  const json=await httpJson('GET','https://drive-h.quark.cn/1/clouddrive/share/sharepage/detail?'+toQuery({pr:'ucpro',fr:'pc',uc_param_str:'',ver:'2',pwd_id:shareId,stoken,pdir_fid:parent,force:0,_page:page,_size:200,_fetch_total:1,_sort:'file_type:asc,file_name:asc'}),null,quarkHeaders());
  if(!json||(json.status!=null&&Number(json.status)!==200)||(json.code!=null&&Number(json.code)!==0))throw cpError('UPSTREAM_ERROR');
  return {items:json.data?.list,total:cpCatalogTotal(json.data,json),count:json.metadata?._count??json.data?.metadata?._count};
 },200,item=>item.fid,false,emit,cpTargetToken),item=>!target&&folder(item)?item.fid:undefined);
 const result=qpCatalogResult(entries,item=>item.fid,folder,item=>cpQuarkCandidateVideo(item),(item,parent)=>Object.assign({},item,{shareId,stoken,pdir_fid:item.pdir_fid??parent,dir:false,file:true}));
 result.movieName=entries.find(({item})=>folder(item))?.item.file_name||result.list[0]?.file_name||'';return result;
}
async function getUcVideos(share,target){
 const cpTargetToken=undefined;
 const stoken=await getUcToken(share.shareId,share.passcode),folder=item=>!!item.dir;
 const entries=await cpTargetQpWalk(cpTargetFilter(share.cpTargetDirectory,item=>isVideoFile(item)),target?.pdir_fid??'0',(parent,emit,cpTargetToken)=>qpCatalogPages('uc',async page=>{
  cpCoveragePage(share.cpTargetDirectory||cpCoverageFor('uc',share));
  const data=await ucApi('share/sharepage/detail?'+toQuery({pr:'UCBrowser',fr:'pc',pwd_id:share.shareId,stoken,pdir_fid:parent,force:0,_page:page,_size:100,_fetch_total:1,_sort:'file_type:asc,file_name:asc'}));
  return {items:data?.list,total:cpCatalogTotal(data),count:data?.metadata?._count};
 },100,item=>item.fid,false,emit,cpTargetToken),item=>!target&&folder(item)?item.fid:undefined,(item,parent)=>{if(!folder(item)&&isVideoFile(item)&&(!target||String(item.fid)===String(target.fid)))cpB6EmitFile('uc',share,Object.assign({},item,{shareId:share.shareId,passcode:share.passcode,stoken,pdir_fid:item.pdir_fid??parent}),{root:parent==='0'});});
 return qpCatalogResult(entries,item=>item.fid,folder,item=>isVideoFile(item)&&(!target||String(item.fid)===String(target.fid)),(item,parent)=>Object.assign({},item,{shareId:share.shareId,passcode:share.passcode,stoken,pdir_fid:item.pdir_fid??parent}));
}
async function getBaiduVideos(share){
 const cpTargetToken=undefined;
 let randsk=await baiduVerify(share),headers=baiduHeaders(share,randsk),refreshing=null,rejectedToken=null;const folder=item=>item.isdir!=null?Number(item.isdir)===1:String(item.category)==='6';let uk,shareid;
 const entries=await cpTargetQpWalk(cpTargetFilter(share.cpTargetDirectory,item=>isVideoFile(item)),null,(dir,emit,cpTargetToken)=>qpCatalogPages('baidu',async page=>{
  cpCoveragePage(share.cpTargetDirectory||cpCoverageFor('baidu',share));
  const size=dir===null?20:100,params={app_id:250528,web:1,channel:'chunlei',view_mode:1,showempty:0,page,num:size,order:dir===null?'time':'name',desc:dir===null?1:0};
  if(dir===null)Object.assign(params,{root:1,clienttype:0,shorturl:baiduShortId(share.shareId)});else Object.assign(params,{dir,uk,shareid,is_from_web:true});
  const usedToken=randsk,usedHeaders=headers;let json=await cpTargetQueue(cpTargetToken,'baidu',()=>httpJson('GET','https://pan.baidu.com/share/list?'+toQuery(params),null,usedHeaders));
  if(json&&Number(json.errno)===-9){
   if(!refreshing){rejectedToken=usedToken;refreshing=cpRefreshBaiduVerify(share,usedToken).then(value=>{randsk=value;headers=baiduHeaders(share,value);});}
   if(usedToken===rejectedToken){await refreshing;json=await cpTargetQueue(cpTargetToken,'baidu',()=>httpJson('GET','https://pan.baidu.com/share/list?'+toQuery(params),null,headers));}
  }
  if(json&&Number(json.errno)===-9)cpReadInvalidate("baidu",share.shareId,share.passcode,"verify");
  if(!json||Number(json.errno)!==0)throw cpError('UPSTREAM_ERROR');if(dir===null){uk=json.uk||uk;shareid=json.share_id||json.shareid||shareid;}
  return {items:json.list,total:cpCatalogTotal(json)};
 },dir===null?20:100,item=>item.fs_id||item.fsid||item.path,true,emit,cpTargetToken),item=>folder(item)?item.path:undefined,(item,parent)=>{if(!folder(item)&&isVideoFile(item))cpB6EmitFile('baidu',share,{fid:String(item.fs_id||item.fsid||item.path),file_name:item.server_filename,size:item.size,path:item.path,uk,shareid,shareId:share.shareId,passcode:share.passcode},{root:parent===null});});
 return qpCatalogResult(entries,item=>item.fs_id||item.fsid||item.path,folder,isVideoFile,item=>({fid:String(item.fs_id||item.fsid||item.path),file_name:item.server_filename,size:item.size,path:item.path,uk,shareid,shareId:share.shareId,passcode:share.passcode}));
}
async function get115Videos(share){
 const cpTargetToken=undefined;
 const key=item=>String(item.fc)+':'+String(item.fid||item.cid),folder=item=>Number(item.fc)===0;
 const entries=await cpTargetQpWalk(cpTargetFilter(share.cpTargetDirectory,item=>Number(item.fc)===1&&isVideoFile({file_name:item.n})),'',(cid,emit,cpTargetToken)=>{let offset=0;return qpCatalogPages('115',async()=>{
  cpCoveragePage(share.cpTargetDirectory||cpCoverageFor('115',share));
  const json=await httpJson('GET','https://webapi.115.com/share/snap?'+toQuery({share_code:share.shareId,receive_code:share.passcode||'',cid,limit:100,offset}),null,headers115());
  if(!json?.state||!json.data)throw cpError('UPSTREAM_ERROR');const items=json.data.list;offset+=Array.isArray(items)?items.length:0;
  return {items,total:json.data.count??null};
 },100,key,false,emit,cpTargetToken);},item=>folder(item)?item.cid:undefined,(item,cid)=>{if(Number(item.fc)===1&&isVideoFile({file_name:item.n}))cpB6EmitFile('115',share,{fid:String(item.fid),file_name:item.n,size:Number(item.s||0),cid,shareId:share.shareId,passcode:share.passcode||''},{root:cid===''});});
 return qpCatalogResult(entries,key,folder,item=>Number(item.fc)===1&&isVideoFile({file_name:item.n}),(item,cid)=>({fid:String(item.fid),file_name:item.n,size:Number(item.s||0),cid,shareId:share.shareId,passcode:share.passcode||''}));
}
async function getPan123Videos(share,target){
 const cpTargetToken=undefined;
 const folder=item=>Number(item.Type)===1;
 const entries=await cpTargetQpWalk(cpTargetFilter(share.cpTargetDirectory,item=>Number(item.Category)===2),target?.parentId??0,(parent,emit,cpTargetToken)=>qpCatalogPages('123',async(page,next)=>{
  cpCoveragePage(share.cpTargetDirectory||cpCoverageFor('123',share));
  const response=await cpHttpGet('https://www.123684.com/b/api/share/get?'+toQuery({limit:100,next,orderBy:'file_name',orderDirection:'asc',shareKey:share.shareId,SharePwd:share.passcode||'',ParentFileId:parent,Page:page}),{timeout:10000,headers:PAN123_HEADERS});
  const json=typeof response.data==='string'?JSON.parse(response.data):response.data;
  if(Number(response.status||response.statusCode||200)>=400||!json||(json.code!=null&&Number(json.code)!==0))throw cpError('UPSTREAM_ERROR');
  return {items:json.data?.InfoList,total:cpCatalogTotal(json.data,json),next:json.data?.Next};
 },100,item=>item.FileId,false,emit,cpTargetToken),item=>!target&&folder(item)?item.FileId:undefined);
 return qpCatalogResult(entries,item=>item.FileId,folder,item=>Number(item.Category)===2&&(!target||String(item.FileId)===String(target.fid)),(item,parent)=>({fid:String(item.FileId),parentId:parent,file_name:item.FileName,size:Number(item.Size||0),shareId:share.shareId,passcode:share.passcode||'',downloadUrl:item.DownloadUrl||''}));
}
// Display classification is independent of account overrides and playback quality.
// An explicit empty value restores the original resolution detection path.
function cpResourceCategory(){
 const value=cpShared().resourceCategory;
 return ["8k","4k","1080p","other", ""].includes(value)?value:"";
}
function cpWithoutResolution(value){
 return String(value||"").replace(/(?<![a-z0-9])(?:\d{3,5}\s*[x×]\s*\d{3,5}|\d{3,5}[pi]|(?:4320|2160|1440|1080|720|576|540|480|360)|[248]k|uhd|fhd)(?=$|[^a-z0-9])/gi,"").replace(/\s+/g," ").trim();
}
formatPlaybackResource=function(resource,source,params){
 const result=cpNativeFormat(resource,source,params),v=source.videoInfo||{};
 const origin=resource.quality==="origin"||(!resource.quality&&/原画|直链/.test(resource.description||""));
 const category=cpResourceCategory(),forced=category!=="";
 const resolution=forced?({"8k":"4320p","4k":"2160p","1080p":"1080p"}[category]||null):origin?cpOriginResolution(resource,v):cpResolutionInfo(resource.resolution).value;
 const facts=origin?cpMedia(v.file_name,resolution):resource.quality==="preview"?(forced&&resolution?["展示分类 "+resolution]:[]):resolution?[resolution]:[];
 const size=cpSize(resource.sizeBytes!=null?resource.sizeBytes:origin?v.size:0);
 const provider={quark:"夸克",baidu:"百度",uc:"UC","115":"115","123":"123",xunlei:"迅雷",guangya:"光鸭",yidong:"移动",tianyi:"天翼云盘"}[source.provider||"quark"]||"网盘";
 const quality=resource.quality==="preview"?"预览":origin?"原画":resource.quality==="transcode"||/转码/.test(resource.description||"")?"转码":"";
 const rawTitle=params.seriesName||params.title||(resource.quality==="preview"?"视频":source.title||v.file_name||"视频");
 const title=forced?cpWithoutResolution(rawTitle)||"视频":rawTitle;
 const episode=params.type!=="movie"&&params.episode?" 第"+(params.season||1)+"季 第"+params.episode+"集":"";
 const station=(forced?cpWithoutResolution(WidgetMetadata.title):WidgetMetadata.title).replace(/^猫\s*·\s*/, "");
 result.name=(size?"["+size+"] ":"")+[provider,quality,station].filter(Boolean).join(" · ");
 result.description=[title+episode,...facts,size].filter(Boolean).join(" · ");
 if(forced)result.resolution=resolution;
 if(resource.quality)result.quality=resource.quality;
 if(resource.subtitles)result.subtitles=resource.subtitles;
 return result;
};
function cpTitleKey(value){return String(value||"").replace(/[（(]\s*(?:真彩|臻彩)\s*[）)]|[-－]\s*(?:真彩|臻彩)\s*$/g,"").replace(/\s*[（(](?:19|20)\d{2}[）)]\s*$/,"").replace(/\s*(?:第\s*[一二三四五六七八九十百\d]+\s*季|season\s*\d+)\s*$/i,"").replace(/[\s·:：._\-]/g,"").toLowerCase();}
function cpTitlesEqual(a,b){return cpTitleKey(a)===cpTitleKey(b);}
episodeIdentity=function(name){
 name=cpNormalizeEpisodeLabel(name);
 const original=cpNativeEpisode(name);if(original.episode!=null||/特别篇|番外|预告|花絮|\b(?:OVA|OAD|SP)\b/i.test(name))return original;
 const stem=String(name||"").replace(/\.[a-z0-9]{2,5}$/i,"");
 const explicit=/s(\d{1,2})[ ._-]*e(\d{4})(?!\d)/i.exec(stem);if(explicit)return {key:"s"+Number(explicit[1])+"e"+Number(explicit[2]),season:Number(explicit[1]),episode:Number(explicit[2])};
 const m=/\s-\s*(\d{1,3})(?=\s|\[|$)/.exec(stem)||/\]\[(\d{1,3})\](?=\[|$)/.exec(stem)||/第\s*(\d{1,3})\s*期/.exec(stem);
 if(!m||Number(m[1])<1)return original;const s=/第\s*(\d+)\s*季|\bS(\d+)\b/i.exec(stem),season=s?Number(s[1]||s[2]):1;
 return {key:"s"+season+"e"+Number(m[1]),season,episode:Number(m[1])};
};
// Shared pure relevance rules; provider I/O and discovery policies stay in their adapters.
function cpMovieHostYear(value){return /[（(]\s*((?:19|20)\d{2})\s*[）)]\s*$/.exec(value||'');}
// Rex forwards airDate rather than year. Keep all supplied year evidence in
// agreement, and only strip an unbracketed year when it is that release year.
function cpRequestedYear(params){
 const year=v=>/^(?:19|20)\d{2}$/.test(String(v??""))?Number(v):null;
 const embedded=cpMovieHostYear(params.seriesName||params.title||""),values=[year(params.year),year(params.releaseYear),params.type==="movie"?year(String(params.airDate||"").slice(0,4)):null,embedded?Number(embedded[1]):null].filter(v=>v!==null);
 return {year:values[0]||null,conflict:new Set(values).size>1};
}
function cpMovieName(value,year){
 let name=String(value||"").replace(/^[🎬🎥📺]\s*/u,"").replace(/^(?:名称|片名)\s*[:：]\s*/,"").replace(/[\u200b-\u200f\u202a-\u202e\ufeff]/g,"").replace(/[（(]\s*(?:真彩|臻彩)\s*[）)]/g,"").trim();
 const bracket=cpMovieHostYear(name);if(bracket)return {name:name.slice(0,bracket.index).trim(),year:Number(bracket[1])};
 const suffix=year&&new RegExp("^(.*?)[ ._-]*"+year+"$").exec(name);
 if(suffix&&suffix[1].trim()&&!/^\d+$/.test(suffix[1].trim()))return {name:suffix[1].trim(),year};
 return {name,year:null};
}
function cpMovieCandidate(value,params){
 const requested=cpRequestedYear(params);if(requested.conflict)return false;
 const host=cpMovieName(params.seriesName||params.title||params.name||params.keyword),full=cpMovieName(value),candidate=cpTitlesEqual(host.name,full.name)?full:cpMovieName(value,requested.year);
 return (!requested.year||!candidate.year||requested.year===candidate.year)&&cpTitlesEqual(host.name,candidate.name);
}
function cpMovieCacheIdentity(params){const r=cpRequestedYear(params);return JSON.stringify([3,params.tmdbId||params.tmdbID||"",r.year,r.conflict,params.imdbId||""]);}
function cpMovieVideoMatches(video,params,titles=cpRelevanceTitles(params)){return cpFileMatchDecision(video,Object.assign({},params,{type:"movie"}),titles).matched;}
function cpRelevanceTitles(params){
 return [...new Set([params.seriesName||params.title||params.name||params.keyword,params.originalName,params.originalTitle,params.original_name,params.original_title,...(Array.isArray(params.alternativeTitles)?params.alternativeTitles:[]),...(Array.isArray(params.aliases)?params.aliases:[])].filter(v=>typeof v==="string"&&v.trim()).map(v=>v.trim()))];
}
// Remove known title words before interpreting labels such as "Trailer" or "Sample".
function cpWithoutKnownTitles(value,titles){
 let text=String(value||"");
 const names=[...new Set(titles.filter(Boolean).map(t=>cpMovieName(t).name))].sort((a,b)=>b.length-a.length);
 for(const title of names){
  const tokens=title.split(/[\s·:：._\-()[\]（）]+/).filter(Boolean).map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"));
  if(tokens.length)text=text.replace(new RegExp("(^|[\\s·:：._\\-()[\\]（）/\\\\])"+tokens.join("[\\s·:：._\\-()[\\]（）]*")+"(?=$|[^a-z0-9]|S\\d{1,2}E\\d+)","i"),"$1");
 }
 return text;
}
function cpHasExtraMarker(video,titles){
 return [video?.file_name,video?.parentPath||video?.parent_path].some(value=>{
  const text=cpWithoutKnownTitles(String(value||"").replace(/\.[a-z0-9]{2,5}$/i,""),titles);
  return /特别篇|番外|预告|花絮|(?:^|[^a-z0-9])(?:trailer|sample|extras?|featurettes?|OVA|OAD|SP)(?=$|[^a-z0-9])/i.test(text);
 });
}
function cpSearchMetadataLabel(value){
 const label=String(value||'').trim();
 const rest=label.replace(/(?:内封|外挂)?(?:简繁|简|繁|中英|中|英|双语|多语)?(?:中字|字幕|双字|中)|国语|粤语|多音轨|已完结|完结|(?:全\s*\d+|\d+)\s*[集期](?:全)?|剧情|爱情|喜剧|悬疑|动作|科幻|惊悚|犯罪|冒险|动画|奇幻|[248]K|\d{3,4}P|HDR(?:10\+?)?|DV|H26[45]|\d+(?:\.\d+)?fps|WEB[ ._-]*DL|BluRay|REMUX/gi,'');
 return rest!==label&&/^[ ._+&\/-]*$/.test(rest);
}
function cpRelevanceSearchName(value){
 let text=String(value||"").replace(/^[🎬🎥📺]\s*/u,"").replace(/^(?:名称|片名)\s*[:：]\s*/,"").replace(/[\u200b-\u200f\u202a-\u202e\ufeff]/g,"").trim();
 text=text.replace(/^[\[【](?:电影|剧集|电视剧|动漫|短剧)[·・](?:光鸭|迅雷|移动|天翼|夸克|百度|UC|115|123)[\]】]\s*/i,'');
 // Only recognized metadata labels are removable; bracketed sequel names stay meaningful.
 let previous;
 do{previous=text;text=text.replace(/\s*[\[【（(]([^\]】）)]+)[\]】）)]\s*$/, (whole,label)=>cpSearchMetadataLabel(label)?"":whole).trim();}while(text!==previous);
 text=text.replace(/\s*(?:更新至|更至|更新到|全\s*\d+\s*[集期]|完结|已完结)[\s\S]*$/,"");
 return text.replace(/[ ._-]+(?:[248]K|\d{3,4}[Pp]|HDR|杜比|蓝光|WEB[ ._-]*DL|BluRay|REMUX)(?=$|[ ._-])[\s\S]*$/i,(whole,offset)=>{
  const prefix=text.slice(0,offset);
  return (prefix.match(/[\[【（(]/g)||[]).length===(prefix.match(/[\]】）)]/g)||[]).length?'':whole;
 }).trim();
}
function cpExplicitSeason(value){
 const m=/第\s*([一二三四五六七八九十百\d]+)\s*季|(?:^|[^a-z0-9])Season[ ._-]*(\d+)(?=$|[^a-z0-9])|S(\d{1,2})[ ._-]*E\d+|(?:^|[^a-z0-9])S(\d{1,2})(?=$|[^a-z0-9])/i.exec(String(value||""));if(!m)return null;
 const raw=m[1]||m[2]||m[3]||m[4];if(/^\d+$/.test(raw))return Number(raw);const nums={一:1,二:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9};if(raw==="十")return 10;if(raw.includes("十")){const parts=raw.split("十");return (nums[parts[0]]||1)*10+(nums[parts[1]]||0);}return nums[raw]||null;
}
function cpSearchTitleMatches(value,params){
 const requested=cpRequestedYear(params);if(requested.conflict)return false;
 if(!String(value||"").trim())return true;
 const titles=cpRelevanceTitles(params),evidence=cpWithoutKnownTitles(value,titles);
 const explicitSeason=params.type==="movie"?null:cpExplicitSeason(value);
 if(explicitSeason!==null&&explicitSeason!==Number(params.season||1))return false;
 const years=[...evidence.matchAll(/(?:^|[^a-z0-9])((?:19|20)\d{2})(?=$|[^a-z0-9])/gi)].map(m=>Number(m[1]));
 if(requested.year&&years.some(year=>year!==requested.year))return false;
 const clean=cpRelevanceSearchName(value);
 if(params.type==="movie")return titles.some(title=>cpMovieCandidate(clean,Object.assign({},params,{seriesName:title,title,year:requested.year||params.year})));
 const season=cpExplicitSeason(clean);if(season!==null&&season!==Number(params.season||1))return false;
 // Season and year suffixes may be in either order. Conflict checks above
 // remain authoritative; normalize only the already-validated trailing season.
 const name=clean.replace(/\s*(?:第\s*[一二三四五六七八九十百\d]+\s*季|Season[ ._-]*\d+|(?:^|[ ._-])S\d{1,2})\s*$/i,'');
 let candidate=cpMovieName(name,requested.year);
 if(requested.year&&candidate.year&&requested.year!==candidate.year)return false;
 const key=value=>cpTitleKey(value).replace(/s\d{1,2}$/i,"");
 const matches=name=>titles.some(title=>key(name)===key(cpRelevanceSearchName(title)));
 if(matches(candidate.name))return true;
 // TV hosts need not supply a release year. Strip a bare result year only
 // when the remaining name matches; titles such as 1984 retain their identity.
 const suffix=/^(.*?)[ ._-]+((?:19|20)\d{2})$/.exec(candidate.name);
 return !!suffix&&(!requested.year||Number(suffix[2])===requested.year)&&matches(suffix[1]);
}
function cpEpisodeVideoMatches(video,params,titles=cpRelevanceTitles(params)){return cpFileMatchDecision(video,params,titles).matched;}
function cpToken(value){return typeof value==="string"&&/^[A-Za-z0-9+/_-]+={0,2}$/.test(value)?value.replace(/\+/g,"-").replace(/\//g,"_"):value;}
function cpNativeRequest(method,url,data){
 if(/https:\/\/(?:pc-api\.uc\.cn|drive-(?:h|pc)\.quark\.cn)\/1\/clouddrive\//.test(url)){
  if(method==="GET"&&/\/share\/sharepage\/detail\?/.test(url))url=url.replace(/([?&]stoken=)([^&#]*)/g,(all,p,v)=>{try{return p+encodeURIComponent(cpToken(decodeURIComponent(v)));}catch(_){return all;}});
  if(method==="POST"&&/\/(?:file\/download|share\/sharepage\/save)\?/.test(url)&&data&&typeof data.stoken==="string")data=Object.assign({},data,{stoken:cpToken(data.stoken)});
 }
 return {method,url,data};
}
// Reuse successful Baidu preparation briefly across modules; signed playback URLs stay fresh.
const CP_BAIDU_READ_NAMESPACE="catpaw.drive-read.v1";
function cpIoReuseEnabled(){return !/(?:^|\.)(?:tgsou|tg-channels)$/.test(WidgetMetadata.id);}
function cpBaiduCacheState(){
 try{const raw=Widget.sharedCache&&Widget.sharedCache.get(CP_BAIDU_READ_NAMESPACE,"baidu"),state=raw?JSON.parse(raw):cpRead("baidu-read:cache");if(state?.schema===1&&typeof state.generation==="string"&&state.entries&&typeof state.entries==="object"&&!Array.isArray(state.entries))return state;}catch(_){}
 return {schema:1,generation:"",entries:{}};
}
function cpBaiduCacheGet(key){const state=cpBaiduCacheState();return key.startsWith("epoch:")?state.generation:state.entries[key]||null;}
function cpBaiduCacheSet(key,value){
 const state=cpBaiduCacheState();
 if(key.startsWith("epoch:")){state.generation=String(value);state.entries={};}
 else{
  delete state.entries[key];if(value!==null)state.entries[key]=value;
  const keys=Object.keys(state.entries);for(let i=0;i<keys.length-64;i++)delete state.entries[keys[i]];
 }
 cpWrite("baidu-read:cache",state);try{if(Widget.sharedCache)Widget.sharedCache.set(CP_BAIDU_READ_NAMESPACE,"baidu",JSON.stringify(state));}catch(_){}
}
function cpBaiduCacheKey(label,identity){const profile=cpActiveProfile||cpProfile;cpCheck(profile);const epoch=cpBaiduCacheGet("epoch:"+profile);return profile+":"+String(epoch||"")+":"+baiduSha1(JSON.stringify([label,identity]));}
function cpBaiduCached(key,ttl){
 if(!cpIoReuseEnabled())return null;const entry=cpBaiduCacheGet(key),now=Date.now();
 return entry&&Number.isFinite(entry.at)&&Number.isFinite(entry.until)&&entry.at<=now&&entry.until>now&&entry.until-entry.at<=ttl?entry.value:null;
}
function cpBaiduRemember(key,value,ttl){if(cpIoReuseEnabled()){const now=Date.now();cpBaiduCacheSet(key,{at:now,until:now+ttl,value});}}
function cpBaiduInvalidateAccount(){if(cpIoReuseEnabled())cpBaiduCacheSet("epoch:"+(cpActiveProfile||cpProfile),String(Date.now())+":"+String(Math.random()));}
// Only a serialized public loadResource owns this response cache.
let cpBaiduUidScope=null;
function cpBaiduUidKey(method,url,headers){
 if(!cpBaiduUidScope||method!=="GET"||!/^https:\/\/mbd\.baidu\.com\/userx\/v1\/info\/get(?:\?|$)/.test(url))return null;
 const normalized=Object.keys(headers||{}).filter(k=>k.toLowerCase()!=="referer").map(k=>[k.toLowerCase(),headers[k]]).sort((a,b)=>a[0]<b[0]?-1:a[0]>b[0]?1:JSON.stringify(a).localeCompare(JSON.stringify(b)));
 return JSON.stringify([url,normalized]);
}
function cpValidBaiduUid(json){
 const uid=json&&json.data&&json.data.fields&&json.data.fields.uid;
 return (typeof uid==="string"&&/^[1-9]\d*$/.test(uid)||typeof uid==="number"&&Number.isSafeInteger(uid)&&uid>0)&&["errno","code","error_code"].every(k=>json[k]==null||Number(json[k])===0)&&(json.status==null||[0,200].includes(Number(json.status)));
}
async function cpReadBaiduIdentity(scope,key,request,profile){
 if(!scope.inflight)scope.inflight=new Map();
 const previous=scope.inflight.get(key)||Promise.resolve();
 const task=previous.catch(error=>{if(error&&["AUTH_FAILED","RATE_LIMITED","ABORTED","ACCOUNT_CHANGED","OPERATION_TIMEOUT"].includes(error.code))throw error;}).then(async()=>{
  cpCheck(profile);if(scope.has(key))return JSON.parse(scope.get(key));
  const cacheKey=cpBaiduCacheKey("uid",key),cached=cpBaiduCached(cacheKey,300000);
  if(cpValidBaiduUid(cached)){scope.set(key,JSON.stringify(cached));return JSON.parse(JSON.stringify(cached));}
  let json;try{json=await request();}catch(error){const status=Number(error&&error.status);if(status===401||status===429){const fatal=cpError(status===401?"AUTH_FAILED":"RATE_LIMITED");fatal.status=status;throw fatal;}throw error;}cpCheck(profile);
  if(cpValidBaiduUid(json)){scope.set(key,JSON.stringify(json));cpBaiduRemember(cacheKey,{errno:0,data:{fields:{uid:json.data.fields.uid}}},300000);}return json;
 });
 scope.inflight.set(key,task);
 try{return await task;}finally{if(scope.inflight.get(key)===task)scope.inflight.delete(key);}
}
httpJson=async function(method,url,data,headers){
 const profile=cpActiveProfile||cpProfile;cpCheck(profile);const fixed=cpNativeRequest(method,url,data);
 const save=method==="POST"&&/^https:\/\/drive-h\.quark\.cn\/1\/clouddrive\/share\/sharepage\/save(?:\?|$)/.test(url);
 const key=save?cpTransferKey({shareId:data.pwd_id,fid:(data.fid_list||[])[0]}):null;
 if(save&&cpOwnedTransfers.has(key)){
  const phase=cpRead(key);if(phase?.state==="succeeded")return {status:200,code:0,data:{save_as:{save_as_top_fids:[phase.fid]}}};
  if(phase?.state!=="preparing"||phase.owner!==cpTransferOwner||phase.until<=Date.now())throw cpError("TRANSFER_UNCERTAIN");
 }
 if(save)cpWrite(key,{state:"uncertain"});
 try{
  const uidKey=cpBaiduUidKey(fixed.method,fixed.url,headers),scope=cpBaiduUidScope;
  const request=()=>cpNativeJson(fixed.method,fixed.url,fixed.data,headers);
  const json=uidKey!==null?await cpReadBaiduIdentity(scope,uidKey,request,profile):await request();cpCheck(profile);
  if(save){const fid=cpSavedFid(json),ok=json&&(json.code==null||Number(json.code)===0)&&(json.status==null||Number(json.status)===200);
   if(fid&&ok)cpWrite(key,{state:"succeeded",fid});else if(ok&&json.data&&json.data.task_id)cpWrite(key,{state:"known",taskId:String(json.data.task_id)});else if(!ok)cpWrite(key,{state:"failed"});}
  if(cpIoReuseEnabled()&&fixed.method==="GET"&&/^https:\/\/drive-h\.quark\.cn\/1\/clouddrive\/task\?/.test(fixed.url)&&!cpSavedFid(json)){
   const taskId=decodeURIComponent((/[?&]task_id=([^&#]*)/.exec(fixed.url)||[])[1]||""),retry=Number((/[?&]retry_index=(\d+)/.exec(fixed.url)||[])[1]||"0");
   if(retry>=5||cpQuarkTaskFailed(json))for(const transferKey of cpOwnedTransfers){const receipt=cpRead(transferKey);if(receipt?.state==="known"&&receipt.taskId===taskId)cpWrite(transferKey,Object.assign({},receipt,{nextPollAt:Date.now()+5000}));}
  }
  cpObserve(fixed.url,json);if(ensureCookie())cpWrite("session:"+profile,{cookie:ensureCookie()});return json;
 }catch(e){
  if(/^https:\/\/(?:pan|mbd)\.baidu\.com\//.test(fixed.url)&&(e?.code==="AUTH_FAILED"||e?.code==="SHARE_EXPIRED"||Number(e?.status)===401))cpBaiduInvalidateAccount();
  if(e&&["ACCOUNT_CHANGED","ABORTED","OPERATION_TIMEOUT","AUTH_FAILED","RATE_LIMITED","ORIGIN_ACCESS_DENIED","QUALITY_UNAVAILABLE","TRANSFER_UNCERTAIN","UPSTREAM_ERROR","SHARE_EXPIRED"].includes(e.code))throw e;
  const status=Number(e&&e.status)||Number((/HTTP (\d{3})/.exec(String(e&&e.message))||[])[1]);
  if(save&&[400,401,403,404,429].includes(status))cpWrite(key,{state:"failed"});
  const error=cpError(status===401?"AUTH_FAILED":status===429?"RATE_LIMITED":"UPSTREAM_ERROR");error.status=status||undefined;throw error;
 }
};

async function cpOrigin(fid){
 const base="https://drive-pc.quark.cn/1/clouddrive/";
 const flush=await cpReadReuse("quark","session","","flush",()=>httpJson("GET",base+"auth/pc/flush?pr=ucpro&fr=pc&sys=win32&ve=3.1.8",null,quarkHeaders()),json=>!!json&&(json.code==null||Number(json.code)===0)&&(json.status==null||Number(json.status)===200));
 if(!flush||(flush.code!=null&&Number(flush.code)!==0)||(flush.status!=null&&Number(flush.status)!==200))throw cpError("UPSTREAM_ERROR");
 let json;
 try{json=await httpJson("POST",base+"file/download?pr=ucpro&fr=pc&uc_param_str=",{fids:[String(fid)]},quarkHeaders());}
 catch(e){if(e.status===403){e.code="ORIGIN_ACCESS_DENIED";}else if(e.status===400){e.code="QUALITY_UNAVAILABLE";}throw e;}
 if(Number(json&&json.code)===23018)throw cpError("ORIGIN_ACCESS_DENIED");
 if(!json||(json.code!=null&&Number(json.code)!==0)||(json.status!=null&&Number(json.status)!==200))throw cpError("UPSTREAM_ERROR");
 const list=Array.isArray(json.data)?json.data:[];
 const item=list.find(v=>!v.fid||String(v.fid)===String(fid));
 if(!item||!/^https:\/\//i.test(item.download_url||""))throw cpError("QUALITY_UNAVAILABLE");
 return {name:"垮",description:"原画",url:item.download_url,quality:"origin",headers:playHeaders(),customHeaders:playHeaders()};
}
function cpTransferKey(video){return "transfer:"+cpProfile+":"+baiduSha1(JSON.stringify([String(video.shareId),String(video.fid)]));}
function cpSavedFid(json){for(const data of [json&&json.data,json&&json.data&&json.data.task_resp&&json.data.task_resp.data]){const ids=data&&data.save_as&&(data.save_as.save_as_top_fids||data.save_as.save_as_select_top_fids);if(Array.isArray(ids)&&ids.length===1&&String(ids[0])!=="0")return String(ids[0]);}return "";}
function cpQuarkTaskFailed(json){return !!json&&((json.code!=null&&Number(json.code)!==0)||(json.status!=null&&Number(json.status)!==200));}
async function cpResumeTransfer(key,taskId,profile){
 const receipt=cpRead(key),now=Date.now();
 if(cpIoReuseEnabled()&&Number.isFinite(receipt?.nextPollAt)&&receipt.nextPollAt>now&&receipt.nextPollAt<=now+5000)throw cpError("TRANSFER_UNCERTAIN");
 for(let retry=0;retry<6;retry++){
  cpCheck(profile);const json=await httpJson("GET","https://drive-h.quark.cn/1/clouddrive/task?pr=ucpro&fr=pc&task_id="+encodeURIComponent(taskId)+"&retry_index="+retry,null,quarkHeaders());
  if(cpIoReuseEnabled()&&cpQuarkTaskFailed(json)){const receipt=cpRead(key);if(receipt?.state==="known"&&receipt.taskId===taskId)cpWrite(key,Object.assign({},receipt,{nextPollAt:Date.now()+5000}));throw cpError("UPSTREAM_ERROR");}
  const fid=cpSavedFid(json);if(fid){cpWrite(key,{state:"succeeded",fid});return fid;}
  if(retry<5&&typeof setTimeout==="function")await new Promise(resolve=>setTimeout(resolve,300));
 }
 if(cpIoReuseEnabled()){const receipt=cpRead(key);if(receipt?.state==="known"&&receipt.taskId===taskId)cpWrite(key,Object.assign({},receipt,{nextPollAt:Date.now()+5000}));}
 throw cpError("TRANSFER_UNCERTAIN");
}
const cpTransferOwner=String(Date.now())+"-"+String(Math.random()),cpOwnedTransfers=new Set();
async function cpWaitTransfer(key,profile){
 for(let i=0;i<75;i++){
  cpCheck(profile);const state=cpRead(key);
  if(state?.state==='succeeded')return state.fid;
  if(!state||state.state==='failed')return null;
  if(state.state==='preparing'&&(!Number.isFinite(state.until)||state.until<=Date.now())){cpWrite(key,{state:'failed'});return null;}
  if(state.state==='known')return cpResumeTransfer(key,state.taskId,profile);
  // 在本次等待期间，POST 已提交但尚未回执时继续等；独立新请求仍拒绝盲目重发。
  if(typeof setTimeout!=='function')throw cpError('TRANSFER_UNCERTAIN');
  await new Promise(resolve=>setTimeout(resolve,200));
 }throw cpError('TRANSFER_UNCERTAIN');
}
saveShareFile=async function(video){
 const profile=cpProfile;cpCheck(profile);const key=cpTransferKey(video);
 if(cpFlights.has(key))return cpFlights.get(key);
 let saved=cpRead(key);
 if(saved?.state==='preparing'){const fid=await cpWaitTransfer(key,profile);if(fid)return fid;saved=cpRead(key);}
 if(saved?.state==='succeeded')return saved.fid;
 if(saved?.state==='uncertain')throw cpError('TRANSFER_UNCERTAIN');
 // 先登记正在准备，再进入原版建目录流程，其他模块等待回执。
 if(saved?.state!=='known'){cpWrite(key,{state:'preparing',owner:cpTransferOwner,until:Date.now()+60000});cpOwnedTransfers.add(key);}
 const task=(async()=>{
  try{
   const fid=saved?.state==='known'?await cpResumeTransfer(key,saved.taskId,profile):await cpSaveNative(video);
   cpCheck(profile);if(!fid){const state=cpRead(key);throw cpError(state&&['known','uncertain'].includes(state.state)?'TRANSFER_UNCERTAIN':'UPSTREAM_ERROR');}
   cpWrite(key,{state:'succeeded',fid:String(fid)});return String(fid);
  }catch(e){const pending=cpRead(key);if(pending?.state==='preparing'&&pending.owner===cpTransferOwner)cpWrite(key,{state:'failed'});throw e;}
 })();cpFlights.set(key,task);
 try{return await task;}finally{cpOwnedTransfers.delete(key);if(cpFlights.get(key)===task)cpFlights.delete(key);}
};
function cpApplyCandidateIssues(issues){
 for(const issue of issues){
  if(["AUTH_FAILED","RATE_LIMITED","TRANSFER_UNCERTAIN"].includes(issue.code))cpBlockedProviders.add(issue.provider);
  if(issue.lastError)cpWrite("last-error",{code:issue.code,provider:issue.provider,at:Date.now()});
 }
}
function cpCandidateIssue(provider,code,lastError,deferredIssues){
 const issue={provider,code:typeof code==="string"?code:"UPSTREAM_ERROR",lastError};
 if(deferredIssues)deferredIssues.push(issue);if(!deferredIssues||['AUTH_FAILED','RATE_LIMITED','TRANSFER_UNCERTAIN'].includes(issue.code))cpApplyCandidateIssues([issue]);
}
async function cpResolveCandidate(info,deferredIssues){try{return await resolvePlaySource(info,deferredIssues);}catch(e){if(["ACCOUNT_CHANGED","ABORTED","OPERATION_TIMEOUT"].includes(e.code))throw e;cpCandidateIssue(info.provider||"quark",e.code,true,deferredIssues);return [];}}

resolvePlaySource=async function(info,deferredIssues){
 const profile=cpProfile;cpCheck(profile);const provider=info.provider||"quark";let items;
 const readVideo=async()=>{ if(provider==="uc")items=await getUcResource(info);
 else if(provider==="baidu")items=await getBaiduResource(info);
 else if(provider==="115")items=await get115Resource(info);
 else if(provider!=="quark")items=await cpNativeResolve(info);
 else items=await cpQuarkPlayback(info,profile);
 return items;};
 const videoTask=readVideo();
 const subtitleTask=['uc','baidu','115'].includes(provider)&&cpSetting('subtitles','auto')!=='off'?cpTrackRead(Promise.resolve().then(()=>cpSubtitles(info,profile,deferredIssues))):null;
 items=await videoTask;
 cpCheck(profile);
 if(cpSetting("subtitles","auto")!=="off"&&items&&items.some(i=>i.url)){
  const subtitles=await (subtitleTask||cpSubtitles(info,profile,deferredIssues));cpCheck(profile);items=items.map(item=>item.url?Object.assign({},item,{subtitles}):item);
 }
 return items||[];
};
function cpSubtitleInfo(name){
 const m=/\.(srt|ass|ssa|vtt)$/i.exec(String(name||""));if(!m)return null;
 let stem=name.slice(0,-m[0].length),language;const suffix=/(?:[._ -]+|\[|（|\()(zh-Hans|zh-Hant|zh-cn|zh-tw|chs|cht|sc|tc|简体|繁体|简中|繁中|zh|en|eng|ja|jpn|forced|sdh|cc)[\]）)]?$/i;
 const stems=[stem];for(;;){const s=suffix.exec(stem);if(!s)break;const tag=s[1].toLowerCase();if(!["forced","sdh","cc"].includes(tag))language=({chs:"zh-Hans",sc:"zh-Hans","zh-cn":"zh-Hans","zh-hans":"zh-Hans",cht:"zh-Hant",tc:"zh-Hant","zh-tw":"zh-Hant","zh-hant":"zh-Hant",简体:"zh-Hans",简中:"zh-Hans",繁体:"zh-Hant",繁中:"zh-Hant",eng:"en",jpn:"ja"})[tag]||tag;stem=stem.slice(0,s.index);stems.push(stem);}
 return {stems,format:m[1].toLowerCase(),language};
}
function cpParent(v){if(v.pdir_fid!=null)return "id:"+String(v.pdir_fid);if(v.cid!=null)return "id:"+String(v.cid);if(v.path)return "path:"+String(v.path).replace(/\/[^/]*$/,"");return null;}
function cpMatchSubtitles(video,files){
 const stem=String(video.file_name||"").replace(/\.(mkv|mp4|avi|mov|m4v|ts|m2ts|webm|flv|wmv)$/i,""),groups=new Map();
 for(const f of files){if(cpParent(video)===null||cpParent(video)!==cpParent(f))continue;const info=cpSubtitleInfo(f.file_name);if(!info||!info.stems.includes(stem))continue;const key=String(f.file_name);if(!groups.has(key))groups.set(key,new Map());groups.get(key).set(String(f.fid),f);}
 return Array.from(groups.values()).filter(g=>g.size===1).map(g=>g.values().next().value).slice(0,3);
}
function cpObserve(url,json){
 if(!/\/share\/(?:sharepage\/detail|list|snap)\?/.test(url))return;
 const list=json&&((json.data&&json.data.list)||json.list);if(!Array.isArray(list))return;
 const query=name=>{const m=new RegExp("[?&]"+name+"=([^&#]*)").exec(url);try{return m?decodeURIComponent(m[1]):null;}catch(_){return null;}};
 const provider=/quark\.cn/.test(url)?"quark":/uc\.cn/.test(url)?"uc":/baidu\.com/.test(url)?"baidu":"115";
 const share=query("pwd_id")||query("shorturl")||query("share_code")||(provider==="baidu"?"id:"+String(json.share_id||json.shareid||query("shareid")||""):"");if(!share||share==="id:")return;
 const parent=query("pdir_fid")??query("cid"),stoken=query("stoken");
 const key="subtitles:"+cpProfile+":"+provider+":"+baiduSha1(share),previous=cpRead(key),files=previous&&previous.expires>Date.now()?previous.files:[];
 for(const item of list){const name=item.file_name||item.server_filename||item.n;if(!cpSubtitleInfo(name))continue;
  const v=Object.assign({},item,{fid:String(item.fid||item.fs_id||item.fsid||""),file_name:name});
  if(provider!=="baidu")v.shareId=share;
  if(parent!=null&&v.pdir_fid==null)v.pdir_fid=parent;if(stoken)v.stoken=stoken;
  if(provider==="baidu"){if(json.uk!=null)v.uk=json.uk;if(json.share_id||json.shareid)v.shareid=json.share_id||json.shareid;}
  const at=files.findIndex(f=>f.fid===v.fid);if(at<0)files.push(v);else files[at]=v;
 }
 if(files.length)cpWrite(key,{expires:Date.now()+86400000,files:files.slice(-128)});
}
async function cpUcSubtitle(info,profile){
 try{return await getUcResource(info);}catch(e){
  if(e&&["AUTH_FAILED","RATE_LIMITED","ABORTED","ACCOUNT_CHANGED","OPERATION_TIMEOUT"].includes(e.code))throw e;
  cpCheck(profile);const v=info.videoInfo||{},record=cpRead("subtitles:"+profile+":uc:"+baiduSha1(String(v.shareId))),fresh=record?.files?.find(f=>String(f.fid)===String(v.fid));
  if(!fresh||!fresh.stoken||!fresh.share_fid_token||(fresh.stoken===v.stoken&&fresh.share_fid_token===v.share_fid_token))throw e;
  return await getUcResource({provider:"uc",videoInfo:Object.assign({},v,fresh)});
 }
}
async function cpSubtitles(info,profile,deferredIssues){
 try{
  const v=info.videoInfo||{},provider=info.provider||"quark",keys=[v.shareId];if(provider==="baidu")keys.push(String(v.shareId||"").replace(/^1/,""),"id:"+v.shareid);
  const files=[];for(const share of keys){const r=cpRead("subtitles:"+profile+":"+provider+":"+baiduSha1(String(share)));if(r&&r.expires>Date.now())files.push(...r.files);}
  const selected=cpMatchSubtitles(v,files),result=[];for(const subtitle of selected){try{cpCheck(profile);const sub=Object.assign({},v,subtitle),sinfo=cpSubtitleInfo(sub.file_name);let resources;
   if(provider==="quark"){const fid=await saveShareFile(sub);resources=[await cpOrigin(fid)];}
   else if(provider==="uc")resources=await cpUcSubtitle({provider,videoInfo:sub},profile);
   else if(provider==="baidu")resources=await getBaiduResource({provider,videoInfo:sub});
   else resources=await get115Resource({provider,videoInfo:sub});
   cpCheck(profile);const r=resources&&resources.find(r=>r.url);if(r)result.push({url:r.url,headers:r.headers||r.customHeaders||{},name:sub.file_name,...(sinfo.language?{language:sinfo.language}:{}),isDefault:false});
  }catch(e){cpCheck(profile);if(e&&["AUTH_FAILED","RATE_LIMITED","TRANSFER_UNCERTAIN"].includes(e.code)){cpCandidateIssue(provider,e.code,false,deferredIssues);break;}}}return result;
 }catch(e){cpCheck(profile);return [];}
}
// Keep the native detail cover fields without installing title verification or alias lookups.
let cpLastDetail=null;
const qpDetailEntry=buildDetailItem;
buildDetailItem=async function(info,...args){
 const detail=await qpDetailEntry(info,...args);
 if(detail){
  const poster=detail.posterPath||info.poster||"";detail.posterPath=poster;
  for(const episode of detail.episodeItems||[])Object.assign(episode,{coverUrl:episode.coverUrl||poster,posterPath:episode.posterPath||poster,backdropPath:episode.backdropPath||poster});
 }
 cpLastDetail=detail;return detail;
};
// Read preparation belongs to one serialized public resource operation, never storage.
let cpReadOperation=null;
function cpReadKey(provider,shareId,passcode,label){
 const profile=cpActiveProfile||cpProfile;cpCheck(profile);
 return JSON.stringify([profile,provider,String(shareId||""),String(passcode||""),label]);
}
function cpTrackRead(task,operation=cpReadOperation){
 if(operation&&operation.pending){operation.pending.add(task);task.then(()=>operation.pending.delete(task),()=>operation.pending.delete(task));}
 // Attach a rejection observer even when a caller abandons preparation on an error.
 task.catch(()=>{});return task;
}
async function cpWithReadOperation(work){
 const previous=cpReadOperation,operation=new Map();operation.pending=new Set();cpReadOperation=operation;
 try{return await work();}
 finally{if(operation.betaQuarkFolder&&!operation.betaQuarkFolder.used)operation.betaQuarkFolder.token.cancel();if(operation.betaBaiduUid)for(const entry of operation.betaBaiduUid.values())if(!entry.used)entry.token.cancel();if(operation.betaTianyiAuth)for(const entry of operation.betaTianyiAuth.values())if(!entry.used)entry.token.cancel();while(operation.pending.size)await Promise.allSettled(Array.from(operation.pending));cpReadOperation=previous;}
}
function cpReadReuse(provider,shareId,passcode,label,work,valid=value=>!!value){
 const operation=cpReadOperation,profile=cpActiveProfile||cpProfile,key=cpReadKey(provider,shareId,passcode,label);
 if(!operation)return Promise.resolve().then(()=>{cpCheck(profile);return work();}).then(value=>{cpCheck(profile);return value;});
 let pending=operation.get(key);
 if(!pending){
  pending=Promise.resolve().then(()=>{cpCheck(profile);return work();}).then(value=>{cpCheck(profile);if(!valid(value)&&operation.get(key)===pending)operation.delete(key);return value;}).catch(error=>{if(operation.get(key)===pending)operation.delete(key);throw error;});
  operation.set(key,pending);cpTrackRead(pending,operation);
 }
 return pending.then(value=>{cpCheck(profile);return value;});
}
function cpReadInvalidate(provider,shareId,passcode,label){if(provider==="baidu"&&label==="verify"&&cpIoReuseEnabled())cpBaiduCacheSet(cpBaiduCacheKey("verify",[String(shareId||""),String(passcode||"")]),null);if(cpReadOperation)cpReadOperation.delete(cpReadKey(provider,shareId,passcode,label));}
// A slot encloses just the native URL getter. Subtitle work obtains its own slot afterwards.
const cpReadWaiting=[],cpReadRunning=new Map();let cpReadActive=0;
function cpPumpRead(){
 for(let index=0;index<cpReadWaiting.length&&cpReadActive<4;){
  const job=cpReadWaiting[index],count=cpReadRunning.get(job.provider)||0;
  if(count>=(job.provider==="quark"?1:2)){index++;continue;}
  cpReadWaiting.splice(index,1);cpReadActive++;cpReadRunning.set(job.provider,count+1);
  Promise.resolve().then(()=>{cpCheck(job.profile);return job.work();}).then(value=>{cpCheck(job.profile);return value;}).then(job.resolve,job.reject).finally(()=>{cpReadActive--;const left=(cpReadRunning.get(job.provider)||1)-1;if(left)cpReadRunning.set(job.provider,left);else cpReadRunning.delete(job.provider);cpPumpRead();});
 }
}
function cpScheduleRead(provider,work){
 const profile=cpActiveProfile||cpProfile;
 return cpTrackRead(new Promise((resolve,reject)=>{cpReadWaiting.push({provider,work,profile,resolve,reject});cpPumpRead();}));
}
const cpSessionStoken=getStoken,cpSessionUcToken=getUcToken,cpSessionBaiduVerify=baiduVerify,cpSessionCreateFolder=createFolder;
getStoken=function(shareId,passcode){return cpReadReuse("quark",shareId,passcode,"token",()=>cpSessionStoken(shareId,passcode));};
getUcToken=function(shareId,passcode){return cpReadReuse("uc",shareId,passcode,"token",()=>cpSessionUcToken(shareId,passcode));};
baiduVerify=function(share){return cpReadReuse("baidu",share.shareId,share.passcode,"verify",async()=>{
 const key=cpBaiduCacheKey("verify",[String(share.shareId||""),String(share.passcode||"")]),cached=cpBaiduCached(key,60000);
 if(typeof cached==="string"&&cached)return cached;
 try{const value=await cpSessionBaiduVerify(share);cpCheck(cpActiveProfile||cpProfile);if(typeof value==="string"&&value)cpBaiduRemember(key,value,60000);return value;}
 catch(error){if(error?.code==="AUTH_FAILED"||error?.code==="SHARE_EXPIRED")cpBaiduInvalidateAccount();throw error;}
 });};
createFolder=function(name,parent="0"){return cpReadReuse("quark","folder:"+parent,"",name,()=>cpSessionCreateFolder(name,parent),fid=>!!fid&&String(fid)!=="0");};
const cpSessionUcResource=getUcResource,cpSessionBaiduResource=getBaiduResource,cpSession115Resource=get115Resource;
getUcResource=function(info){return cpScheduleRead("uc",()=>cpSessionUcResource(info));};
getBaiduResource=function(info){return cpScheduleRead("baidu",()=>cpSessionBaiduResource(info));};
get115Resource=function(info){return cpScheduleRead("115",()=>cpSession115Resource(info));};
// A known file may refresh only its known parent. Read all parent pages but never recurse.
async function cpRefreshShareFile(provider,video){
 const parent=video.pdir_fid;
 if(!video.shareId||!video.fid||parent==null)throw cpError("FILE_NOT_FOUND");
 const list=await cpReadReuse(provider,video.shareId,video.passcode,"refresh-parent:"+String(parent),async()=>{
  const stoken=await cpReadReuse(provider,video.shareId,video.passcode,"refresh-token",()=>{
   cpReadInvalidate(provider,video.shareId,video.passcode,"token");
   return provider==="uc"?getUcToken(video.shareId,video.passcode):getStoken(video.shareId,video.passcode);
  });
  const files=[],seen=new Set();let received=0;
  for(let page=1;;page++){
   cpCoveragePage(cpCoverageFor(provider,video));
   const params={pr:provider==="uc"?"UCBrowser":"ucpro",fr:"pc",pwd_id:video.shareId,stoken,pdir_fid:parent,force:0,_page:page,_size:provider==="uc"?100:200,_fetch_total:1,_sort:"file_type:asc,file_name:asc"};
   let data,json;
   if(provider==="uc")data=await cpQueueCatalogRead(provider,()=>ucApi("share/sharepage/detail?"+toQuery(params)));
   else{json=await cpQueueCatalogRead(provider,()=>httpJson("GET","https://drive-h.quark.cn/1/clouddrive/share/sharepage/detail?"+toQuery(Object.assign({uc_param_str:"",ver:"2"},params)),null,quarkHeaders()));
    if(!json||(json.status!=null&&Number(json.status)!==200)||(json.code!=null&&Number(json.code)!==0))throw cpError("UPSTREAM_ERROR");data=json.data;}
   if(!data||!Array.isArray(data.list))throw cpError("UPSTREAM_ERROR");
   received+=data.list.length;
   files.push(...data.list.map(item=>Object.assign({},item,{shareId:video.shareId,passcode:video.passcode,stoken,pdir_fid:item.pdir_fid==null?parent:item.pdir_fid})));
   if(cpCatalogPageEnd(data.list,cpCatalogTotal(data,json),received,seen,item=>item.fid))break;
  }
  return files;
 });
 const selected=list.find(item=>!item.dir&&String(item.fid)===String(video.fid));
 if(!selected)throw cpError("FILE_NOT_FOUND");return Object.assign({},video,selected);
}

function cpRefreshBaiduVerify(video,rejected){return cpReadReuse("baidu",video.shareId,video.passcode,"verify-refresh:"+baiduSha1(String(rejected)),()=>{cpReadInvalidate("baidu",video.shareId,video.passcode,"verify");return baiduVerify(video);});}
async function cpQuarkPlayback(info,profile){
 if(!quanpanProviderEnabled("quark"))return [];let video=info.videoInfo||{};
 for(let attempt=0;attempt<2;attempt++){
  let fid;
  try{
   fid=await saveShareFile(video);const quality=cpSetting("quality","auto");let origin;
   if(quality!=="transcode")try{origin=await cpOrigin(fid);}catch(e){if(quality==="origin"||!["ORIGIN_ACCESS_DENIED","QUALITY_UNAVAILABLE"].includes(e.code))throw e;}
   if(origin)return [origin];
   const choices=await getPlayUrl(fid),best=choices.find(v=>v.resolution==="4k")||choices.find(v=>v.resolution==="2k")||choices[0];return best?[{name:"垮",description:"转码",url:best.url,resolution:({"4k":"2160p","2k":"1440p",super:"1080p",high:"720p",normal:"480p",low:"360p"})[best.resolution]||"",quality:"transcode",headers:playHeaders(),customHeaders:playHeaders()}]:[];
  }catch(e){
   cpCheck(profile);if(!fid||attempt||(e.code!=="FILE_NOT_FOUND"&&e.status!==404))throw e;
   cpWrite(cpTransferKey(video),{state:"failed"});
   video=await cpRefreshShareFile("quark",video);
  }
 }
 return [];
}

// The shared presenter predates named 123 lines; keep this new module's five-provider labels explicit.
const qpFormatResource=formatPlaybackResource;
formatPlaybackResource=function(resource,source,params){
 const result=qpFormatResource(resource,source,params);
 if(source.provider==="123")result.name=result.name.replace(" · 网盘", " · 123");
 result.packageSizeBytes=Number(source.packageSizeBytes||0);
 if(result.packageSizeBytes)result.description=[result.description,(source.packageSizeScope==='directory'?'目标目录 ':'分享包 ')+(result.packageSizeBytes/1073741824).toFixed(2)+" GB"].filter(Boolean).join(" · ");
 return result;
};

// Transfer mutations remain serialized, including subtitle saves and retries.
// Once a saved fid is available, read-only origin/transcode requests can overlap.
const qpSaveShareFile=saveShareFile;let qpMutationQueue=Promise.resolve();
saveShareFile=function(video){
 const profile=cpActiveProfile||cpProfile;
 const task=qpMutationQueue.then(()=>{cpCheck(profile);return qpSaveShareFile(video);});
 qpMutationQueue=task.catch(()=>{});return task;
};

// Reuse the Quanpan page reader for a known parent, including short pages without totals.
cpRefreshShareFile=async function(provider,video){
 const parent=video.pdir_fid;
 if(!video.shareId||!video.fid||parent==null)throw cpError("FILE_NOT_FOUND");
 const list=await cpReadReuse(provider,video.shareId,video.passcode,"refresh-parent:"+String(parent),async()=>{
  const stoken=await cpReadReuse(provider,video.shareId,video.passcode,"refresh-token",()=>{
   cpReadInvalidate(provider,video.shareId,video.passcode,"token");
   return provider==="uc"?getUcToken(video.shareId,video.passcode):getStoken(video.shareId,video.passcode);
  });
  const catalog=provider==="uc"?await getUcVideos({shareId:video.shareId,passcode:video.passcode},video):await getShareDetail(video.shareId,stoken,video);
  return catalog.list;
 });
 const selected=list.find(item=>String(item.fid)===String(video.fid));
 if(!selected)throw cpError("FILE_NOT_FOUND");return Object.assign({},video,selected);
};
// Same policy as the existing film modules: cache file indexes, never playback URLs.
const QP_INDEX_PREFIX="juhe.baidu.selected-index.",QP_INDEX_KEYS=QP_INDEX_PREFIX+"keys";
function qpSeriesIndexKey(params,linkInfo){
 const title=[params.seriesName,params.title,params.name,params.keyword,params.originalName,params.originalTitle,params.original_name,params.original_title].map(qpCleanQuery).find(Boolean)||"";
 return QP_INDEX_PREFIX+'search-v2:'+baiduSha1(JSON.stringify([getSite(params),cpActiveProfile||cpProfile,params.type||"tv",Number(params.season||1),title,params.tmdbId||params.tmdbID||"",params.imdbId||"",params.year||params.releaseYear||(params.type==="movie"?params.airDate:"")||"",linkInfo?.action==="detail"?linkInfo:params.cpSiteIdentity?{siteIdentity:params.cpSiteIdentity}:null,qpCandidateLimit(),cpRelevanceTitles(params),cpMovieCacheIdentity(params)]));
}
function qpSeriesIndexRead(key){
 let current;try{current=JSON.parse(safeStorageGet(key)||'null');}catch(_){}
 if(!(current?.expires>Date.now())){
  const previous=key.replace(QP_INDEX_PREFIX+'coverage-v1:',QP_INDEX_PREFIX).replace(QP_INDEX_PREFIX+'target-directory-v1:',QP_INDEX_PREFIX);
  if(previous!==key){const legacy=qpSeriesIndexRead(previous);if(legacy.candidates.length&&!Object.values(legacy.entries).some(entry=>entry.catalog?.cpTargetDirectory)){legacy.expires=Math.min(legacy.expires,Date.now()+14400000);qpSeriesIndexWrite(previous,legacy,rexCacheGeneration);return legacy;}}
 }
 try{const value=JSON.parse(safeStorageGet(key)||"null");
  if(value?.schemaVersion===4&&value.expires>Date.now()&&Array.isArray(value.candidates)&&value.candidates.every(c=>Array.isArray(c.shares)&&c.shares.length===1&&c.shares[0]?.provider&&c.shares[0]?.shareId)&&value.entries&&typeof value.entries==="object"&&Object.values(value.entries).every(entry=>Array.isArray(entry.catalog?.list)))return value;
 }catch(_){}
 return {candidates:[],entries:{}};
}
function qpSeriesIndexWrite(key,value,generation){
 cpCheck(cpActiveProfile||cpProfile);
 if(generation!==rexCacheGeneration)return;
 if(!value.candidates.length||!Object.keys(value.entries).length){safeStorageSet(key,"");return;}
 const entries=rexClone(value.entries);
 for(const entry of Object.values(entries))cpTargetStripUrls(entry.catalog);
 // Cache hits (including missing episodes) cannot postpone seeing future updates forever.
 const expires=Math.min(Number(value.expires)||Infinity,Date.now()+86400000);
 safeStorageSet(key,JSON.stringify({schemaVersion:4,expires,candidates:value.candidates,entries,cpMediaSchema:1,cpQuotaRows:value.cpQuotaRows}));
 let keys=[];try{keys=JSON.parse(safeStorageGet(QP_INDEX_KEYS)||"[]");}catch(_){}
 keys=keys.filter(item=>item!==key);keys.push(key);
 while(keys.length>16)safeStorageSet(keys.shift(),"");
 safeStorageSet(QP_INDEX_KEYS,JSON.stringify(keys));
}
function qpClearSeriesIndexes(){
 let keys=[];try{keys=JSON.parse(safeStorageGet(QP_INDEX_KEYS)||"[]");}catch(_){}
 keys.forEach(key=>safeStorageSet(key,""));safeStorageSet(QP_INDEX_KEYS,"[]");
}
// One serialized resource owner covers matching, native reads and all cleanup.
let qpOperation=null,qpOperationQueue=Promise.resolve();
function qpCheckOwner(owner){
 if(!owner)return;
 if(owner.signal?.aborted)throw cpError("ABORTED");
 if(owner.profile&&owner.profile!==baiduSha1(JSON.stringify(cpAccounts())))throw cpError("ACCOUNT_CHANGED");
}
const qpCheckNative=cpCheck;
cpCheck=function(profile){qpCheckOwner(qpOperation);return qpCheckNative(profile);};
const qpPublicDetail=loadDetail;
loadDetail=async function(...args){bindForwardParams({});return await qpPublicDetail.apply(this,args);};
const qpResourceEntry=loadResource;
loadResource=function(params={}){
 const owner={signal:params.signal||null,profile:null,tokenFailures:new Map(),catalogReads:new Set()};
 const task=qpOperationQueue.then(async()=>{
  const oldOwner=qpOperation,oldSignal=cpSignal,oldActive=cpActiveProfile,oldUid=cpBaiduUidScope;
  qpOperation=owner;
  try{
   bindForwardParams(params);owner.profile=cpProfile;cpActiveProfile=cpProfile;cpSignal=owner.signal;cpBaiduUidScope=new Map();
   cpWrite("last-error",null);cpBlockedProviders.clear();qpCheckOwner(owner);
   return await cpWithReadOperation(async()=>{
    cpCheck(owner.profile);const rows=await qpResourceEntry(params);cpCheck(owner.profile);
    const issue=cpRead("last-error");if(issue&&Array.isArray(rows)&&!rows.some(row=>row.url))throw cpError(issue.code);
    return rows;
   });
  }finally{qpOperation=oldOwner;cpSignal=oldSignal;cpActiveProfile=oldActive;cpBaiduUidScope=oldUid;}
 });
 qpOperationQueue=task.catch(()=>{});return task;
};
// Shared new-drive protocols. Local crypto and wire shapes adapted from the supplied reference.
// No catalog writes, previews, deletion, Node APIs, or remotely loaded code.
function cpNPUtf8Encode(text) {
  const encoded = encodeURIComponent(text),
    bytes = [];
  for (let i = 0; i < encoded.length; i++) {
    if (encoded[i] === "%") {
      bytes.push(parseInt(encoded.slice(i + 1, i + 3), 16));
      i += 2;
    } else bytes.push(encoded.charCodeAt(i));
  }
  return new Uint8Array(bytes);
}
function cpNPUtf8Decode(bytes) {
  return decodeURIComponent(Array.from(bytes, (b) => "%" + b.toString(16).padStart(2, "0")).join(""));
}
const cpNPP115_BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function cpNPBase64Encode(bytes) {
  let text = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const n = (bytes[i] << 16) | ((bytes[i + 1] || 0) << 8) | (bytes[i + 2] || 0);
    text +=
      cpNPP115_BASE64[(n >>> 18) & 63] +
      cpNPP115_BASE64[(n >>> 12) & 63] +
      (i + 1 < bytes.length ? cpNPP115_BASE64[(n >>> 6) & 63] : "=") +
      (i + 2 < bytes.length ? cpNPP115_BASE64[n & 63] : "=");
  }
  return text;
}
function cpNPBase64Decode(text) {
  const clean = String(text).replace(/\s/g, "");
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(clean) || clean.length % 4) throw new Error("伍加密响应Base64无效");
  const bytes = [];
  for (let i = 0; i < clean.length; i += 4) {
    const n =
      (cpNPP115_BASE64.indexOf(clean[i]) << 18) |
      (cpNPP115_BASE64.indexOf(clean[i + 1]) << 12) |
      ((cpNPP115_BASE64.indexOf(clean[i + 2]) & 63) << 6) |
      (cpNPP115_BASE64.indexOf(clean[i + 3]) & 63);
    bytes.push((n >>> 16) & 255);
    if (clean[i + 2] !== "=") bytes.push((n >>> 8) & 255);
    if (clean[i + 3] !== "=") bytes.push(n & 255);
  }
  return new Uint8Array(bytes);
}


function cpNPPanJwt(token) {
  try {
    let payload = String(token || "")
      .replace(/^Bearer\s+/i, "")
      .split(".")[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    while (payload.length % 4) payload += "=";
    return JSON.parse(cpNPUtf8Decode(cpNPBase64Decode(payload)));
  } catch (_) {
    return {};
  }
}

function cpNPPanTokenExpired(auth) {
  const expires = Number(cpNPPanJwt(auth.accessToken).exp || 0) * 1000;
  return !auth.accessToken || (expires > 0 && expires <= Date.now() + 60000);
}


function cpNPMd5(text) {
  const bytes = Array.from(cpNPUtf8Encode(String(text)));
  const length = bytes.length;
  bytes.push(128);
  while (bytes.length % 64 !== 56) bytes.push(0);
  for (let i = 0; i < 8; i++) bytes.push(Math.floor((length * 8) / Math.pow(256, i)) & 255);
  const shifts = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21];
  let h0 = 0x67452301,
    h1 = 0xefcdab89,
    h2 = 0x98badcfe,
    h3 = 0x10325476;
  for (let offset = 0; offset < bytes.length; offset += 64) {
    const words = [];
    for (let i = 0; i < 16; i++) {
      const pos = offset + i * 4;
      words.push(bytes[pos] | (bytes[pos + 1] << 8) | (bytes[pos + 2] << 16) | (bytes[pos + 3] << 24));
    }
    let a = h0,
      b = h1,
      c = h2,
      d = h3;
    for (let i = 0; i < 64; i++) {
      let f, g;
      if (i < 16) {
        f = (b & c) | (~b & d);
        g = i;
      } else if (i < 32) {
        f = (d & b) | (~d & c);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        f = b ^ c ^ d;
        g = (3 * i + 5) % 16;
      } else {
        f = c ^ (b | ~d);
        g = (7 * i) % 16;
      }
      const sum = (a + f + Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296) + words[g]) | 0;
      const shift = shifts[Math.floor(i / 16) * 4 + (i % 4)];
      const previousD = d;
      d = c;
      c = b;
      b = (b + ((sum << shift) | (sum >>> (32 - shift)))) | 0;
      a = previousD;
    }
    h0 = (h0 + a) | 0;
    h1 = (h1 + b) | 0;
    h2 = (h2 + c) | 0;
    h3 = (h3 + d) | 0;
  }
  return [h0, h1, h2, h3]
    .map((word) => [0, 8, 16, 24].map((shift) => ((word >>> shift) & 255).toString(16).padStart(2, "0")).join(""))
    .join("");
}

function cpNPGfMultiply(a, b) {
  let value = 0;
  while (b) {
    if (b & 1) value ^= a;
    a = ((a << 1) ^ (a & 128 ? 0x11b : 0)) & 255;
    b >>= 1;
  }
  return value;
}

const cpNPAesTables = (() => {
  const sbox = [],
    inverse = [];
  for (let x = 0; x < 256; x++) {
    let inv = 0;
    if (x) {
      inv = 1;
      for (let i = 0; i < 254; i++) inv = cpNPGfMultiply(inv, x);
    }
    let value = inv ^ 0x63;
    for (let shift = 1; shift <= 4; shift++) value ^= ((inv << shift) | (inv >>> (8 - shift))) & 255;
    sbox[x] = value;
    inverse[value] = x;
  }
  const key = Array.from(cpNPUtf8Encode("PVGDwmcvfs1uV3d1"));
  let rcon = 1;
  while (key.length < 176) {
    let word = key.slice(-4);
    if (key.length % 16 === 0) {
      word = [sbox[word[1]] ^ rcon, sbox[word[2]], sbox[word[3]], sbox[word[0]]];
      rcon = cpNPGfMultiply(rcon, 2);
    }
    for (const value of word) key.push(key[key.length - 16] ^ value);
  }
  return { sbox, inverse, key };
})();

function cpNPAesBlock(block, decrypt) {
  let state = Array.from(block);
  const { sbox, inverse, key } = cpNPAesTables;
  const addKey = (round) => {
    state = state.map((value, i) => value ^ key[round * 16 + i]);
  };
  const sub = (table) => {
    state = state.map((value) => table[value]);
  };
  const shiftRows = (reverse) => {
    const before = state.slice();
    for (let row = 0; row < 4; row++)
      for (let col = 0; col < 4; col++) {
        state[row + col * 4] = before[row + ((col + (reverse ? 4 - row : row)) % 4) * 4];
      }
  };
  const mixColumns = (reverse) => {
    const factors = reverse ? [14, 11, 13, 9] : [2, 3, 1, 1];
    const before = state.slice();
    for (let col = 0; col < 4; col++)
      for (let row = 0; row < 4; row++) {
        let value = 0;
        for (let i = 0; i < 4; i++) value ^= cpNPGfMultiply(before[col * 4 + i], factors[(i - row + 4) % 4]);
        state[col * 4 + row] = value;
      }
  };
  addKey(decrypt ? 10 : 0);
  for (let round = 1; round < 10; round++) {
    if (decrypt) {
      shiftRows(true);
      sub(inverse);
      addKey(10 - round);
      mixColumns(true);
    } else {
      sub(sbox);
      shiftRows(false);
      mixColumns(false);
      addKey(round);
    }
  }
  if (decrypt) {
    shiftRows(true);
    sub(inverse);
    addKey(0);
  } else {
    sub(sbox);
    shiftRows(false);
    addKey(10);
  }
  return state;
}

function cpNPYidongEncrypt(value) {
  const bytes = Array.from(cpNPUtf8Encode(typeof value === "string" ? value : JSON.stringify(value)));
  const padding = 16 - (bytes.length % 16);
  for (let i = 0; i < padding; i++) bytes.push(padding);
  const iv = Array.from({ length: 16 }, () => Math.floor(Math.random() * 256));
  const output = iv.slice();
  let previous = iv;
  for (let offset = 0; offset < bytes.length; offset += 16) {
    previous = cpNPAesBlock(
      bytes.slice(offset, offset + 16).map((value, i) => value ^ previous[i]),
      false
    );
    output.push(...previous);
  }
  return cpNPBase64Encode(output);
}

function cpNPYidongDecrypt(value) {
  const bytes = Array.from(cpNPBase64Decode(String(value)));
  if (bytes.length < 32 || bytes.length % 16) throw new Error("移动网盘返回的加密数据无效");
  const output = [];
  for (let offset = 16; offset < bytes.length; offset += 16) {
    output.push(...cpNPAesBlock(bytes.slice(offset, offset + 16), true).map((byte, i) => byte ^ bytes[offset - 16 + i]));
  }
  const padding = output[output.length - 1];
  if (padding < 1 || padding > 16 || output.slice(-padding).some((byte) => byte !== padding))
    throw new Error("移动网盘数据解密失败");
  return cpNPUtf8Decode(output.slice(0, -padding));
}


const cpNPXUNLEI_APP_UA =
  "ANDROID-com.xunlei.downloadprovider/8.31.0.9726 netWorkType/5G appid/40 deviceName/Xiaomi_M2004j7ac deviceModel/M2004J7AC OSVersion/12 protocolVersion/301 platformVersion/10 sdkVersion/512000 Oauth2Client/0.9 (Linux 4_14_186-perf-gddfs8vbb238b) (JAVA 0)";
const cpNPXUNLEI_APP_SIGN = [
  "9uJNVj/wLmdwKrJaVj/omlQ",
  "Oz64Lp0GigmChHMf/6TNfxx7O9PyopcczMsnf",
  "Eb+L7Ce+Ej48u",
  "jKY0",
  "ASr0zCl6v8W4aidjPK5KHd1Lq3t+vBFf41dqv5+fnOd",
  "wQlozdg6r1qxh0eRmt3QgNXOvSZO6q/GXK",
  "gmirk+ciAvIgA/cxUUCema47jr/YToixTT+Q6O",
  "5IiCoM9B1/788ntB",
  "P07JH0h6qoM6TSUAK2aL9T5s2QBVeY9JWvalf",
  "+oK0AN"
];
const cpNPXUNLEI_SHARE_SIGN = [
  "QG3/GhopO+5+T",
  "1Sv94+ANND3lDmmw",
  "q2eTxRva8b3B5d",
  "m2",
  "VIc5CZRBMU71ENfbOh0+RgWIuzLy",
  "66M8Wpw6nkBEekOtL6e",
  "N0rucK7S8W/vrRkfPto5urIJJS8dVY0S",
  "oLAR7pdUVUAp9xcuHWzrU057aUhdCJrt",
  "6lxcykBSsfI//GR9",
  "r50cz+1I4gbU/fk8",
  "tdwzrTc4SNFC4marNGTgf05flC85A",
  "qvNVUDFjfsOMqvdi2gB8gCvtaJAIqxXs"
];

function cpNPXunleiContext(auth,share){
 const jwt=cpNPPanJwt(auth.accessToken),audience=Array.isArray(jwt.aud)?jwt.aud[0]:jwt.aud;
 const web=auth.clientId==='XW-G4v1H72tgfJym'||audience==='XW-G4v1H72tgfJym'||auth.clientKind==='web';
 return {clientId:share?'Xqp0kJBXWhwaTpB6':web?'XW-G4v1H72tgfJym':'Xp6vsxz_7IYVw2BB',deviceId:share?'1bf91caf40093318e8040916eb7ad16a':auth.deviceId||jwt.device_id||(web?'652c6bb3cacdb4b80e852dfc3cb3cca4':cpNPMd5('CatVodOpenXunlei')),version:share?'1.92.9':web?'3.1.5':'8.31.0.9726',packageName:share?'pan.xunlei.com':web?'ThunderPanPlugin':'com.xunlei.downloadprovider',userAgent:share||web?UA:cpNPXUNLEI_APP_UA,userId:auth.userId||auth.user_id||jwt.sub||'',web};
}

function cpNPGuangyaHeaders(auth) {
  const headers = {
    "User-Agent": UA,
    Accept: "application/json, text/plain, */*",
    Origin: "https://www.guangyapan.com",
    Referer: "https://www.guangyapan.com/",
    Did: (auth && auth.deviceId) || "0123456789abcdef0123456789abcdef",
    Dt: "4"
  };
  if (auth && auth.accessToken) headers.Authorization = "Bearer " + auth.accessToken;
  return headers;
}


function cpNPXunleiOriginalUrl(file = {}) {
  const original = (file.medias || []).find(
    (media) =>
      media.is_visible !== false &&
      media.link &&
      /^https?:\/\//i.test(media.link.url || "") &&
      (media.is_origin === true ||
        media.is_origin === 1 ||
        /^(?:原画|原始|original|source)$/i.test(String(media.resolution_name || media.media_name || "").trim()))
  );
  if (original) return original.link.url;
  return (
    (file.links && file.links["application/octet-stream"] && file.links["application/octet-stream"].url) ||
    file.web_content_link ||
    ""
  );
}


function cpNPGuangyaDownloadUrl(data) {
  const url = data && (data.signedURL || data.signedUrl || data.downloadUrl || data.url);
  if (typeof url === "string" && /^https?:\/\//i.test(url)) return url;
  for (const key of [
    "downloadInfo",
    "fileInfo",
    "resource",
    "normal",
    "data",
    "list",
    "urls",
    "downloadUrls",
    "resources"
  ]) {
    const nested = data && data[key];
    if (!nested || typeof nested !== "object") continue;
    for (const item of Array.isArray(nested) ? nested : [nested]) {
      const found =
        typeof item === "string" ? item : item && (item.signedURL || item.signedUrl || item.downloadUrl || item.url);
      if (/^https?:\/\//i.test(found || "")) return found;
    }
  }
  return "";
}


const cpNPYIDONG_API = "https://share-kd-njs.yun.139.com/yun-share/richlifeApp/devapp/IOutLink/";

function cpNPYidongHeaders(payload, signed) {
  const headers = {
    "User-Agent": UA,
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    Referer: "https://yun.139.com/shareweb/",
    "hcy-cool-flag": "1",
    "x-deviceinfo": "||3|12.27.0|chrome|131.0.0.0|5c7c68368f048245e1ce47f1c0f8f2d0||windows 10|1536X695|zh-CN|||"
  };
  if (signed) {
    const now = new Date(),
      pad = (value) => String(value).padStart(2, "0");
    const time =
      now.getFullYear() +
      "-" +
      pad(now.getMonth() + 1) +
      "-" +
      pad(now.getDate()) +
      " " +
      pad(now.getHours()) +
      ":" +
      pad(now.getMinutes()) +
      ":" +
      pad(now.getSeconds());
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const nonce = Array.from({ length: 16 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
    const body = encodeURIComponent(JSON.stringify(payload)).split("").sort().join("");
    const sign = cpNPMd5(cpNPMd5(cpNPBase64Encode(cpNPUtf8Encode(body))) + cpNPMd5(time + ":" + nonce)).toUpperCase();
    Object.assign(headers, {
      "X-Requested-With": "XMLHttpRequest",
      "CMS-DEVICE": "default",
      "x-yun-channel-source": "10230043",
      "x-huawei-channelSrc": "10230043",
      "x-yun-svc-type": "1",
      "x-SvcType": "1",
      "x-m4c-caller": "PC",
      "x-m4c-src": "10002",
      "x-inner-ntwk": "2",
      "mcloud-route": "001",
      "mcloud-version": "12.27.0",
      "mcloud-channel": "1000101",
      "mcloud-client": "1001000021",
      "mcloud-sign": time + "," + nonce + "," + sign,
      "INNER-HCY-ROUTER-HTTPS": "1",
      "x-yun-module-type": "100",
      "x-yun-api-version": "v1",
      "x-yun-app-channel": "10230043",
      "x-yun-client-info": "||9|12.27.0|chrome|131.0.0.0|visitor||windows 10||zh-CN|||Y2hyb21l||"
    });
  }
  return headers;
}


function cpNPYidongDownloadUrl(data) {
  if (typeof data === "string" && /^https?:\/\//i.test(data)) return data;
  const ext = (data && data.extInfo) || {};
  const item = (Array.isArray(ext.item) ? ext.item : []).find((item) => item.key === "cdnDownloadUrl" && item.value);
  return String(
    ext.cdnDownloadUrl ||
      (item && item.value) ||
      (data && (data.downloadURL || data.downloadUrl || data.redrUrl || data.url)) ||
      ""
  ).trim();
}


function cpNPGuard(provider, profile) {
 cpCheck(profile);
 const active = cpNewPanAssert(provider);
 cpCheck(profile);
 if (active !== profile) throw cpError('ACCOUNT_CHANGED');
}
function cpNPReadAuth(provider) {
 const raw=String(cpNewPanAuthValue(provider)||'').trim();if(!raw)throw cpError('AUTH_FAILED');
 let auth;try{auth=raw.startsWith('{')?JSON.parse(raw):{accessToken:raw};}catch(_){throw cpError('AUTH_FAILED');}
 if(!auth||typeof auth!=='object'||Array.isArray(auth))throw cpError('AUTH_FAILED');
 if(provider==='xunlei'){
  const session=auth.appSession||auth.webSession;
  if(session&&(typeof session!=='object'||Array.isArray(session)))throw cpError('AUTH_FAILED');
  if(session){const kind=auth.appSession?'app':'web';auth=Object.assign({},auth,session);if(!auth.clientKind)auth.clientKind=kind;}
  delete auth.appSession;delete auth.webSession;
 }
 const headers=auth.headers||{};
 auth.accessToken=String(auth.accessToken||auth.access_token||auth.auth||auth.authorization||headers.Authorization||headers.authorization||'').replace(/^Bearer\s+/i,'').trim();
 auth.refreshToken=String(auth.refreshToken||auth.refresh_token||'').trim();auth.deviceId=String(auth.deviceId||auth.device_id||'').trim();
 if(!auth.accessToken&&!auth.refreshToken)throw cpError('AUTH_FAILED');
 // A website Cookie is not a bearer token. There is no Cookie bootstrap path.
 if(provider==='xunlei'&&auth.accessToken&&!/^[A-Za-z0-9._~+/-]+=*$/.test(auth.accessToken))throw cpError('AUTH_FAILED');
 return auth;
}
function cpNPFailure(status, code, message) {
 const n=Number(code),text=String(message||'');
 const kind=status===429||n===429||/rate.?limit|too many|频繁|限流/i.test(text)?'RATE_LIMITED':
 [401,403].includes(status)||[10,16,117,401,403,4121,4122].includes(n)||/unauthori[sz]ed|invalid.?token|token.?expired|登录失效|登录过期|鉴权失败|captcha_invalid|captcha_required/i.test(text)?'AUTH_FAILED':'UPSTREAM_ERROR';
 const error=cpError(kind);error.status=status;error.apiCode=code;return error;
}
async function cpNPHttp(provider,profile,method,url,body,headers,beforeDispatch,readToken) {
 cpNPGuard(provider,profile);
 const work=()=>{cpNPGuard(provider,profile);const options={timeout:15000,headers:Object.assign({'User-Agent':UA,'Content-Type':'application/json'},headers||{})};if(readToken)options.cpB6Token=readToken;const claim=()=>{cpNPGuard(provider,profile);if(beforeDispatch)beforeDispatch();};if(method==='GET'&&typeof cpHttpGet==='function')return cpHttpGet(url,options,claim);if(method!=='GET'&&typeof cpHttpPost==='function')return cpHttpPost(url,body,options,claim);claim();return method==='GET'?Widget.http.get(url,options):Widget.http.post(url,body,options);};
 let response;
 try {response=await (typeof cpQueueCatalogRead==='function'?cpQueueCatalogRead(provider,work):work());}
 catch(error){if(readToken?.cancelled)throw cpB6Unused();cpNPGuard(provider,profile);if(error&&['ACCOUNT_CHANGED','ABORTED','OPERATION_TIMEOUT','AUTH_FAILED','RATE_LIMITED','TRANSFER_UNCERTAIN'].includes(error.code))throw error;const status=Number(error&&(error.status||error.statusCode||error.response?.status));throw cpNPFailure(status,undefined,error&&error.message);}
 if(readToken?.cancelled)throw cpB6Unused();
 cpNPGuard(provider,profile);
 const status=Number(response&&(response.status||response.statusCode)||200);
 if(status>=400){let data=response&&response.data;try{if(typeof data==='string')data=JSON.parse(data);}catch(_){}throw cpNPFailure(status,data&&(data.error_code??data.errorCode??data.res_code??data.code),data&&[data.error,data.error_description,data.message,data.msg,data.res_message].filter(Boolean).join(' '));}
 return response&&response.data;
}
async function cpNPJson(provider,profile,method,url,body,headers,beforeDispatch,readToken) {
 let data=await cpNPHttp(provider,profile,method,url,method==='GET'?null:JSON.stringify(body||{}),headers,beforeDispatch,readToken);
 try {if(typeof data==='string')data=JSON.parse(data);}catch(_){throw cpError('UPSTREAM_ERROR');}
 const code=data&&(data.error_code??data.errorCode??data.code);
 if(!data||typeof data!=='object'||data.error||(code!==undefined&&![0,200].includes(Number(code))))throw cpNPFailure(200,code,data&&(data.error_description||data.msg||data.message||data.error));
 return data;
}
function cpNPQuery(value){return Object.keys(value).map(key=>encodeURIComponent(key)+'='+encodeURIComponent(String(value[key]))).join('&');}
function cpNPVideo(name){return /\.(?:mkv|mp4|m4v|avi|mov|wmv|flv|ts|m2ts|webm|mpg|mpeg|rmvb|iso)$/i.test(String(name||''));}
function cpNPItem(share,fid,name,size,parentPath,extra){return Object.assign({provider:share.provider,fid:String(fid),file_name:String(name||''),size:Number(size||0),shareId:share.shareId,passcode:share.passcode||'',parentPath},extra||{});}
function cpNPResource(provider,url,headers){if(!/^https?:\/\//i.test(String(url||'')))throw cpError('QUALITY_UNAVAILABLE');return [{name:{xunlei:'迅雷',guangya:'光鸭',yidong:'移动云盘',tianyi:'天翼云盘'}[provider],description:'原画',url,headers,customHeaders:Object.assign({},headers)}];}
function cpNPWrite(profile,provider,key,value){cpNPGuard(provider,profile);cpWrite(key,value);cpNPGuard(provider,profile);}
function cpNPKey(profile,provider,parts){cpNPGuard(provider,profile);return 'transfer:'+provider+':'+cpNewPanIdentity(provider)+':'+cpNPMd5(JSON.stringify(parts));}
function cpNPLimit(count){if(count>1000)throw cpError('UPSTREAM_ERROR');}
function cpNPRows(data,key){if(!data||!Array.isArray(data[key]))throw cpError('UPSTREAM_ERROR');return data[key];}
function cpNPSeenPage(items,seen,id){let added=0;for(const item of items){const value=String(id(item)||'');if(!value)throw cpError('UPSTREAM_ERROR');if(!seen.has(value)){seen.add(value);added++;}}if(items.length&&!added)throw cpError('UPSTREAM_ERROR');return added;}
function cpParseNewPanLinks(text) {
 const input=String(text||''),matches=[...input.matchAll(/https?:\/\/[^\s\u0001<>"'，。；（()）]+/gi)],list=[],seen=new Set();
 for(let i=0;i<matches.length;i++){
  const match=matches[i],url=match[0].replace(/[.,;!]+$/,''),domain=(/^https?:\/\/([^/?#]+)/i.exec(url)||[])[1]?.toLowerCase();let provider,id;
  if(domain==='pan.xunlei.com'){provider='xunlei';id=(/\/s\/([A-Za-z0-9_-]+)/.exec(url)||[])[1];}
  else if(['guangyapan.com','www.guangyapan.com'].includes(domain)){provider='guangya';id=(/\/s\/([A-Za-z0-9_-]+)/.exec(url)||[])[1];}
  else if(['yun.139.com','caiyun.139.com'].includes(domain)){provider='yidong';id=(/\/(?:w|m)\/i(?:\/|\?)([A-Za-z0-9_-]+)/.exec(url)||[])[1];}
  else if(domain==='cloud.189.cn'){provider='tianyi';id=(/\/t\/([A-Za-z0-9_-]+)/.exec(url)||[])[1]||(/[?&]code=([A-Za-z0-9_-]+)(?:[&#]|$)/.exec(url)||[])[1];}
  if(!id)continue;
  const after=input.slice(match.index+match[0].length,i+1<matches.length?matches[i+1].index:input.length).slice(0,100).split('\u0001',1)[0];
  const passcode=(/[?&](?:pwd|password|passcode|accessCode)=([A-Za-z0-9]{4,8})(?:[&#]|$)/i.exec(url)||[])[1]||(provider==='guangya'&&(/#([A-Za-z0-9]{4,8})$/.exec(url)||[])[1])||(provider!=='tianyi'&&(/[?&]code=([A-Za-z0-9]{4,8})(?:[&#]|$)/i.exec(url)||[])[1])||(/(?:提取码|访问码|密码)\s*[:：]?\s*([A-Za-z0-9]{4,8})(?![A-Za-z0-9])/i.exec(after)||[])[1]||'';
  const identity=JSON.stringify([provider,id,passcode]);if(seen.has(identity))continue;seen.add(identity);list.push({key:provider+':'+id,provider,shareId:id,passcode,url});
 }
 return list;
}
// Refresh tokens can be single-use. Commit the response inside the physical
// request work, before the host pool's operation-profile postguard can reject it.
// This exception only preserves the same provider's session; no resource escapes
// the individual waiter's cancellation/account guard.
function cpNPIdentityGuard(provider,identity){if(cpNewPanIdentity(provider)!==identity)throw cpError('ACCOUNT_CHANGED');}
async function cpNPRefreshRequest(provider,profile,url,body,headers,previous,identity,update){
 cpNPGuard(provider,profile);
 const work=async()=>{
  cpNPGuard(provider,profile);
  let response;
  // A consumed one-use refresh must retain its successful rotation for the same
  // configured drive, even if this owner expires. Use the bounded raw transport;
  // the pool and individual waiter still fence every resource continuation.
  try{const options={timeout:15000,headers:Object.assign({'User-Agent':UA,'Content-Type':'application/json'},headers||{})};response=await (typeof cpResourceRequest==='function'?cpResourceRequest('post',url,JSON.stringify(body),options):Widget.http.post(url,JSON.stringify(body),options));}
  catch(error){cpNPIdentityGuard(provider,identity);if(['ACCOUNT_CHANGED','ABORTED','OPERATION_TIMEOUT'].includes(error?.code))throw error;const status=Number(error&&(error.status||error.statusCode||error.response?.status));throw cpNPFailure(status,undefined,error&&error.message);}
  cpNPIdentityGuard(provider,identity);
  const status=Number(response&&(response.status||response.statusCode)||200);if(status>=400)throw cpNPFailure(status);
  let data=response&&response.data;try{if(typeof data==='string')data=JSON.parse(data);}catch(_){throw cpError('UPSTREAM_ERROR');}
  const code=data&&(data.error_code??data.errorCode??data.code);
  if(!data||typeof data!=='object'||data.error||(code!==undefined&&![0,200].includes(Number(code))))throw cpNPFailure(200,code,data&&(data.error_description||data.msg||data.message||data.error));
  const auth=update(data);cpNPIdentityGuard(provider,identity);
  cpNewPanCommitSession(provider,JSON.stringify(auth),previous,identity);
  cpNPIdentityGuard(provider,identity);return cpNPReadAuth(provider);
 };
 return typeof cpQueueCatalogRead==='function'?cpQueueCatalogRead(provider,work):work();
}
// Share only refresh work for the same configured drive identity. Every waiter
// keeps its own operation profile and must pass its own cancellation/account guard.
const cpNPRefreshes=new Map();
async function cpNPRefreshAuth(provider,profile,work,restarted=false){
 cpNPGuard(provider,profile);const identity=cpNewPanIdentity(provider),key=provider+':'+identity;
 let job=cpNPRefreshes.get(key);
 if(!job){
  const previous=cpNewPanAuthValue(provider);job={profile};
  job.promise=Promise.resolve().then(()=>work(identity)).catch(error=>{
   cpNPIdentityGuard(provider,identity);
   // A different module may have rotated the one-use refresh token first.
   // Reuse only an actually changed, valid session under the captured config.
   if(['AUTH_FAILED','ACCOUNT_CHANGED','ABORTED','OPERATION_TIMEOUT'].includes(error?.code)&&cpNewPanAuthValue(provider)!==previous){const winner=cpNPReadAuth(provider);if(!cpNPPanTokenExpired(winner))return winner;}
   throw error;
  }).finally(()=>{if(cpNPRefreshes.get(key)===job)cpNPRefreshes.delete(key);});
  cpNPRefreshes.set(key,job);
 }
 try {await job.promise;}
 catch(error){
  cpNPGuard(provider,profile);
  // A newer operation may share config but have a new overall profile. A stale
  // owner's account guard must not poison this valid operation's refresh.
  if(!restarted&&error?.code==='ACCOUNT_CHANGED'&&job.profile!==profile&&cpNewPanIdentity(provider)===identity)return cpNPRefreshAuth(provider,profile,work,true);
  throw error;
 }
 cpNPGuard(provider,profile);if(cpNewPanIdentity(provider)!==identity)throw cpError('ACCOUNT_CHANGED');
 const auth=cpNPReadAuth(provider);if(cpNPPanTokenExpired(auth))throw cpError('AUTH_FAILED');return auth;
}
function cpNPRefreshXunleiAuth(profile){return cpNPRefreshAuth('xunlei',profile,identity=>cpNPDoRefreshXunleiAuth(profile,identity));}
function cpNPRefreshGuangyaAuth(profile){return cpNPRefreshAuth('guangya',profile,identity=>cpNPDoRefreshGuangyaAuth(profile,identity));}
async function cpNPDoRefreshXunleiAuth(profile,identity) {
 const provider='xunlei';cpNPGuard(provider,profile);const previous=cpNewPanAuthValue(provider),auth=cpNPReadAuth(provider);if(!auth.refreshToken)throw cpError('AUTH_FAILED');const context=cpNPXunleiContext(auth,false);
 return cpNPRefreshRequest(provider,profile,'https://xluser-ssl.xunlei.com/v1/auth/token',{client_id:context.clientId,client_secret:context.web?'Qbaferw2knfQKqxa25EYJGtZ2_6755CMwzXBN3ctW54':'Xp6vsy4tN9toTVdMSpomVdXpRmES',grant_type:'refresh_token',refresh_token:auth.refreshToken},{'User-Agent':context.userAgent,'x-client-id':context.clientId,'x-device-id':context.deviceId},previous,identity,data=>{
  if(!data.access_token)throw cpError('AUTH_FAILED');return Object.assign(auth,{accessToken:data.access_token,refreshToken:data.refresh_token||auth.refreshToken,userId:data.user_id||context.userId,deviceId:context.deviceId,clientId:context.clientId});
 });
}
async function cpNPXunleiCaptcha(action,auth,share,profile,readToken) {
 const context=cpNPXunleiContext(auth,share),timestamp=String(Date.now());let sign=context.clientId+context.version+context.packageName+context.deviceId+timestamp;
 for(const salt of share?cpNPXUNLEI_SHARE_SIGN:cpNPXUNLEI_APP_SIGN)sign=cpNPMd5(sign+salt);
 const meta={client_version:context.version,package_name:context.packageName,timestamp,user_id:context.userId,captcha_sign:!share&&context.web?'1.ee2cef5f061a7cdf4374df81b370d2ec':'1.'+sign};
 const body={client_id:context.clientId,action,device_id:context.deviceId,captcha_token:'',meta};if(share)Object.assign(meta,{username:'',phone_number:'',email:''});else if(!context.web)body.redirect_uri='xlaccsdk01://xunlei.com/callback?state=harbor';
 const headers={'User-Agent':context.userAgent,'x-client-id':context.clientId,'x-device-id':context.deviceId};const data=await cpNPJson('xunlei',profile,'POST','https://xluser-ssl.xunlei.com/v1/shield/captcha/init',body,headers,undefined,readToken);if(!data.captcha_token||data.url)throw cpError('AUTH_FAILED');return Object.assign(headers,{'x-captcha-token':data.captcha_token,'x-client-version':context.version});
}
async function cpNPXunleiApi(method,path,body,share,profile,retry=true,beforeDispatch,readToken) {
 cpNPGuard('xunlei',profile);let auth=cpNPReadAuth('xunlei');if(!share&&cpNPPanTokenExpired(auth))auth=await cpNPRefreshXunleiAuth(profile);
 const action=share?'/drive/v1/share':path.startsWith('drive/v1/files')?'drive/v1/files':path.split('?')[0];const headers=await cpNPXunleiCaptcha(method+':'+action,auth,share,profile,readToken);if(!share)headers.Authorization='Bearer '+auth.accessToken;
 try{
  const data=await cpNPJson('xunlei',profile,method,'https://api-pan.xunlei.com/'+path,body,headers,beforeDispatch,readToken);
  // Share failures can arrive as HTTP 200 with an empty files array.
  if(share&&data.share_status&&data.share_status!=='OK'){
   if(['DELETED','EXPIRED','CANCELLED','CANCELED','NOT_FOUND'].includes(data.share_status))throw cpError('SHARE_EXPIRED');
   const error=cpError('UPSTREAM_ERROR');
   if(/^PASS_CODE_/.test(data.share_status))error.message='迅雷分享提取码缺失或错误';
   throw error;
  }
  return data;
 }
 catch(error){if(!share&&method==='GET'&&retry&&error.code==='AUTH_FAILED'&&auth.refreshToken){await cpNPRefreshXunleiAuth(profile);return cpNPXunleiApi(method,path,body,share,profile,false,beforeDispatch,readToken);}throw error;}
}
async function cpNPDoRefreshGuangyaAuth(profile,identity) {
 const provider='guangya';cpNPGuard(provider,profile);const previous=cpNewPanAuthValue(provider),auth=cpNPReadAuth(provider);if(!auth.refreshToken)throw cpError('AUTH_FAILED');const id=auth.deviceId||'0123456789abcdef0123456789abcdef';
 const headers={'X-Client-Id':'aMe-8VSlkrbQXpUR','X-Client-Version':'0.0.1','X-Device-Id':id,'X-Device-Model':'chrome%2F147.0.0.0','X-Device-Name':'PC-Chrome','X-Device-Sign':'wdi10.'+id+'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx','X-Net-Work-Type':'NONE','X-OS-Version':'Win32','X-Platform-Version':'1','X-Protocol-Version':'301','X-Provider-Name':'NONE','X-SDK-Version':'9.0.2'};
 return cpNPRefreshRequest(provider,profile,'https://account.guangyapan.com/v1/auth/token',{client_id:'aMe-8VSlkrbQXpUR',grant_type:'refresh_token',refresh_token:auth.refreshToken},headers,previous,identity,data=>{
  if(!data.access_token&&!data.accessToken)throw cpError('AUTH_FAILED');return Object.assign(auth,{accessToken:data.access_token||data.accessToken,refreshToken:data.refresh_token||data.refreshToken||auth.refreshToken,deviceId:data.device_id||data.deviceId||id});
 });
}
async function cpNPGuangyaApi(path,body,own,profile,retry=true,beforeDispatch,readToken) {
 cpNPGuard('guangya',profile);let auth=cpNPReadAuth('guangya');if(own&&cpNPPanTokenExpired(auth))auth=await cpNPRefreshGuangyaAuth(profile);
 const readonly=!/\/(?:restore_share|create_dir)$/.test(path);
 try {const data=await cpNPJson('guangya',profile,'POST','https://api.guangyapan.com'+path,body,cpNPGuangyaHeaders(own?auth:null),beforeDispatch,readToken);if(own&&path==='/userres/v1/file/get_file_list'&&data.msg==='success'&&data.data&&typeof data.data==='object'&&!Array.isArray(data.data)&&Object.keys(data.data).length===0)return {list:[],total:0};return data.data||{};}
 catch(error){if(own&&readonly&&retry&&error.code==='AUTH_FAILED'&&auth.refreshToken){await cpNPRefreshGuangyaAuth(profile);return cpNPGuangyaApi(path,body,own,profile,false,beforeDispatch,readToken);}throw error;}
}
async function cpNPGuangyaShareToken(share,profile){const data=await cpNPGuangyaApi('/userres/v1/get_share_access_token',Object.assign({shareId:share.shareId},share.passcode?{code:share.passcode}:{}),false,profile);if(!data.accessToken)throw cpError('AUTH_FAILED');return data.accessToken;}
let cpNPXunleiCatalog;
async function cpNPGuangyaPages(parentId,token,own,profile,onPage,readToken,scope){
 const rows=[],seen=new Set(),pages=new Set();let cursor='';
 for(let page=0;;page++){
  cpCoveragePage(scope);cpNPLimit(page);
  const body=own?{parentId:parentId||'',page,pageSize:200,orderBy:3,sortType:1,fileTypes:[]}:{accessToken:token,parentId:parentId||'',pageSize:200,orderBy:0,sortType:0};if(!own&&cursor)body.cursor=cursor;
  const data=await cpNPGuangyaApi(own?'/userres/v1/file/get_file_list':'/userres/v1/get_share_page_files_list',body,own,profile,true,undefined,readToken);
  const items=cpNPRows(data,'list'),prior=new Set(seen);cpNPSeenPage(items,seen,x=>x.fileId||x.id||x.resId);
  for(const item of items){const id=String(item.fileId||item.id||item.resId);if(!prior.has(id)){prior.add(id);rows.push(item);}}
  if(!own&&onPage)onPage(items);
  const total=data.total==null?null:Number(data.total);
  if(total!==null&&(!Number.isFinite(total)||total<0))throw cpError('UPSTREAM_ERROR');
  // The API can return a numeric cursor even on its final page. Count distinct
  // IDs before stopping, and preserve cursor types in subsequent request bodies.
  const explicit=own?'':data.nextCursor||data.next_cursor||data.cursor||'';
  if(total!==null&&seen.size>=total)break;
  const next=explicit||(total!==null&&total>seen.size?seen.size:'');
  if(!next){if(total!==null&&seen.size<total||total===null&&items.length>=200)throw cpError('UPSTREAM_ERROR');break;}
  if(!items.length||pages.has(String(next))||String(next)===String(cursor))throw cpError('UPSTREAM_ERROR');pages.add(String(next));cursor=next;
 }
 return rows;
}
let cpNPGuangyaCatalog;
async function cpNPYidongRequest(path,payload,encrypted,signed,profile,readToken){
 const body=encrypted?cpNPYidongEncrypt(payload):JSON.stringify(payload);
 let data=await cpNPHttp('yidong',profile,'POST',cpNPYIDONG_API+path,body,cpNPYidongHeaders(payload,signed),undefined,readToken);
 if(readToken?.cancelled)throw cpB6Unused();
 if(typeof data==='string'){try{data=JSON.parse(data);}catch(_){}if(path==='dlFromOutLinkV3'&&/^https?:\/\//i.test(data))return data;if(typeof data==='string'){try{data=JSON.parse(cpNPYidongDecrypt(data));}catch(_){throw cpError('UPSTREAM_ERROR');}}}
 if(!data||typeof data!=='object')throw cpError('UPSTREAM_ERROR');const code=data.resultCode??data.code??data.mcsCode;if(code!==undefined&&!['0','0000','200'].includes(String(code)))throw cpNPFailure(200,code,data.desc||data.message||data.resultDesc);return data.data!==undefined?data.data:data;
}
let cpNPYidongCatalog;
const cpNPQueues=new Map();
function cpNPSerial(key,work){const prior=cpNPQueues.get(key)||Promise.resolve();const next=prior.catch(()=>{}).then(work);cpNPQueues.set(key,next);return next.finally(()=>{if(cpNPQueues.get(key)===next)cpNPQueues.delete(key);});}
async function cpNPWriteOnce(provider,profile,key,work){const prior=cpRead(key);if(prior?.state==='succeeded')return prior.value;if(prior)throw cpError('TRANSFER_UNCERTAIN');let dispatched=false;const claim=()=>{cpNPGuard(provider,profile);if(cpRead(key))throw cpError('TRANSFER_UNCERTAIN');cpNPGuard(provider,profile);cpWrite(key,{state:'uncertain'});dispatched=true;};let value;try{value=await work(claim);}catch(error){cpNPGuard(provider,profile);if(error&&['AUTH_FAILED','RATE_LIMITED','ACCOUNT_CHANGED','ABORTED','OPERATION_TIMEOUT'].includes(error.code))throw error;throw cpError('TRANSFER_UNCERTAIN');}cpNPGuard(provider,profile);if(!dispatched||!value)throw cpError('TRANSFER_UNCERTAIN');cpNPWrite(profile,provider,key,{state:'succeeded',value});return value;}
async function cpNPXunleiOwnFiles(parentId,profile){const rows=[],seen=new Set(),pages=new Set();let pageToken='';for(let page=0;;page++){cpNPLimit(page);const data=await cpNPXunleiApi('GET','drive/v1/files?'+cpNPQuery({parent_id:parentId||'',limit:200,page_token:pageToken,with_audit:true,filters:JSON.stringify({phase:{eq:'PHASE_TYPE_COMPLETE'},trashed:{eq:false}})}),null,false,profile);const items=cpNPRows(data,'files');cpNPSeenPage(items,seen,x=>x.id);rows.push(...items);const next=String(data.next_page_token||data.nextPageToken||'');if(!next)break;if(!items.length||pages.has(next)||next===pageToken)throw cpError('UPSTREAM_ERROR');pages.add(next);pageToken=next;}return rows;}
async function cpNPEnsureFolder(provider,name,parentId,profile){const own=provider==='xunlei'?await cpNPXunleiOwnFiles(parentId,profile):await cpNPGuangyaPages(parentId,'',true,profile);const existing=own.find(file=>provider==='xunlei'?file.kind==='drive#folder'&&file.name===name:Number(file.resType)===2&&file.fileName===name);if(existing)return String(existing.id||existing.fileId);const key=cpNPKey(profile,provider,['folder',parentId,name]);return cpNPWriteOnce(provider,profile,key,async claim=>{if(provider==='xunlei'){const data=await cpNPXunleiApi('POST','drive/v1/files',{parent_id:parentId,name,kind:'drive#folder',space:''},false,profile,true,claim);return data.file?.id||data.id||null;}const data=await cpNPGuangyaApi('/userres/v1/file/create_dir',{parentId,dirName:name},true,profile,true,claim);return data.fileId||data.id||data.folderId||data.resId||null;});}
async function cpNPTransferResolve(provider,video,profile){const {fid}=await cpCleanupRun(provider,video,async()=>{const root=await cpNPEnsureFolder(provider,CACHE_FOLDER,'',profile),folder=await cpNPEnsureFolder(provider,cpNPMd5(video.shareId+':'+video.fid),root,profile);const own=()=>provider==='xunlei'?cpNPXunleiOwnFiles(folder,profile):cpNPGuangyaPages(folder,'',true,profile);const matches=file=>provider==='xunlei'?file.kind!=='drive#folder'&&file.name===video.file_name&&(!Number(video.size)||Number(file.size)===Number(video.size)):Number(file.resType)===1&&file.fileName===video.file_name&&(!Number(video.size)||Number(file.fileSize)===Number(video.size));let saved=(await own()).find(matches);const key=cpNPKey(profile,provider,['file',video.shareId,video.passcode||'',video.fid]);let phase=cpRead(key);
 if(!saved&&phase?.state==='succeeded')saved=provider==='xunlei'?{id:phase.value}:{fileId:phase.value};
 if(!saved){if(phase?.state==='uncertain')throw cpError('TRANSFER_UNCERTAIN');let taskId=phase?.taskId;
  if(!phase){let token;if(provider==='xunlei')token=await cpBetaXunleiShareToken(video,profile);else token=await cpNPGuangyaShareToken(video,profile);if(!token)throw cpError('AUTH_FAILED');
   const claim=()=>{cpNPGuard(provider,profile);if(cpRead(key))throw cpError('TRANSFER_UNCERTAIN');cpNPGuard(provider,profile);cpWrite(key,{state:'uncertain'});};let data;
   try{data=provider==='xunlei'?await cpNPXunleiApi('POST','drive/v1/share/restore',{parent_id:folder,share_id:video.shareId,pass_code_token:token,ancestor_ids:[],file_ids:[video.fid],specify_parent_id:true},false,profile,true,claim):await cpNPGuangyaApi('/userres/v1/restore_share',{accessToken:token,fileIds:[video.fid],parentId:folder},true,profile,true,claim);}
   catch(error){cpNPGuard(provider,profile);if(error&&['AUTH_FAILED','RATE_LIMITED','ACCOUNT_CHANGED','ABORTED','OPERATION_TIMEOUT'].includes(error.code))throw error;throw cpError('TRANSFER_UNCERTAIN');}
   taskId=data.taskId||data.task_id;const fid=provider==='xunlei'?(data.file?.id||data.file_id||data.files?.[0]?.id):null;
   if(fid){saved={id:String(fid)};cpNPWrite(profile,provider,key,{state:'succeeded',value:String(fid)});}else if(taskId)cpNPWrite(profile,provider,key,{state:'known',taskId:String(taskId)});
  }
  for(let attempt=0;!saved&&attempt<5;attempt++){if(taskId&&provider==='guangya'){const status=await cpNPGuangyaApi('/userres/v1/get_task_status',{taskId},true,profile);if(Number(status.status)===3){cpNPWrite(profile,provider,key,{state:'failed',taskId});throw cpError('UPSTREAM_ERROR');}}saved=(await own()).find(matches);if(!saved&&attempt<4&&typeof setTimeout==='function')await new Promise(resolve=>setTimeout(resolve,500));cpNPGuard(provider,profile);}
  if(!saved)throw cpError('TRANSFER_UNCERTAIN');
 }
 const fid=String(saved.id||saved.fileId);cpNPWrite(profile,provider,key,{state:'succeeded',value:fid});cpCleanupRegister(provider,video,fid,folder,root);return {fid};});
 if(provider==='guangya'){const data=await cpNPGuangyaApi('/userres/v1/get_res_download_url',{fileId:fid},true,profile);return cpNPResource(provider,cpNPGuangyaDownloadUrl(data),{'User-Agent':UA,Referer:'https://www.guangyapan.com/',Origin:'https://www.guangyapan.com'});}
 for(const usage of ['PLAY','CONSUME','']){const query={space:'','with[0]':'public_share_tag'};if(usage)query.usage=usage;const file=await cpNPXunleiApi('GET','drive/v1/files/'+encodeURIComponent(fid)+'?'+cpNPQuery(query),null,false,profile);const url=cpNPXunleiOriginalUrl(file);if(url)return cpNPResource(provider,url,{'User-Agent':'Dalvik/2.1.0 (Linux; U; Android 12; M2004J7AC Build/SP1A.210812.016)'});}
 throw cpError('QUALITY_UNAVAILABLE');
}
// Anonymous share playback: preview first, signed download only with a verified path.
async function cpNPYidongResolve(video,profile){
 let path=String(video.path||'').trim(),content={};
 try{
  const data=await cpNPYidongRequest('getContentInfoFromOutLink',{getContentInfoFromOutLinkReq:{contentId:video.fid,linkID:video.shareId,account:''},commonAccountInfo:{account:'',accountType:1}},true,false,profile);
  content=data.contentInfo||{};
 }catch(error){
  // Cancellation, changed accounts, disabled drives and rate limits must stop here.
  cpNPGuard('yidong',profile);
  if(!path||error.code!=='UPSTREAM_ERROR')throw error;
 }
 for(const key of ['presentUURL','presentHURL','presentURL','presentLURL']){
  const url=content[key];if(typeof url==='string'&&/^https?:\/\//i.test(url)){
   const resources=cpNPResource('yidong',url,{'User-Agent':UA,Referer:'https://yun.139.com/'});
   resources[0].quality='preview';resources[0].description='预览';return resources;
  }
 }
 if(!path){const parent=content.parentCatalogId||content.parentCatalogID,id=content.contentID||content.contentId;if(parent&&id&&String(id)===String(video.fid))path=parent+'/'+id;}
 if(!path)throw cpError('QUALITY_UNAVAILABLE');
 const shapes=[{linkID:video.shareId,coIDLst:{items:[path]},caIDLst:{items:[]}},{dlFromOutLinkReqV3:{linkID:video.shareId,account:'',coIDLst:{item:[path]}}}];
 for(const payload of shapes){
  try{const data=await cpNPYidongRequest('dlFromOutLinkV3',payload,true,true,profile),url=cpNPYidongDownloadUrl(data);if(url)return cpNPResource('yidong',url,{'User-Agent':UA,Referer:'https://yun.139.com/'});}
  catch(error){cpNPGuard('yidong',profile);if(!['UPSTREAM_ERROR','QUALITY_UNAVAILABLE'].includes(error.code))throw error;}
 }
 throw cpError('QUALITY_UNAVAILABLE');
}
async function cpNewPanCatalog(share){const provider=share&&share.provider;if(!['xunlei','guangya','yidong','tianyi'].includes(provider))throw cpError('UPSTREAM_ERROR');const profile=cpNewPanAssert(provider);cpNPGuard(provider,profile);if(!share.shareId)throw cpError('SHARE_EXPIRED');const result=await (provider==='xunlei'?cpNPXunleiCatalog(share,profile):provider==='guangya'?cpNPGuangyaCatalog(share,profile):provider==='tianyi'?cpNPTianyiCatalog(share,profile):cpNPYidongCatalog(share,profile));cpNPGuard(provider,profile);return result;}
async function cpNewPanResolve(info){const provider=info&&info.provider;if(!['xunlei','guangya','yidong','tianyi'].includes(provider))throw cpError('UPSTREAM_ERROR');const profile=cpNewPanAssert(provider),video=info.videoInfo||{};cpNPGuard(provider,profile);if(!video.shareId||!video.fid||!['yidong','tianyi'].includes(provider)&&!video.file_name)throw cpError('FILE_NOT_FOUND');const read=async()=>{cpNPGuard(provider,profile);const result=await (provider==='yidong'?cpNPYidongResolve(video,profile):provider==='tianyi'?cpNPTianyiResolve(video,profile):cpNPTransferResolve(provider,video,profile));cpNPGuard(provider,profile);return result;};return ['tianyi','yidong'].includes(provider)?read():cpNPSerial(provider+':'+cpNewPanIdentity(provider),read);}
// Tianyi ordinary shares: anonymous catalog reads, then Cookie -> sessionKey
// -> signed accessToken -> signed original download URL. No transfer or login.
const cpNPTIANYI_SHARE_API = 'https://cloud.189.cn/api/open/share/';
const cpNPTIANYI_SESSION_URL = 'https://m.cloud.189.cn/v2/getUserBriefInfo.action';
const cpNPTIANYI_TOKEN_URL = 'https://api.cloud.189.cn/open/oauth2/getAccessTokenBySsKey.action';
const cpNPTIANYI_DOWNLOAD_URL = 'https://api.cloud.189.cn/open/file/getFileDownloadUrl.action';
const cpNPTIANYI_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36';

function cpNPTianyiClientHeaders() {
  return {'User-Agent':cpNPTIANYI_UA, Accept:'application/json;charset=UTF-8'};
}

function cpNPTianyiXml(text, tag) {
  const match = new RegExp('<'+tag+'(?:\\s[^>]*)?>([\\s\\S]*?)</'+tag+'>','i').exec(text);
  if (!match) return '';
  const value = match[1].trim();
  if (value.startsWith('<![CDATA[') && value.endsWith(']]>')) return value.slice(9,-3);
  return value.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&amp;/g,'&');
}

function cpNPTianyiResponse(raw, xml) {
  let data=raw;
  if (typeof data==='string') {
    try {data=JSON.parse(data);}
    catch (_) {
      if (!xml || !/^\s*</.test(raw)) throw cpError('UPSTREAM_ERROR');
      data={res_code:cpNPTianyiXml(raw,'res_code')||cpNPTianyiXml(raw,'code'),
        res_message:cpNPTianyiXml(raw,'res_message')||cpNPTianyiXml(raw,'message'),
        fileDownloadUrl:cpNPTianyiXml(raw,'fileDownloadUrl')};
    }
  }
  if (!data || typeof data!=='object' || Array.isArray(data)) throw cpError('UPSTREAM_ERROR');
  const code=data.res_code??data.code??data.errorCode;
  if (data.error || (code!==undefined && code!=='' && ![0,200].includes(Number(code)))) {
    const message=String(data.res_message||data.message||data.msg||data.error||'');
    if (/Invalid(?:AccessToken|SessionKey)|(?:session|cookie).*(?:invalid|expired)/i.test(String(code)+' '+message)) throw cpError('AUTH_FAILED');
    throw cpNPFailure(200,code,message);
  }
  return data;
}

async function cpNPTianyiGet(url, profile, headers, xml, readToken) {
  const raw=await cpNPHttp('tianyi',profile,'GET',url,null,headers,undefined,readToken);
  if(readToken?.cancelled)throw cpB6Unused();
  return cpNPTianyiResponse(raw,xml);
}

function cpNPTianyiId(value) {
  if ((typeof value!=='string' && typeof value!=='number') ||
      (typeof value==='number' && !Number.isSafeInteger(value)) || !String(value).trim()) throw cpError('UPSTREAM_ERROR');
  return String(value).trim();
}

function cpNPTianyiShareId(value) {
  const id=cpNPTianyiId(value);
  if (!/^\d+$/.test(id)) throw cpError('UPSTREAM_ERROR');
  return id;
}

function cpNPTianyiFile(item) {
  if (!item || typeof item!=='object' || Array.isArray(item)) throw cpError('UPSTREAM_ERROR');
  const id=cpNPTianyiId(item.id??item.fileId??item.fileIdStr??item.file_id);
  const name=item.name??item.fileName;
  const size=Number(item.size??item.fileSize??0);
  if (typeof name!=='string' || !name.trim() || !Number.isFinite(size) || size<0) throw cpError('UPSTREAM_ERROR');
  return {id,name,size};
}

function cpNPTianyiShareHeaders(share) {
  const code=share.passcode?share.shareId+'（访问码：'+share.passcode+'）':String(share.shareId||'');
  return Object.assign(cpNPTianyiClientHeaders(),{
    Referer:'https://cloud.189.cn/web/share?code='+encodeURIComponent(code),
    'Sign-Type':'1','browser-id':'3e7c817cbd911a2f917b42518d320fb8'
  });
}

async function cpNPTianyiShareInfo(share, profile) {
  const code=share.passcode?share.shareId+'（访问码：'+share.passcode+'）':String(share.shareId||'');
  if (!code) throw cpError('UPSTREAM_ERROR');
  const response=await cpNPTianyiGet(cpNPTIANYI_SHARE_API+'getShareInfoByCodeV2.action?'+
    cpNPQuery({noCache:Math.random(),shareCode:code}),profile,cpNPTianyiShareHeaders(share),false,share.cpB8ReadToken);
  const data=response.fileId||response.shareId?response:response.data||response.file||{};
  const file=cpNPTianyiFile(Object.assign({},data,{id:data.fileId??data.fileIdStr??data.file_id}));
  const shareId=cpNPTianyiShareId(data.shareId??data.share_id??response.shareId);
  const flag=data.isFolder;
  const folder=[true,1,'1','true'].includes(flag)||data.fileType==='folder';
  if (!folder && ![false,0,'0','false'].includes(flag) && data.fileType!=='file') throw cpError('UPSTREAM_ERROR');
  return Object.assign(file,{shareId,isFolder:folder,shareMode:String(data.shareMode??data.shareModeStr??response.shareMode??'')});
}

function cpNPTianyiRows(response) {
  const root=response.data??response;
  if (!root || typeof root!=='object' || Array.isArray(root)) throw cpError('UPSTREAM_ERROR');
  const lists=root.fileListAO??(root.fileList && !Array.isArray(root.fileList)?root.fileList:root);
  if (!lists || typeof lists!=='object' || (!Array.isArray(lists.fileList) && !Array.isArray(lists.folderList))) throw cpError('UPSTREAM_ERROR');
  if ((lists.fileList!==undefined && !Array.isArray(lists.fileList)) ||
      (lists.folderList!==undefined && !Array.isArray(lists.folderList))) throw cpError('UPSTREAM_ERROR');
  const files=(lists.fileList||[]).map(cpNPTianyiFile),folders=(lists.folderList||[]).map(cpNPTianyiFile);
  if (files.length+folders.length>60) throw cpError('UPSTREAM_ERROR');
  return {files,folders};
}

let cpNPTianyiCatalog;
async function cpNPTianyiPrepareAuth(profile, cookie, readToken) {
  cpNPGuard('tianyi',profile);
  const headers=Object.assign(cpNPTianyiClientHeaders(),{Cookie:cookie});
  const session=await cpNPTianyiGet(cpNPTIANYI_SESSION_URL,profile,headers,false,readToken);
  const sessionKey=(session.data||session).sessionKey;
  if (typeof sessionKey!=='string' || !sessionKey) throw cpError('AUTH_FAILED');
  const timestamp=String(Date.now());
  const token=await cpNPTianyiGet(cpNPTIANYI_TOKEN_URL+'?'+cpNPQuery({sessionKey}),profile,Object.assign({},headers,{
    Signature:cpNPMd5('AppKey=600100422&Timestamp='+timestamp+'&sessionKey='+sessionKey),
    Timestamp:timestamp,AppKey:'600100422','Sign-Type':'1'
  }),false,readToken);
  const accessToken=(token.data||token).accessToken;
  if (typeof accessToken!=='string' || !accessToken) throw cpError('AUTH_FAILED');
  return accessToken;
}

async function cpNPTianyiResolve(video, profile) {
  cpNPGuard('tianyi',profile);
  if (String(video.fid||'').startsWith('!tycas1!')) throw cpError('QUALITY_UNAVAILABLE');
  const fileId=cpNPTianyiId(video.fid);
  const shareId=video.tianyiShareId?cpNPTianyiShareId(video.tianyiShareId):(await cpNPTianyiShareInfo(video,profile)).shareId;
  const cookie=String(cpNewPanAuthValue('tianyi')||'').trim();
  if (!cookie) throw cpError('AUTH_FAILED');
  // Only the current serialized resource operation owns this token. It never
  // reaches storage or another module; downloads retain their per-file signature.
  const identity=cpNPMd5(cookie),prepare=()=>cpNPTianyiPrepareAuth(profile,cookie);
  const accessToken=await (typeof cpReadReuse==='function'?
    cpReadReuse('tianyi',identity,'','play-auth',prepare):prepare());
  cpNPGuard('tianyi',profile);
  const timestamp=String(Date.now());
  const headers=Object.assign(cpNPTianyiClientHeaders(),{Cookie:cookie});
  let response;
  try {
    response=await cpNPTianyiGet(cpNPTIANYI_DOWNLOAD_URL+'?'+cpNPQuery({fileId,dt:1,shareId}),profile,Object.assign({},headers,{
      Signature:cpNPMd5('AccessToken='+accessToken+'&Timestamp='+timestamp+'&dt=1&fileId='+fileId+'&shareId='+shareId),
      Timestamp:timestamp,'Sign-Type':'1',accessToken
    }),true);
  } catch(error) {
    if(error?.code==='AUTH_FAILED'&&typeof cpReadInvalidate==='function')cpReadInvalidate('tianyi',identity,'','play-auth');
    throw error;
  }
  const url=(response.data||response).fileDownloadUrl;
  if (typeof url!=='string' || !/^https?:\/\/[^\s]+$/i.test(url)) throw cpError('QUALITY_UNAVAILABLE');
  // Widget GET can follow redirects and read the entire video. Give the signed
  // first hop to the player, with only the upstream's public client headers.
  const resources=cpNPResource('tianyi',url,cpNPTianyiClientHeaders());
  resources[0].name='天翼云盘';
  resources[0].playVia='client';
  cpNPGuard('tianyi',profile);
  return resources;
}

const CP_NEW_PANS={xunlei:{field:'xunleiAuth',index:3,label:'迅雷'},guangya:{field:'guangyaAuth',index:4,label:'光鸭'},yidong:{anonymous:true,label:'移动云盘'},tianyi:{field:'tianyiCookie',index:5,label:'天翼云盘'}};
function cpIsNewPan(provider){return Object.prototype.hasOwnProperty.call(CP_NEW_PANS,provider);}
function cpNewPanConfig(provider){return cpIsNewPan(provider)?String(cpAccounts()[CP_NEW_PANS[provider].index]||''):'';}
function cpNewPanIdentity(provider){return baiduSha1(CP_NEW_PANS[provider]?.anonymous?'anonymous-v1':cpNewPanConfig(provider));}
function cpNewPanSessionKey(provider){return provider+':'+cpNewPanIdentity(provider);}
function cpNewPanSession(provider){
 const key=cpNewPanSessionKey(provider);
 try{const raw=Widget.sharedCache&&Widget.sharedCache.get('catpaw.drive-auth.v1',key);if(raw){const entry=JSON.parse(raw);if(typeof entry.auth==='string')return entry.auth;}}catch(_){}
 const local=cpRead('pan-session:'+key);return local&&typeof local.auth==='string'?local.auth:'';
}
function cpNewPanAuthValue(provider){const configured=cpNewPanConfig(provider);return configured?cpNewPanSession(provider)||configured:'';}
function cpNewPanSaveAuth(provider,raw,previous,identity){
 cpCheck(cpActiveProfile||cpProfile);return cpNewPanCommitSession(provider,raw,previous,identity===undefined?cpNewPanIdentity(provider):identity);
}
// Refreshing a one-use token is a session side effect. Keep its successful
// rotation for the same drive even when the initiating operation was cancelled.
function cpNewPanCommitSession(provider,raw,previous,identity){
 if(!cpIsNewPan(provider)||typeof raw!=='string'||!raw.trim()||/[\x00-\x1f\x7f]/.test(raw))throw cpError('AUTH_FAILED');
 if(!cpNewPanConfig(provider)||identity!==cpNewPanIdentity(provider))throw cpError('ACCOUNT_CHANGED');
 const current=cpNewPanAuthValue(provider);
 if(current!==previous)return current;
 const key=cpNewPanSessionKey(provider),value={auth:raw};
 try{if(Widget.sharedCache&&typeof Widget.sharedCache.set==='function')Widget.sharedCache.set('catpaw.drive-auth.v1',key,JSON.stringify(value));}catch(_){throw cpError('UPSTREAM_ERROR');}
 cpWrite('pan-session:'+key,value);return raw;
}
function cpCandidateNewProviderEnabled(provider){return cpIsNewPan(provider)&&cpDriveEnabled(provider)&&(CP_NEW_PANS[provider].anonymous||!!cpNewPanAuthValue(provider));}
function cpNewPanAssert(provider){
 const profile=cpActiveProfile||cpProfile;cpCheck(profile);
 if(!cpCandidateNewProviderEnabled(provider))throw cpError('AUTH_FAILED');return profile;
}
for(const [provider,entry] of Object.entries(CP_NEW_PANS)){
 if(!entry.field||!/(?:^|\.)(?:tgsou|tg-channels|quanpan)(?:\.rex|\.v[0-9]+)?$/.test(WidgetMetadata.id))continue;
 if(WidgetMetadata.globalParams.some(param=>param.name===entry.field))continue;
 WidgetMetadata.globalParams.push({name:entry.field,title:entry.label+(provider==='guangya'?' accessToken':' Cookie')+'（非空优先，留空继承共用）',type:'input',value:'',description:'在通用配置中启用对应网盘后使用。'});
}
const cpNPProviderName=providerName,cpNPLineName=playbackLineName;
providerName=function(provider){return CP_NEW_PANS[provider]?.label||cpNPProviderName(provider);};
playbackLineName=function(provider){return CP_NEW_PANS[provider]?.label||cpNPLineName(provider);};
if(typeof rexProviderEnabled==='function'){
 const native=rexProviderEnabled;rexProviderEnabled=function(provider){return cpIsNewPan(provider)?cpCandidateNewProviderEnabled(provider):native(provider);};
}
if(typeof tgsouProviderEnabled==='function'){
 const native=tgsouProviderEnabled;tgsouProviderEnabled=function(provider){return cpIsNewPan(provider)?cpCandidateNewProviderEnabled(provider):native(provider);};
}
if(typeof quanpanProviderEnabled==='function'){
 const native=quanpanProviderEnabled;quanpanProviderEnabled=function(provider){return cpIsNewPan(provider)?cpCandidateNewProviderEnabled(provider):native(provider);};
}
function cpNewPanMergeShares(current,extra){
 for(const share of extra){
  if(!cpCandidateNewProviderEnabled(share.provider))continue;
  const existing=current.find(s=>s.provider===share.provider&&s.shareId===share.shareId&&(!s.passcode||!share.passcode||s.passcode===share.passcode));
  if(existing){if(!existing.passcode&&share.passcode)existing.passcode=share.passcode;}
  else current.push(share);
 }return current;
}
if(typeof parseShareLinks==='function'){
 const native=parseShareLinks;parseShareLinks=function(text){return cpNewPanMergeShares(native(text),cpParseNewPanLinks(text));};
}
const cpNPExtractShares=extractShareLinks;
extractShareLinks=function($){
 const shares=cpNPExtractShares($),elements=$('[data-clipboard-text],a,p,.down-card,.down-card-url').get();
 for(const el of elements){const node=$(el);cpNewPanMergeShares(shares,cpParseNewPanLinks(cpShareExtractionText($,el)));}
 return cpNewPanMergeShares(shares,cpParseNewPanLinks(cpShareExtractionText($,$.root().get(0))));
};
function cpNewPanCatalogKey(share){return [share.provider==="quark"?"share-video-v3":"share",share.provider,share.shareId,share.passcode||'',cpNewPanIdentity(share.provider)].join(':');}
function cpNewPanInvalidateCatalog(share){
 const key=cpNewPanCatalogKey(share);
 if(typeof huajuanInvalidateCache==='function')huajuanInvalidateCache(key);
 if(typeof rexMemoryCache!=='undefined'){const hash=baiduSha1(key);rexMemoryCache.delete(hash);safeStorageSet(CP_COOKIE_ROOT+'catalog.'+hash,'');}
}
async function cpNewPanCatalogCached(share,refresh=false){
 const profile=cpNewPanAssert(share.provider);if(refresh)cpNewPanInvalidateCatalog(share);
 const cache=typeof huajuanCached==='function'?huajuanCached:rexCached;
 const result=await cache(cpNewPanCatalogKey(share),180000,()=>cpNewPanCatalog(share),result=>!share.cpB8ReadToken?.cancelled&&!!result&&Array.isArray(result.list)&&result.list.length>0);
 if(share.cpB8ReadToken?.cancelled)throw cpB6Unused();
 cpCheck(profile);cpNewPanAssert(share.provider);return result;
}
if(typeof huajuanShareCatalog==='function'){
 const native=huajuanShareCatalog;huajuanShareCatalog=function(share,refresh=false){return cpIsNewPan(share.provider)?cpNewPanCatalogCached(share,refresh):native(share,refresh);};
}
if(typeof rexShareCatalog==='function'){
 const native=rexShareCatalog;rexShareCatalog=function(share,refresh=false){return cpIsNewPan(share.provider)?cpNewPanCatalogCached(share,refresh):native(share,refresh);};
}
const cpNPResolveSource=resolvePlaySource;
resolvePlaySource=async function(info,deferredIssues){
 if(!cpIsNewPan(info.provider))return cpNPResolveSource(info,deferredIssues);
 if(!cpCandidateNewProviderEnabled(info.provider))return [];
 const profile=cpNewPanAssert(info.provider),result=await cpNewPanResolve(info);cpCheck(profile);cpNewPanAssert(info.provider);return result;
};
// Discovery support is separate from the upstream search API's cloud_types.
if(typeof qpShare==='function'){
 const native=qpShare;qpShare=function(entry){
  const old=native(entry);if(old||!entry||typeof entry.url!=='string'||/\s/.test(entry.url))return old;
  const shares=cpParseNewPanLinks(entry.url),share=shares[0];if(!share)return null;
  const nearby=String(entry.note||'').match(/(?:提取码|提取密碼|密码|密碼)\s*[:：]?\s*([A-Za-z0-9]{4,8})/);
  if(!share.passcode)share.passcode=entry.password||(nearby&&nearby[1])||'';
  if(typeof share.passcode!=='string'||share.passcode.length>128||/[\x00-\x1f\x7f]/.test(share.passcode))return null;return share;
 };
 const parse=parseQuanpanResults;parseQuanpanResults=function(data,keyword,site){
  const extra=[];for(const provider of Object.keys(CP_NEW_PANS)){const rows=data.merged_by_type?.[provider];if(Array.isArray(rows))extra.push(...rows);}
  return parse(Object.assign({},data,{results:[...(data.results||[]),...extra]}),keyword,site);
 };
}
// The outermost entry includes queueing, discovery and direct preparation in one budget.
// Keep its owner until logical work has drained; raw HTTP may outlive the host timeout,
// but a response must pass the captured owner before any native parser sees it.
let cpResourceOwner=null,cpResourceQueue=Promise.resolve();
const cpResourceParams=new WeakMap();
function cpResourceForwardParams(params,extra){
 const copy=Object.assign({},params,extra),owner=cpResourceParams.get(params);
 if(owner)cpResourceParams.set(copy,owner);return copy;
}
function cpResourceIdentity(owner){
 if(owner.signal?.aborted)throw cpError('ABORTED');
 if(owner.profile&&owner.profile!==baiduSha1(JSON.stringify(cpAccounts())))throw cpError('ACCOUNT_CHANGED');
}
function cpResourceCheck(owner){
 if(!owner)return;
 cpResourceIdentity(owner);
 if(owner.closed||Date.now()>=owner.deadline)throw cpError('OPERATION_TIMEOUT');
}
function cpResourceLines(rows){
 const seen=new Set(),ids=new Set(),result=[];
 for(const row of rows.flat().filter(Boolean)){
  if(!/^https?:\/\//i.test(row.url||''))continue;
  const identity=JSON.stringify([row.id,row.url]);if(seen.has(identity))continue;seen.add(identity);
  const item=JSON.parse(JSON.stringify(row));
  if(ids.has(item.id))item.id+='_'+baiduSha1(identity);ids.add(item.id);result.push(item);
 }
 return result;
}
function cpResourceRequest(method,url,data,options,beforeDispatch){
 const owner=cpResourceOwner;cpResourceCheck(owner);
 const bounded=owner?Object.assign({},options,{timeout:Math.max(1,Math.min(Number(options?.timeout)||8000,owner.deadline-Date.now()))}):options;
 if(beforeDispatch)beforeDispatch();
 // Rex helpers discard timeout; request forwards it in seconds to the native bridge.
 return owner&&typeof Widget.http.request==='function'?Widget.http.request(Object.assign({zlibMode:false,decodable:true,base64Data:false},bounded,{url,method:method.toUpperCase(),timeout:bounded.timeout/1000},method==='post'?{data}:{})):method==='get'?Widget.http.get(url,bounded):Widget.http.post(url,data,bounded);
}
function cpResourceHttp(method,url,data,options,beforeDispatch){
 const owner=cpResourceOwner;
 return cpResourceAwait(owner,cpResourceRequest(method,url,data,options,beforeDispatch));
}
function cpResourceAwait(owner,task){
 if(!owner)return task;
 // Race before parsing. The losing raw promise remains observed by Promise.race.
 return Promise.race([task,owner.expired]).then(response=>{cpResourceCheck(owner);return response;},error=>{cpResourceCheck(owner);throw error;});
}
function cpHttpGet(url,options,beforeDispatch){return cpResourceHttp('get',url,null,options,beforeDispatch);}
function cpHttpPost(url,data,options,beforeDispatch){return cpResourceHttp('post',url,data,options,beforeDispatch);}
function cpTmdbGet(path,options){
 // Some native TMDB bridges discard timeout; without host timers this await
 // cannot be independently interrupted. Always fence its late continuation.
 const owner=cpResourceOwner;cpResourceCheck(owner);
 const bounded=owner?Object.assign({},options,{timeout:Math.max(0.001,(owner.deadline-Date.now())/1000)}):options;
 return cpResourceAwait(owner,Widget.tmdb.get(path,bounded));
}
const cpBudgetEntry=loadResource;
loadResource=function(params={}){
 params=Object.assign({},params);
 const manual=decodeLink(params.link)?.action==='play';
 const owner=manual?null:{refresh:params.refresh===true||params.forceRefresh===true,deadline:Date.now()+Number(cpSetting('indexTimeoutSeconds','10'))*1000,signal:params.signal||null,profile:null,closed:false,snapshot:null};
 let timer;
 if(owner){
  owner.expired=new Promise((_,reject)=>{
   if(typeof setTimeout==='function')timer=setTimeout(()=>{owner.closed=true;reject(cpError('OPERATION_TIMEOUT'));},Math.max(0,owner.deadline-Date.now()));
  });
  owner.expired.catch(()=>{});
 }
 const execute=async()=>{
  cpResourceCheck(owner);
  const previous=cpResourceOwner,deadline=cpDeadline;cpResourceOwner=owner;cpDeadline=owner?owner.deadline:Infinity;
  try{
   bindForwardParams(params);if(owner){owner.profile=cpProfile;owner.betaInitialQuality=cpSetting('quality','auto');owner.betaInitialSubtitles=cpSetting('subtitles','auto');cpResourceParams.set(params,owner);}cpResourceCheck(owner);
   const result=await cpBudgetEntry(params);cpResourceCheck(owner);cpBetaCommitPlayback(owner,result);return result;
  }finally{cpResourceParams.delete(params);cpResourceOwner=previous;cpDeadline=deadline;}
 };
 const work=cpResourceQueue.then(execute,execute);cpResourceQueue=work.catch(()=>{});
 const result=owner?Promise.race([work,owner.expired]).catch(error=>{
  if(error?.code!=='OPERATION_TIMEOUT')throw error;
  owner.closed=true;cpResourceIdentity(owner);
  const rows=cpResourceLines(owner.snapshot?owner.snapshot():[]);
  if(rows.length)return rows;
  throw cpError('OPERATION_TIMEOUT');
 }):work;
 return result.then(cpSortDisplayedResources).finally(()=>{if(timer!==undefined&&typeof clearTimeout==='function')clearTimeout(timer);});
};
// Public details share native global scopes. Queue them outside an automatic
// owner; internal buildDetailItem discovery and direct preparation still overlap.
const cpBudgetDetail=loadDetail;
loadDetail=function(link,...args){
 const execute=()=>cpBudgetDetail.call(this,link,...args),work=cpResourceQueue.then(execute,execute);
 cpResourceQueue=work.catch(()=>{});return work;
};

// Rex uses a flat parameter list. Keep supported drive controls contiguous and
// preserve the relative order of the remaining site/search preferences.
const CP_CONFIG_DRIVES=["credentialSource","driveQuarkEnabled","quarkCookie","quarkQuality","driveBaiduEnabled","baiduCookie","drive115Enabled","cookie115","driveUcEnabled","drive123Enabled","driveGuangyaEnabled","guangyaAuth","guangyaRefreshToken","guangyaDeviceId","driveYidongEnabled","driveTianyiEnabled","tianyiCookie","driveXunleiEnabled","xunleiAuth","xunleiRefreshToken","xunleiDeviceId","quality"];
const CP_CONFIG_CREDENTIALS={quarkCookie:["夸克 Cookie","填写夸克网页登录 Cookie"],baiduCookie:["百度 Cookie","填写百度网页登录 Cookie"],cookie115:["115 Cookie","填写 115 网页登录 Cookie"],guangyaAuth:["光鸭访问令牌","填写 accessToken"],guangyaRefreshToken:["光鸭刷新令牌","填写 refreshToken，用于自动续期；可留空"],guangyaDeviceId:["光鸭设备号","填写 deviceId；留空使用默认设备号"],tianyiCookie:["天翼 Cookie","含 JSESSIONID、COOKIE_LOGIN_USER 的 Cookie"],xunleiAuth:["迅雷访问令牌","填写 access_token 或 Authorization；自动识别 Web/App"],xunleiRefreshToken:["迅雷刷新令牌","填写 refresh_token，用于自动续期；可留空"],xunleiDeviceId:["迅雷设备号","填写 device_id；留空优先从令牌读取，否则使用默认设备号"]};
for(const provider of ["guangya","xunlei"]){
 const index=WidgetMetadata.globalParams.findIndex(param=>param.name===provider+"Auth");
 if(index>=0)for(const [offset,suffix] of ["RefreshToken","DeviceId"].entries()){
  const name=provider+suffix;if(!WidgetMetadata.globalParams.some(param=>param.name===name))WidgetMetadata.globalParams.splice(index+offset+1,0,{name,title:CP_CONFIG_CREDENTIALS[name][0],type:"input",value:""});
 }
}

for(const param of WidgetMetadata.globalParams){
 param.title=param.title.replace(/^(?:通用|全盘\/TG)\s*·\s*/,"");
 const entry=CP_CONFIG_CREDENTIALS[param.name];
 if(entry){
  param.title=entry[0];
  param.placeholders=[{title:entry[1]+(WidgetMetadata.modules.some(module=>module.id==="saveAccounts")?"":param.name.startsWith("guangya")?"；光鸭三项全部留空时使用通用配置":param.name.startsWith("xunlei")?"；迅雷三项全部留空时使用通用配置":"；留空使用通用配置"),value:""}];
  delete param.description;
 }
 if(param.name==="credentialSource")param.enumOptions=[{title:"共用账号",value:"shared"},{title:"仅本模块",value:"local"}];
 if(param.name==="driveYidongEnabled")param.title="移动网盘";
 if(param.name.startsWith("drive")&&param.name.endsWith("Enabled"))delete param.description;
 if(param.name==="indexTimeoutSeconds"){
  param.title="资源匹配超时（秒）";param.placeholders=[{title:"5～30 秒，默认 10",value:""}];delete param.description;
 }
}
WidgetMetadata.globalParams.sort((a,b)=>{
 const left=CP_CONFIG_DRIVES.indexOf(a.name),right=CP_CONFIG_DRIVES.indexOf(b.name);
 return (left<0?Infinity:left)-(right<0?Infinity:right);
});

// B3 only: successful-path preparation, preserving final selection and order.
function cpBetaSourceKey(source){const v=source.videoInfo||{};return JSON.stringify([source.provider||'quark',v.shareId,v.passcode||'',String(v.fid)]);}
function cpBetaPrepareMovies(descriptor,files,operation){
 if(!files.length)return;
 const prepared=operation.betaPrepared||(operation.betaPrepared=new Map());
 for(const file of files){
  const source=cpCandidateSource(descriptor,file),key=cpBetaSourceKey(source);
  if(prepared.has(key))continue;
  const entry={issues:[]};prepared.set(key,entry);
  entry.task=cpTrackRead(cpBetaQueueSource(source.provider,async()=>{
   try{return {items:await resolvePlaySource(source,entry.issues)};}catch(error){return {error};}
  }));
 }
}
async function cpBetaResolvePrepared(source,issues,operation){
 const entry=operation.betaPrepared?.get(cpBetaSourceKey(source));
 if(!entry)return await resolvePlaySource(source,issues);
 const outcome=await entry.task;
 if(issues)issues.push(...entry.issues);else cpApplyCandidateIssues(entry.issues);
 if(outcome.error)throw outcome.error;
 return outcome.items;
}
const cpBetaSourceWaiting=[],cpBetaSourceRunning=new Map();let cpBetaSourceActive=0;
function cpBetaPumpSources(){
 for(let i=0;i<cpBetaSourceWaiting.length&&cpBetaSourceActive<4;){
  const job=cpBetaSourceWaiting[i],count=cpBetaSourceRunning.get(job.provider)||0;
  if(count>=(['quark','uc','baidu','115','tianyi','yidong'].includes(job.provider)?2:1)){i++;continue;}
  cpBetaSourceWaiting.splice(i,1);cpBetaSourceActive++;cpBetaSourceRunning.set(job.provider,count+1);
  Promise.resolve().then(()=>{cpCheck(job.profile);return job.work();}).then(job.resolve,job.reject).finally(()=>{
   cpBetaSourceActive--;cpBetaSourceRunning.set(job.provider,(cpBetaSourceRunning.get(job.provider)||1)-1);cpBetaPumpSources();
  });
 }
}
function cpBetaQueueSource(provider,work){const profile=cpActiveProfile||cpProfile;return new Promise((resolve,reject)=>{cpBetaSourceWaiting.push({provider,profile,work,resolve,reject});cpBetaPumpSources();});}
async function cpBetaRunSources(items,work){
 let cursor=0,failure;
 const worker=async()=>{while(!failure&&cursor<items.length){const item=items[cursor++];try{await cpBetaQueueSource(item.provider||'quark',()=>work(item));}catch(error){failure=failure||error;}}};
 await Promise.all([worker(),worker()]);
 if(failure)throw failure;
}

// Directory lookup/creation and transfer acknowledgement remain one mutation owner.
const cpBetaSaveNative=saveShareFile;let cpBetaMutationQueue=Promise.resolve();
saveShareFile=function(video){
 const profile=cpActiveProfile||cpProfile;
 const task=cpBetaMutationQueue.then(()=>{cpCheck(profile);return cpBetaSaveNative(video);});
 cpBetaMutationQueue=task.catch(()=>{});return cpTrackRead(task);
};
const cpBetaOriginNative=cpOrigin;
cpOrigin=function(fid){return cpScheduleRead('quark',()=>cpBetaOriginNative(fid));};
const cpBetaPlayUrlNative=getPlayUrl;
getPlayUrl=function(fid){return cpScheduleRead('quark',()=>cpBetaPlayUrlNative(fid));};

// Only confirmed root preparation is reused, within the current operation.
const cpBetaEnsureFolderNative=cpNPEnsureFolder;
cpNPEnsureFolder=function(provider,name,parentId,profile){
 if(name!==CACHE_FOLDER||parentId!=='')return cpBetaEnsureFolderNative(provider,name,parentId,profile);
 return cpReadReuse(provider,cpNewPanIdentity(provider),'','beta-root:'+name,
  ()=>cpBetaEnsureFolderNative(provider,name,parentId,profile),fid=>typeof fid==='string'&&!!fid&&!['0','undefined','null'].includes(fid));
};

// Native URL getters keep the existing global four / provider two request slots.
// Memoize exact file reads only for this operation, including repeated subtitles.
// One native recovery flow per exact read, including empty/error outcomes.
// This map dies with the operation; no failure enters persistent caches.
function cpBetaReadOutcome(provider,shareId,passcode,label,work){
 const operation=cpReadOperation,profile=cpActiveProfile||cpProfile;cpCheck(profile);
 if(!operation)return Promise.resolve().then(work).then(value=>{cpCheck(profile);return value;});
 const outcomes=operation.betaReadOutcomes||(operation.betaReadOutcomes=new Map()),key=cpReadKey(provider,shareId,passcode,label);
 if(!outcomes.has(key)){
  const task=Promise.resolve().then(()=>{cpCheck(profile);return work();}).then(value=>({value}),error=>({error}));
  outcomes.set(key,task);cpTrackRead(task,operation);
 }
 return outcomes.get(key).then(outcome=>{cpCheck(profile);if(outcome.error)throw outcome.error;return outcome.value;});
}
function cpBetaMemoGetter(provider,native){return function(info){
 const v=info.videoInfo||{},key=JSON.stringify([v.fid,v.shareId,v.shareid,v.uk,v.stoken,v.share_fid_token,v.passcode]);
 return cpBetaReadOutcome(provider,v.shareId,v.passcode,'beta-file:'+key,()=>native(info));
};}
getUcResource=cpBetaMemoGetter('uc',getUcResource);
getBaiduResource=cpBetaMemoGetter('baidu',getBaiduResource);
get115Resource=cpBetaMemoGetter('115',get115Resource);
const cpBetaSubtitlesNative=cpSubtitles;
cpSubtitles=async function(info,profile,deferredIssues){
 const provider=info.provider||'quark';
 if(!['uc','baidu','115'].includes(provider))return await cpBetaSubtitlesNative(info,profile,deferredIssues);
 const v=info.videoInfo||{},keys=[v.shareId],files=[];
 if(provider==='baidu')keys.push(String(v.shareId||'').replace(/^1/,''),'id:'+v.shareid);
 for(const share of keys){const record=cpRead('subtitles:'+profile+':'+provider+':'+baiduSha1(String(share)));if(record&&record.expires>Date.now())files.push(...record.files);}
 const selected=cpMatchSubtitles(v,files),rows=[],issues=selected.map(()=>[]);let cursor=0,stop=false;
 const worker=async()=>{while(!stop&&cursor<selected.length){
  const index=cursor++,sub=Object.assign({},v,selected[index]);
  try{
   cpCheck(profile);const sinfo=cpSubtitleInfo(sub.file_name),source={provider,videoInfo:sub};
   const resources=await (provider==='uc'?cpUcSubtitle(source,profile):provider==='baidu'?getBaiduResource(source):get115Resource(source));
   cpCheck(profile);const row=resources?.find(r=>r.url);
   if(row)rows[index]={url:row.url,headers:row.headers||row.customHeaders||{},name:sub.file_name,...(sinfo.language?{language:sinfo.language}:{}),isDefault:false};
  }catch(error){
   cpCheck(profile);if(['AUTH_FAILED','RATE_LIMITED','TRANSFER_UNCERTAIN'].includes(error?.code)){stop=true;cpCandidateIssue(provider,error.code,false,issues[index]);}
  }
 }};
 // Start after the video's getter has claimed its native slot.
 await Promise.all([worker(),worker()]);
 for(const list of issues)if(deferredIssues)deferredIssues.push(...list);else cpApplyCandidateIssues(list);
 return rows.filter(Boolean);
};

// Short successful URL reuse is separate from the 24-hour raw directory index.
// Stage until the complete public result accepts the resource; never commit late
// successes from expired shares, cancelled owners or failed final selection.
const CP_BETA_PLAY_TTL=30000;
let cpBetaPlayGeneration=0;
function cpBetaPlayKey(info){
 const v=info.videoInfo||{};if(!v.shareId||!v.fid)return null;
 return 'beta-b3-play:'+baiduSha1(JSON.stringify([cpActiveProfile||cpProfile,info.provider||'quark',v.shareId,String(v.fid),v.passcode||'',v.file_name,cpParent(v),cpSetting('quality','auto'),cpSetting('subtitles','auto'),ensureCookie()]));
}
function cpBetaValidRows(rows){return Array.isArray(rows)&&rows.length>0&&rows.every(row=>row&&/^https?:\/\//i.test(row.url||'')&&(!row.subtitles||row.subtitles.every(sub=>/^https?:\/\//i.test(sub.url||''))));}
function cpBetaPlayUntil(rows,at){
 let until=at+CP_BETA_PLAY_TTL;
 for(const row of rows)for(const item of [row,...(row.subtitles||[])]){
  try{const url=new URL(item.url);for(const name of ['expires','expire','e']){
   const value=url.searchParams.get(name);if(/^\d{10,13}$/.test(value||''))until=Math.min(until,Number(value)*(value.length===10?1000:1)-5000);
  }const auth=url.searchParams.get('auth_key');if(/^\d{10}-/.test(auth||''))until=Math.min(until,Number(auth.slice(0,10))*1000-5000);}catch(_){return at;}
 }
 return until;
}
function cpBetaDiscardShare(provider,shareId){
 const owner=cpResourceOwner;if(owner)(owner.betaExpired||(owner.betaExpired=new Set())).add(JSON.stringify([provider,shareId]));
 for(const key of cpRead('beta-b3-play-keys')||[]){const entry=cpRead(key);if(entry?.provider===provider&&String(entry.shareId)===String(shareId))cpWrite(key,null);}
}
function cpBetaClearPlayback(){cpBetaPlayGeneration++;for(const key of cpRead('beta-b3-play-keys')||[])cpWrite(key,null);cpWrite('beta-b3-play-keys',[]);}
function cpBetaCommitPlayback(owner,result){
 if(!owner||!Array.isArray(result))return;cpResourceCheck(owner);
 if(owner.betaInitialQuality!==cpSetting('quality','auto')||owner.betaInitialSubtitles!==cpSetting('subtitles','auto'))return;
 const urls=new Set(result.map(row=>row.url)),now=Date.now();
 for(const entry of owner.betaPlayback||[]){
  if(entry.generation!==cpBetaPlayGeneration||entry.expires<=now||!urls.has(entry.rows[0].url)||owner.betaExpired?.has(JSON.stringify([entry.provider,entry.shareId])))continue;
  cpWrite(entry.key,entry);let keys=(cpRead('beta-b3-play-keys')||[]).filter(key=>key!==entry.key);keys.push(entry.key);
  while(keys.length>64)cpWrite(keys.shift(),null);cpWrite('beta-b3-play-keys',keys);
 }
}
const cpBetaResolveNative=resolvePlaySource;
resolvePlaySource=async function(info,deferredIssues){
 const owner=cpResourceOwner,profile=cpActiveProfile||cpProfile,provider=info.provider||'quark';cpCheck(profile);cpResourceCheck(owner);
 if(!cpDriveEnabled(provider)||cpBlockedProviders.has(provider))return [];
 const key=cpBetaPlayKey(info),generation=cpBetaPlayGeneration,automatic=!!owner&&!owner.refresh,quality=cpSetting('quality','auto'),subtitles=cpSetting('subtitles','auto'),issueCount=deferredIssues?.length||0;
 if(key){
  if(!automatic)cpWrite(key,null);
  else{const cached=cpRead(key),now=Date.now();if(cached&&cached.at<=now&&cached.expires>now&&cached.expires-cached.at<=CP_BETA_PLAY_TTL&&cpBetaValidRows(cached.rows)&&cpBetaPlayUntil(cached.rows,now)>now)return JSON.parse(JSON.stringify(cached.rows));}
 }
 const rows=await cpBetaResolveNative(info,deferredIssues);cpCheck(profile);cpResourceCheck(owner);
 const currentKey=cpBetaPlayKey(info);
 if(automatic&&currentKey&&generation===cpBetaPlayGeneration&&quality===cpSetting('quality','auto')&&subtitles===cpSetting('subtitles','auto')&&!cpBlockedProviders.has(provider)&&(deferredIssues?.length||0)===issueCount&&cpBetaValidRows(rows)){
  const at=Date.now(),expires=cpBetaPlayUntil(rows,at);
  (owner.betaPlayback||(owner.betaPlayback=[])).push({key:currentKey,provider,shareId:info.videoInfo.shareId,at,expires,generation,rows:JSON.parse(JSON.stringify(rows))});
 }
 return rows;
};
if(typeof qpInvalidateShareCatalog==='function'){
 const native=qpInvalidateShareCatalog;qpInvalidateShareCatalog=function(share,...args){cpBetaDiscardShare(share.provider||'quark',share.shareId);return native(share,...args);};
}
if(typeof clearRexCatalogCache==='function'){
 const native=clearRexCatalogCache;clearRexCatalogCache=async function(...args){cpBetaClearPlayback();return await native(...args);};
}
if(typeof clearHuajuanCache==='function'){
 const native=clearHuajuanCache;clearHuajuanCache=async function(...args){cpBetaClearPlayback();return await native(...args);};
}

// B6: only read-only speculation; final native selection remains authoritative.
function cpB6Unused(){const error=new Error('Unused read preparation');error.code='BETA_READ_UNUSED';return error;}
function cpB6Token(){
 let close;const token={cancelled:false,used:false,closed:new Promise(resolve=>{close=resolve;})};
 token.cancel=()=>{if(!token.cancelled){token.cancelled=true;close();}};return token;
}
function cpB6Await(token,task){
 if(!token)return task;
 return Promise.race([task,token.closed.then(()=>{throw cpB6Unused();})]).then(value=>{if(token.cancelled)throw cpB6Unused();return value;});
}
function cpB6DetailOptions(info){return info?.cpB6DetailToken?{cpB6Token:info.cpB6DetailToken}:undefined;}
const cpB6HttpGetNative=cpHttpGet;
cpHttpGet=function(url,options,beforeDispatch){
 const token=options?.cpB6Token;if(!token)return cpB6HttpGetNative(url,options,beforeDispatch);
 if(token.cancelled)return Promise.reject(cpB6Unused());
 const clean=Object.assign({},options);delete clean.cpB6Token;
 // Stop before HTML decoding, parsing, page caching or candidate admission.
 return cpB6Await(token,cpB6HttpGetNative(url,clean,beforeDispatch));
};

function cpB6CatalogKey(share){return JSON.stringify([share.provider,share.shareId,share.passcode||'']);}
function cpB6EmitFile(provider,share,file,position){
 const listeners=cpReadOperation?.betaCatalogs?.get(cpB6CatalogKey(Object.assign({},share,{provider})));
 if(listeners)for(const notify of listeners)notify(file,position);
}
async function cpB6ReadCatalog(params,share,work){
 const operation=cpReadOperation;
 if(!operation||!['uc','baidu','115','tianyi','yidong'].includes(share.provider))return await work();
 const map=operation.betaCatalogs||(operation.betaCatalogs=new Map()),key=cpB6CatalogKey(share),seen=new Set();
 const listeners=map.get(key)||new Set();map.set(key,listeners);
 const quanpan=typeof qpSelectVideo==='function',limit=quanpan?1:2;
 const rolling=!quanpan&&['uc','baidu','115'].includes(share.provider)?cpB11Rolling(share.provider,operation):null;
 const notify=(file,position)=>{
  if(cpReadOperation!==operation||!rolling&&seen.size>=limit||cpBlockedProviders.has(share.provider)||!cpDriveEnabled(share.provider))return;
  const observed=share.cpTargetDirectory?.cpTargetObservation?.preparing;
  if(observed)file=Object.assign({},file,{parentPath:cpCoverageNormalize(file.parentPath||observed.path)});
  const matches=params.type==='movie'?cpMovieVideoMatches(file,params,cpRelevanceTitles(params)):cpEpisodeVideoMatches(file,params,cpRelevanceTitles(params));
  if(!matches||seen.has(String(file.fid)))return;
  if(quanpan){
   // A later page can contain a larger movie or an earlier BFS episode.
   // Only the first matching root episode is already the final selection.
   if(params.type==='movie'){
    if(share.provider==='tianyi'){
     seen.add('auth');const profile=cpActiveProfile||cpProfile,cookie=String(cpNewPanAuthValue('tianyi')||'').trim();
     if(cookie)cpReadReuse('tianyi',cpNPMd5(cookie),'','play-auth',()=>cpNPTianyiPrepareAuth(profile,cookie)).catch(()=>{});
    }
    return;
   }
   if(!position?.root&&!observed)return;
  }
  seen.add(String(file.fid));
  const info={provider:share.provider,videoInfo:Object.assign({},file,{passcode:file.passcode||share.passcode||''}),qpFreshCatalog:true};
  if(rolling){rolling.offer(info);return;}
  // Do not resolve subtitles until the complete directory has been observed.
  const task=Promise.resolve().then(()=>{
   cpCheck(cpActiveProfile||cpProfile);if(cpBlockedProviders.has(share.provider)||!cpDriveEnabled(share.provider))return [];
   return share.provider==='uc'?getUcResource(info):share.provider==='baidu'?getBaiduResource(info):share.provider==='115'?get115Resource(info):cpNewPanResolve(info);
  });cpTrackRead(task,operation).catch(()=>{});
 };
 listeners.add(notify);
 try{return await work();}finally{if(rolling)rolling.close();listeners.delete(notify);if(!listeners.size)map.delete(key);}
}
const cpB6NPItemNative=cpNPItem;
cpNPItem=function(share,...args){const file=cpB6NPItemNative(share,...args);cpB6EmitFile(share.provider,share,file,{root:args[3]===''});return file;};
const cpB6NPResolveNative=cpNewPanResolve;
cpNewPanResolve=function(info){
 if(!['tianyi','yidong'].includes(info.provider))return cpB6NPResolveNative(info);
 const v=info.videoInfo||{},key=JSON.stringify([v.fid,v.tianyiShareId,v.path,v.parentPath]);
 return cpBetaReadOutcome(info.provider,v.shareId,v.passcode,'b6-file:'+key,()=>cpB6NPResolveNative(info));
};

if(typeof panMonitorSites==='function'){
 const serialPrepare=panPrepareSite;
 panPrepareSite=async function(params,probe){
  const input=params&&typeof params==='object'?params:{};
  const configured=Object.prototype.hasOwnProperty.call(input,'site')?String(input.site||''):String(safeStorageGet(STORAGE_SITE_KEY+'.manual')||'');
  let previous;try{previous=JSON.parse(safeStorageGet(STORAGE_SITE_KEY+'.resolved')||'null');}catch(_){}
  // Manual domains, healthy resolved caches and non-search entries stay native.
  if(configured||!probe||previous?.expires>Date.now())return await serialPrepare(params,probe);
  if(Object.prototype.hasOwnProperty.call(input,'site'))safeStorageSet(STORAGE_SITE_KEY+'.manual','');
  if(panMonitorPending)return await panMonitorPending;
  const profile=cpActiveProfile||cpProfile,seed=panOrigin(previous?.site)||PAN_FALLBACKS.map(panOrigin).find(Boolean);
  if(!seed)return await serialPrepare(params,probe);
  let finished=false;const reads=new Map();
  const verify=site=>{
   if(!site||finished)return Promise.resolve(null);
   if(!reads.has(site))reads.set(site,(async()=>{
    try{
     cpCheck(profile);let ok=false;
     try{ok=await probe(site);}catch(error){if(['ABORTED','ACCOUNT_CHANGED','OPERATION_TIMEOUT','AUTH_FAILED','RATE_LIMITED'].includes(error?.code))throw error;}
     cpCheck(profile);if(ok)return site;
     if(finished)return null;
     // An empty search is not a dead domain: retain native home validation so
     // later alias searches can still use a healthy site.
     const response=await cpHttpGet(site+'/',{timeout:8000,headers:{'User-Agent':UA}});
     cpCheck(profile);return /(?:\/vod\/detail\/|\/voddetail\/|module-item-pic)/i.test(panDecodePage(response.data))?site:null;
    }
    catch(error){if(['ABORTED','ACCOUNT_CHANGED','OPERATION_TIMEOUT','AUTH_FAILED','RATE_LIMITED'].includes(error?.code))throw error;return null;}
   })());
   return reads.get(site);
  };
  panMonitorPending=(async()=>{
   const monitoring=panMonitorSites(),first=verify(seed);
   const rest=monitoring.then(async sites=>{
    const record=sites[PAN_SITE_NAME]||{};
    const urls=[record.best_url,...(record.urls||[]).filter(x=>x.has_keyword!==false).map(x=>x.url),previous?.site,...PAN_FALLBACKS];
    for(const site of Array.from(new Set(urls.map(panOrigin).filter(site=>site&&site!==seed)))){
     if(finished)return null;
     const found=await verify(site);if(found)return found;
    }
    return await first;
   });
   const site=await Promise.race([first.then(value=>value||rest),rest.then(value=>value||first)]);
   cpCheck(profile);if(!site)throw new Error(PAN_SITE_NAME+'当前域名均无法访问，请稍后重试或手动指定域名');
   finished=true;safeStorageSet(STORAGE_SITE_KEY,site);safeStorageSet(STORAGE_SITE_KEY+'.resolved',JSON.stringify({site,expires:Date.now()+3600000}));return site;
  })();
  try{return await panMonitorPending;}finally{finished=true;panMonitorPending=null;}
 };
}

// B7: no alternate-name site searches. Trusted names stay inside matching.
async function cpB7TrustedTitles(params){
 if(typeof cpTrustedTitles==='function')return await cpTrustedTitles(params);
 // Quanpan already has one-query discovery. Supplement only a known TMDB ID,
 // through the Rex bridge, using the same verified identity/cache as the peers.
 const id=String(params.tmdbId||params.tmdbID||''),type=params.type==='movie'?'movie':'tv',season=Number(params.season||1);
 const name=params.seriesName||params.title||params.name||'',requested=cpRequestedYear(params),profile=cpActiveProfile||cpProfile;
 if(!/^\d+$/.test(id)||!Widget.tmdb?.get||requested.conflict)return [];
 const signature=JSON.stringify([4,id,type,season,name,requested.year,params.imdbId||'']),key='identity:'+baiduSha1(signature);
 const valid=record=>record&&record.signature===signature&&record.expires>Date.now()&&Array.isArray(record.titles)&&record.titles.length<=16&&record.titles.every(t=>typeof t==='string'&&t.length<=200);
 try{
  const record=await cpBetaReadOutcome('identity',signature,'','b7-titles',async()=>{
   let cached=cpRead(key);try{const raw=Widget.sharedCache?.get('catpaw.upstream-enhanced.identity.v1',key);if(raw)cached=JSON.parse(raw);}catch(_){}
   if(valid(cached)&&(!params.cpSiteRead||Object.hasOwn(cached,'seasonYear')))return cached;
   const d=await cpTmdbGet('/'+type+'/'+id,{params:{language:'zh-CN',append_to_response:'alternative_titles,translations,external_ids'}});cpCheck(profile);
   if(String(d?.id)!==id)return null;
   const year=Number((d.first_air_date||d.release_date||'').slice(0,4)),seasonYear=Number((d.seasons||[]).find(s=>s.season_number===season)?.air_date?.slice(0,4));
   if(requested.year&&![year,seasonYear].includes(requested.year)||params.imdbId&&d.external_ids?.imdb_id&&params.imdbId!==d.external_ids.imdb_id)return null;
   const countries=new Set(['CN','TW','HK','SG','US','GB',...(d.origin_country||[]),...(d.production_countries||[]).map(c=>c.iso_3166_1)]);
   const native=[d.name||d.title,d.original_name||d.original_title,...(d.translations?.translations||[]).filter(t=>['zh','en',d.original_language].includes(t.iso_639_1)).map(t=>t.data?.name||t.data?.title),...(d.alternative_titles?.results||d.alternative_titles?.titles||[]).filter(t=>!t.iso_3166_1||countries.has(t.iso_3166_1)).map(t=>t.title)].filter(t=>typeof t==='string'&&t.trim()&&t.length<=200&&!/[\x00-\x1f\x7f]/.test(t));
   const supplied=[params.originalName,params.originalTitle,...(Array.isArray(params.alternativeTitles)?params.alternativeTitles:[])].filter(t=>typeof t==='string'&&t.trim());
   if(!native.concat(supplied).some(t=>cpTitlesEqual(t,name)))return null;
   const record={signature,expires:Date.now()+300000,titles:[...new Set(cpRelevanceTitles(params).concat(native))].slice(0,16),originalTitle:d.original_name||d.original_title,seriesYear:year,seasonYear:seasonYear||null};
   cpCheck(profile);cpWrite(key,record);try{Widget.sharedCache?.set('catpaw.upstream-enhanced.identity.v1',key,JSON.stringify(record));}catch(_){}return record;
  });
  return record?.titles||[];
 }catch(_){cpCheck(profile);return [];}
}

let cpB7SearchMatches;

async function cpB7SelectVideo(files,params,titles=[]){
 const matching=Object.assign({},params,{alternativeTitles:[...new Set(cpRelevanceTitles(params).concat(titles||[]))]});
 const selected=qpSelectVideo(files,matching);
 const largerUnknown=params.type==='movie'&&selected&&files.some(file=>isVideoFile(file)&&Number(file.size||0)>Number(selected.size||0)&&!cpMovieVideoMatches(file,matching,matching.alternativeTitles));
 if(selected&&!largerUnknown||!files.length)return selected;
 matching.alternativeTitles.push(...await cpB7TrustedTitles(params));
 return qpSelectVideo(files,matching);
}

const cpB7SearchTitleNative=cpSearchTitleMatches;
cpSearchTitleMatches=function(value,params){
 if(cpB7SearchTitleNative(value,params))return true;
 if(params.type==='movie')return false;
 // A fully recognized quality/update suffix may touch a bracketed year.
 // Keep that year, title, sequel and season for the native identity predicate.
 const match=/^(.+?[（(]\s*(?:19|20)\d{2}\s*[）)])[ ._-]*(?:[248]K|\d{3,4}P)[ ._-]*(?:高码(?:率)?)?[ ._-]*(?:(?:更新(?:至|到)?|全)\s*\d+\s*[集话]|已完结|完结)?$/i.exec(String(value||'').trim());
 return !!match&&cpB7SearchTitleNative(match[1],params);
};

// Private token handling for anonymous Yidong POST catalog reads only.
const cpB8HttpPostNative=cpHttpPost;
cpHttpPost=function(url,data,options,beforeDispatch){
 const token=options?.cpB6Token;if(!token)return cpB8HttpPostNative(url,data,options,beforeDispatch);
 if(token.cancelled)return Promise.reject(cpB6Unused());
 const clean=Object.assign({},options);delete clean.cpB6Token;
 return cpB6Await(token,cpB8HttpPostNative(url,data,clean,beforeDispatch));
};

// B8: independent folder work overlaps; final native breadth-first order is stable.
async function cpB8Walk(provider,root,read,child,onFile,profile,max=1001,readToken){
 const check=()=>{if(readToken?.cancelled)throw cpB6Unused();cpNPGuard(provider,profile);};
 const nodes=new Map(),queue=[];let active=0,failure;
 return new Promise((resolve,reject)=>{
  const discover=folder=>{
   check();const key=String(folder.id);if(nodes.has(key))return;
   if(nodes.size>=max)throw cpError('UPSTREAM_ERROR');
   const node={...folder,items:[]};nodes.set(key,node);queue.push(node);pump();
  };
  function finish(){
   if(active||queue.length&&!failure)return;
   if(failure){reject(failure);return;}
   const result=[],pending=[root],visited=new Set();
   for(let i=0;i<pending.length;i++){
    const folder=pending[i],key=String(folder.id);if(visited.has(key))continue;visited.add(key);
    for(const item of nodes.get(key).items){const next=child(item,folder);if(next)pending.push(next);else result.push({item,path:folder.path});}
   }
   resolve(result);
  }
  function pump(){
   while(!failure&&active<2&&queue.length){
    const node=queue.shift();active++;
    Promise.resolve().then(()=>{check();return read(node,items=>{
     if(failure)throw failure;check();
     for(const item of items){node.items.push(item);const next=child(item,node);if(next)discover(next);else if(onFile)onFile(item,node.path);}
    });}).catch(error=>{failure=failure||error;queue.length=0;}).finally(()=>{active--;pump();finish();});
   }
  }
  discover(root);
 });
}
function cpB8Folder(item,parent,id,name,extra){return Object.assign({id:String(id),path:[parent.path,name||''].filter(Boolean).join('/'),depth:(parent.depth||0)+1},extra);}
function cpB8Files(rows,build,key){const seen=new Set(),list=[];for(const row of rows){const id=String(key(row.item));if(seen.has(id))continue;seen.add(id);const file=build(row.item,row.path);if(file)list.push(file);}return {list};}

cpNPXunleiCatalog=async function(share,profile){
 const child=(row,parent)=>row.kind==='drive#folder'?cpB8Folder(row,parent,row.id,row.name,{token:row.cpB8ShareToken}):null;
 const read=async(folder,emit,cpTargetToken)=>{
  let pageToken='',token=folder.token||'';const pages=new Set(),seen=new Set(),rootItems=[];
  for(let page=0;;page++){
   cpCoveragePage(share.cpTargetDirectory);
   cpNPGuard('xunlei',profile);cpNPLimit(page);
   const query={share_id:share.shareId,limit:100,page_token:pageToken,thumbnail_size:'SIZE_SMALL'};
   if(folder.id)Object.assign(query,{parent_id:folder.id,pass_code_token:token});else query.pass_code=share.passcode||'';
   const data=await cpNPXunleiApi('GET','drive/v1/share'+(folder.id?'/detail':'')+'?'+cpNPQuery(query),null,true,profile,true,undefined,cpTargetToken);
   token=data.pass_code_token||token;const items=cpNPRows(data,'files');cpNPSeenPage(items,seen,x=>x.id);
   const rows=items.map(item=>Object.assign({},item,{cpB8ShareToken:token}));
   // Root pagination establishes the share token before any child consumes it.
   if(folder.id)emit(rows);else rootItems.push(...rows);
   const next=String(data.next_page_token||data.nextPageToken||data.page_token||'');
   if(!next)break;if(!items.length||pages.has(next)||next===pageToken)throw cpError('UPSTREAM_ERROR');pages.add(next);pageToken=next;
  }
  if(!folder.id){cpBetaRememberShareToken('xunlei',share,token,profile);emit(rootItems.map(item=>Object.assign({},item,{cpB8ShareToken:token})));}
 };
 const rows=await cpTargetB8Walk(cpTargetFilter(share.cpTargetDirectory,item=>cpNPVideo(item.name)||/^video\//i.test(item.mime_type||"")),'xunlei',{id:'',path:'',depth:0},read,child,null,profile);
 return cpB8Files(rows,(item,path)=>cpNPVideo(item.name)||/^video\//i.test(item.mime_type||'')?cpNPItem(share,item.id,item.name,item.size,path,{passCodeToken:item.cpB8ShareToken}):null,x=>x.id);
};
cpNPGuangyaCatalog=async function(share,profile){
 const token=await cpNPGuangyaShareToken(share,profile);
 const child=(item,parent)=>Number(item.resType)===2?cpB8Folder(item,parent,item.fileId||item.id||item.resId,item.fileName||item.name):null;
 const rows=await cpTargetB8Walk(cpTargetFilter(share.cpTargetDirectory,item=>Number(item.resType)===1&&(Number(item.fileType)===2||/^video\//i.test(item.mineType||item.mimeType||"")||cpNPVideo(item.fileName||item.name))),'guangya',{id:'',path:'',depth:0},(folder,emit,cpTargetToken)=>cpNPGuangyaPages(folder.id,token,false,profile,emit,cpTargetToken,share.cpTargetDirectory),child,null,profile);
 return cpB8Files(rows,(item,path)=>Number(item.resType)===1&&(Number(item.fileType)===2||/^video\//i.test(item.mineType||item.mimeType||'')||cpNPVideo(item.fileName||item.name))?cpNPItem(share,item.fileId||item.id||item.resId,item.fileName||item.name,item.fileSize||item.size,path):null,x=>x.fileId||x.id||x.resId);
};
cpNPYidongCatalog=async function(share,profile){
 const child=(item,parent)=>item.cpB8Folder?cpB8Folder(item,parent,item.caID,item.caName||item.catalogName):null;
 const build=(item,path)=>Number(item.coType)===3||cpNPVideo(item.coName)?cpNPItem(share,item.coID,item.coName,item.coSize,path,{path:item.path||''}):null;
 const read=async(folder,emit,cpTargetToken)=>{
  const readToken=cpTargetToken||share.cpB8ReadToken;
  const pages=new Set();
  for(let page=1;;page++){
   cpCoveragePage(share.cpTargetDirectory);
   cpNPGuard('yidong',profile);cpNPLimit(page);
   const data=await cpNPYidongRequest('getOutLinkInfoV6',{getOutLinkInfoReq:{account:'',linkID:share.shareId,passwd:share.passcode||'',caSrt:0,coSrt:0,srtDr:1,bNum:page,pCaID:folder.id,eNum:200},commonAccountInfo:{account:'',accountType:1}},true,false,profile,readToken);
   if(readToken?.cancelled)throw cpB6Unused();
   const folders=Array.isArray(data.caLst)?data.caLst:[],files=Array.isArray(data.coLst)?data.coLst:[];
   if(!Array.isArray(data.caLst)&&!Array.isArray(data.coLst))throw cpError('UPSTREAM_ERROR');
   cpNPSeenPage(folders.concat(files),pages,x=>x.caID?'d:'+x.caID:'f:'+x.coID);
   emit(folders.filter(x=>x.caID).map(item=>Object.assign({},item,{cpB8Folder:true})).concat(files.filter(x=>x.coID)));
   if(folders.length+files.length<200)break;
  }
 };
 const rows=await cpTargetB8Walk(cpTargetFilter(share.cpTargetDirectory,item=>Number(item.coType)===3||cpNPVideo(item.coName)),'yidong',{id:'root',path:'',depth:0},read,child,build,profile,1001,share.cpB8ReadToken);
 return cpB8Files(rows,build,x=>x.coID);
};
cpNPTianyiCatalog=async function(share,profile){
 cpNPGuard('tianyi',profile);const info=await cpNPTianyiShareInfo(share,profile),seen=new Set([info.id]);
 const build=(file,path)=>{if(file.id.startsWith('!tycas1!'))throw cpError('QUALITY_UNAVAILABLE');return cpNPVideo(file.name)?cpNPItem(share,file.id,file.name,file.size,path,{tianyiShareId:info.shareId}):null;};
 if(!info.isFolder){const file=build(info,'');return {list:file?[file]:[]};}
 const child=(item,parent)=>{
  if(!item.cpB8Folder)return null;
  if(parent.depth>=4)throw cpError('UPSTREAM_ERROR');return cpB8Folder(item,parent,item.id,item.name);
 };
 const read=async(folder,emit,cpTargetToken)=>{
  const readToken=cpTargetToken||share.cpB8ReadToken;
  for(let page=1;page<=30;page++){
   cpCoveragePage(share.cpTargetDirectory);
   cpNPGuard('tianyi',profile);
   const response=await cpNPTianyiGet(cpNPTIANYI_SHARE_API+'listShareDir.action?'+cpNPQuery({noCache:Math.random(),pageNum:page,pageSize:60,fileId:folder.id,shareDirFileId:folder.id,isFolder:true,shareId:info.shareId,shareMode:info.shareMode,iconOption:5,orderBy:'filename',descending:false,accessCode:share.passcode||''}),profile,cpNPTianyiShareHeaders(share),false,readToken);
   if(readToken?.cancelled)throw cpB6Unused();
   const {files,folders}=cpNPTianyiRows(response);
   for(const item of files.concat(folders)){if(seen.has(item.id))throw cpError('UPSTREAM_ERROR');seen.add(item.id);}
   emit(files.concat(folders.map(item=>Object.assign({},item,{cpB8Folder:true}))));
   if(files.length+folders.length<60)break;if(page===30)throw cpError('UPSTREAM_ERROR');
  }
 };
 const rows=await cpTargetB8Walk(cpTargetFilter(share.cpTargetDirectory,item=>cpNPVideo(item.name)),'tianyi',{id:info.id,path:'',depth:0},read,child,build,profile,500,share.cpB8ReadToken);
 cpNPGuard('tianyi',profile);return cpB8Files(rows,build,x=>x.id);
};

// Share tokens are reusable only after verification in this operation. Raw
// 24-hour catalog entries (including video.passCodeToken) cannot seed this map.
function cpBetaShareTokenKey(provider,share){return cpReadKey(provider,share.shareId,share.passcode,'beta-share-token');}
function cpBetaRememberShareToken(provider,share,token,profile){
 cpNPGuard(provider,profile);if(token&&cpReadOperation)cpReadOperation.set(cpBetaShareTokenKey(provider,share),Promise.resolve(token));
}
function cpBetaXunleiShareToken(video,profile){
 return cpReadReuse('xunlei',video.shareId,video.passcode,'beta-share-token',async()=>{
  const data=await cpNPXunleiApi('GET','drive/v1/share?'+cpNPQuery({share_id:video.shareId,pass_code:video.passcode||'',limit:100}),null,true,profile);
  return data.pass_code_token||'';
 });
}
const cpBetaGuangyaShareTokenNative=cpNPGuangyaShareToken;
cpNPGuangyaShareToken=function(share,profile){return cpReadReuse('guangya',share.shareId,share.passcode,'beta-share-token',()=>cpBetaGuangyaShareTokenNative(share,profile));};

// Auth is independent of share contents. Unused speculation is cancellable and
// never enters the operation's mandatory pending set or persistent storage.
const cpB8PrepareAuthNative=cpNPTianyiPrepareAuth;
function cpB8StartTianyiAuth(){
 const operation=cpReadOperation,profile=cpActiveProfile||cpProfile;
 if(!operation||!cpDriveEnabled('tianyi')||cpBlockedProviders.has('tianyi'))return;
 const cookie=String(cpNewPanAuthValue('tianyi')||'').trim();if(!cookie)return;
 const entries=operation.betaTianyiAuth||(operation.betaTianyiAuth=new Map()),key=cpNPMd5(cookie);if(entries.has(key))return;
 const entry={token:cpB6Token(),used:false};entries.set(key,entry);
 entry.task=Promise.resolve().then(()=>{cpNPGuard('tianyi',profile);if(entry.token.cancelled)throw cpB6Unused();return cpB8PrepareAuthNative(profile,cookie,entry.token);});
 entry.task.catch(()=>{});
}
cpNPTianyiPrepareAuth=function(profile,cookie){
 cpNPGuard('tianyi',profile);
 const entry=cpReadOperation?.betaTianyiAuth?.get(cpNPMd5(cookie));
 if(entry&&!entry.token.cancelled){
  entry.used=true;
  if(!entry.demanded)entry.demanded=entry.task.catch(error=>{
   cpNPGuard('tianyi',profile);if(error?.code!=='UPSTREAM_ERROR')throw error;
   // One recovery for a transient prewarm error; terminal auth stays terminal.
   return cpBetaReadOutcome('tianyi',cpNPMd5(cookie),'','auth-demand',()=>cpB8PrepareAuthNative(profile,cookie));
  });
  return entry.demanded;
 }
 return cpBetaReadOutcome('tianyi',cpNPMd5(cookie),'','auth-demand',()=>cpB8PrepareAuthNative(profile,cookie));
};
const cpB8ReadCatalogNative=cpB6ReadCatalog;
cpB6ReadCatalog=function(params,share,work){if(share.provider==='tianyi')cpB8StartTianyiAuth();return cpB8ReadCatalogNative(params,share,work);};

// Only providers with token-aware anonymous catalog requests may speculate.
// No streamed file getter runs until validity and access attributes are approved.
async function cpB8CheckedCatalog(share,cached,site,keyword,params,titles=[]){
 const profile=cpActiveProfile||cpProfile;
 if(cached)cached=cpTargetCached(cached,params,titles);
 const speculative=!cached&&!!share.passcode&&['tianyi','yidong'].includes(share.provider);
 let entry,accepted=false;
 if(speculative){
  const token=cpB6Token(),input=Object.assign({},share,{cpB8ReadToken:token,cpTargetDirectory:cpTargetScope(params,titles,share.cpCoverageFallback)});
  entry={token,cacheKey:cpNewPanCatalogKey(share)};
  entry.task=Promise.resolve().then(()=>{cpCheck(profile);if(token.cancelled)throw cpB6Unused();return rexShareCatalog(input);}).then(value=>({value}),error=>({error}));
 }
 try{
  const checked=(await qpCheckShares([share],site,keyword))[0];cpCheck(profile);
  if(['bad','invalid','expired'].includes(checked.validity)){
   if(entry)entry.token.cancel();
   return {checked,catalog:null};
  }
  let catalog=cached;
  if(entry&&checked.passcode===share.passcode){
   const outcome=await entry.task;cpCheck(profile);if(outcome.error)throw outcome.error;catalog=outcome.value;accepted=true;
  }else if(entry)entry.token.cancel();
  if(!catalog)catalog=await cpQueueCatalogShare(checked.provider,()=>cpTargetRead(params,checked,titles));
  return {checked,catalog};
 }finally{if(entry){entry.token.cancel();if(!accepted)cpB8DiscardCatalog(entry.cacheKey);}}
}

function cpB8DiscardCatalog(key){
 // Capture the native cache key before starting I/O, so account changes cannot
 // make cleanup erase another profile's catalog instead of this preparation.
 if(typeof huajuanInvalidateCache==='function')huajuanInvalidateCache(key);
 if(typeof rexMemoryCache!=='undefined'){const hash=baiduSha1(key);rexMemoryCache.delete(hash);safeStorageSet(CP_COOKIE_ROOT+'catalog.'+hash,'');}
}

// B10: account UID is independent of share verification and catalog contents.
// Stage only within the current operation; native demand owns validation/cache
// admission and error observation. Unused preparation never delays completion.
function cpB10BaiduUidUrl(){return 'https://mbd.baidu.com/userx/v1/info/get?'+toQuery({
 appname:'baiduboxapp',fields:'        ["bg_image","member","uid","avatar", "avatar_member"]',
 client:'',clientfrom:'',lang:'zh-cn',tpl:'',ttt:''
});}
function cpB10StartBaiduUid(share){
 const operation=cpReadOperation,profile=cpActiveProfile||cpProfile;
 if(!operation||!cpBaiduUidScope||!cpDriveEnabled('baidu')||cpBlockedProviders.has('baidu'))return;
 cpCheck(profile);
 let headers;try{headers=baiduHeaders(share);}catch(_){return;}
 if(!/(?:^|;)\s*BDUSS=[^;]+/.test(headers.Cookie||''))return;
 const url=cpB10BaiduUidUrl(),key=cpBaiduUidKey('GET',url,headers);
 if(key===null||cpBaiduUidScope.has(key))return;
 const entries=operation.betaBaiduUid||(operation.betaBaiduUid=new Map());if(entries.has(key))return;
 const cached=cpBaiduCached(cpBaiduCacheKey('uid',key),300000);if(cpValidBaiduUid(cached))return;
 const entry={token:cpB6Token(),used:false};entries.set(key,entry);
 entry.task=Promise.resolve().then(()=>{
  cpCheck(profile);if(entry.token.cancelled)throw cpB6Unused();
  return httpJsonCore('GET',url,null,headers,entry.token);
 }).then(value=>({value}),error=>({error}));
}
const cpB10ReadBaiduIdentityNative=cpReadBaiduIdentity;
cpReadBaiduIdentity=function(scope,key,request,profile){
 const entry=cpReadOperation?.betaBaiduUid?.get(key);
 if(!entry||entry.token.cancelled)return cpB10ReadBaiduIdentityNative(scope,key,request,profile);
 return cpB10ReadBaiduIdentityNative(scope,key,()=>{
  entry.used=true;
  if(!entry.demanded)entry.demanded=entry.task.then(outcome=>{
   cpCheck(profile);
   if(!outcome.error)return outcome.value;
   const error=outcome.error,status=Number(error?.status);
   if(status===401||status===429||['AUTH_FAILED','RATE_LIMITED','ABORTED','ACCOUNT_CHANGED','OPERATION_TIMEOUT','BETA_READ_UNUSED'].includes(error?.code))throw error;
   // A single foreground recovery for a transient speculative failure, shared
   // by all files/subtitles. No failure enters persistent identity caches.
   return request();
  });
  return entry.demanded;
 },profile);
};
const cpB10ReadCatalogNative=cpB6ReadCatalog;
cpB6ReadCatalog=function(params,share,work){if(share.provider==='baidu')cpB10StartBaiduUid(share);return cpB10ReadCatalogNative(params,share,work);};
// Known-file/manual paths can overlap UID with share verification as well.
const cpB10BaiduResourceNative=getBaiduResource;
getBaiduResource=function(info){const v=info.videoInfo||{};if(v.shareid&&v.uk&&v.fid)cpB10StartBaiduUid(v);return cpB10BaiduResourceNative(info);};

const CP_B11_QUARK_FOLDER_URL="https://drive-pc.quark.cn/1/clouddrive/file/sort?pr=ucpro&fr=pc&uc_param_str=&pdir_fid=0&_page=1&_size=50&_fetch_total=1&_fetch_sub_dirs=0&_sort=file_type:asc,updated_at:desc&fetch_all_file=1&fetch_risk_file_name=1";
// B11: stage the raw read-only response. Only native foreground lookup may
// decode it, sync response cookies, observe errors, or create a missing folder.
function cpB11StartQuarkFolder(){
 const operation=cpReadOperation,profile=cpActiveProfile||cpProfile;
 if(!operation||operation.betaQuarkFolder||!cpDriveEnabled('quark')||cpBlockedProviders.has('quark')||!ensureCookie())return;
 cpCheck(profile);
 const entry={token:cpB6Token(),profile,used:false};operation.betaQuarkFolder=entry;
 entry.task=Promise.resolve().then(()=>{
  cpCheck(profile);if(entry.token.cancelled)throw cpB6Unused();
  entry.cookieAtDispatch=ensureCookie();
  return cpHttpGet(CP_B11_QUARK_FOLDER_URL,{headers:quarkHeaders(),timeout:8000,cpB6Token:entry.token});
 }).then(value=>({value}),error=>({error}));
}
const cpB11HttpGetNative=cpHttpGet;
cpHttpGet=function(url,options,beforeDispatch){
 const entry=cpReadOperation?.betaQuarkFolder;
 if(url!==CP_B11_QUARK_FOLDER_URL||options?.cpB6Token||beforeDispatch||!entry?.used||entry.token.cancelled)return cpB11HttpGetNative(url,options,beforeDispatch);
 if(!entry.response)entry.response=entry.task.then(outcome=>{
  cpCheck(entry.profile);
  if(!outcome.error)return outcome.value;
  if(['AUTH_FAILED','RATE_LIMITED','ABORTED','ACCOUNT_CHANGED','OPERATION_TIMEOUT','BETA_READ_UNUSED'].includes(outcome.error?.code))throw outcome.error;
  // Only one native foreground recovery of a failed speculative transport.
  entry.recovered=true;
  return cpB11HttpGetNative(url,options,beforeDispatch);
 }).then(response=>{
  cpCheck(entry.profile);
  const status=Number(response.status||response.statusCode||0);
  if(status===401||status===429){const error=cpError(status===401?'AUTH_FAILED':'RATE_LIMITED');error.status=status;throw error;}
  // A staged response may precede a newer foreground cookie rotation. Preserve
  // that newer session instead of replaying the older response's Set-Cookie.
  if(!entry.recovered&&entry.cookieAtDispatch!==undefined&&ensureCookie()!==entry.cookieAtDispatch){
   const headers={};for(const key of Object.keys(response.headers||{}))if(key.toLowerCase()!=='set-cookie')headers[key]=response.headers[key];
   return Object.assign({},response,{headers});
  }
  return response;
 });
 return entry.response;
};
const cpB11CheckFolderNative=checkFolderExists;
checkFolderExists=function(name){
 const entry=cpReadOperation?.betaQuarkFolder;
 if(name!==CACHE_FOLDER||!entry||entry.token.cancelled)return cpB11CheckFolderNative(name);
 cpCheck(entry.profile);entry.used=true;
 if(!entry.lookup)entry.lookup=Promise.resolve().then(()=>{cpCheck(entry.profile);return cpB11CheckFolderNative(name);});
 return entry.lookup;
};
const cpB11ReadCatalogNative=cpB6ReadCatalog;
cpB6ReadCatalog=function(params,share,work){if(share.provider==='quark')cpB11StartQuarkFolder();return cpB11ReadCatalogNative(params,share,work);};

// Refill two local-certain read-only preparations while the catalog is open.
// Native URL getter limits and outcome memoization remain authoritative.
function cpB11Rolling(provider,operation){
 const profile=cpActiveProfile||cpProfile,waiting=[];let active=0,closed=false,failed=false;
 const pump=()=>{
  while(!closed&&!failed&&active<2&&waiting.length){
   const info=waiting.shift();active++;
   const task=Promise.resolve().then(()=>{
    cpCheck(profile);
    if(cpReadOperation!==operation||cpBlockedProviders.has(provider)||!cpDriveEnabled(provider))return [];
    return provider==='uc'?getUcResource(info):provider==='baidu'?getBaiduResource(info):get115Resource(info);
   });
   cpTrackRead(task,operation).then(()=>{},()=>{failed=true;waiting.length=0;}).finally(()=>{active--;pump();});
  }
 };
 return {offer(info){if(closed||failed)return;waiting.push(info);pump();},close(){closed=true;waiting.length=0;}};
}

// B12: local card filtering, plus at most one clean-miss alternate query.
function cpB12IdentityRecord(params){
 const requested=cpRequestedYear(params);if(requested.conflict)return null;
 const signature=typeof cpTrustedTitleSignature==='function'?cpTrustedTitleSignature(params):JSON.stringify([4,String(params.tmdbId||params.tmdbID||''),params.type==='movie'?'movie':'tv',Number(params.season||1),params.seriesName||params.title||params.name||'',requested.year,params.imdbId||'']);
 const key='identity:'+baiduSha1(signature),valid=r=>r&&r.signature===signature&&r.expires>Date.now()&&Array.isArray(r.titles)&&r.titles.length<=16&&r.titles.every(t=>typeof t==='string'&&t.length<=200&&!/[\x00-\x1f\x7f]/.test(t));
 let record=cpRead(key);try{const raw=Widget.sharedCache?.get('catpaw.upstream-enhanced.identity.v1',key);if(raw){const shared=JSON.parse(raw);if(valid(shared))record=shared;}}catch(_){}
 return valid(record)?record:null;
}
function cpB12LocalTitles(params){
 return [...new Set(cpRelevanceTitles(params).concat(cpB12IdentityRecord(params)?.titles||[]))];
}
function cpB12CanSearch(){
 if(cpResourceOwner?.betaB12DiscoveryFailed)return false;
 const enabled=typeof cpCandidateEnabled==='function'?cpCandidateEnabled:quanpanProviderEnabled;
 return ['quark','baidu','uc','115','123','xunlei','guangya','yidong','tianyi'].some(p=>enabled(p)&&!cpBlockedProviders.has(p));
}
function cpB12DiscoveryFailed(){if(cpResourceOwner)cpResourceOwner.betaB12DiscoveryFailed=true;}
// Failure results are shared only within this owner, never persisted as a miss.
// A catalog lookup followed by fallback must not repeat a failed metadata call.
const cpB12HasTrustedNative=typeof cpTrustedTitles==='function';
const cpB12TrustedNative=cpB12HasTrustedNative?cpTrustedTitles:cpB7TrustedTitles;
function cpB12Trusted(params){
 const owner=cpResourceOwner||cpReadOperation;
 if(!owner)return cpB12TrustedNative(params);
 const key=JSON.stringify([params.type,params.season||1,params.tmdbId||params.tmdbID||'',cpRequestedYear(params),cpRelevanceTitles(params),params.imdbId||'']);
 const memo=owner.betaB12Titles||(owner.betaB12Titles=new Map());
 if(!memo.has(key))memo.set(key,Promise.resolve().then(()=>cpB12TrustedNative(params)));
 return memo.get(key);
}
if(cpB12HasTrustedNative)cpTrustedTitles=cpB12Trusted;else cpB7TrustedTitles=cpB12Trusted;
function cpB12Alternate(params,titles){
 if(cpRequestedYear(params).conflict)return '';
 const clean=typeof cpCandidateSearchTitle==='function'?cpCandidateSearchTitle:qpCleanQuery;
 const primary=clean(params.seriesName||params.title||params.name||params.keyword||'');
 // Validated native records put the original immediately after the main name.
 // Host-supplied original names take precedence over regional translations.
 const ordered=[params.originalName,params.originalTitle,params.original_name,params.original_title,cpB12IdentityRecord(params)?.originalTitle,...titles];
 return ordered.filter(t=>typeof t==='string'&&t.trim()&&t.length<=200&&!/[\x00-\x1f\x7f]/.test(t)).map(clean).find(t=>t&&!cpTitlesEqual(t,primary))||'';
}
cpB7SearchMatches=async function(rows,params,onReady,canStart=()=>true){
 const verified=cpB14VerifiedSiteIdentity(params),titles=[...new Set(cpB12LocalTitles(params).concat(verified?.titles||[]))],matching=Object.assign({},params,verified?{year:verified.year}:{},{alternativeTitles:titles});
 const accepted=rows.filter(row=>cpSearchResultMatches(row.title,matching));
 const immediate=accepted.filter(row=>!cpCoverageCard(row.title,matching));
 if(onReady&&immediate.length&&canStart())await onReady(immediate,titles);
 return {rows:accepted,titles};
};

const cpB12SearchTitleNative=cpSearchTitleMatches;
cpSearchTitleMatches=function(value,params){
 const requested=cpRequestedYear(params);if(requested.conflict)return false;
 const raw=String(value||''),titles=cpRelevanceTitles(params),evidence=cpWithoutKnownTitles(raw,titles);
 if(requested.year&&[...evidence.matchAll(/(?:^|[^a-z0-9])((?:19|20)\d{2})(?=$|[^a-z0-9])/gi)].some(m=>Number(m[1])!==requested.year))return false;
 // Check every season marker, including bilingual cards with contradictory ones.
 const seasons=raw.match(/第\s*[一二三四五六七八九十百\d]+\s*季|(?:^|[^a-z0-9])Season[ ._-]*\d+(?=$|[^a-z0-9])|S\d{1,2}[ ._-]*E\d+|(?:^|[^a-z0-9])S\d{1,2}(?=$|[^a-z0-9])/gi)||[];
 if(params.type==='movie'&&seasons.length||seasons.some(s=>cpExplicitSeason(s)!==Number(params.season||1)))return false;
 if(cpB12SearchTitleNative(value,params))return true;
 const quality=/[ ._-](?:[248]K|\d{3,4}P|HDR|杜比|蓝光|WEB[ ._-]*DL|BluRay|REMUX)(?=$|[ ._-])/i.exec(raw);
 if(quality&&!cpSearchMetadataLabel(raw.slice(quality.index).replace(/\bSDR\b|\bHHWEB版本/gi,'')))return false;
 const text=cpRelevanceSearchName(raw);
 for(const title of titles){
  if(!/[a-z]/i.test(title)||/[\u3400-\u9fff]/.test(title))continue;
  const words=title.split(/[\s·:：._\-()[\]（）]+/).filter(Boolean).map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
  if(!words.length)continue;
  const match=new RegExp('(^|[ \\t])('+words.join('[ ._-]+')+')(?=$|[^a-z0-9])','i').exec(text);if(!match||match.index===0)continue;
  const prefix=text.slice(0,match.index).replace(/第\s*[一二三四五六七八九十百\d]+\s*季/g,'').replace(/[（(]\s*(?:19|20)\d{2}\s*[）)]/g,'').trim();
  // A Chinese title followed by an exact trusted original is a bilingual card.
  // Extra editions, sequels and arbitrary suffixes remain meaningful evidence.
  if(!/^[\u3400-\u9fff·\s]{1,40}$/.test(prefix)||/真人|剧场|特[别典]|番外|预告|花絮|续[作集篇]|第.*[部篇]|前传|后传|外传/.test(prefix))continue;
  const original=text.slice(match.index+match[1].length);
  if(cpB12SearchTitleNative(original,params))return true;
 }
 return false;
};


function cpB14VerifiedSiteIdentity(params){
 const requested=cpRequestedYear(params),id=String(params.tmdbId||params.tmdbID||'');
 if(id!=='273240'||params.type!=='tv'||Number(params.season||1)!==1||requested.conflict||requested.year&&requested.year!==2026)return null;
 const names=['校外','Off Campus','校園戀曲','校园之外'];
 const primary=params.seriesName||params.title||params.name||params.keyword||'';
 if(!names.some(name=>cpTitlesEqual(name,primary)))return null;
 return {year:2026,titles:['校园之外','Off Campus','校園戀曲']};
}

// A target catalog covers one complete directory, never the complete share.
// Scope travels with the share; concurrent shares cannot overwrite one another.
function cpTargetScope(params,titles=[],probe=false){
 const episode=Number(params?.episode),season=Number(params?.season||1);
 if(params?.type==='movie'||!Number.isInteger(episode)||episode<1||episode>=1000||!Number.isInteger(season)||season<1)return null;
 const names=[...new Set(cpRelevanceTitles(params).concat(titles||[]))];if(!names.length)return null;
 return cpCoverageScope({params:{...params,season,episode},titles:names,key:JSON.stringify(['season-priority-v1',season,episode,names])},probe);
}
function cpTargetCached(catalog,params,titles){
 if(!catalog||params?.refresh||params?.forceRefresh)return null;
 const coverage=catalog?.cpTargetDirectory;if(!coverage)return catalog;
 const scope=cpTargetScope(params,titles);
 if(!scope||!(coverage.expires>Date.now()))return null;
 if(coverage.completeShare)return catalog;
 if(coverage.directories&&coverage.reuseKey===JSON.stringify([scope.params.season,scope.titles])){
  const selected=coverage.directories.find(directory=>directory.list.some(file=>cpEpisodeVideoMatches(file,scope.params,scope.titles)));
  return selected?Object.assign({},catalog,selected):null;
 }
 if(coverage.key===scope.key)return catalog;
 // A partial share can cross episodes only when every earlier visited
 // directory was empty and this complete directory already contains the hit.
 return coverage.reusable===true&&coverage.reuseKey===JSON.stringify([scope.params.season,scope.titles])&&Array.isArray(catalog.list)&&catalog.list.some(file=>cpEpisodeVideoMatches(file,scope.params,scope.titles))?catalog:null;
}
function cpTargetCacheMatches(catalog,params,titles){return !!cpTargetCached(catalog,params,titles);}
function cpTargetFilter(scope,accept){return scope?{...scope,accept,cpTargetObservation:scope.cpTargetObservation||(scope.cpTargetObservation={})}:null;}
function cpTargetFolderSeason(item){
 const name=item.file_name||item.server_filename||item.n||item.FileName||item.name||item.fileName||item.caName||item.catalogName||item.coName||'';
 // Normalize only whitespace between a season label and its number. Keep the
 // native season parser's number boundaries and Chinese/episode-pack support.
 return cpExplicitSeason(String(name).replace(/((?:^|[^a-z0-9])(?:season|s))\s+(?=\d)/gi,'$1'));
}
function cpTargetHit(scope,item,path){
 const name=item.file_name??item.server_filename??item.n??item.FileName??item.name??item.fileName??item.coName??'';
 const video={...item,file_name:String(name),parentPath:item.parentPath||path||''};
 if(scope.cpCoverageProbe){video.file_name=cpCoverageNormalize(video.file_name);video.parentPath=cpCoverageNormalize(video.parentPath);if(!cpCoverageFileMatches(video,scope.params,scope.titles))return false;}
 return (scope.accept?scope.accept(item):isVideoFile(video))&&cpEpisodeVideoMatches(video,scope.params,scope.titles);
}
function cpTargetItemId(item){return String(item.fid||item.fs_id||item.fsid||item.FileId||item.fileId||item.coID||item.id||item.resId||item.path||'');}
// Native readers own pagination and validation. Jobs may read concurrently;
// only the ordered, complete prefix can affect selection or cached evidence.
async function cpTargetCollect(scope,root,read,child,onItem,check=()=>{},max=Infinity,path=()=>undefined,includeFolders=false){
 const queue=[root],seen=new Set(),result=[],jobs=new Map(),priorities=new Map(),groups=[];result.directories=[];let current,lookahead,stopped=false;
 const folder=scope.folder||((item,node)=>{const next=child(item,node);return next!==undefined&&next!==null;});
 const key=node=>String(node?.id??node),rank=node=>priorities.get(key(node))||0;
 const emitFile=(item,node)=>{
  if(!onItem||folder(item,node)||scope.cpCoverageProbe&&!cpTargetHit(scope,item,cpCoveragePath(scope,node,path(node))))return;
  const observation=scope.cpTargetObservation,previous=observation?.preparing;
  if(observation&&!scope.cpCoverageProbe)observation.preparing={path:cpCoverageNormalize(path(node)||scope.cpCoveragePaths.get(cpCoverageNodeKey(node))||'')};
  try{onItem(item,node);}finally{if(observation)observation.preparing=previous;}
 };
 // Bounded coverage probes reserve every directory/page for logical work.
 const canPrefetch=()=>!scope.cpCoverageProbe&&jobs.size<max;
 const start=(node,priority=0)=>{
  const id=key(node);if(jobs.has(id))return jobs.get(id);
  if(jobs.size>=max)throw cpError('UPSTREAM_ERROR');cpCoverageDirectory(scope);
  priority=priorities.get(id)??priority;priorities.set(id,priority);
  const job={node,priority,items:[],token:cpB6Token(),active:false,emitted:false,error:null};jobs.set(id,job);
  if(scope.cpTargetReadToken){if(scope.cpTargetReadToken.cancelled)job.token.cancel();else scope.cpTargetReadToken.closed.then(()=>job.token.cancel());}
  job.task=Promise.resolve().then(()=>{if(job.token.cancelled)throw cpB6Unused();return cpB6Await(job.token,read(node,rows=>{
   if(stopped||job.token.cancelled)throw cpB6Unused();check();job.emitted=true;job.items.push(...rows);
   if(job.active){for(const item of rows)emitFile(item,node);preview(job,rows);}
  },job.token));}).then(rows=>{if(!job.emitted&&Array.isArray(rows))job.items.push(...rows);},error=>{job.error=error;});
  return job;
 };
 const preview=(job,rows)=>{
  if(lookahead||stopped||!canPrefetch()||job.items.some(item=>!folder(item,job.node)&&cpTargetHit(scope,item,path(job.node))))return;
  // Before parent pagination completes, never speculate into another season.
  const candidates=rows.filter(item=>folder(item,job.node)&&cpTargetFolderSeason(item)===scope.params.season);
  if(candidates.length){const next=child(candidates[0],job.node);lookahead=start(next,1);}
 };
 const close=()=>{stopped=true;for(const job of jobs.values())if(job!==current)job.token.cancel();};
 try{
 for(let cursor=0;cursor<queue.length;cursor++){
  check();const node=queue[cursor],id=key(node);if(seen.has(id))continue;seen.add(id);
  current=start(node);if(lookahead===current)lookahead=null;current.active=true;
  for(const item of current.items)emitFile(item,node);
  const next=queue[cursor+1];
  if(!lookahead&&canPrefetch()&&next!==undefined&&rank(next)===current.priority&&!current.items.some(item=>!folder(item,node)&&cpTargetHit(scope,item,path(node))))lookahead=start(next,rank(next));
  await current.task;current.active=false;check();if(current.error)throw current.error;
  const items=current.items,emitted=current.emitted;
  const files=[],folders=[];
  for(const item of items){if(folder(item,node))folders.push(item);else files.push(item);}
  // Multiple meaningful work branches cannot lend an unknown folder the
  // resource card's identity. Season/quality/role folders carry no work name.
  if(typeof cpFileCatalogParams==='function'&&folders.length>1){
   const labels=folders.map(item=>({parentPath:item.file_name||item.server_filename||item.n||item.FileName||item.name||item.fileName||item.caName||item.catalogName||item.coName||''}));
   if(cpFileCatalogParams(scope.params,labels).cpFileContextAmbiguous){scope.params.cpFileContextAmbiguous=true;if(scope.cpTargetObservation)scope.cpTargetObservation.ambiguous=true;}
  }
  for(const item of folders){const season=cpTargetFolderSeason(item);if(season)scope.cpCoverageSeasons.add(season);}
  // Existing read-only file preparation may overlap later pages. A catalog
  // hit is committed only after every page has completed successfully.
  for(const item of files)scope.cpCoverageParents.set(cpCoverageItemKey(item),path(node)||scope.cpCoveragePaths.get(cpCoverageNodeKey(node))||'');
  if(!emitted&&onItem)for(const item of files)emitFile(item,node);
  const hit=files.some(item=>cpTargetHit(scope,item,cpCoveragePath(scope,node,path(node))));
  const rows=(includeFolders?items:files).map(item=>({item,parent:node,path:path(node)}));
  groups.push({ids:files.map(cpTargetItemId),packageSizeBytes:typeof qpFileBytes==='function'?files.reduce((total,item)=>total+qpFileBytes(item.size??item.Size??item.s),0):undefined});
  if(hit){
   if(scope.cpTargetObservation)Object.assign(scope.cpTargetObservation,{groups,selected:groups.length-1});
   if(scope.cpTargetCommit)scope.cpTargetCommit(groups.at(-1).ids);
   result.push(...rows);result.directories.push(...folders);return result;
  }
  result.push(...rows);result.directories.push(...folders);
  // A directory name is a scheduling hint, never evidence of a file hit.
  // Stable sorting keeps all fallback folders and equal-priority versions.
  folders.sort((a,b)=>Number(cpTargetFolderSeason(b)===scope.params.season)-Number(cpTargetFolderSeason(a)===scope.params.season));
  queue.push(...folders.filter(item=>!scope.cpCoverageProbe||cpTargetFolderSeason(item)===null||cpTargetFolderSeason(item)===scope.params.season).map(item=>{const next=cpCoverageChild(scope,node,item,child(item,node),path(node));priorities.set(key(next),Number(cpTargetFolderSeason(item)===scope.params.season));return next;}));
 }
 if(scope.cpTargetObservation)Object.assign(scope.cpTargetObservation,{groups,selected:null});
 return result;
 }finally{close();}
}
function cpTargetWalk(scope,provider,root,read,child,onItem){
 if(!scope)return cpWalkCatalog(provider,root,read,child,onItem);
 return cpTargetCollect(scope,root,read,child,onItem,()=>cpCheck(cpActiveProfile||cpProfile));
}
function cpTargetQpWalk(scope,root,read,child,onItem){
 if(!scope)return qpCatalogTree(root,read,child,onItem);
 return cpTargetCollect(scope,root,read,child,onItem,()=>cpCheck(cpActiveProfile||cpProfile),Infinity,()=>undefined,true);
}
function cpTargetB8Walk(scope,provider,root,read,child,onFile,profile,max=1001,readToken){
 if(!scope)return cpB8Walk(provider,root,read,child,onFile,profile,max,readToken);
 const check=()=>{if(readToken?.cancelled)throw cpB6Unused();cpNPGuard(provider,profile);};
 const target={...scope,cpTargetReadToken:readToken,...(provider==='tianyi'?{folder:item=>!!item.cpB8Folder}:{})};
 return cpTargetCollect(target,root,read,child,onFile?(item,node)=>onFile(item,node.path):null,check,max,node=>node.path);
}
async function cpTargetRaw(share){
 cpCoverageRegister(share.cpTargetDirectory,share);
 if(typeof qpShareCatalogKey==='function')qpOperation?.catalogReads?.add(qpShareCatalogKey(share));
 const scope=share.cpTargetDirectory;
 const admissions=cpReadOperation&&(cpReadOperation.targetAdmissions||(cpReadOperation.targetAdmissions=new Map()));
 scope.cpTargetCommit=ids=>admissions?.set(cpB6CatalogKey(share),new Set(ids));
 let result;
 if(cpIsNewPan(share.provider))result=await cpNewPanCatalog(share);
 else if(share.provider==='uc')result=await getUcVideos(share);
 else if(share.provider==='baidu')result=await getBaiduVideos(share);
 else if(share.provider==='115')result=await get115Videos(share);
 else if(share.provider==='123'&&typeof getPan123Videos==='function')result=await getPan123Videos(share);
 else result=await getVideosFromShareLink(share.url,share.passcode,share.cpTargetDirectory);
 cpCheck(cpActiveProfile||cpProfile);
 cpCoverageRemember(share.cpTargetDirectory,share,result);
 const observation=scope.cpTargetObservation,all=result.list;
 if(observation?.ambiguous)for(const file of all)file.cpFileContextAmbiguous=true;
 const directories=observation?.groups?.map(group=>{const members=new Set(group.ids);return {list:all.filter(file=>members.has(String(file.fid))),...(group.packageSizeBytes===undefined?{}:{packageSizeBytes:group.packageSizeBytes})};});
 if(observation?.selected!=null)Object.assign(result,directories[observation.selected]);
 result.cpTargetDirectory={key:share.cpTargetDirectory.key,reuseKey:JSON.stringify([share.cpTargetDirectory.params.season,share.cpTargetDirectory.titles]),...(!scope.cpCoverageProbe&&directories?{directories}:{}),completeShare:false,expires:Date.now()+14400000};
 return result;
}
function cpTargetRead(params,share,titles=[],refresh=false){
 refresh=refresh||params?.refresh===true||params?.forceRefresh===true;
 const scope=cpTargetScope(params,titles,share.cpCoverageFallback);
 if(!scope)return cpB6ReadCatalog(cpColdMatchParams(params,titles),share,()=>typeof cpReadRawCatalog==='function'?cpReadRawCatalog(share,refresh):rexShareCatalog(share));
 if(refresh&&typeof cpInvalidateCandidateShare==='function')cpInvalidateCandidateShare(share);
 const input={...share,cpTargetDirectory:scope};
 return cpB6ReadCatalog(cpColdMatchParams(params,titles),input,()=>typeof cpReadRawCatalog==='function'?cpReadRawCatalog(input,refresh):rexShareCatalog(input));
}

// Keep native routing (and its refresh/invalidation contract) as the public
// catalog seam. Scoped reads can reuse a proven complete native snapshot.
if(typeof rexShareCatalog==='function'){
 const native=rexShareCatalog;rexShareCatalog=function(share,...args){return share.cpTargetDirectory?(cpTargetWholeCache(share)||cpTargetRaw(share)):native(share,...args);};
}
if(typeof huajuanShareCatalog==='function'){
 const native=huajuanShareCatalog;huajuanShareCatalog=function(share,...args){return share.cpTargetDirectory?(cpTargetWholeCache(share)||cpTargetRaw(share)):native(share,...args);};
}
function cpTargetQueue(token,provider,work){return cpQueueCatalogRead(provider,()=>{if(token?.cancelled)throw cpB6Unused();return cpB6Await(token,work());});}
const cpTargetEmitNative=cpB6EmitFile;
cpB6EmitFile=function(provider,share,file,...args){
 if(share.cpTargetDirectory?.params.cpFileContextAmbiguous)file={...file,cpFileContextAmbiguous:true};
 const admitted=cpReadOperation?.targetAdmissions?.get(cpB6CatalogKey(Object.assign({},share,{provider})));
 if(admitted&&!admitted.has(String(file.fid)))return;
 return cpTargetEmitNative(provider,share,file,...args);
};
function cpTargetWholeCache(share){
 if(share.cpTargetDirectory?.cpCoverageProbe||share.cpTargetDirectory?.params.refresh||share.cpTargetDirectory?.params.forceRefresh)return null;
 const accounts=cpAccounts(),cookie=share.provider==='baidu'?accounts[1]:share.provider==='115'?accounts[2]:share.provider==='quark'?ensureCookie():'';
 const raw=cpIsNewPan(share.provider)?cpNewPanCatalogKey(share):typeof qpShareCatalogKey==='function'?qpShareCatalogKey(share):[share.provider==="quark"?"share-video-v3":"share",share.provider,share.shareId,share.passcode||'',baiduSha1(String(cookie||''))].join(':');
 const hash=baiduSha1(raw),memory=typeof huajuanMemoryCache!=='undefined'?huajuanMemoryCache:typeof rexMemoryCache!=='undefined'?rexMemoryCache:null;
 let record=memory?.get(hash);if(!record)try{record=JSON.parse(safeStorageGet(CP_COOKIE_ROOT+'catalog.'+hash)||'null');}catch(_){}
 if(!(record?.expires>Date.now())||!Array.isArray(record.value?.list)||record.value.cpTargetDirectory)return null;
 const catalog=JSON.parse(JSON.stringify(record.value));catalog.cpTargetDirectory={completeShare:true,expires:Date.now()+14400000};return catalog;
}
function cpTargetCandidateIndex(key){
 const current=cpRead(key);if(current?.expires>Date.now())return current;
 const previous=key.replace(/^candidate-index-(?:coverage|target)-v1:/,'candidate-index-v2:'),legacy=cpRead(previous);
 if(!(legacy?.expires>Date.now())||!legacy.complete||!Array.isArray(legacy.descriptors)||!legacy.catalogs||Object.values(legacy.catalogs).some(record=>record.catalog?.cpTargetDirectory))return null;
 legacy.expires=Math.min(legacy.expires,Date.now()+14400000);for(const record of Object.values(legacy.catalogs))record.expires=Math.min(record.expires,legacy.expires);
 cpWrite(previous,legacy);return legacy;
}

// Only persisted clones pass here. Fresh 123 URLs remain available for the
// current operation, while every stored directory must refresh signed URLs.
function cpTargetStripUrls(catalog){
 for(const video of catalog.list||[])delete video.downloadUrl;
 for(const directory of catalog.cpTargetDirectory?.directories||[])for(const video of directory.list||[])delete video.downloadUrl;
}

// Cross-season cards are a bounded last resort. The original request identity
// and native file predicates remain authoritative throughout catalog/playback.
function cpCoverageParams(params){
 const verified=cpB14VerifiedSiteIdentity(params);
 return {...params,...(verified?{year:verified.year}:{}),alternativeTitles:[...new Set(cpB12LocalTitles(params).concat(verified?.titles||[]))]};
}
function cpCoverageEligible(params){return !!cpTargetScope(params)&&!cpRequestedYear(params).conflict;}
function cpCoverageCard(title,params){
 if(!cpCoverageEligible(params)||!cpSearchResultMatches(title,params))return false;
 const labels=String(title||'').match(/第\s*[一二三四五六七八九十百\d]+\s*季|(?:^|[^a-z0-9])Season[ ._-]*\d+(?=$|[^a-z0-9])|S\d{1,2}[ ._-]*E\d+|(?:^|[^a-z0-9])S\d{1,2}(?=$|[^a-z0-9])/gi)||[];
 const seasons=labels.map(cpExplicitSeason);
 if(!seasons.length||seasons.some(n=>!Number.isInteger(n)||n<1||n!==seasons[0])||seasons[0]===Number(params.season||1))return false;
 let clean=String(title);for(const label of labels)clean=clean.replace(label,' ');
 return !!clean.trim()&&cpSearchResultMatches(clean,params);
}
function cpCoverageKey(params,share){
 return 'season-coverage-v1:'+baiduSha1(JSON.stringify([getSite(),cpActiveProfile||cpProfile,share.provider,share.shareId,baiduSha1(share.passcode||''),cpIsNewPan(share.provider)?cpNewPanIdentity(share.provider):'',params.tmdbId||params.tmdbID||'',cpRequestedYear(params),cpRelevanceTitles(params).map(cpTitleKey).sort()]));
}
function cpCoverageEvidence(params,share){
 const value=cpRead(cpCoverageKey(params,share));
 return value&&value.expires>Date.now()&&Array.isArray(value.seasons)&&Array.isArray(value.confirmed)?value:null;
}
function cpCoverageRank(params,share){
 const value=cpCoverageEvidence(params,share);if(!value)return 0;
 return value.confirmed.includes(Number(params.season||1)+':'+Number(params.episode))?2:value.seasons.includes(Number(params.season||1))?1:0;
}
let cpCoverageEpoch=0;
function cpCoverageClear(){cpCoverageEpoch++;for(const key of cpRead('season-coverage-keys')||[])cpWrite(key,null);cpWrite('season-coverage-keys',[]);}
function cpCoverageName(item){return item.file_name||item.server_filename||item.n||item.FileName||item.name||item.fileName||item.caName||item.catalogName||item.coName||'';}
function cpCoverageItemKey(item){return String(item.fid??item.fs_id??item.fsid??item.FileId??item.coID??item.id??item.path??'');}
function cpCoverageNodeKey(node){return String(node?.id??node);}
function cpCoverageScope(scope,probe){
 if(!scope)return scope;
 return {...scope,cpCoverageProbe:!!probe,cpCoverageEpoch,cpCoverageBudget:{pages:0,directories:0},cpCoverageSeasons:new Set(),cpCoverageParents:new Map(),cpCoveragePaths:new Map()};
}
function cpCoverageRegister(scope,share){
 if(!scope?.cpCoverageProbe||!cpReadOperation)return;
 const budgets=cpReadOperation.coverageBudgets||(cpReadOperation.coverageBudgets=new Map()),key=cpB6CatalogKey(share);
 if(budgets.has(key))scope.cpCoverageBudget=budgets.get(key);else budgets.set(key,scope.cpCoverageBudget);
}
function cpCoverageEnsure(params,share,titles){if(share.cpCoverageFallback)cpCoverageRegister(cpTargetScope(params,titles,true),share);}
function cpCoverageFor(provider,video){
 const budget=cpReadOperation?.coverageBudgets?.get(cpB6CatalogKey({provider,shareId:video.shareId,passcode:video.passcode}));
 return budget?{cpCoverageProbe:true,cpCoverageBudget:budget}:null;
}
function cpCoveragePage(scope){
 if(!scope?.cpCoverageProbe)return;
 cpCheck(cpActiveProfile||cpProfile);
 if(scope.cpCoverageBudget.pages>=8)throw cpError('COVERAGE_BUDGET');scope.cpCoverageBudget.pages++;
}
function cpCoverageDirectory(scope){
 if(scope.cpCoverageProbe&&scope.cpCoverageBudget.directories>=4)throw cpError('COVERAGE_BUDGET');scope.cpCoverageBudget.directories++;
}
function cpCoveragePath(scope,node,path){return path||(scope.cpCoverageProbe?scope.cpCoveragePaths.get(cpCoverageNodeKey(node)):'')||'';}
function cpCoverageChild(scope,node,item,next,path){
 const season=cpTargetFolderSeason(item);if(season)scope.cpCoverageSeasons.add(season);
 const label=String(cpCoverageName(item)).replace(/((?:^|[^a-z0-9])(?:season|s))\s+(?=\d)/gi,'$1');
 scope.cpCoveragePaths.set(cpCoverageNodeKey(next),[path||scope.cpCoveragePaths.get(cpCoverageNodeKey(node)),label].filter(Boolean).join('/'));
 return next;
}
function cpCoverageNormalize(value){return String(value||'').replace(/((?:^|[^a-z0-9])(?:season|s))\s+(?=\d)/gi,'$1');}
function cpCoverageFileMatches(file,params,titles){
 const video={...file,file_name:cpCoverageNormalize(file.file_name),parentPath:cpCoverageNormalize(file.parentPath||file.parent_path)};
 const labels=(video.file_name+'/'+video.parentPath).match(/第\s*[一二三四五六七八九十百\d]+\s*季|(?:^|[^a-z0-9])Season[ ._-]*\d+(?=$|[^a-z0-9])|S\d{1,2}[ ._-]*E\d+|(?:^|[^a-z0-9])S\d{1,2}(?=$|[^a-z0-9])/gi)||[];
 return labels.length>0&&labels.every(label=>cpExplicitSeason(label)===Number(params.season||1))&&cpEpisodeVideoMatches(video,params,titles);
}
function cpCoverageRemember(scope,share,catalog){
 if(!scope||!catalog?.list)return;
 const files=catalog.list.map(file=>({...file,parentPath:cpCoverageNormalize(file.parentPath||scope.cpCoverageParents.get(String(file.fid)))}));
 catalog.list=scope.cpCoverageProbe?files.filter(file=>cpCoverageFileMatches(file,scope.params,scope.titles)):files;
 const confirmed=files.some(file=>cpCoverageFileMatches(file,scope.params,scope.titles));
 const key=cpCoverageKey(scope.params,share),previous=cpCoverageEvidence(scope.params,share);
 const value={expires:previous?.expires||Date.now()+14400000,seasons:[...new Set([...(previous?.seasons||[]),...scope.cpCoverageSeasons])].slice(0,100),confirmed:[...new Set([...(previous?.confirmed||[]),...(confirmed?[scope.params.season+':'+scope.params.episode]:[])])].slice(-100)};
 cpCheck(cpActiveProfile||cpProfile);if(scope.cpCoverageEpoch!==cpCoverageEpoch)return;cpWrite(key,value);
 let keys=(cpRead('season-coverage-keys')||[]).filter(k=>k!==key);keys.push(key);while(keys.length>64)cpWrite(keys.shift(),null);cpWrite('season-coverage-keys',keys);
}
function cpCoverageKeep(params,share){return !share.cpCoverageFallback||cpCoverageRank(params,share)===2;}
async function cpCoverageCandidates(rows,params,read,claimed,onReady){
 const matching=cpCoverageParams(params);if(!cpCoverageEligible(matching))return [];
 const seen=new Set(),cards=new Map();
 for(const row of rows||[]){
  if(seen.has(row.link)||!cpCoverageCard(row.title,matching))continue;seen.add(row.link);
  const key=row.cpSiteCardId||row.link;if(!cards.has(key))cards.set(key,[]);cards.get(key).push(row);
 }
 const candidates=[],providers=new Set();
 const accept=(info,grouped=false)=>{
  for(const share of info?.shares||[]){
   const enabled=typeof cpCandidateEnabled==='function'?cpCandidateEnabled:quanpanProviderEnabled;
   if(!share.shareId||!enabled(share.provider)||cpBlockedProviders.has(share.provider)||claimed(share)||grouped&&providers.has(share.provider))continue;
   if(grouped)providers.add(share.provider);const candidate={...info,shares:[{...share,cpCoverageFallback:true}],cpB7MatchTitles:cpRelevanceTitles(matching)};candidates.push(candidate);if(grouped&&onReady)onReady(candidate);
  }
 };
 for(const group of [...cards.values()].slice(0,3)){
  if(group[0].cpSiteCardId&&typeof readSiteCandidates==='function'){
   await readSiteCandidates(group,{read,ready:info=>accept(info,true),canRead:provider=>!providers.has(provider),check:()=>cpCheck(cpActiveProfile||cpProfile),failed:()=>cpB12DiscoveryFailed()});
  }else{const info=await read(group[0]);cpCheck(cpActiveProfile||cpProfile);accept(info);}
 }
 candidates.sort((a,b)=>cpCoverageRank(cpSiteCandidateParams(params,b),b.shares[0])-cpCoverageRank(cpSiteCandidateParams(params,a),a.shares[0]));
 const emitted=new Set();return candidates.filter(candidate=>{const provider=candidate.shares[0].provider;if(emitted.has(provider))return false;emitted.add(provider);return true;});
}
if(typeof cpClearCandidateCache==='function'){
 const native=cpClearCandidateCache;cpClearCandidateCache=function(...args){cpCoverageClear();return native(...args);};
}
if(typeof clearRexCatalogCache==='function'){
 const native=clearRexCatalogCache;clearRexCatalogCache=async function(...args){cpCoverageClear();return await native(...args);};
}

// Reuse only within one synchronous continuation. Never memoize mutable
// transfer/auth outcomes here; each network boundary checks fresh settings.
let cpColdConfig=null;
function cpColdResetConfig(){cpColdConfig=null;}
function cpColdConfigValue(key,read){
 let snapshot=cpColdConfig;
 if(!snapshot){snapshot=cpColdConfig=new Map();Promise.resolve().then(()=>{if(cpColdConfig===snapshot)cpColdResetConfig();});}
 if(!snapshot.has(key))snapshot.set(key,read());
 return snapshot.get(key);
}
const cpColdReadNative=cpRead,cpColdSharedNative=cpShared,cpColdAccountsNative=cpAccounts,cpColdSetNative=safeStorageSet;
cpRead=function(key){return /^(?:local:|setting:)/.test(key)?cpColdConfigValue('read:'+key,()=>cpColdReadNative(key)):cpColdReadNative(key);};
cpShared=function(){return cpColdConfigValue('shared',cpColdSharedNative);};
cpAccounts=function(){return cpColdConfigValue('accounts',cpColdAccountsNative).slice();};
safeStorageSet=function(...args){cpColdResetConfig();return cpColdSetNative(...args);};
const cpColdRequestNative=cpResourceRequest,cpColdHttpNative=cpResourceHttp;
cpResourceRequest=function(...args){cpColdResetConfig();return cpColdRequestNative(...args);};
cpResourceHttp=function(...args){return cpColdHttpNative(...args).finally(cpColdResetConfig);};
function cpColdMatchParams(params,titles){
 return Object.assign({},params,{alternativeTitles:[...new Set(cpRelevanceTitles(params).concat(titles||[]))]});
}

const CP_COLD_ACCESS_TTL=60000;
function cpColdAccessEpoch(){return cpRead('cold-share-access-epoch')||'';}
function cpColdBumpAccessEpoch(){cpWrite('cold-share-access-epoch',String(Date.now())+':'+String(Math.random()));}
function cpColdClearOperationAccess(){
 if(cpReadOperation)for(const key of cpReadOperation.keys())try{const parts=JSON.parse(key);if(['quark','uc'].includes(parts[1])&&parts[4]==='token')cpReadOperation.delete(key);}catch(_){}
}
function cpColdAccessKey(provider,shareId,passcode){
 return 'cold-share-access-v1:'+baiduSha1(JSON.stringify([cpActiveProfile||cpProfile,provider,String(shareId||''),String(passcode||'')]));
}
function cpColdAccessRecord(key){
 const record=cpRead(key),now=Date.now();
 return record&&record.at<=now&&record.expires>now&&record.expires-record.at===CP_COLD_ACCESS_TTL&&typeof record.value==='string'&&record.value.length>0&&record.value.length<=8192&&!/[\x00-\x1f\x7f]/.test(record.value)?record:null;
}
async function cpColdAccess(provider,shareId,passcode,work){
 const profile=cpActiveProfile||cpProfile;cpCheck(profile);
 const generation=cpColdAccessEpoch();
 if(cpReadOperation&&cpReadOperation.coldAccessEpoch!==generation){cpColdClearOperationAccess();cpReadOperation.coldAccessEpoch=generation;}
 const key=cpColdAccessKey(provider,shareId,passcode),cached=cpColdAccessRecord(key);
 if(cached)return cached.value;
 const value=await work();cpCheck(profile);
 if(generation===cpColdAccessEpoch()&&typeof value==='string'&&value.length>0&&value.length<=8192&&!/[\x00-\x1f\x7f]/.test(value)){
  const at=Date.now();cpWrite(key,{provider,shareId:String(shareId),at,expires:at+CP_COLD_ACCESS_TTL,value});
  const keys=(cpRead('cold-share-access-keys')||[]).filter(k=>k!==key);keys.push(key);
  while(keys.length>64)cpWrite(keys.shift(),null);cpWrite('cold-share-access-keys',keys);
 }
 return value;
}
const cpColdStokenNative=getStoken,cpColdUcTokenNative=getUcToken,cpColdInvalidateNative=cpReadInvalidate;
getStoken=function(shareId,passcode){return cpColdAccess('quark',shareId,passcode,()=>cpColdStokenNative(shareId,passcode));};
getUcToken=function(shareId,passcode){return cpColdAccess('uc',shareId,passcode,()=>cpColdUcTokenNative(shareId,passcode));};
cpReadInvalidate=function(provider,shareId,passcode,label){
 if(label==='token'&&['quark','uc'].includes(provider)){cpColdBumpAccessEpoch();cpWrite(cpColdAccessKey(provider,shareId,passcode),null);}
 return cpColdInvalidateNative(provider,shareId,passcode,label);
};
function cpColdClearAccess(){
 cpColdBumpAccessEpoch();
 for(const key of cpRead('cold-share-access-keys')||[])cpWrite(key,null);cpWrite('cold-share-access-keys',[]);
 cpColdClearOperationAccess();
}
for(const name of ['clearRexCatalogCache','clearHuajuanCache']){
 const native=name==='clearRexCatalogCache'?typeof clearRexCatalogCache==='function'&&clearRexCatalogCache:typeof clearHuajuanCache==='function'&&clearHuajuanCache;
 if(!native)continue;
 const clear=async function(...args){cpColdClearAccess();return native(...args);};
 if(name==='clearRexCatalogCache')clearRexCatalogCache=clear;else clearHuajuanCache=clear;
}
const cpColdTargetReadNative=cpTargetRead;
cpTargetRead=function(params,share,titles,refresh=false){
 if((refresh||params?.refresh||params?.forceRefresh)&&['quark','uc'].includes(share.provider))cpReadInvalidate(share.provider,share.shareId,share.passcode,'token');
 return cpColdTargetReadNative(params,share,titles,refresh);
};
async function cpColdAccessCatalog(provider,shareId,passcode,read){
 const cached=cpColdAccessRecord(cpColdAccessKey(provider,shareId,passcode));
 try{return await read();}catch(error){
  const retry=cached&&(error?.code==='AUTH_FAILED'||error?.code==='UPSTREAM_ERROR'&&!error?.status||Number(error?.status)===401||/目录读取失败|分享请求失败/.test(String(error?.message||'')));
  if(!retry||['ABORTED','ACCOUNT_CHANGED','OPERATION_TIMEOUT','RATE_LIMITED','SHARE_EXPIRED','BETA_READ_UNUSED'].includes(error?.code)||Number(error?.status)===429)throw error;
  cpReadInvalidate(provider,shareId,passcode,'token');return read();
 }
}
const cpColdUcCatalogNative=getUcVideos,cpColdQuarkCatalogNative=getVideosFromShareLink;
getUcVideos=function(share,...args){return cpColdAccessCatalog('uc',share.shareId,share.passcode,()=>cpColdUcCatalogNative(share,...args));};
getVideosFromShareLink=function(url,passcode,...args){
 const id=String(url||'').match(/\/s\/([a-zA-Z0-9]+)/)?.[1];
 return id?cpColdAccessCatalog('quark',id,passcode,()=>cpColdQuarkCatalogNative(url,passcode,...args)):cpColdQuarkCatalogNative(url,passcode,...args);
};

// Link checking and native access are independent reads. Stage raw bytes only;
// the existing foreground decoder owns cookies, validation and cache admission.
function cpColdStageKey(url,body,options){
 const headers=Object.entries(options?.headers||{}).map(([k,v])=>[k.toLowerCase(),v]).sort((a,b)=>a[0].localeCompare(b[0]));
 return JSON.stringify([url,body,headers]);
}
function cpColdAccessSpec(share){
 if(share.provider==='baidu'){
  if(cpBaiduCached(cpBaiduCacheKey('verify',[String(share.shareId||''),String(share.passcode||'')]),60000))return null;
  return {url:'https://pan.baidu.com/share/verify?'+toQuery({surl:baiduShortId(share.shareId),pwd:share.passcode||''}),body:toQuery({pwd:share.passcode||'',vcode:'',vcode_str:''}),options:{timeout:8000,headers:Object.assign(baiduHeaders(share),{'Content-Type':'application/x-www-form-urlencoded'})}};
 }
 if(!['quark','uc'].includes(share.provider)||cpColdAccessRecord(cpColdAccessKey(share.provider,share.shareId,share.passcode)))return null;
 return {url:share.provider==='quark'?'https://drive-h.quark.cn/1/clouddrive/share/sharepage/token?pr=ucpro&fr=pc&uc_param_str=':'https://pc-api.uc.cn/1/clouddrive/share/sharepage/token?pr=UCBrowser&fr=pc',body:JSON.stringify({pwd_id:share.shareId,passcode:share.passcode||''}),options:{timeout:8000,headers:Object.assign({},share.provider==='quark'?quarkHeaders():ucHeaders(),{'Content-Type':'application/json'})}};
}
const cpColdPostNative=cpHttpPost;
function cpColdStartAccess(share){
 const operation=cpReadOperation,profile=cpActiveProfile||cpProfile;
 if(!operation||!['baidu','quark','uc'].includes(share.provider)||!cpDriveEnabled(share.provider)||cpBlockedProviders.has(share.provider))return null;
 let spec;try{spec=cpColdAccessSpec(share);}catch(_){return null;}
 if(!spec)return null;
 const stages=operation.coldAccessStages||(operation.coldAccessStages=new Map()),key=cpColdStageKey(spec.url,spec.body,spec.options);
 if(stages.has(key))return null;
 const entry={token:cpB6Token(),profile,provider:share.provider,epoch:cpColdAccessEpoch(),used:false};stages.set(key,entry);
 entry.task=Promise.resolve().then(()=>{
  cpCheck(profile);if(entry.token.cancelled)throw cpB6Unused();
  if(share.provider==='quark')entry.cookieAtDispatch=ensureCookie();
  return cpColdPostNative(spec.url,spec.body,Object.assign({},spec.options,{cpB6Token:entry.token}));
 }).then(value=>({value}),error=>({error}));
 return entry;
}
cpHttpPost=function(url,body,options,beforeDispatch){
 const entry=!beforeDispatch&&!options?.cpB6Token&&cpReadOperation?.coldAccessStages?.get(cpColdStageKey(url,body,options));
 if(!entry||entry.token.cancelled)return cpColdPostNative(url,body,options,beforeDispatch);
 cpReadOperation.coldAccessStages.delete(cpColdStageKey(url,body,options));
 if(entry.epoch!==cpColdAccessEpoch()){entry.token.cancel();entry.task=null;return cpColdPostNative(url,body,options,beforeDispatch);}
 entry.used=true;
 if(!entry.response)entry.response=entry.task.then(outcome=>{
  cpCheck(entry.profile);
  if(entry.epoch!==cpColdAccessEpoch())return cpColdPostNative(url,body,options,beforeDispatch);
  if(!outcome.error){
   if(entry.provider==='quark'&&entry.cookieAtDispatch!==undefined&&ensureCookie()!==entry.cookieAtDispatch){
    const headers={};for(const key of Object.keys(outcome.value.headers||{}))if(key.toLowerCase()!=='set-cookie')headers[key]=outcome.value.headers[key];
    return Object.assign({},outcome.value,{headers});
   }
   return outcome.value;
  }
  if(['AUTH_FAILED','RATE_LIMITED','ABORTED','ACCOUNT_CHANGED','OPERATION_TIMEOUT','BETA_READ_UNUSED'].includes(outcome.error?.code)||[401,429].includes(Number(outcome.error?.status)))throw outcome.error;
  return cpColdPostNative(url,body,options,beforeDispatch);
 }).finally(()=>{entry.task=null;entry.response=null;});
 return entry.response;
};
const cpColdCheckedNative=cpB8CheckedCatalog;
cpB8CheckedCatalog=async function(share,cached,site,keyword,params,titles=[]){
 const usable=cpTargetCached(cached,params,titles);
 const entry=!usable?cpColdStartAccess(share):null;
 try{return await cpColdCheckedNative(share,cached,site,keyword,params,titles);}
 finally{if(entry){entry.token.cancel();if(cpReadOperation?.coldAccessStages)for(const [key,value] of cpReadOperation.coldAccessStages)if(value===entry)cpReadOperation.coldAccessStages.delete(key);entry.task=null;}}
};

// These caches supplement the native protocol. Every cached value remains
// tied to its original origin, profile, fixed lifetime and invalidation epoch.
const CP_QP_FAST_AUTH_MAX=900000,CP_QP_FAST_CHECK_TTL=60000;
let cpQpFastObserved='';
function cpQpFastEpoch(){return cpRead('qp-fast-epoch')||'';}
function cpQpFastProfile(){return cpActiveProfile||cpProfile;}
function cpQpFastObserve(){
 const epoch=cpQpFastEpoch(),identity=JSON.stringify([epoch,cpQpFastProfile()]);
 if(cpQpFastObserved!==identity){qpTokens.clear();qpLinkChecks.clear();cpQpFastObserved=identity;}
 return epoch;
}
function cpQpFastKey(kind,identity){return 'qp-fast-'+kind+'-v1:'+baiduSha1(JSON.stringify([cpQpFastProfile(),identity]));}
function cpQpFastRecord(kind,key){
 const value=cpRead(key),now=Date.now();
 if(!value||value.epoch!==cpQpFastEpoch()||!Number.isFinite(value.at)||!Number.isFinite(value.expires)||value.at>now||value.expires<=now)return null;
 const ttl=value.expires-value.at;
 if(kind==='auth')return ttl>0&&ttl<=CP_QP_FAST_AUTH_MAX&&typeof value.token==='string'&&value.token.length>0&&value.token.length<=8192&&!/[\x00-\x20\x7f]/.test(value.token)?value:null;
 return ttl===CP_QP_FAST_CHECK_TTL&&value.value?.validity==='ok'&&value.value.until===value.expires&&typeof value.value.summary==='string'&&value.value.summary.length<=2000&&typeof value.value.passcode==='string'&&value.value.passcode.length<=128&&!/[\x00-\x1f\x7f]/.test(value.value.passcode)?value:null;
}
function cpQpFastSave(kind,key,record){
 cpWrite(key,record);const index='qp-fast-'+kind+'-keys',stored=cpRead(index),keys=(Array.isArray(stored)?stored:[]).filter(k=>typeof k==='string'&&k!==key);keys.push(key);
 while(keys.length>(kind==='auth'?16:256))cpWrite(keys.shift(),null);cpWrite(index,keys);
}
function cpQpFastInvalidate(){
 cpWrite('qp-fast-epoch',String(Date.now())+':'+String(Math.random()));
 for(const kind of ['auth','check']){const index='qp-fast-'+kind+'-keys',keys=cpRead(index);for(const key of Array.isArray(keys)?keys:[])if(typeof key==='string'&&key.startsWith('qp-fast-'+kind+'-v1:'))cpWrite(key,null);cpWrite(index,[]);}
 cpQpFastObserve();
}
const cpQpFastTokenNative=qpGetToken;
qpGetToken=async function(site,force=false){
 const profile=cpQpFastProfile();cpCheck(profile);
 // Preserve native denial/rate-limit suppression even on a persisted hit.
 const denied=qpOperation?.tokenFailures?.get(site);if(denied)throw denied;
 if(force)cpQpFastInvalidate();
 const epoch=cpQpFastObserve(),key=cpQpFastKey('auth',site),cached=!force&&cpQpFastRecord('auth',key);
 if(cached){qpTokens.set(site,{token:cached.token,refreshAt:cached.expires,cpFastAt:cached.at});return cached.token;}
 const token=await cpQpFastTokenNative(site,force);cpCheck(profile);
 const native=qpTokens.get(site),now=Date.now();
 if(epoch===cpQpFastEpoch()&&native?.token===token){
  if(native.cpFastAt===undefined)native.cpFastAt=now;
  const expires=Math.min(native.refreshAt,native.cpFastAt+CP_QP_FAST_AUTH_MAX),record={epoch,at:native.cpFastAt,expires,token};
  native.refreshAt=expires;
  if(expires>now&&typeof token==='string'&&token.length<=8192&&!/[\x00-\x20\x7f]/.test(token))cpQpFastSave('auth',key,record);
 }
 return token;
};
const cpQpFastCheckKeyNative=qpCheckKey,cpQpFastCheckedNative=qpCheckedShare;
// Native pending checks and completed status memos use the same epoch/profile
// fence, so their late cleanup can never erase a newer generation's pending key.
qpCheckKey=function(share,site){return JSON.stringify([cpQpFastProfile(),cpQpFastEpoch(),cpQpFastCheckKeyNative(share,site)]);};
qpCheckedShare=async function(share,site,keyword){
 const profile=cpQpFastProfile();cpCheck(profile);const epoch=cpQpFastObserve(),key=cpQpFastKey('check',cpQpFastCheckKeyNative(share,site)),cached=cpQpFastRecord('check',key);
 if(cached)return Object.assign({},cached.value);
 const value=await cpQpFastCheckedNative(share,site,keyword);cpCheck(profile);
 if(epoch===cpQpFastEpoch()&&value.validity==='ok'){
  const record={epoch,at:value.until-CP_QP_FAST_CHECK_TTL,expires:value.until,value:Object.assign({},value)};
  if(record.expires>Date.now()&&typeof value.summary==='string'&&value.summary.length<=2000&&typeof value.passcode==='string'&&value.passcode.length<=128&&!/[\x00-\x1f\x7f]/.test(value.passcode))cpQpFastSave('check',key,record);
 }
 return value;
};
const cpQpFastClearNative=clearRexCatalogCache;
clearRexCatalogCache=async function(...args){cpQpFastInvalidate();return cpQpFastClearNative(...args);};
const cpQpFastLoadNative=loadResource;
loadResource=function(params={}){if(params.refresh||params.forceRefresh)cpQpFastInvalidate();return cpQpFastLoadNative(params);};

async function readSiteCandidates(rows,{read,ready,canRead,check,failed}){
 const groups=new Map();let fatal=null;
 for(const row of rows){if(!groups.has(row.provider))groups.set(row.provider,[]);groups.get(row.provider).push(row);}
 const results=await Promise.allSettled(Array.from(groups,async([provider,entries])=>{
  for(const row of entries){
   if(fatal||!canRead(provider))break;
   try{check();const info=await read(row);check();if(fatal)break;if(info)await ready(info);}
   catch(error){
    if(['ABORTED','OPERATION_TIMEOUT','ACCOUNT_CHANGED','LOGIN_REQUIRED','RATE_LIMITED','INVALID_CONFIG','ACCESS_DENIED','SESSION_UNAVAILABLE'].includes(error?.code)){fatal??=error;throw error;}
    if(error?.code!=='INVALID_SHARE')failed(error);
   }
  }
 }));
 if(fatal)throw fatal;
 const failure=results.find(result=>result.status==='rejected');if(failure)throw failure.reason;
}
async function cpSiteReadCandidate(row,params){
 const candidate=await params.cpSiteRead(row,params);if(!candidate)return candidate;
 const target=Number(params.season||1),record=cpB12IdentityRecord(params);
 const year=candidate.verifiedSeason===target?candidate.verifiedYear:record?.seasonYear;
 return Object.assign({},candidate,{verifiedTargetYear:Number.isInteger(year)&&year>=1800&&year<=2200?year:null,verifiedYears:cpSiteYears(params)});
}
function cpSiteYears(params){
 if(params.type==='movie')return [];
 const record=cpB12IdentityRecord(params);return record?[...new Set([record.seriesYear,record.seasonYear].filter(y=>Number.isInteger(y)&&y>=1800&&y<=2200))]:[];
}
async function cpSiteYearMatches(year,params){
 const requested=cpRequestedYear(params);if(requested.conflict)return false;
 if(!requested.year||year===requested.year)return true;
 if(params.type==='movie')return false;
 await cpB7TrustedTitles(params);return cpSiteYears(params).includes(year);
}
function cpSiteMatchingParams(value,params){
 const allowed=params.cpSiteVerifiedYears||cpSiteYears(params);if(!allowed.length)return params;
 const evidence=cpWithoutKnownTitles(value,cpRelevanceTitles(params)),years=[...evidence.matchAll(/(?:^|[^a-z0-9])((?:19|20)\d{2})(?=$|[^a-z0-9])/gi)].map(m=>Number(m[1]));
 if(!years.length||years.some(year=>!allowed.includes(year)))return params;
 return cpResourceForwardParams(params,{year:years[0],releaseYear:undefined,seriesName:cpMovieName(params.seriesName||params.title||params.name||params.keyword).name});
}
const cpSiteNativeTitleMatch=cpSearchTitleMatches;
cpSearchTitleMatches=function(value,params){return cpSiteNativeTitleMatch(value,typeof params.cpSiteRead==='function'?cpSiteMatchingParams(value,params):params);};
function cpSiteCandidateParams(params,candidate){
 if(typeof params.cpSiteRead!=='function')return params;
 const extra={cpSiteVerifiedYears:candidate.verifiedYears||[]};
 if(!cpRequestedYear(params).year&&Number.isInteger(candidate.verifiedTargetYear))extra.year=candidate.verifiedTargetYear;
 return cpResourceForwardParams(params,extra);
}

function cpNormalizeEpisodeLabel(name){
 let value=String(name||"").normalize("NFKC").replace(/[\u200b-\u200f\u202a-\u202e\ufeff]/g,"");
 const original=value;
 // Erase only understood presentation fields before a numeric label. Unknown
 // bracketed words may be another work's title and remain identity evidence.
 for(let i=0;i<8;i++){
  const prefix=/^\s*(?:\[([^\]]+)\]|【([^】]+)】|\(([^)]+)\))\s*/.exec(value);
  if(!prefix||typeof cpFileMetadata!=="function"||cpFileKey(cpFileMetadata(prefix[1]||prefix[2]||prefix[3])))break;
  value=value.slice(prefix[0].length);
 }
 // Removing a decoration must not turn an ambiguous numeric range/list into
 // the native parser's otherwise valid leading number.
 if(value!==original&&/^\s*\d/.test(value)){
  const numeric=cpFileMetadata(value.replace(/\.[a-z0-9]{2,5}$/i,""));
  if(!/^[\p{P}\p{S}\s]*\d{1,3}[\p{P}\p{S}\s]*$/u.test(numeric))return original;
 }
 const bracket=/^\s*(?:\[\s*(\d{1,3})\s*\]|【\s*(\d{1,3})\s*】|\(\s*(\d{1,3})\s*\))(?=$|[ ._-])/.exec(value);
 if(bracket){
  const tail=value.slice(bracket[0].length).replace(/\.[a-z0-9]{2,5}$/i,"");
  if(typeof cpFileMetadata!=="function"||cpFileKey(cpFileMetadata(tail)))return original;
  value="E"+(bracket[1]||bracket[2]||bracket[3])+value.slice(bracket[0].length);
 }
 return value.replace(/^(\s*\d{1,3})[~～](?=(?:[248]K|\d{3,4}P)(?:[ ._~-]|$))/i,"$1-");
}

function cpSortDisplayedResources(rows){
 if(!Array.isArray(rows))return rows;
 const size=row=>{const m=/^\s*\[(\d+(?:\.\d+)?)\s*(GB|MB)\]/i.exec(String(row?.name||''));const n=m?Number(m[1])*(m[2].toUpperCase()==='GB'?1024:1):-1;return Number.isFinite(n)?n:-1;};
 return rows.map((row,index)=>({row,index,size:size(row)})).sort((a,b)=>b.size-a.size||a.index-b.index).map(item=>item.row);
}

const cpSearchIndexNative=qpSeriesIndexRead;
qpSeriesIndexRead=function(key){
 const current=cpSearchIndexNative(key);if(current.candidates.length)return current;
 const previous=key.replace(QP_INDEX_PREFIX+'search-v2:',QP_INDEX_PREFIX+'coverage-v1:');
 if(previous===key)return current;
 const legacy=cpSearchIndexNative(previous);
 return legacy.candidates.length?Object.assign({},legacy,{candidates:[]}):current;
};

// Search cards are discovery hints. Catalog and file predicates retain their
// own season, episode and identity checks after this inexpensive admission step.
function cpSearchResultKey(value){
 return String(value||'').replace(/[\s·:：._\-()[\]（）【】《》〈〉「」『』\u200b-\u200f\u202a-\u202e\ufeff]/g,'').toLowerCase();
}
function cpSearchResultMatches(value,params){
 const requested=cpRequestedYear(params);if(requested.conflict)return false;
 const raw=String(value||''),key=cpSearchResultKey(raw);
 const titles=cpRelevanceTitles(params).map(title=>{
  const name=cpMovieName(title,requested.year).name.replace(/\s*(?:第\s*[一二三四五六七八九十百\d]+\s*季|Season[ ._-]*\d+|(?:^|[ ._-])S\d{1,2})\s*$/i,'');
  return cpMovieName(name,requested.year).name;
 }).filter(Boolean);
 if(!key||!titles.some(title=>{const name=cpSearchResultKey(title);return name&&key.includes(name);}))return false;
 if(!requested.year)return true;
 let identity=null;
 // Numeric names such as 1984 are identity evidence, not release years.
 for(const title of titles){
  const name=cpSearchResultKey(title);if(!name)continue;
  const numeric=/^\d+$/.test(name);
  // Use the same optional separators as containment, including a number
  // joined to the host name but separated on the site (银翼杀手 2049).
  const pattern=Array.from(name,character=>character.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('[\\s·:：._\\-()[\\]（）【】《》〈〉「」『』\\u200b-\\u200f\\u202a-\\u202e\\ufeff]*');
  const match=new RegExp((numeric?'(^|[^0-9])':'')+pattern+(numeric?'(?![0-9])':''),'i').exec(raw);
  if(match&&(!identity||match.index<identity.index||match.index===identity.index&&match[0].length>identity[0].length))identity=match;
 }
 // Mask one actual name occurrence, preserving separate release-year labels.
 let evidence=identity?raw.slice(0,identity.index)+' '+raw.slice(identity.index+identity[0].length):raw;
 // Explicit pixel dimensions and scan labels cannot supply a release year.
 evidence=evidence.replace(/\d{3,5}\s*[x×*]\s*\d{3,5}|(?:^|[^0-9])\d{3,4}\s*[pi](?=$|[^a-z])/gi,' ');
 const years=Array.from(evidence.matchAll(/(?:^|[^0-9])([0-9]{4})(?![0-9])/g),match=>Number(match[1])).filter(year=>year>=1970);
 return !years.length||years.includes(requested.year);
}

// Pure catalog matching: normalize presentation, retain identity-bearing text,
// and report why a file was selected. No provider calls or directory traversal.
function cpFileText(value){return String(value||'').normalize('NFKC').replace(/[\u200b-\u200f\u202a-\u202e\ufeff]/g,'');}
function cpFileKey(value){return cpFileText(value).replace(/[\p{P}\p{S}\s]/gu,'').toLowerCase();}
function cpFileTitlePattern(title){
 return Array.from(cpFileKey(title),c=>c.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('[\\p{P}\\p{S}\\s]*');
}
function cpFileTechnicalLabel(value){
 // Read compact quality/audio labels as complete known fields. Unmarked
 // unknown suffixes may be another work, so never erase them as publishers.
 const cores=[String(value||'')];
 for(const core of cores){
  let key=cpFileKey(core),count=0,resolution=false;
  while(key){
   const atom=/^(?:\d{3,4}[pi]|[248]k|webdl|webrip|bluray|remux|hdtv|uhd|fhd|hq|hdr10|hdr|sdr|dv|dolbyvision|[xh]26[45]|hevc|avc|av1|(?:aac|ddp?|dtshd|dts|truehd|eac3|ac3)(?:[257]1|20)?|hifi|flac|atmos|无损声|无损音轨|高码率|高码|\d{2,3}fps)/i.exec(key);
   if(!atom)break;
   resolution=resolution||/^(?:\d{3,4}[pi]|[248]k)$/i.test(atom[0]);count++;key=key.slice(atom[0].length);
  }
  if(!key&&resolution&&count>=2)return true;
 }
 return false;
}
function cpFileMetadata(value){
 if(cpFileTechnicalLabel(value))return ' ';
 return value
  // Release groups follow a technical field, never a bare film name. Keep
  // explicit sequel ordinals even when they occur after an encoding label.
  .replace(/((?:[xh][ ._-]*26[45]|hevc|avc|av1|aac(?:\d(?:\.\d)?)?))[ ._]*-([a-z][a-z0-9]{1,30})$/gi,(all,codec,group)=>/^(?:(?:part|vol|chapter)?(?:[ivx]+|\d+))$/i.test(group)?all:codec)
  .replace(/\d{3,5}\s*[x×*]\s*\d{3,5}|\b\d{3,4}\s*[pi]\b|\b[248]k\b/gi,' ')
  .replace(/\b(?:av3a|aac|ddp?|dts(?:[ ._-]*hd)?|truehd|eac3|ac3)(?:[ ._-]*(?:ma[ ._-]*)?\d(?:\.\d){0,2})?\b/gi,' ')
  .replace(/\b(?:web[ ._-]*dl|web[ ._-]*rip|blu[ ._-]*ray|bd[ ._-]*rip|remux|hdtv|uhd|fhd|hq|hdr(?:10\+?)?|sdr|dv|dolby[ ._-]*vision|[xh][ ._-]*26[45]|hevc|avc|av1|aac|flac|dts(?:[ ._-]*hd)?|truehd|ddp?|eac3|ac3|atmos|amzn|nf|dsnp|hmax|atvp|dual|multi[ ._-]*audio|proper|repack|internal|extended(?:[ ._-]*cut)?|director['’]?s[ ._-]*cut|unrated|uncut|remastered)\b/gi,' ')
  .replace(/\b\d+(?:\.\d+)?\s*(?:fps|bit|gb|mb)\b|\b[257]\.1\b/gi,' ')
  .replace(/\b(?:hd[ ._-]?)?(?:tc|ts|cam)(?:版)?(?=$|[^a-z0-9])/gi,' ')
  .replace(/(?:更新(?:至|到)?|更至|全)\s*\d+\s*[集话期]|高码率|高码|高清|超清/g,' ')
  .replace(/(?:官方|内封|外挂)?(?:简繁|简体|繁体|中英|简中|繁中|双语|多语)?(?:中文字幕|英文字幕|字幕|中字|双字)|国粤双语|[中英日韩德法西俄泰粤国]+语|多音轨|加长版|导演剪辑版|未删减版|修复版|完整版|无广分享|推荐|正片|合集|电视剧|剧集|国漫|动漫|电影|更新中|已完结|完结|蓝光|杜比|原盘|真彩|臻彩/g,' ');
}
function cpFileParentEvidence(value,titles){
 let evidence=cpFileTitleEvidence(value,titles);
 // Alphabetic catalog indexes precede Chinese titles; do not erase suffixes.
 if(evidence.matched&&/^[a-z]$/i.test(evidence.residual)&&/^[a-z][ ._-]+(?=\p{Script=Han})/iu.test(cpFileText(value)))evidence=cpFileTitleEvidence(cpFileText(value).replace(/^[a-z][ ._-]+/i,''),titles);
 // Folder roles must be whole labels; a movie called "Video" retains its name.
 if(!evidence.matched&&/^(?:视频|正片|资源|video|videos|media|mp4|mkv|movies|tv)$/i.test(cpFileKey(value)))evidence.residual='';
 return evidence;
}
function cpFileTitleRegex(title){
 const key=cpFileKey(title),left=/^[a-z0-9]/i.test(key)?'(^|[^a-z0-9])':'',right=/[a-z0-9]$/i.test(key)?'(?=$|[^a-z0-9]|S\\d{1,2}[ ._-]*E\\d+)':'';
 return {left,re:new RegExp(left+cpFileTitlePattern(title)+right,'iu')};
}
function cpFileWithoutTitles(value,titles){
 let text=cpFileText(value);
 for(const title of [...titles].filter(Boolean).sort((a,b)=>cpFileKey(b).length-cpFileKey(a).length)){
  const {re,left}=cpFileTitleRegex(cpMovieName(title).name);text=text.replace(re,(_,boundary)=>left?(boundary||'')+' ':' ');
 }
 return text;
}
function cpFileTitleEvidence(value,titles){
 let text=cpFileText(value),matched=false;
 const names=[...new Set(titles.filter(t=>typeof t==='string'&&t.trim()).map(t=>cpMovieName(t).name))].sort((a,b)=>cpFileKey(b).length-cpFileKey(a).length);
 for(const title of names){
  const key=cpFileKey(title);if(!key)continue;
  // Latin words and numeric film names cannot match inside another word/number.
  const {re,left}=cpFileTitleRegex(title),hit=re.exec(text);
  if(!hit)continue;
  // A release-group prefix is presentation only when a real name follows it.
  if(!matched){const start=hit.index+(left?hit[1].length:0);text=text.slice(0,start).replace(/^[\s\p{S}]*(?:(?:\[[^\]]+\]|【[^】]+】)\s*)+/u,'')+text.slice(start);}
  text=text.replace(re,(_,boundary)=>left?(boundary||'')+' ':' ');matched=true;
 }
 const years=Array.from(text.replace(/\d{3,5}\s*[x×*]\s*\d{3,5}|\b\d{3,4}\s*[pi]\b/gi,' ').matchAll(/(?:^|[^0-9])([0-9]{4})(?![0-9])/g),m=>Number(m[1])).filter(y=>y>=1970);
 const residual=cpFileKey(cpFileMetadata(text)
  .replace(/(?:^|[^0-9])[0-9]{4}(?![0-9])/g,m=>Number(m.replace(/\D/g,''))>=1970?' ':m)
  .replace(/S\d{1,2}[ ._-]*E\d+|(?:^|[^a-z0-9])(?:Season|S)[ ._-]*\d+(?=$|[^a-z0-9])|第\s*[一二三四五六七八九十百\d]+\s*季|第\s*\d+\s*[集话期]|(?:^|[^a-z0-9])(?:Episode|EP?)[ ._-]*\d+/gi,' '));
 return {matched,years,residual};
}
// A verified single-work resource can identify numeric episode files. Unknown
// directory spelling is missing evidence, not evidence of another work.
function cpFileResourceContext(params,titles){
 const value=params.cpFileContextTitle||'';
 if(!value||!cpSearchResultMatches(value,Object.assign({},params,{alternativeTitles:titles})))return false;
 // A single-work site card owns the identity. Explicit multi-work collections
 // still need a named branch; arbitrary catalog spelling is never a veto.
 return !/合集/.test(value)||!cpFileTitleEvidence(value,titles).residual;
}
function cpFileCatalogParams(params,files){
 if(params.type==='movie'||cpFileResourceContext(params,cpRelevanceTitles(params))||params.cpFileContextAmbiguous)return params;
 const titles=cpRelevanceTitles(params),branches=new Set();
 for(const file of files){
  const part=String(file.parentPath||file.parent_path||'').split(/[/\\]/).filter(Boolean).find(p=>{const e=cpFileParentEvidence(p,titles);return e.matched||e.residual;});
  if(part)branches.add(cpFileKey(part));
 }
 return branches.size>1?Object.assign({},params,{cpFileContextAmbiguous:true}):params;
}
function cpFileMatchDecision(video,params,titles=cpRelevanceTitles(params)){
 video=cpCandidateEpisodeVideo(video,params,titles);
 const name=cpFileText(video?.file_name).replace(/\.[a-z0-9]{2,5}$/i,''),parent=cpFileText(video?.parentPath||video?.parent_path),requested=cpRequestedYear(params);
 const evidence={fileSeason:cpExplicitSeason(name),parentSeason:cpExplicitSeason(parent.replace(/\bS\s+(\d+)/gi,'S$1')),contextSeason:params.cpFileContextSeason??null};
 const result=(matched,reason)=>({matched,reason,evidence});
 if(requested.conflict)return result(false,'requested-year-conflict');
 if(cpHasExtraMarker({file_name:cpFileWithoutTitles(video?.file_name,titles),parentPath:cpFileWithoutTitles(parent,titles)},[]))return result(false,'extra');
 const verifiedResource=cpFileResourceContext(params,titles);
 if(verifiedResource&&params.type==='movie'){
  if(/S\d+[ ._-]*E\d+|第\s*\d+\s*[集话]/i.test(name))return result(false,'episode-in-movie');
  return result(true,'resource-title');
 }
 const file=verifiedResource?{matched:false,years:[],residual:''}:cpFileTitleEvidence(name,titles);evidence.file=file;
 const parents=verifiedResource?[]:parent.split(/[/\\]/).filter(Boolean).map(p=>cpFileParentEvidence(p,titles));evidence.parents=parents;
 const namedParent=[...parents].reverse().find(p=>p.matched);
 if(namedParent?.residual)return result(false,'parent-identity-conflict');
 for(const title of verifiedResource?[]:titles){
  const key=cpFileKey(cpMovieName(title).name),number=/^(.*?)(\d+)$/.exec(key);
  if(number&&number[1]&&parent.split(/[/\\]/).filter(Boolean).some((p,i)=>{if(parents[i].matched)return false;const other=cpFileKey(cpFileMetadata(p));return other.startsWith(number[1])&&/^\d+$/.test(other.slice(number[1].length))&&other!==key;}))return result(false,'parent-identity-conflict');
 }
 if(params.type==='movie'){
  if(/S\d+[ ._-]*E\d+|第\s*\d+\s*[集话]/i.test(name))return result(false,'episode-in-movie');
  if(file.residual)return result(false,file.matched?'identity-conflict':'unverified-file-title');
  const meaningful=[...parents].reverse().find(p=>p.matched||p.residual);
  if(!file.matched&&meaningful&&!meaningful.matched)return result(false,'parent-identity-conflict');
  const resource=cpFileTitleEvidence(params.cpFileContextTitle||'',titles);evidence.resource=resource;
  const identity=file.matched?file:([...parents].reverse().find(p=>p.matched)||resource);
  if(!identity?.matched||identity.residual)return result(false,'missing-title-evidence');
  if(requested.year&&[...file.years,...identity.years].some(y=>y!==requested.year))return result(false,'year-conflict');
  return result(true,file.matched?'file-title':identity===resource?'resource-title':'parent-title');
 }
 const episode=Number(params.episode),season=Number(params.season||1);
 if(!Number.isFinite(episode)||episode<=0)return result(true,'episode-not-requested');
 if(evidence.fileSeason!==null&&evidence.parentSeason!==null&&evidence.fileSeason!==evidence.parentSeason)return result(false,'season-conflict');
 if(evidence.contextSeason!==null&&evidence.contextSeason!==season)return result(false,'season-conflict');
 if((evidence.fileSeason??evidence.parentSeason??evidence.contextSeason??1)!==season)return result(false,'season-conflict');
 // A combined episode file has no reliable start offset for the requested card.
 if(/(?:S\d+[ ._-]*E|\bE|第)\d+\s*[-~～]\s*(?:S\d+E|E)?\d+/i.test(name))return result(false,'ambiguous-episode-range');
 const markers=Array.from(name.matchAll(/S(\d{1,2})[ ._-]*E(\d+)|第\s*(\d+)\s*[集话期]|(?:^|[^a-z0-9])(?:Episode|EP?)[ ._-]*(\d+)/gi));
 if(markers.some(m=>m[1]&&Number(m[1])!==season))return result(false,'season-conflict');
 if(markers.some(m=>Number(m[2]||m[3]||m[4])!==episode))return result(false,'episode-conflict');
 const id=episodeIdentity(cpFileText(video?.file_name));evidence.episode=id.episode;
 if(id.episode!==episode)return result(false,'episode-conflict');
 // Empty titles are the existing cheap plausibility probe before alias lookup.
 if(!titles.length)return result(true,'episode-probe');
 if(verifiedResource)return result(true,'resource-title-and-episode');
 // Text after an explicit episode marker can be an episode subtitle. Identity
 // before that marker must still agree; a matching suffix cannot rescue it.
 const marker=/(?:S\d{1,2}[ ._-]*E\d+|第\s*\d+\s*[集话期]|(?:^|[ ._-])(?:Episode|EP?)[ ._-]*\d+|\s-\s*\d+)/i.exec(name);
 const prefix=marker?cpFileTitleEvidence(name.slice(0,marker.index),titles):file;
 if(prefix.residual&&(prefix.matched||!/^\d+$/.test(prefix.residual)))return result(false,prefix.matched?'identity-conflict':'unverified-file-title');
 if(!prefix.matched){
  if((params.cpFileContextAmbiguous||video.cpFileContextAmbiguous)&&!parents.some(p=>p.matched&&!p.residual))return result(false,'ambiguous-resource-context');
  const meaningful=[...parents].reverse().find(p=>p.matched||p.residual);
  if(meaningful&&(!meaningful.matched||meaningful.residual)){
   const unresolved=parents.filter(p=>p.residual&&!p.matched),path=cpFileWithoutTitles(parent,titles);
   const ambiguous=params.cpFileContextAmbiguous||video.cpFileContextAmbiguous||namedParent||unresolved.length>1||/(?:多部|多剧|影视|电视剧|电影)合集|其他(?:影视|电影|剧)/.test(path);
   if(ambiguous||!cpFileResourceContext(params,titles))return result(false,'parent-identity-conflict');
  }
 }
 return result(true,prefix.matched?'file-title-and-episode':'context-and-episode');
}

// Cleanup uses the existing account authentication and physical request pools.
// The coordinator owns target selection and a provider/account lease throughout.
const cpCleanupProtocolScopes = new Map();
let cpCleanupProtocolNativeGuard = null, cpCleanupProtocolChecking = false;
async function cpCleanupProtocolScope(provider, profile, work) {
  if (!['quark', 'xunlei', 'guangya'].includes(provider)) throw cpError('UPSTREAM_ERROR');
  cpCleanupGuard(provider, profile);
  const prior = cpCleanupProtocolScopes.get(provider);
  if (prior && prior.profile !== profile) throw cpError('ACCOUNT_CHANGED');
  if (!cpCleanupProtocolNativeGuard) {
    cpCleanupProtocolNativeGuard = cpNPGuard;
    cpNPGuard = function (drive, owner) {
      cpCleanupProtocolNativeGuard(drive, owner);
      const scope = cpCleanupProtocolScopes.get(drive);
      if (scope && scope.profile === owner && !cpCleanupProtocolChecking) {
        cpCleanupProtocolChecking = true;
        try { cpCleanupGuard(drive, owner); } finally { cpCleanupProtocolChecking = false; }
      }
    };
  }
  cpCleanupProtocolScopes.set(provider, {profile, count:(prior?.count || 0) + 1});
  try { return await work(); }
  finally {
    const scope = cpCleanupProtocolScopes.get(provider);
    if (scope.count > 1) scope.count--; else cpCleanupProtocolScopes.delete(provider);
    if (!cpCleanupProtocolScopes.size) { cpNPGuard = cpCleanupProtocolNativeGuard; cpCleanupProtocolNativeGuard = null; }
  }
}
function cpCleanupProtocolId(value) {
  if (!['string', 'number'].includes(typeof value)) throw cpError('UPSTREAM_ERROR');
  const id = String(value);
  if (!id || ['0', 'undefined', 'null'].includes(id) || /[\u0000-\u0020]/.test(id)) throw cpError('UPSTREAM_ERROR');
  return id;
}
function cpCleanupProtocolItem(provider, item, parentId) {
  if (!item || typeof item !== 'object') throw cpError('UPSTREAM_ERROR');
  const fid = cpCleanupProtocolId(provider === 'quark' ? item.fid : provider === 'xunlei' ? item.id : item.fileId);
  const name = provider === 'quark' ? item.file_name : provider === 'xunlei' ? item.name : item.fileName;
  const type = provider === 'quark' ? item.dir : provider === 'xunlei' ? item.kind : item.resType;
  if (typeof name !== 'string' || (provider === 'quark' ? ![true,false,0,1].includes(type) : provider === 'xunlei' ? !['drive#folder','drive#file'].includes(type) : ![1,2].includes(Number(type)))) throw cpError('UPSTREAM_ERROR');
  const declared = provider === 'quark' ? item.pdir_fid : provider === 'xunlei' ? item.parent_id : item.parentId;
  if (declared != null && String(declared) !== String(parentId)) throw cpError('UPSTREAM_ERROR');
  return {fid, parentId:String(parentId), name, directory:provider === 'quark' ? !!type : provider === 'xunlei' ? type === 'drive#folder' : Number(type) === 2};
}
async function cpCleanupQuarkRequest(method, path, body, profile, query={}, beforeDispatch) {
  const url = 'https://drive-pc.quark.cn/1/clouddrive/' + path + '?' + cpNPQuery(Object.assign({pr:'ucpro',fr:'pc',uc_param_str:''},query));
  const claim = () => cpCleanupGuard('quark', profile);
  const work = () => {
    claim();
    const options = {timeout:15000,headers:Object.assign({'Content-Type':'application/json'},quarkHeaders())};
    const dispatch=()=>{claim();if(beforeDispatch)beforeDispatch();};
    return method === 'GET' ? cpHttpGet(url,options,dispatch) : cpHttpPost(url,JSON.stringify(body),options,dispatch);
  };
  let response;
  try { response = await (typeof cpQueueCatalogRead === 'function' ? cpQueueCatalogRead('quark',work) : work()); }
  catch(error) { claim(); if(error?.code) throw error; throw cpError('UPSTREAM_ERROR'); }
  claim();
  const status = Number(response?.status || response?.statusCode || 200);
  let json = response?.data;
  try { if(typeof json === 'string') json=JSON.parse(json); } catch(_) { throw cpError('UPSTREAM_ERROR'); }
  if(status >= 400 || !json || typeof json !== 'object' || json.code != null && Number(json.code) !== 0 || json.status != null && Number(json.status) !== 200) throw cpNPFailure(status,json?.code,json?.message);
  if(!json.data || typeof json.data !== 'object') throw cpError('UPSTREAM_ERROR');
  return {data:json.data,total:json.metadata?._total ?? json.metadata?.detail_meta?._total ?? json.data.metadata?._total ?? json.data.total};
}
async function cpCleanupProtocolPages(provider, parentId, profile, trash=false) {
  const rows=[], seen=new Set(), pages=new Set(); let token='';
  const size=trash && provider === 'guangya' ? 100 : 200;
  for(let page=0;page<1000;page++) {
    cpCleanupGuard(provider, profile);
    let items,total,next='';
    if(provider === 'quark') {
      const result=await cpCleanupQuarkRequest('GET',trash?'file/recycle/list':'file/sort',null,profile,Object.assign({_page:page+1,_size:size,_fetch_total:1},trash?{}:{pdir_fid:parentId || '0',_fetch_sub_dirs:0,_sort:'file_type:asc,file_name:asc'}));
      items=result.data.list; total=result.total;
    } else if(provider === 'xunlei') {
      const query={limit:size,page_token:token,filters:JSON.stringify({trashed:{eq:trash}})};
      if(!trash) Object.assign(query,{parent_id:parentId || '',with_audit:true});
      const data=await cpNPXunleiApi('GET','drive/v1/files?'+cpNPQuery(query),null,false,profile,true,()=>cpCleanupGuard(provider,profile));
      items=data.files; next=String(data.next_page_token || data.nextPageToken || '');
    } else {
      const body=trash?{parentId:'',page,pageSize:size,dirType:4,orderBy:12,sortType:1}:{parentId:parentId || '',page,pageSize:size,orderBy:3,sortType:1,fileTypes:[]};
      const data=await cpNPGuangyaApi('/userres/v1/file/get_file_list',body,true,profile,true,()=>cpCleanupGuard(provider,profile));
      items=data.list; total=data.total;
    }
    if(!Array.isArray(items)) throw cpError('UPSTREAM_ERROR');
    let added=0;
    for(const item of items) {
      const id=cpCleanupProtocolId(provider === 'quark' ? trash?item.record_id:item.fid : provider === 'xunlei' ? item.id : item.fileId);
      if(!seen.has(id)) {seen.add(id); rows.push(item); added++;}
    }
    if(items.length && !added) throw cpError('UPSTREAM_ERROR');
    if(provider === 'xunlei') {
      if(!next) return rows;
      if(!items.length || pages.has(next) || token === next) throw cpError('UPSTREAM_ERROR');
      pages.add(next); token=next;
    } else {
      if(total != null) {
        const count=Number(total);
        if(!Number.isSafeInteger(count) || count<0 || count<seen.size) throw cpError('UPSTREAM_ERROR');
        if(count === seen.size) return rows;
        if(!items.length) throw cpError('UPSTREAM_ERROR');
      } else if(items.length<size) return rows;
    }
  }
  throw cpError('UPSTREAM_ERROR');
}
async function cpCleanupProtocolInventory(provider,profile,options={}) {
  const rootParent=provider === 'quark' ? '0' : '';
  const roots=(await cpCleanupProtocolPages(provider,rootParent,profile)).map(item=>cpCleanupProtocolItem(provider,item,rootParent)).filter(item=>item.directory && item.name === 'ftv-cache');
  if(roots.length>1) throw cpError('UPSTREAM_ERROR');
  if(!roots.length) return {rootId:'',files:[]};
  const rootId=roots[0].fid,children=(await cpCleanupProtocolPages(provider,rootId,profile)).map(raw=>cpCleanupProtocolItem(provider,raw,rootId));
  const branches=children.filter(item=>item.directory),seen=new Set([rootId]);
  for(const item of children){if(seen.has(item.fid))throw cpError('UPSTREAM_ERROR');seen.add(item.fid);}
  let selected=branches,partial=false;
  if(provider!=='quark'&&(branches.length>16||options.branches)){
    const ordered=branches.slice().sort((a,b)=>a.fid<b.fid?-1:a.fid>b.fid?1:0);
    if(options.branches){
      if(!Array.isArray(options.branches)||options.branches.length>16)throw cpError('UPSTREAM_ERROR');
      const wanted=new Set(options.branches.map(cpCleanupProtocolId));selected=ordered.filter(item=>wanted.has(item.fid));
    }else{
      let start=ordered.findIndex(item=>!options.cursor||item.fid>options.cursor);if(start<0)start=0;
      selected=ordered.slice(start,start+16);
    }
    partial=selected.length<branches.length;
  }
  const selectedIds=new Set(selected.map(item=>item.fid));
  const files=children.filter(item=>!item.directory||selectedIds.has(item.fid)),queue=selected.map(item=>({id:item.fid,branch:item.fid}));
  let visited=0;
  while(queue.length) {
    // The bound applies to traversed directories, never the unvisited fanout.
    if(++visited>1000) throw cpError('UPSTREAM_ERROR');
    const parent=queue.shift();
    for(const raw of await cpCleanupProtocolPages(provider,parent.id,profile)) {
      const item=cpCleanupProtocolItem(provider,raw,parent.id);
      if(seen.has(item.fid)) throw cpError('UPSTREAM_ERROR');
      seen.add(item.fid);if(partial)item.cpCleanupBranch=parent.branch;files.push(item);
      if(item.directory) queue.push({id:item.fid,branch:parent.branch});
    }
  }
  if(!partial)return {rootId,files};
  return {rootId,files,partial:true,branchIds:[...selectedIds],presentBranches:branches.map(item=>item.fid),cursor:selected.at(-1)?.fid||''};
}
function cpCleanupInventory(provider,profile,options) {
  return cpCleanupProtocolScope(provider,profile,()=>cpCleanupProtocolInventory(provider,profile,options));
}
async function cpCleanupProtocolPause(provider,profile) {
  cpCleanupGuard(provider,profile);
  if(typeof setTimeout === 'function') await new Promise(resolve=>setTimeout(resolve,500));
  cpCleanupGuard(provider,profile);
}
async function cpCleanupProtocolTask(provider,data,profile) {
  const taskId=data?.taskId || data?.task_id;
  // Completion is always established separately by a fresh inventory/trash read.
  // XL tasks need no assumed task API; bounded absence reads establish success.
  if(!taskId || provider === 'xunlei') return;
  for(let attempt=0;attempt<6;attempt++) {
    const state=provider === 'guangya' ? await cpNPGuangyaApi('/userres/v1/get_task_status',{taskId},true,profile,true,()=>cpCleanupGuard(provider,profile)) : (await cpCleanupQuarkRequest('GET','task',null,profile,{task_id:taskId,retry_index:attempt})).data;
    if(Number(state.status) === 3 || [2,3].includes(Number(state.status)) && state.detail?.code != null && Number(state.detail.code) !== 0) throw cpError('UPSTREAM_ERROR');
    if(Number(state.status) === 2) return;
    if(attempt<5) await cpCleanupProtocolPause(provider,profile);
  }
  throw cpError('TRANSFER_UNCERTAIN');
}
function cpCleanupProtocolFatal(error) {
  return ['ACCOUNT_CHANGED','ABORTED','OPERATION_TIMEOUT','AUTH_FAILED','RATE_LIMITED'].includes(error?.code);
}
async function cpCleanupProtocolVerify(provider,profile,read,complete) {
  for(let attempt=0;attempt<6;attempt++) {
    const state=await read();
    if(complete(state)) {cpCleanupGuard(provider,profile);return;}
    if(attempt<5) await cpCleanupProtocolPause(provider,profile);
  }
  throw cpError('TRANSFER_UNCERTAIN');
}
async function cpCleanupProtocolWrite(provider,profile,work,verify) {
  let dispatched=false;
  const claim=()=>{cpCleanupGuard(provider,profile);dispatched=true;};
  try {
    try {await cpCleanupProtocolTask(provider,await work(claim),profile);}
    catch(error) {if(!dispatched || cpCleanupProtocolFatal(error)) throw error;}
    await verify();
  } catch(error) {
    if(!dispatched) throw error;
    const failure=cpCleanupProtocolFatal(error)?error:cpError('TRANSFER_UNCERTAIN');
    failure.cleanupWriteUncertain=true;
    throw failure;
  }
}
function cpCleanupRemove(provider,ids,profile,beforeBatch,scope) {
  return cpCleanupProtocolScope(provider,profile,async()=>{
    if(!Array.isArray(ids)) throw cpError('UPSTREAM_ERROR');
    if(beforeBatch != null && typeof beforeBatch !== 'function') throw cpError('UPSTREAM_ERROR');
    const selected=Array.from(new Set(ids.map(cpCleanupProtocolId)));
    if(!selected.length) return {removed:[]};
    const options=scope?.partial?{branches:scope.branchIds}:{};
    const inventory=await cpCleanupProtocolInventory(provider,profile,options),byId=new Map(inventory.files.map(file=>[file.fid,file]));
    if(selected.some(id=>id === inventory.rootId || !byId.has(id))) throw cpError('UPSTREAM_ERROR');
    const wanted=new Set(selected);
    for(const file of inventory.files) if(wanted.has(file.parentId) && !wanted.has(file.fid)) throw cpError('UPSTREAM_ERROR');
    // Keep batches bounded; no mutation is retried, even after transport loss.
    for(let offset=0;offset<selected.length;offset+=50) {
      const batch=selected.slice(offset,offset+50);
      await cpCleanupProtocolWrite(provider,profile,async claim=>{
        const dispatch=()=>{cpCleanupGuard(provider,profile);if(beforeBatch)beforeBatch(batch.slice());claim();};
        return provider === 'quark' ? (await cpCleanupQuarkRequest('POST','file/delete',{action_type:2,filelist:batch,exclude_fids:[]},profile,{},dispatch)).data : provider === 'xunlei' ? cpNPXunleiApi('POST','drive/v1/files:batchDelete',{ids:batch,space:''},false,profile,false,dispatch) : cpNPGuangyaApi('/userres/v1/file/delete_file',{fileIds:batch},true,profile,false,dispatch);
      },
        ()=>{
          // A sampled subtree cannot establish global absence after a write.
          // Reconcile every branch in later sweeps before releasing quarantine.
          if(scope?.partial)throw cpError('TRANSFER_UNCERTAIN');
          return cpCleanupProtocolVerify(provider,profile,()=>cpCleanupProtocolInventory(provider,profile,options),state=>state.rootId === inventory.rootId && !state.files.some(file=>batch.includes(file.fid)));
        });
    }
    return {removed:selected};
  });
}
function cpCleanupProtocolTrashId(provider,item) {
  return cpCleanupProtocolId(provider === 'quark' ? item.record_id : provider === 'xunlei' ? item.id : item.fileId);
}
function cpCleanupProtocolTrashAbsent(provider,rows,ids) {
  const present=new Set(rows.map(item=>cpCleanupProtocolTrashId(provider,item)));
  return ids.every(id=>!present.has(id));
}
function cpCleanupTrash(provider,profile,beforeBatch) {
  return cpCleanupProtocolScope(provider,profile,async()=>{
    if(beforeBatch != null && typeof beforeBatch !== 'function') throw cpError('UPSTREAM_ERROR');
    const initial=await cpCleanupProtocolPages(provider,'',profile,true);
    if(!initial.length) return {empty:true};
    const ids=initial.map(item=>cpCleanupProtocolTrashId(provider,item)),size=provider === 'guangya' ? ids.length : 50;
    let lastRows=initial;
    for(let offset=0;offset<ids.length;offset+=size) {
      const batch=ids.slice(offset,offset+size);
      await cpCleanupProtocolWrite(provider,profile,async claim=>{
        const dispatch=()=>{cpCleanupGuard(provider,profile);if(beforeBatch)beforeBatch(batch.slice());claim();};
        if(provider === 'guangya') return cpNPGuangyaApi('/userres/v1/file/clear_recycle_bin',{},true,profile,false,dispatch);
        return provider === 'quark' ? (await cpCleanupQuarkRequest('POST','file/recycle/remove',{select_mode:2,record_list:batch},profile,{},dispatch)).data : cpNPXunleiApi('POST','drive/v1/files:batchDelete',{ids:batch,space:''},false,profile,false,dispatch);
      },()=>cpCleanupProtocolVerify(provider,profile,async()=>lastRows=await cpCleanupProtocolPages(provider,'',profile,true),rows=>cpCleanupProtocolTrashAbsent(provider,rows,batch)));
    }
    return {empty:!lastRows.length};
  });
}
function cpCleanupTrashEmpty(provider,profile,ids) {
  return cpCleanupProtocolScope(provider,profile,async()=>{
    if(ids !== undefined && !Array.isArray(ids)) throw cpError('UPSTREAM_ERROR');
    const selected=ids === undefined ? null : ids.map(cpCleanupProtocolId);
    if(selected && !selected.length) return true;
    const rows=await cpCleanupProtocolPages(provider,'',profile,true);
    return selected ? cpCleanupProtocolTrashAbsent(provider,rows,selected) : !rows.length;
  });
}

// Activity-triggered, account-scoped transfer expiry. No timers or credentials
// leave Rex. Shared storage is required before any cleanup request is allowed.
const CP_CLEANUP_NS='catpaw.drive-cleanup.v1',CP_CLEANUP_TTL=7200000,CP_CLEANUP_LEASE=90000;
const cpCleanupContexts=new Map(),cpCleanupQueues=new Map();
function cpCleanupSupported(provider){return ['quark','xunlei','guangya'].includes(provider);}
function cpCleanupEnabled(provider){
 if(typeof cpColdResetConfig==='function')cpColdResetConfig();
 return cpCleanupSupported(provider)&&cpShared()?.transferAutoCleanup==='enabled'&&cpDriveEnabled(provider);
}
function cpCleanupIdentity(provider){
 const account=provider==='quark'?cpAccounts()[0]:cpNewPanIdentity(provider);
 return account?provider+':'+baiduSha1(String(account)):null;
}
function cpCleanupGet(key){try{const raw=Widget.sharedCache.get(CP_CLEANUP_NS,key);return raw?JSON.parse(raw):null;}catch(_){return null;}}
function cpCleanupSet(key,value){
 if(!Widget.sharedCache||typeof Widget.sharedCache.set!=='function')throw cpError('TRANSFER_UNCERTAIN');
 const result=Widget.sharedCache.set(CP_CLEANUP_NS,key,JSON.stringify(value));
 if(result&&typeof result.then==='function')throw cpError('TRANSFER_UNCERTAIN');
}
function cpCleanupState(key){const state=cpCleanupGet('state:'+key);return state?.schema===1&&state.files&&typeof state.files==='object'&&!Array.isArray(state.files)?state:{schema:1,files:{},generation:0,initializedAt:Date.now(),nextScanAt:0};}
function cpCleanupGeneration(provider){if(!cpCleanupSupported(provider))return 0;const key=cpCleanupIdentity(provider);return key?Number(cpCleanupState(key).generation||0):0;}
function cpCleanupEpoch(provider){const n=cpCleanupGeneration(provider);return n?':cleanup:'+n:'';}
function cpCleanupLease(context){
 const lease=cpCleanupGet('lease:'+context.key),now=Date.now();
 if(!lease||lease.owner!==context.owner||lease.until<=now||cpCleanupIdentity(context.provider)!==context.key)throw Object.assign(cpError('TRANSFER_UNCERTAIN'),{cleanupLeaseLost:true});
 cpCleanupSet('lease:'+context.key,{owner:context.owner,until:now+CP_CLEANUP_LEASE});
}
function cpCleanupGuard(provider,profile){
 if(!cpCleanupEnabled(provider))throw cpError('CLEANUP_DISABLED');
 cpCheck(profile);if(typeof cpResourceCheck==='function')cpResourceCheck(cpResourceOwner);
 const key=cpCleanupIdentity(provider),context=key&&cpCleanupContexts.get(key);
 if(!context||context.profile!==profile)throw cpError('TRANSFER_UNCERTAIN');
 cpCleanupLease(context);
}
function cpCleanupSource(video){return video?.shareId&&video?.fid?JSON.stringify([String(video.shareId),String(video.fid)]):null;}
function cpCleanupRegister(provider,video,fid,parentId,rootId){
 if(!cpCleanupEnabled(provider)||!fid)return;
 const key=cpCleanupIdentity(provider),context=key&&cpCleanupContexts.get(key);if(!context)return;
 cpCleanupLease(context);const state=cpCleanupState(key),now=Date.now(),id=String(fid),previous=state.files[id]||{};
 state.files[id]=Object.assign({},previous,{fid:id,name:video.file_name||previous.name||'',parentId:String(parentId||previous.parentId||''),rootId:String(rootId||state.rootId||''),directory:false,source:cpCleanupSource(video),firstSeen:previous.firstSeen||now,lastUsed:now});
 if(rootId)state.rootId=String(rootId);
 if(provider!=='quark'&&parentId&&String(parentId)!==String(rootId))state.files[id].cpCleanupBranch=String(parentId);
 cpCleanupSet('state:'+key,state);
}
function cpCleanupTouch(state,video){
 const source=cpCleanupSource(video),now=Date.now();
 for(const entry of Object.values(state.files))if(source&&entry.source===source||!entry.source&&video?.file_name&&entry.name===video.file_name)entry.lastUsed=now;
}
function cpCleanupUnavailable(provider,video){
 const key=cpCleanupSupported(provider)&&cpCleanupIdentity(provider);if(!key)return false;
 const state=cpCleanupState(key),source=cpCleanupSource(video);
 return (state.pendingRemove||[]).some(id=>{const item=state.files[id]||state.pendingFiles?.[id];return item&&(source&&item.source===source||!item.source&&video?.file_name&&item.name===video.file_name);});
}
function cpCleanupInvalidate(state,key){state.generation=Number(state.generation||0)+1;cpCleanupSet('state:'+key,state);if(typeof cpBetaPlayGeneration!=='undefined')cpBetaPlayGeneration++;}
function cpCleanupClearPending(state){state.pendingRemove=null;state.pendingFiles=null;state.pendingReconcile=null;}
function cpCleanupPendingBlocked(state,inventory,ids){
 let scan=state.pendingReconcile;
 if(!scan)scan=state.pendingReconcile={rootId:state.rootId,remaining:inventory.presentBranches?.slice()||[],known:inventory.presentBranches?.slice()||[],found:[]};
 // Losing or replacing the cache root is not proof of deletion.
 if(!inventory.rootId||inventory.rootId!==scan.rootId)return true;
 const presentFiles=new Set(inventory.files.filter(item=>!item.directory).map(item=>String(item.fid)));
 if(!inventory.partial)return ids.some(id=>presentFiles.has(id));
 const present=new Set(inventory.presentBranches),covered=new Set(inventory.branchIds),known=new Set(scan.known);
 for(const branch of present)if(!known.has(branch)){scan.remaining.push(branch);known.add(branch);}
 scan.known=[...known];scan.remaining=scan.remaining.filter(branch=>present.has(branch)&&!covered.has(branch));
 for(const id of ids)if(presentFiles.has(id)&&!scan.found.includes(id))scan.found.push(id);
 if(scan.remaining.length)return true;
 if(scan.found.length){scan.remaining=[...present];scan.known=[...present];scan.found=[];return true;}
 // The full post-dispatch pass also settles records from the old inventory
 // schema, whose nested files had no saved branch metadata.
 for(const id of ids)delete state.files[id];
 return false;
}
async function cpCleanupSweep(context,video){
 const {provider,profile,key}=context,now=Date.now();let state=cpCleanupState(key);
 cpCleanupTouch(state,video);cpCleanupSet('state:'+key,state);
 if(state.nextScanAt>now)return;
 if(state.pendingRemove?.length&&!state.pendingFiles)state.pendingFiles=Object.fromEntries(state.pendingRemove.filter(id=>state.files[id]).map(id=>[id,state.files[id]]));
 const priorRoot=state.rootId;
 cpCleanupGuard(provider,profile);const inventory=await cpCleanupInventory(provider,profile,{cursor:state.scanCursor});cpCleanupGuard(provider,profile);
 // Inventory is authoritative. A lost delete reply is settled by absence here,
 // before another mutation. New legacy files always receive a full grace period.
 const previous=state.files,partial=inventory.partial===true&&state.rootId===inventory.rootId;
 state.files=partial?Object.assign({},previous):{};state.rootId=inventory.rootId||'';
 if(partial){
  const covered=new Set(inventory.branchIds),present=new Set(inventory.presentBranches);
  for(const [id,item] of Object.entries(state.files)){
   // Older registered XL/GY transfers also use one direct per-video folder.
   if(!item.cpCleanupBranch&&item.source&&item.rootId===state.rootId&&item.parentId!==state.rootId)item.cpCleanupBranch=item.parentId;
   if(item.parentId===state.rootId||item.cpCleanupBranch&&(covered.has(item.cpCleanupBranch)||!present.has(item.cpCleanupBranch)))delete state.files[id];
  }
 }
 state.scanCursor=inventory.partial?inventory.cursor:'';
 for(const item of inventory.files){if(!item?.fid||item.directory)continue;const id=String(item.fid);state.files[id]=Object.assign({firstSeen:now,lastUsed:now},previous[id]||{},item,{fid:id});}
 cpCleanupTouch(state,video);
 const observed=new Set(inventory.files.filter(item=>!item.directory).map(item=>String(item.fid)));
 const expired=Object.values(state.files).filter(item=>observed.has(item.fid)&&Number.isFinite(item.lastUsed)&&item.lastUsed<=now-CP_CLEANUP_TTL&&item.fid!==state.rootId);
 state.nextScanAt=Math.min(now+(inventory.partial?60000:CP_CLEANUP_TTL),...Object.values(state.files).map(item=>Math.max(now+60000,item.lastUsed+CP_CLEANUP_TTL)));
 cpCleanupSet('state:'+key,state);
 const pending=state.pendingRemove||[];
 if(pending.length){
  if(!state.pendingReconcile)state.pendingReconcile={rootId:priorRoot||state.rootId,remaining:inventory.presentBranches?.slice()||[],known:inventory.presentBranches?.slice()||[],found:[]};
  if(cpCleanupPendingBlocked(state,inventory,pending)){state.nextScanAt=now+60000;cpCleanupSet('state:'+key,state);return;}
  cpCleanupClearPending(state);cpCleanupInvalidate(state,key);state.trashDue=true;cpCleanupSet('state:'+key,state);
 }
 let trashBlocked=false;
 if(state.pendingTrash){
  cpCleanupGuard(provider,profile);
  const ids=Array.isArray(state.pendingTrash)?state.pendingTrash:undefined;
  if(typeof cpCleanupTrashEmpty!=='function'||!await cpCleanupTrashEmpty(provider,profile,ids)){
   trashBlocked=true;state.nextScanAt=Math.min(state.nextScanAt,now+60000);
  }else{state.pendingTrash=false;state.trashDue=true;}
  cpCleanupSet('state:'+key,state);
 }
 if(expired.length){
  cpCleanupGuard(provider,profile);
  // Invalidate transfer receipts and playback URLs before a potentially ambiguous
  // delete. Surviving files are reused from this ledger, without a second save.
  cpCleanupInvalidate(state,key);
  try{await cpCleanupRemove(provider,expired.map(item=>item.fid),profile,ids=>{cpCleanupGuard(provider,profile);state.pendingRemove=ids.slice();state.pendingFiles=Object.fromEntries(ids.map(id=>[id,state.files[id]]));state.pendingReconcile={rootId:inventory.rootId,remaining:inventory.presentBranches?.slice()||[],known:inventory.presentBranches?.slice()||[],found:[]};cpCleanupSet('state:'+key,state);},inventory);}catch(error){if(error?.code!=='TRANSFER_UNCERTAIN'&&!error?.cleanupWriteUncertain){cpCleanupClearPending(state);cpCleanupSet('state:'+key,state);}throw error;}
  cpCleanupGuard(provider,profile);cpCleanupClearPending(state);
  for(const item of expired)delete state.files[item.fid];state.trashDue=true;cpCleanupSet('state:'+key,state);
 }
 if(!trashBlocked&&(state.trashDue||expired.length||now-(state.lastTrashAt||state.initializedAt)>=CP_CLEANUP_TTL)){
  cpCleanupGuard(provider,profile);
  try{await cpCleanupTrash(provider,profile,ids=>{cpCleanupGuard(provider,profile);state.pendingTrash=ids.slice();cpCleanupSet('state:'+key,state);});}catch(error){if(error?.code!=='TRANSFER_UNCERTAIN'&&!error?.cleanupWriteUncertain){state.pendingTrash=false;cpCleanupSet('state:'+key,state);}throw error;}
  cpCleanupGuard(provider,profile);state.pendingTrash=false;state.trashDue=false;state.lastTrashAt=now;cpCleanupSet('state:'+key,state);
 }
}
// Contention is not an unknown transfer receipt. Wait within the owning
// resource deadline and recheck account/cancellation before claiming the lease.
async function cpCleanupAcquire(provider,key,profile){
 const deadline=cpResourceOwner?.deadline||Date.now()+10000;
 for(;;){
  cpCheck(profile);if(cpCleanupIdentity(provider)!==key)throw cpError('ACCOUNT_CHANGED');
  if(typeof cpResourceCheck==='function')cpResourceCheck(cpResourceOwner);
  if(!cpCleanupEnabled(provider))return null;
  const now=Date.now(),lease=cpCleanupGet('lease:'+key);
  if(!lease||lease.until<=now){
   const context={key,provider,profile,owner:String(now)+':'+String(Math.random())};
   cpCleanupSet('lease:'+key,{owner:context.owner,until:now+CP_CLEANUP_LEASE});return context;
  }
  if(now>=deadline||typeof setTimeout!=='function')throw cpError('OPERATION_TIMEOUT');
  await new Promise(resolve=>setTimeout(resolve,Math.min(50,deadline-now)));
 }
}
function cpCleanupRelease(context){
 if(!context)return;
 if(cpCleanupContexts.get(context.key)===context)cpCleanupContexts.delete(context.key);
 if(cpCleanupQueues.get(context.key)===context.task)cpCleanupQueues.delete(context.key);
 if(cpCleanupGet('lease:'+context.key)?.owner===context.owner)cpCleanupSet('lease:'+context.key,null);
}
async function cpCleanupWait(previous,profile){
 if(!previous)return;
 let settled=false;const ready=previous.then(()=>{settled=true;},()=>{settled=true;}),deadline=cpResourceOwner?.deadline||Date.now()+10000;
 while(!settled){
  cpCheck(profile);if(typeof cpResourceCheck==='function')cpResourceCheck(cpResourceOwner);
  const now=Date.now();if(now>=deadline||typeof setTimeout!=='function')throw cpError('OPERATION_TIMEOUT');
  let timer;try{await Promise.race([ready,new Promise(resolve=>{timer=setTimeout(resolve,Math.min(50,deadline-now));})]);}finally{if(timer&&typeof clearTimeout==='function')clearTimeout(timer);}
 }
}
async function cpCleanupRun(provider,video,work){
 if(!cpCleanupEnabled(provider)){if(cpCleanupUnavailable(provider,video))throw cpError('TRANSFER_UNCERTAIN');return work();}
 const key=cpCleanupIdentity(provider);if(!key||!Widget.sharedCache?.get||!Widget.sharedCache?.set)return work();
 const previous=cpCleanupQueues.get(key);
 const task=(async()=>{
  const profile=cpActiveProfile||cpProfile;cpCheck(profile);await cpCleanupWait(previous,profile);
  const context=await cpCleanupAcquire(provider,key,profile);
  if(!context){if(cpCleanupUnavailable(provider,video))throw cpError('TRANSFER_UNCERTAIN');return work();}
  context.task=task;cpCleanupContexts.set(key,context);
  try{
   cpCleanupLease(context);
   try{await cpCleanupSweep(context,video);}catch(error){
    if(error?.cleanupLeaseLost||['ACCOUNT_CHANGED','ABORTED','OPERATION_TIMEOUT'].includes(error?.code))throw error;
    const state=cpCleanupState(key);state.nextScanAt=Date.now()+60000;state.lastError=String(error?.code||'UPSTREAM_ERROR');cpCleanupSet('state:'+key,state);
   }
   cpCheck(profile);if(cpCleanupUnavailable(provider,video))throw cpError('TRANSFER_UNCERTAIN');return await work();
  }finally{cpCleanupRelease(context);}
 })();
 cpCleanupQueues.set(key,task);try{return await task;}finally{if(cpCleanupQueues.get(key)===task)cpCleanupQueues.delete(key);}
}
// Normal transfer guards also renew the lease. A stalled operation whose lease
// was taken over may no longer dispatch its next transfer request.
const cpCleanupCheckNative=cpCheck;
cpCheck=function(profile){cpCleanupCheckNative(profile);for(const context of cpCleanupContexts.values())cpCleanupLease(context);};
// Keep the native key for unresolved writes: an unrelated cleanup must never
// erase uncertain/known/preparing receipts and replay an in-flight transfer.
function cpCleanupReceiptProvider(key){if(!String(key).startsWith('transfer:'))return null;const part=String(key).split(':')[1];if(['xunlei','guangya'].includes(part))return part;if(typeof cpProfile!=='undefined'&&part===cpProfile)return 'quark';return null;}
const cpCleanupReadNative=cpRead,cpCleanupWriteNative=cpWrite;
cpRead=function(key){const value=cpCleanupReadNative(key),provider=cpCleanupReceiptProvider(key);if(provider&&value?.state==='succeeded'&&Number(value.cpCleanupGeneration||0)<cpCleanupGeneration(provider))return null;return value;};
cpWrite=function(key,value){const provider=cpCleanupReceiptProvider(key);if(provider&&value?.state==='succeeded'){const identity=cpCleanupIdentity(provider),generation=identity&&cpCleanupState(identity).generation||0;value=Object.assign({},value,{cpCleanupGeneration:generation});}return cpCleanupWriteNative(key,value);};
const cpCleanupPlayKeyNative=cpBetaPlayKey;
cpBetaPlayKey=function(info){const key=cpCleanupPlayKeyNative(info);return key?key+cpCleanupEpoch(info.provider||'quark'):key;};
const cpCleanupCreateFolderNative=createFolder;
createFolder=async function(...args){const fid=await cpCleanupCreateFolderNative(...args);const key=cpCleanupIdentity('quark'),context=key&&cpCleanupContexts.get(key);if(context&&(!args[0]||args[0]===CACHE_FOLDER)){const state=cpCleanupState(key);state.rootId=String(fid);cpCleanupSet('state:'+key,state);}return fid;};
const cpCleanupSaveNative=saveShareFile;
saveShareFile=async function(video,...args){
 if(!cpCleanupEnabled('quark'))return cpCleanupSaveNative(video,...args);
 const key=cpCleanupIdentity('quark');if(!key||!Widget.sharedCache?.get||!Widget.sharedCache?.set)return cpCleanupSaveNative(video,...args);
 return cpCleanupRun('quark',video,async()=>{
  const context=cpCleanupContexts.get(key);if(!context)return cpCleanupSaveNative(video,...args);cpCleanupLease(context);
  const state=cpCleanupState(key),source=cpCleanupSource(video),receipt=cpCleanupReadNative(cpTransferKey(video)),legacy=receipt?.state==='succeeded'&&state.files[String(receipt.fid)],saved=source&&Object.values(state.files).find(item=>item.source===source)||legacy;
  if(saved&&(state.pendingRemove||[]).includes(saved.fid))throw cpError('TRANSFER_UNCERTAIN');
  if(saved){cpCleanupRegister('quark',video,saved.fid,saved.parentId,state.rootId);return saved.fid;}
  const fid=await cpCleanupSaveNative(video,...args);cpCleanupRegister('quark',video,fid,state.rootId,state.rootId);return fid;
 });
};
const cpCleanupResolveNative=resolvePlaySource;
resolvePlaySource=async function(info,...args){
 // Sweep/touch before cached playback; each actual save owns its own critical
 // section, which ends before URL retrieval, subtitles or a playback retry.
 await cpCleanupRun(info.provider||'quark',info.videoInfo||{},async()=>{});
 return cpCleanupResolveNative(info,...args);
};

// Success quotas belong to shares, not files or attempted catalogs. Keep the
// native HTTP/source/transfer queues as the only concurrency owners.
function cpSuccessQuota({counts,limit,blocked,check,stopped,onVacancy}){
 const states=new Map(),seen=new Set(),running=new Set();let closed=false,error=null,refillError=null;
 const state=provider=>{if(!states.has(provider))states.set(provider,{success:0,active:0,attempts:0,queue:[],refilling:false,discoveryDone:false});return states.get(provider);};
 const goal=()=>Math.max(1,Number(limit())||1);
 // One extra extraction attempt per provider, shared by all failed primary slots.
 // A different passcode is another real attempt; identical candidates are deduplicated.
 // Missing/legacy settings retain the default enabled behavior.
 const extra=cpShared()?.candidateFailureFallback==='disabled'?0:1;
 const budget=()=>goal()+extra;
 const sync=()=>{
  for(const [provider,s] of states)counts.set(provider,blocked(provider)||s.attempts>=budget()?goal():Math.min(goal(),s.success+s.active+s.queue.length));
 };
 const pump=()=>{
  sync();if(closed||error||stopped())return;
  try{check();}catch(e){error=e;return;}
  // Empty providers enter native queues before providers filling later slots.
  const ordered=[...states].sort((a,b)=>a[1].success-b[1].success);
  for(const [provider,s] of ordered){
   while(!closed&&!stopped()&&!blocked(provider)&&s.queue.length&&s.success+s.active<goal()&&s.attempts<budget()){
    const work=s.queue.shift();s.active++;s.attempts++;sync();
    let task;task=Promise.resolve().then(()=>{check();if(closed||stopped()||blocked(provider))return false;return work();}).then(ok=>{if(ok==='skip')s.attempts--;else if(ok)s.success++;},e=>{error=error||e;}).finally(()=>{s.active--;running.delete(task);pump();});running.add(task);
   }
  }
  sync();
  if(onVacancy&&!refillError)for(const [provider,s] of ordered){
   if(closed||error||stopped()||blocked(provider)||s.refilling||s.discoveryDone||!s.attempts||s.attempts>=budget()||s.success+s.active+s.queue.length>=goal())continue;
   s.refilling=true;const before=seen.size;let task;
   task=Promise.resolve().then(()=>onVacancy(provider)).then(()=>{if(seen.size===before)s.discoveryDone=true;},e=>{if(['ABORTED','ACCOUNT_CHANGED','OPERATION_TIMEOUT'].includes(e?.code))error=error||e;else refillError=refillError||e;}).finally(()=>{s.refilling=false;running.delete(task);pump();});running.add(task);
  }
 };
 return {
  has:key=>seen.has(key),
  successes:provider=>state(provider).success,
  offer(provider,key,work){if(closed||seen.has(key)||blocked(provider)||state(provider).attempts>=budget())return;seen.add(key);state(provider).queue.push(work);pump();},
  sync,
  failure:()=>refillError,
  stopDiscovery:reason=>{refillError=refillError||reason;},
  async drain(){pump();while(running.size)await Promise.all([...running]);check();if(error)throw error;},
  close(){closed=true;for(const s of states.values())s.queue.length=0;sync();return Promise.allSettled([...running]);}
 };
}

const cpMediaIndexRead=qpSeriesIndexRead;
qpSeriesIndexRead=function(key){const value=cpMediaIndexRead(key);if(value.cpMediaSchema===1||!key.includes('selected-index.search-v2:'))return value;
 for(const candidate of value.candidates||[])if(candidate.shares[0]?.provider==='quark'){qpInvalidateShareCatalog(candidate.shares[0]);delete value.entries[qpCandidateKey(candidate.shares[0])];}
 return Object.assign({},value,{candidates:[],cpMediaSchema:1});};


function cpQuarkCandidateVideo(item){
 if(!item||item.dir===true||String(item.dir)==='1'||item.file_type==='folder'||item.obj_category==='folder')return false;
 return String(item.file_type||'').includes('video')||item.obj_category==='video'||/\.(mp4|mkv|avi|mov|flv|wmv|ts|m2ts|webm|m4v)$/i.test(String(item.file_name||''));
}
function cpCandidateEpisodeVideo(video,params,titles){
 if(params.type==='movie'||!video)return video;
 const original=cpFileText(video.file_name),stem=original.replace(/\.[a-z0-9]{2,5}$/i,'');
 if(episodeIdentity(original).episode!=null)return video;
 // Bare trailing numbers are accepted only after removing a verified title.
 // Keep unrecognized text, independent numbers, years and bare resolutions.
 const evidence=cpFileTitleEvidence(stem,titles);
 if(!evidence.matched)return video;
 const named=titles.find(title=>cpFileTitleEvidence(stem,[title]).matched);
 const remainder=cpFileMetadata(cpFileWithoutTitles(stem,titles));
 const number=/^[\p{P}\p{S}\s]*(\d{1,3})[\p{P}\p{S}\s]*$/u.exec(remainder);
 if(!number||Number(number[1])<1)return video;
 return Object.assign({},video,{file_name:named+'.E'+Number(number[1])+'.mkv'});
}

function cpShareExtractionText($,el){
 const element=$(el),own=element.attr('data-clipboard-text')||element.attr('href')||'';
 // Include sibling code text for hidden URLs. Preserve every neighboring href
 // so the password reader can stop at the next link rather than borrow its code.
 const node=element.attr('href')?element.parent():element;
 const markup=String(node.html()||'').replace(/<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1[^>]*>/gi,(_,quote,href)=>' '+href+' ')
  .replace(/<\/(?:p|li|tr|section)>/gi,'\u0001').replace(/<br\s*\/?\s*>/gi,'\n');
 const text=Widget.html.load(markup).text().replace(/&amp;/g,'&');
 return (own&&!text.includes(own)?own+' ':'')+text;
}

// Keep the established stored credential/session format. Only the form input
// changes: a local set is composed as a whole, never from shared account parts.
function cpGuangyaCredentialParams(params){
 if(!params||typeof params!=='object'||Array.isArray(params))return params;
 const fields=['guangyaRefreshToken','guangyaDeviceId'];
 if(!fields.some(key=>Object.prototype.hasOwnProperty.call(params,key)))return params;
 for(const key of ['guangyaAuth',...fields])if(Object.prototype.hasOwnProperty.call(params,key)&&(typeof params[key]!=='string'||/[\x00-\x1f\x7f]/.test(params[key])))throw new Error('光鸭凭证格式无效');
 const refresh=String(params.guangyaRefreshToken||'').trim(),device=String(params.guangyaDeviceId||'').trim();
 // Old JSON configurations still arrive under the existing access-token key.
 if(!refresh&&!device)return params;
 const raw=String(params.guangyaAuth||'').trim();let auth;
 try{auth=raw.startsWith('{')?JSON.parse(raw):{accessToken:raw};}catch(_){throw new Error('光鸭凭证格式无效');}
 if(!auth||typeof auth!=='object'||Array.isArray(auth))throw new Error('光鸭凭证格式无效');
 if(Object.prototype.hasOwnProperty.call(params,'guangyaRefreshToken')){auth.refreshToken=refresh;delete auth.refresh_token;}
 if(Object.prototype.hasOwnProperty.call(params,'guangyaDeviceId')){auth.deviceId=device;delete auth.device_id;}
 return Object.assign({},params,{guangyaAuth:JSON.stringify(auth)});
}

// Compose a complete local credential without changing stored session identity
// or borrowing refresh/device values from the common account.
function cpXunleiCredentialParams(params){
 if(!params||typeof params!=='object'||Array.isArray(params))return params;
 const fields=['xunleiRefreshToken','xunleiDeviceId'],own=key=>Object.prototype.hasOwnProperty.call(params,key);
 if(!fields.some(own))return params;
 for(const key of ['xunleiAuth',...fields])if(own(key)&&(typeof params[key]!=='string'||/[\x00-\x1f\x7f]/.test(params[key])))throw new Error('迅雷凭证格式无效');
 const refresh=String(params.xunleiRefreshToken||'').trim(),device=String(params.xunleiDeviceId||'').trim();
 // Preserve legacy JSON and its original identity when the new fields are empty.
 if(!refresh&&!device)return params;
 const raw=String(params.xunleiAuth||'').trim();let auth;
 try{auth=raw.startsWith('{')?JSON.parse(raw):{accessToken:raw};}catch(_){throw new Error('迅雷凭证格式无效');}
 if(!auth||typeof auth!=='object'||Array.isArray(auth))throw new Error('迅雷凭证格式无效');
 const session=auth.appSession||auth.webSession;
 if(session){
  if(typeof session!=='object'||Array.isArray(session))throw new Error('迅雷凭证格式无效');
  const kind=auth.appSession?'app':'web';auth=Object.assign({},auth,session);if(!auth.clientKind)auth.clientKind=kind;
 }
 delete auth.appSession;delete auth.webSession;
 if(own('xunleiRefreshToken')){auth.refreshToken=refresh;delete auth.refresh_token;}
 if(own('xunleiDeviceId')){auth.deviceId=device;delete auth.device_id;}
 return Object.assign({},params,{xunleiAuth:JSON.stringify(auth)});
}

return (function createNetdiskAdapter(options) {
 qpCheckShares=async function(shares){return shares.map(share=>Object.assign({},share,{validity:'uncertain'}));};
 // Website checks belong to the discovery adapter. Drive APIs validate shares.
 getSite=()=>options.site;

 return {bind:params=>bindForwardParams(params),enabled:provider=>quanpanProviderEnabled(provider),matchesSiteTitle:(title,params)=>cpSearchResultMatches(title,params),prepareDirectoryIdentity:(year,params)=>cpSiteYearMatches(year,params),parseShare:entry=>qpShare(entry),encode:value=>encodeLink(value),
 decode:link=>decodeLink(link),isLink:link=>typeof link==='string'&&link.startsWith(options.linkPrefix),candidateLimit:()=>qpCandidateLimit(),
 loadDetail:async link=>{
  const info=decodeLink(link);
  if(info?.action!=='play')return loadDetail(link);
  const resources=await loadResource({link});
  const items=resources.filter(r=>r.url).map(resource=>Object.assign({},resource,{
   type:'url',title:info.title,mediaType:info.mediaType||'tv',link,
   videoUrl:resource.url,headers:resource.headers||resource.customHeaders
  }));
  if(!items.length)throw new Error('未能获取播放资源，请更换资源或检查网盘账号');
  return items;
 },
 owner:()=>cpResourceOwner,
 request:(spec,request,owner=null)=>{cpResourceCheck(owner);return cpResourceAwait(owner,request(owner?Object.assign({},spec,{timeoutMs:Math.max(1,Math.min(spec.timeoutMs,owner.deadline-Date.now()))}):spec));},
 loadResource:(params,site)=>{
  if(site&&(cpRequestedYear(params).conflict||!cpRelevanceTitles(params).length||params.type!=='movie'&&(!Number.isSafeInteger(Number(params.season??1))||Number(params.season??1)<1||!Number.isSafeInteger(Number(params.episode))||Number(params.episode)<1)))return Promise.resolve([]);
  return loadResource(site?Object.assign({},params,{cpSiteSearch:site.search,cpSiteRead:site.read,cpSiteIdentity:site.identity}):params);
 },clear:()=>clearRexCatalogCache()};
})({"linkPrefix":"juhebai:","site":"https://tv.214521.xyz"});
})();
// juhe.baidu 引擎版 runtime：三站 CMS 搜索 + CatPaw DriveEngine。
// 引擎负责百度分享解析、转存、目录、分集匹配、播放头；
// 本文件只负责三站搜索、详情分享提取，以及 discovery 契约。
// 注意：引擎链接（juhebai:）与旧版模块链接不兼容，旧收藏/历史需重新添加。
// 注意：本模块只用单独 Cookie（credentialSource 强制 local，不继承通用配置）。
// 注意：年份未知时跳过 prepareDirectoryIdentity（引擎对“查询有年份、
// 条目无年份”返回 false，照抄示例会把无年份的 CMS 条目全丢弃）。
// 注意：清晰度标签（resourceCategory）按旧版行为，只给资源标题加前缀
// （8K/4K/1080P/其他），不做画质过滤；引擎自带的 resourceCategory
// 只控展示分类，标题上看不见，等于没作用。

var JUHE_SITES = [
  { key: 'huajuan', label: '花卷', hostParam: 'host_huajuan', defaultHost: 'https://www.hjzhencai.top' },
  { key: 'huban', label: '虎斑', hostParam: 'host_huban', defaultHost: 'http://43.248.128.118:16969' },
  { key: 'duoduo', label: '多多', hostParam: 'host_duoduo', defaultHost: 'https://tv.214521.xyz' }
];

var JUHE_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
};

function juheText(v) {
  return String(v == null ? '' : v).replace(/\s+/g, ' ').trim();
}

function juheCleanTitle(title) {
  return juheText(title)
    .replace(/^立刻播放/, '')
    .replace(/^下载/, '')
    .replace(/\s*-\s*第\d+集$/, '')
    .replace(/第[一二三四五六七八九十0-9]+季/g, '')
    .replace(/\bS\d{1,2}\b/ig, '')
    .trim();
}

function juheYearNum(text) {
  var m = String(text || '').match(/\b(19|20)\d{2}\b/);
  return m ? Number(m[0]) : undefined;
}

function juheToInt(v, defVal) {
  var n = parseInt(String(v == null ? '' : v).trim(), 10);
  return Number.isFinite(n) ? n : (defVal || 0);
}

function juheOrigin(url) {
  try { return new URL(String(url || '')).origin; } catch (e) { return ''; }
}

function juheStripSlash(s) {
  return String(s || '').replace(/\/+$/, '');
}

function juheSiteByKey(key) {
  for (var i = 0; i < JUHE_SITES.length; i++) {
    if (JUHE_SITES[i].key === key) return JUHE_SITES[i];
  }
  return null;
}

function juheSiteHost(site, params) {
  var host = (params && params[site.hostParam]) || site.defaultHost;
  return juheStripSlash(host);
}

function juheAbsUrl(url, site, params) {
  if (!url) return '';
  url = String(url);
  if (/^https?:\/\//i.test(url)) return url;
  if (url.indexOf('//') === 0) return 'https:' + url;
  if (url.charAt(0) !== '/') url = '/' + url;
  return juheSiteHost(site, params) + url;
}

function juheIsMaintenanceHtml(html) {
  var head = String(html || '').slice(0, 6000);
  return /<title>\s*站点维护中\s*<\/title>/i.test(head)
    || /SITE UNDER MAINTENANCE/i.test(head)
    || /<h1[^>]*>\s*站点维护中\s*<\/h1>/i.test(head);
}

// 站点请求：走引擎预算（timeoutMs + 失效检查），requestFn 映射到宿主的 get。
// 引擎请求失败时直连兜底，保证宿主 http 形态差异不致命。
async function juheSiteFetch(url, params, referer) {
  var headers = Object.assign({}, JUHE_HEADERS, { Referer: referer || '' });
  try {
    var resp = await DriveEngine.request(
      { url: url, method: 'GET', timeoutMs: 10000, headers: headers },
      function (spec) { return Widget.http.get(spec.url, { headers: spec.headers, timeout: spec.timeoutMs }); },
      DriveEngine.owner()
    );
    return String(resp && resp.data || '');
  } catch (e) {
    var resp2 = await Widget.http.get(url, { headers: headers, timeout: 20000 });
    return String(resp2 && resp2.data || '');
  }
}

function juheSearchUrl(site, keyword, page, params) {
  return juheSiteHost(site, params) + '/index.php/vod/search/page/' + (page || 1) + '/wd/' + encodeURIComponent(keyword) + '.html';
}

// 搜索页解析：三站同一 CMS，逻辑一致；标题取法取三站并集
// （花卷多 .module-card-item-title 一路，其余站走不到便自然落到后备）。
function juheParseSearch(html, site, params) {
  if (juheIsMaintenanceHtml(html)) return [];
  var $ = Widget.html.load(html);
  var out = [];
  var seen = {};
  $('.module-search-item, .module-items .module-item').each(function (_, el) {
    var card = $(el);
    var linkNode = card.find("h3 a[href*='/index.php/vod/detail/'], .module-item-title[href*='/index.php/vod/detail/'], a[href*='/index.php/vod/detail/']").first();
    var href = juheAbsUrl(linkNode.attr('href') || '', site, params);
    if (!href || seen[href]) return;
    var img = card.find('img').first();
    var title = juheCleanTitle(card.find('.module-card-item-title').first().text() || linkNode.attr('title') || linkNode.text() || img.attr('alt') || '');
    if (!title) return;
    var poster = juheAbsUrl(img.attr('data-src') || img.attr('data-original') || img.attr('src') || '', site, params);
    var remark = juheText(card.find('.video-serial, .module-item-text').first().text());
    var desc = juheText(card.find('.video-info-item, .module-item-style.video-text').last().text());
    var description = [remark, desc].filter(Boolean).join('\n');
    seen[href] = true;
    out.push({
      id: href, type: 'url', mediaType: 'movie', title: title,
      posterPath: poster, backdropPath: poster, description: description,
      link: href, year: juheYearNum(title + '\n' + description)
    });
  });
  if (!out.length) {
    var blockRe = /<div[^>]+class=["'][^"']*module-search-item[^"']*["'][\s\S]*?(?=<div[^>]+class=["'][^"']*module-search-item[^"']*["']<\/div>\s*<\/div>\s*<\/main>|<footer|$)/ig;
    var blocks = String(html || '').match(blockRe) || [];
    for (var bi = 0; bi < blocks.length; bi++) {
      var block = blocks[bi];
      var hrefMatch = block.match(/href=["']([^"']*\/index\.php\/vod\/detail\/[^"']+)["'][^>]*(?:title=["']([^"']*)["'])?/i);
      if (!hrefMatch) continue;
      var href = juheAbsUrl(hrefMatch[1].replace(/&amp;/g, '&'), site, params);
      if (!href || seen[href]) continue;
      var titleMatch = block.match(/<h3[^>]*>\s*<a[^>]*title=["']([^"']+)["']/i)
        || block.match(/<a[^>]*class=["'][^"']*video-serial[^"']*["'][^>]*title=["']([^"']+)["']/i)
        || block.match(/<img[^>]*alt=["']([^"']+)["']/i);
      var imgMatch = block.match(/<img[^>]*(?:data-src|data-original|src)=["']([^"']+)["']/i);
      var descMatch = block.match(/<div[^>]+class=["'][^"']*video-info-item[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
      var title = juheCleanTitle(titleMatch && titleMatch[1] || hrefMatch[2] || '');
      if (!title) continue;
      seen[href] = true;
      out.push({
        id: href, type: 'url', mediaType: 'movie', title: title,
        posterPath: juheAbsUrl(imgMatch && imgMatch[1] || '', site, params),
        backdropPath: juheAbsUrl(imgMatch && imgMatch[1] || '', site, params),
        description: juheText(descMatch && descMatch[1] || '').replace(/<[^>]+>/g, ''),
        link: href, year: juheYearNum(title)
      });
    }
  }
  return out;
}

async function juheSuggestSearch(site, keyword, params) {
  var url = juheSiteHost(site, params) + '/index.php/ajax/suggest?mid=1&wd=' + encodeURIComponent(keyword) + '&limit=100';
  var html = await juheSiteFetch(url, params, juheSiteHost(site, params) + '/');
  var data = html;
  if (typeof data === 'string') {
    try { data = JSON.parse(data); } catch (e) { data = null; }
  }
  if (!data || data.code !== 1 || !Array.isArray(data.list)) return [];
  var out = [];
  for (var i = 0; i < data.list.length; i++) {
    var raw = data.list[i] || {};
    var idText = String(raw.id == null ? '' : raw.id);
    var vodId = '';
    if (/^\d{1,12}$/.test(idText)) vodId = idText;
    else {
      var idMatch = idText.match(/\/vod\/detail\/id\/(\d{1,12})\.html/);
      if (idMatch) vodId = idMatch[1];
    }
    var title = juheCleanTitle(raw.name || '');
    if (!vodId || !title) continue;
    var link = juheSiteHost(site, params) + '/index.php/vod/detail/id/' + vodId + '.html';
    var poster = juheAbsUrl(raw.pic || '', site, params);
    if (/\/load\.gif(\?|$)/i.test(poster)) poster = '';
    out.push({
      id: link, type: 'url', mediaType: 'movie', title: title,
      posterPath: poster, backdropPath: poster,
      description: juheText(raw.remark || ''), link: link, year: juheYearNum(title)
    });
  }
  return out;
}

async function juheSiteSearch(site, keyword, params) {
  try {
    var page = juheToInt(params && params.page, 1) || 1;
    var html = await juheSiteFetch(juheSearchUrl(site, keyword, page, params), params, juheSiteHost(site, params) + '/');
    var items = juheParseSearch(html, site, params);
    if (!items.length) {
      try { items = await juheSuggestSearch(site, keyword, params); } catch (e) { items = []; }
    }
    return items;
  } catch (e) {
    return [];
  }
}

// 百度分享解析：/s/ 与 wap/init?surl= 两种；提取码取 ?pwd= / #pwd= / 文本里的 提取码。
function juheBaiduParse(url) {
  try { url = decodeURIComponent(String(url || '')).replace(/\s+/g, ''); }
  catch (e) { url = String(url || '').replace(/\s+/g, ''); }
  var m = url.match(/pan\.baidu\.com\/(?:s\/|wap\/init\?surl=)([^?&#]+)/i);
  if (!m) return null;
  var shareId = String(m[1] || '').split('?')[0].split('#')[0];
  if (!shareId) return null;
  var pwd = '';
  var pm = url.match(/(?:提取码|密码|pwd)[:=：\s]*([^&\s#]{4})/i);
  if (pm) pwd = pm[1];
  return { shareId: shareId, sharePwd: pwd };
}

function juheExtractSharePwd(text) {
  var m = String(text || '').match(/(?:提取码|访问码|取件码|密码|pwd)\s*[:：=]?\s*([A-Za-z0-9]{4})(?![A-Za-z0-9])/i);
  return m ? m[1] : '';
}

function juheAttachSharePwd(shareUrl, contextText) {
  shareUrl = String(shareUrl || '');
  if (!shareUrl) return shareUrl;
  var parsed = null;
  try { parsed = juheBaiduParse(shareUrl); } catch (e) { parsed = null; }
  if (parsed && parsed.sharePwd) return shareUrl;
  var pwd = juheExtractSharePwd(contextText);
  if (!pwd) return shareUrl;
  return shareUrl + (shareUrl.indexOf('#') >= 0 ? '&pwd=' + pwd : '#pwd=' + pwd);
}

// 详情页解析：只留百度分享（与旧版一致），三站选择器相同。
function juheParseDetail(html, site, params) {
  if (juheIsMaintenanceHtml(html)) {
    return { title: site.label + '[盘]', posterPath: '', backdropPath: '', description: '', lines: [] };
  }
  var $ = Widget.html.load(html);
  var title = juheCleanTitle($('.video-info h1, h1').first().text() || $("meta[property='og:title']").attr('content') || '');
  var poster = juheAbsUrl($('.lazyload, .lazyloaded, .module-item-pic img, img').first().attr('data-original')
    || $('.lazyload, .lazyloaded, .module-item-pic img, img').first().attr('data-src')
    || $('.lazyload, .lazyloaded, .module-item-pic img, img').first().attr('src')
    || $("meta[property='og:image']").attr('content') || '', site, params);
  var description = juheText($('.sqjj_a').first().text() || $('.zkjj_a').first().text() || $("meta[name='description']").attr('content') || '');
  var lines = [];
  var seen = {};
  $('.module-row-info').each(function (_, el) {
    var row = $(el);
    var lineTitle = juheText(row.find('.module-row-title h4').first().text());
    var cands = [
      juheText(row.find('.module-row-title p').first().text()),
      juheText(row.find('[data-clipboard-text]').first().attr('data-clipboard-text')),
      juheText(row.find('a.btn-down').first().attr('href'))
    ];
    var share = '';
    for (var ci = 0; ci < cands.length && !share; ci++) {
      if (/^https?:\/\//i.test(cands[ci])) share = cands[ci];
    }
    if (!share) {
      for (var cj = 0; cj < cands.length && !share; cj++) {
        var um = String(cands[cj]).match(/https?:\/\/[^\s"'<>]+/i);
        if (um) share = um[0];
      }
    }
    if (!share) share = cands[0] || cands[1] || cands[2] || '';
    if (!share) return;
    share = juheAttachSharePwd(share, row.text());
    if (!share || seen[share]) return;
    if (String(share).toLowerCase().indexOf('pan.baidu.com') < 0) return;
    seen[share] = true;
    lines.push({ title: lineTitle || title || site.label + '[盘]', shareUrl: share });
  });
  if (!lines.length) {
    $('.down-wrap a.down-card-url[href]').each(function (_, el) {
      var node = $(el);
      var share = juheText(node.attr('href') || '');
      if (!share) return;
      share = juheAttachSharePwd(share, node.closest('.down-wrap').text() || node.parent().text());
      if (!share || seen[share]) return;
      if (String(share).toLowerCase().indexOf('pan.baidu.com') < 0) return;
      if (!/\/s\/[\w-]+/.test(share)) return;
      seen[share] = true;
      lines.push({ title: title || site.label + '[盘]', shareUrl: share });
    });
  }
  if (!lines.length) {
    var linkRe = /(https?:\/\/pan\.baidu\.com\/[^\s"'<>]+)/ig;
    var m;
    while ((m = linkRe.exec(html))) {
      var shareUrl = m[1].replace(/&amp;/g, '&');
      var ctxStart = Math.max(0, m.index - 300);
      var ctxEnd = Math.min(html.length, m.index + m[0].length + 300);
      shareUrl = juheAttachSharePwd(shareUrl, String(html.slice(ctxStart, ctxEnd)).replace(/<[^>]+>/g, ' '));
      if (seen[shareUrl]) continue;
      seen[shareUrl] = true;
      lines.push({ title: title || site.label + '[盘]', shareUrl: shareUrl });
    }
  }
  return { title: title || site.label + '[盘]', posterPath: poster, backdropPath: poster, description: description, lines: lines };
}

// 把一行详情行转成引擎行：每站标题一行，分享在 read 时才解引用。
function juheRowFor(site, item, params) {
  return {
    id: site.key + ':' + item.link,
    cpSiteCardId: item.link,
    type: 'url',
    mediaType: 'movie',
    title: item.title,
    provider: 'baidu',
    posterPath: item.posterPath || '',
    backdropPath: item.backdropPath || '',
    description: item.description || '',
    link: DriveEngine.encode({
      action: 'detail', title: item.title, site: juheSiteHost(site, params),
      shares: [], siteRef: site.key + '|' + item.link
    })
  };
}

async function juheSearchRows(keyword, params, query) {
  keyword = juheText(keyword);
  if (!keyword) return [];
  var groups = await Promise.all(JUHE_SITES.map(function (site) {
    return juheSiteSearch(site, keyword, params).catch(function () { return []; });
  }));
  var rows = [];
  for (var si = 0; si < groups.length; si++) {
    var site = JUHE_SITES[si];
    var items = groups[si] || [];
    for (var ii = 0; ii < items.length; ii++) {
      var item = items[ii] || {};
      if (!item.title || !item.link) continue;
      if (query) {
        if (!DriveEngine.matchesSiteTitle(item.title, query)) continue;
        if (typeof item.year === 'number') {
          if (!await DriveEngine.prepareDirectoryIdentity(item.year, query)) continue;
        }
        // 年份未知时跳过年份校验（见文件头注释），只凭标题匹配。
      }
      rows.push(juheRowFor(site, item, params));
    }
  }
  return rows;
}

// discovery.read：按行里的 siteRef 回站抓详情，提出百度分享交给引擎。
async function juheReadRow(link) {
  var info = DriveEngine.decode(link);
  if (!info || !info.siteRef) return null;
  var bar = String(info.siteRef).indexOf('|');
  if (bar < 0) return null;
  var site = juheSiteByKey(String(info.siteRef).slice(0, bar));
  var detailUrl = String(info.siteRef).slice(bar + 1);
  if (!site || !detailUrl) return null;
  var html = '';
  try {
    html = await juheSiteFetch(detailUrl, {}, juheOrigin(detailUrl) + '/');
  } catch (e) {
    return null;
  }
  var detail = juheParseDetail(html, site, {});
  var shares = [];
  for (var i = 0; i < (detail.lines || []).length; i++) {
    var rawShare = detail.lines[i].shareUrl || '';
    if (!rawShare) continue;
    // 详情行里的分享常带尾巴文本（“ 提取码：abcd”），引擎 parseShare 只认干净 URL：
    // 先截出 URL 本体，提取码单独走 password 字段。
    var urlMatch = String(rawShare).match(/https?:\/\/[^\s"'<>]+/i);
    var cleanUrl = urlMatch ? urlMatch[0] : '';
    if (!cleanUrl) continue;
    var pwd = '';
    var qm = cleanUrl.match(/[?&#]pwd=([A-Za-z0-9]{4})/i);
    if (qm) pwd = qm[1];
    else {
      var tm = String(rawShare).match(/(?:提取码|访问码|取件码|密码|pwd)\s*[:：=]?\s*([A-Za-z0-9]{4})(?![A-Za-z0-9])/i);
      if (tm) pwd = tm[1];
    }
    var share = null;
    try {
      share = DriveEngine.parseShare({ url: cleanUrl, password: pwd ? pwd : undefined });
    } catch (e) { share = null; }
    if (!share || share.provider !== 'baidu') continue;
    shares.push(share);
  }
  if (!shares.length) return null;
  return { action: 'detail', title: detail.title || info.title, site: info.site, shares: shares };
}

function juheDiscovery(params) {
  var hosts = JUHE_SITES.map(function (site) { return juheSiteHost(site, params); });
  return {
    identity: 'juhe.baidu:v1:' + JSON.stringify(hosts),
    search: async function (query) {
      return juheSearchRows(query.keyword || query.title || query.seriesName || '', params, query);
    },
    read: async function (row) {
      return juheReadRow(row.link);
    }
  };
}

// 清晰度标签（旧版 sourceQualityConfig 的映射）：只定标题前缀，不做过滤。
function juheQualityLabel(params) {
  var value = juheText((params && (params.resourceCategory || params.quality_tag)) || '8k').toLowerCase();
  if (value === '4k') return '4K';
  if (value === '1080p' || value === '1080' || value === 'fhd') return '1080P';
  if (value === 'other' || value === 'others' || value === '其他' || value === '其它') return '其他';
  if (!value || value === '8k') return '8K';
  return value.toUpperCase();
}

// 给引擎返回的资源标题加清晰度前缀（旧版 cardName 的做法）；
// 不动 url/headers 等播放字段，已带前缀的不重复加。
function juheLabelResources(resources, params) {
  if (!Array.isArray(resources)) return resources;
  var label = juheQualityLabel(params);
  if (!label) return resources;
  for (var i = 0; i < resources.length; i++) {
    var item = resources[i];
    if (!item || typeof item !== 'object') continue;
    if (item.title && String(item.title).indexOf(label) !== 0) item.title = label + ' ' + item.title;
    if (item.name && String(item.name).indexOf(label) !== 0) item.name = label + ' ' + item.name;
  }
  return resources;
}

function juheLabelDetail(detail, params) {
  if (detail && Array.isArray(detail.episodeItems)) {
    juheLabelResources(detail.episodeItems, params);
  }
  return detail;
}

async function search(params) {
  params = params || {};
  params.credentialSource = 'local';
  DriveEngine.bind(params);
  var keyword = params.keyword || '';
  if (!juheText(keyword)) return [];
  return juheSearchRows(keyword, params, null);
}

async function loadDetail(input) {
  var params = typeof input === 'string' ? { link: input } : input || {};
  params.credentialSource = 'local';
  DriveEngine.bind(params);
  var link = params.link || '';
  if (!DriveEngine.isLink(link)) throw new Error('不支持的资源链接');
  var info = DriveEngine.decode(link);
  if (info && info.action === 'play') return juheLabelDetail(await DriveEngine.loadDetail(link), params);
  if (info && info.action === 'detail' && info.shares && info.shares.length) {
    return juheLabelDetail(await DriveEngine.loadDetail(link), params);
  }
  var detail = await juheReadRow(link);
  if (!detail || !detail.shares.length) {
    return { id: link, type: 'url', title: (info && info.title) || '', link: link, episodeItems: [] };
  }
  return juheLabelDetail(await DriveEngine.loadDetail(DriveEngine.encode(detail)), params);
}

async function loadResource(params) {
  params = params || {};
  params.credentialSource = 'local';
  DriveEngine.bind(params);
  if (DriveEngine.isLink(params.link)) return juheLabelResources(await DriveEngine.loadResource(params), params);
  return juheLabelResources(await DriveEngine.loadResource(params, juheDiscovery(params)), params);
}

async function clearRexCatalogCache() { return DriveEngine.clear(); }
