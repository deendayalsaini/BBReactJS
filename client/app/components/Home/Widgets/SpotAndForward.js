import React from 'react';


class SpotAndForward extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {
   const script = document.createElement("script");
        script.src = "../assets/apps/scripts/WidgetSpotFWDRate.js";
        script.async = true;
        document.body.appendChild(script);

    }
  render() {
    return (

<div class="portlet light ">
<div class="portlet-title tabbable-line">
  <div class="caption caption-md">
  <i class="icon-globe font-dark hide"></i><span class="caption-subject font-green-steel uppercase">
  Spot / Forward Rate [%] </span>
  </div>
  <div class="actions">
  <span id="spanasofdateSpotFWD" class="caption-helper" style={{'text-align':'right','float':'right','font-size':'10px','font-style':'italic','padding':'5px','color': '#4c3ca7'}}></span>
  </div>
</div>

        <div class="portlet-body">
   
      <div class="tab-content">
          <div class="tab-pane active" id="tab_1_1">
              <div style={{'height': '339px'}} data-always-visible="1" data-rail-visible="0">
                 
<table id="SpotFwdRateDataTable" class="table table-striped  tableDADA" style={{'width':'100%','border': '1px solid #244C8B'}}>
<thead>
<tr>

<th data-align="center" style={{'text-align':'center','width':'15%','padding':'8px'}}> 
<span data-toggle="tooltip" data-placement="bottom" title="Maturity" class="sortdata" data-field="Maturity" data="desc">Year</span>
</th>

<th style={{'text-align':'center','width':'25%'}}>
<span data-toggle="tooltip" data-placement="bottom" title="Yield" class="sortdata" data-field="Yield" data="desc">Yld</span>
</th>

<th data-align="center" style={{'text-align':'center','width':'25%'}}> 
<span data-toggle="tooltip" data-placement="bottom" title="Spot Rate" class="sortdata" data-field="BondDate" data="desc"> Spt</span>
</th>

<th style={{'text-align':'center','width':'30%'}}>
<span data-toggle="tooltip" data-placement="bottom" title="Forward Rate" class="sortdata" data-field="Forward Rate" data="desc">Fwd</span>
</th>
</tr></thead>
<tbody id="tbodySpotFwdRateData">


</tbody>
</table>


              </div>
          </div>
      </div>
   
  </div>
    <div style={{'clear':'both'}}></div>
    <div class="task-footer">
      <div class="btn-arrow-link pull-right">
          <a href="market/spot_forward_rate">See More..</a> <i class="icon-arrow-right"></i>
      </div>
  </div>
</div>
    );
  }
}

export default SpotAndForward;
