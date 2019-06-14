function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var s = 0; s < e.length; s++) {
            var o = e[s];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, s, o) {
        return s && t(e.prototype, s), o && t(e, o), e;
    };
}(), s = require("defer"), o = (require("../asyncLocker"), require("../../util/util.js")), a = (require("../../const/consts.js"), 
require("../../const/modeConsts.js")), c = {
    init: "init",
    connecting: "connecting",
    connected: "connected",
    break: "break",
    recover: "recover",
    closing: "closing",
    closed: "closed"
}, i = 0, n = function() {
    function n() {
        t(this, n), this._debug = a.RunMode != a.RunModeType.Prod, this._state = c.init, 
        this._retryTimes = 0, this._closeTimeout = 0, this._isBreakReconnect = !1, this._reconnectTimeout = void 0, 
        this._url = "", this._wsLock = null, this._id = ++i, this._socketTaskId = -1, this._socketTask = null, 
        this.onMessage = null, this.onClose = null, this.onBreak = null, this.onReopen = null;
    }
    return e(n, [ {
        key: "connect",
        value: function(t, e) {
            if (this._name = e, this._debug && console.log(this._id, this._socketTaskId, this._name, "=== connect ", this._state, " socketTask.readyState=", this._socketTask ? this._socketTask.readyState : null), 
            this._state != c.closed && this._state != c.closing) return this._state = c.init, 
            this._isBreakReconnect = !1, this._url = t, this.doConnect();
            this._debug && console.log(this._id, this._socketTaskId, this._name, "=== connect locke release ", this._state, " socketTask.readyState=", this._socketTask ? this._socketTask.readyState : null);
        }
    }, {
        key: "doConnect",
        value: function() {
            var t = this;
            return this._connectDefer = s(), this._state = c.connecting, wx.onSocketOpen(this.onSocketOpen.bind(this)), 
            wx.onSocketMessage(this.onSocketMessage.bind(this)), wx.onSocketError(function(e) {
                console.error(t._id, t._socketTaskId, t._name, "=== call onSocketClose state=", t._state, " socketTask.readyState=", t._socketTask ? t._socketTask.readyState : null, e), 
                t.onSocketClose(e);
            }), wx.onSocketClose(this.onSocketClose.bind(this)), this._socketTask = wx.connectSocket({
                url: this._url,
                success: function(e) {
                    t._socketTaskId = e.socketTaskId;
                },
                fail: function(e) {
                    console.log(t._id, t._socketTaskId, t._name, "=== call wx.connectSocket fail state=", t._state, " socketTask.readyState=", t._socketTask ? t._socketTask.readyState : null, " url=", t._url), 
                    t.reconnect();
                }
            }), this._debug && console.log(this._id, this._socketTaskId, this._name, "=== call wx.connectSocket state=", this._state, " socketTask.readyState=", this._socketTask ? this._socketTask.readyState : null, " url=", this._url), 
            this._connectDefer.promise;
        }
    }, {
        key: "close",
        value: function() {
            var t = this;
            this._reconnectTimeout && (clearTimeout(this._reconnectTimeout), this._reconnectTimeout = null), 
            this._debug && console.log(this._id, this._socketTaskId, this._name, "=== call close state=", this._state, " socketTask.readyState=", this._socketTask ? this._socketTask.readyState : null), 
            this._state == c.connected ? (this._state = c.closing, wx.closeSocket({
                success: function(t) {},
                fail: function(t) {},
                complete: function(e) {
                    t._debug && console.log(t._id, t._socketTaskId, t._name, "=== call wx.closeSocket complete state=", t._state, " socketTask.readyState=", t._socketTask ? t._socketTask.readyState : null);
                }
            }), this._debug && console.log(this._id, this._socketTaskId, this._name, "=== call wx.closeSocket state=", this._state, " socketTask.readyState=", this._socketTask ? this._socketTask.readyState : null)) : (this._state = c.closed, 
            this.onSocketClose(), this._debug && console.log(this._id, this._socketTaskId, this._name, "=== call close onSocketClose state=", this._state, " socketTask.readyState=", this._socketTask ? this._socketTask.readyState : null));
        }
    }, {
        key: "send",
        value: function(t) {
            var e = this;
            this._state == c.connected ? wx.sendSocketMessage({
                data: t,
                success: function(t) {},
                fail: function(t) {
                    e._debug && console.error(e._id, e._name, "=== sendSocketMessage fail: ", t, e._name, e._state, " socketTask.readyState=", e._socketTask ? e._socketTask.readyState : null);
                }
            }) : this._debug && console.error(this._id, this._socketTaskId, this._name, "=== call wx.sendSocketMessage state=", this._state, " socketTask.readyState=", this._socketTask ? this._socketTask.readyState : null);
        }
    }, {
        key: "reconnect",
        value: function() {
            var t = this;
            this._debug && console.log(this._id, this._socketTaskId, this._name, "=== call reconnect state=", this._state, " socketTask.readyState=", this._socketTask ? this._socketTask.readyState : null), 
            this._reconnectTimeout && (clearTimeout(this._reconnectTimeout), this._reconnectTimeout = void 0), 
            this._state == c.connected ? wx.closeSocket() : (this._state = c.recover, this._reconnectTimeout = setTimeout(function() {
                t._retryTimes++, t._reconnectTimeout = void 0, t._socketTask = wx.connectSocket({
                    url: t._url,
                    success: function(e) {
                        t._socketTaskId = e.socketTaskId, t._debug && console.log(t._id, t._socketTaskId, t._name, "=== call wx.connectSocket state=", t._state, " socketTask.readyState=", t._socketTask ? t._socketTask.readyState : null, " url=", t._url), 
                        t._debug && console.log(t._id, t._socketTaskId, t._name, "=== 重试次数:", t._retryTimes), 
                        t._debug && o.ShowToast("重连次数:" + t._retryTimes + " " + t._name);
                    },
                    fail: function(e) {
                        console.error(t._id, t._socketTaskId, t._name, "=== call wx.connectSocket fail state=", t._state, " socketTask.readyState=", t._socketTask ? t._socketTask.readyState : null, " url=", t._url), 
                        t.reconnect();
                    }
                });
            }, 2e3 + 500 * this._retryTimes + 500 * Math.random()));
        }
    }, {
        key: "breakReconnect",
        value: function() {
            this._isBreakReconnect = !0;
        }
    }, {
        key: "onSocketOpen",
        value: function(t) {
            this._debug && console.log(this._id, this._socketTaskId, this._name, "=== call onSocketOpen state=", this._state, " socketTask.readyState=", this._socketTask ? this._socketTask.readyState : null), 
            this._state == c.closing || this._state == c.closed ? (wx.closeSocket(), this._debug && console.log(this._id, this._socketTaskId, this._name, "=== call wx.closeSocket state=", this._state, " socketTask.readyState=", this._socketTask ? this._socketTask.readyState : null)) : (this._retryTimes = 0, 
            this._state == c.connecting ? (this._state = c.connected, this._debug && console.log(this._id, this._socketTaskId, this._name, "=== call this._connectDefer.resolve() state=", this._state, " socketTask.readyState=", this._socketTask ? this._socketTask.readyState : null), 
            this._connectDefer.resolve()) : this._state == c.recover && (this._state = c.connected, 
            this._reconnectTimeout && (clearTimeout(this._reconnectTimeout), this._reconnectTimeout = void 0), 
            this._debug && console.log(this._id, this._socketTaskId, this._name, "=== call onReopen state=", this._state, " socketTask.readyState=", this._socketTask ? this._socketTask.readyState : null), 
            o.invokeCallback(this.onReopen, t)));
        }
    }, {
        key: "onSocketClose",
        value: function(t) {
            this._debug && console.log(this._id, this._socketTaskId, this._name, "=== call onSocketClose state=", this._state, " socketTask.readyState=", this._socketTask ? this._socketTask.readyState : null, t), 
            this._state != c.closed ? this._state == c.closing ? (this._state = c.closed, this._debug && console.log(this._id, this._socketTaskId, this._name, "=== call onClose1 state=", this._state, " socketTask.readyState=", this._socketTask ? this._socketTask.readyState : null), 
            o.invokeCallback(this.onClose, t)) : (this._state = c.break, this._debug && console.log(this._id, this._socketTaskId, this._name, "=== call onClose2 state=", this._state, " socketTask.readyState=", this._socketTask ? this._socketTask.readyState : null), 
            o.invokeCallback(this.onBreak, t), this._isBreakReconnect || this.reconnect()) : (this._debug && console.log(this._id, this._socketTaskId, this._name, "=== call onClose3 state=", this._state, " socketTask.readyState=", this._socketTask ? this._socketTask.readyState : null), 
            o.invokeCallback(this.onClose, t));
        }
    }, {
        key: "onSocketMessage",
        value: function(t) {
            o.invokeCallback(this.onMessage, t);
        }
    } ]), n;
}();

exports.Tcp = n;