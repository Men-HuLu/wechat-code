require("./../util/util.js");

var e = require("./../net/network.js"), s = require("./../const/consts.js"), n = module.exports;

n.shopList = function(n, r) {
    e.get(s.MessageHead.ShopList, {
        params: {
            uid: n
        },
        success: function(e) {
            r(null, e);
        },
        fail: function(e) {
            console.warn("shopList失败。-" + e.errMsg), r(e);
        }
    });
}, n.createOrder = function(n, r) {
    e.post(s.MessageHead.CreateOrder, {
        params: {
            shopID: n
        },
        success: function(e) {
            r(null, e);
        },
        fail: function(e) {
            console.warn("createOrder失败。-" + e.errMsg), r(e);
        }
    });
}, n.platformOrder = function(n, r) {
    e.get(s.MessageHead.PlatformOrder, {
        params: {
            uid: n
        },
        success: function(e) {
            r(null, e);
        },
        fail: function(e) {
            console.warn("platformOrder失败。-" + e.errMsg), r(e);
        }
    });
}, n.gainOrder = function(n, r, a) {
    e.post(s.MessageHead.GainOrder, {
        params: {
            uid: n,
            orderIds: r
        },
        success: function(e) {
            a(null, e);
        },
        fail: function(e) {
            console.warn("platformOrder失败。-" + e.errMsg), a(e);
        }
    });
}, n.exList = function(n) {
    e.get(s.MessageHead.ExList, {
        params: {},
        success: function(e) {
            n(null, e);
        },
        fail: function(e) {
            console.warn("exList失败。-" + e.errMsg), n(e);
        }
    });
}, n.exchange = function(n, r) {
    e.post(s.MessageHead.Exchange, {
        params: {
            exId: n
        },
        success: function(e) {
            r(null, e);
        },
        fail: function(e) {
            console.warn("exchange失败。-" + e.errMsg), r(e);
        }
    });
};