function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    var n = t && t.type;
    return "Given action " + (n && '"' + n.toString() + '"' || "an action") + ', reducer "' + e + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.';
}

function n(e, t, n, r) {
    var a = Object.keys(t), u = n && n.type === o.ActionTypes.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
    if (0 === a.length) return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
    if (!(0, i.default)(e)) return "The " + u + ' has unexpected type of "' + {}.toString.call(e).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following keys: "' + a.join('", "') + '"';
    var d = Object.keys(e).filter(function(e) {
        return !t.hasOwnProperty(e) && !r[e];
    });
    return d.forEach(function(e) {
        r[e] = !0;
    }), d.length > 0 ? "Unexpected " + (d.length > 1 ? "keys" : "key") + ' "' + d.join('", "') + '" found in ' + u + '. Expected to find one of the known reducer keys instead: "' + a.join('", "') + '". Unexpected keys will be ignored.' : void 0;
}

function r(e) {
    Object.keys(e).forEach(function(t) {
        var n = e[t];
        if (void 0 === n(void 0, {
            type: o.ActionTypes.INIT
        })) throw new Error('Reducer "' + t + "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");
        if (void 0 === n(void 0, {
            type: "@@redux/PROBE_UNKNOWN_ACTION_" + Math.random().toString(36).substring(7).split("").join(".")
        })) throw new Error('Reducer "' + t + "\" returned undefined when probed with a random type. Don't try to handle " + o.ActionTypes.INIT + ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.');
    });
}

exports.__esModule = !0, exports.default = function(e) {
    for (var o = Object.keys(e), i = {}, u = 0; u < o.length; u++) {
        var d = o[u];
        void 0 === e[d] && (0, a.default)('No reducer provided for key "' + d + '"'), "function" == typeof e[d] && (i[d] = e[d]);
    }
    var s = Object.keys(i), c = void 0;
    c = {};
    var f = void 0;
    try {
        r(i);
    } catch (e) {
        f = e;
    }
    return function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = arguments[1];
        if (f) throw f;
        var o = n(e, i, r, c);
        o && (0, a.default)(o);
        for (var u = !1, d = {}, l = 0; l < s.length; l++) {
            var h = s[l], y = i[h], v = e[h], p = y(v, r);
            if (void 0 === p) {
                var w = t(h, r);
                throw new Error(w);
            }
            d[h] = p, u = u || p !== v;
        }
        return u ? d : e;
    };
};

var o = require("./createStore.js"), i = e(require("./../../lodash/isPlainObject.js")), a = e(require("./utils/warning.js"));