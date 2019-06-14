Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _ = void 0, e = void 0;

(function(_) {
    if (_ && _.__esModule) return _;
    var e = {};
    if (null != _) for (var i in _) Object.prototype.hasOwnProperty.call(_, i) && (e[i] = _[i]);
    return e.default = _, e;
})(require("../common/tcp/util/logger")).setEnable(!1), _ = "https://wxapp.douyucdn.cn", 
e = {
    gateServer: "wx.douyucdn.cn",
    barrageServer: "wxdm.douyucdn.cn",
    dotServer: "https://dotcounter.douyucdn.cn/deliver/fish2"
}, exports.default = {
    HOST: _,
    DEV_ENV: "pro",
    DEFAULT_SYS: e,
    API: {
        ACTIVITY_LIST: _ + "/api/activity/list",
        DYCONFIG: _ + "/api/home/getConfig",
        HOMEINDEX: _ + "/api/home/index",
        HOMEMIX: _ + "/api/home/mix",
        MIXLIST: _ + "/api/room/mixList",
        LOGIN: _ + "/Wxapi/Auth/loginWithOid",
        ROOMINFO: _ + "/Live/Room/info/",
        LIVESTREAM: _ + "/Livenc/Getplayer/newRoomPlayer",
        GETCATALOGDATA: _ + "/api/cate/list",
        GETRECLIST: _ + "/api/cate/recList",
        GETCATALOGLISTDATA: _ + "/api/room/list",
        ROOM_GIFT_INFO: _ + "/api/giftnc/getGifts",
        SEND_GIFT_REQ: _ + "/api/giftnc/send",
        VIDEO_HOME: _ + "/api/video/getHomeVideo",
        VIDEO_SROUCE: _ + "/Videonc/Stream/getAppPlayer",
        VIDEO_INFO: _ + "/api/video/getVideoInfo",
        VIDEO_HIS_BARRAGE: _ + "/api/video/getHisBarrage",
        VIDEO_REC_LIST: _ + "/api/video/getRecVideoList",
        VIDEO_COMMENT: _ + "/video/Comment/getComment",
        USER_INFO: _ + "/api/usernc/info",
        GET_CARD_EXT: _ + "/wxapi/Coupon/sendFreeCard",
        CARD_STATUS: _ + "/wxapi/Coupon/cardStatus",
        CARD_LIST: _ + "/wxapi/coupon/cardList",
        REPORT_FORMID: _ + "/api/pushnc/report",
        TREASURE_GET_YUWAN: _ + "/api/invnc/getReward",
        TREASURE_BULLET: _ + "/live/paomadeng/rewList",
        TREASURE_HELP: _ + "/api/invnc/actDetail",
        TREASURE_HELPINFO: _ + "/api/invnc/supportList",
        TREASURE_SUPPORT: _ + "/api/invnc/support",
        ROOM_CLOSE_INFO: _ + "/api/room/closeRec",
        RESOURCE_POPUP: _ + "/api/resource/popup",
        CREATE_CHATROOM: _ + "/api/invnc/createWRoom"
    },
    CT: 26,
    MT: 1,
    APPID: "wxca1e7ba3fe18ff12",
    DES: {
        NETWORK_BREAK: "网络断开，请检查网络",
        NETWORK_UNWIFI: "您正在使用非Wi-Fi网络"
    },
    Point: {
        INIT_PAGE_HOME: "init_page_home",
        INIT_PAGE_LIVE: "init_page_live",
        INIT_PAGE_STUDIO_L: "init_page_studio_l",
        INIT_PAGE_STUDIO_P: "init_page_studio_p",
        PAGE_HOME: "page_home",
        PAGE_LIVE: "page_live",
        PAGE_STUDIO_L: "page_studio_l",
        PAGE_STUDIO_P: "page_studio_p",
        CLICK_MSG_SEND: "click_msg_send",
        INIT_PAGE_ACT_PNEW: "init_page_act_pnew",
        CLICK_ACT_GET: "click_act_get",
        INIT_PAGE_ACT: "init_page_act",
        CLICK_ACT_TAB: "click_act_tab",
        PAGE_ACT_PNEW: "page_act_pnew",
        PAGE_ACT: "page_act",
        SHOW_HOME_POPUP: "show_home_popup",
        CLICK_HOME_POPUP: "click_home_popup",
        SHOW_EXIT_POPUP: "show_exit_popup",
        CLICK_EXIT_POPUP: "click_exit_popup",
        SHOW_ROOM_STICKER: "show_room_sticker",
        CLICK_ROOM_STICKER: "click_room_sticker",
        CLICK_CHATROOM_CREATE: "click_chatroom_create",
        CLICK_CHATROOM_SHARE: "click_chatroom_share",
        CLICK_CHATROOM_FORWARD: "click_chatroom_forward"
    }
};