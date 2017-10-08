const Team = require('./dbSetup').Team

const createTeam = (name) => {
  let team = new Team()
  team.name = name
  team.score = 0
  team.save(function(err) {
    if(err) res.send(err)
  })
}

const createSeeds = () => {
  if(Team.find({name: 'red'}) == []) createTeam('red')
  if(Team.find({name: 'white'}) == []) createTeam('white')
}

module.exports = createSeeds
