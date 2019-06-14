var t = require("../../utils/util.js"), e = require("../../utils/fetch"), i = e.fetch, a = e.fetchImg, o = e.reportbili, n = getApp();

Page({
    data: {
        isPlay: !1,
        isStart: !1,
        danmuList: [],
        bigDanmuList: [],
        durl: "",
        localCoverImg: "",
        aidSingle: "",
        tagArray: [],
        multiView: {},
        channelList: [],
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
        arcodeUrl: "",
        ugcList: [],
        isShowFullPGC: !1,
        cid: "",
        over100: !1,
        shareover100: !1,
        inx: 0,
        currentContent: "",
        aid: "",
        scrollTop: null
    },
    onLoad: function(e) {
        var i = this;
        console.log("查看入参", e);
        var a = void 0;
        e.scene ? a = Number(e.scene) : (a = e.avid, e.page && this.setData({
            inx: e.page
        })), this.setData({
            aidSingle: a
        }, function() {
            i.getAvinfo(a, e.page, "onload");
        });
        var o = this;
        wx.getSystemInfo({
            success: function(t) {
                n.globalData.isNotch && o.setData({
                    iPxBar: !0
                }), o.setData({
                    deviceWidth: t.windowWidth,
                    deviceHeight: t.screenHeight
                });
            }
        }), this.isShowopenbtn(), t.getNetWorkType().then(function(t) {
            var e = t.errMsg, a = t.networkType;
            "getNetworkType:ok" === e && i.setData({
                network: "wifi" === a
            });
        });
    },
    onShow: function(t) {
        -1 == n.globalData.secne && this.onLoad();
    },
    onHide: function() {
        n.globalData.scene = -1;
    },
    onReady: function() {
        this.videoContext = wx.createVideoContext("myVideo"), wx.getStorageSync("openApp") && wx.reportAnalytics("vinfo_video_click", {
            vinfo_video_click: "",
            from_app_share: 1
        });
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
    getArcode: function(t) {
        var e = this;
        wx.getImageInfo({
            src: 'https://api.bilibili.com/x/web-goblin/wechat/qrcode?json={"page":"pages/video/video","scene":' + t + ',"width":"80"}',
            success: function(t) {
                e.setData({
                    arcodeUrl: t.path
                });
            }
        });
    },
    play: function() {
        this.setData({
            isPlay: !0,
            isStart: !0
        }), this.data.network && wx.reportAnalytics("vinfo_video_click", {
            vinfo_video_click: this.data.avid
        }), this.videoContext.play();
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
    epChoice: function(t) {
        var e = t.currentTarget.dataset.cid, i = t.currentTarget.dataset.inx;
        e !== this.data.cid && (this.setData({
            inpart: !0,
            cid: e,
            isShowFullUGC: !1,
            scrollPosition: "position" + i,
            inx: i
        }), i > 99 && this.setData({
            scrollPosition: "current"
        }), this.getAvinfo(this.data.aidSingle, i));
    },
    bindended: function() {
        this.videoContext.exitFullScreen(), this.setData({
            isStart: !1,
            isPlay: !1,
            isShowRec: !0
        });
    },
    launchAppError: function(t) {
        wx.navigateTo({
            url: "../download/download"
        });
    },
    onShareAppMessage: function(t) {
        return wx.reportAnalytics("vinfo_share_click", {
            vinfo_share_click: this.data.aidSingle
        }), "button" === t.from && wx.reportAnalytics("video_share_friends_click"), {
            title: this.data.multiView.title,
            path: "/pages/video/video?avid=" + this.data.aidSingle + "&page=" + this.data.inx,
            imageUrl: this.data.multiView.pic + "@158-0-750-600a_10660w_600h.png",
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
        var e = t.currentTarget.dataset.tag;
        e != this.data.nowTag && (wx.reportAnalytics("comments_tab_click", {
            vinfo_tag_click: e
        }), this.setData({
            nowTag: e,
            scrollTop: 0
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
    isFullUGC: function(t) {
        t.currentTarget.dataset.flag ? this.setData({
            isShowFullUGC: !0
        }) : this.setData({
            isShowFullUGC: !1
        });
    },
    getAvinfo: function(t, e, s) {
        var c = this;
        i({
            url: n.globalData.ip + "/x/web-interface/view/detail",
            data: {
                aid: t
            }
        }).then(function(n) {
            var r = n.data.data;
            c.setData({
                tagArray: r.Tags,
                followers: r.Card.follower,
                multiView: r.View,
                channelList: r.Related,
                acount: r.View.stat.reply ? r.View.stat.reply : "",
                isShowRec: !1,
                titleOpen: !1,
                aidSingle: t,
                ugcList: r.View.pages.slice(0, 100),
                scrollTop: 0
            }), e ? (s && c.setData({
                currentContent: r.View.pages[e].part,
                currentCid: r.View.pages[e].cid,
                currentInx: e
            }), c.setData({
                cid: r.View.pages[e].cid,
                scrollPosition: "position" + e
            }, function() {
                c.getVideo(c.data.cid, t);
            })) : c.setData({
                cid: r.View.pages.length ? r.View.pages[0].cid : r.View.cid,
                scrollPosition: "position0"
            }, function() {
                c.getVideo(c.data.cid, t);
            }), i({
                url: "https://comment.bilibili.com/recommend/" + t + ".json?html5=1"
            }).then(function(t) {
                c.setData({
                    singleRec: t.data[0]
                });
            }), r.View.pages.length > 100 && c.setData({
                over100: !0
            }), e > 99 && c.setData({
                shareover100: !0,
                scrollPosition: "current"
            }), a(r.View.pic).then(function(t) {
                c.setData({
                    localCoverImg: t.path
                });
            }), c.getArcode(t), o([ t, "play", "vinfo", "", "" ]), c.data.network && wx.reportAnalytics("vinfo_video_click", {
                vinfo_video_click: t
            });
        });
    },
    getVideo: function(t, e) {
        var a = this;
        i({
            url: n.globalData.ip + "/x/player/playurl",
            data: {
                cid: t,
                avid: e,
                otype: "json",
                platform: "html5",
                type: "mp4"
            }
        }).then(function(t) {
            a.setData({
                durl: t.data.data.durl[0].url
            });
        });
    },
    copycliboard: function() {
        wx.setClipboardData({
            data: "av" + this.data.aidSingle,
            success: function(t) {}
        });
    },
    updatePlay: function(t) {
        this.videoContext.pause(), this.getAvinfo(t.detail.id), o([ t.detail.id, "relate_click", "vinfo", "", "" ]);
    },
    gotoNewAv: function(t) {
        var e = t.currentTarget.dataset.avid;
        this.getAvinfo(e);
    },
    playing: function() {
        this.setData({
            isShowRec: !1
        });
    },
    closeActionsheet: function() {
        this.setData({
            showAS: !1
        });
    },
    canvasTextAutoLine: function(t, e, i, a) {
        for (var o = wx.createCanvasContext("shareCanvas"), n = 0, s = 0, c = [], r = [], l = 0; l < t.length; l++) (n += o.measureText(t[l]).width) > 375 - e && (c.push(t.substring(s, l)), 
        a, n = 0, s = l), l == t.length - 1 && r.push(t.substring(s, l + 1) + "...");
        return {
            1: c,
            2: r
        };
    },
    onGotUserInfo: function(t) {
        var e = this;
        wx.reportAnalytics("video_share_moments_click");
        var i = t.detail.userInfo, o = i.avatarUrl, n = i.nickName;
        a(o).then(function(t) {
            e.setData({
                nickName: n,
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
        var e = wx.createCanvasContext("shareCanvas"), i = this.data, a = i.deviceWidth, o = i.deviceHeight, n = i.nickName, s = i.avatarUrl, c = i.multiView, r = i.localCoverImg, l = (i.arcodeUrl, 
        c.title), h = c.desc.substring(0, 23) + "...";
        e.setFillStyle("#ffffff"), e.fillRect(0, 0, a, o), e.drawImage(r, 0, 0, a, 210);
        var d = t.strLen(l), u = d.str1, p = d.str2;
        e.setFontSize(20), e.setFillStyle("#212121"), p.length ? (e.fillText(u.join().replace(/,/g, ""), 16, 242), 
        e.fillText(p.join().replace(/,/g, ""), 16, 270)) : e.fillText(u.join().replace(/,/g, ""), 16, 260), 
        e.stroke(), e.save(), e.setFontSize(12), e.setFillStyle("#999"), e.fillText(h, 16, 298), 
        e.stroke(), e.save(), e.setStrokeStyle("#E7E7E7"), e.setLineWidth(.1), e.beginPath(), 
        e.moveTo(16, 325), e.lineTo(58, 325), e.closePath(), e.stroke(), e.save(), e.setFontSize(14), 
        e.setFillStyle("#212121"), e.fillText(n, 41, 365), e.stroke(), e.setFontSize(12), 
        e.setFillStyle("#999"), e.fillText("在" + t.getTime() + "观看这个视频", 16, 382), e.stroke(), 
        e.save(), e.beginPath(), e.arc(26, 360, 10, 0, 2 * Math.PI), e.setFillStyle("#EEEEEE"), 
        e.fill(), e.clip(), e.drawImage(s, 16, 350, 20, 20), e.restore(), e.closePath(), 
        e.restore(), e.drawImage("../../image/icon-post.png", 0, 330, 375, 140), e.drawImage(this.data.arcodeUrl, 212, 370, 80, 80), 
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
    }
});