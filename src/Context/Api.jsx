import { useState, useEffect } from 'react';

function Api() {
  const [blockCount, setBlockCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://explorer.blocx.space/api/getblockcount';
    const corsProxyUrl = 'http://localhost:8080/'; // Use your own proxy URL


    fetch(corsProxyUrl + apiUrl, {
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:5173', // Replace with your local development origin
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setBlockCount(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Block Count</h1>
      {error ? (
        <p>Error: {error.message}</p>
      ) : blockCount ? (
        <p>Current Block Count: {blockCount}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Api;
