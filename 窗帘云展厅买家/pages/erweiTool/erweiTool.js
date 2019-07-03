function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var e = a(require("../../utils/interface.js")), n = a(require("../../libs/ajax.js")), t = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var o = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        }), new n.default({
            path: e.default.zhantinger,
            data: {
                uid: t.globalData.uid
            },
            reqtype: "GET"
        }).then(function(a) {
            o.setData({
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
        if (wx.hideShareMenu(), "share" == a.target.dataset.share) return {
            title: "展厅信息",
            path: "/pages/shouye/shouye?yqm=" + this.data.data.yqm,
            success: function(a) {},
            fail: function(a) {}
        };
    },
    out: function() {
        wx.showModal({
            title: "警告",
            content: "将退出当前账号",
            confirmColor: "#3ca1ef",
            success: function(a) {
                a.confirm ? (t.globalData.uid = "0", t.globalData.shopId = "0", wx.reLaunch({
                    url: "../login/login"
                })) : a.cancel && console.log("用户点击取消");
            }
        });
    }
});