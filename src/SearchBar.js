import React, { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({setSearchResults}) {
    const [param, setParam] = useState('');

    const handleSearch = (event) => {
        setParam(event.target.value);
    };

    const performSearch = async (term) => {

        const token = 'BQCqCPPxGCjOxIi0KSnXlxvnoTfSQWMrsQSijLaecK1j6PyK3sNejmXJ5ZsQo_aA3pB0S6DCXRv51xj6rMqbEQ6k1_W5Ex2neu_Om0PiXduvq5iqg1E';
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
