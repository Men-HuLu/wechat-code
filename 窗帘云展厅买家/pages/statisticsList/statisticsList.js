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
        var n = this, d = a.target.dataset.tab;
        console.log(d), this.setData({
            tabCli: d,
            page: 1
        }), wx.showLoading({
            title: "加载中..."
        });
        var o = new i.default({
            reqtype: "GET",
            data: {
                tab: this.data.tabCli,
                time: this.data.index,
                uid: e.globalData.uid
            },
            path: t.default.statisticsList
        });
        o.then(function(a) {
            n.setData({
                data: a.data
            }), console.log(a.data), wx.hideLoading();
        }), o.catch(function(a) {
            e.showLoading();
        });
    },
    bindPickerChange: function(a) {
        var n = this;
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            index: a.detail.value,
            page: 1
        }), wx.showLoading({
            title: "加载中..."
        });
        var d = new i.default({
            reqtype: "GET",
            data: {
                tab: this.data.tabCli,
                time: this.data.index,
                uid: e.globalData.uid
            },
            path: t.default.statisticsList
        });
        d.then(function(a) {
            n.setData({
                data: a.data
            }), console.log(a.data), wx.hideLoading();
        }), d.catch(function(a) {
            e.showLoading();
        });
    },
    onLoad: function(a) {
        var n = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        });
        var d = new i.default({
            reqtype: "GET",
            data: {
                tab: this.data.tabCli,
                time: this.data.index,
                uid: e.globalData.uid
            },
            path: t.default.statisticsList
        });
        d.then(function(a) {
            n.setData({
                data: a.data
            }), wx.hideLoading(), console.log(a.data);
        }), d.catch(function(a) {
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
        var a = this, n = this.data.page;
        n += 1, this.setData({
            page: n
        }), wx.showLoading({
            title: "加载中..."
        });
        var d = new i.default({
            reqtype: "GET",
            data: {
                tab: this.data.tabCli,
                time: this.data.index,
                uid: e.globalData.uid,
                page: this.data.page
            },
            path: t.default.statisticsList
        });
        d.then(function(t) {
            a.setData({
                data: a.data.data.concat(t.data)
            }), wx.hideLoading(), console.log(t.data);
        }), d.catch(function(a) {
            e.showLoading();
        });
    }
});