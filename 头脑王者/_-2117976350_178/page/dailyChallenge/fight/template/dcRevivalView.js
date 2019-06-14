function e(e, a) {
    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var a = function() {
    function e(e, a) {
        for (var t = 0; t < a.length; t++) {
            var i = a[t];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(a, t, i) {
        return t && e(a.prototype, t), i && e(a, i), a;
    };
}(), t = require("./../../../../util/util.js"), i = require("./../../../../util/DailyChallengeManager.js"), n = getApp(), o = function() {
    function o(a) {
        var i = this;
        e(this, o), this.page = a, this.page.onTapDcRevivalCloseBtn = function() {
            i.close(), t.invokeCallback(i.next, !1);
        }, this.page.onTapDcRevivalRevivalBtn = function() {
            i.close(), t.invokeCallback(i.next, !0);
        }, this.page.onTapDcRevivalShopBtn = function() {
            wx.navigateTo({
                url: "/page/market/market?pageIndex=1"
            });
        };
    }
    return a(o, [ {
        key: "show",
        value: function(e) {
            var a = i.revivalCost(), t = 0;
            t = 1 == i.curId ? 1 : n.mainData.role.gold > a ? 2 : 3;
            var o = {};
            o["dcRevivalData.visible"] = !0, o["dcRevivalData.mode"] = t, o["dcRevivalData.revivalCost"] = a, 
            this.page.setData(o), this.next = e, this.mode = t;
        }
    }, {
        key: "onShow",
        value: function() {
            if (3 == this.mode) {
                var e = i.revivalCost();
                n.mainData.role.gold > e ? this.mode = 2 : this.mode = 3;
                var a = {};
                return a["dcRevivalData.mode"] = this.mode, void this.page.setData(a);
            }
        }
    }, {
        key: "onShare",
        value: function() {
            1 == this.mode && (this.close(), t.invokeCallback(this.next, !0));
        }
    }, {
        key: "close",
        value: function() {
            this.mode = 0;
            var e = {};
            e["dcRevivalData.visible"] = !1, this.page.setData(e);
        }
    } ]), o;
}();

module.exports = o;