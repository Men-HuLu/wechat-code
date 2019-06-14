var t = require("./util.js");

App({
    globalData: {
        httpHead: "",
        httpSearch: "",
        hostList: [ "https://api.kkmh.com", "https://search.kkmh.com", "https://dcrmwsfbuikhru0.quickcan.com", "https://dcrmwsfbuikhru0.quickcan.com" ],
        shareTit: "好看到哭的漫画，就在快看",
        version: "2.2.4",
        navbarHeight: 44,
        systemInfo: null,
        userInfo: null,
        userCode: "",
        loginedFlag: !1,
        loginedCallback: null,
        bubble: null,
        bubbleTap: !1,
        bubbleFlag: !1,
        bubbledCallback: null,
        reddotCallback: null,
        showFlag: 0,
        readSetting: !1
    },
    onLaunch: function() {
        var a = this, o = wx.getStorageSync("environment");
        o && "stage" === o ? (this.globalData.httpHead = this.globalData.hostList[2], this.globalData.httpSearch = this.globalData.hostList[3]) : (this.globalData.httpHead = this.globalData.hostList[0], 
        this.globalData.httpSearch = this.globalData.hostList[1]), t.getSystemInfo(function(t) {
            a.globalData.systemInfo = t;
        }), t.startCount(), this.initLogin(this);
    },
    onShow: function() {
        console.log("app.js ---onShow---"), this.globalData.showFlag && this.globalData.userInfo && t.getReddot(), 
        this.globalData.showFlag++;
    },
    onHide: function() {
        console.log("app.js ---onHide---");
    },
    onError: function(t) {
        console.log("app.js ---onError---" + t);
    },
    initLogin: function(a) {
        var o = a || getApp();
        wx.getStorage({
            key: "headerInfo",
            success: function(a) {
                t.checkLogin({
                    app: o,
                    uid: a.data.uid,
                    callback: function(t) {
                        o.globalData.userInfo = t, o.afterLogin(o);
                    }
                });
            },
            fail: function(t) {
                o.loginOver(o);
            }
        });
    },
    afterLogin: function(a) {
        a.loginOver(a), a.globalData.userInfo && (t.getBubble(), t.getReddot());
    },
    loginOver: function(t) {
        var a = t.globalData;
        a.loginedFlag = !0, a.loginedCallback && (a.loginedCallback(), a.loginedCallback = null);
    }
});