import {useState} from 'react';

export function DateFormatPicker({dateFormat, setDateFormat}) {

    function handleChange(index, e) {
        setDateFormat(prevState => {
            const newState = [...prevState];
            const valueToChange= newState[index];
            const indexToChange = newState.indexOf(e.target.value);
            newState[indexToChange] = valueToChange;
            newState[index] = e.target.value;
            return newState;
        })
    }

    return(
        <div>
            <select
                value={dateFormat[0]}
                onChange={handleChange.bind(null,0)}>
            >
                <option value={"dd"}>Day</option>
                <option value={"mm"}>Month</option>
                <option value={"yyyy"}>Year</option>
            </select>
            <select
                value={dateFormat[1]}
                onChange={handleChange.bind(null,1)}>
                >
                <option value={"dd"}>Day</option>
                <option value={"mm"}>Month</option>
                <option value={"yyyy"}>Year</option>
            </select>
            <select
                value={dateFormat[2]}
                onChange={handleChange.bind(null,2)}>
                >
                <option value={"dd"}>Day</option>
                <option value={"mm"}>Month</option>
                <option value={"yyyy"}>Year</option>
            </select>
        </div>
    )
}