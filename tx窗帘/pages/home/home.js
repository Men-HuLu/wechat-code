var t = require("../../utils/config.js"), e = getApp();

Page({
    data: {
        pageIndex: 1,
        pageSize: 10,
        isDataEnd: !1,
        choiceProducts: [],
        swiperProducts: [],
        refreshSuccess: !0,
        keyword: "",
        TopicUrl: "",
        VersionNumber: "",
        TopicData: null,
        RequestUrl: e.getRequestUrl,
        CurrentProduct: null,
        CurrentSku: null,
        selectedSkuContent: null,
        isShowSkuSelectBox: !1,
        TotalNum: 0,
        imageList: [],
        countDownList: []
    },
    onShow: function() {
        this.GetShopCart();
    },
    GetShopCart: function() {},
    onLoad: function(a) {
        var r = this;
        if (wx.request({
            url: e.getUrl("GetSessionId"),
            data: {},
            success: function(t) {
                t && t.header && t.header["Set-Cookie"] && wx.setStorageSync("Cookie", t.header["Set-Cookie"]);
            }
        }), e.getOpenId(function(a) {
            var u = {
                openId: a
            };
            wx.showNavigationBarLoading(), t.httpGet(e.getUrl(e.globalData.getIndexData), u, r.getHomeData);
        }), void 0 != a.q) {
            var u = decodeURIComponent(a.q);
            if (-1 != u.indexOf("/index/product")) {
                var i = this.getRequerstParam(u);
                void 0 != i.shareId && e.getOpenId(function(t) {
                    wx.request({
                        url: e.getUrl("BindParentUser"),
                        data: {
                            openId: t,
                            shareId: i.shareId
                        },
                        success: function(t) {}
                    });
                }), void 0 != i.id && wx.navigateTo({
                    url: "../productdetail/productdetail?id=" + i.id
                });
            }
        }
    },
    ClickSwiper: function(t) {
        var e = this, a = t.currentTarget.dataset.link, r = t.currentTarget.dataset.showtype, u = t.currentTarget.dataset.title;
        2 == r && (r = parseInt(a.split("|")[0]), a = a.split("|")[1]), e.JumpUrlByType(r, a, u);
    },
    JumpUrlByType: function(t, e, a) {
        switch (t) {
          case 1:
            r = "../productdetail/productdetail?id=" + e;
            wx.navigateTo({
                url: r
            });
            break;

          case 2:
            wx.navigateTo({
                url: "../article/article?id=" + e
            });
            break;

          case 3:
            wx.setStorageSync("cateid", e);
            r = "../productcategory/productcategory";
            wx.switchTab({
                url: r
            });
            break;

          case 4:
            if (0 == e) {
                wx.switchTab({
                    url: "../producttype/producttype"
                });
                break;
            }
            r = "../samesearch/samesearch?cid=" + e + "&cname=" + a;
            wx.navigateTo({
                url: r
            });
            break;

          case 8:
            wx.switchTab({
                url: e
            });
            break;

          default:
            var r = "../productdetail/productdetail?id=" + e;
            wx.navigateTo({
                url: r
            });
        }
    },
    onShareAppMessage: function() {
        return {
            title: "首页",
            path: "",
            success: function(t) {},
            fail: function(t) {}
        };
    },
    getHomeData: function(t) {
        var e = this;
        "NOUser" != t.Message ? ("OK" == t.Status ? (e.getHomeProductData(e.data.pageIndex, !0), 
        e.getSwiperProductData(), e.setData({
            refreshSuccess: !0,
            imageList: t.Data.ImgList,
            countDownList: t.Data.CountDownList,
            TopicUrl: t.Data.HomeTopicPath,
            VersionNumber: t.Data.Vid
        }), e.CheckVersionNumber(e)) : wx.showToast({
            title: "系统数据异常"
        }), wx.hideNavigationBarLoading()) : wx.navigateTo({
            url: "../login/login"
        });
    },
    getHomeProductData: function(a, r) {
        var u = this;
        void 0 == r && (r = !1), a < 1 && (a = 1), e.getOpenId(function(i) {
            var n = {
                openId: i,
                pageIndex: a,
                pageSize: u.data.pageSize
            };
            wx.showLoading({
                title: "商品信息加载中..."
            }), t.httpGet(e.getUrl(e.globalData.GetIndexProductData), n, function(t) {
                if ("OK" == t.Status) {
                    var e = u.data.choiceProducts;
                    if (t.Data.ChoiceProducts.length > 0) {
                        for (var i in t.Data.ChoiceProducts) {
                            var n = t.Data.ChoiceProducts[i];
                            e.push(n);
                        }
                        var o = {
                            choiceProducts: e
                        };
                        (!t.Data.ChoiceProducts || t.Data.ChoiceProducts.length < u.data.pageSize) && (o.isDataEnd = !0), 
                        r && (o.pageIndex = a + 1), u.setData(o);
                    }
                }
                wx.hideLoading();
            });
        });
    },
    getSwiperProductData: function() {
        var t = this;
        e.getOpenId(function(a) {
            wx.request({
                url: e.getUrl("GetIndexSwiperProductData"),
                data: {
                    openId: a
                },
                success: function(a) {
                    if ("OK" == a.data.Status) {
                        var r = a.data.Data;
                        t.setData({
                            swiperProducts: r.SwiperProducts
                        });
                    } else "NOUser" == a.data.Message || e.showErrorModal(a.data.Message);
                },
                complete: function() {
                    wx.hideNavigationBarLoading();
                }
            });
        });
    },
    CheckVersionNumber: function(t) {},
    bindSearchInput: function(t) {
        var e = t.detail.value;
        e.length > 0 && this.setData({
            keyword: e
        });
    },
    bindConfirmSearchInput: function(t) {
        var e = t.detail.value;
        e.length > 0 && (wx.setStorage({
            key: "keyword",
            data: e
        }), wx.switchTab({
            url: "../searchresult/searchresult",
            success: function(t) {
                wx.hideKeyboard();
            }
        }));
    },
    bindBlurInput: function(t) {
        wx.hideKeyboard();
    },
    bindSearchAction: function(t) {
        var e = this.data.keyword;
        e.length > 0 && (wx.setStorage({
            key: "keyword",
            data: e
        }), wx.switchTab({
            url: "../searchresult/searchresult",
            success: function(t) {
                wx.hideKeyboard();
            }
        }));
    },
    gotoKeyWordPage: function(t) {
        wx.navigateTo({
            url: "../search/search"
        });
    },
    findProductById: function(t) {
        return this.data.choiceProducts.find(function(e) {
            return e.ProductId == t;
        });
    },
    setProductCartQuantity: function(t, e, a) {
        var r = this, u = !1, i = r.data.choiceProducts, n = i.find(function(e) {
            return e.ProductId == t;
        });
        if (n) {
            switch (e = parseInt(e), a) {
              case "=":
                n.CartQuantity = e;
                break;

              case "+":
                n.CartQuantity += e;
            }
            n.CartQuantity < 0 && (n.CartQuantity = 0), u = !0;
        }
        if (u) {
            var o = {
                choiceProducts: i
            };
            r.setData(o);
        }
    },
    setSkuCartQuantity: function(t, e, a) {
        var r = this, u = !1, i = r.data.CurrentProduct;
        if (i && i.Skus) {
            var n = i.Skus.find(function(e) {
                return e.SkuId == t;
            }), o = r.data.CurrentSku;
            if (n) {
                switch (e = parseInt(e), a) {
                  case "=":
                    n.CartQuantity = e;
                    break;

                  case "+":
                    n.CartQuantity += e;
                }
                n.CartQuantity < 0 && (n.CartQuantity = 0), o && o.SkuId == n.SkuId && (o.CartQuantity = n.CartQuantity), 
                u = !0;
            }
        }
        if (u) {
            var d = {
                CurrentProduct: i,
                CurrentSku: o
            };
            r.setData(d);
        }
    },
    catchAddCart: function(t) {
        var a = this, r = t.currentTarget, u = r.dataset.productid, i = r.dataset.activeid;
        if (1 != r.dataset.activetype) {
            var n = r.dataset.operator, o = parseInt(n + "1"), d = r.dataset.opensku + "", s = a.findProductById(u);
            if (!s.HasSKU || s.HasSKU && "false" == d) {
                if (0 == a.data.CurrentSku.Stock) return void e.showErrorModal("当前所选规格库存为0");
                var c = r.dataset.sku;
                a.addToCart(u, c, o);
            } else wx.showLoading({
                title: "商品信息加载中..."
            }), e.getOpenId(function(t) {
                wx.request({
                    url: e.getUrl("product/GetProductSkus"),
                    data: {
                        ProductId: u,
                        openId: t
                    },
                    success: function(t) {
                        if (wx.hideLoading(), "OK" == t.data.Status) {
                            var e = t.data.Data, r = e.DefaultSku, u = [];
                            null != e && e.SkuItems.forEach(function(t, e, a) {
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
        } else wx.navigateTo({
            url: "../countdowndetail/countdowndetail?id=" + i
        });
    },
    onSkuClick: function(t) {
        var e = this, a = t.target.dataset.indexcount, r = t.target.id, u = t.target.dataset.skuvalue, i = new Object();
        i.ValueId = r, i.Value = u;
        var n = this.data.selectedskuList;
        n[a] = i;
        var o = "", d = this.data.CurrentProduct, s = this.data.CurrentProduct.SkuItems;
        d.SkuItems.length, n.length;
        for (var c = d.ProductId, l = 0; l < n.length; l++) {
            var h = n[l];
            void 0 != h && (o += "" == o ? h.Value : "," + h.Value, c += "_" + h.ValueId);
        }
        for (var g = 0; g < d.SkuItems[a].AttributeValue.length; g++) d.SkuItems[a].AttributeValue[g].ValueId == r ? d.SkuItems[a].AttributeValue[g].UseAttributeImage = "selected" : d.SkuItems[a].AttributeValue[g].UseAttributeImage = "False";
        var f = null;
        this.data.CurrentProduct.Skus.forEach(function(t, a, r) {
            for (var u = !0, i = 0; i < n.length; i++) void 0 != n[i] && -1 != t.SkuId.indexOf("_" + n[i].ValueId) || (u = !1);
            if (u && s.length == n.length) return f = t, c = t.SkuId, void (e.data.buyAmount = t.CartQuantity > 0 ? t.CartQuantity : 1);
        }), this.setData({
            selectedskuList: n,
            selectedSku: c,
            selectedSkuContent: o,
            SkuItemList: s,
            CurrentProduct: d,
            CurrentSku: f
        });
    },
    addToCart: function(t, a, r) {
        var u = this;
        !a || a.lenght < 1 ? e.showErrorModal("请选择规格") : e.getOpenId(function(i) {
            wx.request({
                url: e.getUrl(e.globalData.getUpdateToCart),
                data: {
                    openId: i,
                    SkuID: a,
                    Quantity: r,
                    GiftID: 0
                },
                success: function(i) {
                    "OK" == i.data.Status ? (u.setProductCartQuantity(t, r, "+"), u.setSkuCartQuantity(a, r, "+")) : "NOUser" == i.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : e.showErrorModal(i.data.ErrorResponse.ErrorMsg);
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
    },
    bindCountDownTap: function(t) {
        var e = t.currentTarget.dataset.countdownid;
        wx.navigateTo({
            url: "../countdowndetail/countdowndetail?id=" + e
        });
    },
    bindGoodsTap: function(t) {
        var e = t.currentTarget.dataset.productid, a = t.currentTarget.dataset.activeid, r = "../productdetail/productdetail?id=" + e;
        1 == t.currentTarget.dataset.activetype && (r = "../countdowndetail/countdowndetail?id=" + a), 
        wx.navigateTo({
            url: r
        });
    },
    onReachBottom: function() {
        var t = this;
        if (1 == t.data.refreshSuccess) {
            var e = t.data.pageIndex;
            t.getHomeProductData(e, !0);
        }
    },
    bindScan: function() {
        var t = this;
        wx.scanCode({
            success: function(a) {
                if (-1 == a.result.indexOf(e.getRequestUrl)) return e.showErrorModal("不是我们家的码"), 
                !1;
                var r = t.getRequerstParam(a.result);
                void 0 != r.shareId && r.shareId > 0 && e.getOpenId(function(t) {
                    wx.request({
                        url: e.getUrl("BindParentUser"),
                        data: {
                            openId: t,
                            shareId: r.shareId
                        },
                        success: function(t) {}
                    });
                }), a.result.indexOf("/index/product") > -1 && wx.navigateTo({
                    url: "../productdetail/productdetail?id=" + r.id
                });
            }
        });
    },
    getRequerstParam: function(t) {
        var e = new Object();
        if (-1 != t.indexOf("?")) for (var a = t.split("?")[1].split("&"), r = 0; r < a.length; r++) e[a[r].split("=")[0]] = unescape(a[r].split("=")[1]);
        return e;
    }
});