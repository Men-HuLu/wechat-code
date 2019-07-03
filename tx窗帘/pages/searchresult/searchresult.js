var t = getApp();

Page({
    data: {
        ProductList: null,
        SortBy: "",
        SortOrder: "asc",
        KeyWord: "",
        CategoryId: "",
        PageIndex: 1,
        PageSize: 10,
        Num: 0,
        SortClass: "",
        CurrentProduct: null,
        CurrentSku: null,
        selectedSkuContent: null,
        isShowSkuSelectBox: !1,
        index: 0,
        TotalNum: 0,
        RequestUrl: t.getRequestUrl
    },
    onLoad: function(t) {
        var a = wx.getStorageSync("keyword");
        void 0 == a && (a = "");
        var e = t.cid;
        void 0 == e && (e = "");
        var r = this;
        r.setData({
            KeyWord: a,
            CategoryId: e
        }), r.loadData(r, !1);
    },
    onReady: function() {},
    onShow: function() {
        this.GetShopCart();
    },
    onHide: function() {},
    onUnload: function() {},
    onSearch: function(t) {
        var a = this;
        a.setData({
            PageIndex: 1
        }), a.loadData(a, !1);
    },
    onReachBottom: function() {
        var t = this, a = t.data.PageIndex + 1;
        t.setData({
            PageIndex: a
        }), t.loadData(t, !0);
    },
    bindKeyWordInput: function(t) {
        this.setData({
            KeyWord: t.detail.value
        });
    },
    onConfirmSearch: function(t) {
        var a = this, e = t.detail.value;
        a.setData({
            KeyWord: e,
            PageIndex: 1
        }), a.loadData(a, !1);
    },
    bindBlurInput: function(t) {
        wx.hideKeyboard();
    },
    gotoKeyWordPage: function(t) {
        wx.navigateTo({
            url: "../search/search"
        });
    },
    onSortClick: function(t) {
        var a = this, e = t.target.dataset.sortby, r = t.currentTarget.dataset.num, u = "asc", n = "shengxu";
        a.data.SortOrder == u && (u = "desc", n = "jiangxu"), a.setData({
            PageIndex: 1,
            SortBy: e,
            SortOrder: u,
            Num: r,
            SortClass: n
        }), a.loadData(a, !1);
    },
    goToProductDetail: function(t) {
        var a = t.currentTarget.dataset.productid, e = t.currentTarget.dataset.activeid, r = "../productdetail/productdetail?id=" + a;
        1 == t.currentTarget.dataset.activetype && (r = "../countdowndetail/countdowndetail?id=" + e), 
        wx.navigateTo({
            url: r
        });
    },
    loadData: function(a, e) {
        wx.showNavigationBarLoading(), t.getOpenId(function(r) {
            wx.request({
                url: t.getUrl(t.globalData.getProducts),
                data: {
                    openId: r,
                    keyword: a.data.KeyWord,
                    cId: "" == a.data.CategoryId ? 0 : a.data.CategoryId,
                    pageIndex: a.data.PageIndex,
                    pageSize: a.data.PageSize,
                    sortBy: a.data.SortBy,
                    sortOrder: a.data.SortOrder
                },
                success: function(r) {
                    if ("OK" == r.data.Status) {
                        var u = r.data.Data;
                        if (e) {
                            var n = a.data.ProductList;
                            n.push.apply(n, u), a.setData({
                                ProductList: n
                            });
                        } else a.setData({
                            ProductList: u
                        });
                    } else "NOUser" == r.data.Message || t.showErrorModal(r.data.Message, function(t) {
                        t.confirm && wx.navigateBack({
                            delta: 1
                        });
                    });
                },
                complete: function() {
                    wx.hideNavigationBarLoading();
                }
            });
        });
    },
    GetShopCart: function() {
        var a = this, e = 0;
        t.getOpenId(function(r) {
            wx.request({
                url: t.getUrl(t.globalData.getCartProduct),
                data: {
                    openId: r
                },
                success: function(a) {
                    "OK" == a.data.Status ? a.data.Data.forEach(function(t, a, r) {
                        null != t[a] && parseInt(t[a].Count) > 0 && (e += parseInt(r[a].Count));
                    }) : "NOUser" == a.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : t.showErrorModal(a.data.Message, function(t) {
                        t.confirm && wx.navigateBack({
                            delta: 1
                        });
                    });
                },
                complete: function() {
                    wx.hideLoading(), a.setData({
                        TotalNum: e
                    });
                }
            });
        });
    },
    findProductById: function(t) {
        return this.data.ProductList.find(function(a) {
            return a.ProductId == t;
        });
    },
    setProductCartQuantity: function(t, a, e) {
        var r = this, u = !1, n = r.data.ProductList, o = n.find(function(a) {
            return a.ProductId == t;
        });
        if (o) {
            switch (a = parseInt(a), e) {
              case "=":
                o.CartQuantity = a;
                break;

              case "+":
                o.CartQuantity += a;
            }
            o.CartQuantity < 0 && (o.CartQuantity = 0), u = !0;
        }
        if (u) {
            var d = {
                ProductList: n
            };
            r.setData(d);
        }
    },
    setSkuCartQuantity: function(t, a, e) {
        var r = this, u = !1, n = r.data.CurrentProduct;
        if (n && n.Skus) {
            var o = n.Skus.find(function(a) {
                return a.SkuId == t;
            }), d = r.data.CurrentSku;
            if (o) {
                switch (a = parseInt(a), e) {
                  case "=":
                    o.CartQuantity = a;
                    break;

                  case "+":
                    o.CartQuantity += a;
                }
                o.CartQuantity < 0 && (o.CartQuantity = 0), d && d.SkuId == o.SkuId && (d.CartQuantity = o.CartQuantity), 
                u = !0;
            }
        }
        if (u) {
            var i = {
                CurrentProduct: n,
                CurrentSku: d
            };
            r.setData(i);
        }
    },
    catchAddCart: function(a) {
        var e = this, r = a.currentTarget, u = r.dataset.productid, n = r.dataset.operator, o = parseInt(n + "1"), d = r.dataset.opensku, i = e.findProductById(u);
        if (!i.HasSKU || i.HasSKU && "false" == d) {
            if (0 == e.data.CurrentSku.Stock) return void t.showErrorModal("当前所选规格库存为0");
            var s = r.dataset.sku;
            e.addToCart(u, s, o);
        } else wx.showLoading({
            title: "商品信息加载中..."
        }), t.getOpenId(function(a) {
            wx.request({
                url: t.getUrl(t.globalData.getProductSkus),
                data: {
                    ProductId: u,
                    openId: a
                },
                success: function(t) {
                    if (wx.hideLoading(), "OK" == t.data.Status) {
                        var a = t.data.Data, r = a.DefaultSku, u = [];
                        null != a && a.SkuItems.forEach(function(t, a, e) {
                            t.AttributeValue.reverse(), t.AttributeValue[0].UseAttributeImage = "selected";
                            var r = new Object();
                            r.ValueId = t.AttributeValue[0].ValueId, r.Value = t.AttributeValue[0].Value, u.push(r);
                        }), e.setData({
                            CurrentProduct: a,
                            CurrentSku: r,
                            selectedskuList: u,
                            selectedSku: r.SkuId
                        }), e.showSkuDOM();
                    }
                },
                complete: function() {}
            });
        });
    },
    onSkuClick: function(t) {
        var a = this, e = t.target.dataset.indexcount, r = t.target.id, u = t.target.dataset.skuvalue, n = new Object();
        n.ValueId = r, n.Value = u;
        var o = this.data.selectedskuList;
        o[e] = n;
        var d = "", i = this.data.CurrentProduct, s = this.data.CurrentProduct.SkuItems;
        i.SkuItems.length, o.length;
        for (var c = i.ProductId, l = 0; l < o.length; l++) {
            var g = o[l];
            void 0 != g && (d += "" == d ? g.Value : "," + g.Value, c += "_" + g.ValueId);
        }
        for (var S = 0; S < i.SkuItems[e].AttributeValue.length; S++) i.SkuItems[e].AttributeValue[S].ValueId == r ? i.SkuItems[e].AttributeValue[S].UseAttributeImage = "selected" : i.SkuItems[e].AttributeValue[S].UseAttributeImage = "False";
        var f = null;
        this.data.CurrentProduct.Skus.forEach(function(t, e, r) {
            for (var u = !0, n = 0; n < o.length; n++) -1 == t.SkuId.indexOf("_" + o[n].ValueId) && (u = !1);
            if (u && s.length == o.length) return f = t, c = t.SkuId, void (a.data.buyAmount = t.CartQuantity > 0 ? t.CartQuantity : 1);
        }), this.setData({
            selectedskuList: o,
            selectedSku: c,
            selectedSkuContent: d,
            SkuItemList: s,
            CurrentProduct: i,
            CurrentSku: f
        });
    },
    addToCart: function(a, e, r) {
        var u = this;
        !e || e.lenght < 1 ? t.showErrorModal("请选择规格") : t.getOpenId(function(n) {
            wx.request({
                url: t.getUrl(t.globalData.getUpdateToCart),
                data: {
                    openId: n,
                    SkuID: e,
                    Quantity: r
                },
                success: function(n) {
                    "OK" == n.data.Status ? (u.setProductCartQuantity(a, r, "+"), u.setSkuCartQuantity(e, r, "+")) : "NOUser" == n.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : t.showErrorModal(n.data.ErrorResponse.ErrorMsg);
                },
                complete: function() {
                    var t = parseInt(u.data.TotalNum);
                    u.setData({
                        TotalNum: t + parseInt(r)
                    });
                }
            });
        });
    },
    hideSkuDOM: function() {
        this.setData({
            isShowSkuSelectBox: !1
        });
    },
    showSkuDOM: function() {
        this.setData({
            isShowSkuSelectBox: !0
        });
    }
});