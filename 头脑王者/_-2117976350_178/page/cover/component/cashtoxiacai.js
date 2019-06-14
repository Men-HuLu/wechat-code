var t = require("../../../const/consts.js"), e = require("../../../const/notifyConsts.js"), n = require("../../../util/util.js"), i = require("../../../net/connectNotify.js"), o = require("../../../net/messageNet.js");

Component({
    properties: {
        visible: {
            type: Boolean,
            value: !0,
            observer: function(t, e) {}
        }
    },
    data: {
        status: 1,
        context: "暂无比赛",
        contextColor: "#06e1ff"
    },
    created: function() {},
    attached: function() {
        var t = getApp();
        t.eventDispatcher.addEventListener("onPageShow", this.onPageShow, this), t.eventDispatcher.addEventListener("onPageHide", this.onPageHide, this), 
        i.register(e.ActionGameConf, this.onActionGameConf, this);
    },
    ready: function() {},
    moved: function() {},
    detached: function() {
        var t = getApp();
        t.eventDispatcher.removeEventListener("onPageShow", this.onPageShow, this), t.eventDispatcher.removeEventListener("onPageHide", this.onPageHide, this), 
        i.remove(e.ActionGameConf, this.onActionGameConf, this);
    },
    methods: {
        onPageShow: function(t) {
            "cover" == t.data && (this.continue = !0, this.update());
        },
        onPageHide: function(t) {
            "cover" == t.data && (this.continue = !1, clearTimeout(this.timeout));
        },
        onActionGameConf: function(t) {
            this.update();
        },
        setContext: function(t, e) {
            if (this.data.status != t || this.data.context != e) {
                var n = {};
                n.status = t, n.context = e, n.contextColor = 2 == t ? "#ffe500" : "#ffffff", this.setData(n);
            }
        },
        update: function() {
            var e = this;
            clearTimeout(this.timeout);
            var i = getApp(), o = i.mainData.role.xiaCaiTime;
            if (o) if (o.length <= 1) this.setContext(1, "暂无比赛"); else if (i.checkFuncOpen(t.funcType.cash)) {
                for (var s = 60 * o[0], a = n.getServerTimeBaseSecond(), r = 86400 * Math.floor(a / 86400) - 3600 * n.getServerTimezone(), c = !1, h = o.length - 1; h >= 1; h--) {
                    var f = r + 3600 * o[h];
                    if (a >= f) {
                        c = !0;
                        var u = h == o.length - 1;
                        if (a < f + s) {
                            this.setContext(2, "比赛直播中...");
                            break;
                        }
                        if (a >= f + s) {
                            if (u) {
                                var v = n.formatTime(r + 86400 + 3600 * o[1] - a);
                                this.setContext(0, "下一场 " + v);
                            } else {
                                var m = r + 3600 * o[h + 1], d = n.formatTime(m - a);
                                this.setContext(0, "下一场 " + d);
                            }
                            break;
                        }
                    }
                }
                if (!c) {
                    var p = r + 3600 * o[1], g = n.formatTime(p - a);
                    this.setContext(0, "下一场 " + g);
                }
                this.continue && (this.timeout = setTimeout(function() {
                    e.update();
                }, 1e3));
            } else this.setContext(1, "暂无比赛"); else this.setContext(1, "暂无比赛");
        },
        onTapEntry: function() {
            o.markStatsEx({
                event: t.event_point.click_link,
                keyword1: "虾猜"
            }), n.log("跳转打点 虾猜");
        }
    }
});