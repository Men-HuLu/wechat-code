function e() {
    this._events && Object.prototype.hasOwnProperty.call(this, "_events") || (this._events = m(null), 
    this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
}

function t(t) {
    return void 0 === t._maxListeners ? e.defaultMaxListeners : t._maxListeners;
}

function n(e, t, n) {
    if (t) e.call(n); else for (var r = e.length, i = p(e, r), s = 0; s < r; ++s) i[s].call(n);
}

function r(e, t, n, r) {
    if (t) e.call(n, r); else for (var i = e.length, s = p(e, i), o = 0; o < i; ++o) s[o].call(n, r);
}

function i(e, t, n, r, i) {
    if (t) e.call(n, r, i); else for (var s = e.length, o = p(e, s), u = 0; u < s; ++u) o[u].call(n, r, i);
}

function s(e, t, n, r, i, s) {
    if (t) e.call(n, r, i, s); else for (var o = e.length, u = p(e, o), l = 0; l < o; ++l) u[l].call(n, r, i, s);
}

function o(e, t, n, r) {
    if (t) e.apply(n, r); else for (var i = e.length, s = p(e, i), o = 0; o < i; ++o) s[o].apply(n, r);
}

function u(e, n, r, i) {
    var s, o, u;
    if ("function" != typeof r) throw new TypeError('"listener" argument must be a function');
    if ((o = e._events) ? (o.newListener && (e.emit("newListener", n, r.listener ? r.listener : r), 
    o = e._events), u = o[n]) : (o = e._events = m(null), e._eventsCount = 0), u) {
        if ("function" == typeof u ? u = o[n] = i ? [ r, u ] : [ u, r ] : i ? u.unshift(r) : u.push(r), 
        !u.warned && (s = t(e)) && s > 0 && u.length > s) {
            u.warned = !0;
            var l = new Error("Possible EventEmitter memory leak detected. " + u.length + ' "' + String(n) + '" listeners added. Use emitter.setMaxListeners() to increase limit.');
            l.name = "MaxListenersExceededWarning", l.emitter = e, l.type = n, l.count = u.length, 
            "object" === ("undefined" == typeof console ? "undefined" : y(console)) && console.warn && console.warn("%s: %s", l.name, l.message);
        }
    } else u = o[n] = r, ++e._eventsCount;
    return e;
}

function l() {
    if (!this.fired) switch (this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 
    arguments.length) {
      case 0:
        return this.listener.call(this.target);

      case 1:
        return this.listener.call(this.target, arguments[0]);

      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);

      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1], arguments[2]);

      default:
        for (var e = new Array(arguments.length), t = 0; t < e.length; ++t) e[t] = arguments[t];
        this.listener.apply(this.target, e);
    }
}

function f(e, t, n) {
    var r = {
        fired: !1,
        wrapFn: void 0,
        target: e,
        type: t,
        listener: n
    }, i = g.call(l, r);
    return i.listener = n, r.wrapFn = i, i;
}

function a(e, t, n) {
    var r = e._events;
    if (!r) return [];
    var i = r[t];
    return i ? "function" == typeof i ? n ? [ i.listener || i ] : [ i ] : n ? v(i) : p(i, i.length) : [];
}

function h(e) {
    var t = this._events;
    if (t) {
        var n = t[e];
        if ("function" == typeof n) return 1;
        if (n) return n.length;
    }
    return 0;
}

function c(e, t) {
    for (var n = t, r = n + 1, i = e.length; r < i; n += 1, r += 1) e[n] = e[r];
    e.pop();
}

function p(e, t) {
    for (var n = new Array(t), r = 0; r < t; ++r) n[r] = e[r];
    return n;
}

function v(e) {
    for (var t = new Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
    return t;
}

var y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, m = Object.create || function(e) {
    var t = function() {};
    return t.prototype = e, new t();
}, d = Object.keys || function(e) {
    var t = [];
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
    return n;
}, g = Function.prototype.bind || function(e) {
    var t = this;
    return function() {
        return t.apply(e, arguments);
    };
};

module.exports = e, e.EventEmitter = e, e.prototype._events = void 0, e.prototype._maxListeners = void 0;

var w, L = 10;

try {
    var b = {};
    Object.defineProperty && Object.defineProperty(b, "x", {
        value: 0
    }), w = 0 === b.x;
} catch (e) {
    w = !1;
}

w ? Object.defineProperty(e, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
        return L;
    },
    set: function(e) {
        if ("number" != typeof e || e < 0 || e !== e) throw new TypeError('"defaultMaxListeners" must be a positive number');
        L = e;
    }
}) : e.defaultMaxListeners = L, e.prototype.setMaxListeners = function(e) {
    if ("number" != typeof e || e < 0 || isNaN(e)) throw new TypeError('"n" argument must be a positive number');
    return this._maxListeners = e, this;
}, e.prototype.getMaxListeners = function() {
    return t(this);
}, e.prototype.emit = function(e) {
    var t, u, l, f, a, h, c = "error" === e;
    if (h = this._events) c = c && null == h.error; else if (!c) return !1;
    if (c) {
        if (arguments.length > 1 && (t = arguments[1]), t instanceof Error) throw t;
        var p = new Error('Unhandled "error" event. (' + t + ")");
        throw p.context = t, p;
    }
    if (!(u = h[e])) return !1;
    var v = "function" == typeof u;
    switch (l = arguments.length) {
      case 1:
        n(u, v, this);
        break;

      case 2:
        r(u, v, this, arguments[1]);
        break;

      case 3:
        i(u, v, this, arguments[1], arguments[2]);
        break;

      case 4:
        s(u, v, this, arguments[1], arguments[2], arguments[3]);
        break;

      default:
        for (f = new Array(l - 1), a = 1; a < l; a++) f[a - 1] = arguments[a];
        o(u, v, this, f);
    }
    return !0;
}, e.prototype.addListener = function(e, t) {
    return u(this, e, t, !1);
}, e.prototype.on = e.prototype.addListener, e.prototype.prependListener = function(e, t) {
    return u(this, e, t, !0);
}, e.prototype.once = function(e, t) {
    if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
    return this.on(e, f(this, e, t)), this;
}, e.prototype.prependOnceListener = function(e, t) {
    if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
    return this.prependListener(e, f(this, e, t)), this;
}, e.prototype.removeListener = function(e, t) {
    var n, r, i, s, o;
    if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
    if (!(r = this._events)) return this;
    if (!(n = r[e])) return this;
    if (n === t || n.listener === t) 0 == --this._eventsCount ? this._events = m(null) : (delete r[e], 
    r.removeListener && this.emit("removeListener", e, n.listener || t)); else if ("function" != typeof n) {
        for (i = -1, s = n.length - 1; s >= 0; s--) if (n[s] === t || n[s].listener === t) {
            o = n[s].listener, i = s;
            break;
        }
        if (i < 0) return this;
        0 === i ? n.shift() : c(n, i), 1 === n.length && (r[e] = n[0]), r.removeListener && this.emit("removeListener", e, o || t);
    }
    return this;
}, e.prototype.removeAllListeners = function(e) {
    var t, n, r;
    if (!(n = this._events)) return this;
    if (!n.removeListener) return 0 === arguments.length ? (this._events = m(null), 
    this._eventsCount = 0) : n[e] && (0 == --this._eventsCount ? this._events = m(null) : delete n[e]), 
    this;
    if (0 === arguments.length) {
        var i, s = d(n);
        for (r = 0; r < s.length; ++r) "removeListener" !== (i = s[r]) && this.removeAllListeners(i);
        return this.removeAllListeners("removeListener"), this._events = m(null), this._eventsCount = 0, 
        this;
    }
    if ("function" == typeof (t = n[e])) this.removeListener(e, t); else if (t) for (r = t.length - 1; r >= 0; r--) this.removeListener(e, t[r]);
    return this;
}, e.prototype.listeners = function(e) {
    return a(this, e, !0);
}, e.prototype.rawListeners = function(e) {
    return a(this, e, !1);
}, e.listenerCount = function(e, t) {
    return "function" == typeof e.listenerCount ? e.listenerCount(t) : h.call(e, t);
}, e.prototype.listenerCount = h, e.prototype.eventNames = function() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};