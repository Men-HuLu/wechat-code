Component({
    properties: {
        src: {
            type: String,
            value: "",
            observer: function() {
                this.setData({
                    liveStatus: !0,
                    liveerror: !1,
                    liveswitch: !1
                });
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
            value: !0
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
        }
    },
    data: {
        liveerror_tip: "视频获取失败",
        liveerror_op: "点击重试",
        liveerror: !1,
        liveswitch: !1,
        isPaused: !1,
        timer: null,
        isplaying: !1,
        begin: new Date(),
        windowHeight: "500rpx",
        fullScreen: !1
    },
    methods: {
        gotoHome: function() {
            wx.switchTab({
                url: "home"
            });
        },
        liveLoadErrorEvent: function() {
            this.liveLoadErr();
        },
        liveLoadError: function() {
            this.errTimes || (this.errTimes = 0), this.errTimes < 2 ? (this.errTimes++, this.retry()) : (this.liveLoadErr(), 
            this.errTimes = 0);
        },
        liveLoadErr: function() {
            this.liveStatus = !1, this.isplaying = !1, this.liveerror = !0, this.setData({
                liveStatus: this.liveStatus,
                isplaying: this.isplaying,
                liveerror: this.liveerror
            }), console.log("liveStatus", this.data.liveStatus, this.data.liveerror);
        },
        livepaused: function() {
            this.isplaying = !1, this.isPaused = !0, this.setData({
                isplaying: this.isplaying,
                isPaused: this.isPaused
            });
        },
        liveEnded: function() {},
        retry: function() {
            var i = this;
            this.liveerror = !1, this.liveerror_op = "点击重试", this.isPaused = !1, this.autoPlay = !0, 
            this.liveswitch = !0, this.triggerEvent("customevent", {}), this.setData({
                liveerror: this.liveerror,
                liveerror_op: this.liveerror_op,
                isPaused: this.isPaused,
                autoPlay: this.autoPlay,
                liveswitch: this.liveswitch
            }), setTimeout(function() {
                i.liveswitch = !1, i.setData({
                    liveswitch: i.liveswitch
                });
            }, 0);
        },
        liveplay: function() {
            var i = this;
            !this.timer && (this.timer = setTimeout(function() {
                i.timer = null, i.catchLiveError();
            }, 7500)), this.data.isLive && this.data.isPaused && this.retry();
        },
        liveupdate: function() {
            this.isplaying || (this.isplaying = !0), this.setData({
                isplaying: this.isplaying
            });
        },
        fullscreenchange: function(i) {
            this.fullScreen = i.detail.fullScreen, this.setData({
                fullScreen: this.fullScreen
            });
        },
        onUnload: function() {
            clearTimeout(this.vPlayTimeout);
        },
        listenToEvent: function() {
            this.addEventListeners();
        },
        catchLiveError: function() {
            !this.data.liveStatus || this.data.liveerror || this.data.isPaused || this.data.liveswitch || this.data.isplaying || (this.liveerror = !0, 
            this.isplaying = !1, this.setData({
                liveerror: this.liveerror,
                isplaying: this.isplaying
            }));
        }
    },
    behaviors: [],
    created: function() {},
    attached: function() {},
    ready: function() {
        var i = this;
        this.videoContext = wx.createVideoContext("myVideo"), this.vPlayTimeout = setTimeout(function() {
            i.data.isplaying || i.data.autoPlay && (console.log("设置自动播放 没有自动播放"), i.videoContext.play());
        }, 1500), this.data.liveStatus && this.data.autoPlay && !this.data.liveerror && (this.liveswitch = !1, 
        this.setData({
            liveswitch: this.liveswitch
        })), this.data.isPlayingHide && this.data.isNrt && (console.log("isPlayingHide"), 
        this.videoContext.play());
    },
    moved: function() {},
    detached: function() {
        this.isPlayingHide = !0, this.data.liveStatus && this.data.autoPlay && !this.data.liveerror && !this.data.isPaused && (this.isPlayingHide = !0, 
        this.isplaying = !1, this.liveswitch = !0, this.setData({
            isPlayingHide: this.isPlayingHide,
            isplaying: this.isplaying,
            liveswitch: this.liveswitch
        })), this.timer && (clearTimeout(this.timer), this.timer = null);
    }
});