import { useState, useEffect } from 'react';
import { useScrollToTop } from '../utils/hooks';
import { Link } from 'react-router-dom';
import { getBooks } from '../utils/API';

import '../styles/bookshelf.scss';
import Book from '../components/Book';

const BookShelf = () => {
  useScrollToTop();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks()
      .then(({ data: books }) => setBooks(books))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="bookshelf">
      <h3 className="bookshelf__title">Knowledge is Power!</h3>
      <div className="bookshelf__searchbar--mobile">
        <input type="text" placeholder="Search.." />
        <button type="button" value="Go">
          Go
        </button>
      </div>
      {books ? (
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
