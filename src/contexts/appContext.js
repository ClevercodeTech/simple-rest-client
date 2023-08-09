
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [url, setUrl] = useState('');
    const [requestType, setRequestType] = useState('get');
    const [headers, setHeaders] = useState('');
    const [jsonData, setJsonData] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    return (
        <AppContext.Provider value={{ url, setUrl, requestType, setRequestType, headers, setHeaders, jsonData, setJsonData, response, setResponse,isLoading, setIsLoading }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    return useContext(AppContext);
};