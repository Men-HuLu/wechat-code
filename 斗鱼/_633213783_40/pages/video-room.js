function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

var i = t(require("../common/util")), a = t(require("../common/httpClient")), o = t(require("../config/index")), n = t(require("../common/navigator")), s = getApp();

Page({
    data: {
        isConnectDanmu: !0,
        videoId: 0,
        isIpx: !1,
        isNrt: !1,
        statusTip: "主播暂时不在家",
        autoPlay: !0,
        stream: "",
        isDesOpen: !1,
        isLive: !1,
        videoInfo: {},
        recVideoList: [],
        commentList: [],
        isLoading: !0,
        rooms: [],
        isLoadingMore: !0,
        showLoading: !0,
        hasMore: !0,
        page: 2,
        isError: !1,
        isEmpty: !1,
        isVertical: !1,
        ctotal: 0,
        danmuList: [],
        isFromAppShare: !1,
        showCenterPlayBtn: !0
    },
    onLoad: function(t) {
        var e = i.default.scanCodeParse(t);
        if (e && (t = e), t && t.videoId) {
            this.data.videoId = t.videoId;
            this.isYz = "1" === t.is_vertical, this.init();
        }
        this.isIpx = s.globalData.isIphoneX, this.judgeIsAppShare(t);
    },
    onReady: function() {},
    onShow: function() {
        this.all = this.selectAllComponents(".component");
    },
    onHide: function() {},
    onUnload: function() {
        this.broadcast("onUnload");
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        var t = this;
        (this.data.hasMore || this.data.isLoadingMore) && (this.showLoading = !0, this.isLoadingMore = !0, 
        this.setData({
            showLoading: this.showLoading,
            isLoadingMore: this.isLoadingMore
        }), this.getComment(this.data.page).then(function(e) {
            if (t.setData({
                page: t.data.page + 1
            }), !e || !e.data.page || !e.data.page.length) return t.isLoadingMore = !1, t.hasMore = !1, 
            void t.setData({
                isLoadingMore: t.isLoadingMore,
                hasMore: t.hasMore
            });
            e.data.page.length < 10 && (t.isLoadingMore = !1, t.hasMore = !1, t.setData({
                isLoadingMore: t.isLoadingMore,
                hasMore: t.hasMore
            })), e.data.page.forEach(function(t) {
                t.time = t.time && i.default.getDateTimeDiff(1e3 * t.time).PubTime;
            }), t.commentList = t.commentList.concat(e.data.page), t.setData({
                commentList: t.commentList
            });
        }));
    },
    onShareAppMessage: function() {
        var t = this.videoInfo, e = "视频：" + (t && t.title) || "斗鱼视频";
        t && t.room_id, t && t.video_pic;
        return {
            title: e,
            path: "/pages/video-room?videoId=" + this.data.videoId
        };
    },
    onPageScroll: function() {},
    onTabItemTap: function() {},
    errReload: function() {
        this.init();
    },
    reload: function() {
        this.init();
    },
    toggleDes: function() {
        this.setData({
            isDesOpen: !this.data.isDesOpen
        });
    },
    goVideoRoom: function(t) {
        var e = t.currentTarget.dataset.hashId;
        n.default.disDoubleRedirect("video-room?videoId=" + e);
    },
    getRoomInfo: function() {
        return a.default.request({
            url: o.default.API.VIDEO_INFO,
            data: {
                vid: this.data.videoId
            }
        });
    },
    getHisBarrage: function() {
        return a.default.request({
            url: o.default.API.VIDEO_HIS_BARRAGE,
            data: {
                vid: this.data.videoId
            }
        });
    },
    getRecVideoList: function() {
        return a.default.request({
            url: o.default.API.VIDEO_REC_LIST,
            data: {
                vid: this.data.videoId
            }
        });
    },
    getComment: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
        return a.default.request({
            url: o.default.API.VIDEO_COMMENT,
            data: {
                page: t,
                vid: this.data.videoId
            }
        });
    },
    errorToast: function(t) {
        wx.showToast({
            title: t,
            icon: "none",
            duration: 2e3
        });
    },
    resetLogToken: function() {
        var t = wx.getStorageSync("dyUsevInfo") || {};
        wx.setStorageSync("dyUsevInfo", Object.assign(t, {
            localToken: ""
        }));
    },
    init: function() {
        var t = this;
        this.getRoomInfo(this.data.videoId).then(function(e) {
            if (0 === e.code) {
                t.isLoading = !1, t.isError = !1, t.isEmpty = !1, e.data.title = i.default.htmlDecode(e.data.title), 
                e.data.view_num = i.default.numberUpperFormat(e.data.view_num) || 0, e.data.follow_num = i.default.numberUpperFormat(e.data.follow_num) || 0, 
                e.data.date = i.default.getFormattedDate(1e3 * e.data.ctime), e.data.contents = i.default.htmlDecode(e.data.contents), 
                t.isVertical = e.data.is_vertical || !!e.data.is_vertical, e.data.vid = t.data.videoId;
                var n = t.videoInfo = e.data || {};
                t.recordRoomInfo(t.data.videoId, n), t.setData({
                    isLoading: t.isLoading,
                    isError: t.isError,
                    isEmpty: t.isEmpty,
                    isVertical: t.isVertical,
                    videoInfo: t.videoInfo
                }), wx.setNavigationBarTitle({
                    title: n.title ? n.title : "斗鱼视频"
                }), a.default.request({
                    url: o.default.API.VIDEO_SROUCE,
                    method: "POST",
                    data: {
                        vid: t.data.videoId,
                        token: "wxapp"
                    }
                }).then(function(e) {
                    t.stream = e.data.video_url, t.setData({
                        stream: t.stream
                    });
                });
            } else t.emptyResult();
        }, function(e) {
            t.errReq();
        }).catch(function(e) {
            t.errReq();
        }), this.getRecVideoList().then(function(e) {
            0 === e.code && (e.data.forEach(function(t) {
                t.title = i.default.htmlDecode(t.title), t.view_num = i.default.numberUpperFormat(t.view_num), 
                t.date = i.default.secToTime(t.video_duration);
            }), t.recVideoList = e.data, t.setData({
                recVideoList: t.recVideoList
            }));
        }), this.getComment().then(function(e) {
            0 === e.code && (e.data.page.length < 10 && (t.isLoadingMore = !1, t.hasMore = !1, 
            t.setData({
                isLoadingMore: t.isLoadingMore,
                hasMore: t.hasMore
            })), t.ctotal = e.data.total, e.data.page.forEach(function(t) {
                t.time = t.time && i.default.getDateTimeDiff(1e3 * t.time).PubTime;
            }), t.commentList = e.data.page, t.setData({
                commentList: t.commentList,
                ctotal: t.ctotal
            }));
        });
    },
    recordRoomInfo: function(t) {
        var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, a = i.video_pic || "", o = i.title || "", n = (wx.getStorageSync("dyUserInfo") || {}).uid;
        if (n) {
            var s = wx.getStorageSync("myWatchRecord") || {}, r = s[n] || [];
            r.length && (r = r.filter(function(e) {
                return e.roomId != t;
            })).length >= 20 && r.pop(), r.unshift({
                isLive: 0,
                roomId: t,
                roomSrc: a,
                title: o
            }), wx.setStorageSync("myWatchRecord", Object.assign(s, e({}, n, r)));
        }
    },
    judgeIsAppShare: function(t) {
        console.log(t);
        var e = parseInt(s.globalData.scene, 10);
        1036 === e || 1069 === e ? s.globalData.isFromAppShare = !0 : 1089 !== e && 1090 !== e && (s.globalData.isFromAppShare = !1), 
        this.setData({
            isFromAppShare: s.globalData.isFromAppShare
        });
    },
    errReq: function() {
        this.isError = !0, this.isLoading = !1, this.isEmpty = !1, this.broadcast("liveLoadErrorEvent"), 
        this.setData({
            isError: this.isError,
            isLoading: this.isLoading,
            isEmpty: this.isEmpty
        });
    },
    emptyResult: function() {
        this.isError = !1, this.isLoading = !1, this.isEmpty = !0, this.setData({
            isError: this.isError,
            isLoading: this.isLoading,
            isEmpty: this.isEmpty
        });
    },
    broadcast: function(t, e) {
        this.all.forEach(function(i) {
            i[t] && i[t](e);
        });
    }
});