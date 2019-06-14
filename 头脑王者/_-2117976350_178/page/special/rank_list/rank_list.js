var a = require("./../../../data/ItemsManager.js"), e = require("./../../../util/util.js"), t = require("./../../../net/specialNet.js"), n = require("./../../../data/SpecialData.js");

Page({
    data: {
        list: [],
        selfRank: 0,
        awardState: -1,
        myAwardDes: "未获得奖励",
        nickName: "123",
        animates: {
            banner: "",
            itemIcon: "",
            mainNode: "",
            avatar: "",
            btnGetAward: "",
            itemIconFrame: "",
            getAwardNode: "",
            topicTitleImage: "",
            awardNum: ""
        },
        getAwardNodeTop: 105,
        awardItem: "https://question-resource-wscdn.hortorgames.com/image/new_skin/icon/icon_items/201001.png",
        awardNum: 0,
        userAvatar: "https://question-resource-wscdn.hortorgames.com/image/new_skin/icon/icon_items/201001.png",
        topicName: "",
        btnlock: !1
    },
    onLoad: function() {
        e.showShareMenu(), this.refreshRankList(105);
    },
    refreshRankList: function(i) {
        var r = this;
        t.enterActivity(n.data.base.aid, function(t, o) {
            if (t) return console.error(t), e.ShowToast(t.errMsg), void wx.navigateBack();
            n.data = o;
            getApp();
            var s = n.data.player || {}, d = 0, c = "";
            !s.isTakeAward && s.isHaveAward ? d = 1 : s.isHaveAward && s.isTakeAward ? (d = 2, 
            c = "奖励已领取") : (c = "本次专题赛尚未结束", e.getServerTimeBaseSecond() >= n.data.base.endAt && e.getServerTimeBaseSecond() < n.data.base.calEndAt ? c = "专题赛结算中..." : e.getServerTimeBaseSecond() >= n.data.base.calEndAt && (c = n.isOfflineMatch() ? "" : "专题赛已结束"), 
            d = 0), r.fitDisplayRankList(o.rankList);
            var l = r.findAwardItemConfig(o.player.rank);
            console.log(getApp().mainData.role.userInfo.nickName);
            var m = n.data.player.rank;
            m <= 0 && (m = "未上榜"), r.setData({
                list: o.rankList,
                awardState: d,
                myAwardDes: c,
                userAvatar: e.getWechatUrlBySize(getApp().mainData.role.userInfo.avatarUrl),
                awardItem: a.getItemUrl(l.itemId),
                getAwardNodeTop: i,
                nickName: getApp().mainData.role.userInfo.nickName,
                selfRank: m,
                awardNum: "x" + l.itemNum,
                topicName: n.data.base.subType
            });
        });
    },
    fitDisplayRankList: function(a) {
        for (var e = 0; e < a.length; e++) a[e].uid === getApp().mainData.role.uid && (a[e].itsMe = !0);
    },
    findAwardItemConfig: function(a) {
        if (n.data) {
            for (var e = n.data.award, t = 0; t < e.length; t++) {
                var i = e[t];
                if (a >= i.beginRank && a <= i.endRank) return i;
            }
            return console.warn("can not find award by rank"), 0;
        }
        console.warn("special config has not init");
    },
    onTapShowGetAward: function() {
        this.btnlock || (this.oneClickLock(), this.setData({
            getAwardNodeTop: 105
        }), this.enter());
    },
    oneClickLock: function() {
        var a = this;
        this.btnlock = !0, setTimeout(function() {
            a.btnlock = !1;
        }, 500);
    },
    onTapGetRewardInner: function() {
        var e = this;
        this.btnlock || (this.oneClickLock(), console.log("onTapGetRewardInner clicked"), 
        t.takeReward(function(t, n) {
            if (t) wx.showToast({
                mask: !1,
                title: t.errMsg,
                icon: "none"
            }); else {
                var i = n.items;
                for (var r in i) a.addItem(i[r].itemId, i[r].itemNum);
                wx.showToast({
                    mask: !1,
                    title: "领奖成功"
                }), e.refreshRankList(5), e.exit();
            }
        }));
    },
    enter: function() {
        var a = this.data.animates;
        for (var e in a) a[e] = e + "Enter";
        this.setData({
            animates: a
        });
    },
    exit: function() {
        var a = this.data.animates;
        for (var e in a) a[e] = e + "Exit";
        this.setData({
            animates: a,
            getAwardNodeTop: 0
        });
    },
    onShareAppMessage: function() {
        var a = getApp(), e = a.shareManager.getSpecialShareData(SpecialConfig.isZjwMath());
        return a.shareConf(e);
    },
    onTapGoto: function() {
        console.log("linkConf", n.data.linkConf, n.data.linkConf.appId, n.data.linkConf.path), 
        wx.navigateToMiniProgram && n.data.linkConf.appId && wx.navigateToMiniProgram({
            appId: n.data.linkConf.appId,
            path: n.data.linkConf.path,
            success: function(a) {
                messageNet.markStatsEx({
                    event: consts.event_point.click_link,
                    keyword1: n.data.linkConf.appName
                }), e.reportAnalytics_debug_log("" + n.data.linkConf.appName);
            },
            fail: function(a) {}
        });
    }
});