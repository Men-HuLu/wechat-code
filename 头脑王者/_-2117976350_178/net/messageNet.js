require("./../util/util.js");

var s = require("./../net/network.js"), t = require("./../const/consts.js"), a = module.exports;

a.recordForm = function(a, n) {
    s.post(t.MessageHead.RecordForm, {
        params: {
            formId: a
        },
        success: function(s) {
            n(null, s);
        },
        fail: function(s) {
            console.warn("recordForm失败。-" + s.errMsg), n(s);
        }
    });
}, a.matchStats = function(a) {
    s.get(t.MessageHead.MatchStats, {
        params: {},
        success: function(s) {
            a(null, s);
        },
        fail: function(s) {
            console.warn("matchStats失败。-" + s.errMsg), a(s);
        }
    });
}, a.markStats = function(a) {
    s.post(t.MessageHead.MarkStats, {
        params: {
            event: a
        },
        success: function(s) {},
        fail: function(s) {}
    });
}, a.markStatsEx = function(a) {
    s.post(t.MessageHead.MarkStats, {
        params: a,
        success: function(s) {},
        fail: function(s) {}
    });
}, a.markStatsEnterWithShare = function(a, n, e, r) {
    s.post(t.MessageHead.MarkStats, {
        params: {
            event: a,
            keyword1: n,
            keyword2: e
        },
        success: function(s) {
            r && r(null, s);
        },
        fail: function(s) {
            console.warn("matchStats失败。-" + s.errMsg), r && r(s);
        }
    });
}, a.markStatsChannel = function(a, n, e) {
    s.post(t.MessageHead.MarkStats, {
        params: {
            event: a,
            keyword1: n
        },
        success: function(s) {
            e && e(null, s);
        },
        fail: function(s) {
            console.warn("markStatsChannel失败。-" + s.errMsg), e && e(s);
        }
    });
}, a.matchKings = function(a) {
    s.get(t.MessageHead.MatchKings, {
        params: {},
        success: function(s) {
            a(null, s);
        },
        fail: function(s) {
            console.warn("matchKings失败。-" + s.errMsg), a(s);
        }
    });
};