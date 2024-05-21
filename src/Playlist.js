import React, { useState } from 'react';
import styles from './Playlist.module.css';

function Playlist() {
    return (
        <div>
            <ul className={styles.playlistList}>
                <li>
                    <div>
                        <h3>Lilu45</h3>
                        <p>Fest</p>
                    </div>
                    <div className={styles.minusSign}>
                        -
                    </div>
                </li>
            </ul>
            <div>
                <button type="submit" className={styles.searchButton}>Save to Spotify</button>
            </div>
        </div>
    )
}

export default Playlist;
