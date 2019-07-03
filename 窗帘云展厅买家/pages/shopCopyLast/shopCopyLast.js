function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = t(require("../../utils/interface.js")), o = t(require("../../libs/ajax.js")), i = getApp();

Page({
    data: {
        list: [],
        textareaVal: "0",
        textarea: "",
        detailId: "",
        drags: !1,
        colors: null
    },
    previewImage: function(t) {
        var a = this;
        console.log(t), wx.showModal({
            title: "注意",
            content: "是否删除此图",
            success: function(i) {
                i.confirm ? (wx.showLoading({
                    title: "删除中..."
                }), new o.default({
                    path: e.default.shopEditDelDetail,
                    data: {
                        id: t.currentTarget.dataset.id
                    }
                }).then(function(e) {
                    wx.hideLoading();
                    var o = a.data.list;
                    if (0 == e.errcode) for (var i = 0; i < o.length; i++) o[i].id == t.currentTarget.dataset.id && (o.splice(i, 1), 
                    a.setData({
                        list: o
                    })); else wx.showLoading({
                        title: e.msg
                    }), setTimeout(function() {
                        wx.hideLoading();
                    }, 1e3);
                }), console.log("用户点击确定")) : i.cancel && console.log("用户点击取消");
            }
        });
    },
    yunImg: function() {
        wx.setStorageSync("shopCopyLast", this.data.list), wx.navigateTo({
            url: "../galleryManageDet/galleryManageDet?detailId=" + this.data.detailId + "&url=shopCopyLast"
        });
    },
    addImge: function() {
        var t = this;
        wx.chooseImage({
            count: 9,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var o = e.tempFilePaths;
                wx.showToast({
                    title: "正在上传...",
                    icon: "loading",
                    mask: !0,
                    duration: 1e4
                });
                for (var i = 0, n = 0, s = o.length; n < s; n++) wx.uploadFile({
                    url: "https://www.clyzt.cn/seller/goods/upload-img",
                    filePath: o[n],
                    name: "file",
                    formData: {
                        id: t.data.detailId
                    },
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function(e) {
                        i++;
                        var n = e.data;
                        if ("object" != (void 0 === (n = n.replace(" ", "")) ? "undefined" : a(n))) {
                            n = n.replace(/\ufeff/g, "");
                            var s = JSON.parse(n);
                            e.data = s, t.setData({
                                list: t.data.list.concat(e.data.data)
                            });
                        }
                        console.log(t.data.list), i == o.length && wx.hideToast();
                    },
                    fail: function(t) {
                        wx.hideToast(), wx.showModal({
                            title: "错误提示",
                            content: "上传图片失败",
                            showCancel: !1,
                            success: function(t) {}
                        });
                    }
                });
            }
        });
    },
    textareaVal: function(t) {
        var a = t.detail.cursor, e = t.detail.value;
        this.setData({
            textareaVal: a,
            textarea: e
        });
    },
    back: function() {
        wx.navigateBack();
    },
    post: function() {
        var t = {};
        try {
            var a = wx.getStorageSync("firstShop");
            a && (t = a);
        } catch (t) {
            console.log("错误");
        }
        t.uid = i.globalData.uid, t.textarea = this.data.textarea, t.shopDetailImg = this.data.list, 
        t.id = JSON.parse(this.data.shopDetailId), console.log(t);
        var n = new o.default({
            path: e.default.shopEditPost1,
            data: t,
            contentType: "application/json"
        });
        n.then(function(a) {
            if (0 == a.errcode) {
                try {
                    wx.clearStorageSync();
                } catch (t) {}
                console.log(t), wx.reLaunch({
                    url: "../shop/shop"
                });
            } else wx.showLoading({
                title: a.msg
            }), setTimeout(function() {
                wx.hideLoading();
            });
        }), n.catch(function(t) {
            i.showLoading();
        });
    },
    onLoad: function(t) {
        wx.hideShareMenu();
        try {
            var a = wx.getStorageSync("getShop");
            if (a) var e = a;
        } catch (t) {}
        this.setData({
            textareaVal: e.textarea.length,
            list: e.shopDetailImg,
            textarea: e.textarea,
            detailId: t.id,
            shopDetailId: e.id
        });
    },
    onReady: function() {},
    drap: function(t) {
        var a = this.data.colors, i = t.currentTarget.dataset.id;
        if (null == a) this.setData({
            colors: i
        }); else {
            var n = this.data.colors, s = this.data.list, l = s[i], r = s[n];
            s[i] = r, s[n] = l, this.setData({
                colors: null,
                list: s
            }), console.log(this.data.list), new o.default({
                path: e.default.imgDrap,
                data: {
                    data: JSON.stringify(this.data.list)
                }
            }).then(function(t) {
                console.log(t);
            }), ajx.catch(function(t) {
                console.log(res);
            });
        }
    },
    onShow: function() {
        var t = wx.getStorageSync("shopCopyLast");
        if (void 0 != t && "" != t) {
            var a = this.data.list;
            a = t, console.log(a), this.setData({
                list: a
            }), console.log(this.data.list);
        }
        wx.removeStorageSync("shopCopyLast");
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        wx.hideShareMenu();
    }
});