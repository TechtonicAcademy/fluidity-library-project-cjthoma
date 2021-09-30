/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from "react";
import { getBook } from './API';

export function useScrollToTop() {
  useEffect(() => {
    if (window.pageYOffset > 0) window.scroll(0, 0);
  }, []);
}

export function useBookData(id) {
  const [bookData, setBookData] = useState({});

  useEffect(() => {
    getBook(id)
      .then((response) => {
        const { title, author, published, rating, synopsis, image } = response.data;
        return setBookData((prevState) => ({
          ...prevState,
          title,
          author,
          published,
          rating,
          synopsis,
          image,
        }));
      })
      .catch((error) => {
        console.log('An error has occurred.', error);
        return history.push('/bookshelf');
      });
  }, []);

  return bookData;
}
