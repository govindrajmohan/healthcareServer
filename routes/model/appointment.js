const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
    {
            appointmentId: String,
            patientId: String,
            date: Date,
            reason: String,
            notes: String,
          
        created: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('appointment', appointmentSchema);  
