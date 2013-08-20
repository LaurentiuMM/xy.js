Xy.js
=====

Xy.js is a lightweight, highly-customizable, Canvas-based JavaScript 2D plotting library. It will draw a [Chart.js](https://github.com/nnnick/Chart.js)-flavored lovely point-line chart by default.

[Demo](http://jsfiddle.net/thunder9/J7Z4w/embedded/result,html,css,resources/presentation/)

# Installation

Run the following:

```
bower install xy
```

# Using the package

Include `dist/xy.js` or `dist/xy.min.js` in your html.

# Example

## Defining datasets

```javascript

var datasets = [
  {
    lineColor : 'rgba(220,220,220,1)',
    pointColor : 'rgba(220,220,220,1)',
    pointStrokeColor : '#fff',
    data : [[-4, -2], [-2.5, 1.3], [0, 0], [1, 1.5], [3, 1]]
  },
  {
    lineColor : 'rgba(151,187,205,1)',
    pointColor : 'rgba(151,187,205,1)',
    pointStrokeColor : '#fff',
    data : [[-3, 3], [-1, -1], [0.5, 1], [1.5, -3], [2.8, -1.6]]
  }
];
```

## Drawing default chart

```javascript

var ctx = document.getElementById('canvas').getContext('2d');

var xy = new Xy(ctx);

xy.draw(datasets);
```

![Fig.1](https://raw.github.com/thunder9/xy.js/master/docs/fig1.png)

## Disable smoothing

```javascript

var xy = new Xy(ctx, { smooth: false });

xy.draw(datasets);
```

![Fig.2](https://raw.github.com/thunder9/xy.js/master/docs/fig2.png)

## Hide lines

```javascript

var xy = new Xy(ctx, { line: false } );

xy.draw(datasets);
```

![Fig.3](https://raw.github.com/thunder9/xy.js/master/docs/fig3.png)

## Hide points

```javascript

var xy = new Xy(ctx, { point: false } );

xy.draw(datasets);
```

![Fig.4](https://raw.github.com/thunder9/xy.js/master/docs/fig4.png)

## Set fixed axis range

```javascript

var xy = new Xy(ctx, { rangeX: [0, 'auto'] } ); // set lower bound of x-axis to 0

xy.draw(datasets);
```

![Fig.5](https://raw.github.com/thunder9/xy.js/master/docs/fig5.png)

## Set fixed tick increment

```javascript

var xy = new Xy(ctx, { tickStepX: 0.5 } );

xy.draw(datasets);

xy.options.tickStepX = 0.34;

xy.draw(datasets);
```

![Fig.6](https://raw.github.com/thunder9/xy.js/master/docs/fig6.png)

![Fig.7](https://raw.github.com/thunder9/xy.js/master/docs/fig7.png)

## Live updating

```javascript

var xy = new Xy(ctx);

setInterval(function() {

  // If the second argument of draw() is set to true, the axis range
  // and ticks will be updated based on the current config and datasets.
  xy.draw(datasets, true);

  // Modify datasets here
}, 1000 / 60);

```

## Strange effect

Large magnitude, negative smoothing factor will produce over smooted, opposite-directed curves.

```javascript

var xy = new Xy(ctx, { smooth: -3 });

xy.draw(datasets);
```

![Fig.9](https://raw.github.com/thunder9/xy.js/master/docs/fig9.png)

# Options

Options can be passed to the constructor or set via `options` property of the instance.

| Name              | Default             | Description                                              |
| ------------------|---------------------|----------------------------------------------------------|
| rangeX            | `['auto', 'auto']`  | range of x-axis, [lower, upper], `'auto'` = auto setup   |
| rangeY            | `['auto', 'auto']`  | range of y-axis, [lower, upper], `'auto'` = auto setup   |
| tickStepX         | `'auto'`            | tick increment of x-axis, `'auto'` = auto setup          |
| tickStepY         | `'auto'`            | tick increment of y-axis, `'auto'` = auto setup          |
| scale             | `true`              | visibility of scale lines, `true` = show, `false` = hide |
| scaleColor        | `'rgba(0,0,0,.1)'`  | color of scale lines                                     |
| scaleWidth        | `1`                 | width of scale lines in px                               |
| grid              | `true`              | visibility of grid lines, `true` = show, `false` = hide  |
| gridColor         | `'rgba(0,0,0,.05)'` | color of grid lines                                      |
| gridWidth         | `1`                 | width of grid lines in px                                |
| label             | `true`              | visibility of grid lines, `true` = show, `false` = hide  |
| labelFontName     | `'Arial'`           | font name of label characters                            |
| labelFontSize     | `20`                | font size of label characters in px                      |
| labelFontStyle    | `'normal'`          | font style of label characters                           |
| labelColor        | `'#666'`            | color of label characters                                |
| point             | `true`              | visibility of points, `true` = show, `false` = hide      |
| pointCircleRadius | `8`                 | radius of the circles that represent points in px        |
| pointStrokeWidth  | `4`                 | width of peripheral line of the circles in px            |
| line              | `true`              | visibility of lines, `true` = show, `false` = hide       |
| lineWidth         | `4`                 | width of lines in px                                     |
| smooth            | `0.3`               | degree of smoothing, falsy = disabled smoothing          |
| scalingRadius     | `'x'`               | type of scaling for the argument `radius` of the CanvasRenderingContext2D's methods, `'x'` = same scaling as x-axis, `'y'` = same scaling as y-axis |

# Customization

## Overridable methods

In Xy, all drawing operations are customizable. To define your own drawing operations, you can override the following methods:

### Xy.prototype.measureLabelSizeX = function(ticks, fontSize, width) {...}

This method should return an object that has `width`, `height` and `rot` properties. The `width` and `height` properies should be set the maximum sizes of the labels that are drawn based on the given `ticks` (array of numbers), `fontSize` (font size of label characters in px) and `width` (the length of x-axis range in px) in px. The `rot` property should be set the rotation angle of the labels.

### Xy.prototype.measureLabelSizeY = function(ticks, fontSize) {...}

This method should return an object that has `width` and `height` properties. Each property should be set the maximum sizes of the labels that are drawn based on the given `ticks` (array of numbers) and `fontSize` (font size of label characters in px) in px.

### Xy.prototype.before = function() {}

This method will be called before all drawing operations. You can draw a background graphics in this method.

### Xy.prototype.drawXGrids = function(ticks, rangeY) {...}

This method should draw the grid lines that are crossing at given `ticks` (numbers on the x-axis). The lines should be drawn in the given range of y-axis (`rangeY`).

### Xy.prototype.drawYGrids = function(ticks, rangeX) {...}

This method should the draw grid lines that are crossing at given `ticks` (numbers on the y-axis). The lines should be drawn in the given range of x-axis (`rangeX`).

### Xy.prototype.drawXScale = function(rangeX, ticks, y) {...}

This method should draw the scale line that are crossing at given point of the y-axis (`y`). The line should be drawn in the given range of the x-axis (`rangeX`). You can use `ticks` (numbers on the x-axis) to draw ticks.

### Xy.prototype.drawYScale = function(rangeY, ticks, x) {...}

This method should draw the scale line that are crossing at given point of the x-axis (`x`). The line should be drawn in the given range of the y-axis (`rangeY`). You can use `ticks` (numbers on the y-axis) to draw ticks.

### Xy.prototype.drawXLabels = function(ticks, y, rot) {...}

This method should draw the labels (stringified `ticks`'s numbers) for the x-axis. The top of the label characters should be located at `y`. The lebels should be rotated at given angle (`rot`).

### Xy.prototype.drawYLabels = function(ticks, x) {...}

This method should draw the labels (stringified `ticks`'s numbers) for the y-axis. The right edge of the labels should be located at `x`.

### Xy.prototype.drawLines = function(datasets) {...}

This method should draw lines or cureves based on the given `datasets`.

### Xy.prototype.drawPoints = function(datasets) {...}

This method should plot points (circles typically) based on the given `datasets`.

### Xy.prototype.plot = function(datasets) {}

You can plot something (based on `datasets` typically) to the clipped chart region.

### Xy.prototype.after = function() {}

This method will be called after all drawing operations. You can draw an overlaid graphics in this method.

## Drawing

To draw something freely in the above methods, you can use directly the CanvasRenderingContext2D's methods and its proxies, via the `ctx` / `ctx.xy` / `ctx.xywhr` / `ctx.nxy` / `ctx.nxywhr` properties of the instance.

| Name    | Description                                                                              |
| ------- |------------------------------------------------------------------------------------------|
| ctx     | an instance of the CanvasRenderingContext2D                                              |
| ctx.xy  | an object that has proxies of the CanvasRenderingContext2D's methods. The arguments `x` and `y` can be specified as the coordinates of a standard x-y coordinate system. |
| ctx.xywhr | an extended version of `ctx.xy`. The arguments `width`, `height` and `radius` can be specified based on the scale of the coordinate system in addition to `x` and `y`. |
| ctx.nxy | an object that has proxies of the CanvasRenderingContext2D's methods. The arguments `x` and `y` can be specified as the coordinates of a normalized version of a x-y coordinate system (the length of x/y-axis range in the chart is normalized to 1). |
| ctx.nxywhr | an extended version of `ctx.nxy`. The arguments `width`, `height` and `radius` can be specified based on the scale of the coordinate system in addition to `x` and `y`. |

## Example

Here is an example that overrides `before` and `plot` methods.

```javascript

// Get a Canvas 2d context.
var ctx = document.getElementById('myCanvas').getContext('2d');

// Create an instance of `Xy`.
var xy = new Xy(ctx, {
  point: false,
  smooth: -0.6
});

// A function to generate color randomly.
function genColor() {
  function c() { return (Math.round(Math.random() * 255)); }
  var rgb = [c(), c(), c()];
  return '#' + ((rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16);
}

// Define datasets
var datasets = [
  {
    lineColor: 'rgba(220,220,220,0.5)',
    pointStrokeColor: '#fff',
    data: [
      // x, y, radius, color
      [ 1,  0, 0.05, genColor()],
      [-1,  0,  0.1, genColor()],
      [ 0,  1, 0.15, genColor()],
      [ 0, -1,  0.2, genColor()],
    ]
  }
];

var rectColor = genColor();

// Override the `before`.
xy.before = function() {
  var ctx = this.ctx;
  ctx.fillStyle = rectColor;

  ctx.beginPath();
  ctx.xywhr.rect(-0.75, 0.6, 0.2, 0.2);
  ctx.xywhr.rect(-0.75, -0.6, 1.5, 0.2);
  ctx.fill();
};

// Override the `plot`.
xy.plot = function(datasets) {
  var ctx = this.ctx;

  for (var i = 0; i < datasets.length; i++) {
    var data = datasets[i].data;
    ctx.strokeStyle = datasets[i].pointStrokeColor;

    for (var j = 0; j < data.length; j++) {
      ctx.fillStyle = data[j][3];

      ctx.beginPath();
      ctx.xywhr.arc(data[j][0], data[j][1], data[j][2], 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    for (var j = 0; j < data.length; j++) {
      ctx.fillStyle = data[j > 0 ? j - 1 : data.length - 1][3];
      var x = data[j][0];
      var y = data[j][1];
      ctx.xy.fillText('(' + x.toPrecision(2) + ',' + y.toPrecision(2) + ')', x, y);
    }
  }
};

// Animation loop
setInterval(function() {

  // Draw chart
  xy.draw(datasets);

  // Change the coordinates
  for (var i = 0; i < datasets.length; i++) {
    var data = datasets[i].data;
    for (var j = 0; j < data.length; j++) {
      data[j][0] += (Math.random() - 0.5) * 0.0165;
      data[j][1] += (Math.random() - 0.5) * 0.0165;
    }
  }
}, 1000 / 60);
```

![Customize01](https://raw.github.com/thunder9/xy.js/master/docs/customize01.png)

[JSFiddle](http://jsfiddle.net/thunder9/jzHvh/embedded/result,js,html,css,resources/presentation/)

# License

Copyright (c) 2013 thunder9 licensed under the MIT license.