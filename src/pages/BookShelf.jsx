import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollToTop } from '../utils/hooks';
import { getBooks } from '../utils/API';
import SearchBar from '../components/SearchBar';

import '../styles/bookshelf.scss';
import Book from '../components/Book';

const BookShelf = () => {
  useScrollToTop();
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const location = useLocation();
  const searchTerm = location.state;

  useEffect(() => {
    getBooks()
      .then((response) => {
        setBooks(response.data);
        setSearchResults(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setSearchResults(() => {
        return books.filter((book) => {
          return (
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
      });
    } else setSearchResults(books);
  }, [searchTerm, books]);

  return (
    <section className="bookshelf">
      <h3 className="bookshelf__title">Knowledge is Power!</h3>
      <SearchBar type="mobile" />
      {searchResults.length ? (
        <section className="bookshelf__container">
          {searchResults.map(({ title, author, synopsis, image, id }) => (
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
          We couldn't find that book,
          <Link to="/add">visit our add page to expand our collection!</Link>
        </section>
      )}
    </section>
  );
};

export default BookShelf;
