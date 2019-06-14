function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../config/index")), a = t(require("../common/util")), n = t(require("../common/point")), o = t(require("../common/navigator")), i = t(require("../common/httpClient")), s = getApp();

Page({
    data: {
        authDisplay: !1,
        showEndTime: !1,
        endTimeText: "",
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        showMask: {
            maskDisplay: !1,
            titleUrl: "https://sta-op.douyucdn.cn/dyfelocal/act/5b4867e38d592a7dea394d93/congratulation.png",
            textDisplay: "none",
            acHeight: null
        },
        support: 0,
        rew: {
            0: 0,
            1: 0,
            5: 0,
            15: 0,
            30: 0
        },
        friendsList: [],
        proWidth: 20,
        needFrNum: 1,
        needYwNum: 200,
        getDisabled: !1,
        animationData: {},
        marqueePace: 3,
        interval: 20,
        fadeoutPace: .01,
        staticInterval: null,
        src: "",
        name: "",
        num: 0,
        token: "",
        logToken: "",
        did: "",
        dyUserInfo: {},
        nickName: "",
        avatar: "",
        inviterh: "",
        bulletsIndex: 0
    },
    bindGetUserInfo: function(t) {
        this.setData({
            authDisplay: !1,
            showMask: {
                acHeight: null
            }
        });
        var e = wx.getStorageSync("authorizedCache") || {};
        wx.setStorageSync("authorizedCache", Object.assign(e, {
            noo: !0,
            nickName: t.detail.userInfo.nickName || "",
            avatar: t.detail.userInfo.avatarUrl || ""
        })), this.supportFriends(wx.getStorageSync("authorizedCache").nickName, wx.getStorageSync("authorizedCache").avatar, this.data.inviterh);
    },
    bindCancel: function() {
        this.setData({
            authDisplay: !1,
            showMask: {
                acHeight: null
            }
        });
        var t = wx.getStorageSync("authorizedCache") || {};
        wx.setStorageSync("authorizedCache", Object.assign(t, {
            noo: !1,
            nickName: "匿名好友",
            avatar: "https://sta-op.douyucdn.cn/dyfelocal/act/5b4867e38d592a7dea394d93/default_header.png"
        })), this.supportFriends(wx.getStorageSync("authorizedCache").nickName, wx.getStorageSync("authorizedCache").avatar, this.data.inviterh);
    },
    clickGetNowBtn: function() {
        this.data.dyUserInfo.uid ? this.getAwards() : s.gotoLogin("treasureBox"), this.setData({
            showMask: {
                maskDisplay: !1,
                acHeight: null
            }
        }), n.default.postPoint(e.default.Point.CLICK_ACT_GET, e.default.Point.PAGE_STUDIO_L);
    },
    clickMask: function() {
        this.setData({
            getDisabled: !1,
            showMask: {
                maskDisplay: !1,
                acHeight: null
            }
        });
    },
    clickWindow: function() {},
    gotoLogin: function() {
        s.gotoLogin("treasureBox");
    },
    getAwards: function() {
        var t = this, a = this.data.dyUserInfo && this.data.dyUserInfo.localToken || "";
        i.default.request({
            url: e.default.API.TREASURE_GET_YUWAN,
            method: "POST",
            data: {
                token: this.data.token,
                log_token: a
            }
        }).then(function(e) {
            if (0 === e.error) {
                var a = 0;
                for (var n in t.data.rew) if (Number(n) <= t.data.support && 0 === t.data.rew[n]) switch (Number(n)) {
                  case 0:
                    a += 100;
                    break;

                  case 1:
                    a += 200;
                    break;

                  case 5:
                    a += 500;
                    break;

                  case 15:
                    a += 800;
                    break;

                  case 30:
                    a += 1500;
                }
                t.setData({
                    getDisabled: !0,
                    rew: e.data.rew
                }), wx.showToast({
                    title: a + "鱼丸已领取，可到个人中心查看",
                    icon: "none",
                    duration: 3e3
                });
            } else 40011 !== e.error && wx.showToast({
                title: e.msg,
                icon: "none",
                duration: 3e3
            });
        }).catch(function() {});
    },
    clickMoreHelpInfo: function() {
        o.default.disDoubleNavigate("invitee");
    },
    onPullDownRefresh: function() {
        this.supportFriends(wx.getStorageSync("authorizedCache").nickName, wx.getStorageSync("authorizedCache").avatar, "");
    },
    pulldownFinish: function() {},
    onLoad: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if (this.setData({
            dyUserInfo: wx.getStorageSync("dyUserInfo") || {},
            token: s.globalData.userInfo.token || "",
            did: s.globalData.did || ""
        }), Math.floor(Date.now() / 1e3) >= s.globalData.$SYS.actEndTime || 1 === s.globalData.$SYS.actDaySw) {
            var o = {};
            o.showEndTime = !0, o.showMask = {
                acHeight: "100%"
            }, Math.floor(Date.now() / 1e3) >= s.globalData.$SYS.actEndTime ? o.endTimeText = "很抱歉，活动已结束" : o.endTimeText = "鱼丸礼包本日兑换数量已达上限，请明天再来", 
            this.setData(o);
        }
        var i = a.default.scanCodeParse(t);
        i && (t = i), t.ct && ("IOS" === t.ct.toUpperCase() ? t.chanCode = "180913dyios" : "ANDROID" === t.ct.toUpperCase() ? t.chanCode = "180913dyAndroid" : "WEB" === t.ct.toUpperCase() && (t.chanCode = "180913dyweb"));
        var r = "", d = "", u = wx.getStorageSync("authorizedCache") || {};
        r = u && u.nickName || "", d = u && u.avatar || "", t.inviterh === s.globalData.userInfo.hashOid && (t.inviterh = ""), 
        t.inviterh ? (this.setData({
            inviterh: t.inviterh
        }), t.chanCode = "180913hyfxlj", void 0 === u.noo ? this.setData({
            authDisplay: !0,
            showMask: {
                acHeight: "100%"
            }
        }) : this.supportFriends(r, d, this.data.inviterh)) : this.supportFriends(r, d, this.data.inviterh);
        var c = {
            chanCode: t.chanCode
        };
        n.default.postPoint(e.default.Point.INIT_PAGE_ACT_PNEW, e.default.Point.PAGE_ACT_PNEW, 0, c);
    },
    supportFriends: function(t, e, a) {
        var n = this, o = this.data.token;
        o && this.postTreasureSupport(a, t, e, o), o || s.getToken(function(o) {
            n.setData({
                token: o.token
            }), n.postTreasureSupport(a, t, e, o.token);
        }, 1);
    },
    postTreasureSupport: function(t, a, n, o) {
        var s = this;
        i.default.request({
            url: e.default.API.TREASURE_SUPPORT,
            method: "POST",
            data: {
                token: o,
                inviterh: t,
                inviteeName: a,
                inviteeIcon: n,
                did: this.data.did
            }
        }).then(function(e) {
            var a = {};
            if (0 === e.error) {
                "" === t ? (wx.getStorageSync("loaded") || {}).comeIn ? (s.data.dyUserInfo.uid ? s.getLatestHelp() : a.getDisabled = !1, 
                s.setData(a)) : (a.showMask = {
                    maskDisplay: !0,
                    acHeight: "100%"
                }, s.setData(a)) : (wx.showToast({
                    title: "助力成功!",
                    icon: "none",
                    duration: 3e3
                }), a.showMask = {
                    maskDisplay: !0,
                    titleUrl: "https://sta-op.douyucdn.cn/dyfelocal/act/5b4867e38d592a7dea394d93/help_succ.png",
                    textDisplay: "inline-block",
                    acHeight: "100%"
                }, s.setData(a)), wx.stopPullDownRefresh();
                var n = wx.getStorageSync("loaded") || {};
                wx.setStorageSync("loaded", Object.assign(n, {
                    comeIn: !0
                }));
            } else 40001 === e.error ? (wx.showToast({
                title: e.msg,
                icon: "none",
                duration: 3e3
            }), wx.stopPullDownRefresh()) : ("" !== t && wx.showToast({
                title: e.msg,
                icon: "none",
                duration: 3e3
            }), s.data.dyUserInfo.uid ? s.getLatestHelp() : a.getDisabled = !1, s.setData(a), 
            wx.stopPullDownRefresh());
        }).catch(function(t) {
            wx.showToast({
                title: "网络异常",
                icon: "none",
                duration: 3e3
            }), wx.stopPullDownRefresh();
        });
    },
    getLatestHelp: function() {
        var t = this, a = this.data.dyUserInfo;
        a.uid && this.setData({
            logToken: a.localToken
        }), i.default.request({
            url: e.default.API.TREASURE_HELP,
            method: "POST",
            data: {
                token: this.data.token,
                log_token: this.data.logToken,
                did: s.globalData.did || ""
            }
        }).then(function(e) {
            0 === e.error ? (t.setData({
                support: e.data.support,
                rew: e.data.rew,
                friendsList: e.data.list
            }), t.updateProgress(e.data.support, e.data.rew)) : wx.showToast({
                title: e.msg,
                icon: "none",
                duration: 3e3
            }), wx.stopPullDownRefresh();
        }).catch(function(t) {
            wx.showToast({
                title: "网络异常",
                icon: "none",
                duration: 3e3
            }), wx.stopPullDownRefresh();
        });
    },
    updateProgress: function(t, e) {
        var a = {};
        switch (t) {
          case 0:
            a.proWidth = 41, a.needFrNum = 1, a.needYwNum = 200;
            break;

          case 1:
            a.proWidth = 144, a.needFrNum = 4, a.needYwNum = 500;
            break;

          case 5:
            a.proWidth = 247, a.needFrNum = 10, a.needYwNum = 800;
            break;

          case 15:
            a.proWidth = 350, a.needFrNum = 15, a.needYwNum = 1500;
            break;

          case 30:
            a.proWidth = 491;
            break;

          default:
            t >= 2 && t <= 4 ? (a.needFrNum = 5 - t, a.needYwNum = 500, a.proWidth = 165 + 64 * (t - 1) / 4) : t >= 6 && t <= 14 ? (a.needFrNum = 15 - t, 
            a.needYwNum = 800, a.proWidth = 268 + 64 * (t - 5) / 10) : t >= 16 && t <= 29 ? (a.needFrNum = 30 - t, 
            a.needYwNum = 1500, a.proWidth = 371 + 64 * (t - 15) / 15) : a.proWidth = 491;
        }
        var n = !0;
        for (var o in e) if (Number(o) <= t && 0 === e[o]) {
            n = !1;
            break;
        }
        a.getDisabled = n, this.setData(a);
    },
    getBullets: function() {
        var t = this;
        i.default.request({
            url: e.default.API.TREASURE_BULLET,
            method: "POST",
            data: {
                did: this.data.did
            }
        }).then(function(e) {
            0 === e.error ? t.showBullets(e.data) : wx.showToast({
                title: e.msg,
                icon: "none",
                duration: 3e3
            });
        }).catch(function(t) {
            wx.showToast({
                title: "网络异常",
                icon: "none",
                duration: 3e3
            });
        });
    },
    showBullets: function(t) {
        var e = this, a = Math.floor(Math.random() * t.length);
        this.setData({
            src: t[a].pic,
            name: t[a].nickname,
            num: t[a].yuwan
        }), this.bulletsAnimation(), this.staticInterval = setInterval(function() {
            var a = Math.floor(Math.random() * t.length);
            e.setData({
                src: t[a].pic,
                name: t[a].nickname,
                num: t[a].yuwan
            }), e.bulletsAnimation();
        }, 6e3);
    },
    bulletsAnimation: function() {
        var t = this, e = wx.createAnimation({
            duration: 3e3,
            timingFunction: "ease"
        });
        e.opacity(1).translateX(-150).step(), this.setData({
            animationData: e.export()
        }), setTimeout(function() {
            e.opacity(0).translateX(150).step(), t.setData({
                animationData: e.export()
            });
        }, 4e3);
    },
    onReady: function() {},
    onShow: function() {
        this.getBullets();
    },
    onHide: function() {
        clearInterval(this.staticInterval);
    },
    onUnload: function() {
        clearInterval(this.staticInterval);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "->点一点帮我助力",
            path: "pages/treasureBox?inviterh=" + s.globalData.userInfo.hashOid,
            imageUrl: "https://sta-op.douyucdn.cn/dyfelocal/act/5b4867e38d592a7dea394d93/share.jpg"
        };
    },
    onPageScroll: function() {},
    onTabItemTap: function() {}
});