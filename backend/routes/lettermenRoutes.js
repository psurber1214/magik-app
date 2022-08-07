var express = require('express')
var router = express.Router()
var auth = require('../middleware/auth.js')

var { getLettermen, getLettermanById, editLetterman, createLetterman, resetMembership, searchLettermen } = require('../controllers/lettermenController.js')

router.route('/').get(auth, getLettermen)
router.route('/').post(auth, createLetterman)
router.route('/reset').get(auth, resetMembership)
router.route('/:id').get(/*auth,*/ getLettermanById).put(auth, editLetterman)
router.route('/search/:terms').get(/*auth,*/ searchLettermen)

module.exports = router