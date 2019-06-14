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
        imgList: [],
        initPos: 0,
        oriPos: null,
        ifScale: !1,
        scaleVal: 1,
        topicTit: "",
        topicId: "",
        topicCover: "",
        comicId: "",
        iPhoneX: !1,
        praising: !1,
        followed: !1,
        following: !1,
        toast: "",
        forUpload: {},
        hasRead: {},
        guideReady: !1,
        guideShow: !1,
        guided: !1,
        netTip: !1,
        scrollTop: 0,
        scrollHeight: 0,
        scrollAnimation: !1,
        pageHeight: 0,
        picHeightRate: 2,
        fullScreen: !1,
        tapRecord: 0,
        fullTimeout: null,
        comicCount: 0,
        comicList: [],
        comicIndex: 0,
        onGetting: !1,
        cacheTop: 0,
        teaching: 0,
        teached: !0,
        lazyStart: -1
    },
    onLoad: function(t) {
        var i = a.globalData.systemInfo;
        this.setData({
            iPhoneX: i.model.indexOf("iPhone X") > -1
        }), this.data.pageHeight = i.windowHeight * (this.data.iPhoneX ? .95348 : 1), this.data.picHeightRate = 750 / i.screenWidth, 
        this.data.comicId = 1 * t.comicId, this.data.initPos = t.rate || 0, this.data.forUpload = wx.getStorageSync("forUpload") || {}, 
        this.data.hasRead = wx.getStorageSync("hasRead") || {}, wx.getStorageSync("comicTeached") || this.setData({
            teached: !1
        }), this.pageInit();
    },
    onShow: function() {
        i.checkLoginBack(this);
    },
    onUnload: function() {
        this.setHistory();
    },
    onHide: function() {
        this.setHistory();
    },
    onShareAppMessage: function() {
        var t = a.globalData.userInfo;
        return {
            title: t ? t.user.nickname + "正在看《" + this.data.topicTit + "》，想与你一起读~" : a.globalData.shareTit,
            path: "/pages/comic/comic?comicId=" + this.data.comicList[this.data.comicIndex].comicId
        };
    },
    setHistory: function() {
        var t = this.data.topicId;
        if (t) {
            a.globalData.readSetting = !0;
            var i = this.data.hasRead, e = this.data.comicList[this.data.comicIndex], o = {
                last: e.comicId,
                time: new Date().getTime(),
                half: 2 * i[t].length > this.data.comicCount,
                cover: this.data.topicCover,
                topicTit: this.data.topicTit,
                comicTit: e.comicTit
            };
            for (var s in o) this.data.forUpload[t][s] = o[s];
            wx.setStorage({
                key: "forUpload",
                data: this.data.forUpload,
                complete: function() {
                    a.globalData.readSetting = !1;
                }
            });
        }
    },
    setHasRead: function(t) {
        a.globalData.readSetting = !0;
        var e = this.data.hasRead, o = e[this.data.topicId];
        if (!o || o.lastId !== t) {
            this.data.guided = !!o && o.guided;
            var s = o ? o.readList : [];
            s.push(t), s = i.arrayArrange(s), e[this.data.topicId] = {
                readList: s,
                lastId: t,
                guided: this.data.guided
            }, wx.setStorage({
                key: "hasRead",
                data: e,
                complete: function() {
                    a.globalData.readSetting = !1;
                }
            }), !this.data.guided && (this.data.comicCount < 3 || s.length > 2) && this.setData({
                guideReady: !0
            });
        }
    },
    pageInit: function() {
        var t = this;
        this.data.praising = !1, this.data.following = !1, wx.showNavigationBarLoading(), 
        wx.getNetworkType({
            success: function(a) {
                var i = a.networkType;
                "none" == i ? t.setData({
                    toast: "网络有些问题，请检查网络连接~"
                }) : (t.getData(), "wifi" !== i && (t.setData({
                    netTip: !0
                }), setTimeout(function() {
                    t.setData({
                        netTip: !1
                    });
                }, 2e3)));
            }
        }), wx.onNetworkStatusChange(function(a) {
            a.isConnected ? "wifi" === a.networkType || t.data.netTip || (t.setData({
                netTip: !0
            }), setTimeout(function() {
                t.setData({
                    netTip: !1
                });
            }, 2e3)) : i.toast({
                title: "网络有些问题，请检查网络连接~",
                duration: 2e3
            });
        });
    },
    getData: function(a) {
        var e = this;
        if (!this.data.onGetting) {
            this.data.cacheTop = this.data.scrollTop - (this.data.comicList[0] ? this.data.comicList[0].scrollHeight : 0);
            var o = a ? a.id : this.data.comicId;
            this.setData({
                onGetting: !0
            }), i.ajax({
                method: "GET",
                url: "/mini/v1/comic/comic/detail",
                data: {
                    comic_id: o
                },
                callback: function(s) {
                    var c = s.data, d = c.comic_basic_info, n = c.topic_basic_info, l = {
                        onGetting: !1,
                        comicList: e.data.comicList
                    }, h = 0, r = c.comic_image_list.map(function(t, a) {
                        var i = 750 * t.height / t.width, s = {
                            id: "pic_" + o + "_" + a,
                            src: t.image_url,
                            height: i,
                            load: a < 3,
                            top: h
                        };
                        return h += i / e.data.picHeightRate, s;
                    }), g = {
                        comicId: o,
                        comicTit: d.title,
                        imgLen: r.length,
                        praised: d.is_liked,
                        praiseNum: d.like_count,
                        lastId: c.previous_comic_id,
                        nextId: c.next_comic_id,
                        scrollHeight: 0,
                        prevPay: !1,
                        nextPay: !1,
                        hasShow: !1
                    };
                    if (a) {
                        if (!d.is_free && !d.can_view || !c.vip_user && d.vip_exclusive) {
                            var m = l.comicList[e.data.comicIndex];
                            return m[a.type + "Pay"] = !0, m.scrollHeight += 40, "manual" == a.trigger && (l.scrollTop = "next" == a.type ? e.data.scrollHeight : 0), 
                            e.setData(l), void wx.hideNavigationBarLoading();
                        }
                        l.imgList = e.data.imgList, "prev" == a.type ? (l.comicList.length > 1 && (l.imgList.splice(l.comicList[0].imgLen, l.comicList[1].imgLen), 
                        l.comicList.splice(1, 1)), l.imgList = r.concat(l.imgList), l.comicList.unshift(g)) : "next" == a.type && (l.comicList.length > 1 && (l.imgList.splice(0, l.comicList[0].imgLen), 
                        l.comicList.splice(0, 1)), l.imgList = l.imgList.concat(r), l.comicList.push(g));
                    } else wx.setNavigationBarTitle({
                        title: d.title
                    }), wx.hideNavigationBarLoading(), e.data.topicCover = i.addSuffix(n.cover_image_url, 1), 
                    e.data.comicCount = n.comic_count, l.topicTit = n.title, l.imgList = r, g.hasShow = !0, 
                    l.comicList.push(g), l.ifScale = !!d.comic_type, l.topicId = n.id, l.followed = n.is_favourite, 
                    l.followed && (l.fullScreen = !0, e.data.ifScale || e.checkTeach()), e.data.forUpload[l.topicId] || (e.data.forUpload[l.topicId] = {});
                    e.setData(l, function() {
                        if (a && "scroll" == a.trigger && "next" == a.type) {
                            var i = e.data.cacheTop + e.data.pageHeight;
                            console.log(i, e.data.scrollTop, e.data.cacheTop), i > 0 && e.data.scrollTop > i && setTimeout(function() {
                                e.setData({
                                    scrollTop: e.data.cacheTop
                                });
                            }, 10);
                        }
                        if (!d.is_free && !d.can_view) return e.data.topicId = null, void e.setData({
                            toast: "本章节内容需要付费才能阅读，下载快看漫画app继续追更吧"
                        });
                        if (!c.vip_user && d.vip_exclusive) return e.data.topicId = null, void e.setData({
                            toast: "本章节内容仅限会员可以阅读，下载快看漫画app继续追更吧"
                        });
                        var s = !0;
                        if (a) "manual" == a.trigger ? (e.data.onTurning = !0, "prev" == a.type ? (e.setComicInfo(0, !0, 500), 
                        s = !1) : "next" == a.type && e.setComicInfo(1, !0, 500), g.nextId, setTimeout(function() {
                            wx.hideNavigationBarLoading(), e.data.onTurning = !1;
                        }, 500)) : "auto" == a.trigger && (wx.setNavigationBarTitle({
                            title: e.data.comicList[0].comicTit
                        }), wx.hideNavigationBarLoading(), e.setData({
                            scrollTop: 1
                        })); else {
                            var n = Math.floor(e.data.initPos * (g.imgLen - 1) / 100);
                            e.data.initPos && n ? e.setData({
                                oriPos: "pic_" + o + "_" + n
                            }) : e.setData({
                                scrollTop: 1
                            });
                        }
                        if (s && g.imgLen && g.imgLen < 3 && g.nextId && !g.nextPay) {
                            var l = r[g.imgLen - 1];
                            e.getData({
                                id: g.nextId,
                                type: "next",
                                trigger: "auto"
                            });
                            var h = 0;
                            e.data.comicList[1] && (h = 1, e.setHasRead(e.data.comicList[1].comicId)), e.setData(t({}, "comicList[" + h + "].scrollHeight", l.top + l.height));
                        }
                        a || e.setHasRead(o);
                    });
                },
                error: function(t) {
                    a || e.setData({
                        toast: t.message
                    });
                }
            });
        }
    },
    handleScroll: function(t) {
        var a = this, i = t.detail.scrollTop;
        this.data.scrollTop = i;
        var e = t.detail.scrollHeight;
        this.data.scrollHeight = e;
        var o = this.data.comicList, s = this.data.comicIndex, c = o.length > 1 ? o[0].scrollHeight : e, d = 0;
        if (o.length > 1) {
            c ? d || (o[1].scrollHeight = e - c) : (o[0].scrollHeight = e - o[1].scrollHeight, 
            c = o[0].scrollHeight), d = o[1].scrollHeight;
            var n = i - c;
            s ? n < -10 && this.setComicInfo(0, !1) : n > 0 && (this.data.comicList[1].hasShow = !0, 
            this.setComicInfo(1, !1)), n > o[1].scrollHeight - 2 * this.data.pageHeight && this.handleReachBottom();
        } else o[0].scrollHeight = c, i > c - 2 * this.data.pageHeight && this.handleReachBottom();
        var l = s ? (i - c) / d : i / c, h = Math.floor(l * o[s].imgLen - 1);
        h = h < 0 ? 0 : h, this.data.forUpload[this.data.topicId].rate = l, this.data.forUpload[this.data.topicId].picIndex = h;
        var r = {};
        if (this.data.lazyStart !== h) {
            this.data.lazyStart = h;
            var g = void 0, m = 0, u = 0, p = this.data.picHeightRate * this.data.pageHeight, f = 5 * p;
            for (g = 0; g > -3; g--) {
                var v = this.data.imgList[h + g];
                if (!v) break;
                if ((u += v.height) > p) break;
                m--;
            }
            for (u = 0, g = m; g < 10; g++) {
                var T = g + h;
                T = T < 0 ? 0 : T > o[s].imgLen ? o[s].imgLen : T, T += s ? o[0].imgLen : 0;
                var L = this.data.imgList[T];
                if (L) {
                    if ((u += L.height) > f) break;
                    L.load || (r["imgList[" + T + "].load"] = !0);
                }
            }
        }
        "{}" !== JSON.stringify(r) && this.setData(r), !this.data.guideReady || this.data.followed || this.data.guideShow || l < 1 && l > .9 && this.setData({
            guideShow: !0
        }, function() {
            a.data.guideReady = !1, a.data.hasRead[a.data.topicId].guided = !0, wx.setStorage({
                key: "hasRead",
                data: a.data.hasRead
            }), setTimeout(function() {
                a.setData({
                    guideShow: !1
                });
            }, 5e3);
        });
    },
    handleReachBottom: function() {
        if (!this.data.onGetting) {
            var t = this.data.comicList, a = t[t.length > 1 ? 1 : 0];
            a.hasShow && !a.nextPay && a.nextId && this.getData({
                id: a.nextId,
                type: "next",
                trigger: "scroll"
            });
        }
    },
    handleTapScroll: function(t) {
        var a = this;
        if (this.data.ifScale) this.data.tapRecord && t.timeStamp - this.data.tapRecord < 500 ? (this.setData({
            scaleVal: 1 == this.data.scaleVal ? 2 : 1
        }), this.data.fullTimeout && (clearTimeout(this.data.fullTimeout), this.data.fullTimeout = null)) : this.data.fullTimeout = setTimeout(function() {
            a.setData({
                fullScreen: !a.data.fullScreen
            });
        }, 500), this.data.tapRecord = t.timeStamp; else {
            var i = function(t, a) {
                t.setData({
                    scrollAnimation: !0
                }, function() {
                    t.setData({
                        scrollTop: a
                    }, function() {
                        t.setData({
                            scrollAnimation: !1
                        });
                    });
                });
            };
            if (this.data.fullScreen) {
                var e = t.detail.y, o = this.data.pageHeight, s = o / 3, c = 2 * s;
                if (e < s) {
                    var d = this.data.scrollTop - c;
                    i(this, d < 0 ? 0 : d);
                } else if (e > c) {
                    var n = this.data.scrollTop + c, l = this.data.scrollHeight - o + 50;
                    i(this, n > l ? l : n);
                } else this.setData({
                    fullScreen: !1
                });
            } else this.setData({
                fullScreen: !0
            }, function() {
                a.checkTeach();
            });
        }
    },
    checkTeach: function() {
        this.data.teached || (this.setData({
            teaching: new Date().getTime()
        }), setTimeout(function() {
            i.toast({
                title: "当前处于全屏操作模式",
                duration: 2e3
            });
        }, 500));
    },
    handleScale: function(t) {
        this.data.scaleVal = t.scale;
    },
    hideTeach: function() {
        new Date().getTime() - this.data.teaching > 2e3 && (this.setData({
            teached: !0,
            teaching: 0
        }), wx.setStorage({
            key: "comicTeached",
            data: !0
        }));
    },
    handlePraise: function() {
        var a = this;
        if (!this.data.praising) {
            var e = this.data.comicIndex;
            this.data.praising = !0;
            var o = this.data.comicList[e], s = "comicList[" + e + "]";
            i.praise({
                type: !o.praised,
                target: "comic",
                id: o.comicId,
                callback: function(i) {
                    var e;
                    a.data.praising = !1, a.setData((e = {}, t(e, s + ".praised", i.data.is_liked), 
                    t(e, s + ".praiseNum", i.data.likes_count), e));
                },
                error: function() {
                    a.data.praising = !1;
                }
            });
        }
    },
    handleFav: function() {
        var t = this;
        this.data.following || (this.data.following = !0, i.follow({
            type: !this.data.followed,
            id: this.data.topicId,
            callback: function() {
                t.data.following = !1, t.setData({
                    followed: !t.data.followed
                }), t.data.followed && t.data.guideShow && t.setData({
                    guideShow: !1
                });
            }
        }));
    },
    jumpTopic: function(t) {
        var a = t.currentTarget.dataset;
        a.ori = 3, a.tab = 1, i.jumpTopic(a);
    },
    jumpComic: function(t) {
        if (!this.data.onGetting && !this.data.onTurning) {
            var a = t.currentTarget.dataset, i = !1, e = null;
            this.data.comicIndex ? "prev" == a.type && (e = 0, i = !0) : this.data.comicList.length > 1 && "next" == a.type && (e = 1, 
            i = !0), i ? this.setComicInfo(e, !0) : (wx.showNavigationBarLoading(), a.trigger = "manual", 
            this.getData(a));
        }
    },
    setComicInfo: function(t, a, i) {
        var e = this;
        this.data.comicIndex = t;
        var o = this.data.comicList[t], s = {
            comicIndex: t
        };
        a && (s.scrollTop = t ? this.data.comicList[0].scrollHeight + 1 : 0), !a || i ? this.setData(s) : this.setData({
            scrollAnimation: !0
        }, function() {
            e.setData(s, function() {
                e.setData({
                    scrollAnimation: !1
                });
            });
        }), this.setHasRead(o.comicId), setTimeout(function() {
            wx.setNavigationBarTitle({
                title: o.comicTit
            });
        }, i || 0);
    }
});