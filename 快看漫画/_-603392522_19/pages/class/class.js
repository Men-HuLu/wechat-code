function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = getApp(), e = require("../../util.js");

Page({
    data: {
        userId: 0,
        gender: 0,
        filters: [ [ "全部", "连载", "完结" ], [ "推荐", "最热", "最新" ] ],
        filterOpen: !1,
        tagHeight: 70,
        tagList: [],
        tagIndex: 0,
        swiperObj: {},
        swiperList: [],
        swiperIndex: 0,
        pageSize: 10,
        status: 0,
        sort: 0,
        timeout: {},
        loadList: !1
    },
    onShow: function() {
        e.checkAcconts({
            page: this
        });
    },
    onHide: function() {
        a.globalData.bubbleFlag = !0, this.setData({
            bubble: !1
        });
    },
    onShareAppMessage: function() {
        return {
            title: a.globalData.shareTit,
            path: "/pages/class/class"
        };
    },
    pageInit: function() {
        var t = [], a = void 0;
        for (a = 0; a < 14; a++) t.push({
            id: a,
            tit: "",
            page: 1,
            status: 0,
            sort: 0,
            scroll: 0,
            loading: !0,
            nomore: !1
        });
        t[0].loading = !1, this.data.tagList = t, this.data.swiperList = t.slice(0, 2), 
        this.data.tagIndex = 0, this.data.swiperIndex = 0, this.data.swiperObj = {}, this.getData();
    },
    getData: function(i) {
        var s = this, r = this.data.tagList[this.data.tagIndex], n = "tagList[" + this.data.tagIndex + "]", o = this.data.swiperObj[r.id] || [], d = this.data.status, g = this.data.sort;
        d === r.status && g === r.sort || (r.status = this.data.status, r.sort = this.data.sort, 
        r.page = 1, r.scroll = 0, r.loading = !1, o = []), !i && o.length ? this.afterGetData() : r.loading || (this.setData(t({}, n + ".loading", !0)), 
        e.ajax({
            method: "GET",
            host: a.globalData.httpSearch,
            url: "/search/mini/topic/multi_filter",
            data: {
                gender: this.data.gender,
                tag_id: r.id,
                topic_update_status: d || -1,
                sort: g + 1,
                page: r.page,
                size: this.data.pageSize
            },
            callback: function(a) {
                var i = a.hits, d = i.topicCategories, l = !0, c = s.data.tagList, h = c.length;
                if (h === d.length) {
                    for (var u = 0; u < h; u++) if (c[u].id !== d[u].tagId) {
                        l = !1;
                        break;
                    }
                } else l = !1;
                if (l) a.total > s.data.pageSize * r.page ? (r.page++, s.data.timeout = setTimeout(function() {
                    s.setData(t({}, n + ".loading", !1));
                }, 1500)) : (r.nomore = !0, s.setData(t({}, n + ".loading", !1))); else {
                    var p = d.map(function(t) {
                        return {
                            id: t.tagId,
                            tit: t.title,
                            page: 1,
                            status: 0,
                            sort: 0,
                            scroll: 0,
                            loading: !1,
                            nomore: !1
                        };
                    });
                    p[s.data.tagIndex].page++, s.setData({
                        tagHeight: 70 * Math.ceil(p.length / 7) + 1 + "rpx",
                        tagList: p,
                        tagIndex: 0,
                        status: 0,
                        sort: 0
                    });
                }
                s.data.swiperObj[r.id] = o.concat(i.topicMessageList.map(function(t) {
                    var a = {
                        id: t.topic_id,
                        title: t.title,
                        img: e.addSuffix(t.cover_image_url, 2)
                    };
                    switch (g) {
                      case 1:
                        a.category = t.category, a.popular = e.transNum(t.popularity);
                        break;

                      case 2:
                        a.category = t.category, a.description = t.latest_comic_title;
                        break;

                      default:
                        a.author = t.author_name, a.praise = e.transNum(t.likes_count), a.comment = e.transNum(t.comments_count);
                    }
                    return a;
                })), s.setData({
                    swiperObj: s.data.swiperObj
                }), s.afterGetData();
            }
        }));
    },
    getMore: function(t) {
        t.currentTarget.dataset.nomore || this.getData(!0);
    },
    clickTab: function(t) {
        var a = t.target.dataset.index;
        this.data.tagIndex !== a && this.beforeGetData(a, 1);
    },
    swiperTouch: function(t) {
        if ("touch" == t.detail.source) {
            var a = t.detail.current;
            if (this.data.swiperIndex !== a) {
                var e = this.data.tagIndex;
                a > this.data.swiperIndex ? e++ : e--, 0 == this.data.swiperIndex || 2 == this.data.swiperIndex || (a = 1), 
                this.beforeGetData(e, a);
            }
        }
    },
    beforeGetData: function(t, a) {
        this.setData({
            tagIndex: t
        }), this.data.swiperIndex = a, this.getData();
    },
    afterGetData: function() {
        var a, e = this.data.tagList, i = this.data.tagIndex, s = this.data.swiperIndex, r = i - 1 > 0 ? i - 1 : 0, n = 3;
        i ? i === e.length - 1 && (r = e.length - 2, n = 2, s = 1) : (r = 0, n = 2, s = 0), 
        this.setData((a = {
            swiperList: e.slice(r, r + n),
            swiperIndex: s
        }, t(a, "tagList[" + i + "].scroll", e[i].scroll), t(a, "loadList", !0), a));
    },
    switchFilter: function() {
        this.setData({
            filterOpen: !this.data.filterOpen
        });
    },
    clickFilter: function(a) {
        var e = a.target.dataset, i = 0 == e.type ? "status" : "sort";
        e.index !== this.data[i] && (this.setData(t({}, i, e.index)), this.getData());
    },
    scrolling: function(t) {
        this.data.tagList[this.data.tagIndex].scroll = t.detail.scrollTop;
    },
    jumpTopic: function(t) {
        var a = t.currentTarget.dataset;
        e.jumpTopic(a);
    }
});