function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../libs/userLogin.js"));

var a = e(require("../../utils/interface.js")), t = e(require("../../libs/ajax.js")), n = getApp();

Page({
    data: {},
    onLoad: function(e) {
        var o = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        });
        var i = new t.default({
            reqtype: "GET",
            path: a.default.personalInformation,
            data: {
                id: n.globalData.uid
            }
        });
        i.then(function(e) {
            console.log(e), o.setData({
                phone: e.data.phone,
                name: e.data.name,
                number: e.data.number,
                describe: e.data.describe
            }), wx.hideLoading();
        }), i.catch(function(e) {
            console.log(e);
        });
    },
    describe: function(e) {
        this.setData({
            describe: e.detail.value
        });
    },
    name: function(e) {
        this.setData({
            name: e.detail.value
        });
    },
    phone: function(e) {
        var a = /^[1][0-9]{10}$/;
        this.setData({
            reg: a.test(e.detail.value),
            phone: e.detail.value
        });
    },
    submit: function() {
        if (0 == this.data.reg) wx.showToast({
            title: "联系号码有误",
            icon: "none",
            duration: 2e3
        }); else {
            console.log(n.globalData.uid);
            var e = new t.default({
                path: a.default.personalInformationPost,
                data: {
                    id: n.globalData.uid,
                    name: this.data.name,
                    phone: this.data.phone,
                    number: this.data.number,
                    describe: this.data.describe
                }
            });
            e.then(function(e) {
                wx.showToast({
                    title: "保存完成"
                }), wx.navigateBack({});
            }), e.catch(function(e) {
                console.log(e);
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});