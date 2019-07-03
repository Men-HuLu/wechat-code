function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../libs/ajax.js")), n = (e(require("../../libs/userLogin.js")), 
e(require("../../libs/until.js")), getApp(), require("../../utils/interface.js"));

module.exports = {
    focus: function(e, t) {
        var n = t.currentTarget.id;
        console.log(n, "进入焦点"), e.setData({
            id: n,
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
        }) : 3 == e.data.id && e.setData({
            phoneInput: t.detail.value
        });
    },
    buttonGetPhoneNum: function(e) {
        var u = new t.default({
            path: n.inputImg
        });
        u.then(function(t) {
            console.log(t), e.setData({
                phoneNum: t.number
            });
        }), u.catch(function(e) {
            console.log(e);
        });
    }
};