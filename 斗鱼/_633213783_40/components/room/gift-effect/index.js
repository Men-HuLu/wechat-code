var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../common/util")), e = getApp();

Component({
    properties: {
        giftList: {
            type: Array,
            value: []
        }
    },
    data: {
        shouldEffectHide: !1,
        effectShow: !0
    },
    methods: {
        endAnima: function() {
            this.setData({
                effectShow: !0
            });
        },
        startRocket: function() {
            this.setData({
                shouldEffectHide: !1
            });
        },
        stopRocket: function() {
            this.setData({
                shouldEffectHide: !0
            });
        },
        listenToEvent: function() {
            var t = this;
            e.events.addListener("room_data_giftbat1", function(e) {
                if (!t.data.shouldEffectHide && "dgb" === e.type) {
                    var i = t.getGiftConfig(e.gfid);
                    if (!i.bimg) return;
                    t.addBanner({
                        bannerID: e.uid + "_" + e.gfid,
                        bannerBg: i.bimg,
                        userIcon: t.getAvatarUrl() + "/upload/" + e.ic + "_middle.jpg",
                        userName: e.nn,
                        giftName: i.name,
                        giftSmPic: i.mobile_icon_v2 || "../../../assets/room/defaultgift.png",
                        contribution: i.devote,
                        expireTime: +new Date() + (i.stay_time || 0) + 300,
                        giftNum: e.hits || 1,
                        giftType: i.ef,
                        giftBigPic: i.big_effect_icon
                    });
                }
            });
        },
        addBanner: function(i) {
            var n = this;
            e.emit([ "gift:banner", i ]), 1 == i.giftType || 101 == i.giftType ? this.startAnima(function() {
                t.default.broadcast(n.all, "startRocket", {
                    num: i.giftNum,
                    pic: i.giftBigPic
                });
            }) : 2 == i.giftType && this.startAnima(function() {
                t.default.broadcast(n.all, "startPlane", {
                    num: i.giftNum,
                    pic: i.giftBigPic
                });
            });
        },
        getGiftConfig: function(t) {
            return this.data.giftList.find(function(e) {
                return e.id == t;
            }) || {};
        },
        getAvatarUrl: function() {
            var t = e.globalData.$SYS.baseServer || "https://apic.douyucdn.cn", i = t.length;
            return "/" === t.charAt(i - 1) && (t = t.substring(0, i - 1)), t;
        },
        startAnima: function(t) {
            this.data.effectShow ? this.setData({
                effectShow: !1
            }, t) : t();
        }
    },
    behaviors: [],
    created: function() {},
    attached: function() {},
    ready: function() {
        this.all = this.selectAllComponents(".component");
    },
    moved: function() {},
    detached: function() {}
});