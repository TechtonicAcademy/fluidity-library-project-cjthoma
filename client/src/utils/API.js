/* eslint-disable prettier/prettier */
/* eslint-disable global-require */

import axios from 'axios';

export const getBooks = () => {
  return axios.get(`http://localhost:8080/api/book`);
};

export const getBook = (id) => {
  return axios.get(`http://localhost:8080/api/book/${id}`);
};

export const addBook = (bookData) => {
  return axios.post(`http://localhost:8080/api/book`, bookData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const editBook = (id, bookData) => {
  return axios.patch(`http://localhost:8080/api/book/${id}`, bookData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteBook = (id) => {
  return axios.delete(`http://localhost:8080/api/book/${id}`);
};

export const getImage = (title) => {
  const sourceMap = {
    "1984"            : () => { return require('../assets/images/1984_book_cover.jpg')},
    "The Thing"       : () => { return require('../assets/images/the_thing_book_cover.jpg') },
    "Ender's Game"    : () => { return require('../assets/images/enders_game_cover.jpg') },
    "The Martian"     : () => { return require('../assets/images/the_martian_cover.jpg') },
    "Ready Player One": () => { return require('../assets/images/ready_player_one_cover.jpg') },
    "Speaker For the Dead": () => { return require('../assets/images/speaker_for_the_dead_cover.jpg') },
    "default"         : () => { return require('../assets/images/default_book_cover.jpg') },
  };

  if (!sourceMap[title]) return sourceMap.default();
  return sourceMap[title]();
};
