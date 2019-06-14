require("./../util/util.js");

var n = require("./../net/network.js"), s = require("./../const/consts.js"), e = module.exports;

e.gainSignIn = function(e) {
    n.post(s.MessageHead.GainSignIn, {
        params: {},
        success: function(n) {
            e(null, n);
        },
        fail: function(n) {
            console.warn("GainSignIn失败。-" + n.errMsg), e(n);
        }
    });
}, e.gainBc = function(e) {
    n.post(s.MessageHead.GainBc, {
        params: {},
        success: function(n) {
            e(null, n);
        },
        fail: function(n) {
            console.warn("gainBc失败。-" + n.errMsg), e(n);
        }
    });
}, e.gainSubscribed = function(e) {
    n.post(s.MessageHead.GainSubscribed, {
        params: {},
        success: function(n) {
            e(null, n);
        },
        fail: function(n) {
            console.warn("GainSubscribed失败。-" + n.errMsg), e(n);
        }
    });
}, e.gainXcxReward = function(e) {
    n.post(s.MessageHead.GainXcxReward, {
        params: {},
        success: function(n) {
            e(null, n);
        },
        fail: function(n) {
            console.warn("gainXcxReward失败。-" + n.errMsg), e(n);
        }
    });
};