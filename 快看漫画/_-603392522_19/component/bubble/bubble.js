var b = getApp();

Component({
    properties: {
        control: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        bubbleInfo: null
    },
    attached: function() {
        var l = this;
        b.globalData.bubbleFlag || (b.globalData.bubble ? this.initBubble(b.globalData.bubble) : b.globalData.bubbledCallback = function(b) {
            b ? l.initBubble(b) : l.setData({
                bubbleInfo: null
            });
        });
    },
    ready: function() {
        var l = this;
        setTimeout(function() {
            b.globalData.bubbleFlag = !0, l.setData({
                bubbleInfo: null
            });
        }, 5e3);
    },
    methods: {
        initBubble: function(b) {
            this.setData({
                bubbleInfo: {
                    tit: b.topic.title,
                    id: b.topic.id,
                    num: b.unread_comic_count
                }
            });
        },
        closeBubble: function() {
            b.globalData.bubbleFlag = !0, this.setData({
                bubbleInfo: null
            });
        },
        jumpFollow: function() {
            b.globalData.bubbleTap = !0, wx.switchTab({
                url: "/pages/my/my"
            });
        }
    }
});