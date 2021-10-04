/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getBook } from './API';

export function useScrollToTop() {
  useEffect(() => {
    if (window.pageYOffset > 0) window.scroll(0, 0);
  }, []);
}

export function useGetBookDataOnload(id) {
  const history = useHistory();
  const [bookData, setBookData] = useState({});

  useEffect(() => {
    getBook(id)
      .then((response) => {
        const { title, author, published, rating, synopsis, pages, image } =
          response.data;
        return setBookData((prevState) => ({
          ...prevState,
          title,
          author,
          pages: parseInt(pages),
          published,
          rating,
          synopsis,
          image,
        }));
      })
      .catch(() => {
        return history.push('/bookshelf');
      });
  }, []);

  return { bookData, setBookData };
}
