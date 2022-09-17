import { useState } from 'react';
import axios from 'axios';
import { getAuthHeader } from './auth';

export default function usePost(url, useAuth = false) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(null);

  async function postData(data, postCallback) {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.post(url, data, { headers: await getAuthHeader(useAuth) });
      setResponse(res);
      setLoading(false);
      postCallback(res);
    } catch {
      setLoading(false);
      setError(true);
    }
  }

  function clearData() {
    setResponse(null);
  }

  return { isLoading, error, response, postData, clearData };
}
