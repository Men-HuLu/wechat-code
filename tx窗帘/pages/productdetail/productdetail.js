var t = getApp(), e = require("../wxParse/wxParse.js");

Page({
    data: {
        ProductId: 0,
        ProductName: "",
        MetaDescription: "",
        TempMetaDescription: "",
        ShortDescription: "",
        ShowSaleCounts: "",
        Weight: "",
        MarketPrice: "",
        IsfreeShipping: "",
        MaxSalePrice: "",
        MinSalePrice: "",
        ProductImgs: "",
        SkuItemList: "",
        Skus: "",
        Freight: "",
        Coupons: "",
        Promotes: null,
        ShowPromotesText: "",
        IsUnSale: !0,
        IsOnSale: !1,
        ActiveType: "",
        ActiveText: "",
        ShowPrice: "",
        backShow: "none",
        SkuShow: "none",
        couponShow: "none",
        promoteShow: "none",
        skuImg: "",
        skuPrice: 0,
        skuStock: 0,
        selectedSku: "",
        selectedSkuContent: "",
        buyAmount: 1,
        selectedskuList: [],
        isbuy: !0,
        Like: !1,
        ReviewCount: 0,
        RequestUrl: t.getRequestUrl,
        Amount: 0,
        Color: [],
        ColorIndex: 0,
        Material: "",
        Weave: "",
        ColorAllIds: "",
        MaterialId: 0,
        WeaveId: 0,
        ShowBtn: !0,
        BtnClass: [],
        CalcPrice: 0,
        Remark: "",
        Uid: 0,
        InputType: [ "text", "text", "number", "digit" ]
    },
    onPullDownRefresh: function() {
        var t = this;
        t.loadData(t);
    },
    onLoad: function(t) {
        var e = t.id, a = this;
        a.setData({
            ProductId: e
        }), a.loadData(a);
    },
    onShareAppMessage: function() {
        var t = this;
        return {
            title: t.data.ProductName,
            path: "/page/productdetail/productdetail?id=" + t.data.ProductId,
            success: function(t) {},
            fail: function(t) {}
        };
    },
    loadData: function(a) {
        wx.showNavigationBarLoading(), t.getOpenId(function(o) {
            wx.request({
                url: t.getUrl("GetProductDetail"),
                data: {
                    openId: o,
                    productId: a.data.ProductId
                },
                success: function(o) {
                    if ("OK" == o.data.Status) {
                        var i = o.data.Data;
                        if (a.setData({
                            ProductId: i.id,
                            ProductName: i.name,
                            ShortDescription: i.subtitle ? i.subtitle : "",
                            ShowSaleCounts: i.sale_number,
                            Weight: i.weight,
                            MarketPrice: i.market_price,
                            IsfreeShipping: !1,
                            MaxSalePrice: i.sell_price,
                            MinSalePrice: i.sell_price,
                            ProductImgs: i.imgs,
                            SkuItemList: i.speclist,
                            Skus: i.specs,
                            Freight: 0,
                            Coupons: [],
                            Promotes: [],
                            ShowPromotesText: "",
                            IsUnSale: 1 == i.is_online,
                            IsOnSale: 0 == i.is_online,
                            ActiveType: 0,
                            ActiveText: "很抱歉,此商品已下架",
                            ShowPrice: i.sell_price,
                            skuImg: a.data.RequestUrl + i.img,
                            skuPrice: i.sell_price,
                            skuStock: i.speclist[0].store_nums,
                            selectedSku: i.speclist[0].id,
                            selectedSkuContent: "",
                            ReviewCount: 0,
                            buyAmount: 1,
                            Like: i.like,
                            TempMetaDescription: i.content,
                            Amount: (1 * i.sell_price / 100).toFixed(2),
                            Color: i.color_child,
                            Material: i.material,
                            Weave: i.weave,
                            ColorAllIds: i.color_all,
                            MaterialId: i.material_id,
                            WeaveId: i.weave_id,
                            Type: i.type,
                            CalcPrice: i.sell_price,
                            Uid: i.uid
                        }), null == a.data.MetaDescription || "" == a.data.MetaDescription) {
                            var r = a.data.TempMetaDescription;
                            null != r && void 0 != r && (r = (r = r.replace(/embed/g, "video")).replace(/src=\"\/data\/uploads/g, 'src="' + a.data.RequestUrl + "/data/uploads"), 
                            e.wxParse("content", "html", r, a), a.setData({
                                MetaDescription: r
                            }));
                        }
                    } else "NOUser" == o.data.Message ? wx.navigateBack({
                        delta: 1,
                        success: function() {
                            setTimeout(function() {
                                wx.navigateTo({
                                    url: "../login/login"
                                });
                            }, 600);
                        }
                    }) : t.showErrorModal(o.data.Message, function(t) {
                        t.confirm && wx.navigateBack({
                            delta: 1
                        });
                    });
                },
                complete: function() {
                    wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
                }
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    getCoupon: function(e) {
        var a = e.currentTarget.id;
        t.getOpenId(function(e) {
            wx.request({
                url: t.getUrl("Coupon/GetUserCoupon"),
                data: {
                    openId: e,
                    couponId: a
                },
                success: function(t) {
                    "OK" == t.data.Status ? wx.showToast({
                        title: "领取成功",
                        image: "../../images/succes.png"
                    }) : "NOUser" == t.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : wx.showToast({
                        title: t.data.Message,
                        image: "../../images/warning.png"
                    });
                }
            });
        });
    },
    clickCouponList: function(t) {
        var e = this;
        void 0 != e.data.Coupons && null != e.data.Coupons && "" != e.data.Coupons && e.data.Coupons.length > 0 ? this.setData({
            backShow: "",
            couponShow: ""
        }) : wx.showToast({
            title: "暂时没有可以领取的优惠券",
            icon: "loading"
        });
    },
    clickPromoteList: function(t) {
        var e = this.data.Promotes;
        e && e.ActivityCount && e.ActivityCount > 0 ? this.setData({
            backShow: "",
            promoteShow: ""
        }) : wx.showToast({
            title: "暂时没有进行中的满额优惠活动",
            icon: "loading"
        });
    },
    clickSku: function(t) {
        this.setData({
            backShow: "",
            SkuShow: "",
            isbuy: !0
        });
    },
    addShopCart: function(t) {
        this.setData({
            backShow: "",
            SkuShow: "",
            isbuy: !1
        });
    },
    clickback: function(t) {
        this.setData({
            backShow: "none",
            SkuShow: "none",
            couponShow: "none",
            promoteShow: "none"
        });
    },
    onCouponHide: function(t) {
        this.setData({
            backShow: "none",
            couponShow: "none"
        });
    },
    onPromoteHide: function(t) {
        this.setData({
            backShow: "none",
            promoteShow: "none"
        });
    },
    onSkuHide: function(t) {
        this.setData({
            backShow: "none",
            SkuShow: "none"
        });
    },
    reduceAmount: function(t) {
        var e = this.data.buyAmount, a = (e -= 1) * this.data.skuPrice / 100;
        e <= 0 || this.setData({
            buyAmount: e,
            Amount: a.toFixed(2)
        });
    },
    addAmount: function(t) {
        var e = this.data.buyAmount, a = this.data.skuStock, o = (e += 1) * this.data.skuPrice / 100;
        e > a || this.setData({
            buyAmount: e,
            Amount: o.toFixed(2)
        });
    },
    changeAmount: function(e) {
        var a = parseInt(e.detail.value), o = this.data.skuStock, i = a * this.data.skuPrice / 100;
        isNaN(a) || a > o || a <= 0 ? t.showErrorModal("请输入正确的数量,不能大于库存或者小于等于0") : this.setData({
            buyAmount: a,
            Amount: i.toFixed(2)
        });
    },
    doCommit: function(e) {
        for (var a = e.currentTarget.dataset.option, o = this, i = [], r = [], s = 0; s < this.data.selectedskuList.length; s++) void 0 != this.data.selectedskuList[s] && "" != this.data.selectedskuList[s] && null != this.data.selectedskuList[s] && i.push(this.data.selectedskuList[s]);
        for (var n in this.data.Skus) r.push(this.data.Skus[n]);
        if (r.length == i.length) if (0 != this.data.skuStock) if (this.data.buyAmount <= 0) t.showErrorModal("请输入要购买的数量"); else {
            for (var n in this.data.Type.attr) if (void 0 == this.data.Type.attr[n].Selected || "" == this.data.Type.attr[n].Selected) return void t.showErrorModal("请" + (3 == this.data.Type.attr[n].show_type ? "输入" : "选择") + this.data.Type.attr[n].name);
            var d = this.data.buyAmount, u = this.data.selectedSku, c = [];
            for (var n in this.data.Type.attr) c.push({
                id: this.data.Type.attr[n].id,
                name: this.data.Type.attr[n].name,
                value: this.data.Type.attr[n].Selected
            });
            c.push({
                id: 0,
                name: "买家备注",
                value: this.data.Remark
            }), "buy" == a ? wx.redirectTo({
                url: "../submitorder/submitorder?productsku=" + u + "&buyamount=" + d + "&frompage=1&param=" + encodeURIComponent(JSON.stringify(c))
            }) : t.getOpenId(function(e) {
                wx.request({
                    url: t.getUrl("GetaddToCart"),
                    header: {
                        "content-type": "application/x-www-form-urlencoded",
                        Cookie: wx.getStorageSync("Cookie")
                    },
                    data: {
                        openId: e,
                        SkuID: u,
                        Quantity: d,
                        Param: encodeURIComponent(JSON.stringify(c))
                    },
                    success: function(e) {
                        "OK" == e.data.Status ? wx.showModal({
                            title: "提示",
                            content: "加入购物车成功",
                            showCancel: !1,
                            success: function(t) {
                                t.confirm && o.setData({
                                    backShow: "none",
                                    SkuShow: "none"
                                });
                            }
                        }) : "NOUser" == e.data.Message ? wx.navigateTo({
                            url: "../login/login"
                        }) : t.showErrorModal(e.data.Message);
                    }
                });
            });
        } else t.showErrorModal("当前所选规格库存为0"); else t.showErrorModal("请选择规格");
    },
    onSkuClick: function(e) {
        var a = this, o = e.target.dataset.indexcount, i = e.target.id, r = e.target.dataset.skuvalue, s = e.target.dataset.skuname, n = new Object();
        n.valueid = i, n.value = r, n.name = s, n.index = o;
        var d = this.data.selectedskuList;
        d[o] = n;
        var u = "", c = !1, l = this.data.Skus, h = (this.data.ProductId, []);
        for (var p in d) h.push(d[p]);
        var m = [];
        for (var p in a.data.Skus) m.push(a.data.Skus[p]);
        m.length == h.length && (c = !0);
        var k = null;
        if (c) {
            var S = !1;
            for (var p in a.data.SkuItemList) {
                var g = !0, f = a.data.SkuItemList[p];
                for (var v in h) -1 == f.specs_key.indexOf(";" + h[v].value + ";") && (g = !1);
                g && (k = f, S = !0);
            }
            if (!S) return t.showErrorModal("该规格已售罄，请选择其他规格"), !1;
            this.setData({
                skuPrice: k.sell_price,
                skuStock: k.store_nums,
                selectedSku: k.id
            });
        }
        for (p = 0; p < d.length; p++) {
            var w = d[p];
            void 0 != w && (u += "" == u ? w.name : "," + w.name);
        }
        for (var p in l) if (p == o) {
            var I = l[p];
            for (var v in I.value) I.value[v].id == i ? l[p].value[v].UseAttributeImage = "selected" : l[p].value[v].UseAttributeImage = "unselected";
        }
        this.setData({
            selectedskuList: d,
            selectedSkuContent: u,
            Skus: l
        });
    },
    clickLike: function(e) {
        var a = this;
        t.getOpenId(function(e) {
            wx.request({
                url: t.getUrl("LikeProduct"),
                data: {
                    openId: e,
                    ProductId: a.data.ProductId
                },
                success: function(e) {
                    "OK" == e.data.Status ? (a.setData({
                        Like: !a.data.Like
                    }), a.loadData(a)) : "NOUser" == e.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : t.showErrorModal(e.data.Message);
                }
            });
        });
    },
    doSearch: function(t) {
        var e = this, a = "../samesearch/samesearch", o = "";
        switch (parseInt(t.target.dataset.type)) {
          case 1:
            var i = [], r = [];
            for (var s in e.data.Color) i.push(e.data.Color[s].id), r.push(e.data.Color[s].name);
            o = r.join(","), a += "?color=" + i.join(",") + "&keyword=" + o;
            break;

          case 2:
            o = e.data.Material, a += "?material=" + e.data.Material + "&keyword=" + o;
            break;

          case 3:
            o = e.data.Weave, a += "?weave=" + e.data.Weave + "&keyword=" + o;
        }
        wx.navigateTo({
            url: a
        });
    },
    onColorClick: function(t) {
        var e = this, a = parseInt(t.currentTarget.dataset.id), o = e.data.Color;
        for (var i in o) o[i].id == a ? o[i].UseAttributeImage = "selected" : o[i].UseAttributeImage = "unselected";
        e.setData({
            Color: o,
            ColorIndex: a
        });
    },
    onAttrClick: function(t) {
        var e = this, a = parseInt(t.currentTarget.dataset.id), o = t.currentTarget.dataset.name, i = e.data.Type;
        for (var r in i.attr) i.attr[r].id == a && (i.attr[r].Selected = o);
        e.setData({
            Type: i
        });
    },
    changeAttrInput: function(t) {
        var e = this, a = t.detail.value, o = parseInt(t.currentTarget.dataset.id), i = e.data.Type, r = e.data.skuPrice, s = 1, n = [];
        for (var d in i.attr) i.attr[d].id == o && (i.attr[d].Selected = a), 1 == i.attr[d].calc && n.push(i.attr[d].id);
        if (1 == i.rectify) {
            var u = 1;
            for (var d in i.attr) 1 == i.attr[d].square && (u *= i.attr[d].Selected ? i.attr[d].Selected : 1, 
            (l = n.indexOf(i.attr[d].id)) > -1 && n.splice(l, 1));
            s *= Math.ceil(u);
        }
        if (1 == i.height_float) {
            var c = 1;
            for (var d in i.attr) if (1 == i.attr[d].height) {
                i.attr[d].Selected < i.height_min_mi && (c = i.height_min_discount / 100), i.attr[d].Selected > i.height_max_mi && (c = (100 + (i.attr[d].Selected - i.height_max_mi) / i.height_mi_per * i.height_max_discount) / 100);
                var l = n.indexOf(i.attr[d].id);
                l > -1 && n.splice(l, 1);
            }
            s *= c;
        }
        if (1 == i.meter) for (var d in i.attr) 1 == i.attr[d].meter && i.attr[d].Selected < i.meter_min && (i.attr[d].Selected = i.meter_min);
        for (var d in i.attr) for (var h in n) n[h] == i.attr[d].id && (s *= i.attr[d].Selected ? i.attr[d].Selected : 1);
        r *= s, e.setData({
            Type: i,
            CalcPrice: r.toFixed(2)
        });
    },
    changeRemarkInput: function(t) {
        var e = t.detail.value;
        this.setData({
            Remark: e
        });
    },
    showBtn: function() {
        var t = this, e = t.data.ShowBtn, a = {
            webkitTransform: "",
            sub: []
        };
        if (e) {
            for (i = 0; i < 3; i++) {
                var o = t.addValue(-100, 45 * (2 - i));
                a.sub.push({
                    webkitTransition: "0.2s " + 100 * i + "ms",
                    top: o.l + "px",
                    left: o.t + "px"
                });
            }
            a.webkitTransform = "rotate(-360deg)";
        } else {
            for (var i = 0; i < 3; i++) a.sub.push({
                webkitTransition: "0.2s " + 100 * (2 - i) + "ms",
                top: "0px",
                left: "0px"
            });
            a.webkitTransform = "rotate(0deg)";
        }
        t.setData({
            ShowBtn: !e,
            BtnClass: a
        });
    },
    addValue: function(t, e) {
        return {
            l: Math.round(Math.sin(e / 180 * Math.PI) * t),
            t: Math.round(Math.cos(e / 180 * Math.PI) * t)
        };
    }
});