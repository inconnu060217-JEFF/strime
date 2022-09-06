const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()

const uriLocal = `mongodb://db:27017/${process.env.DB_LOCAL_NAME}`
mongoose
  .connect(uriLocal)
  .then(() => console.log('Connecter a la base de données'))
  .catch((e) => console.log('erreur de la connection a la base de données', e))

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db...')
})
