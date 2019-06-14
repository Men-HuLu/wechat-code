var e = require("./../../../data/ItemsManager.js"), t = require("./../../../util/util.js"), i = require("./../../../const/consts.js");

Component({
    properties: {},
    data: {
        visible: !1,
        source: null
    },
    attached: function() {
        var i = getApp();
        if (e.haveNewHandItemCanBuy()) {
            for (var a = [], n = 0; n < i.mainData.role.newGift.items.length; n++) {
                var s = i.mainData.role.newGift.items[n], o = i.mainData.role.allSeeds.itemConfs[s.itemId], r = t.assign(s, o);
                r.iconUrl = e.getItemIconUrl(r.id, r.typeId), a.push(r);
            }
            var h = {};
            h.visible = !1, h.source = a, h.price = i.mainData.role.newGift.price, this.setData(h);
        } else {
            var c = {};
            c.visible = !1, this.setData(c);
        }
    },
    methods: {
        hide: function() {
            var e = {};
            e.visible = !1, this.setData(e), this.continue = !1, clearTimeout(this.timeout);
        },
        show: function() {
            var e = {};
            e.visible = !0, this.setData(e), this.continue = !0, this.update();
        },
        onTapBtnClose: function(e) {
            this.hide();
        },
        onTapBtnBuy: function(a) {
            var n = this;
            if (!this.btnLock) {
                this.btnLock = !0, t.showLoading("");
                var s = getApp();
                e.createOrder(s.mainData.role.newGift.id, function() {
                    for (var a = 0; a < n.data.source.length; a++) {
                        var o = n.data.source[a];
                        switch (o.typeId) {
                          case i.ItemType.gold:
                          case i.ItemType.luckyBag:
                          case i.ItemType.exchange:
                          case i.ItemType.buff:
                          case i.ItemType.book:
                            e.addItem(o.itemId, o.itemNum);
                            break;

                          case i.ItemType.headframe:
                            e.addItem(o.itemId, o.itemNum), e.refreshNewFrameFlag();
                            break;

                          case i.ItemType.cup:
                        }
                    }
                    t.ShowToast("购买成功"), e.refreshPurchaseCount(s.mainData.role.newGift.id), n.btnLock = !1, 
                    t.hideLoading();
                }, function() {
                    n.btnLock = !1, t.hideLoading();
                }, function() {
                    n.btnLock = !1, t.hideLoading();
                }), this.hide(), t.setStorageSync("tryGetBeginnerGift", !0, 3e3), this.triggerEvent("onTapBtnTryToBuy", {});
            }
        },
        update: function() {
            var i = this;
            if (clearTimeout(this.timeout), e.haveNewHandItemCanBuy()) {
                var a = getApp(), n = t.getServerTimeBaseSecond();
                if (this.beginnerShowing || (this.beginnerShowing = t.getStorageSync("beginnerShowing")), 
                this.beginnerShowing.visible) if (n - this.beginnerShowing.startTime >= a.mainData.role.newGift.duration) this.hide(); else {
                    var s = t.formatTime(this.beginnerShowing.startTime + a.mainData.role.newGift.duration - n), o = {};
                    o.countDown = s, this.setData(o);
                } else this.hide();
                this.continue && (this.timeout = setTimeout(function() {
                    i.update();
                }, 1e3));
            }
        }
    }
});