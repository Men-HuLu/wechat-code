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
}(), t = require("../../../net/dailyTask.js"), r = require("../../../util/util.js"), n = require("../../../util/daliyTask/DailyTaskData.js"), s = require("../../../const/consts.js"), o = function() {
    function o() {
        var a = this;
        e(this, o), this.data = {
            taskLevelDetail: "中级",
            groupId: 2,
            status: 0,
            getAwardState: "",
            awardID: 201010,
            tasks: [ {
                name: "任务名称1",
                content: "任务描述2",
                condVal: 6,
                progress: 6
            }, {
                name: "任务名称2",
                content: "任务描述2",
                condVal: 6,
                progress: 0
            }, {
                name: "任务名称3",
                content: "任务描述2",
                condVal: 6,
                progress: 0
            } ]
        }, this.tapEvents = {
            onDailyTaskGetAwardTap: function(e) {
                console.log("on tap get award"), a.data.btnOpenBoxState;
            },
            onDailyTaskCloseTap: function(e) {
                console.log("on tap close daily task"), a.close();
            }
        };
    }
    return a(o, [ {
        key: "onLoad",
        value: function() {
            this.buildData();
        }
    }, {
        key: "buildData",
        value: function() {
            var e = this;
            t.list(function(a, t) {
                if (a) {
                    if (a.errCode == s.ExitCode.RequestErr) return void getApp().exitGame(a.errCode);
                    if (404 === a.errCode) return;
                    r.ShowToast(a.errMsg);
                } else {
                    n.setTaskData(t);
                    var o = t;
                    switch (t.groupId) {
                      case 0:
                        o.taskLevelDetail = "初级", o.awardID = "201010";
                        break;

                      case 1:
                        o.taskLevelDetail = "高级", o.awardID = "201011";
                        break;

                      case 2:
                        o.taskLevelDetail = "超级", o.awardID = "201012";
                    }
                    1 === t.status ? o.getAwardState = "enable" : o.getAwardState = "disable", e.data = o, 
                    e.setData(o);
                }
            });
        }
    } ]), o;
}();

module.exports = o;