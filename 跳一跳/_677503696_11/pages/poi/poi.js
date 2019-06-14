function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
        return i;
    }
    return Array.from(e);
}

var t = getApp().globalData, i = require("../../utils/cgi.js"), a = require("../../utils/util.js"), o = require("../../utils/card.js"), s = require("../../utils/wx_pay.js"), r = require("../../utils/report.js"), n = 0, p = 0;

Page({
    data: {
        statusBarHeight: t.statusBarHeight,
        platform: t.platform,
        poi: {},
        wxpay_info: {
            qr_key: null,
            promotion_txt: ""
        },
        card_info_list: [],
        videoinfo_list: [],
        showMoreService: !1,
        hasPaySve: !1,
        hasDiscountSve: !1,
        hasMemberSve: !1,
        hasUpdated: !0,
        memberCardIdx: -1,
        discountCardIdx: -1,
        canUseCustomer: t.canUseCustomer || !1,
        clientCustomer: t.clientCustomer || !1,
        specialService: []
    },
    onLoad: function(e) {
        console.log("poi option", e), t.session_id = "";
        var i = e.poiid, o = e.appid, s = e.storeid, r = e.username;
        t.storeAppid = o, this.data.storeid = parseInt(s), this.fetchInfo(i, o), this.data.customerInfo = {
            appId: o,
            userName: r,
            headimgUrl: "",
            title: "",
            subTitle: ""
        }, this.setData({
            appid: o
        }), n = a.getNow();
    },
    onUnload: function() {
        p = a.getNow(), r.report({
            reportType: 5,
            type: "poi",
            poi_id: this.data.poi.poi_id,
            time: p - n
        });
    },
    onShow: function() {
        t.curPage = this.route, s.initWxPay({
            poi_id: this.data.storeid
        }, this), o.getAndShowCard({
            poi_id: this.data.storeid
        }, this);
    },
    openCustomer: function(e) {
        r.report({
            reportType: 2,
            customer: [ {
                appid: this.data.appid,
                type: this.data.poi.poi_type,
                poi_id: this.data.storeid,
                has_service: this.data.hasService
            } ]
        });
        var t = this.data.customerInfo;
        i.enterContact(t);
    },
    handleClickWxpay: function(e) {
        s.clickWxpay({
            e: e
        }, this), i.getKey().then(function(e) {
            var a = e.uin, o = e.passkey, s = e.pass_ticket, r = t.storeAppid;
            i.insertHistory(a, o, s, r);
        });
        var a = {};
        this.data.specialService.forEach(function(e) {
            "买单" == e.name && (a = e);
        }), this.reportService(2, [ a ]);
    },
    handleClickCard: function(e) {
        i.getKey().then(function(e) {
            var a = e.uin, o = e.passkey, s = e.pass_ticket, r = t.storeAppid;
            i.insertHistory(a, o, s, r);
        }), o.clickCard({
            e: e
        }, this);
        var a = {}, s = e.currentTarget.dataset.name;
        this.data.specialService.forEach(function(e) {
            e.name == s && (a = e);
        }), this.reportService(2, [ a ]);
    },
    fetchInfo: function(e, o) {
        var s = this;
        i.getKey().then(function(a) {
            var s = a.uin, r = a.passkey, n = a.pass_ticket, p = {
                appid: o,
                poi_id: e,
                longitude: t.location.coordinate.lng,
                latitude: t.location.coordinate.lat
            };
            return i.getPoiDetail(s, r, n, p);
        }).then(function(e) {
            if (0 == e.errcode) {
                console.log("get poi detail success");
                var t = e.poi_detail;
                r.reportPOI({
                    poi_page: {
                        poi_id: t.poi_id,
                        appid: o,
                        type: e.basic_info.type,
                        action: "expose",
                        has_service: t.service_infos.length > 0 ? 1 : 0
                    }
                }), s.showInfo(e);
            } else a.showToast("获取POI信息失败");
        });
    },
    showMoreService: function() {
        this.setData({
            showMoreService: !this.data.showMoreService
        }), this.reportService(1, this.data.poi.service_down.slice(2));
    },
    showInfo: function(i) {
        var o = this, s = i.poi_detail, n = s.service_infos, p = i.basic_info.type;
        if (s.is_comm_nearby || 2 != p) {
            for (var d = this.data.videoinfo_list = s.vid_list || [], c = 0; c < d.length; c++) this.changeVideo(d[c].vid, d[c].ckey, c);
            var h = [], l = [], u = [], v = [];
            n.forEach(function(e) {
                e.logo = 1 == e.type ? e.icon_url : "", 1 == e.type ? h.push(e) : l.push(e);
            }), this.data.hasService = n.length > 0 ? 1 : 0, 2 == p ? (u = h.slice(0, 3), v = [].concat(e(h.slice(3)), l)) : (u = h = h.filter(function(e) {
                var t = parseInt(e.id);
                switch (t) {
                  case 7:
                    o.data.hasDiscountSve = !0;
                    break;

                  case 9:
                    o.data.hasMemberSve = !0;
                    break;

                  case 10:
                    o.data.hasPaySve = !0;
                }
                return -1 == [ 7, 9, 10 ].indexOf(t) || (o.data.specialService.push(e), !1);
            }), v = l);
            var f = s.store_photo_list, _ = {
                poi_id: s.poi_id,
                poi_type: p,
                logo: i.basic_info.headimg,
                store_name: s.store_name || i.basic_info.name,
                address: s.address,
                distance: a.formatDistance(s.distance),
                phone: s.contract_phone,
                open_time: s.hour,
                store_photo_list: f,
                location: {
                    longitude: s.longitude,
                    latitude: s.latitude
                },
                customer: s.customer || {},
                service_top: u,
                service_down: v
            };
            Object.assign(this.data.customerInfo, {
                headimgUrl: _.customer.avatar,
                title: i.basic_info.name
            }), this.setData({
                poi: _,
                showMoreService: v.length > 2,
                hasDiscountSve: this.data.hasDiscountSve,
                hasMemberSve: this.data.hasMemberSve,
                hasPaySve: this.data.hasPaySve
            });
            var m = !1;
            _.customer.avatar && (1 == _.poi_type && t.canUseCustomer && (m = !0), 2 == _.poi_type && t.canUseCustomer && t.clientCustomer && (m = !0)), 
            m && r.report({
                reportType: 1,
                customer: [ {
                    appid: this.data.appid,
                    type: _.poi_type,
                    poi_id: this.data.storeid,
                    has_service: this.data.hasService
                } ]
            });
            var g = [].concat(e(this.data.specialService), e(_.service_top), e(_.service_down.slice(0, 2)));
            this.reportService(1, g);
        } else this.setData({
            poi: {
                logo: i.basic_info.headimg,
                store_name: s.store_name || i.basic_info.name,
                address: s.address,
                distance: a.formatDistance(s.distance),
                location: {
                    longitude: s.longitude,
                    latitude: s.latitude
                }
            },
            hasUpdated: !1
        });
    },
    previewImg: function(e) {
        var t = e.target.dataset.src;
        wx.previewImage({
            urls: this.data.poi.store_photo_list,
            current: t
        });
    },
    makeCall: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.poi.phone
        });
    },
    openMap: function() {
        var e = this.data.poi;
        wx.openLocation({
            latitude: e.location.latitude,
            longitude: e.location.longitude,
            scale: 15,
            name: e.store_name,
            address: e.address
        });
    },
    changeVideo: function(e, t, a) {
        var o = this;
        i.post({
            url: "https://h5vv.video.qq.com/getvinfo?vid=" + e + "&dtype=1&otype=json&callback=video_dynamic_callback&appVer=1&encryptVer=6.3&platform=61001&cKey=" + encodeURIComponent(t),
            success: function(t) {
                t = t.data;
                var i = o.data.videoinfo_list;
                if (t && (t = String(t).substring(23, t.length - 1), (t = JSON.parse(t)).vl)) {
                    var s = t.vl.vi[0], r = s.ul.ui[0], n = r.url + s.fn, p = [ n, -1 != n.indexOf("?") ? "&" : "?", "vkey=", s.fvkey, "&type=", 1 == r.dt ? "tflv" : 2 == r.dt || 0 == r.dt ? "mp4" : "", "&level=", s.level, "&br=", s.br, "&sp=", s.sp ].join(""), d = s.vw, c = s.vh;
                    i[a].src = p, i[a].poster = "https://shp.qpic.cn/qqvideo_ori/0/" + e + "_496_280/0", 
                    wx.getNetworkType({
                        complete: function(e) {
                            var t = (e = e || {}).networkType, a = !1, s = !1;
                            wx.getSystemInfo({
                                complete: function(e) {
                                    var r = e.version.split("."), n = !1;
                                    r && (r[0] = parseInt(r[0] || 0), r[1] = parseInt(r[1] || 0), r[2] = parseInt(r[2] || 0), 
                                    r[0] > 6 ? n = !0 : 6 === r[0] && r[1] > 5 ? n = !0 : 6 === r[0] && 5 === r[1] && r[2] >= 12 && (n = !0)), 
                                    "wifi" == t && n && (a = !0, s = !0);
                                    var p = e.windowWidth - 40, h = c * p / d;
                                    h > p && (h = p), o.setData({
                                        videoinfo_list: i,
                                        videoAutoPlay: a,
                                        videoMuted: s,
                                        videoControlls: !0,
                                        videoHeight: "height:" + h + "px;"
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    },
    videoError: function(e) {
        console.log("视频播放出错");
    },
    clickMute: function() {
        this.setData({
            videoMuted: !this.data.videoMuted
        });
    },
    navigateToApp: function(e) {
        var t = e.currentTarget.dataset, i = t.idx, a = t.pos, o = t.appid, s = t.path, r = {};
        "top" == a ? r = this.data.poi.service_top[i] : "down" == a && (r = this.data.poi.service_down[i]), 
        this.reportService(2, [ r ]), wx.navigateToMiniProgram({
            appId: o,
            path: s,
            scene: 1026
        });
    },
    reportAppTap: function(e) {
        var t = e.currentTarget.dataset, i = {
            id: 1e3,
            name: "not updated app",
            type: 1,
            logo: "",
            appid: this.data.appid
        };
        this.reportService(2, [ i ]), wx.navigateToMiniProgram({
            appId: t.appid,
            scene: 1026
        });
    },
    reportService: function(e, t) {
        r.report({
            reportType: e,
            serviceExtra: {
                appid: this.data.appid,
                type: this.data.poi.poi_type,
                poi_id: this.data.poi.poi_id
            },
            service: t
        });
    }
});