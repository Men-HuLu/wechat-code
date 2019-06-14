function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}();

exports.default = function() {
    var u = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    u = (0, i.mapState)(u), a = (0, i.mapActions)(a);
    var p = function() {
        var e = this;
        Object.keys(u).some(function(t) {
            return u[t].call(e) !== e[t];
        }) && this.$apply();
    };
    return function(i) {
        var s = i.prototype.onLoad, l = i.prototype.onUnload;
        return function(f) {
            function b() {
                e(this, b);
                var n = t(this, (b.__proto__ || Object.getPrototypeOf(b)).call(this));
                return c(n, u, a), n;
            }
            return n(b, i), r(b, [ {
                key: "onLoad",
                value: function() {
                    this.$unSubscribe = (0, o.getStore)().subscribe(p.bind(this)), s && s.apply(this, arguments);
                }
            }, {
                key: "onUnload",
                value: function() {
                    this.$unSubscribe && this.$unSubscribe(), l && l.apply(this, arguments);
                }
            } ]), b;
        }();
    };
};

var o = require("../store"), i = require("../helpers"), u = require("@/lib/util"), c = function(e, t, n) {
    var r = function(t, n) {
        var r = void 0;
        n ? (!e.computed && (e.computed = {}), r = e.computed) : r = e, Object.keys(t).forEach(function(e) {
            Object.prototype.hasOwnProperty.call(r, e) && (0, u.warn)("Wepy-redux connect warning : cover exists " + (n ? "computed" : "property") + " named " + e), 
            r[e] = t[e];
        });
    };
    r(t, !0), r(n);
};