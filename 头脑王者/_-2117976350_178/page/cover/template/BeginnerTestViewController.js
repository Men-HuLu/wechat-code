function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, i, a) {
        return i && e(t.prototype, i), a && e(t, a), t;
    };
}(), i = require("./../../../util/util.js"), a = (require("./../../../net/fightNet.js"), 
require("./../../../util/PVERoomDataManager.js")), n = require("./../../../net/friendNet.js"), r = require("./../../../net/messageNet.js"), s = require("./../../../const/consts.js"), o = getApp(), g = function() {
    function g(t) {
        var a = this;
        e(this, g), this.page = t, this.page.beginnerTestView_onTapOKBtn = function(e) {
            a.btnLock || (a.btnLock = !0, a.goToFight(), a.setVisible(!1));
        }, this.page.beginnerTestView_onTapClose = function(e) {
            a.setVisible(!1);
        }, i.setPageData(this.page, {
            "beginnerTestViewData.visible": !1,
            "beginnerTestViewData.avatarUrl": "../../image/qr/avatar.png",
            "beginnerTestViewData.nickName": "爱因斯坦"
        });
    }
    return t(g, [ {
        key: "goToFight",
        value: function() {
            r.markStats(s.event_point.click_test), a.createBeginnerTestData(), a.fixPVEAvatarUrl(), 
            wx.navigateTo({
                url: "../../page/fight/fight?fightType=beginnerTest"
            });
        }
    }, {
        key: "onShow",
        value: function() {
            var e = this;
            o.isBeginnerTestUser() ? o.mainData.loginArgs.friendCode ? n.friendDetail(o.mainData.loginArgs.friendCode, function(t, a) {
                t || i.setPageData(e.page, {
                    "beginnerTestViewData.visible": !0,
                    "beginnerTestViewData.avatarUrl": a.avatarUrl || "../../image/qr/avatar.png",
                    "beginnerTestViewData.nickName": a.nickName
                });
            }) : this.setVisible(!0) : this.setVisible(!1);
        }
    }, {
        key: "setVisible",
        value: function(e) {
            i.setPageData(this.page, {
                "beginnerTestViewData.visible": e
            }), e && (this.btnLock = !1);
        }
    } ]), g;
}();

module.exports = g;