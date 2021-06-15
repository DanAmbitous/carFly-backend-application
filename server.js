if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const PORT = process.env.PORT || 2689
const indexRouter = require('./routes/index')
const path = require('path')
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
const db = mongoose.connection
db.on('error', () => console.log(error))
db.once('open', () => console.log('Connected to the DB!'))

app.set('view engine', 'ejs')
//From where the views are coming from
app.set('views', path.join(__dirname, 'views'))
//All files will be put in the layout structer so no DRY in HTML
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

//What to server on the root URL
app.use('/', indexRouter)

app.listen(PORT, () => console.log(`Running server on port ${PORT}`))