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
        classify: [ "新品上市", "促销活动", "通知消息" ],
        list: [],
        textareaVal: "0",
        textarea: null,
        index: null,
        pickVal: null,
        postDataId: "",
        publishColor: "publishBtn"
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
                var i, n = o.tempFilePaths;
                (i = console).log.apply(i, a(n));
                var l = t.data.list;
                l.push.apply(l, a(n)), e.setData({
                    list: l,
                    tempFilePaths: n
                });
            }
        });
    },
    bindPickerChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
            index: t.detail.value,
            pickVal: this.data.classify[t.detail.value]
        });
    },
    postImg: function(t, a) {
        console.log(a.data.postDataId);
        var o = 0;
        if (console.log(t), void 0 != t && "undefined" != t.length) for (var i = 0, n = t.length; i < n; i++) wx.uploadFile({
            url: "https://www.clyzt.cn/seller/message/upload-img",
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
                    wx.hideLoading(), setTimeout(function() {
                        wx.reLaunch({
                            url: "../index/index"
                        });
                    }, 2e3), console.log(a.data.data);
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
        var a = t.detail.cursor;
        this.setData({
            textareaVal: a,
            textarea: t.detail.value
        });
    },
    onLoad: function(t) {
        wx.hideShareMenu();
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
    fb: function() {
        var t = this;
        if (null != this.data.pickVal && null != this.data.textarea) {
            wx.showLoading({
                title: "新建中..."
            }), this.setData({
                publishColor: "publishActive"
            });
            var a = new o.default({
                path: n.newNews,
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
                }), void 0 == t.data.tempFilePaths ? (wx.hideLoading(), setTimeout(function() {
                    wx.reLaunch({
                        url: "../index/index"
                    });
                }, 2e3)) : t.postImg(t.data.tempFilePaths, t)) : (t.setData({
                    publishColor: "publishBtn"
                }), wx.showToast({
                    icon: "loading",
                    title: a.msg
                }));
            }), a.catch(function(t) {
                i.showLoading();
            });
        } else wx.showToast({
            title: "请填写完整信息"
        });
    }
});