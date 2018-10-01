import React from 'react';
import 'whatwg-fetch';
import Header from '../Header/Header';
import IssuerTop from './IssuerTopSection';
import IssuserQuarterlyRatioAnalytics from './assets/apps/scripts/RatiosAnalytics/IssuserQuarterlyRatioAnalytics';


import { Link } from 'react-router-dom';

const MainView = ({token}) => 
{
  return (
<div>
<div>
  <Header token={token} />
</div>
<div class="page-wrapper-row full-height">
 <div class="page-wrapper-middle">
  <div class="page-container">
   <div class="page-content-wrapper">
     <div class="page-content">
      <div class="container">
          <div class="page-content-inner">
              <div class="mt-content-body">
                  <IssuerTop token={token} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="page-content" style={{'padding':'0px 0'}}>
  <div class="container">
    <div class="page-content-inner">
      <div class="mt-content-body">
               <div class="tab_container">
                      <input id="tablg" type="radio" name="tabs"  />
                      <label for="tablg" class="tabhover label"><span class="tablabel"><h4 style={{'font-size': '12px'}}>Ratios</h4></span></label> 
                      <input id="tabratio" type="radio" name="tabs" onclick="bindanalytics();" />
                      <label for="tabratio"  class="tabhover label"><span class="tablabel"><h4 style={{'font-size': '12px'}}>Analytics</h4></span></label>
                      <input id="tabcredit" type="radio" name="tabs" onclick="bindCredit();"/><label for="tabcredit" class="tabhover label" ><span class="tablabel"><h4 style={{'font-size': '12px'}}>Credit Analytics</h4></span></label>
                      <input id="tabquarterly" type="radio" name="tabs" onclick="bindLGQuarterlyAnalytics();" checked/>
                      <label for="tabquarterly" class="tabhover label" style={{'width':'14%'}}><span class="tablabel"><h4 style={{'font-size': '12px'}}>@BB Quarterly Analytics</h4></span></label>

                      <section id="contentlg" class="tab-content">
                      </section>
                      <section id="contentratio" class="tab-content">
                      </section>
                      <section id="contentcredit" class="tab-content">                                           
                      </section>
                      <section id="contentquarterly" class="tab-content">
                      <IssuserQuarterlyRatioAnalytics token={token}  />
                      </section>
                 </div>
      </div>
    </div>
  </div>
</div>
</div>
  );
};

export default MainView;
