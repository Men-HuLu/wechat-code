require("./../util/util.js");

var e = require("./../net/network.js"), s = require("./../const/consts.js"), n = module.exports;

n.setting = function(n, t, o) {
    e.post(s.MessageHead.Setting, {
        params: {
            forbiddenPush: n,
            soundOff: t
        },
        success: function(e) {
            o(null, e.version);
        },
        fail: function(e) {
            console.warn("setting failed。-" + e.errMsg), o(e);
        }
    });
}, n.getAppInfo = function(n) {
    e.get(s.MessageHead.GetAppInfo, {
        params: {},
        success: function(e) {
            n(null, e);
        },
        fail: function(e) {
            console.warn("cash getAppInfo failed。-" + e.errMsg), n(e);
        }
    });
};