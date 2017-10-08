const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TeamSchema = new Schema({
  name: { type: String, require: true },
  score: { type: Number, require: true }
})

module.exports = TeamSchema
