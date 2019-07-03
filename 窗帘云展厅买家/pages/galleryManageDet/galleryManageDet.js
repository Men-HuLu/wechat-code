function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../utils/interface.js")), e = t(require("../../libs/ajax.js")), i = getApp();

Page({
    data: {
        url: null,
        delBtnWidth: 180,
        visit: !1
    },
    onLoad: function(t) {
        var n = this;
        wx.hideShareMenu(), void 0 == t.url && (t.url = null);
        var d = t.detailId;
        console.log(d), this.setData({
            detailId: d,
            url: t.url
        }), this.initEleWidth(), wx.showLoading({
            title: "加载中..."
        }), new e.default({
            path: a.default.galleryManage,
            data: {
                uid: i.globalData.uid
            },
            reqtype: "GET"
        }).then(function(t) {
            n.setData({
                list: t.data
            }), wx.hideLoading();
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    touchS: function(t) {
        1 == t.touches.length && this.setData({
            startX: t.touches[0].clientX
        });
    },
    touchM: function(t) {
        if (1 == t.touches.length) {
            var a = t.touches[0].clientX, e = this.data.startX - a, i = this.data.delBtnWidth, n = "";
            0 == e || e < 0 ? n = "left:0px" : e > 0 && (n = "left:-" + e + "px", e >= i && (n = "left:-" + i + "px"));
            var d = t.target.dataset.index, l = this.data.list;
            l[d].txtStyle = n, this.setData({
                list: l
            });
        }
    },
    touchE: function(t) {
        if (1 == t.changedTouches.length) {
            var a = t.changedTouches[0].clientX, e = this.data.startX - a, i = this.data.delBtnWidth, n = e > i / 2 ? "left:-" + i + "px" : "left:0px", d = t.target.dataset.index, l = this.data.list;
            l[d].txtStyle = n, this.setData({
                list: l
            });
        }
    },
    getEleWidth: function(t) {
        try {
            var a = wx.getSystemInfoSync().windowWidth, e = 375 / (t / 2);
            return Math.floor(a / e);
        } catch (t) {
            return !1;
        }
    },
    initEleWidth: function() {
        var t = this.getEleWidth(this.data.delBtnWidth);
        this.setData({
            delBtnWidth: t
        });
    },
    delItem: function(t) {
        var n = this;
        wx.showLoading({
            title: "删除中..."
        });
        var d = t.target.dataset.id;
        new e.default({
            path: a.default.galleryManageDel,
            data: {
                uid: i.globalData.uid,
                id: d
            },
            reqtype: "GET"
        }).then(function(t) {
            wx.hideLoading(), 0 == t.errcode ? n.setData({
                list: t.data
            }) : (wx.showLoading({
                title: t.msg
            }), setTimeout(function() {
                wx.hideLoading();
            }, 1e3));
        });
    },
    navigation: function(t) {
        null == this.data.url ? wx.navigateTo({
            url: "../albumManageDet/albumManageDet?detailId=" + this.data.detailId + "&id=" + t.currentTarget.dataset.id
        }) : wx.navigateTo({
            url: "../albumManageDet/albumManageDet?detailId=" + this.data.detailId + "&id=" + t.currentTarget.dataset.id + "&url=" + this.data.url
        });
    },
    newImg: function() {
        this.setData({
            visit: !0
        });
    },
    formSubmit: function(t) {
        var n = this;
        wx.showLoading({
            title: "新建中..."
        }), new e.default({
            path: a.default.galleryManageAdd,
            data: {
                uid: i.globalData.uid,
                val: t.detail.value.name,
                shopId: i.globalData.shopId
            }
        }).then(function(t) {
            n.setData({
                visit: !1
            }), wx.hideLoading(), 0 == t.errcode ? n.setData({
                list: t.data
            }) : (wx.showLoading({
                title: t.msg
            }), setTimeout(function() {
                wx.hideLoading();
            }, 1e3));
        });
    },
    close: function() {
        this.setData({
            visit: !1
        });
    }
});