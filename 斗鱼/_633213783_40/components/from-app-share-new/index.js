Component({
    data: {
        treasureShow: !1,
        appParam: {}
    },
    properties: {
        params: {
            type: Object,
            default: {},
            observer: function(r, a, e) {
                this.appParameter(r);
            }
        },
        oType: {
            type: String,
            default: ""
        }
    },
    ready: function() {
        console.log("from app share");
    },
    methods: {
        launchAppError: function(r) {
            console.log(r.detail.errMsg);
        },
        appParameter: function(r) {
            var a = r || {}, e = {}, t = this.data.oType;
            "live" === t ? (e = {
                roomId: a.room_id,
                isVertical: a.is_vertical,
                roomSrc: a.vertical_src,
                nrt: a.nrt
            }).parameter = {
                roomId: a.room_id,
                isVertical: a.is_vertical,
                roomSrc: a.vertical_src,
                nrt: a.nrt
            } : "video" === t && (e.parameter = {
                vid: this.data.params.vid,
                cover: a.video_pic,
                isVertical: a.is_vertical
            }), e.page = t, this.setData({
                appParam: JSON.stringify(e)
            });
        }
    }
});