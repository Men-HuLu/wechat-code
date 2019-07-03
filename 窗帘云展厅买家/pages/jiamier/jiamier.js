function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../utils/interface.js")), e = a(require("../../libs/ajax.js")), o = getApp(), n = require("../../utils/LPAPI/LPAPI.js");

Page({
    data: {
        checkboxChangeFlag: 0,
        checkboxChangeShopName: !1,
        shopName: "",
        src: "",
        pringNum: 0,
        concentration: 0,
        speed: 0
    },
    onLoad: function(a) {
        var n = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        }), new e.default({
            path: t.default.exhibitionInfo,
            data: {
                uid: o.globalData.uid,
                id: o.globalData.shopId
            },
            reqtype: "GET"
        }).then(function(a) {
            n.setData({
                data: a.data,
                shopName: a.data.shopName
            }), wx.hideLoading();
        }), new e.default({
            path: t.default.jiamier,
            data: {
                uid: o.globalData.uid,
                flag: 1,
                shopId: o.globalData.shopId
            },
            reqtype: "GET"
        }).then(function(a) {
            n.setData({
                src: a.data.url
            }), console.log(n.data.src);
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
    formSubmit: function(a) {
        var n = a.detail.value;
        n.id = o.globalData.shopId, n.uid = o.globalData.uid;
        var i = new e.default({
            path: t.default.jiamierPost,
            data: n
        });
        i.then(function(a) {
            0 == a.errcode ? wx.reLaunch({
                url: "../erweiTool/erweiTool"
            }) : (wx.showLoading({
                title: a.msg
            }), setTimeout(function() {
                wx.hideLoading();
            }, 1e3));
        }), i.catch(function(a) {
            o.showLoading();
        });
    },
    checkboxChangeShopName: function(a) {
        var n = this;
        wx.showLoading({
            title: "修改中..."
        }), console.log(a), this.setData({
            checkboxChangeShopName: !this.data.checkboxChangeShopName
        }), this.data.checkboxChangeShopName ? this.setData({
            checkboxChangeFlag: 1
        }) : this.setData({
            checkboxChangeFlag: 0
        }), console.log(this.data.checkboxChangeShopName), new e.default({
            path: t.default.jiamier,
            data: {
                flag: this.data.checkboxChangeFlag,
                uid: o.globalData.uid,
                shopId: o.globalData.shopId
            },
            reqtype: "GET"
        }).then(function(a) {
            n.setData({
                src: a.data.url
            }), wx.hideLoading();
        });
    },
    openPrinter: function() {
        wx.getImageInfo({
            src: this.data.src,
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
        n.startDrawLabel("test", this, 60, 40, 0), n.setPrintDarkness(this.data.concentration), 
        n.setPrintSpeed(this.data.speed), n.setItemOrientation(0), n.drawQRCode(this.data.src, 20, 2, 16, 16), 
        n.setItemHorizontalAlignment(1), n.drawText(this.data.shopName, 28, 22, 3), n.endDrawLabel();
    },
    print: function() {
        n.print();
    },
    pringNum: function(a) {
        console.log(a.detail.value), this.setData({
            pringNum: a.detail.value
        });
    }
});