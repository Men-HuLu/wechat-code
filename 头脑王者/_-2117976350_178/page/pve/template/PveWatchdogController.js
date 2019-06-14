function e(e, a) {
    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var a = function() {
    function e(e, a) {
        for (var t = 0; t < a.length; t++) {
            var o = a[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(a, t, o) {
        return t && e(a.prototype, t), o && e(a, o), a;
    };
}(), t = require("./../../../util/util.js"), o = require("./../../../const/consts.js"), n = (require("./../../../data/ItemsManager.js"), 
require("./../../../util/Tween.js"), getApp()), i = function() {
    function i(a) {
        var o = this;
        e(this, i), this.page = a, this.page.onPveWatchdog_closed = function() {
            var e = {};
            e["pveWatchdog.visible"] = !1, o.page.setData(e);
        }, this.page.onPveWatchdog_gotoShop = function() {
            var e = {};
            e["pveWatchdog.visible"] = !1, o.page.setData(e), o.page.btnLock = !0, wx.navigateTo({
                url: "../../page/market/market?pageIndex=1",
                complete: function() {
                    setTimeout(function() {
                        o.page.btnLock = !1;
                    }, 500);
                }
            });
        }, this.page.onPveWatchdog_gotoDraw = function() {
            n.mainData.bankShining = !0;
            var e = {};
            e["pveWatchdog.visible"] = !1, o.page.setData(e), n.gotoCover(function() {}, function() {});
        }, this.page.onPveWatchdog_gotoPve = function(e) {
            var a = e.currentTarget.dataset.stageId - 300001, i = 184 * a / n.mainData.dpr;
            t.log("====index:" + a, "px:" + i);
            var r = {};
            r["pveWatchdog.visible"] = !1, r["pvePickerViewData.scrollTop"] = i, o.page.setData(r);
        };
    }
    return a(i, [ {
        key: "onShow",
        value: function() {}
    }, {
        key: "onKnowUplevelClicked",
        value: function() {
            var e = {};
            if (e.pveWatchdog = {
                visible: !1,
                youCanShare: !1,
                youCanDraw: !1,
                youShopping: !1,
                money2MaxDan: null
            }, n.hasSharedWidhReward()) {
                var a = n.checkFuncOpen(o.funcType.bank), t = n.getCurBankGold();
                a && t > 0 ? (e["pveWatchdog.visible"] = !0, e["pveWatchdog.youCanDraw"] = !0) : (e["pveWatchdog.visible"] = !0, 
                e["pveWatchdog.youShopping"] = !0);
            } else e["pveWatchdog.visible"] = !0, e["pveWatchdog.youCanShare"] = !0, e["pveWatchdog.shareRewardNum"] = n.getShareRewardNum();
            this.page.setData(e);
        }
    }, {
        key: "onPveGateClicked",
        value: function(e) {
            var a = {};
            if (a.pveWatchdog = {
                visible: !1,
                youCanShare: !1,
                youCanDraw: !1,
                youShopping: !1,
                money2MaxDan: null
            }, n.hasSharedWidhReward()) {
                var t = n.checkFuncOpen(o.funcType.bank), i = n.getCurBankGold();
                if (t && i > 0) a["pveWatchdog.visible"] = !0, a["pveWatchdog.youCanDraw"] = !0; else {
                    for (var r = !1, c = n.mainData.role.matchInfo.length - 1; c >= 0; c--) {
                        var g = n.mainData.role.matchInfo[c];
                        if (n.mainData.role.gold >= g.fee) {
                            a["pveWatchdog.visible"] = !0, a["pveWatchdog.money2MaxDan"] = {
                                id: g.id,
                                kuang: c - 5 + 205001,
                                name: g.name
                            }, r = !0;
                            break;
                        }
                    }
                    r || (a["pveWatchdog.visible"] = !0, a["pveWatchdog.youShopping"] = !0);
                }
            } else a["pveWatchdog.visible"] = !0, a["pveWatchdog.youCanShare"] = !0, a["pveWatchdog.shareRewardNum"] = n.getShareRewardNum();
            this.page.setData(a);
        }
    } ]), i;
}();

module.exports = i;