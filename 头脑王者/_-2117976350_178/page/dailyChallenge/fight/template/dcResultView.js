function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t;
    };
}(), n = require("./../../../../util/util.js"), a = require("./../../../../util/DailyChallengeManager.js"), i = (getApp(), 
function() {
    function i(t) {
        var a = this;
        e(this, i), this.page = t, this.page.onTapDcResultCloseBtn = function() {
            a.close(), n.invokeCallback(a.next);
        };
    }
    return t(i, [ {
        key: "show",
        value: function(e, t, n, i) {
            a.revivalCost();
            var o = 3;
            o = 0 == n ? 1 : e ? 3 : 2;
            var s = {};
            s["dcResultData.iconUrl"] = 2e5 == t ? "https://question-resource-wscdn.hortorgames.com/image/new_skin/home/icon_money.png" : "https://question-resource-wscdn.hortorgames.com/image/new_skin/daily_challenge/icon_clover.png", 
            s["dcResultData.itemNum"] = "×" + n, s["dcResultData.visible"] = !0, s["dcResultData.mode"] = o, 
            this.page.setData(s), this.next = i, this.mode = o;
        }
    }, {
        key: "close",
        value: function() {
            this.mode = 0;
            var e = {};
            e["dcResultData.visible"] = !1, this.page.setData(e);
        }
    } ]), i;
}());

module.exports = i;