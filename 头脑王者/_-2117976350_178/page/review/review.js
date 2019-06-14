var t = require("./../../util/PVERoomDataManager.js"), e = (require("./../../const/consts.js"), 
require("./../../util/Tween.js")), i = require("./../../util/util.js"), n = require("./../../net/fightNet.js"), a = require("./template/QuizCommentController.js"), o = getApp();

Page({
    data: {
        review: null,
        index: 0,
        report: null,
        leftGray: !0,
        rightGray: !1,
        isFullView: !1
    },
    onLoad: function(e) {
        var r = this;
        i.showShareMenu(), this.lastPage = 0, this.quizCommentController = new a(this);
        var s = t.getData();
        this.roomId = s.roomId, n.review(this.roomId, function(e, n) {
            if (e) i.ShowConfirm("提示", e, function() {
                wx.navigateBack({
                    delta: 1
                });
            }); else {
                if (!n || 0 == n.length) return i.ShowToast("获取题目失败。"), void wx.navigateBack({
                    delta: 1
                });
                var a = t.getReviewData();
                a.items = new Array(n.length);
                for (var s = 0; s < n.length; s++) {
                    var u = n[s];
                    s > 0 && (u.mScore += n[s - 1].mScore, u.tScore += n[s - 1].tScore), r.questionAdaptor(s + 1, u);
                }
                var l = {};
                if (l.review = a, l.report = r.initReportData(n.length), r.setData(l), r.quizCommentController.isCommentOpen()) {
                    var m = n[0].quizId;
                    r.quizCommentController.request_listBase(m, function(t) {
                        r.isIphoneX = o.systemInfo.windowHeight > 700;
                        var e = {};
                        e.isCommentOpen = !0, e["review.items[0].praiseNum"] = t.praiseNum, e["review.items[0].isPraise"] = t.isPraise, 
                        e.isIphoneX = r.isIphoneX, e.commentMaxHeight = o.systemInfo.windowHeight - 133 - (r.isIphoneX ? 50 : 0), 
                        r.setData(e), r.playInAni();
                    });
                } else {
                    var c = {};
                    c.isCommentOpen = !1, r.setData(c), r.playInAni();
                }
            }
        });
    },
    questionAdaptor: function(e, i) {
        for (var n = [], a = 0; a < i.options.length; a++) {
            var o = i.options[a], r = i.answer - 1, s = i.mChoose - 1, u = i.tChoose - 1, l = {};
            l.answer = o, l.index = a, l.lImg = s == a ? s == r ? 2 : 1 : 0, l.rImg = u == a ? u == r ? 2 : 1 : 0, 
            l.className = r == a ? "true" : s == a || u == a ? "false" : "", l.ani = null, n.push(l);
        }
        t.addReviewQuestion(i.quizId, e, i.title, n, i.imageId, {
            left: "" + i.mScore,
            right: "" + i.tScore
        });
    },
    initReportData: function(e) {
        var i = t.getReport();
        return i.blackQuiz_submit || (i.blackQuiz_submit = new Array(e)), i;
    },
    checkReportChanged: function() {
        var e = t.getReport(), i = this.data.report;
        if (!i) return !1;
        for (var n = 0; n < i.blackQuiz_submit.length; n++) if (i.blackQuiz_submit[n] != e.blackQuiz_submit[n]) return !0;
        return !1;
    },
    onReady: function() {},
    onShow: function() {},
    playInAni: function() {
        var t = this, i = e.fastGet("review", !0);
        i.wait(1500), i.call(function() {
            var e = wx.createAnimation();
            e.translate3d(0, "10px", 0).step({
                timingFunction: "ease-out",
                duration: 200
            }), e.translate3d(0, 0, 0).step({
                timingFunction: "ease-in",
                duration: 200
            });
            var i = {};
            i.ani_top = e.export(), t.setData(i);
        }), i.wait(100), this.quizCommentController.isCommentOpen() ? (i.call(function() {
            var e = o.systemInfo.windowHeight - 133 - (t.isIphoneX ? 50 : 0) - 150, i = wx.createAnimation();
            i.bottom(10 - e + "px").step({
                timingFunction: "ease-out",
                duration: 200
            }), i.bottom(-e + "px").step({
                timingFunction: "ease-in",
                duration: 200
            });
            var n = {};
            n.ani_bottom = i.export(), t.setData(n);
        }), i.wait(400), i.call(function() {
            var e = wx.createAnimation();
            e.translate3d(0, "40px", 0).step({
                timingFunction: "ease-out",
                duration: 200
            }), e.translate3d(0, "50px", 0).step({
                timingFunction: "ease-in",
                duration: 200
            });
            var n = {};
            n.ani_input = e.export(), t.setData(n), i.wait(400);
        })) : (i.call(function() {
            var e = o.systemInfo.windowHeight - 133 - (t.isIphoneX ? 50 : 0) - 150, i = wx.createAnimation();
            i.bottom(10 - e + "px").step({
                timingFunction: "ease-out",
                duration: 200
            }), i.bottom(-e + "px").step({
                timingFunction: "ease-in",
                duration: 200
            });
            var n = {};
            n.ani_bottom = i.export(), t.setData(n);
        }), i.wait(400)), i.call(function() {
            var e = wx.createAnimation();
            e.scale(1.2).step({
                timingFunction: "ease-out",
                duration: 200
            }), e.scale(1).step({
                timingFunction: "ease-in",
                duration: 200
            });
            var i = {};
            i.ani_center = e.export(), t.setData(i);
        }), i.wait(200), i.call(function() {
            var e = wx.createAnimation();
            e.opacity(1).translate3d("4px", 0, 0).step({
                timingFunction: "ease-out",
                duration: 200
            }), e.opacity(1).translate3d(0, 0, 0).step({
                timingFunction: "ease-in",
                duration: 200
            });
            var i = {};
            i.ani_right = e.export(), t.setData(i);
        });
    },
    onHide: function() {},
    onUnload: function() {
        e.removeTweens("review"), this.quizCommentController.onUnload(), this.checkReportChanged() && this.finlSubmit();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        n.shareResult(this.roomId, function(t, e) {
            t && console.log("shareResult err", t);
        });
        var t = o.shareManager.getReviewShareData(this.roomId);
        return o.shareConf(t, !0);
    },
    onTapBtnLeft: function(t) {
        if (!this.data.isCommentInputing && this.data.index > 0) {
            var e = this.data.index - 1, i = {};
            i.index = e, this.setData(i);
        }
    },
    onTapBtnRight: function(t) {
        if (!this.data.isCommentInputing && this.data.index < this.data.review.items.length - 1) {
            var e = this.data.index + 1, i = {};
            i.index = e, this.setData(i);
        }
    },
    onTapBlackQuiz: function(t) {
        var e = this;
        this.data.isCommentInputing || i.ShowConfirmCancel("举报", "这道题目有错误", function() {
            var t = {};
            t["report.blackQuiz_submit[" + e.data.index + "]"] = !e.data.report.blackQuiz_submit[e.data.index], 
            e.setData(t);
        });
    },
    finlSubmit: function() {
        for (var e = "", i = 0; i < this.data.report.blackQuiz_submit.length; i++) this.data.report.blackQuiz_submit[i] && (e.length > 0 && (e += ","), 
        e += "" + (i + 1));
        t.setReport(this.data.report), n.playerReport(this.roomId, null, null, e, function(t, e) {});
    },
    onSwiperChange: function(t) {
        console.log("<onSwiperChange> e:", t);
        var e = {};
        e.leftGray = 0 == t.detail.current, e.rightGray = t.detail.current == this.data.review.items.length - 1, 
        this.setData(e);
    },
    onBindanimationfinish: function(t) {
        var e = this;
        console.log("<onBindanimationfinish> e:", t);
        var i = t.detail.current;
        if (this.lastPage != i) {
            if (this.quizCommentController.isCommentOpen()) {
                var n = this.data.review.items[i].quizId;
                this.quizCommentController.request_listBase(n, function(t) {
                    e.btnLock = !1;
                    var n = {};
                    n.index = i, n["review.items[" + i + "].praiseNum"] = t.praiseNum, n["review.items[" + i + "].isPraise"] = t.isPraise, 
                    e.setData(n);
                }, function() {
                    e.btnLock = !1;
                });
            } else {
                var a = {};
                a.index = i, this.setData(a), this.btnLock = !1;
            }
            this.lastPage = i;
        }
    }
});