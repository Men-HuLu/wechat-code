function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function a(t, a, o) {
    return a in t ? Object.defineProperty(t, a, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = o, t;
}

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = (t(require("../../libs/userLogin.js")), t(require("../../utils/interface.js"))), n = t(require("../../libs/ajax.js")), i = getApp();

Page({
    data: {
        hasUid: !0,
        hasData: !1,
        allData: "",
        showPropaganda: !1,
        loading: !1,
        loadingText: "加载更多...",
        page: 1
    },
    onLoad: function(t) {
        wx.hideShareMenu();
    },
    searchScrollLower: function() {
        var t = this, c = this.data.page;
        c++, this.setData({
            page: c,
            loading: !0
        });
        try {
            var l = wx.getStorageSync("key2");
            "object" === (void 0 === l ? "undefined" : o(l)) && (l = JSON.stringify(l));
            var d = i.globalData.uid, r = new n.default({
                contentType: !0,
                reqtype: "GET",
                id: d,
                path: e.default.myFootprint,
                data: {
                    userId: i.globalData.uid,
                    page: this.data.page,
                    data: l
                }
            });
            r.then(function(o) {
                if (1 == o.hasVisit) if (0 == o.data.length) t.setData({
                    loadingText: "暂无其它数据"
                }); else {
                    var e = t.data.allData.data;
                    e[e.length - 1].time === o.data[0].time && (e[e.length - 1].commodity = e[e.length - 1].commodity.concat(o.data[0].commodity), 
                    o.data = o.data.slice(1)), o.data.forEach(function(t, a) {
                        e = e.concat(t);
                    }), console.log(e), t.setData(a({}, "allData.data", e));
                } else t.setData({
                    showPropaganda: !0
                });
            }), r.catch(function(t) {
                console.log(t);
            });
        } catch (t) {
            wx.showToast({
                title: "获取本地缓存失败",
                icon: "none"
            });
        }
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        try {
            var a = wx.getStorageSync("key");
            "object" === (void 0 === a ? "undefined" : o(a)) && (console.log(a), a = JSON.stringify(a)), 
            wx.showLoading({
                title: "加载中..."
            });
            var c = i.globalData.uid, l = new n.default({
                contentType: !0,
                reqtype: "GET",
                id: c,
                path: e.default.myFootprint,
                data: {
                    userId: i.globalData.uid,
                    data: a + ""
                }
            });
            l.then(function(o) {
                console.log(o), 1 == o.hasVisit ? (t.setData({
                    allData: o,
                    hasData: !0
                }), wx.hideLoading(), wx.removeStorageSync("key"), wx.setStorageSync("key2", a)) : (console.log("没有浏览记录"), 
                t.setData({
                    showPropaganda: !0
                }), wx.hideLoading(), wx.removeStorageSync("key"), wx.setStorageSync("key2", a));
            }), l.catch(function(t) {
                console.log(t);
            });
        } catch (t) {
            wx.showToast({
                title: "获取本地缓存失败",
                icon: "none"
            });
        }
    },
    Fabulous: function(t) {
        var o = this, c = t.currentTarget.dataset.id;
        if ("true" === t.currentTarget.dataset.fab) wx.showModal({
            title: "提示",
            content: "是否取消点赞",
            success: function(t) {
                if (t.confirm) {
                    var l = new n.default({
                        path: e.default.shopFabulous,
                        data: {
                            fabulous: !1,
                            id: c,
                            userId: i.globalData.uid
                        }
                    });
                    l.then(function(t) {
                        1 == t.errcode ? o.data.allData.data.forEach(function(t, e) {
                            t.commodity.forEach(function(t, n) {
                                t.id == c && o.setData(a({}, "allData.data[" + e + "].commodity[" + n + "].Fabulous", 0));
                            });
                        }) : wx.showToast({
                            title: "服务器响应失败",
                            icon: "none",
                            duration: 2e3
                        });
                    }), l.catch(function(t) {});
                } else t.cancel;
            }
        }); else {
            var l = new n.default({
                path: e.default.shopFabulous,
                data: {
                    fabulous: !1,
                    id: c,
                    userId: i.globalData.uid
                }
            });
            l.then(function(t) {
                console.log(t), 1 == t.errcode ? o.data.allData.data.forEach(function(t, e) {
                    t.commodity.forEach(function(t, n) {
                        t.id == c && o.setData(a({}, "allData.data[" + e + "].commodity[" + n + "].Fabulous", 1));
                    });
                }) : wx.showToast({
                    title: "服务器响应失败",
                    icon: "none",
                    duration: 2e3
                });
            }), l.catch(function(t) {});
        }
    },
    Collection: function(t) {
        var o = this, c = t.currentTarget.dataset.id;
        if ("true" === t.currentTarget.dataset.col) wx.showModal({
            title: "提示",
            content: "是否取消收藏",
            success: function(t) {
                if (t.confirm) {
                    console.log(o.data);
                    var l = new n.default({
                        path: e.default.shopCollection,
                        data: {
                            collection: !1,
                            id: c,
                            userId: i.globalData.uid
                        }
                    });
                    l.then(function(t) {
                        1 == t.errcode ? o.data.allData.data.forEach(function(t, e) {
                            t.commodity.forEach(function(t, n) {
                                t.id == c && o.setData(a({}, "allData.data[" + e + "].commodity[" + n + "].Collection", 0));
                            });
                        }) : wx.showToast({
                            title: "服务器响应失败",
                            icon: "none",
                            duration: 2e3
                        });
                    }), l.catch(function(t) {});
                } else t.cancel;
            }
        }); else {
            var l = new n.default({
                path: e.default.shopCollection,
                data: {
                    collection: !0,
                    id: c,
                    userId: i.globalData.uid
                }
            });
            l.then(function(t) {
                1 == t.errcode ? o.data.allData.data.forEach(function(t, e) {
                    t.commodity.forEach(function(t, n) {
                        t.id == c && o.setData(a({}, "allData.data[" + e + "].commodity[" + n + "].Collection", 1));
                    });
                }) : wx.showToast({
                    title: "服务器响应失败",
                    icon: "none",
                    duration: 2e3
                });
            }), l.catch(function(t) {});
        }
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    navigator: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../CommodityDetails/CommodityDetails?id=" + a + "&share=1&tab=true"
        });
    },
    navigator2: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../CommodityDetails/CommodityDetails?id=" + a + "&share=1&tab=false"
        });
    },
    search: function(t) {
        this.setData({
            page: 1
        }), wx.navigateTo({
            url: "/pages/search/search?callPage=index"
        });
    },
    onShareAppMessage: function(t) {
        var a = t.target.dataset.id;
        return {
            title: t.target.dataset.title,
            path: "/pages/CommodityDetails/CommodityDetails?id=" + a + "&share=0&tab=true"
        };
    },
    comment: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../comment/comment?id=" + a
        });
    },
    fabulous: function(t) {
        "false" === t.currentTarget.dataset.fab ? i.fabulous(this, t.currentTarget.dataset.id) : wx.showModal({
            title: "提示",
            content: "亲，您已经点赞了，是否取消点赞",
            success: function(t) {
                t.confirm && console.log("用户点击确定");
            }
        });
    }
});