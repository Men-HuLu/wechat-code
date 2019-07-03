function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function t(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

a(require("../../libs/userLogin.js"));

var e = a(require("../../utils/interface.js")), n = a(require("../../libs/ajax.js")), o = getApp();

Page({
    data: {
        search: "",
        loading: !1,
        loadingText: "加载更多...",
        page: 1
    },
    UserInfoMask: function() {
        o.getUserInfo(this);
    },
    PhoneNumberMask: function(a) {
        o.getPhoneNumber(a, this);
    },
    has_phone: function() {
        var a = this, t = new n.default({
            data: {
                uid: o.globalData.uid
            },
            path: e.default.has_phone
        });
        t.then(function(t) {
            a.setData({
                has_phone: t.msg.has_phone
            });
        }), t.catch(function(a) {
            console.log(a.msg);
        });
    },
    searchScrollLower: function() {
        var a = this, s = this.data.page;
        s++, this.setData({
            page: s,
            loading: !0
        });
        var i = new n.default({
            reqtype: "GET",
            path: e.default.business,
            data: {
                userId: o.globalData.uid,
                search: this.data.search,
                page: this.data.page
            }
        });
        i.then(function(e) {
            a.setData(t({}, "data.business", a.data.data.business.concat(e.data.business))), 
            e.data.business.length < 8 && a.setData({
                loadingText: "暂无其它数据"
            });
        }), i.catch(function(a) {
            console.log(a);
        });
    },
    clear: function() {
        var a = this;
        this.setData({
            search: ""
        }), wx.showLoading({
            title: "加载中..."
        });
        var t = new n.default({
            reqtype: "GET",
            path: e.default.business,
            data: {
                userId: o.globalData.uid,
                search: this.data.search
            }
        });
        t.then(function(t) {
            console.log(t), a.setData({
                data: t.data
            }), wx.hideLoading();
        }), t.catch(function(a) {
            console.log(a);
        });
    },
    onLoad: function(a) {
        var t = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        }), o.login(this, o, function() {
            if (void 0 == a.shopId) {
                var s = new n.default({
                    reqtype: "GET",
                    path: e.default.business,
                    data: {
                        userId: o.globalData.uid,
                        search: t.data.search
                    }
                });
                s.then(function(a) {
                    t.setData({
                        data: a.data
                    }), wx.hideLoading();
                }), s.catch(function(a) {
                    console.log(a);
                });
            } else {
                t.setData({
                    id: a.shopId
                }), o.getUserInfo();
                var i = new n.default({
                    reqtype: "GET",
                    path: e.default.action,
                    data: {
                        userId: o.globalData.uid,
                        shopId: t.data.id
                    }
                });
                i.then(function(a) {
                    wx.hideLoading(), a.errcode < 0 && wx.showToast({
                        title: a.msg,
                        icon: "none",
                        duration: 3e3
                    });
                    var s = new n.default({
                        reqtype: "GET",
                        path: e.default.business,
                        data: {
                            userId: o.globalData.uid,
                            search: t.data.search
                        }
                    });
                    s.then(function(a) {
                        t.setData({
                            data: a.data
                        });
                    }), s.catch(function(a) {
                        console.log(a);
                    });
                }), i.catch(function(a) {
                    console.log(a);
                });
            }
            0 == o.globalData.has_phone ? t.has_phone() : t.setData({
                has_phone: !0
            });
        });
    },
    navigator: function(a) {
        o.getUserInfo();
        var t = a.currentTarget.dataset.id, s = new n.default({
            reqtype: "GET",
            path: e.default.quanxian,
            data: {
                uid: o.globalData.uid,
                id: t
            }
        });
        s.then(function(a) {
            0 == a.errcode ? wx.showToast({
                title: a.msg,
                icon: "none"
            }) : 1 == a.errcode && wx.navigateTo({
                url: "/pages/shop/shop?id=" + t
            });
        }), s.catch(function(a) {
            console.log(a);
        });
    },
    callPhone: function(a) {
        o.callPhone(a);
    },
    submit: function(a) {
        var t = this, s = a.detail.value;
        this.setData({
            search: s
        });
        var i = new n.default({
            reqtype: "GET",
            path: e.default.business,
            data: {
                userId: o.globalData.uid,
                search: this.data.search
            }
        });
        i.then(function(a) {
            console.log(a), t.setData({
                data: a.data
            });
        }), i.catch(function(a) {
            console.log(a);
        });
    },
    onShow: function() {
        o.globalData.nav[1].selected = !0, o.globalData.nav[0].selected = !1, o.globalData.nav[2].selected = !1, 
        o.globalData.nav[3].selected = !1;
    },
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    follow: function(a) {
        var s = this, i = a.currentTarget.dataset.id;
        wx.showModal({
            title: "提示",
            content: "是否取消关注",
            success: function(a) {
                if (a.confirm) {
                    var d = new n.default({
                        path: e.default.shopFollow,
                        data: {
                            id: i,
                            userId: o.globalData.uid
                        }
                    });
                    d.then(function(a) {
                        1 == a.errcode ? s.data.data.business.forEach(function(a, d) {
                            if (a.id == i) {
                                s.setData(t({}, "data.business[" + d + "].follow", !1));
                                var c = new n.default({
                                    reqtype: "GET",
                                    path: e.default.business,
                                    data: {
                                        userId: o.globalData.uid,
                                        search: s.data.search
                                    }
                                });
                                c.then(function(a) {
                                    s.setData({
                                        data: a.data
                                    });
                                }), c.catch(function(a) {
                                    console.log(a);
                                });
                            }
                        }) : wx.showToast({
                            title: a.msg,
                            icon: "none",
                            duration: 2e3
                        });
                    }), d.catch(function(a) {});
                } else a.cancel;
            }
        });
    },
    top: function(a) {
        var s = this, i = a.currentTarget.dataset.id;
        if (console.log(a.currentTarget.dataset.top), 1 == a.currentTarget.dataset.top) wx.showModal({
            title: "提示",
            content: "是否取消置顶",
            success: function(a) {
                if (a.confirm) {
                    var d = new n.default({
                        path: e.default.shopTop,
                        data: {
                            id: i,
                            userId: o.globalData.uid
                        }
                    });
                    d.then(function(a) {
                        1 == a.errcode ? s.data.data.business.forEach(function(a, d) {
                            if (a.id == i) {
                                s.setData(t({}, "data.business[" + d + "].top", !1));
                                var c = new n.default({
                                    reqtype: "GET",
                                    path: e.default.business,
                                    data: {
                                        userId: o.globalData.uid,
                                        search: s.data.search
                                    }
                                });
                                c.then(function(a) {
                                    s.setData({
                                        data: a.data
                                    });
                                }), c.catch(function(a) {
                                    console.log(a);
                                });
                            }
                        }) : wx.showToast({
                            title: a.msg,
                            icon: "none",
                            duration: 2e3
                        });
                    }), d.catch(function(a) {});
                } else a.cancel;
            }
        }); else {
            var d = new n.default({
                path: e.default.shopTop,
                data: {
                    id: i,
                    userId: o.globalData.uid
                }
            });
            d.then(function(a) {
                1 == a.errcode ? s.data.data.business.forEach(function(a, d) {
                    if (a.id == i) {
                        s.setData(t({}, "data.business[" + d + "].top", !0));
                        var c = new n.default({
                            reqtype: "GET",
                            path: e.default.business,
                            data: {
                                userId: o.globalData.uid,
                                search: s.data.search
                            }
                        });
                        c.then(function(a) {
                            s.setData({
                                data: a.data
                            });
                        }), c.catch(function(a) {
                            console.log(a);
                        });
                    }
                }) : wx.showToast({
                    title: a.msg,
                    icon: "none",
                    duration: 2e3
                });
            }), d.catch(function(a) {});
        }
    }
});