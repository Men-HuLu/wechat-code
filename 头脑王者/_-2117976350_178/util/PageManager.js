function n(n, e) {
    if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function n(n, e) {
        for (var t = 0; t < e.length; t++) {
            var r = e[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(n, r.key, r);
        }
    }
    return function(e, t, r) {
        return t && n(e.prototype, t), r && n(e, r), e;
    };
}(), t = (require("../util/util.js"), function() {
    function t() {
        n(this, t);
    }
    return e(t, [ {
        key: "onShow",
        value: function(n) {}
    } ]), t;
}());

module.exports = new t();