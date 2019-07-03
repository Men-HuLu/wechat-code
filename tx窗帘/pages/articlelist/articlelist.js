var a = getApp();

Page({
    data: {
        List: [],
        PageIndex: 1,
        PageSize: 10,
        RequestUrl: a.getRequestUrl
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {
        this.loadData(this, !1);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    loadData: function(t, e) {
        wx.showNavigationBarLoading(), a.getOpenId(function(n) {
            wx.request({
                url: a.getUrl("GetArticleList"),
                data: {
                    openId: n,
                    pageIndex: t.data.PageIndex,
                    pageSize: t.data.PageSize
                },
                success: function(a) {
                    if ("OK" == a.data.Status) {
                        var n = a.data.Data;
                        if (e) {
                            var i = t.data.List;
                            i.push.apply(i, n), t.setData({
                                List: i
                            });
                        } else t.setData({
                            List: n
                        });
                        wx.hideNavigationBarLoading();
                    } else "NOUser" == a.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: a.data.Message,
                        showCancel: !1,
                        success: function(a) {
                            a.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }
            });
        });
    },
    bindArticleTap: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../article/article?id=" + t
        });
    }
});