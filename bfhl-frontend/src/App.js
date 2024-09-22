import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');  // State for JSON input
  const [response, setResponse] = useState(null);  // State for API response
  const [selectedOptions, setSelectedOptions] = useState([]); // State for dropdown selections

  const handleSubmit = async () => {
    try {
      const result = await axios.post('https://your-render-backend-url/bfhl', JSON.parse(jsonInput));
      setResponse(result.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    if (!selectedOptions.includes(value)) {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const displayFilteredResponse = () => {
    if (!response) return null;
    return selectedOptions.map(option => (
      <div key={option}>{option}: {response[option].join(', ')}</div>
    ));
  };

  return (
    <div>
      <h1>BFHL Frontend</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON"
        rows="10"
        cols="50"
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>

      <select onChange={handleOptionChange} multiple>
        <option value="alphabets">Alphabets</option>
        <option value="numbers">Numbers</option>
        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
      </select>

      <div>{displayFilteredResponse()}</div>
    </div>
  );
}

export default App;
