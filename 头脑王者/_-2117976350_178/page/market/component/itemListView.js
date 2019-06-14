require("./../../../data/ItemsManager.js");

var e = require("./../../../util/util.js");

Component({
    properties: {
        index: {
            type: Number,
            value: 0,
            observer: function(e, t) {}
        },
        dataSource: {
            type: [],
            value: [],
            observer: function(e, t) {
                console.log("数据源变化");
            }
        },
        myIndex: {
            type: Number,
            value: 0,
            observer: function(e, t) {}
        }
    },
    data: {
        endTime_onSale: null
    },
    attached: function() {
        var t = getApp();
        this.continue = !0;
        var i = {};
        i.isHeightWX = e.compareVersion(t.systemInfo.version, "6.6.1") > 0, this.setData(i), 
        this.update();
    },
    detached: function() {
        clearTimeout(this.timeOut), this.continue = !1;
    },
    methods: {
        onPageChanged: function(e, t) {
            var i = {};
            i.tapx = 750 * (this.properties.myIndex - e), this.setData(i);
        },
        callback_item_clicked: function(e) {
            var t = e.currentTarget.dataset.pid;
            this.triggerEvent("onItemClicked", {
                idSelected: t
            });
        },
        update: function() {
            var e = this;
            if (clearTimeout(this.timeOut), this.properties.dataSource && this.properties.dataSource.length > 0) {
                var t = this.endTime_onSale();
                t ? this.setData({
                    endTime_onSale: t
                }) : (this.continue = !1, this.setData({
                    endTime_onSale: null
                }));
            }
            this.continue && (this.timeOut = setTimeout(function() {
                e.update();
            }, 1e3));
        },
        endTime_onSale: function() {
            if (!this.properties.dataSource) return null;
            var t = e.getServerTimeBaseSecond();
            if (!this.endtime) {
                this.endtime = 0;
                for (var i = 0; i < this.properties.dataSource.length; i++) {
                    var n = this.properties.dataSource[i];
                    1 == n.onsale && (t >= n.startTime + n.duration ? n.onsale = 0 : this.endtime = Math.max(this.endtime, n.startTime + n.duration));
                }
            }
            if (this.endtime > 0) {
                var a = this.endtime - t;
                return a > 0 ? e.formatTime(a) : null;
            }
            return null;
        }
    }
});