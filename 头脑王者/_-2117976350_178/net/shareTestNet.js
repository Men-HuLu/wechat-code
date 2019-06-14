var s = require("./../net/network.js"), e = require("./../const/consts.js");

module.exports.shareTest = function(t, n, r) {
    s.post(e.MessageHead.shareTest, {
        params: {
            aid: t,
            answer: n
        },
        success: function(s) {
            r(null, s);
        },
        fail: function(s) {
            r(s);
        }
    });
};