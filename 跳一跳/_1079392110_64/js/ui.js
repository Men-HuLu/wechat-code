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

var i = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var o = t[i];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, i, o) {
        return i && e(t.prototype, i), o && e(t, o), t;
    };
}(), o = (function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    t.default = e;
}(require("./lib/three")), require("./config")), r = (require("./lib/animation"), 
e(require("./text"))), s = e(require("./ui/adBoard")), a = e(require("./ui/propBoard")), n = e(require("./ui/propAniManager")), d = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth, u = (window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth, 
function() {
    function e(i, o, s, a) {
        t(this, e);
        this.game = a, this.full2D = s, this.scene = i, this.camera = o, this.score = 0, 
        this.double = 1, this.scoreText = new r.default("0", {
            fillStyle: 2434341,
            sumScore: !0,
            opacity: .8
        }), this.resetScorePos(), this.scoreText.obj.matrixAutoUpdate = !1, this.camera.add(this.scoreText.obj);
    }
    return i(e, [ {
        key: "resetScorePos",
        value: function() {
            this.scoreText.obj.position.set(o.GAME_SCORE_POS.x, o.GAME_SCORE_POS.y, -10), this.scoreText.obj.scale.set(1, 1, 1), 
            this.scoreText.obj.updateMatrix();
        }
    }, {
        key: "resetObservePos",
        value: function() {
            this.scoreText.obj.position.set(o.OBSERVE_SCORE_POS.x, o.OBSERVE_SCORE_POS.y, -10), 
            this.scoreText.obj.scale.set(1, 1, 1), this.scoreText.obj.updateMatrix();
        }
    }, {
        key: "resetRelayPos",
        value: function() {
            this.scoreText.obj.position.x = o.RELAY_SCORE_POS.x, this.scoreText.obj.position.y = o.RELAY_SCORE_POS.y, 
            this.scoreText.obj.scale.set(.8, .8, .8), this.scoreText.obj.updateMatrix();
        }
    }, {
        key: "reset",
        value: function() {
            this.scoreText.setScore(0), this.score = 0, this.double = 1;
        }
    }, {
        key: "update",
        value: function() {}
    }, {
        key: "hideScore",
        value: function() {
            this.scoreText.obj.visible = !1;
        }
    }, {
        key: "showScore",
        value: function() {
            this.scoreText.obj.visible = !0;
        }
    }, {
        key: "addScore",
        value: function(e, t, i, o) {
            return o ? (this.score += e, void this.setScore(this.score)) : (t ? 1 === this.double ? this.double = 2 : this.double += 2 : this.double = 1, 
            i && this.double <= 2 && (this.double *= 2), this.double = Math.min(32, this.double), 
            e *= this.double, this.score += e, this.setScore(this.score), e);
        }
    }, {
        key: "showAdAvator",
        value: function(e, t, i) {
            this.adBoard && this.adBoard.destroy && (console.error("Already exist adBoard"), 
            this.adBoard.destroy()), this.adBoard = new s.default({
                camera: e,
                trademark_url: t,
                ad_url: i
            }), this.game.reporter.rpShowAdCard();
        }
    }, {
        key: "hideAdAvator",
        value: function() {
            this.adBoard && this.adBoard.destroy && this.adBoard.destroy(), this.adBoard = null;
        }
    }, {
        key: "showProp",
        value: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            this.propBoard && this.adBoard.destroy && this.propBoard.destroy(), this.propBoard = new a.default({
                camera: this.camera,
                game: this.game,
                usingId: t,
                destroyCb: function() {
                    e.hideProp();
                }
            });
        }
    }, {
        key: "hideProp",
        value: function() {
            this.propBoard && this.propBoard.destroy && this.propBoard.destroy(), this.propBoard = null;
        }
    }, {
        key: "audienceWatchPropAni",
        value: function(e) {
            this.propAniManager || (this.propAniManager = new n.default({
                camera: this.camera,
                game: this.game
            })), this.propAniManager.show(e);
        }
    }, {
        key: "setScore",
        value: function(e) {
            this.scoreText.setScore(e), o.BLOCK.minRadiusScale -= .005, o.BLOCK.minRadiusScale = Math.max(.25, o.BLOCK.minRadiusScale), 
            o.BLOCK.maxRadiusScale -= .005, o.BLOCK.maxRadiusScale = Math.max(o.BLOCK.maxRadiusScale, .6), 
            o.BLOCK.maxDistance += .03, o.BLOCK.maxDistance = Math.min(22, o.BLOCK.maxDistance);
        }
    } ]), e;
}());

exports.default = u;