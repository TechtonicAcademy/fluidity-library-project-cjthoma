import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import '../styles/searchbar.scss';

const SearchBar = ({ type }) => {
  const history = useHistory();
  const location = useLocation();
  const searchTerm = location.state;
  const searchRef = useRef();

  const handleSearchSubmit = () => {
    const input = searchRef.current.value;
    history.push({
      pathname: '/bookshelf',
      search: `?search=${input}`,
      state: input,
    });
  };

  const handleClearSearch = () => {
    searchRef.current.value = '';
    if (!searchTerm) return;
    history.push('/bookshelf');
  };

  return (
    <div className={`searchbar searchbar--${type}`}>
      <input ref={searchRef} type="text" placeholder={searchTerm ? searchTerm : 'Search...'} />
      <button
        className="button"
        type="button"
        onClick={() => handleSearchSubmit()}
      >
        Go
      </button>
      <button
        className="clearSearch"
        type="button"
        onClick={() => handleClearSearch()}
      >
        ✕
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SearchBar;
