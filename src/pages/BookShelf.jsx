import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getBooks } from '../utils/API';

import '../styles/bookshelf.scss';
import Book from '../components/Book';

const BookShelf = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (window.pageYOffset > 0) window.scroll(0, 0);
    getBooks()
      .then(({ data: books }) => setBooks(books))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="bookshelf">
      <div className="navbar__searchbar--mobile">
        <input type="text" placeholder="Search.." />
        <button type="submit" value="Go">
          Go
        </button>
      </div>
      <h3 className="bookshelf__title">Knowledge is Power!</h3>
      {books ? (
        <section className="bookshelf__container">
          {books.map((book) => (
            <Book
              key={book.id}
              author={book.author}
              title={book.title}
              synopsis={book.synopsis}
              image={book.image}
              id={book.id}
            />
          ))}
        </section>
      ) : (
        <section className="bookshelf__container">
          The Library is empty,{' '}
          <NavLink to="/add">add a few books to get things started!</NavLink>
        </section>
      )}
    </section>
  );
};

export default BookShelf;
