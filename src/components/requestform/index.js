import React, { useState } from 'react';
import './styles.css';
import PayloadTabBar from '../payloadTabBar';
import { useApp } from '../../contexts/appContext';
import ResponseTabBar from '../responseTabBar';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Input, Box } from '@mui/material';
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
      <Box padding={2} margin={2} width={300} > 
      <FormControl onSubmit={handleSubmit} >

        <Select          
          label="Request Type"
        value={urlObj.https} onChange={(e) => urlObjDispatch({ type: 'setHttps', payload: e.target.value })}>
          <MenuItem value={'https://'}>Https</MenuItem>
          <MenuItem value={'http://'}>Http</MenuItem>
        </Select>
  
        <TextField
          m={3}
          id="outlined-basic" variant="outlined"
          label={"url: " + urlObj.https}
          type="text"
          value={urlObj.url}
          onChange={(e) => urlObjDispatch({ type: 'setUrl', payload: e.target.value.trim() })}
          required
        />

        <InputLabel htmlFor="request-type">Request Type:</InputLabel>
        <Select
          id="request-type"
          value={urlObj.requestType}
          onChange={(e) => urlObjDispatch({ type: 'setRequestType', payload: e.target.value })}
          required
        >
          <MenuItem value="get">GET</MenuItem>
          <MenuItem value="post">POST</MenuItem>
          <MenuItem value="put">PUT</MenuItem>
          <MenuItem value="delete">DELETE</MenuItem>
        </Select>
        <PayloadTabBar />

        <Button variant="contained" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </FormControl>

      <ResponseTabBar />
      </Box>
      
    </div>
  );
}

