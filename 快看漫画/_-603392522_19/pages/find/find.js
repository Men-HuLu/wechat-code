var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : t(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
}, a = getApp(), i = require("../../util.js");

Page({
    data: {
        userId: 0,
        gender: 0,
        startCount: 0,
        initOver: !1,
        bannerList: [],
        bannerConfig: {},
        rankList: [ {
            id: 2,
            img: "/image/rank1.png",
            tit: "20+榜"
        }, {
            id: 0,
            img: "/image/rank2.png",
            tit: "男生榜"
        }, {
            id: 3,
            img: "/image/rank3.png",
            tit: "新作榜"
        }, {
            id: 4,
            img: "/image/rank4.png",
            tit: "完结榜"
        } ],
        modelList: [],
        onPulling: !1,
        onChanging: !1,
        bubble: !0,
        following: !1,
        eventCache: {}
    },
    onLoad: function() {
        this.data.startCount = wx.getStorageSync("startCount") || 1;
    },
    onShow: function() {
        var t = this;
        i.checkAcconts({
            page: this,
            always: function() {
                i.checkLoginBack(t);
            }
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
            path: "/pages/find/find"
        };
    },
    onPullDownRefresh: function() {
        this.data.onPulling = !0, this.pageInit();
    },
    pageInit: function() {
        var t = this;
        i.ajax({
            method: "GET",
            url: "/mini/v1/comic/discovery/discovery_list",
            data: {
                open_count: this.data.startCount,
                gender: this.data.gender
            },
            callback: function(e) {
                var a = [];
                e.data.infos.map(function(e, n) {
                    var o = e.item_type, r = {
                        index: n,
                        title: e.title,
                        more: !!e.more_flag && e.discovery_module_id,
                        mapped: {
                            id: "target_id"
                        }
                    };
                    switch (o) {
                      case 1:
                        t.setBanner(e.banners);
                        break;

                      case 7:
                      case 9:
                        r.type = "A", r.coverate = 1, r.showTit = 9 == o;
                        break;

                      case 6:
                      case 14:
                      case 16:
                      case 18:
                        switch (r.type = "B", r.coverate = 2, r.maxnum = 4, r.mapped.tit = "title", r.mapped.des = "category", 
                        o) {
                          case 6:
                            r.height = 234, r.maxnum = 2, r.mapped.tit = "target_title";
                            break;

                          case 14:
                            r.height = 234;
                            break;

                          case 16:
                            r.height = 494;
                            break;

                          case 18:
                            r.height = 374;
                        }
                        break;

                      case 3:
                      case 4:
                      case 19:
                        r.type = "C", r.coverate = 3, r.mapped.tit = "title", r.mapped.des = 19 == o ? "recommended_text" : "category";
                        break;

                      case 21:
                        r.type = "D", r.coverate = 3;
                        var c = e.comic_collection_info;
                        r.topicInfo = {
                            id: c.target_id,
                            jump: t.returnJump(c.type),
                            image: i.addSuffix(c.bg_url, 1),
                            tit: c.title,
                            des: c.desc,
                            color: c.font_color,
                            bgColor: c.bg_color,
                            showFav: c.topic_id,
                            isFav: c.is_favorite
                        }, r.opacity = 1, r.btnLeft = -180, r.mapped.tit = "target_title", r.mapped.color = "front_color", 
                        r.mapped.bgColor = "bottom_color";
                    }
                    r.type && (r.list = t.checkList(e, r), a.push(r));
                }), t.data.onPulling && wx.stopPullDownRefresh(), t.setData({
                    modelList: a,
                    onPulling: !1,
                    initOver: !0
                });
            }
        });
    },
    checkList: function(t, a) {
        var n = this, o = t.banners || t.topics || [], r = a.mapped;
        return o.map(function(t) {
            var o = {};
            for (var c in r) {
                var s = t[r[c]];
                s = "object" == (void 0 === s ? "undefined" : e(s)) ? s.join(" ") : s, o[c] = s;
            }
            return t.pic && (o.img = i.addSuffix(t.pic, a.coverate)), o.jump = n.returnJump(t.type), 
            o;
        });
    },
    setBanner: function(t) {
        var e = this, a = t.map(function(t) {
            var a = t.type;
            if (2 == a || 3 == a) return {
                url: i.addSuffix(t.pic, 1),
                tit: t.target_title,
                id: t.target_id,
                jump: e.returnJump(a)
            };
        });
        this.setData({
            bannerList: a,
            bannerConfig: {
                current: 0,
                circular: a.length > 2,
                margin: a.length > 2 ? "24rpx" : "0px",
                dots: a.length > 1
            }
        });
    },
    returnJump: function(t) {
        return 2 == t ? "Topic" : 3 == t ? "Comic" : "";
    },
    jumpTopic: function(t) {
        var e = t.currentTarget.dataset;
        e.ori = 7, i.jumpTopic(e);
    },
    jumpComic: function(t) {
        i.jumpComic(t.currentTarget.dataset);
    },
    jumpRank: function(t) {
        i.jumpRank(t.currentTarget.dataset);
    },
    jumpList: function(t) {
        i.jumpList(t.currentTarget.dataset);
    },
    exchange: function(t) {
        var e = this;
        if (!this.data.onChanging) {
            this.data.onChanging = !0;
            var a = t.currentTarget.dataset;
            i.ajax({
                method: "GET",
                url: "/mini/v1/comic/discovery/module_change",
                data: {
                    discovery_module_id: a.id
                },
                callback: function(t) {
                    e.mateList({
                        index: a.index,
                        callback: function(a) {
                            a.list = e.checkList(t.data, a);
                        }
                    }), e.data.onChanging = !1;
                }
            });
        }
    },
    colScroll: function(t) {
        var e = t.currentTarget.dataset, a = t.detail.scrollLeft;
        this.mateList({
            index: e.index,
            callback: function(t) {
                if (a > 0 && a < 90) {
                    var e = a / 90;
                    t.opacity = 1 - e, t.btnLeft = 200 * e - 180;
                } else t.btnLeft = -180;
            }
        });
    },
    handleFav: function(t) {
        var e = this;
        if (!this.data.following) {
            this.data.following = !0, this.data.eventCache = t;
            var a = t.currentTarget.dataset;
            i.follow({
                type: !0,
                id: a.id,
                callback: function(t) {
                    e.data.following = !1, e.mateList({
                        index: a.index,
                        callback: function(t) {
                            t.topicInfo.isFav = !0;
                        }
                    });
                }
            });
        }
    },
    mateList: function(t) {
        var e = void 0, a = this.data.modelList, i = a.length;
        for (e = 0; e < i; e++) {
            var n = a[e];
            if (n.index === t.index) {
                t.callback(n);
                break;
            }
        }
        this.setData({
            modelList: a
        });
    }
});