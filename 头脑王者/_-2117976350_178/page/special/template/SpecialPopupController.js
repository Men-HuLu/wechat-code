function t(t, a) {
    if (!(t instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var a = function() {
    function t(t, a) {
        for (var e = 0; e < a.length; e++) {
            var i = a[e];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(a, e, i) {
        return e && t(a.prototype, e), i && t(a, i), a;
    };
}(), e = require("./../../../util/util.js"), i = (require("./../../../const/consts.js"), 
require("../../../util/Tween.js")), n = require("../../../net/specialNet.js"), o = require("./../../../data/SpecialData.js"), r = getApp(), c = function() {
    function c(a) {
        var i = this;
        t(this, c), this.page = a;
        var p = {};
        p.popupData = {}, p["popupData.showNeedTicket"] = !1, p["popupData.showNoTicket"] = !1, 
        p["popupData.showCountdown"] = !1, this.page.setData(p), this.page.SpecialPopupNeedTicket_onClosed = function() {
            var t = {};
            t["popupData.showNeedTicket"] = !1, i.page.setData(t);
        }, this.page.SpecialPopupNeedTicket_onOk = function() {
            if (!i.btnLock) {
                i.btnLock = !0;
                var t = {};
                t["popupData.showNeedTicket"] = !1, i.page.setData(t), r.gotoPVE(function() {}, function() {}), 
                setTimeout(function() {
                    i.btnLock = !1;
                }, 2e3);
            }
        }, this.page.SpecialPopupNoTicket_onClosed = function() {
            var t = {};
            t["popupData.showNoTicket"] = !1, i.page.setData(t);
        }, this.page.SpecialPopupNoTicket_onOk = function() {
            var t = {};
            t["popupData.showNoTicket"] = !1, i.page.setData(t);
        }, this.page.SpecialPopupCountdown_onClosed = function() {
            if (!i.page.btnLock) {
                i.clearTimeInterval_countDown();
                var t = {};
                t["popupData.showCountdown"] = !1, i.page.setData(t);
            }
        }, this.page.SpecialBtnTicketInfo_onClicked = function() {
            i.page.btnLock || (i.page.btnLock = !0, n.ticketFriends(function(t, a) {
                if (t) e.ShowToast(t.errMsg); else {
                    o.friends = a.friends;
                    var n = o.data.maxFriendGive, r = {};
                    r["popupData.showTicketInfo"] = !0, r["popupData.myTicket"] = o.data.player.ticket + "/" + o.data.maxTicketNum, 
                    r["popupData.getNum"] = o.friends.length + "/" + n;
                    for (var c = [], p = 0; p < n; p++) p < o.friends.length ? c.push(o.friends[p]) : c.push({
                        uid: 0,
                        nickName: "",
                        avatarUrl: ""
                    });
                    r["popupData.friendsFrom"] = c, o.data.player.ticket >= o.data.maxTicketNum ? r["popupData.infoBtnState"] = "full" : o.friends.length == n ? r["popupData.infoBtnState"] = "max" : r["popupData.infoBtnState"] = "less", 
                    i.page.setData(r);
                }
                setTimeout(function() {
                    i.page.btnLock = !1;
                }, 500);
            }));
        }, this.page.SpecialBtnTicketInfo_fullClicked = function() {
            wx.showToast({
                title: "入场券已达上限",
                icon: "none",
                duration: 4e3
            });
        }, this.page.SpecialBtnTicketInfo_onClosed = function() {
            if (!i.page.btnLock) {
                var t = {};
                t["popupData.showTicketInfo"] = !1, i.page.setData(t);
            }
        }, this.page.SpecialPopupUnlockRole_onClosed = function() {
            var t = {};
            t["unlockRoleViewData.visible"] = !1, i.page.setData(t);
        }, this.page.giveTicketToFriend = function() {
            i.giveTicketToFriend();
        }, this.page.getTicketFromFriend = function() {
            i.getTicketFromFriend();
        }, this.page.gotoTNCJ = function() {
            i.gotoTNCJ();
        };
    }
    return a(c, [ {
        key: "gotoTNCJ",
        value: function() {
            r.gotoTNCJ("TNWZ_SPECIAL");
        }
    }, {
        key: "showUnlockRoleView",
        value: function(t) {
            if (o.data.showTncj && o.myDreamCup) {
                var a = o.myDreamCup;
                if (!(o.data.player.cup < a.cup)) {
                    var e = {};
                    e["unlockRoleViewData.visible"] = !0, e["unlockRoleViewData.img"] = a.img, this.page.setData(e), 
                    o.myDreamCup = null;
                }
            }
        }
    }, {
        key: "getTicketFromFriend",
        value: function() {
            var t = this;
            if (!this.page.interval_getTicket) {
                for (var a = [], n = [], r = o.ticket.ticketFromFriend.length - 1; r >= 0; r--) {
                    var c = o.ticket.ticketFromFriend[r];
                    c.aid == o.data.base.aid ? a.push(c) : n.push(c);
                }
                o.ticket.ticketFromFriend = n, this.page.interval_getTicket = setInterval(function() {
                    if (a.length > 0) {
                        var n = o.data.player.ticket, r = a.pop();
                        r.addTicket = 0, o.data.player.ticket += r.addTicket;
                        var c = i.fastGet("ticket", !0);
                        c.call(function() {
                            var a = wx.createAnimation();
                            a.scale(.4).opacity(0).translate3d("100px", 0, 0).step({
                                duration: 0,
                                timingFunction: "step-start"
                            });
                            var e = {};
                            e["getTicketFromFriendData.ani_ticket"] = a.export(), t.page.setData(e);
                        }), c.wait(50), c.call(function() {
                            var a = wx.createAnimation();
                            a.translate3d(0, 0, 0).step({
                                duration: 250,
                                timingFunction: "ease-in"
                            });
                            var e = {};
                            e["getTicketFromFriendData.ani_frame"] = a.export(), t.page.setData(e);
                        }), c.wait(300), c.call(function() {
                            var a = wx.createAnimation();
                            a.scale(1).opacity(1).translate3d(0, "-50px", 0).step({
                                duration: 250,
                                timingFunction: "ease-in"
                            });
                            var e = {};
                            e["getTicketFromFriendData.ani_ticket"] = a.export(), t.page.setData(e);
                        }), c.wait(300), c.call(function() {
                            var a = wx.createAnimation();
                            a.scale(1).opacity(.2).translate3d(0, "-200px", 0).step({
                                duration: 400,
                                timingFunction: "ease-out"
                            });
                            var e = {};
                            e["getTicketFromFriendData.ani_ticket"] = a.export(), t.page.setData(e);
                        }), c.wait(1e3), c.call(function() {
                            var a = wx.createAnimation();
                            a.scale(1).opacity(0).translate3d(0, "-200px", 0).step({
                                duration: 50,
                                timingFunction: "ease-out"
                            });
                            var e = {};
                            e["getTicketFromFriendData.ani_ticket"] = a.export(), t.page.setData(e);
                        }), c.wait(100), c.call(function() {
                            var a = wx.createAnimation();
                            a.translate3d("100px", 0, 0).step({
                                duration: 250,
                                timingFunction: "ease-in"
                            });
                            var e = {};
                            e["getTicketFromFriendData.ani_frame"] = a.export(), t.page.setData(e);
                        }), c.wait(300), c.call(function() {
                            var a = wx.createAnimation();
                            a.scale(.4).opacity(0).translate3d(0, 0, 0).step({
                                duration: 0,
                                timingFunction: "step-start"
                            });
                            var c = wx.createAnimation();
                            c.scale(1.4).step({
                                duration: 200,
                                timingFunction: "ease-in"
                            }), c.scale(1).step({
                                duration: 200,
                                timingFunction: "ease-in"
                            });
                            var p = {};
                            p["getTicketFromFriendData.ani_ticket"] = a.export(), p["getTicketFromFriendData.visible"] = !1, 
                            p.ani_getTicket = c.export(), t.page.setData(p), i.fastGet("kingsNumTween", !0).update(function(a) {
                                var i = n + Math.ceil(r.addTicket * a), c = {};
                                c["player.ticket"] = i, t.page.setData(c), e.log("ui.ticket:", i, "/oldNum:", n, "/data.ticket:", o.data.player.ticket);
                            }, 300);
                        }), r.addTicket > 0 && (c.wait(400), c.call(function() {
                            var a = wx.createAnimation();
                            a.opacity(1).translate3d(0, "-25px", 0).step({
                                duration: 400,
                                timingFunction: "ease-out"
                            }), a.opacity(0).translate3d(0, 0, 0).step({
                                duration: 0,
                                timingFunction: "step-start"
                            });
                            var e = {};
                            e.ani_add_ticket = a.export(), e.num_add_ticket = "+" + r.addTicket, e["player.ticket"] = n + r.addTicket, 
                            t.page.setData(e);
                        }));
                        var p = {};
                        p["getTicketFromFriendData.visible"] = !0, p["getTicketFromFriendData.avatarUrl"] = r.avatarUrl, 
                        t.page.setData(p);
                    }
                }, 3e3);
            }
        }
    }, {
        key: "giveTicketToFriend",
        value: function() {
            var t = this;
            if (o.friendInfo_requestTicket) {
                var a = i.fastGet("ticket", !0);
                a.wait(50), a.call(function() {
                    var a = wx.createAnimation();
                    a.translate3d(0, 0, 0).step({
                        duration: 250,
                        timingFunction: "ease-in"
                    });
                    var e = {};
                    e["giveTicketToFriendData.ani_frame"] = a.export(), t.page.setData(e);
                }), a.wait(300), a.call(function() {
                    var a = wx.createAnimation();
                    a.scale(1).opacity(1).translate3d("133px", "-75px", 0).step({
                        duration: 250,
                        timingFunction: "ease-in"
                    });
                    var e = {};
                    e["giveTicketToFriendData.ani_ticket"] = a.export(), t.page.setData(e);
                }), a.wait(300), a.call(function() {
                    var a = wx.createAnimation();
                    a.scale(.4).opacity(.4).translate3d("18px", 0, 0).step({
                        duration: 400,
                        timingFunction: "ease-out"
                    });
                    var e = {};
                    e["giveTicketToFriendData.ani_ticket"] = a.export(), t.page.setData(e);
                }), a.wait(1e3), a.call(function() {
                    var a = wx.createAnimation();
                    a.scale(.4).opacity(0).translate3d("18px", 0, 0).step({
                        duration: 50,
                        timingFunction: "ease-out"
                    });
                    var e = {};
                    e["giveTicketToFriendData.ani_ticket"] = a.export(), t.page.setData(e);
                }), a.wait(100), a.call(function() {
                    var a = wx.createAnimation();
                    a.translate3d("-100px", 0, 0).step({
                        duration: 250,
                        timingFunction: "ease-in"
                    });
                    var e = {};
                    e["giveTicketToFriendData.ani_frame"] = a.export(), t.page.setData(e);
                }), a.wait(300), a.call(function() {
                    var a = {};
                    a["giveTicketToFriendData.visible"] = !1, t.page.setData(a);
                });
                var n = {};
                n["giveTicketToFriendData.visible"] = !0, n["giveTicketToFriendData.avatarUrl"] = o.friendInfo_requestTicket.avatarUrl, 
                this.page.setData(n), o.friendInfo_requestTicket = null;
            } else o.ticket.giveEnergyErrMsg && (e.ShowToast(o.ticket.giveEnergyErrMsg), o.ticket.giveEnergyErrMsg = null);
        }
    }, {
        key: "showNeedTicket",
        value: function() {
            var t = {};
            t["popupData.showNeedTicket"] = !0, t["popupData.earn"] = o.data.player.earn, t["popupData.maxTicketPerDay"] = o.data.maxTicketPerDay, 
            this.page.setData(t);
        }
    }, {
        key: "showNoTicket",
        value: function() {
            var t = {};
            t["popupData.showNoTicket"] = !0, this.page.setData(t);
        }
    }, {
        key: "showCountdown",
        value: function(t) {
            var a = this, e = {};
            e["popupData.showCountdown"] = !0, this.page.setData(e), this.clearTimeInterval_countDown(), 
            this.updateCountdown(t), this.timeFlag_countDown = setInterval(function() {
                a.updateCountdown(t);
            }, 1e3);
        }
    }, {
        key: "updateCountdown",
        value: function(t) {
            var a = e.getServerTimeBaseSecond(), i = Math.max(0, o.data.base.calEndAt - a), n = e.formatTime_mm_ss(i), r = {};
            r["popupData.textCountdown"] = n, this.page.setData(r), a > o.data.base.calEndAt && (this.clearTimeInterval_countDown(), 
            t && t());
        }
    }, {
        key: "clearTimeInterval_countDown",
        value: function() {
            this.timeFlag_countDown && (clearInterval(this.timeFlag_countDown), this.timeFlag_countDown = void 0);
        }
    }, {
        key: "onHide",
        value: function() {}
    } ]), c;
}();

module.exports = c;