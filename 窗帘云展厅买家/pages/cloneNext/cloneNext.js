function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../libs/ajax.js")), a = (e(require("../../libs/userLogin.js")), 
getApp()), n = require("../../utils/interface.js");

Page({
    data: {
        checkeds: [],
        class: [],
        id: [],
        index: "0",
        index2: "0",
        Is_shelves: 1,
        number: [ "清除价格", "增长价格10%", "增长价格20%", "增长价格30%", "增长价格40%", "增长价格50%", "增长价格60%", "增长价格70%", "增长价格80%", "增长价格90%", "增长价格100%" ]
    },
    onLoad: function(e) {
        var i = this, s = new t.default({
            reqtype: "GET",
            path: n.cloneClass,
            data: {
                id: a.globalData.shopId
            }
        });
        s.then(function(e) {
            var t = [], a = [];
            e.data.forEach(function(e) {
                t.push(e.name), a.push(e.id);
            }), i.setData({
                class: t,
                id: a
            }), wx.hideLoading();
        }), s.catch(function(e) {
            a.showLoading();
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = wx.getStorageSync("checkeds"), t = wx.getStorageSync("all");
        t = 1 == t ? 1 : 0, this.setData({
            checkeds: e,
            all: t
        }), wx.clearStorageSync("checkeds"), wx.clearStorageSync("all");
    },
    bindPickerChange: function(e) {
        console.log(e.detail.value), this.setData({
            index: e.detail.value
        });
    },
    bindPickerChange2: function(e) {
        console.log(e.detail.value), this.setData({
            index2: e.detail.value
        });
    },
    input: function(e) {
        e.detail.value >= 100 ? this.setData({
            input: 100
        }) : this.setData({
            input: e.detail.value
        });
    },
    change: function(e) {
        this.setData({
            Is_shelves: e.detail.value
        });
    },
    submit: function(e) {
        if (this.data.input < 10) wx.showToast({
            title: "价格比例不能小于10%",
            icon: "none"
        }); else if ("" != this.data.Is_shelves) if (null != this.data.index) {
            var i = this.data.index2 - 0 + 0, s = new t.default({
                reqtype: "GET",
                path: n.clone,
                data: {
                    userId: a.globalData.uid,
                    all: this.data.all,
                    category_id: this.data.id[this.data.index],
                    price_ratio: 10 * i,
                    is_shelves: this.data.Is_shelves,
                    goods_ids: this.data.checkeds
                }
            });
            s.then(function(e) {
                1 == e.errcode ? (wx.showToast({
                    title: e.msg,
                    icon: "none"
                }), setTimeout(function() {
                    wx.reLaunch({
                        url: "/pages/index/index"
                    });
                }, 1e3)) : wx.showToast({
                    title: e.msg,
                    icon: "none"
                });
            }), s.catch(function(e) {
                console.log(e);
            });
        } else wx.showToast({
            title: "请选择分类",
            icon: "none"
        }); else wx.showToast({
            title: "请选择是否上架",
            icon: "none"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});