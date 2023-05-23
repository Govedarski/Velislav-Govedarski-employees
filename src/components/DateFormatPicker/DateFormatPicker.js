import styles from './DateFormatPicker.module.css';
export function DateFormatPicker({dateFormat, setDateFormat}) {

    function handleChange(index, e) {
        setDateFormat(prevState => {
            const newState = [...prevState];
            const valueToChange = newState[index];
            const indexToChange = newState.indexOf(e.target.value);
            newState[indexToChange] = valueToChange;
            newState[index] = e.target.value;
            return newState;
        });
    }

    return (
        <div className={styles.container}>
            <h3>Choose date format</h3>
            <div>
            <select
                value={dateFormat[0]}
                onChange={handleChange.bind(null, 0)}>
                >
                <Options/>
            </select>
            <select
                value={dateFormat[1]}
                onChange={handleChange.bind(null, 1)}>
                >
                <Options/>
            </select>
            <select
                value={dateFormat[2]}
                onChange={handleChange.bind(null, 2)}>
                >
                <Options/>
            </select>
            </div>
        </div>
    );
}

function Options() {
    return (
        <>
            <option value={'dd'}>Day</option>
            <option value={'mm'}>Month</option>
            <option value={'yyyy'}>Year</option>
        </>
    );
}