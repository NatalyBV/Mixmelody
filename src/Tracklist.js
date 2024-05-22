import React, { useState } from 'react';
import styles from './Tracklist.module.css';

function Tracklist() {
    return (
        <div>
            <ul className={styles.tracklistList}>
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

export default Tracklist;
