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
        textarea: "",
        classify: [],
        list: [],
        textareaVal: "0",
        index: null,
        pickVal: null,
        postDataId: "",
        publishColor: "publishBtn",
        pushNow: !1
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
        e.data.list.length >= 5 ? wx.showToast({
            title: "图片已达上限"
        }) : wx.chooseImage({
            count: 5,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(o) {
                var i = o.tempFilePaths, n = t.data.list;
                n.push.apply(n, a(i)), e.setData({
                    list: n,
                    tempFilePaths: i
                });
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
            success: function(a) {
                if (++o == t.length) {
                    var i = a.data;
                    if ("object" != (void 0 === (i = i.replace(" ", "")) ? "undefined" : e(i))) {
                        i = i.replace(/\ufeff/g, "");
                        var n = JSON.parse(i);
                        a.data = n;
                    }
                    console.log(a.data.data), wx.hideLoading(), wx.reLaunch({
                        url: "../commentManage/commentManage"
                    });
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
    bindPickerChange: function(t) {
        console.log(this.data.index), console.log("picker发送选择改变，携带值为", t.detail.value), 
        this.setData({
            pickVal: this.data.classify[t.detail.value],
            index: t.detail.value
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
        if (console.log(this.data.textarea), null != this.data.pickVal) if ("" != this.data.textarea || void 0 != this.data.tempFilePaths) {
            this.setData({
                pushNow: !0,
                publishColor: "publishActive"
            }), wx.showLoading({
                title: "发表中..."
            });
            var a = new o.default({
                path: n.publishCommentSelfPost,
                data: {
                    uid: i.globalData.uid,
                    shopId: i.globalData.shopId,
                    version: this.data.pickVal,
                    textarea: this.data.textarea
                }
            });
            a.then(function(a) {
                0 == a.errcode ? (t.setData({
                    postDataId: a.data.id
                }), void 0 == t.data.tempFilePaths || "" == t.data.tempFilePaths ? (console.log(1), 
                wx.hideLoading(), wx.reLaunch({
                    url: "../commentManage/commentManage"
                })) : (console.log("array"), t.postImg(t.data.tempFilePaths, t))) : (t.setData({
                    pushNow: !1,
                    publishColor: "publishBtn"
                }), wx.showToast({
                    title: a.msg
                }));
            }), a.catch(function(t) {
                i.showLoading();
            });
        } else wx.showToast({
            icon: "loading",
            title: "请添加评论"
        }); else wx.showToast({
            icon: "loading",
            title: "请选择商品"
        });
    },
    onLoad: function(t) {
        var a = this;
        wx.hideShareMenu();
        var e = new o.default({
            path: n.publishCommentSelfGet,
            data: {
                uid: i.globalData.uid
            },
            reqtype: "GET"
        });
        e.then(function(t) {
            a.setData({
                classify: t.data.shopList.shopId
            });
        }), e.catch(function(t) {
            i.showLoading();
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