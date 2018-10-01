const CorporateBondIssuer = require('../../models/CorporateBondIssuer');

module.exports = (app) => {
    app.get('/api/issuer/quarterlyanalytics', (req, res, next) => {

   	   const { query } = req;
      const { ID } = query;
   	
   	  var wQuery={};
 
   	  	wQuery["IssuerId"]=ID;

      CorporateBondIssuer.find({"IssuerId":'2318'}).exec(function(err, CorporateBondIssuers) {
          return res.send({
          CorporateBondIssuers
          });
      });
  });

};