function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

t(require("../../libs/userLogin.js"));

var a = t(require("../../utils/interface.js")), i = t(require("../../libs/ajax.js")), o = getApp();

Page({
    data: {
        list: [],
        textarea: 0,
        text: "",
        submit: !0
    },
    formSubmit: function(t) {
        var e = this;
        if (1 == this.data.submit) {
            this.setData({
                submit: !1
            });
            var n = t.detail.formId, s = this.data.list, l = 0;
            if (console.log(s.length), s.length > 5) wx.showToast({
                title: "您上传图片太多了，最多5张哦！",
                icon: "none"
            }), this.setData({
                submit: !0
            }); else if ("" == this.data.text) wx.showToast({
                title: "请输入评论内容",
                icon: "none"
            }), this.setData({
                submit: !0
            }); else {
                wx.showToast({
                    title: "正在上传...",
                    icon: "loading",
                    mask: !0,
                    duration: 1e6
                });
                var r = new i.default({
                    path: a.default.commentSubmitPost,
                    data: {
                        formId: n,
                        id: this.data.id,
                        userId: o.globalData.uid,
                        text: this.data.text,
                        userInfo: JSON.stringify(o.globalData.userInfo)
                    }
                });
                r.then(function(t) {
                    if (1 == t.errcode) {
                        var e = t.data;
                        if (s.length >= 1) for (var a = 0; a < s.length; a++) wx.uploadFile({
                            url: "https://www.clyzt.cn/site/upload-img",
                            filePath: s[a],
                            name: "file",
                            formData: {
                                id: e
                            },
                            header: {
                                "Content-Type": "multipart/form-data"
                            },
                            success: function(t) {
                                console.log(t), ++l == s.length && (wx.showToast({
                                    title: "上传成功，等待商家审核",
                                    icon: "none"
                                }), setTimeout(function() {
                                    wx.hideToast(), wx.navigateBack({});
                                }, 500));
                            },
                            fail: function(t) {
                                wx.hideToast(), wx.showModal({
                                    title: "错误提示",
                                    content: "上传图片失败",
                                    showCancel: !1,
                                    success: function(t) {}
                                });
                            }
                        }); else wx.showToast({
                            title: "上传成功"
                        }), setTimeout(function() {
                            wx.hideToast(), wx.navigateBack({});
                        }, 500);
                    } else wx.hideToast(), wx.showToast({
                        title: t.msg,
                        icon: "none"
                    });
                }), r.catch(function(t) {
                    e.setData({
                        submit: !0
                    }), console.log(t);
                });
            }
        }
    },
    removeImage: function(t) {
        for (var e = t.currentTarget.dataset.index, a = [], i = 0; i <= this.data.list.length - 1; i++) i != e && a.push(this.data.list[i]);
        this.setData({
            list: a
        });
    },
    onLoad: function(t) {
        var e = this;
        wx.hideShareMenu(), this.setData({
            id: t.id,
            share: t.share
        }), wx.showLoading({
            title: "加载中..."
        });
        var n = new i.default({
            reqtype: "GET",
            path: a.default.commentSubmit,
            data: {
                id: t.id,
                userId: o.globalData.uid
            }
        });
        n.then(function(t) {
            var a = t.data.price.toFixed(2);
            t.data.price = a.split("."), console.log(t.data.price), e.setData({
                data: t.data
            }), wx.hideLoading();
        }), n.catch(function(t) {
            console.log(t);
        });
    },
    addImge: function() {
        var t = this, a = this.data.list;
        a.length >= 5 ? wx.showToast({
            title: "图片已达上限",
            icon: "none"
        }) : wx.chooseImage({
            count: 5 - a.length,
            sizeType: [ "original" ],
            sourceType: [ "album", "camera" ],
            success: function(i) {
                var o = i.tempFilePaths;
                console.log(o), a.push.apply(a, e(o)), t.setData({
                    list: a
                });
            }
        });
    },
    textareaInput: function(t) {
        this.setData({
            textarea: t.detail.value.length,
            text: t.detail.value
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});