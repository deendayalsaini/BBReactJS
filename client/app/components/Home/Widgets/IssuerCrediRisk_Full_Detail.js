import React from 'react';
import { Link } from 'react-router-dom';



const IssuerCrediRisk_Full_Detail = () => 
{
    return (
    <div>
        <div id="ModalIsserCreditStatus" class="modal fade" >
            <div class="modal-dialog" style={{'width': '600px','margin-top': '15%','z-index':'1000'}}>
              <div class="modal-content">
                  <div class="modal-body" style={{'font-size': '12px', 'padding': '20px'}}>
                  <button type="button" class="close" data-dismiss="modal">
                  &times</button>
                  <span id="cphMainContentPlaceHolder_Label1" style={{'font-size': '15px', 'font-weight': 'bold','padding-right':'5px'}}>Credit Risk</span>
                  <span id="spanCreditPopStatus" style={{'text-align': 'left','background-color':'yellow','color':'black'}}>
                  </span>
                  <span>&nbsp;|&nbsp;</span>
                  <span id="spanCreditPopPeriod">
                  </span>
                  <div>
                  <div  style={{'overflow': 'auto', 'width': 'auto'}} data-always-visible="1" data-rail-visible1="1" data-initialized="1">
                  <div class="" id="divBond_detail" style={{'margin-top':'-10px'}}> 
                  <div class="portlet light" style={{'padding':'3px 0px 15px'}}>
                  <div style={{'margin-top':'30px'}}>
                  <div id="chart_div" style={{'width': '555px', 'height': '250px'}}>
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
</div>
    </div>);
};

export default IssuerCrediRisk_Full_Detail;
