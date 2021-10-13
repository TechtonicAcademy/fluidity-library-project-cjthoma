module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      pages: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
          min: 1,
        },
      },
      published: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true,
        },
      },
      synopsis: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: [0, 5000],
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
          min: 0,
          max: 5,
        },
      },
      image: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
    },
    {
      paranoid: true,
    }
  );

  Book.associate = ({ Author }) => {
    Book.belongsTo(Author, {
      onDelete: 'CASCADE',
      foreingKey: {
        allowNull: false,
      },
    });
  };

  return Book;
};
