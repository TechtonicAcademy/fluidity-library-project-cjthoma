import { NavLink, useLocation } from "react-router-dom";
import '../styles/navbar.scss';


const NavBar = () => {
  const location = useLocation().pathname;

  let title = 'The Library';
  if (location === '/add') title = 'Expand Our Collection';
  if (location === '/not-found') title = '404 Resource Not Found...';
  if (location.includes('/details')) title = 'BOOOOOOK!';

  return (
    <nav className="navbar">
      <h2 className="navbar__title">{title}</h2>
      <NavLink className={`navbar__link ${location === '/' ? 'navbar__link--selected' : '' }`} to="/">
        Home
      </NavLink>
      <NavLink className={`navbar__link ${location.includes('/bookshelf') ? 'navbar__link--selected' : '' }`} to="/bookshelf">
        Book Shelf
      </NavLink>
      <NavLink className={`navbar__link ${location === '/add' ? 'navbar__link--selected' : '' }`} to="/add">
        Add Book
      </NavLink>
      <div className="navbar__searchbar">
        <input type="text" placeholder="Search.." />
        <button type="submit" value="Go">
          Go
        </button>
      </div>
      {/* MOBILE MENU */}
      <div className="navbar__menu" />
    </nav>
  );
};

export default NavBar;
