import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrls = {
    p: 'http://20.244.56.144/test/primes',
    f: 'http://20.244.56.144/test/fibo',
    e: 'http://20.244.56.144/test/even',
    r: 'http://20.244.56.144/test/rand',
  };
  
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIzNzg5NDUwLCJpYXQiOjE3MjM3ODkxNTAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjdlMTI0MzEwLTZjZjAtNDUwMC04YTdhLTU2YWJmMjNjNmVjMSIsInN1YiI6ImJoYXZhbmFjaGFsbGFtYWxsYTE4QGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6IkF2Z0NhbCIsImNsaWVudElEIjoiN2UxMjQzMTAtNmNmMC00NTAwLThhN2EtNTZhYmYyM2M2ZWMxIiwiY2xpZW50U2VjcmV0IjoibW1MUUdJbkZQTlJIUEZFYSIsIm93bmVyTmFtZSI6IkNoYWxsYW1hbGxhIE5hZ2EgU2FpIEJoYXZhbmEgU3JpIiwib3duZXJFbWFpbCI6ImJoYXZhbmFjaGFsbGFtYWxsYTE4QGdtYWlsLmNvbSIsInJvbGxObyI6IjIxSzYxQTA2MTIifQ.T5IkYWmk1NZ86Flb9yVGOTSq-1oonzOCaPwt1iwUy6Y'; 

function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(apiUrls, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}` 
          }
        });
        setData(response.data);
      } catch (error) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Data from API:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default MyComponent;
