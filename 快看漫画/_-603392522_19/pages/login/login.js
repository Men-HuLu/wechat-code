var a = getApp(), t = require("../../util.js");

Page({
    data: {
        allowSubmit: !1,
        phone: "",
        password: "",
        canIUseNewLogin: wx.canIUse("button.open-type.getUserInfo")
    },
    onShow: function() {
        a.globalData.userCode || wx.login({
            success: function(t) {
                a.globalData.userCode = t.code;
            }
        });
    },
    handleInput: function(a) {
        var t = a.detail.value;
        a.target.id ? this.setData({
            phone: t
        }) : this.setData({
            password: t
        });
        var o = this.data.phone, e = this.data.password;
        this.setData({
            allowSubmit: !!o && !!e && 11 == o.length && e.length > 7
        });
    },
    handleLogin: function(a) {
        var o = this;
        this.beforeLogin();
        var e = a.detail.value;
        t.usLogin({
            phone: e.phone,
            password: e.password,
            callback: function(a) {
                o.afterLogin(a.data.user.id);
            }
        });
    },
    bindGetUserInfo: function(o) {
        var e = this;
        o.detail.userInfo ? (this.beforeLogin(), t.ajax({
            url: "/v1/passport/mini/wechat_signup",
            method: "POST",
            data: {
                code: a.globalData.userCode,
                data: JSON.stringify(o.detail)
            },
            callback: function(a) {
                e.afterLogin(a.data.id);
            }
        })) : (a.globalData.userInfo = null, t.usLogout(!1));
    },
    beforeLogin: function() {
        wx.showLoading({
            mask: !0
        }), t.usLogout(!1);
    },
    afterLogin: function(o) {
        t.checkLogin({
            app: a,
            uid: o,
            callback: function(t) {
                console.log(t), a.globalData.userInfo = t, a.globalData.userCode = "", a.afterLogin(a), 
                wx.hideLoading(), wx.navigateBack({
                    delta: 1
                });
            }
        });
    },
    switchEn: function() {
        var o = "", e = "", n = "", s = "";
        -1 == a.globalData.httpHead.indexOf("dcrmwsfbuikhru0") ? (o = a.globalData.hostList[2], 
        e = a.globalData.hostList[3], n = "stage", s = "测试") : (o = a.globalData.hostList[0], 
        e = a.globalData.hostList[1], n = "production", s = "正式"), a.globalData.httpHead = o, 
        a.globalData.httpSearch = e, wx.setStorageSync("environment", n), a.globalData.userInfo = null, 
        t.usLogout(), t.toast({
            title: "已切到" + s + "环境，需要主动选择登录方式",
            type: "success",
            mask: !0
        });
    }
});