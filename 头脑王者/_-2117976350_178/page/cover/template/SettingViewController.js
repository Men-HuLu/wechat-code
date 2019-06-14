function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var a = e[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(e, n, a) {
        return n && t(e.prototype, n), a && t(e, a), e;
    };
}(), n = require("./../../../util/util.js"), a = (require("./../../../const/consts.js"), 
require("./../../../util/Tween.js"), require("./../../../net/settingNet.js")), i = (require("./../../../net/messageNet.js"), 
require("./../../../data/MainData.js")), s = getApp(), o = function() {
    function o(e) {
        var a = this;
        t(this, o), this.page = e;
        var i = {
            settingViewVisible: !1,
            hasAnyNotice: !1,
            scopeBtnVisible: !1
        };
        n.setPageData(this.page, {
            settingData: i
        }), this.page.onTapSettingView_pushBtn = function() {
            a.onTapSettingView_pushBtn();
        }, this.page.onTapSettingView_soundBtn = function() {
            a.onTapSettingView_soundBtn();
        }, this.page.onTapNoticeInSettingView = function() {
            a.onTapNoticeInSettingView();
        }, this.page.onTapSettingViewCloseBtn = function() {
            a.onTapSettingViewCloseBtn();
        }, this.page.userInfoHandler_setting = function() {
            a.userInfoHandler_setting();
        }, this.page.onTapGetUserInfoBtn_setting = function() {
            a.onTapGetUserInfoBtn_setting();
        };
    }
    return e(o, [ {
        key: "show",
        value: function(t) {
            this.callback_soundSwitch = t;
            try {
                var e = s.mainData.role.settingsInfo || {};
                n.setPageData(this.page, {
                    settingData: {
                        settingViewVisible: !0,
                        hasAnyNotice: this.hasAnyNotice(),
                        settingOpacity: 1,
                        tmpForbiddenPush: e.forbiddenPush,
                        tmpSoundOff: e.soundOff,
                        scopeBtnVisible: !1
                    }
                }), this.checkScope();
            } catch (t) {
                n.reportAnalytics_Try(t);
            }
        }
    }, {
        key: "checkScope",
        value: function() {
            var t = this;
            s.checkScope("scope.userInfo", function(e) {
                n.setPageData(t.page, {
                    "settingData.scopeBtnVisible": !e
                }), t.btnLock = !1;
            });
        }
    }, {
        key: "userInfoHandler_setting",
        value: function(t) {
            var e = this;
            t && t.detail && "getUserInfo:ok" == t.detail.errMsg ? s.setUserInfo(t.detail, function() {
                n.setPageData(e.page, {
                    "roleInfo.userInfo": s.mainData.role.userInfo,
                    "roleInfo.headId": s.mainData.role.headId
                }), e.checkScope();
            }) : this.checkScope();
        }
    }, {
        key: "hasAnyNotice",
        value: function() {
            return this.page.noticeController.initNoctice(!1).noticeData.noticeList.length > 0 && !s.isNewUser();
        }
    }, {
        key: "onTapSettingView_pushBtn",
        value: function() {
            n.setPageData(this.page, {
                "settingData.tmpForbiddenPush": !this.page.data.settingData.tmpForbiddenPush
            });
        }
    }, {
        key: "onTapSettingView_soundBtn",
        value: function() {
            n.setPageData(this.page, {
                "settingData.tmpSoundOff": !this.page.data.settingData.tmpSoundOff
            }), this.callback_soundSwitch && this.callback_soundSwitch();
        }
    }, {
        key: "onTapNoticeInSettingView",
        value: function() {
            this.onTapSettingViewCloseBtn(), this.page.noticeController.onShowAbs();
        }
    }, {
        key: "onTapSettingViewCloseBtn",
        value: function() {
            var t = this, e = s.mainData.role.settingsInfo || {};
            this.page.data.settingData.tmpForbiddenPush == e.forbiddenPush && this.page.data.settingData.tmpSoundOff == e.soundOff || a.setting(this.page.data.settingData.tmpForbiddenPush, this.page.data.settingData.tmpSoundOff, function() {
                s.mainData.role.settingsInfo || (s.mainData.role.settingsInfo = {}), s.mainData.role.settingsInfo.soundOff = t.page.data.settingData.tmpSoundOff, 
                s.mainData.role.settingsInfo.forbiddenPush = t.page.data.settingData.tmpForbiddenPush, 
                i.setInitData(s.mainData);
            }), n.setPageData(this.page, {
                "settingData.settingOpacity": 0
            }), setTimeout(function() {
                n.setPageData(t.page, {
                    "settingData.settingViewVisible": !1
                });
            }, 300);
        }
    } ]), o;
}();

module.exports = o;