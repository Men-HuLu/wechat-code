function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../utils/interface.js")), i = t(require("../../libs/ajax.js")), e = getApp();

Page({
    data: {
        visit: !1,
        page: 1
    },
    admin: function(t) {
        this.setData({
            visit: !0,
            id: t.currentTarget.dataset.id
        });
    },
    close: function() {
        this.setData({
            visit: !1
        });
    },
    isVisit: function(t) {
        var n = this;
        wx.showLoading({
            title: "修改中..."
        }), new i.default({
            path: a.default.personAdminPost,
            data: {
                id: this.data.id,
                isVisit: t.currentTarget.dataset.visit,
                uid: e.globalData.uid
            }
        }).then(function(t) {
            wx.hideLoading(), n.setData({
                visit: !1
            }), 0 == t.errcode ? n.setData({
                data: t.data
            }) : (wx.showLoading({
                title: t.msg
            }), setTimeout(function() {
                wx.hideLoading();
            }, 1e3));
        });
    },
    onLoad: function(t) {
        var n = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        }), new i.default({
            path: a.default.personAdmin,
            reqtype: "GET",
            data: {
                uid: e.globalData.uid
            }
        }).then(function(t) {
            n.setData({
                data: t.data
            }), wx.hideLoading();
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
    call: function(t) {
        e.callPhone(t);
    },
    pullUpLoad: function() {
        var t = this, n = this.data.page;
        n += 1, this.setData({
            page: n
        }), wx.showLoading({
            title: "加载中..."
        }), new i.default({
            path: a.default.personAdmin,
            reqtype: "GET",
            data: {
                uid: e.globalData.uid,
                page: this.data.page
            }
        }).then(function(a) {
            t.setData({
                data: t.data.data.concat(a.data)
            }), wx.hideLoading();
        });
    }
});