var e = require("../../libs/cavenet/cavenet.js").cavenetClient, n = (require("../../util/util.js"), 
require("../../const/consts.js")), t = module.exports;

t.joinChatRoom = function(t) {
    return console.warn("[joinChatRoom] params:", t), e.request(n.Route.joinChatRoom, t);
}, t.send = function(t) {
    return console.warn("[chatSend] params:", t), e.notify(n.Route.chatSend, t);
}, t.commentFriend = function(t) {
    return e.notify(n.Route.commentFriend, t);
};