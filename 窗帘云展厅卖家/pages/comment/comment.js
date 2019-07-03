function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

n(require("../../libs/userLogin.js"));

var o = n(require("../../utils/interface.js")), t = n(require("../../libs/ajax.js"));

getApp();

Page({
    data: {},
    onLoad: function(n) {
        var e = this;
        console.log(n.id), wx.showLoading({
            title: "加载中..."
        });
        var i = new t.default({
            reqtype: "GET",
            path: o.default.comment + "?id=" + n.id
        });
        i.then(function(o) {
            console.log(o), e.setData({
                id: n.id,
                comment: o.comment
            }), wx.hideLoading();
        }), i.catch(function(n) {
            console.log(n);
        });
    },
    commentSubmit: function() {
        var n = this.data.id;
        wx.navigateTo({
            url: "../commentSubmit/commentSubmit?id=" + n
        });
    },
    onReady: function() {
        console.log(this.data);
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});