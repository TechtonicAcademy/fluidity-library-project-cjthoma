import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useRef } from 'react';
import SearchBar from './SearchBar';
import '../styles/navbar.scss';

const NavBar = () => {
  const history = useHistory();
  const location = useLocation().pathname;

  let title = 'The Library';
  if (location === '/add') title = 'Expand Our Collection';
  if (location === '/not-found') title = '404 Resource Not Found...';
  if (location === '/bookshelf' || location.includes('/details')) title = 'Our Bookshelf';

  return (
    <nav className="navbar">
      <h2 className="navbar__title" onClick={() => history.push('/')}>
        {title}
      </h2>
      <div className="navbar__container">
        <NavLink
          isActive={() => location === '/'}
          activeClassName="navbar__link--selected"
          className="navbar__link"
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          activeClassName="navbar__link--selected"
          className="navbar__link"
          to="/bookshelf"
        >
          Bookshelf
        </NavLink>
        <NavLink
          activeClassName="navbar__link--selected"
          className="navbar__link"
          to="/add"
        >
          Add Book
        </NavLink>
      </div>

      <SearchBar type="desktop" />
      {/* MOBILE MENU */}
      <div className="navbar__menu" />
    </nav>
  );
};

export default NavBar;
