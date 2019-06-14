function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, o = Array(t.length); e < t.length; e++) o[e] = t[e];
        return o;
    }
    return Array.from(t);
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, o = getApp().globalData, i = require("../../utils/util.js"), a = require("../../utils/cgi.js"), n = require("../../utils/report.js"), r = [ "外送", "快递", "充电", "预约", "挂号" ], c = [ "购物", "出行", "美食", "酒店" ], s = 1, l = 0, u = 0, g = 0, d = 0;

Page({
    data: {
        statusBarHeight: o.statusBarHeight,
        platform: o.platform,
        location: {},
        list: [],
        services: [],
        categories: [],
        totalCategories: [],
        showAllServices: !1,
        loading: !0,
        canUseCustomer: o.canUseCustomer || !1,
        clientCustomer: o.clientCustomer || !1,
        scrollTop: 0
    },
    onLoad: function(t) {
        g = i.getNow(), this.setData({
            loading: !0
        });
        var a = i.getStorageSync("location");
        a && this.setData({
            location: a
        });
        var n = i.getStorageSync("index_data");
        "object" == (void 0 === n ? "undefined" : e(n)) && (o.data = n, this.setData({
            list: n.list,
            services: n.services,
            categories: n.categories,
            totalCategories: n.totalCategories
        }));
        var r = this, c = t.location || "";
        c || i.showToast("location缺失"), r.fetchList(c, function(t) {
            var e = {
                lat: t.latitude,
                lng: t.longitude
            };
            r.getLocation(e);
        });
    },
    onShow: function() {
        o.curPage = this.route, l = i.getNow(), o.changedLocation && (o.changedLocation = !1, 
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 500
        }), this.fetchList(), this.setData({
            location: JSON.parse(JSON.stringify(o.location))
        }));
    },
    fetchList: function(t, e) {
        var n = this;
        a.getKey().then(function(e) {
            var i = e.uin, n = e.passkey, r = e.pass_ticket;
            o.ticket = {
                uin: e.uin,
                passkey: e.passkey,
                pass_ticket: e.pass_ticket
            };
            var c = {};
            return c = t ? {
                location: t,
                page: 0,
                num: 100
            } : {
                longitude: o.location.coordinate.lng,
                latitude: o.location.coordinate.lat,
                page: 0,
                num: 100
            }, a.getPoiList(i, n, r, c);
        }).then(function(t) {
            if (0 == t.errcode) {
                o.location.coordinate = {
                    lat: t.latitude,
                    lng: t.longitude
                };
                var a = t.poi_list;
                n.loadMoreList(), n.getServices(a), "function" == typeof e && e(t);
            } else i.showToast("获取附近的小程序失败");
        });
    },
    loadMoreList: function() {
        var e = o.ticket, n = e.uin, r = e.passkey, c = e.pass_ticket, s = {
            longitude: o.location.coordinate.lng,
            latitude: o.location.coordinate.lat,
            page: 1,
            num: 100
        };
        a.getPoiList(n, r, c, s).then(function(e) {
            if (0 == e.errcode) {
                var a = e.poi_list;
                a.forEach(function(t) {
                    var e = [];
                    t.service_infos.forEach(function(t) {
                        1 == t.type && e.push(t.name);
                    }), t.serviceTags = e;
                    var o = "";
                    t.category_tags.forEach(function(t) {
                        2 == t.level && (o = t.name);
                    }), o || 2 != t.type || (o = t.old_category_tag), t.subCategory = o, t.distance = i.formatDistance(t.distance);
                }), o.data.list = [].concat(t(o.data.list), t(a)), "function" == typeof cb && cb(e);
            } else i.showToast("获取附近的小程序失败");
        });
    },
    getServices: function(e) {
        var a = this, l = new Map(), u = new Map();
        e.forEach(function(t) {
            var e = [];
            t.service_infos.forEach(function(t) {
                if (1 == t.type) {
                    var o = l.has(t.name) && l.get(t.name).count || 0;
                    l.set(t.name, {
                        count: o + 1,
                        logo: t.icon_url,
                        id: t.id
                    }), e.push(t.name);
                }
            }), t.serviceTags = e;
            var o = "";
            t.category_tags.forEach(function(e) {
                if (1 == e.level) {
                    var i = u.has(e.name) && u.get(e.name).count || 0;
                    u.set(e.name, {
                        count: i + 1,
                        logo: e.icon_url,
                        id: e.id
                    }), t.category = e.name;
                } else 2 == e.level && (o = e.name);
            }), o || 2 != t.type || (o = t.old_category_tag), t.subCategory = o, t.distance = i.formatDistance(t.distance);
        });
        var g = r.map(function(t) {
            if (l.has(t)) {
                var e = l.get(t);
                return {
                    name: t,
                    count: e.count,
                    logo: e.logo,
                    id: e.id
                };
            }
            return {
                name: t,
                count: -1
            };
        }).filter(function(t) {
            return t.count > 0;
        });
        g.sort(function(t, e) {
            return e.count - t.count;
        });
        var d = c.map(function(t) {
            if (u.has(t)) {
                var e = u.get(t);
                return {
                    name: t,
                    count: e.count,
                    logo: e.logo,
                    id: e.id
                };
            }
            return {
                name: t,
                count: -1
            };
        }).filter(function(t) {
            return t.count > 0;
        });
        d.sort(function(t, e) {
            return e.count - t.count;
        }), c.forEach(function(t) {
            return u.delete(t);
        });
        var p = [].concat(t(d)), f = [].concat(t(u));
        f.sort(function(t, e) {
            return e[1].count - t[1].count;
        }), f.forEach(function(t) {
            var e = t[1], o = e.count, i = e.logo, a = e.id;
            p.push({
                name: t[0],
                count: o,
                logo: i,
                id: a
            });
        });
        var h = 9 - (g.length + d.length);
        g.length + p.length == 10 && (h = p.length), f.slice(0, h).forEach(function(t) {
            var e = t[1], o = e.count, i = e.logo, a = e.id;
            d.push({
                name: t[0],
                count: o,
                logo: i,
                id: a
            });
        });
        var v = {
            list: e.slice(0, 30 * s),
            services: g,
            categories: d,
            totalCategories: p,
            loading: !1
        };
        setTimeout(function() {
            a._setData(v).then(function() {
                return a.getBoundingClientRect(".poi-item", "all");
            }).then(function(t) {
                t.forEach(function(t, e) {
                    a.data.list[e].top = t.top;
                }), a.checkAndReportExposed();
            });
        }, 1e3), o.data = {
            list: e,
            services: g,
            categories: d,
            totalCategories: p
        }, i.setStorageSync("index_data", v);
        var m = g.map(function(t) {
            return {
                id: t.id,
                name: t.name,
                logo: t.logo,
                type: 1
            };
        }), y = d.map(function(t) {
            return {
                id: t.id,
                name: t.name,
                logo: t.logo,
                level: 1
            };
        });
        n.reportIndex(), n.report({
            reportType: 1,
            service: m,
            category: y
        });
    },
    getLocation: function(t) {
        if ("object" == (void 0 === t ? "undefined" : e(t))) {
            var a = this;
            o.qqmapsdk.reverseGeocoder({
                get_poi: 1,
                location: {
                    latitude: t.lat,
                    longitude: t.lng
                },
                success: function(t) {
                    if (0 == t.status) {
                        var e = t.result.ad_info.city;
                        if (0 == t.result.poi_count) return void i.showToast("无法获取POI位置");
                        var n = t.result.pois[0];
                        o.location = {
                            city: e,
                            address: n.title,
                            coordinate: {
                                lat: n.location.lat,
                                lng: n.location.lng
                            }
                        }, o.curLocation = i.copy(o.location), a.setData({
                            location: Object.assign({}, o.location)
                        }), i.setStorageSync("location", o.location);
                    } else i.showToast("定位失败"), console.log("reverseGeocoder fail", t);
                },
                fail: function(t) {
                    i.showToast("定位失败"), console.log("reverseGeocoder fail", t);
                }
            });
        }
    },
    showAllService: function() {
        var t = this.data, e = t.totalCategories.slice(t.categories.length).map(function(t) {
            return {
                id: t.id,
                name: t.name,
                logo: t.logo,
                level: 1
            };
        });
        n.report({
            reportType: 1,
            category: e
        }), this.setData({
            title: "全部分类",
            showAllServices: !0
        });
    },
    hideAllService: function() {
        this.setData({
            title: "",
            showAllServices: !1
        });
    },
    onReachBottom: function(t) {
        var e = this;
        this.data.list.length != o.data.list.length && (s++, this._setData({
            list: o.data.list.slice(0, 30 * s)
        }).then(function() {
            return e.getBoundingClientRect(".poi-item", "all");
        }).then(function(t) {
            t.forEach(function(t, o) {
                e.data.list[o].top = t.top;
            });
        }));
    },
    openCustomer: function(t) {
        var e = t.currentTarget.dataset.idx, o = this.data.list[e];
        n.report({
            reportType: 2,
            customer: [ {
                appid: o.appid,
                type: o.type,
                poi_id: o.sotre_id,
                has_service: o.service_infos.length > 0 ? 1 : 0
            } ]
        }), a.enterContact({
            appId: o.appid,
            userName: o.username,
            headimgUrl: o.customer.avatar,
            title: o.nickname
        });
    },
    goPoi: function(t) {
        var e = t.currentTarget.dataset.idx, o = this.data.list[e];
        n.reportPOI({
            poi_page: {
                poi_id: o.store_id || o.poi_id,
                appid: o.appid,
                type: o.type,
                action: "click",
                has_service: o.service_infos.length > 0 ? 1 : 0
            }
        }), wx.navigateTo({
            url: "../poi/poi?appid=" + o.appid + "&poiid=" + o.poi_id + "&storeid=" + o.store_id + "&username=" + o.username
        });
    },
    goAddr: function() {
        wx.navigateTo({
            url: "../addr/addr"
        });
    },
    reportService: function(t) {
        var e = t.currentTarget.dataset.idx, o = this.data.services[e], a = o.id, r = o.name, c = o.logo;
        n.report({
            reportType: 2,
            service: [ {
                id: a,
                name: r,
                logo: c,
                type: 1
            } ]
        }), u = i.getNow(), n.report({
            reportType: 5,
            type: "selection",
            time: u - l,
            service: o
        }), wx.navigateTo({
            url: "/pages/list/list?serviceName=" + r + "&serviceId=" + a
        });
    },
    reportCategory: function(t) {
        var e = t.currentTarget.dataset.idx, o = this.data.totalCategories[e], a = o.id, r = o.name, c = o.logo;
        n.report({
            reportType: 2,
            category: [ {
                id: a,
                name: r,
                logo: c,
                level: 1
            } ]
        }), u = i.getNow(), n.report({
            reportType: 5,
            type: "selection",
            time: u - l,
            category: o
        }), wx.navigateTo({
            url: "/pages/list/list?categoryName=" + r + "&categoryId=" + a
        });
    },
    onPageScroll: function(t) {
        this.data.scrollTop = t.scrollTop, this.checkAndReportExposed();
    },
    checkAndReportExposed: function() {
        var t = this, e = o.windowHeight;
        this.data.list.forEach(function(o, i) {
            o.top - t.data.scrollTop < e && !o.exposed && (o.exposed = !0, n.reportAppExposed(o));
        });
    },
    getBoundingClientRect: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "single";
        return new Promise(function(o, i) {
            var a = wx.createSelectorQuery();
            ("single" === e ? a.select(t) : a.selectAll(t)).boundingClientRect(function(t) {
                return o(t);
            }).exec();
        });
    },
    _setData: function(t) {
        var e = this;
        return new Promise(function(o, i) {
            e.setData(t, function() {
                o();
            });
        });
    },
    exit: function() {
        d = i.getNow(), n.report({
            reportType: 5,
            time: d - g
        }), wx.navigateBackMiniProgram({});
    }
});