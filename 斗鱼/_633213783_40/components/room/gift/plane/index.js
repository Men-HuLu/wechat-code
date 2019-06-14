var a = Object.assign || function(a) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && (a[e] = n[e]);
    }
    return a;
};

Component({
    properties: {},
    data: {
        giftNum: 0,
        planeBigPic: "https://live.dz11.com/storage/webpic_resources/upload/dygift/1702/e4fe8254032755ef561c4faee4081609.gif",
        animationPlaneData: {},
        animationTimes: 0,
        animationSwitch: !0
    },
    methods: {
        startPlane: function(a) {
            this.setData({
                giftNum: a.num,
                planeBigPic: a.pic
            }), this.startPlaneAnimation();
        },
        startPlaneAnimation: function() {
            var a = this;
            if (a.data.animationSwitch) {
                var t = wx.createAnimation({
                    timingFunction: "ease-in-out"
                });
                t.translateX(160).translateY(-160).step({
                    delay: 900
                }).opacity(1).translateX(-100).translateY(120).step({
                    duration: 600
                }).translateX(-550).translateY(550).step({
                    duration: 550,
                    delay: 1e3
                }).opacity(0).step({
                    delay: 1e3
                });
                var n = t.export();
                n.t = +new Date(), a.setData({
                    animationSwitch: !1,
                    animationPlane: t,
                    animationPlaneData: n,
                    animationTimes: a.data.animationTimes + 1
                }), a.planeInterval = setInterval(a.planeIntervalFunc.bind(a), 4e3);
            }
        },
        planeIntervalFunc: function() {
            var t = this;
            t.data.animationTimes >= t.data.giftNum ? (clearInterval(t.planeInterval), t.setData({
                animationSwitch: !0
            }), this.triggerEvent("endAnima", {})) : (t.data.animationPlane.translateX(160).translateY(-160).step({
                delay: 900
            }).opacity(1).translateX(-100).translateY(120).step({
                duration: 600
            }).translateX(-550).translateY(550).step({
                duration: 550,
                delay: 1e3
            }).opacity(0).step({
                delay: 1e3
            }), t.setData({
                animationPlaneData: a({}, t.data.animationPlane.export(), {
                    t: +new Date()
                }),
                animationTimes: t.data.animationTimes + 1
            }));
        }
    }
});