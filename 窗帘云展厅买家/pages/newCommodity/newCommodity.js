function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var a = e(require("../../libs/ajax.js")), t = (e(require("../../libs/userLogin.js")), 
getApp()), o = require("../../utils/interface.js");

Page({
    data: {
        pickShop: "",
        disabled: !1,
        list: [],
        index: null,
        classify: [],
        checkboxtypePost: [ "推荐" ],
        checkboxtype: [ {
            name: "recommend",
            value: "推荐",
            checked: "true"
        }, {
            name: "new",
            value: "新品"
        }, {
            name: "sales",
            value: "促销"
        } ],
        checkboxChangePost: [ "批发商" ],
        checkboxCustomer: [ {
            name: "wholesale",
            value: "批发商",
            checked: "true"
        }, {
            name: "retail",
            value: "零售商"
        } ],
        radioChangePost: "充足",
        radioCustomer: [ {
            name: "adequate",
            value: "充足",
            checked: "true"
        }, {
            name: "nervous",
            value: "紧张"
        }, {
            name: "oos",
            value: "缺货"
        } ],
        oneVal: "",
        twoVal: "",
        threeVal: "",
        imgLoadImg: [],
        drags: !0
    },
    drap: function(e) {
        var a = this.data.colors, t = e.currentTarget.dataset.id;
        if (null == a) this.setData({
            colors: t
        }); else {
            var o = this.data.colors, i = this.data.imgLoadImg, s = i[t], n = i[o];
            i[t] = n, i[o] = s, this.setData({
                colors: null,
                imgLoadImg: i
            });
            var c = wx.getStorageSync("firstShop");
            c.imgLoadImg = this.data.imgLoadImg, wx.setStorageSync("firstShop", c);
        }
    },
    one: function(e) {
        console.log(e.detail.value);
        var a = e.detail.value;
        this.setData({
            oneVal: a
        });
    },
    two: function(e) {
        console.log(e.detail.value);
        var a = e.detail.value;
        this.setData({
            twoVal: a
        });
    },
    bindPickerChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        var a = this.data.classify[e.detail.value];
        this.setData({
            index: e.detail.value,
            pickShop: a
        });
    },
    three: function(e) {
        console.log(e.detail.value);
        var a = e.detail.value;
        this.setData({
            threeVal: a
        });
    },
    checkboxChangeType: function(e) {
        for (var a = e.detail.value, t = this.data.checkboxtype, o = [], i = 0; i < t.length; i++) a.includes(t[i].name) ? (t[i].checked = !0, 
        o.push(t[i].value)) : t[i].checked = !1;
        this.setData({
            checkboxtype: t,
            checkboxtypePost: o
        }), console.log(o), console.log(t);
    },
    checkboxChangeCustomer: function(e) {
        for (var a = e.detail.value, t = this.data.checkboxCustomer, o = [], i = 0; i < t.length; i++) a.includes(t[i].name) ? (t[i].checked = !0, 
        o.push(t[i].value)) : t[i].checked = !1;
        this.setData({
            checkboxCustomer: t,
            checkboxChangePost: o
        }), console.log(t), console.log(o);
    },
    radioChangeCustomer: function(e) {
        for (var a = e.detail.value, t = this.data.radioCustomer, o = void 0, i = 0; i < t.length; i++) t[i].checked = !1, 
        a.includes(t[i].name) && (t[i].checked = !0, o = t[i].value);
        this.setData({
            radioCustomer: t,
            radioChangePost: o
        }), console.log(t), console.log(o);
    },
    previewImage: function(e) {
        wx.previewImage({
            current: e.currentTarget.dataset.src,
            urls: this.data.list,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    addImge: function() {
        console.log(this.data.imgLoadImg.length);
        var e = {
            checkboxtype: this.data.checkboxtype,
            checkboxCustomer: this.data.checkboxCustomer,
            radioCustomer: this.data.radioCustomer,
            oneVal: this.data.oneVal,
            twoVal: this.data.twoVal,
            threeVal: this.data.threeVal,
            index: this.data.index,
            imgLoadImg: this.data.imgLoadImg
        };
        this.data.imgLoadImg.length >= 10 ? wx.showModal({
            title: "提示",
            content: "图片数量超出限制,请删除图片"
        }) : wx.setStorage({
            key: "firstShop",
            data: e,
            success: function(e) {
                wx.navigateTo({
                    url: "../galleryManage/galleryManage?url=newCommodity"
                });
            }
        });
    },
    navigation: function() {
        if ("" == this.data.oneVal || "" == this.data.twoVal || null == this.data.index || this.data.imgLoadImg.length < 1) return wx.showLoading({
            title: "不能为空"
        }), void setTimeout(function() {
            wx.hideLoading();
        }, 1e3);
        console.log(this.data.checkboxChangePost);
        var e = {
            checkboxtype: this.data.checkboxtypePost,
            checkboxCustomer: this.data.checkboxChangePost,
            radioCustomer: this.data.radioChangePost,
            oneVal: this.data.oneVal,
            twoVal: this.data.twoVal,
            threeVal: this.data.threeVal,
            index: this.data.classify[this.data.index],
            imgLoadImg: this.data.imgLoadImg
        };
        wx.setStorage({
            key: "firstShop",
            data: e,
            success: function(e) {
                wx.navigateTo({
                    url: "../newCommodityTwo/newCommodityTwo"
                });
            }
        });
    },
    onLoad: function(e) {
        var i = this;
        wx.hideShareMenu();
        var s = this;
        wx.getStorage({
            key: "firstShop",
            success: function(e) {
                s.setData({
                    imgLoadImg: e.data.imgLoadImg,
                    checkboxtype: e.data.checkboxtype,
                    checkboxCustomer: e.data.checkboxCustomer,
                    radioCustomer: e.data.radioCustomer,
                    oneVal: e.data.oneVal,
                    twoVal: e.data.twoVal,
                    threeVal: e.data.threeVal,
                    index: e.data.index
                });
                for (var a = e.data.checkboxtype, t = [], o = e.data.checkboxCustomer, i = [], n = e.data.radioCustomer, c = "", d = 0; d < a.length; d++) 1 == a[d].checked && t.push(a[d].value);
                for (var l = 0; l < o.length; l++) 1 == o[l].checked && i.push(o[l].value);
                for (var h = 0; h < n.length; h++) 1 == n[h].checked && (c = n[h].value);
                0 == t.length && (t = [ "推荐" ]), 0 == i && (i = [ "批发商" ]), "" == c && (c = "充足"), 
                s.setData({
                    checkboxtypePost: t,
                    checkboxChangePost: i,
                    radioChangePost: c
                }), console.log("跳转回缓存数据", t);
            }
        }), new a.default({
            path: o.getNewCommodity,
            data: {
                uid: t.globalData.uid,
                id: t.globalData.shopId
            },
            reqtype: "GET"
        }).then(function(e) {
            var a = e.data;
            i.setData({
                classify: a
            });
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
    delImg: function(e) {
        if (this.endTime - this.startTime < 350) {
            var a = this;
            console.log(e.currentTarget.dataset.id), wx.showModal({
                title: "注意",
                content: "是否删除此图",
                success: function(t) {
                    if (t.confirm) {
                        a.data.imgLoadImg.splice(e.currentTarget.dataset.id, 1);
                        console.log(a.data.imgLoadImg), a.setData({
                            imgLoadImg: a.data.imgLoadImg
                        });
                        var o = {
                            imgLoadImg: a.data.imgLoadImg
                        };
                        try {
                            wx.setStorageSync("firstShop", o), console.log(2);
                        } catch (e) {}
                        console.log("用户点击确定");
                    } else t.cancel && console.log("用户点击取消");
                }
            });
        }
    },
    bindTouchStart: function(e) {
        this.startTime = e.timeStamp;
    },
    bindTouchEnd: function(e) {
        this.endTime = e.timeStamp;
    }
});