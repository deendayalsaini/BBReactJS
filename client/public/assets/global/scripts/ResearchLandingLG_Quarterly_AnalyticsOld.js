/*Company Landing Details Shows Income Statement,Balance Sheet, Cash Flow, Ratio. All data dynamically shows as hierarchal Tree View Structure */
/*Data Comes in Panel Array Object: Panel object contains relevant info.Structure : Panel[Panel Name: Data Object For Panel] */

function format1(n, pre) {
    return  n.toFixed(pre).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}
function ConvertQtyDataUnit(sDataValue)
{
    var t= (parseFloat((sDataValue).replace(/,/g, '').replace('%', '').replace(/NA/g, null)) * gQtrAnnUnit_QtrData).toFixed(2).toString();      
    if(t== 'NaN')
    {
        return sDataValue;
    }
    else
    {
       return t.replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
    }
}
function ConvertQtyDataUnitChart(sDataValue)
{
    var t= (parseFloat((sDataValue).replace(/,/g, '').replace('%', '').replace(/NA/g, null)) * gQtrAnnUnit_QtrData).toFixed(2).toString();      
    if(t== 'NaN')
    {
        return '0';
    }
    else
    {
       return t; 
    }
}
$(document).ready(function () {

    function QtrAnnResursive(pobj, pparentid) {
        try {
            for (var j = 0; j < pobj.length; j++) {

                var ObjVal = pobj[j]
                var lgrdId = pparentid + "-" + j;

                //var ProfitStyle = getStyle(ObjVal.FIELD, lMarchDataArray); // ObjVal.FIELD.toLowerCase().indexOf("profit") != -1 ? "style=\"Font-weight:bold\"" : "";
                var ProfitStyle = ObjVal.SHOW_BOLD == 'Y' ? "style=\"Font-weight:bold\"" : "";

                var MyTempArray = [];
                var checkDataVal = 0;
                /*Remove Comma*/
                $.each(ObjVal.DATA_VAL, function (index, slist) {
                    if(index >=gQtrAnnStartIndex && index <= gQtrAnnEndIndex)
                    {
                    MyTempArray.push(ConvertQtyDataUnitChart(slist));
                    if (slist.replace(/,/g, '').replace('%', '') == "NA" || slist.replace(/,/g, '').replace('%', '') == "" || slist.replace(/,/g, '').replace('%', '').replace(/NA/g, null) == "0" || slist.replace(/,/g, '').replace('%', '').replace(/NA/g, null) == "0.00") {
                        checkDataVal++;
                    }
                   }
                });

                if (checkDataVal == MyTempArray.length) {
                    // tr.hide();
                }
                else {
                    var trC = $("<tr></tr>").addClass("treegrid-" + lgrdId).addClass("treegrid-parent-" + pparentid).appendTo($('#gridviewQuarterlyAnalyticsTab'));
                    var tdC = $("<td></td>").html("<div class=\"treegridHeaderColumn\" " + ProfitStyle + " title=\"" + ObjVal.FULLFIELD + "\"> " + ObjVal.FIELD + "</div>");
                    trC.append(tdC);
                    /*Chart Div Code and Event Binding*/
                    var divc = document.createElement('div');
                    divc.setAttribute('data', '[' + MyTempArray + ']');
                    divc.setAttribute('data-Field', ObjVal.FULLFIELD);
                    divc.setAttribute('class', 'gridChart');
                    $(divc).mouseenter(function () { QtrAnnShowChart(this); });
                    $(divc).mouseout(function () { $("#tootipDiv").css("display", "none"); });
                    var tdChart = $("<td></td>").html(divc);
                    trC.append(tdChart);
                    /*end*/

                    $.each(ObjVal.DATA_VAL, function (index, sYearData) {
                    if(index >=gQtrAnnStartIndex && index <= gQtrAnnEndIndex)
                    {
                        var td = $("<td></td>").html('<div   class=\"treegrid-Cell\" ' + ProfitStyle + '>' + ConvertQtyDataUnit(sYearData) + '</div>');
                        trC.append(td);
                    }
                    });
                    if (ObjVal.CHILD_DATA != null || ObjVal.CHILD_DATA.length > 0) {
                        QtrAnnResursive(ObjVal.CHILD_DATA, lgrdId);
                    }
                }
            }
        } catch (msg) {
        }
    }
    try {
        //create huge treetable
        /*Main Header*/
        var QValuationData;
        //    var lMarchDataArray = [{ "ExactMatch": false, "Data": "Profit" }, { "ExactMatch": true, "Data": "Total Revenue" }, { "ExactMatch": true, "Data": "TOTAL LIABILITIES" }, { "ExactMatch": true, "Data": "TOTAL ASSETS" }, { "ExactMatch": true, "Data": "Net Income" }, { "ExactMatch": true, "Data": "Revenue" }, { "ExactMatch": true, "Data": "Cash Flows From Operating Activities" }, { "ExactMatch": true, "Data": "Cash Flows From Investing Activities" }, { "ExactMatch": true, "Data": "Cash Flows From Financing Activities"}];

$('#tableContainerQuarterlyAnalytics').html()
$('#tableContainerQuarterlyAnalytics').html('<table id="gridviewQuarterlyAnalyticsTab" class="tree QAtree table table-striped fixedHeader_collapsetree" style="width: 100% !important;" ></table>')
;

        $.each(QtrAnnDataObj, function (index, ldata) {

            QValuationData = ldata.PANEL_DATA;
            if (QValuationData.LEVELDATA.length > 0) {


                var trHead = $("<thead class='gridviewtheadfixhd'></thead>").addClass("treegrid-" + index + "--0").appendTo($('#gridviewQuarterlyAnalyticsTab'));

                var trH = $("<tr ></tr>").addClass("treegrid-" + index + "--0").appendTo($('#gridviewQuarterlyAnalyticsTab'));
                trHead.append(trH);


                var tdH = $("<th></th>").html("<div class=\"treegridHeaderColumn\">" + ldata.PANELNAME + "</div>");
                trH.append(tdH);

                var tdChart = $("<th  ></th>");
                trH.append(tdChart);

                $.each(QValuationData.YEARS, function (index, sYear) {

                    if(index >=gQtrAnnStartIndex && index <= gQtrAnnEndIndex)
                    {
                      var tdH = $("<th  ></th>").html('<div class=\"treegrid-Header\">' + sYear + '</div>');
                      trH.append(tdH);
                    }
                });
            }
            /*End Main Header*/



            for (var i = 0; i < QValuationData.LEVELDATA.length; i++) {
                console.log('add');
                var lLevelData = QValuationData.LEVELDATA[i];
                var lTopGridId = i; //+ lLevelData.LVL;


                var ProfitStyle = lLevelData.SHOW_BOLD == 'Y' ? "style=\"Font-weight:bold\"" : ""; // lLevelData.FIELD.toLowerCase().indexOf("profit") != -1 ? "style=\"Font-weight:bold\"" : "";


                /*Remove Comma*/
                var MyTempArray = [];
                var checkDataVal = 0;
                $.each(lLevelData.DATA_VAL, function (index, slist) {
                    if(index >=gQtrAnnStartIndex && index <= gQtrAnnEndIndex)
                    {
                    MyTempArray.push(ConvertQtyDataUnitChart(slist));

                    if (slist.replace(/,/g, '').replace('%', '') == "NA" || slist.replace(/,/g, '').replace('%', '') == "" || slist.replace(/,/g, '').replace('%', '').replace(/NA/g, null) == "0" || slist.replace(/,/g, '').replace('%', '').replace(/NA/g, null) == "0.00") {
                        checkDataVal++;
                    }
                  }
                });
                //alert(checkDataVal)
                if (checkDataVal == MyTempArray.length) {
                    // tr.hide();
                }
                else {
                    var tr = $("<tr></tr>").addClass("treegrid-" + lTopGridId).appendTo($('#gridviewQuarterlyAnalyticsTab'));
                    var td = $("<td></td>").html("<div class=\"treegridHeaderColumn\" " + ProfitStyle + " title=\"" + lLevelData.FULLFIELD + "\"> " + lLevelData.FIELD + "</div>");

                    tr.append(td);
                    /*Chart Div Code and Event Binding*/
                    var divc = document.createElement('div');
                    divc.setAttribute('data', '[' + MyTempArray + ']');
                    divc.setAttribute('data-Field', lLevelData.FULLFIELD);
                    divc.setAttribute('class', 'gridChart');
                    $(divc).mouseenter(function () { QtrAnnShowChart(this); });
                    $(divc).mouseout(function () { $("#tootipDiv").css("display", "none"); });
                    var tdChart = $("<td></td>").html(divc);
                    tr.append(tdChart);
                    /*end*/


                    $.each(lLevelData.DATA_VAL, function (index, sDataValue) {
                        if(index >=gQtrAnnStartIndex && index <= gQtrAnnEndIndex)
                       {
                        var td = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + ProfitStyle + ' >' + ConvertQtyDataUnit(sDataValue) + '</div>');
                        tr.append(td);
                       }
                    });
                }

                /*Level Data Pocessing for child data processing*/
                if (lLevelData.CHILD_DATA != null) {
                    var lChildData = lLevelData.CHILD_DATA;
                    for (var j = 0; j < lChildData.length; j++) {
                        var ObjVal = lChildData[j];
                        var lgrdId = i + '-' + j;
                        var lPrntId = lTopGridId;


                        //var ProfitStyle = getStyle(ObjVal.FIELD, lMarchDataArray); // ObjVal.FIELD.toLowerCase().indexOf("profit") != -1 ? "style=\"Font-weight:bold\"" : "";
                        var ProfitStyle = ObjVal.SHOW_BOLD == 'Y' ? "style=\"Font-weight:bold\"" : "";


                        var MyTempArray = [];
                        var checkChildDataVal = 0;
                        /*Remove Comma*/
                        $.each(ObjVal.DATA_VAL, function (index, slist) {
                            if(index >=gQtrAnnStartIndex && index <= gQtrAnnEndIndex)
                            {
                            MyTempArray.push( ConvertQtyDataUnitChart(slist));
                            if (slist.replace(/,/g, '').replace('%', '') == "NA" || slist.replace(/,/g, '').replace('%', '') == "" || slist.replace(/,/g, '').replace('%', '').replace(/NA/g, null) == "0" || slist.replace(/,/g, '').replace('%', '').replace(/NA/g, null) == "0.00") {
                                checkChildDataVal++;
                            }
                           }
                        });

                        if (checkChildDataVal == MyTempArray.length) {
                            // tr.hide();
                        }
                        else {

                            var trC = $("<tr></tr>").addClass("treegrid-" + lgrdId).addClass("treegrid-parent-" + lTopGridId).appendTo($('#gridviewQuarterlyAnalyticsTab'));
                            var tdC = $("<td ></td>").html("<div class=\"treegridHeaderColumn\" " + ProfitStyle + " title=\"" + ObjVal.FULLFIELD + "\"> " + ObjVal.FIELD + "</div>");
                            trC.append(tdC);

                            /*Chart Div Code and Event Binding*/
                            var divc = document.createElement('div');
                            divc.setAttribute('data', '[' + MyTempArray + ']');
                            divc.setAttribute('data-Field', ObjVal.FULLFIELD);
                            divc.setAttribute('class', 'gridChart');
                            $(divc).mouseenter(function () { QtrAnnShowChart(this); });
                            $(divc).mouseout(function () { $("#tootipDiv").css("display", "none"); });
                            var tdChart = $("<td></td>").html(divc);
                            trC.append(tdChart);
                            /*end*/

                            $.each(ObjVal.DATA_VAL, function (index, sYearData) {
                                if(index >=gQtrAnnStartIndex && index <= gQtrAnnEndIndex)
                                {
                                var td = $("<td></td>").html('<div  class=\"treegrid-Cell\" ' + ProfitStyle + '>' + ConvertQtyDataUnit(sYearData) + '</div>');
                                trC.append(td);
                                }
                            });
                            if (ObjVal.CHILD_DATA != null) {
                                try {
                                  
                                    
                                    QtrAnnResursive(ObjVal.CHILD_DATA, lgrdId);
                                }
                                catch (err) {
                                }
                            }
                        }
                    }
                }
            }
        });

        /*Show Tooltip Div and Canvas*/
        function QtrAnnShowChart(vData) {
            try{
            // alert($(vData).attr("data"));
            var DataVar = $(vData).attr("data");
            var DataFieldVar = $(vData).attr("data-field");

            $("#tootipDivTitle").html(DataFieldVar);

            var lYear=[];
          
              $.each(QValuationData.YEARS, function (index, sYearData) {
                if(index >=gQtrAnnStartIndex && index <= gQtrAnnEndIndex)
                {
                 lYear.push(sYearData);
                }
              });
           


            var barData = {
                labels: lYear,
                datasets: [
                                {
                                    fillColor: "#4A6177",
                                    strokeColor: "#455D75",
                                    data: JSON.parse(DataVar)
                                }
                            ]

            }

            var steps = 5;

            var min = Math.min.apply(null, JSON.parse(DataVar))
            var max = Math.max.apply(null, JSON.parse(DataVar))

            if(min >= 0){
                min = parseFloat(min) - (parseFloat(min) * 0.1)                            
            }
            else{
                min = parseFloat(min) + (parseFloat(min) * 0.1)    
            }

            if(max >= 0){
                max = parseFloat(max) + (parseFloat(max) * 0.1)
            }
            else{
                max = parseFloat(max) - (parseFloat(max) * 0.1)
            }

            //alert("min : " +min + "  max : "+ max);

            var options = {
                scaleOverride: true,
                scaleSteps: steps,

                scaleStepWidth: (Math.ceil(max) - min) / steps,
                scaleStartValue: min
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
  catch(ex){console.log(ex);}
        }

        //Mouse Position for Chart Position Start
        var chartLeftPosition;
        var chartTopPosition;
        $(this).mousemove(function (e) {
            chartLeftPosition = e.pageX;
            chartTopPosition = e.pageY - e.clientY + 150;
        });
        //Mouse Position for Chart Position End


        /*QtrAnnResursive function for bind child data*/


        $('#gridviewQuarterlyAnalyticsTab').treegrid();


        var num;
        var $tds;
        $("#gridviewQuarterlyAnalyticsTab").each(function (i, t) {
            $tds = $("td", t);
            $ths = $("th", t);

            $tds.eq(0).css("min-width", "430px").end()
            .eq(1).css("min-width", "60px").end();
            $ths.eq(0).css("min-width", "430px").end()
            .eq(1).css("min-width", "60px").end();
            //var tds = $("#gridviewQuarterlyAnalyticsTab").children('thead').children('tr').children('th').length;
            var tds = $(t).children('thead').children('tr').children('th').length;
            for (var y = 2; y < tds; y++) {
                $tds.eq(y).css("min-width", "100px").end();
                $ths.eq(y).css("min-width", "100px").end();
            }

        });

      

        $(".treegrid-expander-expanded").parent().css("font-weight", "bold");

       
        //Negative Values Evolution
        $.each($(".treegrid-Cell"), function (index, slist) {
            if ($(this).html().indexOf('-') > -1) {
                var rtxt = $(this).html().replace('-', '');
                //$(this).prop('style', 'color:red');
                $(this).html('<div style="color:red">(' + rtxt.substring(0, 30) + ')</div>')
            }
        });

        // collapse all nodes 2nd level
        $('.tree').find('tr').each(function () {
            if ($(this).treegrid('getDepth') > 0) {
                $(this).treegrid('collapse');
            }
        });


        function getStyle(FiledName, MatchDataArray) {
            for (var i = 0; i < MatchDataArray.length; i++) {
                var lMatchData = MatchDataArray[i].Data.toLowerCase();
                var vStyle = "";
                if (MatchDataArray[i].ExactMatch) {
                    if (FiledName.toLowerCase() == lMatchData) {
                        vStyle = "style=\"Font-weight:bold\"";
                    }
                }
                else {
                    vStyle = FiledName.toLowerCase().indexOf(lMatchData) != -1 ? "style=\"Font-weight:bold\"" : "";
                }
                if (vStyle != "") {
                    return vStyle;
                }
            }
            return ""; //Finally
        }


    }
    catch (msg) {
        //alert(msg);
    }
});


function QAExpendAllNode() {

    $('.QAtree').find('tr').each(function () {
        if ($(this).treegrid('getDepth') > 0) {
            $(this).treegrid('expand');
        }
    });

}
// collapse all nodes 2nd level
function QACollapseAllNode() {

    $('.QAtree').find('tr').each(function () {
        if ($(this).treegrid('getDepth') > 0) {
            $(this).treegrid('collapse');
        }
    });

}

 

