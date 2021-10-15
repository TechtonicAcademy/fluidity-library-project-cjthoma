import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollToTop } from '../utils/hooks';
import { getBooks, searchBook } from '../utils/API';
import SearchBar from '../components/SearchBar';

import '../styles/bookshelf.scss';
import Book from '../components/Book';

const BookShelf = () => {
  useScrollToTop();
  const [books, setBooks] = useState([]);

  const location = useLocation();
  const searchTerm = location.state;

  useEffect(() => {
    if (searchTerm) {
      return searchBook(searchTerm)
        .then((response) => setBooks(response.data))
        .catch((error) => console.log(error));
    }

    return getBooks()
      .then((response) => setBooks(response.data))
      .catch((error) => console.log(error));
  }, [searchTerm]);

  return (
    <section className="bookshelf">
      <h3 className="bookshelf__title">Knowledge is Power!</h3>
      <SearchBar type="mobile" />
      {books.length ? (
        <section className="bookshelf__container">
          {books.map(({ title, Author, synopsis, image, id }) => (
            <Book
              key={id}
              author={Author}
              first={Author.first_name}
              last={Author.last_name}
              title={title}
              synopsis={synopsis}
              image={image}
              id={id}
            />
          ))}
        </section>
      ) : (
        <section className="bookshelf__container">
          We couldn't find that book,
          <Link to="/add">visit our add page to expand our collection!</Link>
        </section>
      )}
    </section>
  );
};

export default BookShelf;
