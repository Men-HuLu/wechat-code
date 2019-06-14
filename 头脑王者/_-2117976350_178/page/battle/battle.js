var t = require("./../../util/util.js"), e = require("./../../net/connectNotify.js"), o = require("./../../const/notifyConsts.js"), n = require("./../../net/wsconnect.js"), i = require("./../../util/daliyTask/DailyTaskNotifiyView.js"), s = require("./battleManager.js"), r = getApp(), a = {
    controller: null,
    onLoad: function(e) {
        t.showShareMenu(), this.dailyTaskNotifiyView = new i(this);
        var o = r.mainData.role.settingsInfo || {};
        this.soundOff = o.soundOff, n.socketOpen || this.startBreakingTimeout(), this.controller = s.controller, 
        this.controller.setBattlePage(this), this.controller.onLoad(e);
    },
    onReady: function() {},
    onShow: function() {
        this.dailyTaskNotifiyView.onShow(), this.controller.onShow();
    },
    onHide: function() {
        this.dailyTaskNotifiyView.onHide(), this.controller.onHide();
    },
    onUnload: function() {
        clearTimeout(this.breakingTimeout), this.dailyTaskNotifiyView.onUnload(), this.controller.onUnload();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onTapChooseBtn: function(t) {
        this.soundOff || r.audioTapCtx && r.audioTapCtx.play(), this.controller.onTapChooseBtn(t.detail);
    },
    registerConnectNotify: function() {
        e.register(o.socketClose, this.onSocketClose, this), e.register(o.socketOpen, this.onSocketOpen, this);
    },
    removeConnectNotify: function() {
        e.remove(o.socketClose, this.onSocketClose), e.remove(o.socketOpen, this.onSocketOpen);
    },
    startBreakingTimeout: function() {
        var t = this;
        this.clearBreakingTimeout(), this.breakingTimeout = setTimeout(function() {
            t.setData({
                wsconnectBreaking: !n.socketOpen
            });
        }, 3e3);
    },
    clearBreakingTimeout: function() {
        clearTimeout(this.breakingTimeout);
    },
    onSocketClose: function(t) {
        this.startBreakingTimeout();
    },
    onSocketOpen: function(t) {
        this.clearBreakingTimeout(), this.setData({
            wsconnectBreaking: !n.socketOpen
        });
    },
    onShareAppMessage: function(t) {
        return this.controller.onShareAppMessage(t);
    }
};

Page(a);