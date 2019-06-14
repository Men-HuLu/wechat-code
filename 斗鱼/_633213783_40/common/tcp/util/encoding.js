function e(e, r, t) {
    return r <= e && e <= t;
}

function r(e) {
    if (void 0 === e) return {};
    if (e === Object(e)) return e;
    throw TypeError("Could not convert argument to dictionary");
}

function t(e) {
    for (var r = String(e), t = r.length, n = 0, i = []; n < t; ) {
        var o = r.charCodeAt(n);
        if (o < 55296 || o > 57343) i.push(o); else if (56320 <= o && o <= 57343) i.push(65533); else if (55296 <= o && o <= 56319) if (n === t - 1) i.push(65533); else {
            var s = e.charCodeAt(n + 1);
            if (56320 <= s && s <= 57343) {
                var f = 1023 & o, a = 1023 & s;
                i.push(65536 + (f << 10) + a), n += 1;
            } else i.push(65533);
        }
        n += 1;
    }
    return i;
}

function n(e) {
    for (var r = "", t = 0; t < e.length; ++t) {
        var n = e[t];
        n <= 65535 ? r += String.fromCharCode(n) : (n -= 65536, r += String.fromCharCode(55296 + (n >> 10), 56320 + (1023 & n)));
    }
    return r;
}

function i(e) {
    this.tokens = [].slice.call(e);
}

function o(e, r) {
    if (e) throw TypeError("Decoder error");
    return r || 65533;
}

function s(e, t) {
    if (!(this instanceof s)) return new s(e, t);
    if ((e = void 0 !== e ? String(e).toLowerCase() : p) !== p) throw new Error("Encoding not supported. Only utf-8 is supported");
    t = r(t), this._streaming = !1, this._BOMseen = !1, this._decoder = null, this._fatal = Boolean(t.fatal), 
    this._ignoreBOM = Boolean(t.ignoreBOM), Object.defineProperty(this, "encoding", {
        value: "utf-8"
    }), Object.defineProperty(this, "fatal", {
        value: this._fatal
    }), Object.defineProperty(this, "ignoreBOM", {
        value: this._ignoreBOM
    });
}

function f(e, t) {
    if (!(this instanceof f)) return new f(e, t);
    if ((e = void 0 !== e ? String(e).toLowerCase() : p) !== p) throw new Error("Encoding not supported. Only utf-8 is supported");
    t = r(t), this._streaming = !1, this._encoder = null, this._options = {
        fatal: Boolean(t.fatal)
    }, Object.defineProperty(this, "encoding", {
        value: "utf-8"
    });
}

function a(r) {
    var t = r.fatal, n = 0, i = 0, s = 0, f = 128, a = 191;
    this.handler = function(r, u) {
        if (u === l && 0 !== s) return s = 0, o(t);
        if (u === l) return d;
        if (0 === s) {
            if (e(u, 0, 127)) return u;
            if (e(u, 194, 223)) s = 1, n = u - 192; else if (e(u, 224, 239)) 224 === u && (f = 160), 
            237 === u && (a = 159), s = 2, n = u - 224; else {
                if (!e(u, 240, 244)) return o(t);
                240 === u && (f = 144), 244 === u && (a = 143), s = 3, n = u - 240;
            }
            return n <<= 6 * s, null;
        }
        if (!e(u, f, a)) return n = s = i = 0, f = 128, a = 191, r.prepend(u), o(t);
        if (f = 128, a = 191, i += 1, n += u - 128 << 6 * (s - i), i !== s) return null;
        var h = n;
        return n = s = i = 0, h;
    };
}

function u(r) {
    r.fatal;
    this.handler = function(r, t) {
        if (t === l) return d;
        if (e(t, 0, 127)) return t;
        var n, i;
        e(t, 128, 2047) ? (n = 1, i = 192) : e(t, 2048, 65535) ? (n = 2, i = 224) : e(t, 65536, 1114111) && (n = 3, 
        i = 240);
        for (var o = [ (t >> 6 * n) + i ]; n > 0; ) {
            var s = t >> 6 * (n - 1);
            o.push(128 | 63 & s), n -= 1;
        }
        return o;
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, l = -1;

i.prototype = {
    endOfStream: function() {
        return !this.tokens.length;
    },
    read: function() {
        return this.tokens.length ? this.tokens.shift() : l;
    },
    prepend: function(e) {
        if (Array.isArray(e)) for (var r = e; r.length; ) this.tokens.unshift(r.pop()); else this.tokens.unshift(e);
    },
    push: function(e) {
        if (Array.isArray(e)) for (var r = e; r.length; ) this.tokens.push(r.shift()); else this.tokens.push(e);
    }
};

var d = -1;

(function() {}).prototype = {
    handler: function(e, r) {}
}, function() {}.prototype = {
    handler: function(e, r) {}
};

var p = "utf-8";

s.prototype = {
    decode: function(e, t) {
        var o;
        o = "object" === (void 0 === e ? "undefined" : h(e)) && e instanceof ArrayBuffer ? new Uint8Array(e) : "object" === (void 0 === e ? "undefined" : h(e)) && "buffer" in e && e.buffer instanceof ArrayBuffer ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : new Uint8Array(0), 
        t = r(t), this._streaming || (this._decoder = new a({
            fatal: this._fatal
        }), this._BOMseen = !1), this._streaming = Boolean(t.stream);
        for (var s, f = new i(o), u = []; !f.endOfStream() && (s = this._decoder.handler(f, f.read())) !== d; ) null !== s && (Array.isArray(s) ? u.push.apply(u, s) : u.push(s));
        if (!this._streaming) {
            do {
                if ((s = this._decoder.handler(f, f.read())) === d) break;
                null !== s && (Array.isArray(s) ? u.push.apply(u, s) : u.push(s));
            } while (!f.endOfStream());
            this._decoder = null;
        }
        return u.length && (-1 === [ "utf-8" ].indexOf(this.encoding) || this._ignoreBOM || this._BOMseen || (65279 === u[0] ? (this._BOMseen = !0, 
        u.shift()) : this._BOMseen = !0)), n(u);
    }
}, f.prototype = {
    encode: function(e, n) {
        e = e ? String(e) : "", n = r(n), this._streaming || (this._encoder = new u(this._options)), 
        this._streaming = Boolean(n.stream);
        for (var o, s = [], f = new i(t(e)); !f.endOfStream() && (o = this._encoder.handler(f, f.read())) !== d; ) Array.isArray(o) ? s.push.apply(s, o) : s.push(o);
        if (!this._streaming) {
            for (;;) {
                if ((o = this._encoder.handler(f, f.read())) === d) break;
                Array.isArray(o) ? s.push.apply(s, o) : s.push(o);
            }
            this._encoder = null;
        }
        return new Uint8Array(s);
    }
}, exports.TextEncoder = f, exports.TextDecoder = s;