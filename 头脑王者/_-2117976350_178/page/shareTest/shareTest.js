var t = require("./../../util/util.js"), e = require("./../../util/AnimationQueue.js"), n = require("../../page/battle/battleManager.js"), a = require("./../../util/ActivityManager.js"), i = getApp(), o = {
    onLoad: function(e) {
        t.showShareMenu(), this.activity = a.getActivity("shareTest", !1), this.activity && t.setNavigationBarTitle(this.activity.name);
    },
    onReady: function() {
        var t = {};
        t.shareTestType = this.activity.subType, this.setData(t), this.playIn();
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var e = i.shareManager.getShareTestShareData();
        return i.shareConf(e, !0, function() {});
    },
    playIn: function() {
        var t = this, n = e.get("shareTestPageIn");
        n.wait(500), n.call(function() {
            var e = wx.createAnimation();
            e.top("0px").step({
                timingFunction: "ease-in",
                duration: 500
            }), t.setData({
                ani: e.export()
            });
        });
    },
    onTapTestBtn: function() {
        n.enterShareTest();
    }
};

Page(o);