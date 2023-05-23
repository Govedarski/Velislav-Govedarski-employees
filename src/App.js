import './App.css';
import {DataUploader} from './components/DataUploader/DataUploader.js';
import {useState} from 'react';
import {ResultTable} from './components/ResultTable/ResultTable.js';
import {DateFormatPicker} from './components/DateFormatPicker/DateFormatPicker.js';

function App() {
    const [data, setData] = useState([]);
    const [dateFormat, setDateFormat] = useState(["yyyy", "mm", "dd"]);

    return (
        <div className={"container"}>
            <DateFormatPicker
                dateFormat={dateFormat}
                setDateFormat={setDateFormat}
            />
            <DataUploader
                setData={setData}
                dateFormat={dateFormat}
            />
            <ResultTable data={data}/>
        </div>
    );
}

export default App;
