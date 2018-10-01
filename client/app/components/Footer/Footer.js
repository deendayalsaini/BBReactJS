import React from 'react';

var ft001 = {'text-align': 'center','font-size':'11px',padding: '6px 0 2px 0'};
var ft002 = {'padding-left': '5px','padding-right': '15px'};
var ft003 = {'padding-left': '5px','padding-right': '15px','padding-top':'4px'};
var ft004 = {'padding-left': '5px','padding-right': '5px'};
var ft005 = {display: 'block'};

const Footer = () => (
  <div style={{'clear':'both'}}>

  <footer>
 <div class="page-wrapper-bottom">
    <div class="page-footer" style={ft001}>
      <div class="container">
        
               <div class="col-md-2 col-sm-2 col-xs-2 footer-block" style={ft002}>
      
            <div class="socicons">
              <a href="#" class="socicon-btn socicon-btn-circle socicon-solid bg-blue font-white bg-hover-grey-salsa socicon-twitter tooltips" data-original-title="Twitter"></a>&nbsp;&nbsp;&nbsp;<a href="#" class="socicon-btn socicon-btn-circle socicon-solid bg-red font-white bg-hover-grey-salsa socicon-facebook tooltips" data-original-title="Facebook"></a>&nbsp;&nbsp;&nbsp;<a href="#" class="socicon-btn socicon-btn-circle socicon-solid bg-dark font-white bg-hover-grey-salsa socicon-google tooltips" data-original-title="Google"></a>&nbsp;&nbsp;&nbsp;<a href="#" class="socicon-btn socicon-btn-circle socicon-solid bg-blue font-white bg-hover-grey-salsa socicon-linkedin tooltips" data-original-title="Linkedin"></a>
            </div>
          </div>
           <div class="col-md-10 col-sm-10 col-xs-10 footer-block" style={ft003}>
            <div class="col-md-7" style={ft004}>
        Copyright <a target="_blank" href="http://www.iperitus.com">
          I-Peritus Solutions &amp; Services
          Pvt. Ltd.  </a>  © 2007-2018, All Rights Reserved
        </div>
        <div class="col-md-5" style={ft004}>
          
              Phone: <b>+91-22-42934750</b>&nbsp;&nbsp;
              Email: <a href="mailto:corporate@iperitus.com"><b>corporate@iperitus.com</b></a>
            
            </div>
      </div>
    </div>
    <div class="scroll-to-top" style={ft005}>
      <i class="icon-arrow-up"></i>
    </div>
  </div>
 </div>

  </footer>
  </div>
);

export default Footer;
