function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

var o = n(require("../../libs/ajax.js")), t = (n(require("../../libs/userLogin.js")), 
getApp()), a = require("../../utils/interface.js");

Page({
    data: {
        indicatorDots: !0
    },
    onLoad: function(n) {
        var e = this;
        wx.hideShareMenu(), wx.clearStorage(), wx.showLoading({
            title: "加载中..."
        });
        var i = new o.default({
            reqtype: "GET",
            path: a.index,
            data: {
                uid: t.globalData.uid
            }
        });
        i.then(function(n) {
            console.log(n), 1 == n.data.is_dead && (wx.showToast({
                icon: "loading",
                title: "展厅已到期"
            }), setTimeout(function() {
                wx.reLaunch({
                    url: "/pages/myTime/myTime"
                });
            }, 1e3)), e.setData({
                data: n.data
            }), console.log(e.data.yqm), wx.hideLoading();
        }), i.catch(function(n) {
            t.showLoading();
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(n) {
        if (wx.hideShareMenu(), console.log(n), "share" == n.target.dataset.share) return {
            title: "展厅信息",
            path: "/pages/shouye/shouye?yqm=" + this.data.data.yqm,
            success: function(n) {},
            fail: function(n) {}
        };
    },
    out: function() {
        wx.showModal({
            title: "警告",
            content: "将退出当前账号",
            confirmColor: "#3ca1ef",
            success: function(n) {
                n.confirm ? (t.globalData.uid = "0", t.globalData.shopId = "0", wx.reLaunch({
                    url: "../login/login"
                })) : n.cancel && console.log("用户点击取消");
            }
        });
    },
    newCommodity: function() {
        var n = new o.default({
            reqtype: "GET",
            data: {
                shopId: t.globalData.shopId
            },
            path: a.judgeAdd
        });
        n.then(function(n) {
            0 == n.errcode ? wx.navigateTo({
                url: "../newCommodity/newCommodity"
            }) : wx.showModal({
                title: "提示",
                content: "请先添加商品分类",
                success: function(n) {
                    n.confirm ? wx.navigateTo({
                        url: "../classManagement/classManagement"
                    }) : n.cancel && console.log("用户点击取消");
                }
            });
        }), n.catch(function(n) {
            console.log(n);
        });
    },
    zhantinger: function() {
        console.log(this.data), 1 == this.data.data.hasMsg ? wx.navigateTo({
            url: "../zhantinger/zhantinger"
        }) : wx.showModal({
            title: "提示",
            content: "请将展厅基本信息填写完整",
            success: function(n) {
                n.confirm ? wx.navigateTo({
                    url: "../exhibitionInfo/exhibitionInfo"
                }) : n.cancel && console.log("用户点击取消");
            }
        });
    }
});