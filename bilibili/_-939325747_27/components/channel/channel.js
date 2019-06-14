Component({
    data: {
        lists: [],
        tid: ""
    },
    properties: {
        lists: Array
    },
    methods: {
        changeNewlist: function(t) {
            var e = t.currentTarget.dataset.aid;
            wx.reportAnalytics("video_relate_click", {
                video_relate_click: e
            }), this.triggerEvent("updatePlayStat", {
                id: e
            }, {
                bubbles: !0
            });
        }
    }
});