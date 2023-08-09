
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const storedurlHistory = JSON.parse(localStorage.getItem('urlHistory'));

    const [isLoading, setIsLoading] = useState(false);
    const [urlObj, setUrlObj] = useState({
        url: '',
        https: 'https://',
        requestType: 'get',
        headers: '',
        jsonData: '',
        response: ''
    });

    const [urlHistory, setUHistory] = useState(storedurlHistory);

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
    const setHttps = (val) => {
        setUrlObj({ ...urlObj, https: val },)
    }
    const addurlHistory = () => {
        let newArray = []
        if (urlHistory != null) {
            newArray = [...urlHistory.filter((item) => item.url != urlObj.url), urlObj]
        } else {
            newArray = [urlObj]
        }
        setUHistory(newArray)
        localStorage.setItem('urlHistory', JSON.stringify(newArray));
    }

    const removeurlHistory = (val) => {
        let newArray = []

        if (urlHistory != null) {
            newArray = [...urlHistory.filter((item) => item.url != urlObj.url)]
        }
        setUHistory(newArray)
        localStorage.setItem('urlHistory', JSON.stringify(newArray));
    }
    const onSelectHistory = (val) => {
        if (val.url != undefined && val.url != "") {
            addurlHistory()
            setUrlObj(val)
        }
    }
    return (
        <AppContext.Provider value={{ urlObj, urlHistory, addurlHistory, removeurlHistory, onSelectHistory, setUrl, setHttps, setRequestType, setHeaders, setJsonData, setResponse, isLoading, setIsLoading }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    return useContext(AppContext);
};