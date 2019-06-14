require("./../util/util.js");

var n = require("./../net/network.js"), e = require("./../const/consts.js"), o = module.exports;

o.joinGroup = function(o, s, a, u) {
    n.post(e.MessageHead.JoinGroup, {
        params: {
            friendCode: o,
            encryptedData: s,
            iv: a
        },
        success: function(n) {
            u(null, n);
        },
        fail: function(n) {
            console.warn("joinGroup失败。-" + n.errMsg), u(n);
        }
    });
}, o.groupRank = function(o) {
    n.get(e.MessageHead.GroupRank, {
        params: {},
        success: function(n) {
            o(null, n);
        },
        fail: function(n) {
            console.warn("groupRank失败。-" + n.errMsg), o(n);
        }
    });
}, o.memberRank = function(o, s, a) {
    n.get(e.MessageHead.MemberRank, {
        params: {
            page: o,
            groupId: s
        },
        success: function(n) {
            a(null, n);
        },
        fail: function(n) {
            console.warn("memberRank失败。-" + n.errMsg), a(n);
        }
    });
}, o.selfGroupRank = function(o) {
    n.get(e.MessageHead.SelfGroupRank, {
        params: {},
        success: function(n) {
            o(null, n);
        },
        fail: function(n) {
            console.warn("selfGroupRank失败。-" + n.errMsg), o(n);
        }
    });
}, o.modifyName = function(o, s, a, u) {
    n.post(e.MessageHead.ModifyName, {
        params: {
            groupId: o,
            name: a,
            openGid: s
        },
        success: function(n) {
            u(null, n);
        },
        fail: function(n) {
            console.warn("modifyName失败。-" + n.errMsg), u(n);
        }
    });
}, o.quitGroup = function(o, s, a) {
    n.post(e.MessageHead.QuitGroup, {
        params: {
            groupId: o,
            openGid: s
        },
        success: function(n) {
            a(null, n);
        },
        fail: function(n) {
            console.warn("selfGroupRank失败。-" + n.errMsg), a(n);
        }
    });
}, o.groupInvite = function(o) {
    n.post(e.MessageHead.GroupInvite, {
        params: {},
        success: function(n) {
            o(null, n);
        },
        fail: function(n) {
            console.warn("groupInvite失败。-" + n.errMsg), o(n);
        }
    });
}, o.matchInfo = function(o, s) {
    n.get(e.MessageHead.MatchInfo, {
        params: {
            groupId: o
        },
        success: function(n) {
            s(null, n);
        },
        fail: function(n) {
            console.warn("mathInfo失败。-" + n.errMsg), s(n);
        }
    });
};