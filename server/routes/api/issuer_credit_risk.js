const IssuerCreditRisk = require('../../models/IssuerCreditRisk');
const IssuerCreditRiskFullDetail = require('../../models/IssuerCreditRiskFullDetail');


module.exports = (app) => {
    app.get('/api/issuer_credit_risk', (req, res, next) => {
      IssuerCreditRisk.find({}).exec(function(err, IssuerCreditRisks) {
          return res.send({
          IssuerCreditRisks
          });
      });
  });
   app.get('/api/issuer_credit_risk_fulldetail', (req, res, next) => {
   	   const { query } = req;
      const { CR } = query;
   	
   	  var wQuery={};
 
   	  	wQuery[CR]=true;
   
      IssuerCreditRiskFullDetail.find(wQuery).exec(function(err, IssuerCreditRiskFullDetails) {
          return res.send({
          IssuerCreditRiskFullDetails
          });
      });
  });
};