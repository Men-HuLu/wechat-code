function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), n = require("./../../../net/connectNotify.js"), i = require("./../../../const/notifyConsts.js"), o = require("./../../../util/util.js"), a = (require("./../../../const/consts.js"), 
getApp()), r = function() {
    function r(t) {
        var n = this;
        e(this, r), this.page = t, this.registerConnectNotify(), this.page.on_notice_banner_clicked = function(e) {
            console.log("on_notice_banner_clicked~");
        }, this.page.onTapNoticeViewBtn = function() {
            n.onTapNoticeViewBtn();
        };
    }
    return t(r, [ {
        key: "initNoctice",
        value: function(e) {
            for (var t = {
                noticeViewVisible: !1,
                noticeList: [],
                notice_banner_url: null
            }, n = o.getServerTime() / 1e3, i = a.mainData.role.noticeList || [], r = this.getShowEndIds(), c = 0; c < i.length; c++) {
                var s = i[c];
                if (s.endTime > n) {
                    if (e && r[s.id]) continue;
                    "banner" == s.title ? t.notice_banner_url = "https://question-resource-wscdn.hortorgames.com/image/new_skin/AD/" + s.content + ".png" : t.noticeList.push(s);
                }
            }
            return t.noticeViewVisible = !a.isNewUser() && t.noticeList.length > 0, {
                noticeData: t
            };
        }
    }, {
        key: "isNeedShow",
        value: function() {
            var e = a.mainData.role.noticeList || [], t = this.getShowEndIds(), n = !0, i = !1, o = void 0;
            try {
                for (var r, c = e[Symbol.iterator](); !(n = (r = c.next()).done); n = !0) if (!t[r.value.id]) return !0;
            } catch (e) {
                i = !0, o = e;
            } finally {
                try {
                    !n && c.return && c.return();
                } finally {
                    if (i) throw o;
                }
            }
            return !1;
        }
    }, {
        key: "setShowEndIds",
        value: function() {
            var e = a.mainData.role.noticeList || [], t = {}, n = !0, i = !1, r = void 0;
            try {
                for (var c, s = e[Symbol.iterator](); !(n = (c = s.next()).done); n = !0) {
                    var u = c.value;
                    t[u.id] = u;
                }
            } catch (e) {
                i = !0, r = e;
            } finally {
                try {
                    !n && s.return && s.return();
                } finally {
                    if (i) throw r;
                }
            }
            return o.setStorageSyncByDay("noticeIds", t, 1), console.log("生成新的noticeIds清单" + t), 
            !1;
        }
    }, {
        key: "removeShowEndId",
        value: function(e) {
            var t = this.getShowEndIds();
            t[e] = void 0, o.setStorageSyncByDay("noticeIds", t, 1);
        }
    }, {
        key: "getShowEndIds",
        value: function() {
            return o.getStorageSync("noticeIds") || {};
        }
    }, {
        key: "onShow",
        value: function() {
            this.isNeedShow() && (o.setPageData(this.page, this.initNoctice(!0)), this.setShowEndIds());
        }
    }, {
        key: "onShowAbs",
        value: function() {
            o.setPageData(this.page, this.initNoctice(!1)), this.setShowEndIds();
        }
    }, {
        key: "onShowInstert",
        value: function(e) {
            this.noticeFromWsconnect(e), o.setPageData(this.page, this.initNoctice(!0)), this.setShowEndIds();
        }
    }, {
        key: "noticeFromWsconnect",
        value: function(e) {
            if (e) {
                a.mainData.role.noticeList || (a.mainData.role.noticeList = []);
                for (var t = 0; t < a.mainData.role.noticeList.length; t++) {
                    var n = a.mainData.role.noticeList[t];
                    if (n.id == e.id) return n.endTime == e.endTime && this.removeShowEndId(n.id), void (a.mainData.role.noticeList[t] = e);
                }
                a.mainData.role.noticeList.push(e);
            }
        }
    }, {
        key: "closeNoticeForm",
        value: function() {
            o.setPageData(this.page, {
                "noticeData.noticeViewVisible": !1
            });
        }
    }, {
        key: "onTapNoticeViewBtn",
        value: function() {
            this.closeNoticeForm();
        }
    }, {
        key: "onActionGameBoard",
        value: function(e, t) {
            var n = {
                id: t[3],
                title: t[0],
                content: t[1],
                endTime: t[2]
            };
            this.onShowInstert(n);
        }
    }, {
        key: "registerConnectNotify",
        value: function() {
            n.register(i.ActionGameBoard, this.onActionGameBoard, this);
        }
    }, {
        key: "removeConnectNotify",
        value: function() {
            n.remove(i.ActionGameBoard, this.onActionGameBoard);
        }
    }, {
        key: "onUnload",
        value: function() {
            this.removeConnectNotify();
        }
    } ]), r;
}();

module.exports = r;