var t = require("../../utils/fetch").fetch;

getApp();

Component({
    data: {
        lists: [],
        tid: ""
    },
    properties: {
        ssid: Number
    },
    ready: function() {
        console.log("@,@", this.data), this.getListInfo(this.data.ssid);
    },
    methods: {
        changeNewlist: function(t) {
            var e = t.currentTarget.dataset.seaid;
            wx.reportAnalytics("pgcvideo_relate_click", {}), this.triggerEvent("updatePlayStat", {
                id: e,
                type: 2,
                backTop: !0
            }, {
                bubbles: !0
            });
        },
        getListInfo: function(e) {
            var i = this;
            t({
                url: "https://api.bilibili.com/pgc/web/recommend/related/recommend?season_id=" + e
            }).then(function(t) {
                i.setData({
                    lists: t.data.result
                });
            }).catch(function(t) {
                console.log(t);
            });
        }
    }
});