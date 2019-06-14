function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, a = require("../../utils/fetch"), i = a.fetch, o = a.reportbili, s = require("../../utils/util.js"), n = getApp();

Page({
    data: {
        vLists: [],
        lists: [],
        nowTag: 0,
        defaultSearchWord: "",
        selectIndex: 0,
        isPlay: !1,
        isStart: !1,
        danmuList: [],
        durl: "",
        coverImg: "",
        cid: "",
        listInfo: "",
        isPlayId: "",
        flag: !1,
        total: 0,
        stoppregation: !0,
        isAndroid: !1,
        showWelcome: !1,
        isUpdate: !1,
        reachbottom: !1,
        iSopenBtn: !1,
        tips: "更多请到bilibili客户端观看~",
        isNewcontent: !1,
        loadpic: !1,
        noNetwork: !1,
        cantenter: !1,
        showGuide: !1,
        isSearch: !1,
        keywordlist: [],
        localkeywordlist: [],
        isfoucus: !0,
        sugArr: [],
        keyword: "",
        defkw: "",
        defobj: "",
        deviceWidth: "",
        deviceHeight: "",
        isiPhoneX: !1,
        fromPage: "",
        DN: "",
        timeStamp: 0
    },
    onLoad: function(t) {
        var e = this;
        this.getRankinfo(), this.setTodesktop(), this.isShowopenbtn(), this.getdefault(), 
        "video" === t.from ? (this.setData({
            isSearch: !0,
            fromPage: "video"
        }), i({
            url: "https://s.search.bilibili.com/main/hotword?from_source=xcx_search"
        }).then(function(t) {
            e.setData({
                keywordlist: t.data.list.slice(0, 10)
            });
        }).catch(function(t) {
            console.log(t);
        }), wx.getStorageSync("localkeyword") && this.setData({
            localkeywordlist: wx.getStorageSync("localkeyword")
        })) : (this.isFirstTime(), this.getUseTime()), this.isNetwork(), wx.getSystemInfo({
            success: function(t) {
                n.globalData.isNotch && e.setData({
                    isiPhoneX: !0
                }), e.setData({
                    DN: t.model,
                    deviceWidth: t.windowWidth,
                    deviceHeight: t.screenHeight
                });
            }
        });
    },
    onShow: function() {
        n.globalData.scene = 1;
    },
    onHide: function() {
        n.globalData.scene = -1;
    },
    switchHomeTag: function(t) {
        var e = t.currentTarget.dataset.tag;
        e != this.data.nowTag && (this.setData({
            nowTag: e
        }), 1 == e ? wx.reportAnalytics("tabbar_pgc_click", {}) : 0 == e && wx.reportAnalytics("tabbar_hot_click", {}));
    },
    getdefault: function() {
        var t = this;
        i({
            url: "https://api.bilibili.com/x/web-interface/search/default?from_source=xcx_search"
        }).then(function(e) {
            console.log("@", e.data), t.setData({
                defkw: e.data.data.show_name,
                defobj: e.data.data
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    getsuggestion: function(t) {
        var e = this;
        t.detail.value ? i({
            url: "https://s.search.bilibili.com/main/suggest?func=suggest&suggest_type=accurate&sub_type=tag&main_ver=v1&from_source=xcx_search&highlight=&tag_num=10&term=" + t.detail.value
        }).then(function(t) {
            t.data.result.tag && e.setData({
                sugArr: t.data.result.tag,
                isSearch: !0
            });
        }).catch(function(t) {
            console.log(t);
        }) : this.setData({
            keyword: "",
            sugArr: []
        });
    },
    myCatchTouch: function() {},
    picStatus: function() {
        this.setData({
            loadpic: !0
        });
    },
    searchBysug: function(t) {
        this.savekw(t.currentTarget.dataset.sug), this.navtoSearch(t.currentTarget.dataset.sug), 
        wx.reportAnalytics("suggest_guess", {
            suggest_guess: ""
        });
    },
    change2Search: function(t) {
        var e = this;
        t.currentTarget.dataset.open ? (this.setData({
            isSearch: !0
        }), wx.reportAnalytics("actionbar_search_click", {}), i({
            url: "https://s.search.bilibili.com/main/hotword?from_source=xcx_search"
        }).then(function(t) {
            e.setData({
                keywordlist: t.data.list.slice(0, 10)
            });
        }).catch(function(t) {
            console.log(t);
        }), wx.getStorageSync("localkeyword") && this.setData({
            localkeywordlist: wx.getStorageSync("localkeyword")
        })) : (this.setData({
            isSearch: !1,
            sugArr: []
        }), "video" === this.data.fromPage && (this.isFirstTime(), this.getUseTime(), wx.reLaunch({
            url: "index"
        })));
    },
    savekw: function(t) {
        if (wx.getStorageSync("localkeyword")) {
            var e = wx.getStorageSync("localkeyword");
            if (-1 != e.indexOf(t)) return;
            e.unshift(t), wx.setStorageSync("localkeyword", e.slice(0, 7));
        } else wx.setStorageSync("localkeyword", [ t ]);
    },
    searchEvent: function(t) {
        console.log(t.detail.value);
        var e = t.detail.value;
        if (!e) return wx.reportAnalytics("search_recommend", {
            search_recommend: this.data.defkw
        }), this.savekw(this.data.defkw), "av" == this.data.defobj.name.substr(0, 2) ? void wx.navigateTo({
            url: "../video/video?avid=" + this.data.defobj.name.substr(2)
        }) : void this.navtoSearch(this.data.defobj.name);
        if (wx.getStorageSync("localkeyword")) {
            var a = wx.getStorageSync("localkeyword");
            if (-1 != a.indexOf(e)) return void this.navtoSearch(e);
            a.unshift(e), wx.setStorageSync("localkeyword", a.slice(0, 7)), this.navtoSearch(e);
        } else wx.setStorageSync("localkeyword", [ e ]), this.navtoSearch(e);
    },
    navtoSearch: function(t) {
        var a = "";
        if ("object" == (void 0 === t ? "undefined" : e(t))) {
            this.savekw(t.currentTarget.dataset.kw), a = t.currentTarget.dataset.kw;
            var i = t.currentTarget.dataset.type || "";
            "hot" == i ? wx.reportAnalytics("search_hot", {
                search_hot: ""
            }) : "history" == i && wx.reportAnalytics("search_history", {
                search_history: ""
            });
        } else a = t;
        wx.redirectTo({
            url: "../search/search?kw=" + a
        });
    },
    deleteItem: function(t) {
        console.log(t.currentTarget.dataset.idx);
        var e = t.currentTarget.dataset.idx, a = wx.getStorageSync("localkeyword");
        a.splice(e, 1), wx.setStorageSync("localkeyword", a), this.setData({
            localkeywordlist: wx.getStorageSync("localkeyword")
        });
    },
    deleteKeyword: function() {
        this.setData({
            keyword: "",
            sugArr: []
        });
    },
    cleanlocalkw: function() {
        this.setData({
            localkeywordlist: []
        }), wx.setStorageSync("localkeyword", []);
    },
    getUseTime: function() {
        var t = this, e = new Date().getTime();
        wx.getStorageSync("opentime") || (wx.setStorageSync("opentime", e), this.setData({
            isNewcontent: !0
        }), setTimeout(function() {
            t.setData({
                isNewcontent: !1
            });
        }, 2e3)), (wx.getStorageSync("opentime") + 864e5 < e || !wx.getStorageSync("opentime")) && (wx.setStorageSync("opentime", e), 
        this.setData({
            isNewcontent: !0
        }), setTimeout(function() {
            t.setData({
                isNewcontent: !1
            });
        }, 2e3));
    },
    isNetwork: function() {
        var t = this;
        wx.onNetworkStatusChange(function(e) {
            console.log("network", e), "none" == e.networkType ? (t.setData({
                noNetwork: !0,
                cantenter: !0
            }), setTimeout(function() {
                t.setData({
                    noNetwork: !1
                });
            }, 2e3)) : t.setData({
                loadpic: !1,
                cantenter: !1
            });
        });
    },
    getRankinfo: function() {
        var t = this, e = {
            url: n.globalData.ip + "/x/web-interface/wx/hot"
        };
        i(e).then(function(e) {
            console.log(e);
            var a = s.splitData(e.data.data);
            t.setData({
                lists: a[0],
                vLists: a
            }), wx.stopPullDownRefresh();
        }).catch(function(t) {
            console.log(t);
        });
    },
    scrollevent: function(t) {
        console.log(t.detail);
    },
    scrollFn: function(t) {
        var e = this;
        console.log(t), 0 == this.data.timeStamp ? (this.setData({
            timeStamp: t.timeStamp
        }), setTimeout(function() {
            e.refresh();
        }, 500)) : t.timeStamp - this.data.timeStamp >= 5e3 && this.setData({
            timeStamp: t.timeStamp
        }, function() {
            setTimeout(function() {
                e.refresh();
            }, 500);
        });
    },
    refresh: function() {
        var e = this;
        if (wx.vibrateShort(), wx.reportAnalytics("index_refresh_times", {
            index_refresh_times: ""
        }), this.data.total >= this.data.vLists.length - 1) return this.setData({
            reachbottom: !0,
            isUpdate: !0
        }), wx.stopPullDownRefresh(), this.videoContext && this.videoContext.pause(), void setTimeout(function() {
            e.setData({
                isUpdate: !1
            });
        }, 2e3);
        var a = this.data.total + 1;
        if (a <= this.data.vLists.length) {
            var i = [].concat(t(this.data.vLists[a]), t(this.data.lists));
            this.setData({
                lists: i,
                total: a
            });
        }
    },
    refreshBottom: function() {
        wx.vibrateShort(), wx.reportAnalytics("index_refresh_times", {
            index_refresh_times: ""
        }), this.videoContext && this.videoContext.pause();
        var e = this.data.total + 1;
        if (e <= this.data.vLists.length) {
            var a = [].concat(t(this.data.lists), t(this.data.vLists[e]));
            this.setData({
                lists: a,
                total: e
            }), this.data.total >= this.data.vLists.length - 1 && this.setData({
                reachbottom: !0
            });
        }
    },
    play: function(t) {
        var e = this, a = t.currentTarget.dataset.aid;
        this.videoContext && this.videoContext.pause(), this.videoContext = wx.createVideoContext("myVideo" + a), 
        n.globalData.isPlayId = a, i({
            url: n.globalData.ip + "/x/web-interface/view?aid=" + a
        }).then(function(t) {
            i({
                url: n.globalData.ip + "/x/player/playurl",
                data: {
                    cid: t.data.data.pages.length ? t.data.data.pages[0].cid : t.data.data.cid,
                    avid: a,
                    otype: "json",
                    platform: "html5",
                    type: "mp4"
                }
            }).then(function(t) {
                e.setData({
                    durl: t.data.data.durl[0].url,
                    isPlay: !0,
                    isStart: !0,
                    isPlayId: a
                }, function() {
                    e.videoContext.play(), o([ a, "play", "index" ]), wx.reportAnalytics("index_video_click", {
                        index_video_click: a
                    });
                });
            }).catch(function(t) {
                console.log(t);
            });
        });
    },
    toTag: function(t) {
        var e = t.currentTarget.dataset.tagnum, a = t.currentTarget.dataset.tagname;
        wx.reportAnalytics("index_tag_click", {
            index_tag_click: e
        }), wx.navigateTo({
            url: "../tagpage/tagpage?tag=" + e + "&&tag_name=" + a
        });
    },
    pause: function() {
        this.videoContext.pause(), this.setData({
            isPlay: !1
        });
    },
    bindended: function() {
        this.setData({
            isStart: !1,
            isPlay: !1
        });
    },
    startPlay: function(t) {
        var e = this;
        this.data.flag = !1;
        this.setData({}, function() {
            e.play(t);
        });
    },
    onShareAppMessage: function(t) {
        if ("button" == t.from) {
            var e = t.target.dataset.aid;
            return wx.reportAnalytics("index_share_click", {
                index_share_click: e
            }), {
                title: t.target.dataset.name,
                path: "/pages/video/video?avid=" + e,
                imageUrl: t.target.dataset.imageurl + "@158-0-750-600a_10660w_600h.png"
            };
        }
    },
    openPlayPage: function(t) {
        var e = this;
        if (this.data.cantenter) return this.setData({
            noNetwork: !0,
            cantenter: !0
        }), void setTimeout(function() {
            e.setData({
                noNetwork: !1
            });
        }, 2e3);
        this.videoContext && this.videoContext.pause();
        var a = t.currentTarget.dataset.aid;
        wx.reportAnalytics("index_head_click", {
            index_head_click: a
        }), wx.navigateTo({
            url: "../video/video?avid=" + a + "&&cid=1234"
        });
    },
    setTodesktop: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                if (e.platform) {
                    t.setData({
                        isAndroid: !0
                    });
                    var a = wx.getStorageSync("openTimes");
                    a ? (a += 1, wx.setStorageSync("openTimes", a)) : wx.setStorageSync("openTimes", 1), 
                    a < 3 && t.setData({
                        showWelcome: !1
                    }), a >= 3 && a <= 6 && !wx.getStorageSync("confirm") ? t.setData({
                        showWelcome: !0
                    }) : t.setData({
                        showWelcome: !1
                    });
                }
            }
        });
    },
    isFirstTime: function() {
        wx.getStorageSync("isguide") ? this.setData({
            showGuide: !1
        }) : (this.setData({
            showGuide: !0
        }), wx.setStorageSync("isguide", !0));
    },
    closeGuide: function() {
        this.setData({
            showGuide: !1
        }), wx.reportAnalytics("menushow_iknow_click", {
            menushow_iknow_click: ""
        });
    },
    getXML: function() {
        var t = this, e = "";
        i({
            url: this.data.cid
        }).then(function(a) {
            e = a.data, t.setData({
                danmuList: s.xml2Obj(e)
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    launchAppError: function() {
        wx.navigateTo({
            url: "../download/download"
        });
    },
    reportEvent: function(t) {
        switch (t.target.dataset.report) {
          case "mainindex":
            wx.reportAnalytics("share_click", {
                share_click: t.target.dataset.aid
            });
            break;

          case "playbtn":
            wx.reportAnalytics("play_click", {
                play_click: t.target.dataset.aid
            });
            break;

          case "openapp":
            wx.reportAnalytics("openapp_click", {
                openapp_click: "openapp"
            });
        }
    },
    isShowopenbtn: function() {
        wx.getStorageSync("openApp") ? this.setData({
            iSopenBtn: !0
        }) : this.setData({
            iSopenBtn: !1
        });
    }
});