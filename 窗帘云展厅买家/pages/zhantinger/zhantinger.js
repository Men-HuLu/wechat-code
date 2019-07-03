function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../utils/interface.js")), e = a(require("../../libs/ajax.js")), o = getApp(), n = require("../../utils/LPAPI/LPAPI.js");

Page({
    data: {
        checkboxChangeShopName: !1,
        checkboxChangeShopNum: !1,
        apply: !1,
        data: {},
        canvasWidth: 40,
        canvasHeight: 10,
        shopName: "",
        shopNum: "",
        concentration: 0,
        speed: 0
    },
    onLoad: function(a) {
        var n = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        }), new e.default({
            path: t.default.zhantinger,
            data: {
                uid: o.globalData.uid
            },
            reqtype: "GET"
        }).then(function(a) {
            n.setData({
                data: a.data,
                checkboxChangeShopName: a.data.changeShopName,
                checkboxChangeShopNum: a.data.changeShopNum
            }), wx.hideLoading();
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        if ("share" == a.target.dataset.share) return {
            title: "展厅信息",
            path: "/pages/shouye/shouye?yqm=" + this.data.data.yqm,
            success: function(a) {},
            fail: function(a) {}
        };
    },
    checkboxChangeShopName: function(a) {
        console.log(a), this.setData({
            checkboxChangeShopName: !this.data.checkboxChangeShopName
        }), console.log(this.data.checkboxChangeShopName), this.data.checkboxChangeShopName ? this.setData({
            shopName: this.data.data.shopName
        }) : this.setData({
            shopName: ""
        });
    },
    checkboxChangeShopNum: function(a) {
        console.log(a), this.setData({
            checkboxChangeShopNum: !this.data.checkboxChangeShopNum
        }), console.log(this.data.checkboxChangeShopNum), this.data.checkboxChangeShopNum ? this.setData({
            shopNum: this.data.data.shopId
        }) : this.setData({
            shopNum: ""
        });
    },
    switch1Change: function(a) {
        var n = this;
        console.log(a.detail.value), this.setData({
            apply: a.detail.value
        });
        var h = !1;
        h = 1 == this.data.apply ? 1 : 0, wx.showLoading({
            title: "加载中..."
        }), new e.default({
            path: t.default.zhantinger,
            data: {
                uid: o.globalData.uid,
                apply: h
            },
            reqtype: "GET"
        }).then(function(a) {
            n.setData({
                data: a.data
            }), wx.hideLoading();
        });
    },
    openPrinter: function() {
        wx.getImageInfo({
            src: this.data.data.img,
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
        n.setPrintSpeed(this.data.speed), n.setItemOrientation(0), n.drawQRCode(this.data.data.img, 20, 8, 16, 16), 
        n.setItemHorizontalAlignment(1), n.drawText(this.data.shopName, 28, 28, 3), n.setItemHorizontalAlignment(1), 
        n.drawText(this.data.shopNum, 28, 32, 3), n.endDrawLabel();
    },
    print: function() {
        n.print();
    },
    out: function() {
        wx.showModal({
            title: "警告",
            content: "将退出当前账号",
            confirmColor: "#3ca1ef",
            success: function(a) {
                a.confirm ? (o.globalData.uid = "0", o.globalData.shopId = "0", wx.reLaunch({
                    url: "../login/login"
                })) : a.cancel && console.log("用户点击取消");
            }
        });
    }
});