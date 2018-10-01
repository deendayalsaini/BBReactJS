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
        var PortfolioName = $('.spnPortfolioName').html();
        var quote_str = "'" + PortfolioName + "'";
       
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
           labels: ['Date', 'Portfolio', 'BenchMark', 'Portfolio2', 'Portfolio3', 'Y3', 'Y4'],
           visibility: [true, true],
           ylabel: PortfolioName,
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
               'Portfolio': {
                   axis: 'y1',
                   fillGraph: true
               },
               'BenchMark': {
                   axis: 'y2'
               },
               'Portfolio2': {
                   axis: 'y2'
               },
               'Portfolio3': {
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
    function zoomGraphX(minDate, maxDate, minValRange, maxValRange, applyValueRange) {
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
                valueRange: [minValRange, maxValRange]
            });
        }
        else {
            gs[0].updateOptions({
                dateWindow: [minDate, maxDate]
            });
        }
        //

        showXDimensions(minDate, maxDate);
    }

    function showXDimensions(first, second) {
        var elem = document.getElementById("xdimensions");
        elem.innerHTML = "dateWindow : [" + first + ", " + second + "]";
    }

    $("#btn1Week").click(function () {

        $(".BarAnchor").removeClass('BarAnchorSelected');
        $(this).addClass('BarAnchorSelected');

        var min_data_x = gs[0].getValue(0, 0);
        var max_data_x = gs[0].getValue(gs[0].numRows() - 1, 0);


        var min_data_x_Date = new Date(min_data_x);
        var max_data_x_Date = new Date(max_data_x);
        var d = new Date(max_data_x);
        d.setDate(d.getDate() - 5);

        var record_count = gs[0].numRows() - 1;
        var start_data_x;
        //Range Value
        var arrValueRange = new Array();
        var x_MinValueRange = 0;
        var x_MaxValueRange = 0;
        //

        for (var i = record_count; i >= 0; i--) {
            var tempDate = new Date(gs[0].getValue(i, 0));
            if (tempDate - d > 0) {
                start_data_x = gs[0].getValue(i, 0);
            }
            else {

            }
        }
        //Value Range Sorting or Min and Max Value - Descending Order
        arrValueRange.sort(function (a, b) { return b - a });
        //Assign Min amd Max Value for Y1 Value Range 
        if (arrValueRange.length > 0) {
            x_MinValueRange = arrValueRange[arrValueRange.length - 1];
            x_MaxValueRange = arrValueRange[0];
        }
        zoomGraphX(Number(start_data_x), Number(max_data_x));
    });
    $("#btn1Month").click(function () {
        $(".BarAnchor").removeClass('BarAnchorSelected');
        $(this).addClass('BarAnchorSelected');

        var min_data_x = gs[0].getValue(0, 0);
        var max_data_x = gs[0].getValue(gs[0].numRows() - 1, 0);


        var min_data_x_Date = new Date(min_data_x);
        var max_data_x_Date = new Date(max_data_x);
        var d = new Date(max_data_x);
        d.setMonth(d.getMonth() - 1);

        var record_count = gs[0].numRows() - 1;
        var start_data_x;
        //Range Value
        var arrValueRange = new Array();
        var x_MinValueRange = 0;
        var x_MaxValueRange = 0;
        //

        for (var i = record_count; i >= 0; i--) {
            var tempDate = new Date(gs[0].getValue(i, 0));
            if (tempDate - d > 0) {
                start_data_x = gs[0].getValue(i, 0);
                //Range Value 
                arrValueRange.push(gs[0].getValue(i, 1).toString().split(",")[1]); //Portfolio.
                //
            }
            else {

            }
        }
        //Value Range Sorting or Min and Max Value - Descending Order
        arrValueRange.sort(function (a, b) { return b - a });
        //Assign Min amd Max Value for Y1 Value Range 
        if (arrValueRange.length > 0) {
            x_MinValueRange = arrValueRange[arrValueRange.length - 1];
            x_MaxValueRange = arrValueRange[0];
        }
        zoomGraphX(Number(start_data_x), Number(max_data_x), x_MinValueRange, x_MaxValueRange, "Y");
    });
    $("#btn3Month").click(function () {
        $(".BarAnchor").removeClass('BarAnchorSelected');
        $(this).addClass('BarAnchorSelected');

        var min_data_x = gs[0].getValue(0, 0);
        var max_data_x = gs[0].getValue(gs[0].numRows() - 1, 0);


        var min_data_x_Date = new Date(min_data_x);
        var max_data_x_Date = new Date(max_data_x);
        var d = new Date(max_data_x);
        d.setMonth(d.getMonth() - 3);

        var record_count = gs[0].numRows() - 1;
        var start_data_x;
        //Range Value
        var arrValueRange = new Array();
        var x_MinValueRange = 0;
        var x_MaxValueRange = 0;
        //

        for (var i = record_count; i >= 0; i--) {
            var tempDate = new Date(gs[0].getValue(i, 0));
            if (tempDate - d > 0) {
                start_data_x = gs[0].getValue(i, 0);
                //Range Value 
                arrValueRange.push(gs[0].getValue(i, 1).toString().split(",")[1]); //Portfolio.
                //
            }
            else {

            }
        }
        //Value Range Sorting or Min and Max Value - Descending Order
        arrValueRange.sort(function (a, b) { return b - a });
        //Assign Min amd Max Value for Y1 Value Range 
        if (arrValueRange.length > 0) {
            x_MinValueRange = arrValueRange[arrValueRange.length - 1];
            x_MaxValueRange = arrValueRange[0];
        }
        zoomGraphX(Number(start_data_x), Number(max_data_x), x_MinValueRange, x_MaxValueRange, "Y");
    });
    $("#btn6Month").click(function () {
        $(".BarAnchor").removeClass('BarAnchorSelected');
        $(this).addClass('BarAnchorSelected');

        var min_data_x = gs[0].getValue(0, 0);
        var max_data_x = gs[0].getValue(gs[0].numRows() - 1, 0);


        var min_data_x_Date = new Date(min_data_x);
        var max_data_x_Date = new Date(max_data_x);
        var d = new Date(max_data_x);
        d.setMonth(d.getMonth() - 6);

        var record_count = gs[0].numRows() - 1;
        var start_data_x;
        //Range Value
        var arrValueRange = new Array();
        var x_MinValueRange = 0;
        var x_MaxValueRange = 0;
        //

        for (var i = record_count; i >= 0; i--) {
            var tempDate = new Date(gs[0].getValue(i, 0));
            if (tempDate - d > 0) {
                start_data_x = gs[0].getValue(i, 0);
                //Range Value 
                arrValueRange.push(gs[0].getValue(i, 1).toString().split(",")[1]); //Portfolio.
                //
            }
            else {

            }
        }
        //Value Range Sorting or Min and Max Value - Descending Order
        arrValueRange.sort(function (a, b) { return b - a });
        //Assign Min amd Max Value for Y1 Value Range 
        if (arrValueRange.length > 0) {
            x_MinValueRange = arrValueRange[arrValueRange.length - 1];
            x_MaxValueRange = arrValueRange[0];
        }
        zoomGraphX(Number(start_data_x), Number(max_data_x), x_MinValueRange, x_MaxValueRange, "Y");
    });
    $("#btn1Year").click(function () {
        $(".BarAnchor").removeClass('BarAnchorSelected');
        $(this).addClass('BarAnchorSelected');

        var min_data_x = gs[0].getValue(0, 0);
        var max_data_x = gs[0].getValue(gs[0].numRows() - 1, 0);


        var min_data_x_Date = new Date(min_data_x);
        var max_data_x_Date = new Date(max_data_x);
        var d = new Date(max_data_x);
        d.setMonth(d.getMonth() - 12);

        var record_count = gs[0].numRows() - 1;
        var start_data_x;
        //Range Value
        var arrValueRange = new Array();
        var x_MinValueRange = 0;
        var x_MaxValueRange = 0;
        //

        for (var i = record_count; i >= 0; i--) {
            var tempDate = new Date(gs[0].getValue(i, 0));
            if (tempDate - d > 0) {
                start_data_x = gs[0].getValue(i, 0);
                //Range Value 
                arrValueRange.push(gs[0].getValue(i, 1).toString().split(",")[1]); //Portfolio.
                //
            }
            else {

            }
        }
        //Value Range Sorting or Min and Max Value - Descending Order
        arrValueRange.sort(function (a, b) { return b - a });
        //Assign Min amd Max Value for Y1 Value Range 
        if (arrValueRange.length > 0) {
            x_MinValueRange = arrValueRange[arrValueRange.length - 1];
            x_MaxValueRange = arrValueRange[0];
        }
        zoomGraphX(Number(start_data_x), Number(max_data_x), x_MinValueRange, x_MaxValueRange, "Y");
    });
    $("#btn3Year").click(function () {
        $(".BarAnchor").removeClass('BarAnchorSelected');
        $(this).addClass('BarAnchorSelected');

        var min_data_x = gs[0].getValue(0, 0);
        var max_data_x = gs[0].getValue(gs[0].numRows() - 1, 0);


        var min_data_x_Date = new Date(min_data_x);
        var max_data_x_Date = new Date(max_data_x);
        var d = new Date(max_data_x);
        d.setMonth(d.getMonth() - 36);

        var record_count = gs[0].numRows() - 1;
        var start_data_x;
        //Range Value
        var arrValueRange = new Array();
        var x_MinValueRange = 0;
        var x_MaxValueRange = 0;
        //

        for (var i = record_count; i >= 0; i--) {
            var tempDate = new Date(gs[0].getValue(i, 0));
            if (tempDate - d > 0) {
                start_data_x = gs[0].getValue(i, 0);
                //Range Value 
                arrValueRange.push(gs[0].getValue(i, 1).toString().split(",")[1]); //Portfolio.
                //
            }
            else {

            }
        }
        //Value Range Sorting or Min and Max Value - Descending Order
        arrValueRange.sort(function (a, b) { return b - a });
        //Assign Min amd Max Value for Y1 Value Range 
        if (arrValueRange.length > 0) {
            x_MinValueRange = arrValueRange[arrValueRange.length - 1];
            x_MaxValueRange = arrValueRange[0];
        }
        zoomGraphX(Number(start_data_x), Number(max_data_x), x_MinValueRange, x_MaxValueRange, "Y");
    });
    $("#btn5Year").click(function () {
        $(".BarAnchor").removeClass('BarAnchorSelected');
        $(this).addClass('BarAnchorSelected');

        var min_data_x = gs[0].getValue(0, 0);
        var max_data_x = gs[0].getValue(gs[0].numRows() - 1, 0);


        var min_data_x_Date = new Date(min_data_x);
        var max_data_x_Date = new Date(max_data_x);
        var d = new Date(max_data_x);
        d.setMonth(d.getMonth() - 60);

        var record_count = gs[0].numRows() - 1;
        var start_data_x;
        //Range Value
        var arrValueRange = new Array();
        var x_MinValueRange = 0;
        var x_MaxValueRange = 0;
        //

        for (var i = record_count; i >= 0; i--) {
            var tempDate = new Date(gs[0].getValue(i, 0));
            if (tempDate - d > 0) {
                start_data_x = gs[0].getValue(i, 0);
                //Range Value 
                arrValueRange.push(gs[0].getValue(i, 1).toString().split(",")[1]); //Portfolio.
                //
            }
            else {

            }
        }
        //Value Range Sorting or Min and Max Value - Descending Order
        arrValueRange.sort(function (a, b) { return b - a });
        //Assign Min amd Max Value for Y1 Value Range 
        if (arrValueRange.length > 0) {
            x_MinValueRange = arrValueRange[arrValueRange.length - 1];
            x_MaxValueRange = arrValueRange[0];
        }
        zoomGraphX(Number(start_data_x), Number(max_data_x), x_MinValueRange, x_MaxValueRange, "Y");
    });
    $("#btn10Year").click(function () {
        $(".BarAnchor").removeClass('BarAnchorSelected');
        $(this).addClass('BarAnchorSelected');

        var min_data_x = gs[0].getValue(0, 0);
        var max_data_x = gs[0].getValue(gs[0].numRows() - 1, 0);


        var min_data_x_Date = new Date(min_data_x);
        var max_data_x_Date = new Date(max_data_x);
        var d = new Date(max_data_x);
        d.setMonth(d.getMonth() - 120);

        var record_count = gs[0].numRows() - 1;
        var start_data_x;
        //Range Value
        var arrValueRange = new Array();
        var x_MinValueRange = 0;
        var x_MaxValueRange = 0;
        //

        for (var i = record_count; i >= 0; i--) {
            var tempDate = new Date(gs[0].getValue(i, 0));
            if (tempDate - d > 0) {
                start_data_x = gs[0].getValue(i, 0);
                //Range Value 
                arrValueRange.push(gs[0].getValue(i, 1).toString().split(",")[1]); //Portfolio.
                //
            }
            else {

            }
        }
        //Value Range Sorting or Min and Max Value - Descending Order
        arrValueRange.sort(function (a, b) { return b - a });
        //Assign Min amd Max Value for Y1 Value Range 
        if (arrValueRange.length > 0) {
            x_MinValueRange = arrValueRange[arrValueRange.length - 1];
            x_MaxValueRange = arrValueRange[0];
        }
        zoomGraphX(Number(start_data_x), Number(max_data_x), x_MinValueRange, x_MaxValueRange, "Y");
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