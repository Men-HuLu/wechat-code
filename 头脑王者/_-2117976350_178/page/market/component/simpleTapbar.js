require("../../../const/consts.js"), require("../../../const/notifyConsts.js");

var e = require("../../../util/util.js");

require("../../../net/connectNotify.js"), require("../../../net/messageNet.js");

Component({
    properties: {
        items: {
            type: [],
            value: [ "item1", "item2", "item3" ],
            observer: function(e, t) {}
        },
        indexNormal: {
            type: Number,
            value: 0,
            observer: function(e, t) {
                this._setPage(e);
            }
        },
        rectWidth: {
            type: Number,
            value: 750,
            observer: function(e, t) {}
        },
        colorItemNorml: {
            type: String,
            value: "#FFFFFF",
            observer: function(e, t) {}
        },
        colorItemSelected: {
            type: String,
            value: "#7FEEFF",
            observer: function(e, t) {}
        },
        colorLine: {
            type: String,
            value: "#FFFFFF",
            observer: function(e, t) {}
        },
        badgeUrl: {
            type: String,
            value: null,
            observer: function(e, t) {}
        },
        badgeWidth: {
            type: Number,
            value: 95,
            observer: function(e, t) {}
        },
        badgeHeight: {
            type: Number,
            value: 59,
            observer: function(e, t) {}
        }
    },
    created: function() {},
    attached: function() {
        for (var t = [], i = 0; i < this.properties.items.length; i++) t.push(!1);
        var r = getApp(), n = {};
        n.selectedIndex = this.properties.indexNormal, n.linex = this.properties.rectWidth / this.properties.items.length * this.properties.indexNormal, 
        n.badgeStatus = t, n.isHeightWX = e.compareVersion(r.systemInfo.version, "6.6.1") > 0, 
        this.setData(n);
    },
    ready: function() {},
    moved: function() {},
    detached: function() {},
    data: {
        selectedIndex: 0,
        linex: 0,
        badgeStatus: []
    },
    methods: {
        callback_item_clicked: function(e) {
            var t = e.currentTarget.dataset.index;
            this._setPage(t);
        },
        _setPage: function(e) {
            var t = {};
            t.selectedIndex = e, t.linex = this.properties.rectWidth / this.properties.items.length * e, 
            this.setData(t), this.triggerEvent("onItemClicked", {
                index: e
            });
        },
        setBadgeStatus: function(e) {
            if (e) {
                for (var t = {}, i = 0; i < e.length; i++) {
                    if (i >= this.data.badgeStatus.length) return;
                    t["badgeStatus[" + i + "]"] = e[i];
                }
                this.setData(t);
            }
        }
    }
});