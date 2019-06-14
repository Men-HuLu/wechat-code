var e = require("../../libs/cavenet/cavenet.js").cavenetClient, t = (require("../../util/util.js"), 
require("../../const/consts.js")), u = module.exports;

u.join = function() {
    return e.request(t.Route.join, {});
}, u.submitAnswer = function(u) {
    return e.request(t.Route.submitAnswer, u);
}, u.quit = function() {
    return e.request(t.Route.quit, {});
}, u.sendComment = function(u) {
    return e.request(t.Route.sendComment, u);
};