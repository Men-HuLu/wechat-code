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
        visit: !1,
        changeImgName: !1,
        imgId: null
    },
    onLoad: function(t) {
        var n = this;
        wx.hideShareMenu(), void 0 == t.url && (t.url = null);
        var l = t.url;
        console.log(l), this.setData({
            url: l
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
            var l = t.target.dataset.index, d = this.data.list;
            d[l].txtStyle = n, this.setData({
                list: d
            });
        }
    },
    touchE: function(t) {
        if (1 == t.changedTouches.length) {
            var a = t.changedTouches[0].clientX, e = this.data.startX - a, i = this.data.delBtnWidth, n = e > i / 2 ? "left:-" + i + "px" : "left:0px", l = t.target.dataset.index, d = this.data.list;
            d[l].txtStyle = n, this.setData({
                list: d
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
        this.setData({
            imgId: t.currentTarget.dataset.id,
            changeImgName: !0
        });
    },
    navigation: function(t) {
        console.log(t), wx.navigateTo({
            url: "../albumManage/albumManage?url=" + this.data.url + "&id=" + t.currentTarget.dataset.id
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
            }) : wx.showModal({
                title: "提示",
                content: t.msg
            });
        });
    },
    voide: function() {},
    close: function() {
        this.setData({
            visit: !1
        });
    },
    closeChange: function() {
        this.setData({
            changeImgName: !1
        });
    },
    changeImgName: function(t) {
        var n = this;
        wx.showLoading({
            title: "修改中..."
        }), new e.default({
            path: a.default.galleryManageChange,
            reqtype: "GET",
            data: {
                uid: i.globalData.uid,
                name: t.detail.value.name,
                shopId: i.globalData.shopId,
                id: this.data.imgId
            }
        }).then(function(t) {
            n.setData({
                changeImgName: !1
            }), wx.hideLoading(), 0 == t.errcode ? n.setData({
                list: t.data
            }) : wx.showToast({
                title: t.msg
            });
        });
    }
});