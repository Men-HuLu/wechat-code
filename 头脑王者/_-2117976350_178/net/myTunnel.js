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
}(), n = require("../const/modeConsts.js"), s = require("../util/util.js"), o = 1, i = {
    CLOSED: "CLOSED",
    CONNECTING: "CONNECTING",
    ACTIVE: "ACTIVE",
    RECONNECTING: "RECONNECTING"
}, c = {
    CONNECT_SOCKET: 1002,
    RECONNECT: 2001,
    SOCKET_ERROR: 3001
}, l = 1e3, a = function() {
    function a(t) {
        e(this, a), this.debug = n.RunMode != n.RunModeType.Prod, this.logName = t, this.setStatus(i.CLOSED), 
        this.isClosing = !1, this.reconnectTryTimes = 0, this.waitBeforeReconnect = 0, this.reconnectTimeIncrease = l, 
        this.reconnectTimer = 0, this.onMessage = void 0, this.onError = void 0, this.onBreak = void 0, 
        this.onReopen = void 0, this.onOpen = void 0;
    }
    return t(a, [ {
        key: "isClosed",
        value: function() {
            return this.status === i.CLOSED;
        }
    }, {
        key: "isConnecting",
        value: function() {
            return this.status === i.CONNECTING;
        }
    }, {
        key: "isActive",
        value: function() {
            return this.status === i.ACTIVE;
        }
    }, {
        key: "isReconnecting",
        value: function() {
            return this.status === i.RECONNECTING;
        }
    }, {
        key: "setStatus",
        value: function(e) {
            this.status !== e && (this.status = e);
        }
    }, {
        key: "connect",
        value: function(e) {
            this.isClosed() ? (this.setStatus(i.CONNECTING), this.socketUrl = e || this.socketUrl, 
            this.openSocket()) : (console.error("连接信道需要正常关闭后才能调用connect"), s.invokeCallback(this.onError, {
                errCode: c.CONNECT_SOCKET,
                errMsg: "连接信道没有正常关闭"
            }));
        }
    }, {
        key: "openSocket",
        value: function() {
            var e = wx.connectSocket({
                url: this.socketUrl
            });
            this.task = e, this.task.tunnelId = o++, this.task.onOpen(this.handleSocketOpen.bind(this, e)), 
            this.task.onClose(this.handleSocketClose.bind(this, e)), this.task.onError(this.handleSocketError.bind(this, e)), 
            this.task.onMessage(this.handleSocketMessage.bind(this, e));
        }
    }, {
        key: "close",
        value: function() {
            this.task && (this.debug && console.log("[socket][myTunnel][" + this.logName + "] tunnelId", this.task.tunnelId, "close"), 
            this.setStatus(i.CLOSED), this.resetReconnectionContext(), clearTimeout(this.reconnectTimer), 
            this.task.close(), this.task = void 0, s.invokeCallback(this.onClose));
        }
    }, {
        key: "startReconnect",
        value: function(e) {
            this.task && (this.debug && console.log("[socket][myTunnel][" + this.logName + "] tunnelId", this.task.tunnelId, "startReconnect"), 
            this.task.close(), this.waitBeforeReconnect += this.reconnectTimeIncrease, this.setStatus(i.RECONNECTING), 
            clearTimeout(this.reconnectTimer), this.reconnectTimer = setTimeout(this.openSocket.bind(this), this.waitBeforeReconnect), 
            this.reconnectTryTimes += 1);
        }
    }, {
        key: "send",
        value: function(e) {
            this.task && this.task.send({
                data: e,
                fail: this.handleSocketError.bind(this)
            });
        }
    }, {
        key: "resetReconnectionContext",
        value: function() {
            this.reconnectTryTimes = 0, this.waitBeforeReconnect = 0;
        }
    }, {
        key: "handleSocketOpen",
        value: function(e, t) {
            if (e != this.task) return this.debug && console.log("[socket][myTunnel][" + this.logName + "] tunnelId", e.tunnelId, "pre handleSocketOpen:", t), 
            void e.close();
            this.debug && console.log("[socket][myTunnel][" + this.logName + "] tunnelId", this.task.tunnelId, "handleSocketOpen:", t), 
            this.resetReconnectionContext(), this.isConnecting() ? (s.invokeCallback(this.onOpen), 
            this.setStatus(i.ACTIVE)) : this.isReconnecting() ? (s.invokeCallback(this.onReopen), 
            this.setStatus(i.ACTIVE)) : this.close();
        }
    }, {
        key: "handleSocketMessage",
        value: function(e, t) {
            e == this.task ? s.invokeCallback(this.onMessage, t.data) : this.debug && console.log("[socket][myTunnel][" + this.logName + "] tunnelId", e.tunnelId, "pre handleSocketMessage");
        }
    }, {
        key: "handleSocketError",
        value: function(e, t) {
            if (e == this.task) {
                switch (this.debug && console.log("[socket][myTunnel][" + this.logName + "] tunnelId", this.task.tunnelId, "handleSocketError:", t), 
                this.status) {
                  case i.CONNECTING:
                    s.invokeCallback(this.onError, {
                        errCode: c.SOCKET_ERROR,
                        errMsg: "连接信道失败，网络错误或者信道服务不可用"
                    });
                }
                this.isClosed() || this.startReconnect("链接已断开");
            } else this.debug && console.log("[socket][myTunnel][" + this.logName + "] tunnelId", e.tunnelId, "pre handleSocketError:", t);
        }
    }, {
        key: "handleSocketClose",
        value: function(e, t) {
            e == this.task ? (this.debug && console.log("[socket][myTunnel][" + this.logName + "] tunnelId", this.task.tunnelId, "handleSocketClose:", t), 
            this.isClosed() || (s.invokeCallback(this.onBreak), this.startReconnect("链接已断开"))) : this.debug && console.log("[socket][myTunnel][" + this.logName + "] tunnelId", e.tunnelId, "pre handleSocketClose:", t);
        }
    } ]), a;
}();

module.exports.tunnel = a, module.exports.ERR_TYPE = c;