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
}(), t = require("../util/util.js"), r = require("../data/MainData.js"), n = void 0, o = function() {
    function o() {
        e(this, o);
    }
    return a(o, [ {
        key: "init",
        value: function(e) {
            n = e;
        }
    }, {
        key: "getNormImage",
        value: function() {
            for (var e = n.mainData.role.allSeeds.shareConf.contents, a = 0; a < e.length; a++) {
                var t = e[a];
                if ("compare" == t.type) return "https://question-resource-wscdn.hortorgames.com/image/new_skin/AD/" + t.picture + "?v=" + n.mainData.role.allSeeds.shareConf.shareVer;
            }
            return "cut";
        }
    }, {
        key: "getDCShareData",
        value: function(e) {
            if (!n.mainData.role.allSeeds.shareConf) return {
                path: "/page/login/login",
                imageUrl: "cut"
            };
            var a = this.getBaseContent(e), t = n.mainData.role.allSeeds.shareConf.shareVer, r = a.text, o = t + "_" + a.key;
            return {
                title: r,
                path: "/page/login/login?friendCode=" + n.mainData.role.shareCode + "&dailyChallenge=true",
                from: "" + e,
                fromNum: o,
                imageUrl: a.picture
            };
        }
    }, {
        key: "getBaseContent",
        value: function(e) {
            if (n.mainData.role.allSeeds.shareConf) {
                for (var a = n.mainData.role.allSeeds.shareConf.contents, r = [], o = 0; o < a.length; o++) {
                    var i = a[o];
                    i.type == e && r.push(i);
                }
                var l = Math.floor(Math.random() * r.length), s = {};
                return s = t.assign(s, r[l]), s.text = s.text.replace("$nickName", n.mainData.role.userInfo.nickName), 
                s.picture && "cut" != s.picture && (s.picture = "https://question-resource-wscdn.hortorgames.com/image/new_skin/AD/" + s.picture + "?v=" + n.mainData.role.allSeeds.shareConf.shareVer), 
                s;
            }
            return {
                id: 0,
                type: "compare",
                key: 1,
                picture: "https://question-resource-wscdn.hortorgames.com/image/new_skin/AD/img_ad_new1.jpg",
                text: "群里分了百万现金的人居然是TA？"
            };
        }
    }, {
        key: "getCompareShareData",
        value: function(e) {
            if (!n.mainData.role.allSeeds.shareConf) return {
                path: "/page/login/login",
                imageUrl: "cut"
            };
            var a = this.getBaseContent("compare"), t = n.mainData.role.allSeeds.shareConf.shareVer, r = a.text, o = t + "_" + a.key;
            return {
                title: r,
                path: "/page/login/login?friendCode=" + n.mainData.role.shareCode + "&compare=true",
                from: e + "_compare",
                fromNum: o,
                imageUrl: a.picture
            };
        }
    }, {
        key: "getSeasonShareData",
        value: function(e, a, t) {
            var r = n.mainData.role.allSeeds.shareConf.shareVer, o = "", i = "", l = "";
            try {
                var s = "";
                (s = a <= 100 ? this.getBaseContent("season_100") : a <= 1e5 ? this.getBaseContent("season_100000") : this.getBaseContent("season_more")).text = s.text.replace("$seasonName", e), 
                s.text = s.text.replace("$rank", a), s.text = s.text.replace("$matchName", t), i = s.text, 
                l = s.picture, o = r + "_" + s.key;
            } catch (e) {}
            return {
                title: i,
                path: "/page/login/login?friendCode=" + n.mainData.role.shareCode + "&compare=true",
                from: "seasonReward",
                fromNum: o,
                imageUrl: l
            };
        }
    }, {
        key: "getPvPShareData",
        value: function(e) {
            var a = this.getBaseContent("pvp"), t = n.mainData.role.allSeeds.shareConf.shareVer, r = a.key;
            return {
                title: a.text,
                imageUrl: a.picture,
                path: "/page/login/login?friendCode=" + e.shareCode + "&liveFight=" + !0,
                from: "pvp",
                fromNum: t + "_" + r
            };
        }
    }, {
        key: "getSpecialLiveShareData",
        value: function(e) {
            var a = this.getBaseContent("special_pvp"), t = n.mainData.role.allSeeds.shareConf.shareVer, r = a.key;
            return {
                title: a.text,
                imageUrl: a.picture,
                path: "/page/login/login?friendCode=" + e.shareCode + "&specialLiveFight=" + !0,
                from: "special_pvp",
                fromNum: t + "_" + r
            };
        }
    }, {
        key: "getChallengeShareData",
        value: function(e) {
            var a = this.getBaseContent("challenge"), t = n.mainData.role.allSeeds.shareConf.shareVer;
            return {
                title: a.text,
                imageUrl: a.picture,
                from: "challenge",
                fromNum: t + "_" + a.key,
                path: "/page/login/login?friendCode=" + e + "&challenge=" + !0
            };
        }
    }, {
        key: "getPvrShareData",
        value: function(e) {
            var a = e.isWin ? "pvr_win" : "pvr_lose", t = this.getBaseContent(a), r = n.mainData.role.allSeeds.shareConf.shareVer, o = "/page/login/login?friendCode=" + e.friendCode + "&roomIdPvr=" + e.roomID, i = t.key;
            return {
                title: t.text,
                imageUrl: n.pvrShareImg2 || t.picture,
                path: o,
                from: a,
                fromNum: r + "_" + i
            };
        }
    }, {
        key: "getPvrShareData2",
        value: function(e) {
            var a = this.getBaseContent("pvr_me"), t = n.mainData.role.allSeeds.shareConf.shareVer, r = "/page/login/login?friendCode=" + e.friendCode + "&roomIdPvr=" + e.roomID, o = a.key;
            return {
                title: a.text,
                imageUrl: e.shareImage || a.picture,
                path: r,
                from: "pvr_me",
                fromNum: t + "_" + o
            };
        }
    }, {
        key: "getPvEShareData",
        value: function(e) {
            var a = this.getBaseContent("pve"), t = n.mainData.role.allSeeds.shareConf.shareVer, r = a.key;
            return {
                title: a.text,
                path: "/page/login/login?friendCode=" + n.mainData.role.shareCode + "&roomIdPvr=" + e,
                imageUrl: n.pvrShareImg || a.picture,
                from: "pve",
                fromNum: t + "_" + r
            };
        }
    }, {
        key: "getReviewShareData",
        value: function(e) {
            var a = this.getBaseContent("review"), t = n.mainData.role.allSeeds.shareConf.shareVer, r = a.key;
            return {
                title: a.text,
                path: "/page/login/login?friendCode=" + n.mainData.role.shareCode + "&roomIdPvr=" + e,
                imageUrl: a.picture || "cut",
                from: "review",
                fromNum: t + "_" + r
            };
        }
    }, {
        key: "getFightNormalShareData",
        value: function(e) {
            var a = this.getBaseContent("fight_defalt"), t = n.mainData.role.allSeeds.shareConf.shareVer, r = a.key;
            return {
                title: a.text,
                path: "/page/login/login?friendCode=" + e.shareCode + "&roomIdPvr=" + e.roomId,
                from: "fight_defalt",
                fromNum: t + "_" + r,
                imageUrl: a.picture
            };
        }
    }, {
        key: "getCashNormalShareData",
        value: function(e) {
            var a = this.getBaseContent("cash_normal");
            a.text = a.text.replace("$rmb", e);
            var t = n.mainData.role.allSeeds.shareConf.shareVer, r = a.key;
            return {
                title: a.text,
                path: "/page/login/login?friendCode=" + n.mainData.role.shareCode + "&cashGame=true",
                from: "cash_normal",
                fromNum: t + "_" + r,
                imageUrl: a.picture
            };
        }
    }, {
        key: "getCashCashWinShareData",
        value: function(e) {
            var a = this.getBaseContent("cash_win");
            a.text = a.text.replace("$rmb", e);
            var t = n.mainData.role.allSeeds.shareConf.shareVer, r = a.key;
            return {
                title: a.text,
                path: "/page/login/login?friendCode=" + n.mainData.role.shareCode + "&cashGame=true",
                from: "cash_win",
                fromNum: t + "_" + r,
                imageUrl: a.picture
            };
        }
    }, {
        key: "getCashCodeShareData",
        value: function(e) {
            var a = this.getBaseContent("cash_code"), t = n.mainData.role.allSeeds.shareConf.shareVer, o = a.key;
            return {
                title: a.text,
                path: "/page/login/login?friendCode=" + n.mainData.role.shareCode + "&cashGame=true&invitationCode=" + r.goldenHouse.baseInfo.invitationCode,
                from: "cash_code",
                fromNum: t + "_" + o,
                imageUrl: e || this.getNormImage()
            };
        }
    }, {
        key: "getShareAfterMillionCashShareData",
        value: function(e) {
            var a = this.getBaseContent("million_cash");
            a.text = a.text.replace("$beatNum", e);
            var t = n.mainData.role.allSeeds.shareConf.shareVer, r = a.key;
            return {
                title: a.text,
                path: "/page/login/login?friendCode=" + n.mainData.role.shareCode,
                from: "million_cash",
                fromNum: t + "_" + r,
                imageUrl: a.picture || this.getNormImage()
            };
        }
    }, {
        key: "getMillionShareData",
        value: function(e, a) {
            var t = this.getBaseContent("million_bannerShare");
            t.text = t.text.replace("$answerNum", e), t.text = t.text.replace("$matchName", a);
            var r = n.mainData.role.allSeeds.shareConf.shareVer, o = t.key;
            return {
                title: t.text,
                path: "/page/login/login?friendCode=" + n.mainData.role.shareCode,
                from: "million_cash",
                fromNum: r + "_" + o,
                imageUrl: t.picture || this.getNormImage()
            };
        }
    }, {
        key: "getMillionKingShareData",
        value: function(e) {
            var a = this.getBaseContent("million_bannerKingShare");
            a.text = a.text.replace("$beatNum", e);
            var t = n.mainData.role.allSeeds.shareConf.shareVer, r = a.key;
            return {
                title: a.text,
                path: "/page/login/login?friendCode=" + n.mainData.role.shareCode,
                from: "million_cash",
                fromNum: t + "_" + r,
                imageUrl: a.picture || this.getNormImage()
            };
        }
    }, {
        key: "getSpecialShareData",
        value: function(e) {
            var a = this.getBaseContent(e ? "commission_share" : "special_match"), t = n.mainData.role.allSeeds.shareConf.shareVer, r = a.key, o = a.text, i = e ? "&specialMatchZjw=true" : "";
            return {
                title: o,
                path: "/page/login/login?friendCode=" + n.mainData.role.shareCode + i,
                from: e ? "commission_share" : "request_ticket",
                fromNum: t + "_" + r,
                imageUrl: a.picture || this.getNormImage()
            };
        }
    }, {
        key: "getSpecial_request_ticket_ShareData",
        value: function(e, a) {
            var t = this.getBaseContent(a ? "commission_share" : "request_ticket"), r = n.mainData.role.allSeeds.shareConf.shareVer, o = t.key, i = t.text, l = a ? "specialMatchZjw=true" : "specialMatch=true";
            return {
                title: i,
                path: "/page/login/login?friendCode=" + n.mainData.role.shareCode + "&request_ticket=true&shareAid=" + e + "&" + l,
                from: a ? "commission_share" : "request_ticket",
                fromNum: r + "_" + o,
                imageUrl: t.picture || this.getNormImage()
            };
        }
    }, {
        key: "getShareTestShareData",
        value: function() {
            var e = this.getBaseContent("share_test"), a = n.mainData.role.allSeeds.shareConf.shareVer, t = e.key;
            return {
                title: e.text,
                path: "/page/login/login?friendCode=" + n.mainData.role.shareCode + "&shareTest=true",
                from: "share_test_result",
                fromNum: a + "_" + t,
                imageUrl: e.picture || this.getNormImage()
            };
        }
    }, {
        key: "getShareTestResultShareData",
        value: function(e) {
            var a = this.getBaseContent("share_test_result_" + e), t = n.mainData.role.allSeeds.shareConf.shareVer, r = a.key;
            return {
                title: a.text,
                path: "/page/login/login?friendCode=" + n.mainData.role.shareCode + "&shareTest=true",
                from: "share_test_result",
                fromNum: t + "_" + r,
                imageUrl: a.picture || this.getNormImage()
            };
        }
    } ]), o;
}();

module.exports = o;