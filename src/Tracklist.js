import React, { useState } from 'react';
import styles from './Tracklist.module.css';
import style from './Track.module.css';

function Tracklist({ tracks, removeTrackFromPlaylist }) {

    const handleClick = (trackId) => {
        removeTrackFromPlaylist(trackId);
    }

    return (
        <div>
            <ul className={styles.tracklistList}>
                {tracks.map(track => (
                    <li key={track.id} className={style.li}>
                        <div>
                            <h3 className={style.artist}>{track.album.artists.map(artist => artist.name).join(', ')}</h3>
                            <p className={style.album}><strong>Album:</strong> {track.album.name}</p>
                            <p>{track.name}</p>
                        </div>
                        <div className={style.minusSign}>
                            <span onClick={() => handleClick(track.id)}>-</span>
                        </div>
                    </li>
                ))}
            </ul>
            <div>
                <button type="submit" className={styles.searchButton}>Save to Spotify</button>
            </div>
        </div>
    );
}

export default Tracklist;
