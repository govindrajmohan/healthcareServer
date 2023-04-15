const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const billingSchema = new Schema(
    {
        billingId: String,
        patientId: String,
        date: Date,
        amount: Number,
        status: String,
        insurance: {
          name: String,
          policyNumber: String,
          groupNumber: String
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('billing', billingSchema);  
