
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [urlObj, setUrlObj] = useState({
        url: '',
        requestType: 'get',
        headers: '',
        jsonData: '',
        response: ''
    });
    const [urlHistory, setUHistory] = useState([]);

    const setUrl = (val) => {
        setUrlObj({ ...urlObj, url: val },)
    }
    const setRequestType = (val) => {
        setUrlObj({ ...urlObj, requestType: val },)
    }
    const setHeaders = (val) => {
        setUrlObj({ ...urlObj, headers: val },)
    }
    const setJsonData = (val) => {
        setUrlObj({ ...urlObj, jsonData: val },)
    }
    const setResponse = (val) => {
        setUrlObj({ ...urlObj, response: val },)
    }


    return (
        <AppContext.Provider value={{ ...urlObj, setUrl, setRequestType,  setHeaders,  setJsonData,  setResponse, isLoading, setIsLoading }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    return useContext(AppContext);
};