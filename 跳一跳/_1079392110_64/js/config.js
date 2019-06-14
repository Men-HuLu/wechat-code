function E(E) {
    return (_ / r * E).toFixed(2);
}

function e(E) {
    return (_ * (E / r) - _ / 2).toFixed(2);
}

function R(E) {
    return (E / r * -_ + A / 2).toFixed(2);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.SYNC_DEBONCE_TIME = exports.AD_BOARD = exports.USING_PROP = exports.PROP_BOARD = exports.RELAY_SCORE_POS = exports.OBSERVE_SCORE_POS = exports.GAME_SCORE_POS = exports.BASE_TRADE_MARK_RUL = exports.LOCALBLOCK = exports.EVENT = exports.USEMMPAYBASE = exports.USEWANGZHEBASE = exports.SUBVERSION = exports.VERSION = exports.REPORTERTIMEOUT = exports.loader = exports.FRUSTUMSIZE = exports.BLOCK = exports.AUDIO = exports.CAMERA = exports.WAVE = exports.GAME = exports.PARTICLE = exports.BOTTLE = exports.COLORS = exports.FRUSTUMWIDTH = exports.FRUSTUMHEIGHT = exports.DESIGN_HEIGHT = exports.DESIGN_WIDTH = void 0;

var o = function(E) {
    if (E && E.__esModule) return E;
    var e = {};
    if (null != E) for (var R in E) Object.prototype.hasOwnProperty.call(E, R) && (e[R] = E[R]);
    return e.default = E, e;
}(require("./lib/three")), r = exports.DESIGN_WIDTH = 414, t = exports.DESIGN_HEIGHT = 736, A = exports.FRUSTUMHEIGHT = 60, _ = exports.FRUSTUMWIDTH = 33.75, s = (exports.COLORS = {
    red: 13387325,
    pureRed: 16711680,
    white: 14209233,
    brown: 5845806,
    pink: 15964855,
    brownDark: 2300175,
    blue: 40951,
    yellow: 16760320,
    pureWhite: 16777215,
    orange: 16231020,
    orangeDark: 16747520,
    black: 0,
    cream: 16119285,
    green: 2924391,
    lightBlue: 13758190,
    cyan: 9692366,
    yellowBrown: 16764811,
    purple: 9083606
}, exports.BOTTLE = {
    headRadius: .945,
    bodyWidth: 2.34,
    bodyDepth: 2.34,
    bodyHeight: 3.2,
    reduction: .005,
    minScale: .5,
    velocityYIncrement: 15,
    velocityY: 135,
    velocityZIncrement: 70
}), O = (exports.PARTICLE = {
    radius: .3,
    detail: 2
}, exports.GAME = {
    BOTTOMBOUND: -55,
    TOPBOUND: 41,
    gravity: 720,
    touchmoveTolerance: 20,
    LEFTBOUND: -140,
    topTrackZ: -30,
    rightBound: 90,
    HEIGHT: window.innerHeight || 736,
    WIDTH: window.innerWidth || 414,
    canShadow: !0
}), S = (exports.WAVE = {
    innerRadius: 2.2,
    outerRadius: 3,
    thetaSeg: 25
}, exports.CAMERA = {
    fov: 60
}, exports.AUDIO = {
    success: "res/success.mp3",
    perfect: "res/perfect.mp3",
    scale_loop: "res/scale_loop.mp3",
    scale_intro: "res/scale_intro.mp3",
    restart: "res/start.mp3",
    fall: "res/fall.mp3",
    fall_2: "res/fall_2.mp3",
    combo1: "res/combo1.mp3",
    combo2: "res/combo2.mp3",
    combo3: "res/combo3.mp3",
    combo4: "res/combo4.mp3",
    combo5: "res/combo5.mp3",
    combo6: "res/combo6.mp3",
    combo7: "res/combo7.mp3",
    combo8: "res/combo8.mp3",
    icon: "res/icon.mp3",
    pop: "res/pop.mp3",
    sing: "res/sing.mp3",
    store: "res/store.mp3",
    water: "res/water.mp3",
    pay: "res/wechat_pay.mp3",
    luban: "res/luban.mp3",
    relax: "res/relax.mp3"
}, exports.BLOCK = {
    radius: 5,
    width: 10,
    minRadiusScale: .8,
    maxRadiusScale: 1,
    height: 5.5,
    radiusSegments: [ 4, 50 ],
    floatHeight: 0,
    minDistance: 1,
    maxDistance: 17,
    minScale: s.minScale,
    reduction: s.reduction,
    moveDownVelocity: .07,
    fullHeight: 5.5 / 21 * 40
}, exports.FRUSTUMSIZE = O.HEIGHT / O.WIDTH / 736 * 414 * 60);

console.log(S, "FRUSTUMSIZE");

exports.loader = new o.TextureLoader(), exports.REPORTERTIMEOUT = 60001, exports.VERSION = 4, 
exports.SUBVERSION = "4.0.6", exports.USEWANGZHEBASE = 1, exports.USEMMPAYBASE = 1, 
exports.EVENT = {
    RELAYCREATEROOM: "relayCreateRoom",
    JOINRELAYROOM: "JOINRELAYROOM",
    PEOPLECOME: "PEOPLECOME",
    PEOPLEOUT: "PEOPLEOUT",
    RELAYSTART: "RELAYSTART",
    NOWPLAYERJUMP: "NOWPLAYERJUMP",
    CHECKUSER: "CHECKUSER",
    RELAYCHECKUSER: "RELAYCHECKUSER",
    RUNGAME: "RUNGAME",
    ENDGAME: "ENDGAME",
    PLAYERDIED: "PLAYERDIED",
    NOWPLAYEROVER: "NOWPLAYEROVER",
    RECEIVEMINICODE: "RECEIVEMINICODE",
    GOSTARTPAGE: "GOSTARTPAGE",
    GOTOSINGLESTARTPAGE: "GOTOSINGLESTARTPAGE",
    REPLAYAGAIN: "REPLAYAGAIN",
    SYNCMSGSEQ: "SYNCMSGSEQ",
    RELAYMODEDESTROY: "RELAYMODEDESTROY",
    SYNCSCENE: "SYNCSCENE",
    WATCHRELAY: "WATCHRELAY",
    CHECK_GAME: "CHECK_GAME",
    SEND_CHECK_GAME: "SEND_CHECK_GAME",
    PROGRESSOVER: "PROGRESSOVER",
    CHANGEGAMELEVEL: "CHANGEGAMELEVEL",
    RECEIVEGAMELEVELCHANGE: "RECEIVEGAMELEVELCHANGE",
    SHOW_RELAY_GUIDE: "SHOW_RELAY_GUIDE",
    SKIP_RELAY_GUIDE: "SKIP_RELAY_GUIDE",
    CREATE_RELAY_ROOM_FAIL: "CREATE_RELAY_ROOM_FAIL",
    RP_JOIN_RELAY_ROOM_AGAIN: "RP_JOIN_RELAY_ROOM_AGAIN",
    RP_JOIN_RELAY_ROOM: "RP_JOIN_RELAY_ROOM",
    RP_RELAY_START: "RP_RELAY_START",
    ORDERRUNGAME: "ORDERRUNGAME",
    RP_RELAY_GAME_END: "RP_RELAY_GAME_END",
    GETRELAYQR: "GETRELAYQR",
    GETRELAYCHECKUSERERROR: "GETRELAYCHECKUSERERROR",
    INITRESPONSE: "INITRESPONSE",
    TRIGGER_EGG: "TRIGGER_EGG",
    CLOSE_HIGHEST_MODEL: "CLOSE_HIGHEST_MODEL",
    TRIGGER_AD_JUMP: "TRIGGER_AD_JUMP",
    AFTER_SHOWN_START_PAGE: "AFTER_SHOWN_START_PAGE",
    TRIGGER_PROP: "TRIGGER_PROP",
    RECEIVE_REALTIME_MSG: "RECEIVE_REALTIME_MSG",
    SEND_REALTIME_MSG: "SEND_REALTIME_MSG",
    SEND_REALTIME_MSG_TO_CTRL: "SEND_REALTIME_MSG_TO_CTRL",
    JUMP_AD: "JUMP_AD",
    JUMP_AD_GG: "JUMP_AD_GG"
}, exports.LOCALBLOCK = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35 ], 
exports.BASE_TRADE_MARK_RUL = "res/wechat_logo.png", exports.GAME_SCORE_POS = {
    x: -13,
    y: S < 60 ? S / 2 - 9 : 21
}, exports.OBSERVE_SCORE_POS = {
    x: 0,
    y: S < 60 ? ~~(11 * S / 60) : 11
}, exports.RELAY_SCORE_POS = {
    x: -13.8,
    y: S < 60 ? 19 : 26
}, exports.PROP_BOARD = {
    p: function(o) {
        var t = o.designX, s = o.designY, T = o.designH, p = o.desighW, I = e(t), G = R(s) - (S - A) / 2, i = E(p / 2), L = E(p), n = E(T), M = O.WIDTH / r, x = t * M, C = (S / 2 - G) * (O.WIDTH / _);
        return {
            RADIUS: i,
            WIDTH: L,
            HEIGHT: n,
            x: I,
            y: G,
            UI_x: x,
            UI_y: C,
            UI_left: x - p / 2 * M,
            UI_right: x + p / 2 * M,
            UI_top: C - T / 2 * M,
            UI_bottom: C + T / 2 * M
        };
    }({
        designX: 207,
        designY: 694,
        desighW: 45,
        designH: 45
    }),
    skin: {
        s1: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJBaI5ibAEtVLs2DLAVwl4u2xxutYHQRRMiaQVlZdyIWVWSf0IBo797QCiah7lGicrHELRg/0?wx_fmt=png"
    },
    skinTexture: {}
}, exports.USING_PROP = 1, exports.AD_BOARD = function(o) {
    var A = o.designX, _ = o.designY, s = o.designH, S = o.desighW, T = e(A), p = R(_), I = E(S / 2), G = E(S), i = E(s), L = O.WIDTH / r, n = A * L, M = _ * L + (O.HEIGHT - t * L) / 2;
    return {
        RADIUS: I,
        WIDTH: G,
        HEIGHT: i,
        x: T,
        y: p,
        UI_x: n,
        UI_y: M,
        UI_left: n - S / 2 * L,
        UI_right: n + S / 2 * L,
        UI_top: M - s / 2 * L,
        UI_bottom: M + s / 2 * L
    };
}({
    designX: 367,
    designY: 98.126,
    designH: 44,
    desighW: 44
}), exports.SYNC_DEBONCE_TIME = 5e3;