function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, a, i) {
        return a && e(t.prototype, a), i && e(t, i), t;
    };
}(), a = require("./../../../data/SpecialData.js"), i = getApp(), n = function() {
    function n(t) {
        var a = this;
        e(this, n), this.page = t, this.setPageData({
            "getTicketViewData.visible": !1,
            "getTicketViewData.ticketNum": 0
        }), this.page.getTicketView_onClosed = function() {
            a.page.btnLock || (a.setPageData({
                "getTicketViewData.visible": !1
            }), a.page.giveTicketToFriend());
        };
    }
    return t(n, [ {
        key: "setPageData",
        value: function(e) {
            this.page.setData(e);
        }
    }, {
        key: "onShow",
        value: function() {
            var e = {}, t = !1, n = a.getFreeTicket(a.data.base.aid);
            return i.mainData.role.bannerInfo && n > 0 ? (e["getTicketViewData.visible"] = !0, 
            e["getTicketViewData.ticketNum"] = n, a.setFreeTicket(a.data.base.aid, 0), t = !0) : (e["getTicketViewData.visible"] = !1, 
            t = !1), this.setPageData(e), t;
        }
    }, {
        key: "onHide",
        value: function() {}
    } ]), n;
}();

module.exports = n;