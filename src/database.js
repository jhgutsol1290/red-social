const mongoose = require('mongoose')
const {URI} = require('./keys')

mongoose.connect(URI, ({
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
}))
    .then(db=>console.log('DB connected'))
    .catch(e=>console.error(e))
