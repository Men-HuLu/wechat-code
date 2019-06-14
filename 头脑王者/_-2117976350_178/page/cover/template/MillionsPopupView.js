function e(e, a) {
    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var a = function() {
    function e(e, a) {
        for (var n = 0; n < a.length; n++) {
            var i = a[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(a, n, i) {
        return n && e(a.prototype, n), i && e(a, i), a;
    };
}(), n = require("./../../../util/util.js"), i = require("./../../../net/roleNet.js"), t = (require("./../../../const/consts.js"), 
require("../template/MillionsImageCreater.js")), o = getApp(), s = function() {
    function s(a) {
        var l = this;
        e(this, s), this.page = a, this.updataGainEndTime(), this.page.millionsPopupView_onBanner = function(e) {
            l.setVisible(!0);
        }, this.page.millionsPopupView_onTapCancelBtn = function(e) {
            l.setVisible(!1);
        }, this.page.millionsPopupView_onTapOKBtn = function(e) {
            l.btnLock || (l.btnLock = !0, l.goToFight(), l.setVisible(!1));
        }, this.page.millionsPopupView_onTapClose = function(e) {
            l.setVisible(!1);
        }, this.setVisible(!1), this.page.onTapGetSeasonMoney = function() {
            var e = {};
            e["millionsPopupViewData.showCash"] = !0, l.page.setData(e);
        }, this.page.onTapGetSeasonMoney_close = function() {
            var e = {};
            e["millionsPopupViewData.showCash"] = !1, l.page.setData(e);
        }, this.page.onTapGetSeasonMoney_gotocash = function() {
            var e = {};
            e["millionsPopupViewData.showCash"] = !1, l.page.setData(e), setTimeout(function() {
                l.showMilionsGetCash();
            }, 200);
        }, this.page.onTapGetCash = function() {
            l.btnLock || (l.btnLock = !0, i.getSeasonMoney(!0, function(e, a) {
                if (l.btnLock = !1, e) n.ShowConfirm(e.errCode, e.errMsg, function() {}); else if (o.mainData.role.seasonInfo.isGain = a.isGain, 
                o.mainData.role.seasonInfo.money = a.money, a.isGain) {
                    var i = {};
                    l.beatNum = a.beatNum, l.answerNum = a.answerNum, i["millionsPopupViewData.scale"] = n.getTextScale(o.mainData.role.userInfo.nickName, 52, 550), 
                    i["millionsPopupViewData.showShareAfterCash"] = !0, l.page.setData(i), n.ShowToast("领取成功");
                } else n.ShowToast("领取失败");
                var t = {};
                t["millionsPopupViewData.getCash"] = !1, l.page.setData(t), l.page.coverBanner && l.page.coverBanner.refreshBanner();
            }));
        }, this.page.onTapGetCash_close = function() {
            var e = {};
            e["millionsPopupViewData.getCash"] = !1, l.page.setData(e);
        }, this.page.onTapShareAfterCash_close = function() {
            var e = {};
            e["millionsPopupViewData.showShareAfterCash"] = !1, l.page.setData(e);
        }, this.page.onTapShareAfterCash_save = function() {
            l.btnLock || (l.btnLock = !0, setTimeout(function() {
                l.btnLock = !1;
            }, 4e3), l.millionsImageCreater = new t(l), l.millionsImageCreater.setNickname(o.mainData.role.userInfo.nickName), 
            l.millionsImageCreater.setAvatarUrl(o.mainData.role.userInfo.avatarUrl), l.millionsImageCreater.setNumData(l.beatNum, l.answerNum), 
            l.millionsImageCreater.showShareImage());
        }, this.page.onTapGetCashAreadyBanner = function() {
            l.page.millionsShareView && l.page.millionsShareView.setVisible(!0);
        }, this.page.onTapMillionsOverBanner = function() {
            l.page.millionsShareView && l.page.millionsShareView.setVisible(!0);
        };
    }
    return a(s, [ {
        key: "goToFight",
        value: function() {
            wx.navigateTo({
                url: "../../page/pve/pve"
            }), this.setVisible(!1);
        }
    }, {
        key: "onShow",
        value: function() {
            this.setVisible(!0);
        }
    }, {
        key: "setVisible",
        value: function(e) {
            var a = {};
            a["millionsPopupViewData.visible"] = e, e && 300014 == o.mainData.role.curMatch && (a["millionsPopupViewData.hideBtn"] = !0), 
            this.page.setData(a), e && (this.btnLock = !1);
        }
    }, {
        key: "previewMillionsCash",
        value: function() {
            var e = {};
            e["millionsPopupViewData.showCash"] = !0, this.page.setData(e);
        }
    }, {
        key: "showMilionsGetCash",
        value: function() {
            var e = this;
            i.getSeasonMoney(!1, function(a, i) {
                if (a) n.ShowToast(a.errMsg); else if (o.mainData.role.seasonInfo.isGain = i.isGain, 
                o.mainData.role.seasonInfo.money = i.money, i.isGain) n.ShowToast("奖金已领"); else {
                    e.money = (i.money / 100).toFixed(2);
                    var t = {};
                    t["millionsPopupViewData.getCash"] = !0, t["millionsPopupViewData.kingsNum"] = e.page.data.banner.s3.kingsNum, 
                    t["millionsPopupViewData.money"] = e.money, t["millionsPopupViewData.nickName"] = o.mainData.role.userInfo.nickName, 
                    t["millionsPopupViewData.headId"] = o.mainData.role.headId, t["millionsPopupViewData.avatarUrl"] = o.mainData.role.userInfo.avatarUrl, 
                    e.page.setData(t);
                }
                e.page.coverBanner && e.page.coverBanner.refreshBanner();
            });
        }
    }, {
        key: "killMe",
        value: function() {
            var e = {};
            e.millionsPopupViewData = null, this.page.setData(e), this.unload();
        }
    }, {
        key: "unload",
        value: function() {
            clearInterval(this.interval_End), this.interval_End = void 0;
        }
    }, {
        key: "update",
        value: function() {
            n.getServerTimeBaseSecond() + 5 > o.mainData.role.seasonInfo.gainEndTime && (this.unload(), 
            this.page.coverBanner && this.page.coverBanner.refreshBanner());
        }
    }, {
        key: "updataGainEndTime",
        value: function() {
            var e = this;
            o.mainData.role.seasonInfo.gainEndTime && (this.update(), this.interval_End = setInterval(function() {
                e.update();
            }, 1e3));
        }
    } ]), s;
}();

module.exports = s;