function t(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

var e, i = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../common/navigator"));

Component({
    properties: {
        src: {
            type: String,
            value: "",
            observer: function(t) {
                this.videoContext || (this.videoContext = wx.createLivePlayerContext("myVideo", this)), 
                this.videoContext.play();
            }
        },
        liveStatus: {
            type: Boolean,
            value: !0
        },
        statusTip: {
            type: String,
            value: ""
        },
        isNrt: {
            type: Boolean,
            value: !1
        },
        isYz: {
            type: Boolean,
            value: !1
        },
        autoPlay: {
            type: Boolean,
            value: !1,
            observer: function(t) {
                t && !this.data.isplaying && this.videoContext && this.videoContext.play();
            }
        },
        isLive: {
            type: Boolean,
            value: !0
        },
        danmuList: {
            type: Array,
            value: []
        },
        showCenterPlayBtn: {
            type: Boolean,
            value: !1
        },
        closeHasVideo: {
            type: Boolean,
            value: !1
        },
        curroominfo: {
            type: Object,
            value: {}
        },
        closeHasid: {
            type: String,
            value: ""
        }
    },
    data: {
        liveerror_tip: "直播获取失败",
        videoerror_tip: "视频获取失败",
        liveerror_op: "点击重试",
        liveerror: !1,
        liveswitch: !1,
        isPaused: !1,
        timer: null,
        isplaying: !1,
        begin: new Date(),
        windowHeight: "500rpx",
        fullScreen: !1,
        isNotWifi: !1,
        hideCover: !0,
        isVideoLoading: !0,
        hiddenControl: !1,
        videoStatus: 1,
        isPlayingHide: !1
    },
    methods: (e = {
        restContrl: function() {
            var t = this;
            clearTimeout(this.coverTimeout), this.coverTimeout = null, this.coverTimeout = setTimeout(function() {
                t.setData({
                    hiddenControl: !0
                });
            }, 2500);
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
        clickGotoCatalog: function() {
            i.default.disDoubleNavigate("calalogue-list?type=" + this.data.curroominfo.short_name + "&name=" + this.data.curroominfo.cate2_name);
        },
        clickGotoVideo: function() {
            i.default.disDoubleRedirect("video-room?videoId=" + this.data.closeHasid);
        },
        liveLoadError: function() {
            this.data.errTimes || (this.data.errTimes = 0), this.data.errTimes < 2 ? (this.setData({
                errTimes: ++this.data.errTimes
            }), this.retry()) : (this.liveLoadErr(), this.setData({
                errTimes: 0
            }));
        },
        liveLoadErr: function() {
            this.setData({
                isplaying: !1,
                liveerror: !0
            });
        },
        livepaused: function() {
            this.setData({
                isplaying: !1,
                isPaused: !0
            });
        },
        liveEnded: function() {},
        retry: function() {
            var t = this;
            this.setData({
                liveerror: !1,
                liveerror_op: "点击重试",
                isPaused: !1,
                autoPlay: !0,
                liveswitch: !1
            }), setTimeout(function() {
                t.setData({
                    liveswitch: !1
                });
            }, 0);
        },
        liveplay: function() {
            var t = this;
            !this.timer && (this.timer = setTimeout(function() {
                t.timer = null, t.catchLiveError();
            }, 7500)), this.data.isLive && this.data.isPaused && this.retry();
        },
        liveupdate: function() {
            this.data.isplaying || this.setData({
                isplaying: !0
            });
        },
        fullscreenchange: function(t) {
            this.setData({
                fullScreen: t.detail.fullScreen
            });
        }
    }, t(e, "fullscreenchange", function(t) {
        this.fullScreen = t.detail.fullScreen;
    }), t(e, "statechange", function(t) {
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
    }), t(e, "liveLoadErrorEvent", function() {
        this.liveLoadErr();
    }), t(e, "catchLiveError", function() {
        !this.data.liveStatus || this.data.liveerror || this.data.isPaused || this.data.liveswitch || this.data.isplaying || this.setData({
            liveerror: !0,
            isplaying: !1
        });
    }), t(e, "onHide", function() {
        this.setData({
            isPlayingHide: !0
        }), this.timer && (clearTimeout(this.timer), this.timer = null);
    }), t(e, "onShow", function() {
        this.data.isPlayingHide && this.data.isNrt && this.videoContext && this.videoContext.play(), 
        wx.setKeepScreenOn({
            keepScreenOn: !0
        });
    }), t(e, "onUnload", function() {
        this.videoContext && this.videoContext.stop(), this.videoContext = null;
    }), e),
    behaviors: [],
    created: function() {},
    attached: function() {},
    ready: function() {
        var t = this;
        this.restContrl(), this.videoContext = wx.createLivePlayerContext("myVideo", this), 
        getApp().events.addListener("network_connected", function() {
            t.videoContext && t.videoContext.play();
        }), this.vPlayTimeout = setTimeout(function() {
            t.data.isplaying || t.data.autoPlay && (console.log("设置自动播放 没有自动播放"), t.videoContext.play());
        }, 1500);
    },
    moved: function() {},
    detached: function() {
        clearTimeout(this.vPlayTimeout), clearTimeout(this.coverTimeout), this.vPlayTimeout = null, 
        this.coverTimeout = null;
    }
});