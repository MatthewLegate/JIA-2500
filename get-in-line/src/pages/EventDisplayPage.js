import { useParams } from 'react-router-dom'

import { collection, doc, getDocs, query, setDoc, limit, onSnapshot, deleteDoc, updateDoc, where, arrayRemove } from 'firebase/firestore';
import LogoutButton from '../components/LogoutButton';
import { auth, db, logout, registerWithEmailAndPassword, } from '../Firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

export default function EventDisplayPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }

  }, [user, loading]);
  ///////////////////////////////////////
  //SMS class, used to send texts to user
  class SMS extends React.Component {
    state = {
        text: {
          recipient: '',
          textmessage: 'Youre in line for ' + eventName + '!'
        }
      }

      //Sends text and adds user to queue
      sendTextAddUser = _ => {
        const { text } = this.state;
        //pass text message GET variables via query string
        fetch(`http://localhost:4000/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`)
        .catch(err => console.error(err))

        //add user to queue on same button click
        verifyUserAdd();
      }

      //what shows up on UI
      render() {
        const { text } = this.state;
        return (
            <div >
              Phone #* <input value={text.recipient}
                onChange={e => this.setState({ text: { ...text, recipient: e.target.value } })} />
              <p></p>
              <button onClick={this.sendTextAddUser}> Submit </button>
            </div>
        );
      }
  }
  ///////////////////////////////////////



  const [needUserInfo, setNeedUserInfo] = React.useState(false);
    const promptInfo = () => {
        setNeedUserInfo(true);
    };
    const {eventName} = useParams();

	if (!user) {
        return (
        	<div>
            <p></p>
            <h2>{eventName}</h2>
            <p id='distanceFromUser'>Distance from you: </p>
            <p id='numberOfPeopleInLine'>Current number of people in line: </p>
            <p>Estimated waiting time:</p>
            Name* <input type="text" id="Name"/> <br/>
            <p></p>
            Email* <input type="text" id="Email"/> <br/>
            <p></p>
            <SMS />
            <p></p>

            </div>
        );
    } else {
        return (
        	<div>
            <p></p>
            <h2>{eventName}</h2>
            <p id='distanceFromUser'>Distance from you: </p>
            <p>Current number of people in line: </p>
            <p>Estimated waiting time:</p>

            <button onClick={() =>verifyUserRemove(user.email)}> Dequeue </button>
            <p></p>
          </div>

        );
    }


	function verifyUserRemove(email) {
        var Event = eventName;
        RemoveUser(Event, email);

    }

    async function RemoveUser(Event, UserEmail) {
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
        return name !== UserEmail
      })

      //update document with new queue and number of people
      updateDoc(event, {
        numOfPeople: queue.length,
        queue: queue
      });

      alert("Removing " + UserEmail + " from " + Event);

      
      user.delete().then(function() {
        // User deleted.
      }, function(error) {
        // An error happened.
      });
    }

    function verifyUserAdd() {
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
        queue.push(UserEmail);

        registerWithEmailAndPassword(UserName, UserEmail, "TemporaryMeasure123", false);

        //update document with new queue and number of people
        updateDoc(event, {
          numOfPeople: queue.length,
          queue: queue,
        });


        alert("Adding " + UserName + " to " + Event);
    }

    async function calculateAverageWait(event) {
      let dequeueTimes = []
  
  
      const queuesQuery = query(
        collection(db, 'event'),
        limit(100) // Just to make sure we're not querying more than 100 events. Can be removed if database grows and is needed
      );
  
      const querySnapshot = await getDocs(queuesQuery);
  
  
      querySnapshot.forEach((snap) => {
        if (snap.data().name == Event) {
          dequeueTimes = snap.data().dequeueTimes;
        }
      });
  
      //need at least two times in order to be able to calculate average wait
      if (dequeueTimes.length < 2) {
        return NaN
      }
  
      let numPeople = 0
      let accumulatedTime = 0
      for (; numPeople + 1 < dequeueTimes.length; numPeople++) {
        accumulatedTime += dequeueTimes[numPeople] - dequeueTimes[numPeople + 1]
      }
  
      return accumulatedTime/numPeople
  
    }
  
    // async function getWaitFor(event, userName) {
    //   const average = calculateAverageWait(event)
    //   let queue = [];
  
    //   const querySnapshot = await getDocs(queuesQuery);
    //   querySnapshot.forEach((snap) => {
    //     if (snap.data().name == Event) {
    //       queue = snap.data().queue;
    //     }
    //   });
  
    //   let location = queue.indexOf(userName)
    // }
  

}
