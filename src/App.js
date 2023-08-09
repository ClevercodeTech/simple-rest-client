import './App.css';
import Requestform from './components/requestform';

import { useState } from 'react';
import Sidebar from './components/sidebar';
import Header from './components/header';
function App() {
  const [history, setHistory] = useState([]);

  const handleSelectHistory = (entry) => {
    // setUrl(entry.url);
    // setRequestType(entry.requestType);
    // setHeaders(entry.headers);
    // setJsonData(entry.jsonData);
  };

  return (
    <div className="App">
      <Header />
      <main>
      <Sidebar history={history} onSelectHistory={handleSelectHistory} />
      <Requestform />
      </main>
     

    </div>
  );
}

export default App;
