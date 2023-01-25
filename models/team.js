const mongoose = require('mongoose')
const { type } = require('os')
const Schema = mongoose.Schema

const teamSchema = new Schema({
    name: {type: String, required: true},
    img: {type: String, required: true},
    record: {type: String, required: true},
    conference: {type: String, required: true},
    division: {type: String, required: true},
    playoffs: Boolean
})

module.exports = mongoose.model('Team', teamSchema)