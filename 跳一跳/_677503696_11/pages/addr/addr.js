var t = getApp().globalData, o = require("../../utils/util.js");

Page({
    data: {
        statusBarHeight: t.statusBarHeight,
        platform: t.platform,
        screenHeight: t.screenHeight,
        city: "",
        address: "",
        showSuggestion: !1,
        poiSuggestions: []
    },
    onShow: function() {
        t.curPage = this.route, this.setData({
            city: t.location.city,
            address: t.location.address
        });
    },
    resetLocation: function() {
        t.location = JSON.parse(JSON.stringify(t.curLocation)), this.setData({
            city: t.location.city,
            address: t.location.address
        });
    },
    changePoi2: function() {
        t.changedLocation = !0, wx.navigateBack({});
    },
    changePoi: function(o) {
        var a = o.currentTarget.dataset.idx, e = this.data.poiSuggestions[a];
        t.location.address = e.title, t.location.coordinate = e.location, t.changedLocation = !0, 
        wx.navigateBack({});
    },
    searchPoi: function(a) {
        var e = this.data._lastTimestamp = new Date().getTime(), i = this, s = a.detail.value;
        s ? t.qqmapsdk.getSuggestion({
            keyword: s,
            region: i.data.city,
            region_fix: 1,
            success: function(a) {
                if (e === i.data._lastTimestamp) {
                    var n = a.data || [], c = n.map(function(t) {
                        return {
                            location: t.location
                        };
                    });
                    t.qqmapsdk.calculateDistance({
                        mode: "driving",
                        to: c,
                        success: function(t) {
                            var a = t.result.elements.map(function(t) {
                                return t.distance;
                            });
                            n.forEach(function(t, e) {
                                t.distance = a[e], t.richDistance = o.formatDistance(a[e]), t.richTitle = t.title.replace(s, '<span class="primary-color">' + s + "</span>");
                            }), n.sort(function(t, o) {
                                return t.distance - o.distance;
                            }), i.setData({
                                poiSuggestions: n,
                                showSuggestion: 0 !== n.length
                            });
                        }
                    });
                }
            },
            fail: function(t) {
                e === i.data._lastTimestamp && console.log("getSuggestion failed ");
            }
        }) : i.setData({
            poiSuggestions: [],
            showSuggestion: !1
        });
    },
    getLocation: function() {
        var a = this;
        wx.getLocation({
            success: function(e) {
                console.log("wx.getLocation", e), t.qqmapsdk.reverseGeocoder({
                    get_poi: 1,
                    location: {
                        latitude: e.latitude,
                        longitude: e.longitude
                    },
                    success: function(e) {
                        if (0 == e.status) {
                            console.log("getCity", e);
                            var i = e.result.ad_info.city;
                            if (0 == e.result.poi_count) return void o.showToast("无法获取当前位置");
                            var s = e.result.pois[0];
                            t.location = {
                                city: i,
                                address: s.title,
                                coordinate: {
                                    lat: s.location.lat,
                                    lng: s.location.lng
                                }
                            }, a.setData({
                                address: s.title,
                                city: i
                            }), o.setStorageSync("location", t.location);
                        } else o.showToast("位置获取失败"), console.log("reverseGeocoder fail", e);
                    },
                    fail: function(t) {
                        o.showToast("位置获取失败"), console.log("reverseGeocoder fail", t);
                    }
                });
            }
        });
    }
});