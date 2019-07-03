function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = t(require("../../utils/interface.js")), i = t(require("../../libs/ajax.js")), o = getApp();

Page({
    data: {
        list: [],
        textareaVal: "0",
        detImgId: [],
        imgCheckList: "0",
        upLoadImgUrl: [],
        url: null,
        detailId: null
    },
    upload: function() {
        var t = this;
        wx.showLoading({
            title: "上传中..."
        });
        var a = [];
        this.data.upLoadImgUrl.forEach(function(e, i) {
            var o = {};
            o.path = e, o.id = t.data.detImgId[i], a.push(o);
        });
        var o = this.data.url;
        if (null != o) {
            var d = wx.getStorageSync(o);
            return a = a.concat(d), wx.setStorageSync(o, a), void wx.navigateTo({
                url: "/pages/" + o + "/" + o + "?id=" + this.data.detailId
            });
        }
        var s = {
            ids: this.data.detImgId,
            id: this.data.detailId
        };
        new i.default({
            path: e.default.gallerManageUpLoad,
            data: s
        }).then(function(a) {
            wx.hideLoading(), 0 == a.errcode ? wx.navigateTo({
                url: "../shopCopyFirst/shopCopyFirst?id=" + t.data.detailId
            }) : (wx.showLoading({
                title: a.msg
            }), setTimeout(function() {
                wx.hideLoading();
            }, 1e3));
        });
    },
    checkImg: function() {
        var t = this;
        wx.chooseImage({
            count: 9,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var i = e.tempFilePaths;
                wx.showToast({
                    title: "正在上传...",
                    icon: "loading",
                    mask: !0,
                    duration: 1e4
                });
                for (var d = 0, s = 0, n = i.length; s < n; s++) wx.uploadFile({
                    url: "https://www.clyzt.cn/seller/atlas/imgpath",
                    filePath: i[s],
                    name: "file",
                    formData: {
                        imgIndex: s,
                        id: t.data.id,
                        uid: o.globalData.uid,
                        shopId: o.globalData.shopId
                    },
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function(e) {
                        if (++d == i.length) {
                            var o = e.data;
                            if ("object" != (void 0 === (o = o.replace(" ", "")) ? "undefined" : a(o))) {
                                o = o.replace(/\ufeff/g, "");
                                var s = JSON.parse(o);
                                e.data = s;
                            }
                            t.setData({
                                data: e.data.data
                            }), console.log(t.data.data), console.log(e.data.data), wx.hideToast();
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
        }), new i.default({
            path: e.default.albumManageDel,
            data: {
                delImgId: this.data.detImgId
            }
        }).then(function(a) {
            wx.hideLoading(), 0 == a.errcode ? t.setData({
                data: a.data,
                imgCheckList: "0"
            }) : (wx.showLoading({
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
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var e = a.tempFilePaths;
                console.log(e);
                for (var i = 0; i < a.tempFiles.length; i++) a.tempFiles[i].checked = !1;
                var o = t.data.list;
                o.push(a.tempFiles), t.setData({
                    list: o
                }), console.log(t.data.list);
            }
        });
    },
    checkbox: function(t) {
        console.log(t), this.arr = this.arr || [], this.imgCheckList = this.imgCheckList || "0";
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.url;
        this.arr.includes(a) ? (this.arr.splice(this.arr.indexOf(a), 1), this.uploadImg.splice(this.arr.indexOf(a), 1)) : (this.arr.push(a), 
        this.uploadImg.push(e)), this.imgCheckList = this.arr.length;
        for (var i = 0; i < this.data.data.length; i++) this.data.data[i].id == a && (this.data.data[i].checkbox = !this.data.data[i].checkbox);
        this.setData({
            data: this.data.data,
            detImgId: this.arr,
            upLoadImgUrl: this.uploadImg,
            imgCheckList: this.imgCheckList
        }), console.log(this.data.data), console.log(this.data.detImgId), console.log(this.data.upLoadImgUrl);
    },
    onLoad: function(t) {
        var a = this;
        wx.hideShareMenu(), "null" == t.detailId && (t.detailId = null), void 0 != t.url && this.setData({
            url: t.url
        }), this.setData({
            id: t.id,
            detailId: t.detailId
        }), new i.default({
            reqtype: "GET",
            data: {
                shop_id: o.globalData.shopId,
                id: this.data.id
            },
            path: e.default.albumManage
        }).then(function(t) {
            a.setData({
                data: t.data
            }), console.log(t);
        }), this.uploadImg = [];
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        wx.hideShareMenu();
    }
});