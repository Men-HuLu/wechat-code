function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

var t = n(require("../../utils/interface.js")), e = n(require("../../libs/ajax.js")), o = getApp();

Page({
    data: {
        inputVal: ""
    },
    buttonForm: function() {
        var n = new e.default({
            path: t.default.joinFly,
            data: {
                val: this.data.inputVal,
                uid: o.globalData.uid
            }
        });
        n.then(function(n) {
            0 == n.errcode ? (wx.showLoading({
                title: "等待审核"
            }), setTimeout(function() {
                wx.hideLoading(), wx.reLaunch({
                    url: "../shouye/shouye"
                });
            }, 3e3)) : (wx.showLoading({
                title: n.msg
            }), setTimeout(function() {
                wx.hideLoading();
            }, 3e3));
        }), n.catch(function(n) {
            o.showLoading();
        });
    },
    input: function(n) {
        var t = n.detail.value;
        this.setData({
            inputVal: t
        });
    },
    onLoad: function(n) {
        wx.hideShareMenu();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        wx.hideShareMenu();
    }
});