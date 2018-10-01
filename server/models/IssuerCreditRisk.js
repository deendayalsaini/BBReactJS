const mongoose = require('mongoose');

const IssuerCreditRiskSchema = new mongoose.Schema({
  CR: {
    type: Array,
    default: null
  },
});

module.exports = mongoose.model('issuer_credit_risks', IssuerCreditRiskSchema);
