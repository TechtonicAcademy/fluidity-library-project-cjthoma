import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../styles/book.scss';

const Book = ({ title, first, last, image, id }) => {
  return (
    <NavLink className="book" to={`/details/${id}`}>
      <img
        crossOrigin="true"
        src={image ? image : 'https://library-project.s3.us-west-1.amazonaws.com/default_book_cover.jpg'}
        alt={`${title}_book_cover`}
      />
      <h3>{title.length > 17 ? `${title.slice(0, 17)}...` : title}</h3>
      <h4>
        {first} {last}
      </h4>
    </NavLink>
  );
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  first: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Book;
