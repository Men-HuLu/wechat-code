function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../libs/ajax.js")), a = (t(require("../../libs/userLogin.js")), 
getApp()), o = require("../../utils/interface.js");

Page({
    data: {
        detailId: "",
        disabled: !1,
        list: [],
        index: null,
        classify: [],
        checkboxtypePost: [],
        checkboxtype: [],
        checkboxCustomer: [],
        checkboxChangePost: [],
        radioCustomer: [],
        radioChangePost: "",
        oneVal: "",
        twoVal: "",
        threeVal: "",
        imgLoadImg: [],
        drags: !0,
        colors: null
    },
    drap: function(t) {
        var e = this.data.colors, a = t.currentTarget.dataset.id;
        if (null == e) this.setData({
            colors: a
        }); else {
            var o = this.data.colors, i = this.data.list, s = i[a], n = i[o];
            i[a] = n, i[o] = s, this.setData({
                colors: null,
                list: i
            });
            wx.getStorageSync("getShop");
        }
    },
    one: function(t) {
        console.log(t.detail.value);
        var e = t.detail.value;
        this.setData({
            oneVal: e
        });
    },
    two: function(t) {
        console.log(t.detail.value);
        var e = t.detail.value;
        this.setData({
            twoVal: e
        });
    },
    bindPickerChange: function(t) {
        console.log("picker发送选择改变，携带值为", t), this.setData({
            index: t.detail.value
        });
    },
    three: function(t) {
        console.log(t.detail.value);
        var e = t.detail.value;
        this.setData({
            threeVal: e
        });
    },
    checkboxChangeType: function(t) {
        for (var e = t.detail.value, a = this.data.checkboxtype, o = [], i = 0; i < a.length; i++) e.includes(a[i].name) ? (a[i].checked = !0, 
        o.push(a[i].value)) : a[i].checked = !1;
        this.setData({
            checkboxtype: a,
            checkboxtypePost: o
        }), console.log(a);
    },
    checkboxChangeCustomer: function(t) {
        for (var e = t.detail.value, a = this.data.checkboxCustomer, o = [], i = 0; i < a.length; i++) e.includes(a[i].name) ? (a[i].checked = !0, 
        o.push(a[i].value)) : a[i].checked = !1;
        this.setData({
            checkboxCustomer: a,
            checkboxChangePost: o
        }), console.log(a);
    },
    radioChangeCustomer: function(t) {
        for (var e = t.detail.value, a = this.data.radioCustomer, o = void 0, i = 0; i < a.length; i++) a[i].checked = !1, 
        e.includes(a[i].name) && (a[i].checked = !0, o = a[i].value);
        this.setData({
            radioCustomer: a,
            radioChangePost: o
        }), console.log(o);
    },
    previewImage: function(t) {
        wx.previewImage({
            current: t.currentTarget.dataset.src,
            urls: this.data.list,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    addImge: function() {
        wx.navigateTo({
            url: "../galleryManageDet/galleryManageDet?detailId=" + this.data.detailId
        });
    },
    navigation: function() {
        var t = this.data.detailId;
        if ("" == this.data.oneVal || "" == this.data.twoVal || null == this.data.index || this.data.list.length < 1) return wx.showLoading({
            title: "不能为空"
        }), void setTimeout(function() {
            wx.hideLoading();
        }, 1e3);
        var e = {
            checkboxtype: this.data.checkboxChangePost,
            checkboxCustomer: this.data.checkboxtypePost,
            radioCustomer: this.data.radioChangePost,
            oneVal: this.data.oneVal,
            twoVal: this.data.twoVal,
            threeVal: this.data.threeVal,
            index: this.data.classify[this.data.index],
            shopImg: this.data.list,
            imgLoadImg: this.data.imgLoadImg
        };
        wx.setStorage({
            key: "firstShop",
            data: e,
            success: function(e) {
                wx.navigateTo({
                    url: "../shopCopy/shopCopy?id=" + t
                });
            }
        });
    },
    onLoad: function(t) {
        var i = this;
        wx.hideShareMenu(), this.setData({
            detailId: t.id
        }), "copy" == t.title && wx.setNavigationBarTitle({
            title: "复制新增"
        }), new e.default({
            path: o.shopEdit,
            data: {
                uid: a.globalData.uid,
                id: t.id
            },
            reqtype: "GET"
        }).then(function(t) {
            i.setData({
                checkboxCustomer: t.data.checkboxCustomer,
                checkboxtype: t.data.checkboxtype,
                classify: t.data.classify,
                index: t.data.index,
                oneVal: t.data.oneVal,
                radioCustomer: t.data.radioCustomer,
                threeVal: t.data.threeVal,
                twoVal: t.data.twoVal,
                list: t.data.shopImg
            });
            var e = t.data.checkboxCustomer, a = t.data.checkboxtype, o = t.data.radioCustomer;
            for (var s in e) console.log(s, "--------", e[s]), console.log(e[s].checked), e[s].checked && (i.data.checkboxChangePost.push(e[s].value), 
            i.setData({
                checkboxChangePost: i.data.checkboxChangePost
            }));
            for (var n in a) console.log(n, "--------", a[n]), console.log(a[n].checked), a[n].checked && (i.data.checkboxtypePost.push(a[n].value), 
            i.setData({
                checkboxtypePost: i.data.checkboxtypePost
            }));
            for (var c in o) console.log(c, "--------", o[c]), console.log(o[c].checked), o[c].checked && (i.data.radioChangePost = o[c].value, 
            i.setData({
                radioChangePost: i.data.radioChangePost
            }));
            console.log(i.data.radioChangePost, i.data.checkboxtypePost, i.data.checkboxChangePost), 
            wx.setStorage({
                key: "getShop",
                data: t.data
            }), console.log(i.data);
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
    delImg: function(t) {
        if (this.endTime - this.startTime < 350) {
            var a = this;
            console.log(this.data.detailId), console.log(t.currentTarget.dataset.id), wx.showModal({
                title: "注意",
                content: "是否删除此图",
                success: function(i) {
                    i.confirm ? (wx.showLoading({
                        title: "删除中..."
                    }), new e.default({
                        path: o.shopEditDel,
                        data: {
                            id: t.currentTarget.dataset.id
                        }
                    }).then(function(t) {
                        wx.hideLoading(), 0 == t.errcode ? wx.reLaunch({
                            url: "../shopCopyFirst/shopCopyFirst?id=" + a.data.detailId
                        }) : (wx.showLoading({
                            title: t.msg
                        }), setTimeout(function() {
                            wx.hideLoading();
                        }, 1e3));
                    }), console.log("用户点击确定")) : i.cancel && console.log("用户点击取消");
                }
            });
        }
    },
    bindTouchStart: function(t) {
        this.startTime = t.timeStamp;
    },
    bindTouchEnd: function(t) {
        this.endTime = t.timeStamp;
    }
});