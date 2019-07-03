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
        detImgId: [],
        imgCheckList: "0",
        upLoadImgUrl: [],
        url: null,
        storage: {}
    },
    upload: function() {
        if (console.log(this.data.id), null != this.data.url) {
            console.log(this.data.upLoadImgUrl, "------------");
            var t = this.data.storage, a = t.imgLoadImg.length + this.data.upLoadImgUrl.length;
            if (console.log(a, "------------"), a > 10) wx.showModal({
                title: "提示",
                content: "图片数量超出限制,请删除图片"
            }); else {
                t.imgLoadImg = t.imgLoadImg.concat(this.data.upLoadImgUrl);
                try {
                    wx.setStorageSync("firstShop", t), console.log(t);
                } catch (t) {}
                wx.reLaunch({
                    url: "../newCommodity/newCommodity"
                }), console.log(t);
            }
        } else wx.showModal({
            title: "提示",
            content: "请在新建商品中上传图片用"
        });
    },
    checkImg: function() {
        var t = this;
        wx.chooseImage({
            count: 9,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var o = e.tempFilePaths;
                wx.showToast({
                    title: "正在上传...",
                    icon: "loading",
                    mask: !0,
                    duration: 1e4
                });
                for (var s = 0, n = 0, l = o.length; n < l; n++) wx.uploadFile({
                    url: "https://www.clyzt.cn/seller/atlas/imgpath",
                    filePath: o[n],
                    name: "file",
                    formData: {
                        imgIndex: n,
                        id: t.data.id,
                        uid: i.globalData.uid,
                        shopId: i.globalData.shopId
                    },
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function(e) {
                        if (++s == o.length) {
                            var i = e.data;
                            if ("object" != (void 0 === (i = i.replace(" ", "")) ? "undefined" : a(i))) {
                                i = i.replace(/\ufeff/g, ""), console.log(i);
                                var n = JSON.parse(i);
                                e.data = n;
                            }
                            if (0 != e.data.errcode) return void wx.showToast({
                                title: e.data.msg
                            });
                            t.setData({
                                data: e.data.data
                            }), wx.hideToast();
                        }
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
    del: function() {
        var t = this;
        console.log(this.data.detImgId), wx.showLoading({
            title: "删除中..."
        }), new o.default({
            path: e.default.albumManageDel,
            data: {
                delImgId: this.data.detImgId
            }
        }).then(function(a) {
            wx.hideLoading(), 0 == a.errcode ? (t.setData({
                data: a.data,
                imgCheckList: "0",
                detImgId: []
            }), t.arr = []) : (wx.showLoading({
                title: a.msg
            }), setTimeout(function() {
                wx.hideLoading();
            }, 1e3));
        });
    },
    addImge: function() {
        var t = this;
        this.data.list.length >= 5 || wx.chooseImage({
            count: 5,
            sizeType: "original",
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var e = a.tempFilePaths;
                console.log(e);
                for (var o = 0; o < a.tempFiles.length; o++) a.tempFiles[o].checked = !1;
                var i = t.data.list;
                i.push(a.tempFiles), t.setData({
                    list: i
                }), console.log(t.data.list);
            }
        });
    },
    checkbox: function(t) {
        console.log(t), this.arr = this.arr || [], this.imgCheckList = this.imgCheckList || "0";
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.url;
        this.arr.includes(a) ? (this.arr.splice(this.arr.indexOf(a), 1), this.uploadImg.splice(this.arr.indexOf(a), 1)) : (this.arr.push(a), 
        this.uploadImg.push(e)), this.imgCheckList = this.arr.length;
        for (var o = 0; o < this.data.data.length; o++) this.data.data[o].id == a && (this.data.data[o].checkbox = !this.data.data[o].checkbox);
        this.setData({
            data: this.data.data,
            detImgId: this.arr,
            upLoadImgUrl: this.uploadImg,
            imgCheckList: this.imgCheckList
        }), console.log(this.data.data), console.log(this.data.detImgId), console.log(this.data.upLoadImgUrl);
    },
    onLoad: function(t) {
        var a = this;
        wx.hideShareMenu(), "null" == t.url && (t.url = null), this.setData({
            id: t.id,
            url: t.url
        }), new o.default({
            reqtype: "GET",
            data: {
                shop_id: i.globalData.shopId,
                id: this.data.id
            },
            path: e.default.albumManage
        }).then(function(t) {
            a.setData({
                data: t.data
            }), console.log(t);
        }), this.uploadImg = [];
        var s = this;
        wx.getStorage({
            key: "firstShop",
            success: function(t) {
                console.log(t.data), s.setData({
                    storage: t.data
                });
            }
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
    previewImage: function(t) {
        var a = t.target;
        console.log(a);
        var e = [];
        this.data.data.forEach(function(t, a) {
            console.log(t.img, "item"), console.log(a, "index"), e.push(t.img);
        }), console.log(e), wx.previewImage({
            current: a.dataset.src,
            urls: e
        });
    }
});