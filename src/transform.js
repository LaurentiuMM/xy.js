// Transform.js
// (c) 2013 thunder9 (https://github.com/thunder9)
// Transform may be freely distributed under the MIT license.

(function() {
  'use strict';

  var identity = function(v) { return v; };

  function Transform(ctx, funs, proxy) {
    this.native = ctx;

    if (proxy) {
      var slice = Array.prototype.slice;

      for (var prop in ctx) {
        var fun = ctx[prop];
        if (typeof fun === 'function') {
          (function(self, fun) {
            self[prop] = function() {
              var args = slice.call(arguments);
              return fun.apply(ctx, args);
            }
          })(this, fun);
        }
      }
    }

    var __x = funs.x || identity;
    var __y = funs.y || identity;
    var __w = funs.width || identity;
    var __h = funs.height || identity;
    var __r = funs.radius || identity;
    var __m = funs.matrix || function(x, y, w, h, r) { return [__x(x), __y(y), __w(w), __h(h), __r(r)]; };

    this.arc = function(x, y, radius, startAngle, endAngle, anticlockwise) {
      var _ = __m(x, y, null, null, radius);
      ctx.arc(_[0], _[1], _[4], startAngle, endAngle, anticlockwise);
    };

    this.arcTo = function(x1, y1, x2, y2, radius) {
      var _1 = __m(x1, y1, null, null, radius);
      var _2 = __m(x2, y2, null, null, radius);
      ctx.arcTo(_1[0], _1[1], _2[0], _2[1], _1[4]);
    };

    this.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
      var _cp1 = __m(cp1x, cp1y);
      var _cp2 = __m(cp2x, cp2y);
      var _ = __m(x, y);
      ctx.bezierCurveTo(_cp1[0], _cp1[1], _cp2[0], _cp2[1], _[0], _[1]);
    };

    this.clearRect = function(x, y, width, height) {
      var _ = __m(x, y, width, height);
      ctx.clearRect(_[0], _[1], _[2], _[3]);
    };

    this.createImageData = function(width, height) {
      var _ = __m(null, null, width, height);
      return ctx.createImageData(_[2], _[3]);
    };

    this.createLinearGradient = function(x0, y0, x1, y1) {
      var _0 = __m(x0, y0);
      var _1 = __m(x1, y1);
      return ctx.createLinearGradient(_0[0], _0[1], _1[0], _1[1]);
    };

    this.createRadialGradient = function(x0, y0, r0, x1, y1, r1) {
      var _0 = __m(x0, y0, null, null, r0);
      var _1 = __m(x1, y1, null, null, r1);
      return ctx.createRadialGradient(_0[0], _0[1], _0[4], _1[0], _1[1], _1[4]);
    };

    this.drawImage = function(image, x, y, w, h, dx, dy, dw, dh) {
      if (arguments.length === 9) {
        var _ = __m(dx, dy, dw, dh);
        ctx.drawImage(image, x, y, w, h, _[0], _[1], _[2], _[3]);
      } else {
        var _ = __m(x, y, w, h);
        if (arguments.length === 5) ctx.drawImage(image, _[0], _[1], _[2], _[3]);
        else ctx.drawImage(image, _[0], _[1]);
      }
    };

    this.fillRect = function(x, y, width, height) {
      var _ = __m(x, y, width, height);
      ctx.fillRect(_[0], _[1], _[2], _[3]);
    };

    this.fillText = function(text, x, y, maxWidth) {
      var _ = __m(x, y);
      if (arguments.length === 4) ctx.fillText(text, _[0], _[1], maxWidth);
      else ctx.fillText(text, _[0], _[1]);
    };

    this.getImageData = function(sx, sy, sw, sh) {
      var _ = __m(sx, sy, sw, sh);
      return ctx.getImageData(_[0], _[1], _[2], _[3]);
    };

    this.isPointInPath = function(x, y) {
      var _ = __m(x, y);
      return ctx.isPointInPath(_[0], _[1]);
    };

    this.lineTo = function(x, y) {
      var _ = __m(x, y);
      ctx.lineTo(_[0], _[1]);
    };

    this.moveTo = function(x, y) {
      var _ = __m(x, y);
      ctx.moveTo(_[0], _[1]);
    };

    this.putImageData = function(imagedata, dx, dy, sx, sy, sw, sh) {
      var _ = __m(dx, dy);
      ctx.putImageData(imagedata, _[0], _[1], sx, sy, sw, sh);
    };

    this.quadraticCurveTo = function(cpx, cpy, x, y) {
      var _cp = __m(cpx, cpy);
      var _ = __m(x, y);
      ctx.quadraticCurveTo(_cp[0], _cp[1], _[0], _[1]);
    };

    this.rect = function(x, y, w, h) {
      var _ = __m(x, y, w, h);
      ctx.rect(_[0], _[1], _[2], _[3]);
    };

    this.strokeRect = function(x, y, w, h) {
      var _ = __m(x, y, w, h);
      ctx.strokeRect(_[0], _[1], _[2], _[3]);
    };

    this.strokeText = function(text, x, y, maxWidth) {
      var _ = __m(x, y);
      if (arguments.length === 4) ctx.strokeText(text, _[0], _[1], maxWidth);
      else ctx.strokeText(text, _[0], _[1]);
    };

    this.translate = function(x, y) {
      var _ = __m(x, y);
      ctx.translate(_[0], _[1]);
    };
  }

  this.Transform = Transform;

}).call(this);
