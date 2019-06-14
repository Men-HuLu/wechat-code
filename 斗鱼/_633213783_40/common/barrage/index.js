function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var u = function() {
    function e(e, t) {
        for (var u = 0; u < t.length; u++) {
            var i = t[u];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, u, i) {
        return u && e(t.prototype, u), i && e(t, i), t;
    };
}(), i = e(require("./config")), n = e(require("./filter")), s = function() {
    function e(u) {
        t(this, e), this.config = Object.assign({}, i.default, u), this.launchers = Object.create(null), 
        this.queue = [], this.frameQueue = [], this.isPaused = !1, this.obFunc = null, this.timer = null, 
        this.bid = 0;
    }
    return u(e, [ {
        key: "observe",
        value: function(e) {
            return this.obFunc = e, this;
        }
    }, {
        key: "pause",
        value: function() {
            this.isPaused = !0, this.timer && (clearTimeout(this.timer), this.timer = null);
        }
    }, {
        key: "destroy",
        value: function() {
            this.pause(), this.obFunc = null, this.queue.length = 0, this.frameQueue.length = 0;
        }
    }, {
        key: "restart",
        value: function() {
            this.isPaused = !1, this.frameQueue.length && this.flush();
        }
    }, {
        key: "push",
        value: function(e, t) {
            t._barrageType = e, this.frameQueue.push(t), this.isPaused ? this.frameQueue.length > this.config.BARRAGE_MAX_FRAME && (this.frameQueue = this.frameQueue.slice(-this.config.BARRAGE_MAX_FRAME)) : !this.timer && this.flush();
        }
    }, {
        key: "registerLauncher",
        value: function(e, t) {
            this.launchers[e] ? this.launchers[e].push(t) : this.launchers[e] = [ t ];
        }
    }, {
        key: "flush",
        value: function() {
            var e = this;
            this.timer = setTimeout(function() {
                e.timer = null;
                var t = e.frameQueue.slice(0);
                e.frameQueue.length = 0, t.length > e.config.BARRAGE_MAX_FRAME && (t = (0, n.default)(t, e.config.BARRAGE_MAX_FRAME)), 
                t.forEach(function(t) {
                    var u = void 0;
                    (u = e.launchers[t._barrageType]) && u.forEach(function(e) {
                        e(t);
                    }), t.$chattabcontent$bid = ++e.bid;
                });
                var u = e.queue.concat(t);
                u.length > e.config.BARRAGE_MAX_COUNT && (u = u.slice(u.length - e.config.BARRAGE_MAX_COUNT)), 
                e.obFunc(e.queue = u);
            }, this.config.INTERVAL);
        }
    } ]), e;
}();

exports.default = s;