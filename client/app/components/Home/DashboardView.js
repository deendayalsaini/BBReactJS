import React from 'react';
import 'whatwg-fetch';
import Header from '../Header/Header';
import News from './Widgets/News';
import SpotAndForward from './Widgets/SpotAndForward';
import BondCurve from './Widgets/BondCurve';
import TrackList from './Widgets/TrackList';
import YieldCurve from './Widgets/YieldCurve';
import IssuerCrediRisk from './Widgets/IssuerCrediRisk';
import IssuerCrediRisk_Full_Detail from './Widgets/IssuerCrediRisk_Full_Detail';


import { Link } from 'react-router-dom';

const DashboardView = ({token}) => 
{
  return (
<div>
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
           <div class="row">
               <div class="col-md-12 col-sm-12">
                    <IssuerCrediRisk />
                    <IssuerCrediRisk_Full_Detail />
               </div>
            </div>

           <div class="row">
               <div class="col-md-8 col-sm-8">
                    <News />
               </div>
                <div class="col-md-4 col-sm-4">
                   <SpotAndForward />
               </div>
            </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
  );
};

export default DashboardView;
