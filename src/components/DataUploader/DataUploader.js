import Papa from "papaparse";
export function DataUploader({ setData }) {
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                setData(results.data);
                alert("Data uploaded successfully!");
                },
            error: (error) => {
                alert("Error: " + error);
            }
        });
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
        </div>
    );
}