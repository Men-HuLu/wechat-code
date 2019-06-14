Component({
    properties: {},
    data: {},
    methods: {
        clickGotoHome: function() {
            wx.switchTab({
                url: "home"
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