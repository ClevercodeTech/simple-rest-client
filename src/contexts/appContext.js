
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

    const [urlHistory, historyDispatch] = useReducer(historyReducer, storedurlHistory);

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


    function historyReducer(urlHistory, action) {
        let newArray = []
        switch (action.type) {
            case 'addurlHistory':
                return addurlHistory(urlHistory)
            case 'removeurlHistory':
                let newArray2 = urlHistory
                if (urlHistory != null) {
                    newArray2 = [...urlHistory.filter((item) => item.url != action.payload.url)]
                }
                localStorage.setItem('urlHistory', JSON.stringify(newArray2));
                return newArray2
            case 'onSelectHistory':
                let newArray = urlHistory
                if (action.payload.url != undefined && action.payload.url != "") {
                    newArray = addurlHistory(urlHistory)
                    urlObjDispatch({ type: 'seturlObj', payload: action.payload })
                }
                return newArray
            default:
                return urlHistory;
        }
    }


    function addurlHistory(urlHistory) {
        let newArray = []
        if (urlHistory != null) {
            newArray = [...urlHistory.filter((item) => item.url != urlObj.url)]
            if(urlObj.url!=""){
                newArray.push(urlObj)
            }
        } else {
            if( urlObj.url!="") newArray = [urlObj]
        }
        localStorage.setItem('urlHistory', JSON.stringify(newArray));
        return newArray
    }


    return (
        <AppContext.Provider value={{ urlObj, urlObjDispatch, urlHistory, historyDispatch, isLoading, setIsLoading }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    return useContext(AppContext);
};


