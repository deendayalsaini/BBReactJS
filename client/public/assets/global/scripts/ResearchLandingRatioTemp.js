
function format1(n, pre) {
    return  n.toFixed(pre).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}


$(document).ready(function () {

    try {
        //create huge treetable
        //console.log('init');
        /*Main Header*/
        var ValuationData;
        var table;

        $('#tableContainer').html('');

        $.each(gValuationData, function (index, ldata) {

            ValuationData = ldata.PANEL_DATA;
            //            alert("ValuationDataRatio :" + JSON.stringify(ValuationData));
            if (ValuationData.LEVELDATA.length > 0) {

                table = $("<table class=\"tree table table-striped fixedHeader_collapsetree\" style=\"width: 98% !important; margin-bottom:20px !important;\"></table>").appendTo($('#tableContainer'));


                if (index == 0) {
                    var trHead = $("<thead class='gridviewtheadfixhd'></thead>").addClass("treegrid-" + index + "--0").appendTo(table);
                } else {
                    var trHead = $("<thead></thead>").addClass("treegrid-" + index + "--0").appendTo(table);
                }

                var trH = $("<tr ></tr>").addClass("treegrid-" + index + "--0").appendTo(table);
                trHead.append(trH);

                var tdH = $("<th  ></th>").html("<div class=\"treegridHeaderColumn\">" + ldata.PANELNAME + "</div>");
                trH.append(tdH);
                // var tdChart = $("<th  ></th>").html("<div  style=\"width:62px;\"> </div>");
                var tdChart = $("<th  ></th>");
                trH.append(tdChart);


                $.each(ValuationData.YEARS, function (index, sYear) {
                    if(index >=gStartIndex && index <= gEndIndex)
                    {
                    var tdH = $("<th  ></th>").html('<div class=\"treegrid-Header\">' + sYear + '</div>');
                    trH.append(tdH);
                    }
                });
            }
            /*End Main Header*/

            for (var i = 0; i < ValuationData.LEVELDATA.length; i++) {
            try{
                console.log('add');
                var lLevelData = ValuationData.LEVELDATA[i];
                var lTopGridId = i; //+ lLevelData.LVL;
                var tr = $("<tr></tr>").addClass("treegrid-" + lTopGridId).appendTo(table);
                var td = $("<td></td>").html("<div class=\"treegridHeaderColumn\" title=\"" + lLevelData.FULLFIELD + "\"> " + lLevelData.FIELD + "</div>");
                tr.append(td);
                var IsPremuimChart = false;

                /*Remove Comma*/
                var MyTempArray = [];
                

                $.each(lLevelData.DATA_VAL, function (index, slist) {
                   if(index >=gStartIndex && index <= gEndIndex)
                   {
                    if (slist == 'PREMIUM') { IsPremuimChart = true; }

                    if(slist.replace(/,/g, '').replace('%', '').replace(/NA/g, null) != "")
                    {
                        MyTempArray.push(slist.replace(/,/g, '').replace('%', '').replace(/NA/g, null));
                    }
                    else
                    {
                        MyTempArray.push(0);
                    }
                  }
                });



               
                //var temp_data_attr = '[' + MyTempArray + ']';
                //temp_data_attr.replace(",]","]");
                /*Chart Div Code and Event Binding*/
                var divc = document.createElement('div');
                divc.setAttribute('data', '[' + MyTempArray + ']');
                divc.setAttribute('data-Field', lLevelData.FULLFIELD);
                divc.setAttribute('class', 'gridChart');
            

                $(divc).mouseenter(function () { ShowChart(this); });
                $(divc).mouseout(function () { $("#tootipDiv").css("display", "none"); });
                var tdChart = $("<td></td>").html(divc);
                tr.append(tdChart);
                /*end*/
            }
            catch(er)
            {
                console.log(er)
            }     

                $.each(lLevelData.DATA_VAL, function (index, sDataValue) {
                    if(index >=gStartIndex && index <= gEndIndex)
                    {
                    if(sDataValue != 'NA')
                    {
                    var strsDataValue=(parseFloat((sDataValue).replace(/,/g, '')).toFixed(2) * ValUnit).toString();
                    var td = $("<td></td>").html('<div class=\"treegrid-Cell\">' + (sDataValue == "PREMIUM" ? "<div class='blur' title='Premium'> &nbsp;<div/>" : ValueFormatter(strsDataValue)) + '</div>');
                    tr.append(td);
                    }
                    else
                    {
                     var td = $("<td></td>").html('<div class=\"treegrid-Cell\">' + (sDataValue == "PREMIUM" ? "<div class='blur' title='Premium'> &nbsp;<div/>" : sDataValue) + '</div>');
                         tr.append(td);
                    }

                }
                });

                /*Level Data Pocessing for child data processing*/
                if (lLevelData.CHILD_DATA != null) {
                    var lChildData = lLevelData.CHILD_DATA;
                    for (var j = 0; j < lChildData.length; j++) {
                        var ObjVal = lChildData[j];
                        var lgrdId = i + '-' + j;
                        var lPrntId = lTopGridId;
                        var trC = $("<tr></tr>").addClass("treegrid-" + lgrdId).addClass("treegrid-parent-" + lTopGridId).appendTo(table);
                        var tdC = $("<td></td>").html("<div class=\"treegridHeaderColumn\"  title=\"" + ObjVal.FULLFIELD + "\"> " + ObjVal.FIELD + "</div>");
                        trC.append(tdC);

                        var MyTempArray = [];
                        /*Remove Comma*/
                        $.each(ObjVal.DATA_VAL, function (index, slist) { 
                          if(index >=gStartIndex && index <= gEndIndex)
                          {
                            MyTempArray.push(slist.replace(/,/g, '').replace('%', '').replace(/NA/g, null)); 
                          }
                        });

                      

                        /*Chart Div Code and Event Binding*/
                        var divc = document.createElement('div');
                        divc.setAttribute('data', '[' + MyTempArray + ']');
                        divc.setAttribute('data-Field', ObjVal.FULLFIELD);
                        divc.setAttribute('class', 'gridChart');
                        $(divc).mouseenter(function () { ShowChart(this); });
                        $(divc).mouseout(function () { $("#tootipDiv").css("display", "none"); });
                        var tdChart = $("<td></td>").html(divc);
                        trC.append(tdChart);
                        /*end*/

                    $.each(ObjVal.DATA_VAL, function (index, sYearData) {
                    if(index >=gStartIndex && index <= gEndIndex)
                    {
                        if(sYearData != 'NA')
                        {
                            var strsYearData=(parseFloat((sYearData).replace(/,/g, '')).toFixed(2) * ValUnit).toString();
                            var td = $("<td></td>").html('<div class=\"treegrid-Cell\">' + (sYearData == "PREMIUM" ? "<div class='blur' title='Premium'> &nbsp;<div/>" : ValueFormatter(strsYearData)) + '</div>');
                            trC.append(td);
                        }
                        else
                        {
                            var td = $("<td></td>").html('<div class=\"treegrid-Cell\">' + (sYearData == "PREMIUM" ? "<div class='blur' title='Premium'> &nbsp;<div/>" : sYearData) + '</div>');
                            trC.append(td);
                        }
                        }
                        });
                        if (ObjVal.CHILD_DATA != null) {
                            //resursive(ObjVal.CHILD_DATA, lgrdId);
                        }
                    }
                }
            }
        });

        /*Show Tooltip Div and Canvas*/
        function ShowChart(vData) {

            // alert($(vData).attr("data"));
            var DataVar = $(vData).attr("data");
            var DataFieldVar = $(vData).attr("data-field");

            $("#tootipDivTitle").html(DataFieldVar);

            var lYear=[];
          
              $.each(ValuationData.YEARS, function (index, sYearData) {
                if(index >=gStartIndex && index <= gEndIndex)
                {
                 lYear.push(sYearData);
                }
              });


            var barData = {
                labels: lYear,//ValuationData.YEARS,
                datasets: [
                                {
                                    fillColor: "#4A6177",
                                    strokeColor: "#455D75",
                                    data: JSON.parse(DataVar)
                                }
                            ]
            }


            var steps = 5;

            var options = {
                scaleOverride: true,
                scaleSteps: steps,

                scaleStepWidth: (Math.ceil(Math.max.apply(null, JSON.parse(DataVar)) - Math.min.apply(null, JSON.parse(DataVar))) / steps),
                scaleStartValue: Math.min.apply(null, JSON.parse(DataVar))
                //,scaleLabel: "<%= (parseFloat(value) < 1000000)? String.format('{0:N0}', parseFloat(value)) : ((parseFloat(value) >= 1000000 && parseFloat(value) < 100000000))?String.format('{0:N0}', parseFloat(value) / 1000000) + ' M':String.format('{0:N0}', parseFloat(value) / 1000000000) + ' B' %>"
                ,scaleLabel: "<%= (parseFloat(value) < 1000000)? format1(parseFloat(value),0) : ((parseFloat(value) >= 1000000 && parseFloat(value) < 100000000))?format1((parseFloat(value) / 1000000),4) + ' M': format1( (parseFloat(value) / 1000000000),4) + ' B' %>"
            };
            // get bar chart canvas
            var tootipCanvas = document.getElementById("tootipCanvas").getContext("2d");
            // draw bar chart
            new Chart(tootipCanvas).Bar(barData, options);

            $("#tootipDiv").css("display", "");
            $("#tootipDiv").css("left", chartLeftPosition + 5);
            $("#tootipDiv").css("top", chartTopPosition);
        }

        //Mouse Position for Chart Position Start
        var chartLeftPosition;
        var chartTopPosition;
        $(this).mousemove(function (e) {

            chartLeftPosition = e.pageX;
            chartTopPosition = e.pageY - e.clientY + 150;

            //        chartLeftPosition = e.pageX;
            //        chartTopPosition = e.pageY - e.clientY + 340;

            //        if (e.clientY < 370)
            //            chartTopPosition = e.pageY;

            //        if (e.clientY > 480)
            //            chartTopPosition = e.pageY - 400;
        });
        //Mouse Position for Chart Position End


        /*Resursive function for bind child data*/
        function resursive(pobj, pparentid) {
            for (var j = 0; j < pobj.length; j++) {

                var ObjVal = pobj[j]
                var lgrdId = pparentid + "-" + j;
                var trC = $("<tr></tr>").addClass("treegrid-" + lgrdId).addClass("treegrid-parent-" + pparentid).appendTo($('#gridview'));
                var tdC = $("<td></td>").html("<div class=\"treegridHeaderColumn\"> " + ObjVal.FIELD + "</div>");
                trC.append(tdC);

                var MyTempArray = [];
                var IsPremuimChart = false;
                /*Remove Comma*/
                $.each(ObjVal.DATA_VAL, function (index, slist) {
                   if(index >=gStartIndex && index <= gEndIndex)
                   {
                    if (slist == 'PREMIUM') {
                        IsPremuimChart = true;
                    }
                    MyTempArray.push(slist.replace(/,/g, '').replace('%', '').replace(/NA/g, null));
                   }
                });


                /*Chart Div Code and Event Binding*/
                var divc = document.createElement('div');
                divc.setAttribute('data', '[' + MyTempArray + ']');
                divc.setAttribute('data-Field', ObjVal.FULLFIELD);

                divc.setAttribute('class', 'gridChart');

                $(divc).mouseenter(function () { ShowChart(this); });
                $(divc).mouseout(function () { $("#tootipDiv").css("display", "none"); });
                var tdChart = $("<td></td>").html(divc);

                trC.append(tdChart);
                /*end*/

                $.each(ObjVal.DATA_VAL, function (index, sYearData) {
                       if(index >=gStartIndex && index <= gEndIndex)
                    {
                        if(sYearData != 'NA')
                        {
                        var strsYearData=(parseFloat((sYearData).replace(/,/g, '')).toFixed(2) * ValUnit).toString();
                        var td = $("<td></td>").html('<div class=\"treegrid-Cell\">' + (sYearData == "PREMIUM" ? "<div class='blur' title='Premium'> &nbsp;<div/>" : ValueFormatter(strsYearData)) + '</div>');
                        trC.append(td);
                        }
                        else
                        {
                        var td = $("<td></td>").html('<div class=\"treegrid-Cell\">' + (sYearData == "PREMIUM" ? "<div class='blur' title='Premium'> &nbsp;<div/>" : sYearData) + '</div>');
                        trC.append(td);
                        }

                }
                });
                if (ObjVal.CHILD_DATA != null) {
                    resursive(ObjVal.CHILD_DATA, lgrdId);
                }
            }
        }

        // $('#gridview').treegrid();

        var num;
        var $tds;
        /*$(".tree").each(function (i, t) {

        $tds = $("td", t);
        $ths = $("th", t);
        num = $tds.length;


        $tds.eq(0).css("width", "20%").end()
        .eq(1).css("width", "5%").end()
        .eq(2).css("width", "8%").end()
        .eq(3).css("width", "8%").end()
        .eq(4).css("width", "8%").end()
        .eq(5).css("width", "8%").end()
        .eq(6).css("width", "8%").end()
        .eq(7).css("width", "7%").end()
        .eq(8).css("width", "7%").end()
        .eq(9).css("width", "7%").end()
        .eq(10).css("width", "7%").end()
        .eq(11).css("width", "7%");

        $ths.eq(0).css("width", "20%").end()
        .eq(1).css("width", "5%").end()
        .eq(2).css("width", "8%").end()
        .eq(3).css("width", "8%").end()
        .eq(4).css("width", "8%").end()
        .eq(5).css("width", "8%").end()
        .eq(6).css("width", "8%").end()
        .eq(7).css("width", "7%").end()
        .eq(8).css("width", "7%").end()
        .eq(9).css("width", "7%").end()
        .eq(10).css("width", "7%").end()
        .eq(11).css("width", "7%");


        });*/

        $(".tree").each(function (i, t) {
            $tds = $("td", t);
            $ths = $("th", t);

            $tds.eq(0).css("min-width", "430px").end()
            .eq(1).css("min-width", "60px").end();
            $ths.eq(0).css("min-width", "430px").end()
            .eq(1).css("min-width", "60px").end();
            var tds = $(t).children('thead').children('tr').children('th').length;
            
            for (var y = 2; y < tds; y++) {
                $tds.eq(y).css("min-width", "110px").end();
                $ths.eq(y).css("min-width", "110px").end();
            }

        });

        //$(".treegrid-indent").parent().css("background-color", "#E8F5F7");
        //$(".treegrid-expander-expanded").parent().css("font-weight", "bold");
        //    $(".treegrid-expander").parent().css("background-color", "#E8F5F7");


        /*use 1 for Fixed to column instead od 0*/
        //$("#gridview").fixedHeaderTable({ altClass: 'odd', footer: true, fixedColumns:0 });


        //    $.each($(".treegridHeaderColumn"), function (index, slist) {
        //        if ($(this).html().length > 30) {
        //            var rtxt = $(this).html();
        //            $(this).prop('title', rtxt);
        //            $(this).html(rtxt.substring(0, 30) + '...')
        //        }
        //    });

        //Negative Values Evolution
        $.each($(".treegrid-Cell"), function (index, slist) {
            if ($(this).html().indexOf('-') > -1) {
                var rtxt = $(this).html().replace('-', '');
                //$(this).prop('style', 'color:red');
                $(this).html('<div style="color:red">(' + rtxt.substring(0, 30) + ')</div>')
            }
        });

    }
    catch (msg) {
        //alert(msg);
    }
});


function ValueFormatter(x) {

    if(!isNaN(x) && x != null)
    {               
        return parseFloat(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");               
    }
    else
    {
        return '-';
    }      

}