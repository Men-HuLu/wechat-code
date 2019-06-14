Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getInt = function(e, t) {
    var r = parseInt(e[t]);
    return isNaN(r) && (r = 0), r;
}, exports.getNumber = function(e, t) {
    var r = parseFloat(e[t]);
    return isNaN(r) && (r = 0), r;
}, exports.getStr = function(e, t) {
    return (e[t] || "") + "";
};