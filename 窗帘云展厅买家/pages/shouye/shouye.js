function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../libs/userLogin.js")), n = a(require("../../utils/interface.js")), o = a(require("../../libs/ajax.js")), e = getApp(), i = require("../../wxParse/wxParse.js");

Page({
    data: {
        hasUid: !0,
        hasData: !1,
        allData: "",
        showPropaganda: !1,
        richtxt: "",
        noSuccess: !0,
        noSuccessMsg: "您已被禁用"
    },
    onLoad: function(a) {
        var t = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        }), void 0 != a.yqm && a.yqm ? e.globalData.yqm = a.yqm : e.globalData.yqm = "", 
        e.login(this, e, function() {
            console.log(e.globalData.uid, "--------------");
            var a = new o.default({
                reqtype: "GET",
                data: {
                    uid: e.globalData.uid
                },
                path: n.default.shouye
            });
            a.then(function(a) {
                if (console.log(a), 1 == a.hasVisit) t.setData({
                    allData: a,
                    hasData: !0
                }), wx.hideLoading(); else {
                    t.setData({
                        showPropaganda: !0,
                        richtxt: a.richtxt
                    });
                    var n = a.richtxt, o = t;
                    i.wxParse("richtxt", "html", n, o, 5), wx.hideLoading();
                }
            }), a.catch(function(a) {
                console.log(a);
            });
        });
    },
    userlogin: function() {
        wx.showLoading({
            title: "加载中..."
        }), t.default.loginClick(this);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        if (wx.hideShareMenu(), "share" == a.target.id) return {
            title: "测试details分享",
            path: "/pages/lanya/lanya?id=" + this.data.allData.data.id + "&share=1",
            success: function(a) {},
            fail: function(a) {}
        };
    },
    navigator: function(a) {
        console.log(a);
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../lanya/lanya?id=" + t + "&share=0"
        });
    },
    bindGetUserInfo: function(a) {
        if (console.log(a.detail.userInfo), !this.data.noSuccess) return wx.showToast({
            icon: "loading",
            title: this.data.noSuccessMsg
        }), !1;
        e.globalData.userInfo = a.detail.userInfo;
        var t = JSON.stringify(a.detail.userInfo), i = new o.default({
            data: {
                userInfo: t,
                uid: e.globalData.uid
            },
            path: n.default.userInfo
        });
        i.then(function(a) {
            0 == a.errcode ? null == a.data.shop_id ? wx.navigateTo({
                url: "../login/login"
            }) : wx.reLaunch({
                url: "../index/index"
            }) : wx.showToast({
                title: a.msg,
                icon: "loading"
            });
        }), i.catch(function(a) {
            console.log(a);
        });
    }
});