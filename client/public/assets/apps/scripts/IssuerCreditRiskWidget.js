function getCreditStatus()
{
try
{
    //var vurl='http://bonds.pixstox.com/market/issuer/webservice/ws_issuer_creditstatus/getCreditStatusNew';

 $.get( "http://localhost:8080/api/issuer_credit_risk", function(data1){

       var v=data1.IssuerCreditRisks[0].CR;

       if(data1!='')
       {
         //DENGEROUS
         $("#tbodyIssuerCreditStatus").append("<tr data-index='6'><td style='background-color:red;color:white;' class='CPTD1' >DANGEROUS</td><td style='' class='CPClass CP_D '   data-bg='red'  data-val='DANGEROUS_T' data-period='T'  >"+(v[0].DANGEROUS_T_SMALL.length > 30 ? v[0].DANGEROUS_T_SMALL.substring(0,27) + '...': v[0].DANGEROUS_T_SMALL)+"</td><td  class='CPClass CP_D'   data-bg='red'  data-flag='DANGEROUS'  data-val='DANGEROUS_T1' data-period='T1'  >"+(v[0].DANGEROUS_T1_SMALL.length > 30 ? v[0].DANGEROUS_T1_SMALL.substring(0,27) + '...': v[0].DANGEROUS_T1_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_D'   data-bg='red'  data-flag='DANGEROUS'  data-val='DANGEROUS_T5' data-period='T-5' >"+(v[0].DANGEROUS_T5_SMALL.length > 30 ? v[0].DANGEROUS_T5_SMALL.substring(0,27) + '...': v[0].DANGEROUS_T5_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_D'   data-bg='red'  data-flag='DANGEROUS'  data-val='DANGEROUS_LM' data-period='Last Month' >"+(v[0].DANGEROUS_LM_SMALL.length > 30 ? v[0].DANGEROUS_LM_SMALL.substring(0,27) + '...': v[0].DANGEROUS_LM_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_D'   data-bg='red'  data-flag='DANGEROUS'  data-val='DANGEROUS_LQ' data-period='Last Qtr' >"+(v[0].DANGEROUS_LQ_SMALL.length > 30 ? v[0].DANGEROUS_LQ_SMALL.substring(0,27) + '...': v[0].DANGEROUS_LQ_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_D'   data-bg='red'  data-flag='DANGEROUS'  data-val='DANGEROUS_LY' data-period='Last Year' >"+(v[0].DANGEROUS_LY_SMALL.length > 30 ? v[0].DANGEROUS_LY_SMALL.substring(0,27) + '...': v[0].DANGEROUS_LY_SMALL)+"</td></tr>");

         //EXTREME
        $("#tbodyIssuerCreditStatus").append("<tr data-index='6'><td style='background-color:#e26e0a;color:white;border-top: 1px solid #fff;' class='CPTD1' >EXTREME</td><td style'text-align: left;' class='CPClass CP_E' data-bg='#e26e0a'  data-flag='EXTREME'  data-val='EXTREME_T' data-period='T' >"+(v[0].EXTREME_T_SMALL.length > 30 ? v[0].EXTREME_T_SMALL.substring(0,27) + '...': v[0].EXTREME_T_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_E' data-bg='#e26e0a'  data-flag='EXTREME'  data-val='EXTREME_T1' data-period='T1' >"+(v[0].EXTREME_T1_SMALL.length > 30 ? v[0].EXTREME_T1_SMALL.substring(0,27) + '...': v[0].EXTREME_T1_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_E' data-bg='#e26e0a'  data-flag='EXTREME'  data-val='EXTREME_T5' data-period='T-5' >"+(v[0].EXTREME_T5_SMALL.length > 30 ? v[0].EXTREME_T5_SMALL.substring(0,27) + '...': v[0].EXTREME_T5_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_E' data-bg='#e26e0a'  data-flag='EXTREME'  data-val='EXTREME_LM' data-period='Last Month' >"+(v[0].EXTREME_LM_SMALL.length > 30 ? v[0].EXTREME_LM_SMALL.substring(0,27) + '...': v[0].EXTREME_LM_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_E' data-bg='#e26e0a'  data-flag='EXTREME'  data-val='EXTREME_LQ' data-period='Last Qtr' >"+(v[0].EXTREME_LQ_SMALL.length > 30 ? v[0].EXTREME_LQ_SMALL.substring(0,27) + '...': v[0].EXTREME_LQ_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_E' data-bg='#e26e0a'  data-flag='EXTREME'  data-val='EXTREME_LY' data-period='Last Year' >"+(v[0].EXTREME_LY_SMALL.length > 30 ? v[0].EXTREME_LY_SMALL.substring(0,27) + '...': v[0].EXTREME_LY_SMALL)+"</td></tr>");

          //VERY HIGH
         $("#tbodyIssuerCreditStatus").append("<tr data-index='6'><td style='background-color:#da9694;color:black;border-top: 1px solid #fff;' class='CPTD1' >VERY HIGH</td><td style'text-align: left;' class='CPClass CP_VH' data-bg='#da9694'  data-flag='VERY HIGH'  data-val='VERYHIGH_T' data-period='T' >"+(v[0].VERYHIGH_T_SMALL.length > 30 ? v[0].VERYHIGH_T_SMALL.substring(0,27) + '...': v[0].VERYHIGH_T_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_VH' data-bg='#da9694'  data-flag='VERY HIGH'  data-val='VERYHIGH_T1' data-period='T1' >"+(v[0].VERYHIGH_T1_SMALL.length > 30 ? v[0].VERYHIGH_T1_SMALL.substring(0,27) + '...': v[0].VERYHIGH_T1_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_VH' data-bg='#da9694'  data-flag='VERY HIGH'  data-val='VERYHIGH_T5' data-period='T-5' >"+(v[0].VERYHIGH_T5_SMALL.length > 30 ? v[0].VERYHIGH_T5_SMALL.substring(0,27) + '...': v[0].VERYHIGH_T5_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_VH' data-bg='#da9694'  data-flag='VERY HIGH'  data-val='VERYHIGH_LM' data-period='Last Month' >"+(v[0].VERYHIGH_LM_SMALL.length > 30 ? v[0].VERYHIGH_LM_SMALL.substring(0,27) + '...': v[0].VERYHIGH_LM_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_VH' data-bg='#da9694'  data-flag='VERY HIGH'  data-val='VERYHIGH_LQ' data-period='Last Qtr' >"+(v[0].VERYHIGH_LQ_SMALL.length > 30 ? v[0].VERYHIGH_LQ_SMALL.substring(0,27) + '...': v[0].VERYHIGH_LQ_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_VH' data-bg='#da9694'  data-flag='VERY HIGH'  data-val='VERYHIGH_LY' data-period='Last Year' >"+(v[0].VERYHIGH_LY_SMALL.length > 30 ? v[0].VERYHIGH_LY_SMALL.substring(0,27) + '...': v[0].VERYHIGH_LY_SMALL)+"</td></tr>");

         //HIGH
        $("#tbodyIssuerCreditStatus").append("<tr data-index='6'><td style='background-color:#fabf8f;color:black;border-top: 1px solid #fff;' class='CPTD1' >HIGH</td><td style'text-align: left;' class='CPClass CP_H' data-bg='#fabf8f'  data-flag='HIGH'  data-val='HIGH_T' data-period='T' >"+(v[0].HIGH_T_SMALL.length > 30 ? v[0].HIGH_T_SMALL.substring(0,27) + '...': v[0].HIGH_T_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_H' data-bg='#fabf8f'  data-flag='HIGH'  data-val='HIGH_T1' data-period='T1' >"+(v[0].HIGH_T1_SMALL.length > 30 ? v[0].HIGH_T1_SMALL.substring(0,27) + '...': v[0].HIGH_T1_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_H' data-bg='#fabf8f'  data-flag='HIGH'  data-val='HIGH_T5' data-period='T-5' >"+(v[0].HIGH_T5_SMALL.length > 30 ? v[0].HIGH_T5_SMALL.substring(0,27) + '...': v[0].HIGH_T5_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_H' data-bg='#fabf8f'  data-flag='HIGH'  data-val='HIGH_LM' data-period='Last Month' >"+(v[0].HIGH_LM_SMALL.length > 30 ? v[0].HIGH_LM_SMALL.substring(0,27) + '...': v[0].HIGH_LM_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_H' data-bg='#fabf8f'  data-flag='HIGH'  data-val='HIGH_LQ' data-period='Last Qtr' >"+(v[0].HIGH_LQ_SMALL.length > 30 ? v[0].HIGH_LQ_SMALL.substring(0,27) + '...': v[0].HIGH_LQ_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_H' data-bg='#fabf8f'  data-flag='HIGH'  data-val='HIGH_LY' data-period='Last Year' >"+(v[0].HIGH_LY_SMALL.length > 30 ? v[0].HIGH_LY_SMALL.substring(0,27) + '...': v[0].HIGH_LY_SMALL)+"</td></tr>");

         //LOW
         $("#tbodyIssuerCreditStatus").append("<tr data-index='6'><td style='background-color:yellow;color:black;border-top: 1px solid #fff;' class='CPTD1' >LOW</td><td style'text-align: left;' class='CPClass CP_L' data-bg='yellow'  data-flag='LOW'  data-val='LOW_T' data-period='T' >"+(v[0].LOW_T_SMALL.length > 30 ? v[0].LOW_T_SMALL.substring(0,27) + '...': v[0].LOW_T_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_L' data-bg='yellow'  data-flag='LOW'  data-val='LOW_T1' data-period='T1' >"+(v[0].LOW_T1_SMALL.length > 30 ? v[0].LOW_T1_SMALL.substring(0,27) + '...': v[0].LOW_T1_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_L' data-bg='yellow'  data-flag='LOW'  data-val='LOW_T5' data-period='T-5' >"+(v[0].LOW_T5_SMALL.length > 30 ? v[0].LOW_T5_SMALL.substring(0,27) + '...': v[0].LOW_T5_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_L' data-bg='yellow'  data-flag='LOW'  data-val='LOW_LM' data-period='Last Month' >"+(v[0].LOW_LM_SMALL.length > 30 ? v[0].LOW_LM_SMALL.substring(0,27) + '...': v[0].LOW_LM_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_L' data-bg='yellow'  data-flag='LOW'  data-val='LOW_LQ' data-period='Last Qtr' >"+(v[0].LOW_LQ_SMALL.length > 30 ? v[0].LOW_LQ_SMALL.substring(0,27) + '...': v[0].LOW_LQ_SMALL)+"</td><td style'text-align: left;' class='CPClass CP_L' data-bg='yellow'  data-flag='LOW'  data-val='LOW_LY' data-period='Last Year' >"+(v[0].LOW_LY_SMALL.length > 30 ? v[0].LOW_LY_SMALL.substring(0,27) + '...': v[0].LOW_LY_SMALL)+"</td></tr>");

         $(".CPClass").click(function(){
         var vt= $(this).html();
         if(vt=='')
         {
          return;
         }

          var d=$(this).attr('data-val');
          var bg=$(this).attr('data-bg');
          var flag=$(this).attr('data-flag');
          var period=$(this).attr('data-period');

          getFullDetails(d,bg,flag,period);});

       }
     });
  }
  catch(ex) 
  {
    alert(ex);
  }
}

function getFullDetails(CR,bgColor,status,Period)
{
try
{
  var objChart='[';

   $('.loading-info-bottom').show(); 

  //$("#tbodyCreditStatusPopUp").html('');
  $("#tbodyCreditStatusPopUpSmall").html('');

///api/issuer_credit_risk_fulldetail

    //var vurl='http://bonds.pixstox.com/market/issuer/webservice/ws_issuer_creditstatus/getCreditStatusFullNew';
   // $.post( vurl, {"CR":CR}, function(data){

   $.get( "http://localhost:8080/api/issuer_credit_risk_fulldetail?CR="+CR, function(data){

  
       var v=data.IssuerCreditRiskFullDetails;



       var HasIssuer="N";
    //CH S
        if(v.length > 0)
        {
          var ch=v;

$("#spanCreditPopStatus").html("&nbsp;"+status+"&nbsp;");
$("#spanCreditPopStatus").attr("style","text-align: left;background-color:"+bgColor+";color:black;padding:3px;")
$("#spanCreditPopPeriod").html("&nbsp;"+Period+"&nbsp;");

var ty=["Location", "Parent", "Market trade volume (size)","Market increase/decrease (color)","id","companyname"];
objChart= objChart + '["Location", "Parent", "Market trade volume (size)","Market increase/decrease (color)","id","companyname"],';


objChart= objChart + '["Daily Price Change",null,0,0,0,0]';

      
          if(ch.length >= 1)
          {
            HasIssuer="Y";
            for(var t=0; t<ch.length; t++)
            {

            var to=ch[t];


objChart= objChart + ',["'+to.SHORT_NAME+'","Daily Price Change",'+Math.abs(to.DAILY_PRICE_CHANGE)+','+to.DAILY_PRICE_CHANGE+','+to.COMPANY_ID+',"'+to.FULL_NAME+'"]';


            }
          }
          objChart=objChart + ']';


  
       

          drawChart( JSON.parse(objChart));
        }
    

       if(HasIssuer=="Y")
       {
        $("#ModalIsserCreditStatus").modal('show');
       }
       else
       {
        //ShowMessage('Data Not Available.','Info'); //Success,Error,Warning,''
        $("#ModalIsserCreditStatus").modal('show');
       }
     });
  }
  catch(ex)
  {
   $('.loading-info-bottom').hide(); 
  }
}


try
{
//Google Visualization code
//google.load("visualization", "1", { packages: ["treemap"] });

function drawChart(abc) {

try
{
          var data = google.visualization.arrayToDataTable(abc);
          tree = new google.visualization.TreeMap(document.getElementById('chart_div'));

          tree.draw(data, {
              minColor: '#e53232',
              midColor: '#BCB001',
              maxColor: '#5cb85c',
              headerHeight: 0,
              fontColor: 'white',
              showScale: false,
              height:250,
              width: 555,
              generateTooltip: showStaticTooltip
          });


     
     

       function showStaticTooltip(row, size, value, id) {
              // alert(data.getValue(row, 4))<span class="' + NagValClass + '">' + SubSec + '</span>
              var link = "Issuer/RatiosAnalytics/"+ data.getValue(row, 4);
              var dvalue = 0;

              dvalue = data.getValue(row, 3);
             

                  return '<div style="background-color:white;z-index:20000;position: relative;padding:10px;border-radius:5px;border:1px solid lightgray;"><h4>' + data.getValue(row, 5) + '</h4><div class="q-1 " id="stat"><span style="color:black;">' + dvalue + '&nbsp;%</span></br><span style="color:black;">' + data.getValue(row, 1) + '</span></br></br></div> <a href=' + link + '>Click to see detailed information</a> </div>';
      
          
          google.visualization.events.addListener(tree, 'select', function () {
              var companyid = data.getValue(tree.getSelection()[0].row, 4);
              window.location.href = "market/issuer/issuerdetail/" + companyid;
          });
      

      }
    }
    catch(ex)
    {
      alert(ex);
    }
  }


  }
  catch(ex)
  {
      alert(ex);
  }


  $(document).ready(function(){


$("#tbodyIssuerCreditStatus").html("");
getCreditStatus();
});