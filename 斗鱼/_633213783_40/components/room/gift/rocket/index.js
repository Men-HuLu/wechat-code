var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var i = arguments[a];
        for (var e in i) Object.prototype.hasOwnProperty.call(i, e) && (t[e] = i[e]);
    }
    return t;
};

Component({
    properties: {},
    data: {
        giftNum: 0,
        rocketBigPic: "",
        animationRocketData: {},
        animationTimes: 0,
        animationSwitch: !0
    },
    methods: {
        startRocket: function(t) {
            this.setData({
                giftNum: t.num,
                rocketBigPic: t.pic
            }), this.startRocketAnimation();
        },
        startRocketAnimation: function() {
            var t = this;
            if (t.data.animationSwitch) {
                var a = wx.createAnimation({
                    timingFunction: "ease-in-out"
                });
                a.translateY(260).step({
                    delay: 900
                }).opacity(1).translateY(-110).step({
                    duration: 600
                }).translateY(-800).step({
                    duration: 400,
                    delay: 1e3
                }).opacity(0).step({
                    delay: 1e3
                });
                var i = a.export();
                i.t = +new Date(), t.setData({
                    animationSwitch: !1,
                    animationRocket: a,
                    animationRocketData: i,
                    animationTimes: t.data.animationTimes + 1
                }), t.rocketInterval = setInterval(t.rocketIntervalFunc.bind(t), 4e3);
            }
        },
        rocketIntervalFunc: function() {
            var a = this;
            a.data.animationTimes >= a.data.giftNum ? (clearInterval(a.rocketInterval), a.setData({
                animationSwitch: !0
            }), a.triggerEvent("endAnima")) : (a.data.animationRocket.translateY(260).step({
                delay: 900
            }).opacity(1).translateY(-110).step({
                duration: 600
            }).translateY(-800).step({
                duration: 400,
                delay: 1e3
            }).opacity(0).step({
                delay: 1e3
            }), a.setData({
                animationRocketData: t({}, a.data.animationRocket.export(), {
                    t: +new Date()
                }),
                animationTimes: a.data.animationTimes + 1
            }));
        }
    }
});