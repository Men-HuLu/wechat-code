function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i]);
    }
    return t;
}, a = t(require("../../../common/httpClient")), i = t(require("../../../config/index")), n = t(require("../../../common/login")), s = getApp();

Component({
    properties: {
        hiddenstate: {
            type: Boolean,
            value: !0
        },
        isscroll: {
            type: Boolean,
            value: !0
        },
        roomid: {
            type: Number,
            value: 0
        },
        giftList: {
            type: Array,
            value: [],
            observer: function(t) {
                t.length && this.setSwiperItemData();
            }
        }
    },
    data: {
        seltGiftId: null,
        giftItem: {},
        sentGiftindex: 0,
        seltGiftObj: {},
        isSelGift: !1,
        swiperItemData: [],
        yuwan: 0,
        yuchi: 0,
        yuwanStr: "-",
        yuchiStr: "-",
        animationData: {},
        sentGiftList: [],
        giftAnimateStyle: "",
        platform: "android"
    },
    methods: {
        clickGiftPanelWrap: function() {
            clearInterval(this.sentGiftInterval), this.sentGiftInterval = null, this.setData({
                giftItem: {},
                hiddenstate: !0,
                isscroll: !0
            }), this.triggerEvent("changeGiftPanelState", {
                hiddenstate: !0,
                isscroll: !0
            });
        },
        stopClick: function() {},
        clickGiftItem: function(t) {
            var a = t.currentTarget, i = a.dataset.item, n = a.dataset.index;
            i && i.id && !i.expect && this.setData({
                seltGiftObj: e({}, i, {
                    index: n
                }),
                isSelGift: !0,
                seltGiftId: i.id
            });
        },
        clickJumpTo: function() {
            "android" === s.globalData.systemInfo.platform && wx.navigateTo({
                url: "rechargeexplain"
            });
        },
        clickSendGift: function() {
            var t = this, e = this;
            if (!(e.data.seltGiftId <= 0 || "-" == e.data.yuwanStr)) {
                var a = s.getUrlParam("roomId");
                n.default.checkBoundDYAccount("room", a, function(i) {
                    var n = wx.getStorageSync("dyUserInfo") || {}, o = wx.getStorageSync("dyRoomInfo") || {};
                    if (n.uid !== o.owner_uid) {
                        if (2 == e.data.seltGiftObj.type && (e.data.yuchi < e.data.seltGiftObj.pc ? wx.showModal({
                            title: "",
                            content: "鱼翅不足，请前往斗鱼公众号充值",
                            confirmText: "充值说明",
                            confirmColor: "#ff7d23",
                            success: function(t) {
                                t.confirm && wx.navigateTo({
                                    url: "rechargeexplain"
                                });
                            }
                        }) : wx.getNetworkType({
                            success: function(t) {
                                "none" != t.networkType ? e.sendGiftRequest({
                                    gid: e.data.seltGiftId,
                                    rid: a,
                                    log_token: i
                                }).then(function(t) {
                                    0 === t.code ? (2 === e.data.seltGiftObj.type ? e.setData({
                                        yuchi: t.data.sb,
                                        yuchiStr: s.changeData(t.data.sb, 2)
                                    }) : e.setData({
                                        yuwan: t.data.ycb,
                                        yuwanStr: s.changeData(t.data.ycb, 2)
                                    }), e.sentGiftHandle()) : 50001 === t.code ? wx.showToast({
                                        title: t.data,
                                        icon: "none"
                                    }) : wx.showToast({
                                        title: "赠送失败",
                                        icon: "none"
                                    });
                                }).catch(function() {
                                    console.log("网络出现问题了哦...");
                                }) : wx.showToast({
                                    title: "网络出现错误了哦...",
                                    icon: "none"
                                });
                            }
                        })), 1 == e.data.seltGiftObj.type) if (e.data.yuwan < e.data.seltGiftObj.pc) wx.showToast({
                            title: "鱼丸不足",
                            icon: "none"
                        }); else {
                            t.triggerEvent("exec", {
                                msg: "js_giveGift",
                                data: {
                                    gfid: e.data.seltGiftId,
                                    type: e.data.seltGiftObj.type,
                                    num: 1
                                }
                            }), e.sentGiftHandle();
                            var r = e.data.yuwan - e.data.seltGiftObj.pc;
                            e.setData({
                                yuwan: r,
                                yuwanStr: s.changeData(r, 2)
                            });
                        }
                    } else wx.showToast({
                        title: "不能在自己房间赠送礼物",
                        icon: "none"
                    });
                });
            }
        },
        sendGiftRequest: function(t) {
            return a.default.request({
                url: i.default.API.SEND_GIFT_REQ,
                method: "POST",
                data: t
            });
        },
        setSwiperItemData: function() {
            var t = this.data.giftList, e = t.length, a = Math.ceil(e / 8);
            if (e > 0) {
                for (var i = e; i < 8 * a; i++) t.push({
                    expect: 1,
                    id: -1,
                    mobile_icon_v2: "../../../assets/room/defaultgift.png"
                });
                for (var n = [], s = 0; s < a; s++) n.push(t.slice(8 * s, 8 * (s + 1)));
                this.setData({
                    swiperItemData: n
                });
            }
        },
        sentGiftHandle: function() {
            var t = this;
            if (this.setData({
                sentGiftindex: this.data.sentGiftindex + 1
            }), this.sentGiftInterval) this.oseltGiftObj !== this.data.seltGiftObj && (this.setData({
                sentGiftindex: 0
            }), clearInterval(this.sentGiftInterval), this.sentGiftInterval = null, this.sentGiftHandle()); else {
                var e = this.oseltGiftObj = this.data.seltGiftObj;
                this.sentGiftAnimate(0, e);
                var a = e.index % 8;
                this.data.giftAnimateStyle = a > 3 ? "top: 234rpx!important; left: " + (67 + 187 * (a - 4)) + "rpx!important;" : "top: 37rpx!important; left: " + (67 + 187 * a) + "rpx!important;", 
                this.setData({
                    giftAnimateStyle: this.data.giftAnimateStyle
                }), this.sentGiftInterval = setInterval(function() {
                    t.sentGiftAnimate(0, e);
                }, 1e3);
            }
        },
        sentGiftAnimate: function(t, e) {
            if (this.data.sentGiftindex > 0) {
                this.setData({
                    sentGiftindex: this.data.sentGiftindex - 1
                });
                var a = this;
                a.data.giftItem.sentGiftAnimate || (a.data.giftItem.sentGiftAnimate = a.wxAnimate), 
                a.data.giftItem.seltGiftObj = e, a.data.giftItem.sentGiftAnimate.translateY(-50).opacity(1).step({
                    duration: 250
                }).translateY(-100).step({
                    duration: 250
                }).translateY(-150).opacity(0).step({
                    duration: 250
                }).translateY(0).step({
                    duration: 10
                }), a.data.giftItem.animationData = a.data.giftItem.sentGiftAnimate.export(), a.data.giftItem.animationData.t = +new Date(), 
                a.setData({
                    giftItem: a.data.giftItem
                });
            } else clearInterval(this.sentGiftInterval), this.sentGiftInterval = null;
        },
        listenToEvent: function() {
            var t = this;
            s.events.addListener("room_data_info", function(e) {
                "memberinfores" == e.type && t.setData({
                    yuchi: e.gold / 100,
                    yuchiStr: s.changeData(e.gold / 100, 2) || 0,
                    yuwan: e.silver,
                    yuwanStr: s.changeData(e.silver, 2) || 0
                });
            });
        }
    },
    behaviors: [],
    created: function() {},
    attached: function() {},
    ready: function() {
        this.wxAnimate = wx.createAnimation({
            timingFunction: "ease-in-out"
        });
    },
    moved: function() {},
    detached: function() {}
});