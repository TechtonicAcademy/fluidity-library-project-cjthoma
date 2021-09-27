import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { getImage } from '../utils/API';
import '../styles/book.scss';

const Book = ({ title, author, synopsis, image, id }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.addEventListener('mousemove', (event) => {
      setMousePosition((prevState) => ({
        ...prevState,
        x: event.pageX,
        y: event.pageY,
      }));
    });
  }, []);

  return (
    <NavLink className="book" to={`/details/${id}`}>
      <img src={getImage(title)} alt={image} />
      <h3>{title}</h3>
      <h4>{author}</h4>
      <p className="book__synopsis" style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}>
        {synopsis.slice(0, 220)}...
        <span>Click to find out more →</span>
      </p>

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
