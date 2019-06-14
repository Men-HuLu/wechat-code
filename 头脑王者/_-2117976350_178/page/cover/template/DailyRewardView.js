function e(e, a) {
    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var a = function() {
    function e(e, a) {
        for (var i = 0; i < a.length; i++) {
            var n = a[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(a, i, n) {
        return i && e(a.prototype, i), n && e(a, n), a;
    };
}(), i = require("./../../../util/util.js"), n = require("./../../../const/consts.js"), t = require("./../../../net/rewardNet"), r = require("./../../../net/messageNet"), s = require("./../../../data/ItemsManager.js"), l = require("./../../../util/Tween.js"), o = getApp(), u = function() {
    function u(a) {
        var l = this;
        e(this, u), this.page = a, this.page.dailyRewardView_onTapOKBtn = function(e) {
            t.gainSignIn(function(e, a) {
                e ? (40001 == e.errCode && (o.mainData.role.signIn.lastSignTime = Math.floor(i.getServerTime() / 1e3), 
                l.setVisible(!1)), i.ShowConfirm("", e.errMsg, function() {})) : (i.ShowConfirm("", "领取成功", function() {
                    l.setVisible(!1);
                }), s.addItem(a.itemId, a.itemNum), o.mainData.role.signIn.signNum = (o.mainData.role.signIn.signNum + 1) % 7, 
                o.mainData.role.signIn.lastSignTime = Math.floor(i.getServerTime() / 1e3), r.markStats(n.event_point.click_dailyReward));
            });
        };
    }
    return a(u, [ {
        key: "onShow",
        value: function() {
            o.uid > 0 ? this.checkDailyReward() : this.setVisible(!1);
        }
    }, {
        key: "checkDailyReward",
        value: function() {
            var e = getApp(), a = !1;
            e.isNewUser() ? a = !1 : 0 == e.mainData.role.signIn.lastSignTime ? a = !0 : 0 != e.mainData.role.signIn.lastSignTime && (a = new Date(i.getServerTime()).getDate() != new Date(1e3 * e.mainData.role.signIn.lastSignTime).getDate());
            var n = [];
            if (e.mainData.role.allSeeds.signinConfs) for (var t = e.mainData.role.allSeeds.signinConfs.length, r = 0; r < t; r++) {
                var s = e.mainData.role.allSeeds.signinConfs[r];
                n.push({
                    name: e.mainData.role.allSeeds.itemConfs[s.itemId].name,
                    id: s.itemId,
                    num: s.itemNum,
                    receive: r < e.mainData.role.signIn.signNum,
                    activate: r == e.mainData.role.signIn.signNum,
                    dayLabel: this.getDayLabel(r, e.mainData.role.signIn.signNum),
                    aniIcon: null
                });
            }
            return i.setPageData(this.page, {
                "dailyRewardViewData.visible": a,
                "dailyRewardViewData.source": n
            }), a;
        }
    }, {
        key: "getDayLabel",
        value: function(e, a) {
            if (e < a) return "已领";
            if (e == a) return "今天";
            switch (e - a) {
              case 1:
                return "明天";

              case 2:
                return "第3天";

              case 3:
                return "第4天";

              case 4:
                return "第5天";

              case 5:
                return "第6天";

              case 6:
                return "第7天";
            }
        }
    }, {
        key: "setVisible",
        value: function(e) {
            l.removeTweens("DailyReward"), i.setPageData(this.page, {
                "dailyRewardViewData.visible": e
            });
        }
    } ]), u;
}();

module.exports = u;