WidgetMetadata = {
  id: "beabox",
  title: "BeaBox",
  version: "1.0.4",
  requiredVersion: "0.0.1",
  description: "BeaBox 短视频推荐流",
  author: "Coko",
  site: "https://bb520.gdifefl.cn",
  iconurl: "https://bb520.gdifefl.cn/logo.svg",
  detailCacheDuration: 0,
  globalParams: [],
  modules: [
    {
      id: "recommend",
      title: "推荐",
      functionName: "loadRecommend",
      type: "video",
      params: []
    },
    {
      id: "loadResource",
      title: "播放资源",
      functionName: "loadResource",
      type: "stream",
      cacheDuration: 0,
      params: []
    }
  ]
};

var BB_API = "https://48egbxgb.ewqder123.top";
var BB_IMG_PROXY = "https://beabox-img.100923.xyz/cover.jpg?u=";

function bbImgUrl(raw) {
  if (!raw) return "";
  if (raw.indexOf(".txt") === -1) return raw;
  return BB_IMG_PROXY + encodeURIComponent(raw);
}
var BB_REFERER = "https://bb520.gdifefl.cn/";
var BB_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) H5Shell/1.0 StartupCache/1";
var BB_HMAC_KEY = "WI97YnHXayLX82alQQP6jE177GQT3hLQ";
var BB_AES_KEY = "TtC1C5qYKoo6XXa3R3CjnlkDBnx9qN8U";
var BB_AES_IV = "0Va0bB39B55eMh6G";
var BB_RSA_N_HEX = "CEFDCEA9388F6B5A1856591037A259C990976DB1EB6DA819A9501B7E4BABC24CBBD392BDAB39B9C55F2C66EBBAEAB2FC1F07F0DF7E0DC020440566673DB82DADBFA9ECC31933C91CF61ACBCAF62869CDA1A616FCC58B4175F8E264E6F0A2FC8346AF8521E4CCF92C393E0933A9421D6EE2F825A2753467A5C2D2057C7A5F7765AC22123D1DEF90E1B8843CE7F75826E9D807970E3CA72604FB55A67D267A74C5B1053C5A96505507B2D222E0E77E7B070AD773408B53E50E66B854EDA3C9C8F8A88936770108C73B5322DBE396F1B2E1BF1589B26817B0B3054101182B2CDEAB81B6151AEBC826B733DF328120E106497148E12F618FFA87DB1A20C1F34F287D";
var BB_RSA_E = 65537;

function bbUtf8Encode(s) {
  var out = [];
  for (var i = 0; i < s.length; i++) {
    var c = s.charCodeAt(i);
    if (c < 0x80) {
      out.push(c);
    } else if (c < 0x800) {
      out.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
    } else if (c >= 0xd800 && c <= 0xdbff && i + 1 < s.length) {
      var c2 = s.charCodeAt(i + 1);
      if (c2 >= 0xdc00 && c2 <= 0xdfff) {
        var cp = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        out.push(0xf0 | (cp >> 18), 0x80 | ((cp >> 12) & 0x3f), 0x80 | ((cp >> 6) & 0x3f), 0x80 | (cp & 0x3f));
        i++;
      } else {
        out.push(0xef, 0xbf, 0xbd);
      }
    } else if (c >= 0xdc00 && c <= 0xdfff) {
      out.push(0xef, 0xbf, 0xbd);
    } else {
      out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
    }
  }
  return out;
}

function bbUtf8Decode(bytes) {
  var out = "";
  var i = 0;
  while (i < bytes.length) {
    var b = bytes[i];
    if (b < 0x80) {
      out += String.fromCharCode(b);
      i++;
    } else if ((b & 0xe0) === 0xc0) {
      out += String.fromCharCode(((b & 0x1f) << 6) | (bytes[i + 1] & 0x3f));
      i += 2;
    } else if ((b & 0xf0) === 0xe0) {
      out += String.fromCharCode(((b & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f));
      i += 3;
    } else if ((b & 0xf8) === 0xf0) {
      var cp = ((b & 0x07) << 18) | ((bytes[i + 1] & 0x3f) << 12) | ((bytes[i + 2] & 0x3f) << 6) | (bytes[i + 3] & 0x3f);
      cp -= 0x10000;
      out += String.fromCharCode(0xd800 + (cp >> 10), 0xdc00 + (cp & 0x3ff));
      i += 4;
    } else {
      i++;
    }
  }
  return out;
}

var BB_B64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function bbB64Encode(bytes) {
  var out = "";
  for (var i = 0; i < bytes.length; i += 3) {
    var b0 = bytes[i];
    var b1 = i + 1 < bytes.length ? bytes[i + 1] : 0;
    var b2 = i + 2 < bytes.length ? bytes[i + 2] : 0;
    out += BB_B64_CHARS[b0 >> 2];
    out += BB_B64_CHARS[((b0 & 3) << 4) | (b1 >> 4)];
    out += i + 1 < bytes.length ? BB_B64_CHARS[((b1 & 15) << 2) | (b2 >> 6)] : "=";
    out += i + 2 < bytes.length ? BB_B64_CHARS[b2 & 63] : "=";
  }
  return out;
}

function bbB64UrlEncode(bytes) {
  return bbB64Encode(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function bbB64UrlDecode(s) {
  var t = s.replace(/-/g, "+").replace(/_/g, "/");
  while (t.length % 4 !== 0) t += "=";
  var out = [];
  var rev = {};
  for (var i = 0; i < BB_B64_CHARS.length; i++) rev[BB_B64_CHARS[i]] = i;
  for (var j = 0; j < t.length; j += 4) {
    var v0 = rev[t[j]];
    var v1 = rev[t[j + 1]];
    var v2 = t[j + 2] === "=" ? 0 : rev[t[j + 2]];
    var v3 = t[j + 3] === "=" ? 0 : rev[t[j + 3]];
    out.push((v0 << 2) | (v1 >> 4));
    if (t[j + 2] !== "=") out.push(((v1 & 15) << 4) | (v2 >> 2));
    if (t[j + 3] !== "=") out.push(((v2 & 3) << 6) | v3);
  }
  return out;
}

function bbMd5(bytes) {
  function rl(n, c) { return (n << c) | (n >>> (32 - c)); }
  function add(x, y) {
    var l = (x & 0xffff) + (y & 0xffff);
    var m = (x >> 16) + (y >> 16) + (l >> 16);
    return (m << 16) | (l & 0xffff);
  }
  var K = [];
  for (var i = 0; i < 64; i++) K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296) | 0;
  var S = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
           5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
           4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
           6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];
  var msg = bytes.slice();
  var bitLen = bytes.length * 8;
  msg.push(0x80);
  while (msg.length % 64 !== 56) msg.push(0);
  for (var k = 0; k < 8; k++) msg.push((bitLen / Math.pow(2, k * 8)) & 0xff);
  var a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476;
  for (var off = 0; off < msg.length; off += 64) {
    var M = [];
    for (var j = 0; j < 16; j++) {
      M[j] = msg[off + j * 4] | (msg[off + j * 4 + 1] << 8) | (msg[off + j * 4 + 2] << 16) | (msg[off + j * 4 + 3] << 24);
    }
    var A = a0, B = b0, C = c0, D = d0;
    for (var t = 0; t < 64; t++) {
      var F, g;
      if (t < 16) { F = (B & C) | (~B & D); g = t; }
      else if (t < 32) { F = (D & B) | (~D & C); g = (5 * t + 1) % 16; }
      else if (t < 48) { F = B ^ C ^ D; g = (3 * t + 5) % 16; }
      else { F = C ^ (B | ~D); g = (7 * t) % 16; }
      var tmp = D;
      D = C;
      C = B;
      B = add(B, rl(add(add(A, F), add(K[t], M[g])), S[t]));
      A = tmp;
    }
    a0 = add(a0, A); b0 = add(b0, B); c0 = add(c0, C); d0 = add(d0, D);
  }
  var out = [];
  [a0, b0, c0, d0].forEach(function (w) {
    out.push(w & 0xff, (w >> 8) & 0xff, (w >> 16) & 0xff, (w >> 24) & 0xff);
  });
  return out;
}

function bbMd5Hex(s) {
  var bytes = typeof s === "string" ? bbUtf8Encode(s) : s;
  var dig = bbMd5(bytes);
  var hex = "";
  for (var i = 0; i < dig.length; i++) {
    var h = dig[i].toString(16);
    hex += h.length === 1 ? "0" + h : h;
  }
  return hex;
}

function bbHmacMd5(key, msg) {
  var kb = bbUtf8Encode(key);
  if (kb.length > 64) kb = bbMd5(kb);
  while (kb.length < 64) kb.push(0);
  var ipad = [], opad = [];
  for (var i = 0; i < 64; i++) {
    ipad.push(kb[i] ^ 0x36);
    opad.push(kb[i] ^ 0x5c);
  }
  var mb = bbUtf8Encode(msg);
  var inner = bbMd5(ipad.concat(mb));
  return bbMd5Hex(opad.concat(inner));
}

function bbRandomBytes(n) {
  var out = [];
  for (var i = 0; i < n; i++) out.push(Math.floor(Math.random() * 256));
  return out;
}

function bbUuid() {
  var b = bbRandomBytes(16);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  function hx(v) { var h = v.toString(16); return h.length === 1 ? "0" + h : h; }
  var s = "";
  for (var i = 0; i < 16; i++) s += hx(b[i]);
  return s.slice(0, 8) + "-" + s.slice(8, 12) + "-" + s.slice(12, 16) + "-" + s.slice(16, 20) + "-" + s.slice(20);
}

function bbNonceHex() {
  var b = bbRandomBytes(16);
  var s = "";
  for (var i = 0; i < b.length; i++) {
    var h = b[i].toString(16);
    s += h.length === 1 ? "0" + h : h;
  }
  return s;
}
function bbHexToBigInt(hex) {
  var v = 0n;
  for (var i = 0; i < hex.length; i++) {
    var d = parseInt(hex[i], 16);
    v = (v << 4n) | BigInt(d);
  }
  return v;
}

function bbBigIntToBytes(v, len) {
  var out = [];
  for (var i = len - 1; i >= 0; i--) {
    out.push(Number((v >> BigInt(i * 8)) & 0xffn));
  }
  return out;
}

function bbModPow(base, exp, mod) {
  var result = 1n;
  var b = base % mod;
  var e = exp;
  while (e > 0n) {
    if (e & 1n) result = (result * b) % mod;
    e >>= 1n;
    b = (b * b) % mod;
  }
  return result;
}

function bbRsaEncryptChunk(msgBytes) {
  var n = bbHexToBigInt(BB_RSA_N_HEX);
  var e = BigInt(BB_RSA_E);
  var k = 256;
  var psLen = k - msgBytes.length - 3;
  var ps = [];
  while (ps.length < psLen) {
    var r = Math.floor(Math.random() * 255) + 1;
    ps.push(r);
  }
  var em = [0x00, 0x02].concat(ps, [0x00], msgBytes);
  var m = 0n;
  for (var i = 0; i < em.length; i++) m = (m << 8n) | BigInt(em[i]);
  var c = bbModPow(m, e, n);
  return bbBigIntToBytes(c, k);
}

function bbRsaEncrypt(dataBytes) {
  var out = [];
  for (var off = 0; off < dataBytes.length; off += 245) {
    var chunk = dataBytes.slice(off, off + 245);
    out = out.concat(bbRsaEncryptChunk(chunk));
  }
  return bbB64UrlEncode(out);
}

var BB_AES_SBOX = [
  0x63,0x7c,0x77,0x7b,0xf2,0x6b,0x6f,0xc5,0x30,0x01,0x67,0x2b,0xfe,0xd7,0xab,0x76,
  0xca,0x82,0xc9,0x7d,0xfa,0x59,0x47,0xf0,0xad,0xd4,0xa2,0xaf,0x9c,0xa4,0x72,0xc0,
  0xb7,0xfd,0x93,0x26,0x36,0x3f,0xf7,0xcc,0x34,0xa5,0xe5,0xf1,0x71,0xd8,0x31,0x15,
  0x04,0xc7,0x23,0xc3,0x18,0x96,0x05,0x9a,0x07,0x12,0x80,0xe2,0xeb,0x27,0xb2,0x75,
  0x09,0x83,0x2c,0x1a,0x1b,0x6e,0x5a,0xa0,0x52,0x3b,0xd6,0xb3,0x29,0xe3,0x2f,0x84,
  0x53,0xd1,0x00,0xed,0x20,0xfc,0xb1,0x5b,0x6a,0xcb,0xbe,0x39,0x4a,0x4c,0x58,0xcf,
  0xd0,0xef,0xaa,0xfb,0x43,0x4d,0x33,0x85,0x45,0xf9,0x02,0x7f,0x50,0x3c,0x9f,0xa8,
  0x51,0xa3,0x40,0x8f,0x92,0x9d,0x38,0xf5,0xbc,0xb6,0xda,0x21,0x10,0xff,0xf3,0xd2,
  0xcd,0x0c,0x13,0xec,0x5f,0x97,0x44,0x17,0xc4,0xa7,0x7e,0x3d,0x64,0x5d,0x19,0x73,
  0x60,0x81,0x4f,0xdc,0x22,0x2a,0x90,0x88,0x46,0xee,0xb8,0x14,0xde,0x5e,0x0b,0xdb,
  0xe0,0x32,0x3a,0x0a,0x49,0x06,0x24,0x5c,0xc2,0xd3,0xac,0x62,0x91,0x95,0xe4,0x79,
  0xe7,0xc8,0x37,0x6d,0x8d,0xd5,0x4e,0xa9,0x6c,0x56,0xf4,0xea,0x65,0x7a,0xae,0x08,
  0xba,0x78,0x25,0x2e,0x1c,0xa6,0xb4,0xc6,0xe8,0xdd,0x74,0x1f,0x4b,0xbd,0x8b,0x8a,
  0x70,0x3e,0xb5,0x66,0x48,0x03,0xf6,0x0e,0x61,0x35,0x57,0xb9,0x86,0xc1,0x1d,0x9e,
  0xe1,0xf8,0x98,0x11,0x69,0xd9,0x8e,0x94,0x9b,0x1e,0x87,0xe9,0xce,0x55,0x28,0xdf,
  0x8c,0xa1,0x89,0x0d,0xbf,0xe6,0x42,0x68,0x41,0x99,0x2d,0x0f,0xb0,0x54,0xbb,0x16
];

var BB_AES_INV_SBOX = [
  0x52,0x09,0x6a,0xd5,0x30,0x36,0xa5,0x38,0xbf,0x40,0xa3,0x9e,0x81,0xf3,0xd7,0xfb,
  0x7c,0xe3,0x39,0x82,0x9b,0x2f,0xff,0x87,0x34,0x8e,0x43,0x44,0xc4,0xde,0xe9,0xcb,
  0x54,0x7b,0x94,0x32,0xa6,0xc2,0x23,0x3d,0xee,0x4c,0x95,0x0b,0x42,0xfa,0xc3,0x4e,
  0x08,0x2e,0xa1,0x66,0x28,0xd9,0x24,0xb2,0x76,0x5b,0xa2,0x49,0x6d,0x8b,0xd1,0x25,
  0x72,0xf8,0xf6,0x64,0x86,0x68,0x98,0x16,0xd4,0xa4,0x5c,0xcc,0x5d,0x65,0xb6,0x92,
  0x6c,0x70,0x48,0x50,0xfd,0xed,0xb9,0xda,0x5e,0x15,0x46,0x57,0xa7,0x8d,0x9d,0x84,
  0x90,0xd8,0xab,0x00,0x8c,0xbc,0xd3,0x0a,0xf7,0xe4,0x58,0x05,0xb8,0xb3,0x45,0x06,
  0xd0,0x2c,0x1e,0x8f,0xca,0x3f,0x0f,0x02,0xc1,0xaf,0xbd,0x03,0x01,0x13,0x8a,0x6b,
  0x3a,0x91,0x11,0x41,0x4f,0x67,0xdc,0xea,0x97,0xf2,0xcf,0xce,0xf0,0xb4,0xe6,0x73,
  0x96,0xac,0x74,0x22,0xe7,0xad,0x35,0x85,0xe2,0xf9,0x37,0xe8,0x1c,0x75,0xdf,0x6e,
  0x47,0xf1,0x1a,0x71,0x1d,0x29,0xc5,0x89,0x6f,0xb7,0x62,0x0e,0xaa,0x18,0xbe,0x1b,
  0xfc,0x56,0x3e,0x4b,0xc6,0xd2,0x79,0x20,0x9a,0xdb,0xc0,0xfe,0x78,0xcd,0x5a,0xf4,
  0x1f,0xdd,0xa8,0x33,0x88,0x07,0xc7,0x31,0xb1,0x12,0x10,0x59,0x27,0x80,0xec,0x5f,
  0x60,0x51,0x7f,0xa9,0x19,0xb5,0x4a,0x0d,0x2d,0xe5,0x7a,0x9f,0x93,0xc9,0x9c,0xef,
  0xa0,0xe0,0x3b,0x4d,0xae,0x2a,0xf5,0xb0,0xc8,0xeb,0xbb,0x3c,0x83,0x53,0x99,0x61,
  0x17,0x2b,0x04,0x7e,0xba,0x77,0xd6,0x26,0xe1,0x69,0x14,0x63,0x55,0x21,0x0c,0x7d
];

function bbAesGmul(a, b) {
  var p = 0;
  for (var i = 0; i < 8; i++) {
    if (b & 1) p ^= a;
    var hi = a & 0x80;
    a = (a << 1) & 0xff;
    if (hi) a ^= 0x1b;
    b >>= 1;
  }
  return p;
}

function bbAesExpandKey(keyBytes) {
  var Nk = 8, Nr = 14;
  var w = [];
  for (var i = 0; i < Nk; i++) {
    w[i] = [keyBytes[i * 4], keyBytes[i * 4 + 1], keyBytes[i * 4 + 2], keyBytes[i * 4 + 3]];
  }
  var rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d];
  for (var k = Nk; k < 4 * (Nr + 1); k++) {
    var temp = w[k - 1].slice();
    if (k % Nk === 0) {
      temp = [BB_AES_SBOX[temp[1]] ^ rcon[k / Nk - 1], BB_AES_SBOX[temp[2]], BB_AES_SBOX[temp[3]], BB_AES_SBOX[temp[0]]];
    } else if (Nk > 6 && k % Nk === 4) {
      temp = [BB_AES_SBOX[temp[0]], BB_AES_SBOX[temp[1]], BB_AES_SBOX[temp[2]], BB_AES_SBOX[temp[3]]];
    }
    w[k] = [];
    for (var j = 0; j < 4; j++) w[k][j] = w[k - Nk][j] ^ temp[j];
  }
  return w;
}

function bbAesDecryptBlock(block, w) {
  var Nr = 14;
  var state = [[], [], [], []];
  for (var c = 0; c < 4; c++) {
    for (var r = 0; r < 4; r++) state[r][c] = block[c * 4 + r];
  }
  function addRoundKey(round) {
    for (var cc = 0; cc < 4; cc++) {
      for (var rr = 0; rr < 4; rr++) state[rr][cc] ^= w[round * 4 + cc][rr];
    }
  }
  function invShiftRows() {
    for (var rr = 1; rr < 4; rr++) {
      var row = [state[rr][0], state[rr][1], state[rr][2], state[rr][3]];
      for (var cc = 0; cc < 4; cc++) state[rr][cc] = row[(cc - rr + 4) % 4];
    }
  }
  function invSubBytes() {
    for (var rr = 0; rr < 4; rr++) {
      for (var cc = 0; cc < 4; cc++) state[rr][cc] = BB_AES_INV_SBOX[state[rr][cc]];
    }
  }
  function invMixColumns() {
    for (var cc = 0; cc < 4; cc++) {
      var a0 = state[0][cc], a1 = state[1][cc], a2 = state[2][cc], a3 = state[3][cc];
      state[0][cc] = bbAesGmul(a0, 14) ^ bbAesGmul(a1, 11) ^ bbAesGmul(a2, 13) ^ bbAesGmul(a3, 9);
      state[1][cc] = bbAesGmul(a0, 9) ^ bbAesGmul(a1, 14) ^ bbAesGmul(a2, 11) ^ bbAesGmul(a3, 13);
      state[2][cc] = bbAesGmul(a0, 13) ^ bbAesGmul(a1, 9) ^ bbAesGmul(a2, 14) ^ bbAesGmul(a3, 11);
      state[3][cc] = bbAesGmul(a0, 11) ^ bbAesGmul(a1, 13) ^ bbAesGmul(a2, 9) ^ bbAesGmul(a3, 14);
    }
  }
  addRoundKey(Nr);
  for (var round = Nr - 1; round >= 1; round--) {
    invShiftRows();
    invSubBytes();
    addRoundKey(round);
    invMixColumns();
  }
  invShiftRows();
  invSubBytes();
  addRoundKey(0);
  var out = [];
  for (var cc = 0; cc < 4; cc++) {
    for (var rr = 0; rr < 4; rr++) out.push(state[rr][cc]);
  }
  return out;
}

function bbAesCbcDecrypt(cipherBytes, keyStr, ivStr) {
  var keyBytes = bbUtf8Encode(keyStr);
  var ivBytes = bbUtf8Encode(ivStr);
  var w = bbAesExpandKey(keyBytes);
  var out = [];
  var prev = ivBytes;
  for (var off = 0; off < cipherBytes.length; off += 16) {
    var block = cipherBytes.slice(off, off + 16);
    var dec = bbAesDecryptBlock(block, w);
    for (var i = 0; i < 16; i++) out.push(dec[i] ^ prev[i]);
    prev = block;
  }
  var pad = out[out.length - 1];
  if (pad >= 1 && pad <= 16) out = out.slice(0, out.length - pad);
  return out;
}
function bbStoreGet(key) {
  try {
    var v = Widget.storage.get(key);
    if (v === null || v === undefined) return "";
    if (typeof v === "string") return v;
    if (v && typeof v.then === "function") return "";
    return String(v);
  } catch (e) {
    return "";
  }
}

function bbStoreSet(key, val) {
  try {
    Widget.storage.set(key, val);
  } catch (e) {}
}

function bbDeviceId() {
  var id = bbStoreGet("beabox_device_id");
  if (!id) {
    id = bbUuid();
    bbStoreSet("beabox_device_id", id);
  }
  return id;
}

function bbSessionId() {
  var id = bbStoreGet("beabox_session_id");
  var ts = parseInt(bbStoreGet("beabox_session_ts") || "0", 10);
  var now = Date.now();
  if (!id || !ts || now - ts > 3600000) {
    id = bbUuid();
    bbStoreSet("beabox_session_id", id);
    bbStoreSet("beabox_session_ts", String(now));
  }
  return id;
}

function bbSignParams(params) {
  var p = {};
  for (var k in params) p[k] = params[k];
  p.timestamp = Date.now();
  p.nonce = bbNonceHex();
  var json = JSON.stringify(p);
  var pack = bbRsaEncrypt(bbUtf8Encode(json));
  var signature = bbHmacMd5(BB_HMAC_KEY, pack);
  return { pack: pack, signature: signature };
}

function bbHeaders() {
  var did = bbDeviceId();
  var sid = bbSessionId();
  return {
    "encrypt": "true",
    "Accept-Language": "cn",
    "X-Client-Version": "2002",
    "X-Api-Version": "v3",
    "Device-Id": did,
    "uuid": did,
    "x-session-id": sid,
    "Referer": BB_REFERER,
    "User-Agent": BB_UA
  };
}

async function bbApiGet(path, params) {
  var signed = bbSignParams(params || {});
  var url = BB_API + path + "?pack=" + encodeURIComponent(signed.pack) + "&signature=" + signed.signature;
  var resp = await Widget.http.get(url, { headers: bbHeaders() });
  if (resp === null || resp === undefined) return null;
  var body = resp;
  if (typeof resp === "object") {
    if (resp.data !== undefined) body = resp.data;
    else if (resp.body !== undefined) body = resp.body;
  }
  var text = typeof body === "string" ? body : JSON.stringify(body);
  var outer;
  try {
    outer = JSON.parse(text);
  } catch (e) {
    return null;
  }
  if (outer === null || outer === undefined) return null;
  if (typeof outer.data === "string" && outer.data.length > 0) {
    var cipher = bbB64UrlDecode(outer.data);
    var plain = bbAesCbcDecrypt(cipher, BB_AES_KEY, BB_AES_IV);
    var json = bbUtf8Decode(plain);
    try {
      var inner = JSON.parse(json);
      if (inner && inner.data !== undefined) return inner.data;
      return inner;
    } catch (e) {
      return null;
    }
  }
  if (outer.data !== undefined) return outer.data;
  return outer;
}

function bbCacheUrls(items) {
  var raw = bbStoreGet("beabox_urls");
  var cache = {};
  try {
    if (raw) cache = JSON.parse(raw);
  } catch (e) {
    cache = {};
  }
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    if (!it || !it.post_id) continue;
    var files = it.files || [];
    var f0 = files.length ? files[0] : null;
    if (!f0) continue;
    cache[it.post_id] = {
      download: f0.downloadURL || "",
      resource: f0.resourceURL || "",
      duration: f0.duration || 0
    };
  }
  var keys = Object.keys(cache);
  if (keys.length > 300) {
    var trimmed = {};
    for (var j = keys.length - 300; j < keys.length; j++) trimmed[keys[j]] = cache[keys[j]];
    cache = trimmed;
  }
  bbStoreSet("beabox_urls", JSON.stringify(cache));
}

function bbCachedUrl(postId) {
  var raw = bbStoreGet("beabox_urls");
  if (!raw) return null;
  var cache;
  try {
    cache = JSON.parse(raw);
  } catch (e) {
    return null;
  }
  var entry = cache[postId];
  if (!entry) return null;
  return entry.download || entry.resource || null;
}

function bbItemFromPost(p) {
  if (!p || p.file_type !== "video") return null;
  var files = p.files || [];
  if (!files.length) return null;
  var f0 = files[0];
  if (!f0) return null;
  var cover = "";
  var w = 0, h = 0;
  if (p.recommend_cover && p.recommend_cover.url) {
    cover = p.recommend_cover.url;
    w = p.recommend_cover.width || 0;
    h = p.recommend_cover.height || 0;
  } else if (p.preview_image) {
    cover = p.preview_image;
  } else if (f0.thumbnail) {
    cover = f0.thumbnail;
  }
  if (!w || !h) {
    w = f0.width || 0;
    h = f0.height || 0;
  }
  var item = {
    id: "beabox:" + p.post_id,
    type: "video",
    title: p.title || "",
    link: "beabox:" + p.post_id,
    duration: f0.duration || 0
  };
  if (p.user && p.user.nickname) item.description = p.user.nickname;
  if (cover) {
    cover = bbImgUrl(cover);
    if (h > w) {
      item.posterPath = cover;
    } else {
      item.coverUrl = cover;
      item.backdropPath = cover;
    }
  }
  return item;
}

function bbFeedToItems(data) {
  var list = [];
  if (!data) return list;
  if (data.list && Array.isArray(data.list)) list = data.list;
  else if (Array.isArray(data)) list = data;
  else if (data.posts && Array.isArray(data.posts)) list = data.posts;
  var seen = {};
  var out = [];
  for (var i = 0; i < list.length; i++) {
    var p = list[i];
    if (!p || !p.post_id) continue;
    if (seen[p.post_id]) continue;
    seen[p.post_id] = true;
    var item = bbItemFromPost(p);
    if (item) out.push(item);
  }
  bbCacheUrls(list);
  return { items: out, requestId: data.request_id || "", sessionId: data.session_id || "" };
}
async function loadRecommend(params) {
  var page = 1;
  if (params && params.page) page = parseInt(params.page, 10) || 1;
  if (page <= 1) {
    var data = await bbApiGet("/api/v2/feed", { count: 20 });
    if (!data) return [];
    var res = bbFeedToItems(data);
    if (res.requestId) bbStoreSet("beabox_request_id", res.requestId);
    return res.items;
  }
  var rid = bbStoreGet("beabox_request_id");
  if (!rid) {
    var d0 = await bbApiGet("/api/v2/feed", { count: 20 });
    if (!d0) return [];
    var r0 = bbFeedToItems(d0);
    if (r0.requestId) bbStoreSet("beabox_request_id", r0.requestId);
    return r0.items;
  }
  var data = await bbApiGet("/api/v2/feed/next", { request_id: rid, count: 20 });
  if (!data) return [];
  var res = bbFeedToItems(data);
  return res.items;
}

async function loadDetail(link) {
  var postId = "";
  if (typeof link === "string") {
    var m = link.match(/beabox:(.+)$/);
    if (m) postId = m[1];
    else postId = link;
  }
  if (!postId) throw new Error("无法识别的详情链接: " + link);
  var url = bbCachedUrl(postId);
  var item = {
    id: "beabox:" + postId,
    type: "video",
    title: "",
    link: "beabox:" + postId
  };
  return item;
}

async function loadResource(params) {
  var postId = "";
  var link = "";
  if (params) {
    if (params.id) {
      var m = String(params.id).match(/beabox:(.+)$/);
      if (m) postId = m[1];
    }
    if (!postId && params.link) {
      var m2 = String(params.link).match(/beabox:(.+)$/);
      if (m2) postId = m2[1];
    }
    if (params.link) link = String(params.link);
  }
  if (!postId && link) postId = link;
  if (!postId) return [];
  var url = bbCachedUrl(postId);
  if (!url) {
    var data = await bbApiGet("/api/v2/feed", { count: 20 });
    if (data) {
      bbFeedToItems(data);
      url = bbCachedUrl(postId);
    }
  }
  if (!url) return [];
  return [{ url: url, playerType: "system" }];
}
