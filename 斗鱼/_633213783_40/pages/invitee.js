function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../config/index")), e = t(require("../common/httpClient.js")), n = getApp();

Page({
    data: {
        list: [],
        token: "",
        paginatation: {},
        currentPage: 1
    },
    lower: function(t) {
        var a = this.data.paginatation;
        a.current * a.pageSize < a.total && (this.setData({
            currentPage: this.data.currentPage + 1
        }), this.getHelpInfo(this.data.currentPage));
    },
    onLoad: function() {
        this.getHelpInfo(1), wx.hideShareMenu();
    },
    getHelpInfo: function(t) {
        var i = this, o = n.globalData.userInfo.token;
        e.default.request({
            url: a.default.API.TREASURE_HELPINFO,
            method: "GET",
            data: {
                token: o,
                current: t,
                pageSize: 20,
                did: n.globalData.did || ""
            }
        }).then(function(t) {
            0 === t.error ? (t.data.list.forEach(function(t) {
                i.data.list.push(t);
            }), i.setData({
                list: i.data.list,
                datapaginatation: t.data.paginatation
            })) : wx.showToast({
                title: t.msg,
                icon: "none",
                duration: 2e3
            }), wx.stopPullDownRefresh();
        }).catch(function(t) {
            wx.showToast({
                title: "网络异常",
                icon: "none",
                duration: 2e3
            }), wx.stopPullDownRefresh();
        });
    },
    onPullDownRefresh: function() {
        var t = this.data.paginatation;
        t.current * t.pageSize < t.total ? (this.setData({
            currentPage: this.data.currentPage + 1
        }), this.getHelpInfo(this.data.currentPage)) : wx.stopPullDownRefresh();
    }
});