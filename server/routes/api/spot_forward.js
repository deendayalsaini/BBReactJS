const Spot_Forward = require('../../models/Spot_Forward');

module.exports = (app) => {
    app.get('/api/spot_forward', (req, res, next) => {
      Spot_Forward.find({}).exec(function(err, Spot_Forward) {
          return res.send({
          Spot_Forward
          });
      });
  });

};