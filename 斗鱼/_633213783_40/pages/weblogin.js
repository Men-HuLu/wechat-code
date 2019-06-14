function o(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}

var t = o(require("../common/httpClient.js")), n = o(require("../common/tokenstorage")), a = getApp();

Page(function(o, t, n) {
    return t in o ? Object.defineProperty(o, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : o[t] = n, o;
}({
    data: {
        type: "",
        param: "",
        hosturl: "",
        did: ""
    },
    onLoad: function() {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onPageScroll: function() {},
    onTabItemTap: function() {},
    bindGetMsg: function(o) {
        var e = o.detail && o.detail.data, i = e && e[0] && e[0].code;
        a.globalData.isH5Logining = !0, i ? t.default.request({
            url: a.globalData.$SYS.authUrl + "/xcx/doLogin",
            method: "POST",
            data: {
                code: i
            }
        }).then(function(o) {
            if (o) if (0 === +o.error) {
                var t = o.data, e = t && t.short_token, i = t && t.long_token;
                e && (0, n.default)(e, i, null, !0);
            } else a.globalData.isH5Logining = !1, wx.showToast({
                title: o.data || "网络异常，请重试",
                icon: "none",
                duration: 2e3
            });
        }, function(o) {
            a.globalData.isH5Logining = !1, wx.showToast({
                title: o.data || "网络异常，请重试",
                icon: "none",
                duration: 2e3
            });
        }).catch(function(o) {
            a.globalData.isH5Logining = !1, console.log(o);
        }) : wx.showToast({
            title: "登录失败",
            icon: "none",
            duration: 2e3
        });
    }
}, "onLoad", function() {
    this.setData({
        type: a.getUrlParam("type"),
        param: a.getUrlParam("param"),
        hosturl: a.globalData.$SYS.authUrl || "https://passport.douyu.com",
        did: a.globalData.did
    });
}));