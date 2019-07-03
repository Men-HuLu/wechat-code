function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

var o = n(require("../../utils/interface.js")), t = n(require("../../libs/ajax.js")), e = getApp();

Page({
    data: {},
    onLoad: function(n) {
        var a = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        }), new t.default({
            path: o.default.personalCenter,
            data: {
                uid: e.globalData.uid
            },
            reqtype: "GET"
        }).then(function(n) {
            a.setData({
                data: n.data
            }), wx.hideLoading();
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
    notice: function() {
        wx.showModal({
            title: "提示",
            content: "此码可用于新用户注册时填写用"
        });
    },
    out: function() {
        wx.showModal({
            title: "警告",
            content: "将退出当前账号",
            confirmColor: "#3ca1ef",
            success: function(n) {
                n.confirm ? (e.globalData.uid = "0", e.globalData.shopId = "0", wx.reLaunch({
                    url: "../login/login"
                })) : n.cancel && console.log("用户点击取消");
            }
        });
    }
});