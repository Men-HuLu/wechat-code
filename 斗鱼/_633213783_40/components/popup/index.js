function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
}, o = (t(require("../../common/navigator")), t(require("../../common/storage"))), a = t(require("../../common/util")), n = t(require("../../common/httpClient")), i = t(require("../../common/recommend")), u = t(require("../../common/point")), p = t(require("../../config/index")), r = getApp();

Component({
    data: {
        zyId: 0,
        imgUrl: "",
        jumpType: 0,
        jumpContent: ""
    },
    properties: {
        lyList: {
            type: Array,
            value: []
        },
        isPopup: {
            type: Boolean,
            value: !1
        },
        from: {
            type: String,
            value: ""
        }
    },
    methods: {
        closePopup: function() {
            this.setData({
                isPopup: !1
            });
        },
        clickClosePopup: function(t) {
            var e = t.currentTarget.dataset.from, o = this.data.jumpType, a = this.data.jumpContent;
            "home" === e && (i.default.gotoRecommend(o, a), this.setPoint(p.default.Point.CLICK_HOME_POPUP)), 
            this.closePopup();
        },
        formSubmit: function(t) {
            var e = this;
            setTimeout(function() {
                e.reportFormId(t.detail.formId, t.currentTarget.dataset.id || 0);
            }, 200);
        },
        reportFormId: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            return console.log("reportFormId: " + t), n.default.request({
                url: p.default.API.REPORT_FORMID,
                method: "POST",
                data: {
                    form_id: t,
                    token: r.globalData.userInfo.token || "",
                    act_id: e
                }
            });
        },
        setPoint: function(t) {
            u.default.postPoint(t, p.default.Point.PAGE_HOME, 0, {
                zy_id: this.data.zyId,
                ju_type: this.data.jumpType,
                ju_path: this.data.jumpContent
            });
        },
        popupStorage: function(t) {
            var e = this, n = new Date();
            o.default.get(t).then(function(i) {
                a.default.getDateTimeDiff(i.data).Days >= 1 ? (e.setData({
                    isPopup: !0
                }), o.default.set(t, +n)) : e.setData({
                    isPopup: !1
                });
            }, function(a) {
                o.default.set(t, +n), e.setData({
                    isPopup: !0
                });
            });
        },
        showAnchorPopup: function(t, a) {
            var n = this;
            i.default.getPopupRecommend(1, "", function(i) {
                if (i) n.setData(e({
                    isPopup: !!i.imgUrl
                }, i)); else {
                    var u = Math.floor(4 * Math.random()), r = n.data.lyList[1] ? n.data.lyList[1].list[u].rid : 0;
                    r && n.setData({
                        jumpType: 1,
                        jumpContent: "room?roomId=" + r + "&is_vertical=1",
                        isPopup: !0
                    });
                }
                n.data.isPopup && (o.default.set(t, +a), n.setPoint(p.default.Point.SHOW_HOME_POPUP));
            });
        },
        popupAnchor: function(t) {
            var e = this, n = new Date();
            o.default.get("guide_popup").then(function(i) {
                o.default.get(t).then(function(o) {
                    a.default.getDateTimeDiff(o.data).Days >= 1 ? e.showAnchorPopup(t, n) : e.setData({
                        isPopup: !1
                    });
                }, function(o) {
                    e.showAnchorPopup(t, n);
                });
            }, function(t) {
                e.setData({
                    isPopup: !1
                });
            });
        }
    },
    ready: function() {
        var t = "https://sta-op.douyucdn.cn/dyfelocal/act/5b4867e38d592a7dea394d93/" + (Math.floor(3 * Math.random()) + 1) + ".png?timestamp=1537361677";
        this.setData({
            imgUrl: "home" === this.data.from ? t : "https://sta-op.douyucdn.cn/dyfelocal/act/5b4867e38d592a7dea394d93/4.png"
        }), "home" === this.data.from ? this.popupAnchor("anchor_popup_time") : this.popupStorage("game_popup_time");
    }
});