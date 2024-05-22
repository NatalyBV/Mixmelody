import React, { useState, useEffect } from 'react';
import styles from './Playlist.module.css';

function Playlist() {
    const [playlistName, setPlaylistName] = useState('');

    const handleRename = (event) => {
        setPlaylistName(event.target.value);
    }

    return (
        <div>
            <input 
                className={styles.playlistName} 
                id='playlist' 
                value={playlistName}
                name="playlist"
                placeholder="Playlist name"
                onChange={handleRename}
            />
        </div>
    )
}

export default Playlist;
