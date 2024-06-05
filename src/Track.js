import React from 'react';
import styles from './Track.module.css';

function Track({ artist, album, track, uri, addTrackToPlaylist}) {

    const handleCLick = () => {
        addTrackToPlaylist();
    }

    return (
        <li className={styles.li}>
            <div>
                <h3 className={styles.artist}>{artist}</h3>
                <p className={styles.album}><strong>Album:</strong>{album}</p>
                <p uri={uri}>{track}</p>
            </div>
            <div className={styles.plusSign}>
                <span onClick={handleCLick}>+</span>
            </div>
        </li>
    );
}

export default Track;
