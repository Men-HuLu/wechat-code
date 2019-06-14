function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var s = 0; s < n.length; s++) {
            var a = n[s];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(n, s, a) {
        return s && e(n.prototype, s), a && e(n, a), n;
    };
}(), s = require("./../../../util/util.js"), a = require("./../../../const/consts.js"), t = require("./../../../net/messageNet"), i = require("./../../../util/Tween.js"), r = getApp(), o = function() {
    function o(n) {
        e(this, o), this.controller = n, this.page = this.controller.page, this.kingsNum = 0;
        var s = {};
        s.banner = {}, s["banner.type"] = a.coverBannerType.million, s["banner.s3"] = {}, 
        s["banner.s3.kingsNum"] = this.kingsNum, s["banner.s3.kingsReward"] = 0, s["banner.s3.showGetCashBtn"] = !1, 
        this.page.setData(s);
    }
    return n(o, [ {
        key: "onShow",
        value: function() {
            this.refreshBanner();
        }
    }, {
        key: "refreshBanner",
        value: function() {
            var e = this;
            return this.isS3() ? (this.setBannerStatus("s3"), void setTimeout(function() {
                e.request_matchKings();
            }, 1e3)) : this.isS4GetCashAready() ? (this.setBannerStatus("s4GetCashAready"), 
            void setTimeout(function() {
                e.request_matchKings();
            }, 1e3)) : this.isS4GetCash() ? (this.setBannerStatus("s4GetCash"), void setTimeout(function() {
                e.request_matchKings();
            }, 1e3)) : this.isS4millionsOver() ? (this.setBannerStatus("s4millionsOver"), void setTimeout(function() {
                e.request_matchKings();
            }, 1e3)) : (this.controller.killBanner(), void s.log("millon.refreshBanner：不在活动期 killBanner"));
        }
    }, {
        key: "setBannerStatus",
        value: function(e) {
            var n = {};
            n["banner.visible"] = !0, n["banner.status"] = e, this.page.setData(n);
        }
    }, {
        key: "isS3",
        value: function() {
            return r.mainData.role.seasonInfo.seasonId <= 3;
        }
    }, {
        key: "isS4GetCash",
        value: function() {
            return 4 == r.mainData.role.seasonInfo.seasonId && (!r.mainData.role.seasonInfo.isGain && (!(r.mainData.role.seasonInfo.money <= 0) && !this.isMillionsTimeOut()));
        }
    }, {
        key: "isS4GetCashAready",
        value: function() {
            return 4 == r.mainData.role.seasonInfo.seasonId && (!!r.mainData.role.seasonInfo.isGain && (!(r.mainData.role.seasonInfo.money <= 0) && !this.isMillionsTimeOut()));
        }
    }, {
        key: "isMillionsTimeOut",
        value: function() {
            var e = s.getServerTimeBaseSecond();
            if (r.mainData.role.seasonInfo.gainEndTime && e + 5 > r.mainData.role.seasonInfo.gainEndTime) return !0;
        }
    }, {
        key: "isS4millionsOver",
        value: function() {
            return !(4 != r.mainData.role.seasonInfo.seasonId || this.isMillionsTimeOut() || !r.mainData.role.seasonInfo.isGain && 0 != r.mainData.role.seasonInfo.money);
        }
    }, {
        key: "request_matchKings",
        value: function() {
            var e = this;
            r.uid && t.matchKings(function(n, s) {
                if (n) ; else if (s && s) {
                    var a = s.num, t = e.kingsNum;
                    if (e.kingsNum < a) {
                        var r = a - e.kingsNum;
                        i.fastGet("kingsNumTween", !0).update(function(n) {
                            var s = {};
                            s["banner.s3.kingsNum"] = t + Math.ceil(r * n), e.page.setData(s);
                        }, 1e3);
                        var o = wx.createAnimation();
                        o.scale(1.3).step({
                            timingFunction: "ease-in",
                            duration: 300
                        }), o.scale(1).step({
                            timingFunction: "ease-out",
                            duration: 200,
                            delay: 800
                        });
                        var u = {};
                        u["banner.s3.kingsReward"] = s.money, u["banner.s3.kingsNumAni"] = o.export(), u["banner.s3.showGetCashBtn"] = !0, 
                        e.page.setData(u), e.kingsNum = a;
                    } else {
                        var l = {};
                        l["banner.s3.kingsNum"] = e.kingsNum, l["banner.s3.kingsReward"] = s.money, l["banner.s3.showGetCashBtn"] = !0, 
                        e.page.setData(l);
                    }
                }
            });
        }
    } ]), o;
}();

module.exports = o;