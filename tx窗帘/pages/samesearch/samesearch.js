var t = getApp();

Page({
    data: {
        ProductList: null,
        SortBy: "",
        SortOrder: "asc",
        KeyWord: "",
        Key: "",
        CategoryId: 0,
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
        Color: "",
        Material: "",
        Weave: "",
        RequestUrl: t.getRequestUrl
    },
    onLoad: function(t) {
        var a = t.keyword;
        void 0 == a && (a = "");
        var e = "", r = t.color;
        void 0 == r ? r = "" : e = "颜色";
        var u = t.material;
        void 0 == u ? u = "" : e = "材质";
        var o = t.weave;
        void 0 == o ? o = "" : e = "面料";
        var n = t.cid;
        void 0 == n ? n = 0 : a = t.cname;
        var d = this;
        d.setData({
            KeyWord: a,
            Key: e,
            Color: r,
            Material: u,
            Weave: o,
            CategoryId: n
        }), d.loadData(d, !1);
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
    onSortClick: function(t) {
        var a = this, e = t.target.dataset.sortby, r = t.currentTarget.dataset.num, u = "asc", o = "shengxu";
        a.data.SortOrder == u && (u = "desc", o = "jiangxu"), a.setData({
            PageIndex: 1,
            SortBy: e,
            SortOrder: u,
            Num: r,
            SortClass: o
        }), a.loadData(a, !1);
    },
    goToProductDetail: function(t) {
        var a = t.currentTarget.dataset.productid, e = (t.currentTarget.dataset.activeid, 
        t.currentTarget.dataset.activetype, "../productdetail/productdetail?id=" + a);
        wx.navigateTo({
            url: e
        });
    },
    loadData: function(a, e) {
        wx.showNavigationBarLoading(), t.getOpenId(function(r) {
            wx.request({
                url: t.getUrl(t.globalData.getProducts),
                data: {
                    openId: r,
                    keyword: "",
                    cateId: a.data.CategoryId,
                    color: a.data.Color,
                    material: a.data.Material,
                    weave: a.data.Weave,
                    pageIndex: a.data.PageIndex,
                    pageSize: a.data.PageSize,
                    sortBy: a.data.SortBy,
                    sortOrder: a.data.SortOrder
                },
                success: function(r) {
                    if ("OK" == r.data.Status) {
                        var u = r.data.Data;
                        if (e) {
                            var o = a.data.ProductList;
                            o.push.apply(o, u), a.setData({
                                ProductList: o
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
        var r = this, u = !1, o = r.data.ProductList, n = o.find(function(a) {
            return a.ProductId == t;
        });
        if (n) {
            switch (a = parseInt(a), e) {
              case "=":
                n.CartQuantity = a;
                break;

              case "+":
                n.CartQuantity += a;
            }
            n.CartQuantity < 0 && (n.CartQuantity = 0), u = !0;
        }
        if (u) {
            var d = {
                ProductList: o
            };
            r.setData(d);
        }
    },
    setSkuCartQuantity: function(t, a, e) {
        var r = this, u = !1, o = r.data.CurrentProduct;
        if (o && o.Skus) {
            var n = o.Skus.find(function(a) {
                return a.SkuId == t;
            }), d = r.data.CurrentSku;
            if (n) {
                switch (a = parseInt(a), e) {
                  case "=":
                    n.CartQuantity = a;
                    break;

                  case "+":
                    n.CartQuantity += a;
                }
                n.CartQuantity < 0 && (n.CartQuantity = 0), d && d.SkuId == n.SkuId && (d.CartQuantity = n.CartQuantity), 
                u = !0;
            }
        }
        if (u) {
            var i = {
                CurrentProduct: o,
                CurrentSku: d
            };
            r.setData(i);
        }
    },
    catchAddCart: function(a) {
        var e = this, r = a.currentTarget, u = r.dataset.productid, o = r.dataset.operator, n = parseInt(o + "1"), d = r.dataset.opensku, i = e.findProductById(u);
        if (!i.HasSKU || i.HasSKU && "false" == d) {
            if (0 == e.data.CurrentSku.Stock) return void t.showErrorModal("当前所选规格库存为0");
            var s = r.dataset.sku;
            e.addToCart(u, s, n);
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
        var a = this, e = t.target.dataset.indexcount, r = t.target.id, u = t.target.dataset.skuvalue, o = new Object();
        o.ValueId = r, o.Value = u;
        var n = this.data.selectedskuList;
        n[e] = o;
        var d = "", i = this.data.CurrentProduct, s = this.data.CurrentProduct.SkuItems;
        i.SkuItems.length, n.length;
        for (var c = i.ProductId, l = 0; l < n.length; l++) {
            var g = n[l];
            void 0 != g && (d += "" == d ? g.Value : "," + g.Value, c += "_" + g.ValueId);
        }
        for (var S = 0; S < i.SkuItems[e].AttributeValue.length; S++) i.SkuItems[e].AttributeValue[S].ValueId == r ? i.SkuItems[e].AttributeValue[S].UseAttributeImage = "selected" : i.SkuItems[e].AttributeValue[S].UseAttributeImage = "False";
        var f = null;
        this.data.CurrentProduct.Skus.forEach(function(t, e, r) {
            for (var u = !0, o = 0; o < n.length; o++) -1 == t.SkuId.indexOf("_" + n[o].ValueId) && (u = !1);
            if (u && s.length == n.length) return f = t, c = t.SkuId, void (a.data.buyAmount = t.CartQuantity > 0 ? t.CartQuantity : 1);
        }), this.setData({
            selectedskuList: n,
            selectedSku: c,
            selectedSkuContent: d,
            SkuItemList: s,
            CurrentProduct: i,
            CurrentSku: f
        });
    },
    addToCart: function(a, e, r) {
        var u = this;
        !e || e.lenght < 1 ? t.showErrorModal("请选择规格") : t.getOpenId(function(o) {
            wx.request({
                url: t.getUrl(t.globalData.getUpdateToCart),
                data: {
                    openId: o,
                    SkuID: e,
                    Quantity: r
                },
                success: function(o) {
                    "OK" == o.data.Status ? (u.setProductCartQuantity(a, r, "+"), u.setSkuCartQuantity(e, r, "+")) : "NOUser" == o.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : t.showErrorModal(o.data.ErrorResponse.ErrorMsg);
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