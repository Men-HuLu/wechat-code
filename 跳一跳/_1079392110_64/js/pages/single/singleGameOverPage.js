function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), n = function() {
    function n(t) {
        e(this, n), this.game = t, this.model = this.game.gameModel, this.full2D = this.game.full2D, 
        this.name = "singleSettlementPgae";
    }
    return t(n, [ {
        key: "show",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = 0, n = "", o = function() {}, a = null, r = null, i = function() {};
            e && e.banType && (t = e.banType || 0), e.bottle_skin && e.bottle_skin.icon && (n = e.bottle_skin.icon, 
            this.game.reporter.rpGetSkinSettle()), e.onClickBottleSkin && (o = e.onClickBottleSkin), 
            e.onRewardAdGetProp && (a = e.onRewardAdGetProp, r = e.onShowRewardAd), e.onShowBannerAd && (i = e.onShowBannerAd), 
            this.data = e;
            var s = this.model.currentScore, l = this.model.getHighestScore(), d = this.model.startTime, h = this.model.weekBestScore, u = this.game.historyTimes.getTimes(), c = wx.getStorageSync("ad") || {};
            console.log("ad :", c);
            var f = "";
            if (c.t && a) {
                var g = new Date(c.t), m = new Date();
                !e.no_ad && c.ad_reward_quota && g.getMonth() == m.getMonth() && g.getDate() == m.getDate() ? f = "reward" : !e.no_ad && c.ad_banner_quota && g.getMonth() == m.getMonth() && g.getDate() == m.getDate() && (f = "banner");
            }
            if (this.full2D || this.game.handleWxOnError({
                message: "can not find full 2D gameOverPage",
                stack: ""
            }), this.full2D) {
                var w = {
                    score: s,
                    highest_score: l,
                    start_time: d,
                    week_best_score: h,
                    game_cnt: u,
                    banType: t,
                    bottle_skin_icon: n,
                    ad_type: f,
                    onClickBottleSkin: o,
                    onRewardAdGetProp: a,
                    onShowBannerAd: i,
                    onShowRewardAd: r
                };
                this.model.adInfo && this.model.adInfo.advertisingInfo && this.model.adInfo.advertisingInfo.isShowing && (w.advertise = {
                    score: this.model.adInfo.advertisingInfo.score,
                    icon_url: this.model.adInfo.advertisingInfo.trademark_url,
                    url: this.model.adInfo.advertisingInfo.ad_url
                }, this.game.reporter.rpAdGameOver()), this.full2D.showGameOverPage(w), s > l ? this.game.reporter.historyBest() : s > h && this.game.reporter.weekBest();
            }
        }
    }, {
        key: "showAdReward",
        value: function(e) {
            var t = this;
            this.full2D.showJiLiAdGetPropPage({
                icon: e,
                onReturn: function() {
                    t.data.no_ad = !0, t.show(t.data);
                }
            });
        }
    }, {
        key: "hide",
        value: function() {
            this.full2D.hide2D();
        }
    } ]), n;
}();

exports.default = n;