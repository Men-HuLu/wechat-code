function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

require("../../utils/util.js"), require("../../utils/wxParse/wxParse.js");

var t, a = require("../../utils/fetch.js"), i = a.fetch, r = (a.fetchImg, a.reportbili, 
getApp());

Page({
    data: (t = {
        isSearch: !1,
        swArr: [ "默认排序", "播放多", "新发布" ],
        cridx: 0,
        searchArr: [],
        keyword: "",
        lists: [],
        deviceWidth: "",
        deviceHeight: "",
        sugArr: []
    }, e(t, "keyword", ""), e(t, "defkw", ""), e(t, "notfound", ""), e(t, "isiPhoneX", ""), 
    e(t, "bangumiList", []), e(t, "tvList", []), e(t, "isPgcAppear", !0), t),
    onLoad: function(e) {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                r.globalData.isNotch && t.setData({
                    isiPhoneX: !0
                }), t.setData({
                    deviceWidth: e.windowWidth,
                    deviceHeight: e.screenHeight
                });
            }
        }), e.kw && (this.getSearchBack(e.kw), this.setData({
            keyword: e.kw
        }), wx.reportAnalytics("actionbar_click", {
            actionbar_click: ""
        })), this.change2Search();
    },
    savekw: function(e) {
        if (wx.getStorageSync("localkeyword")) {
            var t = wx.getStorageSync("localkeyword");
            if (-1 != t.indexOf(e)) return;
            t.unshift(e), wx.setStorageSync("localkeyword", t.slice(0, 7));
        } else wx.setStorageSync("localkeyword", [ e ]);
    },
    backtoMain: function() {
        wx.redirectTo({
            url: "../index/index"
        });
    },
    myCatchTouch: function() {},
    getsuggestion: function(e) {
        var t = this;
        e.detail.value ? i({
            url: "https://s.search.bilibili.com/main/suggest?func=suggest&suggest_type=accurate&sub_type=tag&main_ver=v1&highlight=&tag_num=10&from_source=xcx_search&term=" + e.detail.value
        }).then(function(e) {
            e.data.result.tag && t.setData({
                sugArr: e.data.result.tag,
                isSearch: !0
            });
        }).catch(function(e) {
            console.log(e);
        }) : this.setData({
            keyword: "",
            sugArr: [],
            isSearch: !1
        });
    },
    change2Search: function() {
        var e = this;
        i({
            url: "https://s.search.bilibili.com/main/hotword?from_source=xcx_search"
        }).then(function(t) {
            e.setData({
                keywordlist: t.data.list.slice(0, 10)
            });
        }).catch(function(e) {
            console.log(e);
        }), wx.getStorageSync("localkeyword") && this.setData({
            localkeywordlist: wx.getStorageSync("localkeyword")
        });
    },
    selectTag: function(e) {
        var t = this, a = e.currentTarget.dataset.idx;
        if (a !== this.data.cridx) {
            if (this.setData({
                cridx: a
            }), !a) return this.getSearchBack(this.data.keyword), void this.setData({
                isPgcAppear: !0
            });
            1 != a ? 2 != a || i({
                url: "https://api.bilibili.com/x/web-interface/search/type?search_type=video&highlight=0&from_source=xcx_search&order=pubdate&keyword=" + this.data.keyword
            }).then(function(e) {
                e.data.data.result.length && t.setData({
                    lists: e.data.data.result,
                    isPgcAppear: !1
                });
            }) : i({
                url: "https://api.bilibili.com/x/web-interface/search/type?search_type=video&highlight=0&order=click&from_source=xcx_search&keyword=" + this.data.keyword
            }).then(function(e) {
                e.data.data.result.length && t.setData({
                    lists: e.data.data.result,
                    isPgcAppear: !1
                });
            });
        }
    },
    searchEvent: function(e) {
        this.setData({
            cridx: 0,
            isPgcAppear: !0,
            isSearch: !1
        });
        var t = e.detail.value;
        if (wx.getStorageSync("localkeyword")) {
            var a = wx.getStorageSync("localkeyword");
            if (this.getSearchBack(t), -1 != a.indexOf(t)) return;
            a.unshift(t), wx.setStorageSync("localkeyword", a);
        } else wx.setStorageSync("localkeyword", [ t ]), this.getSearchBack(t);
    },
    getSearchBack: function(e) {
        var t = this;
        i({
            url: "https://api.bilibili.com//x/web-interface/wx/search/all?search_type=video&from_source=xcx_search&highlight=0&keyword=" + e
        }).then(function(a) {
            -110 != a.data.code && -111 != a.data.code ? 0 != a.data.data.result.video.length || 0 != a.data.data.result.media_ft.length || 0 != a.data.data.result.media_bangumi.length || 0 != a.data.code ? (t.setData({
                keyword: e,
                lists: a.data.data.result.video,
                sugArr: [],
                notfound: !1,
                bangumiList: a.data.data.result.media_bangumi.slice(0, 3),
                tvList: a.data.data.result.media_ft.slice(0, 3)
            }), t.transFormat()) : t.setData({
                notfound: !0,
                sugArr: [],
                notlegal: !1
            }) : t.setData({
                notfound: !0,
                notlegal: !0,
                sugArr: []
            });
        }).catch(function(e) {
            console.log(e);
        });
    },
    searchBysug: function(e) {
        var t = this;
        this.setData({
            cridx: 0,
            isPgcAppear: !0
        }), this.savekw(e.currentTarget.dataset.sug), i({
            url: "https://api.bilibili.com//x/web-interface/wx/search/all?search_type=video&from_source=xcx_search&highlight=0&keyword=" + e.currentTarget.dataset.sug
        }).then(function(a) {
            if (0 == !a.data.data.result.video.length || 0 == !a.data.data.result.media_bangumi.length || 0 == !a.data.data.result.media_ft.length) return t.setData({
                keyword: e.currentTarget.dataset.sug,
                lists: a.data.data.result.video,
                sugArr: [],
                notfound: !1,
                isSearch: !1,
                bangumiList: a.data.data.result.media_bangumi.slice(0, 3),
                tvList: a.data.data.result.media_ft.slice(0, 3)
            }), void t.transFormat();
            t.setData({
                notfound: !0
            });
        });
    },
    deleteItem: function(e) {
        console.log(e.currentTarget.dataset.idx);
        var t = e.currentTarget.dataset.idx, a = wx.getStorageSync("localkeyword");
        a.splice(t, 1), wx.setStorageSync("localkeyword", a), this.setData({
            localkeywordlist: wx.getStorageSync("localkeyword")
        });
    },
    deleteKeyword: function() {
        this.setData({
            keyword: "",
            sugArr: []
        });
    },
    changeNewlist: function(e) {
        var t = e.currentTarget.dataset.aid;
        wx.reportAnalytics("searchresult_video", {
            searchresult_video: t
        }), wx.navigateTo({
            url: "../video/video?avid=" + t
        });
    },
    transFormat: function() {
        if (this.data.bangumiList.length) {
            var e = this.data.bangumiList.map(function(e) {
                switch (e.media_score && e.media_score.user_count >= 1e4 && (e.media_score.user_count = (e.media_score.user_count / 1e4).toFixed(1) + "万"), 
                e.pubtime = new Date(1e3 * e.pubtime).getFullYear(), e.media_type) {
                  case 1:
                    e.media_type = "番剧";
                    break;

                  case 2:
                    e.media_type = "电影";
                    break;

                  case 3:
                    e.media_type = "纪录片";
                    break;

                  case 4:
                    e.media_type = "国创";
                    break;

                  case 5:
                    e.media_type = "电视剧";
                }
                return e;
            });
            this.setData({
                bangumiList: e
            });
        }
        if (this.data.tvList.length) {
            var t = this.data.tvList.map(function(e) {
                switch (e.media_score && e.media_score.user_count >= 1e4 && (e.media_score.user_count = (e.media_score.user_count / 1e4).toFixed(1) + "万"), 
                e.pubtime = new Date(1e3 * e.pubtime).getFullYear(), e.media_type) {
                  case 1:
                    e.media_type = "番剧";
                    break;

                  case 2:
                    e.media_type = "电影";
                    break;

                  case 3:
                    e.media_type = "纪录片";
                    break;

                  case 4:
                    e.media_type = "国创";
                    break;

                  case 5:
                    e.media_type = "电视剧";
                }
                return e;
            });
            this.setData({
                tvList: t
            });
        }
    },
    toPgcVideo: function(e) {
        wx.reportAnalytics("searchresult_pgcvideo");
        var t = e.currentTarget.dataset.ssid, a = /s{2}\d+/.exec(t)[0].substr(2);
        wx.navigateTo({
            url: "../pgcvideo/pgcvideo?ssid=" + a
        });
    }
});