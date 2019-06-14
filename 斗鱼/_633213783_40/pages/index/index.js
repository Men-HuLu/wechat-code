var a = getApp();

Page({
    data: {
        motto: "Hello World",
        userInfo: {},
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo")
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: "../logs/logs"
        });
    },
    onLoad: function() {
        var o = this;
        a.globalData.a(), a.globalData.userInfo ? this.setData({
            userInfo: a.globalData.userInfo,
            hasUserInfo: !0
        }) : this.data.canIUse ? a.userInfoReadyCallback = function(a) {
            o.setData({
                userInfo: a.userInfo,
                hasUserInfo: !0
            });
        } : wx.getUserInfo({
            success: function(s) {
                a.globalData.userInfo = s.userInfo, o.setData({
                    userInfo: s.userInfo,
                    hasUserInfo: !0
                });
            }
        });
    },
    getUserInfo: function(o) {
        console.log(o), a.globalData.userInfo = o.detail.userInfo, this.setData({
            userInfo: o.detail.userInfo,
            hasUserInfo: !0
        });
    }
});