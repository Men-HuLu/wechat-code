function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function a(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var e = t(require("../../config.js")), o = t(require("../../utils/interface.js")), i = t(require("../../libs/ajax.js")), n = getApp();

Page({
    data: {
        nav: "1",
        left: "0",
        tab: "1",
        loading: !1,
        loadingText: "加载更多...",
        scrollHeight: 350,
        page: 1
    },
    onLoad: function(t) {
        n.globalData.shop = !1;
        var a = this;
        wx.getSystemInfo({
            success: function(t) {
                var e = t.windowHeight;
                wx.createSelectorQuery().select("#height1").boundingClientRect(function(t) {
                    var o = t.height;
                    wx.createSelectorQuery().select("#height2").boundingClientRect(function(t) {
                        var i = t.height;
                        wx.createSelectorQuery().select("#height3").boundingClientRect(function(t) {
                            var n = t.height;
                            a.setData({
                                scrollHeight: e - o - i - n - 40
                            });
                        }).exec();
                    }).exec();
                }).exec();
            },
            fail: function(t) {
                console(t);
            }
        }), wx.hideShareMenu(), e.default.navBar[0].selected = !0, e.default.navBar[1].selected = !1, 
        e.default.navBar[2].selected = !1, e.default.navBar[3].selected = !1, this.setData({
            id: t.id
        }), wx.removeStorageSync("shopData");
    },
    navigationSearch: function() {
        n.globalData.shop = !0, wx.navigateTo({
            url: "/pages/search/search?callPage=shop"
        }), wx.setStorageSync("shopData", this.data);
    },
    navigator: function(t) {
        var a = t.currentTarget.dataset.id;
        n.globalData.shop = !1, wx.setStorageSync("shopData", this.data), wx.navigateTo({
            url: "../CommodityDetails/CommodityDetails?id=" + a + "&share=1"
        });
    },
    tabNavigator: function(t) {
        var a = this, e = t.currentTarget.dataset.type;
        this.setData({
            tab: e,
            nav: e,
            page: 1
        });
        var d = "";
        if (1 == n.globalData.shop) {
            d = wx.getStorageSync("shop");
            var s = wx.getStorageSync("shopinput");
            "" != s ? this.setData({
                input: s
            }) : this.setData({
                input: ""
            });
        }
        wx.showLoading({
            title: "加载中..."
        });
        var l = new i.default({
            reqtype: "GET",
            path: o.default.shop,
            data: {
                id: this.data.id,
                uid: n.globalData.uid,
                tab: this.data.tab,
                left: this.data.left,
                key: d
            }
        });
        l.then(function(t) {
            console.log(t.data);
            for (var e = 0; e <= t.data.product.length - 1; e++) {
                var o = t.data.product[e].price.toFixed(2);
                t.data.product[e].price = o.split(".");
            }
            a.setData({
                data: t.data
            }), wx.hideLoading();
        }), l.catch(function(t) {
            console.log(t);
        });
    },
    photoChange: function(t) {
        var a = t.currentTarget.dataset.id;
        n.tackphoto(a);
    },
    leftNavigator: function(t) {
        var a = this, e = t.currentTarget.dataset.left;
        this.setData({
            left: e,
            page: 1
        });
        var d = "";
        if (1 == n.globalData.shop) {
            d = wx.getStorageSync("shop");
            var s = wx.getStorageSync("shopinput");
            "" != s ? this.setData({
                input: s
            }) : this.setData({
                input: ""
            });
        }
        wx.showLoading({
            title: "加载中..."
        });
        var l = new i.default({
            reqtype: "GET",
            path: o.default.shop,
            data: {
                id: this.data.id,
                uid: n.globalData.uid,
                tab: this.data.tab,
                left: this.data.left,
                key: d
            }
        });
        l.then(function(t) {
            console.log(t.data);
            for (var e = 0; e <= t.data.product.length - 1; e++) {
                var o = t.data.product[e].price.toFixed(2);
                t.data.product[e].price = o.split(".");
            }
            a.setData({
                data: t.data
            }), wx.hideLoading();
        }), l.catch(function(t) {
            console.log(t);
        });
    },
    clear: function() {
        var t = this;
        n.globalData.shop = !1, this.setData({
            page: 1,
            input: ""
        }), wx.showLoading({
            title: "加载中..."
        });
        var a = new i.default({
            reqtype: "GET",
            path: o.default.shop,
            data: {
                id: this.data.id,
                uid: n.globalData.uid,
                tab: this.data.tab,
                left: this.data.left,
                key: ""
            }
        });
        a.then(function(a) {
            console.log(a.data);
            for (var e = 0; e <= a.data.product.length - 1; e++) {
                var o = a.data.product[e].price.toFixed(2);
                a.data.product[e].price = o.split(".");
            }
            t.setData({
                data: a.data
            }), wx.hideLoading();
        }), a.catch(function(t) {
            console.log(t);
        });
    },
    inputVal: function(t) {
        this.setData({
            search: t.detail.value
        });
    },
    callPhone: function(t) {
        var a = t.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: a,
            success: function() {
                console.log("拨打电话成功！");
            },
            fail: function() {
                console.log("拨打电话失败！");
            }
        });
    },
    onReady: function() {},
    searchScrollLower: function() {
        var t = this, e = this.data.page;
        e++, this.setData({
            page: e,
            loading: !0
        });
        var d = "";
        if (1 == n.globalData.shop) {
            d = wx.getStorageSync("shop");
            var s = wx.getStorageSync("shopinput");
            "" != s ? this.setData({
                input: s
            }) : this.setData({
                input: ""
            });
        }
        var l = new i.default({
            reqtype: "GET",
            path: o.default.shop,
            data: {
                id: this.data.id,
                uid: n.globalData.uid,
                tab: this.data.tab,
                left: this.data.left,
                page: this.data.page,
                key: d
            }
        });
        l.then(function(e) {
            console.log(e.data);
            for (var o = 0; o <= e.data.product.length - 1; o++) {
                var i = e.data.product[o].price.toFixed(2);
                e.data.product[o].price = i.split(".");
            }
            e.data.product.length < 8 && t.setData({
                loadingText: "暂无其它数据"
            }), t.setData(a({}, "data.product", t.data.data.product.concat(e.data.product))), 
            t.data.data.product.length < 8 && t.setData({
                loading: !1
            });
        }), l.catch(function(t) {
            console.log(t);
        });
    },
    onShow: function() {
        var t = this, a = wx.getStorageSync("shopData");
        if ("" != a) this.setData({
            data: a.data,
            id: a.id,
            left: a.left,
            loading: a.loading,
            loadingText: a.loadingText,
            nav: a.nav,
            page: a.page,
            scrollHeight: a.scrollHeight,
            tab: a.tab
        }); else {
            this.setData({
                page: 1
            });
            var e = "";
            if (1 == n.globalData.shop) {
                e = wx.getStorageSync("shop");
                var d = wx.getStorageSync("shopinput");
                "" != d ? this.setData({
                    input: d
                }) : this.setData({
                    input: ""
                });
            }
            wx.showLoading({
                title: "加载中..."
            }), console.log(e);
            var s = new i.default({
                reqtype: "GET",
                path: o.default.shop,
                data: {
                    id: this.data.id,
                    uid: n.globalData.uid,
                    tab: this.data.tab,
                    left: this.data.left,
                    key: e
                }
            });
            s.then(function(a) {
                console.log(a.data);
                for (var e = 0; e <= a.data.product.length - 1; e++) {
                    var o = a.data.product[e].price.toFixed(2);
                    a.data.product[e].price = o.split(".");
                }
                t.setData({
                    data: a.data
                }), wx.hideLoading();
            }), s.catch(function(t) {
                console.log(t);
            });
        }
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var a = t.target.dataset.id;
        return {
            path: "/pages/CommodityDetails/CommodityDetails?id=" + a + "&share=0&tab=true&pageId=" + n.globalData.uid,
            success: function(t) {
                var e = new i.default({
                    path: o.default.shopShare,
                    data: {
                        id: a,
                        userId: n.globalData.uid
                    }
                });
                e.then(function(t) {}), e.catch(function(t) {});
            },
            fail: function(t) {}
        };
    }
});