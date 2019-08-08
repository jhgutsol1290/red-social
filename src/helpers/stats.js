const Video = require('../models/Video')

async function imagesCounter(){
    return await Video.countDocuments()
}

async function viewsTotalCounter(){
    const result = await Video.aggregate([{$group: {
        _id: '1',
        viewsTotal: {$sum: '$views'}
    }}])
    return result[0].viewsTotal
}

async function likesTotalCounter(){
    const result = await Video.aggregate([{$group: {
        _id: '1',
        likesTotal: {$sum: '$likes'}
    }}])
    return result[0].likesTotal
}

module.exports = async function(){

    const results = await Promise.all([
        imagesCounter(),
        viewsTotalCounter(),
        likesTotalCounter()
    ])

    return{
        videos: results[0],
        views: results[1],
        likes: results[2]
    }
}