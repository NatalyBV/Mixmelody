import React, { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({setSearchResults}) {
    const [param, setParam] = useState('');

    const handleSearch = (event) => {
        setParam(event.target.value);
    };

    const performSearch = async (term) => {

        const token = 'BQBtAD5CgKbGFQ4tEtpLXEQd3DXpKlF0GOq470W1lx5q2vx9lq0nsfcfo8OzAmNVppOh8fFv12g7fwQ72BrS1FrC4HlghcsNUQ2_jDlT85vC8Sy0OnA';
        const baseUrl = 'https://api.spotify.com/v1';
        const discoverMusicEndpoint = '/search';
        const requestParams = `?q=${term}&type=track&access_token=${token}`;
        const urlToFetch = baseUrl + discoverMusicEndpoint + requestParams;

        try {
          const response = await fetch(urlToFetch);
          if (!response.ok) {
            throw new Error('Failed to fetch search results');
          }
          const data = await response.json();
          const tracks = data.tracks.items;
          const filteredTracks = tracks.filter(track => 
            track.name.toLowerCase().includes(term.toLowerCase())
          );
          console.log(filteredTracks);
          return filteredTracks;
        } catch (error) {
          console.error('Error performing search:', error);
          return [];
        }
      };

    const handleResults = async (event) => {
        event.preventDefault();
        const results = await performSearch(param);
        setSearchResults(results);
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
                    />
                </div>
                <div>
                    <button type="submit" className={styles.searchButton}>Search</button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar;
