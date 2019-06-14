require("./../util/util.js");

var s = require("./../net/network.js"), e = require("./../const/consts.js"), t = module.exports;

t.list = function(t) {
    s.get(e.MessageHead.DailyTaskList, {
        params: {},
        success: function(s) {
            t(null, s);
        },
        fail: function(s) {
            t(s);
        }
    });
}, t.getReward = function(t) {
    s.post(e.MessageHead.DailyTaskReward, {
        params: {},
        success: function(s) {
            t(null, s);
        },
        fail: function(s) {
            t(s);
        }
    });
};