function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function n(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function o(e, t) {
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
}), exports.Client = exports.ClientEvent = void 0;

var r = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), a = require("./util/logger"), s = require("../../lib/events/events"), c = require("./util/acj"), l = t(require("../flashData")), u = require("./TcpClient"), _ = require("./ClientBarrage"), h = e(require("./util/util")), d = e(require("./TcpConfig")), g = t(require("../../config/index")), v = require("./util/sttUtil"), f = t(require("../../common/storage")), p = getApp(), C = (0, 
a.makeLogger)("Client"), k = exports.ClientEvent = {
    OPEN: "open",
    ERROR: "error"
};

exports.Client = function(e) {
    function t() {
        n(this, t);
        var e = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        return h.bindAll(e), e.conn = null, e.barrage = null, e.serversBarrage = null, e.roomid = "", 
        e.userid = "", e.username = "", e.nickname = "", e.gid = "", e.did = h.getDid(), 
        e.roomgroup = 0, e.pg = 0, e.ip = "", e.port = 0, e.dfl = "", e.wid = "", e._keepLiveInterval = 0, 
        e._chatroomHeartInterval = 0, e._keepLiveTime = 45, e._kd = "", e._closeRoomTimer = 0, 
        e;
    }
    return i(t, s.EventEmitter), r(t, [ {
        key: "connect",
        value: function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            this.ip = e, this.port = t, this.is_appa = n, this.conn = new u.TcpClient("Client"), 
            this.conn.on(u.TcpClientEvent.OPEN, this._onOpen), this.conn.on(u.TcpClientEvent.CLOSE, this._onClose), 
            this.conn.on(u.TcpClientEvent.ERROR, this._onError), this.conn.on(u.TcpClientEvent.MESSAGE, this._onMessage), 
            this.conn.connect(e, t);
        }
    }, {
        key: "connectBarrage",
        value: function() {
            p.globalData.$SYS && p.globalData.$SYS.barrageServer ? (this.barrage && this.barrage.close(), 
            this.barrage = new _.ClientBarrage(this), this.barrage.connect(p.globalData.$SYS.barrageServer), 
            this.barrage.on(_.ClientBarrageEvent.LOGIN_SUCCESS, this.onBarrageLoginSuccess), 
            this.barrage.on(_.ClientBarrageEvent.JOIN_GROUP, this.onBarrageJoinGroup)) : console.warn("no barrage server info");
        }
    }, {
        key: "onBarrageJoinGroup",
        value: function() {
            (0, c.acj)(c.ACJ_TYPES.MROOM_JOIN_GROUP);
        }
    }, {
        key: "onBarrageLoginSuccess",
        value: function() {}
    }, {
        key: "close",
        value: function() {
            clearInterval(this._keepLiveInterval), clearInterval(this._chatroomHeartInterval), 
            this.isConnected && this._userLogout(), this.removeAllListeners(), this.barrage && (this.barrage.close(), 
            this.barrage = null), this.conn && (this.conn.close(), this.conn = null);
        }
    }, {
        key: "_onOpen",
        value: function() {
            (0, c.acj)(c.ACJ_TYPES.CALL_TCP_LOGIN), this.emit(k.OPEN);
        }
    }, {
        key: "_onClose",
        value: function() {
            this.close();
        }
    }, {
        key: "_onError",
        value: function() {
            this.emit(k.ERROR), this.close();
        }
    }, {
        key: "_onMessage",
        value: function(e) {
            var t = l.default.decode(e).too(), n = t.type;
            switch (C.log("网络数据 [" + e + "]"), n) {
              case "loginres":
                this._onLoginres(t, e);
                break;

              case "msgrepeaterproxylist":
                this._onMsgRepeater(t);
                break;

              case "setmsggroup":
                this._onSetGroup(t);
                break;

              case "memberinfores":
                this._onMemberInfo(t, e);
                break;

              case "keeplive":
                this._onKeepLive(t, e);
                break;

              case "h5ckres":
                this._onKeyRes(t);
                break;

              case "initcl":
                (0, c.acj)(c.ACJ_TYPES.ROOM_DATA_CHATINIT, e);
                break;

              case "h5gkcres":
                this._onConfigRes(t);
                break;

              case "chatmsg":
                this._onChatMsg(t, e);
                break;

              case "chatres":
                this._onChatRes(t, e);
                break;

              case "newblackres":
              case "ntmet":
              case "ncrmc":
              case "muteinfo":
                this._onRoomDataSys(e);
                break;

              case "error":
                this._onServerError(t, e);
                break;

              case "bgd":
              case "dgb":
                this._onCurrentRoomGift(t, e);
                break;

              case "dsgr":
                this._onGiveFishBallres(e);
                break;

              case "wechat":
                this._onChatroom(t, e);
                break;

              default:
                (0, c.acj)(c.ACJ_TYPES.CALL_ROOM_DATA_HANDLER, e);
            }
        }
    }, {
        key: "_sendmsg",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {}, o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : function() {};
            return this.isConnected ? (this.conn.sendmsg(e, t, n, o), C.log("send " + e), !0) : (C.warn("tcp client not connected, send failed : " + e), 
            !1);
        }
    }, {
        key: "_chatSendmsg",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {}, n = {};
            n.type = "wechat", n.rid = this.roomid, n.cf = 0, n.content = e, this._sendmsg(l.default.encode(n), t);
        }
    }, {
        key: "_livePK",
        value: function(e) {
            12 === e.cmd ? (0, c.acj)(c.ACJ_TYPES.ROOM_PK_CONNECT, e) : 2 !== e.cmd && 4 !== e.cmd && 6 !== e.cmd && 9 !== e.cmd || (0, 
            c.acj)(c.ACJ_TYPES.ROOM_PK_END, e);
        }
    }, {
        key: "_userLogin",
        value: function(e) {
            var t = l.default.decode(e).too();
            this.roomid = t.roomid, this.dfl = t.dfl || "", t.ct || (t.ct = 0), t.type = "loginreq", 
            t.devid = p.globalData.did, t.rt = h.getUnixTimestamp(), t.pt = 2, t.vk = h.md5(t.rt + "r5*^5;}2#${XF[h+;'./.Q'1;,-]f'p[" + t.devid), 
            t.ver = d.SERVER_VERSION, t.aver = d.VERSION, t.mt = g.default.MT, t.openid = p.globalData.did, 
            t.wcid = g.default.MT, this._sendmsg(l.default.encode(t));
        }
    }, {
        key: "_userLogout",
        value: function() {
            this._sendmsg(l.default.encode({
                type: "logout"
            }));
        }
    }, {
        key: "_userSendmsg",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {}, o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : function() {}, i = l.default.decode(e).too(), r = i.content;
            h.isInBlackword(r) ? (0, c.acj)(c.ACJ_TYPES.ROOM_DATA_SERERR, l.default.encode({
                type: "error",
                code: 60
            })) : (i.type = "chatmessage", i.receiver = (0, v.getInt)(i, "receiver"), i.content = (0, 
            v.getStr)(i, "content").replace(/\\/g, "ㄟ").replace(/ㄟㄟ/g, "ㄟ"), i.scope = (0, v.getStr)(i, "scope"), 
            i.col = (0, v.getInt)(i, "col"), i.pid = (0, v.getStr)(i, "pid"), i.p2p = 0, i.nc = (0, 
            v.getInt)(i, "nc"), i.rev = (0, v.getInt)(i, "rev"), i.hg = (0, v.getInt)(i, "hg"), 
            i.ifs = (0, v.getInt)(i, "ifs"), i.sid = (0, v.getStr)(i, "sid"), i.lid = (0, v.getInt)(i, "lid"), 
            i.dy = (0, v.getStr)(i, "dy") || p.globalData.did, i.cst = new Date().getTime(), 
            this._sendmsg(l.default.encode(i), t, n, o));
        }
    }, {
        key: "_chatroomSendmsg",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {}, o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : function() {};
            this._chatSendmsg(e, t, n, o);
        }
    }, {
        key: "_onLoginres",
        value: function(e, t) {
            this.userid = e.userid, this.username = e.username, this.nickname = e.nickname, 
            this.roomgroup = (0, v.getInt)(e, "roomgroup"), this.pg = (0, v.getInt)(e, "pg");
            var n = {
                userid: e.userid,
                nickname: e.nickname
            };
            f.default.set("shareObj", n);
            var o = 1 === (0, v.getInt)(e, "is_illegal");
            (0, c.acj)(c.ACJ_TYPES.CALL_ROOM_DATA_ILLCHANGE, o), this._keepLiveInterval && clearInterval(this._keepLiveInterval), 
            this._keepLiveInterval = setInterval(this._keepLive, 1e3 * this._keepLiveTime), 
            this._keepLive(), (0, c.acj)(c.ACJ_TYPES.CALL_ROOM_DATA_LOGIN, t);
        }
    }, {
        key: "_onMsgRepeater",
        value: function(e) {
            this.connectBarrage();
        }
    }, {
        key: "_onSetGroup",
        value: function(e) {
            this.gid = e.gid, this.barrage && this.barrage.userJoinGroup();
        }
    }, {
        key: "_keepLive",
        value: function() {
            this._sendmsg(l.default.encode({
                type: "keeplive",
                tick: h.getUnixTimestamp(),
                vbw: 0,
                cdn: "",
                kd: this._kd
            }));
        }
    }, {
        key: "_heartChatroom",
        value: function() {
            this._chatSendmsg(l.default.encode({
                type: "heart",
                wid: this.wid
            }));
        }
    }, {
        key: "_sendKeyResult",
        value: function(e) {
            this._sendmsg(l.default.encode({
                type: "h5cs",
                result: e
            }));
        }
    }, {
        key: "_onKeepLive",
        value: function(e, t) {
            this._kd = "", (0, c.acj)(c.ACJ_TYPES.CALL_ROOM_DATA_USERC, parseInt(e.uc, 10)), 
            (0, c.acj)(c.ACJ_TYPES.ROOM_DATA_TBREDPACKET, t);
        }
    }, {
        key: "_onMemberInfo",
        value: function(e, t) {
            (0, c.acj)(c.ACJ_TYPES.CALL_ROOM_DATA_INFO, t);
        }
    }, {
        key: "_onChatMsg",
        value: function(e, t) {
            "chatres" !== e.type && (0, c.acj)(c.ACJ_TYPES.CALL_ROOM_DATA_CHAT2, t);
        }
    }, {
        key: "_onChatRes",
        value: function(e, t) {
            var n = (0, v.getInt)(e, "res");
            (0, c.acj)(c.ACJ_TYPES.CALL_ROOM_DATA_CHAT2, t), 356 !== n && 288 !== n || this._onChatMsg(e, t);
        }
    }, {
        key: "_onJoinMsg",
        value: function(e, t) {
            "joinres" !== e.type && (0, c.acj)(c.ACJ_TYPES.CHATROOM_JOIN_SHOW, t);
        }
    }, {
        key: "_onJoinRes",
        value: function(e, t) {
            this._chatroomHeartInterval && clearInterval(this._chatroomHeartInterval), this._chatroomHeartInterval = setInterval(this._heartChatroom, 1e3 * this._keepLiveTime), 
            this._heartChatroom(), (0, c.acj)(c.ACJ_TYPES.CHATROOM_JOIN_SHOW, t);
        }
    }, {
        key: "_onJoinBr",
        value: function(e, t) {
            (0, c.acj)(c.ACJ_TYPES.CHATROOM_JOIN_SHOW, t);
        }
    }, {
        key: "_onChatroomMsg",
        value: function(e, t) {
            "sendres" !== e.type && (0, c.acj)(c.ACJ_TYPES.CALL_CHATROOM_DATA_CHAT, t);
        }
    }, {
        key: "_onChatroomRes",
        value: function(e, t) {
            (0, c.acj)(c.ACJ_TYPES.CALL_CHATROOM_DATA_CHAT, t);
        }
    }, {
        key: "_onQuitMsg",
        value: function(e, t) {
            (0, c.acj)(c.ACJ_TYPES.CHATROOM_QUIT_SHOW, t);
        }
    }, {
        key: "_onHeartRes",
        value: function(e, t) {
            (0, c.acj)(c.ACJ_TYPES.CHATROOM_HEART_SHOW, t);
        }
    }, {
        key: "_onChatroom",
        value: function(e, t) {
            var n = e.content, o = l.default.decode(n).too();
            switch (o.type) {
              case "bjoin":
                this._onJoinMsg(o, n);
                break;

              case "joinres":
                this._onJoinRes(o, n);
                break;

              case "brju":
                this._onJoinBr(o, n);
                break;

              case "bsend":
                this._onChatroomMsg(o, n);
                break;

              case "sendres":
                this._onChatroomRes(o, n);
                break;

              case "bquit":
                this._onQuitMsg(o, n);
                break;

              case "heartres":
                this._onHeartRes(o, n);
            }
        }
    }, {
        key: "_requestKey",
        value: function() {}
    }, {
        key: "_ShareSuccess",
        value: function(e) {
            var t = l.default.decode(e).too();
            t.type = "srreq", t.rid = this.roomid, t.exp = "0", this._sendmsg(l.default.encode(t));
        }
    }, {
        key: "_giveGift",
        value: function(e) {
            var t = l.default.decode(e).too();
            t.type = "sgq", this._sendmsg(l.default.encode(t));
        }
    }, {
        key: "_joinChatroom",
        value: function(e) {
            var t = l.default.decode(e).too();
            console.log("加入聊天室", t), this.wid = t.wid, this._chatSendmsg(e);
        }
    }, {
        key: "_quitChatroom",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
            clearInterval(this._chatroomHeartInterval), console.log("退出聊天室", e), this._chatSendmsg(e, t);
        }
    }, {
        key: "_onKeyRes",
        value: function(e) {}
    }, {
        key: "_requestConfig",
        value: function() {}
    }, {
        key: "_onConfigRes",
        value: function(e) {}
    }, {
        key: "_onServerError",
        value: function(e, t) {
            this.close();
            var n = (0, v.getInt)(e, "code");
            205 === n && (0, c.acj)(c.ACJ_TYPES.ROOM_DATA_SERERR, t), (0, c.acj)(c.ACJ_TYPES.ROOM_DATA_FLAERR, n);
        }
    }, {
        key: "_onCurrentRoomGift",
        value: function(e, t) {
            (0, c.acj)(c.ACJ_TYPES.ROOM_DATA_GIFTBAT1, t);
        }
    }, {
        key: "_onRoomDataSys",
        value: function(e) {
            (0, c.acj)(c.ACJ_TYPES.ROOM_DATA_SYS, e);
        }
    }, {
        key: "_onGiveFishBallres",
        value: function(e) {
            (0, c.acj)(c.ACJ_TYPES.ROOM_DATA_GIFTBAT1, e);
        }
    }, {
        key: "isConnected",
        get: function() {
            return !(!this.conn || !this.conn.isConnected);
        }
    } ]), t;
}();