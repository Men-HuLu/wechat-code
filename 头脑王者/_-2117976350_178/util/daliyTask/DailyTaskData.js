require("../../const/consts.js"), require("../../const/modeConsts.js"), require("../../net/connectNotify.js");

var s = require("../../net/dailyTask.js");

module.exports = {
    dailyTasks: {
        tasks: [ {
            tid: 4,
            name: "排位赛",
            content: "每日挑战胜利1次",
            condVal: 1,
            progress: 0
        }, {
            tid: 12,
            name: "答题",
            content: "正确回答1道文艺题",
            condVal: 1,
            progress: 0
        }, {
            tid: 11,
            name: "答题",
            content: "正确回答1道健康题",
            condVal: 1,
            progress: 0
        } ],
        groupId: 0,
        status: 0
    },
    taskComplete: [],
    getTask: function(s) {
        for (var t = 0; t < this.dailyTasks.tasks.length; t++) {
            var a = this.dailyTasks.tasks[t];
            if (a.tid == s) return a;
        }
        return null;
    },
    refresh: function() {
        var t = this;
        s.list(function(s, a) {
            s ? console.error(s) : t.setTaskData(a);
        });
    },
    completeTaskByHand: function(s) {
        var t = this.getTask(s);
        if (t) {
            t.progress = t.condVal;
            var a = !0, e = !0, r = !1, n = void 0;
            try {
                for (var i, o = this.dailyTasks.tasks[Symbol.iterator](); !(e = (i = o.next()).done); e = !0) {
                    var l = i.value;
                    if (l.condVal != l.progress) {
                        a = !1;
                        break;
                    }
                }
            } catch (s) {
                r = !0, n = s;
            } finally {
                try {
                    !e && o.return && o.return();
                } finally {
                    if (r) throw n;
                }
            }
            a && 0 == this.dailyTasks.status && (this.dailyTasks.status = 1);
        }
    },
    setTaskData: function(s) {
        this.dailyTasks = s, getApp().eventDispatcher.dispatchEventWith("dailyTaskDataRefreshed");
    }
};