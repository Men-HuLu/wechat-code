var e = getApp();

Component({
    properties: {
        section: String,
        tagname: String,
        fromPage: String
    },
    data: {
        isShow: !0,
        navH: e.globalData.navBarHt,
        isDetail: !1,
        isiPhoneX: !1,
        pageArr: [],
        title: "哔哩哔哩",
        isTage: !1,
        isFromVideo: !1,
        isFromPGC: !1,
        isIdx: !1
    },
    ready: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                console.log(a.model), console.log(a.pixelRatio), console.log(a.windowWidth), console.log(a.windowHeight), 
                console.log(a.language), console.log(a.version), console.log(a.platform), e.globalData.isNotch && t.setData({
                    isiPhoneX: !0
                });
            }
        }), this.checkPage(this.data.section), this.checkTage(this.data.tagname), this.checkPage(this.data.fromPage);
    },
    methods: {
        checkPage: function(e) {
            switch (e) {
              case "detail":
                this.setData({
                    isDetail: !0
                });
                break;

              case "tage":
                this.setData({
                    isTage: !0
                });
                break;

              case "video":
                this.setData({
                    isFromVideo: !0
                });
                break;

              case "pgcdetail":
                this.setData({
                    isFromPGC: !0
                });
                break;

              case "idx":
                this.setData({
                    isIdx: !0
                });
            }
        },
        checkTage: function(e) {
            e ? this.setData({
                title: e
            }) : this.setData({
                title: "哔哩哔哩"
            });
        },
        backHome: function() {
            wx.navigateTo({
                url: "../index/index"
            });
        },
        back: function() {
            wx.navigateBack({
                delta: 1
            });
        },
        toIndexSearch: function() {
            this.data.isDetail && wx.reportAnalytics("vinfo_video_search_click", {}), this.data.isFromPGC && wx.reportAnalytics("vinfo_pgcvideo_search_click", {}), 
            wx.navigateTo({
                url: "../index/index?from=video"
            });
        }
    }
});