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
  const [bookData, setBookData] = useState({ // set default place holder image
    tmpImage:
      'https://library-project.s3.us-west-1.amazonaws.com/default_book_cover.jpg',
  });

  if (!id) return { bookData, setBookData };

  useEffect(() => {
    getBook(id)
      .then((response) => {
        const { title, Author, published, rating, synopsis, pages, image } =
          response.data;

        let tmp = bookData.tmpImage;
        if (image) tmp = image; // un-set default image if bookData contains valid image

        return setBookData((prevState) => ({
          ...prevState,
          title,
          first: Author.first_name,
          last: Author.last_name,
          pages: parseInt(pages),
          published,
          rating,
          synopsis,
          image,
          tmpImage: tmp,
        }));
      })
      .catch(() => {
        return history.push('/bookshelf');
      });
  }, []);

  return { bookData, setBookData };
}
