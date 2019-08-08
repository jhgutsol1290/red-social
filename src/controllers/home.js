const ctrl = {}
const Video = require('../models/Video')
const stats = require('../helpers/stats')
const Videos = require('../helpers/videos')
const views = require('../helpers/views')

ctrl.index = async (req, res) => {
    let perPage = 6
    let page = req.params.page || 1
    const stats1 = await stats()
    const views1 = await views.viewed()
    const popularVideos = await Videos.popular()
    const videosTitle = await Video.distinct("title")
    const videos = await Video.find({})
                                .skip((perPage*page) - perPage)
                                .limit(perPage)
                                .sort({timestamp: -1})
                                .exec((err, videos)=>{
                                    Video.countDocuments((err, countDocuments)=>{
                                        if (err) return next(err)
                                        res.render('index', {
                                            current: page,
                                            pages: Math.ceil(countDocuments / perPage),
                                            'videosTitle': videosTitle,
                                            'videos': videos,
                                            'stats': stats1,
                                            'popular': popularVideos,
                                            'views': views1
                                        })
                                    })
                                })
}

ctrl.notFound = (req, res) => {
    res.render('error')
}

module.exports = ctrl