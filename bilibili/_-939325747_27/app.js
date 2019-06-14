require("./utils/ald-stat.js");

App({
    onLaunch: function(n) {
        var o = this, e = wx.getStorageSync("logs") || [];
        e.unshift(Date.now()), wx.setStorageSync("logs", e), wx.login({
            success: function(n) {}
        }), wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(n) {
                        o.globalData.userInfo = n.userInfo, o.userInfoReadyCallback && o.userInfoReadyCallback(n);
                    }
                });
            }
        }), this.globalData.wx_uid = Number(Math.random().toString().substr(3, 5) + Date.now()).toString(36), 
        wx.getSystemInfo({
            success: function(n) {
                console.log("ddd", n), o.globalData.navBarHt = n.statusBarHeight + 46, o.deviceCheckNotch(n.model);
            },
            fail: function(n) {
                console.log(n);
            }
        });
    },
    onShow: function(n) {
        console.log("onLaunch场景值", n.scene), -1 == [ 1036, 1069 ].indexOf(n.scene) ? wx.setStorageSync("openApp", !1) : wx.setStorageSync("openApp", !0);
    },
    deviceCheckNotch: function(n) {
        for (var o = [ "iPhone X", "MI 8", "MI 8 SE", "PADM00", "Nokia X6", "ONEPLUS A6000", "CLT-AL00", "iPhone XS Max", "iPhone XS", "iPhone XR", "unknown<iPhone11,2>", "unknown<iPhone11,8>" ], e = 0; e < o.length; e++) if (n.indexOf(o[e]) > -1) return void (this.globalData.isNotch = !0);
        this.globalData.isNotch = !1;
    },
    globalData: {
        userInfo: null,
        ip: "https://api.bilibili.com",
        isPlayId: "",
        scene: 1,
        wx_uid: 0,
        navBarHt: "",
        isNotch: !1
    }
});