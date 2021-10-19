module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define(
    'Author',
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 100],
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 100],
        },
      },
    },
    {
      paranoid: true,
    }
  );

  Author.associate = ({ Book }) => {
    Author.hasMany(Book);
  };

  return Author;
};
