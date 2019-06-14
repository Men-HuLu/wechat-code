function t(t) {
    return function(n) {
        var r = n.dispatch, e = n.getState;
        return function(n) {
            return function(u) {
                return "function" == typeof u ? u(r, e, t) : n(u);
            };
        };
    };
}

exports.__esModule = !0;

var n = t();

n.withExtraArgument = t, exports.default = n;