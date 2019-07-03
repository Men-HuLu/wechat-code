function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

a(require("../../utils/interface.js")), a(require("../../libs/ajax.js")), getApp();

Page({
    data: {},
    change: function(a) {
        var t = a.currentTarget.dataset.index, e = this.data.data;
        e.data[t].label = a.detail.value;
        var n = e.data[t].arr;
        console.log(a.detail.value.includes);
        for (var o = 0; o < n.length; o++) a.detail.value.includes(n[o].name) ? n[o].select = !0 : n[o].select = !1;
        this.setData({
            data: e
        }), console.log(e);
    },
    select: function(a) {
        var t = a.currentTarget.dataset.index, e = this.data.data;
        1 == this.data.data.data[t].select ? (e.data[t].select = !1, this.setData({
            data: e
        })) : (e.data[t].select = !0, this.setData({
            data: e
        }));
    },
    formSubmit: function(a) {
        var t = this.data.detailId;
        console.log("form发生了submit事件，携带数据为：", a.detail.value);
        var e = {};
        try {
            var n = wx.getStorageSync("firstShop");
            n && (e = n);
        } catch (a) {
            console.log("错误");
        }
        e.attr = a.detail.value, wx.setStorage({
            key: "firstShop",
            data: e
        }), wx.navigateTo({
            url: "../shopCopyLast/shopCopyLast?id=" + t
        });
    },
    lastbtn: function() {
        wx.navigateBack();
    },
    onLoad: function(a) {
        wx.hideShareMenu();
        try {
            var t = wx.getStorageSync("getShop");
            if (t) var e = t;
        } catch (a) {}
        this.setData({
            data: e,
            detailId: a.id
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
    }
});