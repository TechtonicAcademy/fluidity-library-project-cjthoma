import { NavLink, useLocation } from "react-router-dom";
import '../styles/navbar.scss';


const NavBar = () => {
  const location = useLocation();

  let title = 'Welcome to the Library';
  if (location.pathname === '/add') title = 'Add A Book to Our Collection';
  if (location.pathname === '/not-found') title = '404 Resource Not Found...';
  if (location.pathname.includes('/books')) title = 'BOOOOOOK!';

  return (
    <nav className="navbar">
      <h2 className="navbar__title">{title}</h2>
      <NavLink className="navbar__link" to="/">
        Home
      </NavLink>
      <NavLink className="navbar__link" to="/details">
        Book Details
      </NavLink>
      <NavLink className="navbar__link" to="/add">
        Add Book
      </NavLink>
      <div className="navbar__searchbar">
        <input type="text" placeholder="Search.." />
        <button type="submit" value="Go">
          Go
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
