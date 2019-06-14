function n(n, i) {
    if (!(n instanceof i)) throw new TypeError("Cannot call a class as a function");
}

var i = function() {
    function n(n, i) {
        for (var e = 0; e < i.length; e++) {
            var t = i[e];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(n, t.key, t);
        }
    }
    return function(i, e, t) {
        return e && n(i.prototype, e), t && n(i, t), i;
    };
}(), e = require("./config.js"), t = require("./sdk/sdk.min.js"), r = require("./sdk/cross-sdk.min.js"), o = function() {
    function e(i) {
        n(this, e), this.config = i, this.sdk = t, this.cross = r;
    }
    return i(e, [ {
        key: "init",
        value: function(n) {
            var i = this, e = Object.assign(this.config, n);
            this.sdk.init(e), this.sdk.onLogin(function() {
                var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                n = n || {}, i.cross.init(Object.assign({}, e, n.userSdk || {}));
            });
        }
    } ]), e;
}();

!function() {
    var n = new o(e);
    "undefined" != typeof module ? module.exports = n : "undefined" != typeof window && (window.hortor = n);
}();