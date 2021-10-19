const router = require('express').Router();
const multer = require('multer');
const bookController = require('../../controllers/bookController');

const upload = multer({
  limits: {
    fileSize: 800000,
  },
});

router
  .route('/')
  .get(bookController.findAll)
  .post(upload.single('image'), bookController.create);

router.route('/search/:searchTerm').get(bookController.search);

router
  .route('/:id')
  .get(bookController.findById)
  .put(upload.single('image'), bookController.update)
  .delete(bookController.delete);

module.exports = router;
