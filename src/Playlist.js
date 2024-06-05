import React, { useState, useEffect } from 'react';
import Tracklist from './Tracklist.js';
import styles from './Playlist.module.css';
import {extractAccessTokenFromUrl, getAccessToken, getStoredAccessToken, getUserId, savePlaylist, createPlaylist} from './Helper.js';

function Playlist({ tracks, removeTrackFromPlaylist }) {
    const [playlistName, setPlaylistName] = useState('');
    const [message, setMessage] = useState('');

    const handleRename = (event) => {
        setPlaylistName(event.target.value);
    }

    const handleSave = async (event) => {
        event.preventDefault();

        const trackURIs = tracks.map(track => track.uri);
        let token = getStoredAccessToken();
        if (!token) {
            token = extractAccessTokenFromUrl();
            if (!token) {
                getAccessToken();
                return;
            }
        }
        const user_id = await getUserId(token);
        const playlist_id = await createPlaylist(playlistName, token, user_id);
        await savePlaylist(token, user_id, playlist_id, trackURIs);
        setPlaylistName('');
        for (const track of tracks) {
            removeTrackFromPlaylist(track.id);
        }
        setMessage(`Your playlist ${playlistName} has been saved!`);
    };


    useEffect(() => {
        if (message) {
            const timeoutId = setTimeout(() => {
              setMessage('');
            }, 3000);
      
            return () => clearTimeout(timeoutId);
          }
    }, [message]);

    return (
        <form onSubmit={handleSave}>
            <input
                className={styles.playlistName}
                id='playlist'
                value={playlistName}
                name="playlist"
                placeholder="Playlist name"
                onChange={handleRename}
            />
            <div className={styles.line}></div>
            <Tracklist tracks={tracks} removeTrackFromPlaylist={removeTrackFromPlaylist} />
            <div>
                <button type="submit" className={styles.saveButton}>Save to Spotify</button>
            </div>
        </form>
    )
}

export default Playlist;
