function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

function a(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var e, i = require("../../utils/fetch"), n = i.fetch, o = i.reportbili, s = require("../../utils/util.js"), r = getApp();

Page({
    data: (e = {
        vLists: [],
        lists: [],
        listHeight: 2500,
        interval: 2e3,
        duration: 500,
        previousMargin: 0,
        nowTag: 0,
        tagnum: 0,
        defaultSearchWord: "",
        total: 0,
        selectIndex: 0,
        isPlay: !1,
        isStart: !1,
        danmuList: [],
        durl: "",
        coverImg: "",
        cid: "",
        listInfo: "",
        isPlayId: "",
        flag: !1
    }, a(e, "total", 0), a(e, "reachbottom", !1), a(e, "iSopenBtn", !1), a(e, "isiPhoneX", !1), 
    e),
    onLoad: function(t) {
        var a = this;
        this.data.tagnum = t.tag, this.isShowopenbtn(), this.setData({
            navbartitle: decodeURI(t.tag_name) || "哔哩哔哩"
        }), this.getRankinfo(t.tag), wx.getSystemInfo({
            success: function(t) {
                r.globalData.isNotch && a.setData({
                    isiPhoneX: !0
                });
            }
        });
    },
    getRankinfo: function(t) {
        var a = this, e = {
            url: r.globalData.ip + "/x/web-interface/tag/top",
            data: {
                pn: 1,
                ps: 50,
                tid: this.data.tagnum
            }
        };
        n(e).then(function(t) {
            var e = s.splitData(t.data.data);
            a.setData({
                lists: e[0],
                vLists: e
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    onReachBottom: function() {
        console.log("onReachBottom"), this.videoContext && this.videoContext.pause();
        var a = this.data.total + 1;
        if (a <= this.data.vLists.length) {
            var e = [].concat(t(this.data.lists), t(this.data.vLists[a]));
            this.setData({
                lists: e,
                total: a
            });
        }
        this.data.total >= this.data.vLists.length - 1 && this.setData({
            reachbottom: !0
        });
    },
    play: function(t) {
        var a = this, e = t.currentTarget.dataset.aid;
        this.videoContext && this.videoContext.pause(), this.videoContext = wx.createVideoContext("myVideo" + e), 
        r.globalData.isPlayId = e, n({
            url: r.globalData.ip + "/x/web-interface/view?aid=" + e
        }).then(function(t) {
            n({
                url: r.globalData.ip + "/x/player/playurl",
                data: {
                    cid: t.data.data.pages.length ? t.data.data.pages[0].cid : t.data.data.cid,
                    avid: e,
                    otype: "json",
                    platform: "html5",
                    type: "mp4"
                }
            }).then(function(t) {
                a.setData({
                    durl: t.data.data.durl[0].url,
                    isPlay: !0,
                    isStart: !0,
                    isPlayId: e
                }, function() {
                    a.videoContext.play(), o([ e, "play", "tagepage" ]), wx.reportAnalytics("tagpage_video_click", {
                        tagpage_video_click: e
                    });
                });
            }).catch(function(t) {
                console.log(t);
            });
        });
    },
    toTag: function() {
        console.log(r), wx.navigateTo({
            url: "../tagpage/tagpage"
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
        var a = this, e = this.data.flag = !1;
        this.setData({
            flag: !e
        }, function() {
            a.play(t);
        });
    },
    onShareAppMessage: function(t) {
        if ("button" == t.from) {
            var a = t.target.dataset.aid;
            return wx.reportAnalytics("tagpage_share_click", {
                tagpage_share_click: a
            }), {
                title: t.target.dataset.name,
                path: "/pages/video/video?avid=" + a,
                imageUrl: t.target.dataset.imageurl + "@158-0-750-600a_10660w_600h.png"
            };
        }
    },
    openPlayPage: function(t) {
        var a = t.currentTarget.dataset.aid;
        wx.reportAnalytics("tagpage_head_click", {
            tagpage_head_click: a
        }), wx.navigateTo({
            url: "../video/video?avid=" + a
        });
    },
    openApp: function() {},
    onShow: function() {
        r.globalData.scene = 1;
    },
    onHide: function() {
        r.globalData.scene = -1;
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