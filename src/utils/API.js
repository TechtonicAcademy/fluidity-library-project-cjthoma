import axios from 'axios';

export const getBooks = () => {
  return axios.get(`http://localhost:3000/books`);
};

export const getBook = (id) => {
  return axios.get(`http://localhost:3000/books/${id}`);
};

export const addBook = (bookData) => {
  return axios.post(`http://localhost:3000/books`, bookData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteBook = (id) => {
  return axios.delete(`http://localhost:3000/books/${id}`);
};

export const getImage = (title) => {
  const sourceMap = {
    "Ender's Game"    : () => { return require('../assets/images/enders_game_cover.jpg') },
    "The Martian"     : () => { return require('../assets/images/the_martian_cover.jpg') },
    "Ready Player One": () => { return require('../assets/images/ready_player_one_cover.jpg') },
    "default"         : () => { return require('../assets/images/default_book_cover.jpg') },
  };

  if (!sourceMap[title]) return sourceMap.default();
  return sourceMap[title]();
};
