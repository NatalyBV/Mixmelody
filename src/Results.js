import React, { useState } from 'react';
import styles from './Results.module.css';

function Results() {
    const [search, setSearch] = useState('');

    function handleClick(e) {
        e.preventDefault();
    }

    return (
        <>
            <div>
                <div>
                    <h2>Results</h2>
                </div>
                <div>
                    <ul className={styles.resultsList}>
                        <li>
                            <div>
                                <h3>Imagine Dragons</h3>
                                <p>Thunder</p>
                            </div>
                        <div className={styles.plusSign} onClick={handleClick}>
                            +
                        </div>
                        </li>
                        <li>
                            <div>
                                <h3>Green Day</h3>
                                <p>American Idiot</p>
                            </div>
                        <div className={styles.plusSign}>
                            +
                        </div>
                        </li>
                        <li>
                            <div>
                                <h3>Red Hot Chilli Pappers</h3>
                                <p>Around the World</p>
                            </div>
                        <div className={styles.plusSign}>
                            +
                        </div>
                        </li>
                        <li>
                            <div>
                                <h3>Taylor Swift</h3>
                                <p>Bad Blood</p>
                            </div>
                        <div className={styles.plusSign}>
                            +
                        </div>
                        </li>
                        <li>
                            <div>
                                <h3>Foo Fighters</h3>
                                <p>All My Life</p>
                            </div>
                        <div className={styles.plusSign}>
                            +
                        </div>
                        </li>
                        <li>
                            <div>
                                <h3>Imagine Dragons</h3>
                                <p>Bad Liar</p>
                            </div>
                        <div className={styles.plusSign}>
                            +
                        </div>
                        </li>
                        <li>
                            <div>
                                <h3>Frank Ocean</h3>
                                <p>Chanel</p>
                            </div>
                        <div className={styles.plusSign}>
                            +
                        </div>
                        </li>
                        <li>
                            <div>
                                <h3>Imagine Dragons</h3>
                                <p>Whatever it takes</p>
                            </div>
                        <div className={styles.plusSign}>
                            +
                        </div>
                        </li>
                        <li>
                            <div>
                                <h3>Taylor Swift</h3>
                                <p>Shake it off</p>
                            </div>
                        <div className={styles.plusSign}>
                            +
                        </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Results;
