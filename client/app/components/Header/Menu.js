import React from 'react';

import { Link } from 'react-router-dom';


class Menu extends React.Component {
   render() {
      return (<div>
           <a id="menuPulldown" href="#" class="dropdown-toggle" data-toggle="dropdown" data-delay="1000" data-close-others="false" style={{'paddingBottom': '-5px !important', 'fontSize':'12px'}}>
              <div class="menuRightSubmenu" style={{'backgroundRepeat': 'no-repeat', 'height': '20px', 'width': '20px', 'marginTop': '9px', 'marginLeft': '0px', 'marginRight': '7px','verticalAlign': 'bottom'}}></div>
            </a>
            <ul class="dropdown-menu dropdown-menu-default">
              <li class="" id="liMainMenuConatiner2" style={{'minWidth':'195px'}}>
                <a data-hover="dropdown" class="test"  style={{'cursor':'pointer'}} data-private="N" controltype="menu" data-url="#" >Dashboard  </a>
              </li>
              <li class="dropdown-submenu pull-left" id="liMainMenuConatiner2" style={{'minWidth':'195px'}}>
                <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="">  Market</a>
                <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}>
                  <li style={{'minWidth':'160px'}}>
                    <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >Yield Curve</a>
                    <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}></ul>
                  </li>
                  <li style={{'minWidth':'160px'}}>
                    <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >Pricing</a>
                    <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}></ul>
                  </li>
                  <li style={{'minWidth':'160px'}}>
                    <a tabindex="-1" style={{'cursor':'pointer'}} href="/Issuer/RatiosAnalytics" data-private="Y" controltype="menu" data-url="#" >Issuers</a>
                    <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}></ul>
                  </li>
                  <li style={{'minWidth':'160px'}}>
                    <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >Trades</a>
                    <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}></ul>
                  </li>
                  <li style={{'minWidth':'160px'}}>
                    <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >New Issuance</a>
                    <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}></ul>
                  </li>
                </ul>
              </li>
              <li class="dropdown-submenu pull-left" id="liMainMenuConatiner2" style={{'minWidth':'195px'}}>
                <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="">  Bonds</a>
                <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}>
                  <li style={{'minWidth':'160px'}}>
                    <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >Listing</a>
                    <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}></ul>
                  </li>
                  <li style={{'minWidth':'160px'}}>
                    <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >Screener</a>
                    <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}></ul>
                  </li>
                  <li style={{'minWidth':'160px'}}>
                    <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >ABS</a>
                    <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}></ul>
                  </li>
                  <li class="dropdown-submenu pull-left hasmenu" style={{'minWidth':'195px'}}>
                    <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#"> Corporate</a>
                    <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}>
                      <li style={{'minWidth':'160px'}}>
                        <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >Corporate Bonds</a>
                        <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}>
                          <li style={{'minWidth':'160px'}}>
                            <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >Corporate</a>
                          </li>
                        </ul>
                      </li>
                      <li style={{'minWidth':'160px'}}>
                        <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >High Yield Bonds</a>
                        <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}>
                          <li style={{'minWidth':'160px'}}>
                            <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >Corporate</a>
                          </li>
                        </ul>
                      </li>
                      <li style={{'minWidth':'160px'}}>
                        <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >Distressed Bonds</a>
                        <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}>
                          <li style={{'minWidth':'160px'}}>
                            <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >Corporate</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li class="dropdown-submenu pull-left hasmenu" style={{'minWidth':'195px'}}>
                    <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#"> Govt &amp; Muni</a>
                    <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}>
                      <li style={{'minWidth':'160px'}}>
                        <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >Government Bonds</a>
                        <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}>
                          <li style={{'minWidth':'160px'}}>
                            <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >Govt &amp; Muni</a>
                          </li>
                        </ul>
                      </li>
                      <li style={{'minWidth':'160px'}}>
                        <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >Municipal Bonds</a>
                        <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}>
                          <li style={{'minWidth':'160px'}}>
                            <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >Govt &amp; Muni</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li style={{'minWidth':'160px'}}>
                    <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >Compare</a>
                    <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}></ul>
                  </li>
                </ul>
              </li>
              <li class="dropdown-submenu pull-left" id="liMainMenuConatiner2" style={{'minWidth':'195px'}}>
                <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="">  Portfolio</a>
                <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}>
                  <li style={{'minWidth':'160px'}}>
                    <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >Portfolio</a>
                    <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}></ul>
                  </li>
                  <li style={{'minWidth':'160px'}}>
                    <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >Tracklist</a>
                    <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}></ul>
                  </li>
                </ul>
              </li>
              <li class="" id="liMainMenuConatiner2" style={{'minWidth':'195px'}}>
                <a data-hover="dropdown" class="test" tabindex="-1" aria-expanded="false" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >Connections  </a>
                <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}></ul>
              </li>
              <li class="dropdown-submenu pull-left" id="liMainMenuConatiner2" style={{'minWidth':'195px'}}>
                <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="">  Alerts</a>
                <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}>
                  <li style={{'minWidth':'160px'}}>
                    <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >My Alerts</a>
                    <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}></ul>
                  </li>
                  <li style={{'minWidth':'160px'}}>
                    <a tabindex="-1" style={{'cursor':'pointer'}} data-private="Y" controltype="menu" data-url="#" >Notifications</a>
                    <ul class="dropdown-menu dropdown-menu-default" style={{'marginRight':'0px', 'width':'195px !important', 'position': 'absolute'}}></ul>
                  </li>
                </ul>
              </li>
            </ul>
         </div>
      );
   }
}


export default Menu;
