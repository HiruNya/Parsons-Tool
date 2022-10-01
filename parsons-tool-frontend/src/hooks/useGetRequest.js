import { useState, useCallback } from 'react';
import axios from 'axios';
import { getAuthHeader } from './auth';

/**
 * A custom hook which fetches data from the given URL. Includes functionality to determine whether
 * data is being loaded still or if an error has occurred
 */
export default function useGetRequest(url, initialState = null, reset = null, useAuth = false) {
  const [data, setData] = useState(initialState);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = useCallback(
    async function fetchData() {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(url, { headers: await getAuthHeader(useAuth) });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    },
    [setLoading, setError, setData, useAuth, url],
  );

  return { data, isLoading, error, fetchData };
}
