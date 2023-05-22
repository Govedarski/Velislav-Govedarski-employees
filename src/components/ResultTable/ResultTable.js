export function ResultTable({data}) {
    let pairsData = [];

    for (const dataRow of data) {
        const pairs = pairsData.filter((pair) => {
            return pair.projectID === dataRow.ProjectID && pair.employee1ID !== dataRow.employee1ID;
        });

        for (let pair of pairs) {
            if (pair.employee2ID !== null) {
                pair = {...pair};
                pairsData.push(pair);
            }
            pair.employee2ID = dataRow.EmpID;
            pair.employee2DateFrom = dataRow.DateFrom;
            pair.employee2DateTo = dataRow.DateTo;
        }


        pairsData.push({
            projectID: dataRow.ProjectID,
            employee1ID: dataRow.EmpID,
            employee1DateFrom: dataRow.DateFrom,
            employee1DateTo: dataRow.DateTo,
            employee2ID: null,
            employee2DateFrom: null,
            employee2DateTo: null,
        });

    }

    pairsData = pairsData.filter((pair) => {
            return pair.employee2ID !== null;
        }
    );

    for (let pair of pairsData) {
        const dateFrom = pair.employee1DateFrom > pair.employee2DateFrom
            ? pair.employee1DateFrom
            : pair.employee2DateFrom;
        const dateTo = pair.employee1DateTo < pair.employee2DateTo
            ? pair.employee1DateTo
            : pair.employee2DateTo;
        // Difference in days between two dates https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
        pair.daysWorked = Math.ceil((dateTo - dateFrom)  / (1000 * 60 * 60 * 24));
    }

    pairsData = pairsData.filter((pair) => {
        return pair.daysWorked > 0;
    }).sort((a, b) => {
        return b.daysWorked - a.daysWorked;
    });

    console.log(pairsData)

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Employee ID #1</th>
                        <th>Employee ID #2</th>
                        <th>Project ID</th>
                        <th>Days Worked</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>143</td>
                        <td>218</td>
                        <td>10</td>
                        <td>8</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}