import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { extractAccessTokenFromUrl, searchForSongs, getAccessToken, getStoredAccessToken } from './Helper.js';

function SearchBar({ setSearchResults }) {
  const [param, setParam] = useState('');

  const handleSearch = (event) => {
    setParam(event.target.value);
  };

  const handleResults = async (event) => {
    event.preventDefault();
    
    let token = getStoredAccessToken();
        if (!token) {
            token = extractAccessTokenFromUrl();
            if (!token) {
                getAccessToken();
                return;
            }
        }
    try {
      const searchResults = await searchForSongs(token, param);
      setSearchResults(searchResults);
    } catch (error) {
      console.error('Error performing search:', error);
    }
  }

  return (
    <div>
      <form onSubmit={handleResults}>
        <div>
          <input
            className={styles.searchBar}
            id='search'
            value={param}
            name="search"
            onChange={handleSearch}
            placeholder="Search for songs"
          />
        </div>
        <div>
          <button type="submit" className={styles.searchButton}>Search</button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
