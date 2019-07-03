function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../utils/interface.js")), i = a(require("../../libs/ajax.js")), e = getApp();

Page({
    data: {
        tabCli: "browse",
        array: [ "今日", "昨日", "本周", "本月", "今年" ],
        index: "0",
        page: 1
    },
    tabTitle: function(a) {
        var o = this, n = a.target.dataset.tab;
        console.log(n), this.setData({
            tabCli: n,
            page: 1
        }), wx.showLoading({
            title: "加载中..."
        });
        var d = new i.default({
            path: t.default.visitorStatistics,
            data: {
                uid: e.globalData.uid,
                index: this.data.index,
                tab: this.data.tabCli,
                shopId: e.globalData.shopId
            },
            reqtype: "GET"
        });
        d.then(function(a) {
            o.setData({
                data: a.data
            }), console.log(a), wx.hideLoading();
        }), d.catch(function(a) {
            e.showLoading();
        });
    },
    bindPickerChange: function(a) {
        var o = this;
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            index: a.detail.value,
            page: 1
        }), wx.showLoading({
            title: "加载中..."
        });
        var n = new i.default({
            path: t.default.visitorStatistics,
            data: {
                uid: e.globalData.uid,
                index: this.data.index,
                tab: this.data.tabCli,
                shopId: e.globalData.shopId
            },
            reqtype: "GET"
        });
        n.then(function(a) {
            o.setData({
                data: a.data
            }), console.log(a), wx.hideLoading();
        }), n.catch(function(a) {
            e.showLoading();
        });
    },
    navigation: function(a) {
        console.log(a.currentTarget.dataset.id), wx.navigateTo({
            url: "../visitorInformation/visitorInformation?id=" + a.currentTarget.dataset.id
        });
    },
    onLoad: function(a) {
        var o = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        });
        var n = new i.default({
            path: t.default.visitorStatistics,
            data: {
                uid: e.globalData.uid,
                index: this.data.index,
                tab: this.data.tabCli,
                shopId: e.globalData.shopId
            },
            reqtype: "GET"
        });
        n.then(function(a) {
            o.setData({
                data: a.data
            }), console.log(a), wx.hideLoading();
        }), n.catch(function(a) {
            e.showLoading();
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
    pullUpLoad: function() {
        var a = this, o = this.data.page;
        o += 1, this.setData({
            page: o
        }), wx.showLoading({
            title: "加载中..."
        });
        var n = new i.default({
            path: t.default.visitorStatistics,
            data: {
                uid: e.globalData.uid,
                index: this.data.index,
                tab: this.data.tabCli,
                shopId: e.globalData.shopId,
                page: this.data.page
            },
            reqtype: "GET"
        });
        n.then(function(t) {
            a.setData({
                data: a.data.data.concat(t.data)
            }), console.log(t), wx.hideLoading();
        }), n.catch(function(a) {
            e.showLoading();
        });
    }
});