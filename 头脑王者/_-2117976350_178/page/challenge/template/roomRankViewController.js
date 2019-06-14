function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
    };
}(), n = (require("./../../../util/util.js"), require("./../../../const/consts.js"), 
require("./../../../util/Tween.js")), i = (require("./../../../util/ChallengeRoomDataManager.js"), 
getApp(), function() {
    function i(e, n) {
        t(this, i), this.page = e, this.key = n, this.resSet();
    }
    return e(i, [ {
        key: "show",
        value: function() {
            var t = this, e = n.fastGet("roomRankViewTween");
            e.call(function() {
                var e = wx.createAnimation();
                e.top(0).step({
                    timingFunction: "ease",
                    duration: 600
                });
                var n = wx.createAnimation();
                n.bottom(0).step({
                    timingFunction: "ease",
                    duration: 600
                });
                var i = {};
                i[t.key + ".topAni"] = e.export(), i[t.key + ".bottomAni"] = n.export(), t.page.setData(i);
            }), e.wait(600), e.call(function() {
                var e = wx.createAnimation({
                    timingFunction: "ease-out",
                    duration: 200
                });
                e.scale(1).step();
                var n = {};
                n[t.key + ".headAni"] = e.export(), t.page.setData(n);
            }), e.wait(200), e.call(function() {
                var e = wx.createAnimation();
                e.top(0).step({
                    timingFunction: "ease",
                    duration: 600
                });
                var n = {};
                n[t.key + ".scollAni"] = e.export(), t.page.setData(n);
            });
        }
    }, {
        key: "resSet",
        value: function() {
            var t = wx.createAnimation();
            t.top(-1e3).step({
                timingFunction: "step-start",
                duration: 0
            });
            var e = wx.createAnimation();
            e.bottom(-1e3).step({
                timingFunction: "step-start",
                duration: 0
            });
            var n = wx.createAnimation();
            n.top(-1e3).step({
                timingFunction: "step-start",
                duration: 0
            });
            var i = wx.createAnimation();
            i.scale(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var a = {};
            a[this.key + ".topAni"] = t.export(), a[this.key + ".bottomAni"] = e.export(), a[this.key + ".scollAni"] = n.export(), 
            a[this.key + ".headAni"] = i.export(), this.page.setData(a);
        }
    } ]), i;
}());

module.exports = i;