
import React, { createContext, useContext, useState, useReducer } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const storedurlHistory = JSON.parse(localStorage.getItem('urlHistory'));

    const [isLoading, setIsLoading] = useState(false);

    const [urlObj, urlObjDispatch] = useReducer(reducer, {
        url: '',
        https: 'https://',
        requestType: 'get',
        headers: '',
        jsonData: '',
        response: ''
    });

    const [urlHistory, setUHistory] = useState(storedurlHistory);


    function reducer(urlObj, action) {
        switch (action.type) {
            case 'setUrl':
                return ({ ...urlObj, url: action.payload })

            case 'setRequestType':
                return ({ ...urlObj, requestType: action.payload })
            case 'setHeaders':
                return ({ ...urlObj, headers: action.payload })
            case 'setJsonData':
                return ({ ...urlObj, jsonData: action.payload })
            case 'setResponse':
                return ({ ...urlObj, response: action.payload })
            case 'setHttps':
                return ({ ...urlObj, https: action.payload })
            case 'seturlObj':
                return (action.payload)
            default:
                return urlObj;
        }
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
            urlObjDispatch({ type: 'seturlObj', payload: val })
        }
    }
    return (
        <AppContext.Provider value={{ urlObj,urlObjDispatch, urlHistory, addurlHistory, removeurlHistory, onSelectHistory, isLoading, setIsLoading }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    return useContext(AppContext);
};


