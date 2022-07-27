import * as React from 'react';
import GetInLineTitle from '../components/GetInLineTitle'
import styled from "styled-components";
import LogoutButton from '../components/LogoutButton';
import { auth, db, logout } from '../Firebase';
import { collection, doc, getDocs, query, setDoc, limit, onSnapshot, deleteDoc, updateDoc, where, arrayRemove } from 'firebase/firestore';
import { async } from '@firebase/util';
import EventDisplayPage from './EventDisplayPage';
import {Outlet, useNavigate} from 'react-router-dom';
import { calculateDistance, findUserCoordinates, displayNumberOfPeopleInLine } from '../components/Location';

//import firebase from 'firebase/compat/app';

const Main = styled("div")`
  font-family: sans-serif;
  height: 100vh;
  padding: 0em 0em;
`;

export default function User() {
    
    // ----Dropdown code----
    const [events, setEvents] = React.useState([]);
    
    const q = query(collection(db, "event"));
    const eventList = onSnapshot(q, (querySnapshot) => {
      let eventsArray = [];
      querySnapshot.forEach((doc) => {
        eventsArray.push({ ...doc.data(), id: doc.id });
      });
      setEvents(eventsArray);
    });
    
    let options1 = events;
    let options = []
    for (let i = 0; i < options1.length; i++) {
        options[i] = {label: options1[i].name, value: options1[i].name};
    }

    //add empty string to events list to avoid errors with default state
    options.unshift('');

    const [value, setValue] = React.useState('');
    const navigate = useNavigate();
    const handleChange = (selected) => {
        const selectedEvent = events.find((e) => e.name === selected.target.value);
        const eventLocation = selectedEvent.address;
        const numberOfPeopleInLine = selectedEvent.numOfPeople;
        var userCoordinates = document.getElementById('coordinates').innerHTML;

        setValue(selected.target.value);
        navigate(selected.target.value);

        if (userCoordinates.length > 1) {
            calculateDistance(eventLocation, userCoordinates);
            displayNumberOfPeopleInLine(numberOfPeopleInLine);
        }
    };

    let eventName = value;
    // ----Dropdown code----
    
    return (
        
        <Main>
            <GetInLineTitle/>
            <Dropdown
                label="Select an Event "
                options={options}
                value={value}
                onChange={handleChange}
            />

            <Outlet />
            <p></p>
            <button >View Your Queues</button> 
            <button >Settings</button> 
            <LogoutButton/>
            <br/><br/><br/><br/><br/>

            <div className='container'>
                <h1 className='status'></h1>
                <p id='coordinates'></p>
                <button className='display-coordinates' onClick={findUserCoordinates}> Display My Coordinates</button>
            </div>
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