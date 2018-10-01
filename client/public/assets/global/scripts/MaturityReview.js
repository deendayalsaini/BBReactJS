

var getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


var setCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

var DefaultPer = "Table";
$(document).ready(function () {

    //Performance Start
    $("#btnPerformanceShow").click(function () {
        if (DefaultPer == "Table") {
            bindPerformanceTree();
        }
        else {
            DefaultPer = "Chart";
            gPerIndex.cl = 0;
            gPerIndex.l1 = 0;
            gPerIndex.l2 = 0;
            gPerIndex.l3 = 0;
            gPerIndex.l4 = 0;
            gPerIndex.l5 = 0;
            $("#btnPerChartBack").hide();
        }
    });

    //
    $(".ShowPerformanceTree").click(function () {
        $("#btnPerChartBack").hide();
        if (DefaultPer == "Table") {
            DefaultPer = "Chart";
            gPerIndex.cl = 0;
            gPerIndex.l1 = 0;
            gPerIndex.l2 = 0;
            gPerIndex.l3 = 0;
            gPerIndex.l4 = 0;
            gPerIndex.l5 = 0;

            $(".ShowPerformanceTree").html("<i class=\"fa fa-table\"></i>");
        }
        else {
            DefaultPer = "Table";

            $(".ShowPerformanceTree").html("<i class=\"fa fa-bar-chart-o\"></i>");
        }
    });


});


var bindPerformanceTree = function ()
{
    try {
        //var UnitVal=$("#selectUnit").val();
        //alert(" UnitVal 1 : "+UnitVal)
        PerforOrderCookie = getCookie("PerforOrderCookie");
        $("#tblPerformanceTreeBody").html("");
        /*var PerforOrderCookie = 
                [
                    { "name": "Year", "order": 1, "active": "N" }, 
                    { "name": "Month", "order": 2, "active": "N" }, 
                    { "name": "Date", "order": 3, "active": "N" }, 
                    { "name": "Bond_Type", "order": 4, "active": "N" }, 
                    { "name": "Exchange", "order": 5, "active": "N" },
                    { "name": "Bond_Name", "order": 6, "active": "N" }
                ];*/
        var issuerid=$("#hdDeal_Issuer").val();
        var  PageNo='1';
        var flag=$('#hdnTextValue').val();

        var FromDate =$("#txtFromDate").val();
        var ToDate =$("#txttodate").val();

        //var tPara=JSON.stringify(PerforOrderCookie);
        var tPara=PerforOrderCookie;
        $('.loading-info-bottom').show();
        var callback = site_url+'market/issuer/webservice/ws_maturityprofile/getTreeBonds?issuerid='+ issuerid +'&PageNo='+PageNo +'&flag='+flag +'&FilterConditionData='+'&FromDate='+FromDate+'&ToDate='+ToDate+'&displayorder='+tPara;        
        //alert(" callback : "+callback);
            $.ajax({
                type: "POST",
                url: callback,
                data:  {},
                async: false,
                success: function (Resultobj) {


                     loadperformance(Resultobj);
                     
                  }
            });
  
    }
    catch (msg) {
        $('.loading-info-bottom').hide();
        alert(msg);
    }

}



function AllBonds()
{  
$('.loading-info').show(); 
//$('#Testing tbody').remove();
track_page = 1;
$('#hdnTextValue').val('All')
bindPerformanceTree();
}

function ActiveBonds()
{
$('.loading-info').show(); 
//$('#Testing tbody').remove();
track_page = 1;
$('#hdnTextValue').val('Active')
bindPerformanceTree();
}

function ArchiveBonds()
{
$('.loading-info').show(); 
//$('#Testing tbody').remove();
track_page = 1;
$('#hdnTextValue').val('Archive')
bindPerformanceTree();
}



var performancepara = function () {

    var selExchange = $.map($('#selExchange :selected'), function (e) { return $(e).val(); })
    var selBondType = $.map($('#selBondType :selected'), function (e) { return $(e).val(); })

    var filterlp = '';


    var startdate = $("#PerformanceStartDate").val();
    var enddate = $("#PerformanceEndDate").val();

    var obj = {};
    obj.Exchange = selExchange;
    obj.BondType = selBondType;
    obj.startdate = startdate;
    obj.enddate = enddate;
    var lOrder = [];
    obj.filter='';

    if (startdate == "" && enddate == "") {
        obj.filter = 'NODATEFILTER';
        obj.startdate = new Date();
        obj.enddate = new Date();
    }
    obj.dataorder = ''; // lOrder.join(",");
    //
    return obj;
}

var loadperformance = function (data) {
    try {
        var trData = JSON.parse(data);// JSON.parse(data.d);
        var UnitVal=$("#selectUnit").val();
        //alert(" UnitVal 2 : "+UnitVal)
        if (trData.length > 0) {
            try{
            for (var i = 0; i < trData.length; i++) 
            {

                var tr = $("<tr></tr>").addClass("treegrid-" + trData[i].index).appendTo($('#tblPerformanceTreeBody'));

                var td = $("<td></td>").html("<div class=\"treegridHeaderColumn\" style=\"Font-weight:bold;cursor:pointer;\" " + trData[i].displayname + " title=\"" + trData[i].displayname + " : " + trData[i].displayname + "\"> " + trData[i].displayname + "</div>");
                tr.append(td);
                
                /*var td = $("<td></td>").html("<div class=\"treegrid-Cell\" style=\"text-align:center;\"  title=\"" + trData[i].displayname + "\"> " + trData[i].count_private + "</div>");
                tr.append(td);
                var td = $("<td></td>").html("<div class=\"treegrid-Cell\" style=\"text-align:center;\" title=\"" + trData[i].displayname  + "\"> " + trData[i].count_public  + "</div>");
                tr.append(td);
                var td = $("<td></td>").html("<div class=\"treegrid-Cell\" style=\"text-align:center;\"  title=\"" + trData[i].displayname + "\"> " + trData[i].count_nse + "</div>");
                tr.append(td);
                var td = $("<td></td>").html("<div class=\"treegrid-Cell\" style=\"text-align:center;\" title=\"" + trData[i].displayname  + "\"> " + trData[i].count_bse  + "</div>");
                tr.append(td);
                var td = $("<td></td>").html("<div class=\"treegrid-Cell\" style=\"text-align:center;\"  title=\"" + trData[i].displayname + "\"> " + trData[i].count_bond + "</div>");
                tr.append(td);*/

                var td = $("<td></td>").html("<div class=\"treegrid-Cell\" style=\"text-align:right;\" title=\"" + trData[i].displayname  + "\"> " + addCommas(trData[i].bond_value_sum_ob, UnitVal) + "</div>");
                tr.append(td);

                var td = $("<td></td>").html("<div class=\"treegrid-Cell\" style=\"text-align:right;\" title=\"" + trData[i].displayname  + "\"> " + addCommas(trData[i].bond_value_sum_fv, UnitVal)  + "</div>");
                tr.append(td);

                var td = $("<td></td>").html(" ");
                tr.append(td);

                var Level_1 = trData[i].dump;

                for (var j = 0; j < Level_1.length; j++) 
                {
                    var tr = $("<tr></tr>").addClass("treegrid-" + Level_1[j].index).addClass("treegrid-parent-" + Level_1[j].parent).appendTo($('#tblPerformanceTreeBody'));

                    var td = $("<td></td>").html("<div class=\"treegridHeaderColumn\" style=\"Font-weight:bold;cursor:pointer;\" " + Level_1[j].displayname + " title=\"" + Level_1[j].displayname + " : " + Level_1[j].displayname + "\"> " + Level_1[j].displayname + "</div>");
                    tr.append(td);
                    /*var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\"  title=\"" + Level_1[j].displayname + "\"> " + Level_1[j].count_private + "</div>");
                    tr.append(td);
                    var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\"  title=\"" + Level_1[j].displayname  + "\"> " + Level_1[j].count_public  + "</div>");
                    tr.append(td);
                    
                    var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\"  title=\"" + Level_1[j].displayname + "\"> " + Level_1[j].count_nse + "</div>");
                    tr.append(td);
                    var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\"  title=\"" + Level_1[j].displayname  + "\"> " + Level_1[j].count_bse  + "</div>");
                    tr.append(td);
                    
                    var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\"  title=\"" + Level_1[j].displayname + "\"> " + Level_1[j].count_bond + "</div>");
                    tr.append(td);*/
                    var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:right;\" title=\"" + Level_1[j].displayname  + "\"> " + addCommas(Level_1[j].bond_value_sum_ob, UnitVal)  + "</div>");
                    tr.append(td);

                     var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:right;\" title=\"" + Level_1[j].displayname  + "\"> " + addCommas(Level_1[j].bond_value_sum_fv, UnitVal)  + "</div>");
                    tr.append(td);
                    
                    var td = $("<td></td>").html(" ");
                    tr.append(td);

                    var Level_2 = Level_1[j].dump;
                
                    for (var k = 0; k < Level_2.length; k++) 
                    {
                        var tr = $("<tr></tr>").addClass("treegrid-" + Level_2[k].index).addClass("treegrid-parent-" + Level_2[k].parent).appendTo($('#tblPerformanceTreeBody'));

                        var td = $("<td></td>").html("<div class=\"treegridHeaderColumn\" style=\"Font-weight:bold;cursor:pointer;\" " + Level_2[k].displayname + " title=\"" + Level_2[k].displayname + " : " + Level_2[k].displayname + "\"> " + Level_2[k].displayname + "</div>");
                        tr.append(td);
                        /*var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\" title=\"" + Level_2[k].displayname + "\"> " + Level_2[k].count_private + "</div>");
                        tr.append(td);
                        var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\" title=\"" + Level_2[k].displayname  + "\"> " + Level_2[k].count_public  + "</div>");
                        tr.append(td);
                        
                        var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\" title=\"" + Level_2[k].displayname + "\"> " + Level_2[k].count_nse + "</div>");
                        tr.append(td);
                        var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\" title=\"" + Level_2[k].displayname  + "\"> " + Level_2[k].count_bse  + "</div>");
                        tr.append(td);
                        
                        var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\" title=\"" + Level_2[k].displayname + "\"> " + Level_2[k].count_bond + "</div>");
                        tr.append(td);*/
                        var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:right;\" title=\"" + Level_2[k].displayname  + "\"> " + addCommas(Level_2[k].bond_value_sum_ob, UnitVal)  + "</div>");
                        tr.append(td);

                         var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:right;\" title=\"" + Level_2[k].displayname  + "\"> " + addCommas(Level_2[k].bond_value_sum_fv, UnitVal)  + "</div>");
                        tr.append(td);

                        var td = $("<td></td>").html(" ");
                        tr.append(td);

                        var Level_3 = Level_2[k].dump;
                
                        for (var l = 0; l < Level_3.length; l++) 
                        {
                            var tr = $("<tr></tr>").addClass("treegrid-" + Level_3[l].index).addClass("treegrid-parent-" + Level_3[l].parent).appendTo($('#tblPerformanceTreeBody'));

                            var td = $("<td></td>").html("<div class=\"treegridHeaderColumn\" style=\"Font-weight:bold;cursor:pointer;\" " + Level_3[l].displayname + " title=\"" + Level_3[l].displayname + " : " + Level_3[l].displayname + "\"> " + Level_3[l].displayname + "</div>");
                            tr.append(td);
                            /*var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\" title=\"" + Level_3[l].displayname + "\"> " + Level_3[l].count_private + "</div>");
                            tr.append(td);
                            var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\" title=\"" + Level_3[l].displayname  + "\"> " + Level_3[l].count_public  + "</div>");
                            tr.append(td);
                            
                            var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\" title=\"" + Level_3[l].displayname + "\"> " + Level_3[l].count_nse + "</div>");
                            tr.append(td);
                            var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\" title=\"" + Level_3[l].displayname  + "\"> " + Level_3[l].count_bse  + "</div>");
                            tr.append(td);
                            
                            var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\" title=\"" + Level_3[l].displayname + "\"> " + Level_3[l].count_bond + "</div>");
                            tr.append(td);*/
                            var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:right;\" title=\"" + Level_3[l].displayname  + "\"> " + addCommas(Level_3[l].bond_value_sum_ob, UnitVal) + "</div>");
                            tr.append(td);

                            var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:right;\" title=\"" + Level_3[l].displayname  + "\"> " + addCommas(Level_3[l].bond_value_sum_fv, UnitVal)  + "</div>");
                            tr.append(td);

                            var td = $("<td></td>").html(" ");
                            tr.append(td);

                            var Level_4 = Level_3[l].dump;
                
                            for (var m = 0; m < Level_4.length; m++) 
                            {
                                var tr = $("<tr></tr>").addClass("treegrid-" + Level_4[m].index).addClass("treegrid-parent-" + Level_4[m].parent).appendTo($('#tblPerformanceTreeBody'));

                                var td = $("<td></td>").html("<div class=\"treegridHeaderColumn\" style=\"Font-weight:bold;cursor:pointer;\" " + Level_4[m].displayname + " title=\"" + Level_4[m].displayname + " : " + Level_4[m].displayname + "\"> " + Level_4[m].displayname + "</div>");
                                tr.append(td);
                                /*var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\" title=\"" + Level_4[m].displayname + "\"> " + Level_4[m].count_private + "</div>");
                                tr.append(td);
                                var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\" title=\"" + Level_4[m].displayname  + "\"> " + Level_4[m].count_public  + "</div>");
                                tr.append(td);
                                
                                var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\" title=\"" + Level_4[m].displayname + "\"> " + Level_4[m].count_nse + "</div>");
                                tr.append(td);
                                var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\" title=\"" + Level_4[m].displayname  + "\"> " + Level_4[m].count_bse  + "</div>");
                                tr.append(td);
                                
                                var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\" title=\"" + Level_4[m].displayname + "\"> " + Level_4[m].count_bond + "</div>");
                                tr.append(td);*/
                                var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:right;\" title=\"" + Level_4[m].displayname  + "\"> " + addCommas(Level_4[m].bond_value_sum_ob, UnitVal)  +  "</div>");
                                tr.append(td);

                                var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:right;\" title=\"" + Level_4[m].displayname  + "\"> " + addCommas(Level_4[m].bond_value_sum_fv, UnitVal) + "</div>");
                                tr.append(td);

                                var td = $("<td></td>").html(" ");
                                tr.append(td);

                                var Level_5 = Level_4[m].dump;

                                for (var n = 0; n < Level_5.length; n++) 
                                {
                                    var tr = $("<tr></tr>").addClass("treegrid-" + Level_5[n].index).addClass("treegrid-parent-" + Level_5[n].parent).appendTo($('#tblPerformanceTreeBody'));

                                    var td = $("<td></td>").html("<div class=\"treegridHeaderColumn\" style=\"Font-weight:bold;cursor:pointer;\" " + Level_5[n].displayname + " title=\"" + Level_5[n].displayname + " : " + Level_5[n].displayname + "\"> " + Level_5[n].displayname + "</div>");
                                    tr.append(td);
                                    /*var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\" title=\"" + Level_5[n].displayname + "\"> " + Level_5[n].count_private + "</div>");
                                    tr.append(td);
                                    var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\" title=\"" + Level_5[n].displayname  + "\"> " + Level_5[n].count_public  + "</div>");
                                    tr.append(td);
                                    
                                    var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\" title=\"" + Level_5[n].displayname + "\"> " + Level_5[n].count_nse + "</div>");
                                    tr.append(td);
                                    var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\" title=\"" + Level_5[n].displayname  + "\"> " + Level_5[n].count_bse  + "</div>");
                                    tr.append(td);
                                    
                                    var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:center;\" title=\"" + Level_5[n].displayname + "\"> " + Level_5[n].count_bond + "</div>");
                                    tr.append(td);*/
                                    var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:right;\" title=\"" + Level_5[n].displayname  + "\"> " + addCommas(Level_5[n].bond_value_sum_ob, UnitVal)  + "</div>");
                                    tr.append(td);

                                    var td = $("<td></td>").html("<div class=\"treegrid-Cell\"  style=\"text-align:right;\" title=\"" + Level_5[n].displayname  + "\"> " + addCommas(Level_5[n].bond_value_sum_fv, UnitVal) + "</div>");
                                    tr.append(td);

                                    var td = $("<td></td>").html(" ");
                                    tr.append(td);

                                    var Level_6 = Level_5[n].dump;

                                    for (var p = 0; p < Level_6.length; p++) 
                                    {
                                        var tr = $("<tr style='padding:0px;'></tr>").addClass("treegrid-" + Level_6[p].index).addClass("treegrid-parent-" + Level_6[p].parent).appendTo($('#tblPerformanceTreeBody'));

                                        var td = $("<td colspan=\"7\" style='padding:0px; padding-left:90px; padding-right:20px;'></td>").html("<div class=\"treegridHeaderColumn\" style=\"Font-weight:bold;cursor:pointer;\" " + Level_6[p].displayname + " title=\"" + Level_6[p].displayname + " : " + Level_6[p].displayname + "\"> </div>");
                                        tr.append(td);

                                        var tbl_bnd = $("<table border=\"1\"></table>").addClass("tree table table-striped table-hover table-header-fixed");
                                        td.append(tbl_bnd);

                                        var OBbal_FV = "";
                                        var fontstyle = "";
                                        var tblheader = "";
                                        var tblheadertitle = "";
                                        console.log(parseFloat(addCommas(Level_6[p].OrigBal, UnitVal)) > 0 && addCommas(Level_6[p].OrigBal, UnitVal) != '-')
                                        if(parseFloat(addCommas(Level_6[p].OrigBal, UnitVal)) > 0 && addCommas(Level_6[p].OrigBal, UnitVal) != '-')
                                        {
                                            OBbal_FV = addCommas(Level_6[p].OrigBal, UnitVal);
                                            fontstyle = "";
                                            tblheader = " OrigBal ";
                                            tblheadertitle = "Original Balance";  
                                        }
                                        else if(parseFloat(addCommas(Level_6[p].FaceBal, UnitVal)) > 0 && addCommas(Level_6[p].FaceBal, UnitVal) != '-')
                                        {
                                            OBbal_FV = addCommas(Level_6[p].FaceBal, UnitVal);
                                            fontstyle = "font-style: italic;";
                                            tblheader = " FaceVal ";
                                            tblheadertitle = "Face Value";  
                                        }
                                        else
                                        {
                                            OBbal_FV = "-";
                                            fontstyle = "";
                                            tblheader = " OrigBal ";
                                            tblheadertitle = "Original Balance";  
                                        }

                                        

                                        var tbl_bnd__tr = $("<tr style='width:4%; background-color: #547096 !important; color:white; vertical-align: center;'><th>&nbsp;</th>"+
                                                            "<th style='width:12%; text-align:center;padding:3px;border:1px solid #ddd;Font-weight:bold;'> <span data-toggle='tooltip' data-placement='bottom' title='Exchange Price' class='sortdata' > Exch Price </span>  </th>"+ 
                                                            "<th style='width:12%; text-align:center;padding:3px;border:1px solid #ddd;Font-weight:bold;'> <span data-toggle='tooltip' data-placement='bottom' title='@BondBoard Price'> @BB Price </span>  </th>"+  
                                                            "<th style='width:12%; text-align:center;padding:3px;border:1px solid #ddd;Font-weight:bold;'> <span data-toggle='tooltip' data-placement='bottom' title='Yield'> Yield </span>  </th>"+  
                                                            "<th style='width:12%; text-align:center;padding:3px;border:1px solid #ddd;Font-weight:bold;'> <span data-toggle='tooltip' data-placement='bottom' title='Yield To Maturity'> YTM </span>  </th>"+  
                                                            "<th style='width:12%; text-align:center;padding:3px;border:1px solid #ddd;Font-weight:bold;' > <span data-toggle='tooltip' data-placement='bottom' title='"+tblheadertitle+"'> "+tblheader+" </span>  </th>"+
                                                            "<th style='width:12%; text-align:center;padding:3px;border:1px solid #ddd;Font-weight:bold;'> <span data-toggle='tooltip' data-placement='bottom' title='Interest Information'> IntInfo </span>  </th>"+ 
                                                            "<th style='width:12%; text-align:center;padding:3px;border:1px solid #ddd;Font-weight:bold;'> <span data-toggle='tooltip' data-placement='bottom' title='Payment Frequency'> PayFreq </span>  </th>"+  
                                                            "<th style='width:12%; text-align:center;padding:3px;border:1px solid #ddd;Font-weight:bold;'> <span data-toggle='tooltip' data-placement='bottom' title='Next Interest Payment Date'> NextIntPayDate </span>   </th></tr>");
                                        tbl_bnd.append(tbl_bnd__tr);

                                         var tbl_bnd__tr1 = $("<tr><td onclick='showfulldetail("+Level_6[p].displayID+")' style='text-align: center;'> <i data-toggle='tooltip' data-placement='right' title='' class='fa fa-info-circle' style='cursor:pointer; font-size:15px;' data-original-title='Click here for more info'></i></td>"+
                                                            "<td style='text-align: right;'> " + ValueFormatter(Level_6[p].ExchPrice) + " </td>"+
                                                            "<td style='text-align: right;'> " + ValueFormatter(Level_6[p].BBPrice) + " </td>"+
                                                            "<td style='text-align: right;'> " + PercentageFormatter(Level_6[p].Yield) + " </td>"+
                                                            "<td style='text-align: right;'> " + PercentageFormatter(Level_6[p].YTM) + " </td>"+
                                                            "<td style='text-align: right;"+fontstyle+"'> " + OBbal_FV + " </td>"+
                                                            "<td style='text-align: left;'> " + Level_6[p].IntInfo + " </td>"+
                                                            "<td style='text-align: left;'> " + Level_6[p].PayFreq + " </td>"+
                                                            "<td style='text-align: right;'> - </td></tr>");
                                        tbl_bnd.append(tbl_bnd__tr1);


                                    }
                                    
                                }

                            }
                        }
                    }
                }
            }

            $('.loading-info-bottom').hide();
            }
            catch(er)
            {
                $('.loading-info-bottom').hide();
                //alert("catch : "+er)
            }


            $('#tblPerformanceTree').treegrid();

            
          //  $('.tree').treegrid({
        //       treeColumn: 0
         //   });
            //
            // collapse all nodes 2nd level
            $('#tblPerformanceTree').find('tr').each(function () {
                try {
                    if ($(this).treegrid('getDepth') > 0) {
                        $(this).treegrid('collapse');
                    }
                }
                catch (ex) {
                }
            });

            $('.loading-info').hide(); 
        }
        else {
            $('.loading-info-bottom').hide();
            $("#tblPerformanceTreeBody").html("<tr><td>No matching records found</td></tr>");
        }
        
    }
    catch (ex) {
        $('.loading-info-bottom').hide();
    }
}
//Performance End.




function ExpendAllNode(e) {
    //AddLoadingPanel();
    $('.loading-info-bottom').show();
    $('#' + e).find('tr').each(function () {
        try {
            if ($(this).treegrid('getDepth') > 0) {
                $(this).treegrid('expand');
            }
        }
        catch (ex) { $('.loading-info-bottom').hide(); }
    });
    $('.loading-info-bottom').hide();
    //RemoveLoadingPanel();
}

// collapse all nodes 2nd level
function CollapseAllNode(e) {
    //AddLoadingPanel();
    $('.loading-info-bottom').show();
    $('#' + e).find('tr').each(function () {
        try {
         
            if ($(this).treegrid('getDepth') > 0) {
                $(this).treegrid('collapse');
            }
        }
        catch (ex) { $('.loading-info-bottom').hide(); }
        //RemoveLoadingPanel();
    });
    $('.loading-info-bottom').hide();
}



/*POP UP CODE START*/
var perOrderObj = [];

$(document).ready(function () {
    //setCookie("PerforOrderCookie",'');
    var PerforOrderCookie = getCookie("PerforOrderCookie");

    if (PerforOrderCookie == "") {
        perOrderObj = 
        [
            { "name": "Year", "order": 1, "active": "Y", "displayname":"Year" }, 
            { "name": "Month", "order": 2, "active": "YN", "displayname":"Month"  }, 
            { "name": "Date", "order": 3, "active": "YN", "displayname":"Date"  },
            { "name": "Bond_Type", "order": 4, "active": "Y", "displayname":"Public / Private"  }, 
            { "name": "Exchange", "order": 5, "active": "Y", "displayname":"Exchange"  },
            { "name": "Bond_Name", "order": 6, "active": "N", "displayname":"Bond Name"  }
        ];
        setCookie("PerforOrderCookie", JSON.stringify(perOrderObj), 30);
        bindPerformanceTree();
    }
    else {
        var obj = JSON.parse(PerforOrderCookie);
        perOrderObj = obj;
        bindPerformanceTree();
    }



    $("#btnSetPerformanceOrder").click(function (obj, index, ContactId) {
        $("#ModalSetPerformance").modal('show');
    });

    $(".FieldContainer").sortable({ items: ".OrderingField", distance: 10 });
    //loadPerDP();
    loadPerItem();
    loadPerEvents();

    $("#btnAddPerOrder").click(function () {
        if ($("#selPerOrder").val() != "0") {
            if ($("#selPerOrder").val() != "0") {
                loadPerInnerItem($("#selPerOrder").val());
            }
            for (var w = 0; w < perOrderObj.length; w++) {
                if ($("#selPerOrder").val() == perOrderObj[w].name) {
                    perOrderObj[w].active = "N";
                }
            }
            loadPerEvents();
            loadPerDP();
        }
    });

    $("#btnCancelPerOrder").click(function () {
        $("#ModalSetPerformance").modal('hide');
    });

    $("#btnSavePerOrder").click(function () {


        try {
            /*for (var w = 0; w < perOrderObj.length; w++) {
                perOrderObj[w].order = 0;
                perOrderObj[w].active = "Y";
            }*/

            var tempOrder = 1;
            var vList = $(".OrderingField");
            for (var t = 0; t < vList.length; t++) {
                var at = $(vList[t]).attr("data");
                var at_order = $(vList[t]).attr("data-order");
                var at_active = $(vList[t]).attr("data-active");
                for (var w = 0; w < perOrderObj.length; w++) {
                    if (at == perOrderObj[w].name && (perOrderObj[w].active == 'Y' || perOrderObj[w].active == 'YN')) {
                        //perOrderObj[w].active = "N";
                        if('Year' == perOrderObj[w].name)
                        {
                            perOrderObj[w].order = tempOrder;
                            tempOrder = tempOrder + 1;
                            for (var m = 0 ; m < perOrderObj.length; m++) {
                                if ('Month' == perOrderObj[m].name)
                                {
                                    perOrderObj[m].order = tempOrder;
                                    tempOrder = tempOrder + 1;

                                }
                            }

                            for (var n = 0 ; n < perOrderObj.length; n++) {
                                if ('Date' == perOrderObj[n].name)
                                {
                                    perOrderObj[n].order = tempOrder;
                                    tempOrder = tempOrder + 1;
                                    
                                }
                            }
                        }
                        else
                        {
                            perOrderObj[w].order = tempOrder;
                            tempOrder = tempOrder + 1;
                        }
                        
                    }
                }
            }

            perOrderObj.sort(function (a, b) {
                var a1 = a.order, b1 = b.order;
                if (a1 == b1) return 0;
                return a1 > b1 ? 1 : -1;
            });

           
            //alert("perOrderObj 3 : "+JSON.stringify(perOrderObj));

            setCookie("PerforOrderCookie", JSON.stringify(perOrderObj), 30);

            
            try {
                //$("#tblPerformanceTreeBody").html("");
                $("#ModalSetPerformance").modal('hide');
                $('.loading-info-bottom').show();
                setTimeout(bindPerformanceTree, 1000)
                //bindPerformanceTree();

            }
            catch (msg) {
                $('.loading-info-bottom').hide();
                alert(msg);
            }
        }
        catch (ex) {
            $('.loading-info-bottom').hide();
            alert(ex);
        }
        //
    });
});



function moveUp(item) {
    var prev = item.prev();
    if (prev.length == 0)
        return;
    prev.css('z-index', 999).css('position', 'relative').animate({ top: item.height() }, 250);
    item.css('z-index', 1000).css('position', 'relative').animate({ top: '-' + prev.height() }, 300, function () {
        prev.css('z-index', '').css('top', '').css('position', '');
        item.css('z-index', '').css('top', '').css('position', '');
        item.insertBefore(prev);
    });
}
function moveDown(item) {
    var next = item.next();
    if (next.length == 0)
        return;
    next.css('z-index', 999).css('position', 'relative').animate({ top: '-' + item.height() }, 250);
    item.css('z-index', 1000).css('position', 'relative').animate({ top: next.height() }, 300, function () {
        next.css('z-index', '').css('top', '').css('position', '');
        item.css('z-index', '').css('top', '').css('position', '');
        item.insertAfter(next);
    });
}

var loadPerDP = function () {
    try {
        $("#selPerOrder").html("<option value=\"0\">--Select--</option>");
        for (var w = 0; w < perOrderObj.length; w++) {
            if (perOrderObj[w].active == "Y") {
                var t = "<option value='" + perOrderObj[w].name + "'>" + perOrderObj[w].displayname + "</option>";
                $("#selPerOrder").append(t);
            }
        }
    }
    catch (ex) {
        alert(ex);
    }
}
var loadPerItem = function () {
    $(".FieldContainer").html("");
    //Change Order start
    //        perOrderObj = perOrderObj.sort(function (a, b) {
    //            return a.oredr.localeCompare(b.oredr);
    //        });
    //Change Order end

    for (var w = 0; w < perOrderObj.length; w++) {
        if (perOrderObj[w].active == "Y") {
            loadPerInnerItem(perOrderObj[w].name, perOrderObj[w].displayname, perOrderObj[w].order, perOrderObj[w].active);
        }
    }
}

var loadPerInnerItem = function (name, displayname, order, active) {
    var t = "<div class='OrderingField' data='" + name + "' data-order='"+order+"' data-active='"+active+"'  ><div class='LeftFloat'>" + displayname + "</div><div class='RightFloat Commands'><a value='up' class='cmdUPDOWM'><i class='fa fa-caret-up' value='up' aria-hidden='true'  style='color: #FFF;' ></i></a>&nbsp;&nbsp;<a value='down' class='cmdUPDOWM'><i class='fa fa-caret-down' value='down' aria-hidden='true'  style='color: #FFF;' ></i></a>&nbsp;&nbsp;<a style='display:none;' value='delete' data='" + name + "' class='cmdUPDOWM'><i class='fa fa-remove' value='delete' aria-hidden='true' style='color: #FFF;' ></i></a></div></div>";
    $(".FieldContainer").append(t);
}

var loadPerEvents = function () {
    $('.cmdUPDOWM').click(function () {
        var btn = $(this);
        var val = $(this).attr("value");
        if (val == 'up') {
            moveUp(btn.parents('.OrderingField'));
        }
        if (val == 'down') {
            moveDown(btn.parents('.OrderingField'));
        }
        if (val == 'delete') {
            var vt = $(btn).attr("data");
            for (var w = 0; w < perOrderObj.length; w++) {
                if (perOrderObj[w].name == vt) {
                    perOrderObj[w].active = "Y";
                }
            }
            btn.parents('.OrderingField').remove();
            loadPerDP();
        }
    });
};
/*POP UP CODE END*/



 function showfulldetail(c)
 {
    $('.loading-info-bottom').show();

    var UnitVal=$("#selectUnit").val();
    //$('#ModalBondDetails').modal("show");

    var vurl=site_url +'market/issuer/webservice/ws_maturityprofile/getBondDetail?id='+ c;
    
    $.post( vurl, {}, function(data){

    try{

        //alert("1")
        var json=jQuery.parseJSON(data);

        $('.loading-info-bottom').hide();

        if(json.length > 0)
        {

            
           /* var LTP = '-';
            var LTY = '-';

            if(json[0].SmallData !=null)
            {
                var Arr=json[0].SmallData.split('@');
                
                if(Arr.length > 0)
                {
                    LTP = ValueFormatter(Arr[0]);
                    LTY = ValueFormatter(Arr[1]);
                }
            }*/

            $("#ModalBondDetailsLabel").html(BondFormatterAuto(json[0].dlnDeal_ID , json[0].dlsDeal_Name, json[0].dlsDeal_ShortName));

            $("#tbl_ModalBondDetails").html('');

            $("#tbl_ModalBondDetails").append('<tr><td ><label> Exchange Price </label></td><td><span style="padding:4px;">'+ ValueFormatter(json[0].LTP) +'</span></td><td><label> @BondBoard Price </label></td><td>'+ValueFormatter(json[0].dabnPrice)+'</td></tr>');

            $("#tbl_ModalBondDetails").append('<tr><td ><label> Original Balance </label></td><td><span style="padding:4px;">'+ addCommas(json[0].OriginalBalance, UnitVal) +'</span></td><td><label> Interest Information </label></td><td>'+json[0].InterestType+'</td></tr>');

            $("#tbl_ModalBondDetails").append('<tr><td ><label> Yield </label></td><td><span style="padding:4px;">'+PercentageFormatter(json[0].dabnYield) +'</span></td><td><label> Yield To Maturity </label></td><td>'+PercentageFormatter(json[0].dabnYTM) +'</td></tr>');

            $("#tbl_ModalBondDetails").append('<tr><td ><label> Yield To Call </label></td><td><span style="padding:4px;">'+PercentageFormatter(json[0].YieldToCall) +'</span></td><td><label> Yield To Put </label></td><td>'+PercentageFormatter(json[0].YieldToPut) +'</td></tr>');

            $("#tbl_ModalBondDetails").append('<tr><td ><label> Accural Interest </label></td><td><span style="padding:4px;">'+ValueFormatter(json[0].dabnAccInt) +'</span></td><td><label> Duratioon </label></td><td>'+ValueFormatter(json[0].dabnDuration) +'</td></tr>');

            $("#tbl_ModalBondDetails").append('<tr><td ><label> Macaulay Duration </label></td><td><span style="padding:4px;">'+ValueFormatter(json[0].dabnMacDur) +'</span></td><td><label> Effective Duration </label></td><td>'+ValueFormatter(json[0].dabnEffDur) +'</td></tr>');

            $("#tbl_ModalBondDetails").append('<tr><td ><label> LTP </label></td><td><span style="padding:4px;">'+ValueFormatter(json[0].LTP) +'</span></td><td><label> LTY </label></td><td>'+ValueFormatter(json[0].tbpsLastTradeValInLakh) +'</td></tr>');

            $("#tbl_ModalBondDetails").append('<tr><td ><label> Convexity </label></td><td><span style="padding:4px;">'+ValueFormatter(json[0].dabnConvexity) +'</span></td><td><label> Rating </label></td><td>'+json[0].Rating +'</td></tr>');

            $("#tbl_ModalBondDetails").append('<tr><td ><label> @BondBoard DirtyPrice </label></td><td><span style="padding:4px;">'+ValueFormatter(json[0].DirtyPrice) +'</span></td><td><label> @BondBoard CleanPrice </label></td><td>'+ValueFormatter(json[0].CleanPrice) +'</td></tr>');
            
        }
        else
        {
            $("#ModalBondDetailsLabel").html('No Data available!!!!!!');

            $("#tbl_ModalBondDetails").html('');
        }        
        $('#ModalBondDetails').modal("show");
    }
    catch(er)
    {
        //alert("catch : "+er)
    }

    });
    //alert("2")

}



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

function PercentageFormatter(value) 
{     
    try
    {
    if (value != '' && value != '-') {
         value = parseFloat(value) * 100;     
         return '<span class="NagValData">' + parseFloat(value).toFixed(2) + "&nbsp;%"+ "</span>";
    }
    else {
        return '-';
    }
    }catch(ex){console.log(ex);}
}

function BondFormatterAuto(issuerid,fullName,ShortName) {
      return "<a style=\" color:#013D6F;\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"\" data-original-title=\""+fullName+"\" href=\""+site_url+"bonds/corporatebond/corpbond/"+issuerid+"\" class=\"\">"+ShortName+"</a>";
}


function addCommas(x, ut) {
    try
    {
        if( x == '')
        {
          return '-';
        }
        if(!isNaN(x) && x != null)
        {
            return (parseFloat(x) * parseFloat(ut)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");            
        }
        else
        {
            return '-';
        }
    }catch(ex)
    {

    }
}

function Unitchange()
{
    /*track_page = 1; //track user scroll as page number, right now page number is 1
    loading  = false; //prevents multiple loads
    stoploading=false; */

    $('#tblPerformanceTreeBody').html('');
    $('.loading-info-bottom').show();

    setTimeout(bindPerformanceTree, 1000)
    //bindPerformanceTree();
}
