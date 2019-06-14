function t() {
    this.hexcase = 0, this.b64pad = "";
}

var r = t.prototype;

r.hex_md5 = function(t) {
    return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(t)));
}, r.b64_md5 = function(t) {
    return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(t)));
}, r.any_md5 = function(t, r) {
    return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(t)), r);
}, r.hex_hmac_md5 = function(t, r) {
    return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(r)));
}, r.b64_hmac_md5 = function(t, r) {
    return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(r)));
}, r.any_hmac_md5 = function(t, r, h) {
    return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(r)), h);
}, r.md5_vm_test = function() {
    return "900150983cd24fb0d6963f7d28e17f72" == this.hex_md5("abc").toLowerCase();
}, r.rstr_md5 = function(t) {
    return this.binl2rstr(this.binl_md5(this.rstr2binl(t), 8 * t.length));
}, r.rstr_hmac_md5 = function(t, r) {
    var h = this.rstr2binl(t);
    h.length > 16 && (h = this.binl_md5(h, 8 * t.length));
    for (var i = Array(16), s = Array(16), d = 0; d < 16; d++) i[d] = 909522486 ^ h[d], 
    s[d] = 1549556828 ^ h[d];
    var n = this.binl_md5(i.concat(this.rstr2binl(r)), 512 + 8 * r.length);
    return this.binl2rstr(this.binl_md5(s.concat(n), 640));
}, r.rstr2hex = function(t) {
    try {
        this.hexcase;
    } catch (t) {
        this.hexcase = 0;
    }
    for (var r, h = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef", i = "", s = 0; s < t.length; s++) r = t.charCodeAt(s), 
    i += h.charAt(r >>> 4 & 15) + h.charAt(15 & r);
    return i;
}, r.rstr2b64 = function(t) {
    try {
        this.b64pad;
    } catch (t) {
        this.b64pad = "";
    }
    for (var r = "", h = t.length, i = 0; i < h; i += 3) for (var s = t.charCodeAt(i) << 16 | (i + 1 < h ? t.charCodeAt(i + 1) << 8 : 0) | (i + 2 < h ? t.charCodeAt(i + 2) : 0), d = 0; d < 4; d++) 8 * i + 6 * d > 8 * t.length ? r += this.b64pad : r += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(s >>> 6 * (3 - d) & 63);
    return r;
}, r.rstr2any = function(t, r) {
    var h, i, s, d, n, _ = r.length, m = Array(Math.ceil(t.length / 2));
    for (h = 0; h < m.length; h++) m[h] = t.charCodeAt(2 * h) << 8 | t.charCodeAt(2 * h + 1);
    var f = Math.ceil(8 * t.length / (Math.log(r.length) / Math.log(2))), e = Array(f);
    for (i = 0; i < f; i++) {
        for (n = Array(), d = 0, h = 0; h < m.length; h++) d = (d << 16) + m[h], d -= (s = Math.floor(d / _)) * _, 
        (n.length > 0 || s > 0) && (n[n.length] = s);
        e[i] = d, m = n;
    }
    var a = "";
    for (h = e.length - 1; h >= 0; h--) a += r.charAt(e[h]);
    return a;
}, r.str2rstr_utf8 = function(t) {
    for (var r, h, i = "", s = -1; ++s < t.length; ) r = t.charCodeAt(s), h = s + 1 < t.length ? t.charCodeAt(s + 1) : 0, 
    55296 <= r && r <= 56319 && 56320 <= h && h <= 57343 && (r = 65536 + ((1023 & r) << 10) + (1023 & h), 
    s++), r <= 127 ? i += String.fromCharCode(r) : r <= 2047 ? i += String.fromCharCode(192 | r >>> 6 & 31, 128 | 63 & r) : r <= 65535 ? i += String.fromCharCode(224 | r >>> 12 & 15, 128 | r >>> 6 & 63, 128 | 63 & r) : r <= 2097151 && (i += String.fromCharCode(240 | r >>> 18 & 7, 128 | r >>> 12 & 63, 128 | r >>> 6 & 63, 128 | 63 & r));
    return i;
}, r.str2rstr_utf16le = function(t) {
    for (var r = "", h = 0; h < t.length; h++) r += String.fromCharCode(255 & t.charCodeAt(h), t.charCodeAt(h) >>> 8 & 255);
    return r;
}, r.str2rstr_utf16be = function(t) {
    for (var r = "", h = 0; h < t.length; h++) r += String.fromCharCode(t.charCodeAt(h) >>> 8 & 255, 255 & t.charCodeAt(h));
    return r;
}, r.rstr2binl = function(t) {
    for (var r = Array(t.length >> 2), h = 0; h < r.length; h++) r[h] = 0;
    for (h = 0; h < 8 * t.length; h += 8) r[h >> 5] |= (255 & t.charCodeAt(h / 8)) << h % 32;
    return r;
}, r.binl2rstr = function(t) {
    for (var r = "", h = 0; h < 32 * t.length; h += 8) r += String.fromCharCode(t[h >> 5] >>> h % 32 & 255);
    return r;
}, r.binl_md5 = function(t, r) {
    t[r >> 5] |= 128 << r % 32, t[14 + (r + 64 >>> 9 << 4)] = r;
    for (var h = 1732584193, i = -271733879, s = -1732584194, d = 271733878, n = 0; n < t.length; n += 16) {
        var _ = h, m = i, f = s, e = d;
        h = this.md5_ff(h, i, s, d, t[n + 0], 7, -680876936), d = this.md5_ff(d, h, i, s, t[n + 1], 12, -389564586), 
        s = this.md5_ff(s, d, h, i, t[n + 2], 17, 606105819), i = this.md5_ff(i, s, d, h, t[n + 3], 22, -1044525330), 
        h = this.md5_ff(h, i, s, d, t[n + 4], 7, -176418897), d = this.md5_ff(d, h, i, s, t[n + 5], 12, 1200080426), 
        s = this.md5_ff(s, d, h, i, t[n + 6], 17, -1473231341), i = this.md5_ff(i, s, d, h, t[n + 7], 22, -45705983), 
        h = this.md5_ff(h, i, s, d, t[n + 8], 7, 1770035416), d = this.md5_ff(d, h, i, s, t[n + 9], 12, -1958414417), 
        s = this.md5_ff(s, d, h, i, t[n + 10], 17, -42063), i = this.md5_ff(i, s, d, h, t[n + 11], 22, -1990404162), 
        h = this.md5_ff(h, i, s, d, t[n + 12], 7, 1804603682), d = this.md5_ff(d, h, i, s, t[n + 13], 12, -40341101), 
        s = this.md5_ff(s, d, h, i, t[n + 14], 17, -1502002290), i = this.md5_ff(i, s, d, h, t[n + 15], 22, 1236535329), 
        h = this.md5_gg(h, i, s, d, t[n + 1], 5, -165796510), d = this.md5_gg(d, h, i, s, t[n + 6], 9, -1069501632), 
        s = this.md5_gg(s, d, h, i, t[n + 11], 14, 643717713), i = this.md5_gg(i, s, d, h, t[n + 0], 20, -373897302), 
        h = this.md5_gg(h, i, s, d, t[n + 5], 5, -701558691), d = this.md5_gg(d, h, i, s, t[n + 10], 9, 38016083), 
        s = this.md5_gg(s, d, h, i, t[n + 15], 14, -660478335), i = this.md5_gg(i, s, d, h, t[n + 4], 20, -405537848), 
        h = this.md5_gg(h, i, s, d, t[n + 9], 5, 568446438), d = this.md5_gg(d, h, i, s, t[n + 14], 9, -1019803690), 
        s = this.md5_gg(s, d, h, i, t[n + 3], 14, -187363961), i = this.md5_gg(i, s, d, h, t[n + 8], 20, 1163531501), 
        h = this.md5_gg(h, i, s, d, t[n + 13], 5, -1444681467), d = this.md5_gg(d, h, i, s, t[n + 2], 9, -51403784), 
        s = this.md5_gg(s, d, h, i, t[n + 7], 14, 1735328473), i = this.md5_gg(i, s, d, h, t[n + 12], 20, -1926607734), 
        h = this.md5_hh(h, i, s, d, t[n + 5], 4, -378558), d = this.md5_hh(d, h, i, s, t[n + 8], 11, -2022574463), 
        s = this.md5_hh(s, d, h, i, t[n + 11], 16, 1839030562), i = this.md5_hh(i, s, d, h, t[n + 14], 23, -35309556), 
        h = this.md5_hh(h, i, s, d, t[n + 1], 4, -1530992060), d = this.md5_hh(d, h, i, s, t[n + 4], 11, 1272893353), 
        s = this.md5_hh(s, d, h, i, t[n + 7], 16, -155497632), i = this.md5_hh(i, s, d, h, t[n + 10], 23, -1094730640), 
        h = this.md5_hh(h, i, s, d, t[n + 13], 4, 681279174), d = this.md5_hh(d, h, i, s, t[n + 0], 11, -358537222), 
        s = this.md5_hh(s, d, h, i, t[n + 3], 16, -722521979), i = this.md5_hh(i, s, d, h, t[n + 6], 23, 76029189), 
        h = this.md5_hh(h, i, s, d, t[n + 9], 4, -640364487), d = this.md5_hh(d, h, i, s, t[n + 12], 11, -421815835), 
        s = this.md5_hh(s, d, h, i, t[n + 15], 16, 530742520), i = this.md5_hh(i, s, d, h, t[n + 2], 23, -995338651), 
        h = this.md5_ii(h, i, s, d, t[n + 0], 6, -198630844), d = this.md5_ii(d, h, i, s, t[n + 7], 10, 1126891415), 
        s = this.md5_ii(s, d, h, i, t[n + 14], 15, -1416354905), i = this.md5_ii(i, s, d, h, t[n + 5], 21, -57434055), 
        h = this.md5_ii(h, i, s, d, t[n + 12], 6, 1700485571), d = this.md5_ii(d, h, i, s, t[n + 3], 10, -1894986606), 
        s = this.md5_ii(s, d, h, i, t[n + 10], 15, -1051523), i = this.md5_ii(i, s, d, h, t[n + 1], 21, -2054922799), 
        h = this.md5_ii(h, i, s, d, t[n + 8], 6, 1873313359), d = this.md5_ii(d, h, i, s, t[n + 15], 10, -30611744), 
        s = this.md5_ii(s, d, h, i, t[n + 6], 15, -1560198380), i = this.md5_ii(i, s, d, h, t[n + 13], 21, 1309151649), 
        h = this.md5_ii(h, i, s, d, t[n + 4], 6, -145523070), d = this.md5_ii(d, h, i, s, t[n + 11], 10, -1120210379), 
        s = this.md5_ii(s, d, h, i, t[n + 2], 15, 718787259), i = this.md5_ii(i, s, d, h, t[n + 9], 21, -343485551), 
        h = this.safe_add(h, _), i = this.safe_add(i, m), s = this.safe_add(s, f), d = this.safe_add(d, e);
    }
    return [ h, i, s, d ];
}, r.md5_cmn = function(t, r, h, i, s, d) {
    return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(r, t), this.safe_add(i, d)), s), h);
}, r.md5_ff = function(t, r, h, i, s, d, n) {
    return this.md5_cmn(r & h | ~r & i, t, r, s, d, n);
}, r.md5_gg = function(t, r, h, i, s, d, n) {
    return this.md5_cmn(r & i | h & ~i, t, r, s, d, n);
}, r.md5_hh = function(t, r, h, i, s, d, n) {
    return this.md5_cmn(r ^ h ^ i, t, r, s, d, n);
}, r.md5_ii = function(t, r, h, i, s, d, n) {
    return this.md5_cmn(h ^ (r | ~i), t, r, s, d, n);
}, r.safe_add = function(t, r) {
    var h = (65535 & t) + (65535 & r);
    return (t >> 16) + (r >> 16) + (h >> 16) << 16 | 65535 & h;
}, r.bit_rol = function(t, r) {
    return t << r | t >>> 32 - r;
}, module.exports = new t();