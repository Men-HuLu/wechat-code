function e(e, i) {
    if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function");
}

var i = function() {
    function e(e, i) {
        for (var t = 0; t < i.length; t++) {
            var n = i[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(i, t, n) {
        return t && e(i.prototype, t), n && e(i, n), i;
    };
}(), t = require("../../../util/util.js"), n = require("../../../data/SpecialData.js"), r = require("../../../net/specialNet.js"), a = getApp(), o = function() {
    function o(i) {
        e(this, o), this.page = i, this.addSpecialFunction();
    }
    return i(o, [ {
        key: "addSpecialFunction",
        value: function() {
            var e = this;
            this.page.ctrl_gotoOfflineSpecial = function(i) {
                var r = !0;
                i && i.request_ticket && i.friendCode || (t.log("不是相关链接进来的"), r = !1), i.friendCode == a.mainData.role.shareCode && (t.log("不能给自已助力"), 
                r = !1), e.sbReceived(i.friendCode) && (t.log("不能重复助力"), r = !1, n.ticket.giveEnergyErrMsg = "今日已赠送"), 
                r ? e.request_giveTicket(i) : e.gotoOfflineSpecial();
            }, this.page.gotoOfflineSpecial = function() {
                e.gotoOfflineSpecial();
            };
        }
    }, {
        key: "request_giveTicket",
        value: function(e) {
            var i = this;
            r.giveTicket(e.friendCode, e.shareAid, function(t, r) {
                t ? (n.ticket.giveEnergyErrMsg = t.errMsg, i.gotoOfflineSpecial()) : (n.ticket.receiver.push({
                    friendCode: e.friendCode,
                    aid: e.shareAid
                }), n.friendInfo_requestTicket = {
                    uid: r.friendInfo.uid,
                    nickName: r.friendInfo.nickName,
                    avatarUrl: r.friendInfo.avatarUrl
                }, i.gotoOfflineSpecial());
            });
        }
    }, {
        key: "sbReceived",
        value: function(e) {
            if (!n.ticket.receiver || 0 == n.ticket.receiver.length) return !1;
            for (var i = 0; i < n.ticket.receiver.length; i++) {
                var t = n.ticket.receiver[i];
                if (t.friendCode == e && t.aid == n.data.base.aid) return !0;
            }
            return !1;
        }
    }, {
        key: "gotoOfflineSpecial",
        value: function() {
            var e = this;
            if (!this.page.btnLock) {
                this.page.btnLock = !0, n.data.base.aid = n.aidOffline;
                wx.navigateTo({
                    url: "/page/special/special",
                    complete: function() {
                        e.page.btnUnlock();
                    }
                });
            }
        }
    } ]), o;
}();

module.exports = o;