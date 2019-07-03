function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function a(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, o = t(require("../../libs/ajax.js")), i = (t(require("../../libs/userLogin.js")), 
getApp()), n = require("../../utils/interface.js");

Page({
    data: {
        list: [],
        textareaVal: "0",
        textarea: "",
        pushNow: !1,
        publistColor: "publishBtn"
    },
    previewImage: function(t) {
        var a = this;
        console.log(t.currentTarget.dataset.id), wx.showModal({
            title: "注意",
            content: "是否删除此图",
            success: function(e) {
                e.confirm ? (console.log("用户点击确定"), a.data.list.splice(t.currentTarget.dataset.id, 1), 
                a.data.tempFilePaths.splice(t.currentTarget.dataset.id, 1), a.setData({
                    list: a.data.list,
                    tempFilePaths: a.data.tempFilePaths
                })) : e.cancel && console.log("用户点击取消");
            }
        });
    },
    addImge: function() {
        var t = this, e = this;
        e.data.list.length >= 5 || wx.chooseImage({
            count: 3,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(o) {
                var i = o.tempFilePaths, n = t.data.list;
                n.push.apply(n, a(i)), e.setData({
                    list: n,
                    tempFilePaths: i
                }), console.log(t.data.list), console.log(t.data.tempFilePaths);
            }
        });
    },
    postImg: function(t, a) {
        console.log(a.data.postDataId);
        var o = 0;
        if (console.log(t), void 0 != t && "undefined" != t.length) for (var i = 0, n = t.length; i < n; i++) wx.uploadFile({
            url: "https://www.clyzt.cn/seller/figure/upload-img",
            filePath: t[i],
            name: "file",
            formData: {
                id: a.data.postDataId
            },
            header: {
                "Content-Type": "multipart/form-data"
            },
            success: function(i) {
                if (++o == t.length) {
                    var n = i.data;
                    if ("object" != (void 0 === (n = n.replace(" ", "")) ? "undefined" : e(n))) {
                        n = n.replace(/\ufeff/g, "");
                        var s = JSON.parse(n);
                        i.data = s;
                    }
                    console.log(i.data.data), wx.hideLoading(), wx.reLaunch({
                        url: "../shopDetail/shopDetail?id=" + a.data.id
                    }), wx.hideLoading();
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
    },
    textareaVal: function(t) {
        var a = t.detail.cursor, e = t.detail.value;
        this.setData({
            textareaVal: a,
            textarea: e
        });
    },
    btn: function() {
        var t = this;
        if ("" != this.data.textarea || void 0 != this.data.tempFilePaths) {
            this.setData({
                pushNow: !0,
                publistColor: "publishBtnLoad"
            }), wx.showLoading({
                title: "提交中..."
            });
            var a = new o.default({
                path: n.publishCommentSelfPost,
                data: {
                    uid: i.globalData.uid,
                    shopId: i.globalData.shopId,
                    textarea: this.data.textarea,
                    id: this.data.id
                }
            });
            a.then(function(a) {
                0 == a.errcode ? (t.setData({
                    postDataId: a.data.id
                }), void 0 == t.data.tempFilePaths || "" == t.data.tempFilePaths ? (wx.hideLoading(), 
                wx.reLaunch({
                    url: "../shopDetail/shopDetail?id=" + t.data.id
                })) : t.postImg(t.data.tempFilePaths, t)) : (t.setData({
                    publistColor: "publishBtn"
                }), wx.showToast({
                    icon: "loading",
                    title: a.msg
                }));
            }), a.catch(function(t) {
                i.showLoading();
            });
        } else wx.showToast({
            icon: "loading",
            title: "请添加评论"
        });
    },
    onLoad: function(t) {
        wx.hideShareMenu(), console.log(t.id), this.setData({
            id: t.id
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
    }
});