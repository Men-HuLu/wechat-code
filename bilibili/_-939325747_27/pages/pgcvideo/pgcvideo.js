var t = require("../../utils/util.js"), e = require("../../utils/fetch"), i = e.fetch, a = e.fetchImg, s = e.reportbili, o = getApp();

Page({
    data: {
        isPlay: !1,
        isStart: !1,
        durl: "",
        coverImg: "",
        localCoverImg: "",
        cid: "",
        listInfo: "",
        followers: "",
        playStat: "",
        aidSingle: "",
        tagArray: [],
        nowTag: 0,
        titleOpen: !1,
        tagsOpen: !1,
        titleheight: "",
        detailheight: "",
        singleRec: {},
        isShowRec: !1,
        iPxBar: !1,
        acount: "",
        actionsArr: [ {
            name: "分享",
            icon: "share",
            openType: "share"
        } ],
        showAS: !1,
        deviceHeight: 0,
        deviceWidth: 0,
        nickName: "",
        avatarUrl: "",
        isRefresh: !0,
        duration: "",
        network: "",
        iSopenBtn: !1,
        right: !1,
        isToastShow: !1,
        acode: "",
        epArr: [ , , , , , , , ,  ],
        isShowFullPGC: !1,
        epInfo: "",
        season_id: "",
        epOid: "",
        epList: [],
        nowEPid: "",
        seasonList: [],
        long_title: "",
        singlepcover: "",
        arcodeUrl: "",
        noright: !1,
        isplayend: !1,
        scrollPosition: "",
        nowSStag: 0,
        backTop: "",
        islimit: !1,
        limitInfo: "",
        networkFlag: !1,
        epFullList: [],
        shareover100: !0,
        pgcidx: ""
    },
    onLoad: function(e) {
        var i = this;
        if (console.log("查看入参", e), e.ssid && (this.setData({
            season_id: e.ssid
        }), this.fetchEpInfo(e.ssid, 2)), e.epid && this.fetchEpInfo(e.epid, 1), e.scene) {
            var a = Number(e.scene);
            this.fetchEpInfo(a, 1);
        }
        var s = this;
        wx.getSystemInfo({
            success: function(t) {
                o.globalData.isNotch && s.setData({
                    iPxBar: !0
                }), s.setData({
                    deviceWidth: t.windowWidth,
                    deviceHeight: t.screenHeight
                });
            }
        }), this.isShowopenbtn(), t.getNetWorkType().then(function(t) {
            var e = t.errMsg, a = t.networkType;
            "getNetworkType:ok" === e && i.setData({
                network: "wifi" === a,
                networkFlag: "wifi" !== a
            });
        });
    },
    onShow: function(t) {
        -1 == o.globalData.secne && this.onLoad();
    },
    onHide: function() {
        o.globalData.scene = -1;
    },
    onReady: function() {
        this.videoContext = wx.createVideoContext("myVideo"), wx.getStorageSync("openApp") && wx.reportAnalytics("vinfo_video_click", {
            vinfo_video_click: "",
            from_app_share: 1
        });
    },
    getArcode: function(t) {
        var e = this;
        wx.getImageInfo({
            src: 'https://api.bilibili.com/x/web-goblin/wechat/qrcode?json={"page":"pages/pgcvideo/pgcvideo","scene":' + t + ',"width":"76"}',
            success: function(t) {
                e.setData({
                    arcodeUrl: t.path
                });
            }
        });
    },
    fetchEpInfo: function(t, e) {
        var s = this;
        1 == e && i({
            url: "https://api.bilibili.com/pgc/view/wx/season",
            data: {
                ep_id: t
            }
        }).then(function(e) {
            s.getArcode(t), s.setData({
                noright: !1,
                islimit: !1,
                isplayend: !1,
                shareover100: !1,
                over100: !1,
                limitInfo: "",
                nowEPid: t,
                epInfo: e.data.result,
                epList: e.data.result.episodes.slice(0, 100),
                seasonList: e.data.result.seasons,
                scrollPosition: "position" + t,
                season_id: e.data.result.season_id
            }), e.data.result.episodes.length > 100 && s.setData({
                over100: !0
            });
            for (var i = 0; i < e.data.result.episodes.length; i++) if (t == e.data.result.episodes[i].id) {
                console.log("get", e.data.result.episodes[i].id, i), i < 100 ? s.setData({
                    shareover100: !1
                }) : s.setData({
                    shareover100: !0,
                    scrollPosition: "current"
                });
                var o = e.data.result.episodes[i];
                if (s.setData({
                    title: o.title,
                    epOid: o.aid,
                    long_title: o.long_title,
                    singlepcover: o.cover,
                    pgcidx: i
                }, function() {
                    a(s.data.singlepcover).then(function(t) {
                        s.setData({
                            localCoverImg: t.path
                        });
                    });
                }), 2 != o.status) return s.setData({
                    noright: !0,
                    isplayend: !1,
                    networkFlag: !1,
                    islimit: !1
                }), void s.pause();
            }
            e.data.result.limit ? s.setData({
                islimit: !0,
                limitInfo: e.data.result.limit.content,
                networkFlag: !1,
                noright: !1,
                isplayend: !1
            }) : s.getAvinfo(s.data.nowEPid);
        }), 2 == e && i({
            url: "https://api.bilibili.com/pgc/view/wx/season",
            data: {
                season_id: t
            }
        }).then(function(e) {
            s.setData({
                noright: !1,
                islimit: !1,
                isplayend: !1,
                shareover100: !1,
                over100: !1,
                limitInfo: "",
                epInfo: e.data.result,
                epList: e.data.result.episodes.slice(0, 100),
                seasonList: e.data.result.seasons
            }, function() {
                e.data.result.episodes.length >= 1 && (s.setData({
                    nowEPid: e.data.result.episodes.slice(0, 100)[0].id,
                    epOid: e.data.result.episodes.slice(0, 100)[0].aid,
                    long_title: e.data.result.episodes.slice(0, 100)[0].long_title,
                    singlepcover: e.data.result.episodes.slice(0, 100)[0].cover,
                    scrollPosition: "position" + e.data.result.episodes.slice(0, 100)[0].id
                }, function() {
                    s.getAvinfo(s.data.nowEPid);
                }), 2 != e.data.result.episodes.slice(0, 100)[0].status && s.setData({
                    noright: !0,
                    isplayend: !1,
                    networkFlag: !1,
                    islimit: !1
                })), a(s.data.singlepcover).then(function(t) {
                    s.setData({
                        localCoverImg: t.path
                    }), s.getArcode(s.data.nowEPid);
                });
            }), e.data.result.episodes.length > 100 && s.setData({
                over100: !0
            }), s.data.seasonList.forEach(function(e, i) {
                e.season_id == t && s.setData({
                    nowSStag: i
                });
            }), e.data.result.limit && s.setData({
                islimit: !0,
                limitInfo: e.data.result.limit.content,
                networkFlag: !1,
                noright: !1,
                isplayend: !1
            });
        });
    },
    isFullPGC: function(t) {
        t.currentTarget.dataset.flag ? this.setData({
            isShowFullPGC: !0
        }) : this.setData({
            isShowFullPGC: !1
        });
    },
    isStartPlay: function(t) {
        return !!t.publish.is_started || (this.setData({
            epInfo: t,
            seasonList: t.seasons,
            epList: []
        }), this.getArcode(), !1);
    },
    isToast: function() {
        var t = this, e = wx.getStorageSync("toastCount");
        e ? 3 === e ? this.setData({
            isToastShow: !1
        }) : (this.setData({
            isToastShow: !0
        }), e++, wx.setStorageSync("toastCount", e), setTimeout(function() {
            t.setData({
                isToastShow: !1
            });
        }, 5e3)) : (wx.setStorageSync("toastCount", 1), this.setData({
            isToastShow: !0
        }), setTimeout(function() {
            t.setData({
                isToastShow: !1
            });
        }, 5e3));
    },
    stopMove: function() {
        return !1;
    },
    play: function() {
        this.setData({
            isPlay: !0,
            isStart: !0
        }), wx.reportAnalytics("vinfo_pgcvideo_click", {}), this.videoContext.play();
    },
    tagReport: function(t) {
        wx.reportAnalytics("vinfo_tag_click", {
            vinfo_tag_click: ""
        });
    },
    pause: function() {
        this.videoContext.pause(), this.setData({
            isPlay: !1
        });
    },
    bindended: function() {
        this.videoContext.exitFullScreen(), this.setData({
            isStart: !1,
            isPlay: !1,
            isShowRec: !0,
            isplayend: !0,
            noright: !1,
            networkFlag: !1,
            islimit: !1
        });
    },
    checkNewss: function(t) {
        var e = t.currentTarget.dataset.idx;
        e != this.data.nowSStag && (this.setData({
            nowSStag: e
        }), this.pause(), this.fetchEpInfo(t.currentTarget.dataset.season_id, 2));
    },
    launchAppError: function(t) {
        wx.navigateTo({
            url: "../download/download"
        });
    },
    onShareAppMessage: function(t) {
        return wx.reportAnalytics("vinfo_share_click", {
            vinfo_share_click: this.data.aidSingle
        }), "button" === t.from && wx.reportAnalytics("share_friends_click"), {
            title: this.data.epInfo.title + " " + this.data.long_title,
            path: "/pages/pgcvideo/pgcvideo?epid=" + this.data.nowEPid,
            imageUrl: this.data.singlepcover + "@158-0-750-600a_10660w_600h.png",
            success: function() {
                wx.showToast({
                    title: "分享成功",
                    icon: "success",
                    duration: 3e3
                });
            },
            fail: function() {
                wx.showToast({
                    title: "分享失败",
                    icon: "none",
                    duration: 3e3
                });
            }
        };
    },
    backHome: function() {
        wx.reportAnalytics("backhome_click", {
            backhome_click: "backhome"
        }), wx.reLaunch({
            url: "../index/index"
        });
    },
    switchHomeTag: function(t) {
        wx.reportAnalytics("pgcvideo_comments_tab_click");
        var e = t.currentTarget.dataset.tag;
        e != this.data.nowTag && (wx.reportAnalytics("comments_tab_click", {
            vinfo_tag_click: e
        }), this.setData({
            nowTag: e
        }));
    },
    changeOpen: function() {
        this.setData({
            titleOpen: !this.data.titleOpen
        });
    },
    tagsOpen: function() {
        this.setData({
            tagsOpen: !this.data.tagsOpen
        });
    },
    getAvinfo: function(t) {
        var e = this;
        i({
            url: "https://api.bilibili.com/pgc/player/web/playurl/html5",
            data: {
                ep_id: t
            }
        }).then(function(i) {
            e.setData({
                durl: i.data.result.durl[0].url
            }), s([ t, "play", "vinfo", e.data.season_id ]), e.data.network && wx.reportAnalytics("vinfo_video_click", {
                vinfo_video_click: t
            });
        });
    },
    updatePlay: function(t) {
        this.videoContext.pause(), console.log("父组件接收", t.detail), 1 == t.detail.type && this.fetchEpInfo(t.detail.id, 1), 
        2 == t.detail.type && this.fetchEpInfo(t.detail.id, 2), t.detail.backTop && (s([ t.detail.id, "relate_click", "vinfo", t.detail.id, "" ]), 
        this.setData({
            backTop: "position0000"
        }));
    },
    playing: function() {
        this.setData({
            isShowRec: !1,
            isplayend: !1,
            noright: !1,
            islimit: !1,
            networkFlag: !1
        });
    },
    epChoice: function(t) {
        var e = t.currentTarget.dataset.epid;
        console.log(e), e !== this.data.nowEPid && (this.fetchEpInfo(e, 1), this.setData({
            nowEPid: e,
            isShowFullPGC: !1,
            scrollPosition: "position" + e
        }));
    },
    canvasTextAutoLine: function(t, e, i, a) {
        for (var s = wx.createCanvasContext("shareCanvas"), o = 0, n = 0, l = [], r = [], c = 0; c < t.length; c++) (o += s.measureText(t[c]).width) > 375 - e && (l.push(t.substring(n, c)), 
        a, o = 0, n = c), c == t.length - 1 && r.push(t.substring(n, c + 1) + "...");
        return {
            1: l,
            2: r
        };
    },
    onGotUserInfo: function(t) {
        var e = this;
        wx.reportAnalytics("pgcvideo_share_moments_click");
        var i = t.detail.userInfo, s = i.avatarUrl, o = i.nickName;
        a(s).then(function(t) {
            e.setData({
                nickName: o,
                avatarUrl: t.path
            }, function() {
                e.setPost();
            });
        });
    },
    setPost: function() {
        var t = this;
        wx.getSetting({
            success: function(e) {
                void 0 === e.authSetting["scope.writePhotosAlbum"] ? wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        t.createPost();
                    }
                }) : !1 === e.authSetting["scope.writePhotosAlbum"] ? wx.showModal({
                    content: "请在设置中打开相册权限～",
                    showCancel: !1,
                    confirmText: "知道了",
                    success: function(e) {
                        e.confirm && wx.openSetting({
                            success: function(e) {
                                e.authSetting["scope.writePhotosAlbum"] && t.createPost();
                            }
                        });
                    }
                }) : t.createPost();
            }
        });
    },
    createPost: function() {
        var e = wx.createCanvasContext("shareCanvas"), i = this.data, a = i.deviceWidth, s = i.deviceHeight, o = i.nickName, n = i.avatarUrl, l = i.localCoverImg, r = (i.arcodeUrl, 
        i.epInfo), c = r.title, d = r.evaluate.substring(0, 23) + "...";
        e.setFillStyle("#ffffff"), e.fillRect(0, 0, a, s), e.drawImage(l, 0, 0, a, 210);
        var p = t.strLen(c), h = p.str1, u = p.str2;
        e.setFontSize(20), e.setFillStyle("#212121"), u.length ? (e.fillText(h.join().replace(/,/g, ""), 16, 242), 
        e.fillText(u.join().replace(/,/g, ""), 16, 270)) : e.fillText(h.join().replace(/,/g, ""), 16, 260), 
        e.stroke(), e.save(), e.setFontSize(12), e.setFillStyle("#999"), e.fillText(d, 16, 298), 
        e.stroke(), e.save(), e.setStrokeStyle("#E7E7E7"), e.setLineWidth(.1), e.beginPath(), 
        e.moveTo(16, 325), e.lineTo(58, 325), e.closePath(), e.stroke(), e.save(), e.setFontSize(14), 
        e.setFillStyle("#212121"), e.fillText(o, 41, 365), e.stroke(), e.setFontSize(12), 
        e.setFillStyle("#999"), e.fillText("在" + t.getTime() + "观看这个视频", 16, 382), e.stroke(), 
        e.save(), e.beginPath(), e.arc(26, 360, 10, 0, 2 * Math.PI), e.setFillStyle("#EEEEEE"), 
        e.fill(), e.clip(), e.drawImage(n, 16, 350, 20, 20), e.restore(), e.closePath(), 
        e.restore(), e.drawImage("../../image/icon-post.png", 0, 330, 375, 140), e.drawImage(this.data.arcodeUrl, 216, 377, 76, 76), 
        e.draw(!0, function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 375,
                height: 470,
                canvasId: "shareCanvas",
                success: function(t) {
                    var e = t.tempFilePath;
                    wx.saveImageToPhotosAlbum({
                        filePath: e,
                        success: function(t) {
                            -1 !== t.errMsg.indexOf("ok") ? wx.showModal({
                                content: "已保存到本地相册，快分享到朋友圈叫小伙伴们来围观吧~",
                                showCancel: !1,
                                confirmText: "知道了",
                                success: function(t) {
                                    t.confirm && console.log("用户点击确定");
                                }
                            }) : wx.showToast({
                                title: "保存失败",
                                icon: "none",
                                duration: 3e3
                            });
                        }
                    });
                }
            });
        });
    },
    reportEvent: function(t) {
        switch (t.target.dataset.report) {
          case "playbtn":
            wx.reportAnalytics("videopage_play_click", {
                videopage_play_click: t.target.dataset.aid
            });
            break;

          case "openapp":
            wx.reportAnalytics("openapp_click", {
                openapp_click: "openapp"
            });
        }
    },
    isShowopenbtn: function() {
        wx.getStorageSync("openApp") ? this.setData({
            iSopenBtn: !0
        }) : this.setData({
            iSopenBtn: !1
        });
    },
    shareRep: function() {
        wx.reportAnalytics("pgcvideo_share_friends_click");
    }
});