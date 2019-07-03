var t = getApp();

Page({
    data: {
        Types: [],
        RequestUrl: t.getRequestUrl
    },
    onLoad: function(t) {
        this.loadData();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    loadData: function() {
        var a = this;
        t.getOpenId(function(e) {
            wx.request({
                url: t.getUrl("GetProductTypes"),
                data: {},
                success: function(e) {
                    if ("OK" == e.data.Status) {
                        var n = e.data.Data;
                        a.setData({
                            Types: n
                        });
                    } else t.showErrorModal(e.data.Message);
                }
            });
        });
    },
    getType: function(t) {
        var a = "../samesearch/samesearch?cid=" + t.currentTarget.dataset.id + "&cname=" + t.currentTarget.dataset.name;
        wx.navigateTo({
            url: a
        });
    }
});