function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var a = n[t];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(n, t, a) {
        return t && e(n.prototype, t), a && e(n, a), n;
    };
}(), t = function() {
    function t(n) {
        e(this, t), this.page = n;
    }
    return n(t, [ {
        key: "shake",
        value: function(e) {}
    }, {
        key: "getDelFlag",
        value: function(e, n) {
            return Math.abs(e - n) >= 1;
        }
    }, {
        key: "resetInfo",
        value: function() {
            var e = this, n = {};
            n["shakeInfo.num"] = this.page.data.shakeInfo.num + 1, n["shakeInfo.enabled"] = !1, 
            this.page.setData(n), setTimeout(function() {
                n["shakeInfo.enabled"] = !0, e.page.setData(n);
            }, 1e3);
        }
    }, {
        key: "stop",
        value: function() {}
    } ]), t;
}();

module.exports = t;