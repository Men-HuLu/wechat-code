var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("./ajax.js")), e = getApp(), t = require("../utils/interface.js");

module.exports = {
    loginClick: function(n) {
        e.login(function(e, i, l) {
            var o = new a.default({
                path: t.login,
                data: {
                    code: e.code
                }
            });
            o.then(function(a) {
                l.globalData = {
                    uid: "后台返回的用户id",
                    nickName: i.userInfo.nickName,
                    userHeadImg: i.userInfo.avatarUrl
                }, null != l.globalData.uid && n.setData({
                    hasUid: !1,
                    hasData: !0
                }), n.setData({
                    nickName: l.globalData.nickName,
                    userHeadImg: l.globalData.userHeadImg
                });
            }), o.catch(function(a) {
                console.log("ajax获取失败");
            });
        });
    }
};