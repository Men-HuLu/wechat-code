function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = t(require("../../../libs/ajax.js")), o = t(require("../../../utils/interface.js")), n = getApp();

Page({
    data: {
        typeIndex: "0",
        yqm: "",
        isShow: !0
    },
    typePickerChange: function(t) {
        var a = this;
        wx.showLoading({
            title: "更改中..."
        }), console.log(t.detail.value);
        var n = t.detail.value;
        this.setData({
            typeIndex: n
        }), new e.default({
            path: o.default.postOpenFly,
            data: {
                typeIndex: n
            },
            reqtype: "GET"
        }).then(function(t) {
            a.setData({
                data: t.data,
                typeIndex: t.data.typeIndex
            }), wx.hideLoading();
        });
    },
    payment: function() {
        var t = this;
        new e.default({
            path: o.default.pay,
            data: {
                uid: n.globalData.uid,
                id: this.data.data.flyId,
                yqm: this.data.yqm
            }
        }).then(function(e) {
            console.log(a(e.data.timeStamp)), 0 == e.errcode ? wx.requestPayment({
                timeStamp: e.data.timeStamp,
                nonceStr: e.data.nonceStr,
                package: e.data.package,
                signType: e.data.signType,
                paySign: e.data.paySign,
                success: function(a) {
                    wx.showLoading({
                        title: "展厅准备中"
                    });
                    var e = setInterval(function() {
                        t.judgeRoom(t, e);
                    }, 1e3);
                },
                fail: function(t) {
                    wx.showToast({
                        icon: "loading",
                        title: "支付失败"
                    }), console.log("fail"), console.log(t);
                }
            }) : wx.showToast({
                title: e.msg
            });
        });
    },
    judgeRoom: function(t, a) {
        var i = new e.default({
            path: o.default.judgeRoom,
            reqtype: "GET",
            data: {
                uid: n.globalData.uid
            }
        });
        i.then(function(e) {
            console.log("循环数据", e), 0 == e.errcode && (clearInterval(a), n.globalData.uid = e.data.uid, 
            n.globalData.shopId = e.data.shopId, n.globalData.userInfo.nickName = e.data.nickName, 
            n.globalData.userInfo.avatarUrl = e.data.userHeadImg, wx.hideLoading(), 0 == t.data.isShow ? (wx.showToast({
                icon: "loading",
                title: "升级成功"
            }), setTimeout(function() {
                wx.reLaunch({
                    url: "../../personalCenter/personalCenter"
                });
            }, 2e3)) : wx.reLaunch({
                url: "../../index/index"
            }));
        }), i.catch(function(t) {
            wx.showToast({
                title: "网络出错"
            });
        });
    },
    onLoad: function(t) {
        var a = this;
        wx.hideShareMenu(), console.log(n.globalData.uid), "false" == t.return ? this.setData({
            isShow: !0
        }) : "true" == t.return && this.setData({
            isShow: !1
        }), this.setData({
            yqm: n.globalData.yqm
        }), wx.showLoading({
            title: "加载中..."
        }), console.log(t.flyid);
        var i = t.flyid;
        this.setData({
            typeIndex: i
        });
        var l = {
            uid: n.globalData.uid,
            type: i
        }, d = new e.default({
            path: o.default.payment,
            data: l,
            reqtype: "GET"
        });
        d.then(function(t) {
            console.log(t), a.setData({
                data: t.data,
                typeIndex: t.data.typeIndex
            }), wx.hideLoading();
        }), d.catch(function(t) {
            console.log(t);
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        wx.hideShareMenu();
    },
    yqm: function(t) {
        console.log(t), this.setData({
            yqm: t.detail.value
        });
    },
    toast: function() {
        wx.showModal({
            title: "提示",
            content: "此码可用于新用户注册时填写用"
        });
    }
});