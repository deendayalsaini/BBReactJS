
$(window).load(function () {

    //--my code st
    Date.prototype.yyyymmdd = function () {

        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
        var dd = this.getDate().toString();

        Date.prototype.month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return this.month_names_short[this.getMonth()] + ' ' + (dd[1] ? dd : "0" + dd[0]) + ',' + yyyy;
    };
    Date.prototype.yyyymmddHmmss = function () {

        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
        var dd = this.getDate().toString();

        Date.prototype.month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return this.month_names_short[this.getMonth()] + ' ' + (dd[1] ? dd : "0" + dd[0]) + ',' + yyyy + ', ' + (this.getHours() < 10 ? '0' + this.getHours() : this.getHours()) + ':' + (this.getMinutes() < 10 ? '0' + this.getMinutes() : this.getMinutes()) + ':' + (this.getSeconds() < 10 ? '0' + this.getSeconds() : this.getSeconds());
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
                colors: ['#468BC9', 'green', 'brown', '#577C06'],
                legend: 'always',
                //title: 
                //           titleHeight: 20,
                //           width: 480,
                //           height: 320,
                //           ylabel: 'Volume',
                //           legend: 'always',
                labelsDivStyles: { 'textAlign': 'right' },
                gridLineColor: '#98A9B7',
                visibility: [true, true, true, true],
                axes: {
                    x: {
                        valueFormatter: function (ms) {
                            return (new Date(ms)).yyyymmdd().toString();
                        }
                    },
                    y: {
                        valueFormatter: function (y) {
                            return y.numberFormat(2);
                        },
                        axisLabelFormatter: function (y) {
                            return y.numberFormat(0);
                        }
                    },
                    y2: {
                        valueFormatter: function (y2) {
                            return y2.numberFormat(0);
                        },
                        axisLabelFormatter: function (y2) {
                            return y2.numberFormat(0);
                        }
                    }
                },
                series: {
                    Price: { fillGraph: true },
                    PE: { axis: 'y2' }
                },
                drawCallback: function (me, initial) { }
            }));
        } //end i==1 
        else if (i == 2) { //this section for Volume
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
                gridLineColor: '#98A9B7',
                width: 480,
                height: 320,
                //            includeZero: true,
                ylabel: '',

                legend: 'always',

                plotter: barChartPlotter,
                rangeSelectorHeight: 30,
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
                errorBars: true,
                zoomCallback: function (minDate, maxDate, yRange) {
                    //showDimensions(minDate, maxDate, yRange);
                    //Unselect Range selection
                    $(".BarAnchor").removeClass('BarAnchorSelected');
                    //  alert("showDimensions");
                },
                drawCallback: function (me, initial) {

                    //alert("drawCallback");
                    if (blockRedraw || initial) return;
                    blockRedraw = true;
                    //Set New Range that comes from Range Selectors
                    var range = me.xAxisRange();
                    var yrange = gs[0].yAxisRange();
                    //Apply new range as per Range selection.
                    gs[0].updateOptions({
                        dateWindow: range,
                        valueRange: yrange
                    });
                    blockRedraw = false;
                }
            })
        );
        } //end i > 2

        //****************************START THIS SECTION FOR DAILY DATA *******************************************//

        //****************************END THIS SECTION FOR DAILY DATA *******************************************//
    }


    //    var range = gs[0].xAxisRange();
    //    alert(range.length);

    // Pull an initial value for logging.
    var minDate = gs[1].xAxisRange()[0];
    var maxDate = gs[1].xAxisRange()[1];
    var minValue = gs[1].yAxisRange()[0];
    var maxValue = gs[1].yAxisRange()[1];

    showDimensions(minDate, maxDate, [minValue, maxValue]);

    //Show 
    function showDimensions(minDate, maxDate, yRanges) {
        showXDimensions(minDate, maxDate);
    }
    function zoomGraphX(minDate, maxDate, minValRange, maxValRange, applyValueRange) {
        var startVal = Number(Number(minValRange) - (Number(minValRange) * 0.05));
        var endVal = Number(Number(maxValRange) + (Number(maxValRange) * 0.05));
        gs[1].updateOptions({
            dateWindow: [minDate, maxDate]
        });

        var range = gs[1].xAxisRange();
        //var yrange = gs[0].yAxisRange();

        //        alert(yrange);

        if (applyValueRange == "Y") {
            gs[0].updateOptions({
                dateWindow: range,
                valueRange: [startVal, endVal]
            });
        }
        else {
            var yrange = gs[0].yAxisRange();
            gs[0].updateOptions({
                dateWindow: range,
                valueRange: yrange
            });
        }

        showXDimensions(minDate, maxDate);
    }

    function showXDimensions(first, second) {
        var elem = document.getElementById("xdimensions");
        elem.innerHTML = "dateWindow : [" + first + ", " + second + "]";
    }


    $("#btn1Day").click(function () {
        $("#divTopChart").hide();
        $("#divBottomChart").show();

        var min_data_x = gs[1].getValue(0, 0);
        var max_data_x = gs[1].getValue(gs[1].numRows() - 1, 0);


        var min_data_x_Date = new Date(min_data_x);
        var max_data_x_Date = new Date(max_data_x);
        var d = new Date(max_data_x);

        var record_count = gs[1].numRows() - 1;
        var start_data_x;
        //Range Value
        var arrValueRange = new Array();
        var x_MinValueRange = 0;
        var x_MaxValueRange = 0;
        //


        for (var i = record_count; i >= 0; i--) {
            var tempDate = new Date(gs[1].getValue(i, 0));
            if (tempDate - d > 0) {
                start_data_x = gs[1].getValue(i, 0);

                //Range Value 
                arrValueRange.push(gs[0].getValue(i, 1).toString().split(",")[1]); //Price
                arrValueRange.push(gs[0].getValue(i, 2).toString().split(",")[1]); //50DMA
                arrValueRange.push(gs[0].getValue(i, 3).toString().split(",")[1]); //200DMA
                //arrValueRange.push(gs[0].getValue(i, 4).toString().split(",")[1]); //200DMA

            }
            else {
            }
        }
        zoomGraphX(Number(start_data_x), Number(max_data_x));
    });
    $("#btn1Week").click(function () {

        $("#divTopChart").show();
        $("#divBottomChart").hide();

        var min_data_x = gs[1].getValue(0, 0);
        var max_data_x = gs[1].getValue(gs[1].numRows() - 1, 0);


        var min_data_x_Date = new Date(min_data_x);
        var max_data_x_Date = new Date(max_data_x);
        var d = new Date(max_data_x);
        d.setDate(d.getDate() - 5);

        var record_count = gs[1].numRows() - 1;
        var start_data_x;

        //Range Value
        var arrValueRange = new Array();
        var x_MinValueRange = 0;
        var x_MaxValueRange = 0;
        //

        for (var i = record_count; i >= 0; i--) {
            var tempDate = new Date(gs[1].getValue(i, 0));
            if (tempDate - d > 0) {
                start_data_x = gs[1].getValue(i, 0);

                //Range Value 
                arrValueRange.push(gs[0].getValue(i, 1).toString().split(",")[1]); //Price
                arrValueRange.push(gs[0].getValue(i, 2).toString().split(",")[1]); //50DMA
                arrValueRange.push(gs[0].getValue(i, 3).toString().split(",")[1]); //200DMA
                //arrValueRange.push(gs[0].getValue(i, 4).toString().split(",")[1]); //200DMA
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
    $("#btn1Month").click(function () {
        $("#divTopChart").show();
        $("#divBottomChart").hide();

        var min_data_x = gs[1].getValue(0, 0);
        var max_data_x = gs[1].getValue(gs[1].numRows() - 1, 0);


        var min_data_x_Date = new Date(min_data_x);
        var max_data_x_Date = new Date(max_data_x);
        var d = new Date(max_data_x);
        d.setMonth(d.getMonth() - 1);

        var record_count = gs[1].numRows() - 1;
        var start_data_x;
        //Range Value
        var arrValueRange = new Array();
        var x_MinValueRange = 0;
        var x_MaxValueRange = 0;
        //


        for (var i = record_count; i >= 0; i--) {
            var tempDate = new Date(gs[1].getValue(i, 0));
            if (tempDate - d > 0) {
                start_data_x = gs[1].getValue(i, 0);

                //Range Value 
                arrValueRange.push(gs[0].getValue(i, 1).toString().split(",")[1]); //Price
                arrValueRange.push(gs[0].getValue(i, 2).toString().split(",")[1]); //50DMA
                arrValueRange.push(gs[0].getValue(i, 3).toString().split(",")[1]); //200DMA
                //arrValueRange.push(gs[0].getValue(i, 4).toString().split(",")[1]); //200DMA

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
        $("#divTopChart").show();
        $("#divBottomChart").hide();

        var min_data_x = gs[1].getValue(0, 0);
        var max_data_x = gs[1].getValue(gs[1].numRows() - 1, 0);


        var min_data_x_Date = new Date(min_data_x);
        var max_data_x_Date = new Date(max_data_x);
        var d = new Date(max_data_x);
        d.setMonth(d.getMonth() - 3);

        var record_count = gs[1].numRows() - 1;
        var start_data_x;
        //Range Value
        var arrValueRange = new Array();
        var x_MinValueRange = 0;
        var x_MaxValueRange = 0;
        //

        for (var i = record_count; i >= 0; i--) {
            var tempDate = new Date(gs[1].getValue(i, 0));
            if (tempDate - d > 0) {
                start_data_x = gs[1].getValue(i, 0);

                //Range Value 
                arrValueRange.push(gs[0].getValue(i, 1).toString().split(",")[1]); //Price
                arrValueRange.push(gs[0].getValue(i, 2).toString().split(",")[1]); //50DMA
                arrValueRange.push(gs[0].getValue(i, 3).toString().split(",")[1]); //200DMA
                //arrValueRange.push(gs[0].getValue(i, 4).toString().split(",")[1]); //200DMA
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
        $("#divTopChart").show();
        $("#divBottomChart").hide();

        var min_data_x = gs[1].getValue(0, 0);
        var max_data_x = gs[1].getValue(gs[1].numRows() - 1, 0);


        var min_data_x_Date = new Date(min_data_x);
        var max_data_x_Date = new Date(max_data_x);
        var d = new Date(max_data_x);
        d.setMonth(d.getMonth() - 6);

        var record_count = gs[1].numRows() - 1;
        var start_data_x;
        //Range Value
        var arrValueRange = new Array();
        var x_MinValueRange = 0;
        var x_MaxValueRange = 0;
        //

        for (var i = record_count; i >= 0; i--) {
            var tempDate = new Date(gs[1].getValue(i, 0));
            if (tempDate - d > 0) {
                start_data_x = gs[1].getValue(i, 0);
                //Range Value 
                arrValueRange.push(gs[0].getValue(i, 1).toString().split(",")[1]); //Price
                arrValueRange.push(gs[0].getValue(i, 2).toString().split(",")[1]); //50DMA
                arrValueRange.push(gs[0].getValue(i, 3).toString().split(",")[1]); //200DMA
                //arrValueRange.push(gs[0].getValue(i, 4).toString().split(",")[1]); //200DMA
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
        $("#divTopChart").show();
        $("#divBottomChart").hide();

        var min_data_x = gs[1].getValue(0, 0);
        var max_data_x = gs[1].getValue(gs[1].numRows() - 1, 0);


        var min_data_x_Date = new Date(min_data_x);
        var max_data_x_Date = new Date(max_data_x);
        var d = new Date(max_data_x);
        d.setMonth(d.getMonth() - 12);

        var record_count = gs[1].numRows() - 1;
        var start_data_x;
        //Range Value
        var arrValueRange = new Array();
        var x_MinValueRange = 0;
        var x_MaxValueRange = 0;
        //

        for (var i = record_count; i >= 0; i--) {
            var tempDate = new Date(gs[1].getValue(i, 0));
            if (tempDate - d > 0) {
                start_data_x = gs[1].getValue(i, 0);
                //Range Value 
                arrValueRange.push(gs[0].getValue(i, 1).toString().split(",")[1]); //Price
                arrValueRange.push(gs[0].getValue(i, 2).toString().split(",")[1]); //50DMA
                arrValueRange.push(gs[0].getValue(i, 3).toString().split(",")[1]); //200DMA
                //arrValueRange.push(gs[0].getValue(i, 4).toString().split(",")[1]); //40WMA
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
        $("#divTopChart").show();
        $("#divBottomChart").hide();

        var min_data_x = gs[1].getValue(0, 0);
        var max_data_x = gs[1].getValue(gs[1].numRows() - 1, 0);


        var min_data_x_Date = new Date(min_data_x);
        var max_data_x_Date = new Date(max_data_x);
        var d = new Date(max_data_x);
        d.setMonth(d.getMonth() - 36);

        var record_count = gs[1].numRows() - 1;
        var start_data_x;
        //Range Value
        var arrValueRange = new Array();
        var x_MinValueRange = 0;
        var x_MaxValueRange = 0;
        //

        for (var i = record_count; i >= 0; i--) {
            var tempDate = new Date(gs[1].getValue(i, 0));
            if (tempDate - d > 0) {
                start_data_x = gs[1].getValue(i, 0);
                //Range Value 
                arrValueRange.push(gs[0].getValue(i, 1).toString().split(",")[1]); //Price
                arrValueRange.push(gs[0].getValue(i, 2).toString().split(",")[1]); //50DMA
                arrValueRange.push(gs[0].getValue(i, 3).toString().split(",")[1]); //40WMA
                //arrValueRange.push(gs[0].getValue(i, 4).toString().split(",")[1]); //40WMA
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
        $("#divTopChart").show();
        $("#divBottomChart").hide();

        var min_data_x = gs[1].getValue(0, 0);
        var max_data_x = gs[1].getValue(gs[1].numRows() - 1, 0);


        var min_data_x_Date = new Date(min_data_x);
        var max_data_x_Date = new Date(max_data_x);
        var d = new Date(max_data_x);
        d.setMonth(d.getMonth() - 60);

        var record_count = gs[1].numRows() - 1;
        var start_data_x;
        //Range Value
        var arrValueRange = new Array();
        var x_MinValueRange = 0;
        var x_MaxValueRange = 0;
        //

        for (var i = record_count; i >= 0; i--) {
            var tempDate = new Date(gs[1].getValue(i, 0));
            if (tempDate - d > 0) {
                start_data_x = gs[1].getValue(i, 0);
                //Range Value 
                arrValueRange.push(gs[0].getValue(i, 1).toString().split(",")[1]); //Price
                arrValueRange.push(gs[0].getValue(i, 2).toString().split(",")[1]); //50DMA
                arrValueRange.push(gs[0].getValue(i, 3).toString().split(",")[1]); //40WMA
                //arrValueRange.push(gs[0].getValue(i, 4).toString().split(",")[1]); //40WMA
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
        $("#divTopChart").show();
        $("#divBottomChart").hide();

        var min_data_x = gs[1].getValue(0, 0);
        var max_data_x = gs[1].getValue(gs[1].numRows() - 1, 0);


        var min_data_x_Date = new Date(min_data_x);
        var max_data_x_Date = new Date(max_data_x);
        var d = new Date(max_data_x);
        d.setMonth(d.getMonth() - 120);

        var record_count = gs[1].numRows() - 1;
        var start_data_x;
        //Range Value
        var arrValueRange = new Array();
        var x_MinValueRange = 0;
        var x_MaxValueRange = 0;
        //

        for (var i = record_count; i >= 0; i--) {
            var tempDate = new Date(gs[1].getValue(i, 0));
            if (tempDate - d > 0) {
                start_data_x = gs[1].getValue(i, 0);
                //Range Value 
                arrValueRange.push(gs[0].getValue(i, 1).toString().split(",")[1]); //Price
                arrValueRange.push(gs[0].getValue(i, 2).toString().split(",")[1]); //50DMA
                arrValueRange.push(gs[0].getValue(i, 3).toString().split(",")[1]); //40WMA
                //arrValueRange.push(gs[0].getValue(i, 4).toString().split(",")[1]); //40WMA
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

    $(window.parent.document.getElementById('chkPrice')).click(function () {
        changeSeries(0, this);
    });
    $(window.parent.document.getElementById('chk11WMA')).click(function () {
        changeSeries(1, this);
    });
    $(window.parent.document.getElementById('chk40WMA')).click(function () {
        changeSeries(2, this);
    });
    $(window.parent.document.getElementById('chkPE')).click(function () {
        changeSeries(3, this);
    });
    function changeSeries(id, el) {
        gs[0].setVisibility(id, el.checked);

    }


    //
    //$("#divBottomChart")
    try {
  
  /*
        var DAILYData = new Array();

        var objvlabel = new Array();
        if (DAILYDataObj.length > 0) {
            var x;
            for (x in DAILYDataObj[0]) {
                objvlabel.push(x.replace("1", ""));
            }
        }

        //alert(DAILYDataObj.length);

        for (var i = 0; i < DAILYDataObj.length; i++) {
            var Obj = new Array();
            var x;
            for (x in DAILYDataObj[i]) {
                if (x == 'TIME') {
                    Obj.push(new Date(DAILYDataObj[i][x]));
                }
                else {
                    Obj.push(parseFloat(DAILYDataObj[i][x]));
                }
            }
            DAILYData.push(Obj);
            //DAILYData.push([, parseFloat(DAILYDataObj[i].ACC1), parseFloat(DAILYDataObj[i].ASIANPAINT1)]);
        }
      */
        var data = DAILYData;
        var g = new Dygraph(document.getElementById("CompanyPriceChart_BottomChart"), data,
            {
                showRangeSelector: true,
                colors: ['#468BC9', 'blue'],
                //            rollPeriod: 7,
                //                errorBars: true,
                gridLineColor: '#98A9B7',
                //                width: 480,
                //                height: 320,
                //                //            includeZero: true,
                //                ylabel: '',

                //                legend: 'always',

                //                plotter: barChartPlotter,
                rangeSelectorHeight: 30,
                rangeSelectorPlotStrokeColor: '#1A5488',
                rangeSelectorPlotFillColor: '#D6E7F2',

                //drawPoints: true,
                //showRoller: true,
                //valueRange: [0.0, 1.2],

                labels: ['Time', 'Price'], //objvlabel, //
                axes: {
                    x: {
                        //  valueRange: [d1, d3]
                        valueFormatter: function (ms) {
                            return (new Date(ms)).yyyymmddHmmss().toString();
                        }
                    },
                    y: {
                        valueFormatter: function (y) {
                            return y.numberFormat(2);
                        },
                        axisLabelFormatter: function (y) {
                            return y.numberFormat(0);
                        }
                    }
                },
                series: {
                    Price: { fillGraph: true }
                }
            });

        //Live Data Plotting From Tick Data
        //http://dygraphs.com/tests/dynamic-update.html
        setInterval(function () {
            var mData = window.parent.getChartJsonObject();
            var data = JSON.parse(mData);
            var ClosePrice0 = data[0].ClosePrice;
            var Change0 = data[0].Change;
            var mpricetime = data[0].mpricetime;
            var CDATETIME = data[0].CDATETIME;
            var CPRICE = data[0].CPRICE;

            //Update Live Tick Data
            DAILYData.splice(DAILYData.length - 1, 0, [new Date(CDATETIME), CPRICE]);
            g.updateOptions({ 'file': DAILYData });

            //
        }, 1000);

        //$("#divBottomChart").hide();
        $("#divTopChart").hide();
    }
    catch (msg) {
        //alert(msg);
    }
    //
});

//
Number.prototype.numberFormat = function (decimals, dec_point, thousands_sep) {
    dec_point = typeof dec_point !== 'undefined' ? dec_point : '.';
    thousands_sep = typeof thousands_sep !== 'undefined' ? thousands_sep : ',';

    var parts = this.toFixed(decimals).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_sep);

    return parts.join(dec_point);
}
//




/*
* Date Format 1.2.3
* (c) 2007-2009 Steven Levithan <stevenlevithan.com>
* MIT license
*
* Includes enhancements by Scott Trenda <scott.trenda.net>
* and Kris Kowal <cixar.com/~kris.kowal/>
*
* Accepts a date, a mask, or a date and a mask.
* Returns a formatted version of the given date.
* The date defaults to the current date/time.
* The mask defaults to dateFormat.masks.default.
*/

var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            timezoneClip = /[^-+\dA-Z]/g,
            pad = function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len) val = "0" + val;
                return val;
            };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                m = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                M = date[_ + "Minutes"](),
                s = date[_ + "Seconds"](),
                L = date[_ + "Milliseconds"](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d: d,
                    dd: pad(d),
                    ddd: dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    m: m + 1,
                    mm: pad(m + 1),
                    mmm: dF.i18n.monthNames[m],
                    mmmm: dF.i18n.monthNames[m + 12],
                    yy: String(y).slice(2),
                    yyyy: y,
                    h: H % 12 || 12,
                    hh: pad(H % 12 || 12),
                    H: H,
                    HH: pad(H),
                    M: M,
                    MM: pad(M),
                    s: s,
                    ss: pad(s),
                    l: pad(L, 3),
                    L: pad(L > 99 ? Math.round(L / 10) : L),
                    t: H < 12 ? "a" : "p",
                    tt: H < 12 ? "am" : "pm",
                    T: H < 12 ? "A" : "P",
                    TT: H < 12 ? "AM" : "PM",
                    Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
} ();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
    monthNames: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};

function formatDate(d) {
    var yyyy = d.getFullYear(),
            mm = d.getMonth() + 1,
            dd = d.getDate();
    return yyyy + '-' + (mm < 10 ? '0' : '') + mm + (dd < 10 ? '0' : '') + dd;
}

$(document).ready(function () {
    //    try {
    //        var data = DAILYData;
    //        var g = new Dygraph(document.getElementById("CompanyPriceChart_BottomChart"), data,
    //            {
    //                showRangeSelector: true,
    //                colors: ['#468BC9', 'blue'],
    //                //            rollPeriod: 7,
    //                //                errorBars: true,
    //                gridLineColor: '#98A9B7',
    //                //                width: 480,
    //                //                height: 320,
    //                //                //            includeZero: true,
    //                //                ylabel: '',

    //                //                legend: 'always',

    //                //                plotter: barChartPlotter,
    //                rangeSelectorHeight: 30,
    //                rangeSelectorPlotStrokeColor: '#1A5488',
    //                rangeSelectorPlotFillColor: '#D6E7F2',

    //                //drawPoints: true,
    //                //showRoller: true,
    //                //valueRange: [0.0, 1.2],
    //                labels: ['Time', 'Price'],
    //                axes: {
    //                    x: {
    //                        //  valueRange: [d1, d3]
    //                        valueFormatter: function (ms) {
    //                            return (new Date(ms)).yyyymmddHmmss().toString();
    //                        }
    //                    },
    //                    y: {
    //                        valueFormatter: function (y) {
    //                            return y.numberFormat(2);
    //                        },
    //                        axisLabelFormatter: function (y) {
    //                            return  y.numberFormat(2) ;
    //                        }
    //                    }
    //                },
    //                 series: {
    //                    Price: { fillGraph: true }
    //                }
    //            });
    //        $("#divBottomChart").hide();
    //    }
    //    catch (msg) {
    //        //alert(msg);
    //    }

}
);