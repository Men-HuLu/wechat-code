function r(r) {
    var a, h, e = "", c = 0;
    for (a = 0; a < r.length && r.charAt(a) != n; ++a) v = t.indexOf(r.charAt(a)), v < 0 || (0 == c ? (e += int2char(v >> 2), 
    h = 3 & v, c = 1) : 1 == c ? (e += int2char(h << 2 | v >> 4), h = 15 & v, c = 2) : 2 == c ? (e += int2char(h), 
    e += int2char(v >> 2), h = 3 & v, c = 3) : (e += int2char(h << 2 | v >> 4), e += int2char(15 & v), 
    c = 0));
    return 1 == c && (e += int2char(h << 2)), e;
}

var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = "=";

module.exports = {
    hex2b64: function(r) {
        var a, h, e = "";
        for (a = 0; a + 3 <= r.length; a += 3) h = parseInt(r.substring(a, a + 3), 16), 
        e += t.charAt(h >> 6) + t.charAt(63 & h);
        for (a + 1 == r.length ? (h = parseInt(r.substring(a, a + 1), 16), e += t.charAt(h << 2)) : a + 2 == r.length && (h = parseInt(r.substring(a, a + 2), 16), 
        e += t.charAt(h >> 2) + t.charAt((3 & h) << 4)); (3 & e.length) > 0; ) e += n;
        return e;
    },
    b64tohex: r,
    b64toBA: function(t) {
        var n, a = r(t), h = new Array();
        for (n = 0; 2 * n < a.length; ++n) h[n] = parseInt(a.substring(2 * n, 2 * n + 2), 16);
        return h;
    }
};