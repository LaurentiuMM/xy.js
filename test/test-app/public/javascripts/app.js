window.onload = function() {

  var ctx1 = document.getElementById('canvas1').getContext('2d');
  var ctx2 = document.getElementById('canvas2').getContext('2d');
  var ctx3 = document.getElementById('canvas3').getContext('2d');
  var ctx4 = document.getElementById('canvas4').getContext('2d');
  var ctx5 = document.getElementById('canvas5').getContext('2d');
  var ctx6 = document.getElementById('canvas6').getContext('2d');
  var ctx7 = document.getElementById('canvas7').getContext('2d');
  var ctx8 = document.getElementById('canvas8').getContext('2d');
  var ctx9 = document.getElementById('canvas9').getContext('2d');
  var ctx10 = document.getElementById('canvas10').getContext('2d');

  var xy1 = new Xy(ctx1);
  var xy2 = new Xy(ctx2, { smooth: 0 });
  var xy3 = new Xy(ctx3, { line: false });
  var xy4 = new Xy(ctx4, { point: false });
  var xy5 = new Xy(ctx5, { xRange: [0, 'auto'] });
  var xy6 = new Xy(ctx6, { xTics: 0.5 });
  var xy7 = new Xy(ctx7, { xTics: 0.34 });
  var xy8 = new Xy(ctx8);
  var xy9 = new Xy(ctx9, { smooth: -3 });
  var xy10 = new Xy(ctx10);

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

  var datasets2 = [
    {
      lineColor : 'rgba(220,220,220,1)',
      pointColor : 'rgba(220,220,220,1)',
      pointStrokeColor : '#fff',
      data : [[-4, -2000], [-2.5, 1300], [0, 0], [1, 1500], [3, 1000]]
    },
    {
      lineColor : 'rgba(151,187,205,1)',
      pointColor : 'rgba(151,187,205,1)',
      pointStrokeColor : '#fff',
      data : [[-3, 3000], [-1, -1000], [0.5, 1000], [1.5, -3000], [2.8, -1600]]
    }
  ];

  setInterval(function() {

    xy1.draw(datasets);
    xy2.draw(datasets);
    xy3.draw(datasets);
    xy4.draw(datasets);
    xy5.draw(datasets);
    xy6.draw(datasets);
    xy7.draw(datasets);
    xy8.draw(datasets, true);
    xy9.draw(datasets);

    for (var i = 0; i < datasets.length; i++) {
      var data = datasets[i].data;
      for (var j = 0; j < data.length; j++) {
        var dx = (Math.random() - 0.5) / xy1.xLength * 0.1;
        var dy = (Math.random() - 0.5) / xy1.yLength * 0.1;
        data[j][0] += dx;
        data[j][1] += dy;
      }
    }

  }, 1000 / 60);

  xy10.draw(datasets2);
};
