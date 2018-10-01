const mongoose = require('mongoose');


const Spot_ForwardSchema = new mongoose.Schema({
FW: {
    type: Array,
    default: null
  }
});


module.exports = mongoose.model('spot_forward_rate', Spot_ForwardSchema);