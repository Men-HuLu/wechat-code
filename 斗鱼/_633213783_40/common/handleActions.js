Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(r, e) {
    return function(t, i) {
        if (!t) return e;
        var a = i.type;
        if (!a) return (0, n.warn)("HandleActions Error : Type is missing in action"), t;
        var u = r[a];
        return u && (0, n.isFunc)(u) ? u(t, i) : ((0, n.warn)("HandleActions Warning : Unhandled action with type " + a), 
        t);
    };
};

var n = require("./util");