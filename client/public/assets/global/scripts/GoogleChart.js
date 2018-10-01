    
google.charts.load("current", { packages: ["corechart", "bar", 'treemap', 'table', "calendar", "line", "annotationchart"] });

    

function LineChart(Id, SpinId, ObjData, ObjColumn, ObjColor, h_tit, v_tit,fractionDigits) 
{
  
try
{ 
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Date');
      
        for(var i=1;i<ObjColumn.length;i++)
        {
            data.addColumn('number', ObjColumn[i]);
        }

        data.addRows(ObjData);

        var options = {
        hAxis: {
            //title: 'date',
            //format: 'date',
            maxAlternation : 3,
            //slantedText: true,
            //slantedTextAngle: 90,
            gridlines: {
                count: -1
            },
            format: 'M/d/yy',
        },
        lineWidth: .9,
        vAxis: { title: v_tit,
                 format: 'short' },
        legend: { position: 'none' },
        colors: ObjColor,
        focusTarget: 'category',
        chartArea: { left: '10%', right: '2%', width: '80%', height: '70%' },
      };
      
      var formatter = new google.visualization.NumberFormat({
          fractionDigits: fractionDigits
      });

      formatter.format(data, 1);
      formatter.format(data, 2);
      formatter.format(data, 3);
      formatter.format(data, 4);

      var chart = new google.visualization.LineChart(document.getElementById(Id));
      chart.draw(data, options);
       

 }
catch(er)
{
  console.log(er)
}


}


function PieChart(Id, SpinId, ObjData, ObjColor, title) 
{
  
try
{
  
  google.charts.setOnLoadCallback(drawbasic);

  function drawbasic() 
  {     
        var data = google.visualization.arrayToDataTable(ObjData);

        var options = {
          title: '',
          legend: { position: 'none' },
          colors: ObjColor,
          chartArea: { left: '10%', right: '10%', width: '80%', height: '100%' }
        };


        var chart = new google.visualization.PieChart(document.getElementById(Id));

        chart.draw(data, options);

        var container = document.getElementById(Id);  
        container.style.display = 'block';

        google.visualization.events.addListener(chart, 'ready', function () {
        container.style.display = 'none';
    });

    }
    
 }
catch(er)
{
  alert(er)
}




}
function PieChartOptimized(Id, SpinId, ObjData, ObjColor, title) 
{
  
try
{
  
  google.charts.setOnLoadCallback(drawbasic);

  function drawbasic() 
  {     
        var data = google.visualization.arrayToDataTable(ObjData);

        var options = {
          title: '',
          legend: { position: 'none' },
          colors: ObjColor,

          chartArea: { left: '10%', right: '10%', width: '80%', height: '100%' },
          width: 250,
          height: 250,
        };


        var chart = new google.visualization.PieChart(document.getElementById(Id));

        chart.draw(data, options);

        var container = document.getElementById(Id);  
        //container.style.display = 'block';

        google.visualization.events.addListener(chart, 'ready', function () {
            container.style.display = 'none';
        });

    }
    
 }
catch(er)
{
  alert(er)
}




}

  var chart_Pool_level; 
  var data_Pool_level;
   var option_pool_level;


    function MultiSeriesChart(Id, SpinId, ObjData, ObjColumn, ObjColor, h_tit, v_tit,fractionDigits) {

    data_Pool_level = new google.visualization.DataTable();
  //var data = new google.visualization.DataTable();
        data_Pool_level.addColumn('string', 'Date');
      
        for(var i=1;i<ObjColumn.length;i++)
        {
            data_Pool_level.addColumn('number', ObjColumn[i]);
        }

        data_Pool_level.addRows(ObjData);

   option_pool_level={curveType: "function", width: 500, height: 300,
   lineWidth: .9,




                 legend: { position: 'none' },
        colors: ObjColor,
        focusTarget: 'category',
        chartArea: { left: '10%', right: '10%', width: '70%', height: '70%' },
    series:{
       0:{targetAxisIndex:0},
       1:{targetAxisIndex:0},
       2:{targetAxisIndex:1},
       3:{targetAxisIndex:1},
       4:{targetAxisIndex:1},
       5:{targetAxisIndex:1},
       6:{targetAxisIndex:1},
       7:{targetAxisIndex:1},
       }
,
        vAxis:
        { 
          title: v_tit,
          format: 'short' 
        },
     };


          var formatter = new google.visualization.NumberFormat({
          fractionDigits: fractionDigits
      });

      formatter.format(data_Pool_level, 1);
      formatter.format(data_Pool_level, 2);
      formatter.format(data_Pool_level, 3);
      formatter.format(data_Pool_level, 4);
      formatter.format(data_Pool_level, 5);
      formatter.format(data_Pool_level, 6);

  // Create and draw the visualization.


chart_Pool_level=  new google.visualization.LineChart(document.getElementById(Id));
      chart_Pool_level.draw(data_Pool_level, option_pool_level);

 

      }