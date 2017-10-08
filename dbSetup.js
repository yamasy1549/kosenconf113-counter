const MONGO_URL     = process.env.MONGODB_URI || 'mongodb://localhost/jsonAPI'
const mongoose      = require('mongoose')
const autoIncrement = require("mongoose-auto-increment")

const db = mongoose.connect(MONGO_URL, { useMongoClient: true })
autoIncrement.initialize(db)

const TeamSchema  = require('./models/team')
TeamSchema.pre("save", function(next){
  this.date = new Date()
  next()
})
TeamSchema.plugin(autoIncrement.plugin, 'Test')
const Team = mongoose.model('Team', TeamSchema)

module.exports = {
  Team
}
