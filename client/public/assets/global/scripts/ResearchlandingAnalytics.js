
$(document).ready(function () {
    gStartIndexAna=0;
    gEndIndexAna=9;


    try {
        //create huge treetable
        console.log('init');
        /*Main Header*/
        var ValuationData;
        var table;

        $('#loadValueAnalytics').html('');

        $.each(gValuationDataAnalytics, function (index, ldata) {

            ValuationData = ldata.PANEL_DATA;
            //            alert("ValuationDataRatio :" + JSON.stringify(ValuationData));
            if (ValuationData.LEVELDATA.length > 0) {

                table = $("<table class=\"tree table table-striped fixedHeader_collapsetree\" style=\"width: 98% !important; margin-bottom:20px !important;\"></table>").appendTo($('#loadValueAnalytics'));


                if (index == 0) {
                    var trHead = $("<thead class='gridviewtheadfixhd'></thead>").addClass("treegrid-" + index + "--0").appendTo(table);
                } else {
                    var trHead = $("<thead></thead>").addClass("treegrid-" + index + "--0").appendTo(table);
                }

                var trH = $("<tr ></tr>").addClass("treegrid-" + index + "--0").appendTo(table);
                trHead.append(trH);

                var tdH = $("<th  ></th>").html("<div class=\"treegridHeaderColumn\">" + ldata.PANELNAME + "</div>");
                trH.append(tdH);
                //        var tdChart = $("<th  ></th>").html("<div  style=\"width:62px;\"> </div>");
                var tdChart = $("<th  ></th>");
                trH.append(tdChart);


                $.each(ValuationData.YEARS, function (index, sYear) {
                       if(index >=gStartIndexAna && index <= gEndIndexAna)
                    {
                    var tdH = $("<th  ></th>").html('<div class=\"treegrid-Header\">' + sYear + '</div>');
                    trH.append(tdH);
                }
                });
            }
            /*End Main Header*/

            for (var i = 0; i < ValuationData.LEVELDATA.length; i++) {
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
                   if(index >=gStartIndexAna&& index <= gEndIndexAna)
                   {
                    if (slist == 'PREMIUM') { IsPremuimChart = true; }
                    MyTempArray.push(slist.replace(/,/g, '').replace('%', '').replace(/NA/g, null));
                  }
                });
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


                $.each(lLevelData.DATA_VAL, function (index, sDataValue) {
                       if(index >=gStartIndexAna && index <= gEndIndexAna)
                    {
                    var td = $("<td></td>").html('<div class=\"treegrid-Cell\">' + (sDataValue == "PREMIUM" ? "<div class='blur' title='Premium'> &nbsp;<div/>" : sDataValue) + '</div>');
                    tr.append(td);
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
                        var tdC = $("<td ></td>").html("<div class=\"treegridHeaderColumn\"  title=\"" + ObjVal.FULLFIELD + "\"> " + ObjVal.FIELD + "</div>");
                        trC.append(tdC);

                        var MyTempArray = [];
                        /*Remove Comma*/
                        $.each(ObjVal.DATA_VAL, function (index, slist) { 
                          if(index >=gStartIndexAna&& index <= gEndIndexAna)
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
                               if(index >=gStartIndexAna && index <= gEndIndexAna)
                    {
                            var td = $("<td></td>").html('<div class=\"treegrid-Cell\">' + (sYearData == "PREMIUM" ? "<div class='blur' title='Premium'> &nbsp;<div/>" : sYearData) + '</div>');
                            trC.append(td);
                        }
                        });
                        if (ObjVal.CHILD_DATA != null) {
                            //resursive(ObjVal.CHILD_DATA, lgrdId);
                        }
                    }
                }
            }
        });

        
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
                   if(index >=gStartIndexAna && index <= gEndIndexAna)
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
                       if(index >=gStartIndexAna && index <= gEndIndexAna)
                    {
                    var td = $("<td></td>").html('<div class=\"treegrid-Cell\">' + (sYearData == "PREMIUM" ? "<div class='blur' title='Premium'> &nbsp;<div/>" : sYearData) + '</div>');
                    trC.append(td);
                }
                });
                if (ObjVal.CHILD_DATA != null) {
                    resursive(ObjVal.CHILD_DATA, lgrdId);
                }
            }
        }

      
        var num;
        var $tds;
       

        $(".tree").each(function (i, t) {
            $tds = $("td", t);
            $ths = $("th", t);

            $tds.eq(0).css("min-width", "230px").end()
            .eq(1).css("min-width", "30px").end();
            $ths.eq(0).css("min-width", "230px").end()
            .eq(1).css("min-width", "30px").end();
            var tds = $(t).children('thead').children('tr').children('th').length;
            
            for (var y = 2; y < tds; y++) {
                $tds.eq(y).css("min-width", "80px").end();
                $ths.eq(y).css("min-width", "80px").end();
            }

        });

     
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
