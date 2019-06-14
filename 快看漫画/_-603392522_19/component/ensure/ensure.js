Component({
    properties: {
        text: {
            type: String,
            value: ""
        }
    },
    methods: {
        ensure: function() {
            this.setData({
                text: ""
            }), wx.navigateBack({
                delta: 1
            });
        }
    }
});