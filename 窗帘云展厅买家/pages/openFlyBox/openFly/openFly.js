function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../libs/ajax.js")), n = e(require("../../../utils/interface.js"));

getApp();

Page({
    data: {
        return: !1
    },
    sureOpen: function(e) {
        console.log(e.currentTarget.dataset.flyid);
        var t = e.currentTarget.dataset.flyid;
        wx.navigateTo({
            url: "../openFlyType/openFlyType?flyid=" + t + "&return=" + this.data.return
        });
    },
    onLoad: function(e) {
        var a = this;
        wx.hideShareMenu(), "true" == e.return ? this.setData({
            return: e.return
        }) : void 0 == e.return && this.setData({
            return: !1
        }), wx.showLoading({
            title: "加载中..."
        });
        var o = new t.default({
            path: n.default.openFly,
            reqtype: "GET"
        });
        o.then(function(e) {
            console.log(e.data), a.setData({
                data: e.data
            }), wx.hideLoading();
        }), o.catch(function(e) {
            console.log(e);
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
    backBtn: function() {
        wx.navigateBack({});
    }
});