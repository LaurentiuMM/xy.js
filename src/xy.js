// Xy.js
// (c) 2013 thunder9 (https://github.com/thunder9)
// Xy may be freely distributed under the MIT license.

(function() {
  'use strict';

  function Xy(ctx, opts) {
    this.ctx = ctx;

    function ctor(opts) {
      for (var prop in opts) this[prop] = opts[prop];
    }
    ctor.prototype = Xy.defaults;
    opts = this.options = new ctor(opts);

    ctx.font = opts.labelFontStyle + ' ' + opts.labelFontSize + 'px ' + opts.labelFontFamily;
  }

  Xy.prototype.draw = function(datasets, updateTics) {

    var ctx = this.ctx;
    var opts = this.options;

    if (!this.xTics || !this.yTics || updateTics) {
      this.xTics = createXTics(this, datasets);
      this.yTics = createYTics(this, datasets);

      var xRange = this.xRange = [];
      var yRange = this.yRange = [];
      xRange[0] = opts.xRange[0] === 'auto' ? this.xTics[0] : +opts.xRange[0];
      xRange[1] = opts.xRange[1] === 'auto' ? this.xTics[this.xTics.length - 1] : +opts.xRange[1];
      yRange[0] = opts.yRange[0] === 'auto' ? this.yTics[0] : +opts.yRange[0];
      yRange[1] = opts.yRange[1] === 'auto' ? this.yTics[this.yTics.length - 1] : +opts.yRange[1];

      var padding = this.padding = Math.max(opts.labelFontSize / 2, opts.pointCircleRadius + opts.pointStrokeWidth / 2);

      var yLabelSize = this.yLabelSize = this.measureYLabelSize(this.yTics, opts.labelFontSize);
      var xOffset = yLabelSize.width + padding;

      var xLabelSize = this.xLabelSize = this.measureXLabelSize(this.xTics, opts.labelFontSize, ctx.canvas.width - xOffset);
      var yOffset = xLabelSize.height + padding;

      var xLength = this.xLength = xRange[1] - xRange[0];
      var yLength = this.yLength = yRange[1] - yRange[0];

      var xScale = (ctx.canvas.width - xOffset - padding) / xLength;
      var yScale = (ctx.canvas.height - yOffset - padding) / yLength;

      ctx.xy = new Transform(ctx, {
        x: function(x) { return (x - xRange[0]) * xScale + xOffset; },
        y: function(y) { return (yRange[0] - y) * yScale + ctx.canvas.height - yOffset; }
      });

      ctx.nxy = new Transform(ctx, {
        x: function(x) { return (x * xLength - xRange[0]) * xScale + xOffset; },
        y: function(y) { return (yRange[0] - y * yLength) * yScale + ctx.canvas.height - yOffset; }
      });
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.before();

    if (opts.grid) {
      ctx.strokeStyle = opts.gridColor;
      ctx.lineWidth = opts.gridWidth;
      this.drawXGrids(this.xTics, this.yRange);
      this.drawYGrids(this.yTics, this.xRange);
    }

    if (opts.scale) {
      ctx.strokeStyle = opts.scaleColor;
      ctx.lineWidth = opts.scaleWidth;
      this.drawXScale(this.xTics, this.yTics[0]);
      this.drawYScale(this.yTics, this.xTics[0]);
    }

    if (opts.label) {
      ctx.fillStyle = opts.labelColor;

      ctx.save();
      ctx.translate(0, this.padding);
      this.drawXLabels(this.xTics, this.yRange[0], this.xLabelSize.rot);
      ctx.restore();

      ctx.save();
      ctx.translate(-this.padding, 0);
      this.drawYLabels(this.yTics, this.xRange[0]);
      ctx.restore();
    }

    ctx.save();

    ctx.rect(this.yLabelSize.width, 0, this.ctx.canvas.width - this.yLabelSize.width, this.ctx.canvas.height - this.xLabelSize.height);
    ctx.clip();

    if (opts.line) {
      ctx.lineWidth = opts.lineWidth;
      this.drawLines(datasets);
    }

    if (opts.point) {
      ctx.lineWidth = opts.pointStrokeWidth;
      this.drawPoints(datasets);
    }

    this.plot(datasets);

    ctx.restore();

    this.after();
  };

  Xy.prototype.measureXLabelSize = function(tics, fontSize, width) {
    var ctx = this.ctx;
    var widest = 0;
    for (var i = 0; i < tics.length; i++) {
      var measured = ctx.measureText(tics[i]);
      if (measured.width > widest) widest = measured.width;
    }
    var size = {
      width: widest,
      height: fontSize,
      rot: 0
    };

    if (!width) return size;

    var hop = width / tics.length;
    if (size.width > hop) {
      size.rot = Math.PI / 4;
      var a = Math.cos(size.rot);
      size.width = widest * a;
      size.height = size.width + fontSize * a;
      if (size.width > hop) {
        size.rot = Math.PI / 2;
        size.width = fontSize;
        size.height = widest;
      }
    }

    return size;
  };

  Xy.prototype.measureYLabelSize = function(tics, fontSize) {
    var ctx = this.ctx;
    var widest = 1;
    for (var i = 0; i < tics.length; i++) {
      var size = ctx.measureText(tics[i]);
      if (size.width > widest) widest = size.width;
    }

    return {
      width: widest,
      height: fontSize
    };
  };

  Xy.prototype.drawXGrids = function(tics, yrange) {
    var ctx = this.ctx;
    for (var i = 1; i < tics.length; i++) {
      ctx.beginPath();
      ctx.xy.moveTo(tics[i], yrange[0]);
      ctx.xy.lineTo(tics[i], yrange[1]);
      ctx.stroke();
    }
  };

  Xy.prototype.drawYGrids = function(tics, xrange) {
    var ctx = this.ctx;
    for (var i = 1; i < tics.length; i++) {
      ctx.beginPath();
      ctx.xy.moveTo(xrange[0], tics[i]);
      ctx.xy.lineTo(xrange[1], tics[i]);
      ctx.stroke();
    }
  };

  Xy.prototype.drawXScale = function(tics, y) {
    var ctx = this.ctx;
    ctx.beginPath();
    ctx.xy.moveTo(tics[0], y);
    ctx.xy.lineTo(tics[tics.length - 1], y);
    ctx.stroke();
  };

  Xy.prototype.drawYScale = function(tics, x) {
    var ctx = this.ctx;
    ctx.beginPath();
    ctx.xy.moveTo(x, tics[0]);
    ctx.xy.lineTo(x, tics[tics.length - 1]);
    ctx.stroke();
  };

  Xy.prototype.drawXLabels = function(tics, y, rot) {
    var ctx = this.ctx;

    if (rot === 0) {
      ctx.textBaseline = 'top';
      ctx.textAlign = 'center';

      for (var i = 0; i < tics.length; i++) {
        ctx.xy.fillText(tics[i], tics[i], y);
      }
    } else {
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'right';
      if (rot === Math.PI / 4) ctx.translate(0, this.options.labelFontSize * 0.3);

      for (var i = 0; i < tics.length; i++) {
        ctx.save();

        ctx.xy.translate(tics[i], y);
        ctx.rotate(-rot);
        ctx.fillText(tics[i], 0, 0);

        ctx.restore();
      }
    }
  };

  Xy.prototype.drawYLabels = function(tics, x) {
    var ctx = this.ctx;

    ctx.textBaseline = 'middle';
    ctx.textAlign = 'right';

    for (var i = 0; i < tics.length; i++) ctx.xy.fillText(tics[i], x, tics[i]);
  };

  Xy.prototype.drawLines = function(datasets) {
    var ctx = this.ctx;
    var smooth = this.options.smooth;
    var xLength = this.xLength;
    var yLength = this.yLength;

    for (var i = 0; i < datasets.length; i++) {

      ctx.strokeStyle = datasets[i].lineColor;
      var data = datasets[i].data;

      ctx.beginPath();

      ctx.xy.moveTo(data[0][0], data[0][1]);

      if (smooth) {
        var point = null;
        var points = [];

        for (var j = 0; j < data.length; j++) {
          var newPoint = {
            x: data[j][0] / xLength,
            y: data[j][1] / yLength,
            prev: point
          }
          point = newPoint;
          points[j] = point;

          if (point.prev && point.prev.prev) computeControlPoints(point, smooth);
        }

        for (var j = 1; j < points.length; j++) {
          var point = points[j];

          if (point.cp1x && point.cp2x) {
            ctx.nxy.bezierCurveTo(point.cp1x, point.cp1y, point.cp2x, point.cp2y, point.x, point.y);
          } else if (point.cp1x) {
            ctx.nxy.quadraticCurveTo(point.cp1x, point.cp1y, point.x, point.y);
          } else {
            ctx.nxy.quadraticCurveTo(point.cp2x, point.cp2y, point.x, point.y);
          }
        }
      }

      else for (var j = 1; j < data.length; j++) ctx.xy.lineTo(data[j][0], data[j][1]);

      ctx.stroke();
    }
  };

  Xy.prototype.drawPoints = function(datasets) {
    var ctx = this.ctx;
    var radius = this.options.pointCircleRadius;

    for (var i = 0; i < datasets.length; i++) {
      ctx.fillStyle = datasets[i].pointColor;
      ctx.strokeStyle = datasets[i].pointStrokeColor;

      var data = datasets[i].data;

      for (var j = 0; j < data.length; j++) {
        ctx.beginPath();
        ctx.xy.arc(data[j][0], data[j][1], radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      }
    }
  };

  Xy.prototype.plot = function(datasets) {};

  Xy.prototype.before = function() {};

  Xy.prototype.after = function() {};

  function createXTics(xy, datasets) {

    var parameters = setupScalePrameters({
      lower: xy.options.xRange[0],
      upper: xy.options.xRange[1],
      incr: xy.options.xTics
    }, datasets, 0, function(tics) {
      var size = xy.measureXLabelSize(tics, xy.options.labelFontSize);
      return {
        offset: size.height,
        hop: size.width
      };
    }, xy.ctx.canvas.width);

    return generateTics(parameters.lower, parameters.upper, parameters.incr);
  };

  function createYTics(xy, datasets) {

    var parameters = setupScalePrameters({
      lower: xy.options.yRange[0],
      upper: xy.options.yRange[1],
      incr: xy.options.yTics
    }, datasets, 1, function(tics) {
      var size = xy.measureYLabelSize(tics, xy.options.labelFontSize);
      return {
        offset: size.width,
        hop: size.height
      };
    }, xy.ctx.canvas.height);

    return generateTics(parameters.lower, parameters.upper, parameters.incr);
  }

  var effectiveDigitsParser = /0*$|\.\d*/;

  function generateTics(lower, upper, incr) {
    var effective = effectiveDigitsParser.exec(incr)[0];
    var power = Math.pow(10, /\./.test(effective) ? effective.length - 1 : -effective.length);
    var tics = [];
    var i = 0;
    var t;
    lower = incr * Math.ceil(lower / incr);
    while ((t = lower + i * incr) <= upper) tics[i++] = Math.round(t * power) / power;
    return tics;
  }

  function setupScalePrameters(parameters, datasets, dim, measureFun, canvasSize) {
    var lower, upper;

    if (parameters.lower === 'auto' || parameters.upper === 'auto') {
      lower = Number.MAX_VALUE;
      upper = Number.MIN_VALUE;
      for (var i = 0; i < datasets.length; i++) {
        var data = datasets[i].data;
        for (var j = 0; j < data.length; j++) {
          if (data[j][dim] > upper) upper = data[j][dim];
          if (data[j][dim] < lower) lower = data[j][dim];
        }
      }
    }

    if (parameters.lower !== 'auto') lower = parameters.lower;
    if (parameters.upper !== 'auto') upper = parameters.upper;

    if (parameters.incr === 'auto') {
      for (var numberOfTics = 2; numberOfTics < canvasSize; numberOfTics++) {
        var incr = quantizeTics(upper - lower, numberOfTics);
        var labelSize = measureFun(generateTics(lower, upper, incr));
        if (canvasSize / (labelSize.hop * 1.5) < numberOfTics) break;
        parameters.incr = incr;
      }
    }

    if (parameters.lower === 'auto') {
      parameters.lower = parameters.incr * Math.floor(lower / parameters.incr);
    }

    if (parameters.upper === 'auto') {
      parameters.upper = parameters.incr * Math.ceil(upper / parameters.incr);
    }

    return parameters;
  }

  var ticNumbers = [5, 2, 1];

  function quantizeTics(range, numberOfTics) {
    var order = Math.floor(Math.log(range) * Math.LOG10E);
    var incr = 0;

    for (; range > 0 && numberOfTics > 0; order--) {
      for (var i = 0; i < ticNumbers.length; i++) {
        var test = Math.pow(10, order) * ticNumbers[i];
        if (range / test > numberOfTics) return incr;
        incr = test;
      }
    }

    return incr;
  }

  // A casual smoothing.
  function computeControlPoints(point, smooth) {
    var vx = point.x - point.prev.prev.x;
    var vy = point.y - point.prev.prev.y;
    var vn = vx * vx + vy * vy;
    var d1 = distance2(point, point.prev);
    var d2 = distance2(point.prev, point.prev.prev);
    var a;

    a = d2 > 0 ? Math.sqrt(d2 / vn) * smooth : Math.sqrt(d1 / vn) * smooth;
    point.prev.cp2x = point.prev.x - vx * a;
    point.prev.cp2y = point.prev.y - vy * a;

    a = Math.sqrt(d1 / vn) * smooth;
    point.cp1x = point.prev.x + vx * a;
    point.cp1y = point.prev.y + vy * a;
  }

  function distance2(p1, p2) {
    var dx = p1.x - p2.x;
    var dy = p1.y - p2.y;
    return dx * dx + dy * dy;
  }

  Xy.defaults = {

    xRange: ['auto', 'auto'],
    yRange: ['auto', 'auto'],
    xTics: 'auto',
    yTics: 'auto',

    scale: true,
    scaleColor: 'rgba(0,0,0,.1)',
    scaleWidth: 1,

    grid: true,
    gridColor: 'rgba(0,0,0,.05)',
    gridWidth: 1,

    label: true,
    labelFontFamily: "'Arial'",
    labelFontSize: 20,
    labelFontStyle: 'normal',
    labelColor: '#666',

    point: true,
    pointCircleRadius: 8,
    pointStrokeWidth: 4,

    line: true,
    lineWidth: 4,

    smooth: 0.3
  };

  this.Xy = Xy;

}).call(this);
