var t = getApp().globalData, a = require("../../utils/util.js"), e = [ "北京", "上海", "广州", "深圳", "成都", "杭州", "重庆", "苏州", "西安", "杭州", "郑州", "天津" ];

Page({
    data: {
        statusBarHeight: t.statusBarHeight,
        platform: t.platform,
        screenHeight: t.screenHeight,
        city: "",
        alphabet: [],
        cityList: [],
        hotCityList: e,
        historyCityList: [],
        scrollId: "",
        selectedId: "A",
        tapped: !1
    },
    onLoad: function() {
        var e = this.updateHistoryCity(t.location.city), i = a.getStorageSync("cityInfo") || {};
        this.setData({
            cityList: i.cityList || [],
            alphabet: i.alphabet || [],
            historyCityList: e,
            city: t.curLocation.city
        }), this.getCityData();
    },
    onShow: function() {
        t.curPage = this.route;
    },
    onReady: function() {
        this.computed();
    },
    getCityData: function() {
        var e = this, i = [], s = [];
        t.qqmapsdk.getCityList({
            success: function(t) {
                var n = t.result[1];
                n.sort(function(t, a) {
                    var e = t.pinyin.join(""), i = a.pinyin.join("");
                    return e.localeCompare(i);
                });
                var o = "A", c = [];
                n.forEach(function(t) {
                    var a = t.pinyin[0].charAt(0).toUpperCase();
                    o !== a && (i.push({
                        alpha: o,
                        subCities: c
                    }), s.push(o), o = a, c = []), c.push(t);
                }), s.push(o), i.push({
                    alpha: o,
                    subCities: c
                }), e.setData({
                    cityList: i,
                    alphabet: s
                }), a.setStorageSync("cityInfo", {
                    cityList: i,
                    alphabet: s
                }), e.computed();
            }
        });
    },
    scrollTo: function(t) {
        var a = "";
        if ("touchstart" == t.type) a = t.target.dataset.alpha; else {
            var e = t.changedTouches[0].clientY - this.data.anChorTop, i = parseInt(e / this.data.anchorItemH);
            a = this.data.alphabet[i];
        }
        this.setData({
            scrollId: a,
            selectedId: a,
            tapped: !0
        }), wx.vibrateShort({});
    },
    removeTapped: function() {
        this.setData({
            tapped: !1
        });
    },
    onScroll: function(t) {
        var a = t.detail.scrollTop + this.data.upperBound, e = this.data.cityListTops;
        if (!(a < e[0])) {
            for (var i = 0; i < e.length - 1; i++) if (a >= e[i] && a < e[i + 1]) return void this.setData({
                selectedId: this.data.alphabet[i]
            });
            this.setData({
                selectedId: this.data.alphabet[e.length - 1]
            });
        }
    },
    computed: function() {
        var t = this, a = wx.createSelectorQuery();
        a.select(".anchor-list").boundingClientRect(function(a) {
            t.data.anchorItemH = a.height / t.data.alphabet.length, t.data.anchorItemW = a.width, 
            t.data.anChorTop = a.top;
        }).exec(), a.selectAll(".city_list_item").boundingClientRect(function(a) {
            t.data.cityListTops = a.map(function(t) {
                return t.top;
            });
        }).exec(), a.select(".page-select-city").boundingClientRect(function(a) {
            t.data.upperBound = a.top;
        }).exec();
    },
    changeCity: function(a) {
        var e = a.target.dataset.city || a.currentTarget.dataset.city;
        t.location.city = e, this.updateHistoryCity(e), wx.navigateBack({});
    },
    updateHistoryCity: function(t) {
        if (!t) return [];
        var e = a.getStorageSync("historyCity") || [];
        t.endsWith("市") && (t = t.slice(0, -1));
        var i = e.indexOf(t);
        return -1 != i ? e.splice(i, 1) : 6 == e.length && e.pop(), e.unshift(t), a.setStorageSync("historyCity", e), 
        e;
    }
});