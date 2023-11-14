const mongoose = require('mongoose');

/*const singleton = new mongoose.Schema({
    itemType: {
        type: String, 
        required: true, 
    }, 
    purchaseDate: {
        type: String,
        required: true,
    },
    expirationDate: {
        type: String, 
    }
})*/
const itemsSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true,
    }, 
    items : Array
});

module.exports = mongoose.model('Items', itemsSchema);