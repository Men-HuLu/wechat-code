var e = require("./../../net/shopNet.js"), a = require("./../../data/ItemsManager.js"), t = require("./../../util/util.js"), i = require("./../../const/consts.js"), n = require("./../../net/roleNet.js"), s = getApp(), d = {
    ITEM: 0,
    GOLD: 1,
    HEADFRAME: 2
};

Page({
    data: {
        isShopClosed: "",
        pageIndex: 0,
        diamondList: null
    },
    onLoad: function(e) {
        if (t.showShareMenu(), s.eventDispatcher.addEventListener("goldUpdate", this.onGoldUpdate, this), 
        s.eventDispatcher.addEventListener("diamondUpdate", this.onDiamondUpdate, this), 
        0 == t.getShopClosedDesc().length) {
            var a = 0;
            s.isOnSale() && (a = 2), e.pageIndex && (a = parseInt(e.pageIndex)), this.setPage(a), 
            0 == a && this.refreshOnsaleStauts_diamond();
        }
    },
    checkOnsale: function(e) {
        if (1 == e.onsale) {
            var a = t.getServerTimeBaseSecond(), i = e.startTime + e.duration;
            if (a >= e.startTime && a < i) return !0;
        }
        return e.onsale = 0, !1;
    },
    refreshOnsaleStauts_diamond: function() {
        var e = this;
        if (s.mainData.role.saleTime) {
            clearTimeout(this.refreshTime);
            var a = t.getServerTimeBaseSecond(), i = s.mainData.role.saleTime, n = i[0] > a ? i[0] : i[1] > a ? i[1] : 0;
            if (n > 0) {
                var d = 1e3 * (n - a);
                console.log(d + "毫秒后刷新"), this.refreshTime = setTimeout(function() {
                    var a = [ !1, !1, s.isOnSale(), !1 ], t = e.selectComponent("#simpleTapbar");
                    t && t.setBadgeStatus(a);
                }, d);
            }
        }
    },
    refreshOnsaleStauts_item: function() {
        var e = this;
        clearTimeout(this.refreshTime);
        for (var a = t.getServerTimeBaseSecond(), i = [ !1, !1, !1, !1 ], n = [], o = null, c = 0; c < this.exList.length; c++) {
            var r = this.exList[c], l = this.checkOnsale(r);
            switch (r.tab) {
              case d.GOLD:
                !i[1] && l && (i[1] = !0);
                break;

              case d.ITEM:
                !i[2] && l && (i[2] = !0);
                break;

              case d.HEADFRAME:
                !i[3] && l && (i[3] = !0);
            }
            var h = r.startTime + r.duration;
            a < r.startTime && (n.push(r.startTime), n.push(h)), o || l && a >= r.startTime && a < h && (o = [ r.startTime, h ]);
        }
        if (o && (s.mainData.role.saleTime = o), n.length > 0) {
            n.sort(function(e, a) {
                return e - a;
            });
            var m = 1e3 * (n[0] - a);
            console.log(m + "毫秒后刷新"), this.refreshTime = setTimeout(function() {
                e.exList = null, e.setPage(e.data.pageIndex);
            }, m);
        }
        var u = this.selectComponent("#simpleTapbar");
        u && u.setBadgeStatus(i);
    },
    setPage: function(o) {
        var c = this;
        if (0 == o) if (this.data.diamondList) {
            var r = {};
            r.pageIndex = o, this.setData(r);
        } else e.shopList(s.mainData.role.uid, function(e, a) {
            e || c.refreshDiamond(a);
        }); else {
            var l = function(e) {
                switch (c.refreshOnsaleStauts_item(), e) {
                  case 1:
                    for (var o = [], r = 0; r < c.exList.length; r++) {
                        var l = c.exList[r];
                        l.tab == d.GOLD && (o.push(l), l.callback_exchangeView_back_clicked = "callback_exchangeView_back_clicked", 
                        l.callback_exchangeView_ok_clicked = "callback_exchangeView_ok_clicked", l.typeName = "王者币");
                    }
                    o.sort(function(e, a) {
                        return e.exId - a.exId;
                    });
                    var h = {};
                    h.pageIndex = e, h.goldList = o, h.banner = c.banner, c.setData(h);
                    break;

                  case 2:
                    for (var m = [], u = 0; u < c.exList.length; u++) {
                        var f = c.exList[u];
                        if (f.tab == d.ITEM) {
                            m.push(f), f.callback_exchangeView_back_clicked = "callback_exchangeView_back_clicked", 
                            f.callback_exchangeView_ok_clicked = "callback_exchangeView_ok_clicked";
                            var k = s.mainData.role.allSeeds.itemConfs[f.itemId];
                            f.typeName = k.name;
                        }
                    }
                    m.sort(function(e, a) {
                        return e.exId - a.exId;
                    });
                    var b = {};
                    b.pageIndex = e, b.itemList = m, b.banner = c.banner, c.setData(b);
                    break;

                  case 3:
                    var g = function(t) {
                        for (var n = [], s = 0; s < c.exList.length; s++) {
                            var o = c.exList[s];
                            if (o.tab == d.HEADFRAME) {
                                n.push(o), o.callback_exchangeView_back_clicked = "callback_exchangeView_back_clicked", 
                                o.callback_exchangeView_ok_clicked = "callback_exchangeView_ok_clicked", o.iconUrl = a.getItemIconUrl(o.itemId, i.ItemType.headframe), 
                                o.typeName = o.name;
                                for (var r = 0; r < t.length; r++) {
                                    var l = t[r];
                                    if (o.itemId == l.id) {
                                        o.own = 1;
                                        break;
                                    }
                                }
                            }
                        }
                        n.sort(function(e, a) {
                            var t = ~~e.own - ~~a.own;
                            return 0 == t && (t = e.price - a.price), t;
                        });
                        var h = {};
                        h.pageIndex = e, h.headFrameList = n, h.banner = c.banner, c.setData(h);
                    };
                    c.myHeadFrameList ? g(c.myHeadFrameList) : n.headList(function(e, a) {
                        c.btnLock = !1, e ? t.ShowConfirm(e.errCode, e.errMsg, function() {}) : (c.myHeadFrameList = a.list || [], 
                        g(c.myHeadFrameList));
                    });
                }
            };
            this.exList ? l(o) : e.exList(function(e, a) {
                e || (c.exList = a.list, c.banner = a.banner, l(o));
            });
        }
    },
    refreshDiamond: function(e) {
        e = e || {}, this.banner = e.banner;
        var t = [];
        for (var i in e.goods) {
            var n = e.goods[i];
            n.callback_back_clicked = "callback_back_clicked", n.callback_use_clicked = "callback_use_clicked", 
            n.hasBuybuybuy = a.hasBuybuybuy(n.id), t.push(n);
        }
        t.sort(function(e, a) {
            return e.num - a.num;
        });
        var s = {};
        s.pageIndex = 0, s.diamondList = t, e.banner && (s.banner = e.banner), this.setData(s);
    },
    onReady: function() {},
    onShow: function() {
        var e = {};
        e.isShopClosed = t.getShopClosedDesc(), e.gold = s.mainData.role.gold, e.diamond = s.mainData.role.diamond, 
        this.setData(e);
    },
    onGoldUpdate: function() {
        var e = {};
        e.gold = s.mainData.role.gold, this.setData(e);
    },
    onDiamondUpdate: function() {
        var e = {};
        e.diamond = s.mainData.role.diamond, this.setData(e);
    },
    onHide: function() {},
    onUnload: function() {
        s.eventDispatcher.removeEventListener("goldUpdate", this.onGoldUpdate, this), s.eventDispatcher.removeEventListener("diamondUpdate", this.onDiamondUpdate, this);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        this.shared = !0;
        var e = s.shareManager.getCompareShareData("shop");
        return s.shareConf(e);
    },
    onTapbarItemClicked: function(e) {
        this.setPage(e.detail.index);
    },
    onDiamondClicked: function(e) {
        if (!this.btnLock) for (var a = e.detail.idSelected, t = 0; t < this.data.diamondList.length; t++) {
            var i = this.data.diamondList[t];
            if (i.id == a) return void this.setData({
                diamondSelected: i
            });
        }
    },
    callback_back_clicked: function() {
        this.setData({
            diamondSelected: null
        });
    },
    callback_use_clicked: function() {
        var e = this;
        this.btnLock || (this.btnLock = !0, a.createOrder(this.data.diamondSelected.id, function() {
            var i = e.data.diamondSelected.num, n = e.data.diamondSelected.hasBuybuybuy;
            1 != e.data.diamondSelected.double || n ? t.ShowToast("支付成功，获得钻石" + i) : (i *= 2, 
            t.ShowToast("首充双倍，获得钻石" + i)), s.updateDiamond(s.mainData.role.diamond + i), console.log("购买成功后 updateDiamond = " + s.mainData.role.diamond), 
            a.refreshPurchaseCount(e.data.diamondSelected.id);
            var d = {};
            d["diamondSelected.hasBuybuybuy"] = !0;
            for (var o = 0; o < e.data.diamondList.length; o++) if (e.data.diamondList[o].id == e.data.diamondSelected.id) {
                d["diamondList[" + o + "].hasBuybuybuy"] = !0;
                break;
            }
            e.setData(d);
        }, function() {
            e.btnLock = !1;
        }, function() {
            e.btnLock = !1, e.setData({
                diamondSelected: null
            });
        }));
    },
    onItemClicked: function(e) {
        if (!this.btnLock) {
            var a = e.detail.idSelected, i = null;
            switch (this.data.pageIndex) {
              case 1:
                i = this.data.goldList;
                break;

              case 2:
                i = this.data.itemList;
                break;

              case 3:
                i = this.data.headFrameList;
            }
            for (var n = 0; n < i.length; n++) {
                var d = i[n];
                if (d.exId == a) {
                    if (2 == d.tab && 1 == d.own) t.ShowConfirmCancel(d.name, "是否要更换头像框？", function() {
                        s.gotoHeadFrame();
                    }); else {
                        var o = this.checkOnsale(d);
                        d.factPrice = o ? d.cost : d.price, this.setData({
                            itemSelected: d
                        });
                    }
                    return;
                }
            }
        }
    },
    callback_exchangeView_back_clicked: function() {
        this.setData({
            itemSelected: null
        });
    },
    callback_exchangeView_ok_clicked: function() {
        var i = this;
        if (!this.btnLock) {
            this.btnLock = !0;
            var n = this.data.itemSelected.price;
            1 == this.data.itemSelected.onsale && this.checkOnsale(this.data.itemSelected) && (n = this.data.itemSelected.cost), 
            0 == this.data.itemSelected.type && s.mainData.role.gold < n ? (t.ShowToast("金币不足"), 
            this.btnLock = !1) : 1 == this.data.itemSelected.type && s.mainData.role.diamond < n ? (t.ShowToast("钻石不足"), 
            this.btnLock = !1) : e.exchange(this.data.itemSelected.exId, function(e, n) {
                if (i.btnLock = !1, e) t.ShowConfirm("兑换失败", e.errMsg, null); else {
                    var o = n.diamond;
                    s.updateDiamond(o);
                    var c = n.gold;
                    s.updateGold(c);
                    var r = s.mainData.role.allSeeds.itemConfs[n.itemId];
                    if (t.ShowToast("兑换成功，获得" + r.name + i.data.itemSelected.itemNum), a.addItem(i.data.itemSelected.itemId, i.data.itemSelected.itemNum), 
                    i.data.itemSelected.tab == d.HEADFRAME) {
                        var l = {};
                        l["itemSelected.own"] = 1;
                        for (var h = i.data.headFrameList, m = 0; m < h.length; m++) if (h[m].exId == i.data.itemSelected.exId) {
                            l["headFrameList[" + m + "].own"] = 1;
                            break;
                        }
                        i.setData(l);
                    }
                    i.setData({
                        itemSelected: null
                    });
                }
            });
        }
    }
});