function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, i = Array(t.length); a < t.length; a++) i[a] = t[a];
        return i;
    }
    return Array.from(t);
}

var a = require("../../utils/fetch").fetch, i = getApp();

Page({
    data: {
        cardList: [],
        count: 2,
        break: !1,
        conditionList: [],
        filterType: "",
        deviceHeight: 0,
        conditionId: 0,
        fltIndex: null,
        isBangumi: !0,
        arrowUp: !1,
        clickCount: 0,
        scrollTop: null,
        isiPhoneX: !1,
        versionObj: {},
        styleObj: {},
        finishObj: {},
        versionName: "",
        styleName: "",
        finishName: "",
        invalid: !1
    },
    onLoad: function(t) {
        var e = this;
        if (wx.getSystemInfo({
            success: function(t) {
                i.globalData.isNotch && e.setData({
                    isiPhoneX: !0
                }), e.setData({
                    deviceHeight: t.screenHeight
                });
            }
        }), t.style_id) {
            var s = t.style_id, n = t.name;
            this.setData({
                styleObj: {
                    style_id: s
                },
                styleName: n,
                fltIndex: 1
            }), a({
                url: "https://bangumi.bilibili.com/media/web_api/search/result",
                data: {
                    season_type: 1,
                    pagesize: 30,
                    style_id: s
                }
            }).then(function(t) {
                t.data.result.data.length ? e.setData({
                    cardList: t.data.result.data,
                    filterType: "style_id",
                    conditionId: s
                }) : e.setData({
                    invalid: !0
                });
            });
        } else this.setData({
            isBangumi: !0,
            versionObj: {
                season_version: -1
            },
            break: !1
        }), a({
            url: "https://bangumi.bilibili.com/media/web_api/search/result",
            data: {
                season_type: 1,
                pagesize: 30,
                season_version: -1
            }
        }).then(function(t) {
            t.data.result.data.length ? e.setData({
                cardList: t.data.result.data,
                filterType: "season_version",
                conditionId: -1
            }) : e.setData({
                invalid: !0
            });
        });
    },
    scrolltolower: function() {
        var i = this;
        if (!this.data.break) {
            var e = {};
            e.season_type = this.data.isBangumi ? 1 : 4, e.pagesize = this.data.count < 4 ? 30 : 10, 
            e.page = this.data.count < 4 ? this.data.count : 10, e[this.data.filterType] = this.data.conditionId;
            var s = Object.assign({}, e, this.data.versionObj, this.data.styleObj, this.data.finishObj);
            a({
                url: "https://bangumi.bilibili.com/media/web_api/search/result",
                data: s
            }).then(function(a) {
                var e = i.data.count < 4 ? a.data.result.data : a.data.result.data.slice(0, 9), s = [].concat(t(i.data.cardList), t(e)), n = i.data.count < 4 ? i.data.count + 1 : 4, r = !(i.data.count < 4);
                i.setData({
                    cardList: s,
                    count: n,
                    break: r
                });
            });
        }
    },
    toPgcVideo: function(t) {
        var a = t.currentTarget.dataset.ssid;
        wx.navigateTo({
            url: "../pgcvideo/pgcvideo?ssid=" + a
        });
    },
    filter: function(t) {
        var i = this, e = t.currentTarget.dataset.type, s = Number(t.currentTarget.dataset.index);
        if (s === this.data.fltIndex) {
            if (this.data.clickCount) return void this.setData({
                conditionList: [],
                clickCount: 0,
                arrowUp: !1
            });
            this.setData({
                clickCount: 1
            });
        }
        this.setData({
            filterType: e,
            fltIndex: s,
            arrowUp: !0,
            clickCount: 1
        });
        var n = {};
        n.season_type = this.data.isBangumi ? 1 : 4, a({
            url: "https://bangumi.bilibili.com/media/web_api/search/v2/condition",
            data: n
        }).then(function(t) {
            var a = t.data.result.filter.filter(function(t) {
                if (t.id === e) return t;
            });
            i.setData({
                conditionList: a[0].value
            });
        });
    },
    closeCon: function() {
        this.setData({
            conditionList: [],
            clickCount: 0,
            arrowUp: !1
        });
    },
    pickOne: function(t) {
        var i = this, e = t.currentTarget.dataset.id, s = t.currentTarget.dataset.name;
        this.setData({
            count: 1,
            cardList: [],
            break: !1,
            conditionList: [],
            conditionId: e,
            clickCount: 0,
            arrowUp: !1,
            invalid: !1
        }), "season_version" === this.data.filterType ? this.setData({
            versionObj: {
                season_version: e
            },
            versionName: s
        }) : "style_id" === this.data.filterType ? this.setData({
            styleObj: {
                style_id: e
            },
            styleName: s
        }) : this.setData({
            finishObj: {
                is_finish: e
            },
            finishName: s
        });
        var n = Object.assign({}, this.data.versionObj, this.data.styleObj, this.data.finishObj), r = {};
        r.season_type = this.data.isBangumi ? 1 : 4, r.pagesize = 30, r.page = 1;
        var o = Object.assign({}, r, n);
        a({
            url: "https://bangumi.bilibili.com/media/web_api/search/result",
            data: o
        }).then(function(t) {
            t.data.result.data.length ? i.setData({
                cardList: t.data.result.data,
                count: 2,
                conditionList: []
            }) : i.setData({
                invalid: !0
            });
        });
    },
    bangumiSwitch: function(t) {
        var i = this;
        if (this.setData({
            scrollTop: 0,
            invalid: !1
        }), t.currentTarget.dataset.ban) {
            if (this.data.isBangumi) return;
            this.setData({
                isBangumi: !0,
                versionObj: {
                    season_version: -1
                },
                styleObj: {},
                finishObj: {},
                versionName: "",
                styleName: "",
                finishName: "",
                fltIndex: 0,
                break: !1,
                conditionList: [],
                arrowUp: !1
            }), a({
                url: "https://bangumi.bilibili.com/media/web_api/search/result",
                data: {
                    season_type: 1,
                    pagesize: 30,
                    season_version: -1
                }
            }).then(function(t) {
                t.data.result.data.length ? i.setData({
                    cardList: t.data.result.data,
                    filterType: "season_version",
                    conditionId: -1
                }) : i.setData({
                    invalid: !0
                });
            });
        } else {
            if (!this.data.isBangumi) return;
            this.setData({
                isBangumi: !1,
                versionObj: {
                    season_version: -1
                },
                styleObj: {},
                finishObj: {},
                versionName: "",
                styleName: "",
                finishName: "",
                fltIndex: 0,
                break: !1,
                conditionList: [],
                arrowUp: !1
            }), a({
                url: "https://bangumi.bilibili.com/media/web_api/search/result",
                data: {
                    season_type: 4,
                    pagesize: 30,
                    season_version: -1
                }
            }).then(function(t) {
                t.data.result.data.length ? i.setData({
                    cardList: t.data.result.data,
                    filterType: "season_version",
                    conditionId: -1
                }) : i.setData({
                    invalid: !0
                });
            });
        }
    },
    moveBan: function() {}
});