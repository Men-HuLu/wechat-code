function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
    };
}(), i = [], n = !1, r = 0, s = function() {
    function s(e) {
        t(this, s), this._id = e, this._prevPosition = 0, this._steps = [], s._register(this);
    }
    return e(s, [ {
        key: "_tick",
        value: function(t) {
            var e = this._prevPosition + t;
            if (this._prevPosition = e, this._steps.length > 0) {
                var i = this._steps[0];
                switch (i.type) {
                  case "wait":
                    this._runWait(i, e) && (this._prevPosition = 0, this._steps.splice(0, 1));
                    break;

                  case "call":
                    this._runCall(i, e) && (this._prevPosition = 0, this._steps.splice(0, 1));
                    break;

                  case "update":
                    this._runUpdate(i, e) && (this._prevPosition = 0, this._steps.splice(0, 1));
                }
                0 == this._steps.length && s.removeTweens(this._id);
            }
        }
    }, {
        key: "_runCall",
        value: function(t, e) {
            return t.d <= e && (t.f.apply(t.o, t.p), !0);
        }
    }, {
        key: "_runUpdate",
        value: function(t, e) {
            if (t.d > e) {
                var i = Math.min((e - t.t) / t.d, 1);
                return t.f.apply(action.o, [ i ]), !1;
            }
            return t.f.apply(action.o, [ 1 ]), !0;
        }
    }, {
        key: "_runWait",
        value: function(t, e) {
            return t.d <= e;
        }
    }, {
        key: "_addStep",
        value: function(t) {
            this._steps.push(t);
        }
    }, {
        key: "call",
        value: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
            return this._addStep({
                f: t,
                p: i || [],
                o: e || this._target,
                d: 0,
                type: "call"
            });
        }
    }, {
        key: "wait",
        value: function(t) {
            return this._addStep({
                d: t,
                type: "wait"
            });
        }
    }, {
        key: "update",
        value: function(t, e) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
            return this._addStep({
                f: t,
                o: i || this._target,
                d: e,
                type: "update"
            });
        }
    } ], [ {
        key: "get",
        value: function(t, e) {
            return e && s.removeTweens(t), new s(t);
        }
    }, {
        key: "removeTweens",
        value: function(t) {
            for (var e = i, n = e.length; n--; ) e[n]._id == t && e.splice(n, 1);
        }
    }, {
        key: "_register",
        value: function(t) {
            t._id;
            i.push(t), n || (r = Date.now(), setTimeout(s._tick, 1e3 / 30), n = !0);
        }
    }, {
        key: "_tick",
        value: function() {
            var t = Date.now(), e = t - r;
            r = t;
            for (var n = i, a = n.length; a--; ) n[a]._tick(e);
            return setTimeout(s._tick, 1e3 / 30), !1;
        }
    } ]), s;
}();

module.exports = s;