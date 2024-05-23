import React, { useState, useEffect } from 'react';
import Tracklist from './Tracklist.js';
import styles from './Playlist.module.css';

function Playlist({tracks, removeTrackFromPlaylist}) {
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
            <div className={styles.line}></div>
            <Tracklist tracks = {tracks} removeTrackFromPlaylist = {removeTrackFromPlaylist} />
            <div>
                <button type="submit" className={styles.searchButton}>Save to Spotify</button>
            </div>
        </div>
    )
}

export default Playlist;
