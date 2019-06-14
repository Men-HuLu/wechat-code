Component({
    properties: {
        src: {
            type: String,
            value: ""
        },
        height: {
            type: String,
            value: ""
        },
        mode: {
            type: String,
            value: "aspectFill"
        },
        only: {
            type: Boolean,
            value: !1
        },
        load: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        min: 60,
        loaded: !1
    },
    attached: function() {
        var t = this.data.height;
        this.setData({
            min: -1 === t.indexOf("px") ? t + "rpx" : t
        });
    },
    methods: {
        picLoaded: function() {
            this.setData({
                loaded: !0
            }), this.triggerEvent("loaded");
        }
    }
});