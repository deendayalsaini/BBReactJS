

function ValueFormatter4(x) {
        if(!isNaN(x) && x != null)
        {
            return parseFloat(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");            
        }
        else
        {
            return '-';
        }
    }
 function loadSpotFWDRateData()
   {
     //$('.loading-info-bottom').show(); //hide loading animation once data is received

     //GET REMAINING DATA FROM MONGODB START .
     
                    

                                             $.get( "http://localhost:8080/api/spot_forward", function(data1){

    


                              //alert(mdbdata.replace(']null',']'));
                   try{

                //var d=json[t].DATA;
        var mongoDB= data1.Spot_Forward[0].FW;

var AsOfDate='';
for(var w=0; w <mongoDB.length; w++)
{
var fwd=ValueFormatter4(mongoDB[w].Forward_Rate);
/*if(w==0)
{
	fwd='-';
}*/
AsOfDate=mongoDB[w].DateDisplay;
var bg=';background-color: #eef1f5;';
if(w%2==0)
	bg='';
$("#tbodySpotFwdRateData").append('<tr data-index="6">'+
'<td style="text-align: center;height:16px;padding-right:10px;'+bg+'">'+mongoDB[w].Maturity_Yr+'</td>'+
'<td style="text-align: center;height:16px;padding-right:10px;'+bg+'">'+ValueFormatter4(mongoDB[w].Yield)+'</td>'+
'<td style="text-align: center;height:16px;padding-right:10px;'+bg+'">'+ValueFormatter4(mongoDB[w].Spot_Rate)+'</td>'+
'<td style="text-align: center;height:16px;padding-right:10px;'+bg+'">'+fwd+'</td>'+
'</tr>');
}


        //$("#spanasofdateSpotFWD").html("Update - "+ AsOfDate);
                }
                catch(ex)
                {
                   $('.loading-info-bottom').hide(); //hide loading animation once data is received
                }
        // FOR LOOP END.
                 }).fail(function(xhr, ajaxOptions, thrownError) { //any errors?
                   $('.loading-info-bottom').hide(); //hide loading animation once data is received


                  });

                 $('.loading-info-bottom').hide();
              //GET REMAINING DATA FROM MONGODB END.

}
loadSpotFWDRateData();