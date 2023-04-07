const express = require('express')
const cors = require('cors')

const app = express()

app.use(
    express.json(),
    cors({ credentials: true, origin: 'http://localhost:3000' }),
    express.static('public')
)

/* ROUTES */

const UserRoutes = require('./routes/UserRoutes')
app.use('/users', UserRoutes)

const PetRoutes = require('./routes/PetRoutes')
app.use('/pets', PetRoutes)

app.listen(3000)