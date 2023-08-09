import React from 'react';
import './styles.css'
import { useApp } from '../../contexts/appContext';
export default () => {

    const {urlHistory,onSelectHistory} = useApp()
    return (
        <div className="history-sidebar">
            <h2>History</h2>
            <ul>
                {urlHistory?urlHistory.map((entry, index) => (
                    <li key={index} onClick={() => onSelectHistory(entry)}>
                        {entry.url}
                    </li>
                )):<li>New </li>}
            </ul>
        </div>
    );
}
