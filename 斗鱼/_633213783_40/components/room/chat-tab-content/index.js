function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../common/barrage/index")), a = t(require("../relation_behavior")), i = t(require("../../../common/login")), n = t(require("../../../common/navigator")), r = t(require("../../../common/point")), s = t(require("../../../config/index")), o = require("../../../common/tcp/util/acj"), c = getApp();

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
        rid: {
            type: String
        },
        isYz: {
            type: Boolean,
            value: !1
        },
        curroominfo: {
            type: Object,
            value: {}
        }
    },
    data: {
        isShutUp: !1,
        shutUpTime: "2020-01-01 00:00",
        inputValue: "",
        focusHeight: "102rpx",
        adjustPosition: !1,
        sendDMText: "发送",
        isDisable: !1,
        scrollTop: 3999,
        talkCD: 5,
        timer: null,
        barrages: [],
        begainScroll: !1,
        isHolded: !1,
        containerClientHeight: 0,
        containerScrollHeight: 0,
        uid: null,
        isIOS: !1,
        isShowInput: !0,
        tcpConnected: !0
    },
    methods: {
        bindinputEvent: function(t) {
            this.setData({
                inputValue: t.detail.value || ""
            });
        },
        inputConfirm: function(t) {
            var e = t.detail;
            this.setData({
                inputValue: e.value
            }), this.sendBarrage();
        },
        inputFocus: function(t) {
            var e = t.detail;
            if (!this.data.adjustPosition && e && e.height && e.height > 0) {
                var a = 2 * e.height - (c.globalData.isIphoneX ? 68 : 0) + 102;
                this.setData({
                    adjustPosition: !1,
                    focusHeight: a + "rpx",
                    isscroll: !1
                }), this.triggerEvent("toggleChatContent", {
                    flag: !0
                });
            }
            this.setData({
                isShowInput: !1
            });
        },
        inputBlur: function(t) {
            var e = t.detail;
            this.triggerEvent("toggleChatContent", {
                flag: !1
            }), this.lastTriggerTime && Date.now() - this.lastTriggerTime < 1e3 || this.setData({
                focusHeight: "102rpx",
                inputValue: e.value,
                isShowInput: !0,
                isscroll: !0
            });
        },
        clickSendDM: function() {
            this.sendBarrage();
        },
        clickGiftBtn: function() {
            this.setData({
                hiddenstate: !1,
                isscroll: !1
            }), this.data.curroominfo.credit_cur > 4 ? this.triggerEvent("changeGiftPanelState", {
                hiddenstate: !1,
                isscroll: !1
            }) : wx.showToast({
                title: "由于主播多次违规，积分过低，礼物系统不可用！",
                icon: "none",
                duration: 2e3
            });
        },
        scrollBarrageContainer: function(t) {
            var e = t.detail, a = {};
            this.data.begainScroll || (a.begainScroll = !0), a.containerScrollHeight = e.scrollHeight, 
            this.setData(a), this.barrage.isPaused && !this.data.isHolded && this.data.containerClientHeight + e.scrollTop >= e.scrollHeight && this.barrage.restart();
        },
        barrageTouchStart: function() {
            this.data.begainScroll && (this.setData({
                isHolded: !0
            }), this.barrage.isPaused || this.barrage.pause());
        },
        barrageTouchEnd: function() {
            var t = this;
            this.data.begainScroll && (this.setData({
                isHolded: !1
            }), this.barrage.isPaused && wx.createSelectorQuery().in(this).select(".barrage-content").fields({
                scrollOffset: !0
            }, function(e) {
                var a = e.scrollTop;
                t.data.containerClientHeight + a >= t.data.containerScrollHeight && t.barrage.restart();
            }).exec());
        },
        clickDownloadBtn: function() {
            n.default.disDoubleNavigate("download-app");
        },
        sendBarrage: function() {
            var t = this;
            if (!this.data.isDisable && !this.data.isShutUp && this.data.inputValue) {
                var e = Date.now();
                if (!(this.data.lastTriggerTime && e - this.data.lastTriggerTime < 1e3)) {
                    this.setData({
                        lastTriggerTime: e
                    });
                    var a = c.getUrlParam("roomId");
                    i.default.checkBoundDYAccount("room", a, function(e) {
                        var i = t.data.inputValue, n = t.data.talkCD;
                        t.setData({
                            sendDMText: n + "s",
                            isDisable: !0
                        }), t.timer = setInterval(function() {
                            --n <= 0 ? (t.setData({
                                sendDMText: "发送",
                                isDisable: !1
                            }), clearInterval(t.timer), t.timer = null) : t.setData({
                                sendDMText: n + "s"
                            });
                        }, 1e3);
                        var o = (wx.getStorageSync("dyUserInfo") || {}).uid || "";
                        t.triggerEvent("exec", {
                            msg: "js_sendmsg",
                            data: {
                                content: i,
                                sender: o
                            },
                            success: function() {
                                r.default.postPoint(s.default.Point.CLICK_MSG_SEND, t.isYz ? s.default.Point.PAGE_STUDIO_P : s.default.Point.PAGE_STUDIO_L, a);
                            }
                        }), setTimeout(function() {
                            t.setData({
                                inputValue: "",
                                isShowInput: !0
                            });
                        }, 500);
                    });
                }
            }
        },
        addEventListeners: function() {
            var t = this;
            c.events.addListener("room_data_chatinit", function(e) {
                t.setData({
                    talkCD: e.cd >= 1e3 ? e.cd / 1e3 : e.cd
                });
            }).addListener("room_data_sys", function(e) {
                if (("ntmet" === e.type || "muteinfo" === e.type) && t.data.uid) {
                    var a = 1e3 * e.met || 0;
                    if ((parseInt(e.mtype, 10) || 1) > 0 && a > 0) {
                        var i = new Date(a);
                        t.setData({
                            isShutUp: !0,
                            shutUpTime: i.getFullYear() + "-" + (i.getMonth() + 1) + "-" + i.getDate() + " " + i.getHours() + ":" + i.getMinutes()
                        });
                    }
                }
            }).addListener("room_data_chat2", function(e) {
                if ("chatmsg" === e.type) t.barrage && t.barrage.push("CHAT", e); else if ("chatres" === e.type) if (t.setData({
                    talkCD: e.cd >= 1e3 ? e.cd / 1e3 : e.cd
                }), "391" === e.res) t.triggerEvent("callChatVerify", {
                    cb: function() {
                        t.barrage.push("CHAT", e);
                    }
                }); else if ("288" === e.res) t.barrage.push("CHAT", e); else if ("218" === e.res) t.triggerEvent("callPhoneBind"); else if (e.res > 0 && e.uid === t.data.uid) {
                    var a = "";
                    switch (e.res) {
                      case "289":
                        a = "请不要重复发言";
                        break;

                      case "2":
                        a = "您已被禁言";
                        break;

                      case "5":
                        a = "全站禁言";
                        break;

                      case "290":
                        a = "您的发言速度过快";
                        break;

                      case "356":
                        a = "你发送的内容包含敏感词";
                    }
                    a.length && wx.showToast({
                        icon: "none",
                        title: a
                    });
                }
            }).addListener("room_data_nstip2", function(e) {
                "uenter" === e.type && t.barrage.push("ENTER", e);
            }).addListener("room_data_sererr", function(t) {
                "error" === t.type && "60" === t.code && wx.showToast({
                    icon: "none",
                    title: "你发送的内容包含敏感词"
                });
            }).addListener("room_data_handler", function(e) {
                "chatres" === e.type && (t.talkCD = e.cd >= 1e3 ? e.cd / 1e3 : e.cd);
            }).addListener(o.ACJ_TYPES.ROOM_DATA_SHARE_SUCCESS_RES, function(e) {
                t.barrage.push("SHARE", e);
            }).addListener("room_data_flaerr", function(e) {
                t.setData({
                    tcpConnected: !1,
                    isDisable: !0
                });
            }).addListener("room_tcpclient_failed", function() {
                t.setData({
                    tcpConnected: !1
                });
            }).addListener("room_tcpclient_success", function() {
                t.data.tcpConnected || t.setData({
                    tcpConnected: !0
                });
            });
        },
        onUnload: function() {
            this.timer && clearInterval(this.timer);
        },
        listenToEvent: function() {
            this.addEventListeners();
        }
    },
    behaviors: [ a.default ],
    created: function() {},
    attached: function() {},
    ready: function() {
        var t = this;
        this.setData({
            isIOS: "ios" === c.globalData.systemInfo.platform,
            adjustPosition: !wx.canIUse("input.bindfocus"),
            uid: (wx.getStorageSync("dyUserInfo") || {}).uid || null
        }), wx.createSelectorQuery().in(this).select(".barrage-content").fields({
            size: !0
        }, function(a) {
            var i = a.height, n = t.data.uid;
            t.setData({
                containerClientHeight: i + 5
            }), t.barrage = new e.default(), t.barrage.observe(function(e) {
                var a = {
                    barrages: e,
                    scrollTop: t.data.scrollTop + 1
                };
                t.setData(a);
            }).registerLauncher("CHAT", function(t) {
                t.isSelf = t.uid === n, "0" === t.level && (t.level = "1"), t.txt = (t.txt || "").replace(/\//g, "丿");
            });
        }).exec();
    },
    moved: function() {},
    detached: function() {}
});