function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../utils/interface.js")), e = a(require("../../libs/ajax.js")), o = getApp(), n = require("../../utils/LPAPI/LPAPI.js");

Page({
    data: {
        search: "",
        data: "",
        page: 1,
        qrcode: "",
        concentration: 0,
        speed: 0
    },
    onLoad: function(a) {
        var n = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        }), new e.default({
            path: t.default.shoperwei,
            reqtype: "GET",
            data: {
                uid: o.globalData.uid,
                shopId: o.globalData.shopId,
                search: this.data.search,
                page: this.data.page
            }
        }).then(function(a) {
            wx.hideLoading(), n.setData({
                data: a.data
            });
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
    pullUpLoad: function() {
        var a = this, n = this.data.page;
        n += 1, this.setData({
            page: n
        }), wx.showLoading({
            title: "加载中..."
        });
        var i = new e.default({
            reqtype: "GET",
            path: t.default.shoperwei,
            data: {
                uid: o.globalData.uid,
                shopId: o.globalData.shopId,
                search: this.data.search,
                page: this.data.page
            }
        });
        i.then(function(t) {
            wx.hideLoading(), console.log(t.data), 0 == t.errcode ? (a.setData({
                data: a.data.data.concat(t.data)
            }), console.log(a.data.data)) : (wx.showLoading({
                title: t.msg
            }), setTimeout(function() {
                wx.hideLoading();
            }, 1e3));
        }), i.catch(function(a) {
            console.log(a);
        });
    },
    radioChangeCustomer: function(a) {
        console.log(a.detail.value);
        var t = a.detail.value, e = "";
        this.data.data.forEach(function(a, o) {
            console.log(a), console.log(o), a.checked = !1, o == t && (a.checked = !0, e = a.qrcode);
        }), this.setData({
            data: this.data.data,
            qrcode: e
        }), console.log(this.data.qrcode);
    },
    confirm: function(a) {
        var n = this;
        console.log(a.detail.value), this.setData({
            search: a.detail.value
        }), new e.default({
            path: t.default.shoperwei,
            reqtype: "GET",
            data: {
                uid: o.globalData.uid,
                shopId: o.globalData.shopId,
                search: this.data.search,
                page: this.data.page
            }
        }).then(function(a) {
            wx.hideLoading(), n.setData({
                data: a.data
            });
        });
    },
    clear: function() {
        this.setData({
            search: ""
        });
    },
    openPrinter: function() {
        wx.getImageInfo({
            src: this.data.qrcode,
            success: function(a) {
                console.log(a.path), wx.saveImageToPhotosAlbum({
                    filePath: a.path,
                    success: function(a) {
                        console.log(a), "saveImageToPhotosAlbum:ok" == a.errMsg ? wx.showToast({
                            icon: "success",
                            title: "保存成功"
                        }) : wx.showToast({
                            icon: "loading",
                            title: "请稍后再试"
                        });
                    },
                    fail: function(a) {
                        wx.showToast({
                            icon: "loading",
                            title: "保存失败"
                        });
                    }
                });
            }
        });
    },
    draw: function() {
        console.log(this.data.qrcode);
        n.startDrawLabel("test", this, 60, 30, 0), n.setPrintDarkness(this.data.concentration), 
        n.setPrintSpeed(this.data.speed), n.setItemHorizontalAlignment(0), n.drawQRCode(this.data.qrcode, 20, 8, 16, 16), 
        n.endDrawLabel();
    },
    print: function() {
        n.print();
    }
});