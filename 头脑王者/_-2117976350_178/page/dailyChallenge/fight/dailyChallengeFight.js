var e = require("./../../../util/util.js"), t = require("./../../../util/DailyChallengeManager.js"), i = require("./template/dcRevivalView.js"), a = require("./template/dcResultView.js"), s = require("./../../../util/daliyTask/DailyTaskNotifiyView.js"), o = getApp(), n = {
    none: require("./state/dcStateNone.js"),
    findQuiz: require("./state/dcStateFindQuiz.js"),
    choose: require("./state/dcStateChoose.js"),
    chooseEnd: require("./state/dcStateChooseEnd.js"),
    test: require("./state/dcStateTest.js")
}, r = {
    data: {
        battleViewData: {
            answer: [ {
                index: 0,
                answer: "1",
                className: "",
                lImg: 0
            }, {
                index: 1,
                answer: "2",
                className: "",
                lImg: 0
            }, {
                index: 2,
                answer: "3",
                className: "",
                lImg: 0
            }, {
                index: 3,
                answer: "4",
                className: "",
                lImg: 0
            } ]
        }
    },
    onLoad: function(t) {
        this.dailyTaskNotifiyView = new s(this), e.addSound(this, "win", "https://question-resource-wscdn.hortorgames.com/image/media/dailyChallenge/win.wav", !1), 
        e.addSound(this, "lose", "https://question-resource-wscdn.hortorgames.com/image/media/dailyChallenge/lose.mp3", !1), 
        e.addSound(this, "point", "https://question-resource-wscdn.hortorgames.com/image/media/dailyChallenge/point.wav", !1), 
        e.addSound(this, "warnning", "https://question-resource-wscdn.hortorgames.com/image/media/dailyChallenge/warnning.wav", !1), 
        e.showShareMenu(), this.init(t);
    },
    onReady: function() {},
    onShow: function() {
        this.dcRevivalView.onShow(), this.dailyTaskNotifiyView.onShow();
    },
    onHide: function() {
        this.isShow = !1, this.dailyTaskNotifiyView.onHide();
    },
    onUnload: function() {
        this.isEnd = !0, this.curState.end(), e.destoryAudio(this), this.audioFalseCtx && this.audioFalseCtx.destroy(), 
        this.audioTrueCtx && this.audioTrueCtx.destroy(), this.audioTapCtx && this.audioTapCtx.destroy(), 
        this.dailyTaskNotifiyView.onUnload();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var t = this, i = void 0;
        return i = e && e.target && "win" == e.target.id ? o.shareManager.getDCShareData("dc_win") : e && e.target && "lose" == e.target.id ? o.shareManager.getDCShareData("dc_lose") : o.shareManager.getDCShareData("dc_normal"), 
        o.shareConf(i, !0, function() {
            t.dcRevivalView.onShare();
        }, function() {});
    },
    init: function(e) {
        var s = t.getRes(e.id), r = {};
        r.itemIconUrl = 2e5 == s.itemId ? "https://question-resource-wscdn.hortorgames.com/image/new_skin/home/icon_money.png" : "https://question-resource-wscdn.hortorgames.com/image/new_skin/daily_challenge/icon_clover.png", 
        r.bonus1 = s.bonus1, r.bonus2 = s.bonus2, r.bonus3 = s.bonus3, r["battleViewData.question"] = "最多三十五个字的题目最多三十五个字的题目最多三十五个字的题目最多三十五？", 
        r["battleViewData.questionTypeName"] = "文学", r["battleViewData.countDown"] = 10, 
        r["battleViewData.roundText"] = "第一题", this.setData(r), this.dcRevivalView = new i(this), 
        this.dcResultView = new a(this), this.curState = new n.none(this), t.beginFight(e.id), 
        this.stateChange("findQuiz", {
            entry: !0
        }), (o.mainData.role.settingsInfo || {}).soundOff || (wx.createInnerAudioContext && !this.audioFalseCtx && (this.audioFalseCtx = wx.createInnerAudioContext(), 
        this.audioFalseCtx.autoplay = !1, this.audioFalseCtx.src = "https://question-resource-wscdn.hortorgames.com/image/soundEffect/answer_wrong.wav"), 
        wx.createInnerAudioContext && !this.audioTrueCtx && (this.audioTrueCtx = wx.createInnerAudioContext(), 
        this.audioTrueCtx.autoplay = !1, this.audioTrueCtx.src = "https://question-resource-wscdn.hortorgames.com/image/soundEffect/answer_correct.wav"), 
        wx.createInnerAudioContext && !this.audioTapCtx && (this.audioTapCtx = wx.createInnerAudioContext(), 
        this.audioTapCtx.autoplay = !1, this.audioTapCtx.src = "https://question-resource-wscdn.hortorgames.com/image/soundEffect/button_click.wav"));
    },
    stateChange: function(e, t) {
        this.isEnd || (t = t || {}, this.curState.end(), this.curState = new n[e](this), 
        this.curState.start(t));
    },
    onTapChooseBtn: function(e) {
        this.btnLock || (this.audioTapCtx && this.audioTapCtx.play(), this.curState && this.curState.mySelect && this.curState.mySelect(e.currentTarget.dataset.index));
    }
};

Page(r);