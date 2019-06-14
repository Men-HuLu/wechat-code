var t = getApp(), a = require("../../util.js");

Page({
    data: {
        value: "",
        hitsList: [],
        hotsList: [],
        searchHis: [],
        resultList: [],
        onGetting: !1,
        listOver: !1,
        searching: !1,
        guide: !0,
        holder: "",
        following: !1,
        eventCache: {},
        pageSize: 10,
        pageHot: 1,
        totalHot: 0,
        pageSearch: 1,
        totalSearch: 0,
        timeout: {}
    },
    onLoad: function(t) {
        t.val && (this.setData({
            value: t.val
        }), this.search(), this.data.guide = !1), this.setData({
            searchHis: wx.getStorageSync("searchHis") || []
        }), this.getHotList();
    },
    onShow: function() {
        a.checkLoginBack(this);
    },
    search: function(e) {
        var i = this, s = this.data.value || this.data.holder;
        s && !this.data.onGetting && ("more" !== e && (this.data.pageSearch = 1), this.setData({
            onGetting: !0
        }), a.ajax({
            method: "GET",
            host: t.globalData.httpSearch,
            url: "/search/mini/topic/title_and_author",
            data: {
                q: s,
                size: this.data.pageSize,
                page: this.data.pageSearch
            },
            callback: function(t) {
                var r = t.hits.map(function(t) {
                    return {
                        id: t.topic_id,
                        title: t.title,
                        img: a.addSuffix(t.vertical_image_url, 3),
                        category: t.category,
                        author: t.author_name,
                        fav: t.favourite,
                        praise: a.transNum(t.likes_count),
                        comment: a.transNum(t.comments_count)
                    };
                });
                "more" == e ? i.data.timeout = setTimeout(function() {
                    i.setData({
                        onGetting: !1
                    });
                }, 1500) : (i.setData({
                    onGetting: !1
                }), i.addHistory(s)), i.setData({
                    searching: !1,
                    resultList: "more" == e ? i.data.resultList.concat(r) : r,
                    value: s,
                    holder: "",
                    listOver: r.length < i.data.pageSize
                }), i.data.totalSearch = t.total;
            }
        }));
    },
    loadMore: function() {
        this.data.onGetting || (this.data.pageSearch < Math.ceil(this.data.totalSearch / this.data.pageSize) ? (this.data.pageSearch += 1, 
        this.search("more")) : this.setData({
            listOver: !0
        }));
    },
    getHotList: function() {
        var e = this;
        a.ajax({
            method: "GET",
            host: t.globalData.httpSearch,
            url: "/search/mini/hot_word",
            data: {
                page: this.data.pageHot,
                size: this.data.pageSize
            },
            callback: function(t) {
                var a = t.hits.hot_word;
                e.setData({
                    totalHot: t.total,
                    hotsList: a.map(function(t) {
                        var a = void 0;
                        switch (t.tag) {
                          case "广告":
                            a = "#82CEFF";
                            break;

                          case "更新":
                            a = "#FF8645";
                            break;

                          case "完结":
                            a = "#B591FF";
                        }
                        return {
                            tag: t.tag,
                            bgColor: a,
                            id: t.target_id,
                            jump: 2 == t.action_type ? "Topic" : 3 == t.action_type ? "Comic" : "",
                            title: t.target_title.length > 8 ? t.target_title.substr(0, 8) + "..." : t.target_title
                        };
                    })
                }), e.data.guide && t.hits.guide_text && e.setData({
                    holder: t.hits.guide_text
                }), e.data.guide = !1;
            }
        });
    },
    hotExchange: function() {
        this.data.pageHot < Math.ceil(this.data.totalHot / this.data.pageSize) ? this.data.pageHot += 1 : this.data.pageHot = 1, 
        this.getHotList();
    },
    handleInput: function(e) {
        var i = this, s = e.detail.value;
        s ? a.ajax({
            method: "GET",
            host: t.globalData.httpSearch,
            url: "/search/mini/suggest",
            data: {
                q: s
            },
            callback: function(t) {
                i.setData({
                    hitsList: t.hits,
                    value: s,
                    searching: !0
                });
            }
        }) : this.clearValue();
    },
    clickHistory: function(t) {
        var a = t.currentTarget.dataset;
        this.addHistory(a.value), this.setData({
            value: a.value
        }), this.search();
    },
    addHistory: function(t) {
        if (t) {
            var e = this.data.searchHis;
            e.unshift(t), e = a.arrayArrange(e), this.setData({
                searchHis: e
            }), wx.setStorageSync("searchHis", e);
        }
    },
    removeHistory: function(t) {
        this.data.searchHis.splice(t.currentTarget.dataset.index, 1), this.setData({
            searchHis: this.data.searchHis
        }), wx.setStorageSync("searchHis", this.data.searchHis);
    },
    clearHistory: function() {
        this.setData({
            searchHis: []
        }), wx.setStorageSync("searchHis", []);
    },
    clearValue: function() {
        this.setData({
            hitsList: [],
            value: ""
        });
    },
    handleFav: function(t) {
        var e = this;
        if (!this.data.following) {
            this.data.following = !0;
            var i = t.currentTarget.dataset;
            this.data.eventCache = t, a.follow({
                type: !0,
                id: i.id,
                callback: function(t) {
                    e.data.following = !1, e.data.resultList[i.index].fav = !0, e.setData({
                        resultList: e.data.resultList
                    });
                }
            });
        }
    },
    jumpTopic: function(t) {
        var e = t.currentTarget.dataset;
        e.ori = 11, this.addHistory(e.tit), a.jumpTopic(e);
    },
    jumpComic: function(t) {
        var e = t.currentTarget.dataset;
        this.addHistory(e.tit), a.jumpComic(e);
    }
});