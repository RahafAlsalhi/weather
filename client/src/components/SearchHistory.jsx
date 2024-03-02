import React, { useState } from 'react';
import axios from 'axios';

function SearchHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearch = async () => {
    // Add the search query to the search history state
    setSearchHistory(prevHistory => [...prevHistory, searchQuery]);

    // Clear the search input
    setSearchQuery('');

    // Send the updated search history to the backend to save in MongoDB
    try {
      await axios.post('/api/saveSearchHistory', { searches: searchHistory });
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <h2>Search History</h2>
      <ul>
        {searchHistory.map((query, index) => (
          <li key={index}>{query}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory;
