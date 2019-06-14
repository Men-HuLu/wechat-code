require("../../../../util/util.js");

Component({
    properties: {},
    data: {
        question: ""
    },
    methods: {
        in: function(t) {
            var i = wx.createAnimation();
            i.opacity(1).step({
                timingFunction: "ease-in",
                duration: 500
            });
            this.setData({
                question: t,
                questionViewAni: i.export()
            });
        },
        out: function() {
            var t = wx.createAnimation();
            t.opacity(0).step({
                duration: 300
            }), this.setData({
                questionViewAni: t.export()
            });
        }
    }
});