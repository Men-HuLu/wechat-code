function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t;
    };
}(), a = e(require("./httpClient")), o = e(require("./navigator")), i = e(require("../config/index")), r = (getApp(), 
function() {
    function e() {
        t(this, e);
    }
    return n(e, [ {
        key: "getPopupRecommend",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = arguments[2];
            a.default.request({
                url: i.default.API.RESOURCE_POPUP,
                method: "GET",
                data: {
                    type: e,
                    aid: t
                }
            }).then(function(e) {
                var t = void 0;
                if (e && 0 === e.error && n && "function" == typeof n) {
                    var a = e.data;
                    t = a.id ? {
                        zyId: a.id,
                        title: a.title,
                        cancelText: a.cancel_button,
                        confirmText: a.confirm_button,
                        imgUrl: a.img,
                        jumpType: a.jump_type,
                        jumpContent: a.jump_content
                    } : null;
                }
                n && n(t);
            }).catch(function() {
                n && n(), wx.showToast({
                    title: "网络异常",
                    icon: "none",
                    duration: 2e3
                });
            });
        }
    }, {
        key: "gotoRecommend",
        value: function(e, t) {
            if (1 === e) o.default.disDoubleNavigate(t); else if (2 === e) o.default.disDoubleNavigate("web?url=" + t); else if (3 === e) {
                var n = t.split(";");
                this.goMiniProgram({
                    appId: n[0] || "",
                    path: n[1] || ""
                });
            }
        }
    }, {
        key: "goMiniProgram",
        value: function(e) {
            wx.navigateToMiniProgram({
                appId: e.appId,
                path: e.path,
                extraData: e.extraData || null,
                envVersion: "release",
                success: function(e) {},
                fail: function(e) {}
            });
        }
    }, {
        key: "getActivityRecommend",
        value: function(e, t) {
            a.default.request({
                url: i.default.API.ACTIVITY_LIST,
                method: "GET",
                data: {
                    page: e
                }
            }).then(function(e) {
                var n = void 0;
                if (e && 0 === e.code) {
                    var a = e.data.filter(function(e) {
                        return 1 == e.recom;
                    });
                    if (a.length >= 1) {
                        var o = a[Math.floor(Math.random() * a.length)];
                        n = {
                            imgUrl: o.recom_banner,
                            jumpType: o.jump_type,
                            jumpContent: o.jump_url
                        };
                    }
                }
                t && t(n);
            }).catch(function() {
                t && t(), wx.showToast({
                    title: "网络异常",
                    icon: "none",
                    duration: 2e3
                });
            });
        }
    } ]), e;
}());

exports.default = new r();