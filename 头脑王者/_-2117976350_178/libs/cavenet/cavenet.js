function e(e, s) {
    if (!(e instanceof s)) throw new TypeError("Cannot call a class as a function");
}

var s = function() {
    function e(e, s) {
        for (var t = 0; t < s.length; t++) {
            var n = s[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(s, t, n) {
        return t && e(s.prototype, t), n && e(s, n), s;
    };
}(), t = require("defer"), n = require("cavenetPackage"), o = require("../../net/connectNotify.js"), i = require("cavenetSession").CavenetSession, a = (require("../asyncLocker"), 
require("../../const/consts.js"), require("../../const/modeConsts.js")), r = {
    init: "init",
    handShaking: "handShaking",
    established: "established",
    recover: "recover",
    closing: "closing",
    closed: "closed"
}, c = function() {
    function c() {
        e(this, c), this._debug = a.RunMode != a.RunModeType.Prod, this._index = 0, this._reqMap = new Map(), 
        this.handlers = {}, this.wsURL = "", this.state = r.init;
    }
    return s(c, [ {
        key: "connect",
        value: function(e) {
            return this.wsURL = e, this.state = r.init, this._connect(this.wsURL);
        }
    }, {
        key: "_connect",
        value: function(e) {
            return this.session && (this.session.onOpen = void 0, this.session.onMessage = void 0, 
            this.session.onClose = void 0, this.session.onError = void 0, this.session.close()), 
            this.session = new i(), this.session.onOpen = this.onSocketOpen.bind(this), this.session.onMessage = this.onSocketMessage.bind(this), 
            this.session.onClose = this.onSocketClose.bind(this), this.session.onError = this.onSocketClose.bind(this), 
            this.session.connect(this.wsURL);
        }
    }, {
        key: "request",
        value: function(e, s) {
            var o = t();
            return this._reqMap.set(++this._index, o), this.session.send(n.CavenetPackagePayload.Gen(n.CavenetPackagePayload.actions.request, this._index, n.CavenetPackagePayload.payloadFormat.json, e, JSON.stringify(s))), 
            o.promise;
        }
    }, {
        key: "notify",
        value: function(e, s) {
            this.session.send(n.CavenetPackagePayload.Gen(n.CavenetPackagePayload.actions.notify, 0, n.CavenetPackagePayload.payloadFormat.json, e, JSON.stringify(s)));
        }
    }, {
        key: "close",
        value: function() {
            this._debug && console.error("cavenet do close"), this.state = "closing", this.session.close();
        }
    }, {
        key: "onSocketOpen",
        value: function() {
            this._debug && console.log("socket open"), this.state = r.established, getApp().eventDispatcher.dispatchEventWith("onCashSocketOpen");
        }
    }, {
        key: "onSocketError",
        value: function(e) {
            this._debug && console.error("socket err", e);
        }
    }, {
        key: "onSocketMessage",
        value: function(e) {
            var s = new n.CavenetPackagePayload(e), t = s.reqId();
            if (0 != t) {
                var i = this._reqMap.get(t);
                if (!i) return;
                var a = s.payloadJSON();
                this._debug && console.log("reqId=" + t, JSON.stringify(a)), 0 == a.errorCode ? i.resolve(a.data) : i.reject(a.errorMsg), 
                this._reqMap.delete(t);
            } else this._debug && console.log(s.router(), s.payloadJSON()), o.receive(s.router(), s.payloadJSON());
        }
    }, {
        key: "onSocketClose",
        value: function() {
            this._debug && console.log("socket close", this.state), "closing" == this.state ? (this.state = "closed", 
            this.session = void 0) : this.state = "recover", getApp().eventDispatcher.dispatchEventWith("onCashSocketClose");
        }
    } ]), c;
}();

exports.cavenetClient = new c();