import * as React from 'react';
import GetInLineTitle from '../components/GetInLineTitle'
import styled from "styled-components";
import LogoutButton from '../components/LogoutButton';

const Main = styled("div")`
  font-family: sans-serif;
  height: 100vh;
  padding: 0em 0em;
`;

export default function User() {

    const options = [
        { label: 'Event 1', value: 'Event 1' },
        { label: 'Event 2', value: 'Event 2' },
        { label: 'Event 3', value: 'Event 3' },
    ];

    const [value, setValue] = React.useState('Event 1');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    let eventName = <h1>value</h1>

    return (

        <Main>
            <GetInLineTitle/>
            <Dropdown
                label="Select an Event "
                options={options}
                value={value}
                onChange={handleChange}
            />

            <p></p>
            <h2>{value}</h2>
            <p>Distance from you: </p>
            <p>Current number of people in line: </p>
            <p>Estimated waiting time:</p>
            <button >Get In Line!</button> 
            <p></p>
            <button >View Your Queues</button> 
            <button >Settings</button> 
            <LogoutButton/>
        </Main>
        
    );
};


const Dropdown = ({ label, value, options, onChange }) => {
    return (
        <label>
        {label}
        <select value={value} onChange={onChange}>
            {options.map((option) => (
            <option value={option.value}>{option.label}</option>
            ))}
        </select>
        </label>
  );
};