import React, { useState } from 'react';
import styles from './Playlist.module.css';

function Playlist() {
    const [search, setSearch] = useState('');

    function handleSearch(e) {
        e.preventDefault();
    }

    return (
        <>
            <div>
                <div>
                    <ul className={styles.playlistList}>
                        <li>
                            <div>
                                <h3>Imagine Dragons</h3>
                                <p>Thunder</p>
                            </div>
                        <div className={styles.minusSign}>
                            -
                        </div>
                        </li>
                        <li>
                            <div>
                                <h3>Green Day</h3>
                                <p>American Idiot</p>
                            </div>
                        <div className={styles.minusSign}>
                            -
                        </div>
                        </li>
                        <li>
                            <div>
                                <h3>Red Hot Chilli Pappers</h3>
                                <p>Around the World</p>
                            </div>
                        <div className={styles.minusSign}>
                            -
                        </div>
                        </li>
                        <li>
                            <div>
                                <h3>Taylor Swift</h3>
                                <p>Bad Blood</p>
                            </div>
                        <div className={styles.minusSign}>
                            -
                        </div>
                        </li>
                        <li>
                            <div>
                                <h3>Foo Fighters</h3>
                                <p>All My Life</p>
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
            </div>
        </>
    )
}

export default Playlist;
