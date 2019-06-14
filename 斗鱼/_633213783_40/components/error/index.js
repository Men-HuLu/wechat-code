Component({
    properties: {},
    data: {},
    methods: {
        onTap: function() {
            this.triggerEvent("customevent", {}, {
                bubbles: !0,
                composed: !0
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