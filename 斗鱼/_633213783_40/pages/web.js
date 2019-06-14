var t = getApp();

Page({
    data: {
        url: ""
    },
    onLoad: function() {
        this.setData({
            url: t.getUrlParam("url"),
            title: t.getUrlParam("title")
        });
    },
    onShareAppMessage: function() {
        var t = this.data;
        return {
            title: t.title,
            path: "/pages/activity?shareUrl=" + t.url,
            imageUrl: t.imageUrl
        };
    },
    bindGetMsg: function(t) {
        var a = t.detail;
        a.data && a.data.length && this.setData(a.data[0]);
    }
});