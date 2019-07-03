function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../libs/userLogin.js"));

var t = e(require("../../utils/interface.js")), a = e(require("../../libs/ajax.js")), n = getApp();

Page({
    data: {
        reg: !1,
        id: 0
    },
    name: function(e) {
        this.setData({
            name: e.detail.value
        });
    },
    phone: function(e) {
        this.setData({
            phone: e.detail.value
        });
    },
    phonereg: function(e) {
        var t = /^[1][0-9]{10}$/;
        this.setData({
            reg: t.test(e.detail.value),
            phone: e.detail.value
        });
    },
    detailAddress: function(e) {
        this.setData({
            detailAddress: e.detail.value
        });
    },
    bindRegionChange: function(e) {
        this.setData({
            region: e.detail.value
        });
    },
    formSubmit: function(e) {
        var i = this.data.name, o = this.data.phone, d = this.data.region, s = this.data.detailAddress, u = /^[1][0-9]{10}$/;
        if ("" == i) wx.showToast({
            title: "请输入收货人",
            icon: "none",
            duration: 2e3
        }); else if ("" == o) wx.showToast({
            title: "请输入联系电话",
            icon: "none",
            duration: 2e3
        }); else if ("" == s) wx.showToast({
            title: "请输入详细地址",
            icon: "none",
            duration: 2e3
        }); else if (0 == u.test(o)) wx.showToast({
            title: "联系号码有误",
            icon: "none",
            duration: 2e3
        }); else {
            var r = new a.default({
                path: t.default.NewAddress,
                data: {
                    userId: n.globalData.uid,
                    name: i,
                    phone: o,
                    region: d,
                    detailAddress: s,
                    id: this.data.id
                }
            });
            r.then(function(e) {
                wx.navigateBack({});
            }), r.catch(function(e) {});
        }
    },
    removeAdress: function(e) {
        var i = new a.default({
            path: t.default.DeleteAddress,
            data: {
                id: this.data.id,
                userId: n.globalData.uid
            }
        });
        i.then(function(e) {
            wx.showToast({
                title: "删除成功"
            }), setTimeout(function() {
                wx.navigateBack({});
            }, 500);
        }), i.catch(function(e) {});
    },
    onLoad: function(e) {
        var i = this;
        wx.hideShareMenu(), this.setData({
            remove: e.remove
        });
        var o = e.id;
        if ("true" === this.data.remove) {
            wx.showLoading({
                title: "加载中..."
            });
            var d = new a.default({
                reqtype: "GET",
                path: t.default.GetAddress,
                data: {
                    id: o,
                    userId: n.globalData.uid
                }
            });
            d.then(function(e) {
                i.setData({
                    id: e.data.id,
                    name: e.data.name,
                    phone: e.data.phone,
                    region: e.data.region,
                    detailAddress: e.data.detailAddress,
                    data: e.data
                }), wx.hideLoading();
            }), d.catch(function(e) {
                console.log(e);
            });
        } else this.setData({
            region: [ "请", "选", "择" ]
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