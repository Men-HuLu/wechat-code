var e = getApp();

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
        });
    },
    created: function() {},
    methods: {
        urlNav: function(t) {
            var a = this.data.selected, l = t.currentTarget.id, o = "";
            a.forEach(function(t, n) {
                if (n == l) {
                    t.selected = !0, o = t.path, console.log(o);
                    wx.reLaunch({
                        url: o,
                        success: function() {
                            getApp().globalData.nav = a, e.getUserInfo(), e.globalData.index = !1, e.globalData.myExhibition = !1, 
                            e.globalData.shop = !1;
                        }
                    });
                } else t.selected = !1;
            });
        }
    }
});