function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

a(require("../../libs/userLogin.js"));

var t = a(require("../../utils/interface.js")), e = a(require("../../libs/ajax.js")), n = getApp();

Page({
    data: {
        input: ""
    },
    change: function(a) {
        var t = a.currentTarget.dataset.index, e = this.data.data;
        e.data[t].label = a.detail.value;
        var n = e.data[t].arr;
        console.log(a.detail.value.includes);
        for (var i = 0; i < n.length; i++) a.detail.value.includes(n[i].name) ? n[i].select = !0 : n[i].select = !1;
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
    submit: function(a) {
        this.setData({
            input: a.detail.value
        });
    },
    clear: function() {
        this.setData({
            input: ""
        });
    },
    formSubmit: function(a) {
        var t = a.detail.value;
        t.search = this.data.input;
        try {
            wx.setStorageSync(this.data.callPage, t), wx.setStorageSync(this.data.callPage + "history", this.data.data), 
            wx.setStorageSync(this.data.callPage + "input", this.data.input), wx.removeStorageSync(this.data.callPage + "Data");
            var e = this.data.callPage;
            n.globalData[e] = !0, wx.navigateBack({});
        } catch (a) {}
    },
    formReset: function() {
        for (var a = this.data.data, t = 0; t <= a.data.length - 1; t++) {
            a.data[t].label = [];
            for (var e = 0; e <= a.data[t].arr.length - 1; e++) a.data[t].arr[e].select = !1;
        }
        this.setData({
            data: a,
            input: ""
        });
    },
    onLoad: function(a) {
        var n = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        });
        var i = new e.default({
            reqtype: "GET",
            path: t.default.search
        });
        i.then(function(t) {
            if (n.setData({
                data: t,
                callPage: a.callPage
            }), "shop" === n.data.callPage) console.log("商家商品列表页不需要缓存哦"); else {
                var e = wx.getStorageSync(n.data.callPage + "history");
                wx.setStorageSync(n.data.callPage + "input", ""), "" != e && n.setData({
                    data: e
                });
            }
            wx.hideLoading();
        }), i.catch(function(a) {
            console.log(a);
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