function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

n(require("../../libs/ajax.js")), n(require("../../libs/userLogin.js"));

var e = n(require("./loginFun.js")), t = getApp();

require("../../utils/interface.js");

Page({
    data: {
        userPhone: "",
        id: "",
        close: !1,
        phoneInput: "",
        phoneNum: "",
        getYzm: "获取验证码",
        getPhoneDisabled: !1
    },
    clearPhone: function() {
        this.setData({
            userPhone: ""
        });
    },
    focus: function(n) {
        e.default.focus(this, n);
    },
    blur: function(n) {
        e.default.blur(this, n);
    },
    input: function(n) {
        e.default.inputVal(this, n);
    },
    buttonGetPhoneNum: function() {
        e.default.buttonGetPhoneNum(this);
    },
    buttonForm: function() {
        e.default.buttonForm(this, t);
    },
    onLoad: function(n) {
        wx.hideShareMenu(), console.log(t.globalData);
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