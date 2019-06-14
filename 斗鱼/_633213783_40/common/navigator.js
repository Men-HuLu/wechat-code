function e(e, i) {
    if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
    function e(e, i) {
        for (var t = 0; t < i.length; t++) {
            var n = i[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(i, t, n) {
        return t && e(i.prototype, t), n && e(i, n), i;
    };
}(), t = function() {
    function t() {
        var i = this;
        e(this, t), this.isClick = !0, this.navigateTo = function(e, i, t, n) {
            wx.navigateTo({
                url: e,
                success: i,
                fail: t,
                complete: n
            });
        }, this.disDoubleNavigate = function(e, t, n, c) {
            i.isClick && (i.isClick = !1, i.navigateTo(e, t, n, function() {
                i.isClick = !0, c && c();
            }));
        }, this.disDoubleRedirect = function(e, t, n, c) {
            i.isClick && (i.isClick = !1, i.redirect(e, t, n, function() {
                i.isClick = !0, c && c();
            }));
        };
    }
    return i(t, [ {
        key: "redirect",
        value: function(e, i, t, n) {
            wx.redirectTo({
                url: e,
                success: i,
                fail: t,
                complete: n
            });
        }
    } ]), t;
}();

exports.default = new t();