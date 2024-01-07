const express = require('express')
const { getGoals, postGoals, putGoals, deleteGoals } = require('../controllers/goalsController')
const router = express.Router()

// router.get('/', getGoals)
// router.post('/', postGoals)
router.route('/').get(getGoals).post(postGoals)
router.route('/:id').put(putGoals).delete(deleteGoals)

module.exports = router