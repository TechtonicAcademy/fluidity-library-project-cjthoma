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
