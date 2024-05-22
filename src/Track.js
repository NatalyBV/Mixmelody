import React from 'react';
import styles from './Track.module.css';

function Track({ artist, album, track}) {
    return (
        <li className={styles.li}>
            <div>
                <h3 className={styles.artist}>{artist}</h3>
                <p className={styles.album}><strong>Album:</strong>{album}</p>
                <p>{track}</p>
            </div>
            <div className={styles.plusSign}>
                +
            </div>
        </li>
    );
}

export default Track;
