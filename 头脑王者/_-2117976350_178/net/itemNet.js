require("./../util/util.js");

var e = require("./../net/network.js"), s = require("./../const/consts.js"), n = module.exports;

n.use = function(n, o) {
    e.post(s.MessageHead.Use, {
        params: {
            itemId: n
        },
        success: function(e) {
            o(null, e);
        },
        fail: function(e) {
            console.warn("itemuse失败。-" + e.errMsg), o(e);
        }
    });
}, n.upgradeKnow = function(n, o) {
    e.post(s.MessageHead.UpgradeKnow, {
        params: {
            knowId: n
        },
        success: function(e) {
            o(null, e);
        },
        fail: function(e) {
            console.warn("upgradeKnow失败。-" + e.errMsg), o(e);
        }
    });
}, n.exec = function(n, o, u) {
    e.post(s.MessageHead.Exec, {
        params: {
            uid: n,
            code: o
        },
        success: function(e) {
            u(null, e);
        },
        fail: function(e) {
            console.warn("gm.exec失败。-" + e.errMsg), u(e);
        }
    });
};