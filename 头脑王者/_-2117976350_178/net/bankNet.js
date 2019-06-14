require("./../util/util.js");

var n = require("./../net/network.js"), s = require("./../const/consts.js"), e = module.exports;

e.gainBank = function(e, a) {
    n.post(s.MessageHead.GainBank, {
        params: {
            share: e
        },
        success: function(n) {
            a(null, n);
        },
        fail: function(n) {
            console.warn("gainBank失败。-" + n.errMsg), a(n);
        }
    });
}, e.gainShare = function(e) {
    n.post(s.MessageHead.GainShare, {
        params: {},
        success: function(n) {
            e(null, n);
        },
        fail: function(n) {
            console.warn("gainShare失败。-" + n.errMsg), e(n);
        }
    });
};