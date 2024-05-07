import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar.js';
import Results from './Results.js';
import Playlist from './Playlist.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>JAMMMING</h1>
      </header>
      <div>
        <SearchBar/>
        <div className="container">
          <div className="resultsContainer">
            <Results/>
          </div>
          <div className="playlistContainer">
            <Playlist/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
