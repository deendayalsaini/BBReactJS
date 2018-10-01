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

       var gsrc='../../assets/apps/scripts/ResearchLandingLG_Quarterly_Analytics.js';
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

 var gsrc='../../assets/apps/scripts/ResearchLandingLG_Quarterly_Analytics.js';
 Qreload_js(gsrc);
}


   //Ajax load function
function load_LG_QuarterlyAnalytics(){


var issuerid=$("#QhdDeal_Issuer").val();
var cmd="Standalone";
var unit="Million";
var curr="INR";

var gUnit='';
var gCurr='';



  $("#tableContainerQuarterlyAnalytics").html('');

    //$('.loading-info').show(); 
    var QAClassType='RATIO';


 //var vurl='http://bonds.pixstox.com/issuer/webservice/ws_issuerquarterlyanalytics/loadquarterlyanalyticsDataMongo?issuerid='+ issuerid +'&cmd='+cmd+'&unit='+unit+'&curr='+curr+'&QAClassType='+QAClassType;
 $.get( "http://localhost:8080/api/issuer/quarterlyanalytics?IssuerId="+issuerid, function(data1){

//alert(data1.Test[0]['QRA_Standalone']);

   QtrAnnDataObj=data1.CorporateBondIssuers[0]['QRA_Standalone'];


    
      //QtrAnnDataObj=data[0].QRA_Standalone;
           


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

            var gsrc='../../assets/apps/scripts/ResearchLandingLG_Quarterly_Analytics.js';
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