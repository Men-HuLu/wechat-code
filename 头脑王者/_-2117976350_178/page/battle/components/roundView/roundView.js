Component({
    properties: {},
    data: {
        roundAni: void 0,
        roundText: ""
    },
    methods: {
        inOut: function(t) {
            var i = wx.createAnimation();
            i.opacity(1).scale(1).step({
                timingFunction: "cubic-bezier(.1,1.07,.75,1.57)",
                duration: 500
            }).opacity(0).scale(0).step({
                duration: 200,
                delay: 800
            }), this.setData({
                roundAni: i.export(),
                roundText: t
            });
        }
    }
});