function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../utils/interface.js")), n = a(require("../../libs/ajax.js")), e = getApp();

Page({
    data: {
        inputValData: ""
    },
    input: function(a) {
        console.log(a.detail.value), this.setData({
            input: a.detail.value
        });
    },
    remove: function() {
        var a = new n.default({
            path: t.default.deleteManagement,
            data: {
                uid: e.globalData.uid,
                id: this.data.id
            }
        });
        a.then(function(a) {
            0 == a.errcode ? wx.reLaunch({
                url: "../classManagement/classManagement"
            }) : (wx.showLoading({
                title: a.msg
            }), setTimeout(function() {
                wx.hideLoading();
            }, 1e3));
        }), a.catch(function(a) {
            e.showLoading();
        });
    },
    save: function() {
        var a = new n.default({
            path: t.default.addManagement,
            data: {
                uid: e.globalData.uid,
                inputVal: this.data.input,
                id: this.data.id
            }
        });
        a.then(function(a) {
            0 == a.errcode ? wx.reLaunch({
                url: "../classManagement/classManagement"
            }) : (wx.showLoading({
                title: a.msg
            }), setTimeout(function() {
                wx.hideLoading();
            }, 1e3));
        }), a.catch(function(a) {
            e.showLoading();
        });
    },
    onLoad: function(a) {
        var e = this;
        wx.hideShareMenu(), console.log(a.id);
        var i = a.id;
        void 0 == i && (i = 0), this.setData({
            id: i
        }), void 0 == i ? i = "" : (wx.showLoading({
            title: "加载中..."
        }), new n.default({
            path: t.default.viewManagement,
            reqtype: "GET",
            data: {
                id: i
            }
        }).then(function(a) {
            e.setData({
                inputValData: a.data.name
            }), wx.hideLoading();
        })), console.log(i);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        wx.hideShareMenu();
    }
});