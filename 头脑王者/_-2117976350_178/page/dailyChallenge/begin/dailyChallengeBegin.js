var e = require("./../../../util/util.js"), n = require("./../../../net/dailyChallengeNet.js"), i = require("./../../../util/DailyChallengeManager.js"), o = getApp(), t = {
    data: {},
    onLoad: function(n) {
        e.showShareMenu(), this.id = n.id, this.refresUI();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {
        this.isShow = !1;
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var n = o.shareManager.getDCShareData("dc_normal");
        return o.shareConf(n);
    },
    onTapBeginBtn: function() {
        var i = this;
        this.btnLock || (this.btnLock = !0, n.beginFight(this.id, function(n, t) {
            n ? (e.ShowConfirm(n.errCode, n.errMsg, function() {}), i.btnLock = !1) : (o.mainData.role.dailyChallenge.curId = i.id, 
            o.updateGold(t.gold), wx.redirectTo({
                url: "/page/dailyChallenge/fight/dailyChallengeFight?id=" + i.id,
                complete: function() {
                    setTimeout(function() {
                        i.btnLock = !1;
                    }, 100);
                }
            }));
        }));
    },
    refresUI: function() {
        var e = i.getRes(this.id), n = {};
        switch (this.id) {
          case "1":
            n.flagImg = "img_dailychallenge_flag_nomal.png";
            break;

          case "2":
            n.flagImg = "img_dailychallenge_flag_middle.png";
            break;

          case "3":
            n.flagImg = "img_dailychallenge_flag_hard.png";
        }
        "200000" == e.itemId ? n.itemIconUrl = "https://question-resource-wscdn.hortorgames.com/image/new_skin/home/icon_money.png" : (e.itemId = "200001") && (n.itemIconUrl = "https://question-resource-wscdn.hortorgames.com/image/new_skin/daily_challenge/icon_clover.png"), 
        n.bonus1 = e.bonus1, n.bonus2 = e.bonus2, n.bonus3 = e.bonus3, this.setData(n);
    }
};

Page(t);