require("./../util/util.js");

var e = require("./../net/network.js"), s = require("./../const/consts.js"), n = module.exports;

n.listQuiz = function(n, i) {
    e.get(s.MessageHead.ListQuiz, {
        params: {
            status: n
        },
        success: function(e) {
            i(null, e);
        },
        fail: function(e) {
            console.warn("gainBank失败。-" + e.errMsg), i(e);
        }
    });
}, n.makeQuiz = function(n, i, u, t, o, c, a, r, l) {
    e.post(s.MessageHead.MakeQuiz, {
        params: {
            schoolId: n,
            quizType: i,
            title: u,
            option0: t,
            option1: o,
            option2: c,
            option3: a,
            formId: r
        },
        success: function(e) {
            l(null, e);
        },
        fail: function(e) {
            console.warn("makeQuiz失败。-" + e.errMsg), l(e);
        }
    });
}, n.getCheckQuiz = function(n) {
    e.get(s.MessageHead.GetCheckQuiz, {
        params: {},
        success: function(e) {
            n(null, e);
        },
        fail: function(e) {
            console.warn("getCheckQuiz失败。-" + e.errMsg), n(e);
        }
    });
}, n.checkOneQuiz = function(n, i, u, t) {
    e.post(s.MessageHead.CheckOneQuiz, {
        params: {
            quizId: n,
            isYes: i,
            suggest: u
        },
        success: function(e) {
            t(null, e);
        },
        fail: function(e) {
            console.warn("checkOneQuiz失败。-" + e.errMsg), t(e);
        }
    });
}, n.quizStats = function(n) {
    e.get(s.MessageHead.QuizStats, {
        params: {},
        success: function(e) {
            n(null, e);
        },
        fail: function(e) {
            console.warn("qmuizStats失败。-" + e.errMsg), n(e);
        }
    });
};