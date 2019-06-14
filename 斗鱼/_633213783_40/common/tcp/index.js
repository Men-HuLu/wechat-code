function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var i = n[t];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(n, t, i) {
        return t && e(n.prototype, t), i && e(n, i), n;
    };
}(), t = require("./Client"), i = require("./util/util"), l = function(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t]);
    return n.default = e, n;
}(require("./util/acj")), a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./util/logger")), o = getApp(), r = function() {
    function r() {
        e(this, r), this.checkOnlineTime = 20, (0, i.bindAll)(this), l.addCallback(l.ACJ_TYPES.CALLBACK_USER_SENDMSG, this.onUserSendmsg), 
        l.addCallback(l.ACJ_TYPES.CALLBACK_USER_LOGIN, this.onUserLogin), l.addCallback(l.ACJ_TYPES.CALLBACK_GIVE_GIFT, this.onGiveGift), 
        l.addCallback(l.ACJ_TYPES.ROOM_DATA_SHARE_SUCCESS_RES, this.onShareRoom), l.addCallback(l.ACJ_TYPES.USER_JOIN_CHATROOM, this.onJoinChatroom), 
        l.addCallback(l.ACJ_TYPES.CALLBACK_CHATROOM_USER_SENDMSG, this.onChatroomSendmsg), 
        l.addCallback(l.ACJ_TYPES.USER_QUIT_CHATROOM, this.onQuitChatroom);
    }
    return n(r, [ {
        key: "connect",
        value: function() {
            this.connectServer();
        }
    }, {
        key: "connectServer",
        value: function() {
            o.globalData.$SYS && o.globalData.$SYS.gateServer ? (this.client && this.client.close(), 
            this.client = new t.Client(), this.client.connect(o.globalData.$SYS.gateServer), 
            this.client.on(t.ClientEvent.OPEN, this.onClientOpen), this.client.on(t.ClientEvent.ERROR, this.onClientError)) : console.warn("no server info");
        }
    }, {
        key: "close",
        value: function() {
            clearInterval(this.checkOnlineInterval), this.client && (this.client.close(), this.client = null);
        }
    }, {
        key: "onClientOpen",
        value: function() {
            clearInterval(this.checkOnlineInterval), this.checkOnlineInterval = setInterval(this.checkOnline, 1e3 * this.checkOnlineTime), 
            l.acj(l.ACJ_TYPES.ROOM_TCPCLIENT_SUCCESS);
        }
    }, {
        key: "onClientError",
        value: function() {
            console.log("connect gateserver error!");
        }
    }, {
        key: "checkOnline",
        value: function() {
            this.client && (this.client.isConnected ? this.client.barrage && !this.client.barrage.isConnected && (console.log("you barrage are offline, reconnecting..."), 
            l.acj(l.ACJ_TYPES.ROOM_TCPCLIENT_FAILED), this.client.connectBarrage()) : (console.log("you client are offline, reconnecting..."), 
            l.acj(l.ACJ_TYPES.ROOM_TCPCLIENT_FAILED), this.connectServer()));
        }
    }, {
        key: "exec",
        value: function(e) {
            for (var n = arguments.length, t = Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) t[i - 1] = arguments[i];
            return l.onACJ.apply(l, [ e ].concat(t));
        }
    }, {
        key: "onUserSendmsg",
        value: function() {
            if (this.client) {
                var e;
                (e = this.client)._userSendmsg.apply(e, arguments);
            } else a.default.warn("client not ready, send failed : onUserSendmsg");
        }
    }, {
        key: "onUserLogin",
        value: function() {
            if (this.client) {
                var e;
                (e = this.client)._userLogin.apply(e, arguments);
            } else a.default.warn("client not ready, send failed : onUserLogin");
        }
    }, {
        key: "onGiveGift",
        value: function() {
            if (this.client) {
                var e;
                (e = this.client)._giveGift.apply(e, arguments);
            } else a.default.warn("client not ready, send failed : onGiveGift");
        }
    }, {
        key: "onShareRoom",
        value: function() {
            if (this.client) {
                var e;
                (e = this.client)._ShareSuccess.apply(e, arguments);
            } else a.default.warn("client not ready, send failed : onShareRoom");
        }
    }, {
        key: "onJoinChatroom",
        value: function() {
            if (this.client) {
                var e;
                (e = this.client)._joinChatroom.apply(e, arguments);
            } else a.default.warn("client not ready, send failed : onJoinChatroom");
        }
    }, {
        key: "onChatroomSendmsg",
        value: function() {
            if (this.client) {
                var e;
                (e = this.client)._chatroomSendmsg.apply(e, arguments);
            } else a.default.warn("client not ready, send failed : onChatroomSendmsg");
        }
    }, {
        key: "onQuitChatroom",
        value: function() {
            if (this.client) {
                var e;
                (e = this.client)._quitChatroom.apply(e, arguments);
            } else a.default.warn("client not ready, send failed : onQuitChatroom");
        }
    } ]), r;
}();

exports.default = r;