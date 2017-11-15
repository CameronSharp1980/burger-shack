var mongoose = require('mongoose')


var schema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    ingredients: [{ type: String }]
})


module.exports = mongoose.model('Side', schema)