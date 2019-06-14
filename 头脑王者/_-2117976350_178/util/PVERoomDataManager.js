function e(e, a) {
    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var a = function() {
    function e(e, a) {
        for (var t = 0; t < a.length; t++) {
            var r = a[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(a, t, r) {
        return t && e(a.prototype, t), r && e(a, r), a;
    };
}(), t = (require("./../net/connectNotify.js"), require("./../const/notifyConsts.js"), 
require("./../util/util.js")), r = void 0, i = function() {
    function i() {
        e(this, i);
    }
    return a(i, [ {
        key: "init",
        value: function(e) {
            r = e, this.setEmptyData();
        }
    }, {
        key: "setEmptyData",
        value: function(e) {
            var a = {
                type: "pve",
                roomId: 0,
                userInfo: {},
                rivalUser: {},
                viewNum: 0,
                fee: 0
            };
            this.initReview(a), r.mainData.roomData_pve = a;
        }
    }, {
        key: "initReview",
        value: function(e) {
            e.review = {
                items: [],
                userInfo: null,
                rivalUser: null
            };
        }
    }, {
        key: "getReviewData",
        value: function() {
            return r.mainData.roomData_pve.review;
        }
    }, {
        key: "setReviewPlayer",
        value: function(e, a) {
            var r = this.getReviewData();
            r.userInfo = e, e && (r.userInfo.avatarUrl = t.getWechatUrlBySize(r.userInfo.avatarUrl)), 
            r.rivalUser = a, a && (r.rivalUser.avatarUrl = t.getWechatUrlBySize(r.rivalUser.avatarUrl));
        }
    }, {
        key: "addReviewQuestion",
        value: function(e, a, r, i, n, o, u) {
            for (var l = 0; l < i.length; l++) {
                var s = i[l];
                s.scale = t.getTextScale(s.title, n ? 26 : 32, n ? 208 : 256);
            }
            var v = {
                quizId: e,
                question: r,
                answer: i,
                imageId: n,
                score: o,
                selected: u
            };
            this.getReviewData().items[a - 1] = v;
        }
    }, {
        key: "setReport",
        value: function(e) {
            this.getData().report = e;
        }
    }, {
        key: "getReport",
        value: function() {
            var e = this.getData();
            return e.report || (e.report = {
                reportEnabled: !0,
                reportVisible: !1,
                blackRole: !1,
                blackSubRole: !1,
                blackRole_submit: !1,
                blackQuiz_submit: null,
                blackSubRole_submit: !1,
                btnGray: !1
            }), e.report;
        }
    }, {
        key: "createBeginnerTestData",
        value: function() {
            var e = {
                type: "beginnerTest",
                roomId: 0,
                userInfo: {
                    uid: r.mainData.role.uid,
                    nickName: r.mainData.role.userInfo.nickName,
                    avatarUrl: r.mainData.role.userInfo.avatarUrl,
                    level: r.mainData.role.level,
                    city: t.getCity(r.mainData.role.userInfo.province, r.mainData.role.userInfo.city)
                },
                rivalUser: {},
                viewNum: 0,
                fee: 0
            };
            r.mainData.roomData_pve = e;
        }
    }, {
        key: "getData",
        value: function() {
            return r.mainData.roomData_pve || this.setEmptyData(), r.mainData.roomData_pve;
        }
    }, {
        key: "setData",
        value: function(e, a) {
            var t = null;
            if (a) this.initReview(e), r.mainData.roomData_pve = e, t = r.mainData.roomData_pve; else {
                t = this.getData();
                for (var i in e) t[i] = e[i];
            }
            return t;
        }
    }, {
        key: "fixPVEAvatarUrl",
        value: function() {
            var e = this.getData();
            e.rivalUser && e.rivalUser.uid < 1e7 && (e.rivalUser.avatarUrl = "https://question-resource-wscdn.hortorgames.com/image/npc/" + e.rivalUser.avatarUrl + ".png"), 
            e.userInfo && e.userInfo.uid < 1e7 && (e.userInfo.avatarUrl = "https://question-resource-wscdn.hortorgames.com/image/npc/" + e.userInfo.avatarUrl + ".png");
        }
    } ]), i;
}();

module.exports = new i();