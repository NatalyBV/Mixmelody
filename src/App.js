import React, { useState } from 'react';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';
import Playlist from './Playlist.js';
import styles from './App.module.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);

  const addTrackToPlaylist =(track) => {
    if (!selectedTracks.some(selectedTrack => selectedTrack.id === track.id)) {
      setSelectedTracks([track, ...selectedTracks]);
    }
  }

  const removeTrackFromPlaylist = (trackIdToRemove) => {
    setSelectedTracks((selectedTracks) =>
    selectedTracks.filter(selectedTrack => selectedTrack.id !== trackIdToRemove));
  }
  
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h1>Mixmelody</h1>
      </header>
      <div>
        <SearchBar setSearchResults={setSearchResults} />
        <div className={styles.container}>
          <div className={styles.resultsContainer}>
            <SearchResults results={searchResults} addTrackToPlaylist={addTrackToPlaylist} />
          </div>
          <div className={styles.tracklistContainer}>
            <Playlist tracks={selectedTracks} removeTrackFromPlaylist={removeTrackFromPlaylist}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
