import React, { useState } from 'react';
import './styles.css';
import PayloadTabBar from '../payloadTabBar';
import { useApp } from '../../contexts/appContext';
import ResponseTabBar from '../responseTabBar';
import { Button, TextField, select, option, form, InputLabel, Input, Box } from '@mui/material';
export default () => {

  const { urlObj, urlObjDispatch, historyDispatch, isLoading, setIsLoading } = useApp()


  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    urlObjDispatch({ type: 'setResponse', payload: '' })
    urlObjDispatch({ type: 'setResponse', payload: '' })
    historyDispatch({ type: 'addurlHistory' })
    const requestOptions = {
      method: urlObj.requestType.toUpperCase(),
      headers: {
        ...(urlObj.headers && JSON.parse(urlObj.headers)),
        'Content-Type': 'application/json'
      },
      body: urlObj.requestType === 'post' || urlObj.requestType === 'put' ? urlObj.jsonData : undefined
    };

    try {
      let tempUrl = urlObj.url.replace("https://", '').replace("http://", "")
      let prefix = urlObj.https
      const response = await fetch(prefix + tempUrl, requestOptions);
      const data = await response.text();
      urlObjDispatch({ type: 'setResponse', payload: data })
    } catch (error) {
      urlObjDispatch({ type: 'setResponse', payload: `Error: ${error.message}` })
    }

    setIsLoading(false);
  };

  return (
    <div className="form-container">
      <Box padding={1} margin={1} sx={{ flexDirection: 'row' }}>
        <form onSubmit={handleSubmit} >
          <span>
            <label htmlFor='http Type' >{urlObj.https=='https://'?'Secure':'Unsecure'} </label>
            <select
              title='http Type"'
              name="http Type"
              value={urlObj.https} onChange={(e) => urlObjDispatch({ type: 'setHttps', payload: e.target.value })}>
              <option value={'https://'}>Https</option>
              <option value={'http://'}>Http</option>
            </select>
          </span>
          <span>
            <label htmlFor='url'>URL</label>
            <input
              name='url'
              title='url'
              placeholder={"Type url"}
              type="text"
              value={urlObj.url}
              onChange={(e) => urlObjDispatch({ type: 'setUrl', payload: e.target.value.trim() })}
              required
            />
          </span>
          <span>
            <label htmlFor='Request Type'> Reques Type </label>
            <select
              id="request-type"
              name='Request Type'
              title='request type'
              value={urlObj.requestType}
              onChange={(e) => urlObjDispatch({ type: 'setRequestType', payload: e.target.value })}
              required
            >
              <option value="get">GET</option>
              <option value="post">POST</option>
              <option value="put">PUT</option>
              <option value="delete">DELETE</option>
            </select>
          </span>

          <PayloadTabBar />

          <Button variant="contained" type="submit" disabled={isLoading} title='submit button'>
            {isLoading ? 'Loading...' : 'Submit'}
          </Button>
        </form>

        <ResponseTabBar />
      </Box>

    </div>
  );
}

