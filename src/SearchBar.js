import React, { useState } from 'react';
import styles from './SearchBar.module.css'

function SearchBar() {
    const [search, setSearch] = useState('');

    function handleSearch(e) {
        e.preventDefault();
    }

    return (
        <>
            <div>
                <input className={styles.searchBar} id='search' value={search} name="search" onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div>
                <button type="submit" className={styles.searchButton}>Search</button>
            </div>
        </>
    )
}

export default SearchBar;
