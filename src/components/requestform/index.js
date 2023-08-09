import React, { useState } from 'react';
import './styles.css';
import TabBar from '../tabBar';
import { useApp } from '../../contexts/appContext';

export default () => {

  const { url, setUrl, requestType, setRequestType, headers, setHeaders, jsonData, setJsonData, response, setResponse, isLoading, setIsLoading } = useApp()

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
    <div className="form-container">

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
        <TabBar />    

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

