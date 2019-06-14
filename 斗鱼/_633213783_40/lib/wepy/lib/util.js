var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = "function" == typeof Symbol && "symbol" === t(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : t(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
};

exports.default = {
    $isEmpty: function(t) {
        return 0 === Object.keys(t).length;
    },
    $isEqual: function(t, r, n, o) {
        if (t === r) return 0 !== t || 1 / t == 1 / r;
        if (t !== t) return r !== r;
        if (!t || !r) return t === r;
        var i = void 0 === t ? "undefined" : e(t);
        return ("function" === i || "object" === i || "object" === (void 0 === r ? "undefined" : e(r))) && this.$isDeepEqual(t, r, n, o);
    },
    $isDeepEqual: function(t, r, n, o) {
        var i = this, c = toString.call(t);
        if (c !== toString.call(r)) return !1;
        switch (c) {
          case "[object RegExp]":
          case "[object String]":
            return "" + t == "" + r;

          case "[object Number]":
            return +t != +t ? +r != +r : 0 == +t ? 1 / +t == 1 / r : +t == +r;

          case "[object Date]":
          case "[object Boolean]":
            return +t == +r;

          case "[object Symbol]":
            var u = "undefined" != typeof Symbol ? Symbol.prototype : null;
            return u.valueOf.call(t) === u.valueOf.call(r);
        }
        var a = "[object Array]" === c;
        if (!a) {
            if ("object" !== (void 0 === t ? "undefined" : e(t)) || "object" !== (void 0 === r ? "undefined" : e(r))) return t === r;
            var l = t.constructor, f = r.constructor;
            if (l !== f && !("function" == typeof l && l instanceof l && "function" == typeof f && f instanceof f) && "constructor" in t && "constructor" in r) return !1;
        }
        n = n || [], o = o || [];
        for (var s = n.length; s--; ) if (n[s] === t) return o[s] === r;
        if (n.push(t), o.push(r), a) {
            if ((s = t.length) !== r.length) return !1;
            for (;s--; ) if (!i.$isEqual(t[s], r[s], n, o)) return !1;
        } else {
            var p, y = Object.keys(t);
            if (s = y.length, Object.keys(r).length !== s) return !1;
            for (;s--; ) if (p = y[s], !i.$has(r, p) || !i.$isEqual(t[p], r[p], n, o)) return !1;
        }
        return n.pop(), o.pop(), !0;
    },
    $has: function(t, e) {
        if ("[object Array]" !== toString.call(e)) return t && hasOwnProperty.call(t, e);
        for (var r = e.length, n = 0; n < r; n++) {
            var o = e[n];
            if (!t || !hasOwnProperty.call(t, o)) return !1;
            t = t[o];
        }
        return !!r;
    },
    $extend: function() {
        var t, r, n, o, i, c, u = arguments[0] || {}, a = 1, l = arguments.length, f = !1, s = this;
        for ("boolean" == typeof u && (f = u, u = arguments[a] || {}, a++), "object" !== (void 0 === u ? "undefined" : e(u)) && "function" != typeof u && (u = {}), 
        a === l && (u = this, a--); a < l; a++) if (t = arguments[a]) for (r in t) n = u[r], 
        u !== (o = t[r]) && (f && o && (s.$isPlainObject(o) || (i = Array.isArray(o))) ? (i ? (i = !1, 
        c = n && Array.isArray(n) ? n : []) : c = n && s.$isPlainObject(n) ? n : {}, u[r] = s.$extend(f, c, o)) : u[r] = o);
        return u;
    },
    $copy: function(t) {
        var r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return Array.isArray(t) ? this.$extend(r, [], t) : "" + t == "null" ? t : "object" === (void 0 === t ? "undefined" : e(t)) ? this.$extend(r, {}, t) : t;
    },
    $isPlainObject: function(t) {
        var e, r;
        return !(!t || "[object Object]" !== Object.prototype.toString.call(t)) && (!(e = Object.getPrototypeOf(t)) || "function" == typeof (r = Object.prototype.hasOwnProperty.call(e, "constructor") && e.constructor) && Object.prototype.hasOwnProperty.toString.call(r) === Object.prototype.hasOwnProperty.toString.call(Object));
    },
    $resolvePath: function(t, e) {
        if (!e) return t;
        if ("/" === e[0]) return e = e.substr(1), this.$resolvePath("", e);
        if ("." !== e[0]) return this.$resolvePath(t, "./" + e);
        var r = t.split("/");
        return "." === e[0] && "/" === e[1] ? "." !== (e = e.substr(2))[0] ? (r.length ? r[r.length - 1] = e : r = [ e ], 
        1 === r.length ? "/" + r[0] : r.join("/")) : this.$resolvePath(r.join("/"), e) : "." === e[0] && "." === e[1] && "/" === e[2] ? (e = e.replace(/^\.*/gi, ""), 
        r.pop(), this.$resolvePath(r.join("/"), "." + e)) : "." === e[0] ? this.$resolvePath(t, e.substr(1)) : void 0;
    },
    $getParams: function(t) {
        var e = {}, r = t.indexOf("?");
        if (-1 !== r) {
            var n = void 0;
            t.substr(r + 1).split("&").forEach(function(t) {
                n = t.split("="), e[n[0]] = decodeURIComponent(n[1]);
            });
        }
        return e;
    },
    hyphenate: function(t) {
        return t.replace(/([^-])([A-Z])/g, "$1-$2").replace(/([^-])([A-Z])/g, "$1-$2").toLowerCase();
    },
    camelize: function(t) {
        return t.replace(/-(\w)/g, function(t, e) {
            return e ? e.toUpperCase() : "";
        });
    }
};