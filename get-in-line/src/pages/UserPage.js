import * as React from 'react';
import GetInLineTitle from '../components/GetInLineTitle'
import styled from "styled-components";
import LogoutButton from '../components/LogoutButton';
import { auth, db, logout } from '../Firebase';
import { collection, doc, getDocs, query, setDoc, limit, onSnapshot, deleteDoc, updateDoc, where } from 'firebase/firestore';
import { async } from '@firebase/util';

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

    const handleChange = (selected) => {
        setValue(selected.target.value);
    };

    let eventName = value;
    // ----Dropdown code----


    function verifyUserAdd() {
        //TODO: Need User name
        var UserName = '';
        var Event = eventName;
    
        if (Event == '') {
          alert("Please Select an event")
          return;
        } else {
          addUser(Event, UserName);
        }
    }

    async function addUser(Event, UserName) {
        //Initialize event document
        const path = 'event/' + Event;
        const event = doc(db, 'event', Event);
        let queue = [];
    
        //Query into firebase to read queue from document
        const queuesQuery = query(
          collection(db, 'event'),
          limit(100) // Just to make sure we're not querying more than 100 events. Can be removed if database grows and is needed
        );
    
        const querySnapshot = await getDocs(queuesQuery);
        const allDocs = querySnapshot.forEach((snap) => {
          if (snap.data().name == Event) {
            queue = snap.data().queue;
          }
        });
    
        //add user to queue
        queue.push(UserName);
    
        //update document with new queue and number of people
        updateDoc(event, {
          numOfPeople: queue.length,
          queue: queue
        });
    
        alert("Adding " + UserName + " to " + Event);
      }
    


    // If null value in dropdown dont display event info, else displayed selected
    // event info
    if (value == '') {
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
                <button >View Your Queues</button> 
                <button >Settings</button> 
                <LogoutButton/>
            </Main>
            
        );         
    } else {  
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
                <button onClick={() => verifyUserAdd()}> Get in Line! </button>
                <p></p>
                <button >View Your Queues</button> 
                <button >Settings</button> 
                <LogoutButton/>
            </Main>
       
    );
    }
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