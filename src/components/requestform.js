import React, { useState } from 'react';
import '../App.css';

export default()=> {
  const [url, setUrl] = useState('');
  const [requestType, setRequestType] = useState('get');
  const [headers, setHeaders] = useState('');
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setResponse('');

    const requestOptions = {
      method: requestType.toUpperCase(),
      headers: {
        ...(headers && JSON.parse(headers)),
        'Content-Type': 'application/json'
      },
      body: requestType === 'post' || requestType === 'put' ? jsonData : undefined
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.text();
      setResponse(data);
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }

    setIsLoading(false);
  };

  return (
    <div className="container">
      <h1>Fetch Request Form (React)</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <label htmlFor="request-type">Request Type:</label>
        <select
          id="request-type"
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
          required
        >
          <option value="get">GET</option>
          <option value="post">POST</option>
          <option value="put">PUT</option>
          <option value="delete">DELETE</option>
        </select>

        {requestType !== 'get' && (
          <div>
            <label htmlFor="headers">Custom Headers (JSON):</label>
            <textarea
              id="headers"
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
            />
          </div>
        )}

        {(requestType === 'post' || requestType === 'put') && (
          <div>
            <label htmlFor="json-data">JSON Data:</label>
            <textarea
              id="json-data"
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
            />
          </div>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      <div id="response">
        <label>Response:</label>
        <textarea id="response-body" value={response} readOnly />
      </div>
    </div>
  );
}

