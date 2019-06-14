require("./../util/util.js");

var s = require("./../net/network.js"), n = require("./../const/consts.js"), a = module.exports;

a.worldMatch = function(a) {
    s.get(n.MessageHead.WorldMatch, {
        params: {},
        success: function(s) {
            a(null, s);
        },
        fail: function(s) {
            console.warn("gainBank失败。-" + s.errMsg), a(s);
        }
    });
}, a.lastWorldMatch = function(a) {
    s.get(n.MessageHead.LastWorldMatch, {
        params: {},
        success: function(s) {
            a(null, s);
        },
        fail: function(s) {
            console.warn("lastWorldMatch失败。-" + s.errMsg), a(s);
        }
    });
}, a.seasonWorldMatch = function(a) {
    s.get(n.MessageHead.SeasonWorldMatch, {
        params: {},
        success: function(s) {
            a(null, s);
        },
        fail: function(s) {
            console.warn("seasonWorldMatch失败。-" + s.errMsg), a(s);
        }
    });
};