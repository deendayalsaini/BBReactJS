$(document).ready(function () {


    //--my code st
    Date.prototype.yyyymmdd = function () {

        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
        var dd = this.getDate().toString();

        Date.prototype.month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return this.month_names_short[this.getMonth()] + ' ' + (dd[1] ? dd : "0" + dd[0]) + ',' + yyyy;
    };
    //--my code ed

    function barChartPlotter(e) {
        var ctx = e.drawingContext;
        var points = e.points;
        var y_bottom = e.dygraph.toDomYCoord(0);

        // The RGBColorParser class is provided by rgbcolor.js, which is
        // packed in with dygraphs.
        var color = new RGBColorParser(e.color);

        color.r = Math.floor((255 + color.r) / 2);
        color.g = Math.floor((255 + color.g) / 2);
        color.b = Math.floor((255 + color.b) / 2);
        ctx.fillStyle = '#1A5488'; //color.toRGB();


        // Find the minimum separation between x-values.
        // This determines the bar width.
        var min_sep = Infinity;
        for (var i = 1; i < points.length; i++) {
            var sep = points[i].canvasx - points[i - 1].canvasx;
            if (sep < min_sep) min_sep = sep;
        }
        var bar_width = Math.floor(2.0 / 3 * min_sep);

        // Do the actual plotting.
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            var center_x = p.canvasx;

            ctx.fillRect(center_x - bar_width / 2, p.canvasy,
              bar_width, y_bottom - p.canvasy);

            ctx.strokeRect(center_x - bar_width / 2, p.canvasy,
              bar_width, y_bottom - p.canvasy);
        }
    }



    for (var i = 1; i <= 2; i++) {
        if (i == 1) {
            Grapg1();
        }
        else {
            //Grapg2();
        }
    }

    function Grapg1() {
        gs = [];
        var blockRedraw = false;
        var initialized = false;
        for (var i = 1; i <= 2; i++) {
            if (i == 1) {

                gs.push(
          new Dygraph(
            document.getElementById("CompanyPriceChart"),
       CompanyData, {
           customBars: true,
           //ylabel: 

           legend: 'always',
           interactionModel: {},
           //title: 
           //           titleHeight: 20,
           //           width: 480,
           //           height: 320,
           //           ylabel: 'Volume',
           //           legend: 'always',
           labelsDivStyles: { 'textAlign': 'right' },
           //           gridLineColor: '#1A5488',
           gridLineColor: 'transparent',
           axes: {
               x: {
                   valueFormatter: function (ms) {
                       return (new Date(ms)).yyyymmdd().toString();

                   }
               },
               y2: {
                   valueFormatter: function (y2) {
                       return 'y2vf(' + y2.toPrecision(2) + ')';
                   },
                   axisLabelFormatter: function (y2) {
                       return 'y2alf(' + y2.toPrecision(2) + ')';
                   }
               }
           },

           drawCallback: function (me, initial) {
           }
       }
          )
        );
            } //end i==1
            else {

                gs.push(
          new Dygraph(
            document.getElementById("CompanyVolumeChart"),
        CompanyVolumeData, {
            showRangeSelector: true,
            //            rollPeriod: 7,
            errorBars: true,
            colors: ["#1A5488",
                         "#006666",
                         "#00DD55",
                         "rgba(50,50,200,0.4)"],
            //            gridLineColor: '#1A5488',
            gridLineColor: 'transparent',
            //            drawXAxis: false,
            //            width: 480,
            //            height: 320,
            //            includeZero: true,
            ylabel: '',

            legend: 'always',

            plotter: barChartPlotter,
            rangeSelectorHeight: 15,
            rangeSelectorPlotStrokeColor: '#1A5488',
            rangeSelectorPlotFillColor: '#D6E7F2',

            axes: {
                x: {
                    valueFormatter: function (ms) {
                        return (new Date(ms)).yyyymmdd().toString();
                    }
                },
                y: {
                    valueFormatter: function (y) {
                        //                  return 'yvf(' + y.toPrecision(2) + ')';
                        return y.toLocaleString();
                    }
                ,
                    axisLabelFormatter: function (y) {
                        //                        return 'yalf(' + y.toPrecision(2) + ')';
                        if (y > 999999999) {
                            return (y / 1000000000).toPrecision(2).toString() + 'B';
                        }
                        else
                            if (y > 100000) {
                                return (y / 1000000).toPrecision(2).toString() + 'M';
                            }
                            else
                                if (y > 999) {
                                    return (y / 1000).toPrecision(2).toString() + 'K';
                                }
                                else
                                    if (y > 0) {
                                        return (y).toPrecision(2);
                                    }
                                    else {
                                        return '';
                                    }
                    }
                }
              ,
                y2: {
                    valueFormatter: function (y2) {
                        return 'y2vf(' + y2.toPrecision(2) + ')';
                    },
                    axisLabelFormatter: function (y2) {
                        return 'y2alf(' + y2.toPrecision(2) + ')';
                    }
                }
            },
            drawCallback: function (me, initial) {

                if (blockRedraw || initial) return;
                blockRedraw = true;

                var range = me.xAxisRange();
                var yrange = gs[0].yAxisRange();

                gs[0].updateOptions({
                    dateWindow: range,
                    valueRange: yrange

                });

                blockRedraw = false;
            }
        }
          )
        );
            } //end i > 2
        }

    }
}
);