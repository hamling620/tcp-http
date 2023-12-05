const router = require('express').Router()

router.get('/', (req, res) => {
  res.end('/user')
})
router.get('/add', (req, res) => {
  res.end('/user add')
})
router.get('/remove', (req, res) => {
  res.end('/user remove')
})

module.exports = router
