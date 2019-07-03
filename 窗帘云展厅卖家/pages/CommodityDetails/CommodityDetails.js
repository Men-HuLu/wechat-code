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
        imgUrls: [],
        indicatorDots: !0,
        autoplay: !1,
        interval: 5e3,
        duration: 1e3,
        nowData: "",
        share: 0,
        tab: !0,
        loading: !0,
        loadingText: "加载更多...",
        pageId: "",
        page: 1,
        page2: 1
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
    photoChange: function(a) {
        var t = a.currentTarget.dataset.id;
        o.tackphoto(t);
    },
    onLoad: function(a) {
        var t = this, i = this;
        o.globalData.scene;
        wx.hideShareMenu();
        var s = a.id, d = a.pageId;
        void 0 == s && (s = a.scene, i.setData({
            share: 0
        })), "1" === a.share ? i.setData({
            share: 1
        }) : i.setData({
            share: 0
        }), void 0 == d ? this.setData({
            pageId: ""
        }) : this.setData({
            pageId: d
        }), o.login(this, o, function() {
            if (t.setData({
                id: s
            }), t.data.pageId == o.globalData.uid && t.setData({
                share: 1
            }), "false" === a.tab) {
                t.setData({
                    tab: !1
                }), wx.showLoading({
                    title: "加载中"
                });
                var i = {
                    id: s,
                    userId: o.globalData.uid
                }, d = new n.default({
                    reqtype: "GET",
                    path: e.default.shopDetailComment,
                    data: i
                });
                d.then(function(a) {
                    a.data.length <= 8 && t.setData({
                        loadingText: "暂无其它数据"
                    }), 0 == a.data.length && t.setData({
                        loadingText: "暂无数据"
                    }), t.setData({
                        userComment: a
                    }), console.log("评论页", t.data.userComment), wx.hideLoading();
                }), d.catch(function(a) {
                    console.log(a);
                });
            } else {
                wx.showLoading({
                    title: "加载中..."
                });
                var l = new n.default({
                    reqtype: "GET",
                    path: e.default.details,
                    data: {
                        id: s,
                        userId: o.globalData.uid
                    }
                });
                l.then(function(a) {
                    0 != a.errcode ? (a.data.money = "¥" + a.data.money, t.setData({
                        nowData: a.data,
                        imgUrls: a.data.headImg
                    }), wx.hideLoading()) : wx.showToast({
                        title: a.msg,
                        icon: "none"
                    });
                }), l.catch(function(a) {
                    console.log(a);
                });
            }
            0 == o.globalData.has_phone ? t.has_phone() : t.setData({
                has_phone: !0
            });
        });
    },
    tabShop: function(a) {
        var t = this;
        this.setData({
            tab: !0,
            id: this.data.id,
            share: this.data.share
        }), wx.showLoading({
            title: "加载中..."
        });
        var i = new n.default({
            reqtype: "GET",
            path: e.default.details,
            data: {
                id: this.data.id,
                userId: o.globalData.uid
            }
        });
        i.then(function(a) {
            a.data.money = "¥" + a.data.money, console.log(a), t.setData({
                nowData: a.data,
                imgUrls: a.data.headImg
            }), wx.hideLoading();
        }), i.catch(function(a) {
            console.log(a);
        });
    },
    tabComment: function(a) {
        var t = this;
        this.setData({
            tab: !1
        }), wx.showLoading({
            title: "加载中"
        });
        var o = {
            id: this.data.id
        }, i = new n.default({
            reqtype: "GET",
            path: e.default.shopDetailComment,
            data: o
        });
        i.then(function(a) {
            a.data.length <= 8 && t.setData({
                loadingText: "暂无其它数据"
            }), 0 == a.data.length && t.setData({
                loadingText: "暂无数据"
            }), t.setData({
                userComment: a
            }), console.log("评论页", t.data.userComment), wx.hideLoading();
        }), i.catch(function(a) {
            console.log(a);
        });
    },
    navComment: function(a) {
        o.getUserInfo(), wx.navigateTo({
            url: "/pages/commentSubmit/commentSubmit?id=" + this.data.id + "&share=" + this.data.share
        });
    },
    Fabulous: function(a) {
        var t = this;
        a.currentTarget.dataset.id;
        if (1 == this.data.nowData.thu) wx.showModal({
            title: "提示",
            content: "是否取消点赞",
            success: function(a) {
                if (a.confirm) {
                    console.log(t.data);
                    var i = new n.default({
                        path: e.default.shopFabulous,
                        data: {
                            fabulous: !1,
                            id: t.data.id,
                            userId: o.globalData.uid
                        }
                    });
                    i.then(function(a) {
                        if (1 == a.errcode) {
                            var e = t.data.nowData;
                            e.thu = !1, t.setData({
                                nowData: e
                            });
                        } else wx.showToast({
                            title: "服务器响应失败",
                            icon: "none",
                            duration: 2e3
                        });
                    }), i.catch(function(a) {});
                } else a.cancel;
            }
        }); else {
            var i = new n.default({
                path: e.default.shopFabulous,
                data: {
                    fabulous: !1,
                    id: this.data.id,
                    userId: o.globalData.uid
                }
            });
            i.then(function(a) {
                if (console.log(a), 1 == a.errcode) {
                    var e = t.data.nowData;
                    e.thu = !0, t.setData({
                        nowData: e
                    });
                } else wx.showToast({
                    title: "服务器响应失败",
                    icon: "none",
                    duration: 2e3
                });
            }), i.catch(function(a) {});
        }
    },
    Collection: function(a) {
        var t = this;
        a.currentTarget.dataset.id;
        if (1 == this.data.nowData.col) wx.showModal({
            title: "提示",
            content: "是否取消收藏",
            success: function(a) {
                if (a.confirm) {
                    console.log(t.data);
                    var i = new n.default({
                        path: e.default.shopCollection,
                        data: {
                            collection: !1,
                            id: t.data.id,
                            userId: o.globalData.uid
                        }
                    });
                    i.then(function(a) {
                        if (1 == a.errcode) {
                            var e = t.data.nowData;
                            e.col = !1, t.setData({
                                nowData: e
                            });
                        } else wx.showToast({
                            title: "服务器响应失败",
                            icon: "none",
                            duration: 2e3
                        });
                    }), i.catch(function(a) {});
                } else a.cancel;
            }
        }); else {
            var i = new n.default({
                path: e.default.shopCollection,
                data: {
                    collection: !0,
                    id: this.data.id,
                    userId: o.globalData.uid
                }
            });
            i.then(function(a) {
                if (console.log(a), 1 == a.errcode) {
                    var e = t.data.nowData;
                    e.col = !0, t.setData({
                        nowData: e
                    });
                } else wx.showToast({
                    title: "服务器响应失败",
                    icon: "none",
                    duration: 2e3
                });
            }), i.catch(function(a) {});
        }
    },
    onShareAppMessage: function(a) {
        var t = this, i = a.target.dataset.id, s = this.data.pageId;
        return "" == s && (s = o.globalData.uid), {
            title: "商品详情",
            path: "/pages/CommodityDetails/CommodityDetails?id=" + i + "&share=0&tab=true&pageId=" + s,
            success: function(a) {
                var i = new n.default({
                    path: e.default.shopShare,
                    data: {
                        id: t.data.id,
                        userId: o.globalData.uid
                    }
                });
                i.then(function(a) {}), i.catch(function(a) {});
            },
            fail: function(a) {}
        };
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        var a = this;
        if (0 == this.data.tab) {
            var o = this.data.page2;
            o++, this.setData({
                page2: o,
                loading: !0
            });
            var i = {
                id: this.data.id,
                page: this.data.page2
            }, s = new n.default({
                reqtype: "GET",
                path: e.default.shopDetailComment,
                data: i
            });
            s.then(function(e) {
                a.setData(t({}, "userComment.data", a.data.userComment.data.concat(e.data))), e.data < 8 && a.setData({
                    loadingText: "暂无其它数据"
                });
            }), s.catch(function(a) {
                console.log(a);
            });
        }
    },
    previewImg: function(a) {
        var t = a.currentTarget.dataset.src, e = a.currentTarget.dataset.index;
        wx.previewImage({
            current: t,
            urls: this.data.userComment.data[e].commentImg
        });
    },
    previewImg2: function(a) {
        var t = a.currentTarget.dataset.src;
        a.currentTarget.dataset.index;
        wx.previewImage({
            current: t,
            urls: this.data.nowData.headImg
        });
    }
});