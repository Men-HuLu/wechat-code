function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function o(t, o, e) {
    return o in t ? Object.defineProperty(t, o, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[o] = e, t;
}

var e = t(require("../common/httpClient.js")), n = t(require("../config/index")), a = t(require("../common/login")), i = t(require("../common/navigator")), r = t(require("../common/tabBar")), s = getApp();

Page({
    data: {
        isLogin: !1,
        userInfo: {
            nickname: "",
            avatar: "",
            level: "",
            gold: 0,
            gold1: 0
        },
        controlBtnText: "未登录",
        recordList: [],
        platform: ""
    },
    onLoad: function() {
        this.isShowModal = !1, this.setData({
            isShowModal: this.isShowModal
        }), this.init();
    },
    onReady: function() {},
    onShow: function() {
        (this.getDyUserInfo().localToken || "") && !this.isLogin && this.init(), this.getWatchRecordData(), 
        r.default.hideTabBarRedDotByStorage(3, "gameRecharged");
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.init();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onPageScroll: function() {},
    onTabItemTap: function() {},
    clickRechargeBtn: function() {
        "android" === s.globalData.systemInfo.platform && wx.navigateTo({
            url: "rechargeexplain"
        });
    },
    clickGameGiftbag: function() {
        i.default.disDoubleNavigate("game-recharge");
    },
    openLoginItem: function() {
        this.getDyUserInfo().uid || this.gotologinItem();
    },
    clickAccountManagement: function() {
        var t = this;
        wx.showActionSheet({
            itemList: [ "退出登录" ],
            itemColor: "#f00",
            success: function(o) {
                if (0 === o.tapIndex) {
                    var n = t.getDyUserInfo().longToken || "";
                    e.default.request({
                        url: s.globalData.$SYS.authUrl + "/xcx/logout",
                        method: "POST",
                        data: {
                            biz_type: 85,
                            long_token: n
                        }
                    }).then(function(o) {
                        o && (0 === +o.error ? (wx.removeStorageSync("dyUserInfo"), t.setData({
                            isLogin: !1,
                            recordList: [],
                            controlBtnText: "未登录"
                        })) : wx.showToast({
                            title: o.data || "网络异常，请重试",
                            icon: "none",
                            duration: 2e3
                        }));
                    }).catch(function(t) {
                        console.log(t), wx.showToast({
                            title: "网络异常，请重试",
                            icon: "none",
                            duration: 2e3
                        });
                    });
                }
            },
            fail: function(t) {
                console.log(t.errMsg);
            }
        });
    },
    clickLoginBtn: function() {
        this.gotologinItem();
    },
    clickDownloadApp: function() {
        i.default.disDoubleNavigate("download-app");
    },
    clickSeeRecord: function(t) {
        var o = t.currentTarget.dataset.islive, e = t.currentTarget.dataset.roomid, n = 1 == o ? "room?roomId=" + e : "video-room?videoId=" + e;
        wx.navigateTo({
            url: n
        });
    },
    clearRecord: function() {
        var t = this;
        "清除" === this.data.controlBtnText ? wx.showActionSheet({
            itemList: [ "清除记录" ],
            itemColor: "#f00",
            success: function(e) {
                if (0 === e.tapIndex) {
                    var n = t.getDyUserInfo().uid;
                    n && (wx.setStorageSync("myWatchRecord", o({}, n, [])), t.setData({
                        recordList: []
                    }), t.getWatchRecordData());
                }
            },
            fail: function(t) {
                console.log(t.errMsg);
            }
        }) : "未登录" === this.data.controlBtnText && this.gotologinItem();
    },
    getDyUserInfo: function() {
        return wx.getStorageSync("dyUserInfo") || {};
    },
    gotologinItem: function() {
        a.default.gotoLogin("mycenter");
    },
    showModalTip: function(t, o) {
        var e = this;
        wx.showModal({
            title: "提示",
            content: t,
            success: function(t) {
                t.confirm && wx.navigateTo({
                    url: o
                }), e.isShowModal = !0, e.setData({
                    isShowModal: e.isShowModal
                });
            }
        });
    },
    loginCallBack: function() {
        var t = s.getUrlParam("type"), o = s.getUrlParam("param");
        if (!this.isShowModal) switch (t) {
          case "room":
            this.showModalTip("是否返回直播间？", "room?roomId=" + o);
            break;

          case "game-recharge":
            this.showModalTip("是否返回游戏礼包页面？", "game-recharge");
            break;

          case "treasureBox":
            this.showModalTip("是否返回邀请好友领鱼丸活动页面？", "treasureBox");
        }
    },
    getUserInfoFn: function() {
        var t = this, o = this.getDyUserInfo().localToken || "";
        e.default.request({
            url: n.default.API.USER_INFO,
            method: "POST",
            data: {
                log_token: o,
                did: s.globalData.did
            }
        }).then(function(o) {
            if (o) {
                var e = parseInt(o.code, 10);
                if (0 === e) {
                    var n = o.data;
                    if (n) {
                        var a = t.getDyUserInfo(), i = n && n.username || "";
                        n.gold = s.changeData(n.gold, 2), n.gold1 = s.changeData(n.gold1, 2), wx.setStorageSync("dyUserInfo", Object.assign(a, {
                            userName: i
                        })), t.setData({
                            userInfo: Object.assign(t.data.userInfo, n),
                            isLoading: !1,
                            isShowMyInfo: !0
                        }), t.loginCallBack();
                    }
                } else 10007 === e ? t.isLogin = !1 : wx.showToast({
                    title: o.data || "网络异常",
                    icon: "none",
                    duration: 2e3
                });
                setTimeout(function() {
                    wx.stopPullDownRefresh();
                }, 1e3);
            }
        }).catch(function() {
            wx.showToast({
                title: "网络异常",
                icon: "none",
                duration: 2e3
            }), setTimeout(function() {
                wx.stopPullDownRefresh();
            }, 1e3);
        });
    },
    getWatchRecordData: function() {
        var t = this.getDyUserInfo().uid;
        if (t) {
            var o = wx.getStorageSync("myWatchRecord") || {};
            this.setData({
                recordList: o[t] || []
            }), this.setData({
                controlBtnText: this.data.recordList.length ? "清除" : "暂无观看记录"
            });
        }
    },
    initLoginState: function(t) {
        t ? (this.setData({
            isLogin: !0
        }), this.getUserInfoFn()) : this.setData({
            isLogin: !1
        });
    },
    init: function() {
        var t = this, o = this.getDyUserInfo().localToken || "";
        if (s.globalData.isH5Logining) var e = setInterval(function() {
            !(o = t.getDyUserInfo().localToken || "") && s.globalData.isH5Logining || (clearInterval(e), 
            t.initLoginState(o), t.getWatchRecordData());
        }, 200); else this.initLoginState(o);
        this.setData({
            platform: s.globalData.systemInfo.platform
        });
    }
});