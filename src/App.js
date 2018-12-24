import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('reacthooks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchInputRef = useRef();
  useEffect(() => {
    getResults();
  }, []);

  const handleSearch = event => {
    event.preventDefault();
    getResults();
  };
  const getResults = async () => {
    setLoading(true);
    let response;
    try {
      response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(response.data.hits);
    } catch (err) {
      setError(err);
      console.log(err);
    }
    setLoading(false);
  };

  const handleClearSearch = () => {
    setQuery('');
    searchInputRef.current.focus();
  };

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
      <img
        src="https://icon.now.sh/react/c0c"
        alt="React Logo"
        className="float-right h-12"
      />
      <h1 className="text-grey-darkest font-thin">Hooks News</h1>
      <form onSubmit={handleSearch} className="mb-2">
        <input
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button className="bg-orange rounded m-1 p-1" type="submit">
          Go dog go
        </button>
        <button
          className="bg-teal text-white p-1 rounded"
          type="button"
          onClick={handleClearSearch}
        >
          Clear
        </button>
      </form>

      {loading ? (
        <div className="font-bold text-orange-dark">Loading results...</div>
      ) : (
        <ul className="list-reset leading-normal">
          {results.map(result => (
            <li key={result.objectID}>
              <a
                className="text-indigo-dark hover:text-indigo-darkest"
                href={result.url}
              >
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      )}

      {error && <div className="text-red font-bold">{error.message}</div>}
    </div>
  );
}
