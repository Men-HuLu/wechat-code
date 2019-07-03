function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

t(require("../../libs/userLogin.js"));

var a = t(require("../../utils/interface.js")), o = t(require("../../libs/ajax.js")), i = getApp();

Page({
    data: {
        imgUrls: [],
        indicatorDots: !1,
        autoplay: !1,
        interval: 5e3,
        duration: 1e3,
        nowData: "",
        tab: !0,
        isDown: 0,
        isDownTxt: "下架",
        hasUserComment: !1
    },
    onLoad: function(t) {
        var n = this;
        wx.hideShareMenu(), console.log(t.id), this.setData({
            id: t.id
        }), wx.showLoading({
            title: "加载中..."
        });
        var e = new o.default({
            reqtype: "GET",
            path: a.default.shopDetails,
            data: {
                id: t.id,
                uid: i.globalData.uid
            }
        });
        e.then(function(t) {
            t.data.money = "¥" + t.data.money, console.log(t), n.setData({
                nowData: t.data,
                imgUrls: t.data.headImg,
                isDown: t.data.isDown
            }), 0 == n.data.isDown ? n.setData({
                isDownTxt: "下架"
            }) : 1 == n.data.isDown && n.setData({
                isDownTxt: "上架"
            }), wx.hideLoading();
        }), e.catch(function(t) {
            console.log(t);
        });
    },
    tabShop: function(t) {
        this.setData({
            tab: !0
        });
    },
    copy: function() {
        var t = new o.default({
            data: {
                uid: i.globalData.uid,
                id: this.data.id,
                shopId: i.globalData.shopId
            },
            path: a.default.shopCopy
        });
        t.then(function(t) {
            0 == t.errcode ? (wx.showToast({
                title: "复制成功"
            }), setTimeout(function() {
                wx.reLaunch({
                    url: "../shopCopyFirst/shopCopyFirst?id=" + t.data.goods_id + "&title=copy"
                });
            }, 2e3)) : (wx.showLoading({
                title: t.msg
            }), setTimeout(function() {
                wx.hideLoading();
            }, 1e3));
        }), t.catch(function(t) {
            i.showLoading();
        });
    },
    edit: function() {
        wx.navigateTo({
            url: "../shopCopyFirst/shopCopyFirst?id=" + this.data.id
        });
    },
    tabComment: function(t) {
        var n = this;
        this.setData({
            tab: !1
        }), wx.showLoading({
            title: "加载中"
        });
        var e = {
            id: this.data.id,
            uid: i.globalData.uid
        }, s = new o.default({
            reqtype: "GET",
            path: a.default.shopDetailComment,
            data: e
        });
        s.then(function(t) {
            t.data.length ? n.setData({
                userComment: t
            }) : n.setData({
                hasUserComment: !0
            }), wx.hideLoading();
        }), s.catch(function(t) {
            console.log(t);
        });
    },
    del: function() {
        var t = this;
        wx.showModal({
            title: "警告",
            content: "当前操作将删除此商品",
            confirmColor: "#3ca1ef",
            success: function(n) {
                if (n.confirm) {
                    var e = new o.default({
                        data: {
                            uid: i.globalData.uid,
                            id: t.data.id
                        },
                        path: a.default.shopDel
                    });
                    e.then(function(t) {
                        0 == t.errcode ? wx.reLaunch({
                            url: "../shop/shop"
                        }) : (wx.showLoading({
                            title: t.msg
                        }), setTimeout(function() {
                            wx.hideLoading();
                        }, 1e3));
                    }), e.catch(function(t) {
                        i.showLoading();
                    });
                } else n.cancel && console.log("用户点击取消");
            }
        });
    },
    down: function() {
        if (0 == this.data.isDown) {
            var t = new o.default({
                data: {
                    uid: i.globalData.uid,
                    id: this.data.id,
                    isDown: this.data.isDown
                },
                path: a.default.shopDown
            });
            t.then(function(t) {
                0 == t.errcode ? wx.reLaunch({
                    url: "../shop/shop"
                }) : (wx.showLoading({
                    title: t.msg
                }), setTimeout(function() {
                    wx.hideLoading();
                }, 1e3));
            }), t.catch(function(t) {
                i.showLoading();
            });
        } else {
            var n = new o.default({
                data: {
                    uid: i.globalData.uid,
                    id: this.data.id,
                    isDown: this.data.isDown
                },
                path: a.default.shopDown
            });
            n.then(function(t) {
                0 == t.errcode ? wx.reLaunch({
                    url: "../shop/shop"
                }) : (wx.showLoading({
                    title: t.msg
                }), setTimeout(function() {
                    wx.hideLoading();
                }, 1e3));
            }), n.catch(function(t) {
                i.showLoading();
            });
        }
    },
    comment: function() {
        wx.navigateTo({
            url: "../publishComment/publishComment?id=" + this.data.id
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        wx.hideShareMenu();
    },
    previewImg: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.src, o = t.currentTarget.dataset.index;
        wx.previewImage({
            current: a,
            urls: this.data.userComment.data[o].commentImg
        });
    }
});