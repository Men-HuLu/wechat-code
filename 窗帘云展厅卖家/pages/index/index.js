function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function t(a, t, o) {
    return t in a ? Object.defineProperty(a, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = o, a;
}

a(require("../../libs/userLogin.js"));

var o = a(require("../../utils/interface.js")), e = a(require("../../libs/ajax.js")), i = getApp(), n = 1, l = 0;

Page({
    data: {
        hasData: !1,
        allData: "",
        allData2: "",
        showPropaganda: !1,
        loading: !1,
        loadingText: "加载更多...",
        hasVisit: "",
        input: "",
        col1: [],
        col2: [],
        images: [],
        tabbu: 0,
        playMusic: 1,
        musics: [],
        page: 1
    },
    pauseMusic: function(a) {
        i.globalData.innerAudioContext.pause(), this.setData({
            playMusic: 0
        });
    },
    playMusic: function(a) {
        i.globalData.innerAudioContext.play(), this.setData({
            playMusic: 1
        });
    },
    UserInfoMask: function() {
        i.getUserInfo(this);
    },
    PhoneNumberMask: function(a) {
        i.getPhoneNumber(a, this);
    },
    onLoad: function(a) {
        var t = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        }), wx.setStorageSync("key", ""), i.globalData.index = !1, wx.removeStorageSync("indexData"), 
        i.login(this, i, function() {
            var a = "";
            1 == i.globalData.index && (a = wx.getStorageSync("index"));
            i.globalData.uid;
            var n = new e.default({
                contentType: !0,
                reqtype: "GET",
                path: o.default.CommodityDetails,
                data: {
                    userId: i.globalData.uid,
                    data: a
                }
            });
            n.then(function(a) {
                var o = i.globalData.scene;
                "intro" === a.hasVisit ? 1011 != o && 1012 != o && 1013 != o ? wx.reLaunch({
                    url: "/pages/infor/infor"
                }) : console.log("扫码进来的") : "goods" === a.hasVisit && (t.setData({
                    hasData: !0,
                    allData: a
                }), wx.hideLoading());
            }), n.catch(function(a) {
                console.log(a);
            }), 0 == i.globalData.has_phone ? t.has_phone() : t.setData({
                has_phone: !0
            });
        }), 1 == i.globalData.has_phone && this.setData({
            has_phone: !0
        });
    },
    onReady: function() {},
    CloneData: function() {
        var a = [], t = [];
        this.data.allData.list.forEach(function(o) {
            var e = o.time, i = o.temp;
            o.commodity.forEach(function(o) {
                o.time = e, o.temp = i, a.push(o);
                var n = {};
                n.src = o.image, n.id = o.id, t.push(n);
            });
        }), this.setData({
            "allData2.list": a,
            images: t
        });
    },
    clear: function() {
        var a = this;
        i.globalData.index = !1, this.setData({
            input: ""
        }), wx.showLoading({
            title: "加载中..."
        });
        var t = i.globalData.uid, n = new e.default({
            contentType: !0,
            reqtype: "GET",
            id: t,
            path: o.default.CommodityDetails,
            data: {
                userId: i.globalData.uid,
                data: ""
            }
        });
        n.then(function(t) {
            "goods" === t.hasVisit && (a.setData({
                hasData: !0,
                allData: t,
                hasVisit: "goods"
            }), 0 == t.list.length && a.setData({
                loading: !0,
                loadingText: "暂无数据"
            }), wx.hideLoading());
        }), n.catch(function(a) {
            console.log(a.msg);
        });
    },
    photoChange: function(a) {
        var t = a.currentTarget.dataset.id;
        i.tackphoto(t);
    },
    onShow: function() {
        var a = this, t = wx.getStorageSync("indexData");
        "" != t ? this.setData({
            hasData: t.hasData,
            allData: t.allData,
            showPropaganda: t.showPropaganda,
            loading: t.loading,
            loadingText: t.loadingText,
            hasVisit: t.hasVisit,
            input: t.input,
            page: t.page
        }) : (this.setData({
            page: 1,
            col1: [],
            col2: [],
            images: []
        }), n = 1, l = 0, wx.showLoading({
            title: "加载中..."
        }), i.login(this, i, function() {
            var t = "";
            if (1 == i.globalData.index) {
                t = wx.getStorageSync("index");
                var n = wx.getStorageSync("indexinput");
                "" != n ? a.setData({
                    input: n
                }) : a.setData({
                    input: ""
                });
            }
            wx.showLoading({
                title: "加载中..."
            });
            var l = i.globalData.uid, s = new e.default({
                contentType: !0,
                reqtype: "GET",
                id: l,
                path: o.default.CommodityDetails,
                data: {
                    userId: i.globalData.uid,
                    data: t
                }
            });
            s.then(function(t) {
                "goods" === t.hasVisit && (a.setData({
                    hasData: !0,
                    allData: t,
                    hasVisit: "goods"
                }), a.CloneData(), 0 == t.list.length && a.setData({
                    loading: !0,
                    loadingText: "暂无数据"
                }), wx.hideLoading()), 0 == i.globalData.has_phone && a.has_phone();
            }), s.catch(function(a) {
                console.log(a.msg);
            });
        }));
    },
    has_phone: function() {
        var a = this, t = new e.default({
            data: {
                uid: i.globalData.uid
            },
            path: o.default.has_phone
        });
        t.then(function(t) {
            a.setData({
                has_phone: t.msg.has_phone
            });
        }), t.catch(function(a) {
            console.log(a.msg);
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var a = this;
        i.globalData.index = !1, this.setData({
            "allData.list": "",
            page: 1,
            col1: [],
            col2: [],
            images: []
        }), n = 0, l = 0;
        var t = "";
        1 == i.globalData.index && (t = wx.getStorageSync("index")), wx.showLoading({
            title: "加载中..."
        });
        var s = i.globalData.uid, c = new e.default({
            contentType: !0,
            reqtype: "GET",
            id: s,
            path: o.default.CommodityDetails,
            data: {
                userId: i.globalData.uid,
                data: t
            }
        });
        c.then(function(t) {
            a.setData({
                hasData: !0,
                allData: t,
                hasVisit: "goods"
            }), a.CloneData(), 0 == t.list.length && a.setData({
                loading: !0,
                loadingText: "暂无数据"
            }), wx.hideLoading();
        }), c.catch(function(a) {
            console.log(a.msg);
        }), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        var a = this, n = this.data.page;
        n++, this.setData({
            page: n,
            loading: !0
        });
        var l = "";
        1 == i.globalData.index && (l = wx.getStorageSync("index"));
        var s = i.globalData.uid, c = new e.default({
            contentType: !0,
            reqtype: "GET",
            id: s,
            path: o.default.CommodityDetails,
            data: {
                userId: i.globalData.uid,
                page: this.data.page,
                data: l
            }
        });
        c.then(function(o) {
            if (0 == o.list.length) a.setData({
                loadingText: "暂无其他数据"
            }); else {
                var e = a.data.allData.list, i = e[e.length - 1].time, n = o.list[0].time;
                o.data = o.list, i === n && (e[e.length - 1].commodity = e[e.length - 1].commodity.concat(o.list[0].commodity), 
                o.data = o.list.slice(1)), o.data.forEach(function(a, t) {
                    e = e.concat(a);
                }), a.setData(t({}, "allData.list", e)), a.CloneData();
            }
        }), c.catch(function(a) {
            console.log(a);
        });
    },
    navigator: function(a) {
        var t = a.currentTarget.dataset.id;
        i.getUserInfo(this), i.globalData.index = !1, wx.setStorageSync("indexData", this.data), 
        wx.navigateTo({
            url: "../CommodityDetails/CommodityDetails?id=" + t + "&share=1&tab=true"
        });
    },
    navigator2: function(a) {
        var t = a.currentTarget.dataset.id;
        i.globalData.index = !1, wx.setStorageSync("indexData", this.data), wx.navigateTo({
            url: "../CommodityDetails/CommodityDetails?id=" + t + "&share=1&tab=false"
        });
    },
    search: function(a) {
        wx.setStorageSync("indexData", this.data), wx.navigateTo({
            url: "/pages/search/search?callPage=index"
        });
    },
    onShareAppMessage: function(a) {
        var t = a.target.dataset.id;
        return {
            path: "/pages/CommodityDetails/CommodityDetails?id=" + t + "&share=0&tab=true&pageId=" + i.globalData.uid,
            success: function(a) {
                var n = new e.default({
                    path: o.default.shopShare,
                    data: {
                        id: t,
                        userId: i.globalData.uid
                    }
                });
                n.then(function(a) {}), n.catch(function(a) {});
            },
            fail: function(a) {}
        };
    },
    comment: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../comment/comment?id=" + t
        });
    },
    onImageLoad: function(a) {
        for (var t = a.currentTarget.id, o = a.detail.width, e = a.detail.height * (155.5 / o), i = null, s = this.data.allData2.list, c = 0; c < s.length; c++) {
            var d = s[c];
            if (d.id === t) {
                i = d;
                break;
            }
        }
        var u = this.data.col1, h = this.data.col2;
        n <= l ? (n += e, u.push(i)) : (l += e, h.push(i)), this.setData({
            col1: u,
            col2: h
        });
    },
    tabBu: function(a) {
        0 == this.data.tabbu ? this.setData({
            tabbu: 1
        }) : this.setData({
            tabbu: 0
        });
    },
    Fabulous: function(a) {
        var n = this, l = a.currentTarget.dataset.id;
        if ("true" === a.currentTarget.dataset.fab) wx.showModal({
            title: "提示",
            content: "是否取消点赞",
            success: function(a) {
                if (a.confirm) {
                    var s = new e.default({
                        path: o.default.shopFabulous,
                        data: {
                            fabulous: !1,
                            id: l,
                            userId: i.globalData.uid
                        }
                    });
                    s.then(function(a) {
                        1 == a.errcode ? (n.data.allData.list.forEach(function(a, o) {
                            a.commodity.forEach(function(a, e) {
                                a.id == l && n.setData(t({}, "allData.list[" + o + "].commodity[" + e + "].Fabulous", 0));
                            });
                        }), n.data.col1.forEach(function(a, o) {
                            a.id == l && n.setData(t({}, "col1[" + o + "].Fabulous", 0));
                        }), n.data.col2.forEach(function(a, o) {
                            a.id == l && n.setData(t({}, "col2[" + o + "].Fabulous", 0));
                        })) : wx.showToast({
                            title: "服务器响应失败",
                            icon: "none",
                            duration: 2e3
                        });
                    }), s.catch(function(a) {});
                } else a.cancel;
            }
        }); else {
            var s = new e.default({
                path: o.default.shopFabulous,
                data: {
                    fabulous: !1,
                    id: l,
                    userId: i.globalData.uid
                }
            });
            s.then(function(a) {
                console.log(a), 1 == a.errcode ? (n.data.allData.list.forEach(function(a, o) {
                    a.commodity.forEach(function(a, e) {
                        a.id == l && n.setData(t({}, "allData.list[" + o + "].commodity[" + e + "].Fabulous", 1));
                    });
                }), n.data.col1.forEach(function(a, o) {
                    a.id == l && n.setData(t({}, "col1[" + o + "].Fabulous", 1));
                }), n.data.col2.forEach(function(a, o) {
                    a.id == l && n.setData(t({}, "col2[" + o + "].Fabulous", 1));
                })) : wx.showToast({
                    title: "服务器响应失败",
                    icon: "none",
                    duration: 2e3
                });
            }), s.catch(function(a) {});
        }
    },
    Collection: function(a) {
        var n = this, l = a.currentTarget.dataset.id;
        if ("true" === a.currentTarget.dataset.col) wx.showModal({
            title: "提示",
            content: "是否取消收藏",
            success: function(a) {
                if (a.confirm) {
                    var s = new e.default({
                        path: o.default.shopCollection,
                        data: {
                            collection: !1,
                            id: l,
                            userId: i.globalData.uid
                        }
                    });
                    s.then(function(a) {
                        1 == a.errcode ? (n.data.allData.list.forEach(function(a, o) {
                            a.commodity.forEach(function(a, e) {
                                a.id == l && n.setData(t({}, "allData.list[" + o + "].commodity[" + e + "].Collection", 0));
                            });
                        }), n.data.col1.forEach(function(a, o) {
                            a.id == l && n.setData(t({}, "col1[" + o + "].Collection", 0));
                        }), n.data.col2.forEach(function(a, o) {
                            a.id == l && n.setData(t({}, "col2[" + o + "].Collection", 0));
                        })) : wx.showToast({
                            title: "服务器响应失败",
                            icon: "none",
                            duration: 2e3
                        });
                    }), s.catch(function(a) {});
                } else a.cancel;
            }
        }); else {
            var s = new e.default({
                path: o.default.shopCollection,
                data: {
                    collection: !0,
                    id: l,
                    userId: i.globalData.uid
                }
            });
            s.then(function(a) {
                1 == a.errcode ? (n.data.allData.list.forEach(function(a, o) {
                    a.commodity.forEach(function(a, e) {
                        a.id == l && n.setData(t({}, "allData.list[" + o + "].commodity[" + e + "].Collection", 1));
                    });
                }), n.data.col1.forEach(function(a, o) {
                    a.id == l && n.setData(t({}, "col1[" + o + "].Collection", 1));
                }), n.data.col2.forEach(function(a, o) {
                    a.id == l && n.setData(t({}, "col2[" + o + "].Collection", 1));
                })) : wx.showToast({
                    title: "服务器响应失败",
                    icon: "none",
                    duration: 2e3
                });
            }), s.catch(function(a) {});
        }
    }
});