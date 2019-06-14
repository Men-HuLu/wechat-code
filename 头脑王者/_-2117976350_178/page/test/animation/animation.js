var t = require("../../../util/ShakeController.js");

Page({
    data: {
        animationData: null
    },
    onShow: function() {
        this.shakeCtrl = new t(this), this.shakeCtrl.shake(function() {
            console.log("shake shake shake");
        });
        var a = wx.createAnimation({
            opacity: .5,
            scale: .8,
            timingFunction: "ease-out",
            duration: 400
        });
        this.animation = a, this.showForm();
    },
    showForm: function() {
        this.animation.scale(1).opacity(1).step({
            timingFunction: "cubic-bezier(0.68, -0.55, 0.27, 1.55)"
        }), this.setData({
            animationData: this.animation.export()
        });
    },
    rotateAndScale: function() {
        this.animation.rotate(45).scale(2, 2).step(), this.setData({
            animationData: this.animation.export()
        });
    },
    rotateThenScale: function() {
        this.animation.rotate(45).step(), this.animation.scale(2, 2).step(), this.setData({
            animationData: this.animation.export()
        });
    },
    rotateAndScaleThenTranslate: function() {
        this.animation.rotate(45).scale(2, 4).step(), this.animation.translate(20, 20).step({
            duration: 1e3
        }), this.animation.opacity(.1).step({
            duration: 1e3
        }), this.setData({
            animationData: this.animation.export()
        });
    }
});