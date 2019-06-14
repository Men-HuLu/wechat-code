function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function n(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function i(e, t) {
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

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ClientBarrage = exports.ClientBarrageEvent = void 0;

var o = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), r = require("./util/logger"), s = require("../../lib/events/events"), a = require("./util/acj"), c = e(require("../flashData")), l = require("./TcpClient"), u = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}(require("./util/util")), _ = require("./util/sttUtil"), h = e(require("../../common/storage")), v = "ClientBarrage", f = (0, 
r.makeLogger)(v), p = exports.ClientBarrageEvent = {
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    JOIN_GROUP: "JOIN_GROUP"
};

exports.ClientBarrage = function(e) {
    function r(e) {
        t(this, r);
        var i = n(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this));
        return u.bindAll(i), i.client = e, i.conn = null, i.isJoinGroup = !1, i._keepLiveInterval = 0, 
        i._keepLiveTime = 45, i.ip = "", i.port = 0, i.serverId = 0, i.hadLoginRes = !1, 
        i;
    }
    return i(r, s.EventEmitter), o(r, [ {
        key: "connect",
        value: function(e, t) {
            this.ip = e, this.port = t, this.conn = new l.TcpClient(v), this.conn.on(l.TcpClientEvent.OPEN, this._onOpen), 
            this.conn.on(l.TcpClientEvent.CLOSE, this._onClose), this.conn.on(l.TcpClientEvent.ERROR, this._onError), 
            this.conn.on(l.TcpClientEvent.MESSAGE, this._onMessage), this.conn.connect(e, t);
        }
    }, {
        key: "close",
        value: function() {
            clearInterval(this._keepLiveInterval), clearInterval(this.client._chatroomHeartInterval), 
            this.isConnected && this._userLogout(), this.removeAllListeners(), this.conn && (this.conn.close(), 
            this.conn = null);
        }
    }, {
        key: "userJoinGroup",
        value: function() {
            !this.isJoinGroup && this.isConnected && void 0 !== this.client.gid && this._sendmsg(c.default.encode({
                type: "joingroup",
                rid: this.client.roomid,
                gid: this.client.gid
            })) && (this.isJoinGroup = !0, this.emit(p.JOIN_GROUP));
        }
    }, {
        key: "_onOpen",
        value: function() {
            f.log("弹幕网络数据连接成功"), this._userLogin();
        }
    }, {
        key: "_onClose",
        value: function() {
            f.warn("弹幕网络数据连接关闭"), this.close();
        }
    }, {
        key: "_onError",
        value: function() {
            f.error("弹幕网络数据连接 异常"), this.close();
        }
    }, {
        key: "_onMessage",
        value: function(e) {
            var t = c.default.decode(e).too(), n = t.type;
            switch (f.log("弹幕网络数据 [" + e + "]"), n) {
              case "loginres":
                this._onLoginres(t);
                break;

              case "mrkl":
                this._onKeepLive(t);
                break;

              case "spbc":
                this._spbc(t, e);
                break;

              case "error":
                this._onServerError(t);
                break;

              case "bgd":
              case "dgb":
                this.client._onCurrentRoomGift(t, e);
                break;

              case "chatmsg":
                if (this.client.roomgroup > 4 || this.client.pg > 1) return;
                this.client._onChatMsg(t, e);
                break;

              case "uenter":
                this._onNewServerUserEnter(e);
                break;

              case "rii":
                var i = 1 === (0, _.getInt)(t, "ii");
                (0, a.acj)(a.ACJ_TYPES.CALL_ROOM_DATA_ILLCHANGE, i);
                break;

              case "newblackres":
              case "ntmet":
              case "ncrmc":
              case "muteinfo":
                this.client._onRoomDataSys(e);
                break;

              case "srres":
                this._onShareMsg(t, e);
                break;

              case "apkb":
                this.pkHandle(t);
                break;

              case "wechat":
                this._onChatroom(t, e);
                break;

              default:
                (0, a.acj)(a.ACJ_TYPES.CALL_ROOM_DATA_HANDLER, e);
            }
        }
    }, {
        key: "_onChatroom",
        value: function(e, t) {
            var n = e.content, i = c.default.decode(n).too();
            switch (i.type) {
              case "bjoin":
                this._onJoinMsg(i, n);
                break;

              case "joinres":
                this._onJoinRes(i, n);
                break;

              case "brju":
                this._onJoinBr(i, n);
                break;

              case "bsend":
                this._onChatroomMsg(i, n);
                break;

              case "sendres":
                this._onChatroomRes(i, n);
                break;

              case "bquit":
                this._onQuitMsg(i, n);
            }
        }
    }, {
        key: "_onJoinMsg",
        value: function(e, t) {
            "joinres" !== e.type && (0, a.acj)(a.ACJ_TYPES.CHATROOM_JOIN_SHOW, t);
        }
    }, {
        key: "_onJoinRes",
        value: function(e, t) {
            this.client._chatroomHeartInterval && clearInterval(this.client._chatroomHeartInterval), 
            this.client._chatroomHeartInterval = setInterval(this.client._heartChatroom, 1e3 * this._keepLiveTime), 
            this.client._heartChatroom(), (0, a.acj)(a.ACJ_TYPES.CHATROOM_JOIN_SHOW, t);
        }
    }, {
        key: "_onJoinBr",
        value: function(e, t) {
            (0, a.acj)(a.ACJ_TYPES.CHATROOM_JOIN_SHOW, t);
        }
    }, {
        key: "_onChatroomMsg",
        value: function(e, t) {
            "sendres" !== e.type && (0, a.acj)(a.ACJ_TYPES.CALL_CHATROOM_DATA_CHAT, t);
        }
    }, {
        key: "_onChatroomRes",
        value: function(e, t) {
            (0, a.acj)(a.ACJ_TYPES.CALL_CHATROOM_DATA_CHAT, t);
        }
    }, {
        key: "_onQuitMsg",
        value: function(e, t) {
            (0, a.acj)(a.ACJ_TYPES.CHATROOM_QUIT_SHOW, t);
        }
    }, {
        key: "pkHandle",
        value: function(e) {
            var t = (0, _.getInt)(e, "cmd"), n = (0, _.getInt)(e, "aclt"), i = (0, _.getInt)(e, "bclt");
            if (2 === t || 9 === t || 12 === t) {
                if (1 === n || 1 === i) return;
                var o = parseInt(1e3 * (3 + 3 * Math.random()), 10);
                setTimeout(function() {}, o);
            }
        }
    }, {
        key: "_userLogin",
        value: function() {
            this._sendmsg(c.default.encode({
                type: "loginreq",
                username: this.client.username,
                password: "1234567890123456",
                roomid: this.client.roomid,
                dfl: this.client.dfl
            }));
        }
    }, {
        key: "_userLogout",
        value: function() {
            this._sendmsg(c.default.encode({
                type: "logout"
            }));
        }
    }, {
        key: "_onShareMsg",
        value: function(e, t, n) {
            n && h.default.set("shareObj", n), n = wx.getStorageSync("shareObj") || {}, e.uid != n.userid && (0, 
            a.acj)(a.ACJ_TYPES.ROOM_DATA_SHARE_SUCCESS_RES, e);
        }
    }, {
        key: "_sendmsg",
        value: function(e) {
            return this.isConnected ? (this.conn.sendmsg(e), f.log("send " + e), !0) : (f.warn("tcp client not connected, send failed : " + e), 
            !1);
        }
    }, {
        key: "_onLoginres",
        value: function(e) {
            f.log("dmlgsuccess"), this.serverId = e.sid, this._keepLiveInterval && clearInterval(this._keepLiveInterval), 
            this._keepLiveInterval = setInterval(this._keepLive, 1e3 * this._keepLiveTime), 
            setTimeout(this.userJoinGroup, 1e3), this.hadLoginRes || (this.hadLoginRes = !0), 
            this.emit(p.LOGIN_SUCCESS);
        }
    }, {
        key: "_keepLive",
        value: function() {
            this._sendmsg(c.default.encode({
                type: "mrkl"
            }));
        }
    }, {
        key: "_onKeepLive",
        value: function() {}
    }, {
        key: "_onServerError",
        value: function() {
            this.close();
        }
    }, {
        key: "_spbc",
        value: function(e, t) {
            void 0 === t && (t = c.default.encode(e));
            var n = (0, _.getInt)(e, "et"), i = (0, _.getInt)(e, "bgl"), o = (0, _.getInt)(e, "es");
            1 !== n ? 1 === o || 2 === o ? 1 !== i && 3 !== i || (0, a.acj)(a.ACJ_TYPES.ROOM_DATA_GIFTBAT1, t) : 101 === o ? 1 !== i && 3 !== i || (0, 
            a.acj)(a.ACJ_TYPES.ROOM_DATA_GIFTBAT1, t) : (0, a.acj)(a.ACJ_TYPES.ROOM_DATA_GIFTBAT1, t) : 1 !== i && 3 !== i || (0, 
            a.acj)(a.ACJ_TYPES.ROOM_DATA_GIFTBAT1, t);
        }
    }, {
        key: "_onNewServerUserEnter",
        value: function(e) {
            (0, a.acj)(a.ACJ_TYPES.ROOM_DATA_NSTIP2, e);
        }
    }, {
        key: "isConnected",
        get: function() {
            return !(!this.conn || !this.conn.isConnected);
        }
    } ]), r;
}();