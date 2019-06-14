function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

t(require("../../../common/httpClient"));

var n = t(require("../../../common/recommend.js")), e = t(require("../../../common/point")), o = t(require("../../../config/index")), i = getApp();

Component({
    data: {
        zyId: 0,
        imgUrl: "",
        jumpType: 1,
        jumpContent: "",
        ifBanner: !1
    },
    methods: {
        closeBanner: function() {
            this.setData({
                ifBanner: !1
            });
        },
        gotoBanner: function() {
            var t = this.data.jumpType, e = this.data.jumpContent;
            n.default.gotoRecommend(t, e), this.setPoint(o.default.Point.CLICK_ROOM_STICKER);
        },
        getRoomBanner: function() {
            var t = this;
            n.default.getPopupRecommend(3, "", function(e) {
                e ? t.showBanner(e) : n.default.getActivityRecommend(1, function(n) {
                    t.showBanner(n);
                });
            });
        },
        showBanner: function(t) {
            t && (this.setData(Object.assign(t, {
                ifBanner: !!t.imgUrl
            })), this.data.ifBanner && this.setPoint(o.default.Point.SHOW_ROOM_STICKER));
        },
        setPoint: function(t) {
            e.default.postPoint(t, o.default.Point.PAGE_STUDIO_L, i.getUrlParam("roomId"), {
                zy_id: this.data.zyId,
                ju_type: this.data.jumpType,
                ju_path: this.data.jumpContent
            });
        }
    },
    ready: function() {
        this.getRoomBanner();
    }
});