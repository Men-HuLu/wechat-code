function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../libs/userLogin.js"));

var a = e(require("../../utils/interface.js")), t = e(require("../../libs/ajax.js")), n = getApp();

Page({
    data: {
        list: []
    },
    scanCode: function() {
        wx.setStorageSync("Code", !0), wx.scanCode({
            success: function(e) {
                if (console.log(e), e.path) {
                    var a = "/" + e.path;
                    wx.navigateTo({
                        url: a
                    });
                } else {
                    var t = e.result, n = [];
                    n.push(t), wx.previewImage({
                        current: t,
                        urls: n
                    });
                }
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    onLoad: function(e) {
        var o = this;
        wx.hideShareMenu(), this.setData({
            userHeadImg: n.globalData.userHeadImg,
            nickName: n.globalData.nickName
        }), wx.showLoading({
            title: "加载中..."
        }), n.login(this, n, function() {
            var e = new t.default({
                reqtype: "GET",
                path: a.default.my,
                data: {
                    id: n.globalData.uid
                }
            });
            e.then(function(e) {
                console.log(e), o.setData({
                    data: e.data,
                    list: [ e.erweima ]
                }), wx.hideLoading();
            }), e.catch(function(e) {
                console.log(e);
            });
        });
    },
    previewImage: function(e) {
        var a = e.currentTarget.dataset.src, t = [];
        t.push(a), wx.previewImage({
            current: a,
            urls: t
        });
    },
    navigator: function(e) {
        var a = e.currentTarget.dataset.src;
        wx.setStorageSync("key", ""), "myExhibition" === a ? wx.navigateTo({
            url: "../" + a + "/" + a + "?uid=" + n.globalData.uid
        }) : wx.navigateTo({
            url: "../" + a + "/" + a
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});