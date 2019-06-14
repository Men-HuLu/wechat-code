function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var a = t(require("../common/util")), o = t(require("../common/tcp/index")), i = t(require("../common/httpClient")), n = t(require("../config/index")), s = t(require("../common/point")), r = require("../common/tcp/util/acj"), c = t(require("../common/storage")), d = t(require("../common/navigator")), l = t(require("../common/login")), u = require("../common/tcp/ClientBarrage"), h = t(require("../common/flashData")), m = t(require("../common/recommend")), f = getApp();

Page(e({
    data: {
        isActive: !0,
        isHideChatContent: !1,
        isHideGiftPanel: !0,
        isShowBindPhoneNum: !1,
        isShowChatVerify: !1,
        chatVerifyType: 1,
        chatVerifyInfo: {},
        isScroll: !0,
        rid: 0,
        stream: "",
        isIpx: !1,
        startX: 0,
        liveStatus: !0,
        isNrt: !1,
        isYz: !1,
        attentionNums: 0,
        curHot: 0,
        curRoomInfo: {},
        statusTip: "主播暂时不在家",
        autoPlay: !1,
        expandStyle: "",
        isFromAppShare: !1,
        liveData: [],
        giftList: [],
        isPopup: !1,
        popupRecommend: null,
        closeHasVideo: !1,
        closeHasid: "",
        levelIcon: 0,
        isLevelIcon: !1,
        roomName: "",
        showDetail: "",
        shareObj: {},
        isFirstCompare: !0,
        hasChatroom: !1,
        chatroomImg: [],
        isChatpopup: !1,
        inChatroom: !1,
        isGuideChatroom: !1,
        isChatenter: !1,
        wid: "",
        chatroomNick: "",
        chatroomAva: "",
        chatroomNum: 0,
        chatroomJoindata: {},
        liveerror_tip: "直播获取失败",
        liveerror_op: "点击重试",
        liveerror: !1,
        liveswitch: !1,
        isPaused: !1,
        timer: null,
        isplaying: !1,
        begin: new Date(),
        windowHeight: "500rpx",
        fullScreen: !1,
        hiddenControl: !1,
        videoStatus: 1
    },
    init: function() {
        var t = this;
        this.getRoomInfo(this.rid).then(function(e) {
            if (e) {
                var o = e.data || {};
                t.recordRoomInfo(o);
                var i = wx.getStorageSync("dyRoomInfo") || {};
                wx.setStorageSync("dyRoomInfo", Object.assign(i, o)), wx.setNavigationBarTitle({
                    title: o.room_name ? a.default.htmlDecode(o.room_name) : "直播间"
                }), t.isNrt = "1" == o.nrt, "1" === t.query.is_vertical || (t.isYz = 1 === o.is_vertical), 
                t.setData({
                    isYz: t.isYz,
                    isNrt: t.isNrt,
                    curRoomInfo: o,
                    roomName: a.default.htmlDecode(o.room_name),
                    showDetail: a.default.htmlDecode(o.show_details)
                }), 1 != o.show_status && t.setData({
                    isActive: !1,
                    isHideChatContent: !0,
                    liveStatus: !1
                }), t.getGiftList();
            }
        });
    },
    onLoad: function(t) {
        var e = this;
        console.log(t);
        var o = a.default.scanCodeParse(t);
        o && (t = o);
        var i = f.globalData.referrerInfo || {};
        if (i && i.extraData && (i.extraData.roomId && (t.roomId = i.extraData.roomId), 
        i.extraData.isVertical && (t.isVertical = i.extraData.isVertical)), f.globalData.referrerInfo = null, 
        this.query = t, t && t.roomId) {
            this.isYz = "1" === t.is_vertical;
            var r = this.rid = t.roomId;
            this.setData({
                rid: r,
                isYz: this.isYz
            }), this.getLIVESTREAM(), this.init(), this.isYz ? s.default.postPoint(n.default.Point.INIT_PAGE_STUDIO_P, n.default.Point.PAGE_STUDIO_P, r) : s.default.postPoint(n.default.Point.INIT_PAGE_STUDIO_L, n.default.Point.PAGE_STUDIO_L, r);
        }
        if (this.setNetworkStatus(), this.setData({
            isIpx: f.globalData.isIphoneX
        }), this.closeInfo(), this.setData({
            shareObj: wx.getStorageSync("shareObj") || {}
        }), t && t.wid) {
            this.setData({
                wid: t.wid
            });
            var d = this;
            wx.getSetting({
                success: function(e) {
                    e.authSetting["scope.userInfo"] ? wx.getUserInfo({
                        success: function(e) {
                            d.setData({
                                wid: t.wid,
                                chatroomNick: e.userInfo.nickName,
                                chatroomAva: e.userInfo.avatarUrl
                            });
                            var a = e.userInfo.avatarUrl || "https://apic.douyucdn.cn/upload/avatar/default/02_middle.jpg?rltime", o = "type@=join/wid@=" + t.wid + "/nick@=" + e.userInfo.nickName + "/icon@=" + a.replace(/\//g, "ㄟ");
                            d.tcp.exec("user_join_chatroom", o);
                        }
                    }) : d.setData({
                        isChatenter: !0
                    });
                }
            });
        }
        c.default.get("chatroom_guide_popup_time").then(function(o) {
            a.default.getDateTimeDiff(o.data).Days >= 10 ? e.setData({
                isGuideChatroom: !1
            }) : t && t.roomId && !t.wid && e.setData({
                isGuideChatroom: !0
            });
        }, function(a) {
            var o = new Date();
            c.default.set("chatroom_guide_popup_time", +o), t && t.roomId && e.setData({
                isGuideChatroom: !0
            });
        });
    },
    getLIVESTREAM: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], a = void 0;
        a = "ios" === f.globalData.systemInfo.platform ? "cpn-iosmpro" : "cpn-androidmpro", 
        i.default.request({
            url: n.default.API.LIVESTREAM,
            method: "POST",
            data: {
                room_id: this.rid,
                token: "wxapp",
                rate: 1,
                did: f.globalData.did,
                big_ct: a,
                is_Mix: e
            }
        }).then(function(e) {
            var a = e.code + "";
            if ("0" === a) if (t.streamInfo = e, 1 === e.data.is_pass_player) t.setData({
                statusTip: "本场直播需要密码\n请下载斗鱼APP体验",
                liveStatus: !1
            }); else {
                var o = "&mt=" + n.default.MT;
                t.setData({
                    stream: e.data.mix_url ? e.data.mix_url + o : e.data.hls_url + o,
                    autoPlay: !0
                }), t.videoContext || (t.videoContext = wx.createLivePlayerContext("myVideo", t)), 
                t.videoContext.play(), console.log("设置stream");
            } else "1012" === a && t.setData({
                statusTip: "本场直播需要购买门票\n请下载斗鱼APP体验"
            }), t.setData({
                isHideChatContent: !0,
                liveStatus: !1
            });
        });
    },
    onReady: function() {
        var t = this;
        console.log("onReady"), this.restContrl(), this.videoContext = wx.createLivePlayerContext("myVideo", this), 
        getApp().events.addListener("network_connected", function() {
            t.videoContext && t.videoContext.play();
        }), this.vPlayTimeout = setTimeout(function() {
            t.data.isplaying || t.data.autoPlay && (console.log("设置自动播放 没有自动播放"), t.videoContext.play());
        }, 1500);
    },
    onShow: function() {
        var t = this;
        console.log("onShow"), this.all = this.selectAllComponents(".component"), this.connect(), 
        this.broadcast("onShow"), this.judgeIsAppShare(this.query), this.data.isPlayingHide && this.data.isNrt && this.videoContext && this.videoContext.play(), 
        wx.setKeepScreenOn({
            keepScreenOn: !0
        }), c.default.get("room_popup_time").then(function(e) {
            a.default.getDateTimeDiff(e.data).Days >= 1 && t.getGotoHomeRecommend();
        }, function(e) {
            t.getGotoHomeRecommend();
        });
    },
    statechange: function(t) {
        console.log("live-player code:", t.detail.code);
    },
    error: function(t) {
        console.error("live-player error:", t.detail.errMsg);
    },
    onHide: function() {
        this.data.hasChatroom && this.selectComponent("#chatroom").chatroomQuit(1, !1), 
        this.release(), this.broadcast("onHide");
    },
    onUnload: function() {
        this.data.hasChatroom && this.selectComponent("#chatroom").chatroomQuit(1), this.videoContext && this.videoContext.stop(), 
        this.videoContext = null, clearTimeout(this.vPlayTimeout), clearTimeout(this.coverTimeout), 
        this.vPlayTimeout = null, this.coverTimeout = null, this.broadcast("onUnload"), 
        this.release();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var e = this.data.curRoomInfo, a = this.data.hasChatroom ? this.data.chatroomNick + "邀你一起看" + e.nickname + "的直播" : e.nickname + "正在直播：" + (e && e.room_name) || "斗鱼直播", o = e && e.room_id || "", i = e && e.is_vertical;
        this.data.isFirstCompare && (this.data.shareObj.userid !== wx.getStorageSync("shareObj").userid ? this.setData({
            shareObj: wx.getStorageSync("shareObj"),
            isFirstCompare: !1
        }) : this.setData({
            isFirstCompare: !1
        }));
        new u.ClientBarrage()._onShareMsg({
            type: "srres",
            nickname: this.data.shareObj.nickname
        }, "", this.data.shareObj);
        var r = "uid@=" + this.data.shareObj.userid + "/nickname@=" + this.data.shareObj.nickname;
        this.tcp.exec("room_data_share_success_res", r), this.setData({
            isChatpopup: !1
        });
        var c = {
            wroom_id: this.data.hasChatroom ? this.data.wid : 0
        };
        return "menu" === t.from && s.default.postPoint(n.default.Point.CLICK_CHATROOM_FORWARD, n.default.Point.PAGE_STUDIO_L, 0, c), 
        this.data.hasChatroom ? ("button" === t.from && s.default.postPoint(n.default.Point.CLICK_CHATROOM_SHARE, n.default.Point.PAGE_STUDIO_L), 
        {
            title: a,
            path: "/pages/room?roomId=" + o + "&is_vertical=" + i + "&wid=" + this.data.wid
        }) : {
            title: a,
            path: "/pages/room?roomId=" + o + "&is_vertical=" + i
        };
    },
    onPageScroll: function() {},
    onTabItemTap: function() {},
    clickChatNav: function() {
        this.setData({
            isActive: !0,
            isHideChatContent: !1
        }), this.broadcast("startRocket");
    },
    clickAnchorkNav: function() {
        this.setData({
            isActive: !1,
            isHideChatContent: !0
        }), this.broadcast("stopRocket");
    },
    onGotUserInfo: function(t) {
        var e = this;
        this.setData({
            isGuideChatroom: !1
        }), t.detail.userInfo ? i.default.request({
            url: n.default.API.CREATE_CHATROOM,
            method: "POST",
            data: {
                rid: this.data.rid,
                hid: f.globalData.did
            }
        }).then(function(a) {
            if (0 === parseInt(a.error, 10)) {
                console.log("聊天室房间号", a.data.wid), e.data.hasChatroom ? (e.selectComponent("#chatroom").chatroomQuit(1), 
                e.setData({
                    isChatpopup: !0,
                    inChatroom: !0,
                    wid: a.data.wid,
                    hasChatroom: !0,
                    chatroomNick: t.detail.userInfo.nickName,
                    chatroomAva: t.detail.userInfo.avatarUrl
                })) : e.setData({
                    isChatpopup: !0,
                    inChatroom: !0,
                    hasChatroom: !0,
                    wid: a.data.wid,
                    chatroomNick: t.detail.userInfo.nickName,
                    chatroomAva: t.detail.userInfo.avatarUrl
                });
                var o = t.detail.userInfo.avatarUrl || "https://apic.douyucdn.cn/upload/avatar/default/02_middle.jpg?rltime", i = "type@=join/wid@=" + a.data.wid + "/nick@=" + t.detail.userInfo.nickName + "/icon@=" + o.replace(/\//g, "ㄟ");
                e.tcp.exec("user_join_chatroom", i);
            } else e.errorToast(a.msg);
        }).catch(function() {
            e.errorToast("网络异常");
        }) : this.errorToast("创建聊天室需要您的授权哟~"), s.default.postPoint(n.default.Point.CLICK_CHATROOM_CREATE, n.default.Point.PAGE_STUDIO_L);
    },
    judgeIsAppShare: function() {
        var t = parseInt(f.globalData.scene, 10);
        console.log("room onshow scene: " + t), 1036 === t || 1069 === t ? f.globalData.isFromAppShare = !0 : 1089 !== t && 1090 !== t && (f.globalData.isFromAppShare = !1), 
        console.log(f.globalData.isFromAppShare), this.setData({
            isFromAppShare: f.globalData.isFromAppShare
        });
    },
    connect: function() {
        void 0 === this.tcp && (this.tcp = new o.default(), this.tcp.connect(), this.addEventListeners(this.rid), 
        this.broadcast("listenToEvent"));
    },
    errorToast: function(t) {
        wx.showToast({
            title: t,
            icon: "none",
            duration: 2e3
        });
    },
    resetLogToken: function() {
        var t = wx.getStorageSync("dyUserInfo") || {};
        wx.setStorageSync("dyUserInfo", Object.assign(t, {
            localToken: ""
        }));
    },
    callPhoneBind: function() {
        this.setData({
            isShowBindPhoneNum: !0
        });
    },
    bindPhoneCallback: function() {
        var t = this;
        this.release(), setTimeout(function() {
            t.connect();
        }, 0);
    },
    callChatVerify: function(t) {
        var e = this, a = t.detail.cb, o = f.getUrlParam("roomId"), s = f.globalData.did;
        l.default.checkBoundDYAccount("room", o, function(t) {
            i.default.request({
                url: n.default.HOST + "/wxapi/auth/verifyInfo?did=" + s,
                method: "POST",
                data: {
                    log_token: t,
                    room_id: o,
                    black_type: 1
                }
            }).then(function(t) {
                var o = parseInt(t.code, 10);
                if (0 === o) {
                    var i = t.data.validate_type;
                    if (4 === i) return void (a && a());
                    3 === i ? e.setData({
                        chatVerifyInfo: {
                            phone: t.data.phone,
                            dyphone: t.data.douyu_phone,
                            code: t.data.code
                        }
                    }) : 2 === i && e.setData({
                        chatVerifyInfo: {
                            phone: t.data.phone,
                            btnType: t.data.is_foreign
                        }
                    }), e.setData({
                        chatVerifyType: i,
                        isShowChatVerify: !0
                    });
                } else 10007 === o ? (e.resetLogToken(), e.errorToast(t.data)) : e.errorToast(t.data);
            }).catch(function() {
                e.errorToast("网络异常");
            });
        });
    },
    addEventListeners: function(t) {
        var e = this;
        f.events.addListener("room_bus_login", function() {
            var a = wx.getStorageSync("dyUserInfo");
            a && a.userName || (a = {
                userName: "",
                long_token_id: "",
                biz_type: "",
                short_token: "",
                client_type: 26
            });
            var o = "type@=loginreq/username@=" + a.userName + "/password@=/roomid@=" + t + "/ltkid@=" + a.long_token_id + "/biz@=" + a.biz_type + "/stk@=" + a.short_token + "/ct@=" + a.client_type + "/";
            if (e.tcp && e.tcp.exec("js_userlogin", o), e.data.hasChatroom) {
                var i = e.data.chatroomAva || "https://apic.douyucdn.cn/upload/avatar/default/02_middle.jpg?rltime", n = "type@=join/wid@=" + e.data.wid + "/nick@=" + e.data.chatroomNick + "/icon@=" + i.replace(/\//g, "ㄟ") + "/jt@=1";
                e.tcp && e.tcp.exec("user_join_chatroom", n);
            }
        }).addListener("mroom_video_end", function() {
            e.setData({
                liveStatus: !1
            });
        }).addListener("room_data_illchange", function(t) {
            t && e.setData({
                statusTip: "主播涉嫌违规，房间整改中",
                liveStatus: !1
            });
        }).addListener("room_data_info", function(t) {
            "memberinfores" === t.type && e.setData({
                attentionNums: parseInt(t.fans_count, 10),
                levelIcon: parseInt(t.o_lev, 10),
                isLevelIcon: !0
            });
        }).addListener("room_data_tbredpacket", function(t) {
            "keeplive" === t.type && e.setData({
                curHot: f.changeData(parseInt(t.hot, 10) || 0, 1)
            });
        }).addListener(r.ACJ_TYPES.ROOM_PK_CONNECT, function() {
            e.streamInfo && e.streamInfo.data && e.stream === e.streamInfo.data.mix_url || e.getLIVESTREAM(!0), 
            setTimeout(function() {
                e.setData({
                    stream: e.streamInfo.data.hls_url
                });
            }, 1e4), console.log("连麦PK 切换为混流模式");
        }).addListener(r.ACJ_TYPES.ROOM_PK_END, function() {
            e.setData({
                stream: e.streamInfo.data.hls_url
            }), console.log("连麦PK 结束");
        }).addListener("network_connected", function() {
            e.init(), e.tcp && e.tcp.connect();
        }).addListener("chatroom_join_show", function(t) {
            if ("bjoin" === t.type) {
                e.setData({
                    chatroomJoindata: t
                });
                var a = e.selectComponent("#chatroom");
                a && a.chatroomJoinData(t);
            } else if ("joinres" === t.type) {
                var o = "";
                switch (t.result) {
                  case "720003":
                    o = "聊天室已解散，进入直播间看精彩内容";
                    break;

                  case "720004":
                    o = "重复加入";
                    break;

                  case "720007":
                    o = "聊天室人数已满";
                    break;

                  case "720006":
                    o = "未加入聊天室";
                    break;

                  default:
                    !e.data.hasChatroom && e.openChatroom();
                }
                o.length && wx.showToast({
                    icon: "none",
                    title: o
                });
            } else if ("brju" === t.type) {
                var i = t.ruis.split("/");
                i.pop();
                for (var n in i) i[n] = h.default.decode(i[n]).too(), i[n] = i[n].icon.replace(/ㄟ/g, "/");
                t.ruis = i, e.updateUserinfo(t);
            }
        });
    },
    exec: function(t) {
        var e = t.detail, o = e.msg, i = e.data, n = e.success;
        this.tcp && this.tcp.exec(o, a.default.encodeFlashData(i), n);
    },
    toggleChatContent: function(t) {
        var e = t.detail;
        this.broadcast("handleKeyboard", e.flag), this.setData({
            expandStyle: e.flag ? "overflow:visible" : "",
            isScroll: !e.flag
        });
    },
    closeChatroom: function() {
        this.setData({
            hasChatroom: !1,
            inChatroom: !1
        });
    },
    openChatroom: function() {
        this.setData({
            hasChatroom: !0,
            inChatroom: !0
        });
    },
    updateUserinfo: function(t) {
        this.setData({
            chatroomNum: t.ruc,
            chatroomImg: t.ruis
        });
    },
    release: function() {
        this.tcp && (this.tcp.close(), this.tcp = void 0, f.events.removeAllListeners());
    },
    getRoomInfo: function(t) {
        return i.default.request(n.default.API.ROOMINFO + t);
    },
    broadcast: function(t, e) {
        this.all.forEach(function(a) {
            a[t] && a[t](e);
        });
    },
    recordRoomInfo: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = t.room_id || "", o = t.room_src || "", i = t.room_name || "", n = t.nickname || "", s = (wx.getStorageSync("dyUserInfo") || {}).uid;
        if (s) {
            var r = wx.getStorageSync("myWatchRecord") || {}, c = r[s] || [];
            c.length && (c = c.filter(function(t) {
                return t.roomId != a;
            })).length >= 20 && c.pop(), c.unshift({
                isLive: 1,
                roomId: a,
                roomSrc: o,
                title: i,
                nickname: n
            }), wx.setStorageSync("myWatchRecord", Object.assign(r, e({}, s, c)));
        }
    },
    setNetworkStatus: function() {
        wx.getNetworkType({
            success: function(t) {
                "none" === t.networkType && wx.showModal({
                    title: "鲨鱼娘提醒您",
                    content: "您的网络断开，请检查网络",
                    confirmText: "确定",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.switchTab({
                            url: "home"
                        });
                    }
                });
            }
        });
    },
    clickGotoCatalog: function() {
        d.default.disDoubleRedirect("calalogue-list?type=" + this.data.curRoomInfo.short_name + "&name=" + this.data.curRoomInfo.cate2_name);
    },
    getGotoHomeRecommend: function() {
        var t = this;
        m.default.getPopupRecommend(2, "", function(e) {
            e && t.setData({
                popupRecommend: e
            });
        });
    },
    clickGotoHome: function() {
        var t = this, e = new Date();
        c.default.get("room_popup_time").then(function(o) {
            a.default.getDateTimeDiff(o.data).Days >= 1 ? (t.setData({
                isPopup: !0
            }), c.default.set("room_popup_time", +e)) : (t.setData({
                isPopup: !1
            }), wx.switchTab({
                url: "home"
            }));
        }, function(a) {
            c.default.set("room_popup_time", +e), t.setData({
                isPopup: !0
            });
        });
    },
    clickOtherAnchor: function() {
        var t = this.data.liveData.filter(function(t) {
            return 1 == t.type;
        }), e = t.length, a = Math.floor(Math.random() * e);
        wx.redirectTo({
            url: "room?roomId=" + t[a].rid + "&is_vertical=" + t[a].isVertical
        });
    },
    clickToggleRoom: function() {
        this.setData({
            inChatroom: !this.data.inChatroom
        });
    },
    clickQuitRoom: function() {
        this.selectComponent("#chatroom").chatroomQuit(0);
    },
    closeGuide: function() {
        this.setData({
            isGuideChatroom: !1
        });
    },
    changeGiftPanelState: function(t) {
        var e = t.detail;
        this.setData({
            isHideGiftPanel: e.hiddenstate,
            isScroll: e.isscroll
        });
    },
    getGiftList: function() {
        var t = this;
        i.default.request(n.default.API.ROOM_GIFT_INFO + "?rid=" + this.data.rid).then(function(e) {
            0 === e.code && t.setData({
                giftList: e.data
            });
        });
    },
    getLiveData: function(t) {
        var e = t.detail;
        this.setData({
            liveData: e
        });
    },
    closePopup: function() {
        this.setData({
            isPopup: !1
        });
    },
    enterChatroom: function(t) {
        var e = t.detail;
        this.setData({
            chatroomNick: e.nickName,
            chatroomAva: e.avatarUrl
        });
        var a = e.avatarUrl || "https://apic.douyucdn.cn/upload/avatar/default/02_middle.jpg?rltime", o = "type@=join/wid@=" + this.data.wid + "/nick@=" + e.nickName + "/icon@=" + a.replace(/\//g, "ㄟ");
        this.tcp.exec("user_join_chatroom", o);
    },
    confirmUserInfo: function(t) {
        console.log(t);
    },
    closeChatVerify: function() {
        this.setData({
            isShowChatVerify: !1
        });
    },
    closeInfo: function() {
        var t = this;
        i.default.request({
            url: n.default.API.ROOM_CLOSE_INFO,
            method: "GET",
            data: {
                rid: this.data.rid
            }
        }).then(function(e) {
            if (e) {
                var a = parseInt(e.error, 10);
                0 === a ? t.setData({
                    closeHasVideo: !0,
                    closeHasid: e.data.video_info.hash_id
                }) : 20104 === a ? t.setData({
                    closeHasVideo: !1
                }) : wx.showToast({
                    title: e.msg || "网络异常",
                    icon: "none",
                    duration: 2e3
                });
            }
        }).catch(function() {
            wx.showToast({
                title: "网络异常",
                icon: "none",
                duration: 2e3
            });
        });
    },
    restContrl: function() {
        var t = this;
        clearTimeout(this.coverTimeout), this.coverTimeout = null, this.coverTimeout = setTimeout(function() {
            t.setData({
                hiddenControl: !0
            });
        }, 7e3);
    },
    coverTap: function() {
        var t = new Date().getTime();
        this.data.lastTime && t - this.data.lastTime < 400 && (console.log("双击"), this.fullScreenCtrl());
        var e = {
            lastTime: t,
            hiddenControl: !this.data.hiddenControl
        };
        this.setData(e), this.restContrl();
    },
    fullScreenEvent: function() {
        this.fullScreenCtrl();
    },
    clickGotoVideo: function() {
        d.default.disDoubleRedirect("video-room?videoId=" + this.data.closeHasid);
    },
    fullscreenchange: function(t) {
        this.fullScreen = t.detail.fullScreen;
    },
    liveupdate: function() {
        this.data.isplaying || this.setData({
            isplaying: !0
        });
    },
    fullScreenCtrl: function() {
        var t = this;
        !this.data.fullScreen && this.videoContext.requestFullScreen({
            direction: this.data.isYz ? 0 : 90,
            success: function() {
                t.setData({
                    fullScreen: !0
                });
            }
        }), this.data.fullScreen && this.videoContext.exitFullScreen({
            direction: this.data.isYz ? 0 : 90,
            success: function() {
                t.setData({
                    fullScreen: !1
                });
            }
        });
    }
}, "statechange", function(t) {
    var e = t.detail.code;
    switch (console.log("statechange（ " + t.detail.code + "）: " + t.detail.message), 
    e) {
      case 2001:
        this.setData({
            videoStatus: 0
        });
        break;

      case 2002:
      case 2003:
        break;

      case 2004:
        this.setData({
            videoStatus: 0
        }), this.liveupdate();
        break;

      case 2005:
      case 2006:
      case 2007:
        break;

      case 2008:
        this.setData({
            videoStatus: !1
        });
        break;

      case 2009:
        break;

      case -2301:
        this.setData({
            videoStatus: 2
        }), this.videoContext && this.videoContext.stop();
        break;

      case -2302:
        this.setData({
            videoStatus: 2
        });
    }
}));