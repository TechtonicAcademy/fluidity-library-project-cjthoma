import { NavLink } from 'react-router-dom';
import '../styles/book.scss';

const Book = ({ bookData }) => {
  const { title, author, synopsis, image, id } = bookData; // pages, published, synopsis
  const imageSrc = getImage(title);

  return (
    <NavLink className="book" to={`/details/${id}`}>
      <img src={imageSrc} alt={image} />
      <h3>{title}</h3>
      <p>{author}</p>
    </NavLink>
  );
};

export default Book;

function getImage (title) {
  const sourceMap = {
    "Ender's Game"    : () => { return require('../assets/images/enders_game_cover.jpg') },
    "The Martian"     : () => { return require('../assets/images/the_martian_cover.jpg') },
    "Ready Player One": () => { return require('../assets/images/ready_player_one_cover.jpg') },
    "default"         : () => { return require('../assets/images/enders_game_cover.jpg') },
  };

  if(!sourceMap[title]) return sourceMap['default']();
  return sourceMap[title]();
}
