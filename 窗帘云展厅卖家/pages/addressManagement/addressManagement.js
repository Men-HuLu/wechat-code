function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../libs/userLogin.js"));

var n = e(require("../../utils/interface.js")), a = e(require("../../libs/ajax.js")), t = getApp();

Page({
    data: {},
    onLoad: function(e) {},
    navigator: function(e) {
        var n = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../NewAddress/NewAddress?remove=true&id=" + n
        });
    },
    navigatoradd: function() {
        wx.navigateTo({
            url: "../NewAddress/NewAddress?remove=false"
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        });
        var o = new a.default({
            reqtype: "GET",
            path: n.default.addressManagement,
            data: {
                userId: t.globalData.uid
            }
        });
        o.then(function(n) {
            console.log(n), e.setData({
                data: n.data
            }), wx.hideLoading();
        }), o.catch(function(e) {
            console.log(e);
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});