function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

var i, o = t(require("../config/index")), a = t(require("../common/util")), n = t(require("../common/point")), r = t(require("../common/navigator")), u = t(require("../common/httpClient")), s = getApp();

Page((i = {
    data: {
        isIpx: !1,
        isLoading: !0,
        isError: !1,
        activityList: [],
        showTopNav: !0,
        page: 1
    },
    gototreasureBox: function() {
        r.default.disDoubleNavigate("treasureBox");
    },
    init: function() {
        var t = this, e = {
            page: 1
        };
        this.getAcitvityList().then(function(i) {
            0 === i.code && i.data ? (i.data.forEach(function(t) {
                return t.title = a.default.htmlDecode(t.title), t.show_btime = a.default.formatterChineseDate(1e3 * t.show_btime), 
                t;
            }), e.activityList = i.data) : e.isError = !0, e.isLoading = !1, t.pulldownFinish(), 
            t.setData(e);
        }, function(e) {
            t.setData({
                isLoading: !1,
                isError: !0
            });
        }).catch(function(e) {
            t.setData({
                isLoading: !1,
                isError: !0
            });
        }), n.default.postPoint(o.default.Point.INIT_PAGE_ACT, o.default.Point.PAGE_ACT);
    },
    reload: function() {
        this.setData({
            isLoading: !0,
            isError: !1
        }), this.init();
    },
    getAcitvityList: function() {
        return u.default.requestStorageFirst({
            url: o.default.API.ACTIVITY_LIST
        });
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.init();
    },
    pulldownFinish: function() {
        wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
    },
    onLoad: function(t) {
        var e = a.default.scanCodeParse(t);
        e && (t = e), t.shareUrl && (0 === t.shareUrl.toUpperCase().indexOf("HTTP") ? r.default.disDoubleNavigate("web?url=" + t.shareUrl) : r.default.disDoubleNavigate("" + t.shareUrl)), 
        this.init(), n.default.postPoint(o.default.Point.INIT_PAGE_HOME, o.default.Point.PAGE_HOME), 
        this.isIpx = s.globalData.isIphoneX;
    },
    formSubmit: function(t) {
        var e = this, i = t.currentTarget.dataset.jumpurl, a = t.currentTarget.dataset.jumptype, u = t.currentTarget.dataset.title;
        1 === a ? r.default.disDoubleNavigate(i) : r.default.disDoubleNavigate("web?url=" + i + "&title=" + u), 
        setTimeout(function() {
            console.log("formSubmit: " + t), e.reportFormId(t.detail.formId, t.currentTarget.dataset.id);
        }), n.default.postPoint(o.default.Point.CLICK_ACT_TAB, o.default.Point.PAGE_ACT);
    },
    reportFormId: function(t, e) {
        return console.log("reportFormId: " + t), u.default.request({
            url: o.default.API.REPORT_FORMID,
            method: "POST",
            data: {
                form_id: t,
                token: s.globalData.userInfo.token || "",
                act_id: e
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
}, e(i, "onPullDownRefresh", function() {
    wx.showNavigationBarLoading(), this.init();
}), e(i, "onReachBottom", function() {}), e(i, "onShareAppMessage", function() {
    return {
        title: "斗鱼直播",
        path: "/pages/activity"
    };
}), e(i, "onPageScroll", function() {}), e(i, "onTabItemTap", function() {}), i));