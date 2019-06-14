Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = require("./frame"), t = function(r, t) {
    if ("number" == typeof t) return r[t].value;
    for (var e = void 0, n = r.length, u = 0; u < n; u++) if (e = r[u], t === e.key) return e.value;
}, e = function(r) {
    for (var t = void 0, e = {}, n = 0, u = r.length; n < u; n++) e[(t = r[n]).key] = t.value;
    return e;
};

exports.default = {
    isArray: function(r) {
        var t = /\@\S\//g, e = r.match(t);
        return !(!e || 1 === e.length);
    },
    get: t,
    too: e,
    encode: function(t) {
        function e(r, t) {
            var e = "";
            e = r ? n(r) + "@=" : "", u += e + n(String(t)) + "/";
        }
        function n(r) {
            for (var t = "", e = 0, n = r.length; e < n; e++) "/" === r.charAt(e) ? t += "@S" : "@" === r.charAt(e) ? t += "@A" : t += r.charAt(e);
            return t;
        }
        var u = "";
        if ("object" === (0, r.type)(t)) {
            for (var a in t) e(a, t[a]);
            return u;
        }
        if ((0, r.isArray)(t)) {
            for (var o = 0, i = t.length; o < i; o++) e(t[o].name, t[o].value);
            return u;
        }
    },
    decode: function(r) {
        var n = /@=/g, u = [], a = function(r) {
            var t = [];
            "/" !== r.charAt(r.length - 1) && (r += "/");
            for (var e = void 0, n = "", u = "", a = 0, o = r.length; a < o; a++) "/" === r.charAt(a) ? (e = {
                key: n,
                value: u
            }, t.push(e), n = u = "") : "@" === r.charAt(a) ? (a++, "A" === r.charAt(a) ? u += "@" : "S" === r.charAt(a) ? u += "/" : "=" === r.charAt(a) && (n = u, 
            u = "")) : u += r.charAt(a);
            return t;
        };
        return (r = String(r)) && 1 === (u = a(r)).length && n.test(u[0].value) && (u = a(u[0].value)), 
        u.get = function(r) {
            return t(this, r);
        }, u.too = function() {
            return e(this);
        }, u;
    },
    toArray: function(r) {
        return r ? this.isArray(r) ? this.decode(r).map(function(r) {
            return r.value;
        }) : [ this.encode(this.decode(r).too()) ] : [];
    },
    encodeArray: function(r) {
        return r && 0 !== r.length ? this.encode(r.map(function(r) {
            return {
                name: "",
                value: r
            };
        })) : "";
    }
};