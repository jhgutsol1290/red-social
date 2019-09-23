const {Schema, model} = require('mongoose')
const path = require('path')

const videoSchema = new Schema({
    title: {type: String, unique: true},
    description: {type: String},
    authors: {type: String},
    filename: {type: String},
    duration: {type: Number},
    views: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    link: {type: String},
    timestamp: {type: Date, default: Date.now},
    date: {type: Date}
})

videoSchema.virtual('uniqueId')
    .get(function(){
        return this.filename.replace(path.extname(this.filename), '')
    })

module.exports = model('Video', videoSchema)
