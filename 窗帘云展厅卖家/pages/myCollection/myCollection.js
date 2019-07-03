function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

t(require("../../libs/userLogin.js"));

var a = t(require("../../utils/interface.js")), e = t(require("../../libs/ajax.js")), o = getApp();

Page({
    data: {
        loading: !1,
        loadingText: "加载更多...",
        page: 1,
        checked: !1,
        clone: [],
        allC: !1,
        hide: !0,
        time: 60,
        noclone: !0,
        GET: !0,
        hall_num: "",
        yzm: "",
        all: 0
    },
    searchScrollLower: function() {
        var t = this, n = this.data.page;
        n++, this.setData({
            page: n,
            loading: !0
        });
        var l = new e.default({
            reqtype: "GET",
            path: a.default.myCollection,
            data: {
                userId: o.globalData.uid,
                page: this.data.page,
                checked: this.data.checked,
                noclone: this.data.noclone
            }
        });
        l.then(function(a) {
            for (var e = t.data.data, o = 0; o < a.data.collection.length; o++) {
                var n = a.data.collection[o].price.toFixed(2);
                a.data.collection[o].price = n.split("."), 1 == t.data.all && (a.data.collection[o].checked = !0, 
                1 == a.data.collection[o].is_clone && (a.data.collection[o].checked = !1)), 0 == t.data.all && (a.data.collection[o].checked = !1), 
                1 == t.data.noclone && (a.data.collection[o].display = "flex"), 0 == t.data.noclone && 1 == a.data.collection[o].is_clone && (a.data.collection[o].display = "none"), 
                e.collection.push(a.data.collection[o]), t.setData({
                    data: e
                });
            }
        }), l.catch(function(t) {
            consoel.log(t);
        });
    },
    navigator: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/CommodityDetails/CommodityDetails?id=" + a + "&share=1"
        });
    },
    noclone: function(t) {
        var a = this.data.data.collection;
        1 == this.data.noclone ? (a.forEach(function(t) {
            1 == t.is_clone && (t.display = "none");
        }), this.setData({
            "data.collection": a,
            noclone: !1
        })) : (a.forEach(function(t) {
            1 == t.is_clone && (t.display = "flex");
        }), this.setData({
            "data.collection": a,
            noclone: !0
        }));
    },
    checkboxChange: function(t) {
        this.setData({
            clone: t.detail.value,
            all: 0,
            allC: !1,
            checked: !1
        });
    },
    itemChange: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.data.collection;
        1 == e[a].checked ? e[a].checked = !1 : e[a].checked = !0, this.setData({
            "data.collection": e,
            allC: !1,
            checked: !1
        });
    },
    all: function(t) {
        if (1 == t.detail.value.length) {
            var a = this.data.data.collection;
            a.forEach(function(t) {
                0 == t.is_clone ? t.checked = !0 : t.checked = !1;
            }), this.setData({
                "data.collection": a,
                allC: !0,
                all: 1,
                checked: !0
            });
        } else {
            var e = this.data.data.collection;
            e.forEach(function(t, a) {
                1 == t.checked && (t.checked = !1);
            }), this.setData({
                "data.collection": e,
                allC: !1,
                all: 0,
                checked: !1
            });
        }
    },
    hide: function(t) {
        console.log(this.data.clone.length + " " + this.data.all), 0 != this.data.clone.length || 1 == this.data.all ? this.setData({
            hide: !1
        }) : wx.showToast({
            title: "请选择要克隆的商品",
            icon: "none"
        });
    },
    open: function(t) {
        this.setData({
            hide: !0
        });
    },
    input: function(t) {
        this.setData({
            hall_num: t.detail.value
        });
    },
    yzm: function(t) {
        this.setData({
            yzm: t.detail.value
        });
    },
    getYZM: function(t) {
        var o = this;
        if ("" == this.data.hall_num) wx.showToast({
            title: "请输入展厅号",
            icon: "none"
        }); else {
            wx.setStorageSync("hall_num", this.data.hall_num);
            this.data.time;
            var n = new e.default({
                reqtype: "GET",
                path: a.default.postMess,
                data: {
                    hall_num: this.data.hall_num
                }
            });
            n.then(function(t) {
                var a = o.data.time;
                if (0 == t.errcode) wx.showToast({
                    title: t.msg,
                    icon: "none"
                }); else {
                    o.setData({
                        time: a,
                        GET: !1
                    });
                    var e = o, n = setInterval(function() {
                        a -= 1, e.setData({
                            time: a
                        }), a <= 0 && (e.setData({
                            time: 60,
                            GET: !0
                        }), clearInterval(n));
                    }, 1e3);
                }
            }), n.catch(function(t) {
                console.log(t), wx.showToast({
                    title: "获取失败"
                });
            });
        }
    },
    getClone: function(t) {
        var n = this;
        if ("" != this.data.hall_num) if ("" != this.data.yzm) {
            var l = new e.default({
                reqtype: "GET",
                path: a.default.Ymess,
                data: {
                    hall_num: this.data.hall_num,
                    phone_code: this.data.yzm
                }
            });
            l.then(function(t) {
                wx.setStorageSync("ZTnumber", n.data.hall_num);
                var l = n;
                if (1 == t.errcode) {
                    wx.showLoading({
                        title: "克隆中，请稍后"
                    });
                    var c = new e.default({
                        reqtype: "GET",
                        path: a.default.clone,
                        data: {
                            all: l.data.all,
                            user_id: o.globalData.uid,
                            goods_ids: l.data.clone,
                            shop_id: t.data.shop_id
                        }
                    });
                    c.then(function(t) {
                        1 == t.errcode && wx.showToast({
                            title: t.msg,
                            icon: "none"
                        }), n.setData({
                            hide: !0
                        }), wx.showLoading({
                            title: "数据重载中"
                        });
                        var l = new e.default({
                            reqtype: "GET",
                            path: a.default.myCollection,
                            data: {
                                userId: o.globalData.uid,
                                checked: !1,
                                noclone: n.data.noclone
                            }
                        });
                        l.then(function(t) {
                            for (var a = 0; a <= t.data.collection.length - 1; a++) {
                                var e = t.data.collection[a].price.toFixed(2);
                                t.data.collection[a].price = e.split("."), "false" === t.data.collection[a].checked && (t.data.collection[a].checked = !1), 
                                "true" === t.data.collection[a].checked && (t.data.collection[a].checked = !0);
                            }
                            n.setData({
                                data: t.data
                            }), wx.hideLoading();
                        }), l.catch(function(t) {
                            console.log(t);
                        });
                    }), c.catch(function(t) {
                        console.log(t);
                    });
                } else wx.showToast({
                    title: t.msg,
                    icon: "none",
                    duration: 3e3
                });
            }), l.catch(function(t) {
                wx.hideLoading(), wx.showToast({
                    title: "获取失败"
                });
            });
        } else wx.showToast({
            title: "请输入验证码",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "请输入展厅号",
            icon: "none",
            duration: 2e3
        });
    },
    onLoad: function(t) {
        var n = this;
        wx.hideShareMenu(), console.log(o.globalData.uid), wx.showLoading({
            title: "加载中..."
        });
        var l = new e.default({
            reqtype: "GET",
            path: a.default.myCollection,
            data: {
                userId: o.globalData.uid,
                checked: !1,
                noclone: this.data.noclone
            }
        });
        l.then(function(t) {
            for (var a = 0; a <= t.data.collection.length - 1; a++) {
                var e = t.data.collection[a].price.toFixed(2);
                t.data.collection[a].price = e.split("."), "false" === t.data.collection[a].checked && (t.data.collection[a].checked = !1), 
                "true" === t.data.collection[a].checked && (t.data.collection[a].checked = !0), 
                "false" === t.data.collection[a].noclone && (t.data.collection[a].noclone = !1), 
                "true" === t.data.collection[a].noclone && (t.data.collection[a].noclone = !0);
            }
            n.setData({
                data: t.data
            }), wx.hideLoading();
        }), l.catch(function(t) {
            console.log(t);
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = wx.getStorageSync("ZTnumber");
        wx.showToast({
            title: wx.getStorageInfoSync("ZTnumber")
        }), void 0 == t && (t = ""), null == t && (t = ""), this.setData({
            hall_num: t
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});