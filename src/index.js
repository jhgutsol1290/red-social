const express = require('express')
const morgan = require('morgan')
const path = require('path')
const multer = require('multer')
const errorHandler = require('errorhandler')
const flash = require('connect-flash')

const app = express()

require('./database')
const routes = require('./routes')

//Settings
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(multer({dest: path.join(__dirname, '/public/upload/temp')}).single('image'))

//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Routes
app.use(routes)

//Error handler
if('development' === app.get('env')){
    app.use(errorHandler())
}

//Static files
app.use('/public', express.static(path.join(__dirname, ('public'))))


app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`)
})