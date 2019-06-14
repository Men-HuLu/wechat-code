var n = Object.assign || function(n) {
    for (var a = 1; a < arguments.length; a++) {
        var t = arguments[a];
        for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i]);
    }
    return n;
}, a = {
    giftNumArr: [ 0, -1, -1, -1 ],
    animationBannerData: {},
    animationPicData: {},
    animationNumData: {},
    isTimerRunning: !1,
    timeRunner: null
}, t = getApp();

Component({
    properties: {},
    data: {
        bannerList: [],
        UP_DIS: 60,
        DOWN_DIS: -60,
        animIndex: 1,
        curIndex: 0,
        animList: []
    },
    methods: {
        runExpireTimer: function(n) {
            var a = this, t = this.data.bannerList[n];
            t.isTimerRunning || (t.isTimerRunning = !0, t.timeRunner = setInterval(function() {
                var i = +new Date();
                t && i >= t.expireTime && (a.endBannerAnimation(n), clearInterval(t.timeRunner));
            }, 1e3));
        },
        checkBannerExist: function(n) {
            return this.data.bannerList.some(function(a) {
                return a.bannerID == n.bannerID;
            });
        },
        getBannerLen: function() {
            return this.data.bannerList.filter(function(n) {
                return n && n.bannerID;
            }).length;
        },
        dealBanner: function(n) {
            var t = this, i = this.data.bannerList;
            if (t.checkBannerExist(n)) i[0].bannerID == n.bannerID ? (t.data.curIndex = 0, t.data.animIndex = 1) : (t.data.curIndex = 1, 
            t.data.animIndex = 0), Object.assign(i[t.data.curIndex], {
                bannerBg: n.bannerBg,
                contribution: n.contribution,
                expireTime: n.expireTime,
                giftNum: n.giftNum,
                giftNumArr: (n.giftNum + "").split("")
            }), i[t.data.animIndex] && (i[t.data.animIndex].animationNumData = {}, i[t.data.animIndex].animationNumData.t = +new Date()), 
            this.setData({
                bannerList: i
            }), i[t.data.curIndex].isTimerRunning ? t.startNumberAnimation(t.data.curIndex) : t.startBanner(t.data.curIndex); else if (a.giftNumArr = (n.giftNum + "").split(""), 
            n = Object.assign({}, n, a), 0 == t.getBannerLen()) t.data.curIndex = 0, t.data.animIndex = 1, 
            t.data.animList[0] = n, i[t.data.curIndex] = n, t.setData({
                bannerList: i
            }), t.startBanner(t.data.curIndex), t.runExpireTimer(t.data.curIndex); else if (1 == t.getBannerLen()) void 0 === i[0].bannerID ? (t.data.curIndex = 0, 
            t.data.animIndex = 1) : (t.data.curIndex = 1, t.data.animIndex = 0), n.contribution >= i[t.data.animIndex].contribution ? (i[t.data.animIndex].bannerID === t.data.animList[0].bannerID && t.insertAnimation(t.data.animIndex, !0), 
            t.data.animList.unshift(n), i[t.data.curIndex] = n, this.setData({
                animList: t.data.animList,
                bannerList: t.data.bannerList
            }), t.startBanner(t.data.curIndex)) : (t.data.animList[1] = n, i[t.data.curIndex] = n, 
            this.setData({
                animList: t.data.animList,
                bannerList: i
            }), t.startBanner(t.data.curIndex, t.data.UP_DIS)), t.runExpireTimer(t.data.curIndex); else if (2 == t.getBannerLen()) {
                var e = 0;
                i[0].contribution > i[1].contribution ? e = 1 : i[0].contribution == i[1].contribution && i[1].bannerID === t.data.animList[1].bannerID && (e = 1), 
                t.endBannerAnimation(e, function() {
                    void 0 === i[0].bannerID ? (t.data.curIndex = 0, t.data.animIndex = 1) : (t.data.curIndex = 1, 
                    t.data.animIndex = 0), n.contribution >= i[t.data.animIndex].contribution ? (i[t.data.animIndex].bannerID === t.data.animList[0].bannerID && t.insertAnimation(t.data.animIndex, !0), 
                    t.data.animList.unshift(n), i[t.data.curIndex] = n, t.setData({
                        animList: t.data.animList,
                        bannerList: i
                    }), t.startBanner(t.data.curIndex)) : (i[t.data.animIndex].bannerID === t.data.animList[1].bannerID && t.insertAnimation(t.data.animIndex), 
                    t.data.animList[1] = n, i[t.data.curIndex] = n, t.setData({
                        animList: t.data.animList,
                        bannerList: i
                    }), t.startBanner(t.data.curIndex, t.data.UP_DIS)), t.runExpireTimer(t.data.curIndex);
                });
            }
        },
        insertAnimation: function(a, t) {
            var i = this.data.bannerList, e = i[a], r = t ? this.data.UP_DIS : this.data.DOWN_DIS;
            e.animationBanner.translateY(r).step({
                duration: 300,
                delay: 0
            }), e.animationBannerData = n({}, e.animationBanner.export(), {
                t: +new Date()
            }), this.setData({
                bannerList: i
            });
        },
        startBanner: function(n, a) {
            this.startBannerBgAnimation(n, a), this.startBannerPicAnimation(n), this.startNumberAnimation(n);
        },
        startBannerBgAnimation: function(n, a) {
            var t = a || 0, i = this.data.bannerList;
            i[n].animationBanner = wx.createAnimation({
                duration: 300,
                timingFunction: "ease"
            }), i[n].animationBanner.translate(243, t).step(), i[n].animationBannerData = i[n].animationBanner.export(), 
            i[n].animationBannerData.t = +new Date(), this.setData({
                bannerList: i
            });
        },
        startBannerPicAnimation: function(n) {
            var a = this.data.bannerList;
            a[n].animationPic = wx.createAnimation({
                duration: 300,
                timingFunction: "ease",
                delay: 100
            }), a[n].animationPic.translate(243).step(), a[n].animationPicData = a[n].animationPic.export(), 
            a[n].animationPicData.t = +new Date(), this.setData({
                bannerList: a
            });
        },
        startNumberAnimation: function(n) {
            var a = this.data.bannerList, t = this.data.animIndex;
            a[n].animationNum = wx.createAnimation({
                duration: 150,
                timingFunction: "ease",
                transformOrigin: "0% 0% 0"
            }), a[n].animationNum.opacity(1).step({
                duration: 100
            }).scale(1.3).step({
                duration: 100
            }).scale(1).step({
                duration: 100
            }), a[n].animationNumData = a[n].animationNum.export(), a[n].animationNumData.t = +new Date(), 
            a[t] && (a[t].animationNumData = {}, a[t].animationNumData.t = +new Date()), this.setData({
                bannerList: a
            });
        },
        slideDownBannerAnimation: function(n, a) {
            var t = this, i = this.data.bannerList;
            setTimeout(function() {
                i[n].animationBanner.translateY(t.UP_DIS).step({
                    duration: 300,
                    delay: 0
                }), i[n].animationBannerData = i[n].animationBanner.export(), t.setData({
                    bannerList: i
                }), a && a();
            }, 700);
        },
        endBannerAnimation: function(n, a) {
            var t = this.data.bannerList;
            if (t[n].animationBanner) {
                var i = this;
                t[n].animationBanner.translate(-243).step({
                    duration: 600,
                    delay: 0
                }), t[n].animationBannerData = t[n].animationBanner.export(), t[n].animationPic.translate(-243).step({
                    duration: 600,
                    delay: 0
                }), t[n].animationPicData = t[n].animationPic.export(), t[n].animationNum.opacity(0).step({
                    duration: 100,
                    delay: 0
                }), t[n].animationNumData = t[n].animationNum.export(), this.setData({
                    bannerList: t
                }), setTimeout(function() {
                    t[n] = {}, i.data.animList[1] = {}, i.setData({
                        bannerList: t,
                        animList: i.data.animList
                    }), 0 != i.getBannerLen() && a && a();
                }, 100);
            }
        }
    },
    behaviors: [],
    created: function() {},
    attached: function() {},
    ready: function() {
        var n = this;
        t.events.addListener("gift:banner", function(a) {
            n.dealBanner(a);
        });
    },
    moved: function() {},
    detached: function() {}
});