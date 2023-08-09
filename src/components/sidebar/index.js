import React from 'react';
import './styles.css'
export default ({ history, onSelectHistory }) => {
    return (
        <div className="history-sidebar">
            <h2>History</h2>
            <ul>
                {history.map((entry, index) => (
                    <li key={index} onClick={() => onSelectHistory(entry)}>
                        {entry.url}
                    </li>
                ))}
            </ul>
        </div>
    );
}
