var a = require("../../../util/daliyTask/DailyTaskData.js"), e = {
    properties: {
        visible: {
            type: Boolean,
            value: !0,
            observer: function(a, e) {}
        }
    },
    data: {
        someData: {},
        status: 1,
        groupId: -1,
        tasks: []
    },
    created: function() {},
    attached: function() {
        var a = getApp();
        a.eventDispatcher.addEventListener("dailyTaskDataRefreshed", this.onTaskChanged, this), 
        a.eventDispatcher.addEventListener("onPageShow", this.onPageShow, this);
    },
    ready: function() {},
    moved: function() {},
    detached: function() {
        var a = getApp();
        a.eventDispatcher.removeEventListener("dailyTaskDataRefreshed", this.onTaskChanged, this), 
        a.eventDispatcher.removeEventListener("onPageShow", this.onPageShow, this);
    },
    methods: {
        onPageShow: function(a) {
            "cover" == a.data && this.onTaskChanged();
        },
        onTaskChanged: function() {
            var e = {};
            e.groupId = a.dailyTasks.groupId, e.status = a.dailyTasks.status, e.tasks = [];
            for (var t in a.dailyTasks.tasks) {
                var s = a.dailyTasks.tasks[t];
                s.progress >= s.condVal && e.tasks.push(s);
            }
            this.setData(e);
        }
    }
};

Component(e);