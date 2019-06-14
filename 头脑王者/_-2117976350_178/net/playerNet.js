function n(n, t) {
    if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function");
}

require("./../util/util.js"), require("./../net/network.js"), require("./../const/consts.js");

module.exports = new function t() {
    n(this, t);
}();