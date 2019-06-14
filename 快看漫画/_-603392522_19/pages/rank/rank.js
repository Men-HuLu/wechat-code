function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = getApp(), e = require("../../util.js"), i = function(t) {
    return [ "1.打榜规则：", "技术欧巴每周会实时计算每部作品更新当天24小时内的浏览人数，并进行记录。每周一给大家分别汇报上周最受男生欢迎的作品和最受女生欢迎的作品。对于喜欢的作品，大家一定要更新当天点击阅读,才会被记录为有效浏览量哦！", "", "2." + (1 == t ? "男" : "女") + "生榜作品奖励机制：", "（1）第一名作品奖励300元", "（2）第二名至第三名作品奖励200元", "（3）第四名至第十名作品奖励100元", "（4）同时上男生榜和女生榜的作品，按照两榜中较高的名次奖励" ];
};

Page({
    data: {
        tagList: [ "男生榜", "女生榜", "20+最爱榜", "新作榜", "完结榜", "畅销榜" ],
        rulesList: [ i(1), i(0), [ "最有深度的漫画，值得回味良久。" ], [ "根据关注衍生数据，评选出最优质的新上架作品组成新作榜。喜欢就关注这部作品吧！" ], [ "根据浏览量相关数据排序，评选出最优质的完结作品组成完结榜。全站精华一次看个够！" ], [ "畅销榜是根据一周来所有付费作品的销售数据得到的榜单。", "最值得买的漫画，看这里就对了" ] ],
        tagIndex: 3,
        duration: 0,
        swiperObj: {},
        onGetting: !1
    },
    onLoad: function(t) {
        this.setData({
            tagIndex: 1 * t.type,
            duration: 500
        }), this.getData();
    },
    onShareAppMessage: function() {
        return {
            title: a.globalData.shareTit,
            path: "/pages/rank/rank?type=" + this.data.tagIndex
        };
    },
    getData: function() {
        var a = this, i = function() {
            switch (a.data.tagIndex) {
              case 0:
                return 5;

              case 1:
                return 6;

              case 2:
                return 7;

              case 3:
                return 2;

              case 4:
                return 3;

              case 5:
                return 4;
            }
        }();
        this.setData({
            onGetting: !0
        }), e.ajax({
            method: "GET",
            url: "/mini/v1/comic/topic_rank/list",
            data: {
                rank_type: i,
                since: 0,
                count: 20
            },
            callback: function(i) {
                var n, r = i.data;
                a.setData((n = {}, t(n, "swiperObj[" + a.data.tagIndex + "]", {
                    time: r.next_update_date,
                    list: r.topics.map(function(t) {
                        var a = t.latest_comic_title;
                        return {
                            id: t.id,
                            title: t.title,
                            img: e.addSuffix(t.vertical_image_url, 3),
                            author: "作者：" + t.user.nickname,
                            category: t.category,
                            description: a ? "更新至：" + a : "共" + t.comic_count + "话"
                        };
                    })
                }), t(n, "onGetting", !1), n));
            }
        });
    },
    clickTab: function(t) {
        var a = t.target.dataset.index;
        this.data.tagIndex !== a && this.beforeGetData(a);
    },
    swiperTouch: function(t) {
        if ("touch" == t.detail.source) {
            var a = t.detail.current;
            this.beforeGetData(a);
        }
    },
    beforeGetData: function(t) {
        this.setData({
            tagIndex: t
        }), this.data.swiperObj[t] || this.getData();
    },
    jumpTopic: function(t) {
        var a = t.currentTarget.dataset;
        e.jumpTopic(a);
    }
});