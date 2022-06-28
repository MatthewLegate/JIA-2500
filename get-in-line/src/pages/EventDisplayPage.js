import { useParams } from 'react-router-dom'
import * as React from 'react';
import { collection, doc, getDocs, query, setDoc, limit, onSnapshot, deleteDoc, updateDoc, where, arrayRemove } from 'firebase/firestore';
import LogoutButton from '../components/LogoutButton';
import { auth, db, logout } from '../Firebase';
export default function EventDisplayPage() {

	const [needUserInfo, setNeedUserInfo] = React.useState(false);
    const promptInfo = () => {
        setNeedUserInfo(true);
    };
    const {eventName} = useParams();


	if (!needUserInfo) {
        return (
        	<div>
            <p></p>
            <h2>{eventName}</h2>
            <p>Distance from you: </p>
            <p>Current number of people in line: </p>
            <p>Estimated waiting time:</p>
            <p></p>
            <button onClick={() => promptInfo()}> Get in Line! </button>
            </div>
        );
    } else {
        return (
        	<div>
            <p></p>
            <h2>{eventName}</h2>
            <p>Distance from you: </p>
            <p>Current number of people in line: </p>
            <p>Estimated waiting time:</p>
            Name* <input type="text" id="Name"/> <br/>
            Email* <input type="text" id="Email"/> <br/>
            <p></p>
            <button onClick={() => verifyUserAdd()}> Submit </button>
            <button onClick={() => verifyUserRemove()}> Dequeue </button>
            <p></p>
            <button >View Your Queues</button> 
            <button >Settings</button> 
            <LogoutButton/>
            </div>
           
        );
    }


	function verifyUserRemove() {
        var Name = document.getElementById("Name").value;
        var Email = document.getElementById("Email").value;
        var Event = eventName;
    
        if (Name.length == 0) {
          alert("Please enter your name")
          return;
        } else if (Email.length == 0) {
            alert("Please enter your email")
            return;
        } else {
          console.log("hello");
          removeUser(Event, Name, Email);
        }
    }

    async function removeUser(Event, UserName, UserEmail) {
            //Initialize event document
        const path = 'event/' + Event;
        const event = doc(db, 'event', Event);
        let Userqueue = [];
        let Emailqueue = [];

        //Query into firebase to read queue from document
        const queuesQuery = query(
          collection(db, 'event'),
          limit(100) // Just to make sure we're not querying more than 100 events. Can be removed if database grows and is needed
        );

        const querySnapshot = await getDocs(queuesQuery);
        const allDocs = querySnapshot.forEach((snap) => {
          if (snap.data().name == Event) {
            Userqueue = snap.data().userQueue;
            Emailqueue = snap.data().emailQueue;
          }
        });

        //remove user from queue
        Userqueue = Userqueue.filter(function(UserName) {
          alert("removing1");
          return UserName !== UserName
        })

        Emailqueue = Emailqueue.filter(function(UserEmail) {
          alert("removing2");
          return UserEmail !== UserEmail
        })

        //update document with new queue and number of people
        updateDoc(event, {
          numOfPeople: Userqueue.length,
          userQueue: Userqueue,
          emailQueue: Emailqueue
        });

        alert("Removing " + UserName + " from " + Event);
    }

    function verifyUserAdd() {
        //TODO: Need User name
        var Name = document.getElementById("Name").value;
        var Email = document.getElementById("Email").value;
        var Event = eventName;
    
        if (Name.length == 0) {
          alert("Please enter your name")
          return;
        } else if (Email.length == 0) {
            alert("Please enter your email")
            return;
        } else {
          addUser(Event, Name, Email);
        }
    }

	async function addUser(Event, UserName, UserEmail) {
        //Initialize event document
        const path = 'event/' + Event;
        const event = doc(db, 'event', Event);
        let Userqueue = [];
        let Emailqueue = [];
    
        //Query into firebase to read queue from document
        const queuesQuery = query(
          collection(db, 'event'),
          limit(100) // Just to make sure we're not querying more than 100 events. Can be removed if database grows and is needed
        );
    
        const querySnapshot = await getDocs(queuesQuery);
        const allDocs = querySnapshot.forEach((snap) => {
          if (snap.data().name == Event) {
            Userqueue = snap.data().userQueue;
            Emailqueue = snap.data().emailQueue;
          }
        });
    
        //add user to queue
        Userqueue.push(UserName);
        Emailqueue.push(UserEmail);
    
        //update document with new queue and number of people
        updateDoc(event, {
          numOfPeople: Userqueue.length,
          userQueue: Userqueue,
          emailQueue: Emailqueue
        });
    
        alert("Adding " + UserName + " to " + Event);
    }
}
