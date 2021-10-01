import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollToTop } from '../utils/hooks';
import { getBooks } from '../utils/API';
import SearchBar from '../components/SearchBar';

import '../styles/bookshelf.scss';
import Book from '../components/Book';

const BookShelf = () => {
  useScrollToTop();
  let [books, setBooks] = useState([]);

  const location = useLocation();
  const searchTerm = location.state;

  useEffect(() => {
    getBooks()
      .then(({ data: books }) => setBooks(books))
      .catch((error) => console.log(error));
  }, []);

  if (searchTerm) {
    books = books.filter((book) => {
      return book.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  return (
    <section className="bookshelf">
      <h3 className="bookshelf__title">Knowledge is Power!</h3>
      <SearchBar type="mobile" />
      {books.length ? (
        <section className="bookshelf__container">
          {books.map(({ title, author, synopsis, image, id }) => (
            <Book
              key={id}
              author={author}
              title={title}
              synopsis={synopsis}
              image={image}
              id={id}
            />
          ))}
        </section>
      ) : (
        <section className="bookshelf__container">
          The Library is empty,{' '}
          <Link to="/add">add a few books to get things started!</Link>
        </section>
      )}
    </section>
  );
};

export default BookShelf;
