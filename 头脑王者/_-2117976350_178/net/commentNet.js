require("./../util/util.js");

var e = require("./../net/network.js"), n = require("./../const/consts.js"), s = module.exports;

s.commentListBase = function(s, o, t) {
    e.get(n.MessageHead.CommentListBase, {
        params: {
            quizId: s,
            page: o
        },
        success: function(e) {
            t && t(null, e);
        },
        fail: function(e) {
            console.warn("commentListBase 失败-" + e.errMsg), t && t(e);
        }
    });
}, s.commentComment = function(s, o, t) {
    e.post(n.MessageHead.CommentComment, {
        params: {
            quizId: s,
            action: 0,
            content: o
        },
        success: function(e) {
            t && t(null, e);
        },
        fail: function(e) {
            console.warn("commentComment 失败-" + e.errMsg), t && t(e);
        }
    });
}, s.commentPraise = function(s, o, t, c) {
    var m = {};
    m.quizId = s, o && (m.commentId = o), m.action = t, e.post(n.MessageHead.CommentPrais, {
        params: m,
        success: function(e) {
            c && c(null, e);
        },
        fail: function(e) {
            console.warn("commentPraise 失败-" + e.errMsg), c && c(e);
        }
    });
}, s.commentBlack = function(s, o, t) {
    e.post(n.MessageHead.CommentBlack, {
        params: {
            quizId: s,
            commentId: o
        },
        success: function(e) {
            t && t(null, e);
        },
        fail: function(e) {
            console.warn("commentBlack 失败-" + e.errMsg), t && t(e);
        }
    });
}, s.commentListMore = function(s, o, t) {
    e.get(n.MessageHead.CommentListMore, {
        params: {
            quizId: s,
            page: o
        },
        success: function(e) {
            t && t(null, e);
        },
        fail: function(e) {
            console.warn("commentListMore 失败-" + e.errMsg), t && t(e);
        }
    });
};