var QtrAnnDataObj=[];
var gQtrAnnStartIndex=0;
var gQtrAnnEndIndex=12;
var gQtrAnnUnit_QtrData=1;//Million

var gQtrAnnPageCount=0;
var gQtrAnnPageSelected=0;

var gpage_rec=0;



 function Qreload_js(src) {



    $('script[src="' + src + '"]').remove();
    $('<script>').attr('src', src).appendTo('head');

}
;
function Qbntnextpage()
{
    if(gQtrAnnPageSelected >= 1)
    {
       gQtrAnnPageSelected = parseInt(gQtrAnnPageSelected)-1;
       
       gQtrAnnEndIndex= gpage_rec - (gQtrAnnPageSelected * 12);// 9;
       gQtrAnnStartIndex= gQtrAnnEndIndex - 12;

       //alert("gQtrAnnStartIndex  "+ gQtrAnnStartIndex + "   gQtrAnnEndIndex  " +gQtrAnnEndIndex);

       var gsrc='assets/global/scripts/ResearchLandingLG_Quarterly_Analytics.js';
       Qreload_js(gsrc);
    }
}



function Qbntprevpage()
{
 //gQtrAnnStartIndex=0;
 //gQtrAnnEndIndex=4;
/*
gQtrAnnPageSelected=gQtrAnnPageSelected+1;
 if(gpage_rec >= 10)
 {
   gQtrAnnStartIndex=gpage_rec-10;
   gQtrAnnEndIndex= gpage_rec-6;
 }
*/
 if(gQtrAnnPageSelected +1 < gQtrAnnPageCount)
  {
       gQtrAnnPageSelected = parseInt(gQtrAnnPageSelected) + 1;
       
       gQtrAnnEndIndex= gQtrAnnStartIndex -1;// 9;
       gQtrAnnStartIndex= gQtrAnnStartIndex - 12;
       if(gQtrAnnStartIndex < 0)
       {
        gQtrAnnStartIndex=0;
       }
  }

   //alert("gQtrAnnStartIndex  "+ gQtrAnnStartIndex + "   gQtrAnnEndIndex  " +gQtrAnnEndIndex);

 var gsrc='assets/global/scripts/ResearchLandingLG_Quarterly_Analytics.js';
 Qreload_js(gsrc);
}

/*
 $("#ExcelExportQA").click(function (e) {
  var issuerid = 2318;
  var cmd = $("#selQtrRatioAnalytics").val();
  var unit = "Million";
  var curr = $("#QAddlCurrency").val();
  var ValUnit=$("#selectUnit").val();

  var QAClassType='RATIO';
  
  var vurl='http://bonds.pixstox.com/issuer/webservice/ws_issuerquarterlyanalytics/DownloadquarterlyanalyticsDataMongo?issuerid='+ issuerid +'&cmd='+cmd+'&unit='+unit+'&curr='+curr+'&QAClassType='+QAClassType +'&ValUnit='+ValUnit;
    //console.log("vurl : "+vurl);

    $("body").append("<iframe src='" + vurl + "' style='display: none;' ></iframe>");       

    e.preventDefault();
    
    });
*/






   //Ajax load function
function load_LG_QuarterlyAnalytics(){

  

var issuerid=2318;
var cmd="Standalone";
var unit="Million";
var curr="INR";

var gUnit='';
var gCurr='';



  $("#tableContainerQuarterlyAnalytics").html('');

    //$('.loading-info').show(); 
    var QAClassType='RATIO';

    var vurl='http://bonds.pixstox.com/issuer/webservice/ws_issuerquarterlyanalytics/loadquarterlyanalyticsDataMongo?issuerid='+ issuerid +'&cmd='+cmd+'&unit='+unit+'&curr='+curr+'&QAClassType='+QAClassType;




            $.post( vurl, function(data){
                //loading = false; //set loading flag off once the content is loade

                  alert("wwwwwwwwwwggg  gggg");

                  if(data =='[]')
                {
                  
                }


            if(cmd == "Standalone")
            {
               
             if(QAClassType=='PNL')
             {
               QtrAnnDataObj=JSON.parse(data)[0].QPNL_Standalone;
             }
             else if(QAClassType=='BS')
             {
               QtrAnnDataObj=JSON.parse(data)[0].QBS_Standalone;
             }
             else if(QAClassType=='RATIO')
             {
               QtrAnnDataObj=JSON.parse(data)[0].QRA_Standalone;
             }
            
            }else
            {
             
             if(QAClassType=='PNL')
             {
               QtrAnnDataObj=JSON.parse(data)[0].QPNL_Consolidated;
             }
             else if(QAClassType=='BS')
             {
               QtrAnnDataObj=JSON.parse(data)[0].QBS_Consolidated;
             }
             else if(QAClassType=='RATIO')
             {
               QtrAnnDataObj=JSON.parse(data)[0].QRA_Consolidated;
             }

            }


            //$("#QAselectUnit").val(JSON.parse(data)[0].Unit);
            //Bind Unit DropDown As Per Unit Data Saved IN Database Start.


            if($("#QAselectUnit").html().trim()=="")
            {
              if(JSON.parse(data)[0].Unit=="Million")
              {
                $("#QAselectUnit").html("<option value='10'>Lakh</option><option selected='selected' value='1'>Million</option><option value='0.1'>Crore</option><option value='0.001'>Billion</option>");
              }
              else if(JSON.parse(data)[0].Unit=="Lakh")
              {

             

               $("#QAselectUnit").html("<option value='1' selected='selected' >Lakh</option><option value='0.1'>Million</option><option value='0.01'>Crore</option><option value='0.0001'>Billion</option>");
              }
              else if(JSON.parse(data)[0].Unit=="Crore")
              {
                $("#QAselectUnit").html("<option value='100'>Lakh</option><option value='10'>Million</option><option value='1' selected='selected' >Crore</option><option value='0.01'>Billion</option>");
              }
              else if(JSON.parse(data)[0].Unit=="Billion")
              {
                $("#QAselectUnit").html("<option value='10000'>Lakh</option><option value='1000'>Million</option><option value='100' >Crore</option><option value='1' selected='selected'>Billion</option>");
              }
             $("#QAselectUnit").val("1");
            }

            gQtrAnnUnit_QtrData=$("#QAselectUnit").val();
           

            //Bind Unit DropDown As Per Unit Data Saved IN Database End.

            $("#QAddlCurrency").val(JSON.parse(data)[0].Currency);

            $('.loading-info').hide(); 

/*
            if(QtrAnnDataObj[0].PANEL_DATA.YEARS.length > 5)
            {
                gQtrAnnStartIndex=QtrAnnDataObj[0].PANEL_DATA.YEARS.length -5;
                gQtrAnnEndIndex=QtrAnnDataObj[0].PANEL_DATA.YEARS.length -1;

                //gQtrAnnStartIndex=5;
                //gQtrAnnEndIndex=9;
            }
            else
            {
                gQtrAnnStartIndex=0;
                gQtrAnnEndIndex=5;
            } */

            gpage_rec=QtrAnnDataObj[0].PANEL_DATA.YEARS.length;

            //alert(QtrAnnDataObj[0].PANEL_DATA.YEARS.length);

            if(QtrAnnDataObj[0].PANEL_DATA.YEARS.length > 12)
            {
                gQtrAnnStartIndex=gpage_rec -12;// 5;
                gQtrAnnEndIndex=gpage_rec;// 9;
            }
            else
            {
                gQtrAnnStartIndex=0;
                gQtrAnnEndIndex=12;
            }



            //Page Count
            if(QtrAnnDataObj[0].PANEL_DATA.YEARS.length > 0)
            {
              gQtrAnnPageCount=parseInt(parseFloat(QtrAnnDataObj[0].PANEL_DATA.YEARS.length/12));


              if( (QtrAnnDataObj[0].PANEL_DATA.YEARS.length % 12) > 0)
              {
                gQtrAnnPageCount= parseFloat(gQtrAnnPageCount)+1;
              }
            }
          

            gQtrAnnPageSelected=0;
//alert("gQtrAnnStartIndex " + gQtrAnnStartIndex +"  "+ " gQtrAnnEndIndex " + gQtrAnnEndIndex)

            var gsrc='assets/global/scripts/ResearchLandingLG_Quarterly_Analytics.js';
            Qreload_js(gsrc);

            }).fail(function(xhr, ajaxOptions, thrownError) { //any errors?
                alert(thrownError); //alert with HTTP error
            });
    }

    function QtrAnnqtyUnitChange()
    {
    load_LG_QuarterlyAnalytics();
    }
    var bindLGQuarterlyAnalytics=function()
    {
           gQtrAnnStartIndex=0;
           gQtrAnnEndIndex=4;
           load_LG_QuarterlyAnalytics();
    }
bindLGQuarterlyAnalytics();