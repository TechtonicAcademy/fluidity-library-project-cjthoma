const router = require('express').Router();
const bookController = require('../../controlllers/bookController');

// const multer = require('multer');

// const formToRequest = multer({
//   limits: {
//     fileSize: 8000000,
//   },
// });

router.route('/').get(bookController.findAll).post(bookController.create);
router.route('/search').get(bookController.search);

router
  .route('/:id')
  .get(bookController.findById)
  .put(bookController.update)
  .delete(bookController.delete);

module.exports = router;
