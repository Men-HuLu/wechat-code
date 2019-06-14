Component({
    properties: {
        params: {
            type: Object,
            value: {},
            observer: function(r, a, t) {
                this.appParameter(r);
            }
        },
        oType: {
            type: String,
            value: {}
        }
    },
    data: {
        treasureShow: !1,
        appParam: ""
    },
    methods: {
        launchAppError: function(r) {
            console.log(r.detail.errMsg);
        },
        gotoHome: function() {
            wx.switchTab({
                url: "home"
            });
        },
        appParameter: function() {
            var r = this.data.params || {}, a = {}, t = this.data.oType;
            "live" === t ? (a = {
                roomId: r.room_id,
                isVertical: r.is_vertical,
                roomSrc: r.vertical_src,
                nrt: r.nrt
            }).parameter = {
                roomId: r.room_id,
                isVertical: r.is_vertical,
                roomSrc: r.vertical_src,
                nrt: r.nrt
            } : "video" === t && (a.parameter = {
                vid: this.data.params.vid,
                cover: r.video_pic,
                isVertical: r.is_vertical
            }), a.page = t, this.setData({
                appParam: JSON.stringify(a)
            });
        }
    },
    behaviors: [],
    created: function() {},
    attached: function() {},
    ready: function() {},
    moved: function() {},
    detached: function() {}
});