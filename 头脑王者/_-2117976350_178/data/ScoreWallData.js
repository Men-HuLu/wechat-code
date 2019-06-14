module.exports = {
    data: {
        tasks: [],
        wallInfo: {}
    },
    refreshInfo: function() {
        if (!this.data.tasks || 0 == this.data.tasks.length) return null;
        for (var t = 0; t < this.data.tasks.length; t++) {
            var a = this.data.tasks[t];
            if (0 == a.status) a.customState = 0; else if (1 == a.status) a.customState = 0; else if (a.status > 1) {
                var s = this.data.wallInfo["" + a.taskId];
                a.customState = 0 == s ? 1 : 1 == s ? 2 : 0;
            }
        }
    },
    hasNewReward: function() {
        if (!this.data.tasks || 0 == this.data.tasks.length) return !1;
        for (var t = 0; t < this.data.tasks.length; t++) {
            var a = this.data.tasks[t];
            if (a.status > 1 && 1 != this.data.wallInfo["" + a.taskId]) return !0;
        }
        return !1;
    }
};