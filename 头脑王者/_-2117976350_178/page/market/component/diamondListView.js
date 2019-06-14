require("./../../../data/ItemsManager.js");

var e = require("./../../../util/util.js");

Component({
    properties: {
        index: {
            type: Number,
            value: 0,
            observer: function(e, t) {
                this.onPageChanged(e, t);
            }
        },
        dataSource: {
            type: [],
            value: [],
            observer: function(e, t) {}
        },
        myIndex: {
            type: Number,
            value: 0,
            observer: function(e, t) {}
        }
    },
    data: {},
    attached: function() {
        getApp();
    },
    methods: {
        onPageChanged: function(e, t) {
            var i = 750 * (this.properties.myIndex - e), r = {};
            r.viewStyle = this.getStyle(i), this.setData(r);
        },
        callback_item_clicked: function(e) {
            var t = e.currentTarget.dataset.pid;
            this.triggerEvent("onDiamondClicked", {
                idSelected: t
            });
        },
        getStyle: function(t) {
            var i = getApp().systemInfo.version;
            return e.compareVersion(i, "6.6.1") > 0 ? "transition:all 0.2s ease-out;position:absolute;left:0px;top:0px;width:100%;height:100%;transform: translate3d(" + t + "rpx,0,0);" : "position:absolute;left:" + t + "rpx;top:0px;width:100%;height:100%;";
        }
    }
});