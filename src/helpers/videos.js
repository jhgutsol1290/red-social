const Video = require('../models/Video')

module.exports = {

    async popular(){
        const videos = await Video.find()
                            .limit(3)
                            .sort({likes: -1})
        return videos
    }

}