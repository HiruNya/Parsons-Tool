import { useState } from 'react';
import axios from 'axios';

export default function usePost(url) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(null);

  async function postData(data, postCallback) {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.post(url, data);
      setResponse(res);
      setLoading(false);
      postCallback();
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
