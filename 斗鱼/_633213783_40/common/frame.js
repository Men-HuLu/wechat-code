Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.trim = function(t) {
    return t.replace(/(^\s*)|(\s*$)/gi, "");
}, exports.ltrim = function(t) {
    return t.replace(/^\s*/gi, "");
}, exports.rtrim = function(t) {
    return t.replace(/\s*$/gi, "");
}, exports.isFunction = function(t) {
    return "[object Function]" === Object.prototype.toString.call(t);
}, exports.isArray = function(t) {
    return "[object Array]" === Object.prototype.toString.call(t);
}, exports.type = function(t) {
    return Object.prototype.toString.call(t).slice(8, -1).toLowerCase();
};