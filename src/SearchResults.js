import React, { useState, useEffect } from 'react';
import styles from './SearchResults.module.css';
import Playlist from './Playlist.js';
import Track from './Track.js';

function SearchResults({ results }) {
    return (
        <div>
            <div>
                <h2>Results</h2>
            </div>
            {results.length > 0 ? (
                <div>
                    <ul className={styles.resultsList}>
                        {results.map((track) => (
                            <Track 
                                key={track.id}
                                artist={track.album.artists.map(artist => artist.name).join(', ')} 
                                album={track.album.name} 
                                track={track.name}
                            />
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
