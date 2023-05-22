import {useEffect, useState} from 'react';

export function ResultTable({data}) {
    let pairsData = [];
    const [dataToShow, setDataToShow] = useState([]);

    useEffect(() => {
        for (const dataRow of data) {
            const pairsOnThisProject = pairsData.filter((pair) => {
                return pair.projectID === dataRow.ProjectID && pair.employee1ID !== dataRow.employee1ID;
            });

            for (let pair of pairsOnThisProject) {
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
            pair.daysWorked = Math.ceil((dateTo - dateFrom) / (1000 * 60 * 60 * 24));
        }

        pairsData = pairsData.filter((pair) => {
            return pair.daysWorked > 0;
        }).sort((a, b) => {
            return b.daysWorked - a.daysWorked;
        });


        const pairsWorkedTogetherAllProjects = []
        const bestPairs = {key: null, employee1ID: null, employee2ID: null, daysWorked: 0};

        for (const pair of pairsData) {
            const key = `${pair.employee1ID}-${pair.employee2ID}`;
            if (pairsWorkedTogetherAllProjects[key] === undefined) {
                pairsWorkedTogetherAllProjects[key] = 0;
            }
            pairsWorkedTogetherAllProjects[key] += Number(pair.daysWorked);
            if (pairsWorkedTogetherAllProjects[key] > bestPairs.daysWorked) {
                bestPairs.key = key;
                bestPairs.employee1ID = pair.employee1ID;
                bestPairs.employee2ID = pair.employee2ID;
                bestPairs.daysWorked = pairsWorkedTogetherAllProjects[key];
            }
        }

        setDataToShow(pairsData.filter((pair) => {
            return pair.employee1ID === bestPairs.employee1ID && pair.employee2ID === bestPairs.employee2ID;
        }));

    }, [data]);





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
                    {dataToShow.map(pair => (
                        <tr
                            key={`${pair.employee1ID}(${pair.employee1DateFrom}-${pair.employee1DateTo})+
                            ${pair.employee2ID}(${pair.employee2DateFrom - pair.employee2DateTo})}`}
                        >
                            <td>{pair.employee1ID}</td>
                            <td>{pair.employee2ID}</td>
                            <td>{pair.projectID}</td>
                            <td>{pair.daysWorked}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}