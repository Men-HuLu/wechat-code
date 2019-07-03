var t = getApp(), e = require("../wxParse/wxParse.js");

Page({
    data: {
        Article: [],
        MetaDescription: "",
        RequestUrl: t.getRequestUrl
    },
    onLoad: function(a) {
        var n = a.id, o = this;
        t.getOpenId(function(a) {
            wx.request({
                url: t.getUrl("GetArticle"),
                data: {
                    openId: a,
                    articleId: n
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                        var a = t.data.Data;
                        a.content = a.content.replace(/src=\"\/data\/uploads/g, 'src="' + o.data.RequestUrl + "/data/uploads"), 
                        e.wxParse("content", "html", a.content, o, "12"), o.setData({
                            Article: a
                        }), wx.hideNavigationBarLoading();
                    } else "NOUser" == t.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: t.data.Message,
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }
            });
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