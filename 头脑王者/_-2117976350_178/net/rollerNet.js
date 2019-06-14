require("./../util/util.js");

var e = require("./../net/network.js"), l = require("./../const/consts.js"), s = module.exports;

s.rollerList = function(s) {
    e.get(l.MessageHead.RollerList, {
        params: {},
        success: function(e) {
            s(null, e);
        },
        fail: function(e) {
            console.warn("rollerList失败。-" + e.errMsg), s(e);
        }
    });
}, s.rollerRoll = function(s) {
    e.post(l.MessageHead.RollerRoll, {
        params: {},
        success: function(e) {
            s(null, e);
        },
        fail: function(e) {
            console.warn("rollerRoll失败。-" + e.errMsg), s(e);
        }
    });
};