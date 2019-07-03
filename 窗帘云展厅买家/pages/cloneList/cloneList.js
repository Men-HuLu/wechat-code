function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../libs/ajax.js")), e = (t(require("../../libs/userLogin.js")), 
getApp()), n = require("../../utils/interface.js");

Page({
    data: {
        page: 0,
        checkeds: [],
        all: !1
    },
    onLoad: function(t) {
        var c = this;
        wx.showLoading({
            title: "加载中"
        }), e.login(this, e, function() {
            var t = new a.default({
                reqtype: "GET",
                path: n.cloneList,
                data: {
                    userId: e.globalData.uid
                }
            });
            t.then(function(t) {
                c.setData({
                    data: t.data
                }), wx.hideLoading();
            }), t.catch(function(t) {
                e.showLoading();
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    checkboxChange: function(t) {
        this.setData({
            checkeds: t.detail.value
        });
    },
    change: function(t) {
        var a = this;
        if (1 == t.detail.value.length) {
            var e = a.data.data, n = [];
            e.forEach(function(t) {
                t.goods_list.forEach(function(t) {
                    t.checked = !0, n.push(t.id);
                });
            }), this.setData({
                data: e,
                checkeds: n,
                all: !0
            });
        } else {
            var c = a.data.data;
            c.forEach(function(t) {
                t.goods_list.forEach(function(t) {
                    t.checked = !1;
                });
            }), this.setData({
                data: c,
                checkeds: [],
                all: !1
            });
        }
    },
    changeD: function(t) {
        var a = t.currentTarget.dataset.id, e = this.data.data;
        e.forEach(function(t) {
            t.goods_list.forEach(function(t) {
                t.id == a && (1 == t.checked ? t.checked = !1 : t.checked = !0);
            });
        }), this.setData({
            data: e,
            all: !1
        });
    },
    next: function(t) {
        0 == this.data.checkeds.length ? wx.showToast({
            title: "请选择操作的目标",
            icon: "none"
        }) : (wx.setStorageSync("checkeds", this.data.checkeds), wx.setStorageSync("all", this.data.all), 
        wx.navigateTo({
            url: "/pages/cloneNext/cloneNext"
        }));
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});