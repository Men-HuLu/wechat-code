var e = require("../../../util/util.js"), t = require("../../../data/ItemsManager.js"), i = require("../../../const/consts.js");

Component({
    properties: {},
    data: {
        visible: !1
    },
    created: function() {},
    attached: function() {
        if (this._setVisible(!1), !this._isMarketClose() && t.haveNewHandItemCanBuy()) {
            var i = getApp();
            this.tryGetBeginnerGift = !!e.getStorageSync("tryGetBeginnerGift"), this.continue = !0, 
            i.eventDispatcher.addEventListener("onPageShow", this.onPageShow, this), i.eventDispatcher.addEventListener("onPageHide", this.onPageHide, this);
        }
    },
    ready: function() {},
    moved: function() {},
    detached: function() {
        var e = getApp();
        e.eventDispatcher.removeEventListener("onPageShow", this.onPageShow, this), e.eventDispatcher.removeEventListener("onPageHide", this.onPageHide, this);
    },
    methods: {
        _isMarketClose: function() {
            var e = getApp();
            switch (~~e.getGameConf(i.gameConf.pay)) {
              case 0:
                return !1;

              case 1:
                return !0;

              case 2:
                return e.mainData.isIOS;
            }
            return !1;
        },
        onPageShow: function(e) {
            "cover" == e.data && (this.continue = !0, this.update());
        },
        onPageHide: function(e) {
            "cover" == e.data && (this.continue = !1, clearTimeout(this.timeout));
        },
        update: function() {
            var i = this;
            clearTimeout(this.timeout);
            var n = getApp();
            if (n.mainData.role.level >= 3) {
                if (this.tryGetBeginnerGift && (this.tryGetBeginnerGift = !!e.getStorageSync("tryGetBeginnerGift")), 
                this.tryGetBeginnerGift) return;
                if (!t.haveNewHandItemCanBuy()) return;
                var s = e.getServerTimeBaseSecond();
                if (this.beginnerShowing || (this.beginnerShowing = e.getStorageSync("beginnerShowing"), 
                this.beginnerShowing || (this.beginnerShowing = {
                    visible: !0,
                    startTime: s
                }, e.setStorageSync("beginnerShowing", this.beginnerShowing)), this._setVisible(this.beginnerShowing.visible)), 
                this.beginnerShowing.visible) if (s - this.beginnerShowing.startTime > n.mainData.role.newGift.duration) this.beginnerShowing.visible = !1, 
                this.beginnerShowing.startTime = s, e.setStorageSync("beginnerShowing", this.beginnerShowing), 
                this._setVisible(!1); else {
                    var r = e.formatTime(this.beginnerShowing.startTime + n.mainData.role.newGift.duration - s), a = {};
                    a.context = r, this.setData(a);
                } else s - this.beginnerShowing.startTime > n.mainData.role.newGift.cdDur && (this.beginnerShowing.visible = !0, 
                this.beginnerShowing.startTime = s, e.setStorageSync("beginnerShowing", this.beginnerShowing), 
                this._setVisible(!0));
            }
            this.continue && (this.timeout = setTimeout(function() {
                i.update();
            }, 1e3));
        },
        onTapEntry: function() {
            this.triggerEvent("onTapEntry", {});
        },
        tempClose: function() {
            this.tryGetBeginnerGift = !0, this._setVisible(!1);
        },
        _setVisible: function(e) {
            var t = {};
            t.visible = e, this.setData(t), this.triggerEvent("onBGVChanged", {
                visible: e
            });
        }
    }
});