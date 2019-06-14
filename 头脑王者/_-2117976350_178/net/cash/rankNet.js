var e = require("../../libs/cavenet/cavenet.js").cavenetClient, t = require("../../const/consts.js");

module.exports.getRank = function() {
    return console.log("[request getRank]"), e.request(t.Route.getRank, {});
};