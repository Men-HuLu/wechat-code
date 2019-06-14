function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(t, n, s) {
        return n && e(t.prototype, n), s && e(t, s), t;
    };
}(), n = (require("defer"), require("cavenetPackage")), s = require("../../util/util.js"), a = (require("../../const/consts.js"), 
require("../../const/modeConsts.js")), i = require("../../net/myTunnel.js").tunnel, o = {
    init: "init",
    connecting: "connecting",
    connected: "connected",
    established: "established",
    recover: "recover",
    closing: "closing",
    closed: "closed"
}, c = function() {
    function c() {
        e(this, c), this.sessionId = "", this._lastSeq = 0, this._lastAck = 0, this._sSeq = 0, 
        this.state = o.init, this._debug = a.RunMode != a.RunModeType.Prod, this._isBreakReconnect = !1, 
        this._tunnel = new i("cash"), this._connectDefer = null, this.retryTimes = 0, this.onMessage = null, 
        this.onClose = null, this.onOpen = null, this.heartbeatTimer = null, this.lastHeartbeat = 0, 
        this._tunnel.onMessage = this.onSocketMessage.bind(this), this._tunnel.onOpen = this.onSocketOpen.bind(this), 
        this._tunnel.onReopen = this.onSocketReopen.bind(this), this._tunnel.onBreak = this.onSocketClose.bind(this);
    }
    return t(c, [ {
        key: "connect",
        value: function(e) {
            this.url = e, this.state = o.connecting, this._tunnel.connect(e);
        }
    }, {
        key: "send",
        value: function(e) {
            if (!this.state != o.connected) {
                var t = n.CavenetPackage.Gen(n.CavenetPackage.actions.payload, this._sSeq, this._lastSeq++, e);
                this._tunnel.send(t);
            }
        }
    }, {
        key: "close",
        value: function() {
            this.state = o.closing, this._tunnel && this._tunnel.close();
        }
    }, {
        key: "startHeartbeat",
        value: function() {
            clearTimeout(this.heartbeatTimer), this.lastHeartbeat = Date.now();
            var e = this;
            this.heartbeatTimer = setTimeout(function t() {
                if (e.state != o.closed) if (Date.now() - e.lastHeartbeat > 4e3) e._debug && console.log("todo restart......"); else {
                    e.heartbeatTimer = setTimeout(t, 2e3);
                    var s = n.CavenetPackageHeartbeat.Gen(Math.floor(Date.now() / 1e3)), a = n.CavenetPackage.Gen(n.CavenetPackage.actions.heartbeat, this._sSeq, 0, s);
                    e._tunnel.send(a);
                }
            }, 2e3);
        }
    }, {
        key: "onSocketMessage",
        value: function(e) {
            var t = new n.CavenetPackage(e);
            if (this.state === o.connected) {
                if (t.action() !== n.CavenetPackage.actions.handShake) return void this.close();
                var s = new n.CavenetPackageHandshake(t.payload());
                this.sessionId = s.sessionId(), this.state = o.established, this.startHeartbeat(), 
                this.onOpen && this.onOpen();
            } else if (this.state == o.recover) {
                if (t.action() !== n.CavenetPackage.actions.handShake) return void this.close();
                if (8 != new n.CavenetPackageHandshake(t.payload()).action()) return this._isBreakReconnect = !0, 
                this._tunnel.close(), void getApp().eventDispatcher.dispatchEventWith("onSocketReopen");
                this._isBreakReconnect = !1, this.state = o.established, this.startHeartbeat(), 
                this.onOpen && this.onOpen();
            } else this.state === o.established && (this._sSeq = t.seq(), t.action() === n.CavenetPackage.actions.heartbeat ? this.lastHeartbeat = Date.now() : t.action() === n.CavenetPackage.actions.payload && this.onMessage && this.onMessage(t.payload()));
        }
    }, {
        key: "newSession",
        value: function() {
            var e = n.CavenetPackageHandshake.Gen(n.CavenetPackageHandshake.actions.newSession, ""), t = n.CavenetPackage.Gen(n.CavenetPackage.actions.handShake, this._sSeq, this._lastSeq, e);
            this._tunnel.send(t);
        }
    }, {
        key: "restoreSession",
        value: function() {
            var e = n.CavenetPackageHandshake.Gen(n.CavenetPackageHandshake.actions.restoreSession, this.sessionId), t = n.CavenetPackage.Gen(n.CavenetPackage.actions.handShake, this._sSeq, this._lastSeq, e);
            this._tunnel.send(t);
        }
    }, {
        key: "onSocketOpen",
        value: function() {
            this.state == o.closing || this.state == o.closed ? this.close() : (this.state = this.state == o.connecting ? o.connected : this.state, 
            "" !== this.sessionId ? this.restoreSession() : this.newSession());
        }
    }, {
        key: "onSocketReopen",
        value: function() {
            this.state == o.closing || this.state == o.closed ? this.close() : (this.state = o.recover, 
            "" !== this.sessionId ? this.restoreSession() : this.newSession());
        }
    }, {
        key: "onSocketClose",
        value: function(e) {
            this.state == o.recover || (this._state = o.closed, clearTimeout(this.heartbeatTimer)), 
            s.invokeCallback(this.onClose);
        }
    } ]), c;
}();

exports.CavenetSession = c;