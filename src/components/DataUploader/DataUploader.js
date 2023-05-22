import Papa from "papaparse";
import {stringToDate} from '../../utils/helpers.js';
export function DataUploader({ setData }) {
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                const data = results.data.map(x => {
                    x.DateFrom = stringToDate(x.DateFrom, "yyyy/mm/dd");
                    x.DateTo = x.DateTo === "NULL" ?
                        new Date() :
                        stringToDate(x.DateTo, "yyyy/mm/dd");
                    return x
                })
                setData(data);
                alert("Data uploaded successfully!");
                },
            error: (error) => {
                alert("Error: " + error);
            }
        });
    };

    // TODO: Add a button to clear the data. Add check on header names.

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
        </div>
    );
}