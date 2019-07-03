function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../utils/interface.js")), e = a(require("../../libs/ajax.js")), i = getApp();

Page({
    data: {
        placeholder: "说说你的想法",
        loading: !1,
        callback: 0,
        loadingText: "加载更多...",
        page: 1,
        focus: !1,
        disabled: !1
    },
    nameInput: function(a) {
        this.setData({
            placeholder: "回复" + a.currentTarget.dataset.name,
            callback: a.currentTarget.dataset.id,
            focus: !0
        });
    },
    onLoad: function(a) {
        var n = this;
        wx.hideShareMenu(), console.log(i.globalData.userInfo), this.setData({
            id: a.id
        }), wx.showLoading({
            title: "加载中..."
        });
        var o = new e.default({
            reqtype: "GET",
            path: t.default.informationReview,
            data: {
                id: a.id,
                uid: i.globalData.uid
            }
        });
        o.then(function(a) {
            n.setData({
                data: a.data
            }), wx.hideLoading();
        }), o.catch(function(a) {
            console.log(a);
        });
    },
    idea: function(a) {
        this.setData({
            idea: a.detail.value
        });
    },
    submit: function(a) {
        wx.showLoading({
            title: "提交中"
        }), this.setData({
            disabled: !0
        });
        var n = new e.default({
            path: t.default.informationReviewPost,
            data: {
                uid: i.globalData.uid,
                nickName: i.globalData.userInfo.nickName,
                userHeadImg: i.globalData.userInfo.avatarUrl,
                text: this.data.idea,
                id: this.data.id,
                callback: this.data.callback
            }
        });
        n.then(function(a) {
            wx.hideLoading(), wx.showToast({
                title: "提交成功"
            }), setTimeout(function() {
                wx.hideLoading(), wx.navigateBack({});
            }, 1e3);
        }), n.catch(function(a) {});
    },
    onReady: function() {},
    onShow: function() {
        console.log(this.data);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        wx.hideShareMenu();
    },
    del: function() {
        wx.showLoading({
            title: "加载中..."
        });
        var a = new e.default({
            reqtype: "GET",
            path: t.default.informationDel,
            data: {
                id: this.data.id,
                uid: i.globalData.uid
            }
        });
        a.then(function(a) {
            wx.hideLoading(), 0 == a.errcode ? (wx.showLoading({
                title: "删除成功"
            }), setTimeout(function() {
                wx.hideLoading(), wx.redirectTo({
                    url: "../infoDiffusion/infoDiffusion"
                });
            }, 1e3)) : (wx.showLoading({
                title: a.msg
            }), setTimeout(function() {
                wx.hideLoading();
            }, 1e3));
        }), a.catch(function(a) {
            console.log(a);
        });
    }
});