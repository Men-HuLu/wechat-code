var t = require("../template/roomRankViewController.js"), n = require("./../../../util/ChallengeRoomDataManager.js"), a = require("./../../../util/util.js"), o = getApp();

Page({
    data: {},
    onLoad: function(n) {
        this.roomRankViewController = new t(this, "rankData");
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        if (!this.backgroundPositionInterval) {
            if (!this.backgroundPosition) {
                this.backgroundPosition = {
                    x: 0 == a.randomInt(0, 1) ? a.randomInt(500, 1e3) : -a.randomInt(500, 1e3),
                    y: 0 == a.randomInt(0, 1) ? a.randomInt(500, 1e3) : -a.randomInt(500, 1e3)
                };
                var i = {};
                i["rankData.backgroundPosition"] = this.backgroundPosition.x + "rpx " + this.backgroundPosition.y + "rpx ", 
                this.setData(i);
            }
            this.backgroundPositionInterval = setInterval(function() {
                t.backgroundPosition.x += 0 == a.randomInt(0, 1) ? a.randomInt(500, 1e3) : -a.randomInt(500, 1e3), 
                t.backgroundPosition.y += 0 == a.randomInt(0, 1) ? a.randomInt(500, 1e3) : -a.randomInt(500, 1e3);
                var n = {};
                n["rankData.backgroundPosition"] = t.backgroundPosition.x + "rpx " + t.backgroundPosition.y + "rpx ", 
                t.setData(n);
            }, 1e4);
        }
        var r = {};
        this.list = [], this.self = [], n.curRoomRankList && n.curRoomRankList.list && (this.list = JSON.parse(JSON.stringify(n.curRoomRankList.list))), 
        n.curRoomRankList && n.curRoomRankList.self && (this.self = JSON.parse(JSON.stringify(n.curRoomRankList.self)));
        var e = !1, s = 0;
        this.list.sort(function(t, n) {
            return t.rank - n.rank;
        });
        var u = !0, c = !1, l = void 0;
        try {
            for (var d, h = this.list[Symbol.iterator](); !(u = (d = h.next()).done); u = !0) {
                var k = d.value, m = a.GetMatchInfo(k.curMatch).name;
                k.matchName = m, k.status = this.status, k.cupsSource = o.formatUserCups(k), k.uid == this.self.uid && (k.nickName = "我", 
                k.isMe = !0, e = !0, s = k.score);
            }
        } catch (t) {
            c = !0, l = t;
        } finally {
            try {
                !u && h.return && h.return();
            } finally {
                if (c) throw l;
            }
        }
        r["rankData.dataList"] = this.list, r["rankData.isInRank"] = e, r["rankData.winNum"] = s, 
        this.setData(r), this.roomRankViewController.show();
    },
    onHide: function() {
        this.backgroundPositionInterval && (clearInterval(this.backgroundPositionInterval), 
        this.backgroundPositionInterval = void 0);
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = o.shareManager.getChallengeShareData(o.mainData.role.shareCode);
        return o.shareConf(t, !0);
    },
    roomRankItem_clicked: function(t) {
        var n = this;
        if (!this.btnLock) for (var a = t.currentTarget.dataset.friendId, i = this.list || [], r = 0; r < i.length; r++) if (i[r].uid == a) {
            o.mainData.user_to_detail = i[r];
            this.btnLock = !0, wx.navigateTo({
                url: "/page/user_detail/user_detail",
                complete: function() {
                    setTimeout(function() {
                        n.btnLock = !1;
                    }, 500);
                }
            });
            break;
        }
    },
    onRankView_TapReturn: function() {
        wx.navigateBack({});
    }
});