function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../utils/interface.js")), e = a(require("../../libs/ajax.js")), o = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var n = this;
        wx.hideShareMenu(), void 0 == a.shopid ? this.setData({
            shopId: o.globalData.shopId
        }) : this.setData({
            shopId: a.shopid
        }), console.log(this.data.shopId), new e.default({
            path: t.default.sharePage,
            data: {
                uid: o.globalData.uid,
                shopId: this.data.shopId
            },
            reqtype: "GET"
        }).then(function(a) {
            console.log(a), n.setData({
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
    previewImage: function(a) {
        console.log(a.target.dataset.src);
        var t = [ a.target.dataset.src ];
        wx.previewImage({
            urls: t
        });
    }
});