var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("./ajax.js")), e = getApp(), o = require("../utils/interface.js");

module.exports = {
    loginClick: function(n) {
        e.userLogin(function(t, i, l) {
            var u = new a.default({
                path: o.login,
                data: {
                    code: t.code
                }
            });
            u.then(function(a) {
                console.log("ajax获取成功"), console.log(a), e.globalData = {
                    uid: a.uid,
                    nickName: i.userInfo.nickName,
                    userHeadImg: i.userInfo.avatarUrl
                }, null != e.globalData.uid && n.setData({
                    hasUid: !1,
                    hasData: !0
                }), n.setData({
                    nickName: l.globalData.nickName,
                    userHeadImg: l.globalData.userHeadImg
                }), wx.hideLoading();
            }), u.catch(function(a) {
                wx.hideLoading(), console.log("ajax获取失败");
            });
        });
    }
};