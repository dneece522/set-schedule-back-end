const router = require('express').Router()
const profilesCtrl = require('../controllers/profiles.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)

router.post('/:id/courses', checkAuth, profilesCtrl.createCourse)
router.get('/:id', checkAuth, profilesCtrl.show)
router.put('/:profileId/courses/:courseId', checkAuth, profilesCtrl.updateCourse)

module.exports = router
