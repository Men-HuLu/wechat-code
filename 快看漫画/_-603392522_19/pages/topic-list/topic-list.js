function t(t, a, i) {
    return a in t ? Object.defineProperty(t, a, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = i, t;
}

getApp();

var a = require("../../util.js");

Page({
    data: {
        listId: "",
        listTit: "",
        topicList: [],
        offset: 0,
        pageSize: 10,
        following: !1,
        errorLoad: !1,
        onPulling: !1,
        onGetting: !1,
        noMore: !1,
        noData: !1,
        eventCache: {}
    },
    onLoad: function(t) {
        this.data.listId = t.id, this.data.listTit = t.tit, this.pageInit();
    },
    onShow: function() {
        a.checkLoginBack(this);
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: this.data.listTit
        });
    },
    onPullDownRefresh: function() {
        this.data.onPulling = !0, this.pageInit(!0);
    },
    onReachBottom: function() {
        this.data.noMore || this.getData();
    },
    pageInit: function() {
        this.data.offset = 0, this.data.onGetting = !1, this.data.following = !1, this.data.errorLoad && this.setData({
            errorLoad: !1
        }), this.getData(!0);
    },
    getData: function(t) {
        var i = this;
        this.data.onGetting || (this.setData({
            onGetting: !0
        }), a.ajax({
            method: "GET",
            url: "/mini/v1/comic/discovery/discovery_module_list",
            data: {
                id: this.data.listId,
                offset: this.data.offset,
                limit: this.data.pageSize
            },
            callback: function(o) {
                var e = o.data, n = e.topics.map(function(t) {
                    return {
                        id: t.id,
                        title: t.title,
                        img: a.addSuffix(t.cover_image_url, 2),
                        category: t.category,
                        fav: t.is_favourite,
                        praise: a.transNum(t.like_count),
                        comment: a.transNum(t.comment_count)
                    };
                });
                t ? i.data.topicList.length && (n = i.data.topicList.splice(0, 10)) : n = i.data.topicList.concat(n), 
                i.setData({
                    topicList: n,
                    offset: e.offset,
                    noMore: -1 == e.offset || e.topics.length < i.data.pageSize,
                    noData: 0 == i.data.offset && 0 == e.topics.length,
                    onGetting: !1
                }), i.data.onPulling && (wx.stopPullDownRefresh(), i.data.onPulling = !1);
            },
            error: function(t) {
                i.setData({
                    errorLoad: !0
                });
            }
        }));
    },
    jumpTopic: function(t) {
        var i = t.currentTarget.dataset;
        a.jumpTopic(i);
    },
    handleFav: function(i) {
        var o = this;
        if (!this.data.following) {
            this.data.following = !0, this.data.eventCache = i;
            var e = i.currentTarget.dataset;
            a.follow({
                type: !0,
                id: e.id,
                callback: function(a) {
                    o.data.following = !1, o.setData(t({}, "topicList[" + e.index + "].fav", !0));
                }
            });
        }
    }
});