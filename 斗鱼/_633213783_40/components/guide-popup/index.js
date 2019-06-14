var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/storage"));

Component({
    data: {
        isGuide: !1
    },
    methods: {
        closePopup: function() {
            this.setData({
                isGuide: !1
            });
        }
    },
    ready: function() {
        var t = this;
        e.default.get("guide_popup").then(function(e) {
            t.setData({
                isGuide: !1
            });
        }, function(u) {
            e.default.set("guide_popup", !0), t.setData({
                isGuide: !0
            });
        });
    }
});