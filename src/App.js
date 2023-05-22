import './App.css';
import {DataUploader} from './components/DataUploader/DataUploader.js';
import {useState} from 'react';
import {ResultTable} from './components/ResultTable/ResultTable.js';

function App() {
    const [data, setData] = useState([]);

    return (
        <div>
            <DataUploader setData={setData}/>
            <ResultTable data={data}/>
        </div>
    );
}

export default App;
