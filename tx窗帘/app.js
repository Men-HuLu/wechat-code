App({
    mergeArray: function(e, t) {
        for (a = 0; a < e.length; a++) for (var o = 0; o < t.length; o++) e[a] === t[o] && e.splice(a, 1);
        for (var a = 0; a < t.length; a++) e.push(t[a]);
        return e;
    },
    removeByValue: function(e, t) {
        for (var o = 0; o < e.length; o++) if (e[o] == t) {
            e.splice(o, 1);
            break;
        }
        return e;
    },
    onLaunch: function() {},
    showErrorModal: function(e, t) {
        wx.showModal({
            title: "提示",
            content: e,
            showCancel: !1,
            confirmColor: "#ff5722",
            success: function(e) {
                t && t(e);
            }
        });
    },
    getUserInfo: function(e) {
        var t = this;
        t.globalData.userInfo && "0" == t.globalData.isReloadUser ? ("function" == typeof e && e(t.globalData.userInfo), 
        wx.hideNavigationBarLoading()) : (t.globalData.isReloadUser = "0", wx.showNavigationBarLoading(), 
        t.getOpenId(function(o) {
            wx.request({
                url: t.getUrl(t.globalData.loginByOpenId),
                header: {
                    "content-type": "application/x-www-form-urlencoded",
                    Cookie: wx.getStorageSync("Cookie")
                },
                data: {
                    openId: o
                },
                success: function(o) {
                    "OK" == o.data.Status ? (t.globalData.userInfo = o.data.Data, "function" == typeof e && e(t.globalData.userInfo)) : wx.redirectTo({
                        url: "../login/login"
                    });
                },
                complete: function() {
                    wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
                }
            });
        }));
    },
    getOpenId: function(e) {
        var t = this;
        "" != t.globalData.openId && void 0 != t.globalData.openId ? "function" == typeof e && e(t.globalData.openId) : wx.login({
            success: function(o) {
                o.code ? wx.request({
                    url: t.getUrl("GetWxOpenId"),
                    header: {
                        "content-type": "application/x-www-form-urlencoded",
                        Cookie: wx.getStorageSync("Cookie")
                    },
                    data: {
                        appid: t.globalData.appId,
                        secret: t.globalData.secret,
                        js_code: o.code
                    },
                    success: function(o) {
                        void 0 != o.data && null != o.data.openid && (t.globalData.openId = o.data.openid, 
                        "function" == typeof e && e(t.globalData.openId));
                    }
                }) : console.log("获取用户登录态失败！" + o.errMsg);
            }
        });
    },
    getWxUserInfo: function(e) {
        var t = this;
        t.globalData.wxUserInfo ? "function" == typeof e && e(t.globalData.wxUserInfo) : wx.login({
            success: function(o) {
                if (o.code) {
                    var a = o.code;
                    wx.getUserInfo({
                        success: function(o) {
                            wx.request({
                                url: t.getUrl("GetWxOpenId"),
                                header: {
                                    "content-type": "application/x-www-form-urlencoded",
                                    Cookie: "PHPSESSID=" + wx.getStorageSync("Cookie")
                                },
                                data: {
                                    appid: t.globalData.appId,
                                    secret: t.globalData.secret,
                                    js_code: a
                                },
                                success: function(a) {
                                    if (void 0 != a.data && void 0 != a.data.openid) {
                                        var r = {
                                            openId: a.data.openid,
                                            nikeName: o.userInfo.nickName,
                                            unionId: "",
                                            headImage: o.userInfo.avatarUrl,
                                            encryptedData: o.encryptedData,
                                            session_key: a.data.session_key,
                                            iv: o.iv
                                        };
                                        t.globalData.wxUserInfo = r, "function" == typeof e && e(t.globalData.wxUserInfo);
                                    }
                                }
                            });
                        }
                    });
                } else console.log("获取用户登录态失败！" + o.errMsg);
            }
        });
    },
    setUserInfo: function(e) {
        this.globalData.userInfo = e;
    },
    orderPay: function(e, t, o) {
        var a = this;
        a.getOpenId(function(r) {
            wx.request({
                url: a.getUrl(a.globalData.getPayParam),
                data: {
                    openId: r,
                    orderId: e
                },
                success: function(e) {
                    if ("OK" == e.data.Status) {
                        var a = e.data.Data;
                        wx.requestPayment({
                            timeStamp: a.timeStamp,
                            nonceStr: a.nonceStr,
                            package: a.package,
                            signType: a.signType,
                            paySign: a.paySign,
                            success: function(e) {
                                wx.showModal({
                                    title: "提示",
                                    content: "支付成功！",
                                    showCancel: !1,
                                    success: function(e) {
                                        e.confirm && wx.redirectTo({
                                            url: "../orderlist/orderlist?status=" + t
                                        });
                                    }
                                });
                            },
                            fail: function(e) {
                                wx.showModal({
                                    title: "提示",
                                    content: "支付失败！",
                                    showCancel: !1,
                                    success: function(e) {
                                        o || e.confirm && wx.redirectTo({
                                            url: "../orderlist/orderlist?status=" + t
                                        });
                                    }
                                });
                            }
                        });
                    } else wx.showModal({
                        title: "提示",
                        content: e.data.Message,
                        showCancel: !1,
                        success: function(e) {
                            o || e.confirm && wx.redirectTo({
                                url: "../orderlist/orderlist?status=" + t
                            });
                        }
                    });
                }
            });
        });
    },
    getRequestUrl: "https://xcx.chicooo.com/",
    getUrl: function(e) {
        return "https://xcx.chicooo.com/api/" + e;
    },
    globalData: {
        appId: "wxb080b7ced933a243",
        secret: "745adc6b8b429ef2a4e38687072792b9",
        userInfo: null,
        openId: "",
        wxUserInfo: null,
        isReloadUser: "0",
        loginByOpenId: "GetLoginByOpenId",
        loginByUserName: "Login/GetLoginByUserName",
        quickLogin: "Login/GetQuickLogin",
        prcesslogout: "Login/GetProcessLogout",
        getIndexData: "GetIndexData",
        GetIndexProductData: "GetIndexProductData",
        getProducts: "GetProducts",
        getProductSkus: "Product/GetProductSkus",
        getProductDetail: "GetProductDetail",
        getLimitBuyList: "LimitTimeBuy/GetLimitBuyList",
        getLimitBuyProduct: "LimitTimeBuy/GetLimitBuyProduct",
        userGetCoupon: "Coupon/GetUserCoupon",
        loadCoupon: "Coupon/GetLoadCoupon",
        LoadSiteCoupon: "LoadSiteCoupon",
        getCartProduct: "Cart/GetCartProduct",
        getAddToCart: "Cart/GetAddToCart",
        getUpdateToCart: "Cart/GetUpdateToCart",
        getUserShippingAddress: "GetAddressList",
        addShippingAddress: "PostAddAddress",
        updateShippingAddress: "PostUpdateAddress",
        setDefaultShippingAddress: "SetDefaultAddress",
        delShippingAddress: "DeleteAddress",
        AddWXChooseAddress: "ShippingAddress/PostAddWXAddress",
        orderList: "GetOrders",
        closeOrder: "CancelOrder",
        finishOrder: "ConfirmOrder",
        getLogistic: "Order/GetExpressInfo",
        addProductReview: "",
        getPayParam: "GetPaymentParameter",
        getShoppingCart: "GetShoppingCart",
        sumbitOrder: "SumbitOrder",
        getRegionsOfProvinceCity: "GetRegionsOfProvinceCity",
        getRegions: "GetRegions",
        getAllCategories: "GetAllCategories",
        loadOrderProduct: "Order/GetOrderCommentProduct",
        loadReview: "LoadReview",
        loadCouponDetails: "Coupon/GetCouponDetail",
        getOrderDetail: "GetOrderDetail",
        applyRefund: "OrderRefund/PostApplyRefund",
        getAfterSalePreCheck: "OrderRefund/AfterSalePreCheck",
        getAllAfterSaleList: "OrderRefund/GetList",
        getRefundDetail: "OrderRefund/GetRefundDetail",
        getReturnDetail: "OrderRefund/GetReturnDetail",
        getExpressList: "OrderRefund/GetExpressList",
        returnSendGoods: "OrderRefund/PostReturnSendGoods"
    }
});