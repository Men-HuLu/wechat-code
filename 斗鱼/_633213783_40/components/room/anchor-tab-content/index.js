function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../common/httpClient")), i = e(require("../../../config/index")), o = e(require("../../../common/util")), a = e(require("../../../common/navigator")), r = getApp();

Component({
    properties: {
        liveData: {
            type: Array,
            value: []
        },
        roomId: {
            type: String,
            value: "0",
            observer: function(e, t, i) {
                this.retry();
            }
        }
    },
    data: {
        isLoading: !0
    },
    methods: {
        clickLiveRoom: function(e) {
            var t = e.currentTarget.dataset, i = t.type, o = t.rid, r = t.isv;
            1 == i ? a.default.disDoubleRedirect("room?roomId=" + o + "&is_vertical=" + r) : a.default.disDoubleRedirect("video-room?videoId=" + o);
        },
        getHotRecommendData: function() {
            var e = this, a = this.properties.roomId, n = r.globalData.did;
            t.default.request(i.default.HOST + "/api/recom/room?rid=" + a + "&did=" + n).then(function(t) {
                if (e.setData({
                    isLoading: !1
                }), t) if (0 === parseInt(t.error, 10)) {
                    var i = (t.data || []).map(function(e) {
                        return e.hn = r.changeData(e.hn || 0, 1), e.view_num = r.changeData(e.view_num || 0, 1), 
                        e.video_duration = o.default.secToTime(e.video_duration || 0), e;
                    });
                    e.setData({
                        liveData: i
                    }), e.triggerEvent("getLiveData", i);
                } else console.log(t.data || "网络异常");
            }).catch(function() {
                e.setData({
                    isLoading: !1
                }), console.log("网络异常");
            });
        },
        retry: function() {
            this.setData({
                isLoading: !0
            }), this.getHotRecommendData();
        }
    }
});