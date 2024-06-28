import React, { useEffect } from 'react';
import { getJson } from 'serpapi';
import './App.css';

function App() {
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getJson({
          engine: "google",
          api_key: "bc6d8a1c09a9cf011f1ba830c5a26c6289944148aeee03cac5ac4f36afa53897",
          q: "coffee",
          location: "Austin, Texas",
        });
        console.log(response.organic_results);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchResults();
  }, []);

  return (
    <>
      <p>hello</p>
    </>
  );
}

export default App;
