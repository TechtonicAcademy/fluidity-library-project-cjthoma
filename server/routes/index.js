const router = require('express').Router();
const path = require('path');
const api = require('./api');

router.use('/api', api);
router.route('/').get((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
});

module.exports = router;
