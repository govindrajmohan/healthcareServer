const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const patientSchema = new Schema(
    {
        patientId: String,
        firstName: String,
        lastName: String,
        email: String,
        dateOfBirth: Date,
        gender: String,
        created: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('patient', patientSchema);  
