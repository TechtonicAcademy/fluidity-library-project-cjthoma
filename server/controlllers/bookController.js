/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
const { Sequelize, Author, Book } = require('../models');

module.exports = {
  findAll: (req, res) => {
    Book.findAll()
    .then((response) => res.json(response))
    .catch((error) => res.status(500).json(error));
  },

  findById: (req, res) => {
    Book.findOne({
      where: {
        id: req.params.id,
      },
    }).then((response) => res.json(response))
      .catch((error) => res.status(500).json(error));
  },

  search: (req, res) => {
    const { title, first_name, last_name } = req.query;

    Book.findAll({
      include: [Author],
      where: {
        [Sequelize.Op.or]: [
          { title: { [Sequelize.Op.substring]: `%${title}%` } },
          { '$Author.first_name$': { [Sequelize.Op.substring]: `%${first_name}%` } },
          { '$Author.last_name$': { [Sequelize.Op.substring]: `%${last_name}%` } }
        ],
      },
    }).then((response) => {
      if(response) return res.json(response);
      return res.status(404).end();
    }).catch((error) => res.status(500).json(error));
  },

  create: async (req, res) => {
    let { first_name, last_name } = req.body;
    first_name = req.body.author.split(' ')[0];
    last_name = req.body.author.split(' ')[1];
    const bookData = {
      title: req.body.title,
      synopsis: req.body.synopsis,
      published: req.body.published,
      pages: req.body.pages,
      rating: req.body.rating,
    };

    try {
      const author = await Author.findOrCreate({
        where: { first_name, last_name }
      });
  
      await Book.create({ ...bookData, image: '', AuthorId: author[0].dataValues.id });
    } catch(error) {
      res.status(500).json(error);
    };
    res.end();
  },

  update: (req, res) => {

  },

  delete: (req, res) => {
    Book.destroy({
      where: { id: req.params.id },
    })
      .then(() => res.end())
      .catch((error) => res.status(500).json(error));
  },
};

// router.get('/author/:first_name/:last_name', (req, res) => {
//   findByAuthor(req.params)
//     .then((reponse) => res.json(reponse))
//     .catch((err) => res.status(500).end());
// });

// router.get('/search', (req, res) => {

// });

// /* POST ROUTES */
// router.post('/add', (req, res) => {
//   const { first_name, last_name } = req.body;
//   const bookData = {
//     title: req.body.title,
//     synopsis: req.body.synopsis,
//     published: req.body.published,
//     pages: req.body.pages,
//     rating: req.body.rating,
//     image: req.body.image,
//   };

//   findByAuthor(first_name, last_name)
//     .then((findAuthorRes) => {
//       if (findAuthorRes) {
//         createBook({ ...bookData, AuthorId: findAuthorRes.dataValues.id }, res);
//       }

//       createAuthor({ first_name, last_name }).then((author) => {
//         return createBook({ ...bookData, AuthorId: author.dataValues.id }, res);
//       });
//     })
//     .catch(() => {
//       res.status(500).end();
//     });
// });

// /* FUNCTIONS */
// function createBook(bookData, res) {
//   return Book.create(bookData)
//     .then((response) => {
//       res.status(200).json(response);
//     })
//     .catch((error) => {
//       res.status(500).send(error);
//     });
// };

// function createAuthor (authorData) {
//   return Author.create(authorData);
// };

// function findByAuthor (first_name, last_name) {
//   return Author.findOne({
//     where: {
//       first_name: {
//         [Sequelize.Op.substring]: `%${first_name}%`,
//       },
//       last_name: {
//         [Sequelize.Op.substring]: `%${last_name}%`,
//       },
//     },
//   });
// };
