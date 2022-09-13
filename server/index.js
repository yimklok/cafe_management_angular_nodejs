const express = require('express')
const cors = require('cors')

const usersRoute = require('./routes/users')
const categoryRoute = require('./routes/category')
const productsRoute = require('./routes/products')
const billRoute = require('./routes/bill')
const dashboardRoute = require('./routes/dashboard')

const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/user',usersRoute)
app.use('/category',categoryRoute)
app.use('/pruduct',productsRoute)
app.use('/bill',billRoute)
app.use('/dashboard',dashboardRoute)

module.exports = app