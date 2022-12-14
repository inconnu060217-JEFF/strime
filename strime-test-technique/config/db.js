const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()

const uriLocal = `mongodb://mongo_db:27017/${process.env.DB_NAME}`
mongoose
  .connect(uriLocal)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))
