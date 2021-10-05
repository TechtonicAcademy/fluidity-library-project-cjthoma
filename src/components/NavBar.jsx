/* eslint-disable jsx-a11y/control-has-associated-label */
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useState } from 'react';
import SearchBar from './SearchBar';
import '../styles/navbar.scss';

const NavBar = () => {
  const history = useHistory();
  const location = useLocation().pathname;

  const [navPos, setNavPos] = useState({ x: '-100%' });
  const { x } = navPos;

  const togleMobileNav = () => {
    if (x === '0%') return setNavPos(() => ({ x: '-100%' })); // toggle off if on
    return setNavPos(() => ({ x: '0%' }));
  };

  let title = 'The Library';
  if (location === '/add') title = 'Expand Our Collection';
  if (location === '/not-found') title = '404 Resource Not Found...';
  if (location === '/bookshelf' || location.includes('/details')) title = 'Our Bookshelf';

  return (
    <nav className="navbar">
      <button
        type="button"
        className="navbar__title"
        onClick={() => history.push('/')}
      >
        {title}
      </button>
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
      <button
        type="button"
        className="navbar__menu"
        onClick={() => togleMobileNav()}
      />
      <div className="navbarMobile" style={{ transform: `translateX(${x})` }}>
        <button
          type="button"
          className="navbarMobile__exit"
          onClick={() => togleMobileNav()}
        >
          ✕
        </button>
        <NavLink
          isActive={() => location === '/'}
          activeClassName="navbarMobile__link--selected"
          className="navbarMobile__link"
          to="/"
          onClick={() => setNavPos(() => ({ x: '-100%' }))}
        >
          Home
        </NavLink>
        <NavLink
          activeClassName="navbarMobile__link--selected"
          className="navbarMobile__link"
          to="/bookshelf"
          onClick={() => setNavPos(() => ({ x: '-100%' }))}
        >
          Bookshelf
        </NavLink>
        <NavLink
          activeClassName="navbarMobile__link--selected"
          className="navbarMobile__link"
          to="/add"
          onClick={() => setNavPos(() => ({ x: '-100%' }))}
        >
          Add Book
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
