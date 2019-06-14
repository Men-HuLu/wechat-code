function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var r = t[a];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, a, r) {
        return a && e(t.prototype, a), r && e(t, r), t;
    };
}(), a = require("./util.js"), r = (require("../const/consts.js"), require("./../net/specialNet.js")), i = require("./../data/SpecialData.js"), n = function() {
    function n() {
        e(this, n);
    }
    return t(n, [ {
        key: "processActivities",
        value: function(e) {
            if (e.activities && 0 != e.activities.length) {
                var t = this.getActivities(), r = [], i = !0, n = !1, o = void 0;
                try {
                    for (var l, c = e.activities[Symbol.iterator](); !(i = (l = c.next()).done); i = !0) {
                        var s = l.value, u = !0, v = !0, f = !1, y = void 0;
                        try {
                            for (var d, h = t[Symbol.iterator](); !(v = (d = h.next()).done); v = !0) {
                                var p = d.value;
                                if (p.aid == s.aid) {
                                    u = !1, a.assign(p, s);
                                    break;
                                }
                            }
                        } catch (e) {
                            f = !0, y = e;
                        } finally {
                            try {
                                !v && h.return && h.return();
                            } finally {
                                if (f) throw y;
                            }
                        }
                        u && r.push(s);
                    }
                } catch (e) {
                    n = !0, o = e;
                } finally {
                    try {
                        !i && c.return && c.return();
                    } finally {
                        if (n) throw o;
                    }
                }
                var b = !0, g = !1, m = void 0;
                try {
                    for (var A, w = r[Symbol.iterator](); !(b = (A = w.next()).done); b = !0) {
                        var D = A.value;
                        console.log("有新活动上线~"), t.push(D);
                    }
                } catch (e) {
                    g = !0, m = e;
                } finally {
                    try {
                        !b && w.return && w.return();
                    } finally {
                        if (g) throw m;
                    }
                }
            }
        }
    }, {
        key: "refresBannerData",
        value: function() {
            var e = getApp(), t = this.getActivity("specialMatch");
            t ? e.mainData.role.bannerInfo && e.mainData.role.bannerInfo.base.aid == t.aid ? e.mainData.role.bannerInfo.base = t : r.activityInfo(t.aid, function(t, r) {
                r ? (e.mainData.role.bannerInfo = r, i.data.base.aid = r.base.aid, console.log("data.player:", r.player), 
                r.player && i.setFreeTicket(i.data.base.aid, r.player.freeTicket), e.eventDispatcher.dispatchEventWith("onRefreshBanner")) : t && a.ShowToast(t.errMsg);
            }) : console.log("当前无有效活动");
        }
    }, {
        key: "getActivity",
        value: function(e) {
            var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], r = !0, i = !1, n = void 0;
            try {
                for (var o, l = this.getActivities()[Symbol.iterator](); !(r = (o = l.next()).done); r = !0) {
                    var c = o.value;
                    if (c.typeName == e) {
                        var s = a.getServerTimeBaseSecond(), u = c.beginAt, v = c.endAt;
                        if (console.log("getActivity curTime", s, "/item:", c), t && s >= u && s < v) return c;
                        if (!t) return c;
                    }
                }
            } catch (e) {
                i = !0, n = e;
            } finally {
                try {
                    !r && l.return && l.return();
                } finally {
                    if (i) throw n;
                }
            }
            return null;
        }
    }, {
        key: "getActivities",
        value: function() {
            var e = getApp(), t = e.mainData.role.activities;
            return t || (e.mainData.role.activities = [], t = e.mainData.role.activities), t;
        }
    }, {
        key: "addActivities",
        value: function(e) {
            var t = this.getActivities(), r = !0, i = !1, n = void 0;
            try {
                for (var o, l = t[Symbol.iterator](); !(r = (o = l.next()).done); r = !0) {
                    var c = o.value;
                    c.type == e.type && c.subType == e.subType ? a.assign(c, e) : t.push(e);
                }
            } catch (e) {
                i = !0, n = e;
            } finally {
                try {
                    !r && l.return && l.return();
                } finally {
                    if (i) throw n;
                }
            }
        }
    } ]), n;
}();

module.exports = new n();