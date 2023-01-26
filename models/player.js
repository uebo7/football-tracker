const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playerSchema = new Schema({
    name: {type: String, required: true},
    number: {type: Number, required: true},
    team: {type: String, required: true},
    touchdowns: {type: Number, required: true},
    position: {type: String, required: true},
})

module.exports = mongoose.model('player', playerSchema)