import { NavLink, useLocation } from "react-router-dom";
import '../styles/navbar.scss';


const NavBar = () => {
  const location = useLocation().pathname;

  let title = 'The Library';
  if (location === '/add') title = 'Expand Our Collection';
  if (location === '/not-found') title = '404 Resource Not Found...';
  if (location === '/bookshelf' || location.includes('/details')) title = 'Our Bookshelf';

  return (
    <nav className="navbar">
      <h2 className="navbar__title">{title}</h2>
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

      <div className="navbar__searchbar">
        <input type="text" placeholder="Search.." />
        <button className="button" type="submit" value="Go">
          Go
        </button>
      </div>
      {/* MOBILE MENU */}
      <div className="navbar__menu" />
    </nav>
  );
};

export default NavBar;
