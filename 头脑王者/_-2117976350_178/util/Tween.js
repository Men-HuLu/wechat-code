function t(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var i = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var s = e[i];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(t, s.key, s);
        }
    }
    return function(e, i, s) {
        return i && t(e.prototype, i), s && t(e, s), e;
    };
}(), s = [], r = !1, n = 0, a = [], u = function() {
    function u(t, i, s, r) {
        e(this, u), this._id = i, this._target = t, this._curQueueProps = {}, this._initQueueProps = {}, 
        this._steps = [], this.paused = !1, this.loop = !1, this.pluginData = null, this.duration = 0, 
        this._prevPos = -1, this.position = null, this._prevPosition = 0, this.passive = !1, 
        this._page = s, this._prefix = r, u._register(this, !0);
    }
    return i(u, [ {
        key: "_tick",
        value: function(t) {
            this.paused || this.setPosition(this._prevPosition + t);
        }
    }, {
        key: "setPosition",
        value: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
            t < 0 && (t = 0);
            var i = t, s = !1;
            if (i >= this.duration) if (this.loop) {
                var r = i % this.duration;
                i = i > 0 && 0 === r ? this.duration : r;
            } else i = this.duration, s = !0;
            if (i == this._prevPos) return s;
            s && this.setPaused(!0);
            var n = this._prevPos;
            if (this.position = this._prevPos = i, this._prevPosition = t, this._id && this._steps.length > 0) {
                for (var a = this._steps.length, u = -1, o = 0; o < a; o++) {
                    var h = this._steps[o];
                    if ("step" == h.type) {
                        if (u = o, h.t <= i && h.t + h.d >= i) break;
                    } else if ("update" == h.type && (u = o, h.t <= i && !h.end)) {
                        h.t + h.d < i && (h.end = !0);
                        break;
                    }
                }
                for (var p = 0; p < a; p++) if ("action" == this._steps[p].type) 0 != e && (this._useTicks ? this._runAction(this._steps[p], i, i) : 1 == e && i < n ? (n != this.duration && this._runAction(this._steps[p], n, this.duration), 
                this._runAction(this._steps[p], 0, i, !0)) : this._runAction(this._steps[p], n, i)); else if ("step" == this._steps[p].type) {
                    if (u == p) {
                        var l = this._steps[u];
                        this._updateTargetProps(l, Math.min((i - l.t) / l.d, 1));
                    }
                } else if ("update" == this._steps[p].type && u == p) {
                    var v = this._steps[u];
                    if (v.update && "function" == typeof v.update) {
                        var d = Math.min((i - v.t) / v.d, 1);
                        v.update(d);
                    }
                }
            }
            return s;
        }
    }, {
        key: "_runAction",
        value: function(t, e, i) {
            var s = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], r = e, n = i;
            e > i && (r = i, n = e);
            var a = t.t;
            (a == n || a > r && a < n || s && a == e) && t.f.apply(t.o, t.p);
        }
    }, {
        key: "_addAction",
        value: function(t) {
            return t.t = this.duration, t.type = "action", this._steps.push(t), this;
        }
    }, {
        key: "_updateTargetProps",
        value: function(t, e) {
            var i = void 0, s = void 0, r = void 0, n = void 0, a = void 0;
            if (t || 1 != e) {
                if (this.passive = !!t.v, this.passive) return;
                t.e && (e = t.e(e, 0, 1, 1)), i = t.p0, s = t.p1;
            } else this.passive = !1, i = s = this._curQueueProps;
            for (var o in this._initQueueProps) if (null == (n = i[o]) && (i[o] = n = this._initQueueProps[o]), 
            null == (a = s[o]) && (s[o] = a = n), r = n == a || 0 == e || 1 == e || "number" != typeof n ? 1 == e ? a : n : n + (a - n) * e, 
            this._page) {
                var h = this._prefix + "." + o;
                u._AddDataSet(this._page, {
                    key: h,
                    value: r
                });
            } else this._target && (this._target[o] = r);
        }
    }, {
        key: "_appendQueueProps",
        value: function(t) {
            if (this._target) for (var e in t) if (void 0 === this._initQueueProps[e]) {
                var i = this._target[e];
                this._initQueueProps[e] = void 0 === i ? null : i;
            }
            for (var s in t) this._curQueueProps[s] = t[s];
            return this._curQueueProps;
        }
    }, {
        key: "_set",
        value: function(t, e) {
            for (var i in t) if (this._page) {
                var s = this._prefix + "." + i;
                u._AddDataSet(this._page, {
                    key: s,
                    value: t[i]
                });
            } else e && (e[i] = t[i]);
        }
    }, {
        key: "_addStep",
        value: function(t) {
            return t.d > 0 && (t.type = "step", this._steps.push(t), t.t = this.duration, this.duration += t.d), 
            this;
        }
    }, {
        key: "_addUpdate",
        value: function(t) {
            return t.d > 0 && (t.type = "update", this._steps.push(t), t.t = this.duration, 
            this.duration += t.d), this;
        }
    }, {
        key: "_cloneProps",
        value: function(t) {
            var e = {};
            for (var i in t) e[i] = t[i];
            return e;
        }
    }, {
        key: "set",
        value: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            return this._appendQueueProps(t), this._addAction({
                f: this._set,
                o: this,
                p: [ t, e || this._target ]
            });
        }
    }, {
        key: "setPaused",
        value: function(t) {
            return this.paused == t ? this : (this.paused = t, u._register(this, !t), this);
        }
    }, {
        key: "to",
        value: function(t, e) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
            (isNaN(e) || !e || e < 0) && (e = 0);
            var s = {
                d: e || 0,
                p0: this._cloneProps(this._curQueueProps),
                e: i,
                p1: this._cloneProps(this._appendQueueProps(t))
            };
            return this._addStep(s), this.set(t);
        }
    }, {
        key: "update",
        value: function(t, e) {
            (isNaN(e) || e < 0) && (e = 0);
            var i = {
                d: e || 0,
                update: t
            };
            return this._addUpdate(i);
        }
    }, {
        key: "wait",
        value: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            if (null == t || t <= 0) return this;
            var i = this._cloneProps(this._curQueueProps);
            return this._addStep({
                d: t,
                p0: i,
                p1: i,
                v: e
            });
        }
    }, {
        key: "call",
        value: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
            return this._addAction({
                f: t,
                p: i || [],
                o: e || this._target
            });
        }
    }, {
        key: "pause",
        value: function() {
            this.setPaused(!0);
        }
    }, {
        key: "play",
        value: function(t) {
            this.setPaused(!1);
        }
    } ], [ {
        key: "get",
        value: function(t, e, i, s, r) {
            return r && u.removeTweens(e), new u(t, e, i, s);
        }
    }, {
        key: "fastGet",
        value: function(t, e) {
            return e && u.removeTweens(t), new u(null, t, null, null);
        }
    }, {
        key: "pageGet",
        value: function(t, e, i, s) {
            return s && u.removeTweens(t), new u(null, t, e, i);
        }
    }, {
        key: "removeTweens",
        value: function(t) {
            for (var e = s, i = e.length; i--; ) e[i] && e[i]._id == t && (e[i].paused = !0, 
            e.splice(i, 1));
        }
    }, {
        key: "_register",
        value: function(t, e) {
            t._id;
            var i = s;
            if (e) t ? i.push(t) : console.error("tweens.push 还真有tween为空的情况出现"), r || (n = Date.now(), 
            setInterval(u._tick, 1e3 / 60), r = !0); else for (var a = i.length; a--; ) if (i[a] == t) return void i.splice(a, 1);
        }
    }, {
        key: "_tick",
        value: function() {
            var t = Date.now(), e = t - n;
            n = t;
            for (var i = s, r = i.length; r--; ) {
                var u = i[r];
                if (u) {
                    if (u.paused) continue;
                    u._tick(e);
                } else console.error("还真有tween为空的情况出现");
            }
            var o = a, h = !0, p = !1, l = void 0;
            try {
                for (var v, d = o[Symbol.iterator](); !(h = (v = d.next()).done); h = !0) {
                    var f = v.value;
                    f && f.page && f.page.setData(f.value);
                }
            } catch (t) {
                p = !0, l = t;
            } finally {
                try {
                    !h && d.return && d.return();
                } finally {
                    if (p) throw l;
                }
            }
            return a.splice(0, a.length), !1;
        }
    }, {
        key: "_AddDataSet",
        value: function(e, i) {
            var s = !1, r = !0, n = !1, u = void 0;
            try {
                for (var o, h = a[Symbol.iterator](); !(r = (o = h.next()).done); r = !0) {
                    var p = o.value;
                    if (p && p.page == e) {
                        p.value[i.key] = i.value, s = !0;
                        break;
                    }
                }
            } catch (t) {
                n = !0, u = t;
            } finally {
                try {
                    !r && h.return && h.return();
                } finally {
                    if (n) throw u;
                }
            }
            if (!s) {
                var l = {
                    page: e,
                    value: t({}, i.key, i.value)
                };
                a.push(l);
            }
        }
    } ]), u;
}();

module.exports = u;