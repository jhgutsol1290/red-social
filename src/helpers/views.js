const Video = require('../models/Video')

module.exports = {

    async viewed(){
        const videos = await Video.find()
                            .limit(3)
                            .sort({views: -1})
        return videos
    }

}