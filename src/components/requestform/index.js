import React, { useState } from 'react';
import './styles.css';
import PayloadTabBar from '../payloadTabBar';
import { useApp } from '../../contexts/appContext';
import ResponseTabBar from '../responseTabBar';
import { Button,  Box } from '@mui/material';
export default () => {

  const { urlObj, urlObjDispatch, historyDispatch, isLoading, setIsLoading } = useApp()
  const [errorSending, setErrorSending] = useState(undefined)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorSending(undefined)
    setIsLoading(true);
    urlObjDispatch({ type: 'setResponse', payload: '' })
    let requestOptions={}
    try {
       requestOptions = {
     
        method: urlObj.requestType.toUpperCase(),
        headers: {
          ...(urlObj.headers && JSON.parse(urlObj.headers)),
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: urlObj.requestType === 'post' || urlObj.requestType === 'put' ? urlObj.jsonData : undefined
      };
    } catch (error) {
      console.log(error)
      setErrorSending(error.toString())
      setIsLoading(false);
      return      
    }
    

    try {
      let tempUrl = urlObj.url.replace("https://", '').replace("http://", "")
      let prefix = urlObj.https  
      const response = await fetch(prefix + tempUrl, requestOptions);
      const data = await response.text();
      urlObjDispatch({ type: 'setResponse', payload: data })
    } catch (error) {
      urlObjDispatch({ type: 'setResponse', payload: `Error: ${error.message}` })
    }
    historyDispatch({ type: 'addurlHistory' })
    setIsLoading(false);
  };

  return (
    <div className="form-container">
      <Box padding={1} margin={1} sx={{ flexDirection: 'row' }}>
        <form onSubmit={handleSubmit} >
          <span>
            <label htmlFor='http Type' >{urlObj.https === 'https://' ? 'Secure' : 'Unsecure'} </label>
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
        {errorSending!==undefined? <div>
          Error! <br/>
          {errorSending}</div>:null}
        
      </Box>

    </div>
  );
}

