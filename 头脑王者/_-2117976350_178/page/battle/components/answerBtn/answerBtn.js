var t = require("../../../../util/util.js");

Component({
    properties: {
        data: {
            type: Object,
            value: null,
            observer: function(t, e) {}
        }
    },
    data: {
        className: "",
        answer: "test",
        textScale: 1,
        index: 0,
        ani: "",
        leftRight: !1,
        leftWrong: !1,
        rightRight: !1,
        rightWrong: !1
    },
    methods: {
        setSelected: function() {
            this.setData({
                className: "selected"
            });
        },
        setLeftResult: function(e) {
            e ? t.setPageData(this, {
                leftRight: !0
            }) : t.setPageData(this, {
                leftWrong: !0
            });
        },
        setRightResult: function(e) {
            e ? t.setPageData(this, {
                rightRight: !0
            }) : t.setPageData(this, {
                rightWrong: !0
            });
        },
        in: function(t) {
            var e = wx.createAnimation();
            e.opacity(1).scale(1).step({
                timingFunction: "cubic-bezier(.1,1.07,.75,1.57)",
                duration: 500
            }), this.setData({
                index: t.index,
                answer: t.answer,
                textScale: t.textScale,
                className: "",
                leftRight: !1,
                leftWrong: !1,
                rightRight: !1,
                rightWrong: !1,
                ani: e.export()
            });
        },
        out: function() {
            var t = wx.createAnimation();
            t.scale(0).step({
                timingFunction: "ease-in",
                duration: 300
            }), this.setData({
                ani: t.export()
            });
        },
        onTapChooseBtn: function() {
            this.triggerEvent("selected", this.data.index);
        }
    }
});