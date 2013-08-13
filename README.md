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

var xy = new Xy(ctx, { xRange: [0, 'auto'] } ); // set lower bound of x-axis to 0

xy.draw(datasets);
```

![Fig.5](https://raw.github.com/thunder9/xy.js/master/docs/fig5.png)

## Set fixed tic increment

```javascript

var xy = new Xy(ctx, { xTics: 0.5 } );

xy.draw(datasets);

xy.options.xTics = 0.34;

xy.draw(datasets);
```

![Fig.6](https://raw.github.com/thunder9/xy.js/master/docs/fig6.png)

![Fig.7](https://raw.github.com/thunder9/xy.js/master/docs/fig7.png)

## Live updating

```javascript

var xy = new Xy(ctx);

setInterval(function() {

  // If the second argument of draw() is set to true, the axis range
  // and tics will be updated based on the current config and datasets.
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

Options can be passed to the constructor or edited via `options` property of the instance.

| Name              | Default             | Description                                              |
| ------------------|---------------------|----------------------------------------------------------|
| xRange            | `['auto', 'auto']`  | range of x-axis, [lower, upper], `'auto'` = auto setup   |
| yRange            | `['auto', 'auto']`  | range of y-axis, [lower, upper], `'auto'` = auto setup   |
| xTics             | `'auto'`            | tic increment of x-axis, `'auto'` = auto setup           |
| yTics             | `'auto'`            | tic increment of y-axis, `'auto'` = auto setup           |
| scale             | `true`              | visibility of scale lines, `true` = show, `false` = hide |
| scaleColor        | `'rgba(0,0,0,.1)'`  | color of scale lines                                     |
| scaleWidth        | `1`                 | width of scale lines                                     |
| grid              | `true`              | visibility of grid lines, `true` = show, `false` = hide  |
| gridColor         | `'rgba(0,0,0,.05)'` | color of grid lines                                      |
| gridWidth         | `1`                 | width of grid lines                                      |
| label             | `true`              | visibility of grid lines, `true` = show, `false` = hide  |
| labelFontFamily   | `"'Arial'"`         | font family of label characters                          |
| labelFontSize     | `20`                | font size of label characters                            |
| labelFontStyle    | `'normal'`          | font style of label characters                           |
| labelColor        | `#666`              | color of label characters                                |
| point             | `true`              | visibility of points, `true` = show, `false` = hide      |
| pointCircleRadius | `8`                 | radius of the circles that represent points              |
| pointStrokeWidth  | `4`                 | width of peripheral line of the circles                  |
| line              | `true`              | visibility of lines, `true` = show, `false` = hide       |
| lineWidth         | `4`                 | width of lines                                           |
| smooth            | `0.3`               | degree of smoothing, falsy = disabled smoothing          |

# Customization

# License

Copyright (c) 2013 thunder9 licensed under the MIT license.