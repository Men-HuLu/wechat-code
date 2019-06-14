var t = require("./../../../util/util.js"), i = require("./../../../util/DailyChallengeManager.js"), a = require("./../../../util/daliyTask/DailyTaskNotifiyView.js"), n = getApp(), o = {
    data: {
        goldStr: "0",
        nounStr: "0"
    },
    onLoad: function(i) {
        t.showShareMenu(), this.dailyTaskNotifiyView = new a(this);
    },
    onReady: function() {
        this.createCross();
    },
    onShow: function() {
        var t = this;
        this.dailyTaskNotifiyView.onShow(), i.onHomeShow(function() {
            t.refrshUI();
        }), this.ad && this.ad.start && this.ad.start();
    },
    onHide: function() {
        this.dailyTaskNotifiyView.onHide(), this.ad && this.ad.stop && this.ad.stop();
    },
    onUnload: function() {
        this.dailyTaskNotifiyView.onUnload(), this.ad && this.ad.stop && this.ad.stop();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var i = n.shareManager.getDCShareData("dc_normal");
        return n.shareConf(i);
    },
    refrshUI: function() {
        var t = i.getData(), a = {};
        a.goldStr = n.mainData.role.gold, a.nounStr = "" + (t.maxNum - t.num), a.dcData = i.getResList(), 
        this.setData(a);
    },
    createCross: function() {
        var i = this, a = n.systemInfo.SDKVersion;
        this.canShowAd = t.compareVersion(a, "2.0.7") < 0, this.ad = n.crossSDK.createAd({
            adsId: "Lzy74GX308",
            gameId: "tnwz",
            success: this.refreshAD.bind(this),
            fail: function(a) {
                console.log(a), t.setPageData(i, {
                    linkImg: ""
                });
            }
        }), this.ad.onChange(this.refreshAD.bind(this));
    },
    refreshAD: function(i) {
        try {
            var a = this.ad.getGoGameParams(), n = {};
            n.linkImg = i.gif_info.gif_url, n.linkAppId = a.appId, n.linkPath = a.path, a.extraData && (n.linkExtraData = a.extraData), 
            t.setPageData(this, n);
        } catch (i) {
            t.setPageData(this, {
                linkImg: ""
            });
        }
    },
    onTapLinkBtn: function() {
        this.canShowAd ? this.ad.show() : (this.ad.manualClick(), this.ad.reset());
    },
    onTapJackpotBtn: function() {
        var t = this;
        this.btnLock || (this.btnLock = !0, wx.navigateTo({
            url: "/page/shop/lucky_wheel/lucky_wheel",
            complete: function() {
                setTimeout(function() {
                    t.btnLock = !1;
                }, 500);
            }
        }));
    },
    onTapHardBtn: function() {
        this.btnLock || (this.btnLock = !0, this.navigateToBegin(3));
    },
    onTapMiddleBtn: function() {
        this.btnLock || (this.btnLock = !0, this.navigateToBegin(2));
    },
    onTapNomalBtn: function() {
        this.btnLock || (this.btnLock = !0, this.navigateToBegin(1));
    },
    navigateToBegin: function(a) {
        var o = this, e = i.getData(), s = i.getRes(a);
        return e.num >= e.maxNum ? (t.ShowToast("挑战次数已用完。"), void (this.btnLock = !1)) : s.fee > n.mainData.role.gold ? (t.ShowToast("王者币不足"), 
        void (this.btnLock = !1)) : void wx.navigateTo({
            url: "/page/dailyChallenge/begin/dailyChallengeBegin?id=" + a,
            complete: function() {
                setTimeout(function() {
                    o.btnLock = !1;
                }, 500);
            }
        });
    }
};

Page(o);