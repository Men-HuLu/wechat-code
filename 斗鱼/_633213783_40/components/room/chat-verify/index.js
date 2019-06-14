function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../lib/behaviors/computed")), a = e(require("../../../common/login")), o = e(require("../../../common/httpClient")), i = e(require("../../../config/index")), r = getApp(), n = void 0;

Component({
    behaviors: [ t.default ],
    properties: {
        verifytype: {
            type: Number,
            value: 1
        },
        verifyinfo: {
            type: Object,
            value: {
                code: "",
                btnType: "",
                dyphone: ""
            }
        },
        isYz: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        picVerifyCodeValue: "",
        verifyCodeValue: "",
        intervalTime: 60,
        countdown: !1,
        hasSendSms: !1,
        verifyCodeUrl: "",
        finalIsSending: !1
    },
    computed: {
        cansendPhoneCaptcha: function() {
            return 2 === this.data.verifytype && (this.data.picVerifyCodeValue && !this.data.countdown);
        },
        cansendVerify: function() {
            return 2 === this.data.verifytype ? this.data.picVerifyCodeValue && this.data.verifyCodeValue && !this.data.finalIsSending : 1 === this.data.verifytype && (this.data.picVerifyCodeValue && !this.data.finalIsSending);
        },
        codeUpper: function() {
            var e = this.data.verifyinfo.code;
            return !(!e || "[object String]" !== Object.prototype.toString.call(e)) && e.toUpperCase();
        },
        titleNow: function() {
            return 1 === this.data.verifytype ? "您的帐号存在安全风险，请验证身份" : "发送弹幕需要完成手机号码验证";
        },
        smsBtn: function() {
            return this.data.hasSendSms ? "重新发送" : this.data.verifyinfo.btnType ? "语音验证" : "短信验证";
        }
    },
    methods: {
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
            return 2 === this.data.verifytype ? /^[0-9a-zA-Z]*$/.test(this.data.picVerifyCodeValue) ? !(1 === e && !/^[0-9]{6}$/.test(this.data.verifyCodeValue)) || (t = "验证码错误", 
            this.errorToast(t), !1) : (t = "验证码错误", this.errorToast(t), !1) : 1 === this.data.verifytype ? !!/^[0-9a-zA-Z]*$/.test(this.data.picVerifyCodeValue) || (t = "验证码错误", 
            this.errorToast(t), !1) : 3 === this.data.verifytype;
        },
        resetData: function() {
            this.setData({
                picVerifyCodeValue: "",
                verifyCodeValue: "",
                intervalTime: 60,
                countdown: !1,
                hasSendSms: !1,
                verifyCodeUrl: "",
                verifyinfo: {
                    code: "",
                    btnType: "",
                    dyphone: ""
                }
            });
        },
        reset: function() {
            clearInterval(n), this.setData({
                countdown: !1,
                intervalTime: 60
            }), n = null;
        },
        intervalTask: function() {
            var e = this;
            n = setInterval(function() {
                e.setData({
                    intervalTime: --e.data.intervalTime
                }), e.data.intervalTime > 0 || e.reset();
            }, 1e3);
        },
        getVerifyCodeImage: function() {
            var e = this, t = r.getUrlParam("roomId"), n = r.globalData.did;
            r.getToken(function(d) {
                a.default.checkBoundDYAccount("room", t, function(t) {
                    o.default.request({
                        url: i.default.HOST + "/wxapi/auth/getCaptcha?did=" + n,
                        method: "POST",
                        data: {
                            op_type: 24,
                            token: d.token,
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
        },
        verifyValidate: function(e) {
            var t = this;
            this.setData({
                finalIsSending: !0
            });
            var n = r.getUrlParam("roomId"), d = r.globalData.did;
            a.default.checkBoundDYAccount("room", n, function(a) {
                o.default.request({
                    url: i.default.HOST + "/wxapi/auth/verifyValidate?did=" + d,
                    method: "POST",
                    data: Object.assign(e, {
                        log_token: a
                    })
                }).then(function(e) {
                    t.setData({
                        finalIsSending: !1
                    });
                    var a = parseInt(e.code, 10);
                    0 === a ? (t.triggerEvent("close"), t.successToast("验证成功")) : 82 === a ? (e.data.url ? t.setData({
                        verifyCodeUrl: e.data.url
                    }) : t.getVerifyCodeImage(), t.errorToast("图片验证码错误")) : 10012 === a ? (r.getToken(function() {}, 1), 
                    t.errorToast(e.data + ",请重试")) : 10007 === a ? (t.resetLogToken(), t.errorToast(e.data + ",请重试")) : t.errorToast(e.data);
                }).catch(function() {
                    t.errorToast("网络异常"), t.setData({
                        finalIsSending: !1
                    });
                });
            });
        },
        clickCancelMask: function() {
            this.triggerEvent("close");
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
        setClipBoard: function() {
            wx.setClipboardData({
                data: "" + this.data.verifyinfo.dyphone
            });
        },
        sendPhoneCaptcha: function(e) {
            var t = this;
            if (this.data.cansendPhoneCaptcha && this.verifyForm(0)) {
                var n = r.getUrlParam("roomId"), d = r.globalData.did;
                r.getToken(function(e) {
                    a.default.checkBoundDYAccount("room", n, function(a) {
                        o.default.request({
                            url: i.default.HOST + "/wxapi/auth/sendPhoneCaptchaVerify?did=" + d,
                            method: "POST",
                            data: {
                                captcha: t.data.picVerifyCodeValue,
                                token: e.token,
                                log_token: a
                            }
                        }).then(function(e) {
                            var a = parseInt(e.code, 10);
                            0 === a ? (t.setData({
                                countdown: !0,
                                hasSendSms: !0
                            }), t.intervalTask()) : 82 === a ? (e.data.url ? t.setData({
                                verifyCodeUrl: e.data.url
                            }) : t.getVerifyCodeImage(), t.errorToast("图片验证码错误")) : 10012 === a ? (r.getToken(function() {}, 1), 
                            t.errorToast(e.data + ",请重试")) : 10007 === a ? (t.resetLogToken(), t.errorToast(e.data + ",请重试")) : t.errorToast(e.data);
                        }).catch(function() {
                            t.errorToast("网络异常");
                        });
                    });
                });
            }
        },
        sendVerify: function(e) {
            var t = this;
            if (this.data.cansendVerify && this.verifyForm(1)) {
                var a = r.getUrlParam("roomId");
                r.getToken(function(e) {
                    var o = {
                        room_id: a,
                        black_type: 1,
                        token: e.token
                    };
                    1 === t.data.verifytype ? Object.assign(o, {
                        captcha: t.data.picVerifyCodeValue
                    }) : 2 === t.data.verifytype && Object.assign(o, {
                        code: t.data.verifyCodeValue
                    }), t.verifyValidate(o);
                });
            }
        },
        sendVerifyBarrage: function() {
            var e = this;
            r.getToken(function(t) {
                var a = {
                    room_id: r.getUrlParam("roomId"),
                    black_type: 1,
                    token: t.token
                };
                e.verifyValidate(a);
            });
        }
    },
    created: function() {},
    attached: function() {},
    ready: function() {
        this.getVerifyCodeImage();
    },
    moved: function() {},
    detached: function() {
        this.reset(), this.resetData();
    }
});