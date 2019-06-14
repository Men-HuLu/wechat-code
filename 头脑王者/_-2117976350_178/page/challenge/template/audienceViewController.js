function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, i, a) {
        return i && e(t.prototype, i), a && e(t, a), t;
    };
}(), i = (require("./../../../util/util.js"), require("./../../../const/consts.js"), 
require("./../../../util/Tween.js")), a = require("./../../../util/ChallengeRoomDataManager.js"), n = (getApp(), 
function() {
    function n(t, i) {
        e(this, n), this.page = t, this.node = i, this.sayList = [];
        var a = {};
        this.key = i || "audienceView", a[this.key] = {
            visible: !0,
            list: [],
            answerBgTop: -50
        }, this.page.setData(a);
    }
    return t(n, [ {
        key: "show",
        value: function(e) {}
    }, {
        key: "hide",
        value: function() {
            var e = {};
            this.key = this.node ? this.node : "audienceView", e[this.key] = {
                visible: !1
            }, this.page.setData(e);
        }
    }, {
        key: "setMemberList",
        value: function(e) {
            a.setMemberList(e), this.upDateMemberList();
        }
    }, {
        key: "addMember",
        value: function(e) {
            a.addMember(e), this.upDateMemberList();
        }
    }, {
        key: "removeMember",
        value: function(e) {
            a.removeMember(e), this.upDateMemberList();
        }
    }, {
        key: "upDateMemberData",
        value: function(e) {
            a.upDateMemberData(e), this.upDateMemberList();
        }
    }, {
        key: "upDateMemberList",
        value: function() {
            var e = [], t = void 0;
            if (a.curRoom.members) for (var i = 0; i < a.curRoom.members.length; i++) t = a.curRoom.members[i], 
            e.push(t);
            e.sort(function(e, t) {
                return t.lastEntryMs - e.lastEntryMs;
            });
            var n = {};
            n[this.key + ".list"] = e, this.page.setData(n);
        }
    }, {
        key: "remindAnswer",
        value: function(e, t) {
            this.sayList.push({
                nickName: e,
                qIndex: t
            }), this.playSayAnswerAnimation();
        }
    }, {
        key: "playSayAnswerAnimation",
        value: function() {
            var e = this;
            if (!this.playing && this.sayList.length > 0) {
                this.playing = !0;
                var t = i.fastGet("sayAnswer_Ani"), a = wx.createAnimation();
                a.top("0px").opacity(.82).step({
                    timingFunction: "linear",
                    duration: 300
                });
                var n = {};
                n[this.key + ".answerTopAni"] = a.export(), this.page.setData(n), t.wait(200), t.call(function() {
                    var t = wx.createAnimation();
                    t.left("0px").step({
                        timingFunction: "linear",
                        duration: 300
                    }), e.state = 2;
                    var i = {};
                    e.sayList.length > 0 && (i[e.key + ".nickName"] = e.sayList[0].nickName + "说：", 
                    i[e.key + ".qIndex"] = "" + e.sayList[0].qIndex), i[e.key + ".answerLeftAni"] = t.export(), 
                    e.page.setData(i), e.sayList.shift();
                }), t.wait(1300), t.call(function() {
                    var t = wx.createAnimation();
                    t.left("-1000rpx").step({
                        timingFunction: "linear",
                        duration: 200
                    });
                    var i = {};
                    i[e.key + ".answerLeftAni"] = t.export(), e.page.setData(i);
                }), t.wait(200), t.call(function() {
                    var t = wx.createAnimation();
                    t.left("1000rpx").step({
                        timingFunction: "step-start",
                        duration: 0
                    });
                    var i = {};
                    if (i[e.key + ".answerLeftAni"] = t.export(), e.page.setData(i), e.playing = !1, 
                    e.sayList.length > 0) e.playSayAnswerAnimation(); else {
                        var a = wx.createAnimation();
                        a.top("-50rpx").opacity(.82).step({
                            timingFunction: "linear",
                            duration: 300
                        });
                        var n = {};
                        n[e.key + ".answerTopAni"] = a.export(), e.page.setData(n);
                    }
                });
            }
        }
    }, {
        key: "clear",
        value: function() {
            this.sayList = [];
        }
    }, {
        key: "dispose",
        value: function() {
            i.removeTweens("sayAnswer_Ani"), this.clear();
        }
    } ]), n;
}());

module.exports = n;