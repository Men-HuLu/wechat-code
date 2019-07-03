function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function t(a, t, i) {
    return t in a ? Object.defineProperty(a, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = i, a;
}

var i = a(require("../../utils/interface.js")), e = a(require("../../libs/ajax.js")), o = getApp();

Page({
    data: {
        adopt: [],
        wait: [],
        page: 1,
        id: null
    },
    onLoad: function(a) {
        var t = this;
        wx.hideShareMenu();
        var n = a.id;
        this.setData({
            id: n
        }), wx.showLoading({
            title: "加载中..."
        }), new e.default({
            path: i.default.reviewExamine,
            data: {
                id: this.data.id,
                uid: o.globalData.uid,
                shopId: o.globalData.shopId
            },
            reqtype: "GET"
        }).then(function(a) {
            console.log(a.data), t.setData({
                adopt: a.data.adopt,
                wait: a.data.wait
            }), wx.hideLoading();
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
    checkboxChange: function(a) {
        var i = this;
        console.log(a);
        var e = a.currentTarget.dataset.nextid, o = a.currentTarget.dataset.id;
        console.log(o), this.data.wait.forEach(function(a, n) {
            console.log(a), console.log(n), a.id == e && a.imgList.forEach(function(a, e) {
                a.imgId == o && (console.log(a), i.setData(t({}, "wait[" + n + "].imgList[" + e + "].checkbox", !i.data.wait[n].imgList[e].checkbox)));
            });
        }), console.log(this.data.wait);
    },
    formSubmit: function(a) {
        var t = this;
        wx.showLoading({
            title: "修改中..."
        });
        var n = a.detail.target.dataset;
        console.log(n);
        var d = [];
        this.data.wait.forEach(function(a, t) {
            a.id == n.id && a.imgList.forEach(function(a, t) {
                1 == a.checkbox && d.push(a.imgId);
            });
        }), new e.default({
            path: i.default.reviewExamineWait,
            data: {
                uid: o.globalData.uid,
                shopId: o.globalData.shopId,
                id: this.data.id,
                listId: n.id,
                imgListId: d,
                isWait: n.btn
            }
        }).then(function(a) {
            wx.hideLoading(), 0 == a.errcode ? (t.setData({
                adopt: a.data.adopt,
                wait: a.data.wait
            }), wx.reLaunch({
                url: "../commentManage/commentManage"
            })) : (wx.showLoading({
                title: a.msg
            }), setTimeout(function() {
                wx.hideLoading();
            }, 2e3));
        }), console.log(d);
    },
    pullUpLoad: function() {
        var a = this, t = (this.data.adopt, this.data.wait, this.data.page);
        t += 1, this.setData({
            page: t
        }), wx.showLoading({
            title: "加载中..."
        }), new e.default({
            path: i.default.reviewExamine,
            data: {
                id: this.data.id,
                uid: o.globalData.uid,
                shopId: o.globalData.shopId,
                page: t
            },
            reqtype: "GET"
        }).then(function(t) {
            a.setData({
                adopt: a.data.adopt.concat(t.data.adopt),
                wait: a.data.wait.concat(t.data.wait)
            }), wx.hideLoading();
        });
    },
    del: function(a) {
        var t = this;
        console.log(a.currentTarget.dataset.id), wx.showLoading({
            title: "删除中..."
        }), new e.default({
            path: i.default.reviewExamineAdopt,
            data: {
                uid: o.globalData.uid,
                shopId: o.globalData.shopId,
                id: this.data.id,
                listId: a.currentTarget.dataset.id,
                isWait: this.data.btn
            }
        }).then(function(a) {
            wx.hideLoading(), 0 == a.errcode ? (t.setData({
                adopt: a.data.adopt,
                wait: a.data.wait
            }), wx.reLaunch({
                url: "../commentManage/commentManage"
            })) : (wx.showLoading({
                title: a.msg
            }), setTimeout(function() {
                wx.hideLoading();
            }, 2e3));
        });
    },
    showImg: function(a) {
        var t = a.currentTarget, i = t.dataset.id, e = [];
        this.data.wait.forEach(function(a, t) {
            i == a.id && a.imgList.forEach(function(a, t) {
                e = e.concat(a.img);
            });
        }), console.log(e), wx.previewImage({
            current: t.dataset.src,
            urls: e
        });
    }
});