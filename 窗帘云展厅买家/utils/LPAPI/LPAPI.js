function t(t) {
    return t = t * e() / 25.4, t = t >= 0 ? t + .1 : t - .1, parseInt(t);
}

function e() {
    return getApp().globalData.currentPrinter.DPI;
}

function a(t) {
    w ? s.startScanPeripherals(function(e) {
        t(e);
    }) : s.initBLE(function(e) {
        w = !0, t(e);
    });
}

function n(e, a, n, s, r, i) {
    switch (e = t(e), a = t(a), n = t(n), s = t(s), r = t(r), v.save(), u) {
      case 1:
      case 90:
        v.rotate(Math.PI / 2), v.translate(parseInt(a - e), parseInt(-e - a - n));
        c = n;
        n = s, s = c;
        break;

      case 2:
      case 180:
        v.rotate(Math.PI), v.translate(parseInt(2 * -e - n), parseInt(2 * -a - s));
        break;

      case 3:
      case 270:
        v.rotate(-Math.PI / 2), v.translate(parseInt(-e - a - s), parseInt(e - a));
        var c = n;
        n = s, s = c;
    }
    v.setLineWidth(r), i ? (v.setFillStyle("black"), v.fillRect(e, a, n, s)) : v.strokeRect(e, a, n, s), 
    v.restore();
}

var s = require("./DzBLE.js"), r = require("./BitmapPackage.js"), i = require("./BarcodeWriter.js"), c = 0, o = 0, l = 0, u = 0, f = 0, h = 0, p = -1, d = 2, g = 0, I = 0, w = !1, v = null, P = null;

module.exports = {
    setPrintPageGapType: function(t) {
        p = t;
    },
    setPrintPageGapLength: function(t) {
        d = t;
    },
    setPrintDarkness: function(t) {
        g = t;
    },
    setPrintSpeed: function(t) {
        I = t;
    },
    setSupportPrefixs: function(t) {
        s.setSupportPrefixs(t);
    },
    connectingPrinterName: function() {
        return getApp().globalData.currentPrinter.name;
    },
    scanedPrinters: function(t) {
        a(function(e) {
            t(e);
        });
    },
    openPrinter: function(t) {
        a(function(e) {
            if (e.length > 0) if (null == t || 0 == t.length) s.connectPeripheral(e[0].deviceId); else for (var a = 0; a < e.length; a++) {
                var n = e[a];
                if (n.name.substring(0, t.length).toUpperCase() == t.toUpperCase()) {
                    s.connectPeripheral(n.deviceId);
                    break;
                }
            } else wx.showToast({
                title: "没有发现打印机",
                icon: "",
                image: "",
                duration: 2e3,
                mask: !0,
                success: function(t) {},
                fail: function(t) {},
                complete: function(t) {}
            });
        });
    },
    connectingPrinterDetailInfos: function() {
        return getApp().globalData.currentPrinter;
    },
    closePrinter: function() {
        s.disconnectPeripheral();
    },
    startDrawLabel: function(e, a, n, s, r) {
        null == (v = wx.createCanvasContext(e)) ? wx.showToast({
            title: "没有此画布",
            icon: "",
            image: "",
            duration: 2e3,
            mask: !0,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : (l = r, c = t(n), o = t(s), u = 0, f = 0, h = 0, P = a, v.clearRect(0, 0, v.width, v.height), 
        v.draw(), P.setData({
            canvasWidth: c,
            canvasHeight: o
        }), v.setFillStyle("white"), v.fillRect(0, 0, c + 5, o + 5), v.setFillStyle("black"));
    },
    endDrawLabel: function() {
        v.draw(), wx.showToast({
            title: "正在生成标签图片",
            icon: "loading",
            image: "",
            duration: 1e4,
            mask: !0,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }), 0 == l ? wx.hideToast() : wx.canvasGetImageData({
            canvasId: v.canvasId,
            x: 0,
            y: 0,
            width: c,
            height: o,
            success: function(t) {
                var e = t.data, a = new Array();
                if (90 == l) {
                    for (n = c - 1; n >= 0; n--) for (s = 0; s < o; s++) r = 4 * (c * s + n), a.push(e[r + 0]), 
                    a.push(e[r + 1]), a.push(e[r + 2]), a.push(e[r + 3]);
                    i = c, c = o, o = i;
                } else if (180 == l) for (s = o - 1; s >= 0; s--) for (n = c - 1; n >= 0; n--) r = 4 * (c * s + n), 
                a.push(e[r + 0]), a.push(e[r + 1]), a.push(e[r + 2]), a.push(e[r + 3]); else if (270 == l) {
                    for (var n = 0; n < c; n++) for (var s = o - 1; s >= 0; s--) {
                        var r = 4 * (c * s + n);
                        a.push(e[r + 0]), a.push(e[r + 1]), a.push(e[r + 2]), a.push(e[r + 3]);
                    }
                    var i = c;
                    c = o, o = i;
                }
                P.setData({
                    canvasWidth: c,
                    canvasHeight: o
                });
                var u = new Uint8ClampedArray(a);
                wx.canvasPutImageData({
                    canvasId: v.canvasId,
                    data: u,
                    x: 0,
                    y: 0,
                    width: c,
                    height: o,
                    success: function(t) {
                        wx.hideToast();
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                });
            }
        });
    },
    print: function() {
        wx.showToast({
            title: "正在生成打印数据",
            icon: "loading",
            image: "",
            duration: 1e4,
            mask: !0,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }), wx.canvasGetImageData({
            canvasId: v.canvasId,
            x: 0,
            y: 0,
            width: c,
            height: o,
            success: function(t) {
                console.log("标签宽度：" + t.width), console.log("标签高度：" + t.height);
                var e = r.arrayWithImage(t.data, t.width, t.height, p, 100 * d, g, I, !1);
                wx.hideToast(), s.sendData(e);
            }
        });
    },
    setItemOrientation: function(t) {
        0 != t && 90 != t && 180 != t && 270 != t || (u = t);
    },
    setItemHorizontalAlignment: function(t) {
        0 != t && 1 != t && 2 != t || (f = t);
    },
    setItemVerticalAlignment: function(t) {
        0 != t && 1 != t && 2 != t || (h = t);
    },
    drawText: function(e, a, n, s) {
        switch (v.setFontSize(t(s)), f) {
          case 0:
            v.setTextAlign("left");
            break;

          case 1:
            v.setTextAlign("center");
            break;

          case 2:
            v.setTextAlign("right");
        }
        v.fillText(e, t(a), t(n));
    },
    drawBarcode: function(e, a, n, s, r) {
        switch (a = t(a), n = t(n), s = t(s), r = t(r), v.save(), u) {
          case 1:
          case 90:
            v.rotate(Math.PI / 2), v.translate(parseInt(n - a), parseInt(-a - n - s)), c = s, 
            s = r, r = c;
            break;

          case 2:
          case 180:
            v.rotate(Math.PI), v.translate(parseInt(2 * -a - s), parseInt(2 * -n - r));
            break;

          case 3:
          case 270:
            v.rotate(-Math.PI / 2), v.translate(parseInt(-a - n - r), parseInt(a - n));
            var c = s;
            s = r, r = c;
        }
        i.barcode(v, e, a, n, s, r), v.restore();
    },
    drawQRCode: function(e, a, n, s, r) {
        switch (a = t(a), n = t(n), s = t(s), r = t(r), v.save(), u) {
          case 1:
          case 90:
            v.rotate(Math.PI / 2), v.translate(parseInt(n - a), parseInt(-a - n - s)), c = s, 
            s = r, r = c;
            break;

          case 2:
          case 180:
            v.rotate(Math.PI), v.translate(parseInt(2 * -a - s), parseInt(2 * -n - r));
            break;

          case 3:
          case 270:
            v.rotate(-Math.PI / 2), v.translate(parseInt(-a - n - r), parseInt(a - n));
            var c = s;
            s = r, r = c;
        }
        i.qrcode(v, e, a, n, s, r), v.restore();
    },
    drawLine: function(t, e, a, s) {
        n(t, e, a, s, 0, !0);
    },
    drawRectangle: n
};