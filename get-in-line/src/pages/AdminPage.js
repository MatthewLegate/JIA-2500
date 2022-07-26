import ReactDOM from "react-dom";
import React, { useEffect, useState, useID } from "react";
import GetInLineTitle from '../components/GetInLineTitle';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code'
import Event from '../components/Event';

import { auth, db, logout } from '../Firebase';
import { collection, doc, getDocs, query, setDoc, limit, onSnapshot, deleteDoc, updateDoc, where } from 'firebase/firestore';
import { async } from '@firebase/util';


import { useAuthState } from "react-firebase-hooks/auth";


export default function AdminPage() {


  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);

      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    };
    useEffect(() => {
      if (loading) return;
      if (!user) return navigate("/");
      fetchUserName();
    }, [user, loading]);

  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    const q = query(collection(db, "event"));
    const eventList = onSnapshot(q, (querySnapshot) => {
      let eventsArray = [];
      querySnapshot.forEach((doc) => {
        eventsArray.push({ ...doc.data(), id: doc.id });
      });
      setEvents(eventsArray);
    });
    return () => eventList();
  }, []);

  const handleDelete = async (eventName) => {
    await deleteDoc(doc(db, "event", eventName));
  };



  // ----Dropdown code----
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

  let eventName = value
  // ----Dropdown code----
  return (
    <div>
      <GetInLineTitle/>
        <p id='queues'></p>
        <div className='event_container'>
          {events.map((event) => (
            <Event
              //key={event.name}
              event={event}
              handleDelete={handleDelete}
            />
          ))}
        </div>
        <button onClick={() => showExistingQueues()}>
          View Existing Queues
          </button>
        <button> Settings </button>
        <button onClick={() => goToUserPage()} > Go To User Page </button>
        <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>
        <br/><br/><br/><hr/><br/><br/><br/>
        Event Name* <input type="text" id="eventName"/> <br/>
        Address <input type="text" id="address"/> <br/>
        <button onClick={() => verifyEvent()}> Add Event </button>
        <button onClick={() => generateQR()}> Create QR Code </button>
        <div id="qrcode"> </div>
        <p></p>
        <Dropdown
                label="Select an Event "
                options={options}
                value={value}
                onChange={handleChange}
        /> <br/>
        User Name* <input type="text" id="UserName"/> <br/>
        <button onClick={() => verifyUserAdd()}> Add User </button>
        <button onClick={() => verifyUserRemove()}> Remove User </button>
    </div>
  )


// ----------------------- Functions -----------------------
  function verifyUserAdd() {
    var UserName = document.getElementById("UserName").value;
    var Event = eventName;

    if (UserName.length === 0) {
      alert("User Name is Required!")
      return;
    } else if (Event == '') {
      alert("Please Select an event")
      return;
    } else {
      addUser(Event, UserName);
    }
  }

  function verifyUserRemove() {
    var UserName = document.getElementById("UserName").value;
    var Event = eventName;


    if (UserName.length === 0) {
      alert("User Name is Required!")
      return;
    } else if (Event == '') {
      alert("Please Select an event")
      return;
    } else {
      RemoveUser(Event, UserName);
    }
  }

 async function addUser(Event, UserName) {
    //Initialize event document
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

  async function RemoveUser(Event, UserName) {
    //Initialize event document
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

    //remove user from queue
    queue = queue.filter(function(name) {
      return name !== UserName
    })

    //update document with new queue and number of people
    updateDoc(event, {
      numOfPeople: queue.length,
      queue: queue
    });

    alert("Removing " + UserName + " from " + Event);
  }


  //Used so the admin can call the next person in line and remove them from the queue
  async function removeFirstUser(Event) {

    //add timestamp to document in order to be able to calculate average wait times
    //stored in milliseconds since unix epoch
    const currTime = Date.now()
    //Initialize event document
    const event = doc(db, 'event', Event);
    let queue = [];
    let dequeueTimes = []


    //Query into firebase to read queue from document
    const queuesQuery = query(
      collection(db, 'event'),
      limit(100) // Just to make sure we're not querying more than 100 events. Can be removed if database grows and is needed
    );

    const querySnapshot = await getDocs(queuesQuery);
    querySnapshot.forEach((snap) => {
      if (snap.data().name == Event) {
        queue = snap.data().queue;
      }
    });

    querySnapshot.forEach((snap) => {
      if (snap.data().name == Event) {
        dequeueTimes = snap.data().dequeueTimes;
      }
    });

    var nextUser = queue.shift()

    if (typeof nextUser === 'undefined') {
      alert("tried to remove the next user but the queue is empty")
    }
    else if (queue.length > 0) {
      dequeueTimes.push(currTime)
    }
    else {
      //when the line ends we want to dump data so that this line does not affect the average wait time for the next line
      //We do this since there may be changing variables, eg. staffing, new system, etc.
      dequeueTimes = []
    }
    

    updateDoc(event, {
      numOfPeople: queue.length,
      queue: queue,
      dequeueTimes: dequeueTimes
    });

    return nextUser
  }



  function verifyEvent() {
    var eventName = document.getElementById("eventName").value;
    var address = document.getElementById("address").value;

    if (eventName.length === 0) {
      alert("Event Name is Required!")
      return;
    } else {
      addEvent(eventName, address);
    }
  }

  function addEvent(eventName, addressInput) {
    const path = 'event/' + eventName;
    const newEvent = doc(db, path);
    
    const docData = {
      address: addressInput,
      name: eventName,
      numOfPeople: 0,
      queue: [],
      id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36)
    };
    setDoc(newEvent, docData);
    alert("Adding " + eventName + " to database");
    
  }

  function generateQR(){
    var eventName = document.getElementById("eventName").value;
    ReactDOM.render(<QRCode value={window.location.hostname +/user/ +eventName} />, document.getElementById("qrcode"));
    //var qrc = new QRCode(document.getElementById("qrcode"), eventName);
    //document.getElementById("qrcode").innerHTML = qrc;
  }

  async function showExistingQueues() {
    const queuesQuery = query(
      collection(db, 'event'),
      limit(100) // Just to make sure we're not querying more than 100 events. Can be removed if database grows and is needed
    );

    const querySnapshot = await getDocs(queuesQuery);
    var listOfQueues = "";
    const allDocs = querySnapshot.forEach((snap) => {
      listOfQueues += snap.data().name + " - " + JSON.stringify(snap.data()) + "<br/>";
    });

    document.getElementById("queues").innerHTML = listOfQueues;
  }

  function goToUserPage() {
    navigate('/user');
  }

}

//Dropdwon element creation
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
