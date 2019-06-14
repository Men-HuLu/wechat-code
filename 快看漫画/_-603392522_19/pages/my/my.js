var t = getApp(), a = require("../../util.js");

Page({
    data: {
        userInfo: null,
        userId: 0,
        faceLoaded: !1,
        tab: 0,
        tabsData: [ {
            id: 0,
            name: "浏览历史"
        }, {
            id: 1,
            name: "我的关注"
        } ],
        hisList: [],
        getHisOver: !1,
        hisSince: 0,
        hisNomore: !1,
        hisActive: 0,
        folList: [],
        getFolOver: !1,
        folSince: 0,
        folNomore: !1,
        oneDay: 864e5,
        comList: [],
        reddot: !1,
        uploadList: [],
        waitTimes: 0,
        hasRead: {},
        todayTime: 0,
        teached: !0
    },
    onLoad: function() {
        wx.getStorageSync("mypageTeached") || this.setData({
            teached: !1
        }, function() {
            var a = t.globalData.systemInfo, i = 750 / a.screenWidth, e = wx.createCanvasContext("teachHis");
            e.save(), e.setFillStyle("rgba(0, 0, 0, 0.85)"), e.fillRect(0, 0, a.screenWidth, a.screenHeight), 
            e.globalCompositeOperation = "destination-out", e.fillRect(18 / i, 316 / i, 714 / i, 172 / i), 
            e.restore(), e.setFontSize(20), e.setTextAlign("center"), e.setTextBaseline("top"), 
            e.setFillStyle("white"), e.fillText("长按可以删除浏览历史了", .5 * a.screenWidth, 510 / i), 
            e.draw();
        }), t.globalData.bubbleTap && (t.globalData.bubbleTap = !1, this.setData({
            tab: 1
        }));
    },
    onShow: function() {
        var a = this;
        t.globalData.loginedFlag ? this.pageInit() : t.globalData.loginedCallback = function() {
            a.pageInit();
        };
    },
    pageInit: function() {
        var i = this, e = t.globalData.userInfo, s = wx.getStorageSync("forUpload") || {};
        this.data.uploadList = [];
        for (var o in s) {
            var c = s[o];
            this.data.uploadList.push({
                topicId: o,
                comicId: c.last,
                readTime: c.time,
                picIndex: c.picIndex,
                ifHalf: c.half,
                cover: c.cover,
                rate: c.rate,
                topicTit: c.topicTit,
                comicTit: c.comicTit
            });
        }
        this.data.hasRead = wx.getStorageSync("hasRead") || {};
        var d = new Date();
        if (d.setHours(0), d.setMinutes(0), d.setSeconds(0), d.setMilliseconds(0), this.data.todayTime = d.getTime(), 
        e) {
            var n = {
                userInfo: e,
                userId: e.user.id
            };
            this.data.userId !== n.userId && (n.hisList = [], n.folList = []), this.data.hisNomore && (n.hisNomore = !1), 
            this.data.folNomore && (n.folNomore = !1), this.setData(n), this.waitForSetting(), 
            0 == this.data.tab ? wx.getStorageSync("reddot") ? this.setData({
                reddot: !0
            }) : t.globalData.reddotCallback = function() {
                i.setData({
                    reddot: !0
                });
            } : this.hideReddot();
        } else {
            var r = this.data.uploadList;
            this.setData({
                userInfo: null,
                userId: 0,
                hisList: r.length ? r.map(function(t) {
                    var i = Math.floor(100 * t.rate);
                    return {
                        topicTit: t.topicTit,
                        topicId: t.topicId,
                        imgUrl: a.addSuffix(t.cover, 2),
                        comicId: t.comicId,
                        comicTit: t.comicTit,
                        rate: i < 1 ? 1 : i > 100 ? 100 : i,
                        rateTxt: "已读" + i + "%"
                    };
                }) : [],
                getHisOver: !0,
                hisNomore: !0,
                folList: [],
                getFolOver: !0,
                folNomore: !0,
                reddot: !1
            });
        }
    },
    waitForSetting: function() {
        var a = this;
        t.globalData.readSetting && this.data.waitTimes < 5 ? (this.data.waitTimes++, setTimeout(function() {
            a.waitForSetting();
        }, 100)) : (this.data.getHisOver = !0, this.data.hisSince = 0, this.data.getFolOver = !0, 
        this.data.folSince = 0, this.historyInit(), this.getFolList());
    },
    faceLoaded: function() {
        this.setData({
            faceLoaded: !0
        });
    },
    switchTab: function(t) {
        var a = 0 == t.detail.current ? 0 : t.detail.current || t.target.dataset.current;
        this.data.tab !== a && (this.setData({
            tab: a
        }), this.data.reddot && a && this.hideReddot());
    },
    hideReddot: function() {
        wx.hideTabBarRedDot({
            index: 2
        }), this.setData({
            reddot: !1
        }), wx.removeStorage({
            key: "reddot",
            success: function(t) {}
        });
    },
    historyInit: function() {
        var t = this, a = this.data.uploadList;
        a.length ? this.hisRequest({
            params: {
                type: 1,
                size: 1,
                timestamp: this.data.hisSince,
                list: a.map(function(a) {
                    return {
                        account_id: t.data.userId,
                        topic_id: a.topicId,
                        comic_id: a.comicId,
                        read_time: a.readTime,
                        read_image_pos: a.picIndex,
                        has_read_topic: a.ifHalf ? 1 : 0
                    };
                })
            },
            callback: function() {
                t.data.uploadList = [], t.getHisList(), wx.removeStorage({
                    key: "forUpload",
                    success: function(t) {
                        console.log(t.data);
                    }
                });
            }
        }) : (console.log("empty upload"), this.getHisList());
    },
    getHisList: function() {
        var t = this;
        this.data.getHisOver && !this.data.hisNomore && (this.setData({
            getHisOver: !1
        }), this.hisRequest({
            params: {
                type: 1,
                size: 20,
                timestamp: this.data.hisSince,
                list: []
            },
            callback: function(i) {
                var e = {}, s = !1, o = i.data.list.map(function(i) {
                    t.data.hasRead[i.topic_id] || (s = !0, t.data.hasRead[i.topic_id] = {
                        readList: [ i.comic_id ],
                        lastId: i.comic_id,
                        guided: !1
                    });
                    var e = {
                        topicTit: i.topic_title,
                        topicId: i.topic_id,
                        imgUrl: a.addSuffix(i.topic_image_url, 2),
                        comicId: i.comic_id,
                        comicTit: i.comic_title
                    }, o = i.comic_read_rate, c = i.comic_read_rate_text;
                    return o > 0 ? (e.rate = o, e.rateTxt = c) : (e.rate = 0, e.rateTxt = c.replace("-", "")), 
                    e;
                });
                o.length ? (e.hisList = t.data.hisSince ? t.data.hisList.concat(o) : o, t.data.hisSince = i.data.list[i.data.list.length - 1].updated_at) : t.data.hisSince || (e.hisList = []), 
                s && (wx.setStorage({
                    key: "hasRead",
                    data: t.data.hasRead
                }), t.data.folList.length && (e.folList = t.checkListNum(t.data.folList))), t.setData(e, function() {
                    t.setData({
                        getHisOver: !0
                    }), o.length || t.setData({
                        hisNomore: !0
                    });
                });
            }
        }));
    },
    hisRequest: function(t) {
        a.ajax({
            url: "/mini/v1/comic/history/sync",
            method: "POST",
            data: {
                sync: JSON.stringify(t.params)
            },
            callback: function(a) {
                t.callback(a);
            }
        });
    },
    getFolList: function() {
        var t = this;
        this.data.getFolOver && !this.data.folNomore && (this.setData({
            getFolOver: !1
        }), a.ajax({
            url: "/mini/v1/comic/favourite/timeline",
            method: "GET",
            data: {
                since: this.data.folSince,
                count: 20
            },
            callback: function(i) {
                var e = {}, s = i.data.topic_list.map(function(i) {
                    var e = i.topic_info, s = i.latest_comic;
                    return {
                        topicTit: e.title,
                        topicId: e.id,
                        imgUrl: a.addSuffix(e.cover_image_url, 2),
                        comicTit: s.title,
                        comicId: i.continue_read_comic_id,
                        lastNum: e.comic_count,
                        lasTime: t.returnDiffer(s.created_at)
                    };
                });
                if (s.length) e.folList = t.data.folSince ? t.data.folList.concat(t.checkListNum(s)) : t.checkListNum(s); else {
                    t.data.folSince || (e.folList = []);
                    var o = i.data.recommend_topic_list.map(function(t) {
                        return {
                            id: t.id,
                            tit: t.title,
                            des: t.category.join(" "),
                            img: a.addSuffix(t.vertical_image_url, 3),
                            jump: "Topic"
                        };
                    });
                    o.length && (e.comList = o);
                }
                t.data.folSince = i.data.since, t.setData(e, function() {
                    t.setData({
                        getFolOver: !0
                    }), (-1 == t.data.folSince || s.length < 20) && t.setData({
                        folNomore: !0
                    });
                });
            }
        }));
    },
    checkListNum: function(t) {
        var a = this;
        return t.map(function(t) {
            var i = a.data.hasRead[t.topicId];
            if (i && i.readList) {
                var e = t.lastNum - i.readList.length;
                t.lastNum = e < 0 ? 0 : e, t.comicId = i.lastId;
            }
            return t;
        });
    },
    returnDiffer: function(t) {
        if (this.data.todayTime < t) return "今天";
        var a = parseInt((this.data.todayTime - t) / this.data.oneDay);
        return !(a > 7) && (0 == a ? "昨天" : a + 1 + "天前");
    },
    jumpTopic: function(t) {
        var i = t.currentTarget.dataset;
        i.ori = this.data.tab ? 1 : 16, a.jumpTopic(i);
    },
    jumpComic: function(t) {
        a.jumpComic(t.currentTarget.dataset);
    },
    faceClick: function() {
        var t = this;
        this.data.userInfo ? wx.showActionSheet({
            itemList: [ "切换帐号" ],
            success: function(a) {
                t.hideReddot(), wx.navigateTo({
                    url: "/pages/login/login"
                });
            },
            fail: function(t) {
                console.log(t.errMsg);
            }
        }) : wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    hisPress: function(t) {
        var i = this, e = t.currentTarget.dataset.index;
        this.setData({
            hisActive: e + 1
        }), wx.showActionSheet({
            itemList: [ "删除" ],
            success: function(t) {
                function s() {
                    var t = {
                        hisActive: 0
                    }, i = wx.getStorageSync("forUpload") || {};
                    delete i[o.topicId], "{}" == JSON.stringify(i) ? (t.hisNomore = !0, wx.removeStorage({
                        key: "forUpload",
                        success: function(t) {
                            console.log(t.data);
                        }
                    })) : wx.setStorage({
                        key: "forUpload",
                        data: i
                    }), this.data.hisList.splice(e, 1), t.hisList = this.data.hisList, this.setData(t, function() {
                        a.toast({
                            title: "删除了一条浏览历史",
                            duration: 1e3
                        });
                    });
                }
                var o = i.data.hisList[e];
                i.data.userInfo ? i.hisRequest({
                    params: {
                        type: 3,
                        list: [ {
                            account_id: i.data.userId,
                            topic_id: o.topicId,
                            comic_id: o.comicId
                        } ]
                    },
                    callback: function(t) {
                        s.call(i);
                    }
                }) : s.call(i);
            },
            fail: function(t) {
                i.setData({
                    hisActive: 0
                });
            }
        });
    },
    hideTeach: function(t) {
        this.setData({
            teached: !0
        }), wx.setStorage({
            key: "mypageTeached",
            data: !0
        });
    }
});