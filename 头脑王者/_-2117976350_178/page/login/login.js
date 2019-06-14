var o = require("./../../util/util.js"), n = require("./../../const/modeConsts.js"), e = getApp();

Page({
    data: {},
    onLoad: function(t) {
        o.showShareMenu(), console.log("[login] onLoad : ", t);
        var i = "头脑王者";
        if (n.RunMode != n.RunModeType.Prod && (i += n.RunMode), o.setNavigationBarTitle(i), 
        t.scene) {
            var s = decodeURIComponent(t.scene);
            e.mainData.loginArgs.friendCode = s;
        }
        e.enterOptions = t;
    },
    onReady: function() {},
    onShow: function() {
        if (console.log("[login] onShow"), !this.isShow) {
            this.isShow = !0;
            var n = wx.getSystemInfoSync();
            n && -1 == o.compareVersion(n.SDKVersion, "1.7.0") ? o.ShowConfirm("", "你的微信版本过低，请更新微信到最新版本。") : this.getSetting();
        }
    },
    login: function() {
        var o = this;
        e.uid ? this.redirectTo() : e.login(function(n) {
            n || o.redirectTo();
        });
    },
    getSetting: function() {
        var o = this;
        wx.getSetting && wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] ? o.login() : o.authorize();
            },
            fail: function() {
                o.setData({
                    loginBtnVisible: !0
                });
            }
        });
    },
    authorize: function() {
        var o = this;
        wx.authorize({
            scope: "scope.userInfo",
            success: function(n) {
                o.login(), console.log("success:", n);
            },
            fail: function(n) {
                o.setData({
                    loginBtnVisible: !0
                }), console.log("fail:", n);
            },
            complete: function(o) {
                console.log("[login] authorize complete:", o.errMsg);
            }
        });
    },
    onGetUserInfo: function(o) {
        console.log(o), "getUserInfo:ok" == o.detail.errMsg && this.login();
    },
    onTap: function(o) {
        console.log("click", o);
    },
    redirectTo: function() {
        wx.redirectTo({
            url: "/page/cover/cover",
            success: function() {},
            fail: function() {
                e.gotoCover();
            }
        });
    },
    onHide: function() {
        this.isShow = !1;
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(o) {
        var n = e.shareManager.getCompareShareData("login");
        return e.shareConf(n);
    }
});