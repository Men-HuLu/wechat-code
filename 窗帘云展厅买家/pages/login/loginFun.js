function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e) {
    wx.showLoading({
        title: e
    }), setTimeout(function(e) {
        wx.hideLoading();
    }, 1e3);
}

var t = e(require("../../libs/ajax.js")), o = (e(require("../../libs/userLogin.js")), 
e(require("../../libs/until.js"))), n = getApp(), l = require("../../utils/interface.js");

module.exports = {
    focus: function(e, a) {
        var t = a.currentTarget.id;
        console.log(t, "进入焦点"), e.setData({
            id: t,
            close: !0
        });
    },
    blur: function(e, a) {
        e.setData({
            id: "",
            close: !1,
            phoneInput: a.detail.value
        });
    },
    inputVal: function(e, a) {
        console.log(a), 1 == e.data.id ? e.setData({
            userPhone: a.detail.value
        }) : 3 == e.data.id && e.setData({
            phoneInput: a.detail.value
        });
    },
    buttonGetPhoneNum: function(e) {
        var a = this, o = new t.default({
            path: l.inputImg,
            data: {
                phone: e.data.userPhone,
                uid: n.globalData.uid
            }
        });
        o.then(function(t) {
            console.log(t), 0 == t.errcode ? (a.sendmessg(e), e.setData({
                phoneNum: t.data
            })) : wx.showToast({
                title: t.msg,
                duration: 2e3
            });
        }), o.catch(function(e) {
            console.log(e);
        });
    },
    buttonForm: function(e, n) {
        console.log(n.globalData), wx.showLoading({
            title: "发送中..."
        });
        var s = e.data, i = {
            phone: s.userPhone,
            yzm: s.phoneInput,
            uid: n.globalData.uid
        };
        if (console.log(i), 0 == o.default.isPoneAvailable(s.userPhone) || "" == s.phoneInput) return console.log(s.userPhone), 
        a("手机格式错误"), !1;
        if (s.phoneInput != e.data.phoneNum) return a("验证码错误"), !1;
        var u = new t.default({
            path: l.phoneLogin,
            data: i,
            reqtype: "GET"
        });
        u.then(function(e) {
            wx.hideLoading(), console.log(e), console.log(n.globalData.shopId), "0" == e.errcode ? (n.globalData.uid = e.data.uid, 
            n.globalData.shopId = e.data.shopId, n.globalData.userInfo.nickName = e.data.nickName, 
            n.globalData.userInfo.avatarUrl = e.data.userHeadImg, null == e.data.shopId ? wx.navigateTo({
                url: "../classify/classify"
            }) : ("" == e.data.nickName && (e.data.nickName = null), console.log(n.globalData.userInfo.nickName), 
            wx.navigateTo({
                url: "../index/index"
            }))) : (console.log(n.globalData), wx.showToast({
                title: e.msg
            }));
        }), u.catch(function(e) {
            console.log(e);
        });
    },
    sendmessg: function(e) {
        var a = e, t = 60;
        1 == t && (t = 0, a.setData({
            getYzm: "获取验证码",
            getPhoneDisabled: !1
        }));
        var o = setInterval(function() {
            a.setData({
                getYzm: t + "s后重发",
                getPhoneDisabled: !0
            }), --t < 0 && (t = 1, clearInterval(o), a.setData({
                getYzm: "获取验证码",
                getPhoneDisabled: !1
            }));
        }, 1e3);
    }
};