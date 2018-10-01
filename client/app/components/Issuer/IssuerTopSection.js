import React from 'react';

const IssuerTopSection = ({token}) => {
  if (!token) {
    return null;
  }
  return (
    <div>
   <div class="page-title">
    <div>
    <div  class="floatLeft">
        <h4 class="issuerTopHedareH4">
          <a class="issuerTopHedareH4anc" title="Cement" href="#"><i class="fa fa-cubes fa-lg"></i></a>
          <a href="http://bonds.pixstox.com/market/issuer/issuerdetail/2318"  class="textdecorationnone">  MAHINDRA &amp; MAHINDRA FINANCIAL SERVICES LTD. </a>
        </h4>
    </div>
    </div>
</div>

<div class="page-toolbar" style={{'float':'right'}} >
  <div class="floatLeft"> 
      <div class="issuerTop001">
      <a title="Add to Portfolio" id="ancAddToPortfolio" class="hover-color-briefcase Portfolio issuerTop002" data-url="Stocks/Company" controltype="menu" data-private="true">
      <i class="fa fa-briefcase issuerTop003"></i>
      </a>
      <a title="Add to Tracklist" id="ancAddToTrackList" data-toggle="modal" data-target="#exampleModal" class="hover-color-suitcase TrackList issuerTop004" data-url="Stocks/Company" controltype="menu" data-private="true">
      <i class="fa fa-suitcase"></i>
      </a>
      <a title="Set Alert" id="ancSetAlert" class="hover-color-fa-bell-o NotificationSettings issuerTop005" data-url="Stocks/Company" controltype="menu" data-private="true">
      <i class="fa fa-bell-o issuerTop006" ></i>
      </a>
      </div>
       <h4 class="issuerTop007">Ratios &amp; Analytics&nbsp;&nbsp;</h4>
       <div class="btn-group btn-theme-panel issuerTop008" style={{'display':'none'}}>
       <a href="javascript:;" class="btn btn-default dropdown-toggle issuerTop009" type="button" data-toggle="dropdown" ><i class="fa fa-bars fa-3"></i></a>
       <ul>

<li><a tabindex="-1" href="http://bonds.pixstox.com/market/issuer/RatioAnalytics/2318">Ratios &amp; Analytics</a></li>
<li><a tabindex="-1" href="http://bonds.pixstox.com/market/issuer/DebtAnalysis/2318">@BondBoard Credit</a></li>
<li><a tabindex="-1" href="http://bonds.pixstox.com/market/issuer/issuerbonds/2318">Bonds</a></li>
<li><a tabindex="-1" href="http://bonds.pixstox.com/market/issuer/PriceHistory/2318">Price History</a></li>
<li><a tabindex="-1" href="http://bonds.pixstox.com/market/issuer/maturityprofile/2318">Maturity Profile</a></li>
<li><a tabindex="-1" href="http://bonds.pixstox.com/market/issuer/issuerdocuments/2318">Documents</a></li>
<li><a tabindex="-1" href="http://bonds.pixstox.com/market/issuer/discussions/2318">Discussions</a></li>
<li><a tabindex="-1" href="http://bonds.pixstox.com/market/issuer/issueralerts/2318">Alerts</a></li>
</ul>
       </div>
  </div>
 </div>
</div>
  );
};

export default IssuerTopSection;
