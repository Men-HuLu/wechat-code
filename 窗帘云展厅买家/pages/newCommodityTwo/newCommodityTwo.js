function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../utils/interface.js")), e = t(require("../../libs/ajax.js"));

getApp();

Page({
    data: {},
    change: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.data;
        e.data[a].label = t.detail.value;
        var n = e.data[a].arr;
        console.log(t.detail.value.includes);
        for (var o = 0; o < n.length; o++) t.detail.value.includes(n[o].name) ? n[o].select = !0 : n[o].select = !1;
        this.setData({
            data: e
        }), console.log(e);
    },
    select: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.data;
        1 == this.data.data.data[a].select ? (e.data[a].select = !1, this.setData({
            data: e
        })) : (e.data[a].select = !0, this.setData({
            data: e
        }));
    },
    formSubmit: function(t) {
        console.log("form发生了submit事件，携带数据为：", t.detail.value);
        var a = {};
        try {
            var e = wx.getStorageSync("firstShop");
            e && (a = e);
        } catch (t) {
            console.log("错误");
        }
        a.attr = t.detail.value, wx.setStorage({
            key: "firstShop",
            data: a
        }), wx.navigateTo({
            url: "../newCommodityLast/newCommodityLast"
        });
    },
    lastbtn: function() {
        wx.navigateBack();
    },
    onLoad: function(t) {
        var n = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        });
        var o = new e.default({
            reqtype: "GET",
            path: a.default.newCommodityTwo
        });
        o.then(function(t) {
            n.setData({
                data: t
            }), wx.hideLoading();
        }), o.catch(function(t) {
            console.log(t);
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