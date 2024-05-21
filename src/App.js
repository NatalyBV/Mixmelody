import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';
import Playlist from './Playlist.js';
import styles from './App.module.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h1>JAMMMING</h1>
      </header>
      <div>
        <SearchBar setSearchResults={setSearchResults} />
        <div className={styles.container}>
          <div className={styles.resultsContainer}>
            <SearchResults results={searchResults} />
          </div>
          <div className={styles.playlistContainer}>
            <Playlist />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
