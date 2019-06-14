function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var e = require("../../utils/fetch").fetch;

getApp();

Component({
    data: {
        week: [ "一", "二", "三", "四", "五", "六", "日" ],
        tid: "",
        dailyInfo: [],
        nowtag: 3,
        nowDayInfo: "",
        fullDayInfo: "",
        pgcRec: [],
        chpgcRec: [],
        isrefresh: !0,
        isrefreshCHN: !0,
        isRotate: !1,
        isRotateCHN: !1,
        pgcRecShow: [],
        chpgcRecRec: [],
        isShow: !1
    },
    properties: {
        aid: Number
    },
    ready: function() {
        this.getDailyInfo(), this.getPGCinfo();
    },
    methods: {
        getDailyInfo: function() {
            var t = this;
            e({
                url: "https://api.bilibili.com/pgc/web/timeline?types=1"
            }).then(function(e) {
                t.setData({
                    dailyInfo: e.data.result,
                    nowDayInfo: e.data.result[3].episodes.slice(0, 8),
                    fullDayInfo: e.data.result[3].episodes
                });
            });
        },
        getPGCinfo: function() {
            var t = this;
            e({
                url: "https://api.bilibili.com/pgc/app/wx/page/bangumi"
            }).then(function(e) {
                console.log(e.data.result.modules[1].items.slice(0, 3)), t.setData({
                    pgcRec: e.data.result.modules[1].items,
                    chpgcRec: e.data.result.modules[2].items,
                    idxArr: e.data.result.modules[0].items,
                    pgcRecShow: e.data.result.modules[1].items.slice(0, 3),
                    chpgcRecRec: e.data.result.modules[2].items.slice(0, 3)
                });
            });
        },
        weekswitch: function(t) {
            var e = this, a = t.currentTarget.dataset.idx;
            this.data.nowtag != a && this.setData({
                isShow: !1,
                nowtag: a
            }, function() {
                e.setData({
                    nowDayInfo: e.data.dailyInfo[a].episodes.slice(0, 8),
                    fullDayInfo: e.data.dailyInfo[a].episodes
                });
            });
        },
        toPGC: function(t) {
            var e = t.currentTarget.dataset.ssid, a = t.currentTarget.dataset.type;
            "bangumi" === a ? wx.reportAnalytics("pgc_anime_selected", {}) : "guochuang" === a ? wx.reportAnalytics("pgc_gc_selected", {}) : "seasoncard" === a && wx.reportAnalytics("click_timeline_works", {}), 
            wx.navigateTo({
                url: "../pgcvideo/pgcvideo?ssid=" + e
            });
        },
        refreshPGC: function() {
            var e = this;
            this.data.isrefresh && this.data.isrefresh && (this.setData({
                isrefresh: !1,
                isRotate: !0
            }), setTimeout(function() {
                var a = e.data.pgcRec, i = a.splice(0, 3);
                a.push.apply(a, t(i)), e.setData({
                    pgcRec: a,
                    pgcRecShow: a.slice(0, 3),
                    isrefresh: !0,
                    isRotate: !1
                });
            }, 300));
        },
        refreshCHC: function() {
            var e = this;
            this.data.isrefreshCHN && this.data.isrefreshCHN && (this.setData({
                isrefreshCHN: !1,
                isRotateCHN: !0
            }), setTimeout(function() {
                var a = e.data.chpgcRec, i = a.splice(0, 3);
                a.push.apply(a, t(i)), e.setData({
                    chpgcRec: a,
                    chpgcRecRec: a.slice(0, 3),
                    isrefreshCHN: !0,
                    isRotateCHN: !1
                });
            }, 300));
        },
        showFull: function() {
            wx.reportAnalytics("click_timeline_more", {}), this.setData({
                nowDayInfo: this.data.fullDayInfo,
                isShow: !0
            });
        },
        toindicate: function(t) {
            var e = t.currentTarget.dataset.type;
            "more" === e ? wx.reportAnalytics("pgc_index_more", {}) : "card" === e && wx.reportAnalytics("pgc_index_click", {}), 
            t.currentTarget.dataset.url ? wx.navigateTo({
                url: t.currentTarget.dataset.url
            }) : wx.navigateTo({
                url: "../indication/indication"
            });
        }
    }
});