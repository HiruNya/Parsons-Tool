import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * A custom hook which fetches data from the given URL. Includes functionality to determine whether
 * data is being loaded still or if an error has occurred
 */
export default function useGet(url, initialState = null) {
  const [data, setData] = useState(initialState);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { data, isLoading, error };
}
