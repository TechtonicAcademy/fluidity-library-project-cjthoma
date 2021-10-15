/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
const AWS = require('aws-sdk');
const { Sequelize, Author, Book } = require('../models');

AWS.config.update({ 
  region: 'us-west-1',
  accessKeyId: process.env.BUCKET_ACCESS_KEY,
  secretAccessKey: process.env.BUCKET_SECRET,
});

const s3 = new AWS.S3({ params: { Bucket: 'library-project'  } });
const upload = { 
  Key: '', 
  Body: '',
  ContentDisposition: 'inline',
  ContentType: 'image/jpeg',
  ACL: 'public-read'
};

module.exports = {
  findAll: (req, res) => {
    Book.findAll({
      include: [Author],
    })
    .then((response) => res.json(response))
    .catch((error) => res.status(500).json(error));
  },

  findById: (req, res) => {
    Book.findOne({
      include: [Author],
      where: {
        id: req.params.id,
      },
    }).then((response) => res.json(response))
      .catch((error) => res.status(500).json(error));
  },

  search: (req, res) => {
    const { searchTerm } = req.params;

    Book.findAll({
      include: [Author],
      where: {
        [Sequelize.Op.or]: [
          { title: { [Sequelize.Op.substring]: `%${searchTerm}%` } },
          { '$Author.first_name$': { [Sequelize.Op.substring]: `%${searchTerm}%` } },
          { '$Author.last_name$': { [Sequelize.Op.substring]: `%${searchTerm}%` } }
        ],
      },
    }).then((response) => {
      if(response) return res.json(response);
      return res.status(404).end();
    }).catch((error) => res.status(500).json(error));
  },

  create: async (req, res) => {
    const imageFile = req.file;
    const { first, last } = req.body;
    const bookData = {
      title: req.body.title,
      synopsis: req.body.synopsis,
      published: req.body.published,
      pages: req.body.pages,
      rating: req.body.rating,
    };

    if (imageFile !== undefined) {
      upload.Body = imageFile.buffer;
      upload.Key = imageFile.originalname;

      s3.upload(upload, (err, response) => {
        if (err) return console.log('Error', err);
        return console.log('Image Uploaded!', response.Location);
      });
    }

    try {
      const author = await Author.findOrCreate({
        where: { first_name: first, last_name: last }
      });
  
      await Book.create({ 
        ...bookData, 
        image: imageFile ? `https://library-project.s3.us-west-1.amazonaws.com/${upload.Key}` : null,
        AuthorId: author[0].dataValues.id 
      });
    } catch(error) {
      res.status(500).json(error);
      console.log('An error has occured.', error);
    };
    res.end();
  },

  update: async (req, res) => {
    const imageFile = req.file;
    const { first, last } = req.body;
    const bookData = {
      title: req.body.title,
      synopsis: req.body.synopsis,
      published: req.body.published,
      pages: req.body.pages,
      rating: req.body.rating,
    };

    if (imageFile !== undefined) {
      upload.Body = imageFile.buffer;
      upload.Key = imageFile.originalname;

      s3.upload(upload, (err, response) => {
        if (err) return console.log('Error', err);
        return console.log('Image Uploaded!', response.Location);
      });
    }

    // if image updated add new, otherwise don't update
    if(imageFile) bookData.image = `https://library-project.s3.us-west-1.amazonaws.com/${upload.Key}`;

    try {
      const author = await Author.findOrCreate({
        where: { first_name: first, last_name: last }
      });
  
      await Book.update({ 
        ...bookData, 
        AuthorId: author[0].dataValues.id 
      }, { where: { id: req.params.id } });
    } catch(error) {
      res.status(500).json(error);
      console.log('An error has occured.', error);
    };

    res.end();
  },

  delete: async (req, res) => {
    try {
      const book = await Book.findOne({ // get book data so image can be removed from s3 bucket
        where: { id: req.params.id },
      });

      await Book.destroy({
        where: { id: req.params.id },
      });

      const image = book.dataValues.image.replace('https://library-project.s3.us-west-1.amazonaws.com/', '');
      if(image) { // if book has image attached delete from s3 bucket
        s3.deleteObject({ Key: image }, (err, response) => {
          if (err) return console.log('An error has occured.', err);
          return console.log('Delete Success', response);
        });
      };

    } catch (error) {
      res.status(500).json(error);
      console.log('An error has occured.', error);
    }

    res.end();
  },
};