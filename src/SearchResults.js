import React, { useState, useEffect } from 'react';
import styles from './SearchResults.module.css';
import Playlist from './Playlist.js';

function SearchResults({ results }) {
    return (
        <div>
            <div>
                <h2>Results</h2>
            </div>
            {results.length > 0 ? (
                <div>
                    <ul className={styles.resultsList}>
                        {console.log(results)}
                        {results.map((track) => (
                            <li key={track.id}>
                                <div>
                                    <h3>{track.album.artists.map(artist => artist.name).join(', ')}</h3>
                                    <p>{track.name}</p>
                                </div>
                                <div className={styles.plusSign}>
                                    +
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <div>Let's find some cool music!</div>
                </div>
            )}
        </div>
    );
}

export default SearchResults;
