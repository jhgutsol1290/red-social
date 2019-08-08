const path = require('path')
const { randomNumber } = require('../helpers/libs')
const fs = require('fs-extra')
const Video = require('../models/Video')
const md5 = require('md5')
const stats = require('../helpers/stats')
const views = require('../helpers/views')
const Videos = require('../helpers/videos')

const ctrl = {}


ctrl.index = async (req, res) => {
    const id = req.params.id

    const video = await Video.findById(id)
    if(!video){
        return res.status(404).json({
            ok: false,
            error: {
                message: 'Not found id'
            }
        })
    }

    video.views = video.views + 1
    await video.save()

    res.render('profile', {video})

}

ctrl.create = (req, res) => {
    const saveVideo = async () =>{
        const videoUrl = randomNumber()
        const videos = await Video.find({filename: videoUrl})
        if(videos.length > 0){
            saveVideo()
        }else{
            const videoTempPath = req.file.path
            const ext = path.extname(req.file.originalname).toLowerCase()
            const targetPath = path.resolve(`src/public/upload/${videoUrl}${ext}`)

            if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === 'gif'){
                await fs.rename(videoTempPath, targetPath)
                const newVideo = new Video({
                    title: req.body.title,
                    description: req.body.description,
                    authors: req.body.authors,
                    filename: videoUrl + ext,
                    link: req.body.link,
                    date: req.body.date
                })
                const videoSaved = await newVideo.save()
                res.redirect('/add/video')
            }else{
                await fs.unlink(videoTempPath)
                res.status(500).json({
                    error: 'Only videos are allowed'
                })
            }
        }
    }
    saveVideo()
}

ctrl.upload = (req, res) => {
    res.render('upload')
}

ctrl.search = async (req, res) => {
    const {title} = req.query
    const stats1 = await stats()
    const views1 = await views.viewed()
    const popularVideos = await Videos.popular()
    const videos = await Video
                            .find({$or: [{title: {$regex: '.*'+title+'.*', $options: 'i'}}]})
                            .sort({timestamp: -1})
    const videosTitle = await Video.distinct( "title" )
    res.render('index', {
        'videosTitle': videosTitle,
        'videos': videos,
        'stats': stats1,
        'popular': popularVideos,
        'views': views1,
        current: 1,
        pages: 1
    })
}

ctrl.searchDate = async (req, res) => {
    let {date} = req.query
    newDate = new Date(date)
    const stats1 = await stats()
    const views1 = await views.viewed()
    const popularVideos = await Videos.popular()
    const videos = await Video
                            .find({date: newDate})
                            .sort({timestamp: -1})
    const videosTitle = await Video.distinct( "title" )
    res.render('index', {
        'videosTitle': videosTitle,
        'videos': videos,
        'stats': stats1,
        'popular': popularVideos,
        'views': views1,
        current: 1,
        pages: 1
    })
}

ctrl.searchWord = async (req, res) => {
    const {word} = req.query
    const stats1 = await stats()
    const views1 = await views.viewed()
    const popularVideos = await Videos.popular()
    const videosTitle = await Video.distinct( "title" )
    const videos = await Video.find({$or: [{title: {$regex: '.*'+word+'.*', $options: 'i'}}, 
                                    {description: {$regex: '.*'+word+'.*', $options: 'i'}}]})
    res.render('index', {
        'videosTitle': videosTitle,
        'videos': videos,
        'stats': stats1,
        'popular': popularVideos,
        'views': views1,
        current: 1,
        pages: 1
    })
}

ctrl.pagination = async (req, res) => {
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

ctrl.like = async (req, res) => {
    const video = await Video.findOne({filename: {$regex: req.params.id}})
    if(video){
        video.likes += 1
        await video.save()
        res.json({likes: video.likes})
    }else{
        res.status(500).json({
            error: 'Internal server error'
        })
    }
}

ctrl.remove = async (req, res) => {
    const video = await Video.findOne({filename: {$regex: req.params.id}})
    if(video){
        await fs.unlink(path.resolve('./src/public/upload/' + video.filename))
        await video.remove()
        res.json(true)
    }else{
        res.status(500).json({
            error: 'Internal server error'
        })
    }
}


module.exports = ctrl
