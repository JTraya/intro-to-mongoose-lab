const mongoose = require('mongoose')

const custSchema = new mongoose.Schema({
    name: String,
    age: Number
})

const Customers = mongoose.model('Customers', custSchema);

module.exports = Customers