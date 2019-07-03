function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../utils/interface.js")), e = t(require("../../libs/ajax.js")), o = getApp();

Page({
    data: {
        list: [],
        photoList: [],
        textareaVal: "0",
        textarea: "",
        drags: !1,
        colors: null,
        postDataId: ""
    },
    previewImage: function(t) {
        var a = this;
        wx.showModal({
            title: "注意",
            content: "是否删除此图",
            success: function(e) {
                e.confirm ? (console.log("用户点击确定"), console.log(a.data), a.data.list.splice(t.currentTarget.dataset.id, 1), 
                a.setData({
                    list: a.data.list,
                    tempFilePaths: a.data.tempFilePaths
                })) : e.cancel && console.log("用户点击取消");
            }
        });
    },
    yunImg: function() {
        var t = [];
        this.data.list.forEach(function(a, e) {
            t[e] = {}, t[e].path = a, t[e].id = 0;
        }), wx.setStorageSync("newCommodityLast", t), wx.navigateTo({
            url: "../galleryManageDet/galleryManageDet?detailId=" + this.data.detailId + "&url=newCommodityLast"
        });
    },
    addImge: function() {
        var t = this;
        wx.chooseImage({
            count: 9,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                console.log(a);
                var e = a.tempFilePaths;
                e.forEach(function(a, e) {
                    wx.uploadFile({
                        url: "https://www.clyzt.cn/seller/goods/upload-img-one",
                        filePath: a,
                        name: "file",
                        formData: {
                            user: "test"
                        },
                        success: function(a) {
                            var e = t.data.list, o = "https://www.clyzt.cn" + JSON.parse(a.data).data.img_url, n = e.concat(o);
                            t.setData({
                                list: n
                            });
                        }
                    });
                }), t.setData({
                    tempFilePaths: e
                });
            }
        });
    },
    postImg: function(t, o) {
        if (console.log(o.data.postDataId), this.setData({
            shopId: o.data.postDataId
        }), void 0 != t) {
            if ("undefined" != t.length) {
                var n = new e.default({
                    path: a.default.imgUpList,
                    data: {
                        data: this.data.list.toString(),
                        goods_id: this.data.shopId
                    }
                });
                n.then(function(t) {
                    console.log(t), wx.hideLoading(), wx.reLaunch({
                        url: "../index/index"
                    });
                }), n.catch(function(t) {
                    wx.showToast({
                        title: t.msg
                    });
                });
            }
        } else wx.reLaunch({
            url: "../shop/shop"
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
        wx.navigateBack({
            url: "../newCommodity/newCommodity"
        });
    },
    post: function() {
        var t = this, n = {};
        try {
            var s = wx.getStorageSync("firstShop");
            s && (n = s);
        } catch (t) {
            console.log("错误");
        }
        n.uid = o.globalData.uid, n.textarea = this.data.textarea, n.id = 0, console.log(n), 
        wx.showLoading({
            title: "加载中..."
        });
        var i = new e.default({
            path: a.default.newCommodity,
            data: n,
            contentType: "application/json"
        });
        i.then(function(a) {
            0 == a.errcode ? (wx.clearStorage(), t.setData({
                postDataId: a.data.id
            }), console.log(a), console.log(t.data.list), t.postImg(t.data.list, t)) : (wx.showLoading({
                title: a.msg
            }), setTimeout(function() {
                wx.hideLoading();
            }, 1e3));
        }), i.catch(function(t) {
            o.showLoading();
        });
    },
    showIndex: function() {
        this.setData({
            drags: !0
        });
    },
    drap: function(t) {
        var a = this.data.colors, e = t.currentTarget.dataset.id;
        if (null == a) this.setData({
            colors: e
        }); else {
            var o = this.data.colors, n = this.data.list, s = n[e], i = n[o];
            n[e] = i, n[o] = s, this.setData({
                colors: null,
                list: n
            });
        }
    },
    onLoad: function(t) {
        wx.hideShareMenu();
    },
    onReady: function() {},
    onShow: function() {
        var t = wx.getStorageSync("newCommodityLast"), a = [];
        void 0 != t && "" != t && (t.forEach(function(e, o) {
            "" != t[o] && a.push(e.path);
        }), this.setData({
            list: a
        }), console.log(this.data.list)), wx.removeStorageSync("newCommodityLast");
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        wx.hideShareMenu();
    }
});