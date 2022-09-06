const express = require('express')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth.routes')
const panierRoutes = require('./routes/panier.routes')
require('./config/db')

dotenv.config()
const app = express()
app.use(express.json())

const port = process.env.PORT || 8000

// routes api
app.use('/api/user', authRoutes)
app.use('/api/panier', panierRoutes)

app.listen(port, () => {
  console.log(`Server Listen on port ${port}`)
})
