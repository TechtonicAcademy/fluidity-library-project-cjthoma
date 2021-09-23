import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getImage } from '../utils/API';
import '../styles/book.scss';

const Book = ({ bookData }) => {
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

  const { title, author, synopsis, image, id } = bookData; // pages, published, synopsis

  console.log()

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

export default Book;

function getImage(title) {
  const sourceMap = {
    "Ender's Game"    : () => { return require('../assets/images/enders_game_cover.jpg') },
    "The Martian"     : () => { return require('../assets/images/the_martian_cover.jpg') },
    "Ready Player One": () => { return require('../assets/images/ready_player_one_cover.jpg') },
    "default"         : () => { return require('../assets/images/enders_game_cover.jpg') },
  };

  if (!sourceMap[title]) return sourceMap.default();
  return sourceMap[title]();
}
