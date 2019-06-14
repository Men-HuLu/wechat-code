Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.mapActions = exports.mapState = exports.getStore = exports.setStore = exports.connect = void 0;

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./connect")), t = require("./store"), r = require("./helpers");

exports.connect = e.default, exports.setStore = t.setStore, exports.getStore = t.getStore, 
exports.mapState = r.mapState, exports.mapActions = r.mapActions;