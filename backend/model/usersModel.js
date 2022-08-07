const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    teams: [
      {
        game: { type: String },
        pokemon: [
          {
            pokemonId: { type: String },
          },
        ],
      },
    ],
    games: [
      {
        game: { type: String },
        generation: { type: String },
        system: { type: String },
      },
    ],
  },
  {
    collection: 'user',
  }
)

const Users = mongoose.model('users', UserSchema)

module.exports = Users
