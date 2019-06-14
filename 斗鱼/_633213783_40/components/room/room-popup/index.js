function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../common/httpClient")), o = (t(require("../../../common/navigator")), 
t(require("../../../common/recommend"))), r = t(require("../../../common/point")), a = t(require("../../../config/index")), n = getApp();

Component({
    data: {
        zyId: 0,
        title: "",
        cancelText: "",
        confirmText: "",
        jumpType: 0,
        jumpContent: "",
        isPopup: !1
    },
    properties: {
        liveData: {
            type: Array,
            value: []
        },
        recommend: {
            type: Object,
            value: null
        }
    },
    methods: {
        closePopup: function() {
            this.triggerEvent("close"), wx.switchTab({
                url: "home"
            });
        },
        formSubmit: function(t) {
            var e = this;
            setTimeout(function() {
                var r = e.data.jumpType, n = e.data.jumpContent;
                e.reportFormId(t.detail.formId, t.currentTarget.dataset.id || 0), "goRecommend" == t.currentTarget.dataset.fn ? (o.default.gotoRecommend(r, n), 
                e.setPoint(a.default.Point.CLICK_EXIT_POPUP), e.triggerEvent("close")) : e.closePopup();
            }, 200);
        },
        reportFormId: function(t) {
            var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            return console.log("reportFormId: " + t), e.default.request({
                url: a.default.API.REPORT_FORMID,
                method: "POST",
                data: {
                    form_id: t,
                    token: n.globalData.userInfo.token || "",
                    act_id: o
                }
            });
        },
        setPoint: function(t) {
            r.default.postPoint(t, a.default.Point.PAGE_STUDIO_L, n.getUrlParam("roomId"), {
                zy_id: this.data.zyId,
                ju_type: this.data.jumpType,
                ju_path: this.data.jumpContent
            });
        },
        getBeautyRoom: function() {
            var t = this.data.liveData.filter(function(t) {
                return 1 == t.type && 1 == t.isYz;
            }), e = t.length, o = Math.floor(Math.random() * e), r = t[o].isVertical;
            return "room?roomId=" + t[o].rid + "&is_vertical=" + r;
        }
    },
    ready: function() {
        var t = this, e = this.data.recommend;
        e ? this.setData(e) : this.setData({
            title: "附近的小姐姐向你发起聊天请求~",
            cancelText: "残忍拒绝",
            confirmText: "去撩她！",
            jumpType: 1,
            jumpContent: this.getBeautyRoom()
        }), setTimeout(function() {
            t.setData({
                isPopup: !0
            });
        }, 200), this.setPoint(a.default.Point.SHOW_EXIT_POPUP);
    }
});