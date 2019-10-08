const {Router} = require('express')
const router = Router()

const video = require('../controllers/video')
const home = require('../controllers/home')


router.get('/', home.index)
router.get('/video/:id', video.index)
router.post('/video', video.create)
router.get('/add/video', video.upload)
router.get('/search', video.search)
router.get('/pages/:page', video.pagination)
router.get('/search/date', video.searchDate)
router.get('/search/word', video.searchWord)
router.get('/filter/video', video.filter)
router.post('/video/:id/like', video.like)
router.get('/video/edit/:id', video.editVideo)
router.post('/video/edit/:id', video.editPostVideo)
router.delete('/video/:id', video.remove)
router.get('/:page', home.notFound)


module.exports = router