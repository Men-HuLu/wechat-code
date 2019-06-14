function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../common/login")), a = e(require("../../../config/index")), o = e(require("../../../config/area")), n = e(require("../../../common/httpClient")), r = getApp();

Component({
    properties: {
        isshow: {
            type: Boolean,
            value: !1,
            observer: function(e) {
                e ? (this.getVerifyCodeImage(), this.data.areaList.length || this.setData({
                    areaList: o.default.areaList
                })) : (this.reset(), this.resetData());
            }
        },
        isYz: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        areashow: !1,
        isscroll: !0,
        areaList: [],
        phoneInputValue: "",
        picVerifyCodeValue: "",
        verifyCodeValue: "",
        areaIndexNow: 0,
        areaNum: "86",
        areaName: "中国",
        intervalTime: 60,
        countdown: !1,
        hasSendSms: !1,
        verifyCodeUrl: "",
        finalIsSending: !1,
        smsBtn: "短信验证"
    },
    methods: {
        clickCancelMask: function() {
            var e = {};
            this.data.areashow ? e.areashow = !1 : e.isshow = !1, this.setData(e);
        },
        showAreaPop: function() {
            this.setData({
                areashow: !0
            });
        },
        chooseArea: function(e) {
            var t = e.currentTarget.dataset, a = {
                areaIndexNow: t.index,
                areaNum: t.code,
                areaName: t.name,
                areashow: !1
            };
            this.setData(a);
        },
        back: function(e) {
            this.setData({
                areashow: !1
            });
        },
        phoneInput: function(e) {
            this.setData({
                phoneInputValue: e.detail.value
            });
        },
        clearPhoneInput: function() {
            this.setData({
                phoneInputValue: ""
            });
        },
        picVerifyCodeInput: function(e) {
            this.setData({
                picVerifyCodeValue: e.detail.value
            });
        },
        clearPicVerifyCodeInput: function() {
            this.setData({
                picVerifyCodeValue: ""
            });
        },
        verifyCodeInput: function(e) {
            this.setData({
                verifyCodeValue: e.detail.value
            });
        },
        clearVerifyCodeInput: function() {
            this.setData({
                verifyCodeValue: ""
            });
        },
        refreshVerifyCode: function() {
            this.getVerifyCodeImage();
        },
        sendPhoneCaptcha: function(e) {
            var o = this;
            if (this.data.phoneInputValue && this.data.picVerifyCodeValue && !this.data.countdown && this.verifyForm(0)) {
                var i = r.getUrlParam("roomId"), s = r.globalData.did;
                r.getToken(function(e) {
                    t.default.checkBoundDYAccount("room", i, function(t) {
                        n.default.request({
                            url: a.default.HOST + "/wxapi/auth/sendPhoneCaptcha?did=" + s,
                            method: "POST",
                            data: {
                                phoneNum: parseInt(o.data.phoneInputValue),
                                areaCode: o.data.areaNum,
                                captcha: o.data.picVerifyCodeValue,
                                token: e.token,
                                log_token: t
                            }
                        }).then(function(e) {
                            var t = parseInt(e.code, 10);
                            0 === t ? (o.setData({
                                countdown: !0,
                                hasSendSms: !0
                            }), o.intervalTask()) : 82 === t ? (e.data.url ? o.setData({
                                verifyCodeUrl: e.data.url
                            }) : o.getVerifyCodeImage(), o.errorToast("图片验证码错误")) : 10012 === t ? (r.getToken(function() {}, 1), 
                            o.errorToast(e.data + ",请重试")) : 10007 === t ? (o.resetLogToken(), o.errorToast(e.data + ",请重试")) : o.errorToast(e.data);
                        }).catch(function() {
                            o.errorToast("网络异常");
                        });
                    });
                });
            }
        },
        sendBindPhone: function(e) {
            var o = this;
            if (this.data.phoneInputValue && this.data.picVerifyCodeValue && this.data.verifyCodeValue && !this.data.finalIsSending && this.verifyForm(1)) {
                this.setData({
                    finalIsSending: !0
                });
                var i = r.getUrlParam("roomId"), s = r.globalData.did;
                r.getToken(function(e) {
                    t.default.checkBoundDYAccount("room", i, function(t) {
                        n.default.request({
                            url: a.default.HOST + "/wxapi/auth/bindPhone?did=" + s,
                            method: "POST",
                            data: {
                                phoneNum: parseInt(o.data.phoneInputValue),
                                areaCode: o.data.areaNum,
                                captcha: o.data.verifyCodeValue,
                                token: e,
                                log_token: t
                            }
                        }).then(function(e) {
                            o.setData({
                                finalIsSending: !1
                            });
                            var t = parseInt(e.code, 10);
                            0 === t ? (o.setData({
                                isshow: !1
                            }), o.successToast("绑定成功"), o.triggerEvent("bindPhoneCallback")) : 10012 === t ? (r.getToken(function() {}, 1), 
                            o.errorToast(e.data + ",请重试")) : 10007 === t ? (o.resetLogToken(), o.errorToast(e.data + ",请重试")) : o.errorToast(e.data);
                        }).catch(function() {
                            o.errorToast("网络异常"), o.setData({
                                finalIsSending: !1
                            });
                        });
                    });
                });
            }
        },
        resetLogToken: function() {
            var e = wx.getStorageSync("dyUserInfo") || {};
            wx.setStorageSync("dyUserInfo", Object.assign(e, {
                localToken: ""
            }));
        },
        errorToast: function(e) {
            wx.showToast({
                title: e,
                icon: "none",
                duration: 2e3
            });
        },
        successToast: function(e) {
            wx.showToast({
                title: e,
                icon: "success",
                duration: 2e3
            });
        },
        verifyForm: function(e) {
            var t = void 0;
            return /^[0-9]*$/.test(this.data.phoneInputValue) ? /^[0-9a-zA-Z]*$/.test(this.data.picVerifyCodeValue) ? !(1 === e && !/^[0-9]{6}$/.test(this.data.verifyCodeValue)) || (t = "验证码错误", 
            this.errorToast(t), !1) : (t = "验证码错误", this.errorToast(t), !1) : (t = "手机号格式不正确", 
            this.errorToast(t), !1);
        },
        resetData: function() {
            this.setData({
                areashow: !1,
                phoneInputValue: "",
                picVerifyCodeValue: "",
                verifyCodeValue: "",
                areaIndexNow: 0,
                areaNum: "86",
                areaName: "中国",
                intervalTime: 60,
                countdown: !1,
                hasSendSms: !1,
                verifyCodeUrl: ""
            });
        },
        reset: function() {
            this.timer && clearInterval(this.timer), this.timer = null, this.setData({
                countdown: !1,
                intervalTime: 60
            });
        },
        intervalTask: function() {
            var e = this;
            this.timer = setInterval(function() {
                e.setData({
                    intervalTime: e.data.intervalTime - 1
                }), e.data.intervalTime > 0 || e.reset();
            }, 1e3);
        },
        getVerifyCodeImage: function() {
            var e = this, o = r.getUrlParam("roomId"), i = r.globalData.did;
            r.getToken(function(s) {
                t.default.checkBoundDYAccount("room", o, function(t) {
                    n.default.request({
                        url: a.default.HOST + "/wxapi/auth/getCaptcha?did=" + i,
                        method: "POST",
                        data: {
                            op_type: 24,
                            token: s.token,
                            log_token: t
                        }
                    }).then(function(t) {
                        var a = parseInt(t.code, 10);
                        0 === a ? e.setData({
                            verifyCodeUrl: t.data.url
                        }) : 10012 === a ? r.getToken(function() {
                            e.getVerifyCodeImage();
                        }, 1) : 10007 === a ? (e.resetLogToken(), e.errorToast(t.data + ",请重试")) : e.errorToast(t.data);
                    }).catch(function() {
                        e.errorToast("网络异常");
                    });
                });
            });
        }
    },
    behaviors: [],
    created: function() {
        var e = this.setData, t = Object.prototype.hasOwnProperty;
        this.setData = function(a) {
            (t.call(a, "hasSendSms") || t.call(a, "areaNum")) && (a.smsBtn = a.hasSendSms ? "重新发送" : "86" === a.areaNum ? "短信验证" : "语音验证"), 
            e.call(this, a);
        };
    },
    attached: function() {},
    ready: function() {},
    moved: function() {},
    detached: function() {}
});