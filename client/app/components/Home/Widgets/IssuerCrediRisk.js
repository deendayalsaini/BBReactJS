import React from 'react';


class IssuerCrediRisk extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {

   
        const scriptGoogle = document.createElement("script");
        scriptGoogle.src = "https://www.google.com/jsapi";
        scriptGoogle.async = true;
        document.body.appendChild(scriptGoogle);

        const scriptVGoogle = document.createElement("script");
        scriptVGoogle.src = "https://www.google.com/uds/?file=visualization&v=1&packages=treemap";
        scriptVGoogle.async = true;
        document.body.appendChild(scriptVGoogle);

        const scriptV1Google = document.createElement("script");
        scriptV1Google.src = "https://www.google.com/uds/api/visualization/1.0/40ff64b1d9d6b3213524485974f36cc0/format+en,default+en,ui+en,treemap+en.I.js";
        scriptV1Google.async = true;
        document.body.appendChild(scriptV1Google);



        const script = document.createElement("script");
        script.src = "../assets/apps/scripts/IssuerCreditRiskWidget.js";
        script.async = true;
        document.body.appendChild(script);





    }
  render() {
    return (
     <div class="portlet light ">
    <div class="portlet-title">
        <div class="caption caption-md">
            <i class="icon-bar-chart font-dark hide"></i>
            <span class="caption-subject font-green-steel  uppercase">Issuer Credit Risk </span>
        </div>
        <div class="actions">
         
        </div>
    </div>
    <div class="portlet-body">
        <div class="table-scrollable-borderless" style={{'min-height':'350px'}} >
          <table id="IssuerCreditStatus" class="table tableDADA" style={{'width':'100%','border': '1px solid #244C8B'}}>
            <thead>
            <tr>
            <th data-align="center" style={{'text-align':'center','width':'150px','padding':'10px'}}> 
            <span data-toggle="tooltip" data-placement="bottom" title="Bond Name" class="sortdata" data-field="Credit Risk" data="desc"> Risk </span>
            </th>

            <th data-align="center" style={{'text-align':'center','width':'200px'}}> 
            <span data-toggle="tooltip" data-placement="bottom" title="Current Day"  data="desc"> T </span>
            </th>

            <th style={{'text-align':'center','width':'200px'}}>
            <span data-toggle="tooltip" data-placement="bottom" title="Previous Day" >T-1</span>
            </th>

            <th style={{'text-align':'center','width':'200px'}}>
            <span data-toggle="tooltip" data-placement="bottom" title="Previous 5 Day" >T-5</span>
            </th>

            <th style={{'text-align':'center','width':'200px'}}>
            <span data-toggle="tooltip" data-placement="bottom" title="Last Month">Last Month </span>
            </th>

            <th style={{'text-align':'center','width':'200px'}}>
            <span data-toggle="tooltip" data-placement="bottom" title="Last Quarter" > Last Qtr</span>
            </th>

             <th style={{'text-align':'center','width':'200px'}}>
             <span data-toggle="tooltip" data-placement="bottom" title="Last Year" > Last Year</span>
             </th>
            </tr>
            </thead>
            <tbody id="tbodyIssuerCreditStatus" style={{'border-top': '3px solid #547096'}}>
                <tbody id="tbodyIssuerCreditStatus">
   
                </tbody>
            </tbody>
            </table>
        </div>
    </div>
</div>

    );
  }
}

export default IssuerCrediRisk;
