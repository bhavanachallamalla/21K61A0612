import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';


const apiUrls = {
  p: 'http://20.244.56.144/test/primes',
  f: 'http://20.244.56.144/test/fibo',
  e: 'http://20.244.56.144/test/even',
  r: 'http://20.244.56.144/test/rand',
};

function AvgCalculator() {
  const [numberType, setNumberType] = useState('p');
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [fetchedNumbers, setFetchedNumbers] = useState([]);
  const [average, setAverage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useCallback ensures that fetchAverage has a stable reference
  const fetchAverage = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(apiUrls[numberType]);
      setWindowPrevState(response.data.windowPrevState);
      setWindowCurrState(response.data.windowCurrState);
      setFetchedNumbers(response.data.numbers);
      setAverage(response.data.avg);
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [numberType]); 

  useEffect(() => {
    fetchAverage();
  }, [fetchAverage]); 

  const renderResultsTable = () => {
    if (windowPrevState.length === 0) {
      return null;
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Previous Window</th>
            <th>Current Window</th>
            <th>Fetched Numbers</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{windowPrevState.join(', ')}</td>
            <td>{windowCurrState.join(', ')}</td>
            <td>{fetchedNumbers.join(', ')}</td>
            <td>{average}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div className="average-calculator">
      <h1>Average Calculator</h1>
      <select value={numberType} onChange={(event) => setNumberType(event.target.value)}>
        <option value="p">Prime Numbers</option>
        <option value="f">Fibonacci Numbers</option>
        <option value="e">Even Numbers</option>
        <option value="r">Random Numbers</option>
      </select>
      <button onClick={fetchAverage} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Calculate Average'}
      </button>
      {error && <p className="error">{error}</p>}
      {renderResultsTable()}
    </div>
  );
}

export default AvgCalculator;
