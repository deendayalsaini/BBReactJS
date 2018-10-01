import React from 'react';





class IssuserQuarterlyRatioAnalytics extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {

        const script = document.createElement("script");
        script.src = "../../assets/apps/scripts/IssuserQuarterlyRatioAnalyticsSource.js";
        script.async = true;
        document.body.appendChild(script);
    }
  render() {
    return (
     <div>
<div style={{background: 'none repeat scroll 0 0 #eeeeee', borderBottom: '1px solid #999999',
    bordertop: '1px solid #cccccc', padding: '5px', margintop: '5px'}}>
    <div class="row">
        <div class="col-xs-12 col-md-6">
            <div id="divCurrency1" style={{paddingTop: '4px', float: 'left'}}>
                <table>
                    <tbody><tr>
                        <td style={{paddingRight: '10px', verticalAlign: 'middle'}}>
                            <select id="selQtrRatioAnalytics"  onchange="selQtrRatioAnalytics()"  class="selectfilterCAG form-control" style={{padding: '4px 0px 4px 10px !important', height: '27px'}} disabled="disabled">
  <option value="Consolidated">Consolidated</option>
  <option selected="selected" value="Standalone">Standalone</option>

</select>
                        </td>

                           <td style={{paddingRight: '10px', verticalAlign: 'middle'}}>
                            
                        </td>

                        <td style={{paddingRight: '10px', borderLeft: '1px solid #999 !important'}}>

&nbsp;&nbsp;&nbsp;&nbsp;
    <a onclick="QACollapseAllNode()" href="#"><i class="fa fa-chevron-up" aria-hidden="true"></i>&nbsp;
Collapse All</a>&nbsp;&nbsp;&nbsp;&nbsp;
    <a onclick="QAExpendAllNode()" href="#"><i class="fa fa-chevron-down" aria-hidden="true"></i>&nbsp;
Expand All</a>


                        </td>
                   
                    </tr>
                </tbody></table>
            </div>
        </div>
        <div class="col-xs-12 col-md-6 ipreports_nav">
            <table style={{float: 'right'}}>
                <tbody><tr>
                    <td style={{paddingRight: '10px', verticalAlign: 'middle'}}>
         
 <a id="Qbntprevpage" onclick="Qbntprevpage()" href="#"><i class="fa fa-chevron-left" aria-hidden="true"></i>&nbsp;
Previous</a>&nbsp;&nbsp;&nbsp;&nbsp;
    <a id="Qbntnextpage" onclick="Qbntnextpage()" href="#">
Next&nbsp;&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i></a>

                    </td>

                    <td style={{paddingRight: '10px', borderLeft: '1px solid #999 !important'}}>
                    </td>
                    <td style={{paddingRight: '5px', verticalAlign: 'middle'}}>
                        <span class="add-on add_on_funSel" style={{verticalAlign: 'top', display: 'inline-block',
                            padding: '4px 0px 4px 0px'}}>Units</span>
                    </td>
                    <td style={{paddingRight: '10px', verticalAlign: 'middle'}}>

<select  onchange="QtrAnnqtyUnitChange()" id="QAselectUnit" class="selectfilterCAG form-control" style={{padding: '4px 0px 4px 10px !important',height: '27px'}}>
><option value="1" selected="selected">Lakh</option><option value="0.1">Million</option><option value="0.01">Crore</option><option value="0.0001">Billion</option>
</select>
                    </td>
                    <td style={{paddingRight: '10px', borderLeft: '1px solid #999 !important'}}>
                    </td>
                    <td style={{paddingRight: '5px', verticalAlign: 'middle'}}>
                        <span class="add-on add_on_funSel" style={{verticalAlign: 'top', display: 'inline-block',
                            padding: '4px 0px 4px 0px'}}>Currency</span> 
                    </td>
                    <td style={{paddingRight: '10px', verticalAlign: 'middle'}}>
                        
                        
                        <select name="QAddlCurrency" disabled="disabled" onchange="" id="QAddlCurrency" class="selectfilterCAG form-control" data-private="true" style={{padding: '4px 0px 4px 10px !important',
                            height: '27px'}}>
                         
                                       <option value="INR" >INR</option>
                              

                             </select>
                    </td>
                    <td style={{paddingRight: '10px', borderLeft: '1px solid #999 !important'}}>
                    </td>
                    <td style={{paddingRight: '5px', verticalAlign: 'middle'}}>
                        <span class="add-on add_on_funSel" style={{verticalAlign: 'top', display: 'inline-block',
                            padding: '4px 0px 4px 0px'}}>Export to</span>
                    </td>
                    <td>
                        <span style={{verticalAlign: 'top',display: 'inline-block', padding: '2px 1px 4px 4px'}}>
                            <a id="ExcelExportQA" target="_blank" href="#">
                                <img src="/assets/layouts/layout3/img/Excelicon.gif" id="cphMainContentPlaceHolder_ctl00_Img1" alt="export to excel" style={{height: '24px'}} width="20" height="20"/>
                            </a></span>
                    </td>
                    <td>
                        <span style={{verticalAlign: 'top', display: 'inline-block', padding: '2px 1px 4px 4px'}}>
                            <a id="ExcelExportPdf" target="_blank" href="#">
                                <img src="/assets/layouts/layout3/img/pdf_icon.gif" id="cphMainContentPlaceHolder_ctl00_Img4" alt="export to pdf" width="20" height="20"/></a> </span>
                    </td>
                </tr>
            </tbody></table>
        </div>
    </div>
</div>
<input id="Qhdfront_js_path" type="hidden" value="" />
<input id="QhdDeal_Issuer" type="hidden" value="" />


<div id="tableContainerQuarterlyAnalytics" style={{width:'100%', marginleft:'0px', margintop:'10px'}}> 


</div>

     </div>


    );
  }
}

export default IssuserQuarterlyRatioAnalytics;
