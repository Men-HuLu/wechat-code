var e = require("../const/consts.js");

require("../const/modeConsts.js"), require("../net/connectNotify.js");

module.exports = {
    aidOffline: 0,
    data: {
        base: {
            aid: -1,
            typeName: "specialMatch",
            subType: "xindongfang",
            name: "西部世界",
            beginAt: 1526385600,
            endAt: 1526788800,
            calEndAt: 1526789100,
            awardEndAt: 1526796e3,
            fontColor: ""
        },
        player: {
            rank: -1,
            isTakeAward: !1,
            isHaveAward: !1,
            cup: 0,
            ticket: 0,
            earn: 0
        },
        rankList: [ {
            uid: 10000001,
            nickName: "番茄",
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/b50U3DoMvdchHtEB16Mnr9BLMoCgaXOYUk14baGP7x5DBYhCXtJMdYGu8kASdW1hpJReHD6WjtA1u44ug6KVmw/132",
            city: "",
            score: 5,
            rank: 1,
            headId: 0
        } ],
        award: [ {
            beginRank: 1,
            endRank: 1,
            itemId: 201020,
            itemNum: 1
        }, {
            beginRank: 2,
            endRank: 2,
            itemId: 201019,
            itemNum: 1
        }, {
            beginRank: 3,
            endRank: 3,
            itemId: 201018,
            itemNum: 1
        }, {
            beginRank: 4,
            endRank: 10,
            itemId: 201017,
            itemNum: 1
        }, {
            beginRank: 11,
            endRank: 100,
            itemId: 201016,
            itemNum: 1
        }, {
            beginRank: 101,
            endRank: 1e4,
            itemId: 201015,
            itemNum: 1
        } ],
        linkConf: {
            appId: "wx6ee495cc895ca028",
            appName: "dddjs",
            path: "page/login/login?channel=tnwzdddjs",
            imageUrl: "dddjs1.gif",
            imageWidth: 186,
            imageHeight: 177,
            weight: 0
        },
        des: "欢迎来到西部的世界，这里是介绍说明的地方。",
        costTicket: 1,
        maxTicketPerDay: 10,
        tips: [ "每场专题比赛需消耗1张入场券才可开始。", "排位赛会概率掉落入场券。", "排位赛每天最多掉落20张入场券。", "专题比赛排行榜前100名的玩家可在结算时获得奖励。" ],
        maxFriendGive: 0,
        giveTicketMax: 0,
        maxTicketNum: 0,
        tncjNeedCup: [],
        showTncj: !0
    },
    ticket: {
        ticketToFriend: null,
        ticketFromFriend: [],
        receiver: [],
        giveEnergyErrMsg: null
    },
    friends: [],
    myDreamCup: null,
    friendInfo_requestTicket: null,
    freeTicket: {},
    isZjwMath: function() {
        return this.data.base.subType == e.subTypeOfSpeical.commission;
    },
    isOfflineMatch: function() {
        return this.aidOffline == this.data.base.aid && this.aidOffline > 0;
    },
    setFreeTicket: function(e, i) {
        this.freeTicket["" + e] = i;
    },
    getFreeTicket: function(e) {
        return ~~this.freeTicket["" + e];
    }
};