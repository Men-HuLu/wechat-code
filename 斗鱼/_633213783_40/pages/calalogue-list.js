function i(i) {
    return i && i.__esModule ? i : {
        default: i
    };
}

function t(i, t, s) {
    return t in i ? Object.defineProperty(i, t, {
        value: s,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : i[t] = s, i;
}

var s, a = i(require("../common/httpClient")), o = i(require("../config/index")), n = i(require("../common/point")), e = i(require("../common/util")), r = getApp();

Page((s = {
    data: {
        name: "",
        type: "",
        isIpx: !1,
        list: [],
        isLoading: !0,
        isLoadingMore: !0,
        showLoading: !1,
        hasMore: !0,
        page: 2,
        query: {},
        isError: !1,
        isEmpty: !1
    },
    onLoad: function() {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.isLoadingMore = !0, this.showLoading = !1, this.hasMore = !0, 
        this.isError = !1, this.isEmpty = !1, this.setData({
            isLoadingMore: this.isLoadingMore,
            showLoading: this.showLoading,
            hasMore: this.hasMore,
            isError: this.isError,
            isEmpty: this.isEmpty
        }), this.init();
    },
    onReachBottom: function() {
        this.loadMore();
    },
    onShareAppMessage: function() {
        return {
            title: "斗鱼-" + this.name,
            path: "/pages/calalogue-list?type=" + this.type
        };
    },
    onPageScroll: function() {},
    onTabItemTap: function() {},
    reload: function() {
        this.isLoading = !0, this.isError = !1, this.setData({
            isLoading: this.isLoading,
            isError: this.isError
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
        }), this.getCataList(this.query.type, this.data.page).then(function(t) {
            if (i.data.page += 1, !(t && t.data && t.data.list && t.data.list.length)) return i.isLoadingMore = !1, 
            i.hasMore = !1, void i.setData({
                page: i.data.page,
                hasMore: i.hasMore,
                isLoadingMore: i.isLoadingMore
            });
            t.data.list.length < 20 && (i.isLoadingMore = !1, i.hasMore = !1, i.setData({
                hasMore: i.hasMore,
                isLoadingMore: i.isLoadingMore
            })), i.list = i.list.concat(t.data.list), i.setData({
                list: i.list
            });
        }));
    },
    init: function() {
        var i = this;
        this.getCataList(this.query.type).then(function(t) {
            if (i.isLoading = !1, i.isError = !1, i.isEmpty = !1, i.showLoading = !0, !(t && t.data && t.data.list && t.data.list.length)) return i.isEmpty = !0, 
            i.showLoading = !1, void i.setData({
                isEmpty: i.isEmpty,
                showLoading: i.showLoading
            });
            t.data.list.length < 20 && (i.isLoadingMore = !1, i.hasMore = !1, i.setData({
                isLoadingMore: i.isLoadingMore,
                hasMore: i.hasMore
            })), i.list = t.data.list, i.setData({
                list: i.list
            }), i.pulldownFinish();
            var s = {
                cid: "",
                tid: t.data.cate2Id
            };
            n.default.postPoint(o.default.Point.INIT_PAGE_LIVE, o.default.Point.PAGE_LIVE, 0, s);
        }, function(t) {
            console.log(t), i.isLoading = !1, i.isError = !0, i.isEmpty = !1, i.pulldownFinish(), 
            i.setData({
                isLoading: i.isLoading,
                isError: i.isError,
                isEmpty: i.isEmpty
            });
        }).catch(function(t) {
            console.log(t), i.isLoading = !1, i.isError = !0, i.isEmpty = !1, i.pulldownFinish(), 
            i.setData({
                isLoading: i.isLoading,
                isError: i.isError,
                isEmpty: i.isEmpty
            });
        });
    }
}, t(s, "onLoad", function() {
    var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.default.scanCodeParse(i);
    t && (i = t), this.type = i.type || "", this.query = i || {}, this.name = i.name || "直播分类", 
    wx.setNavigationBarTitle({
        title: this.name
    }), this.init(), this.isIpx = r.globalData.isIphoneX, this.setData({
        type: this.type,
        query: this.query,
        name: this.name,
        isIpx: this.isIpx
    });
}), t(s, "getCataList", function(i) {
    var t = this, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
    return a.default.request({
        url: "mix" === this.query.isMix ? o.default.API.MIXLIST : o.default.API.GETCATALOGLISTDATA,
        data: {
            type: i,
            page: s
        },
        complete: function() {
            t.isLoading = !1, t.isEmpty = !1, t.pulldownFinish(), t.setData({
                isLoading: t.isLoading,
                isEmpty: t.isEmpty
            });
        }
    });
}), s));