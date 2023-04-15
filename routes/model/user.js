const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        provider: {
            type: String,
            required: true
          },
          googleId: {
            type: String,
            required: true,
            unique: true
          },
          name: {
            type: String,
            required: true
          },
          accessToken: {
            type: String,
            required: true
          },
        created: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('user', userSchema);  
