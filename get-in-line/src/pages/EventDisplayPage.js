import { useParams } from 'react-router-dom'
import * as React from 'react';
import { collection, doc, getDocs, query, setDoc, limit, onSnapshot, deleteDoc, updateDoc, where, arrayRemove } from 'firebase/firestore';
import LogoutButton from '../components/LogoutButton';
import { auth, db, logout } from '../Firebase';

export default function EventDisplayPage() {
  

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
        fetch(`http://127.0.0.1:4000/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`)
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
            <p></p>
            Email* <input type="text" id="Email"/> <br/>
            <p></p>
            <SMS />
            <button onClick={() => verifyUserRemove()}> Dequeue </button>
            <p></p>
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
          RemoveUser(Event, Name, Email);
        }
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
        queue.push(UserName);
    
        //update document with new queue and number of people
        updateDoc(event, {
          numOfPeople: queue.length,
          queue: queue,
        });


        alert("Adding " + UserName + " to " + Event);
    }

}


