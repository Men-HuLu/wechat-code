var e = getApp(), a = require("../../utils/config.js");

Page({
    data: {
        OrderId: "",
        ProductList: [],
        UserCredentials: [ "../../images/return-img_12.jpg" ],
        UploadCredentials: [],
        ScoreGrade: [],
        Remark: [],
        TxtareaName: [],
        TotalImg: 0,
        UploadNum: 0,
        isSubmit: !1,
        uploadComplete: !0
    },
    onLoad: function(t) {
        var r = this, o = t.id;
        e.getOpenId(function(t) {
            var s = {
                openId: t,
                orderId: o
            };
            a.httpGet(e.getUrl(e.globalData.loadOrderProduct), s, r.getProductData);
        }), r.setData({
            OrderId: o
        });
    },
    getProductData: function(a) {
        var t = this;
        if ("NOUser" == a.Message) wx.navigateTo({
            url: "../login/login"
        }); else if ("OK" == a.Status) {
            var r = [], o = [], s = [];
            a.Data.forEach(function(e, a, t) {
                var i = {
                    skuId: e.SkuId,
                    skucontent: e.SkuContent,
                    grade: parseInt(5),
                    remark: ""
                }, d = {
                    img1: "../../images/return-img_03.jpg",
                    img2: "../../images/return-img_03.jpg",
                    img3: "../../images/return-img_03.jpg",
                    ImgSize: 0,
                    skuId: e.SkuId
                };
                r.push(i), o.push(d), s.push("txt_" + e.SkuId);
            }), t.setData({
                ProductList: a.Data,
                ScoreGrade: r,
                UserCredentials: o,
                TxtareaName: s
            });
        } else e.showErrorModal(result.data.Message, function(e) {
            e.confirm && wx.navigateBack({
                delta: 1
            });
        });
    },
    ScoreGrade: function(e) {
        var a = e.currentTarget.dataset.grade, t = e.currentTarget.dataset.index, r = this.data.ScoreGrade;
        r[t].grade = parseInt(a), this.setData({
            ScoreGrade: r
        });
    },
    ChooseImg: function(e) {
        var a = (o = this).data.UserCredentials, t = e.currentTarget.dataset.index, r = e.currentTarget.dataset.coloum, o = (e.currentTarget.dataset.skuid, 
        this);
        wx.chooseImage({
            success: function(s) {
                var i = s.tempFilePaths[0];
                1 == r ? a[t].img1 = i : 2 == r ? a[t].img2 = i : a[t].img3 = i;
                var d = parseInt(a[t].ImgSize);
                d = d >= 2 ? 2 : parseInt(d + 1), a[t].ImgSize = d, o.setData({
                    UserCredentials: a
                }), o.UploadImg(i, e);
            }
        });
    },
    UploadImg: function(a, t) {
        var r = this, o = t.currentTarget.dataset.index, s = t.currentTarget.dataset.coloum;
        t.currentTarget.dataset.skuid;
        r.setData({
            uploadComplete: !1
        }), e.getOpenId(function(t) {
            wx.uploadFile({
                url: e.getUrl("OrderRefund/PostUploadAppletImage"),
                filePath: a,
                name: "file",
                formData: {
                    openId: t
                },
                success: function(a) {
                    var t = r.data.UserCredentials, i = JSON.parse(a.data);
                    "OK" == i.Status ? (1 == s ? t[o].imgU1 = i.Data[0].ImageUrl : 2 == s ? t[o].imgU2 = i.Data[0].ImageUrl : t[o].imgU3 = i.Data[0].ImageUrl, 
                    r.setData({
                        UserCredentials: t,
                        uploadComplete: !0
                    })) : (r.setData({
                        uploadComplete: !0
                    }), "NOUser" == i.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : e.showErrorModal(i.ErrorResponse.ErrorMsg, function(e) {
                        e.confirm && wx.navigateBack({
                            delta: 1
                        });
                    }));
                }
            });
        });
    },
    formSubmit: function(a) {
        var t = this;
        if (t.data.isSubmit) return !1;
        a.detail.formId;
        var r = t.data.ScoreGrade, o = t.data.TxtareaName;
        if (o.length <= 0) return e.showErrorModal("文本框不存在"), !1;
        var s = !1;
        if (o.forEach(function(e, o, i) {
            t.ToTrim(a.detail.value[e]).length <= 0 ? s = !0 : r[o].remark = t.ToTrim(a.detail.value[e]);
        }), s) return e.showErrorModal("请输入评价内容"), !1;
        if (!t.data.uploadComplete) return e.showErrorModal("图片正在上传"), !1;
        t.setData({
            ScoreGrade: r,
            isSubmit: !0
        });
        var i = {};
        t.data.UserCredentials.forEach(function(e, a, t) {
            var r = [];
            "../../images/return-img_03.jpg" != e.img1 && r.push(e.imgU1), "../../images/return-img_03.jpg" != e.img2 && r.push(e.imgU2), 
            "../../images/return-img_03.jpg" != e.img3 && r.push(e.imgU3), i[e.skuId] = r;
        }), t.setData({
            uploadImg: i
        }), t.AddComments();
    },
    ToTrim: function(e) {
        return e.replace(/(^\s*)|(\s*$)/g, "");
    },
    AddComments: function() {
        var a = this, t = a.data.ScoreGrade, r = [], o = a.data.uploadImg;
        t.forEach(function(e, t, s) {
            var i = {
                ProductId: e.skuId.substr(0, e.skuId.indexOf("_")),
                OrderId: a.data.OrderId,
                SkuId: e.skuId,
                ReviewText: e.remark,
                SkuContent: e.skucontent,
                Score: e.grade,
                ImageUrl1: ""
            }, d = e.skuId;
            void 0 != o[d] && (i.ImageUrl1 = o[d].join(",")), r.push(i);
        }), e.getOpenId(function(a) {
            wx.request({
                url: e.getUrl("product/GetAddProductReview"),
                data: {
                    openId: a,
                    DataJson: r
                },
                success: function(e) {
                    "OK" == e.data.Status ? wx.showModal({
                        title: "提示",
                        confirmColor: "#ff5722",
                        content: e.data.Message,
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && wx.redirectTo({
                                url: "../orderlist/orderlist"
                            });
                        }
                    }) : "NOUser" == e.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        confirmColor: "#ff5722",
                        content: e.data.Message,
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                },
                complete: function() {}
            });
        });
    }
});