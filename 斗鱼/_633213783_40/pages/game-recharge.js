function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../config/index")), o = (t(require("../common/util")), t(require("../common/point")), 
t(require("../common/navigator")), t(require("../common/httpClient"))), e = t(require("../common/storage")), n = getApp();

Page({
    data: {
        userInfo: {},
        showModal: !1,
        showToast: !1,
        cardList: [],
        chooseItem: {},
        isActive: 0,
        fishBall: 0,
        isEmpty: !1,
        isError: !1,
        toastMsg: "下载并打开斗鱼APP，直播间抢宝箱免费获取鱼丸！",
        isLogin: !1,
        isFromAppShare: !1,
        dyUserInfo: {},
        logToken: "",
        hasCard: !1
    },
    chooseNav: function(t) {
        var a = 0 != t;
        this.setData({
            isActive: a
        });
    },
    showRechargeModal: function(t) {
        var a = t.currentTarget.dataset.item;
        this.setData({
            chooseItem: a,
            showModal: !0
        });
    },
    clickLoginBtn: function() {
        n.gotoLogin("game-recharge");
    },
    hideModal: function() {
        this.setData({
            showModal: !1
        });
    },
    goUse: function(t) {
        var a = t.currentTarget.dataset.item;
        a.card_code ? wx.openCard({
            cardList: [ {
                cardId: a.card_ext.cardId,
                code: a.card_code
            } ],
            success: function(t) {
                console.log("openCard");
            },
            fail: function(t) {
                console.log("fail");
            }
        }) : this.reChargeGift(a.card_ext);
    },
    goRecharge: function(t) {
        console.log(t);
        var a = t.detail.formId;
        this.getCardExt(a);
    },
    showToast: function() {
        this.setData({
            toastMsg: "下载并打开斗鱼APP，直播间抢宝箱免费获取鱼丸！",
            showToast: !0
        });
    },
    hideToast: function() {
        this.setData({
            showToast: !1
        });
    },
    reload: function() {
        this.init();
    },
    openCard: function() {
        wx.openCard({
            cardList: [],
            success: function(t) {}
        });
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.init();
    },
    pulldownFinish: function() {
        wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
    },
    getCardExt: function(t) {
        var e = this;
        o.default.request({
            url: a.default.API.GET_CARD_EXT,
            method: "POST",
            data: {
                token: n.globalData.userInfo.token,
                log_token: this.data.logToken,
                id: this.data.chooseItem.id,
                form_id: t,
                did: n.globalData.did
            }
        }).then(function(t) {
            0 === t.code && t.data.card_ext ? (e.setData({
                showModal: !1
            }), wx.showToast({
                title: "分享成功，获得游戏礼包，去查看详情吧~",
                icon: "none"
            }), e.init()) : (e.setData({
                showModal: !1
            }), t.code.toString().length < 4 ? wx.showToast({
                title: t.data,
                icon: "none"
            }) : wx.showToast({
                title: "礼物兑换失败",
                icon: "none"
            }));
        }, function() {
            e.setData({
                showModal: !1
            }), wx.showToast({
                title: "网络出现错误了哦...",
                icon: "none"
            });
        }).catch(function(t) {
            wx.showToast({
                title: "网络出现错误了哦...",
                icon: "none"
            });
        });
    },
    reChargeGift: function(t) {
        var a = this;
        wx.addCard({
            cardList: [ t ],
            success: function(t) {
                console.log(t.cardList[0]), t.cardList && t.cardList.length > 0 && a.postCardStatus(t.cardList[0]), 
                a.data.userInfo.gold1 -= a.data.chooseItem.fish_ball, a.init(), a.setData({
                    fishBall: n.changeData(a.data.userInfo.gold1, 2),
                    showModal: !1
                });
            },
            fail: function(t) {
                a.init(), a.setData({
                    showModal: !1
                });
            }
        });
    },
    postCardStatus: function(t) {
        var e = JSON.parse(t.cardExt);
        o.default.request({
            url: a.default.API.CARD_STATUS,
            method: "POST",
            data: {
                token: n.globalData.userInfo.token,
                log_token: this.data.logToken,
                code: t.code,
                outer_str: e.outer_str
            }
        }).then(function(t) {}, function(t) {});
    },
    getUserInfoFn: function() {
        var t = this;
        o.default.request({
            url: a.default.API.USER_INFO,
            method: "POST",
            data: {
                log_token: this.data.logToken,
                did: n.globalData.did
            }
        }).then(function(a) {
            if (a) {
                var o = parseInt(a.code, 10);
                if (0 === o) {
                    var e = a.data;
                    e && t.setData({
                        userInfo: e,
                        fishBall: n.changeData(e.gold1, 2)
                    });
                } else 10007 === o || wx.showToast({
                    title: a.data || "网络异常",
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
    getCardList: function() {
        var t = this;
        o.default.request({
            url: a.default.API.CARD_LIST,
            method: "POST",
            data: {
                token: n.globalData.userInfo.token,
                log_token: this.data.logToken
            }
        }).then(function(a) {
            if (t.pulldownFinish(), t.setData({
                isEmpty: !1,
                isError: !1
            }), 0 === a.code) if (a.data && a.data.length > 0) {
                1 === a.data[0].is_buy && e.default.set("gameRecharged", 1), t.setData({
                    cardList: a.data
                });
                for (var o in t.data.cardList) 0 == t.data.cardList[o].is_buy && t.data.cardList[o].quantity > 0 && t.setData({
                    hasCard: !0
                });
            } else t.setData({
                isEmpty: !0
            }); else t.setData({
                isError: !0
            });
        }, function(a) {
            t.pulldownFinish(), t.setData({
                isError: !0
            });
        }).catch(function(a) {
            t.pulldownFinish(), t.setData({
                isError: !0
            });
        });
    },
    init: function() {
        var t = this, a = wx.getStorageSync("dyUserInfo") || {}, o = a && a.localToken || "", e = !!o;
        this.setData({
            dyUserInfo: a,
            logToken: o,
            isLogin: e
        }), n.getToken(function() {
            t.getCardList();
        }), this.getUserInfoFn();
    },
    onLoad: function(t) {
        console.log(t), this.init(), this.judgeIsAppShare();
    },
    onHide: function() {
        this.setData({
            hasCard: !1
        });
    },
    onShareAppMessage: function(t) {
        var a = this;
        return {
            title: "腾讯游戏礼包限时免费兑换~点击领取 ↓",
            path: "/pages/game-recharge",
            imageUrl: "https://sta-op.douyucdn.cn/dyfelocal/act/5b4867e38d592a7dea394d93/1536569123384.png?timestamp=1536659045",
            success: function() {
                "button" === t.from && a.getCardExt();
            }
        };
    },
    judgeIsAppShare: function() {
        var t = n.getUrlParam("from"), a = parseInt(n.globalData.scene, 10);
        "wxmp" === t && 1036 === a || 1069 === a ? this.setData({
            isFromAppShare: !0
        }) : this.setData({
            isFromAppShare: !1
        });
    }
});