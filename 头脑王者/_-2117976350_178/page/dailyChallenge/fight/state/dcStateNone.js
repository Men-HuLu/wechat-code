function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var r = n[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(n, t, r) {
        return t && e(n.prototype, t), r && e(n, r), n;
    };
}(), t = function() {
    function t(n) {
        e(this, t), this.page = n, this.name = "StateNone";
    }
    return n(t, [ {
        key: "start",
        value: function() {}
    }, {
        key: "update",
        value: function(e) {}
    }, {
        key: "end",
        value: function(e) {}
    } ]), t;
}();

module.exports = t;