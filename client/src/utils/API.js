/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
import axios from 'axios';

const apiRoute = 'http://localhost:8080/api/book/';

export const getBooks = () => {
  return axios.get(apiRoute);
};

export const getBook = (id) => {
  return axios.get(apiRoute + id);
};

export const searchBook = (searchTerm) => {
  return axios.get(apiRoute + `search/${searchTerm}`);
};

export const addBook = (bookData) => {
  return axios.post(apiRoute, bookData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const editBook = (id, bookData) => {
  return axios.put(apiRoute + id, bookData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteBook = (id) => {
  return axios.delete(apiRoute + id);
};
