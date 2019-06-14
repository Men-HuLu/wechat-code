function e(e, r) {
    var t = 0, o = e[0], c = e[1], a = 3337565984, i = r[0], l = r[1], n = r[2], s = r[3];
    for (t = 0; t < 32; t++) o -= ((c -= (o << 4) + n ^ o + a ^ (o >>> 5) + s) << 4) + i ^ c + a ^ (c >>> 5) + l, 
    a -= 2654435769;
    return e[0] = o, e[1] = c, e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    impTeaDecrypt: e,
    teaDecrypt: function(r, t) {
        for (var o = Math.floor(r.length / 2), c = r.slice(0), a = 0; a < o; a++) {
            var i = e(r.slice(2 * a, 2 * a + 2), t.slice(4 * a % 8, 4 * a % 8 + 4));
            c[2 * a + 0] = i[0], c[2 * a + 1] = i[1];
        }
        return c;
    }
};