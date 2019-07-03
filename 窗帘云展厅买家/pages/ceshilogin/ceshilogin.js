function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../libs/ajax.js"));

var n = e(require("../../libs/userLogin.js")), o = e(require("./zhuce.js"));

getApp(), require("../../utils/interface.js");

Page({
    data: {
        userPhone: "",
        id: "",
        close: !1,
        yzmImg: "",
        yzmNum: "",
        phoneInput: "",
        yzmInput: "",
        phoneNum: "",
        firstPassword: !0,
        lastPassword: !0,
        firstPasswordText: "",
        lastPasswordText: "",
        checkbox: !1
    },
    onLoad: function(e) {
        wx.hideShareMenu();
    },
    onReady: function() {},
    onShow: function() {
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), o.default.erweimaImg(this), wx.showLoading({
            title: "加载中...",
            mask: !0
        }), n.default.loginClick(this);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        wx.hideShareMenu();
    }
});