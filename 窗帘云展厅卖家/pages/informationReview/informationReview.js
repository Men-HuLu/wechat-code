function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

a(require("../../libs/userLogin.js"));

var t = a(require("../../utils/interface.js")), e = a(require("../../libs/ajax.js")), i = getApp();

Page({
    data: {
        placeholder: "说说你的想法",
        loading: !1,
        callback: 0,
        loadingText: "加载更多...",
        page: 1,
        focus: !1,
        idea: ""
    },
    nameInput: function(a) {
        this.setData({
            placeholder: "回复" + a.currentTarget.dataset.name,
            callback: a.currentTarget.dataset.id,
            focus: !0
        });
    },
    onLoad: function(a) {
        var n = this, o = this;
        wx.hideShareMenu(), this.setData({
            id: a.id,
            userHeadImg: i.globalData.userHeadImg
        }), i.login(this, i, function() {
            wx.showLoading({
                title: "加载中..."
            });
            var a = new e.default({
                reqtype: "GET",
                path: t.default.informationReview,
                data: {
                    id: o.data.id,
                    userId: i.globalData.uid
                }
            });
            a.then(function(a) {
                n.setData({
                    data: a.data
                }), wx.hideLoading();
            }), a.catch(function(a) {
                console.log(a);
            });
        });
    },
    imgL: function(a) {
        var t = [], e = a.currentTarget.dataset.src;
        t.push(e), wx.previewImage({
            current: e,
            urls: t
        });
    },
    idea: function(a) {
        this.setData({
            idea: a.detail.value
        });
    },
    submit: function(a) {
        var n = this, o = this;
        if ("" == this.data.idea) wx.showToast({
            title: "请输入你的想法",
            icon: "none"
        }); else {
            wx.showLoading({
                title: "提交中"
            });
            var d = new e.default({
                path: t.default.informationReviewPost,
                data: {
                    userId: i.globalData.uid,
                    userInfo: JSON.stringify(i.globalData.userInfo),
                    text: this.data.idea,
                    id: this.data.id,
                    callback: this.data.callback
                }
            });
            d.then(function(a) {
                var d = new e.default({
                    reqtype: "GET",
                    path: t.default.informationReview,
                    data: {
                        id: o.data.id,
                        userId: i.globalData.uid
                    }
                });
                d.then(function(a) {
                    n.setData({
                        data: a.data,
                        idea: "",
                        placeholder: "说说你的想法",
                        callback: 0
                    }), wx.hideLoading(), wx.showToast({
                        title: "提交成功"
                    });
                }), d.catch(function(a) {
                    wx.showToast({
                        title: a.msg,
                        icon: "none"
                    });
                });
            }), d.catch(function(a) {
                wx.showToast({
                    title: a.msg,
                    icon: "none"
                });
            });
        }
    },
    onReady: function() {},
    onShow: function() {
        console.log(this.data);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});