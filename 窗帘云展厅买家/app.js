function o(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}

var e = o(require("./config.js")), n = o(require("./libs/ajax.js")), a = o(require("./utils/interface.js"));

App({
    userLogin: function(o) {
        this.login(), wx.getSetting({
            success: function(o) {
                o.authSetting["scope.userInfo"] ? console.log("用户授权了") : wx.authorize({
                    scope: "scope.userInfo",
                    success: function() {
                        console.log(22222222222);
                    },
                    fail: function() {
                        console.log("用户取消授权"), wx.hideLoading();
                    }
                });
            }
        });
    },
    getUserInfo: function(o, e) {
        wx.getUserInfo({
            success: function(o) {
                console.log("进入获取用户信息"), app.globalData.userInfo = o.userInfo;
                var t = JSON.stringify(o.userInfo), s = new n.default({
                    data: {
                        userInfo: t
                    },
                    path: a.default.login
                });
                s.then(function(o) {
                    e(), wx.hideLoading();
                }), s.catch(function(o) {
                    console.log(o);
                });
            },
            fail: function(o) {
                console.log("用户取消登录"), wx.hideLoading();
            }
        });
    },
    login: function(o, e, t) {
        wx.login({
            success: function(s) {
                var i = new n.default({
                    data: {
                        code: s.code
                    },
                    path: a.default.login
                });
                i.then(function(n) {
                    console.log(n), e.globalData.uid = n.data.uid, e.globalData.shopId = n.data.shop_id, 
                    wx.hideLoading(), 1 == n.errcode && (wx.showToast({
                        icon: "loading",
                        title: n.msg
                    }), o.setData({
                        noSuccess: !1,
                        noSuccessMsg: n.msg
                    })), t();
                }), i.catch(function(o) {
                    console.log(o);
                });
            },
            fail: function(o) {
                console.log("登录失败"), wx.hideLoading();
            }
        });
    },
    callPhone: function(o) {
        var e = o.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    saoma: function(o) {
        wx.scanCode({
            success: function(e) {
                o.setData({
                    phone: "23456"
                }), console.log(e);
            }
        });
    },
    Img: function(o) {
        wx.chooseImage({
            count: 4,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var n = e.tempFilePaths;
                console.log(e), o.setData({
                    imglist: n
                }), console.log(o.data);
            }
        });
    },
    fabulous: function(o, e) {
        var t = new n.default({
            path: a.default.login,
            data: {
                id: e
            }
        });
        t.then(function(e) {
            0 == e.errcode && (o.setData({
                fabulous: !0
            }), wx.hideLoading());
        }), t.catch(function(o) {
            console.log("服务器出错,未点赞成功");
        });
    },
    showLoading: function() {
        wx.showLoading({
            title: "网络出错,请稍后再试"
        }), setTimeout(function() {
            wx.hideLoading();
        }, 1e3);
    },
    globalData: {
        uid: null,
        userInfo: {},
        userHeadImg: "",
        nickName: "",
        shopId: null,
        nav: e.default.navBar,
        currentPrinter: {
            factory: "",
            name: "",
            UUID: "",
            MAC: "",
            printerType: 0,
            DPI: 203,
            width: 384,
            softVersion: "",
            hardVersion: "",
            seriesName: "",
            devIntName: ""
        },
        yqm: ""
    }
});