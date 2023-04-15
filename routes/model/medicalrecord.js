const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const recordSchema = new Schema(
    {
        
            medications: [{
              name: String,
              dosage: String,
              frequency: String
            }],
            allergies: [{
              name: String,
              reaction: String
            }],
            diagnoses: [{
              name: String,
              description: String
            }],
          
        created: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('record', recordSchema);  
