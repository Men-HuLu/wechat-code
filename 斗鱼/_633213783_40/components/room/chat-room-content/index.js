function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../common/barrage/index")), a = t(require("../relation_behavior")), i = getApp();

Component({
    properties: {
        isscroll: {
            type: Boolean,
            value: !0
        },
        wid: {
            type: String,
            value: ""
        },
        chatroomNick: {
            type: String,
            value: ""
        },
        inChatroom: {
            type: Boolean,
            value: !1
        },
        chatroomJoindata: {
            type: Object,
            value: {}
        }
    },
    data: {
        inputValue: "",
        focusHeight: "102rpx",
        adjustPosition: !1,
        scrollTop: 3999,
        barrages: [],
        begainScroll: !1,
        isHolded: !1,
        containerClientHeight: 0,
        containerScrollHeight: 0,
        uid: null,
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
                var a = 2 * e.height - (i.globalData.isIphoneX ? 68 : 0) + 102;
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
        sendBarrage: function() {
            var t = this;
            if (this.data.inputValue) {
                var e = Date.now();
                if (this.data.lastTriggerTime && e - this.data.lastTriggerTime < 1e3) wx.showToast({
                    title: "发送消息过于频繁",
                    icon: "none",
                    duration: 2e3
                }); else {
                    this.setData({
                        lastTriggerTime: e
                    });
                    var a = this.data.inputValue;
                    this.triggerEvent("exec", {
                        msg: "chatroom_js_sendmsg",
                        data: {
                            type: "send",
                            wid: this.data.wid,
                            nick: this.data.chatroomNick,
                            message: a
                        },
                        success: function() {}
                    }), setTimeout(function() {
                        t.setData({
                            inputValue: "",
                            isShowInput: !0
                        });
                    }, 500);
                }
            }
        },
        addEventListeners: function() {
            var t = this;
            i.events.addListener("chatroom_data_chat", function(e) {
                if ("bsend" === e.type) t.barrage && t.barrage.push("CHATROOM", e); else if ("sendres" === e.type) {
                    var a = "";
                    switch (e.result) {
                      case "720005":
                        a = "聊天发放消息过于频繁";
                        break;

                      case "720008":
                        a = "发送消息过长";
                        break;

                      case "720009":
                        a = "消息包含敏感词";
                    }
                    a.length && wx.showToast({
                        icon: "none",
                        title: a
                    });
                }
            }).addListener("chatroom_quit_show", function(e) {
                t.barrage.push("LEAVE", e);
            }).addListener("room_data_flaerr", function(e) {
                t.setData({
                    tcpConnected: !1
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
        onUnload: function() {},
        listenToEvent: function() {
            this.addEventListeners();
        },
        chatroomQuit: function(t) {
            var e = this, a = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            this.triggerEvent("exec", {
                msg: "user_quit_chatroom",
                data: {
                    type: "quit",
                    wid: this.data.wid,
                    nick: this.data.chatroomNick,
                    qt: t
                },
                success: function() {
                    a && e.triggerEvent("closeChatroom");
                }
            });
        },
        chatroomJoinData: function(t) {
            this.barrage && t.nick && this.barrage.push("JOIN", t);
        },
        handleKeyboard: function(t) {
            this.setData({
                isscroll: !t
            });
        }
    },
    behaviors: [ a.default ],
    created: function() {},
    attached: function() {},
    pageLifetimes: {
        show: function() {},
        hide: function() {}
    },
    ready: function() {
        var t = this;
        this.setData({
            adjustPosition: !wx.canIUse("input.bindfocus"),
            uid: (wx.getStorageSync("dyUserInfo") || {}).uid || null
        }), wx.createSelectorQuery().in(this).select(".barrage-content").fields({
            size: !0
        }, function(a) {
            var i = a.height;
            t.data.uid;
            t.setData({
                containerClientHeight: i + 5
            }), t.barrage = new e.default(), t.barrage.observe(function(e) {
                var a = {
                    barrages: e,
                    scrollTop: t.data.scrollTop + 1
                };
                t.setData(a);
            }).registerLauncher("CHATROOM", function(e) {
                e.isSelf = e.nick === t.data.chatroomNick;
            }), t.listenToEvent(), t.barrage.push("JOIN", t.data.chatroomJoindata);
        }).exec();
    },
    moved: function() {},
    detached: function() {}
});