import React, { useState } from 'react';
import './styles.css';
import PayloadTabBar from '../payloadTabBar';
import { useApp } from '../../contexts/appContext';
import ResponseTabBar from '../responseTabBar';

export default () => {

  const { urlObj, addurlHistory,setUrl, setRequestType, setHeaders, setJsonData, setResponse, isLoading, setIsLoading } = useApp()

  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   localStorage.setItem('urlHistory', JSON.stringify(items));
  // }, [items]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setResponse('');
    addurlHistory()
    const requestOptions = {
      method: urlObj.requestType.toUpperCase(),
      headers: {
        ...(urlObj.headers && JSON.parse(urlObj.headers)),
        'Content-Type': 'application/json'
      },
      body: urlObj.requestType === 'post' || urlObj.requestType === 'put' ? urlObj.jsonData : undefined
    };

    try {
      const response = await fetch(urlObj.url, requestOptions);
      const data = await response.text();
      setResponse(data);
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }

    setIsLoading(false);
  };

  return (
    <div className="form-container">

      <form onSubmit={handleSubmit}>
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          value={urlObj.url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <label htmlFor="request-type">Request Type:</label>
        <select
          id="request-type"
          value={urlObj.requestType}
          onChange={(e) => setRequestType(e.target.value)}
          required
        >
          <option value="get">GET</option>
          <option value="post">POST</option>
          <option value="put">PUT</option>
          <option value="delete">DELETE</option>
        </select>
        <PayloadTabBar />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      <ResponseTabBar />
    </div>
  );
}

