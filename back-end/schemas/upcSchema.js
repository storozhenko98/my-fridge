const mongoose = require('mongoose');

const upcSchema = new mongoose.Schema({
    upcCode: {
        type: String,
        required: true, 
        unique: true, 
    },
    name: {
        type: String, 
        required: true,
    },
    shelfLife: {
        type: String, 
        required: true, 
    },
});

module.exports = mongoose.model('upsSchema', upcSchema);