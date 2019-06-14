function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

function r() {
    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    return t.reduce(function(e, t) {
        e instanceof ArrayBuffer && (e = new Uint8Array(e)), t instanceof ArrayBuffer && (t = new Uint8Array(t));
        var n = new Uint8Array(e.length + t.length);
        return n.set(e, 0), n.set(t, e.length), n;
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.TcpClient = exports.TcpClientEvent = void 0;

var i = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), o = require("../../lib/events/events"), s = require("./util/util"), c = require("./util/logger"), f = require("./util/encoding"), u = exports.TcpClientEvent = {
    OPEN: "open",
    CLOSE: "close",
    ERROR: "error",
    MESSAGE: "message"
};

exports.TcpClient = function(l) {
    function a() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "TcpClient";
        e(this, a);
        var r = t(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this));
        return r._packLen = 0, r._encoder = new f.TextEncoder(), r._decoder = new f.TextDecoder(), 
        r._littleEndian = !0, r._name = n, r._logger = (0, c.makeLogger)(n, "TcpClient"), 
        (0, s.bindAll)(r), r;
    }
    return n(a, o.EventEmitter), i(a, [ {
        key: "connect",
        value: function(e, t) {
            var n = "wss://" + e;
            this._socket = wx.connectSocket({
                url: n
            }), this._socket.onOpen(this._onopen), this._socket.onClose(this._onclose), this._socket.onError(this._onerror), 
            this._socket.onMessage(this._onmessage), this._logger.log("connecting " + n + " ...");
        }
    }, {
        key: "close",
        value: function() {
            this.removeAllListeners(), this._socket && this._socket.close(), this._logger.log("close tcp client");
        }
    }, {
        key: "_onclose",
        value: function(e) {
            this._logger.log("onclose", e), this.emit(u.CLOSE);
        }
    }, {
        key: "_onerror",
        value: function(e) {
            this._logger.error("onerror", e), this.emit(u.ERROR);
        }
    }, {
        key: "_onmessage",
        value: function(e) {
            var t = e.data;
            this._buffer ? this._buffer = r(this._buffer, t).buffer : this._buffer = t, this._parsemsg();
        }
    }, {
        key: "_onopen",
        value: function(e) {
            this._logger.log("onopen", e), this.emit(u.OPEN);
        }
    }, {
        key: "sendmsg",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {}, i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : function() {}, o = r(this._encoder.encode(e), [ 0 ]), s = 8 + o.byteLength, c = new DataView(new ArrayBuffer(s + 4)), f = this._littleEndian, u = 0;
            c.setUint32(u, s, f), u += 4, c.setUint32(u, s, f), u += 4, c.setInt16(u, 689, f), 
            u += 2, c.setInt8(u, 0), u += 1, c.setInt8(u, 0), u += 1, new Uint8Array(c.buffer).set(o, u), 
            this._socket.send({
                data: c.buffer,
                success: t,
                fail: n,
                complete: i
            });
        }
    }, {
        key: "_parsemsg",
        value: function() {
            for (;this._buffer && this._buffer.byteLength > 0; ) {
                var e = new DataView(this._buffer), t = this._littleEndian;
                if (0 === this._packLen) {
                    if (this._buffer.byteLength < 4) return;
                    this._packLen = e.getUint32(0, t), this._buffer = this._buffer.slice(4);
                }
                if (this._buffer.byteLength < this._packLen) return;
                var n = this._decoder.decode(new Uint8Array(this._buffer.slice(8, this._packLen - 1)));
                this._buffer = this._buffer.slice(this._packLen), this._packLen = 0, this.emit(u.MESSAGE, n);
            }
        }
    }, {
        key: "isConnected",
        get: function() {
            return !(!this._socket || 1 !== this._socket.readyState);
        }
    } ]), a;
}();