var e = require("../../libs/cavenet/cavenet.js").cavenetClient, t = (require("../../util/util.js"), 
require("../../const/consts.js"));

module.exports.setSubscribe = function(s) {
    return e.request(t.Route.subscribe, s);
};