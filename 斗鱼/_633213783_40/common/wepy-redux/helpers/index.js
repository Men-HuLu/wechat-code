function t(t) {
    return Array.isArray(t) ? t.map(function(t) {
        return {
            key: t,
            val: t
        };
    }) : Object.keys(t).map(function(e) {
        return {
            key: e,
            val: t[e]
        };
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.mapActions = exports.mapState = void 0;

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, r = require("../store");

exports.mapState = function(e) {
    var o = {};
    return t(e).forEach(function(t) {
        var e = t.key, n = t.val;
        o[e] = function() {
            var t = (0, r.getStore)().getState();
            return "function" == typeof n ? n.call(this, t) : t[n];
        };
    }), o;
}, exports.mapActions = function(o) {
    var n = {};
    return t(o).forEach(function(t) {
        var o = t.key, a = t.val;
        n[o] = function() {
            for (var t = (0, r.getStore)(), o = void 0, n = arguments.length, u = Array(n), i = 0; i < n; i++) u[i] = arguments[i];
            switch (void 0 === a ? "undefined" : e(a)) {
              case "string":
                o = {
                    type: a,
                    payload: u.length > 1 ? u : u[0]
                };
                break;

              case "function":
                o = a.apply(t, u);
                break;

              default:
                o = a;
            }
            return t.dispatch(o);
        };
    }), n;
};