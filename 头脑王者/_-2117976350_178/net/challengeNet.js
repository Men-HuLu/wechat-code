require("./../util/util.js");

var e = require("./../net/network.js"), n = require("./../const/consts.js"), s = module.exports;

getApp();

s.challengeList = function(s, a, l) {
    e.get(n.MessageHead.ChallengeList, {
        params: {
            start: s,
            len: a
        },
        success: function(e) {
            console.warn("房间列表"), l(null, e);
        },
        fail: function(e) {
            console.warn("房间列表失败。-" + e.errMsg), l(e);
        }
    });
}, s.challengeJoin = function(s, a, l, c) {
    var o = {};
    s && (o.challengeID = s), a && (o.encryptedData = a), l && (o.iv = l), e.post(n.MessageHead.ChallengeJoin, {
        params: o,
        success: function(e) {
            console.warn("进入擂台赛"), c(null, e);
        },
        fail: function(e) {
            console.warn("进入擂台赛失败。-" + e.errMsg), c(e);
        }
    });
}, s.challengeLeave = function(s, a) {
    e.post(n.MessageHead.ChallengeLeave, {
        params: {
            challengeID: s
        },
        success: function(e) {
            console.warn("离开房间"), a(null, e);
        },
        fail: function(e) {
            console.warn("离开房间。-" + e.errMsg), a(e);
        }
    });
}, s.challenge = function(s, a) {
    e.post(n.MessageHead.Challenge, {
        params: {
            challengeID: s
        },
        success: function(e) {
            console.warn("抢擂主"), a(null, e);
        },
        fail: function(e) {
            console.warn("抢擂主。-" + e.errMsg), a(e);
        }
    });
}, s.flushChallenge = function(s, a) {
    e.get(n.MessageHead.FlushChallenge, {
        params: {
            challengeID: s
        },
        success: function(e) {
            console.warn("刷新房间信息"), a(null, e);
        },
        fail: function(e) {
            console.warn("刷新房间信息。-" + e.errMsg), a(e);
        }
    });
}, s.checkWord = function(s, a) {
    e.post(n.MessageHead.CheckWord, {
        params: {
            word: s
        },
        success: function(e) {
            console.warn("检测房间名"), a(null, e);
        },
        fail: function(e) {
            console.warn("检测房间名。-" + e.errMsg), a(e);
        }
    });
}, s.challengeRank = function(s, a, l) {
    var c = {};
    c = a ? {
        challengeID: s,
        challengeRank: !0
    } : {
        challengeID: s
    }, e.get(n.MessageHead.ChallengeRank, {
        params: c,
        success: function(e) {
            l(null, e);
        },
        fail: function(e) {
            console.warn("擂台赛排行。-" + e.errMsg), l(e);
        }
    });
};