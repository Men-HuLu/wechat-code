var t = require("../lib/config.js").host, e = require("./util.js"), n = getApp().globalData, a = function(t, e) {
    return new Promise(function(n, a) {
        t(Object.assign(e, {
            success: function(t) {
                return n(t);
            },
            fail: function(t) {
                return a(t);
            }
        }));
    });
}, i = function() {
    return a(wx.operateWXData, {
        apiName: "getGetPasskey"
    }).then(function(t) {
        return JSON.parse(t.rawData);
    });
}, r = function(e, n, i, r) {
    var o = t + "/wxaweb/wxapoipage" + "?action=insert_history&uin=" + e + "&key=" + n + "&pass_ticket=" + i + "&appid=" + r;
    return a(wx.request, {
        url: o
    }).then(function(t) {
        return t;
    });
};

module.exports = {
    getKey: i,
    getPoiList: function(e, n, i, r) {
        var o = t + "/wxaweb/wxapoipage?action=get_list&uin=" + e + "&key=" + n + "&pass_ticket=" + i + "&data=" + JSON.stringify(r);
        return a(wx.request, {
            url: o
        }).then(function(t) {
            return t.data;
        });
    },
    getPoiDetail: function(e, n, i, r) {
        var o = t + "/wxaweb/wxapoipage?action=get_detail&uin=" + e + "&key=" + n + "&pass_ticket=" + i + "&data=" + JSON.stringify(r);
        return a(wx.request, {
            url: o
        }).then(function(t) {
            return t.data;
        });
    },
    insertHistory: r,
    get: function(t) {
        t.method = "GET", t.header = t.header || {
            "content-type": "application/json"
        }, wx.request(t);
    },
    post: function(t) {
        t.method = "POST", t.header = t.header || {
            "content-type": "application/x-www-form-urlencoded"
        }, wx.request(t);
    },
    enterContact: function(t) {
        if (wx.enterContact) {
            var a = n.SDKVersion;
            e.compareVersion(a, "2.4.1") >= 0 ? (i().then(function(e) {
                var n = e.uin, a = e.passkey, i = e.pass_ticket;
                r(n, a, i, t.appId);
            }), console.log("enterContact local", t), wx.enterContact(t)) : (console.log("enterContact transzition", t), 
            wx.navigateToMiniProgram({
                appId: t.appId,
                path: "/pages/transitionPage/transitionPage?customer=" + encodeURIComponent(JSON.stringify(t)),
                scene: 1026
            }));
        }
    }
};