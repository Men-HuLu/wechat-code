function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var e = getApp().globalData, a = require("../../utils/util.js"), i = require("../../utils/report.js"), r = require("../../utils/cgi.js");

Page({
    data: {
        statusBarHeight: e.statusBarHeight,
        platform: e.platform,
        title: "",
        list: [],
        backList: [],
        backCateList: [],
        services: [],
        subCategories: [],
        selectedCategory: 0,
        selectedServices: [],
        showSubCateArrow: !1,
        showAllSubCategories: !1,
        showAllServices: !1,
        canUseCustomer: e.canUseCustomer || !1,
        clientCustomer: e.clientCustomer || !1,
        scrollTop: 0
    },
    onLoad: function(t) {
        console.log("go list option", t), this.fetchList(t), this.data.from = {
            service: t.serviceName || "",
            category: t.categoryName || ""
        }, this.setData({
            title: t.serviceName || t.categoryName
        });
    },
    onShow: function() {
        e.curPage = this.route;
    },
    computeSubCateWidth: function() {
        var t = this;
        wx.createSelectorQuery().select(".tab-list__inner").boundingClientRect(function(a) {
            var i = a.width;
            t.setData({
                showSubCateArrow: i >= e.screenWidth
            });
        }).exec();
    },
    fetchList: function(t) {
        var i = this, o = e.ticket, s = o.uin, n = o.passkey, c = o.pass_ticket, u = {
            longitude: e.location.coordinate.lng,
            latitude: e.location.coordinate.lat,
            service_tag_id: t.serviceName ? t.serviceId : "",
            category_tag_id: t.categoryName ? t.categoryId : "",
            page: 0,
            num: 50
        };
        r.getPoiList(s, n, c, u).then(function(t) {
            if (0 == t.errcode) {
                var e = t.poi_list;
                i.getServices(e), i._setData({
                    list: e,
                    backList: e,
                    backCateList: e
                }).then(function() {
                    return i.getBoundingClientRect(".poi-item", "all");
                }).then(function(t) {
                    t.forEach(function(t, e) {
                        i.data.list[e].top = t.top;
                    }), i.checkAndReportExposed();
                });
            } else a.showToast("获取附近的小程序失败");
        });
    },
    getServices: function(t) {
        var e = this, r = new Map(), o = new Map();
        t.forEach(function(t) {
            var e = [];
            t.service_infos.forEach(function(t) {
                if (1 == t.type) {
                    var a = r.has(t.name) && r.get(t.name) || 0;
                    r.set(t.name, a + 1), e.push(t.name);
                }
            }), t.serviceTags = e;
            var i = "";
            t.category_tags.forEach(function(t) {
                if (2 == t.level) {
                    var e = o.has(t.name) && o.get(t.name) || 0;
                    o.set(t.name, e + 1), i = t.name;
                }
            }), i || 2 != t.type || (i = t.old_category_tag), t.subCategory = i, t.distance = a.formatDistance(t.distance);
        });
        var s = this.sortMap(r), n = s.map(function(t) {
            return !1;
        }), c = this.sortMap(o);
        c.unshift("全部");
        var u = -1, l = "";
        c.forEach(function(t, e) {
            t.indexOf("其它") >= 0 && (u = e, l = t);
        }), u >= 0 && (c.splice(u, 1), c.push(l)), c = c.filter(function(t) {
            return !!t;
        }), this._setData({
            services: s,
            subCategories: c,
            selectedServices: n,
            showAllServices: s.length > 12
        }).then(function() {
            e.computeSubCateWidth();
        }), i.report({
            reportType: 1,
            list_page: {
                from: this.data.from,
                service: s.slice(),
                category: c.slice()
            }
        });
    },
    sortMap: function(e) {
        var a = [].concat(t(e));
        a.sort(function(t, e) {
            return e[1].count - t[1].count;
        });
        var i = [];
        return a.forEach(function(t) {
            return i.push(t[0]);
        }), i;
    },
    toggleCategories: function() {
        this.setData({
            showAllSubCategories: !this.data.showAllSubCategories
        });
    },
    changeCategory: function(t) {
        var e = this, a = t.target.dataset.idx, r = this.data.subCategories[a];
        if (i.report({
            reportType: 2,
            from: this.data.from,
            category: [ r ]
        }), a != this.data.selectedCategory) {
            var o = [];
            0 == a ? o = this.data.backList : this.data.backList.forEach(function(t) {
                t.category_tags.forEach(function(e) {
                    2 == e.level && e.name == r && o.push(t);
                });
            });
            var s = new Map();
            o.forEach(function(t) {
                t.service_infos.forEach(function(t) {
                    if (1 == t.type) {
                        var e = s.has(t.name) && s.get(t.name) || 0;
                        s.set(t.name, e + 1);
                    }
                });
            });
            var n = this.sortMap(s), c = n.map(function(t) {
                return !1;
            });
            this._setData({
                services: n,
                selectedCategory: a,
                list: o,
                backCateList: o,
                selectedServices: c,
                showAllSubCategories: !1
            }).then(function() {
                return e.getBoundingClientRect(".poi-item", "all");
            }).then(function(t) {
                t.forEach(function(t, a) {
                    e.data.list[a].top = t.top;
                }), e.checkAndReportExposed();
            });
        }
    },
    changeService: function(t) {
        var e = this, a = t.target.dataset.idx, r = this.data.selectedServices;
        r[a] = !r[a], i.report({
            reportType: 2,
            from: this.data.from,
            service: [ this.data.services[a] ]
        });
        var o = [], s = [];
        r.forEach(function(t, a) {
            t && o.push(e.data.services[a]);
        }), this.data.backCateList.forEach(function(t) {
            var e = t.serviceTags, a = !0, i = !0, r = !1, n = void 0;
            try {
                for (var c, u = o[Symbol.iterator](); !(i = (c = u.next()).done); i = !0) {
                    var l = c.value;
                    if (-1 == e.indexOf(l)) {
                        a = !1;
                        break;
                    }
                }
            } catch (t) {
                r = !0, n = t;
            } finally {
                try {
                    !i && u.return && u.return();
                } finally {
                    if (r) throw n;
                }
            }
            a && s.push(t);
        }), this._setData({
            selectedServices: r,
            list: s
        }).then(function() {
            return e.getBoundingClientRect(".poi-item", "all");
        }).then(function(t) {
            t.forEach(function(t, a) {
                e.data.list[a].top = t.top;
            }), e.checkAndReportExposed();
        });
    },
    showAllServices: function() {
        this._setData({
            showAllServices: !this.data.showAllServices
        });
    },
    goPoi: function(t) {
        var e = t.currentTarget.dataset.idx, a = this.data.list[e];
        i.reportPOI({
            poi_page: {
                poi_id: a.store_id || a.poi_id,
                appid: a.appid,
                type: a.type,
                action: "click",
                from: this.data.from,
                has_service: a.service_infos.length > 0 ? 1 : 0
            }
        }), wx.navigateTo({
            url: "../poi/poi?appid=" + a.appid + "&poiid=" + a.poi_id + "&storeid=" + a.store_id + "&username=" + a.username
        });
    },
    openCustomer: function(t) {
        var e = t.currentTarget.dataset.idx, a = this.data.list[e];
        i.report({
            reportType: 2,
            customer: [ {
                appid: a.appid,
                type: a.type,
                poi_id: a.sotre_id,
                has_service: a.service_infos.length > 0 ? 1 : 0
            } ]
        }), r.enterContact({
            appId: a.appid,
            userName: a.username,
            headimgUrl: a.customer.avatar,
            title: a.nickname
        });
    },
    onPageScroll: function(t) {
        this.data.scrollTop = t.scrollTop, this.checkAndReportExposed();
    },
    checkAndReportExposed: function() {
        var t = this, a = e.windowHeight;
        this.data.list.forEach(function(e, r) {
            e.top - t.data.scrollTop < a && !e.exposed && (e.exposed = !0, i.reportAppExposed(e));
        });
    },
    getBoundingClientRect: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "single";
        return new Promise(function(a, i) {
            var r = wx.createSelectorQuery();
            ("single" === e ? r.select(t) : r.selectAll(t)).boundingClientRect(function(t) {
                return a(t);
            }).exec();
        });
    },
    _setData: function(t) {
        var e = this;
        return new Promise(function(a, i) {
            e.setData(t, function() {
                a();
            });
        });
    }
});