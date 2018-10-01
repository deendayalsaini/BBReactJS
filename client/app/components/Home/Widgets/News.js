import React from 'react';


class News extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {

    }
  render() {
    return (
        <div class="portlet light ">
          <div class="portlet-title">
              <div class="caption caption-md">
                  <i class="icon-bar-chart font-dark hide"></i><span class="caption-subject font-green-steel uppercase">
                      News</span> <span class="caption-helper"></span>
              </div>
          </div>
          <div class="portlet-body">
           
        <div class="scroller" style={{'height': '338px', 'overflow': 'hidden', 'width': 'auto'}} data-always-visible="1" data-rail-visible1="0" data-handle-color="#D7DCE2" data-initialized="1">
                  <div id="NewsItem" class="general-item-list">
                    <div class="item">
                      <div class="item-head">
                        <div class="item-details">
                          <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Finance">
                            <i class="fa fa-bank fa-lg"></i>
                          </span>&nbsp;&nbsp;&nbsp;
                          <a href="#" class="item-name primary-link">Gujarat State Petroleum Cor. 9.80% 2073</a>
                          <span class="item-label">Gujarat State Petroleum Cor. 9.80% 2073</span>
                        </div>
                        <span class="item-status">
                          <span class="badge badge-empty badge-success"></span>Bond
                        </span>
                      </div>
                      <div class="item-body">GUJARAT STATE PETROLEUM CORPORATION, 9.80% 22mar2073, INR, issue information: issuer, comment, quotes, payment, ratings.</div>
                    </div>
                    <div class="item">
                      <div class="item-head">
                        <div class="item-details">
                          <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Finance">
                            <i class="fa fa-cubes fa-lg"></i>
                          </span>&nbsp;&nbsp;&nbsp;
                          <a href="#" class="item-name primary-link">TATASTL-1180TATAS99</a>
                          <span class="item-label">TATA STEEL LIMITED - 1180TATAS99</span>
                        </div>
                        <span class="item-status">
                          <span class="badge badge-empty badge-success"></span>Bond
                        </span>
                      </div>
                      <div class="item-body"> Corporate  | Callable | - |  -  | Maturity 31-Dec-99 | BSE | Private </div>
                    </div>
                    <div class="item">
                      <div class="item-head">
                        <div class="item-details">
                          <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Finance">
                            <i class="fa fa-bank fa-lg"></i>
                          </span>&nbsp;&nbsp;&nbsp;
                          <a href="#" class="item-name primary-link">Indian Railway Finance 8.72% 2034 (Series-70 "D")</a>
                          <span class="item-label">Indian Railway Finance 8.72% 2034 (Series-70 "D")</span>
                        </div>
                        <span class="item-status">
                          <span class="badge badge-empty badge-success"></span>Bond
                        </span>
                      </div>
                      <div class="item-body"> INE053F09HB6 ISIN Database. INDIAN RAILWAY FINANCE CORP LTD -8.72% SEC NON CUM TAX NCB 70TH D SERIES PN PP LOA-RED DT 04.05.2034 ...</div>
                    </div>
                    <div class="item">
                      <div class="item-head">
                        <div class="item-details">
                          <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Finance">
                            <i class="fa fa-plug fa-lg"></i>
                          </span>&nbsp;&nbsp;&nbsp;
                          <a href="#" class="item-name primary-link">NTPC 9.3473% 2032 (S-XLVI) STRPP-O</a>
                          <span class="item-label">NTPC 9.3473% 2032 (S-XLVI) STRPP-O</span>
                        </div>
                        <span class="item-status">
                          <span class="badge badge-empty badge-success"></span>Bond
                        </span>
                      </div>
                      <div class="item-body"> NTPC LIMITED # 9.3473% SEC NON CUM RTD RED TAX MARKT NCB ... RED TAX MARKT NCB SR-XLVI STRPP - O PP- RD DT 20.07.2032, 100 000.0000. </div>
                    </div>
                  </div>
                </div>
                <div class="slimScrollBar" style={{'background': 'rgb(215, 220, 226)', 'width': '7px', 'position': 'absolute', 'top': '0px', 'opacity': '0.4', 'display': 'none', 'borderRadius': '7px', 'zIndex': '99', 'right': '1px', 'height': '338px'}}></div>
                <div class="slimScrollRail" style={{'width': '7px', 'height': '100%', 'position': 'absolute', 'top': '0px', 'display': 'none', 'borderRadius': '7px', 'background': 'rgb(234, 234, 234)', 'opacity': '0.2', 'zIndex': '90', 'right': '1px'}}></div>
              </div>
             <div class="task-footer">
                  <div class="btn-arrow-link pull-right">
                      <a href="#">See All News</a> <i class="icon-arrow-right"></i>
                  </div>
              </div>
        </div>
    );
  }
}

export default News;
