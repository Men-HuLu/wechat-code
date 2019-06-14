function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var n = t[o];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, o, n) {
        return o && e(t.prototype, o), n && e(t, n), t;
    };
}(), o = getApp(), n = function() {
    function n() {
        e(this, n);
    }
    return t(n, [ {
        key: "gotoLogin",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            wx.showActionSheet({
                itemList: [ "微信一键登录", "斗鱼帐号登录" ],
                success: function(o) {
                    var n = o.tapIndex;
                    0 === n ? "mycenter" === e ? wx.navigateTo({
                        url: "wxauthorization?type=" + e + "&param=" + t
                    }) : wx.redirectTo({
                        url: "wxauthorization?type=" + e + "&param=" + t
                    }) : 1 === n && ("mycenter" === e ? wx.navigateTo({
                        url: "weblogin?type=" + e + "&param=" + t
                    }) : wx.redirectTo({
                        url: "weblogin?type=" + e + "&param=" + t
                    }));
                },
                fail: function(e) {
                    console.log(e.errMsg);
                }
            });
        }
    }, {
        key: "checkBoundDYAccount",
        value: function(e, t, n) {
            var a = wx.getStorageSync("dyUserInfo") || {}, r = a && a.localToken || "";
            o.globalData.isComplete || (o.globalData.isComplete = !0, r ? (n(r), o.globalData.isComplete = !1) : (o.globalData.isComplete = !1, 
            this.gotoLogin(e, t)));
        }
    } ]), n;
}();

exports.default = new n();