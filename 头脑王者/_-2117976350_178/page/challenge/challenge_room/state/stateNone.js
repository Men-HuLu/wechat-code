function n(n, e) {
    if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function n(n, e) {
        for (var t = 0; t < e.length; t++) {
            var a = e[t];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(n, a.key, a);
        }
    }
    return function(e, t, a) {
        return t && n(e.prototype, t), a && n(e, a), e;
    };
}(), t = function() {
    function t(e) {
        n(this, t), this.page = e, this.name = "StateNone";
    }
    return e(t, [ {
        key: "init",
        value: function() {}
    }, {
        key: "onShow",
        value: function() {}
    }, {
        key: "update",
        value: function(n) {}
    }, {
        key: "clearData",
        value: function() {}
    }, {
        key: "end",
        value: function(n) {}
    } ]), t;
}();

module.exports = t;