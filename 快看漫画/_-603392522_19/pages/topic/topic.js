function t(t, a, i) {
    return a in t ? Object.defineProperty(t, a, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = i, t;
}

var a = getApp(), i = require("../../util.js");

Page({
    data: {
        toast: "",
        topicId: "",
        topicTit: "",
        iPhoneX: !1,
        banner: "",
        followed: !1,
        following: !1,
        sort: !0,
        origin: 0,
        tab: 0,
        bannerLoaded: !1,
        scrollTop: 0,
        rpxRate: .5,
        upperThreshold: 0,
        lastIndex: 0,
        onceLoadNum: 20,
        stopScrollEvt: !1,
        onScreenNum: 3,
        tabsData: [ {
            id: 0,
            name: "详情"
        }, {
            id: 1,
            name: "选集"
        } ],
        comicList: [],
        comicView: [],
        readList: [],
        lastComicId: "",
        lastComicTit: "",
        updateInfo: "",
        topicInfo: {},
        comment: {
            num: 0,
            list: []
        },
        praising: !1,
        eventCache: {},
        teached: !0,
        teaching: !1
    },
    onLoad: function(t) {
        var i = this, e = a.globalData.systemInfo, s = e.benchmarkLevel;
        if (s && s > 0 && "devtools" !== e.platform) {
            var o = Math.floor(s / 5 * 3);
            this.data.onceLoadNum = o < 10 ? 10 : o;
        }
        this.data.topicId = 1 * t.topicId, this.data.origin = t.origin || 0, this.data.rpxRate = e.windowWidth / 750;
        var d = {
            tab: t.tab ? 1 * t.tab : 0,
            iPhoneX: e.model.indexOf("iPhone X") > -1,
            upperThreshold: 636 * this.data.rpxRate
        }, n = wx.getStorageSync("topicTeached");
        n || (d.teached = !1), this.setData(d, function() {
            if (!n) {
                var t = wx.createCanvasContext("teachPos");
                t.save(), t.setFillStyle("rgba(0, 0, 0, 0.85)"), t.fillRect(0, 0, e.screenWidth, e.screenHeight), 
                t.globalCompositeOperation = "destination-out", t.fillRect(385 * i.data.rpxRate, 470 * i.data.rpxRate, 355 * i.data.rpxRate, 90 * i.data.rpxRate), 
                t.restore(), t.setFontSize(20), t.setTextAlign("center"), t.setTextBaseline("top"), 
                t.setFillStyle("white"), t.fillText("双击此按钮可以定位到上次阅读章节", .5 * e.screenWidth, 580 * i.data.rpxRate, e.screenWidth), 
                t.draw();
            }
        });
        var c = e.windowHeight;
        this.data.iPhoneX && (c = .95348 * c / this.data.rpxRate);
        var r = Math.ceil((c - 636 - 100) / 176);
        this.data.onScreenNum = r > 1 ? r : 1, this.pageInit();
    },
    onShow: function() {
        this.getReadStorage(), i.checkLoginBack(this);
    },
    onShareAppMessage: function() {
        var t = a.globalData.userInfo;
        return {
            title: t ? t.user.nickname + "正在看《" + this.data.topicTit + "》，想与你一起读~" : a.globalData.shareTit,
            path: "/pages/topic/topic?topicId=" + this.data.topicId
        };
    },
    getReadStorage: function() {
        function t() {
            var t = this, a = (wx.getStorageSync("hasRead") || {})[this.data.topicId];
            if (a) {
                var i = {};
                this.data.readList.length !== a.length && (i.readList = a.readList), this.data.comicView.length ? this.data.comicList.map(function(e, s) {
                    a.readList.indexOf(e.id) > -1 && (e.readed || (t.data.comicList[s].readed = !0), 
                    e.id === a.lastId ? e.ifLast || (t.data.lastIndex = s, i.lastComicId = e.id, i.lastComicTit = e.tit, 
                    t.data.comicList[s].ifLast = !0) : e.ifLast && (t.data.comicList[s].ifLast = !1));
                }) : i.lastComicId = a.lastId, this.setData(i, function() {
                    t.scrollToLastRead();
                });
            }
        }
        var i = this;
        a.globalData.readSetting ? setTimeout(function() {
            t.call(i);
        }, 100) : t.call(this);
    },
    pageInit: function() {
        var t = this;
        wx.showNavigationBarLoading(), this.data.praising = !1, this.data.following = !1, 
        i.ajax({
            method: "GET",
            url: "/mini/v1/comic/topic/detail",
            data: {
                topic_id: this.data.topicId,
                sort: this.data.sort ? "asc" : "desc",
                page_source: this.data.origin
            },
            callback: function(a) {
                var e = a.data, s = e.topic_info, o = e.comic_list;
                wx.setNavigationBarTitle({
                    title: s.title
                }), wx.hideNavigationBarLoading();
                var d = "", n = t.data.lastComicId, c = !1, r = o.map(function(a, s) {
                    var o = !1;
                    n ? (o = n == a.id) && (d = a.title) : (0 == s && (d = a.title), n = a.id);
                    var r = -1 !== t.data.readList.indexOf(a.id);
                    return o && (t.data.lastIndex = s, r || (r = !0, c = !0, t.data.readList.push(a.id))), 
                    {
                        id: a.id,
                        tit: a.title,
                        index: s,
                        ispay: !a.is_free || a.vip_exclusive,
                        haspay: !a.is_free && a.can_view || a.vip_exclusive && e.vip_user,
                        time: i.transTime(a.created_at),
                        new: a.is_show_new,
                        praise: i.transNum(a.like_count),
                        readed: r,
                        ifLast: o,
                        imgUrl: i.addSuffix(a.cover_image_url, 2)
                    };
                });
                t.data.topicTit = s.title;
                var l = {
                    banner: i.addSuffix(s.cover_image_url, 1),
                    followed: s.is_favourite,
                    lastComicId: n,
                    lastComicTit: d,
                    updateInfo: s.update_status + "  " + s.update_day,
                    topicInfo: {
                        intro: s.description,
                        author: s.related_author.map(function(t) {
                            return {
                                id: t.id,
                                avatar_url: i.addSuffix(t.avatar_url, 3),
                                nickname: t.nickname
                            };
                        }),
                        tags: s.category,
                        hotnum: i.transNum(s.view_count),
                        popular: i.transNum(s.popularity),
                        comment: i.transNum(s.comment_count),
                        follow: i.transNum(s.favourite_count)
                    }
                };
                c && (l.readList = t.data.readList), t.data.comicList = r, 0 == t.data.tab && (t.data.readList.length > r / 2 && (l.tab = 1), 
                l.comicView = t.data.comicList.slice(0, t.data.onceLoadNum), t.setData(l)), t.scrollToLastRead(l);
            },
            error: function(a) {
                a && t.setData({
                    toast: a.message
                });
            }
        }), this.getComment(this.data.options);
    },
    scrollToLastRead: function(t) {
        var a = this;
        if (1 == this.data.tab) {
            var i = t || {}, e = Math.floor(this.data.onceLoadNum / 3), s = this.data.lastIndex - e, o = 0;
            s > 0 ? (this.data.stopScrollEvt = !0, o = e) : (this.data.lastIndex > this.data.onScreenNum && (this.data.stopScrollEvt = !0, 
            o = this.data.lastIndex), s = 0);
            var d = s + this.data.onceLoadNum, n = this.data.comicList.length;
            this.data.onceLoadNum > n && (s = 0, d = n, this.data.stopScrollEvt && (o = this.data.lastIndex)), 
            this.data.stopScrollEvt && (i.scrollTop = (636 + 176 * (o - 2)) * this.data.rpxRate), 
            i.comicView = this.data.comicList.slice(s, d), this.setData(i, function() {
                a.data.stopScrollEvt && setTimeout(function() {
                    a.data.stopScrollEvt = !1;
                }, 300);
            });
        }
    },
    bannerLoaded: function() {
        this.setData({
            bannerLoaded: !0
        });
    },
    updateComicList: function(t) {
        var a = this;
        if (!this.data.stopScrollEvt && 1 == this.data.tab) {
            var i = this.data.comicView, e = this.data.comicList;
            if ("scrolltolower" == t.type) {
                var s = i[i.length - 1].index, o = this.data.sort ? s + 1 : e.length - s, d = e.length - o;
                d > 0 && this.setData({
                    comicView: i.concat(e.slice(o, o + (d > this.data.onceLoadNum ? this.data.onceLoadNum : d)))
                });
            } else if ("scrolltoupper" == t.type) {
                var n = i[0].index;
                (this.data.sort ? n : e.length - n - 1) > 0 && this.setData({
                    scrollTop: 0
                }, function() {
                    a.setData({
                        comicView: e.slice(0, a.data.onceLoadNum)
                    });
                });
            }
        }
    },
    handleFav: function() {
        var t = this;
        this.data.following || (this.data.following = !0, i.follow({
            type: !this.data.followed,
            id: this.data.topicId,
            callback: function(a) {
                t.data.following = !1, t.setData({
                    followed: !t.data.followed
                });
            }
        }));
    },
    tabTap: function(t) {
        var a = this;
        if ("tap" == t.type) {
            var i = t.target.dataset.current;
            this.data.tab !== i && (this.data.tapRecord = 0, this.setData({
                tab: 1 * i
            }), !this.data.teached && 1 == i && this.data.lastIndex + 1 > this.data.onScreenNum && this.setData({
                scrollTop: 0
            }, function() {
                a.setData({
                    teaching: !0
                });
            }));
        }
    },
    tabTouch: function(t) {
        "touchstart" == t.type && 1 == t.target.dataset.current && (this.data.tapRecord && t.timeStamp - this.data.tapRecord < 500 && this.scrollToLastRead(), 
        this.data.tapRecord = t.timeStamp);
    },
    sortChange: function() {
        this.data.comicList = this.data.comicList.reverse(), this.data.lastIndex = this.data.comicList.length - this.data.lastIndex - 1, 
        this.setData({
            sort: !this.data.sort,
            comicView: this.data.comicList.slice(0, this.data.onceLoadNum)
        });
    },
    jumpComic: function(t) {
        this.data.stopScrollEvt || i.jumpComic(t.currentTarget.dataset);
    },
    getComment: function() {
        var t = this;
        i.ajax({
            method: "GET",
            url: "/v2/review/topic/" + this.data.topicId,
            data: {
                since: 0,
                limit: 20
            },
            callback: function(a) {
                var e = a.data;
                t.setData({
                    comment: {
                        num: e.total,
                        list: e.reviews.map(function(t, a) {
                            return {
                                id: t.review_id,
                                index: a,
                                avatar_url: i.addSuffix(t.user.avatar_url, 3),
                                grade: t.user.grade,
                                nickname: t.user.nickname,
                                time: i.transTime(t.created_at),
                                praised: t.is_liked,
                                praiseNum: t.likes_count,
                                content: t.content,
                                showAll: !1
                            };
                        })
                    }
                });
            }
        });
    },
    handlePraise: function(a) {
        var e = this;
        if (!this.data.praising) {
            this.data.praising = !0, this.data.eventCache = a;
            var s = a.currentTarget.dataset, o = this.data.comment.list[s.index], d = o.praised, n = o.praiseNum, c = "comment.list[" + s.index + "].praised", r = "comment.list[" + s.index + "].praiseNum";
            i.praise({
                type: !d,
                target: "review",
                id: s.id,
                callback: function(a) {
                    var i;
                    e.data.praising = !1, e.setData((i = {}, t(i, c, a.data.is_liked), t(i, r, a.data.likes_count), 
                    i));
                },
                error: function(a) {
                    var i;
                    e.data.praising = !1, e.setData((i = {}, t(i, c, !d), t(i, r, d ? n + 1 : n - 1), 
                    i));
                }
            });
        }
    },
    toggleCotent: function(a) {
        var i = a.currentTarget.dataset, e = this.data.comment.list[i.index].showAll, s = "comment.list[" + i.index + "].showAll";
        this.setData(t({}, s, !e));
    },
    hideTeach: function() {
        this.setData({
            teached: !0
        }), wx.setStorage({
            key: "topicTeached",
            data: !0
        });
    }
});