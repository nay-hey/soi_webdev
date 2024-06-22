import React from 'react';
import './Search.css';

function Search() {
  return (
    <div className="search">
      <h2>Search and Browse</h2>
      <input type="text" placeholder="Search for books, journals, etc." />
      <button>Search</button>
    </div>
  );
}

export default Search;
