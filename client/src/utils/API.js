/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
import axios from 'axios';

export const getBooks = () => {
  return axios.get(`http://localhost:8080/api/book`);
};

export const getBook = (id) => {
  return axios.get(`http://localhost:8080/api/book/${id}`);
};

export const searchBook = (searchTerm) => {
  return axios.get(`http://localhost:8080/api/book/search/${searchTerm}`);
};

export const addBook = (bookData) => {
  return axios.post(`http://localhost:8080/api/book`, bookData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const editBook = (id, bookData) => {
  return axios.put(`http://localhost:8080/api/book/${id}`, bookData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteBook = (id) => {
  return axios.delete(`http://localhost:8080/api/book/${id}`);
};
