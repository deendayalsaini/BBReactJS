import React from 'react';

import { Link } from 'react-router-dom';

import Menu from './Menu';



var pageheader = {display: 'block'};
var hd002 = {'text-decoration': 'none'};
var hd003 = {margin: '13.5px 0 0'};
var hd004 = {'text-align':'center','padding':'20px',display:'none'};
var hd005 = {height:'60px'};
var hd006 = {width: '310px'};


const Header = ({token,ev}) => 
{
  if (token) {
    return (
    <div>

    <div class="page-wrapper-row">
    <div class="page-wrapper-top">
      <div class="page-header" style={pageheader}>
        <div class="page-header-top fixed" style={{'background':'white'}}>
          <div class="container">

            <div class="page-logo" style={hd006} >
              <a href="/" style={hd002} title="@BondBoard">
                    <img src="/assets/global/img/loangrid_logo1.jpg"  height="52%" alt="@BondBoard" class="logo-default" style={hd003}/>
              </a>
            </div>
           <div class="divRightMenu" style={{'margin-top': '-54px'}} >
<div class="top-menu">
    <ul class="nav navbar-nav pull-right">
    <li>
            <div class="isshareddata">
             <form class="search-form" action="http://bonds.pixstox.com/search" method="GET">
                          <div class="input-group formSubmit001" >
                            <input id="txtHeaderSearch formSubmit002" class="form-control  ui-autocomplete-input" placeholder="Search Bond,Deal,ISIN,Issuer" name="query"  autocomplete="off" type="text" style={{'height': '34px'}}/>
                              <span class="input-group-btn formSubmit003">
                                <a href="javascript:;" class="btn submit formSubmit004" >
                                  <i class="fa fa-search">
                                  </i>
                                </a>
                              </span>
                            </div>
                        </form>
            </div>
         
      </li>


<li class="dropdown dropdown-user  isshareddata">
            <Menu />
                  </li>   

                   </ul>
</div>
            </div>
          </div>
        </div>
        <div class="page-header-menu fixed">
          <div class="container">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="loadinpan" class="loading-info loading" style={hd004}><img src="/assets/global/img/logo-loader.gif" style={hd005} /></div>
  </div>);
  }
  return (
   <div>
    <div class="page-wrapper-row">
    <div class="page-wrapper-top">
      <div class="page-header" style={pageheader}>
        <div class="page-header-top fixed">
          <div class="container">
            <div class="page-logo" style={hd006}>
              <a href="home" style={hd002} title="@BondBoard">
                    <img src="/assets/global/img/loangrid_logo1.jpg"  height="52%" alt="@BondBoard" class="logo-default" style={hd003}/>
              </a>
            </div>
            <a href="javascript:;" class="menu-toggler"></a>
          </div>
        </div>
        <div class="page-header-menu fixed">
          <div class="container">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="loadinpan" class="loading-info loading" style={hd004}><img src="/assets/global/img/logo-loader.gif" style={hd005} /></div>



  </div>
  );
};

export default Header;
