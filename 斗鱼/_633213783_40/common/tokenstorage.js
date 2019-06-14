function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    var r = wx.getStorageSync("dyUserInfo") || {};
    "mycenter" !== a.getUrlParam("type") ? o.default.request({
        url: n.default.API.USER_INFO,
        method: "POST",
        data: {
            log_token: e,
            did: a.globalData.did
        }
    }).then(function(n) {
        if (n) if (0 === parseInt(n.code, 10)) {
            var o = n.data, a = o && o.username || "";
            wx.setStorageSync("dyUserInfo", Object.assign(r, {
                userName: a
            })), t && "function" == typeof t && t(e);
        } else wx.showToast({
            title: n.data || "网络异常",
            icon: "none",
            duration: 2e3
        });
    }).catch(function() {
        wx.showToast({
            title: "网络异常",
            icon: "none",
            duration: 2e3
        });
    }) : t && "function" == typeof t && t(e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = e(require("../config/index")), o = e(require("./httpClient")), a = getApp();

exports.default = function(e, n, o, r) {
    var i = e.uid;
    a.globalData.userInfo.uid = i;
    var d = e.biz_type, s = e.short_token, u = e.client_type, c = e.long_token_id, l = e.create_time, f = [ i, d, s, u, c ].join("_"), _ = wx.getStorageSync("dyUserInfo") || {};
    wx.setStorageSync("dyUserInfo", Object.assign(_, {
        uid: i,
        biz_type: d,
        short_token: s,
        client_type: u,
        long_token_id: c,
        localToken: f,
        tokenCreateTime: l,
        longToken: n
    })), r || t(f, o);
};