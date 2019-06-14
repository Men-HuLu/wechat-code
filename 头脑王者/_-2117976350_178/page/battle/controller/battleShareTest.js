function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function i(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

var n = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
    };
}(), a = function t(e, i, n) {
    null === e && (e = Function.prototype);
    var a = Object.getOwnPropertyDescriptor(e, i);
    if (void 0 === a) {
        var o = Object.getPrototypeOf(e);
        return null === o ? void 0 : t(o, i, n);
    }
    if ("value" in a) return a.value;
    var s = a.get;
    if (void 0 !== s) return s.call(n);
}, o = require("./battleBase.js"), s = require("../../../net/shareTestNet.js"), r = require("../../../util/util.js"), u = require("../../../util/AnimationQueue.js"), c = require("../../../util/ActivityManager.js"), l = require("../../../data/ItemsManager.js"), h = getApp(), p = function(p) {
    function f() {
        t(this, f);
        var i = e(this, (f.__proto__ || Object.getPrototypeOf(f)).call(this));
        return i.selectOptions = 0, i;
    }
    return i(f, o), n(f, [ {
        key: "enter",
        value: function() {
            a(f.prototype.__proto__ || Object.getPrototypeOf(f.prototype), "enter", this).call(this), 
            this.activity = c.getActivity("shareTest"), this.activity && (this.title = this.activity.name, 
            wx.redirectTo({
                url: "/page/battle/battle"
            }));
        }
    }, {
        key: "onLoad",
        value: function(t) {
            a(f.prototype.__proto__ || Object.getPrototypeOf(f.prototype), "onLoad", this).call(this, t);
            var e = {};
            e.roundViewVisible = !0, e.questionViewVisible = !0, e.btnViewVisible = !0, e.shareTestBgVisible = !0, 
            e.shareTestType = this.activity.subType, this.battlePage.setData(e), this.roundView = this.battlePage.selectComponent("#roundView"), 
            this.questionView = this.battlePage.selectComponent("#questionView"), this.answerBtnList = [];
            for (var i = 0; i < 4; i++) this.answerBtnList.push(this.battlePage.selectComponent("#answerBtn" + i));
            this.stateChange("findQuiz");
        }
    }, {
        key: "onShareAppMessage",
        value: function(t) {
            a(f.prototype.__proto__ || Object.getPrototypeOf(f.prototype), "onShareAppMessage", this).call(this, t);
            var e = h.shareManager.getShareTestShareData();
            return h.shareConf(e, !0, function() {});
        }
    }, {
        key: "stateChange",
        value: function(t) {
            switch (this.curState = t, t) {
              case "findQuiz":
                this.stateFindQuiz();
                break;

              case "choose":
                this.stateChoose();
                break;

              case "chooseEnd":
                this.stateChooseEnd();
            }
        }
    }, {
        key: "stateFindQuiz",
        value: function() {
            var t = this;
            s.shareTest(this.activity.aid, this.selectOptions, function(e, i) {
                e ? r.ShowConfirm("", e.errMsg, function() {}) : (t.quizData = i, 0 == t.quizData.status ? t.playQuestionIn() : wx.redirectTo({
                    url: "/page/shareTest/shareTestEnd?imageId=" + t.quizData.result.imageId + "&headId=" + t.quizData.result.headInfo.id + "&btnText=" + t.quizData.result.btnText
                }), i.result && i.result.headInfo && i.result.headInfo.id > 0 && l.refreshNewFrameFlag());
            });
        }
    }, {
        key: "stateChoose",
        value: function() {
            this.btnLock = !1;
        }
    }, {
        key: "stateChooseEnd",
        value: function() {
            this.playQuestionOut();
        }
    }, {
        key: "playQuestionIn",
        value: function() {
            var t = this, e = u.get("questionIn", !0);
            e.wait(500), e.call(function() {
                t.roundView.inOut("第" + t.quizData.quiz.num + "题");
            }), e.wait(2e3), e.call(function() {
                t.questionView.in(t.quizData.quiz.quiz);
            }), e.wait(1e3), e.call(function() {
                for (var e = 0; e < t.answerBtnList.length; e++) t.answerBtnList[e].in({
                    index: e + 1,
                    answer: t.quizData.quiz.options[e],
                    textScale: r.getTextScale(t.quizData.quiz.options[e], 40, 334)
                });
            }), e.wait(500), e.call(function() {
                t.stateChange("choose");
            });
        }
    }, {
        key: "playQuestionOut",
        value: function() {
            var t = this, e = u.get("questionOut", !0);
            e.wait(1e3), e.call(function() {
                t.questionView.out();
                for (var e = 0; e < t.answerBtnList.length; e++) t.answerBtnList[e].out();
            }), e.wait(500), e.call(function() {
                t.stateChange("findQuiz");
            });
        }
    }, {
        key: "onTapChooseBtn",
        value: function(t) {
            if (a(f.prototype.__proto__ || Object.getPrototypeOf(f.prototype), "onTapChooseBtn", this).call(this, t), 
            !this.btnLock && "choose" == this.curState) {
                this.btnLock = !0;
                var e = this.answerBtnList[t - 1];
                this.selectOptions = t, e.setSelected(), this.stateChange("chooseEnd");
            }
        }
    }, {
        key: "fakeData",
        value: function() {
            return {
                status: 0,
                result: {
                    imageId: "",
                    headInfo: {
                        id: 0,
                        name: "",
                        desc: "",
                        type: 0,
                        expiredAt: 0
                    }
                },
                quiz: {
                    quiz: "题目",
                    options: [ "答案0", "答案1", "答案2", "答案3" ],
                    answer: 0,
                    num: 1
                }
            };
        }
    } ]), f;
}();

module.exports = p;