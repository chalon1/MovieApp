// App.jsx
import { useState } from 'react';
import './App.css';
import './indesx.html'

function App() {
  const [query, setQuery] = useState(''); // User input query
  const [movies, setMovies] = useState([]); // State to store multiple movies
  const [error, setError] = useState(''); // State for handling errors

  const handleSearch = async () => {
    if (!query.trim()) return; // Return if the search query is empty

    try {
      let key = "2a0ce74a"; // Your OMDb API key
      const encodedQuery = encodeURIComponent(query); // Safely encode the query string
      const res = await fetch(`https://www.omdbapi.com/?s=${encodedQuery}&apikey=${key}`); // OMDb API search request
      const data = await res.json(); // Parse the response as JSON

      console.log("API Response:", data); // Debugging: log the full API response

      // Check if there are search results
      if (data.Response === "True") {
        setMovies(data.Search); // Store the list of movies in state
        setError(''); // Reset error message
      } else {
        setMovies([]); // Reset movies if none are found
        setError('No movies found. Please try a different search.');
      }
    } catch (error) {
      console.error('Error fetching movies:', error); // Log any errors from the fetch
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="app">
      <nav className="nav">
        <div className="logo">🎬 CineFind</div>
        <div className="profile">👤</div>
      </nav>

      <section className="hero">
        <h1>Find Your Next Movie</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Update query state
          />
          <button onClick={handleSearch}>🔍</button>
        </div>
      </section>

      {/* Display an error message if no movies are found */}
      {error && <p className="error">{error}</p>}

      {/* Display list of movies if found */}
      {movies.length > 0 ? (
        <section className="results">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="result">
              <h2>{movie.Title}</h2>
              <img src={movie.Poster} alt={movie.Title} className="poster" />
              <p>{movie.Year}</p> {/* Display year to differentiate between movies */}
            </div>
          ))}
        </section>
      ) : (
        <p>No results to display</p>
      )}
    </div>
  );
}

export default App;
