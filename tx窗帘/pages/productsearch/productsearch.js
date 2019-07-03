function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a, e = getApp();

Page((a = {
    data: {
        Css: {
            LHeight: 0,
            FirstIndex: 0,
            SecondIndex: 0,
            SortIndex: 1
        },
        CategoryList: [],
        CurrentCategory: null,
        ProductList: null,
        CurrentProduct: null,
        CurrentSku: null,
        Cid: 0,
        SortBy: "",
        SortOrder: "asc",
        KeyWord: "",
        PageIndex: 1,
        PageSize: 10,
        Num: 0,
        SortClass: "",
        isShow: !0,
        selectedskuList: [],
        buyAmount: 1,
        selectedSku: "",
        SkuItemList: null
    },
    onLoad: function(t) {
        var a = this;
        a.loadCategory(a), a.loadData(a, !1);
    },
    loadCategory: function(t) {
        e.getOpenId(function(a) {
            wx.request({
                url: e.getUrl(e.globalData.getAllCategories),
                data: {},
                success: function(a) {
                    if ("OK" == a.data.Status) {
                        var r = a.data.Data;
                        t.setData({
                            CategoryList: r,
                            CurrentCategory: r[0]
                        });
                    } else "NOUser" == a.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : e.showErrorModal(a.data.Message, function(t) {
                        t.confirm && wx.navigateBack({
                            delta: 1
                        });
                    });
                }
            });
        });
    },
    BuyProduct: function(t) {
        var a = this, r = t.currentTarget.dataset.index, u = t.currentTarget.dataset.sku, n = t.currentTarget.dataset.productid, s = a.data.ProductList;
        0 == u ? s[r].CartQuantity = 1 : wx.request({
            url: e.getUrl(e.globalData.getProductSkus),
            data: {
                ProductId: n
            },
            success: function(t) {
                if ("OK" == t.data.Status) {
                    var e = t.data.Data;
                    a.setData({
                        CurrentProduct: e,
                        CurrentSku: e.DefaultSku
                    });
                }
            }
        }), a.setData({
            isShow: !1,
            ProductList: s
        });
    },
    minusCount: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.ProductList, r = e[a].CartQuantity;
        e[a].CartQuantity = r <= 1 ? 1 : r - 1, this.setData({
            ProductList: e
        });
    },
    addCount: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.ProductList, r = e[a].CartQuantity;
        e[a].CartQuantity = r + 1, this.setData({
            ProductList: e
        });
    },
    onSkuHide: function(t) {
        that.setData({
            isShow: !0
        });
    },
    onSkuClick: function(t) {
        var a = t.target.dataset.indexcount, e = t.target.id, r = t.target.dataset.skuvalue, u = new Object();
        u.ValueId = e, u.Value = r;
        var n = this.data.selectedskuList;
        n[a] = u;
        var s = "", d = this.data.CurrentProduct, o = this.data.CurrentProduct.SkuItems;
        d.SkuItems.length, n.length;
        for (var i = d.ProductId, c = 0; c < n.length; c++) {
            var l = n[c];
            void 0 != l && (s += "" == s ? l.Value : "," + l.Value, i += "_" + l.ValueId);
        }
        for (var g = 0; g < d.SkuItems[a].AttributeValue.length; g++) d.SkuItems[a].AttributeValue[g].ValueId == e ? d.SkuItems[a].AttributeValue[g].UseAttributeImage = "selected" : d.SkuItems[a].AttributeValue[g].UseAttributeImage = "False";
        var h = null;
        this.data.CurrentProduct.Skus.find(function(t, a) {
            i != t.SkuId || (h = t);
        }), this.setData({
            selectedskuList: n,
            selectedSku: i,
            selectedSkuContent: s,
            SkuItemList: o,
            CurrentProduct: d
        }), null != h && this.setData({
            CurrentSku: h
        });
    },
    changeAmount: function(t) {
        var a = parseInt(t.detail.value), r = this.data.CurrentSkuStock;
        isNaN(a) || a > r || a <= 0 ? e.showErrorModal("请输入正确的数量,不能大于库存或者小于等于0") : this.setData({
            buyAmount: a
        });
    },
    reduceAmount: function(t) {
        var a = this.data.buyAmount;
        (a -= 1) <= 0 || this.setData({
            buyAmount: a
        });
    },
    addAmount: function(t) {
        var a = this.data.buyAmount;
        (a += 1) > this.data.CurrentSku.Stock || this.setData({
            buyAmount: a
        });
    },
    loadData: function(t, a) {
        wx.showNavigationBarLoading(), e.getOpenId(function(r) {
            wx.request({
                url: e.getUrl(e.globalData.getProducts),
                data: {
                    openId: r,
                    keyword: t.data.KeyWord,
                    pageIndex: t.data.PageIndex,
                    pageSize: t.data.PageSize,
                    sortBy: t.data.SortBy,
                    sortOrder: t.data.SortOrder,
                    cId: t.data.Cid
                },
                success: function(r) {
                    if ("OK" == r.data.Status) {
                        var u = r.data.Data;
                        if (a) {
                            var n = t.data.ProductList;
                            n.push.apply(n, u), t.setData({
                                ProductList: n
                            });
                        } else t.setData({
                            ProductList: u
                        });
                        wx.hideNavigationBarLoading();
                    } else "NOUser" == r.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : e.showErrorModal(r.data.Message, function(t) {
                        t.confirm && wx.navigateBack({
                            delta: 1
                        });
                    });
                },
                complete: function() {
                    wx.getSystemInfo({
                        success: function(a) {
                            var e = a.windowHeight - 53, r = t.data.Css;
                            r.LHeight = e, t.setData({
                                CSS: r
                            });
                        }
                    });
                }
            });
        });
    },
    commitBuy: function(t) {
        for (var a = this, r = !0, u = 0; u < a.data.selectedskuList.length; u++) if (void 0 == this.data.selectedskuList[u] || "" == a.data.selectedskuList[u] || null == this.data.selectedskuList[u]) {
            r = !1;
            break;
        }
        if (null != this.data.SkuItemList && a.data.selectedskuList.length == this.data.SkuItemList.length && r) if (a.data.buyAmount <= 0) e.showErrorModal("请输入要购买的数量"); else {
            var n = this.data.buyAmount, s = (this.data.selectedSku, this.data.ProductList);
            s.find(function(t, e) {
                t.ProductId != a.data.CurrentProduct.ProductId || (t.CartQuantity += n);
            }), this.setData({
                ProductList: s
            }), a.onSkuHide(t);
        } else e.showErrorModal("请选择规格");
    }
}, t(a, "onSkuHide", function(t) {
    this.setData({
        isShow: !0,
        CurrentSku: null,
        CurrentProduct: null,
        selectedSku: "",
        buyAmount: 1
    });
}), t(a, "ChooseCategory", function(t) {
    var a = this, e = t.currentTarget.dataset.cid, r = t.currentTarget.dataset.grade, u = t.currentTarget.dataset.index, n = a.data.Css;
    "1" == r ? a.data.CategoryList.find(function(t, r) {
        n.FirstIndex = u, n.SecondIndex = 0, t.cid == e && a.setData({
            CurrentCategory: t,
            Css: n,
            Cid: e
        });
    }) : (n.SecondIndex = u, a.setData({
        Css: n,
        Cid: e
    })), a.loadData(a, !1);
}), t(a, "SortClick", function(t) {
    var a = this, e = t.currentTarget.dataset.sortby, r = t.currentTarget.dataset.index, u = a.data.Css;
    u.SortIndex = r;
    var n = "asc", s = "shengxu";
    a.data.SortOrder == n && (n = "desc", s = "jiangxu"), a.setData({
        PageIndex: 1,
        SortBy: e,
        SortOrder: n,
        SortClass: s,
        Css: u
    }), a.loadData(a, !1);
}), t(a, "ChooseProduct", function(t) {
    var a = t.currentTarget.dataset.productId;
    wx.navigateTo({
        url: "../productdetail/productdetail?id=" + a
    });
}), t(a, "onReachBottom", function() {
    var t = this, a = t.data.PageIndex + 1;
    t.setData({
        PageIndex: a
    }), t.loadData(t, !0);
}), t(a, "onReady", function() {}), t(a, "onShow", function() {}), t(a, "onHide", function() {}), 
t(a, "onUnload", function() {}), t(a, "onPullDownRefresh", function() {}), t(a, "onReachBottom", function() {}), 
t(a, "onShareAppMessage", function() {}), a));