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
        isShowSkuSelectBox: !1,
        selectedskuList: [],
        buyAmount: 1,
        selectedSku: "",
        SkuItemList: null,
        MarginTop: 0,
        TempMarginTop: 0,
        StartScrollTop: 0,
        IsDown: !0,
        IsPagePost: !1,
        RequestUrl: e.getRequestUrl
    },
    onLoad: function(t) {
        var a = t.cid;
        parseInt(a) > 0 && this.setData({
            Cid: a,
            IsPagePost: !0
        }), this.loadCategory(this);
    },
    SwitchSubCategory: function() {
        this.setData({
            IsDown: !0
        });
    },
    GetShopCart: function() {
        var t = 0, a = this, r = a.data.ProductList;
        e.getOpenId(function(u) {
            wx.request({
                url: e.getUrl(e.globalData.getCartProduct),
                data: {
                    openId: u
                },
                success: function(a) {
                    if ("OK" == a.data.Status) {
                        var u = {};
                        a.data.Data.forEach(function(a, e, r) {
                            parseInt(a[e].Count) > 0 && (void 0 != u[a[e].Id] ? u[a[e].Id] = parseInt(u[a[e].Id]) + parseInt(a[e].Count) : u[a[e].Id] = a[e].Count, 
                            t += parseInt(a[e].Count));
                        }), null != r && r.forEach(function(t, a, e) {
                            void 0 != u[t.ProductId] ? t.CartQuantity = parseInt(u[t.ProductId]) : t.CartQuantity = 0;
                        });
                    } else "NOUser" == a.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : e.showErrorModal(a.data.Message, function(t) {
                        t.confirm && wx.navigateBack({
                            delta: 1
                        });
                    });
                },
                complete: function() {
                    null != r && a.setData({
                        ProductList: r,
                        TotalNum: t
                    }), wx.hideLoading();
                }
            });
        });
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
                            CurrentCategory: r[0],
                            Cid: r[0].id
                        }), t.loadData(t, !1);
                    } else "NOUser" == a.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : e.showErrorModal(a.data.Message, function(t) {
                        t.confirm && wx.navigateBack({
                            delta: 1
                        });
                    });
                },
                complete: function() {}
            });
        });
    },
    EndTouch: function(t) {
        var a = this, e = parseInt(t.changedTouches[0].clientY), r = parseInt(a.data.StartScrollTop);
        if (e != r) {
            var u = a.data.TempMarginTop;
            e - r > 0 ? a.setData({
                IsDown: !0,
                MarginTop: u
            }) : a.setData({
                IsDown: !1,
                MarginTop: 0
            });
        }
    },
    StartTouch: function(t) {
        var a = this, e = t.changedTouches[0].clientY;
        a.setData({
            StartScrollTop: e
        });
    },
    addToCart: function(t, a, r) {
        var u = this;
        !a || a.lenght < 1 ? e.showErrorModal("请选择规格") : e.getOpenId(function(n) {
            wx.request({
                url: e.getUrl(e.globalData.getUpdateToCart),
                data: {
                    openId: n,
                    SkuID: a,
                    Quantity: r
                },
                success: function(n) {
                    "OK" == n.data.Status ? (u.setProductCartQuantity(t, r, "+"), u.setSkuCartQuantity(a, r, "+")) : "NOUser" == n.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : e.showErrorModal(n.data.ErrorResponse.ErrorMsg);
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
    setSkuCartQuantity: function(t, a, e) {
        var r = this, u = !1, n = r.data.CurrentProduct;
        if (n && n.Skus) {
            var o = n.Skus.find(function(a) {
                return a.SkuId == t;
            }), s = r.data.CurrentSku;
            if (o) {
                switch (a = parseInt(a), e) {
                  case "=":
                    o.CartQuantity = a;
                    break;

                  case "+":
                    o.CartQuantity += a;
                }
                o.CartQuantity < 0 && (o.CartQuantity = 0), s && s.SkuId == o.SkuId && (s.CartQuantity = o.CartQuantity), 
                u = !0;
            }
        }
        if (u) {
            var i = {
                CurrentProduct: n,
                CurrentSku: s
            };
            r.setData(i);
        }
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
            var s = {
                ProductList: n
            };
            r.setData(s);
        }
    },
    hideSkuDOM: function() {
        this.setData({
            isShowSkuSelectBox: !1
        });
    },
    catchAddCart: function(t) {
        var a = this, r = t.currentTarget, u = r.dataset.productid, n = r.dataset.operator, o = parseInt(n + "1"), s = r.dataset.opensku, i = a.findProductById(u);
        if (!i.HasSKU || i.HasSKU && "false" == s) {
            if (a.data.CurrentSku && 0 == a.data.CurrentSku.Stock) return void e.showErrorModal("当前所选规格库存为0");
            var d = r.dataset.sku;
            a.addToCart(u, d, o);
        } else wx.showLoading({
            title: "商品信息加载中..."
        }), e.getOpenId(function(t) {
            wx.request({
                url: e.getUrl(e.globalData.getProductSkus),
                data: {
                    ProductId: u,
                    openId: t
                },
                success: function(t) {
                    if (wx.hideLoading(), "OK" == t.data.Status) {
                        var e = t.data.Data, r = e.DefaultSku, u = [];
                        null != e && e.SkuItems.forEach(function(t, a, e) {
                            t.AttributeValue.reverse(), t.AttributeValue[0].UseAttributeImage = "selected";
                            var r = new Object();
                            r.ValueId = t.AttributeValue[0].ValueId, r.Value = t.AttributeValue[0].Value, u.push(r);
                        }), a.setData({
                            CurrentProduct: e,
                            CurrentSku: r,
                            selectedskuList: u,
                            selectedSku: r.SkuId
                        }), a.showSkuDOM();
                    }
                },
                complete: function() {}
            });
        });
    },
    findProductById: function(t) {
        return this.data.ProductList.find(function(a) {
            return a.ProductId == t;
        });
    }
}, t(a, "hideSkuDOM", function() {
    this.setData({
        isShowSkuSelectBox: !1
    });
}), t(a, "showSkuDOM", function() {
    this.setData({
        isShowSkuSelectBox: !0
    });
}), t(a, "BuyProduct", function(t) {
    var a = this, r = t.currentTarget.dataset.index, u = t.currentTarget.dataset.sku, n = t.currentTarget.dataset.productid, o = a.data.ProductList, s = null;
    0 == u ? (o[r].CartQuantity = 1, a.ChangeQuantiy(a, o, n + "_0", 1)) : wx.request({
        url: e.getUrl(e.globalData.getProductSkus),
        data: {
            ProductId: n
        },
        success: function(t) {
            if ("OK" == t.data.Status) {
                var e = t.data.Data;
                s = e.DefaultSku, a.setData({
                    isShow: !1,
                    CurrentProduct: e,
                    CurrentSku: s,
                    selectedskuList: []
                });
            }
        },
        complete: function() {}
    });
}), t(a, "minusCount", function(t) {
    var a = this, e = t.currentTarget.dataset.index, r = this.data.ProductList, u = r[e].CartQuantity;
    u <= 1 || (u -= 1, r[e].CartQuantity = u, a.ChangeQuantiy(a, r, r[e].SkuId, -1));
}), t(a, "addCount", function(t) {
    var a = this, e = t.currentTarget.dataset.index, r = this.data.ProductList, u = r[e].CartQuantity;
    u += 1, r[e].CartQuantity = u, a.ChangeQuantiy(a, r, r[e].SkuId, 1);
}), t(a, "ChangeQuantiy1", function(t, a, r) {
    e.getOpenId(function(u) {
        wx.request({
            url: e.getUrl(e.globalData.getUpdateToCart),
            data: {
                openId: u,
                SkuID: a,
                Quantity: r
            },
            success: function(t) {
                "OK" == t.data.Status || ("NOUser" == t.data.Message ? wx.navigateTo({
                    url: "../login/login"
                }) : e.showErrorModal(t.data.ErrorResponse.ErrorMsg));
            },
            complete: function() {
                t.loadData(t);
            }
        });
    });
}), t(a, "ChangeQuantiy", function(t, a, r, u) {
    e.getOpenId(function(n) {
        wx.request({
            url: e.getUrl(e.globalData.getUpdateToCart),
            data: {
                openId: n,
                SkuID: r,
                Quantity: u
            },
            success: function(r) {
                "OK" == r.data.Status ? t.setData({
                    ProductList: a
                }) : "NOUser" == r.data.Message ? wx.navigateTo({
                    url: "../login/login"
                }) : e.showErrorModal(r.data.ErrorResponse.ErrorMsg);
            },
            complete: function() {}
        });
    });
}), t(a, "onSkuHide", function(t) {
    that.setData({
        isShow: !0
    });
}), t(a, "onSkuClick", function(t) {
    var a = this, e = t.target.dataset.indexcount, r = t.target.id, u = t.target.dataset.skuvalue, n = new Object();
    n.ValueId = r, n.Value = u;
    var o = this.data.selectedskuList;
    o[e] = n;
    var s = "", i = this.data.CurrentProduct, d = this.data.CurrentProduct.SkuItems;
    i.SkuItems.length, o.length;
    for (var c = i.ProductId, l = 0; l < o.length; l++) {
        var g = o[l];
        void 0 != g && (s += "" == s ? g.Value : "," + g.Value, c += "_" + g.ValueId);
    }
    for (var h = 0; h < i.SkuItems[e].AttributeValue.length; h++) i.SkuItems[e].AttributeValue[h].ValueId == r ? i.SkuItems[e].AttributeValue[h].UseAttributeImage = "selected" : i.SkuItems[e].AttributeValue[h].UseAttributeImage = "False";
    var S = null;
    this.data.CurrentProduct.Skus.forEach(function(t, e, r) {
        for (var u = !0, n = 0; n < o.length; n++) -1 == t.SkuId.indexOf("_" + o[n].ValueId) && (u = !1);
        if (u && d.length == o.length) return S = t, c = t.SkuId, void (a.data.buyAmount = t.CartQuantity > 0 ? t.CartQuantity : 1);
    }), this.setData({
        selectedskuList: o,
        selectedSku: c,
        selectedSkuContent: s,
        SkuItemList: d,
        CurrentProduct: i,
        CurrentSku: S
    });
}), t(a, "OpenCurrentSku", function() {
    var t = this, a = (t.data.ProductList, t.data.CurrentSku);
    null != a && void 0 != a || e.showErrorModal("请选择规格内容"), a.CartQuantity = 1, t.setData({
        CurrentSku: a
    }), t.ChangeQuantiy1(t, a.SkuId, 1);
}), t(a, "bindSearchInput", function(t) {
    var a = t.detail.value;
    a.length > 0 && this.setData({
        keyword: a
    });
}), t(a, "bindConfirmSearchInput", function(t) {
    var a = t.detail.value;
    a.length > 0 && (wx.setStorage({
        key: "keyword",
        data: a
    }), wx.switchTab({
        url: "../searchresult/searchresult",
        success: function(t) {
            wx.hideKeyboard();
        }
    }));
}), t(a, "gotoKeyWordPage", function(t) {
    wx.navigateTo({
        url: "../search/search"
    });
}), t(a, "bindBlurInput", function(t) {
    wx.hideKeyboard();
}), t(a, "changeAmount", function(t) {
    var a = parseInt(t.detail.value), r = this.data.CurrentSkuStock;
    isNaN(a) || a > r || a <= 0 ? e.showErrorModal("请输入正确的数量,不能大于库存或者小于等于0") : this.setData({
        buyAmount: a
    });
}), t(a, "reduceAmount", function(t) {
    var a = this.data.buyAmount;
    (a -= 1) <= 0 || this.setData({
        buyAmount: a
    });
}), t(a, "addAmount", function(t) {
    var a = this.data.buyAmount;
    (a += 1) > this.data.CurrentSku.Stock ? e.showErrorModal("请输入正确的数量,不能大于库存或者小于等于0") : this.setData({
        buyAmount: a
    });
}), t(a, "loadData", function(t, a) {
    wx.showNavigationBarLoading(), e.getOpenId(function(r) {
        wx.request({
            url: e.getUrl(e.globalData.getProducts),
            data: {
                keyword: t.data.KeyWord,
                pageIndex: t.data.PageIndex,
                pageSize: t.data.PageSize,
                sortBy: t.data.SortBy,
                sortOrder: t.data.SortOrder,
                cId: t.data.Cid,
                openId: r
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
                } else e.showErrorModal(r.data.Message, function(t) {
                    t.confirm && wx.navigateBack({
                        delta: 1
                    });
                });
            },
            complete: function() {
                wx.getSystemInfo({
                    success: function(a) {
                        var e = a.windowHeight - 53, r = t.data.Css;
                        r.LHeight = e, r.TempHeight = e, t.setData({
                            CSS: r
                        });
                    }
                }), wx.hideNavigationBarLoading();
            }
        });
    });
}), t(a, "SetSubCategoryHeight", function() {
    var t = this.data.CurrentCategory.subs, a = parseInt(t.length) + 1, e = a / 3;
    a % 3 > 0 && (e = parseInt(e) + 1);
    var r = 0;
    e > 1 && (r = 90 * (e - 1)), this.setData({
        MarginTop: r,
        TempMarginTop: r,
        IsDown: !0
    });
}), t(a, "commitBuy", function(t) {
    for (var a = this, r = !0, u = 0; u < a.data.selectedskuList.length; u++) if (void 0 == this.data.selectedskuList[u] || "" == a.data.selectedskuList[u] || null == this.data.selectedskuList[u]) {
        r = !1;
        break;
    }
    if (null != this.data.SkuItemList && a.data.selectedskuList.length == this.data.SkuItemList.length && r) if (a.data.buyAmount <= 0) e.showErrorModal("请输入要购买的数量"); else {
        var n = this.data.buyAmount, o = this.data.selectedSku;
        if (n > this.data.CurrentSku.Stock) e.showErrorModal("请输入正确的数量,不能大于库存或者小于等于0"); else {
            var s = n - this.data.CurrentSku.CartQuantity, i = this.data.ProductList;
            i.find(function(t, e) {
                t.ProductId != a.data.CurrentProduct.ProductId || (t.CartQuantity += s);
            }), a.ChangeQuantiy(a, i, o, s), a.onSkuHide(t);
        }
    } else e.showErrorModal("请选择规格");
}), t(a, "onSkuHide", function(t) {
    this.setData({
        isShow: !0,
        CurrentSku: null,
        CurrentProduct: null,
        selectedSku: "",
        buyAmount: 1
    });
}), t(a, "ChooseCategory", function(t) {
    var a = this, e = t.currentTarget.dataset.cid, r = (t.currentTarget.dataset.grade, 
    t.currentTarget.dataset.index), u = a.data.Css;
    a.data.CategoryList.find(function(t, n) {
        u.FirstIndex = r, u.SecondIndex = 0, t.id != e || a.setData({
            CurrentCategory: t,
            Css: u,
            Cid: e,
            PageIndex: 1
        });
    }), a.loadData(a, !1);
}), t(a, "SortClick", function(t) {
    var a = this, e = t.currentTarget.dataset.sortby, r = t.currentTarget.dataset.index, u = a.data.Css;
    u.SortIndex = r;
    var n = "asc", o = "shengxu";
    a.data.SortOrder == n && (n = "desc", o = "jiangxu"), a.setData({
        PageIndex: 1,
        SortBy: e,
        SortOrder: n,
        SortClass: o,
        Css: u
    }), a.loadData(a, !1);
}), t(a, "ChooseProduct", function(t) {
    var a = t.currentTarget.dataset.productid;
    wx.navigateTo({
        url: "../productdetail/productdetail?id=" + a
    });
}), t(a, "onReady", function() {}), t(a, "onShow", function() {
    this.loadData(this, !1);
}), t(a, "onHide", function() {}), t(a, "onUnload", function() {}), t(a, "onPullDownRefresh", function() {}), 
t(a, "onReachBottom", function() {
    var t = this.data.PageIndex;
    t = parseInt(t) + 1, this.setData({
        PageIndex: t
    }), this.loadData(this, !0);
}), t(a, "onShareAppMessage", function() {}), a));