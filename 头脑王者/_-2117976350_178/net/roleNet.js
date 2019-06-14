var e = require("./../util/util.js"), s = require("./../net/network.js"), n = require("./../const/consts.js"), a = require("./../const/modeConsts.js"), o = module.exports, t = "";

o.ShowLogin = function(e, o) {
    var i = {
        scene: e.scene
    };
    e.friendCode && t != e.friendCode && (t = e.friendCode, i.friendCode = t), i.appType = a.CurAppKey, 
    s.post(n.MessageHead.ShowLogin, {
        params: i,
        success: function(e) {
            o(null, e);
        },
        fail: function(e) {
            console.warn("show login failed。-" + e.errMsg), o(e);
        }
    });
}, o.getSubscribed = function(e, a) {
    s.get(n.MessageHead.GetSubscribed, {
        params: {
            isCustom: e
        },
        success: function(e) {
            a(null, e);
        },
        fail: function(e) {
            console.warn("GetSubscribed失败。-" + e.errMsg), a(e);
        }
    });
}, o.ListSeasonReward = function(e) {
    s.get(n.MessageHead.ListSeasonReward, {
        params: {},
        success: function(s) {
            e(null, s);
        },
        fail: function(s) {
            console.warn("listSeasonReward失败。-" + s.errMsg), e(s);
        }
    });
}, o.GetSeasonReward = function(e) {
    s.post(n.MessageHead.GetSeasonReward, {
        params: {},
        success: function(s) {
            e(null, s);
        },
        fail: function(s) {
            console.warn("getSeasonReward失败。-" + s.errMsg), e(s);
        }
    });
}, o.loginPivilege = function(e, a, o) {
    s.post(n.MessageHead.LoginPivilege, {
        params: {
            pivilege: e,
            isOpen: a
        },
        success: function(e) {
            o(null, e);
        },
        fail: function(e) {
            console.warn("loginPivilege失败。-" + e.errMsg), o(e);
        }
    });
}, o.shareStats = function(a, o, t, i) {
    s.post(n.MessageHead.ShareStats, {
        params: {
            way: a,
            from: o,
            fromNum: t
        },
        success: function(s) {
            e.invokeCallback(i, null, s);
        },
        fail: function(s) {
            e.invokeCallback(i, s);
        }
    });
}, o.getQRPath = function(e) {
    s.get(n.MessageHead.GetQRPath, {
        params: {},
        success: function(s) {
            e(null, s);
        },
        fail: function(s) {
            console.warn("getQRPath失败。-" + s.errMsg), e(s);
        }
    });
}, o.updateMocha = function(e, a) {
    s.post(n.MessageHead.UpdateMocha, {
        params: {
            mocha: e
        },
        success: function(e) {
            a(null, e);
        },
        fail: function(e) {
            console.warn("UpdateMocha失败。-" + e.errMsg), a(e);
        }
    });
}, o.getSeasonMoney = function(e, a) {
    s.post(n.MessageHead.GetSeasonMoney, {
        params: {
            isDraw: e
        },
        success: function(e) {
            a(null, e);
        },
        fail: function(e) {
            console.warn("getSeasonMoney失败。-" + e.errMsg), a(e);
        }
    });
}, o.headList = function(e) {
    s.post(n.MessageHead.HeadList, {
        params: {},
        success: function(s) {
            e(null, s);
        },
        fail: function(s) {
            console.warn("headList失败。-" + s.errMsg), e(s);
        }
    });
}, o.useHead = function(e, a) {
    s.post(n.MessageHead.UseHead, {
        params: {
            headId: e
        },
        success: function(e) {
            a(null, e);
        },
        fail: function(e) {
            console.warn("headList失败。-" + e.errMsg), a(e);
        }
    });
}, o.getWallInfo = function(e) {
    s.post(n.MessageHead.GetWallInfo, {
        params: {},
        success: function(s) {
            e(null, s);
        },
        fail: function(s) {
            console.warn("getWallInfo失败。-" + s.errMsg), e(s);
        }
    });
}, o.gainWallAward = function(e, a) {
    s.post(n.MessageHead.GainWallAward, {
        params: {
            taskId: e
        },
        success: function(e) {
            a(null, e);
        },
        fail: function(e) {
            console.warn("getWallInfo失败。-" + e.errMsg), a(e);
        }
    });
};