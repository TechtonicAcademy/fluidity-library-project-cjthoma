import axios from 'axios';

export const getBooks = () => {
  return axios.get(`http://localhost:3000/books`);
};

export const getBook = (id) => {
  return axios.get(`http://localhost:3000/books/${id}`);
};
