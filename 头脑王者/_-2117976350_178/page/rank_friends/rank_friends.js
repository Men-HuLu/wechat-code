require("./../../net/groupNet.js");

var t = require("./../../net/friendNet.js"), a = require("./../../net/rankNet.js"), e = (require("./../../net/connectNotify.js"), 
require("./../../const/notifyConsts.js"), require("./../../util/util.js")), n = require("./../../util/Tween.js"), i = getApp();

Page({
    data: {
        scrollTop: -99999,
        shareRewardText: "",
        tabPage: 0,
        curState: 0,
        worldMatch: [],
        self: {},
        scrollViewHeight0: 0,
        scrollViewHeight1: 0,
        friends: [],
        left_btn_last: 0,
        left_btn_back: 400
    },
    onTapRedpack: function() {},
    onTapTabBtn: function(t) {
        var a = this;
        if (0 == this.data.tabPage) this.setData({
            tabPage: 1
        }); else {
            var e = n.fastGet("rank_friend");
            this.setData({
                tabPage: 0,
                ani_list: wx.createAnimation().export()
            }), e.wait(300), e.call(function() {
                var t = wx.createAnimation({
                    timingFunction: "ease-out",
                    duration: 600
                });
                t.height("100%").step();
                var e = a.data;
                e.ani_list = t.export(), a.setData(e);
            });
        }
    },
    callback_item_clicked: function(t) {
        var a = this;
        if (!this.btnLock) for (var e = t.currentTarget.dataset.friendId, n = this.data.friends, r = 0; r < n.length; r++) if (this.data.friends[r].uid == e) {
            if (1 == this.data.curState) n[r].selected = !n[r].selected, this.setData({
                friends: n
            }); else {
                i.mainData.user_to_detail = n[r];
                this.btnLock = !0, wx.navigateTo({
                    url: "../../page/user_detail/user_detail",
                    complete: function() {
                        setTimeout(function() {
                            a.btnLock = !1;
                        }, 500);
                    }
                });
            }
            break;
        }
    },
    callback_worldrankitem_clicked: function(t) {
        var a = this;
        if (!this.btnLock) for (var e = t.currentTarget.dataset.friendId, n = this.data.worldMatch || [], r = 0; r < n.length; r++) if (n[r].uid == e) {
            i.mainData.user_to_detail = n[r];
            this.btnLock = !0, wx.navigateTo({
                url: "../../page/user_detail/user_detail",
                complete: function() {
                    setTimeout(function() {
                        a.btnLock = !1;
                    }, 500);
                }
            });
            break;
        }
    },
    callback_lastmatchitem_clicked: function(t) {
        var a = this;
        if (!this.btnLock) for (var e = t.currentTarget.dataset.friendId, n = this.data.lastSeasonRank || [], r = 0; r < n.length; r++) if (n[r].uid == e) {
            i.mainData.user_to_detail = n[r];
            this.btnLock = !0, wx.navigateTo({
                url: "../../page/user_detail/user_detail",
                complete: function() {
                    setTimeout(function() {
                        a.btnLock = !1;
                    }, 500);
                }
            });
            break;
        }
    },
    btn_del_clicked: function(t) {
        for (var a = this.data.friends, e = a.length - 1; e >= 0; e--) a[e].selected && a.splice(e, 1);
        this.setData({
            friends: a
        });
    },
    btn_edit_clicked: function(t) {
        this.setData({
            curState: 1 - this.data.curState
        });
    },
    btn_back_clicked: function(t) {
        wx.navigateBack();
    },
    onLoad: function(n) {
        var r = this;
        e.showShareMenu(), i.eventDispatcher.addEventListener("shareTextUpdate", this.onShareTextUpdate, this), 
        this.setData({
            scrollViewHeight0: i.mainData.windowHeight - 125 - 140,
            scrollViewHeight1: i.mainData.windowHeight - 125 - 110 - 140
        }), t.list(function(t, a) {
            if (t) console.warn(t); else if (a) {
                var n = a, o = n.length;
                n.length > 200 && n.splice(200, n.length - 200);
                var s = !0, c = !1, l = void 0;
                try {
                    for (var u, d = n[Symbol.iterator](); !(s = (u = d.next()).done); s = !0) {
                        var h = u.value;
                        h.matchName = e.GetMatchInfo(h.curMatch).name, h.avatarUrl = e.getWechatUrlBySize(h.avatarUrl);
                    }
                } catch (t) {
                    c = !0, l = t;
                } finally {
                    try {
                        !s && d.return && d.return();
                    } finally {
                        if (c) throw l;
                    }
                }
                var f = e.GetMatchInfo(i.mainData.role.curMatch), m = {};
                m.nickName = "我", m.level = i.mainData.role.level, m.uid = i.mainData.role.uid, 
                m.avatarUrl = e.getWechatUrlBySize(i.mainData.role.userInfo.avatarUrl), m.matchName = f.name, 
                m.star = f.star, m.city = e.getCity(i.mainData.role.userInfo.province, i.mainData.role.userInfo.city), 
                m.curMatch = i.mainData.role.curMatch, m.headId = i.mainData.role.headId, m.cups = i.mainData.role.cups, 
                m.itsMe = !0, n.push(m), n = n.sort(function(t, a) {
                    return 0 == a.curMatch && 0 != t.curMatch ? 1 : 0 != a.curMatch && 0 == t.curMatch ? -1 : a.curMatch == t.curMatch ? a.star - t.star : a.curMatch - t.curMatch;
                });
                for (var v = 0; v < n.length; v++) n[v].rank = v + 1, n[v].cupsSource = i.formatUserCups(n[v]);
                r.setData({
                    friends: n,
                    friendCount: ~~o,
                    shareRewardText: i.getShareRewardText()
                });
            } else {
                var g = [ {
                    uid: -1
                } ];
                r.setData({
                    friends: g,
                    friendCount: 0,
                    shareRewardText: i.getShareRewardText()
                });
            }
        }), a.worldMatch(function(t, a) {
            if (t) console.warn(t); else if (a && a.list) {
                var n = a.list, o = !0, s = !1, c = void 0;
                try {
                    for (var l, u = n[Symbol.iterator](); !(o = (l = u.next()).done); o = !0) {
                        var d = l.value, h = Math.floor(d.score / 100);
                        h > 300014 && (h = 300014), d.matchName = e.GetMatchInfo(h).name, d.star = d.score - 100 * h, 
                        d.curMatch = h, d.uid == i.mainData.role.uid && (d.nickName = "我"), d.cupsSource = i.formatUserCups(d), 
                        d.avatarUrl = e.getWechatUrlBySize(d.avatarUrl);
                    }
                } catch (t) {
                    s = !0, c = t;
                } finally {
                    try {
                        !o && u.return && u.return();
                    } finally {
                        if (s) throw c;
                    }
                }
                var f = a.self;
                f.matchName = e.GetMatchInfo(Math.floor(f.score / 100)).name, f.star = f.score - 100 * Math.floor(f.score / 100), 
                r.setData({
                    worldMatch: n,
                    self: f
                });
            }
        });
    },
    onShareTextUpdate: function() {
        this.setData({
            shareRewardText: this.shared ? "" : i.getShareRewardText()
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        this.backgroundPositionInterval || (this.backgroundPosition || (this.backgroundPosition = {
            x: 0 == e.randomInt(0, 1) ? e.randomInt(500, 1e3) : -e.randomInt(500, 1e3),
            y: 0 == e.randomInt(0, 1) ? e.randomInt(500, 1e3) : -e.randomInt(500, 1e3)
        }, this.setData({
            backgroundPosition: this.backgroundPosition.x + "rpx " + this.backgroundPosition.y + "rpx "
        })), this.backgroundPositionInterval = setInterval(function() {
            t.backgroundPosition.x += 0 == e.randomInt(0, 1) ? e.randomInt(500, 1e3) : -e.randomInt(500, 1e3), 
            t.backgroundPosition.y += 0 == e.randomInt(0, 1) ? e.randomInt(500, 1e3) : -e.randomInt(500, 1e3), 
            t.setData({
                backgroundPosition: t.backgroundPosition.x + "rpx " + t.backgroundPosition.y + "rpx "
            });
        }, 1e4));
        var a = n.fastGet("rank_friend");
        a.wait(500), a.call(function() {
            var a = wx.createAnimation({
                timingFunction: "ease-out",
                duration: 400
            });
            a.translate3d(0, "0px", 0).step();
            var e = t.data;
            e.ani_head_panel = a.export(), t.setData(e);
        }), a.wait(400), a.call(function() {
            var a = wx.createAnimation({
                timingFunction: "ease-out",
                duration: 200
            });
            a.translate3d(0, "21px", 0).opacity(1).step();
            var e = t.data;
            e.ani_head_title = a.export(), t.setData(e);
        }), a.wait(300), a.call(function() {
            var a = wx.createAnimation({
                timingFunction: "ease-out",
                duration: 200
            });
            a.scale(1).step();
            var e = t.data;
            e.ani_head_hole = a.export(), t.setData(e);
        }), a.wait(300), a.call(function() {
            var a = wx.createAnimation({
                timingFunction: "ease-out",
                duration: 600
            });
            a.translate3d(0, 0, 0).step();
            var e = t.data;
            e.ani_list = a.export(), t.setData(e);
        });
    },
    onHide: function() {
        this.backgroundPositionInterval && (clearInterval(this.backgroundPositionInterval), 
        this.backgroundPositionInterval = void 0);
    },
    onUnload: function() {
        n.removeTweens("rank_friend"), i.eventDispatcher.removeEventListener("shareTextUpdate", this.onShareTextUpdate, this);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        this.shared = !0;
        var a = i.shareManager.getCompareShareData("rank_friends");
        return i.shareConf(a);
    },
    goto_lastseason: function(t) {
        var a = this, e = n.fastGet("rank_friend"), i = wx.createAnimation({
            timingFunction: "ease-out",
            duration: 200
        });
        i.translate3d(0, "0px", 0).opacity(0).step();
        var r = {};
        r.ani_head_title = i.export(), r.tabPage = 2, r.ani_list_last = wx.createAnimation().export(), 
        t && (r.lastSeasonRank = t), r.left_btn_last = -400, this.setData(r), e.wait(200), 
        e.call(function() {
            var t = wx.createAnimation({
                timingFunction: "ease-out",
                duration: 600
            });
            t.translate3d(0, 0, 0).step();
            var e = {};
            e.ani_list_last = t.export(), a.setData(e);
        }), e.wait(650), e.call(function() {
            var t = {};
            t.left_btn_back = 0, a.setData(t);
        });
    },
    btn_goto_lastseason: function() {
        var t = this;
        this.data.lastSeasonRank ? this.goto_lastseason(null) : (e.showLoading("加载中..."), 
        a.lastWorldMatch(function(a, n) {
            if (e.hideLoading(), a) console.warn(a); else if (n && n.list) {
                var r = n.list, o = !0, s = !1, c = void 0;
                try {
                    for (var l, u = r[Symbol.iterator](); !(o = (l = u.next()).done); o = !0) {
                        var d = l.value, h = Math.floor(d.score / 100);
                        h > 300014 && (h = 300014), d.matchName = e.GetMatchInfo(h).name, d.star = d.score - 100 * h, 
                        d.uid == i.mainData.role.uid && (d.nickName = "我"), d.cupsSource = i.formatUserCups(d);
                    }
                } catch (a) {
                    s = !0, c = a;
                } finally {
                    try {
                        !o && u.return && u.return();
                    } finally {
                        if (s) throw c;
                    }
                }
                t.goto_lastseason(r);
            }
        }));
    },
    btn_goto_curseason: function() {
        var t = this, a = {};
        a.tabPage = 0, a.ani_list = wx.createAnimation().export(), a.left_btn_back = 400, 
        this.setData(a);
        var e = n.fastGet("rank_friend"), i = wx.createAnimation({
            timingFunction: "ease-out",
            duration: 200
        });
        i.translate3d(0, "21px", 0).opacity(1).step();
        var r = {};
        r.ani_head_title = i.export(), this.setData(r), e.wait(200), e.call(function() {
            var a = wx.createAnimation({
                timingFunction: "ease-out",
                duration: 600
            });
            a.height("100%").step();
            var e = {};
            e.ani_list = a.export(), t.setData(e);
        }), e.wait(650), e.call(function() {
            var a = {};
            a.left_btn_last = 0, t.setData(a);
        });
    }
});