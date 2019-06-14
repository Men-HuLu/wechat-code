var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../common/navigator"));

Component({
    properties: {
        rooms: {
            type: Object,
            value: {},
            observer: function(t, e, a) {}
        },
        isMix: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        goRoomList: function(e) {
            var a = e.currentTarget.dataset.shortName, o = e.currentTarget.dataset.tabName;
            t.default.navigateTo("calalogue-list?type=" + a + "&name=" + o + "&isMix=" + this.data.isMix);
        }
    },
    behaviors: [],
    created: function() {},
    attached: function() {},
    ready: function() {},
    moved: function() {},
    detached: function() {}
});