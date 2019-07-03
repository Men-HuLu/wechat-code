function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../utils/interface.js")), e = a(require("../../libs/ajax.js")), i = getApp();

Page({
    data: {
        activeInde: "1",
        tabCli: "browse",
        radioCustomer: [],
        radioChange: ""
    },
    isRefuse: function() {
        this.data.isRefuse ? this.setData({
            isRefuse: !1
        }) : this.setData({
            isRefuse: !0
        }), console.log(this.data.isRefuse);
    },
    save: function(a) {
        wx.showLoading({
            title: "保存中..."
        });
        JSON.stringify(this.data.radioCustomer);
        var o = {
            uid: i.globalData.uid,
            optionsId: this.data.optionsId,
            userName: this.data.userName,
            radioCustomer: this.data.radioChange,
            isRefuse: this.data.isRefuse,
            userLocation: this.data.userLocation,
            remark: this.data.remark,
            shopId: i.globalData.shopId
        };
        new e.default({
            path: t.default.visitorInformationPost,
            data: o
        }).then(function(a) {
            wx.hideLoading(), 0 == a.errcode ? wx.reLaunch({
                url: "../visitorList/visitorList"
            }) : (wx.showLoading({
                title: a.msg
            }), setTimeout(function() {
                wx.hideLoading();
            }, 1e3));
        });
    },
    radioChangeCustomer: function(a) {
        console.log(a);
        for (var t = a.detail.value, e = this.data.radioCustomer, i = a.detail.value, o = 0; o < e.length; o++) e[o].checked = !1, 
        t.includes(e[o].name) && (e[o].checked = !0);
        this.setData({
            radioCustomer: e,
            radioChange: i
        }), console.log(this.data.radioCustomer, a.detail.value);
    },
    tabNav: function(a) {
        console.log(a.currentTarget.dataset.nav);
        var t = a.currentTarget.dataset.nav;
        this.setData({
            activeInde: t
        });
    },
    tabTitle: function(a) {
        var o = this, s = a.currentTarget.dataset.tab;
        this.setData({
            tabCli: s
        }), wx.showLoading({
            title: "加载中"
        }), new e.default({
            path: t.default.visitorInformation,
            data: {
                id: this.data.optionsId,
                uid: i.globalData.uid,
                tab: this.data.tabCli,
                shopId: i.globalData.shopId
            },
            reqtype: "GET"
        }).then(function(a) {
            o.setData({
                tabSwitch: a.data.visit
            }), wx.hideLoading();
        });
    },
    userName: function(a) {
        console.log(a), this.setData({
            userName: a.detail.value
        });
    },
    userLocation: function(a) {
        this.setData({
            userLocation: a.detail.value
        });
    },
    remark: function(a) {
        this.setData({
            remark: a.detail.value
        });
    },
    onLoad: function(a) {
        var o = this;
        wx.hideShareMenu(), console.log(a.id), this.setData({
            optionsId: a.id
        }), wx.showLoading({
            title: "加载中..."
        }), new e.default({
            path: t.default.visitorInformation,
            data: {
                id: a.id,
                uid: i.globalData.uid,
                tab: this.data.tabCli,
                shopId: i.globalData.shopId
            },
            reqtype: "GET"
        }).then(function(a) {
            console.log(a), o.setData({
                data: a.data,
                tabSwitch: a.data.visit,
                radioCustomer: a.data.radioCustomer,
                isRefuse: a.data.isRefuse,
                userName: a.data.userName,
                userLocation: a.data.userLocation,
                remark: a.data.remark
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
    copy: function() {
        wx.setClipboardData({
            data: this.data.data.userCall,
            success: function(a) {
                wx.showToast({
                    title: "复制成功"
                });
            }
        });
    },
    callPhone: function(a) {
        console.log(a.currentTarget.dataset.phone), wx.makePhoneCall({
            phoneNumber: a.currentTarget.dataset.phone
        });
    }
});