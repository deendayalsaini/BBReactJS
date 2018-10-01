//dyChartForPortfolioAndIndex


$(document).ready(function () {

    var loadFirstTime = true;

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

            Grapg1(true);
        }
        else {
            //Grapg2();
        }
    }

    function Grapg1(ObjLoadFirst) {


        var IndexName = $('.spnPortfolioName').html();
        var quote_str = "'" + IndexName + "'";
        //alert(quote_str);
        gs = [];
        var blockRedraw = false;
        var initialized = false;
        for (var i = 1; i <= 2; i++) {
            if (i == 1) {

                gs.push(
          new Dygraph(
            document.getElementById("CompanyPriceChart"),
       CompanyData, {
           showRangeSelector: true,
           customBars: true,
           //ylabel: 
           legend: 'always',
           colors: ['#468BC9', 'brown'],
           rangeSelectorHeight: 30,
           rangeSelectorPlotStrokeColor: '#1A5488',
           rangeSelectorPlotFillColor: '#D6E7F2',
           labels: ['Date', 'Index', 'BenchMark', 'Y3', 'Y4'],
           visibility: [true, true],
           ylabel: IndexName,
           y2label: BanchMarkName,
           yAxisLabelWidth: 60,
           xAxisLabelWidth: 60,

           //title: 
           //           titleHeight: 20,
           //           width: 480,
           //           height: 320,
           //           ylabel: 'Volume',
           //           legend: 'always',
           labelsDivStyles: { 'textAlign': 'right' },
           gridLineColor: '#98A9B7',

           series: {
               'Index': {
                   axis: 'y1',
                   fillGraph: true
               },
               'BenchMark': {
                   axis: 'y2'
               },
               'Y3': {
                   axis: 'y2'
               },
               'Y4': {
                   axis: 'y2'
               }
           },

           axes: {
               x: {
                   valueFormatter: function (ms) {
                       return (new Date(ms)).yyyymmdd().toString();
                   }
               },
               y2: {
                   // set axis-related properties here
                   labelsKMB: true
                   //                   valueFormatter: function (y2) {
                   //                       return '' + y2.toPrecision(2) + '';
                   //                   },
                   //                   axisLabelFormatter: function (y2) {
                   //                       return '' + y2.toPrecision(2) + '';
                   //                   }
               },
               y: {
                   // set axis-related properties here
                   labelsKMB: true

               }
           },
           //Zoom Range Selection for 1W,1M,3M,6M,1Y,3Y etc.
           zoomCallback: function (minDate, maxDate, yRange) {
               //showDimensions(minDate, maxDate, yRange);

               //Unselect Range selection
               $(".BarAnchor").removeClass('BarAnchorSelected');

           },
           //
           drawCallback: function (me, initial) {
               if (blockRedraw || initial) return;
               blockRedraw = true;


           }
       }
       ));
            } //end i==1
        }
    }

    //Price Data Selector as 1W,1M,3M,6M,1Y,

    // Pull an initial value for logging.
    //var minDate = gs[0].xAxisRange()[0];
    //var maxDate = gs[0].xAxisRange()[1];
    //var minValue = gs[0].yAxisRange()[0];
    //var maxValue = gs[0].yAxisRange()[1];

    //showDimensions(minDate, maxDate, [minValue, maxValue]);

    //Show 
    function showDimensions(minDate, maxDate, yRanges) {
        showXDimensions(minDate, maxDate);
    }
    function zoomGraphX(applyValueRange, ncount, IsMonth) {

            //
            var min_data_x = gs[0].getValue(0, 0);
            var max_data_x = gs[0].getValue(gs[0].numRows() - 1, 0);

            var min_data_x_Date = new Date(min_data_x);
            var max_data_x_Date = new Date(max_data_x);
            var d = new Date(max_data_x);
            if (IsMonth == 'Y') {
                d.setMonth(d.getMonth() - ncount);
            }
            else {
                d.setDate(d.getDate() - ncount);
            }

            //

            var arrValueRange_y = new Array();
            var arrValueRange_y2 = new Array();
            var w_x_MinValueRange = 0, w_x_MaxValueRange = 0, w_y_MinValueRange = 0, w_y_MaxValueRange = 0;

            var record_count = gs[0].numRows() - 1;
            var start_data_x;
            //Range Value
            for (var i = record_count; i >= 0; i--) {
                var tempDate = new Date(gs[0].getValue(i, 0));
                if (tempDate - d > 0) {
                    start_data_x = gs[0].getValue(i, 0);
                    //Range Value 
                    arrValueRange_y.push(gs[0].getValue(i, 1).toString().split(",")[1]); //Index.
                    arrValueRange_y2.push(gs[0].getValue(i, 2).toString().split(",")[1]); //Banchmark.
                }
                else {
                }
            }
            //Value Range Sorting or Min and Max Value - Descending Order
            arrValueRange_y.sort(function (a, b) { return b - a });
            arrValueRange_y2.sort(function (a, b) { return b - a });
            //Assign Min amd Max Value for Y1 Value Range 
            if (arrValueRange_y.length > 0) {
                w_x_MinValueRange = arrValueRange_y[arrValueRange_y.length - 1];
                //If Min Value is null or empty then Recheck for min value in using for loop in sorted array. added on 29042016. 
                if(w_x_MinValueRange == ''){for(var t=arrValueRange_y.length -1;t >=0; t--){if(w_x_MinValueRange == ''){ w_x_MinValueRange = arrValueRange_y[t]; }else{break;}}}
                //Max Value
                w_x_MaxValueRange = arrValueRange_y[0];
            }
            //Assign Min amd Max Value for Y2 Value Range 
            if (arrValueRange_y2.length > 0) {
                w_y_MinValueRange = arrValueRange_y2[arrValueRange_y2.length - 1];
                //If Min Value is null or empty then Recheck for min value in using for loop in sorted array.  added on 29042016.
                if(w_y_MinValueRange == ''){for(var t=arrValueRange_y2.length -1;t >=0; t--){if(w_y_MinValueRange == ''){ w_y_MinValueRange = arrValueRange_y2[t]; }else{break;}}}
                //Max Value
                w_y_MaxValueRange = arrValueRange_y2[0];
            }

            var minDate = Number(start_data_x), maxDate = Number(max_data_x);

            //Reset Start & and value for UI.added on 29042016.
            var startVal = Number(Number(w_x_MinValueRange) - (Number(w_x_MinValueRange) * 0.05));
            var endVal = Number(Number(w_x_MaxValueRange) + (Number(w_x_MaxValueRange) * 0.05));
            //Reset Start & and value for UI.added on 29042016.
            var startVal_y2 = Number(Number(w_y_MinValueRange) - (Number(w_y_MinValueRange) * 0.05));
            var endVal_y2 = Number(Number(w_y_MaxValueRange) + (Number(w_y_MaxValueRange) * 0.05));

            //

            // alert("zoomGraphX");

            //        gs[0].updateOptions({
            //            dateWindow: [minDate, maxDate]
            //        });

            //        gs[1].updateOptions({
            //            dateWindow: [minDate, maxDate]
            //        });


            //Range Value
            //var range = gs[1].xAxisRange();

            if (applyValueRange == "Y") {

                gs[0].updateOptions({
                    dateWindow: [minDate, maxDate],     
               axes: {
               x: {
                   valueFormatter: function (ms) {
                       return (new Date(ms)).yyyymmdd().toString();
                   }
               },
               y2: {
                   // set axis-related properties here
                   labelsKMB: true,
                   valueRange: [startVal_y2, endVal_y2]
               },
               y: {
                  valueRange: [startVal, endVal],
                   // set axis-related properties here
                   labelsKMB: true

               }
           },
                });
            }
            else {
//                gs[0].updateOptions({
//                    dateWindow: [minDate, maxDate]
//                });
            }
            //
            //showXDimensions(minDate, maxDate);
    }

    function showXDimensions(first, second) {
        var elem = document.getElementById("xdimensions");
        elem.innerHTML = "dateWindow : [" + first + ", " + second + "]";
    }

    $("#btn1Week").click(function () {
        $(".BarAnchor").removeClass('BarAnchorSelected');
        $(this).addClass('BarAnchorSelected');
        zoomGraphX("Y", 5, 'N');
    });
    $("#btn1Month").click(function () {
        $(".BarAnchor").removeClass('BarAnchorSelected');
        $(this).addClass('BarAnchorSelected');
        zoomGraphX("Y", 1, 'Y');
    });
    $("#btn3Month").click(function () {
        $(".BarAnchor").removeClass('BarAnchorSelected');
        $(this).addClass('BarAnchorSelected');
        zoomGraphX("Y", 3, 'Y');
    });
    $("#btn6Month").click(function () {
        $(".BarAnchor").removeClass('BarAnchorSelected');
        $(this).addClass('BarAnchorSelected');
        zoomGraphX("Y", 6, 'Y');
    });
    $("#btn1Year").click(function () {
        $(".BarAnchor").removeClass('BarAnchorSelected');
        $(this).addClass('BarAnchorSelected');
        zoomGraphX("Y", 12, 'Y');
    });
    $("#btn3Year").click(function () {
        $(".BarAnchor").removeClass('BarAnchorSelected');
        $(this).addClass('BarAnchorSelected');
        zoomGraphX("Y", 36, 'Y');
    });
    $("#btn5Year").click(function () {
        $(".BarAnchor").removeClass('BarAnchorSelected');
        $(this).addClass('BarAnchorSelected');
        zoomGraphX("Y", 60, 'Y');
    });
    $("#btn10Year").click(function () {
        $(".BarAnchor").removeClass('BarAnchorSelected');
        $(this).addClass('BarAnchorSelected');
        zoomGraphX("Y", 120, 'Y');
    });
    //Series Hide/Show
    $(window.parent.document.getElementById('chkPrice')).click(function () {
        changeSeries(0, this);
    });
    $(window.parent.document.getElementById('chkBenchMarkPrice')).click(function () {
        changeSeries(1, this);
    });
    function changeSeries(id, el) {
        gs[0].setVisibility(id, el.checked);
    }
    //
});