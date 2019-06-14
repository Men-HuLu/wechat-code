function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function o() {}

exports.__esModule = !0, exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = void 0;

var r = e(require("./createStore.js")), t = e(require("./combineReducers.js")), s = e(require("./bindActionCreators.js")), i = e(require("./applyMiddleware.js")), u = e(require("./compose.js")), n = e(require("./utils/warning.js"));

"string" == typeof o.name && "isCrushed" !== o.name && (0, n.default)("You are currently using minified code outside of NODE_ENV === 'production'. This means that you are running a slower development build of Redux. You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) to ensure you have the correct code for your production build."), 
exports.createStore = r.default, exports.combineReducers = t.default, exports.bindActionCreators = s.default, 
exports.applyMiddleware = i.default, exports.compose = u.default;