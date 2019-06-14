function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var i = e[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, a, i) {
        return a && t(e.prototype, a), i && t(e, i), e;
    };
}(), a = require("./../../util/util.js"), i = (require("./../../const/modeConsts.js"), 
require("./../../const/notifyConsts.js"), require("./../../net/connectNotify.js"), 
require("./../../util/daliyTask/DailyTaskData.js")), n = require("./../../util/Tween.js"), s = getApp(), o = function() {
    function o(e) {
        t(this, o), this.page = e;
        var a = {};
        a.taskUpdate = {}, a["taskUpdate.visible"] = !1, a["taskUpdate.ani_move"] = null, 
        this.page.setData(a), this.hiding = !1;
    }
    return e(o, [ {
        key: "playAniShow",
        value: function() {
            var t = this;
            a.log("<playAniShow>播放消息动画");
            var e = n.fastGet("DailyTaskNotifiyView", !0);
            e.call(function() {
                var e = {};
                e["taskUpdate.visible"] = !0, t.page.setData(e);
            }), e.wait(100), e.call(function() {
                var e = wx.createAnimation();
                e.bottom("-60px").step({
                    timingFunction: "step-start",
                    duration: 0
                }), (e = wx.createAnimation()).bottom("0px").step({
                    timingFunction: "ease-in-out",
                    duration: 400
                });
                var a = {};
                a["taskUpdate.ani_move"] = e.export(), t.page.setData(a);
            }), e.wait(2e3), e.call(function() {
                var e = wx.createAnimation();
                e.bottom("-60px").step({
                    timingFunction: "ease-in-out",
                    duration: 400
                });
                var a = {};
                a["taskUpdate.ani_move"] = e.export(), t.page.setData(a);
            }), e.wait(400), e.call(function() {
                var e = {};
                e["taskUpdate.visible"] = !1, t.page.setData(e), t.showBanner();
            });
        }
    }, {
        key: "onShow",
        value: function() {
            this.hiding = !1, s.eventDispatcher.addEventListener("ActionTaskUpdate", this.onActionTaskUpdate, this);
        }
    }, {
        key: "onActionTaskUpdate",
        value: function() {
            a.log("<onActionTaskUpdate>推送转发 showbanner"), this.showBanner();
        }
    }, {
        key: "showBanner",
        value: function() {
            if (a.log("<showBanner>如果池子不为空 弹出一第条消息"), !this.hiding && 0 != i.taskComplete.length) {
                if (this.task = i.taskComplete[0], i.taskComplete.shift(), !i.getTask(this.task)) return a.log("任务不存在:", this.task), 
                void this.showBanner();
                var t = {};
                t["taskUpdate.context"] = "" + i.getTask(this.task).content, this.page.setData(t), 
                this.playAniShow();
            }
        }
    }, {
        key: "onHide",
        value: function() {
            this.hiding = !0, n.removeTweens("DailyTaskNotifiyView"), s.eventDispatcher.removeEventListener("ActionTaskUpdate", this.onActionTaskUpdate, this);
        }
    }, {
        key: "onUnload",
        value: function() {
            this.hiding = !0, n.removeTweens("DailyTaskNotifiyView"), s.eventDispatcher.removeEventListener("ActionTaskUpdate", this.onActionTaskUpdate, this);
        }
    } ]), o;
}();

module.exports = o;