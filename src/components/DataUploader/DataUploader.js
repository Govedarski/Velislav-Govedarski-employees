import Papa from 'papaparse';
import {stringToDate} from '../../utils/helpers.js';
import styles from './DataUploader.module.css';

export function DataUploader({setData, dateFormat}) {
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setData([]);
            return;
        }

        Papa.parse(file, {
            header: true,
            complete: (results) => {
                const data = results.data.map(x => {
                    x.DateFrom = stringToDate(x.DateFrom, 'yyyy/mm/dd');
                    x.DateTo = x.DateTo === 'NULL' ?
                        new Date() :
                        stringToDate(x.DateTo, dateFormat.join('-'));
                    return x;
                }).filter(x => {
                    return x.EmpID !== undefined
                        && x.ProjectID !== undefined
                        && x.DateFrom !== undefined
                        && x.DateTo !== undefined;
                }).sort((a, b) => a.EmpID.localeCompare(b.EmpID));
                setData(data);
                alert('Data uploaded successfully!');
            },
            error: (error) => {
                alert('Error: ' + error);
            }
        });
    };


    return (
        <div className={styles.container}>
            <h3>Upload your data</h3>
            <input type="file" onChange={handleFileUpload}/>
        </div>
    );
}