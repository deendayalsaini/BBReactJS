/*Company Landing Details Shows Income Statement,Balance Sheet, Cash Flow, Ratio. All data dynamically shows as hierarchal Tree View Structure */
/*Data Comes in Panel Array Object: Panel object contains relevant info.Structure : Panel[Panel Name: Data Object For Panel] */

function format1(n, pre) {
    return  n.toFixed(pre).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}
function ConvertQtyDataUnit(sDataValue)
{
    try{
    var t= parseFloat(sDataValue).toFixed(2);      
    if(t== 'NaN')
    {
        return sDataValue;
    }
    else
    {
       return t; 
    }
   }catch(ex)
   {
    alert(ex);
   }
}
function ConvertQtyDataUnitChart(sDataValue)
{
    var t= (parseFloat((sDataValue).replace(/,/g, '').replace('%', '').replace(/NA/g, null))).toFixed(2).toString();      
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
    try {

try
{
if(gQuarterlyAnalyticsData.length > 0)
{
 $("#txtFromDate").val(gQuarterlyAnalyticsData[0].AsOfDate.replace('T00:00:00',''));
 $("#txttodate").val(gQuarterlyAnalyticsData[0].AsOfDate.replace('T00:00:00',''));
}

$("#Summartable2Body").html("");
for(var t=0; t<gQuarterlyAnalyticsData.length; t++)
{
    var d1=gQuarterlyAnalyticsData[t];
     $("#Summartable2Body").append('<tr data-index="6">'+
    '<td style="text-align: center;">'+d1.DateDisplay+'</td>'+
    '<td style="text-align: right; ">'+(d1.Beta0==''?'-': ValueFormatter(d1.Beta0))+'</td>'+
    '<td style="text-align: right;">'+(d1.Beta1==''?'-':ValueFormatter(d1.Beta2))+'</td>'+
    '<td style="text-align: right;">'+(d1.Beta2==''?'-':ValueFormatter(d1.Beta2))+'</td>'+
    '<td style="text-align: right;">'+(d1.Beta3==''?'-':ValueFormatter(d1.Beta3))+'</td>'+
    '<td style="text-align: right;">'+(d1.Tau1==''?'-':ValueFormatter(d1.Tau1) )+'</td>'+
    '<td style="text-align: right;">'+(d1.Tau2==''?'-':ValueFormatter(d1.Tau2) )+'</td>'+
    '</tr>');
  }



for(var t=0; t<gQuarterlyAnalyticsData.length; t++)
{
  var obj=gQuarterlyAnalyticsData[t];
  for(var k=0; t<obj.BondData.length; k++)
  {
     var d=obj.BondData[k];
     $("#securitiesTable1Body").append('<tr data-index="6">'+
    '<td style="text-align: center;">'+obj.DateDisplay+'</td>'+
    '<td style="text-align: center;">'+d.ISIN+'</td>'+
    '<td style="text-align: left; ">'+(d.Description==''?'-': d.Description)+'</td>'+
    '<td style="text-align: right;">'+(d.Coupon_Per==''?'-':PercentageFormatter(d.Coupon_Per))+'</td>'+
    '<td style="text-align: center;">'+(d.Maturity==''?'-': DateFormatter(d.Maturity.replace('T00:00:00','')))+'</td>'+
    '<td style="text-align: right;">'+(d.WADP_Rs==''?'-':ValueFormatter(d.WADP_Rs))+'</td>'+
    '<td style="text-align: right;">'+(d.WADP_YTM_Per==''?'-':PercentageFormatter(d.WADP_YTM_Per))+'</td>'+
    '<td style="text-align: right;">'+(d.MP_Rs==''?'-':ValueFormatter(d.MP_Rs) )+'</td>'+
    '<td style="text-align: right;">'+(d.MP_YTM_per==''?'-':PercentageFormatter(d.MP_YTM_per) )+'</td>'+
    '<td style="text-align: right;">'+(d.Price_Error==''?'-':ValueFormatter(d.Price_Error) )+'</td>'+
    '<td style="text-align: right;">'+(d.YTM_Error==''?'-':ValueFormatter(d.YTM_Error) )+'</td>'+
    '</tr>');
   }
  }
}
catch(ex)
{
  //alert(ex);
}

        //create huge treetable
        /*Main Header*/
        var QValuationData;
        //    var lMarchDataArray = [{ "ExactMatch": false, "Data": "Profit" }, { "ExactMatch": true, "Data": "Total Revenue" }, { "ExactMatch": true, "Data": "TOTAL LIABILITIES" }, { "ExactMatch": true, "Data": "TOTAL ASSETS" }, { "ExactMatch": true, "Data": "Net Income" }, { "ExactMatch": true, "Data": "Revenue" }, { "ExactMatch": true, "Data": "Cash Flows From Operating Activities" }, { "ExactMatch": true, "Data": "Cash Flows From Investing Activities" }, { "ExactMatch": true, "Data": "Cash Flows From Financing Activities"}];

$('#tableContainerQuarterlyAnalytics').html()
$('#tableContainerQuarterlyAnalytics').html('<table id="gridviewQuarterlyAnalyticsTab" class="tree QAtree table table-striped fixedHeader_collapsetree tableDADA" style="width: 50% !important; " ></table>')
;

var selDisplayType=$("#selDisplayType").val();
if(selDisplayType=="ByDatePeriod")
{

        $.each(gQuarterlyAnalyticsData, function (index, ldata) {

            QValuationData = ldata.MaturityDataCalulation;

            if(index==0)
            {
            var trHead = $("<thead class='gridviewtheadfixhd'></thead>").addClass("treegrid-" + index + "--0").appendTo($('#gridviewQuarterlyAnalyticsTab'));

            var trH = $("<tr ></tr>").addClass("treegrid-" + index + "--0").appendTo($('#gridviewQuarterlyAnalyticsTab'));
            trHead.append(trH);


            var tdH = $("<th></th>").html("<div class=\"treegridHeaderColumn\">" + "Maturity Year" + "</div>");
            trH.append(tdH);


            //var tdChart = $("<th  ></th>").html("<div  style=\"width:62px;\"> </div>");
           

            var tdH2 = $("<th  ></th>").html('<div class=\"treegrid-Header\">' + "Coupon" + '</div>');
            trH.append(tdH2);

            var tdH3 = $("<th  ></th>").html('<div class=\"treegrid-Header\">' + "Price" + '</div>');
            trH.append(tdH3);

            var tdH4 = $("<th  ></th>").html('<div class=\"treegrid-Header\">' + "Yield" + '</div>');
            trH.append(tdH4);

            var tdH5 = $("<th  ></th>").html('<div class=\"treegrid-Header\">' + "Spot" + '</div>');
            trH.append(tdH5);

            var tdH6 = $("<th  ></th>").html('<div class=\"treegrid-Header\">' + "Forward" + '</div>');
            trH.append(tdH6);
            }

            /*End Main Header*/
            var lTopGridId = index; //+ lLevelData.LVL;
            var ProfitStyle="";

            var tr = $("<tr ></tr>").addClass("treegrid-" + lTopGridId).appendTo($('#gridviewQuarterlyAnalyticsTab'));
            var td = $("<td></td>").html("<div class=\"treegridHeaderColumn\" " + ProfitStyle + " title=\"" + ldata.DateDisplay + "\"> " + ldata.DateDisplay + "</div>");
            tr.append(td);
       

                var td1 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + "style='font-weight:bold'" + ' >' + "" + '</div>');
                tr.append(td1);
                var td2 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + "style='font-weight:bold'" + ' >' + ""+ '</div>');
                tr.append(td2);
                var td3 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + "style='font-weight:bold'" + ' >' + "" + '</div>');
                tr.append(td3);
                var td4 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + "style='font-weight:bold'"+ ' >' + "" + '</div>');
                tr.append(td4);
                var td5 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + "style='font-weight:bold'" + ' >' + "" + '</div>');
                tr.append(td5);
            
            //
            for (var i = 0; i < QValuationData.length; i++) {

                var v = QValuationData[i];
                var ProfitStyle ="";
                var ct='active0';
                  if(i > 10)
                  {
                    ct='deactive0';
                  }

                    var tr = $("<tr></tr>").addClass("treegrid-" + lTopGridId+'_'+i).addClass("treegrid-parent-" + lTopGridId).addClass(ct).appendTo($('#gridviewQuarterlyAnalyticsTab'));
                    var td = $("<td></td>").html("<div class=\"treegridHeaderColumn\" " + ProfitStyle + " title=\"" + v.Maturity_Yr + "\"> " + v.Maturity_Yr + "</div>");
                    tr.append(td);
                 
                    var td1 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + ProfitStyle + ' >' + ConvertQtyDataUnit(v.Coupon_Per) + '  %</div>');
                    tr.append(td1);
                    var td2 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + ProfitStyle + ' >' + ConvertQtyDataUnit(v.Price) + '</div>');
                    tr.append(td2);
                    var td3 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + ProfitStyle + ' >' + ConvertQtyDataUnit(v.Yield) + '</div>');
                    tr.append(td3);
                    var td4 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + ProfitStyle + ' >' + ConvertQtyDataUnit(v.Spot_Rate) + ' %</div>');
                    tr.append(td4);
                    var td5 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + ProfitStyle + ' >' + ConvertQtyDataUnit(v.Forward_Rate) + '  %</div>');
                    tr.append(td5);

            }
                   
                    

            /*end*/
        });
}
else
{
    /* By Period Date START*/

 $.each(gQuarterlyAnalyticsData[0].MaturityDataCalulation, function (index, ltopdata) {

    if(index==0)
    {
    var trHead = $("<thead class='gridviewtheadfixhd'></thead>").addClass("treegrid-" + index + "--0").appendTo($('#gridviewQuarterlyAnalyticsTab'));

    var trH = $("<tr ></tr>").addClass("treegrid-" + index + "--0").appendTo($('#gridviewQuarterlyAnalyticsTab'));
    trHead.append(trH);


    var tdH = $("<th></th>").html("<div class=\"treegridHeaderColumn\">" + "Maturity Year" + "</div>");
    trH.append(tdH);


    //        var tdChart = $("<th  ></th>").html("<div  style=\"width:62px;\"> </div>");


    var tdH2 = $("<th  ></th>").html('<div class=\"treegrid-Header\">' + "Coupon" + '</div>');
    trH.append(tdH2);

    var tdH3 = $("<th  ></th>").html('<div class=\"treegrid-Header\">' + "Price" + '</div>');
    trH.append(tdH3);

    var tdH4 = $("<th  ></th>").html('<div class=\"treegrid-Header\">' + "Yield" + '</div>');
    trH.append(tdH4);

    var tdH5 = $("<th  ></th>").html('<div class=\"treegrid-Header\">' + "Spot" + '</div>');
    trH.append(tdH5);

    var tdH6 = $("<th  ></th>").html('<div class=\"treegrid-Header\">' + "Forward" + '</div>');
    trH.append(tdH6);
    }


/*End Main Header*/
    var lTopGridId = index; //+ lLevelData.LVL;
    var ProfitStyle="";

    var tr = $("<tr ></tr>").addClass("treegrid-" + lTopGridId).appendTo($('#gridviewQuarterlyAnalyticsTab'));
    var td = $("<td></td>").html("<div class=\"treegridHeaderColumn\" " + ProfitStyle + " title=\"" + ltopdata.Maturity_Yr + "\"> " + ltopdata.Maturity_Yr + "</div>");
    tr.append(td);


        var td1 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + "style='font-weight:bold'" + ' >' + "" + '</div>');
        tr.append(td1);
        var td2 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + "style='font-weight:bold'" + ' >' + ""+ '</div>');
        tr.append(td2);
        var td3 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + "style='font-weight:bold'" + ' >' + "" + '</div>');
        tr.append(td3);
        var td4 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + "style='font-weight:bold'" + ' >' + "" + '</div>');
        tr.append(td4);
        var td5 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + "style='font-weight:bold'" + ' >' + "" + '</div>');
        tr.append(td5);

        //
            for (var i = 0; i < gQuarterlyAnalyticsData.length; i++) {
                
                var tdt= gQuarterlyAnalyticsData[i];

                var v = tdt.MaturityDataCalulation[index];
                var ProfitStyle ="";
                 var ct='active0';
                 if(i > 10)
                  {
                  //ct='deactive';
                  }

                var tr = $("<tr></tr>").addClass("treegrid-" + lTopGridId+'_'+i).addClass("treegrid-parent-" + lTopGridId).addClass(ct).appendTo($('#gridviewQuarterlyAnalyticsTab'));
                var td = $("<td></td>").html("<div class=\"treegridHeaderColumn\" " + ProfitStyle + " title=\"" + tdt.DateDisplay + "\"> " + tdt.DateDisplay + "</div>");
                tr.append(td);

                
                var td1 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + ProfitStyle + ' >' + ConvertQtyDataUnit(v.Coupon_Per) + '  %</div>');
                tr.append(td1);
                var td2 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + ProfitStyle + ' >' + ConvertQtyDataUnit(v.Price) + '</div>');
                tr.append(td2);
                var td3 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + ProfitStyle + ' >' + ConvertQtyDataUnit(v.Yield) + '  %</div>');
                tr.append(td3);
                var td4 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + ProfitStyle + ' >' + ConvertQtyDataUnit(v.Spot_Rate) + '  %</div>');
                tr.append(td4);
                var td5 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + ProfitStyle + ' >' + ConvertQtyDataUnit(v.Forward_Rate) + '  %</div>');
                tr.append(td5);

            }
            /*end*/
        });
/* By Period Date END*/
}


        $('#gridviewQuarterlyAnalyticsTab').treegrid();


        var num;
        var $tds;
       
        $("#gridviewQuarterlyAnalyticsTab").each(function (i, t) {
            $tds = $("td", t);
            $ths = $("th", t);

            $tds.eq(0).css("min-width", "130px").end()
            .eq(1).css("min-width", "50px").end();
            $ths.eq(0).css("min-width", "130px").end()
            .eq(1).css("min-width", "80px").end();
            //var tds = $("#gridviewQuarterlyAnalyticsTab").children('thead').children('tr').children('th').length;
            var tds = $(t).children('thead').children('tr').children('th').length;
            for (var y = 2; y < tds; y++) {
                $tds.eq(y).css("min-width", "30px").end();
                $ths.eq(y).css("min-width", "80px").end();
            }


        });


        //$(".treegrid-indent").parent().css("background-color", "#E8F5F7");
        //$(".treegrid-expander-expanded").parent().css("font-weight", "bold");
        //    $(".treegrid-expander").parent().css("background-color", "#E8F5F7");

        $(".treegrid-expander-expanded").parent().css("font-weight", "bold");

        /*use 1 for Fixed to column instead od 0*/
        //$("#gridviewQuarterlyAnalyticsTab").fixedHeaderTable({ altClass: 'odd', footer: true, fixedColumns:0 });

        /*
        $.each($(".treegridHeaderColumn"), function (index, slist) {
        if ($(this).html().length > 30) {
        var rtxt = $(this).html();
        $(this).prop('title', rtxt);
        $(this).html(rtxt.substring(0, 30) + '...')
        }
        });
        */
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

try
{
    $('.QAtree').find('tr').each(function () {
        if ($(this).treegrid('getDepth') > -1) {
            $(this).treegrid('expand');
        }
    });
}catch(ex)
{
    alert(ex);
}
}
// collapse all nodes 2nd level
function QACollapseAllNode() {

    $('.QAtree').find('tr').each(function () {
        if ($(this).treegrid('getDepth') > -1) {
            $(this).treegrid('collapse');
        }
    });

}

function SeeMore1(th)
{
    console.log("SeeMore1")
    console.log($(th).attr("data-attr-DateDisplay"))
    //console.log(JSON.stringify(gQuarterlyAnalyticsData))

    // var filteredEvents = gQuarterlyAnalyticsData.filter(function(event){
        //return gQuarterlyAnalyticsData.DateDisplay == $(th).attr("data-attr-DateDisplay");
    //});

    var filtered = [];
    for (var i = 0; i < gQuarterlyAnalyticsData.length; i++) {

        if (gQuarterlyAnalyticsData[i].DateDisplay == $(th).attr("data-attr-DateDisplay")) {
            filtered.push(gQuarterlyAnalyticsData[i]);
        }
    }

    //console.log(JSON.stringify(filtered))
        console.log(filtered[0].MaturityDataCalulation.length)
     for (var i = 0; i < filtered[0].MaturityDataCalulation.length; i++) {

        var v = filtered[0].MaturityDataCalulation[i];
        var ProfitStyle ="";
        var ct='active0';
        var lTopGridId = $(th).attr("data-attr-DateDisplay");
          if(i > 10)
          {
           
           // ct='deactive';
            var tr = $("<tr></tr>").addClass("treegrid-" + lTopGridId+'_'+i).addClass("treegrid-parent-" + lTopGridId).addClass(ct).appendTo($(th).parent().prev());
           
            var td = $("<td></td>").html("<div class=\"treegridHeaderColumn\" " + ProfitStyle + " title=\"" + v.Maturity_Yr + "\"> " + v.Maturity_Yr + "</div>");
            tr.append(td);
         
            var td1 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + ProfitStyle + ' >' + ConvertQtyDataUnit(v.Coupon_Per) + '  %</div>');
            tr.append(td1);
            var td2 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + ProfitStyle + ' >' + ConvertQtyDataUnit(v.Price) + '</div>');
            tr.append(td2);
            var td3 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + ProfitStyle + ' >' + ConvertQtyDataUnit(v.Yield) + '</div>');
            tr.append(td3);
            var td4 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + ProfitStyle + ' >' + ConvertQtyDataUnit(v.Spot_Rate) + ' %</div>');
            tr.append(td4);
            var td5 = $("<td></td>").html('<div  class=\"treegrid-Cell\"' + ProfitStyle + ' >' + ConvertQtyDataUnit(v.Forward_Rate) + '  %</div>');
            tr.append(td5);

            //tr.insertBefore($(th).parent());

          }

          
    }
    
}

