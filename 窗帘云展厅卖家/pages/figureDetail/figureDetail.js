function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

a(require("../../libs/userLogin.js"));

var e = a(require("../../utils/interface.js")), t = a(require("../../libs/ajax.js")), i = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var n = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        });
        var o = new t.default({
            reqtype: "GET",
            path: e.default.figureDetail,
            data: {
                id: a.id,
                userId: i.globalData.uid
            }
        });
        o.then(function(a) {
            console.log(a);
            var e = a.data.figure.price.toFixed(2);
            a.data.figure.price = e.split("."), n.setData({
                data: a.data
            }), console.log(n.data.data.detail), wx.hideLoading();
        }), o.catch(function(a) {
            console.log(a);
        });
    },
    navigator: function(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/CommodityDetails/CommodityDetails?id=" + e + "&share=1"
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