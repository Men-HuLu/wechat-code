function i(i) {
    return i && i.__esModule ? i : {
        default: i
    };
}

function o(i, o, t) {
    return o in i ? Object.defineProperty(i, o, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : i[o] = t, i;
}

var t, e = i(require("../common/httpClient")), a = i(require("../config/index")), n = i(require("../common/util")), s = i(require("../common/navigator")), r = getApp();

Page({
    data: (t = {
        isIpx: !1,
        isLoading: !0,
        isError: !1,
        rooms: []
    }, o(t, "isLoading", !0), o(t, "isLoadingMore", !0), o(t, "showLoading", !1), o(t, "hasMore", !0), 
    o(t, "page", 2), o(t, "isError", !1), o(t, "isEmpty", !1), t),
    onLoad: function() {
        this.init(), this.isIpx = r.globalData.isIphoneX;
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.setData({
            isLoadingMore: !1,
            showLoading: !1,
            hasMore: !0,
            isError: !1,
            isEmpty: !1
        }), this.init();
    },
    pulldownFinish: function() {
        wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
    },
    loadMore: function() {
        var i = this;
        (this.data.hasMore || this.data.isLoadingMore) && (this.showLoading = !0, this.isLoadingMore = !0, 
        this.setData({
            showLoading: this.showLoading,
            isLoadingMore: this.isLoadingMore
        }), this.getHomeVideo(this.data.page).then(function(o) {
            if (i.setData({
                page: i.data.page + 1
            }), !o || !o.data || !o.data.length) return i.isLoadingMore = !1, i.hasMore = !1, 
            void i.setData({
                hasMore: i.hasMore,
                isLoadingMore: i.isLoadingMore
            });
            o.data.length < 20 && (i.isLoadingMore = !1, i.hasMore = !1, i.setData({
                hasMore: i.hasMore,
                isLoadingMore: i.isLoadingMore
            })), o.data.forEach(function(i) {
                i.title = n.default.htmlDecode(i.title), i.view_num = n.default.numberUpperFormat(i.view_num), 
                i.video_duration = n.default.secToTime(i.video_duration);
            }), i.rooms = i.rooms.concat(o.data), i.setData({
                rooms: i.rooms
            });
        }));
    },
    onReachBottom: function() {
        this.loadMore();
    },
    onShareAppMessage: function() {
        return {
            title: "斗鱼视频",
            path: "/pages/video"
        };
    },
    onPageScroll: function() {},
    onTabItemTap: function() {},
    getHomeVideo: function() {
        var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 20;
        return e.default.requestStorageFirst({
            url: a.default.API.VIDEO_HOME,
            data: {
                page: i,
                limit: o
            },
            complete: function() {}
        });
    },
    errReq: function() {
        this.isError = !0, this.isLoading = !1, this.pulldownFinish(), this.setData({
            isError: this.isError,
            isLoading: this.isLoading
        });
    },
    emptyResult: function() {
        this.isError = !1, this.isLoading = !1, this.isEmpty = !0, this.pulldownFinish(), 
        this.setData({
            isError: this.isError,
            isLoading: this.isLoading,
            isEmpty: this.isEmpty
        });
    },
    init: function() {
        var i = this;
        this.page = 2, this.getHomeVideo().then(function(o) {
            0 === o.code ? (i.rooms = o.data, i.rooms.forEach(function(i) {
                i.title = n.default.htmlDecode(i.title), i.view_num = n.default.numberUpperFormat(i.view_num), 
                i.video_duration = n.default.secToTime(i.video_duration);
            }), i.hasMore = !0, i.isLoadingMore = !0, i.showLoading = !0, i.isLoading = !1, 
            i.isError = !1, i.pulldownFinish(), i.setData({
                hasMore: i.hasMore,
                isLoadingMore: i.isLoadingMore,
                showLoading: i.showLoading,
                isLoading: i.isLoading,
                isError: i.isError,
                rooms: i.rooms
            })) : i.emptyResult();
        }, function(o) {
            i.errReq();
        }).catch(function(o) {
            i.errReq();
        });
    },
    reload: function() {
        this.isLoading = !0, this.isError = !1, this.setData({
            isLoading: this.isLoading,
            isError: this.isError
        }), this.init();
    },
    gotoVideo: function(i) {
        var o = i.currentTarget.dataset.hashId;
        s.default.disDoubleNavigate("video-room?videoId=" + o);
    },
    bindSendDanmu: function() {
        this.videoContext.sendDanmu({
            text: "2asdfasd",
            color: "#ff2"
        });
    }
});