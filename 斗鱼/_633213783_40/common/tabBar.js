function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

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
}(), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./storage")), r = function() {
    function r() {
        e(this, r);
    }
    return n(r, [ {
        key: "hideTabBarRedDotByStorage",
        value: function(e, n) {
            t.default.get("gameRecharged").then(function(e) {
                wx.hideTabBarRedDot({
                    index: 3
                });
            }, function() {});
        }
    } ]), r;
}();

exports.default = new r();