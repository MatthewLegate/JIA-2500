import * as React from 'react';
import GetInLineTitle from '../components/GetInLineTitle';
import LogoutButton from '../components/LogoutButton';
import { useNavigate } from 'react-router-dom';
import Event from '../components/Event';

import { db } from '../Firebase';
import { collection, doc, getDocs, query, setDoc, limit, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { async } from '@firebase/util';

export default function AdminPage() {




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

  let navigate = useNavigate();

  // ----Dropdown code----
  let options1 = events;
  let options = []
  for (let i = 0; i < options1.length; i++) {
    options[i] = {label: options1[i].name, value: options1[i].name};
  }


  const [value, setValue] = React.useState(options[0]);

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
        <LogoutButton/>
        <br/><br/><br/><hr/><br/><br/><br/>
        Event Name* <input type="text" id="eventName"/> <br/>
        Address <input type="text" id="address"/> <br/>
        <button onClick={() => verifyEvent()}> Add Event </button>
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
    } else {
      RemoveUser(Event, UserName);
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

  async function RemoveUser(Event, UserName) {
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
      queue: []
    };
    setDoc(newEvent, docData);
    alert("Adding " + eventName + " to database");
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
