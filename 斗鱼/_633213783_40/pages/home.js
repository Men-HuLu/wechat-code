function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../common/httpClient")), o = t(require("../config/index")), a = t(require("../common/point")), n = t(require("../common/util")), i = t(require("../common/navigator")), r = t(require("../common/tabBar")), s = getApp();

Page({
    data: {
        isIpx: !1,
        isLoading: !0,
        isError: !1,
        lyList: [],
        roomLists: [],
        hoti: 0,
        showTopNav: !0,
        showRightBtn: !0,
        showActivity: !1,
        popupShow: !0,
        guideShow: !0
    },
    onLoad: function(t) {
        this.setData({
            isLoading: !0,
            isError: !1
        }), this.init(), this.isIpx = s.globalData.isIphoneX, a.default.postPoint(o.default.Point.INIT_PAGE_HOME, o.default.Point.PAGE_HOME), 
        "sqhd18" === t.openType && (console.log(t), e.default.request({
            url: config.HOST + "/api/activitync/summer/getUserActive",
            method: "POST",
            data: {
                code: t.code,
                token: this.globalData.userInfo.token || "",
                did: this.globalData.did
            }
        }));
    },
    onReady: function() {},
    onShow: function() {
        r.default.hideTabBarRedDotByStorage(3, "gameRecharged");
    },
    onHide: function() {
        this.setData({
            popupShow: !1,
            guideShow: !1
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.init();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "斗鱼直播",
            path: "/pages/home/index"
        };
    },
    onPageScroll: function() {},
    onTabItemTap: function() {},
    pulldownFinish: function() {
        wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
    },
    init: function() {
        var t = this;
        this.getCataStorageData().then(function(e) {
            if (0 === e.code && e.data && e.data.length) {
                var o = {
                    cate1Id: 0,
                    cate1Name: "推荐",
                    shortName: ""
                };
                t.cate1Info = e.data.map(function(t) {
                    return t.cate1Name = t.name, t;
                }), t.cate1Info.unshift(o), t.setData({
                    cate1Info: t.cate1Info
                });
            } else t.showTopNav = !1, t.setData({
                showTopNav: t.showTopNav
            });
        }, function(e) {
            t.showTopNav = !1, t.setData({
                showTopNav: t.showTopNav
            });
        }), this.getAppStatus().then(function(e) {
            t.pulldownFinish();
        }, function(e) {
            console.log("catche error"), t.setData({
                isLoading: !1,
                isError: !0
            }), t.pulldownFinish(), console.log("isLoading isError", t.data.isLoading, t.data.isError);
        }).catch(function(e) {
            t.setData({
                isLoading: !1,
                isError: !0
            }), t.pulldownFinish();
        }), this.getHomeMix().then(function(t) {});
    },
    reload: function() {
        this.setData({
            isLoading: !0,
            isError: !1
        }), this.init();
    },
    getAppStatus: function() {
        var t = this;
        return console.log("getAppStatus"), e.default.getStorageRequestData(o.default.API.HOMEINDEX).then(function(e) {
            if (e && 0 === e.code) {
                var o = e.data;
                return setTimeout(function() {
                    t.requestHomeSetStorage();
                }, 10), t.dispatchHomeIndex(o), Promise.resolve();
            }
            return t.requestHomeSetStorage();
        }, function(t) {
            return console.log("getAppStatus error"), requestHomeSetStorage();
        }).catch(function(t) {
            return console.log("getAppStatus err"), Promise.reject(t);
        });
    },
    dispatchHomeIndex: function(t) {
        var e = this;
        this.setData({
            lyList: [ {
                tabName: "正在直播",
                description: "",
                list: t.liveList.splice(0, 4).map(function(t) {
                    return t.hn = n.default.numberUpperFormat(t.hn), t;
                }),
                shortName: ""
            }, {
                tabName: "颜值",
                description: "",
                list: t.yzList.map(function(t) {
                    return t.type = "yz", t.hn = n.default.numberUpperFormat(t.hn), t;
                }).splice(0, 4),
                shortName: "yz"
            } ]
        }, function() {
            e.setData({
                isLoading: !1,
                isError: !1
            });
        });
    },
    dispatchHomeMix: function(t) {
        var e = t.map(function(t) {
            return t.list = t.list.splice(0, 4).map(function(t) {
                return t.hn = n.default.numberUpperFormat(t.hn), t;
            }), t;
        });
        this.setData({
            roomLists: e
        });
    },
    getHomeMix: function() {
        var t = this;
        return e.default.getStorageRequestData(o.default.API.HOMEMIX).then(function(e) {
            if (e && 0 === e.code) {
                var o = e.data;
                setTimeout(function() {
                    t.requestHomeMixSetStorage();
                }, 10), t.dispatchHomeMix(o);
            } else t.requestHomeMixSetStorage();
            return Promise.resolve();
        }, function(e) {
            return console.log(e), t.requestHomeMixSetStorage(), Promise.resolve();
        });
    },
    requestHomeSetStorage: function() {
        var t = this;
        return e.default.requestSetStorage(o.default.API.HOMEINDEX).then(function(e) {
            if (0 === e.code) {
                var o = e.data;
                return t.dispatchHomeIndex(o), Promise.resolve();
            }
            return Promise.resolve();
        }).catch(function(t) {
            return Promise.reject(t);
        });
    },
    requestHomeMixSetStorage: function() {
        var t = this;
        return e.default.requestSetStorage(o.default.API.HOMEMIX).then(function(e) {
            if (0 === e.code) {
                var o = e.data;
                return t.dispatchHomeMix(o), Promise.resolve();
            }
            return Promise.resolve();
        }).catch(function(t) {
            return Promise.reject(t);
        });
    },
    goCatalogList: function(t) {
        var e = t.detail.item;
        (0 !== e.cate1Id || e.shortName) && i.default.disDoubleNavigate("calalogue-list?type=" + e.shortName + "&name=" + e.cate1Name);
    },
    getCataStorageData: function() {
        return e.default.requestStorageFirst({
            url: o.default.API.GETRECLIST,
            complete: function() {}
        });
    }
});