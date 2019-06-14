require("./../util/util.js");

var n = require("./../net/network.js"), e = require("./../const/consts.js"), s = module.exports;

s.list = function(s) {
    n.get(e.MessageHead.dailyChallengeList, {
        params: {},
        success: function(n) {
            s(null, n);
        },
        fail: function(n) {
            s(n);
        }
    });
}, s.beginFight = function(s, i) {
    n.post(e.MessageHead.dailyChallengeBeginFight, {
        params: {
            id: s
        },
        success: function(n) {
            i(null, n);
        },
        fail: function(n) {
            i(n);
        }
    });
}, s.findQuiz = function(s) {
    n.post(e.MessageHead.dailyChallengeFindQuiz, {
        params: {},
        success: function(n) {
            s(null, n);
        },
        fail: function(n) {
            s(n);
        }
    });
}, s.choose = function(s, i, a) {
    n.post(e.MessageHead.dailyChallengeChoose, {
        params: {
            quizNum: s,
            option: i
        },
        success: function(n) {
            a(null, n);
        },
        fail: function(n) {
            a(n);
        }
    });
}, s.findResult = function(s, i) {
    n.post(e.MessageHead.dailyChallengeFindResult, {
        params: {
            curId: s
        },
        success: function(n) {
            i(null, n);
        },
        fail: function(n) {
            i(n);
        }
    });
}, s.revival = function(s, i) {
    n.post(e.MessageHead.dailyChallengeRevival, {
        params: {
            curId: s
        },
        success: function(n) {
            i(null, n);
        },
        fail: function(n) {
            i(n);
        }
    });
};