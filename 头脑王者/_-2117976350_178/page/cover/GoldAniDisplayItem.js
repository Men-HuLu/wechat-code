function t(t, i) {
    if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
}

var i = function() {
    function t(t, i) {
        for (var e = 0; e < i.length; e++) {
            var s = i[e];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(t, s.key, s);
        }
    }
    return function(i, e, s) {
        return e && t(i.prototype, e), s && t(i, s), i;
    };
}(), e = require("./../../util/util.js"), s = require("./../../util/Tween.js"), h = function() {
    function h(i, s, n, d, p) {
        t(this, h), this.deltaTime = 0, this.imgWidth = 48, this.imgHeight = 48, this.visible = !1, 
        this.p2 = {
            x: n.x,
            y: n.y
        }, this.p1 = {
            x: this.p2.x + e.randomInt(-700, 700),
            y: this.p2.y + e.randomInt(-200, 1e3)
        }, this.setpList = [ this.step0.bind(this), this.step1.bind(this), this.step2.bind(this) ], 
        this.index = i, this.next = p, this.floor = d, this.beginPoint = s, this.endPoint = n;
    }
    return i(h, [ {
        key: "play",
        value: function() {
            this.alpha = 1, this.visible = !0, this.gSpeed = 0, this.x = this.beginPoint.x - this.imgWidth / 2, 
            this.y = this.beginPoint.y, this.stepIndex = 0, this.time = Date.now(), this.xSpeed = e.randomInt(-300, 500), 
            this.ySpeed = e.randomInt(500, 1200);
        }
    }, {
        key: "logic",
        value: function() {
            var t = Date.now();
            this.deltaTime = (t - this.time) / 1e3, this.time = t, this.setpList[this.stepIndex] && this.setpList[this.stepIndex]();
        }
    }, {
        key: "step0",
        value: function() {
            this.gSpeed += this.deltaTime * this.deltaTime * 9800 / 2, this.y += this.gSpeed - this.deltaTime * this.ySpeed, 
            this.y < this.floor - this.imgHeight ? this.x += this.deltaTime * this.xSpeed : (this.y = this.floor - this.imgHeight, 
            this.stepIndex++, this.gSpeed = 0, this.xSpeed /= 2, this.ySpeed /= 2);
        }
    }, {
        key: "step1",
        value: function() {
            this.gSpeed += this.deltaTime * this.deltaTime * 9800 / 2, this.y += this.gSpeed - this.deltaTime * this.ySpeed, 
            this.y < this.floor - this.imgHeight ? this.x += this.deltaTime * this.xSpeed : (this.y = this.floor - this.imgHeight, 
            this.stepIndex++, this.gSpeed = 0, this.xSpeed /= 2, this.ySpeed /= 2);
        }
    }, {
        key: "step2",
        value: function() {
            var t = this;
            if (this.gSpeed += this.deltaTime * this.deltaTime * 9800 / 2, this.y += this.gSpeed - this.deltaTime * this.ySpeed, 
            this.y < this.floor - this.imgHeight) this.x += this.deltaTime * this.xSpeed; else {
                this.p0 = {
                    x: this.x,
                    y: this.y
                }, this.stepIndex++, this.next(this);
                var i = s.fastGet("CoverGoldAni" + this.index, !1);
                i.wait(1e3), i.update(function(i) {
                    t.x = (1 - i) * (1 - i) * t.p0.x + 2 * i * (1 - i) * t.p1.x + i * i * t.p2.x, t.y = (1 - i) * (1 - i) * t.p0.y + 2 * i * (1 - i) * t.p1.y + i * i * t.p2.y;
                }, 800), i.call(function() {
                    t.visible = !1;
                });
            }
        }
    } ]), h;
}();

module.exports = h;