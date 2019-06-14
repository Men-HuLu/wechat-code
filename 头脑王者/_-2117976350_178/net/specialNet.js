require("./../util/util.js");

var e = require("./../net/network.js"), i = require("./../const/consts.js"), a = require("./../data/SpecialData.js"), t = module.exports;

t.enterActivity = function(t, n) {
    wx.showLoading({
        mask: !0
    }), e.get(i.MessageHead.EnterActivity, {
        params: {
            aid: t
        },
        success: function(e) {
            var i = Math.max(a.getFreeTicket(t), ~~e.freeTicket);
            a.setFreeTicket(t, i), n(null, e), wx.hideLoading();
        },
        fail: function(e) {
            console.warn("enterActivity-" + e.errMsg), n(e), wx.hideLoading();
        }
    });
}, t.getRankList = function(t) {
    wx.showLoading({
        mask: !0
    }), e.get(i.MessageHead.ActivityRankList, {
        params: {
            aid: a.data.base.aid
        },
        success: function(e) {
            t(null, e), wx.hideLoading();
        },
        fail: function(e) {
            console.warn("enterActivity-" + e.errMsg), t(e), wx.hideLoading();
        }
    });
}, t.ticketFriends = function(t) {
    e.post(i.MessageHead.TicketFriends, {
        params: {
            aid: a.data.base.aid
        },
        success: function(e) {
            t(null, e);
        },
        fail: function(e) {
            t(e);
        }
    });
}, t.activityInfo = function(a, t) {
    e.get(i.MessageHead.ActivityInfo, {
        params: {
            aid: a
        },
        success: function(e) {
            t(null, e);
        },
        fail: function(e) {
            t(e);
        }
    });
}, t.giveTicket = function(a, t, n) {
    wx.showLoading({
        mask: !0
    }), e.post(i.MessageHead.GiveTicket, {
        params: {
            friendCode: a,
            shareAid: t
        },
        success: function(e) {
            n(null, e), wx.hideLoading();
        },
        fail: function(e) {
            n(e), wx.hideLoading();
        }
    });
}, t.takeReward = function(t) {
    e.get(i.MessageHead.TakeActivityReward, {
        params: {
            aid: a.data.base.aid
        },
        success: function(e) {
            t(null, e);
        },
        fail: function(e) {
            console.warn("enterActivity-" + e.errMsg), t(e);
        }
    });
}, t.specialMatch = function(a, t) {
    e.get(i.MessageHead.SpecialMatch, {
        params: {
            subType: a
        },
        success: function(e) {
            t(null, e);
        },
        fail: function(e) {
            console.warn("specialMatch-" + e.errMsg), t(e);
        }
    });
};