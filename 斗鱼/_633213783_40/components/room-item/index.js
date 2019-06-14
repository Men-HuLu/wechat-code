function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../common/navigator")), o = e(require("../../common/util"));

getApp();

Component({
    properties: {
        room: {
            type: Object,
            value: {},
            observer: function(e, t, a) {
                e.nickname = o.default.htmlDecode(e.nickname), e.roomName = o.default.htmlDecode(e.roomName), 
                e.hn = o.default.numberUpperFormat(e.hn), this.setData({
                    room: e
                });
            }
        },
        type: {
            type: String,
            value: void 0
        }
    },
    data: {},
    methods: {
        gotoRoom: function(e) {
            var o = e.currentTarget.dataset.rid, a = e.currentTarget.dataset.type;
            t.default.disDoubleNavigate("room?roomId=" + o + "&is_vertical=" + ("yz" === a ? "1" : 0));
        }
    },
    behaviors: [],
    created: function() {},
    attached: function() {},
    ready: function() {},
    moved: function() {},
    detached: function() {}
});