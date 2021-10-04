import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { getImage } from '../utils/API';
import '../styles/book.scss';

const Book = ({ title, author, synopsis, image, id }) => {

  return (
    <NavLink className="book" to={`/details/${id}`}>
      <img src={getImage(title)} alt={image} />
      <h3>{title.length > 17 ? `${title.slice(0, 17)}...` : title}</h3>
      <h4>{author}</h4>
    </NavLink>
  );
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  // image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Book;
