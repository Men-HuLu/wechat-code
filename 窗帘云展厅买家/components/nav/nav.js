Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        height: {
            type: Number,
            value: 34
        },
        width: {
            type: Number,
            value: 34
        },
        selected: {
            type: Array,
            value: getApp().globalData.nav || [],
            observer: function(e, t) {
                console.log("路由跳转 修改数据 ");
            }
        }
    },
    data: {
        selected: []
    },
    ready: function() {
        this.setData({
            selected: getApp().globalData.nav
        }), console.log(this.properties.selected), console.log(getApp().globalData.nav);
    },
    created: function() {},
    methods: {
        urlNav: function(e) {
            var t = this.data.selected, a = e.currentTarget.id, o = "";
            t.forEach(function(e, l) {
                l == a ? (e.selected = !0, o = e.path, console.log(o), wx.reLaunch({
                    url: o,
                    success: function() {
                        getApp().globalData.nav = t;
                    }
                })) : e.selected = !1;
            });
        }
    }
});