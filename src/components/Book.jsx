import { NavLink } from 'react-router-dom';

import '../styles/book.scss';

const Book = (props) => {
  const { title, author, pages, published, synopsis, id} = props.bookData;
  return (
    <NavLink className="book" to={`/details/${id}`}>
      <img alt={title.replaceAll(' ', '_') + '_cover'} />
      <h3>{title}</h3>
      <p>{author}</p>
    </NavLink>
  );
};

export default Book;
