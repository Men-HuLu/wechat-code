function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    wx.showLoading({
        title: e
    }), setTimeout(function(e) {
        wx.hideLoading();
    }, 1e3);
}

var a = e(require("../../libs/ajax.js")), o = (e(require("../../libs/userLogin.js")), 
e(require("../../libs/until.js"))), n = (getApp(), require("../../utils/interface.js"));

module.exports = {
    focus: function(e, t) {
        var a = t.currentTarget.id;
        console.log(a, "进入焦点"), e.setData({
            id: a,
            close: !0
        });
    },
    blur: function(e) {
        e.setData({
            id: "",
            close: !1
        });
    },
    inputVal: function(e, t) {
        console.log(t), 1 == e.data.id ? e.setData({
            userPhone: t.detail.value
        }) : 2 == e.data.id ? e.setData({
            yzmInput: t.detail.value
        }) : 3 == e.data.id ? e.setData({
            phoneInput: t.detail.value
        }) : 4 == e.data.id ? e.setData({
            firstPasswordText: t.detail.value
        }) : 5 == e.data.id && e.setData({
            lastPasswordText: t.detail.value
        });
    },
    buttonForm: function(e) {
        var a = e.data, n = "图片验证码错误", s = "手机验证码错误", i = "两次密码输入不一致";
        return 0 == o.default.isPoneAvailable(a.userPhone) ? (console.log(a.userPhone), 
        t("手机格式错误"), !1) : a.yzmInput != a.yzmNum ? (t(n), !1) : (n = !0, a.phoneInput != a.phoneNum ? (t(s), 
        !1) : "" == a.phoneInput || "" == a.phoneNum ? (t("请输入手机验证码"), !1) : (s = !0, a.firstPasswordText != a.lastPasswordText ? (t(i), 
        !1) : "" == a.firstPasswordText || "" == a.lastPasswordText ? (t("输入密码"), !1) : o.default.isPhoneLength(a.firstPasswordText) && o.default.isPhoneLength(a.lastPasswordText) ? (i = !0, 
        a.checkbox ? (wx.showLoading({
            title: "成功了"
        }), void setTimeout(function(e) {
            wx.hideLoading();
        }, 1e3)) : (t("请同意条款"), !1)) : (console.log(a.firstPasswordText.length), t("密码格式不正确"), 
        !1)));
    },
    erweimaImg: function(e) {
        var t = new a.default({
            reqtype: "GET",
            path: n.inputImg
        });
        t.then(function(t) {
            console.log(t), e.setData({
                yzmImg: t.data.imgBase64,
                yzmNum: t.data.imgVerifyCodeKey
            }), wx.hideLoading();
        }), t.catch(function(e) {
            console.log(e);
        });
    },
    buttonGetPhoneNum: function(e) {
        var t = new a.default({
            path: n.inputImg
        });
        t.then(function(t) {
            console.log(t), e.setData({
                phoneNum: t.number
            });
        }), t.catch(function(e) {
            console.log(e);
        });
    }
};