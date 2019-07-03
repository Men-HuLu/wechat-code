function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, n = e(require("../../utils/interface.js")), o = e(require("../../libs/ajax.js")), i = getApp();

Page({
    data: {
        newImg: null,
        userImg: ""
    },
    onLoad: function(e) {
        var t = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        }), new o.default({
            path: n.default.exhibitionInfo,
            data: {
                uid: i.globalData.uid,
                id: i.globalData.shopId
            },
            reqtype: "GET"
        }).then(function(e) {
            t.setData({
                data: e.data,
                userImg: e.data.userImg
            }), wx.hideLoading();
        });
    },
    formSubmit: function(e) {
        e.detail.value.userImg = this.data.userImg;
        var t = {
            data: JSON.stringify(e.detail.value),
            id: i.globalData.shopId
        }, u = new o.default({
            path: n.default.exhibitionInfoPost,
            data: t
        });
        u.then(function(e) {
            0 == e.errcode ? wx.reLaunch({
                url: "../index/index"
            }) : (wx.showLoading({
                title: e.msg
            }), setTimeout(function() {
                wx.hideLoading();
            }, 1e3));
        }), u.catch(function(e) {
            i.showLoading();
        }), null != this.data.newImg && wx.uploadFile({
            url: "https://www.clyzt.cn/seller/shop/upload-img",
            filePath: this.data.data.userImg,
            name: "file",
            formData: {
                uid: i.globalData.uid,
                id: i.globalData.shopId
            },
            header: {
                "Content-Type": "multipart/form-data"
            },
            success: function(e) {
                var t = e.data;
                if ("object" != (void 0 === (t = t.replace(" ", "")) ? "undefined" : a(t))) {
                    t = t.replace(/\ufeff/g, "");
                    var n = JSON.parse(t);
                    e.data = n;
                }
                wx.reLaunch({
                    url: "../index/index"
                }), console.log(e.data.data), wx.hideLoading();
            },
            fail: function(e) {
                wx.hideToast(), wx.showModal({
                    title: "错误提示",
                    content: "上传图片失败",
                    showCancel: !1,
                    success: function(e) {}
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
    addImge: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var n, o = a.tempFilePaths;
                o = o.join(""), e.setData((n = {}, t(n, "data.userImg", o), t(n, "newImg", o), t(n, "userImg", o), 
                n)), console.log(e.data.data.userImg);
            }
        });
    }
});