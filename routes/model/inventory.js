const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const inventorySchema = new Schema(
    {
        inventoryId: String,
        name: String,
        quantity: Number,
        unitPrice: Number,
        created: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('inventory', inventorySchema);  
