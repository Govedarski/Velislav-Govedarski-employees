import './App.css';
import {DataUploader} from './components/DataUploader/DataUploader.js';
import {useState} from 'react';

function App() {
    const [data, setData] = useState([]);

    return (
        <div>
            <DataUploader setData={setData}/>
        </div>
    );
}

export default App;
