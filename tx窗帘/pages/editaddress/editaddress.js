var t = require("../../utils/config.js"), a = require("../../utils/region.js"), e = null, i = new Array(), s = new Array(), d = new Array(), r = new Array(), n = 0, o = 0, u = 0, l = 0, h = getApp(), c = [], g = [];

Page({
    data: {
        navigateTitle: "",
        addressData: {},
        shipTo: "",
        cellPhone: "",
        fullAddress: "",
        address: "",
        regionId: "",
        provinceName: [],
        provinceCode: [],
        provinceSelIndex: "",
        cityName: [],
        cityCode: [],
        citySelIndex: "",
        districtName: [],
        districtCode: [],
        districtSelIndex: "",
        streetName: [],
        streetCode: [],
        streetSelIndex: "",
        showMessage: !1,
        messageContent: "",
        showDistpicker: !1,
        Source: "",
        ProductSku: "",
        BuyAmount: 0,
        FromPage: "",
        CountdownId: "",
        ShipAddressId: "",
        FullRegionName: "请填写所在地区",
        SingleParam: "",
        isCss: !0
    },
    onLoad: function(t) {
        this.setAreaData();
        var a = t.title;
        this.data.navigateTitle = a, wx.setNavigationBarTitle({
            title: this.data.navigateTitle
        });
        var e = 0;
        if ("编辑收货地址" == a) {
            var i = JSON.parse(t.extra), s = i.pname + " " + i.cname + " " + i.oname;
            e = i.county, this.setData({
                addressData: i,
                shipTo: i.accept_name,
                cellPhone: i.mobile,
                fullAddress: s,
                FullRegionName: s,
                address: i.addr,
                ProductSku: t.productsku,
                cartItemIds: t.cartItemIds,
                BuyAmount: t.buyamount,
                FromPage: t.frompage,
                CountdownId: t.countdownid,
                ShipAddressId: t.shipaddressid,
                Source: t.Source,
                SingleParam: t.param,
                isCss: !1
            });
        }
        this.setData({
            regionId: e,
            ProductSku: t.productsku,
            cartItemIds: t.cartItemIds,
            BuyAmount: t.buyamount,
            FromPage: t.frompage,
            CountdownId: t.countdownid,
            ShipAddressId: t.shipaddressid,
            SingleParam: t.param,
            Source: t.Source
        });
    },
    bindShipToTap: function(t) {
        var a = t.detail.value;
        this.data.shipTo = a;
    },
    bindCellPhoneTap: function(t) {
        var a = t.detail.value;
        this.data.cellPhone = a;
    },
    bindFullAddressTap: function(t) {
        n = 0, o = 0, u = 0, this.setAreaData(), this.setData({
            showDistpicker: !0
        });
    },
    bindAddressTap: function(t) {
        var a = t.detail.value;
        this.data.address = a;
    },
    bindSaveTapTap: function(a) {
        var e = this;
        0 != e.data.shipTo.length ? 0 != e.data.cellPhone.length ? 0 != e.data.fullAddress.length ? 0 != e.data.address.length ? h.getOpenId(function(a) {
            if (wx.showNavigationBarLoading(), "新增收货地址" == e.data.navigateTitle) {
                i = {
                    openId: a,
                    shipTo: e.data.shipTo,
                    address: e.data.address,
                    cellphone: e.data.cellPhone,
                    regionId: e.data.regionId
                };
                t.httpPost(h.getUrl(h.globalData.addShippingAddress), i, e.getEditAddressData);
            } else {
                var i = {
                    openId: a,
                    shippingId: e.data.addressData.id,
                    isDefault: e.data.addressData.is_default,
                    shipTo: e.data.shipTo,
                    address: e.data.address,
                    cellphone: e.data.cellPhone,
                    regionId: e.data.regionId
                };
                t.httpPost(h.getUrl(h.globalData.updateShippingAddress), i, e.getEditAddressData);
            }
        }) : wx.showToast({
            title: "请输入详细地址",
            icon: "fail",
            duration: 2e3
        }) : wx.showToast({
            title: "请输入所在地区",
            icon: "fail",
            duration: 2e3
        }) : wx.showToast({
            title: "请输入联系电话",
            icon: "fail",
            duration: 2e3
        }) : wx.showToast({
            title: "请输入收货人",
            icon: "fail",
            duration: 2e3
        });
    },
    getEditAddressData: function(t) {
        if (wx.hideNavigationBarLoading(), "NOUser" == t.Message) wx.navigateTo({
            url: "../login/login"
        }); else if ("OK" == t.Status) {
            var a = this.data.Source, e = "";
            void 0 == a || "" == a ? e = "../address/address" : (a = "choiceaddress") ? e = "../choiceaddress/choiceaddress?productsku=" + this.data.ProductSku + "&cartItemIds=" + this.data.cartItemIds + "&buyamount=" + this.data.BuyAmount + "&frompage=" + this.data.FromPage + "&countdownid=" + this.data.CountdownId + "&param=" + this.data.SingleParam : (a = "submmitorder") && (e = "../submitorder/submitorder?productsku=" + this.data.ProductSku + "&cartItemIds=" + this.data.cartItemIds + "&buyamount=" + this.data.BuyAmount + "&frompage=" + this.data.FromPage + "&countdownid=" + this.data.CountdownId + "&shipaddressid=" + t.Message + "&param=" + this.data.SingleParam), 
            void 0 != e && "" != e && wx.redirectTo({
                url: e
            });
        } else wx.showToast({
            title: t.Message,
            icon: "loading",
            duration: 1e4
        }), setTimeout(function() {
            wx.hideToast();
        }, 2e3);
    },
    changeArea: function(t) {
        var a = this;
        n = t.detail.value[0], o = t.detail.value[1], u = t.detail.value.length > 2 ? t.detail.value[2] : 0, 
        l = 0, a.setAreaData(n, o, u, l);
    },
    showDistpicker: function() {
        this.setData({
            showDistpicker: !0
        });
    },
    distpickerCancel: function() {
        this.setData({
            showDistpicker: !1
        });
    },
    distpickerSure: function() {
        var t, a = this.data.provinceName[n] + " " + this.data.cityName[o] + " " + this.data.districtName[u];
        this.data.streetCode.length > 0 ? t = this.data.streetCode[l] : this.data.districtCode.length > 0 ? t = this.data.districtCode[u] : this.data.cityCode.length > 0 && (t = this.data.cityCode[o]);
        var e = this.data.isCss;
        "请填写所在地区" == this.data.FullRegionName && (e = !1), this.setData({
            fullAddress: a,
            FullRegionName: a,
            regionId: t,
            isCss: e
        }), this.distpickerCancel();
    },
    ArrayContains: function(t, a) {
        for (var e = t.length; e--; ) if (t[e] === a) return !0;
        return !1;
    },
    getRegions: function(t, a, e, s) {
        var r = this, n = !0;
        3 == a ? r.ArrayContains(i, t) || (n = !1) : 4 == n && (r.ArrayContains(d, t) || (n = !1)), 
        wx.request({
            url: h.getUrl("Region/GetSub"),
            async: !1,
            data: {
                parentId: t
            },
            success: function(a) {
                "OK" == a.data.Status && (3 == a.data.Depth ? r.setAreaDataShow(a.data.Regions, t, e, s) : 4 == a.Depth && r.setStreetData(a.data.Regions, t, e, s));
            }
        });
    },
    setProvinceCityData: function(t, a, i, s, d) {
        var r = this;
        null != t && (e = t);
        var n = e, o = [], u = [];
        for (var l in n) {
            var h = n[l].name, c = n[l].id;
            o.push(h), u.push(c);
        }
        r.setData({
            provinceName: o,
            provinceCode: u
        });
        var g = e[a].sub, p = [], m = [];
        for (var l in g) {
            var h = g[l].name, c = g[l].id;
            1, p.push(h), m.push(c);
        }
        r.setData({
            cityName: p,
            cityCode: m
        });
        var v = g[i].sub, f = [], I = [];
        if (null != v && v.length > 0) {
            for (var l in v) {
                var h = v[l].name, c = v[l].id;
                f.push(h), I.push(c);
            }
            r.setData({
                districtName: f,
                districtCode: I
            });
        } else r.setData({
            districtName: [],
            districtCode: []
        });
    },
    getItemIndex: function(t, a) {
        for (var e = t.length; e--; ) if (t[e] === a) return e;
        return -1;
    },
    setAreaDataShow: function(t, a, e, r) {
        var n = this;
        if (null != t) c = t, i.push(a), s.push(t); else {
            var u = n.getItemIndex(i, a);
            c = u >= 0 ? s[u] : [];
        }
        var l = [], h = [];
        if (c && c.length > 0) {
            for (var g in c) {
                var p = g.id, m = g.name;
                l.push(p), h.push(m);
            }
            n.setData({
                districtName: l,
                districtCode: h
            });
        } else n.setData({
            districtName: [],
            districtCode: []
        });
        this.ArrayContains(d, e) ? n.setStreetData(null, o, e, r) : n.getRegions(o, 4, e, r);
    },
    setStreetData: function(t, a, e, i) {
        var s = this;
        if (null != t) d.push(regionId), r.push(t), g = t; else {
            var n = s.getItemIndex(d, a);
            g = n >= 0 ? r[n] : [];
        }
    },
    setAreaData: function(t, i, s, d) {
        var r = this, t = t || 0, i = i || 0, d = (s = s || 0) || 0;
        void 0 == e || null == e ? e = a.region : r.setProvinceCityData(null, t, i, s, d);
    }
});