var t = getApp();

Page({
    data: {
        ShopCarts: null,
        isEdite: !1,
        TotalPrice: 0,
        EditeText: "编辑",
        selectAllStatus: !1,
        SelectskuId: [],
        SettlementText: "结算",
        isEmpty: !1,
        shopSelectAll: [],
        RequestUrl: t.getRequestUrl,
        backShow: "none",
        SkuShow: "none",
        CurrentObj: []
    },
    onLoad: function(t) {},
    loadData: function(e) {
        wx.showLoading({
            title: "正在加载"
        });
        parseFloat(0);
        t.getOpenId(function(a) {
            wx.request({
                url: t.getUrl("GetCartProduct"),
                header: {
                    "content-type": "application/x-www-form-urlencoded",
                    Cookie: wx.getStorageSync("Cookie")
                },
                data: {
                    openId: a
                },
                success: function(a) {
                    if ("OK" == a.data.Status) {
                        var r = a.data.Data;
                        for (var o in r) r[o].shopSelect = !1;
                        var n = null == r || r.length <= 0 || r.RecordCount <= 0;
                        e.setData({
                            isEmpty: n,
                            ShopCarts: r,
                            TotalPrice: 0,
                            shopSelectAll: [],
                            selectAllStatus: !1
                        });
                    } else "NOUser" == a.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : t.showErrorModal(a.data.Message, function(t) {
                        t.confirm && wx.navigateBack({
                            delta: 1
                        });
                    });
                },
                complete: function() {
                    wx.hideLoading();
                }
            });
        });
    },
    selectList: function(t) {
        var e = this, a = t.currentTarget.dataset, r = e.data.SelectskuId, o = !1;
        o = !e.data.ShopCarts[a.idx].selected, e.data.ShopCarts[a.idx].selected = o;
        var n = r.indexOf(a.skuid);
        o && n < 0 ? r.push(a.skuid) : !o && n >= 0 && r.splice(n, 1);
        var i = !0;
        for (var s in e.data.ShopCarts) e.data.ShopCarts[s].selected || (i = !1);
        e.setData({
            ShopCarts: e.data.ShopCarts,
            SelectskuId: r,
            selectAllStatus: i,
            shopSelectAll: e.data.shopSelectAll
        }), e.GetTotal();
    },
    GetTotal: function() {
        var t = parseFloat(0), e = this, a = e.data.ShopCarts;
        for (var r in a) {
            var o = a[r];
            o.selected && (t = parseFloat(o.price * o.num) + parseFloat(t));
        }
        e.setData({
            TotalPrice: t.toFixed(2)
        });
    },
    selectAll: function() {
        var t = this, e = [], a = !t.data.selectAllStatus, r = t.data.ShopCarts, o = [];
        for (var n in r) {
            var i = r[n];
            i.selected = a, a && e.push(i.id);
        }
        t.setData({
            ShopCarts: r,
            selectAllStatus: a,
            SelectskuId: e,
            shopSelectAll: o
        }), t.GetTotal();
    },
    SwitchEdite: function() {
        var t = this;
        "编辑" == t.data.EditeText ? t.setData({
            isEdite: !0,
            EditeText: "完成",
            SettlementText: "删除",
            DelskuId: ""
        }) : t.setData({
            isEdite: !1,
            EditeText: "编辑",
            DelskuId: "",
            SettlementText: "结算"
        });
    },
    countNum: function(t) {
        var e = this, a = t.currentTarget.dataset, r = e.data.ShopCarts[a.idx], o = parseInt(r.num);
        if ("minus" == a.dotype) {
            if (o <= 1) return;
            e.ChangeQuantiy(e, o - 1, r.id);
        } else e.ChangeQuantiy(e, o + 1, r.id);
    },
    bindblurNum: function(t) {
        var e = this, a = t.currentTarget.dataset, r = e.data.ShopCarts[a.idx], o = parseInt(r.num), n = parseInt(t.detail.value);
        (isNaN(n) || n < 1) && (n = 1), n != o && e.ChangeQuantiy(e, n, r.id);
    },
    DelCarts: function(e) {
        var a = this, r = e.currentTarget.dataset.skuid, o = a.data.SelectskuId;
        "" != r && t.getOpenId(function(e) {
            wx.request({
                url: t.getUrl("GetDelCartItem"),
                header: {
                    "content-type": "application/x-www-form-urlencoded",
                    Cookie: wx.getStorageSync("Cookie")
                },
                data: {
                    openId: e,
                    SkuIds: r
                },
                success: function(e) {
                    if ("OK" == e.data.Status) {
                        var n = o.indexOf(r);
                        n >= 0 && o.splice(n, 1), a.setData({
                            SelectskuId: o
                        });
                    } else "NOUser" == e.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : t.showErrorModal(e.data.Message);
                },
                complete: function() {
                    a.loadData(a);
                }
            });
        });
    },
    SettlementShopCart: function() {
        var e = this, a = e.data.SelectskuId.join(",");
        e.data.ShopCarts, e.data.SelectskuId;
        if (e.data.isEdite) {
            if (a <= 0) return void t.showErrorModal("请选择要删除的商品");
            t.getOpenId(function(r) {
                wx.request({
                    url: t.getUrl("GetDelCartItem"),
                    header: {
                        "content-type": "application/x-www-form-urlencoded",
                        Cookie: wx.getStorageSync("Cookie")
                    },
                    data: {
                        openId: r,
                        SkuIds: a
                    },
                    success: function(a) {
                        "OK" == a.data.Status ? e.setData({
                            SelectskuId: [],
                            selectAllStatus: !1
                        }) : "NOUser" == a.data.Message ? wx.navigateTo({
                            url: "../login/login"
                        }) : t.showErrorModal(a.data.Message);
                    },
                    complete: function() {
                        e.loadData(e);
                    }
                });
            });
        } else {
            if (a <= 0) return void t.showErrorModal("请选择要结算的商品");
            var r = e.data.SelectskuId;
            wx.navigateTo({
                url: "../submitorder/submitorder?frompage=0&cartItemIds=" + r.join(",")
            });
        }
    },
    ChangeQuantiy: function(e, a, r) {
        t.getOpenId(function(o) {
            wx.request({
                url: t.getUrl("GetUpdateToCart"),
                header: {
                    "content-type": "application/x-www-form-urlencoded",
                    Cookie: wx.getStorageSync("Cookie")
                },
                data: {
                    openId: o,
                    SkuID: r,
                    Quantity: a
                },
                success: function(a) {
                    "OK" == a.data.Status ? e.loadData(e) : "NOUser" == a.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : t.showErrorModal(a.data.Message);
                },
                complete: function() {}
            });
        });
    },
    goToProductDetail: function(t) {
        var e = this, a = t.currentTarget.dataset.productid;
        e.data.isEdite || wx.navigateTo({
            url: "../productdetail/productdetail?id=" + a
        });
    },
    clickback: function(t) {
        this.setData({
            backShow: "none",
            SkuShow: "none"
        });
    },
    clickSku: function(e) {
        var a = e.currentTarget.dataset.skuid, r = this.data.ShopCarts[a], o = this;
        t.getOpenId(function(e) {
            wx.request({
                url: t.getUrl("GetCartGoodsAttr"),
                header: {
                    "content-type": "application/x-www-form-urlencoded",
                    Cookie: wx.getStorageSync("Cookie")
                },
                data: {
                    openId: e,
                    SkuID: a
                },
                success: function(e) {
                    if ("OK" == e.data.Status) {
                        var a = e.data.Data;
                        for (var n in a.attr) for (var i in r.paramJson) a.attr[n].id == r.paramJson[i].id && (a.attr[n].Selected = r.paramJson[i].value);
                        r.type = a, r.calc_price = r.price;
                        for (var n in r.paramJson) 0 == r.paramJson[n].id && (r.remark = r.paramJson[n].value);
                        o.setData({
                            backShow: "",
                            SkuShow: "",
                            CurrentObj: r
                        });
                    } else "NOUser" == e.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : t.showErrorModal(e.data.Message);
                },
                complete: function() {}
            });
        });
    },
    changeAttrInput: function(t) {
        var e = this, a = t.detail.value, r = parseInt(t.currentTarget.dataset.id), o = e.data.CurrentObj, n = 1, i = [];
        for (var s in o.type.attr) o.type.attr[s].id == r && (o.type.attr[s].Selected = a), 
        1 == o.type.attr[s].calc && i.push(o.type.attr[s].id);
        if (1 == o.type.rectify) {
            var d = 1;
            for (var s in o.type.attr) 1 == o.type.attr[s].square && (d *= o.type.attr[s].Selected ? o.type.attr[s].Selected : 1, 
            (c = i.indexOf(o.type.attr[s].id)) > -1 && i.splice(c, 1));
            n *= Math.ceil(d);
        }
        if (1 == o.type.height_float) {
            var l = 1;
            for (var s in o.type.attr) if (1 == o.type.attr[s].height) {
                o.type.attr[s].Selected < o.type.height_min_mi && (l = o.type.height_min_discount / 100), 
                o.type.attr[s].Selected > o.type.height_max_mi && (l = (100 + (o.type.attr[s].Selected - o.type.height_max_mi) / o.type.height_mi_per * o.type.height_max_discount) / 100);
                var c = i.indexOf(o.type.attr[s].id);
                c > -1 && i.splice(c, 1);
            }
            n *= l;
        }
        if (1 == o.type.meter) for (var s in o.type.attr) 1 == o.type.attr[s].meter && o.type.attr[s].Selected < o.type.meter_min && (type.attr[s].Selected = o.type.meter_min);
        for (var s in o.type.attr) for (var u in i) i[u] == o.type.attr[s].id && (n *= o.type.attr[s].Selected ? o.type.attr[s].Selected : 1);
        o.calc_price = (o.sell_price * n).toFixed(2), e.setData({
            CurrentObj: o
        });
    },
    onAttrClick: function(t) {
        var e = this, a = parseInt(t.currentTarget.dataset.id), r = t.currentTarget.dataset.name, o = e.data.CurrentObj;
        for (var n in o.type.attr) o.type.attr[n].id == a && (o.type.attr[n].Selected = r);
        e.setData({
            CurrentObj: o
        });
    },
    changeParam: function(e) {
        var a = this, r = a.data.CurrentObj;
        for (var o in r.type.attr) if (void 0 == r.type.attr[o].Selected || "" == r.type.attr[o].Selected) return void t.showErrorModal("请" + (3 == r.type.attr[o].show_type ? "输入" : "选择") + r.type.attr[o].name);
        var n = [];
        for (var o in r.type.attr) n.push({
            id: r.type.attr[o].id,
            name: r.type.attr[o].name,
            value: r.type.attr[o].Selected
        });
        n.push({
            id: 0,
            name: "买家备注",
            value: r.remark
        });
        var i = e.currentTarget.dataset.skuid, s = encodeURIComponent(JSON.stringify(n));
        t.getOpenId(function(e) {
            wx.request({
                url: t.getUrl("UpdateCartGoodsAttr"),
                header: {
                    "content-type": "application/x-www-form-urlencoded",
                    Cookie: wx.getStorageSync("Cookie")
                },
                data: {
                    openId: e,
                    SkuID: i,
                    param: s
                },
                success: function(e) {
                    "OK" == e.data.Status ? (a.loadData(a), a.clickback()) : "NOUser" == e.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : t.showErrorModal(e.data.Message);
                },
                complete: function() {}
            });
        });
    },
    changeRemarkInput: function(t) {
        var e = t.detail.value, a = this.data.CurrentObj;
        a.remark = e, this.setData({
            CurrentObj: a
        });
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            ShopCarts: null,
            isEdite: !1,
            TotalPrice: 0,
            EditeText: "编辑",
            selectAllStatus: !1,
            SelectskuId: [],
            SettlementText: "结算",
            isEmpty: !1
        }), this.loadData(this);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});