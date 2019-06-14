function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = e(require("./event.js")), t = e(require("./util.js")), o = [ "onLoad", "onReady", "onShow", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom", "onShareAppMessage", "onPageScroll", "onTabItemTap" ], a = [ "onLaunch", "onShow", "onHide", "onError" ], r = function e(a, r, c) {
    r.$prefix = t.default.camelize(c || ""), Object.getOwnPropertyNames(r.components || {}).forEach(function(n) {
        var t = new (0, r.components[n])();
        t.$initMixins(), t.$name = n;
        var o = c ? c + t.$name + "$" : "$" + t.$name + "$";
        r.$com[n] = t, e(a, t, o);
    }), Object.getOwnPropertyNames(r.constructor.prototype || []).forEach(function(e) {
        "constructor" !== e && -1 === o.indexOf(e) && (a[e] = function() {
            r.constructor.prototype[e].apply(r, arguments), r.$apply();
        });
    });
    var i = Object.getOwnPropertyNames(r.methods || []);
    return r.$mixins.forEach(function(e) {
        i = i.concat(Object.getOwnPropertyNames(e.methods || []));
    }), i.forEach(function(e, t) {
        a[r.$prefix + e] = function(t) {
            for (var o = arguments.length, a = Array(o > 1 ? o - 1 : 0), c = 1; c < o; c++) a[c - 1] = arguments[c];
            var i = new n.default("system", this, t.type);
            i.$transfor(t);
            var p = [], s = 0, f = void 0, h = void 0, u = void 0;
            if (t.currentTarget && t.currentTarget.dataset) {
                for (f = t.currentTarget.dataset; void 0 !== f["wpy" + e.toLowerCase() + (h = String.fromCharCode(65 + s++))]; ) p.push(f["wpy" + e.toLowerCase() + h]);
                void 0 !== f.comIndex && (u = f.comIndex);
            }
            if (void 0 !== u) for (var $ = (u = ("" + u).split("-")).length, l = $; $-- > 0; ) {
                l = $;
                for (var d = r; l-- > 0; ) d = d.$parent;
                d.$setIndex(u.shift());
            }
            a = a.concat(p);
            var g = void 0, v = void 0, y = r.methods[e];
            return y && (g = y.apply(r, a.concat(i))), r.$mixins.forEach(function(n) {
                n.methods[e] && (v = n.methods[e].apply(r, a.concat(i)));
            }), r.$apply(), y ? g : v;
        };
    }), a;
};

exports.default = {
    $createApp: function(e, n) {
        var t = {}, r = new e();
        return this.$instance || (r.$init(this, n), this.$instance = r, this.$appConfig = n), 
        2 === arguments.length && !0 === arguments[1] && (t.$app = r), r.$wxapp = getApp(), 
        a = a.concat(n.appEvents || []), o = o.concat(n.pageEvents || []), a.forEach(function(e) {
            t[e] = function() {
                for (var n = arguments.length, t = Array(n), o = 0; o < n; o++) t[o] = arguments[o];
                var a = void 0;
                return !r.$wxapp && (r.$wxapp = getApp()), r[e] && (a = r[e].apply(r, t)), a;
            };
        }), t;
    },
    $createPage: function(e, n) {
        var t = this, a = {}, c = new e();
        return "string" == typeof n && (this.$instance.$pages["/" + n] = c), c.$initMixins(), 
        ("boolean" == typeof n && n || 3 === arguments.length && !0 === arguments[2]) && (a.$page = c), 
        a.onLoad = function() {
            for (var n = arguments.length, o = Array(n), a = 0; a < n; a++) o[a] = arguments[a];
            c.$name = e.name || "unnamed", c.$init(this, t.$instance, t.$instance);
            var r = t.$instance.__prevPage__, i = {};
            i.from = r || void 0, r && Object.keys(r.$preloadData).length > 0 && (i.preload = r.$preloadData, 
            r.$preloadData = {}), c.$prefetchData && Object.keys(c.$prefetchData).length > 0 && (i.prefetch = c.$prefetchData, 
            c.$prefetchData = {}), o.push(i), [].concat(c.$mixins, c).forEach(function(e) {
                e.onLoad && e.onLoad.apply(c, o);
            }), c.$apply();
        }, a.onShow = function() {
            for (var e = arguments.length, n = Array(e), o = 0; o < e; o++) n[o] = arguments[o];
            t.$instance.__prevPage__ = c, [].concat(c.$mixins, c).forEach(function(e) {
                e.onShow && e.onShow.apply(c, n);
            });
            var a = getCurrentPages(), r = a[a.length - 1].__route__, i = a[a.length - 1].__wxWebviewId__;
            t.$instance.__wxWebviewId__ !== i && (c.$wxpage = this, t.$instance.__route__ = r, 
            t.$instance.__wxWebviewId__ = i, [].concat(c.$mixins, c).forEach(function(e) {
                e.onRoute && e.onRoute.apply(c, n);
            })), c.$apply();
        }, o.forEach(function(e) {
            "onLoad" !== e && "onShow" !== e && (a[e] = function() {
                for (var n = arguments.length, t = Array(n), o = 0; o < n; o++) t[o] = arguments[o];
                var a = void 0;
                return "onShareAppMessage" === e ? (c[e] && (a = c[e].apply(c, t)), a) : ([].concat(c.$mixins, c).forEach(function(n) {
                    n[e] && n[e].apply(c, t);
                }), "onPageScroll" !== e && c.$apply(), a);
            });
        }), c.onShareAppMessage || delete a.onShareAppMessage, -1 === [].concat(c.$mixins, c).findIndex(function(e) {
            return e.onPageScroll;
        }) && delete a.onPageScroll, r(a, c, "");
    }
};