require("./../util/util.js");

var e = require("./../net/network.js"), n = require("./../const/consts.js"), s = module.exports;

s.list = function(s) {
    e.get(n.MessageHead.FriendList, {
        params: {},
        success: function(e) {
            s(null, e);
        },
        fail: function(e) {
            console.warn("获取好友列表失败。-" + e.errMsg), s(e);
        }
    });
}, s.delFriend = function(s, i) {
    e.post(n.MessageHead.FriendDel, {
        params: {
            friendId: s
        },
        success: function(e) {
            i(null, e);
        },
        fail: function(e) {
            console.warn("删除好友失败。-" + e.errMsg), i(e);
        }
    });
}, s.findFriend = function(s, i) {
    e.get(n.MessageHead.findFriend, {
        params: {
            friendId: s
        },
        success: function(e) {
            i(null, e);
        },
        fail: function(e) {
            console.warn("获取好友列表失败。-" + e.errMsg), i(e);
        }
    });
}, s.friendDetail = function(s, i) {
    e.get(n.MessageHead.friendDetail, {
        params: {
            friendCode: s
        },
        success: function(e) {
            i(null, e);
        },
        fail: function(e) {
            console.warn("获取好友列表失败。-" + e.errMsg), i(e);
        }
    });
};